import copy
import hashlib
import json
from pathlib import Path
import sys

ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT))
from tools.hadith_bayan_topics_tool import Tools

def tool():
    t=Tools()
    t.valves.TAXONOMY_PATH=str(ROOT/'planning/islam_topic_taxonomy_v1.json')
    t.valves.LESSON_PACKS_PATH=str(ROOT/'planning/bayan_lesson_packs_v1.json')
    return t

def test_cards_cover_six_topics_three_audiences_and_verified_passages():
    t=tool()
    packs=json.loads((ROOT/'planning/bayan_lesson_packs_v1.json').read_text(encoding='utf-8'))
    for pack in packs['topics']:
        for audience in ['newcomer','new_muslim','educator']:
            result=json.loads(t.get_reviewed_lesson(pack['topic_id'],audience=audience))
            assert result['status']=='needs_review'
            data=result['data'];assert data['scholarly_approved'] is False
            for q in data['presentation']['quotes']:
                occurrence=next(o for o in pack['occurrences'] if o['occurrence_id']==q['occurrence_id'])
                a,b=q['source_span']
                assert occurrence['arabic_text'][a:b]==q['exact_text']
                assert hashlib.sha256(occurrence['arabic_text'].encode()).hexdigest()==q['text_sha256']
                assert 'itqan:' not in q['source_label']

def test_subtopic_has_only_explicitly_selected_evidence_and_no_silent_fallback():
    t=tool()
    card=json.loads(t.get_reviewed_lesson('topic-worship',subtopic_id='worship_prayer'))['data']
    assert len(card['quotes'])==1
    assert card['occurrence_ids']==['itqan:bukhari:9:7:b8de6739f520']
    assert json.loads(t.get_reviewed_lesson('topic-worship',subtopic_id='worship_solidarity'))['status']=='unavailable'
    assert json.loads(t.get_reviewed_lesson('topic-worship',subtopic_id='worship_prayer',format='qa'))['status']=='unavailable'
    assert json.loads(t.get_reviewed_lesson('topic-faith',subtopic_id='worship_prayer'))['status']=='invalid_reference'

def test_corrupt_quote_or_source_cannot_produce_a_visual_card():
    t=tool();t._load_data();original=copy.deepcopy(t._lesson_packs_cache)
    t._lesson_packs_cache['topics'][0]['lesson_formats']['card']['newcomer']['quotes'][0]['exact_text']='invented'
    assert json.loads(t.get_reviewed_lesson('topic-faith'))['status']=='unavailable'
    t._lesson_packs_cache=original
    t._lesson_packs_cache['topics'][0]['occurrences'][0]['text_sha256']='broken'
    assert json.loads(t.get_reviewed_lesson('topic-faith'))['status']=='unavailable'

def test_taxonomy_exposes_subtopic_ids_objectives_and_real_availability():
    topics=json.loads(tool().list_islam_topics())['data']['topics']
    assert sum(len(t['subtopics']) for t in topics)==18
    assert sum(s['card_available'] for t in topics for s in t['subtopics'])==10
    assert all(s['id'] and s['learning_objective'] for t in topics for s in t['subtopics'])
