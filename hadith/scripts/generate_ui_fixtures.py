import json
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
conn = sqlite3.connect(ROOT / 'hadith_rijal.db')
conn.row_factory = sqlite3.Row
cur = conn.cursor()

fixtures = {
    'version': '1.0.0',
    'date': '2026-10-06',
    'description': 'Reviewed transmission evidence fixtures for Codex Narrator Drawer UI integration',
    'samples': []
}

test_cases = [
    ('direct', 'bukhari', 566, 106, 'Direct Sahaba-Tabi\'i link: Al-A\'raj -> Abu Hurairah'),
    ('father', 'bukhari', 173, 874, 'Occurrence family hop: Hisham b. Urwah -> Urwah b. al-Zubayr (عن أبيه)'),
    ('direct', 'bukhari', 874, 342, 'Direct link: Urwah b. al-Zubayr -> Aisha'),
    ('father', 'abudawud', 93, 5980, 'Occurrence family hop: Amr b. Shu\'ayb -> Shu\'ayb b. Muhammad (عن أبيه)'),
    ('grandfather', 'abudawud', 5980, 368, 'Occurrence grandfather link: Shu\'ayb -> Abdullah b. Amr (عن جده)')
]

for rel, book, s_id, t_id, desc in test_cases:
    row = cur.execute('''
        SELECT t.*, h.arabic_text AS full_hadith
        FROM isnad_transmissions t
        LEFT JOIN hadiths h ON t.hadith_id = h.id
        WHERE t.book = ? AND t.student_id = ? AND t.teacher_id = ?
        LIMIT 1
    ''', (book, s_id, t_id)).fetchone()
    
    if row:
        full_text = row['full_hadith'] or ''
        fixtures['samples'].append({
            'case_description': desc,
            'transmission_id': row['id'],
            'occurrence_id': row['occurrence_id'],
            'book': row['book'],
            'chapter': row['chapter'],
            'hadith_number': row['id_in_book'],
            'path_id': row['path_id'],
            'step': row['step'],
            'student': {
                'id': row['student_id'],
                'name': row['student_name'],
                'raw_mention': row['student_raw']
            },
            'teacher': {
                'id': row['teacher_id'],
                'name': row['teacher_name'],
                'raw_mention': row['teacher_raw']
            },
            'relation_type': row['relation_type'],
            'resolution_rule': row['resolution_rule'],
            'isnad_text_span': row['text_span'],
            'hadith_text_excerpt': full_text[:250] + ('...' if len(full_text) > 250 else ''),
            'chronology_status': 'conflict' if row['chronology_conflict'] else 'consistent'
        })

conn.close()

fixtures_dir = ROOT / 'fixtures'
fixtures_dir.mkdir(exist_ok=True)
out_path = fixtures_dir / 'narrator_drawer_evidence.json'
out_path.write_text(json.dumps(fixtures, indent=2, ensure_ascii=False), encoding='utf-8')
print('Fixtures saved to', out_path)
print('Total samples:', len(fixtures['samples']))
