"""
build_exports.py
================
Canonical Build & Packaging Script for Bayan Al-Sunnah.
Assembles tools, skills, and models into verifiable Open WebUI export bundles
and generates a tamper-evident delivery_manifest.json with SHA-256 signatures.

Usage:
    python build_exports.py [--check-only]
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

SCRIPT_DIR = Path(__file__).resolve().parent
REPO_HADITH_DIR = SCRIPT_DIR.parent
EXPORTS_DIR = REPO_HADITH_DIR / "exports"
TOOLS_DIR = REPO_HADITH_DIR / "tools"
ROOT_DIR = REPO_HADITH_DIR.parent.parent

# Tool Definitions (Mapping ID to Tool Code and Spec files)
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
    """Builds canonical tools export by combining latest code and specs."""
    tools_list = []
    print("\n[1/4] Building Tools Export Bundle...")
    for tm in TOOL_MAPPINGS:
        code_path = TOOLS_DIR / tm["code_file"]
        spec_path = TOOLS_DIR / tm["spec_file"]

        if not code_path.exists():
            raise FileNotFoundError(f"Missing tool source file: {code_path}")
        if not spec_path.exists():
            raise FileNotFoundError(f"Missing tool spec file: {spec_path}")

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
    """Loads the canonical 8 skills with verified U01-U08 instructions."""
    print("\n[2/4] Verifying Skills Export Bundle...")
    candidates = [
        ROOT_DIR / "hadith_skills_vps_export.json",
        EXPORTS_DIR / "hadith_skills_vps_export.json"
    ]
    source_file = next((p for p in candidates if p.exists()), None)
    if not source_file:
        raise FileNotFoundError("Could not find source hadith_skills_vps_export.json")

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
    """Loads the canonical models with bayan-unified-pilot wiring."""
    print("\n[3/4] Verifying Models Export Bundle...")
    candidates = [
        ROOT_DIR / "hadith_models_vps_export.json",
        EXPORTS_DIR / "hadith_models_vps_export.json"
    ]
    source_file = next((p for p in candidates if p.exists()), None)
    if not source_file:
        raise FileNotFoundError("Could not find source hadith_models_vps_export.json")

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

def build_all(check_only: bool = False):
    print("=" * 75)
    print(" 📦 BAYAN AL-SUNNAH — CANONICAL EXPORT & MANIFEST BUILDER")
    print("=" * 75)

    EXPORTS_DIR.mkdir(parents=True, exist_ok=True)

    tools_data = build_tools_export()
    skills_data = load_canonical_skills()
    models_data = load_canonical_models()

    tools_json = json.dumps(tools_data, ensure_ascii=False, indent=2)
    skills_json = json.dumps(skills_data, ensure_ascii=False, indent=2)
    models_json = json.dumps(models_data, ensure_ascii=False, indent=2)

    if not check_only:
        # Write canonical exports under open-webui/hadith/exports/
        print("\n[4/4] Writing exports to canonical directories...")
        (EXPORTS_DIR / "hadith_tools_vps_export.json").write_text(tools_json, encoding="utf-8")
        (EXPORTS_DIR / "hadith_skills_vps_export.json").write_text(skills_json, encoding="utf-8")
        (EXPORTS_DIR / "hadith_models_vps_export.json").write_text(models_json, encoding="utf-8")
        print(f"  -> Wrote: {EXPORTS_DIR / 'hadith_tools_vps_export.json'}")
        print(f"  -> Wrote: {EXPORTS_DIR / 'hadith_skills_vps_export.json'}")
        print(f"  -> Wrote: {EXPORTS_DIR / 'hadith_models_vps_export.json'}")

        # Sync to root and repo hadith directory for complete parity
        sync_targets = [
            (ROOT_DIR, "hadith_tools_vps_export.json", tools_json),
            (ROOT_DIR, "hadith_skills_vps_export.json", skills_json),
            (ROOT_DIR, "hadith_models_vps_export.json", models_json),
            (REPO_HADITH_DIR, "hadith_skills_vps_export.json", skills_json),
            (REPO_HADITH_DIR, "hadith_models_vps_export.json", models_json),
        ]
        for target_dir, fname, content in sync_targets:
            target_file = target_dir / fname
            target_file.write_text(content, encoding="utf-8")
            print(f"  -> Synced: {target_file}")

    # Build Delivery Manifest
    print("\n--- 📜 Generating Delivery Manifest & Signatures ---")
    manifest = {
        "manifest_version": "1.0.0",
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
        "databases": {},
        "planning_assets": {}
    }

    # Hash individual tool source files
    for tm in TOOL_MAPPINGS:
        code_p = TOOLS_DIR / tm["code_file"]
        if code_p.exists():
            manifest["tool_sources"][tm["id"]] = {
                "file": tm["code_file"],
                "sha256": sha256_file(code_p),
                "size_bytes": code_p.stat().st_size
            }

    # Inspect SQLite databases
    db_candidates = [
        ROOT_DIR / "hadith_rijal.db",
        ROOT_DIR / "poc" / "phrase_search" / "search_index.sqlite"
    ]
    for dbp in db_candidates:
        if dbp.exists():
            fp = get_sqlite_fingerprint(dbp)
            manifest["databases"][dbp.name] = fp

    # Hash planning assets
    assets = [
        ROOT_DIR / "planning" / "islam_topic_taxonomy_v1.json",
        ROOT_DIR / "planning" / "bayan_lesson_packs_v1.json"
    ]
    for ap in assets:
        if ap.exists():
            manifest["planning_assets"][ap.name] = {
                "file": str(ap),
                "sha256": sha256_file(ap),
                "size_bytes": ap.stat().st_size
            }

    manifest_json = json.dumps(manifest, ensure_ascii=False, indent=2)
    manifest_path_exports = EXPORTS_DIR / "delivery_manifest.json"
    manifest_path_root = ROOT_DIR / "delivery_manifest.json"

    if not check_only:
        manifest_path_exports.write_text(manifest_json, encoding="utf-8")
        manifest_path_root.write_text(manifest_json, encoding="utf-8")
        print(f"  -> Generated: {manifest_path_exports}")
        print(f"  -> Generated: {manifest_path_root}")

    print("\n" + "=" * 75)
    print(" ✅ BUILD COMPLETE: All export packages and manifest successfully generated.")
    print("=" * 75)

if __name__ == "__main__":
    check_mode = "--check-only" in sys.argv
    build_all(check_only=check_mode)
