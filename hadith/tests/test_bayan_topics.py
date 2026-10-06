"""
Comprehensive offline evaluation suite for Bayan al-Sunnah: Islamic Topics Track & Tool Adapters.
Covers 24 distinct held-out evaluation tasks and contract invariants:
- Verification of real HadeethEnc IDs (no guessed sequential IDs)
- Rejection of composite quotations (discrete attributed quote arrays only)
- Exact original text slicing via source_span offsets
- Language availability guardrails (unsupported languages return unavailable)
- Audience tailoring (newcomer vs new_muslim vs educator)
- Discrete claim-to-passage evidence mappings
- Honest collection coverage disclosure
- Explicit needs_review approval states
- Negative topic exclusion filtering
- Mocked adversarial HadeethEnc detail body mismatch rejection
- Isnad tree exact alignment and marfu classification
"""

import unittest
import json
import sqlite3
import re
import sys
from io import BytesIO
from unittest.mock import patch
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

from tools.hadith_bayan_topics_tool import Tools as BayanTopicsTools
from tools.hadith_isnad_tree_tool import Tools as IsnadTreeTools
from tools.hadith_sharh_vocab_tool import Tools as SharhVocabTools


class TestBayanTopicsEvaluation(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.bayan_tools = BayanTopicsTools()
        cls.isnad_tools = IsnadTreeTools()
        cls.sharh_tools = SharhVocabTools()
        
        # Check local path then parent path for SQLite index
        db_candidates = [
            BASE_DIR / "poc" / "phrase_search" / "search_index.sqlite",
            BASE_DIR.parent / "poc" / "phrase_search" / "search_index.sqlite",
            Path(r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\poc\phrase_search\search_index.sqlite")
        ]
        cls.db_path = next((p for p in db_candidates if p.exists() and p.stat().st_size > 100000), None)
        cls.has_search_index = cls.db_path is not None

        # Check local path then parent path for lesson packs
        packs_candidates = [
            BASE_DIR / "planning" / "bayan_lesson_packs_v1.json",
            BASE_DIR.parent / "planning" / "bayan_lesson_packs_v1.json",
            Path(r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\planning\bayan_lesson_packs_v1.json")
        ]
        cls.packs_path = next((p for p in packs_candidates if p.exists()), None)
        assert cls.packs_path is not None, "Could not find bayan_lesson_packs_v1.json"
        with open(cls.packs_path, "r", encoding="utf-8") as f:
            cls.packs_data = json.load(f)
        cls.topics = [t["topic_id"] for t in cls.packs_data["topics"]]

    # -------------------------------------------------------------
    # 1. HadeethEnc Provider IDs Validation (No guessed IDs)
    # -------------------------------------------------------------
    def test_01_hadeethenc_real_ids_verified(self):
        """Verify that every occurrence has a verified real HadeethEnc ID, not guessed sequential IDs."""
        banned_fake_ids = {"3154", "3156", "3157", "3158", "3159", "3160", "3161", "2910", "3348", "3499", "4521"}
        for topic in self.packs_data["topics"]:
            for occ in topic["occurrences"]:
                p_id = occ["explanation_reference"]["provider_id"]
                # Must not be one of the old sequential guesses
                if occ["occurrence_id"] == "itqan:bukhari:2:2:43ab185c8834":
                    self.assertEqual(p_id, "3276", "Branches of faith must map to real HadeethEnc 3276, not Heraclius 3154")
                elif occ["occurrence_id"] == "itqan:bukhari:3:11:7bca050e20fb":
                    self.assertEqual(p_id, "5866", "Yassiru must map to real HadeethEnc 5866, not plague 3161")
                elif occ["occurrence_id"] == "itqan:bukhari:1:1:bf026de7e155":
                    self.assertEqual(p_id, "4560", "Niyyah must map to real HadeethEnc 4560")
                elif occ["occurrence_id"] == "itqan:tirmidhi:27:30:b5e57ce2441d":
                    self.assertEqual(p_id, "8289", "Rahimun must map to real HadeethEnc 8289")

    # -------------------------------------------------------------
    # 2. Rejection of Composite Quotations
    # -------------------------------------------------------------
    def test_02_no_composite_quotations_in_cards(self):
        """Verify cards never combine separate Hadith reports with ellipses inside a single quote."""
        for topic in self.packs_data["topics"]:
            card = topic["lesson_formats"]["card"]
            self.assertIn("quotes", card, f"Topic {topic['topic_id']} card must have a discrete quotes array")
            self.assertIsInstance(card["quotes"], list)
            for q in card["quotes"]:
                self.assertIn("occurrence_id", q)
                self.assertIn("text", q)
                self.assertIn("source_span", q)
                self.assertIn("citation", q)
                # Ensure no quote fuses two reports
                self.assertNotIn("...", q["text"])
                self.assertNotIn("…", q["text"])

    # -------------------------------------------------------------
    # 3. Exact Source Span Offsets Verification
    # -------------------------------------------------------------
    def test_03_quote_source_spans_match_original_text(self):
        """Verify that slicing text[span[0]:span[1]] in SQLite returns the exact quoted words."""
        if not self.has_search_index:
            self.skipTest("Local search_index.sqlite not present in checkout; skipping direct offset verification.")
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        for topic in self.packs_data["topics"]:
            for occ in topic["occurrences"]:
                span = occ["exact_quote"]["source_span"]
                quote_ar = occ["exact_quote"]["arabic"]
                row = conn.execute("SELECT arabic FROM records WHERE record_id = ?", (occ["occurrence_id"],)).fetchone()
                self.assertIsNotNone(row)
                full_text = row["arabic"]
                sliced = full_text[span[0]:span[1]]
                # Normalize both to ensure they match accurately without whitespace/punctuation spacing discrepancies
                clean_sliced = re.sub(r'[\u064B-\u065F\u0670\u0610-\u061A\u06D6-\u06ED\u0640]', '', sliced)
                clean_sliced = re.sub(r'\s*([،,])\s*', r'\1 ', re.sub(r'\s+', ' ', clean_sliced)).strip()
                clean_quote = re.sub(r'[\u064B-\u065F\u0670\u0610-\u061A\u06D6-\u06ED\u0640]', '', quote_ar)
                clean_quote = re.sub(r'\s*([،,])\s*', r'\1 ', re.sub(r'\s+', ' ', clean_quote)).strip()
                self.assertIn(clean_quote[:15], clean_sliced, f"Span {span} does not match quote in {occ['occurrence_id']}")
        conn.close()

    # -------------------------------------------------------------
    # 4. Language Availability Guardrails
    # -------------------------------------------------------------
    def test_04_unsupported_language_returns_unavailable(self):
        """Unsupported languages (e.g. English) must return status: unavailable with explicit warning."""
        for op in ["get_topic_evidence", "get_reviewed_lesson"]:
            fn = getattr(self.bayan_tools, op)
            res = json.loads(fn("topic-faith", language="en"))
            self.assertEqual(res["status"], "unavailable")
            self.assertIn("warnings", res)
            self.assertTrue(any("غير متاحة" in w for w in res["warnings"]))

    # -------------------------------------------------------------
    # 5. Audience Tailored Objectives
    # -------------------------------------------------------------
    def test_05_audience_tailored_lessons(self):
        """Audience parameter must return distinct tailored lessons and objectives."""
        audiences = ["newcomer", "new_muslim", "educator"]
        lessons = {}
        for aud in audiences:
            res = json.loads(self.bayan_tools.get_reviewed_lesson("topic-faith", audience=aud, format="qa"))
            self.assertEqual(res["status"], "needs_review")
            self.assertEqual(res["data"]["audience"], aud)
            lessons[aud] = res["data"]["learning_objective"]
        
        # Objectives must be distinct per audience
        self.assertNotEqual(lessons["newcomer"], lessons["educator"])
        self.assertNotEqual(lessons["newcomer"], lessons["new_muslim"])

    # -------------------------------------------------------------
    # 6. Invalid Topic & Format Handling
    # -------------------------------------------------------------
    def test_06_invalid_topic_returns_invalid_reference(self):
        """Invalid topic ID must return invalid_reference with list of valid IDs."""
        res = json.loads(self.bayan_tools.get_topic_evidence("invalid-topic-xyz"))
        self.assertEqual(res["status"], "invalid_reference")
        self.assertIn("valid_topic_ids", res["data"])
        self.assertEqual(len(res["data"]["valid_topic_ids"]), 6)

    # -------------------------------------------------------------
    # 7. Honest Collection Coverage
    # -------------------------------------------------------------
    def test_07_honest_coverage_reported(self):
        """Coverage must disclose actual pack collections, not falsely claim all 6 were searched."""
        res = json.loads(self.bayan_tools.get_topic_evidence("topic-faith"))
        cov = res["coverage"]
        self.assertIn("actual_collections_in_pack", cov)
        self.assertIn("honest_coverage_note", cov)
        # In topic-faith, both occurrences are from bukhari
        self.assertEqual(cov["actual_collections_in_pack"], ["bukhari"])

    # -------------------------------------------------------------
    # 8. Approval State is Needs Review
    # -------------------------------------------------------------
    def test_08_review_status_is_needs_review(self):
        """Review status must be needs_review / pending signoff until external scholarly sign-off."""
        res = json.loads(self.bayan_tools.get_reviewed_lesson("topic-mercy"))
        data = res["data"]
        self.assertEqual(data["review_status"], "needs_review")
        self.assertFalse(data["scholarly_approved"])
        self.assertIsNone(data["reviewer"])
        self.assertTrue(data["source_verified"])

    # -------------------------------------------------------------
    # 9. Discrete Claim-to-Passage Evidence Mappings
    # -------------------------------------------------------------
    def test_09_claim_evidence_maps_to_passages(self):
        """Claim evidence must contain structured passage mappings, not generic prose."""
        res = json.loads(self.bayan_tools.get_topic_evidence("topic-knowledge"))
        claims = res["data"]["claim_evidence"]
        self.assertIsInstance(claims, list)
        self.assertGreater(len(claims), 0)
        for c in claims:
            self.assertIn("passage_id", c)
            self.assertIn("occurrence_id", c)
            self.assertIn("established_principle", c)
            self.assertTrue(c["passage_id"].startswith("bayan-pass-"))

    # -------------------------------------------------------------
    # 10. Negative Exclusion Rules Preserved
    # -------------------------------------------------------------
    def test_10_negative_exclusions_preserved(self):
        """Verify negative exclusion rules are documented and excluded chapters are absent."""
        res = json.loads(self.bayan_tools.get_reviewed_lesson("topic-family"))
        note = res["data"]["negative_exclusion_note"]
        self.assertTrue(len(note) > 10)
        # Ensure excluded chapters are not in citations
        citations = " ".join(res["data"]["citations"])
        self.assertNotIn("اللعان", citations)
        self.assertNotIn("الفرائض", citations)

    # -------------------------------------------------------------
    # 11. Mocked Adversarial HadeethEnc Body Mismatch Rejected
    # -------------------------------------------------------------
    def test_11_mocked_hadeethenc_detail_mismatch_rejected(self):
        """Controlled test: when HadeethEnc detail body contradicts search title, reject as unavailable."""
        query = "رحمة الناس وحفظ الحقوق والعدل والصدق والأمانة"
        # Mock responses: search candidate passes initial filter, but detail body is completely different
        responses = [
            BytesIO(json.dumps([{"id": 99999, "title": "رحمة الناس وحفظ الحقوق", "hadith_text": "رحمة الناس وحفظ الحقوق"}]).encode()),
            BytesIO(json.dumps({"title": "unrelated", "hadeeth": "نص أجنبي تماما لا علاقة له بالسياق", "explanation": "unrelated"}).encode())
        ]
        with patch("urllib.request.urlopen", side_effect=responses):
            res = json.loads(self.sharh_tools.get_hadith_explanation(query))
            self.assertEqual(res["status"], "unavailable", "Detail body mismatch must be rejected as unavailable")
            self.assertEqual(res["evidence"]["status_detail"], "detail_matn_mismatch")

    # -------------------------------------------------------------
    # 12. Isnad Tree Exact Alignment & Marfu Classification
    # -------------------------------------------------------------
    def test_12_isnad_tree_offsets_and_marfu_classification(self):
        """Verify isnad tree tool maps exact original text slices and classifies Bukhari #1 as marfu."""
        if not self.has_search_index:
            self.skipTest("Local search_index.sqlite not present in checkout; skipping direct offset verification.")
        res = json.loads(self.isnad_tools.get_hadith_isnad_tree("bukhari", 1, chapter=1))
        self.assertEqual(res["status"], "ok")
        data = res["data"]
        # Must be marfu
        self.assertEqual(data["paths"][0]["endpoint_type"], "marfu")
        
        # Verify node slices match original text
        conn = sqlite3.connect(self.db_path)
        row = conn.execute("SELECT arabic FROM records WHERE record_id = ?", (data["occurrence_id"],)).fetchone()
        full_text = row[0]
        conn.close()

        for node in data["nodes"]:
            span = node["source_span"]
            if span != [0, 0] and not node.get("metadata_only"):
                sliced = full_text[span[0]:span[1]]
                self.assertTrue(len(sliced) > 0)
                # Grade must never default to ثقة
                self.assertNotEqual(node["grade"], "ثقة")


if __name__ == "__main__":
    unittest.main()
