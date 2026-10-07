"""
Automated Test for Tahweel [ح] Multi-Path Isnad DAG and Evidence-Based Family Chain Resolution.
Verifies:
1. Exactly 3 complete transmission routes for Muslim 32:8 (due to co-teachers 'إسحاق بن إبراهيم، وابن أبي خلف').
2. Pure raw mentions without fabricated identities or grades ('عمرو', 'سفيان', 'عبيد الله' retain status='ambiguous').
3. Contextual relative resolution ('عن أبيه' -> أبو بردة, 'عن جده' -> أبو موسى الأشعري رضي الله عنه).
4. Pure Prophetic endpoint (clean separation of referral note 'نحو حديث شعبة' and exception notes).
5. Route isolation: every path contains ONLY its own nodes and edges.
6. Synthetic / unknown test verification (zero fabricated reliability grades).
7. Full backward compatibility with single-chain hadiths (Bukhari 1:1).
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
from hadith.isnad.parser import IsnadParser
from hadith.isnad.resolver import NarratorResolver
from hadith.isnad.graph import IsnadGraphBuilder

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

        # 1. Must produce exactly 3 complete transmission routes (not 2!)
        self.assertIn("paths", data)
        self.assertEqual(len(data["paths"]), 3, f"Expected 3 complete transmission routes, found {len(data['paths'])}")

        # 2. Raw mention names preserved without synthetic name expansions
        node_names = [n["name"] for n in data["nodes"]]
        self.assertIn("رسول الله ﷺ", node_names)
        self.assertIn("جده", node_names)
        self.assertIn("ابيه", node_names)
        self.assertTrue(any("سعيد" in n and "برده" in n for n in node_names))
        self.assertIn("عمرو", node_names)
        self.assertIn("سفيان", node_names)
        self.assertIn("عبيد الله", node_names)
        self.assertTrue(any("محمد بن عباد" in n for n in node_names))
        self.assertTrue(any("اسحاق بن ابراهيم" in n or "إسحاق" in n for n in node_names))
        self.assertTrue(any("ابن ابي خلف" in n or "ابن أبي خلف" in n for n in node_names))
        self.assertTrue(any("زكريا" in n and "عدي" in n for n in node_names))
        self.assertTrue(any("زيد بن ابي انيسه" in n or "زيد بن أبي أنيسة" in n for n in node_names))

        # 3. Raw mentions must NOT be assumed to have specific expansions in raw name
        self.assertNotIn("عمرو بن دينار", node_names, "Raw mention 'عمرو' must not be auto-expanded to 'عمرو بن دينار'")
        self.assertNotIn("سفيان بن عيينة", node_names, "Raw mention 'سفيان' must not be auto-expanded to 'سفيان بن عيينة'")
        self.assertNotIn("عبيد الله بن عمرو الرقي", node_names, "Raw mention 'عبيد الله' must not be auto-expanded to 'عبيد الله بن عمرو الرقي'")

        # 4. Ambiguous bare mentions must be flagged as ambiguous with candidate lists
        amr_node = next(n for n in data["nodes"] if n["name"] == "عمرو")
        self.assertEqual(amr_node["status"], "ambiguous")
        self.assertTrue(len(amr_node.get("candidates") or []) > 0)

        sufyan_node = next(n for n in data["nodes"] if n["name"] == "سفيان")
        self.assertEqual(sufyan_node["status"], "ambiguous")
        self.assertTrue(len(sufyan_node.get("candidates") or []) > 0)

        ubayd_node = next(n for n in data["nodes"] if n["name"] == "عبيد الله")
        self.assertEqual(ubayd_node["status"], "ambiguous")
        self.assertTrue(len(ubayd_node.get("candidates") or []) > 0)

        # 5. Evidence-based relative resolution:
        # 'جده' must resolve to Abu Musa al-Ash'ari as sahabi
        grandfather_node = next(n for n in data["nodes"] if n["name"] == "جده")
        self.assertIn("أبو موسى الأشعري", grandfather_node.get("canonical_name", ""))
        self.assertEqual(grandfather_node["status"], "sahabi")

        # 'ابيه' must resolve to Abu Burda
        father_node = next(n for n in data["nodes"] if n["name"] == "ابيه")
        self.assertTrue("أبو بردة" in (father_node.get("canonical_name") or "") or "ابو برده" in (father_node.get("canonical_name") or ""))

        # 6. Prophet node must be clean (no matn pollution)
        prophet_node = next(n for n in data["nodes"] if n["id"] == "P")
        self.assertEqual(prophet_node["name"], "رسول الله ﷺ")
        self.assertNotIn("نحو حديث", prophet_node["name"])

        # 7. Clean separation of referral notes and exception notes
        self.assertIsNotNone(data.get("referral_note"))
        self.assertTrue("شعبة" in data["referral_note"] or "شعبه" in data["referral_note"])
        self.assertTrue(len(data.get("variant_notes") or []) > 0)

        # 8. Topological validity (DAG)
        topo = data.get("graph_topology", {})
        self.assertTrue(topo.get("is_valid_dag"), f"Graph DAG validation failed: {topo.get('validation_errors')}")

    def test_02_bukhari_single_chain_compatibility(self):
        # Bukhari 1:1 has single linear transmission chain
        res_raw = self.tool.get_hadith_isnad_tree(book="bukhari", hadith_number=1, chapter=1)
        res = json.loads(res_raw)
        self.assertEqual(res["status"], "ok")
        data = res["data"]

        self.assertEqual(len(data["paths"]), 1)
        self.assertEqual(data["paths"][0]["endpoint_type"], "marfu")
        self.assertGreaterEqual(len(data["nodes"]), 7)
        self.assertIn("graph TD", data["mermaid_diagram"])
        self.assertTrue(data.get("graph_topology", {}).get("is_valid_dag"))

    def test_03_synthetic_family_no_fabricated_grades(self):
        # Verify synthetic unknown family does NOT receive fake 'ثقة' grades
        resolver = NarratorResolver(self.tool.valves.DB_PATH)
        parser = IsnadParser()
        builder = IsnadGraphBuilder(resolver)

        synth_text = "حدثنا مجهول بن علان، عن أبيه، عن جده، عن النبي صلى الله عليه وسلم"
        parsed = parser.parse(synth_text)
        graph = builder.build_graph(parsed, "muslim", 9999, "synth:9999", "")

        for n in graph.nodes:
            if n["id"] in ("NS_1", "NS_2", "N1", "N2"):
                self.assertNotEqual(n.get("grade"), "ثقة", f"Synthetic node {n['name']} received fabricated 'ثقة' grade!")
                self.assertNotEqual(n.get("status"), "reliable")
                self.assertEqual(n.get("identity_status"), "unresolved")

    def test_04_isolated_route_nodes_and_edges(self):
        # Each path must contain ONLY its own transmission sequence
        res_raw = self.tool.get_hadith_isnad_tree(occurrence_id="itqan:muslim:32:8:6900c9057c27", book="muslim")
        res = json.loads(res_raw)
        data = res["data"]
        paths = data["paths"]

        self.assertEqual(len(paths), 3)

        # Path 1: via Muhammad b. Abbad
        p1_names = [n["name"] for n in paths[0]["nodes"]]
        self.assertTrue(any("محمد بن عباد" in n for n in p1_names))
        self.assertFalse(any("اسحاق" in n for n in p1_names))
        self.assertFalse(any("خلف" in n for n in p1_names))
        self.assertEqual(len(paths[0]["edges"]), len(paths[0]["nodes"]) - 1)

        # Path 2: via Ishaq b. Ibrahim
        p2_names = [n["name"] for n in paths[1]["nodes"]]
        self.assertTrue(any("اسحاق" in n for n in p2_names))
        self.assertFalse(any("خلف" in n for n in p2_names))
        self.assertFalse(any("محمد بن عباد" in n for n in p2_names))
        self.assertEqual(len(paths[1]["edges"]), len(paths[1]["nodes"]) - 1)

        # Path 3: via Ibn Abi Khalaf
        p3_names = [n["name"] for n in paths[2]["nodes"]]
        self.assertTrue(any("خلف" in n for n in p3_names))
        self.assertFalse(any("اسحاق" in n for n in p3_names))
        self.assertFalse(any("محمد بن عباد" in n for n in p3_names))
        self.assertEqual(len(paths[2]["edges"]), len(paths[2]["nodes"]) - 1)

if __name__ == "__main__":
    unittest.main()
