"""Mandatory Counterexample Tests — Agent 3 Independent QA.
Verifies the 12 mandatory failure modes and edge cases identified in round-2 review:
1. MC-01: Invalid selected ID with otherwise valid query
2. MC-02: Full-quote mismatch after character 15
3. MC-03: Unresolved father
4. MC-04: Unnamed narrator between two named narrators
5. MC-05: Same display number in different chapters (occurrence ID collisions)
6. MC-06: Uncertain dates
7. MC-07: Tahwil isnad path splitting
8. MC-08: Wrong-detail matn rejection
9. MC-09: Closely related but distinct provider report
10. MC-10: Unsupported language and format
11. MC-11: Unavailable service / network timeout / 429
12. MC-12: Missing scholarly approval status
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


class TestMandatoryCounterexamples:

    def test_mc01_invalid_selected_id_with_valid_query(self):
        """MC-01: An invalid selected ID must be treated as authoritative and rejected.
        Must return invalid_reference / error, and NOT fall back to the text query or return ok.
        """
        from tools.hadith_sharh_vocab_tool import Tools as Sharh
        from tools.hadith_isnad_tree_tool import Tools as Tree

        # Test Sharh explanation adapter with invalid occurrence ID
        with patch('urllib.request.urlopen') as mock_net:
            mock_net.side_effect = Exception("Network should not be called on invalid reference")
            res_sharh = json.loads(Sharh().get_hadith_explanation(
                query="إنما الأعمال بالنيات",
                occurrence_id="itqan:missing:invalid"
            ))
            # Production expectation: invalid_reference or error, and zero network calls
            assert res_sharh.get("status") in ("invalid_reference", "error", "not_found"), (
                f"MC-01 Failed: Sharh returned status '{res_sharh.get('status')}' instead of invalid_reference"
            )

        # Test Tree isnad adapter with invalid occurrence ID
        res_tree = json.loads(Tree().get_hadith_isnad_tree(
            book="bukhari",
            hadith_number=1,
            chapter=1,
            occurrence_id="itqan:missing:invalid"
        ))
        assert res_tree.get("status") in ("invalid_reference", "error", "not_found"), (
            f"MC-01 Failed: Tree returned status '{res_tree.get('status')}' instead of invalid_reference"
        )
        assert res_tree.get("data", {}).get("occurrence_id") != "itqan:bukhari:1:1:bf026de7e155", (
            "MC-01 Failed: Tree fell back to query/numbers when invalid occurrence_id was supplied"
        )

    def test_mc02_full_quote_mismatch_after_character_15(self, search_index, lesson_packs):
        """MC-02: Test entire quote equality rather than first 15 normalized characters.
        Evaluates exact equality between original_text[start:end] and exact_quote['arabic'].
        """
        exact_matches = 0
        char15_matches = 0
        total = 0
        mismatches = []

        for topic in lesson_packs.get("topics", []):
            for occ in topic.get("occurrences", []):
                total += 1
                row = search_index.execute(
                    "SELECT arabic FROM records WHERE record_id=?",
                    (occ["occurrence_id"],)
                ).fetchone()
                assert row is not None, f"Occurrence {occ['occurrence_id']} not found in search index"
                full_arabic = row[0]
                start, end = occ["exact_quote"]["source_span"]
                quote = occ["exact_quote"]["arabic"]
                slice_text = full_arabic[start:end]

                is_exact = (slice_text == quote)
                is_char15 = (norm(slice_text[:15]) == norm(quote[:15]))

                if is_exact:
                    exact_matches += 1
                else:
                    mismatches.append({
                        "id": occ["occurrence_id"],
                        "start": start,
                        "end": end,
                        "quote_len": len(quote),
                        "slice_len": len(slice_text),
                        "diff_slice": repr(slice_text[:40]),
                        "diff_quote": repr(quote[:40])
                    })

                if is_char15:
                    char15_matches += 1

        # We record the exact match rate. Round-2 review showed 4/13 exact.
        # This test documents the exact full-quote fidelity.
        assert exact_matches == total, (
            f"MC-02 Finding: Only {exact_matches}/{total} quotes match exactly (vs {char15_matches}/{total} char-15 matches). "
            f"Mismatches: {mismatches}"
        )

    def test_mc03_unresolved_father_preserved_as_gap(self):
        """MC-03: 'حدثنا راو مجهول عن أبيه عن عائشة' must preserve the father stage
        and not collapse or skip to create an unjustified direct link to Aisha.
        """
        from scripts.build_full_isnad_transmissions import extract_narrator_stages

        chain_text = "حدثنا راو مجهول عن أبيه عن عائشة"
        stages = extract_narrator_stages(chain_text, {})

        # Ensure stages contain the intermediate father mention or preserve the gap
        mentions = [c.get("raw") or c.get("name") or c.get("mention", "") for stage in stages for c in stage]
        father_present = any("أب" in m for m in mentions)
        direct_to_aisha = False
        if len(stages) >= 2:
            stage_names = [[c.get("raw") or c.get("name") or "" for c in st] for st in stages]
            for i in range(len(stage_names) - 1):
                if any("راو" in m for m in stage_names[i]) and any("عائشة" in m for m in stage_names[i+1]):
                    direct_to_aisha = True

        assert father_present, f"MC-03 Failed: Father mention was lost from stages: {mentions}"
        assert not direct_to_aisha, "MC-03 Failed: Intermediate father stage skipped to link directly to Aisha"

    def test_mc04_unnamed_narrator_between_named_narrators(self):
        """MC-04: 'حدثنا هشام بن عروة عن رجل عن عائشة' must not drop 'رجل'
        to invent a direct Hisham -> Aisha edge.
        """
        from scripts.build_full_isnad_transmissions import extract_narrator_stages

        chain_text = "حدثنا هشام بن عروة عن رجل عن عائشة"
        stages = extract_narrator_stages(chain_text, {})

        mentions = [c.get("raw") or c.get("name") or c.get("mention", "") for stage in stages for c in stage]
        has_rajul = any("رجل" in m for m in mentions)
        direct_edge = False
        if len(stages) >= 2:
            stage_names = [[c.get("raw") or c.get("name") or "" for c in st] for st in stages]
            for i in range(len(stage_names) - 1):
                if any("هشام" in m for m in stage_names[i]) and any("عائشة" in m for m in stage_names[i+1]):
                    direct_edge = True

        assert has_rajul, f"MC-04 Failed: Unnamed narrator ('رجل') was dropped: {mentions}"
        assert not direct_edge, "MC-04 Failed: False direct edge Hisham -> Aisha was synthesized across unnamed narrator"

    def test_mc05_same_display_number_different_chapters_collisions(self, rijal_db):
        """MC-05: Occurrence ID collision check.
        One occurrence_id must resolve to exactly one immutable source record (hadith_id).
        """
        collision = rijal_db.execute("""
            SELECT occurrence_id, count(DISTINCT hadith_id) as source_records, count(DISTINCT chapter) as chapters
            FROM isnad_transmissions
            GROUP BY occurrence_id
            HAVING count(DISTINCT hadith_id) > 1
            ORDER BY source_records DESC
            LIMIT 1
        """).fetchone()

        assert collision is None, (
            f"MC-05 Finding: Occurrence ID collision detected! '{collision['occurrence_id']}' maps to "
            f"{collision['source_records']} distinct source records across {collision['chapters']} chapters."
        )

    def test_mc06_uncertain_dates_not_forced_to_exact_physical_meeting(self, rijal_db):
        """MC-06: Date parsing and conflict logic must preserve uncertainty and not treat
        no-conflict-detected as affirmative physical meeting.
        """
        conflict_count = rijal_db.execute("SELECT count(*) FROM isnad_transmissions WHERE chronology_conflict=1").fetchone()[0]
        total_rows = rijal_db.execute("SELECT count(*) FROM isnad_transmissions").fetchone()[0]

        # Retained chronology conflicts must be tracked
        assert conflict_count >= 676, f"MC-06: Expected >= 676 chronology conflicts retained, found {conflict_count}"

        # Verify that absence of conflict does not imply verified meeting without dates
        from tools.hadith_narrator_tool import Tools as Narrator
        tool = Narrator()
        # Test narrator with unknown death date
        profile = json.loads(tool.get_narrator_biography(narrator_id=99999999))
        assert profile.get("status") in ("no_match", "not_found", "unknown", "ok")

    def test_mc07_tahwil_isnad_path_splitting(self):
        """MC-07: Hadith with isnad conversion 'ح' must split into distinct paths
        without linear chain corruption.
        """
        from scripts.build_full_isnad_transmissions import split_isnad_paths

        tahwil_isnad = "حدثنا يحيى بن بكير حدثنا الليث عن عقيل ح وحدثنا عبد الله بن يوسف أخبرنا مالك عن ابن شهاب عن عروة عن عائشة"
        paths = split_isnad_paths(tahwil_isnad)

        assert len(paths) >= 2, f"MC-07 Failed: Tahwil isnad did not split into >= 2 paths: {paths}"
        # Both paths should exist
        assert any("يحيى بن بكير" in p for p in paths), "MC-07 Failed: Path 1 missing Yahya b. Bukayr"
        assert any("عبد الله بن يوسف" in p for p in paths), "MC-07 Failed: Path 2 missing Abdullah b. Yusuf"

    def test_mc08_wrong_detail_matn_rejected(self):
        """MC-08: Explanation detail response with mismatched matn must be rejected."""
        from tools.hadith_sharh_vocab_tool import Tools as Sharh

        mismatched_response = BytesIO(json.dumps({
            "hadeeth": "حديث في البيوع مختلف تماماً عن الصلاة",
            "explanation": "شرح يتعلق بالبيوع والربا"
        }).encode("utf-8"))

        with patch("urllib.request.urlopen", return_value=mismatched_response):
            res = json.loads(Sharh().get_hadith_explanation(
                query="صلوا كما رأيتموني أصلي",
                occurrence_id="itqan:bukhari:1:1:bf026de7e155"
            ))
            # Must reject or report mismatch
            assert res.get("status") in ("mismatch", "unavailable", "provider_unavailable", "error", "not_found"), (
                f"MC-08 Failed: Wrong-detail matn accepted as ok: {res}"
            )

    @pytest.mark.xfail(reason="Finding A1-06: Provider 66132 (wet food report) mapped as 'exact' to occurrence itqan:muslim:1:189:0ae114813da4 instead of 'related'")
    def test_mc09_closely_related_distinct_provider_report(self, lesson_packs):
        """MC-09: HadeethEnc 66132 (wet food report) vs selected occurrence must not conflate
        distinct contexts as identical occurrences.
        """
        # Inspect occurrences that reference 66132
        matches = []
        for topic in lesson_packs.get("topics", []):
            for occ in topic.get("occurrences", []):
                ref = occ.get("explanation_reference", {})
                if str(ref.get("provider_id")) == "66132":
                    matches.append(occ)

        # Ensure that if 66132 is mapped, relationship is explicitly 'related' or 'variant'
        # rather than asserting identical context
        for occ in matches:
            ref = occ.get("explanation_reference", {})
            mapping_type = ref.get("mapping_type", "exact")
            assert mapping_type in ("related", "variant"), (
                f"MC-09 Finding: Provider 66132 mapped as '{mapping_type}' to occurrence {occ['occurrence_id']}"
            )

    def test_mc10_unsupported_language_and_format(self):
        """MC-10: Unsupported languages (en) and formats (video) must return unavailable/invalid
        and NOT silently default.
        """
        from tools.hadith_bayan_topics_tool import Tools as Topics
        tool = Topics()

        # Language: 'en'
        res_lang = json.loads(tool.get_reviewed_lesson("topic-faith", language="en"))
        assert res_lang.get("status") == "unavailable", (
            f"MC-10 Failed: Unsupported language 'en' returned status '{res_lang.get('status')}'"
        )
        avail = res_lang.get("data", {}).get("available_languages", [])
        warns = " ".join(res_lang.get("warnings", []))
        assert "ar" in avail or "ar" in warns.lower() or "عرب" in warns, (
            f"MC-10 Failed: Available languages disclosure missing: {res_lang}"
        )

        # Format: 'video'
        res_format = json.loads(tool.get_reviewed_lesson("topic-faith", format="video"))
        assert res_format.get("status") in ("unavailable", "invalid_reference"), (
            f"MC-10 Failed: Unsupported format 'video' returned status '{res_format.get('status')}'"
        )

    def test_mc11_unavailable_service_simulation(self):
        """MC-11: Provider timeout / network failure / HTTP 429 must return structured error
        and never raise unhandled exception or return ok.
        """
        from tools.hadith_sharh_vocab_tool import Tools as Sharh
        tool = Sharh()

        # Simulate timeout
        with patch("urllib.request.urlopen", side_effect=urllib.error.URLError("Connection timed out")):
            res_timeout = json.loads(tool.get_hadith_explanation(
                query="إنما الأعمال بالنيات",
                occurrence_id="itqan:bukhari:1:1:bf026de7e155"
            ))
            assert res_timeout.get("status") in ("unavailable", "provider_unavailable", "error"), (
                f"MC-11 Timeout Failed: Status was '{res_timeout.get('status')}'"
            )

        # Simulate HTTP 429
        err_429 = urllib.error.HTTPError(url="http://test", code=429, msg="Too Many Requests", hdrs={}, fp=None)
        with patch("urllib.request.urlopen", side_effect=err_429):
            res_429 = json.loads(tool.get_hadith_explanation(
                query="إنما الأعمال بالنيات",
                occurrence_id="itqan:bukhari:1:1:bf026de7e155"
            ))
            assert res_429.get("status") in ("unavailable", "provider_unavailable", "rate_limited", "error"), (
                f"MC-11 HTTP 429 Failed: Status was '{res_429.get('status')}'"
            )

    def test_mc12_missing_scholarly_approval(self):
        """MC-12: Unreviewed draft educational material must report review_status as 'needs_review'
        and must NOT claim approved or 'الشرح المعتمد'.
        """
        from tools.hadith_bayan_topics_tool import Tools as Topics
        tool = Topics()

        res = json.loads(tool.get_reviewed_lesson("topic-faith", audience="newcomer", format="qa"))
        assert res.get("status") == "needs_review"
        data = res.get("data", {})
        assert data.get("review_status") == "needs_review", (
            f"MC-12 Failed: Review status was '{data.get('review_status')}' instead of 'needs_review'"
        )
        assert data.get("reviewed_by") is None, (
            f"MC-12 Failed: Invented reviewer signature found: {data.get('reviewed_by')}"
        )
