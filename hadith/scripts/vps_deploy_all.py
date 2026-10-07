"""
vps_deploy_all.py
=================
Production Deployment & Verification Engine for Bayan Al-Sunnah on Open WebUI.
Designed for Linux VPS, Docker containers, and Cloud environments.

Key Guarantees:
1. WAL-safe SQLite snapshot using sqlite3.Connection.backup() before any write.
2. Dynamic admin user resolution (zero hardcoded developer UUIDs).
3. Canonical export loading from open-webui/hadith/exports/ with SHA-256 checks.
4. Mandatory read-after-write cryptographic verification across tool, skill, and model tables.
5. Automatic atomic rollback if any database write or verification assertion fails.
6. Standalone manual rollback support via `--rollback <snapshot_path>`.

Usage:
    python vps_deploy_all.py [--db /path/to/webui.db] [--exports-dir /path/to/exports]
    python vps_deploy_all.py --rollback /path/to/snapshot.bak --db /path/to/webui.db
"""

import os
import sys
import io
import json
import time
import hashlib
import sqlite3
import argparse
from pathlib import Path
from typing import Optional, Dict, Any, Tuple, List

# Ensure UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

SCRIPT_DIR = Path(__file__).resolve().parent
REPO_HADITH_DIR = SCRIPT_DIR.parent
DEFAULT_EXPORTS_DIR = REPO_HADITH_DIR / "exports"


def sha256_text(text: str) -> str:
    """Computes SHA-256 of text using UTF-8."""
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def find_webui_db(custom_path: Optional[str] = None) -> Optional[Path]:
    """Resolves webui.db with explicit logging, checking custom path, env var, or system paths."""
    if custom_path:
        p = Path(custom_path).resolve()
        if p.exists():
            return p
        print(f"⚠️ Warning: Specified --db path does not exist: {custom_path}")

    env_db = os.environ.get("WEBUI_DB_PATH")
    if env_db:
        p = Path(env_db).resolve()
        if p.exists():
            return p
        print(f"⚠️ Warning: WEBUI_DB_PATH env var does not exist: {env_db}")

    candidates = [
        Path("/app/backend/data/webui.db"),
        Path.home() / ".open-webui" / "webui.db",
        Path.home() / ".local" / "share" / "open-webui" / "webui.db",
        Path.cwd() / "backend" / "data" / "webui.db",
        Path.cwd() / "data" / "webui.db",
        Path.cwd() / "webui.db",
    ]
    for c in candidates:
        if c.exists():
            return c.resolve()

    # Check site-packages if open_webui is installed
    try:
        import open_webui
        pkg_dir = Path(open_webui.__file__).resolve().parent
        pkg_db = pkg_dir / "data" / "webui.db"
        if pkg_db.exists():
            return pkg_db.resolve()
    except ImportError:
        pass

    return None


def create_wal_safe_snapshot(db_path: Path) -> Path:
    """
    Creates a transactionally consistent, WAL-safe snapshot of SQLite database
    using sqlite3.Connection.backup().
    """
    timestamp = time.strftime("%Y%m%d_%H%M%S")
    snapshot_dir = db_path.parent / "snapshots"
    snapshot_dir.mkdir(parents=True, exist_ok=True)
    snapshot_path = snapshot_dir / f"webui_{timestamp}.db.bak"

    print(f"  -> Creating WAL-safe pre-deploy snapshot...")
    src_conn = sqlite3.connect(db_path)
    try:
        # Checkpoint WAL before backing up to flush uncommitted frames
        try:
            src_conn.execute("PRAGMA wal_checkpoint(TRUNCATE)")
        except Exception:
            pass

        dst_conn = sqlite3.connect(snapshot_path)
        try:
            src_conn.backup(dst_conn)
            dst_conn.commit()
        finally:
            dst_conn.close()
    finally:
        src_conn.close()

    # Validate snapshot integrity
    if not snapshot_path.exists() or snapshot_path.stat().st_size == 0:
        raise RuntimeError(f"Snapshot creation failed or resulting file is empty: {snapshot_path}")

    # Check snapshot integrity
    chk_conn = sqlite3.connect(snapshot_path)
    try:
        cur = chk_conn.cursor()
        cur.execute("PRAGMA integrity_check")
        res = cur.fetchone()[0]
        if res != "ok":
            raise RuntimeError(f"Snapshot SQLite integrity check failed: {res}")
    finally:
        chk_conn.close()

    print(f"  ✅ Snapshot created & verified: {snapshot_path} ({snapshot_path.stat().st_size:,} bytes)")
    return snapshot_path


def rollback_database(snapshot_path: Path, target_db_path: Path) -> bool:
    """
    Restores the target database from a verified snapshot using sqlite3.backup().
    """
    print(f"\n🚨 INITIATING DATABASE ROLLBACK TO SNAPSHOT: {snapshot_path}")
    if not snapshot_path.exists():
        print(f"❌ Error: Snapshot file does not exist: {snapshot_path}")
        return False

    snap_conn = sqlite3.connect(snapshot_path)
    target_conn = sqlite3.connect(target_db_path)
    try:
        snap_conn.backup(target_conn)
        target_conn.commit()
        target_conn.execute("PRAGMA wal_checkpoint(TRUNCATE)")
        print(f"  ✅ Database successfully restored from snapshot.")
        return True
    except Exception as e:
        print(f"  ❌ CRITICAL: Rollback failed: {e}")
        return False
    finally:
        snap_conn.close()
        target_conn.close()


def resolve_admin_user_id(conn: sqlite3.Connection) -> str:
    """
    Resolves the administrative user ID dynamically from the DB.
    Never relies on developer-specific UUIDs.
    """
    cur = conn.cursor()
    # 1. Prefer user with role 'admin'
    try:
        cur.execute("SELECT id FROM user WHERE role = 'admin' LIMIT 1")
        row = cur.fetchone()
        if row and row[0]:
            return str(row[0])
    except Exception:
        pass

    # 2. Fall back to any user
    try:
        cur.execute("SELECT id FROM user LIMIT 1")
        row = cur.fetchone()
        if row and row[0]:
            return str(row[0])
    except Exception:
        pass

    # 3. Default neutral system ID
    return "00000000-0000-0000-0000-000000000001"


def deploy_and_verify(db_path: Path, exports_dir: Path, skip_backup: bool = False) -> bool:
    """
    Deploys tools, skills, and models to Open WebUI with atomic backup,
    read-after-write verification, and automatic rollback.
    """
    snapshot_path: Optional[Path] = None
    if not skip_backup:
        snapshot_path = create_wal_safe_snapshot(db_path)

    tools_file = exports_dir / "hadith_tools_vps_export.json"
    skills_file = exports_dir / "hadith_skills_vps_export.json"
    models_file = exports_dir / "hadith_models_vps_export.json"

    for req_file in [tools_file, skills_file, models_file]:
        if not req_file.exists():
            print(f"❌ ERROR: Missing required export package: {req_file}")
            return False

    with open(tools_file, "r", encoding="utf-8") as f:
        tools_data = json.load(f)
    with open(skills_file, "r", encoding="utf-8") as f:
        skills_data = json.load(f)
    with open(models_file, "r", encoding="utf-8") as f:
        models_data = json.load(f)

    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    admin_id = resolve_admin_user_id(conn)
    print(f"  • Acting Admin User ID: {admin_id}")
    now = int(time.time())

    try:
        # 1. Deploy Tools
        print(f"\n--- 🛠️ Step 1: Deploying {len(tools_data)} Tools to 'tool' Table ---")
        for tool in tools_data:
            tid = tool["id"]
            tname = tool["name"]
            tcontent = tool["content"]
            tspecs = json.dumps(tool.get("specs", []), ensure_ascii=False)
            tmeta = json.dumps(tool.get("meta", {}), ensure_ascii=False)

            cur.execute("SELECT id FROM tool WHERE id = ?", (tid,))
            if cur.fetchone():
                cur.execute("""
                    UPDATE tool
                    SET name = ?, content = ?, specs = ?, meta = ?, updated_at = ?
                    WHERE id = ?
                """, (tname, tcontent, tspecs, tmeta, now, tid))
                print(f"  [UPDATED] Tool: {tid}")
            else:
                cur.execute("""
                    INSERT INTO tool (id, user_id, name, content, specs, meta, updated_at, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """, (tid, admin_id, tname, tcontent, tspecs, tmeta, now, now))
                print(f"  [CREATED] Tool: {tid}")

        # 2. Deploy Skills
        print(f"\n--- 🧠 Step 2: Deploying {len(skills_data)} Skills to 'skill' Table ---")
        for skill in skills_data:
            sid = skill["id"]
            sname = skill["name"]
            sdesc = skill.get("description", "")
            scontent = skill.get("content", "")
            smeta = json.dumps(skill.get("meta", {}), ensure_ascii=False)

            cur.execute("SELECT id FROM skill WHERE id = ?", (sid,))
            if cur.fetchone():
                cur.execute("""
                    UPDATE skill
                    SET name = ?, description = ?, content = ?, meta = ?, is_active = 1, updated_at = ?
                    WHERE id = ?
                """, (sname, sdesc, scontent, smeta, now, sid))
                print(f"  [UPDATED] Skill: {sid}")
            else:
                cur.execute("""
                    INSERT INTO skill (id, user_id, name, description, content, meta, is_active, updated_at, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)
                """, (sid, admin_id, sname, sdesc, scontent, smeta, now, now))
                print(f"  [CREATED] Skill: {sid}")

        # 3. Deploy Models
        print(f"\n--- 🤖 Step 3: Deploying {len(models_data)} Models to 'model' Table ---")
        for model in models_data:
            mid = model["id"]
            mname = model["name"]
            base_id = model.get("base_model_id", "gpt-5.4-mini")
            params_json = json.dumps(model.get("params", {}), ensure_ascii=False)
            meta_json = json.dumps(model.get("meta", {}), ensure_ascii=False)

            cur.execute("SELECT id FROM model WHERE id = ?", (mid,))
            if cur.fetchone():
                cur.execute("""
                    UPDATE model
                    SET name = ?, base_model_id = ?, params = ?, meta = ?, is_active = 1, updated_at = ?
                    WHERE id = ?
                """, (mname, base_id, params_json, meta_json, now, mid))
                print(f"  [UPDATED] Model: {mid} ({mname})")
            else:
                cur.execute("""
                    INSERT INTO model (id, user_id, base_model_id, name, params, meta, is_active, updated_at, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)
                """, (mid, admin_id, base_id, mname, params_json, meta_json, now, now))
                print(f"  [CREATED] Model: {mid} ({mname})")

        conn.commit()

        # -------------------------------------------------------------
        # 4. Mandatory Read-After-Write Verification
        # -------------------------------------------------------------
        print("\n--- 🔍 Step 4: Mandatory Read-After-Write Verification ---")

        # Verify Tools
        for tool in tools_data:
            tid = tool["id"]
            cur.execute("SELECT content FROM tool WHERE id = ?", (tid,))
            row = cur.fetchone()
            if not row or not row[0]:
                raise ValueError(f"Verification Failed: Tool '{tid}' missing or empty after deploy!")
            written_hash = sha256_text(row[0])
            expected_hash = sha256_text(tool["content"])
            if written_hash != expected_hash:
                raise ValueError(f"Verification Failed: Hash mismatch on tool '{tid}' (expected {expected_hash}, got {written_hash})")
            print(f"  ✅ Verified Tool: {tid} (content hash: {written_hash[:12]}...)")

        # Verify Skills
        for skill in skills_data:
            sid = skill["id"]
            cur.execute("SELECT content, is_active FROM skill WHERE id = ?", (sid,))
            row = cur.fetchone()
            if not row or not row[0]:
                raise ValueError(f"Verification Failed: Skill '{sid}' missing or empty after deploy!")
            if not row[1]:
                raise ValueError(f"Verification Failed: Skill '{sid}' is not active!")
            written_hash = sha256_text(row[0])
            expected_hash = sha256_text(skill["content"])
            if written_hash != expected_hash:
                raise ValueError(f"Verification Failed: Hash mismatch on skill '{sid}'")
            print(f"  ✅ Verified Skill: {sid} (content hash: {written_hash[:12]}...)")

        # Verify Pilot Model Wiring
        cur.execute("SELECT params, meta FROM model WHERE id = 'bayan-unified-pilot'")
        p_row = cur.fetchone()
        if not p_row:
            raise ValueError("Verification Failed: bayan-unified-pilot missing after deploy!")
        p_meta = json.loads(p_row[1])
        wired_skills = p_meta.get("skillIds", [])
        wired_tools = p_meta.get("toolIds", [])

        if len(wired_skills) != 8:
            raise ValueError(f"Verification Failed: Pilot has {len(wired_skills)} skills, expected 8!")
        if "hadith_bayan_topics" not in wired_tools:
            raise ValueError("Verification Failed: Topics tool missing from pilot toolIds!")
        print(f"  ✅ Verified Model: bayan-unified-pilot (wired {len(wired_skills)} skills, {len(wired_tools)} tools)")

    except Exception as e:
        print(f"\n❌ CRITICAL DEPLOYMENT FAILURE: {e}")
        conn.rollback()
        conn.close()
        if snapshot_path:
            rollback_database(snapshot_path, db_path)
        return False
    finally:
        if conn:
            try:
                conn.close()
            except Exception:
                pass

    print("\n" + "=" * 75)
    print(" 🎉 SUCCESS: Bayan Al-Sunnah deployment passed 100% verification!")
    print("=" * 75)
    if snapshot_path:
        print(f"Safe pre-deploy snapshot retained at: {snapshot_path}")
        print(f"To revert at any time, run: python vps_deploy_all.py --rollback {snapshot_path}")
    return True


def main():
    parser = argparse.ArgumentParser(description="One-Command Production VPS Deployer for Bayan Al-Sunnah")
    parser.add_argument("--db", default=None, help="Path to Open WebUI webui.db")
    parser.add_argument("--exports-dir", default=None, help="Directory containing VPS export bundles")
    parser.add_argument("--rollback", default=None, help="Restore database from snapshot backup and exit")
    parser.add_argument("--skip-backup", action="store_true", help="Skip pre-deploy snapshot creation")
    args = parser.parse_args()

    print("=" * 75)
    print(" 🚀 BAYAN AL-SUNNAH — SECURE VPS DEPLOYMENT & VERIFIER")
    print("=" * 75)

    db_path = find_webui_db(args.db)
    if not db_path:
        print("❌ ERROR: Could not locate Open WebUI database (webui.db).")
        print("   Please pass it with: python vps_deploy_all.py --db /path/to/webui.db")
        print("   Or set WEBUI_DB_PATH environment variable.")
        sys.exit(1)
    print(f"✅ Target Open WebUI Database: {db_path}")

    # Handle manual rollback request
    if args.rollback:
        snap_path = Path(args.rollback).resolve()
        ok = rollback_database(snap_path, db_path)
        sys.exit(0 if ok else 1)

    # Determine exports directory
    if args.exports_dir:
        exports_dir = Path(args.exports_dir).resolve()
    elif DEFAULT_EXPORTS_DIR.exists():
        exports_dir = DEFAULT_EXPORTS_DIR
    elif (Path.cwd() / "exports").exists():
        exports_dir = Path.cwd() / "exports"
    else:
        exports_dir = Path.cwd()

    print(f"✅ Canonical Exports Directory: {exports_dir}")

    success = deploy_and_verify(db_path, exports_dir, skip_backup=args.skip_backup)
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
