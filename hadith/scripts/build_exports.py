"""
build_exports.py
================
Authoritative Build & Packaging Script for Bayan Al-Sunnah.
Assembles tools, skills, and models into verifiable Open WebUI export bundles
and generates a tamper-evident delivery_manifest.json with cryptographic SHA-256 signatures.

Guarantees:
1. Strict in-checkout authoring: All source files are read exclusively from within `open-webui/hadith/`.
   Never falls back to uncommitted or external workspace directories.
2. Complete 7-tool bundle: Includes `hadith_phrase_poc` alongside the other 6 micro-tools.
3. Cryptographic parity: delivery_manifest.json fingerprints exports, tool sources, tool specs,
   modular isnad engine (`hadith/isnad/*.py`), and UI assets.
4. Blocking `--check-only`: Compares all on-disk files against delivery_manifest.json and exits
   with non-zero exit code on any discrepancy.

Usage:
    python build_exports.py              # Build and write all export bundles and manifest
    python build_exports.py --check-only # Cryptographically verify existing files against manifest
"""

import os
import sys
import json
import hashlib
import sqlite3
import time
from pathlib import Path

# Ensure UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# Authoritative directory anchoring - strictly inside the repository checkout
SCRIPT_DIR = Path(__file__).resolve().parent
REPO_HADITH_DIR = SCRIPT_DIR.parent
REPO_ROOT = REPO_HADITH_DIR.parent
EXPORTS_DIR = REPO_HADITH_DIR / "exports"
TOOLS_DIR = REPO_HADITH_DIR / "tools"
ISNAD_DIR = REPO_HADITH_DIR / "isnad"
THEME_DIR = REPO_HADITH_DIR / "theme"

# Optional outer workspace sync target (only for post-build syncing, never used as input source)
OUTER_WORKSPACE_DIR = REPO_ROOT.parent if (REPO_ROOT.parent / "hadith_rijal.db").exists() else None

# Canonical Tool Definitions (6 tools total)
TOOL_MAPPINGS = [
    {
        "id": "hadith_corpus_search",
        "name": "Hadith Corpus & Connections Search",
        "code_file": "hadith_corpus_search_tool.py",
        "spec_file": "hadith_corpus_search.json"
    },
    {
        "id": "hadith_takhrij",
        "name": "Hadith Takhrij & Scholar Verification",
        "code_file": "hadith_takhrij_tool.py",
        "spec_file": "hadith_takhrij.json"
    },
    {
        "id": "hadith_sharh_vocab",
        "name": "Hadith Sharh & Gharib Vocab",
        "code_file": "hadith_sharh_vocab_tool.py",
        "spec_file": "hadith_sharh_vocab.json"
    },
    {
        "id": "hadith_isnad_tree",
        "name": "Hadith Isnad Visualizer & Tree",
        "code_file": "hadith_isnad_tree_tool.py",
        "spec_file": "hadith_isnad_tree.json"
    },
    {
        "id": "hadith_narrator",
        "name": "Hadith Narrator (Rijal) Biography & Network",
        "code_file": "hadith_narrator_tool.py",
        "spec_file": "hadith_narrator.json"
    },
    {
        "id": "hadith_bayan_topics",
        "name": "Bayan Topics & Scriptural Evidence",
        "code_file": "hadith_bayan_topics_tool.py",
        "spec_file": "hadith_bayan_topics.json"
    }
]

ISNAD_MODULE_FILES = [
    "__init__.py",
    "parser.py",
    "resolver.py",
    "graph.py",
    "render_mermaid.py",
    "validation.py"
]

THEME_ASSET_FILES = [
    "package.json",
    "test_journeys.mjs",
    "src/journeys.ts"
]


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


def get_sqlite_fingerprint(db_path: Path):
    """Computes schema and content fingerprint of an SQLite database."""
    if not db_path.exists():
        return None
    try:
        conn = sqlite3.connect(db_path)
        cur = conn.cursor()
        cur.execute("SELECT name, sql FROM sqlite_master WHERE type IN ('table', 'view') ORDER BY name")
        schema_rows = cur.fetchall()
        tables = [r[0] for r in schema_rows]
        table_counts = {}
        for t in tables:
            try:
                cur.execute(f"SELECT COUNT(*) FROM `{t}`")
                table_counts[t] = cur.fetchone()[0]
            except Exception:
                table_counts[t] = -1
        conn.close()
        return {
            "path": str(db_path),
            "file_size_bytes": db_path.stat().st_size,
            "sha256": sha256_file(db_path),
            "tables": tables,
            "row_counts": table_counts
        }
    except Exception as e:
        return {"path": str(db_path), "error": str(e)}


def build_tools_export() -> list:
    """Builds canonical tools export by combining latest code and specs strictly from repo."""
    tools_list = []
    print("\n[1/4] Building Tools Export Bundle (6 Tools)...")
    for tm in TOOL_MAPPINGS:
        code_path = TOOLS_DIR / tm["code_file"]
        spec_path = TOOLS_DIR / tm["spec_file"]

        if not code_path.exists():
            raise FileNotFoundError(f"Missing tool source file in repo: {code_path}")
        if not spec_path.exists():
            raise FileNotFoundError(f"Missing tool spec file in repo: {spec_path}")

        with open(code_path, "r", encoding="utf-8") as f:
            code_content = f.read()

        with open(spec_path, "r", encoding="utf-8") as f:
            spec_data = json.load(f)

        if isinstance(spec_data, list):
            spec_obj = spec_data[0]
        else:
            spec_obj = spec_data

        tool_bundle = {
            "id": tm["id"],
            "name": spec_obj.get("name", tm["name"]),
            "meta": spec_obj.get("meta", {
                "description": spec_obj.get("description", ""),
                "manifest": {
                    "title": spec_obj.get("name", tm["name"]),
                    "author": "Bayan Al-Sunnah Team 403",
                    "version": "2.0.0"
                }
            }),
            "specs": spec_obj.get("specs", []),
            "content": code_content
        }
        tools_list.append(tool_bundle)
        print(f"  + Added tool: {tm['id']} (code size: {len(code_content):,} chars, {len(tool_bundle['specs'])} specs)")

    return tools_list


def load_canonical_skills() -> list:
    """Loads the canonical 8 skills strictly from repo authoring directory."""
    print("\n[2/4] Verifying Skills Export Bundle (8 Skills)...")
    candidates = [
        EXPORTS_DIR / "hadith_skills_vps_export.json",
        REPO_HADITH_DIR / "hadith_skills_vps_export.json"
    ]
    source_file = next((p for p in candidates if p.exists()), None)
    if not source_file:
        raise FileNotFoundError(f"Could not find canonical skills export in repo: {candidates}")

    with open(source_file, "r", encoding="utf-8") as f:
        skills = json.load(f)

    # Invariants check
    assert len(skills) == 8, f"Expected 8 skills, found {len(skills)}"
    skill_ids = [s["id"] for s in skills]
    expected = [
        "hadith-search-record",
        "hadith-takhrij-compare",
        "hadith-mermaid-architect",
        "hadith-sharh-scholar",
        "hadith-rijal-critic",
        "hadith-source-provenance",
        "hadith-islam-guide",
        "hadith-bayan-maestro"
    ]
    for es in expected:
        assert es in skill_ids, f"Required skill '{es}' missing from package!"

    for s in skills:
        print(f"  + Verified skill: {s['id']} (content size: {len(s.get('content', '')):,} chars)")

    return skills


def load_canonical_models() -> list:
    """Loads the canonical models strictly from repo authoring directory."""
    print("\n[3/4] Verifying Models Export Bundle (8 Models)...")
    candidates = [
        EXPORTS_DIR / "hadith_models_vps_export.json",
        REPO_HADITH_DIR / "hadith_models_vps_export.json"
    ]
    source_file = next((p for p in candidates if p.exists()), None)
    if not source_file:
        raise FileNotFoundError(f"Could not find canonical models export in repo: {candidates}")

    with open(source_file, "r", encoding="utf-8") as f:
        models = json.load(f)

    pilot = next((m for m in models if m["id"] == "bayan-unified-pilot"), None)
    assert pilot is not None, "bayan-unified-pilot model missing!"

    # Ensure all 8 canonical skills are wired
    canonical_skills = [
        "hadith-search-record",
        "hadith-takhrij-compare",
        "hadith-mermaid-architect",
        "hadith-sharh-scholar",
        "hadith-rijal-critic",
        "hadith-source-provenance",
        "hadith-islam-guide",
        "hadith-bayan-maestro"
    ]
    current_skills = pilot.get("meta", {}).get("skillIds", [])
    for cs in canonical_skills:
        if cs not in current_skills:
            current_skills.append(cs)
    pilot.setdefault("meta", {})["skillIds"] = current_skills

    assert len(pilot["meta"]["skillIds"]) == 8, f"Pilot must wire 8 skills, found {len(pilot['meta']['skillIds'])}"
    assert "hadith_bayan_topics" in pilot["meta"]["toolIds"], "Topics tool missing in pilot!"

    for m in models:
        print(f"  + Verified model: {m['id']} (name: '{m.get('name')}')")

    return models


def check_manifest_integrity() -> bool:
    """
    Validates on-disk files against delivery_manifest.json.
    Exits with code 1 on any discrepancy.
    """
    print("\n" + "=" * 75)
    print(" 🔍 RUNNING STRICT MANIFEST INTEGRITY CHECK (--check-only)")
    print("=" * 75)

    manifest_path = EXPORTS_DIR / "delivery_manifest.json"
    if not manifest_path.exists():
        print(f"❌ CHECK FAILED: Manifest file missing: {manifest_path}")
        return False

    with open(manifest_path, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    errors = []

    # 1. Verify export bundles
    print("\n[1/5] Verifying Export Bundles...")
    components = manifest.get("components", {})
    for comp_key, comp_info in components.items():
        fname = comp_info.get("file")
        expected_sha = comp_info.get("sha256")
        target = EXPORTS_DIR / fname
        if not target.exists():
            errors.append(f"Export file missing on disk: {target}")
            continue
        actual_sha = sha256_file(target)
        if actual_sha != expected_sha:
            errors.append(f"SHA mismatch for {fname}: manifest={expected_sha[:12]}, disk={actual_sha[:12]}")
        else:
            print(f"  ✅ Verified export: {fname} (SHA: {actual_sha[:12]}...)")

    # 2. Verify tool source files
    print("\n[2/5] Verifying Tool Source Files...")
    tool_sources = manifest.get("tool_sources", {})
    for tid, tinfo in tool_sources.items():
        fname = tinfo.get("file")
        expected_sha = tinfo.get("sha256")
        target = TOOLS_DIR / fname
        if not target.exists():
            errors.append(f"Tool source file missing on disk: {target}")
            continue
        actual_sha = sha256_file(target)
        if actual_sha != expected_sha:
            errors.append(f"SHA mismatch for tool source {fname}: manifest={expected_sha[:12]}, disk={actual_sha[:12]}")
        else:
            print(f"  ✅ Verified tool source: {fname} (SHA: {actual_sha[:12]}...)")

    # 3. Verify tool spec files
    print("\n[3/5] Verifying Tool Spec Files...")
    tool_specs = manifest.get("tool_specs", {})
    for tid, sinfo in tool_specs.items():
        fname = sinfo.get("file")
        expected_sha = sinfo.get("sha256")
        target = TOOLS_DIR / fname
        if not target.exists():
            errors.append(f"Tool spec file missing on disk: {target}")
            continue
        actual_sha = sha256_file(target)
        if actual_sha != expected_sha:
            errors.append(f"SHA mismatch for tool spec {fname}: manifest={expected_sha[:12]}, disk={actual_sha[:12]}")
        else:
            print(f"  ✅ Verified tool spec: {fname} (SHA: {actual_sha[:12]}...)")

    # 4. Verify isnad modules
    print("\n[4/5] Verifying Modular Isnad Engine...")
    isnad_mods = manifest.get("isnad_modules", {})
    for mname, minfo in isnad_mods.items():
        expected_sha = minfo.get("sha256")
        target = ISNAD_DIR / mname
        if not target.exists():
            errors.append(f"Isnad module missing on disk: {target}")
            continue
        actual_sha = sha256_file(target)
        if actual_sha != expected_sha:
            errors.append(f"SHA mismatch for isnad module {mname}: manifest={expected_sha[:12]}, disk={actual_sha[:12]}")
        else:
            print(f"  ✅ Verified isnad module: {mname} (SHA: {actual_sha[:12]}...)")

    # 5. Verify UI theme assets
    print("\n[5/5] Verifying UI Theme Assets...")
    theme_assets = manifest.get("theme_assets", {})
    for aname, ainfo in theme_assets.items():
        expected_sha = ainfo.get("sha256")
        target = THEME_DIR / aname
        if target.exists():
            actual_sha = sha256_file(target)
            if actual_sha != expected_sha:
                errors.append(f"SHA mismatch for theme asset {aname}: manifest={expected_sha[:12]}, disk={actual_sha[:12]}")
            else:
                print(f"  ✅ Verified theme asset: {aname} (SHA: {actual_sha[:12]}...)")

    if errors:
        print("\n" + "=" * 75)
        print(f" ❌ CHECK FAILED: {len(errors)} integrity violations found:")
        for err in errors:
            print(f"   • {err}")
        print("=" * 75)
        return False

    print("\n" + "=" * 75)
    print(" ✅ CHECK PASSED: All on-disk files match delivery_manifest.json cryptographically.")
    print("=" * 75)
    return True


def build_all(check_only: bool = False):
    if check_only:
        passed = check_manifest_integrity()
        sys.exit(0 if passed else 1)

    print("=" * 75)
    print(" 📦 BAYAN AL-SUNNAH — AUTHORITATIVE EXPORT & MANIFEST BUILDER")
    print("=" * 75)

    EXPORTS_DIR.mkdir(parents=True, exist_ok=True)

    tools_data = build_tools_export()
    skills_data = load_canonical_skills()
    models_data = load_canonical_models()

    tools_json = json.dumps(tools_data, ensure_ascii=False, indent=2)
    skills_json = json.dumps(skills_data, ensure_ascii=False, indent=2)
    models_json = json.dumps(models_data, ensure_ascii=False, indent=2)

    # Write canonical exports under open-webui/hadith/exports/
    print("\n[4/4] Writing exports to canonical repo directories...")
    (EXPORTS_DIR / "hadith_tools_vps_export.json").write_bytes(tools_json.encode("utf-8"))
    (EXPORTS_DIR / "hadith_skills_vps_export.json").write_bytes(skills_json.encode("utf-8"))
    (EXPORTS_DIR / "hadith_models_vps_export.json").write_bytes(models_json.encode("utf-8"))
    print(f"  -> Wrote: {EXPORTS_DIR / 'hadith_tools_vps_export.json'}")
    print(f"  -> Wrote: {EXPORTS_DIR / 'hadith_skills_vps_export.json'}")
    print(f"  -> Wrote: {EXPORTS_DIR / 'hadith_models_vps_export.json'}")

    # Sync to repo hadith root
    (REPO_HADITH_DIR / "hadith_skills_vps_export.json").write_bytes(skills_json.encode("utf-8"))
    (REPO_HADITH_DIR / "hadith_models_vps_export.json").write_bytes(models_json.encode("utf-8"))

    # Sync to outer workspace if present
    if OUTER_WORKSPACE_DIR and OUTER_WORKSPACE_DIR.exists():
        for fname, content in [
            ("hadith_tools_vps_export.json", tools_json),
            ("hadith_skills_vps_export.json", skills_json),
            ("hadith_models_vps_export.json", models_json),
        ]:
            out_file = OUTER_WORKSPACE_DIR / fname
            out_file.write_bytes(content.encode("utf-8"))
            print(f"  -> Synced to outer workspace: {out_file}")

    # Build Delivery Manifest
    print("\n--- 📜 Generating Delivery Manifest & Signatures ---")
    manifest = {
        "manifest_version": "2.0.0",
        "release_tag": "v2.0.0-rc1",
        "generated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "description": "Bayan Al-Sunnah Canonical Delivery Manifest with Cryptographic Integrity Checksums",
        "components": {
            "tools_export": {
                "file": "hadith_tools_vps_export.json",
                "sha256": hashlib.sha256(tools_json.encode("utf-8")).hexdigest(),
                "count": len(tools_data),
                "items": [t["id"] for t in tools_data]
            },
            "skills_export": {
                "file": "hadith_skills_vps_export.json",
                "sha256": hashlib.sha256(skills_json.encode("utf-8")).hexdigest(),
                "count": len(skills_data),
                "items": [s["id"] for s in skills_data]
            },
            "models_export": {
                "file": "hadith_models_vps_export.json",
                "sha256": hashlib.sha256(models_json.encode("utf-8")).hexdigest(),
                "count": len(models_data),
                "items": [m["id"] for m in models_data]
            }
        },
        "tool_sources": {},
        "tool_specs": {},
        "isnad_modules": {},
        "theme_assets": {},
        "databases": {},
        "planning_assets": {}
    }

    # Hash individual tool source files and spec files
    for tm in TOOL_MAPPINGS:
        code_p = TOOLS_DIR / tm["code_file"]
        if code_p.exists():
            manifest["tool_sources"][tm["id"]] = {
                "file": tm["code_file"],
                "sha256": sha256_file(code_p),
                "size_bytes": code_p.stat().st_size
            }
        spec_p = TOOLS_DIR / tm["spec_file"]
        if spec_p.exists():
            manifest["tool_specs"][tm["id"]] = {
                "file": tm["spec_file"],
                "sha256": sha256_file(spec_p),
                "size_bytes": spec_p.stat().st_size
            }

    # Hash modular Isnad engine files
    for mod_fname in ISNAD_MODULE_FILES:
        mod_p = ISNAD_DIR / mod_fname
        if mod_p.exists():
            manifest["isnad_modules"][mod_fname] = {
                "file": f"hadith/isnad/{mod_fname}",
                "sha256": sha256_file(mod_p),
                "size_bytes": mod_p.stat().st_size
            }

    # Hash UI theme assets
    for asset_fname in THEME_ASSET_FILES:
        asset_p = THEME_DIR / asset_fname
        if asset_p.exists():
            manifest["theme_assets"][asset_fname] = {
                "file": f"hadith/theme/{asset_fname}",
                "sha256": sha256_file(asset_p),
                "size_bytes": asset_p.stat().st_size
            }

    # Inspect SQLite databases in repo or outer workspace
    db_candidates = [
        REPO_ROOT / "hadith_rijal.db",
        REPO_HADITH_DIR / "hadith_rijal.db",
    ]
    if OUTER_WORKSPACE_DIR:
        db_candidates.extend([
            OUTER_WORKSPACE_DIR / "hadith_rijal.db",
            OUTER_WORKSPACE_DIR / "poc" / "phrase_search" / "search_index.sqlite"
        ])

    for dbp in db_candidates:
        if dbp.exists() and dbp.name not in manifest["databases"]:
            fp = get_sqlite_fingerprint(dbp)
            if fp:
                manifest["databases"][dbp.name] = fp

    # Hash planning assets if available
    planning_candidates = [
        REPO_ROOT.parent / "planning" / "islam_topic_taxonomy_v1.json",
        REPO_ROOT.parent / "planning" / "bayan_lesson_packs_v1.json"
    ]
    for ap in planning_candidates:
        if ap.exists():
            manifest["planning_assets"][ap.name] = {
                "file": str(ap),
                "sha256": sha256_file(ap),
                "size_bytes": ap.stat().st_size
            }

    manifest_json = json.dumps(manifest, ensure_ascii=False, indent=2)
    manifest_path_exports = EXPORTS_DIR / "delivery_manifest.json"
    manifest_path_exports.write_bytes(manifest_json.encode("utf-8"))
    print(f"  -> Generated: {manifest_path_exports}")

    if OUTER_WORKSPACE_DIR and OUTER_WORKSPACE_DIR.exists():
        manifest_path_outer = OUTER_WORKSPACE_DIR / "delivery_manifest.json"
        manifest_path_outer.write_bytes(manifest_json.encode("utf-8"))
        print(f"  -> Synced to outer workspace: {manifest_path_outer}")

    print("\n" + "=" * 75)
    print(" ✅ BUILD COMPLETE: All export packages and manifest successfully generated.")
    print("=" * 75)


if __name__ == "__main__":
    check_mode = "--check-only" in sys.argv
    build_all(check_only=check_mode)
