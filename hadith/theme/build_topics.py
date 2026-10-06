"""
Generate poc/theme/src/topics.ts and topics.json from semantic taxonomy and lesson packs.
Enforces negative exclusion rules (specifically excluding 'كتاب الأيمان والنذور' from topic-faith).
"""
from pathlib import Path
import json, sys
sys.stdout.reconfigure(encoding='utf-8')

ROOT = Path(__file__).resolve().parents[2]

taxonomy = json.loads((ROOT / 'planning/islam_topic_taxonomy_v1.json').read_text(encoding='utf-8'))
packs = json.loads((ROOT / 'planning/bayan_lesson_packs_v1.json').read_text(encoding='utf-8'))
inventory = json.loads((ROOT / 'planning/six_book_chapter_inventory.json').read_text(encoding='utf-8'))['chapters']

packs_by_id = {t['topic_id']: t for t in packs['topics']}

seeds_map = {
    'topic-faith': ['الإيمان', 'النيات'],
    'topic-mercy': ['من لا يرحم', 'الرفق'],
    'topic-worship': ['الصلاة', 'الصيام'],
    'topic-family': ['الجار', 'الوالدين'],
    'topic-fairness': ['غش', 'الأمانة'],
    'topic-knowledge': ['العلم', 'فليقل خيرا']
}

topics_out = []

for t in taxonomy['topics']:
    tid = t['id']
    pack = packs_by_id.get(tid, {})
    patterns = t.get('semantic_chapter_patterns', [])
    exclusions = [e['pattern'] for e in t.get('negative_exclusion_rules', [])]
    
    matched_chapters = []
    for c in inventory:
        ch = c['chapter_title']
        if any(p in ch for p in patterns):
            if not any(ex in ch for ex in exclusions):
                matched_chapters.append(c)
                
    unique_titles = list(dict.fromkeys(c['chapter_title'] for c in matched_chapters))
    collections = sorted(set(c['collection'] for c in matched_chapters))
    
    subtopics = [
        {
            'id': st['id'],
            'title': st['title_ar'],
            'objective': st['learning_objective']
        }
        for st in t.get('subtopics', [])
    ]
    
    # Verify negative exclusion
    if tid == 'topic-faith':
        assert not any('الأيمان والنذور' in title for title in unique_titles), "كتاب الأيمان والنذور must be excluded from topic-faith"
        
    topic_entry = {
        'id': tid,
        'title': t['title_ar'],
        'titleEn': t['title_en'],
        'question': t['initial_question_ar'],
        'questionEn': t['initial_question_en'],
        'seedQueries': seeds_map.get(tid, []),
        'chapterTitles': unique_titles[:5],
        'chapterCount': len(matched_chapters),
        'collections': collections,
        'subtopics': subtopics,
        'mappingStatus': 'semantic_pack_derived',
        'reviewStatus': 'needs_review',
        'sourceVerified': True,
        'scholarlyApproved': False,
        'modelId': 'hadith-islam-guide',
        'unifiedModelId': 'bayan-unified-pilot',
        'primarySkillId': 'hadith-islam-guide'
    }
    topics_out.append(topic_entry)

target_json = ROOT / 'poc/theme/src/topics.json'
target_ts = ROOT / 'poc/theme/src/topics.ts'

target_json.write_text(json.dumps(topics_out, ensure_ascii=False, indent=2), encoding='utf-8')

ts_content = '// Generated from planning/islam_topic_taxonomy_v1.json and bayan_lesson_packs_v1.json.\n'
ts_content += '// Enforces negative exclusion rules; semantic packs, not chapter_title_candidate_only.\n'
ts_content += 'export const TOPICS = ' + json.dumps(topics_out, ensure_ascii=False, indent=2) + ';\n'
target_ts.write_text(ts_content, encoding='utf-8')

print(f'Successfully generated {len(topics_out)} topics with semantic derivation.')
for t in topics_out:
    print(f" - {t['id']}: {t['title']} ({t['chapterCount']} chapters, exclusion checked)")
