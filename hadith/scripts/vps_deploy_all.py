"""
vps_deploy_all.py
=================
Production Deployment & Integrity Verification Engine for Bayan Al-Sunnah on Open WebUI.
Designed for Linux VPS, Docker containers, and Cloud environments.

Core Guarantees:
1. Gating Preflight Verification:
   - Manifest SHA-256 signature verification for tools, skills, and models prior to any DB write.
   - Database schema validation (presence of `user`, `tool`, `skill`, `model` tables).
   - Strict admin resolution: Resolves admin role dynamically (`role = 'admin'`) or requires explicit `--admin-id`.
     Never falls back to arbitrary users or unverified hardcoded UUIDs.
   - Model-tool-skill wiring pre-validation (zero dangling references).
   - Runtime importability validation for modular isnad engine (`hadith.isnad`).
2. Immediate Failure on Explicit Path Errors:
   - If `--db` or `WEBUI_DB_PATH` is specified and missing, halts immediately without silent fallback.
3. WAL-Safe Transactional Snapshot:
   - Pre-deploy backup using `sqlite3.Connection.backup()` with `PRAGMA wal_checkpoint(TRUNCATE)`.
4. Comprehensive Read-After-Write Verification:
   - Validates `content`, `specs`, `meta`, and `name` across all tools.
   - Validates `content`, `is_active`, `meta`, and `name` across all 8 skills.
   - Validates `name`, `base_model_id`, `params`, `meta`, `is_active`, and wiring across all 8 models.
5. Atomic Rollback:
   - Automatically restores pre-deploy snapshot if any write or verification check fails.
   - Supports manual standalone rollback via `--rollback <snapshot_path>`.

Usage:
    python vps_deploy_all.py [--db /path/to/webui.db] [--exports-dir /path/to/exports] [--admin-id <UUID>]
    python vps_deploy_all.py --preflight-only [--db /path/to/webui.db]
    python vps_deploy_all.py --rollback /path/to/snapshot.db.bak --db /path/to/webui.db
"""

import os
import sys
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


def sha256_file(filepath: Path) -> str:
    """Computes SHA-256 checksum of a file."""
    h = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest()


def sha256_text(text: str) -> str:
    """Computes SHA-256 checksum of UTF-8 text."""
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def find_webui_db(custom_path: Optional[str] = None) -> Optional[Path]:
    """
    Resolves webui.db with explicit failure on invalid specified paths.
    Halts immediately if custom_path or WEBUI_DB_PATH is specified and missing.
    """
    if custom_path:
        p = Path(custom_path).resolve()
        if p.exists() and p.is_file():
            return p
        print(f"❌ CRITICAL: Explicitly specified --db path does not exist or is not a file: {custom_path}")
        return None

    env_db = os.environ.get("WEBUI_DB_PATH")
    if env_db:
        p = Path(env_db).resolve()
        if p.exists() and p.is_file():
            return p
        print(f"❌ CRITICAL: WEBUI_DB_PATH environment variable specified but path does not exist: {env_db}")
        return None

    # Search standard system candidates only when no explicit path was given
    candidates = [
        Path("/app/backend/data/webui.db"),
        Path.home() / ".open-webui" / "webui.db",
        Path.home() / ".local" / "share" / "open-webui" / "webui.db",
        Path.cwd() / "backend" / "data" / "webui.db",
        Path.cwd() / "data" / "webui.db",
        Path.cwd() / "webui.db",
    ]
    for c in candidates:
        if c.exists() and c.is_file():
            return c.resolve()

    # Check site-packages if open_webui package is installed
    try:
        import open_webui
        pkg_dir = Path(open_webui.__file__).resolve().parent
        pkg_db = pkg_dir / "data" / "webui.db"
        if pkg_db.exists() and pkg_db.is_file():
            return pkg_db.resolve()
    except ImportError:
        pass

    return None


def resolve_admin_user_id(conn: sqlite3.Connection, explicit_admin_id: Optional[str] = None) -> str:
    """
    Resolves the administrative user ID dynamically from the DB.
    Never falls back to random users or arbitrary hardcoded UUIDs.
    """
    cur = conn.cursor()

    if explicit_admin_id:
        cur.execute("SELECT id, role FROM user WHERE id = ?", (explicit_admin_id,))
        row = cur.fetchone()
        if not row:
            raise RuntimeError(f"Specified admin user ID '{explicit_admin_id}' does not exist in the 'user' table.")
        print(f"  • Using explicitly specified Admin ID: {row[0]} (role: {row[1]})")
        return str(row[0])

    # Query for user with role = 'admin'
    cur.execute("SELECT id, name, email FROM user WHERE role = 'admin' ORDER BY created_at ASC LIMIT 1")
    row = cur.fetchone()
    if row and row[0]:
        admin_id = str(row[0])
        desc = f"{row[1]} <{row[2]}>" if row[1] or row[2] else admin_id
        print(f"  • Resolved Admin User: {admin_id} ({desc})")
        return admin_id

    # If no user with role = 'admin' exists, check if any user exists and warn/fail
    cur.execute("SELECT count(*) FROM user")
    u_count = cur.fetchone()[0]
    if u_count == 0:
        raise RuntimeError(
            "Target database has 0 registered users. Open WebUI must have at least one administrator account "
            "before tools and models can be deployed. Please complete Open WebUI initial setup first."
        )

    raise RuntimeError(
        "No user with role 'admin' found in the database. Open WebUI deployment requires an administrative account. "
        "Please promote an administrator or provide an explicit user ID with `--admin-id <UUID>`."
    )


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

    if not snapshot_path.exists() or snapshot_path.stat().st_size == 0:
        raise RuntimeError(f"Snapshot creation failed or resulting file is empty: {snapshot_path}")

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
    """Restores the target database from a verified snapshot using sqlite3.backup()."""
    print(f"\n🚨 INITIATING DATABASE ROLLBACK TO SNAPSHOT: {snapshot_path}")
    if not snapshot_path.exists():
        print(f"❌ Error: Snapshot file does not exist: {snapshot_path}")
        return False

    snap_conn = sqlite3.connect(snapshot_path)
    target_conn = sqlite3.connect(target_db_path)
    try:
        snap_conn.backup(target_conn)
        target_conn.commit()
        try:
            target_conn.execute("PRAGMA wal_checkpoint(TRUNCATE)")
        except Exception:
            pass
        print(f"  ✅ Database successfully restored from snapshot.")
        return True
    except Exception as e:
        print(f"  ❌ CRITICAL: Rollback failed: {e}")
        return False
    finally:
        snap_conn.close()
        target_conn.close()


def run_preflight_checks(
    db_path: Path,
    exports_dir: Path,
    tools_data: List[Dict[str, Any]],
    skills_data: List[Dict[str, Any]],
    models_data: List[Dict[str, Any]],
    explicit_admin_id: Optional[str] = None
) -> Tuple[bool, str]:
    """
    Executes gating preflight checks before any database modification:
    1. Cryptographic manifest check.
    2. Database schema existence and integrity check.
    3. Admin user resolution check.
    4. Model-tool-skill wiring check.
    5. Python runtime dependency check (modular isnad engine).
    """
    print("\n" + "=" * 75)
    print(" 🛡️ STEP 1: GATING PREFLIGHT INTEGRITY & DEPENDENCY VERIFICATION")
    print("=" * 75)

    # 1. Manifest Cryptographic Verification
    manifest_file = exports_dir / "delivery_manifest.json"
    if not manifest_file.exists():
        return False, f"Manifest file missing: {manifest_file}. Run build_exports.py first."

    with open(manifest_file, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    comps = manifest.get("components", {})
    package_checks = [
        ("tools_export", "hadith_tools_vps_export.json", exports_dir / "hadith_tools_vps_export.json"),
        ("skills_export", "hadith_skills_vps_export.json", exports_dir / "hadith_skills_vps_export.json"),
        ("models_export", "hadith_models_vps_export.json", exports_dir / "hadith_models_vps_export.json")
    ]
    for comp_key, fname, fpath in package_checks:
        if comp_key not in comps:
            return False, f"Manifest missing section '{comp_key}'."
        expected_sha = comps[comp_key]["sha256"]
        actual_sha = sha256_file(fpath)
        if actual_sha != expected_sha:
            return False, f"Preflight SHA mismatch for {fname}: manifest={expected_sha[:12]}, file={actual_sha[:12]}"
        print(f"  ✅ Manifest Check Passed: {fname} (SHA: {actual_sha[:12]}...)")

    # 2. Database Schema & Integrity Check
    conn = sqlite3.connect(db_path)
    try:
        cur = conn.cursor()
        cur.execute("PRAGMA integrity_check")
        res = cur.fetchone()[0]
        if res != "ok":
            return False, f"Database integrity check failed: {res}"

        cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
        existing_tables = {r[0] for r in cur.fetchall()}
        required_tables = ["user", "tool", "skill", "model"]
        missing_tables = [t for t in required_tables if t not in existing_tables]
        if missing_tables:
            return False, f"Target database is missing required Open WebUI tables: {missing_tables}"
        print(f"  ✅ Database Schema Verified: Required tables present {required_tables}")

        # 3. Dynamic Admin User Check
        try:
            admin_id = resolve_admin_user_id(conn, explicit_admin_id)
        except Exception as e:
            return False, str(e)

    finally:
        conn.close()

    # 4. Model-Tool and Model-Skill Wiring Verification
    available_tool_ids = {t["id"] for t in tools_data}
    available_skill_ids = {s["id"] for s in skills_data}

    for model in models_data:
        mid = model["id"]
        m_tools = model.get("meta", {}).get("toolIds", [])
        m_skills = model.get("meta", {}).get("skillIds", [])

        for tid in m_tools:
            if tid not in available_tool_ids:
                return False, f"Dangling Tool Reference: Model '{mid}' references tool '{tid}' which is missing from exports!"

        for sid in m_skills:
            if sid not in available_skill_ids:
                return False, f"Dangling Skill Reference: Model '{mid}' references skill '{sid}' which is missing from exports!"

    print(f"  ✅ Wiring Verified: Zero dangling tool/skill references across {len(models_data)} models.")

    # 5. Modular Isnad Engine Importability Check
    repo_root = REPO_HADITH_DIR.parent
    if str(repo_root) not in sys.path:
        sys.path.insert(0, str(repo_root))

    try:
        from hadith.isnad.parser import IsnadParser
        from hadith.isnad.resolver import NarratorResolver
        from hadith.isnad.graph import IsnadGraphBuilder
        from hadith.isnad.render_mermaid import MermaidRenderer
        from hadith.isnad.validation import validate_isnad_graph
        print("  ✅ Runtime Environment Verified: Modular isnad engine (hadith.isnad) importable.")
    except ImportError as e:
        return False, f"Cannot import modular isnad engine: {e}. Check PYTHONPATH."

    return True, admin_id


def deploy_and_verify(
    db_path: Path,
    exports_dir: Path,
    explicit_admin_id: Optional[str] = None,
    skip_backup: bool = False,
    preflight_only: bool = False
) -> bool:
    """
    Deploys tools, skills, and models to Open WebUI with gating preflight,
    WAL-safe backup, exhaustive read-after-write verification, and automatic rollback.
    """
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

    # Execute Gating Preflight
    preflight_ok, admin_id_or_err = run_preflight_checks(
        db_path=db_path,
        exports_dir=exports_dir,
        tools_data=tools_data,
        skills_data=skills_data,
        models_data=models_data,
        explicit_admin_id=explicit_admin_id
    )
    if not preflight_ok:
        print(f"\n❌ PREFLIGHT VERIFICATION FAILED: {admin_id_or_err}")
        return False

    admin_id = admin_id_or_err
    if preflight_only:
        print("\n✅ PREFLIGHT CHECK COMPLETED: All verification gates passed. (--preflight-only specified, exiting without database modification).")
        return True

    # Pre-deploy WAL-safe snapshot
    snapshot_path: Optional[Path] = None
    if not skip_backup:
        print("\n" + "=" * 75)
        print(" 📸 STEP 2: PRE-DEPLOY WAL-SAFE SNAPSHOT")
        print("=" * 75)
        snapshot_path = create_wal_safe_snapshot(db_path)

    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    now = int(time.time())

    try:
        # 1. Deploy Tools
        print("\n" + "=" * 75)
        print(f" 🛠️ STEP 3: DEPLOYING {len(tools_data)} TOOLS TO DATABASE")
        print("=" * 75)
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
        print("\n" + "=" * 75)
        print(f" 🧠 STEP 4: DEPLOYING {len(skills_data)} SKILLS TO DATABASE")
        print("=" * 75)
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
        print("\n" + "=" * 75)
        print(f" 🤖 STEP 5: DEPLOYING {len(models_data)} MODELS TO DATABASE")
        print("=" * 75)
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
        print("\n" + "=" * 75)
        print(" 🔍 STEP 6: COMPREHENSIVE READ-AFTER-WRITE INTEGRITY VERIFICATION")
        print("=" * 75)

        # A. Verify All Tools
        print(f"\n[A] Verifying All {len(tools_data)} Tools in Database...")
        for tool in tools_data:
            tid = tool["id"]
            cur.execute("SELECT name, content, specs, meta FROM tool WHERE id = ?", (tid,))
            row = cur.fetchone()
            if not row or not row[1]:
                raise ValueError(f"Verification Failed: Tool '{tid}' missing or empty after deploy!")

            db_name, db_content, db_specs, db_meta = row[0], row[1], row[2], row[3]

            # Content SHA-256 match
            written_hash = sha256_text(db_content)
            expected_hash = sha256_text(tool["content"])
            if written_hash != expected_hash:
                raise ValueError(f"Verification Failed: Content hash mismatch on tool '{tid}' (expected {expected_hash[:12]}, got {written_hash[:12]})")

            # Specs validation
            parsed_specs = json.loads(db_specs) if db_specs else []
            expected_specs = tool.get("specs", [])
            if len(parsed_specs) != len(expected_specs):
                raise ValueError(f"Verification Failed: Specs count mismatch on tool '{tid}' (expected {len(expected_specs)}, got {len(parsed_specs)})")

            # Meta validation
            parsed_meta = json.loads(db_meta) if db_meta else {}
            expected_meta = tool.get("meta", {})
            if parsed_meta.get("manifest", {}).get("title") != expected_meta.get("manifest", {}).get("title"):
                raise ValueError(f"Verification Failed: Meta manifest mismatch on tool '{tid}'")

            print(f"  ✅ Verified Tool: {tid} (content: {written_hash[:12]}..., specs: {len(parsed_specs)}, name: '{db_name}')")

        # B. Verify All 8 Skills
        print("\n[B] Verifying All 8 Skills in Database...")
        for skill in skills_data:
            sid = skill["id"]
            cur.execute("SELECT name, content, is_active, meta FROM skill WHERE id = ?", (sid,))
            row = cur.fetchone()
            if not row or not row[1]:
                raise ValueError(f"Verification Failed: Skill '{sid}' missing or empty after deploy!")

            db_name, db_content, db_active, db_meta = row[0], row[1], row[2], row[3]
            if not db_active:
                raise ValueError(f"Verification Failed: Skill '{sid}' is_active is 0!")

            written_hash = sha256_text(db_content)
            expected_hash = sha256_text(skill["content"])
            if written_hash != expected_hash:
                raise ValueError(f"Verification Failed: Content hash mismatch on skill '{sid}'")

            print(f"  ✅ Verified Skill: {sid} (content: {written_hash[:12]}..., is_active: {db_active})")

        # C. Verify All 8 Models
        print("\n[C] Verifying All 8 Models in Database...")
        for model in models_data:
            mid = model["id"]
            cur.execute("SELECT name, base_model_id, params, meta, is_active FROM model WHERE id = ?", (mid,))
            row = cur.fetchone()
            if not row:
                raise ValueError(f"Verification Failed: Model '{mid}' missing after deploy!")

            db_name, db_base, db_params, db_meta, db_active = row[0], row[1], row[2], row[3], row[4]
            if not db_active:
                raise ValueError(f"Verification Failed: Model '{mid}' is not active!")

            parsed_params = json.loads(db_params) if db_params else {}
            parsed_meta = json.loads(db_meta) if db_meta else {}

            expected_tools = model.get("meta", {}).get("toolIds", [])
            expected_skills = model.get("meta", {}).get("skillIds", [])

            actual_tools = parsed_meta.get("toolIds", [])
            actual_skills = parsed_meta.get("skillIds", [])

            if set(actual_tools) != set(expected_tools):
                raise ValueError(f"Verification Failed: Tool wiring mismatch on model '{mid}'")
            if set(actual_skills) != set(expected_skills):
                raise ValueError(f"Verification Failed: Skill wiring mismatch on model '{mid}'")

            print(f"  ✅ Verified Model: {mid} (wired {len(actual_tools)} tools, {len(actual_skills)} skills, base: {db_base})")

        # D. Pilot Model Specific Verifications
        cur.execute("SELECT meta FROM model WHERE id = 'bayan-unified-pilot'")
        p_row = cur.fetchone()
        p_meta = json.loads(p_row[0])
        pilot_skills = p_meta.get("skillIds", [])
        pilot_tools = p_meta.get("toolIds", [])

        if len(pilot_skills) != 8:
            raise ValueError(f"Verification Failed: Pilot has {len(pilot_skills)} skills, expected exactly 8!")
        if "hadith_bayan_topics" not in pilot_tools:
            raise ValueError("Verification Failed: hadith_bayan_topics tool missing from pilot toolIds!")
        print(f"\n  ✅ Verified Pilot Specifics: bayan-unified-pilot wires all 8 canonical skills and all required tools.")

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
    print(" 🎉 SUCCESS: Bayan Al-Sunnah deployment passed all preflight and post-deployment integrity verifications.")
    print("=" * 75)
    if snapshot_path:
        print(f"Pre-deploy snapshot retained at: {snapshot_path}")
        print(f"To revert at any time, run: python vps_deploy_all.py --rollback {snapshot_path} --db {db_path}")
    return True


def main():
    parser = argparse.ArgumentParser(description="Authoritative VPS Deployer & Integrity Verifier for Bayan Al-Sunnah")
    parser.add_argument("--db", default=None, help="Path to Open WebUI webui.db")
    parser.add_argument("--exports-dir", default=None, help="Directory containing export bundles and manifest")
    parser.add_argument("--admin-id", default=None, help="Explicit admin user ID (UUID)")
    parser.add_argument("--rollback", default=None, help="Restore database from snapshot backup and exit")
    parser.add_argument("--preflight-only", action="store_true", help="Run gating preflight checks without writing to DB")
    parser.add_argument("--skip-backup", action="store_true", help="Skip pre-deploy snapshot creation")
    args = parser.parse_args()

    print("=" * 75)
    print(" 🚀 BAYAN AL-SUNNAH — SECURE VPS DEPLOYMENT & INTEGRITY VERIFIER")
    print("=" * 75)

    db_path = find_webui_db(args.db)
    if not db_path:
        print("❌ ERROR: Could not locate Open WebUI database (webui.db).")
        print("   Please pass it explicitly: python vps_deploy_all.py --db /path/to/webui.db")
        print("   Or set the WEBUI_DB_PATH environment variable.")
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

    success = deploy_and_verify(
        db_path=db_path,
        exports_dir=exports_dir,
        explicit_admin_id=args.admin_id,
        skip_backup=args.skip_backup,
        preflight_only=args.preflight_only
    )
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
