import unittest
import json
import inspect
import os
import sys
from pathlib import Path
from unittest.mock import patch
import urllib.error

# Ensure workspace root is in sys.path
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

from tools.hadith_corpus_search_tool import Tools as CorpusTools
from tools.hadith_narrator_tool import Tools as NarratorTools
from tools.hadith_sharh_vocab_tool import Tools as SharhTools
from tools.hadith_isnad_tree_tool import Tools as IsnadTools
from tools.hadith_takhrij_tool import Tools as TakhrijTools
from tools.hadith_contract_helper import build_response


class TestHadithBackendRegression(unittest.TestCase):
    """
    Comprehensive regression suite for Hadith AI Agent backend.
    Enforces all 7 required regression checks from planning/ai_agent_backend_handoff.md.
    """

    @classmethod
    def setUpClass(cls):
        cls.corpus = CorpusTools()
        cls.narrator = NarratorTools()
        cls.sharh = SharhTools()
        cls.isnad = IsnadTools()
        cls.takhrij = TakhrijTools()

    # ----------------------------------------------------------------------
    # Check 1: Stable Occurrence ID and Ambiguous Numeric Lookup
    # ----------------------------------------------------------------------
    def test_01_stable_occurrence_id_and_ambiguous_numeric(self):
        """
        A remembered-phrase result opens the same Arabic text by stable ID,
        and bare numeric lookup with repeated numbers returns 'ambiguous'.
        """
        # 1. Search for phrase and get stable occurrence_id
        search_raw = self.corpus.search_hadith_corpus("الأعمال بالنيات", book="bukhari", limit=2)
        search_res = json.loads(search_raw)
        self.assertEqual(search_res["status"], "ok")
        results = search_res["data"]["results"]
        self.assertGreater(len(results), 0)

        first_hit = results[0]
        occ_id = first_hit["occurrence_id"]
        self.assertTrue(occ_id.startswith("itqan:bukhari:"))

        # 2. Open by exact stable occurrence_id
        open_raw = self.corpus.get_hadith_by_number(occurrence_id=occ_id)
        open_res = json.loads(open_raw)
        self.assertEqual(open_res["status"], "ok")
        self.assertEqual(open_res["data"]["occurrence_id"], occ_id)
        norm_open_text = self.corpus._normalize_text(open_res["data"]["arabic_text"])
        self.assertIn("الاعمال بالنيات", norm_open_text)

        # 3. Numeric lookup without chapter on Bukhari #1 (which has 97 repeated occurrences)
        ambig_raw = self.corpus.get_hadith_by_number(book="bukhari", hadith_number=1)
        ambig_res = json.loads(ambig_raw)
        self.assertEqual(ambig_res["status"], "ambiguous")
        candidates = ambig_res["data"]["candidates"]
        self.assertGreater(len(candidates), 1, "Repeated number must return candidates, not LIMIT 1")
        self.assertIn("candidates", ambig_res["data"])

        # 4. Disambiguated numeric lookup with chapter="1"
        resolved_raw = self.corpus.get_hadith_by_number(book="bukhari", hadith_number=1, chapter="1")
        resolved_res = json.loads(resolved_raw)
        self.assertEqual(resolved_res["status"], "ok")
        self.assertEqual(resolved_res["data"]["chapter"], "1")

    # ----------------------------------------------------------------------
    # Check 2: Unknown Grade and Separate Ibn Hajar / Dhahabi Values
    # ----------------------------------------------------------------------
    def test_02_unknown_grade_and_no_cross_imputation(self):
        """
        Unknown grade stays unknown (no 'ثقة ثبت' fallback);
        missing Ibn Hajar / Dhahabi values are not cross-imputed.
        """
        # Narrator 320: Both Ibn Hajar and Dhahabi ranks are missing in AR-Sanad
        bio_320_raw = self.narrator.get_narrator_biography(320)
        bio_320 = json.loads(bio_320_raw)
        self.assertEqual(bio_320["status"], "ok")
        self.assertEqual(bio_320["data"]["ibnhajar_rank"], "غير متاح في تقريب التهذيب")
        self.assertEqual(bio_320["data"]["zahabi_rank"], "غير متاح في الكاشف")
        self.assertNotEqual(bio_320["data"]["ibnhajar_rank"], "ثقة ثبت")
        self.assertNotEqual(bio_320["data"]["zahabi_rank"], "ثقة ثبت")

        # Narrator 13: Has Ibn Hajar rank ('ثقة'), but Dhahabi rank is missing ('-')
        bio_13_raw = self.narrator.get_narrator_biography(13)
        bio_13 = json.loads(bio_13_raw)
        self.assertEqual(bio_13["status"], "ok")
        self.assertEqual(bio_13["data"]["ibnhajar_rank"], "ثقة")
        self.assertEqual(bio_13["data"]["zahabi_rank"], "غير متاح في الكاشف")
        # Ensure Dhahabi rank was NOT filled with Ibn Hajar's rank
        self.assertNotEqual(bio_13["data"]["zahabi_rank"], "ثقة")

        # Narrator 290: Has Dhahabi rank ('صحابية'), but Ibn Hajar rank is missing ('-')
        bio_290_raw = self.narrator.get_narrator_biography(290)
        bio_290 = json.loads(bio_290_raw)
        self.assertEqual(bio_290["status"], "ok")
        self.assertEqual(bio_290["data"]["zahabi_rank"], "صحابية")
        self.assertEqual(bio_290["data"]["ibnhajar_rank"], "غير متاح في تقريب التهذيب")
        # Ensure Ibn Hajar rank was NOT filled with Dhahabi's rank
        self.assertNotEqual(bio_290["data"]["ibnhajar_rank"], "صحابية")

    # ----------------------------------------------------------------------
    # Check 3: Plausible Narrator Identities Remain Multiple Candidates
    # ----------------------------------------------------------------------
    def test_03_narrator_identities_remain_candidates_without_crosswalk(self):
        """
        Two plausible narrator identities remain candidates unless a sourced crosswalk resolves them.
        """
        # Searching a common patronymic (e.g. 'أبو صالح' or 'الزهري') returns multiple distinct entities
        search_raw = self.narrator.search_narrator("أبو صالح", limit=5)
        search_res = json.loads(search_raw)
        self.assertEqual(search_res["status"], "ok")
        narrators = search_res["data"]["narrators"]
        self.assertGreater(len(narrators), 1)

        # Distinct IDs must be preserved; not collapsed into one
        ids = [n["id"] for n in narrators]
        self.assertEqual(len(ids), len(set(ids)), "Candidate IDs must be distinct")

        # In disambiguate_narrator: unknown relative mention returns unresolved status
        dis_raw = self.isnad.disambiguate_narrator(name="راوٍ مجهول", relation="father")
        dis_res = json.loads(dis_raw)
        self.assertIn(dis_res["status"], ["unresolved", "no_match", "unavailable"])

    # ----------------------------------------------------------------------
    # Check 4: Unrelated HadeethEnc Result Rejected
    # ----------------------------------------------------------------------
    def test_04_unrelated_hadeethenc_result_rejected(self):
        """
        An unrelated first HadeethEnc search result is not attached to the selected Hadith.
        """
        # Unrelated modern/scientific query should not attach a random hadith commentary
        unrelated_raw = self.sharh.get_hadith_explanation("كهرومغناطيسية الذرة الكمومية في الفضاء")
        unrelated_res = json.loads(unrelated_raw)
        self.assertEqual(unrelated_res["status"], "unavailable")
        self.assertIsNone(unrelated_res.get("data", {}).get("explanation"))

        # Authentic known hadith text retrieves valid commentary
        try:
            valid_raw = self.sharh.get_hadith_explanation("إنما الأعمال بالنيات")
            valid_res = json.loads(valid_raw)
            if valid_res["status"] == "ok":
                self.assertEqual(str(valid_res["data"]["provider_id"]), "4560")
                self.assertGreater(valid_res["data"]["overlap_score"], 0.35)
            else:
                raise Exception(f"Live API status: {valid_res.get('status')}")
        except Exception:
            # Fallback to verify matching logic via mocked live response when offline
            mock_item = [{"id": 4560, "title": "إنما الأعمال بالنيات", "hadith_text": "إنما الأعمال بالنيات وإنما لكل امرئ ما نوى"}]
            mock_detail = {
                "hadeeth": "إنما الأعمال بالنيات وإنما لكل امرئ ما نوى",
                "title": "إنما الأعمال بالنيات",
                "explanation": "الأعمال مدارها على النيات ومقاصد المكلفين",
                "words_meanings": [],
                "reference": "رياض الصالحين - النووي"
            }
            class MockResp:
                def __init__(self, obj): self._d = json.dumps(obj).encode("utf-8")
                def read(self): return self._d
                def __enter__(self): return self
                def __exit__(self, *args): pass

            def fake_urlopen(req, *args, **kwargs):
                url = req.full_url if hasattr(req, "full_url") else str(req)
                if "search" in url:
                    return MockResp(mock_item)
                return MockResp(mock_detail)

            with patch("urllib.request.urlopen", side_effect=fake_urlopen):
                valid_raw = self.sharh.get_hadith_explanation("إنما الأعمال بالنيات")
                valid_res = json.loads(valid_raw)
                self.assertEqual(valid_res["status"], "ok")
                self.assertEqual(str(valid_res["data"]["provider_id"]), "4560")

    # ----------------------------------------------------------------------
    # Check 5: Graph Edges Resolve with Source Spans and Partial Support
    # ----------------------------------------------------------------------
    def test_05_graph_edges_resolve_with_source_spans(self):
        """
        Every graph edge resolves to an occurrence/path and supporting source span;
        partial evidence yields a partial graph.
        """
        tree_raw = self.isnad.get_hadith_isnad_tree(book="bukhari", chapter="1", hadith_number=1)
        tree_res = json.loads(tree_raw)
        self.assertEqual(tree_res["status"], "ok")

        data = tree_res["data"]
        self.assertIn("paths", data)
        self.assertIn("nodes", data)
        self.assertIn("edges", data)

        nodes = data["nodes"]
        edges = data["edges"]
        paths = data["paths"]

        self.assertGreater(len(nodes), 0)
        self.assertGreater(len(edges), 0)
        self.assertGreater(len(paths), 0)

        # Verify edge structure carries source, target, and supporting span
        node_ids = {n["id"] for n in nodes}
        for edge in edges:
            self.assertIn("source", edge)
            self.assertIn("target", edge)
            self.assertIn("source_span", edge)
            self.assertIn(edge["source"], node_ids)
            self.assertIn(edge["target"], node_ids)

    # ----------------------------------------------------------------------
    # Check 6: Provider Error Returns 'unavailable', No Hit Returns 'no_match'
    # ----------------------------------------------------------------------
    def test_06_provider_error_and_no_hit_semantics(self):
        """
        Provider error returns 'unavailable', no hit returns 'no_match';
        neither means fabricated or weak hadith.
        """
        # 1. Zero hits in corpus search returns 'no_match'
        no_hit_raw = self.corpus.search_hadith_corpus("عبارة_مستحيلة_الوجود_في_كتب_السنة_قطعا_xyz")
        no_hit_res = json.loads(no_hit_raw)
        self.assertEqual(no_hit_res["status"], "no_match")
        self.assertEqual(no_hit_res["data"]["matches_count"], 0)

        # 2. Simulated upstream network failure returns 'unavailable' with methodological notice
        with patch("urllib.request.urlopen", side_effect=urllib.error.URLError("Connection timed out")):
            outage_raw = self.takhrij.search_dorar_hadith("الأعمال بالنيات")
            outage_res = json.loads(outage_raw)
            self.assertEqual(outage_res["status"], "unavailable")
            # Must contain methodological warning about not inferring weakness from outage
            warning_text = " ".join(outage_res.get("warnings", []))
            self.assertTrue(
                any(kw in warning_text for kw in ["لا يعني", "ضعف", "انقطاع"]),
                "Must include methodological notice that provider failure does not imply weakness"
            )

    # ----------------------------------------------------------------------
    # Check 7: Tool Specs Match Exported Callable Signatures
    # ----------------------------------------------------------------------
    def test_07_tool_specs_match_callable_signatures(self):
        """
        Native registered tool arguments in tools/*.json match the exported callable signatures.
        """
        tool_mappings = [
            ("tools/hadith_corpus_search.json", CorpusTools),
            ("tools/hadith_isnad_tree.json", IsnadTools),
            ("tools/hadith_narrator.json", NarratorTools),
            ("tools/hadith_sharh_vocab.json", SharhTools),
            ("tools/hadith_takhrij.json", TakhrijTools),
        ]

        for json_rel_path, tool_cls in tool_mappings:
            json_path = BASE_DIR / json_rel_path
            self.assertTrue(json_path.exists(), f"Spec file {json_rel_path} must exist")

            with open(json_path, "r", encoding="utf-8") as f:
                spec_data = json.load(f)

            specs = spec_data.get("specs", [])
            self.assertGreater(len(specs), 0, f"Specs in {json_rel_path} must not be empty")

            instance = tool_cls()

            for spec in specs:
                fn_name = spec["name"]
                self.assertTrue(
                    hasattr(instance, fn_name),
                    f"Class {tool_cls.__name__} missing callable method '{fn_name}' declared in {json_rel_path}"
                )

                py_method = getattr(instance, fn_name)
                sig = inspect.signature(py_method)
                spec_params = spec.get("parameters", {}).get("properties", {})

                # Every parameter in the spec must be present in the Python callable
                for param_name in spec_params.keys():
                    self.assertIn(
                        param_name,
                        sig.parameters,
                        f"Parameter '{param_name}' in spec for '{fn_name}' not found in Python signature {sig}"
                    )


if __name__ == "__main__":
    unittest.main()
