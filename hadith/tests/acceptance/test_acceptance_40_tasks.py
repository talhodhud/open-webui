"""40 Distinct Acceptance Tasks Test Suite — Agent 3 Independent QA.
Covers:
- 12 introductory learning tasks across 6 topics
- 12 specialist tasks (takhrij, isnad, narrator networks, evidence)
- 8 exact lookup and citation fidelity tasks
- 8 missing / ambiguous / provider-failure cases
"""
from io import BytesIO
import json
from pathlib import Path
import re
import sqlite3
import urllib.error
from unittest.mock import patch
import pytest

ROOT = Path(__file__).resolve().parents[2]

def get_db(path):
    c = sqlite3.connect(path.as_uri() + '?mode=ro', uri=True)
    c.row_factory = sqlite3.Row
    c.execute('PRAGMA query_only=ON')
    return c

def norm(t):
    t = re.sub(r'[\u064B-\u065F\u0670\u0610-\u061A\u06D6-\u06ED\u0640]', '', t)
    return re.sub(r'\s+', ' ', t).strip()

@pytest.fixture(scope="module")
def search_index():
    return get_db(ROOT / 'poc/phrase_search/search_index.sqlite')

@pytest.fixture(scope="module")
def rijal_db():
    return get_db(ROOT / 'hadith_rijal.db')

@pytest.fixture(scope="module")
def lesson_packs():
    return json.loads((ROOT / 'planning/bayan_lesson_packs_v1.json').read_text(encoding='utf-8'))


# ==============================================================================
# Category 1: 12 Introductory Learning Tasks (Spanning 6 Topics)
# ==============================================================================
class TestCategory1IntroductoryLearning:

    @pytest.mark.parametrize("task_id,topic_id,audience,fmt", [
        ("T01", "topic-faith", "newcomer", "qa"),
        ("T02", "topic-faith", "educator", "two_minute"),
        ("T03", "topic-worship", "new_muslim", "card"),
        ("T04", "topic-worship", "newcomer", "two_minute"),
        ("T05", "topic-family", "educator", "qa"),
        ("T06", "topic-family", "new_muslim", "two_minute"),
        ("T07", "topic-knowledge", "newcomer", "card"),
        ("T08", "topic-knowledge", "educator", "qa"),
        ("T09", "topic-mercy", "newcomer", "qa"),
        ("T10", "topic-mercy", "new_muslim", "two_minute"),
        ("T11", "topic-fairness", "newcomer", "card"),
        ("T12", "topic-fairness", "educator", "qa"),
    ])
    def test_introductory_task(self, task_id, topic_id, audience, fmt):
        from tools.hadith_bayan_topics_tool import Tools as Topics
        tool = Topics()
        res = json.loads(tool.get_reviewed_lesson(topic_id, audience=audience, format=fmt, language="ar"))

        assert res.get("status") in ("needs_review", "ok"), f"Task {task_id} failed with status {res.get('status')}: {res.get('message')}"
        data = res.get("data", {})
        assert data.get("topic_id") == topic_id, f"Task {task_id} topic mismatch"
        assert data.get("audience") == audience, f"Task {task_id} audience mismatch"
        assert data.get("format") == fmt, f"Task {task_id} format mismatch"
        assert data.get("review_status") == "needs_review", f"Task {task_id} must have review_status 'needs_review'"
        assert "lesson_content" in data, f"Task {task_id} missing lesson_content"
        assert "occurrence_ids" in data or "quotes" in data, f"Task {task_id} missing occurrence_ids"
        assert len(data.get("occurrence_ids") or data.get("quotes") or []) > 0, f"Task {task_id} has empty evidence"


# ==============================================================================
# Category 2: 12 Specialist Tasks
# ==============================================================================
class TestCategory2SpecialistTasks:

    def test_t13_primary_narrator_lookup(self):
        from tools.hadith_narrator_tool import Tools as Narrator
        tool = Narrator()
        res = json.loads(tool.search_narrator(query="أبو هريرة", limit=5))
        assert res.get("status") == "ok", f"T13 failed: {res}"
        data = res.get("data", {})
        matches = data.get("narrators") or data.get("matches", [])
        assert len(matches) > 0, "T13: Abu Hurairah not found in Bukhari narrator search"

    def test_t14_student_network_extraction(self):
        from tools.hadith_narrator_tool import Tools as Narrator
        tool = Narrator()
        res = json.loads(tool.get_book_narrator_network(book="bukhari", narrator_name="الزهري", direction="students"))
        assert res.get("status") == "ok", f"T14 failed: {res}"
        network = res.get("data", {})
        transmitters = network.get("direct_transmitters", []) or network.get("strongest_links", [])
        assert len(transmitters) > 0, "T14: No student edges found for Al-Zuhri"

    def test_t15_teacher_network_extraction(self):
        from tools.hadith_narrator_tool import Tools as Narrator
        tool = Narrator()
        res = json.loads(tool.get_book_narrator_network(book="bukhari", narrator_name="مالك بن أنس", direction="teachers"))
        assert res.get("status") == "ok", f"T15 failed: {res}"
        network = res.get("data", {})
        transmitters = network.get("direct_transmitters", []) or network.get("strongest_links", [])
        assert len(transmitters) > 0, "T15: No teacher edges found for Malik b. Anas"

    def test_t16_link_evidence_verification(self):
        from tools.hadith_narrator_tool import Tools as Narrator
        tool = Narrator()
        res = json.loads(tool.get_narrator_link_evidence(book="bukhari", student_id=173, teacher_id=874, limit=3))
        assert res.get("status") == "ok", f"T16 failed: {res}"
        items = res.get("data", {}).get("evidence_items", [])
        assert len(items) > 0, "T16: No evidence items returned for Hisham -> Urwah"
        # Check text span or occurrence presence
        first = items[0]
        assert "occurrence_id" in first or "transmission_id" in first, "T16: Missing locator in evidence"

    def test_t17_multibook_cross_takhrij_niyyah(self):
        from tools.hadith_takhrij_tool import Tools as Takhrij
        tool = Takhrij()
        res = json.loads(tool.get_hadith_takhrij_summary(
            query="إنما الأعمال بالنيات"
        ))
        assert res.get("status") == "ok", f"T17 failed: {res}"
        data = res.get("data", {})
        assert data.get("total_records", 0) > 0, "T17: No takhrij records found for intentions hadith"

    def test_t18_takhrij_fraternal_love(self):
        from tools.hadith_takhrij_tool import Tools as Takhrij
        tool = Takhrij()
        res = json.loads(tool.get_hadith_takhrij_summary(
            query="لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه"
        ))
        assert res.get("status") == "ok", f"T18 failed: {res}"
        data = res.get("data", {})
        assert data.get("total_records", 0) > 0, "T18: No takhrij results for fraternal love hadith"

    def test_t19_isnad_tree_extraction_bukhari_1_1(self):
        from tools.hadith_isnad_tree_tool import Tools as Tree
        tool = Tree()
        res = json.loads(tool.get_hadith_isnad_tree(occurrence_id="itqan:bukhari:1:1:bf026de7e155"))
        assert res.get("status") == "ok", f"T19 failed: {res}"
        data = res.get("data", {})
        nodes = data.get("nodes", [])
        edges = data.get("edges", [])
        paths = data.get("paths", [])
        assert len(nodes) >= 5, f"T19: Expected >= 5 isnad nodes, got {len(nodes)}"
        assert len(edges) >= 4, f"T19: Expected >= 4 isnad edges, got {len(edges)}"
        assert len(paths) > 0, "T19: Expected at least one path"
        assert paths[0].get("endpoint_type") == "marfu", f"T19: Expected marfu classification, got {paths[0].get('endpoint_type')}"

    def test_t20_multichain_tree_extraction_speech_silence(self):
        from tools.hadith_isnad_tree_tool import Tools as Tree
        tool = Tree()
        res = json.loads(tool.get_hadith_isnad_tree(occurrence_id="itqan:bukhari:78:55:022c1dbdd753"))
        assert res.get("status") == "ok", f"T20 failed: {res}"
        data = res.get("data", {})
        assert len(data.get("nodes", [])) > 0, "T20: No nodes extracted for speech/silence hadith"

    def test_t21_chronology_conflict_flagging(self, rijal_db):
        conflicts = rijal_db.execute("SELECT count(*) FROM isnad_transmissions WHERE chronology_conflict=1").fetchone()[0]
        assert conflicts > 0, f"T21: No chronology conflict flags preserved in isnad_transmissions ({conflicts})"

    @pytest.mark.xfail(reason="Finding A2-07: hadith_narrator_tool uses unpermitted status 'invalid_argument' crashing contract helper")
    def test_t22_parameter_validation_direction_enforcement(self):
        from tools.hadith_narrator_tool import Tools as Narrator
        tool = Narrator()
        res = json.loads(tool.get_book_narrator_network(narrator_name="أبو هريرة", book="bukhari", direction="invalid_dir"))
        # Should reject or flag invalid parameter
        assert res.get("status") in ("invalid_parameter", "invalid_argument", "error", "unavailable"), (
            f"T22 Failed: Invalid direction silently accepted as status '{res.get('status')}'"
        )

    def test_t23_deterministic_mermaid_export_fidelity(self):
        from tools.hadith_isnad_tree_tool import Tools as Tree
        tool = Tree()
        res = json.loads(tool.get_hadith_isnad_tree(occurrence_id="itqan:bukhari:1:1:bf026de7e155"))
        assert res.get("status") == "ok"
        mermaid = res.get("data", {}).get("mermaid_diagram") or ""
        assert mermaid.startswith("flowchart") or mermaid.startswith("graph"), (
            f"T23 Failed: Invalid Mermaid syntax: {mermaid[:50]}"
        )
        assert "-->" in mermaid, "T23 Failed: Mermaid contains no directed edges"

    def test_t24_candidate_identity_preservation_homonyms(self):
        from tools.hadith_isnad_tree_tool import Tools as Tree
        tool = Tree()
        # Test ambiguous narrator resolution (Hisham b. Urwah -> father Urwah)
        res = json.loads(tool.disambiguate_narrator("هشام بن عروة", relation="father"))
        assert res.get("status") in ("resolved", "ok"), f"T24 failed: {res}"
        assert "عروة" in res.get("resolved_identity", "")


# ==============================================================================
# Category 3: 8 Exact Lookup and Citation Tasks
# ==============================================================================
class TestCategory3ExactLookupAndCitation:

    def test_t25_exact_lookup_bukhari_1_1(self, search_index):
        row = search_index.execute("SELECT record_id, collection, chapter_title, arabic FROM records WHERE record_id=?",
                                   ("itqan:bukhari:1:1:bf026de7e155",)).fetchone()
        assert row is not None, "T25: Bukhari 1:1 record not found"
        assert row["collection"] == "bukhari"
        assert "بدء الوحي" in row["chapter_title"] or "بدء الوحى" in row["chapter_title"] or "الوحي" in row["chapter_title"] or "الوحى" in row["chapter_title"]

    def test_t26_exact_lookup_bukhari_2_2(self, search_index):
        row = search_index.execute("SELECT record_id, collection, chapter_title, arabic FROM records WHERE record_id=?",
                                   ("itqan:bukhari:2:2:43ab185c8834",)).fetchone()
        assert row is not None, "T26: Bukhari 2:2 record not found"
        assert row["collection"] == "bukhari"
        assert "الإيمان" in row["chapter_title"]

    def test_t27_exact_lookup_tirmidhi_27_30(self, search_index):
        row = search_index.execute("SELECT record_id, collection, chapter_title, arabic FROM records WHERE record_id=?",
                                   ("itqan:tirmidhi:27:30:b5e57ce2441d",)).fetchone()
        assert row is not None, "T27: Tirmidhi record not found"
        assert row["collection"] == "tirmidhi"

    def test_t28_exact_lookup_bukhari_78_55(self, search_index):
        row = search_index.execute("SELECT record_id, collection, chapter_title, arabic FROM records WHERE record_id=?",
                                   ("itqan:bukhari:78:55:022c1dbdd753",)).fetchone()
        assert row is not None, "T28: Bukhari 78:55 record not found"
        assert row["collection"] == "bukhari"

    def test_t29_citation_fidelity_metadata(self, search_index):
        test_ids = [
            "itqan:bukhari:1:1:bf026de7e155",
            "itqan:muslim:1:1:f02ee7607561",
            "itqan:abudawud:1:1:5be94e894542"
        ]
        for tid in test_ids:
            row = search_index.execute("SELECT * FROM records WHERE record_id=?", (tid,)).fetchone()
            assert row is not None, f"T29: Record {tid} missing"
            assert len(row["arabic"]) > 20, f"T29: Record {tid} arabic text empty or truncated"
            assert len(row["chapter_title"]) > 0, f"T29: Record {tid} chapter empty"

    def test_t30_full_quote_exact_slice_match(self, search_index, lesson_packs):
        # Specific test for speech/silence hadith
        occ = None
        for t in lesson_packs.get("topics", []):
            for o in t.get("occurrences", []):
                if o.get("occurrence_id") == "itqan:bukhari:78:55:022c1dbdd753":
                    occ = o
                    break
        assert occ is not None, "T30: Target occurrence not found in lesson packs"
        row = search_index.execute("SELECT arabic FROM records WHERE record_id=?", (occ["occurrence_id"],)).fetchone()
        full_text = row[0]
        start, end = occ["exact_quote"]["source_span"]
        quote = occ["exact_quote"]["arabic"]
        assert full_text[start:end] == quote, "T30: Exact slice does not equal quote text"

    def test_t31_arabic_text_hash_integrity(self, search_index, lesson_packs):
        import hashlib
        mismatches = 0
        total = 0
        for t in lesson_packs.get("topics", []):
            for o in t.get("occurrences", []):
                total += 1
                row = search_index.execute("SELECT arabic FROM records WHERE record_id=?", (o["occurrence_id"],)).fetchone()
                db_hash = hashlib.sha256(row[0].encode("utf-8")).hexdigest()
                if db_hash != o.get("text_sha256"):
                    mismatches += 1
        assert mismatches == 0, f"T31: {mismatches}/{total} hashes mismatched against database"

    def test_t32_quote_span_offset_bounds(self, search_index, lesson_packs):
        for t in lesson_packs.get("topics", []):
            for o in t.get("occurrences", []):
                row = search_index.execute("SELECT arabic FROM records WHERE record_id=?", (o["occurrence_id"],)).fetchone()
                full_len = len(row[0])
                start, end = o["exact_quote"]["source_span"]
                assert 0 <= start < end <= full_len, (
                    f"T32: Span bounds invalid for {o['occurrence_id']}: [{start}, {end}], len={full_len}"
                )


# ==============================================================================
# Category 4: 8 Missing, Ambiguous, and Provider-Failure Cases
# ==============================================================================
class TestCategory4MissingAmbiguousProviderFailure:

    def test_t33_ambiguous_numeric_query_corpus(self):
        from tools.hadith_corpus_search_tool import Tools as Corpus
        tool = Corpus()
        res = json.loads(tool.search_hadith_corpus(query="1", book="all", limit=5))
        # Should not crash; should return ranked matches or prompt disambiguation
        assert res.get("status") in ("ok", "no_matches", "ambiguous"), f"T33 failed: {res}"

    def test_t34_missing_grade_handling_no_cross_imputation(self):
        from tools.hadith_narrator_tool import Tools as Narrator
        tool = Narrator()
        res = json.loads(tool.get_narrator_biography(narrator_id=9999999))
        assert res.get("status") in ("no_match", "not_found", "unknown", "ok")
        data = res.get("data", {})
        # Must not fabricate a grade or sahabi status
        grade = data.get("grade") or data.get("evaluation")
        assert grade != "صحابي" and grade != "ثقة", f"T34 Failed: Fabricated grade assigned: {grade}"

    def test_t35_unsupported_language_request(self):
        from tools.hadith_bayan_topics_tool import Tools as Topics
        tool = Topics()
        res = json.loads(tool.get_reviewed_lesson("topic-faith", audience="newcomer", format="qa", language="en"))
        assert res.get("status") == "unavailable", f"T35 Failed: Status was '{res.get('status')}'"

    def test_t36_unsupported_format_request(self):
        from tools.hadith_bayan_topics_tool import Tools as Topics
        tool = Topics()
        res = json.loads(tool.get_reviewed_lesson("topic-faith", audience="newcomer", format="video", language="ar"))
        assert res.get("status") in ("unavailable", "invalid_reference"), f"T36 Failed: Status was '{res.get('status')}'"

    def test_t37_external_provider_timeout_simulation(self):
        from tools.hadith_sharh_vocab_tool import Tools as Sharh
        tool = Sharh()
        with patch("urllib.request.urlopen", side_effect=urllib.error.URLError("Connection timed out")):
            res = json.loads(tool.get_hadith_explanation(
                query="إنما الأعمال بالنيات",
                occurrence_id="itqan:bukhari:1:1:bf026de7e155"
            ))
            assert res.get("status") in ("unavailable", "provider_unavailable", "error"), f"T37 Failed: Status was '{res.get('status')}'"

    def test_t38_external_provider_http_429_rate_limit(self):
        from tools.hadith_sharh_vocab_tool import Tools as Sharh
        tool = Sharh()
        err_429 = urllib.error.HTTPError(url="http://test", code=429, msg="Too Many Requests", hdrs={}, fp=None)
        with patch("urllib.request.urlopen", side_effect=err_429):
            res = json.loads(tool.get_hadith_explanation(
                query="إنما الأعمال بالنيات",
                occurrence_id="itqan:bukhari:1:1:bf026de7e155"
            ))
            assert res.get("status") in ("unavailable", "provider_unavailable", "rate_limited", "error"), f"T38 Failed: Status was '{res.get('status')}'"

    def test_t39_unavailable_commentary_clarification(self):
        from tools.hadith_sharh_vocab_tool import Tools as Sharh
        tool = Sharh()
        # Mock empty or 404 response from provider
        with patch("urllib.request.urlopen", return_value=BytesIO(json.dumps([]).encode("utf-8"))):
            res = json.loads(tool.get_hadith_explanation(
                query="حديث نادر",
                occurrence_id="itqan:abudawud:1:1:5be94e894542"
            ))
            assert res.get("status") in ("not_found", "unavailable", "ok"), f"T39 Failed: Status was '{res.get('status')}'"

    def test_t40_draft_educational_content_review_status(self):
        from tools.hadith_bayan_topics_tool import Tools as Topics
        tool = Topics()
        res = json.loads(tool.get_reviewed_lesson("topic-faith", audience="newcomer", format="qa"))
        assert res.get("status") in ("needs_review", "ok")
        data = res.get("data", {})
        assert data.get("review_status") == "needs_review", f"T40 Failed: Status was '{data.get('review_status')}'"
        assert data.get("reviewed_by") is None, f"T40 Failed: Reviewed by must be null until scholarly review"
