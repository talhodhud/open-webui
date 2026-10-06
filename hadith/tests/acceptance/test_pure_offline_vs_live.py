"""Pure Offline vs Live Provider Smoke Checks — Agent 3 Independent QA.
Separates pure local offline operations (no network) from live external provider requests.
"""
from io import BytesIO
import json
from pathlib import Path
import sqlite3
import urllib.request
import urllib.error
import pytest

ROOT = Path(__file__).resolve().parents[2]


# ==============================================================================
# Pure Offline Tests (Guaranteed zero network I/O)
# ==============================================================================
class TestPureOfflineSuite:

    def test_offline_01_phrase_search_local_index(self):
        """Pure offline phrase search on local search_index.sqlite."""
        from tools.hadith_corpus_search_tool import Tools as Corpus
        tool = Corpus()
        res = json.loads(tool.search_hadith_corpus(query="الأعمال بالنيات", book="bukhari", limit=3))
        assert res.get("status") == "ok", f"Offline phrase search failed: {res}"
        matches = res.get("data", {}).get("results") or res.get("data", {}).get("matches", [])
        assert len(matches) > 0, "No matches found in offline phrase search"

    def test_offline_02_rijal_transmissions_local_db(self):
        """Pure offline isnad transmission lookup from local hadith_rijal.db."""
        from tools.hadith_narrator_tool import Tools as Narrator
        tool = Narrator()
        res = json.loads(tool.get_narrator_link_evidence(book="bukhari", student_id=173, teacher_id=874, limit=2))
        assert res.get("status") == "ok", f"Offline transmission evidence lookup failed: {res}"
        items = res.get("data", {}).get("evidence_items", [])
        assert len(items) > 0, "Offline transmission lookup returned no items"

    def test_offline_03_bayan_topics_local_packs(self):
        """Pure offline topic evidence extraction using local JSON packs."""
        from tools.hadith_bayan_topics_tool import Tools as Topics
        tool = Topics()
        res = json.loads(tool.get_topic_evidence("topic-mercy"))
        assert res.get("status") == "ok", f"Offline topic evidence failed: {res}"
        data = res.get("data", {})
        assert len(data.get("claim_evidence", [])) > 0, "No claim evidence in offline topic mercy"

    def test_offline_04_isnad_tree_local_generation(self):
        """Pure offline isnad tree generation."""
        from tools.hadith_isnad_tree_tool import Tools as Tree
        tool = Tree()
        res = json.loads(tool.get_hadith_isnad_tree(occurrence_id="itqan:bukhari:1:1:bf026de7e155"))
        assert res.get("status") == "ok", f"Offline isnad tree generation failed: {res}"
        assert len(res.get("data", {}).get("nodes", [])) >= 5


# ==============================================================================
# Live Provider Smoke Checks (External network I/O with rate-limit tolerance)
# ==============================================================================
class TestLiveProviderSmokeChecks:

    def test_live_01_hadeethenc_api_reachability(self):
        """Smoke check: probe HadeethEnc API endpoint.
        Gracefully records HTTP 429 rate limit or network unavailability without crash.
        """
        url = "https://hadeethenc.com/api/v1/hadeeths/one/?language=ar&id=4560"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Agent3-QA"})
        try:
            with urllib.request.urlopen(req, timeout=5) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                assert "hadeeth" in data or "title" in data, "HadeethEnc payload missing expected fields"
                print("\n[Live Provider] HadeethEnc API reachable (HTTP 200).")
        except urllib.error.HTTPError as e:
            if e.code == 429:
                pytest.skip("HadeethEnc returned HTTP 429 (Rate Limited) during smoke check; provider alive but throttled.")
            else:
                pytest.fail(f"HadeethEnc API returned unexpected HTTP error: {e.code} {e.reason}")
        except urllib.error.URLError as e:
            pytest.skip(f"HadeethEnc API unreachable due to network environment: {e.reason}")

    def test_live_02_sharh_provider_lookup(self):
        """Smoke check: Sharh tool invoking live HadeethEnc lookup."""
        from tools.hadith_sharh_vocab_tool import Tools as Sharh
        tool = Sharh()
        try:
            res = json.loads(tool.get_hadith_explanation(
                query="إنما الأعمال بالنيات",
                occurrence_id="itqan:bukhari:1:1:bf026de7e155"
            ))
            # Status can be ok, unavailable (if 429 or network down)
            assert res.get("status") in ("ok", "unavailable", "provider_unavailable", "rate_limited", "not_found")
        except urllib.error.HTTPError as e:
            if e.code == 429:
                pytest.skip("Sharh live lookup rate-limited (HTTP 429).")
            else:
                raise
        except urllib.error.URLError as e:
            pytest.skip(f"Sharh live lookup network unavailable: {e}")
