"""Publish only source-matched occurrence data from P1; never publish its approval/interpretation claims."""
from pathlib import Path
import json, sqlite3, hashlib, sys
sys.stdout.reconfigure(encoding='utf-8')

ROOT = Path(__file__).resolve().parents[2]
index = sqlite3.connect((ROOT / 'poc/phrase_search/search_index.sqlite').as_uri() + '?mode=ro', uri=True)
index.row_factory = sqlite3.Row
packs = json.loads((ROOT / 'planning/bayan_lesson_packs_v1.json').read_text(encoding='utf-8'))
result = {}

for topic in packs['topics']:
    records = []
    for candidate in topic['occurrences']:
        r = index.execute('SELECT * FROM records WHERE record_id=?', (candidate['occurrence_id'],)).fetchone()
        if not r or r['arabic'] != candidate['arabic_text'] or hashlib.sha256(r['arabic'].encode()).hexdigest() != candidate['text_sha256']:
            raise ValueError('Source mismatch: ' + candidate['occurrence_id'])
        if not r['source_url'].startswith('https://github.com/R3GENESI5/Itqan/blob/'):
            raise ValueError('Unexpected source URL')
        records.append({
            'id': r['record_id'],
            'collection': r['collection'],
            'chapter': r['chapter_title'],
            'position': r['source_position'],
            'text': r['arabic'],
            'sha256': r['text_sha256'],
            'url': r['source_url'],
            'review_status': 'needs_review',
            'source_verified': True,
            'scholarly_approved': False
        })
    result[topic['topic_id']] = records

target = ROOT / 'poc/theme/src/topicEvidence.ts'
ts_text = (
    '// Generated from exact index records after byte/hash comparison. No scholarly approval implied.\n'
    'export type TopicEvidence = {\n'
    '  id: string;\n'
    '  collection: string;\n'
    '  chapter: string;\n'
    '  position: number;\n'
    '  text: string;\n'
    '  sha256: string;\n'
    '  url: string;\n'
    '  review_status: string;\n'
    '  source_verified: boolean;\n'
    '  scholarly_approved: boolean;\n'
    '};\n'
    'export const TOPIC_EVIDENCE: Record<string, TopicEvidence[]> = '
    + json.dumps(result, ensure_ascii=False, indent=2)
    + ';\n'
)
target.write_text(ts_text, encoding='utf-8')
print(f'Published {sum(map(len, result.values()))} source-matched candidates across {len(result)} topics with explicit review status.')
