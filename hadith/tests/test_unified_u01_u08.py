"""
test_unified_u01_u08.py
Automated Verification Suite for Tasks U01 through U08
defined in planning/unified_six_skills_review_AR.md.
"""

import os
import sys
import json
import sqlite3

# Ensure UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

DB_PATH = r"C:\Users\mhdal\AppData\Local\Programs\Python\Python312\Lib\site-packages\open_webui\data\webui.db"

def test_u05_snapshot_and_baseline_integrity():
    print("[TEST U05] Snapshot & Safe Deployment Integrity...")
    with open("planning/last_snapshot_path.txt", "r", encoding="utf-8") as f:
        snapshot_path = f.read().strip()
    assert os.path.exists(snapshot_path), f"Snapshot file missing: {snapshot_path}"
    assert os.path.getsize(snapshot_path) > 100000, "Snapshot file is suspiciously small"
    
    # Verify rollback script exists
    assert os.path.exists("scripts/rollback_snapshot.py"), "Rollback script missing"

    # Verify baseline models exist in webui.db
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    baseline_models = ["hadith-modular-agent", "hadith-model-1"]
    for mid in baseline_models:
        c.execute("SELECT id, name FROM model WHERE id = ?", (mid,))
        row = c.fetchone()
        assert row is not None, f"Baseline model {mid} was accidentally dropped!"
    conn.close()
    print("  -> PASS: Snapshot verified and baseline models safely preserved.")

def test_u04_islam_guide_and_topics_tool():
    print("[TEST U04] Islam Guide & Bayan Topics Tool Wiring...")
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    # 1. Check tool registration in webui.db
    c.execute("SELECT id, name, specs FROM tool WHERE id = 'hadith_bayan_topics'")
    row = c.fetchone()
    assert row is not None, "hadith_bayan_topics tool not found in tool table"
    specs = json.loads(row[2])
    spec_names = [s["name"] for s in specs]
    assert "list_islam_topics" in spec_names, "list_islam_topics missing from specs"
    assert "get_topic_evidence" in spec_names, "get_topic_evidence missing from specs"
    assert "get_reviewed_lesson" in spec_names, "get_reviewed_lesson missing from specs"

    # 2. Check wiring in bayan-unified-pilot
    c.execute("SELECT meta FROM model WHERE id = 'bayan-unified-pilot'")
    model_row = c.fetchone()
    assert model_row is not None, "bayan-unified-pilot not found in model table"
    meta = json.loads(model_row[0])
    assert "hadith_bayan_topics" in meta.get("toolIds", []), "hadith_bayan_topics missing from pilot toolIds"
    assert "hadith-islam-guide" in meta.get("skillIds", []), "hadith-islam-guide missing from pilot skillIds"

    conn.close()

    # 3. Test functional tool execution and negative exclusion
    sys.path.insert(0, os.path.abspath("."))
    from tools.hadith_bayan_topics_tool import Tools as TopicsTool
    tool = TopicsTool()

    # Test list_islam_topics
    list_res = json.loads(tool.list_islam_topics())
    assert list_res["status"] == "ok"
    assert len(list_res["data"]["topics"]) == 6, f"Expected 6 topics, got {len(list_res['data']['topics'])}"

    # Test get_reviewed_lesson with topic-faith
    lesson_res = json.loads(tool.get_reviewed_lesson(topic_id="topic-faith", audience="newcomer", format="card"))
    assert lesson_res["status"] == "needs_review", "Lesson review status must be needs_review"
    note = lesson_res["data"]["negative_exclusion_note"]
    assert "النذور" in note and "الأيمان" in note.replace("َ", ""), "Oaths and vows must be excluded in topic-faith"

    print("  -> PASS: hadith_bayan_topics registered, wired to pilot, and semantic exclusion verified.")

def test_u01_u07_mermaid_rules():
    print("[TEST U01 & U07] Mermaid Rules: 4 Endings, Gaps, and Verified Deduplication...")
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT content FROM skill WHERE id = 'hadith-mermaid-architect'")
    content = c.fetchone()[0]
    conn.close()

    # U01: 4 Endings
    assert "المنتهى" in content or "حالات المنتهى" in content, "Skill must explain Hadith endings"
    assert "المرفوع" in content, "Skill must support Marfu'"
    assert "الموقوف" in content, "Skill must support Mawquf"
    assert "المقطوع" in content, "Skill must support Maqtu'"
    assert "المرسل" in content, "Skill must support Mursal"
    assert "ولا يُرسم فوقه عقدة للنبي" in content, "Skill must state Mawquf has no Prophet node"
    assert "سقط الصحابي" in content or "إرسال" in content, "Skill must represent Mursal without invented Sahabi"
    assert ":::unknown" in content, "Skill must have classDef for unknown narrators"
    assert "عن أبيه" in content, "Skill must handle anonymous narrators like 'عن أبيه'"

    # U07: Deduplication & verified classes
    assert "ثبوت هوية" in content or "هويته العلمية" in content, "Deduplication must be based on verified identity"
    assert "650px" not in content or "يُحظر قطعياً دمج عقدتين لمجرد تشابه الأسماء أو لتضييق عرض المخطط" in content, "Must not justify deduplication merely by width"
    assert "classDef reliable" in content, "reliable classDef must exist"
    assert "classDef weak" in content, "weak classDef must exist"
    assert "classDef unknown" in content, "unknown classDef must exist"
    assert "graph_kind=narrator_network" in content, "Must differentiate narrator network from single hadith DAG"

    print("  -> PASS: Mermaid rules support 4 endings, gaps, unknown narrators, and verified classes.")

def test_u02_u08_source_provenance_and_static_purging():
    print("[TEST U02 & U08] Source Provenance Field Parity & Static Purging...")
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT content FROM skill WHERE id = 'hadith-source-provenance'")
    content = c.fetchone()[0]
    conn.close()

    # U02: Field Parity
    assert "data.explanation" in content or "explanation" in content, "Skill must refer to explanation field"
    assert "(غير متاح في المصدر المسترجع)" in content, "Skill must mandate (غير متاح في المصدر المسترجع) when reference is missing"
    assert "فتح الباري" not in content or "يُحظر قطعياً وصف الشرح بأنه 'اقتباس حرفي من فتح الباري'" in content, "Must not claim verbatim Fath al-Bari without source proof"

    # U08: Purging static placeholders
    assert "5214" not in content, "Hardcoded 5214 must be purged from template"
    assert "دار طوق النجاة" not in content or "يُحظر قطعياً اختلاق دور نشر" in content, "Static sample publishers must be purged from template"
    assert "{hadith_id}" in content, "Parameterized {hadith_id} must be present"

    print("  -> PASS: Source provenance enforces field parity, honest missing metadata, and purges static values.")

def test_u03_occurrence_id_and_coverage_limits():
    print("[TEST U03] Occurrence ID Priority & Transparent Coverage Limits...")
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT content FROM skill WHERE id = 'hadith-search-record'")
    content = c.fetchone()[0]
    conn.close()

    assert "occurrence_id" in content, "Skill must mandate occurrence_id"
    assert "الأولوية القصوى" in content, "occurrence_id must have highest priority"
    assert "limit=20" in content, "Skill must address limit=20"
    assert "لا يثبت استيعاب" in content or "حدود التغطية" in content, "Must honestly state limit does not prove total exhaustion"
    assert "invalid_reference" in content, "Must handle invalid_reference properly"

    print("  -> PASS: occurrence_id prioritized and search limits stated transparently.")

def test_u06_adaptive_output_layout():
    print("[TEST U06] Adaptive Output Engine in System Prompt...")
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT params FROM model WHERE id = 'bayan-unified-pilot'")
    params = json.loads(c.fetchone()[0])
    prompt = params["system"]
    conn.close()

    assert "المحرك التكيفي" in prompt, "System prompt must include Adaptive Output Engine"
    assert "الاستفسار المباشر" in prompt, "Must support direct concise answers"
    assert "مسار التعريف بالإسلام" in prompt, "Must support Islam guide track"
    assert "التحقيق الحديثي الشامل" in prompt, "Must activate full 7 sections only when requested"
    assert "لا تفرض تقريراً بحثياً جامداً" in prompt, "Must explicitly ban rigid 7 sections on simple queries"

    print("  -> PASS: Adaptive Output Engine verified in bayan-unified-pilot system prompt.")

def test_vps_exports():
    print("[TEST EXPORTS] VPS Sync Packages Verification...")
    with open("hadith_skills_vps_export.json", "r", encoding="utf-8") as f:
        skills = json.load(f)
    assert len(skills) == 7, f"Expected 7 skills in export, found {len(skills)}"
    skill_ids = [s["id"] for s in skills]
    expected_skills = [
        "hadith-search-record",
        "hadith-takhrij-compare",
        "hadith-mermaid-architect",
        "hadith-sharh-scholar",
        "hadith-rijal-critic",
        "hadith-source-provenance",
        "hadith-islam-guide"
    ]
    for es in expected_skills:
        assert es in skill_ids, f"Skill {es} missing from export"

    with open("hadith_models_vps_export.json", "r", encoding="utf-8") as f:
        models = json.load(f)
    pilot = next((m for m in models if m["id"] == "bayan-unified-pilot"), None)
    assert pilot is not None, "bayan-unified-pilot missing from export"
    assert len(pilot["meta"]["skillIds"]) == 7, "Pilot must have all 7 skills in export"
    assert "hadith_bayan_topics" in pilot["meta"]["toolIds"], "Topics tool missing in pilot export"

    print("  -> PASS: VPS export files verified with all 7 skills and updated pilot model.")

def main():
    print("=======================================================")
    print("RUNNING AUTOMATED TEST SUITE: TASKS U01 THROUGH U08")
    print("=======================================================\n")
    test_u05_snapshot_and_baseline_integrity()
    test_u04_islam_guide_and_topics_tool()
    test_u01_u07_mermaid_rules()
    test_u02_u08_source_provenance_and_static_purging()
    test_u03_occurrence_id_and_coverage_limits()
    test_u06_adaptive_output_layout()
    test_vps_exports()
    print("\n=======================================================")
    print("ALL TESTS PASSED: 100% SUCCESS ACROSS U01-U08!")
    print("=======================================================")

if __name__ == "__main__":
    main()
