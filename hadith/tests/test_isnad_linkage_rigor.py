"""
Automated Rigor and Linkage Acceptance Test Suite.
Verifies all P0/P1 fixes from Agent 2 Narrator Linkage Review:
1. Structured death interval parsing & symmetric chronology.
2. Occurrence-level family resolution vs direct transmission.
3. Strict anti-bridging across gaps (رجل, امرأة, unresolved relatives).
4. Tahwil [ح] path splitting.
5. Canonical identity separation (Abdullah b. Amr 368 vs Ibn Umar 120 vs Umar 165).
6. Deterministic indexed query plan (SEARCH TABLE, zero scans).
7. Evidence lookup contract (get_narrator_link_evidence) with diacritized text spans.
8. Provenance schema integrity.
9. Zero occurrence collisions across distinct hadith records (112,994 hadiths).
10. Exact substring fidelity on authentic source text.
11. Bounded limits [1, 50], book validation, direction validation, and link ID scoping.
12. Validation of all 5 Codex Narrator Drawer fixtures.
"""

import unittest
import json
import sqlite3
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

from scripts.build_full_isnad_transmissions import (
    parse_death_interval,
    split_isnad_paths,
    extract_narrator_stages,
    assess_chronology,
    normalize_key,
    strip_diacritics
)
from tools.hadith_narrator_tool import Tools as NarratorTools

class TestIsnadLinkageRigor(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tool = NarratorTools()
        db_candidates = [
            BASE_DIR / 'hadith_rijal.db',
            BASE_DIR.parent / 'hadith_rijal.db',
            Path(r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\hadith_rijal.db")
        ]
        cls.db_path = next((p for p in db_candidates if p.exists() and p.stat().st_size > 100000000), None)
        cls.has_rijal_db = cls.db_path is not None

        fixtures_candidates = [
            BASE_DIR / 'fixtures' / 'narrator_drawer_evidence.json',
            BASE_DIR.parent / 'fixtures' / 'narrator_drawer_evidence.json',
            Path(r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\fixtures\narrator_drawer_evidence.json")
        ]
        cls.fixtures_path = next((p for p in fixtures_candidates if p.exists()), None)

    # -------------------------------------------------------------
    # 1. Structured Dates & Symmetric Chronology
    # -------------------------------------------------------------
    def test_01_structured_date_parsing(self):
        # Exact year
        self.assertEqual(parse_death_interval('180 هـ'), (180, 180))
        # Range
        self.assertEqual(parse_death_interval('بين 171 هـ و : 180 هـ'), (171, 180))
        # Multiple variants
        self.assertEqual(parse_death_interval('231 هـ ، أو 232 هـ ، أو 233 هـ'), (231, 233))
        # Unknown / dashes
        self.assertIsNone(parse_death_interval('-'))
        self.assertIsNone(parse_death_interval('غير معروف بدقة'))

    def test_02_reciprocal_edge_symmetry(self):
        # Synthetic pair from review: student death 140, teacher death 60 (diff = 80 <= 95)
        s_prof = {'id': 100, 'd_min': 140, 'd_max': 140}
        t_prof = {'id': 200, 'd_min': 60, 'd_max': 60}

        status, reason, conflict = assess_chronology(s_prof, t_prof)
        self.assertFalse(conflict, "Student 140 and Teacher 60 should have no conflict")
        self.assertEqual(status, "no_conflict_detected")

        # Impossible pair: student 280, teacher 50 (diff = 230 > 95)
        imp_s = {'id': 101, 'd_min': 280, 'd_max': 280}
        imp_t = {'id': 201, 'd_min': 50, 'd_max': 50}
        status_imp, reason_imp, conflict_imp = assess_chronology(imp_s, imp_t)
        self.assertTrue(conflict_imp, "Student 280 and Teacher 50 must trigger conflict flag")
        self.assertEqual(status_imp, "potential_conflict")

        # Unknown profile handling
        status_unk, _, conflict_unk = assess_chronology(s_prof, None)
        self.assertEqual(status_unk, "unknown")
        self.assertFalse(conflict_unk)

        # Production Function Bidirectional Test:
        # Verify that querying from teacher's perspective (students direction)
        # and from student's perspective (teachers direction) yields symmetric, conflict-free linkage.
        net_from_teacher = json.loads(self.tool.get_book_narrator_network(
            book='bukhari', narrator_name='أبو هريرة', direction='students'
        ))
        net_from_student = json.loads(self.tool.get_book_narrator_network(
            book='bukhari', narrator_name='الأعرج', direction='teachers'
        ))
        self.assertEqual(net_from_teacher['status'], 'ok')
        self.assertEqual(net_from_student['status'], 'ok')

        # Al-A'raj (566) must appear in Abu Hurairah's students
        students_of_abu_hurairah = [t['id'] for t in net_from_teacher['data']['direct_transmitters']]
        self.assertIn(566, students_of_abu_hurairah, "Al-A'raj (566) must be in Abu Hurairah's students")

        # Abu Hurairah (106) must appear in Al-A'raj's teachers
        teachers_of_alaraj = [t['id'] for t in net_from_student['data']['direct_transmitters']]
        self.assertIn(106, teachers_of_alaraj, "Abu Hurairah (106) must be in Al-A'raj's teachers")

    # -------------------------------------------------------------
    # 2. Occurrence-Level Family Parsing vs Direct Transmission
    # -------------------------------------------------------------
    def test_03_occurrence_family_vs_direct_routes(self):
        registry = {
            173: {'id': 173, 'name': 'هشام بن عروة', 'd_min': 146, 'd_max': 146},
            874: {'id': 874, 'name': 'عروة بن الزبير', 'd_min': 94, 'd_max': 94},
            342: {'id': 342, 'name': 'عائشة أم المؤمنين', 'd_min': 58, 'd_max': 58}
        }

        # Case A: Explicit 'عن أبيه' present
        text_with_father = "حدثنا هشام بن عروة عن أبيه عن عائشة"
        stages_a = extract_narrator_stages(text_with_father, registry)
        self.assertEqual(len(stages_a), 3)
        self.assertEqual(stages_a[0][0]['name'], 'هشام بن عروة')
        self.assertEqual(stages_a[1][0]['name'], 'عروة بن الزبير')
        self.assertEqual(stages_a[1][0]['relation_type'], 'father')
        self.assertTrue(stages_a[1][0]['resolution_rule'].startswith('occurrence_kinship:father'))
        self.assertEqual(stages_a[2][0]['name'], 'عائشة أم المؤمنين')

        # Case B: Direct transmission WITHOUT 'عن أبيه'
        text_direct = "حدثنا هشام بن عروة عن عائشة"
        stages_b = extract_narrator_stages(text_direct, registry)
        self.assertEqual(len(stages_b), 2)
        self.assertEqual(stages_b[0][0]['name'], 'هشام بن عروة')
        self.assertEqual(stages_b[1][0]['name'], 'عائشة أم المؤمنين')
        self.assertEqual(stages_b[1][0]['relation_type'], 'direct')
        # Crucial P0 test: Urwah must NOT be injected when the occurrence text does not contain 'عن أبيه'!
        self.assertNotEqual(stages_b[1][0]['name'], 'عروة بن الزبير')

    # -------------------------------------------------------------
    # 3. Strict Anti-Bridging Across Gaps (P0 Accept Criteria)
    # -------------------------------------------------------------
    def test_04_anti_bridging_across_gaps(self):
        registry = {
            173: {'id': 173, 'name': 'هشام بن عروة', 'd_min': 146, 'd_max': 146},
            342: {'id': 342, 'name': 'عائشة أم المؤمنين', 'd_min': 58, 'd_max': 58}
        }
        # Isnad containing an unnamed transmitter: "عن رجل"
        gap_text = "حدثنا هشام بن عروة عن رجل عن عائشة"
        stages = extract_narrator_stages(gap_text, registry)
        
        # Must produce exactly 3 stages: Hisham -> Gap Node (رجل) -> Aisha
        self.assertEqual(len(stages), 3, "Gap transmitter must be retained as an explicit stage")
        self.assertEqual(stages[0][0]['name'], 'هشام بن عروة')
        self.assertEqual(stages[1][0]['name'], 'رجل')
        self.assertIsNone(stages[1][0]['id'], "Unnamed transmitter must have id=None")
        self.assertEqual(stages[1][0]['relation_type'], 'unresolved_gap')
        self.assertEqual(stages[1][0]['state'], 'unresolved_gap')
        self.assertEqual(stages[2][0]['name'], 'عائشة أم المؤمنين')

        # Formed edges must be (Hisham -> Gap) and (Gap -> Aisha)
        edges = []
        for i in range(len(stages) - 1):
            s = stages[i][0]
            t = stages[i+1][0]
            edges.append((s['name'], t['name']))

        self.assertIn(('هشام بن عروة', 'رجل'), edges)
        self.assertIn(('رجل', 'عائشة أم المؤمنين'), edges)
        # CRITICAL NEGATIVE ASSERTION: Never bridge Hisham directly to Aisha!
        self.assertNotIn(('هشام بن عروة', 'عائشة أم المؤمنين'), edges, "Direct bridging across gap is strictly forbidden!")

    # -------------------------------------------------------------
    # 4. Tahwil [ح] Path Splitting
    # -------------------------------------------------------------
    def test_05_tahwil_path_splitting(self):
        isnad_with_tahwil = "حدثنا قتيبة بن سعيد حدثنا ليث عن ابن شهاب ح وحدثنا محمد بن رمح أخبرنا الليث عن الزهري"
        paths = split_isnad_paths(isnad_with_tahwil)
        self.assertEqual(len(paths), 2, "Must split into two independent isnad paths")
        self.assertIn("قتيبة", paths[0])
        self.assertIn("محمد بن رمح", paths[1])

    # -------------------------------------------------------------
    # 5. Canonical Identities & Disambiguation
    # -------------------------------------------------------------
    def test_06_canonical_identities_distinct(self):
        if not self.has_rijal_db:
            self.skipTest('Large 1GB hadith_rijal.db not present in lightweight checkout')
        conn = sqlite3.connect(self.db_path)
        c = conn.cursor()
        # Abdullah b. Amr = 368
        r_amr = c.execute("SELECT id, name FROM arsanad_narrators WHERE id=368").fetchone()
        self.assertIn("عمرو بن العاص", r_amr[1])
        # Abdullah b. Umar = 120
        r_umar = c.execute("SELECT id, name FROM arsanad_narrators WHERE id=120").fetchone()
        self.assertIn("عمر بن الخطاب", r_umar[1])
        self.assertNotIn("عمرو", r_umar[1])
        # Al-Qasim b. Muhammad = 1167
        r_qasim = c.execute("SELECT id, name FROM arsanad_narrators WHERE id=1167").fetchone()
        self.assertIn("القاسم بن محمد", r_qasim[1])
        # Umar b. al-Khattab = 165
        r_farooq = c.execute("SELECT id, name FROM arsanad_narrators WHERE id=165").fetchone()
        self.assertIn("عمر بن الخطاب", r_farooq[1])
        conn.close()

    # -------------------------------------------------------------
    # 6. Query Plan (SEARCH TABLE, Zero Table Scans)
    # -------------------------------------------------------------
    def test_07_query_plan_uses_index(self):
        if not self.has_rijal_db:
            self.skipTest('Large 1GB hadith_rijal.db not present in lightweight checkout')
        conn = sqlite3.connect(self.db_path)
        c = conn.cursor()
        plan = c.execute(
            "EXPLAIN QUERY PLAN SELECT id FROM isnad_transmissions WHERE book=? AND teacher_id=?",
            ('bukhari', 106)
        ).fetchall()
        conn.close()
        plan_text = " ".join([str(p) for p in plan])
        self.assertIn("SEARCH", plan_text)
        self.assertNotIn("SCAN isnad_transmissions", plan_text)

    # -------------------------------------------------------------
    # 7. Occurrence Evidence API (get_narrator_link_evidence)
    # -------------------------------------------------------------
    def test_08_evidence_api_lookup(self):
        # Direct lookup on Al-A'raj -> Abu Hurairah in Bukhari
        res_raw = self.tool.get_narrator_link_evidence(book='bukhari', student_id=566, teacher_id=106, limit=2)
        res = json.loads(res_raw)
        self.assertEqual(res.get('status'), 'ok')
        items = res.get('data', {}).get('evidence_items', [])
        self.assertGreater(len(items), 0)
        first = items[0]
        self.assertEqual(first['student']['id'], 566)
        self.assertEqual(first['teacher']['id'], 106)
        self.assertEqual(first['relation_type'], 'direct')
        # Handle diacritics authentically
        self.assertIn(
            self.tool._normalize_arabic('الأعرج'),
            self.tool._normalize_arabic(first['isnad_text_span'])
        )
        self.assertTrue(len(first['hadith_excerpt']) > 10)

        # Occurrence family hop lookup: Hisham -> Urwah
        res_raw_fam = self.tool.get_narrator_link_evidence(book='bukhari', student_id=173, teacher_id=874, limit=2)
        res_fam = json.loads(res_raw_fam)
        self.assertEqual(res_fam.get('status'), 'ok')
        items_fam = res_fam.get('data', {}).get('evidence_items', [])
        self.assertGreater(len(items_fam), 0)
        self.assertEqual(items_fam[0]['relation_type'], 'father')
        self.assertEqual(items_fam[0]['teacher']['raw_mention'], 'أبيه')

    # -------------------------------------------------------------
    # 8. Provenance Schema Integrity
    # -------------------------------------------------------------
    def test_09_provenance_schema_integrity(self):
        if not self.has_rijal_db:
            self.skipTest('Large 1GB hadith_rijal.db not present in lightweight checkout')
        conn = sqlite3.connect(self.db_path)
        c = conn.cursor()
        cols = [r[1] for r in c.execute('PRAGMA table_info(isnad_transmissions)').fetchall()]
        conn.close()
        expected = [
            'id', 'occurrence_id', 'book', 'chapter', 'hadith_id', 'id_in_book',
            'path_id', 'step', 'student_raw', 'student_norm', 'student_id', 'student_name',
            'teacher_raw', 'teacher_norm', 'teacher_id', 'teacher_name',
            'relation_type', 'resolution_rule', 'text_span', 'chronology_conflict',
            'chronology_status', 'chronology_reason', 'edge_id', 'student_mention_id',
            'teacher_mention_id', 'span_start', 'span_end', 'source_sha256'
        ]
        for exp in expected:
            self.assertIn(exp, cols, f"Column {exp} must be present in isnad_transmissions")

    # -------------------------------------------------------------
    # 9. Zero Occurrence Collisions Across Distinct Hadith Records
    # -------------------------------------------------------------
    def test_10_zero_occurrence_collisions(self):
        if not self.has_rijal_db:
            self.skipTest('Large 1GB hadith_rijal.db not present in lightweight checkout')
        conn = sqlite3.connect(self.db_path)
        c = conn.cursor()
        collisions = c.execute("""
            SELECT occurrence_id, count(DISTINCT hadith_id) AS distinct_records
            FROM isnad_transmissions
            GROUP BY occurrence_id
            HAVING distinct_records > 1
            LIMIT 5
        """).fetchall()
        conn.close()
        self.assertEqual(len(collisions), 0, f"Occurrence collisions detected across distinct hadiths: {collisions}")

    # -------------------------------------------------------------
    # 10. Exact Substring Fidelity on Authentic Source Text
    # -------------------------------------------------------------
    def test_11_exact_substring_fidelity(self):
        if not self.has_rijal_db:
            self.skipTest('Large 1GB hadith_rijal.db not present in lightweight checkout')
        conn = sqlite3.connect(self.db_path)
        c = conn.cursor()
        sample = c.execute("""
            SELECT t.id, t.text_span, h.arabic_text
            FROM isnad_transmissions t
            JOIN hadiths h ON t.hadith_id = h.id
            LIMIT 100
        """).fetchall()
        conn.close()
        self.assertEqual(len(sample), 100)
        for row_id, span, full_text in sample:
            self.assertIn(span, full_text, f"Row {row_id}: text_span '{span}' is not a substring of original text!")

    # -------------------------------------------------------------
    # 11. Tool API Hardening: Limits, Validation, & Scoping
    # -------------------------------------------------------------
    def test_12_tool_api_hardening(self):
        if not self.has_rijal_db:
            self.skipTest('Large 1GB hadith_rijal.db not present in lightweight checkout')
        # A. Bounded limit [1, 50]
        res_limit_high = json.loads(self.tool.get_narrator_link_evidence(book='bukhari', student_id=566, teacher_id=106, limit=100))
        self.assertLessEqual(len(res_limit_high['data']['evidence_items']), 50)
        self.assertEqual(res_limit_high['data']['pagination']['limit'], 50)

        res_limit_low = json.loads(self.tool.get_narrator_link_evidence(book='bukhari', student_id=566, teacher_id=106, limit=-5))
        self.assertEqual(res_limit_low['data']['pagination']['limit'], 1)

        # B. Direction validation in network
        res_dir_inv = json.loads(self.tool.get_book_narrator_network(book='bukhari', narrator_name='الزهري', direction='invalid_dir'))
        self.assertEqual(res_dir_inv['status'], 'invalid_reference')

        # C. Book validation in evidence
        res_book_inv = json.loads(self.tool.get_narrator_link_evidence(book='non_existent_collection', teacher_id=106))
        self.assertEqual(res_book_inv['status'], 'invalid_reference')

        # D. Link ID collection scoping
        conn = sqlite3.connect(self.db_path)
        bukhari_row = conn.execute("SELECT id FROM isnad_transmissions WHERE book='bukhari' LIMIT 1").fetchone()
        conn.close()
        if bukhari_row:
            b_id = bukhari_row[0]
            # Queried with wrong book must return no_match with collection scope warning
            res_scope = json.loads(self.tool.get_narrator_link_evidence(book='muslim', link_id=b_id))
            self.assertEqual(res_scope['status'], 'no_match')
            self.assertIn("Enforcing collection scope", res_scope['warnings'][0])

    # -------------------------------------------------------------
    # 12. Verification of Codex Narrator Drawer Fixtures
    # -------------------------------------------------------------
    def test_13_drawer_fixtures_integrity(self):
        if not self.has_rijal_db:
            self.skipTest('Large 1GB hadith_rijal.db not present in lightweight checkout')
        self.assertTrue(self.fixtures_path.exists(), "Fixtures file must exist")
        with open(self.fixtures_path, 'r', encoding='utf-8') as f:
            fixtures_data = json.load(f)
        
        samples = fixtures_data.get('samples', [])
        self.assertEqual(len(samples), 5, "Must have exactly 5 drawer fixtures")

        conn = sqlite3.connect(self.db_path)
        c = conn.cursor()

        for sample in samples:
            occ_id = sample['occurrence_id']
            # Occurrence must exist in database
            db_row = c.execute("""
                SELECT t.book, t.chapter, t.id_in_book, t.path_id, t.step,
                       t.student_id, t.teacher_id, t.relation_type, t.text_span, h.arabic_text
                FROM isnad_transmissions t
                JOIN hadiths h ON t.hadith_id = h.id
                WHERE t.occurrence_id = ? AND t.path_id = ? AND t.step = ?
            """, (occ_id, sample['path_id'], sample['step'])).fetchone()

            self.assertIsNotNone(db_row, f"Fixture {sample['case_description']} ({occ_id}) not found in DB")
            book, ch, h_num, p_id, st, s_id, t_id, rel_type, span, full_text = db_row

            self.assertEqual(book, sample['book'])
            self.assertEqual(ch, sample['chapter'])
            self.assertEqual(h_num, sample['hadith_number'])
            self.assertEqual(s_id, sample['student']['id'])
            self.assertEqual(t_id, sample['teacher']['id'])
            self.assertEqual(rel_type, sample['relation_type'])
            # Verifiable substring fidelity
            self.assertIn(span, full_text, f"Fixture {occ_id} text span must be an exact substring of hadith text")

        conn.close()

if __name__ == '__main__':
    unittest.main()
