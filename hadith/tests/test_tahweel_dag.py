"""
Automated Test for Tahweel [ح] Multi-Path Isnad DAG and Family Chain Resolution.
Verifies:
1. Tahweel (ح) and convergence (كلاهما عن) branching into 2 separate transmission paths.
2. Resolution of famous family chains (سعيد بن أبي بردة عن أبيه عن جده -> أبو بردة عامر -> أبو موسى الأشعري).
3. Pure Prophetic endpoint (no matn pollution in the Prophet node).
4. Full backward compatibility with single-chain hadiths (e.g. Bukhari 1:1).
"""

import os
import sys
import json
import unittest
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))
sys.path.insert(0, str(BASE_DIR.parent))

from tools.hadith_isnad_tree_tool import Tools as IsnadTools

class TestTahweelDAG(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tool = IsnadTools()

    def test_01_muslim_tahweel_dag(self):
        # Muslim 32:8 has Tahweel (ح) and convergence (كلاهما عن سعيد بن أبي بردة عن أبيه عن جده)
        res_raw = self.tool.get_hadith_isnad_tree(occurrence_id="itqan:muslim:32:8:6900c9057c27", book="muslim")
        res = json.loads(res_raw)
        self.assertEqual(res["status"], "ok")
        data = res["data"]

        # 1. Must produce multi-path representation
        self.assertIn("paths", data)
        self.assertGreaterEqual(len(data["paths"]), 2, "Expected at least 2 branched transmission paths")

        # 2. Must resolve family chain without ambiguous/unknown labels
        node_names = [n["name"] for n in data["nodes"]]
        self.assertIn("رسول الله ﷺ", node_names)
        self.assertIn("أبو موسى الأشعري رضي الله عنه", node_names)
        self.assertIn("أبو بردة عامر بن أبي موسى الأشعري", node_names)
        self.assertIn("سعيد بن ابي برده", node_names)

        # 3. Must contain branch 1 and branch 2 narrators
        self.assertIn("عمرو بن دينار", node_names)
        self.assertIn("سفيان بن عيينة", node_names)
        self.assertIn("محمد بن عباد المكي", node_names)
        self.assertIn("زيد بن أبي أنيسة", node_names)
        self.assertIn("عبيد الله بن عمرو الرقي", node_names)
        self.assertIn("زكرياء بن عدي", node_names)

        # 4. Prophet node must be clean (no matn pollution)
        prophet_node = next(n for n in data["nodes"] if n["id"] == "P")
        self.assertEqual(prophet_node["name"], "رسول الله ﷺ")
        self.assertNotIn("نحو حديث", prophet_node["name"])

        # 5. Mermaid diagram must contain branching and convergence
        mermaid = data["mermaid_diagram"]
        self.assertIn("graph TD", mermaid)
        self.assertIn("P --> NS_1", mermaid)
        self.assertIn("COMP", mermaid)

    def test_02_bukhari_single_chain_compatibility(self):
        # Bukhari 1:1 has single linear transmission chain
        res_raw = self.tool.get_hadith_isnad_tree(book="bukhari", hadith_number=1, chapter=1)
        res = json.loads(res_raw)
        self.assertEqual(res["status"], "ok")
        data = res["data"]

        self.assertEqual(len(data["paths"]), 1)
        self.assertGreaterEqual(len(data["nodes"]), 5)
        self.assertIn("graph TD", data["mermaid_diagram"])

if __name__ == "__main__":
    unittest.main()
