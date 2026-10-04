"""Regression tests for identity, source fidelity, retrieval and HTML boundaries."""
import json
from pathlib import Path
import sqlite3
import unittest
from engine import PhraseSearch,normalize,highlighted_parts,render_interface

ROOT=Path(__file__).resolve().parent
PROJECT=ROOT.parents[1]

class PhraseTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.engine=PhraseSearch(ROOT/'search_index.sqlite')
        cls.source=json.loads((PROJECT/'itqan-repo/app/data/sunni/bukhari/1.json').read_text(encoding='utf-8'))

    def test_arabic_variants_match_without_modifying_text(self):
        a=self.engine.search('إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ','bukhari')
        b=self.engine.search('انما الاعمال بالنيات','bukhari')
        self.assertGreater(a['total_matches'],0)
        self.assertEqual([r['record_id'] for r in a['results']],[r['record_id'] for r in b['results']])
        self.assertTrue(all(r['match_type']=='normalized_phrase' for r in a['results']))

    def test_source_record_roundtrip(self):
        with self.engine._connect() as c:
            rid=c.execute("SELECT record_id FROM records WHERE collection='bukhari' AND chapter_file='1.json' AND source_position=1").fetchone()[0]
        r=self.engine.get(rid)['record']
        self.assertEqual(r['arabic'],self.source[0]['arabic'])
        self.assertIsNone(r['grade'])
        self.assertEqual(r['review_status'],'unreviewed_dataset_copy')
        self.assertIn('/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/',r['source_url'])

    def test_repeated_source_numbers_do_not_collide(self):
        with self.engine._connect() as c:
            rows=c.execute("SELECT record_id,arabic FROM records WHERE collection='bukhari' AND source_entry_in_book='1'").fetchall()
        self.assertGreater(len(rows),90)
        self.assertEqual(len(rows),len({r['record_id'] for r in rows}))
        for row in rows[:4]:self.assertEqual(self.engine.get(row['record_id'])['record']['arabic'],row['arabic'])

    def test_scope_is_six_and_filter_is_enforced(self):
        r=self.engine.search('الاعمال','muslim')
        self.assertTrue(r['results'])
        self.assertTrue(all(x['collection']=='muslim' for x in r['results']))
        self.assertEqual(len(r['manifest']['counts']),6)
        with self.assertRaises(ValueError):self.engine.search('الاعمال','malik')

    def test_distinct_word_matching_is_labeled(self):
        r=self.engine.search('بالنيات الاعمال','bukhari')
        self.assertTrue(r['results'])
        self.assertEqual(r['results'][0]['match_type'],'all_words')

    def test_excerpt_highlights_match_in_matn_not_only_chain(self):
        r=self.engine.search('الاعمال بالنيات','bukhari')['results'][0]
        marked=' '.join(p['text'] for p in r['snippet'] if p['match'])
        self.assertIn('الاعمال',normalize(marked));self.assertIn('بالنيات',normalize(marked))
        self.assertEqual(''.join(p['text'] for p in r['arabic_parts']),r['arabic'])

    def test_no_hit_is_not_fabrication_judgment(self):
        r=self.engine.search('كهرومغناطيسية فضائية')
        self.assertEqual(r['status'],'no_match');self.assertEqual(r['results'],[])
        self.assertNotIn('موضوع',json.dumps(r,ensure_ascii=False))

    def test_typo_suggestion_is_explicit(self):
        r=self.engine.search('الاعمال بالنيت')
        self.assertEqual(r['status'],'no_match')
        self.assertIn('الاعمال بالنيات',r['suggestions'])

    def test_query_bounds_and_fts_metacharacters(self):
        for q in ['', '!!!', 'في من عن', 'ا'*201]:
            with self.assertRaises(ValueError):self.engine.search(q)
        r=self.engine.search('" OR * NEAR ( الاعمال )')
        self.assertIn(r['status'],['ok','no_match'])

    def test_invalid_id_never_falls_back_to_arbitrary_record(self):
        self.assertEqual(self.engine.get("1 OR 1=1")['status'],'not_found')
        self.assertEqual(self.engine.get('itqan:bukhari:1:1:invalid')['status'],'not_found')

    def test_source_text_cannot_break_script_boundary(self):
        template='<script type="application/json">__POC_DATA__</script>'
        rendered=render_interface(template,{'query':'</script><script>alert(1)</script>'})
        self.assertEqual(rendered.count('</script>'),1)
        body=rendered.split('>',1)[1].rsplit('</script>',1)[0]
        self.assertEqual(json.loads(body)['payload']['query'],'</script><script>alert(1)</script>')

    def test_database_is_read_only(self):
        with self.engine._connect() as c:
            with self.assertRaises(sqlite3.OperationalError):c.execute("DELETE FROM records")

if __name__=='__main__':unittest.main(verbosity=2)
