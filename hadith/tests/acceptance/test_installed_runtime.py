"""Installed Runtime Acceptance Tests — Agent 3 Independent QA.
Verifies the installed Open WebUI environment (webui.db and live endpoints)
separately from workspace development files.
Evaluates:
- Installed models inventory and tool bindings
- Installed tool definitions vs workspace versions (hash drift)
- Knowledge base attachment status for hadith-islam-guide
- Live HTTP availability of Open WebUI service (port 8080)
"""
import ast
import hashlib
import json
from pathlib import Path
import sqlite3
import urllib.request
import pytest

ROOT = Path(__file__).resolve().parents[2]
WEBUI_DB = Path(r"C:\Users\mhdal\AppData\Local\Programs\Python\Python312\Lib\site-packages\open_webui\data\webui.db")

@pytest.fixture(scope="module")
def webui_conn():
    if not WEBUI_DB.exists():
        pytest.skip(f"webui.db not found at {WEBUI_DB}")
    c = sqlite3.connect(WEBUI_DB.as_uri() + "?mode=ro", uri=True)
    c.row_factory = sqlite3.Row
    c.execute("PRAGMA query_only=ON")
    yield c
    c.close()


class TestInstalledRuntimeEnvironment:

    def test_ir01_registered_models_inventory(self, webui_conn):
        """Verify registered Hadith models in webui.db."""
        rows = webui_conn.execute("SELECT id, name, base_model_id, meta, params FROM model WHERE id LIKE 'hadith%'").fetchall()
        model_ids = {r["id"] for r in rows}
        expected = {
            "hadith-model-1",
            "hadith-modular-agent",
            "hadith-phrase-poc",
            "hadith-rijal-agent",
            "hadith-islam-guide"
        }
        assert expected.issubset(model_ids), f"Missing models in installed runtime: {expected - model_ids}"

    @pytest.mark.xfail(reason="Runtime Limitation: hadith_bayan_topics is not yet registered in webui.db")
    def test_ir02_hadith_bayan_topics_installed_status(self, webui_conn):
        """Evaluate whether hadith_bayan_topics tool is installed in webui.db."""
        row = webui_conn.execute("SELECT id FROM tool WHERE id='hadith_bayan_topics'").fetchone()
        # Per round-2 review, hadith_bayan_topics is not yet registered in webui.db.
        # This test documents this runtime limitation.
        is_installed = row is not None
        assert is_installed, "Runtime Limitation: 'hadith_bayan_topics' tool is not registered in webui.db"

    @pytest.mark.xfail(reason="Runtime Drift: 5 installed tools in webui.db have hash drift against workspace versions")
    def test_ir03_tool_workspace_synchronization(self, webui_conn):
        """Check whether installed tools match current workspace tool code hashes."""
        mismatches = []
        for tid in ["hadith_corpus_search", "hadith_takhrij", "hadith_sharh_vocab", "hadith_isnad_tree", "hadith_narrator"]:
            row = webui_conn.execute("SELECT content FROM tool WHERE id=?", (tid,)).fetchone()
            if not row:
                mismatches.append((tid, "not_installed"))
                continue
            installed_content = (row["content"] or "").replace("\r\n", "\n")
            workspace_file = ROOT / "tools" / f"{tid}_tool.py"
            if not workspace_file.exists():
                mismatches.append((tid, "no_workspace_file"))
                continue
            workspace_content = workspace_file.read_text(encoding="utf-8").replace("\r\n", "\n")
            if installed_content != workspace_content:
                mismatches.append((tid, "hash_drift"))

        assert len(mismatches) == 0, f"Runtime Drift: Installed tools out of sync with workspace: {mismatches}"

    @pytest.mark.xfail(reason="Runtime Limitation: hadith-islam-guide lacks hadith_bayan_topics toolId and Knowledge collection binding")
    def test_ir04_hadith_islam_guide_model_bindings(self, webui_conn):
        """Check if hadith-islam-guide has required tools and Knowledge collection bound."""
        row = webui_conn.execute("SELECT meta FROM model WHERE id='hadith-islam-guide'").fetchone()
        assert row is not None, "hadith-islam-guide not found in webui.db"
        meta = json.loads(row["meta"] or "{}")
        tool_ids = meta.get("toolIds", [])
        knowledge = meta.get("knowledge")

        # Acceptance requirement: hadith-islam-guide needs bayan tool and verified Knowledge collection
        has_bayan = "hadith_bayan_topics" in tool_ids
        has_knowledge = knowledge is not None and len(knowledge) > 0

        assert has_bayan, f"Runtime Limitation: hadith-islam-guide toolIds={tool_ids} lacks hadith_bayan_topics"
        assert has_knowledge, f"Runtime Limitation: hadith-islam-guide knowledge={knowledge} is unbound"

    def test_ir05_live_open_webui_http_service(self):
        """Smoke check: Open WebUI HTTP server running on localhost:8080."""
        try:
            req = urllib.request.Request("http://127.0.0.1:8080/api/config", headers={"User-Agent": "Agent3-QA"})
            with urllib.request.urlopen(req, timeout=3) as resp:
                assert resp.status in (200, 401, 403), f"HTTP status was {resp.status}"
        except Exception as e:
            pytest.fail(f"Open WebUI service not reachable on 127.0.0.1:8080: {e}")
