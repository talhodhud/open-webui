"""Regression for edition numbers leaking into native topic-card local locators."""
import importlib.util
import json
from pathlib import Path

HERE = Path(__file__).resolve()
HADITH = next((p / 'open-webui/hadith' for p in HERE.parents
               if (p / 'open-webui/hadith/tools/hadith_bayan_topics_tool.py').exists()), None)
if HADITH is None:
    HADITH = next(p for p in HERE.parents if (p / 'tools/hadith_bayan_topics_tool.py').exists())
spec = importlib.util.spec_from_file_location('topic_numbering_tools', HADITH / 'tools/hadith_bayan_topics_tool.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


def tool():
    value = module.Tools()
    value.valves.LESSON_PACKS_PATH = str(HADITH / 'planning/bayan_lesson_packs_v1.json')
    return value


def test_all_topic_occurrences_keep_their_local_positions():
    packs = json.loads((HADITH / 'planning/bayan_lesson_packs_v1.json').read_text(encoding='utf-8'))
    value = tool()
    for topic in packs['topics']:
        output = json.loads(value.get_topic_evidence(topic['topic_id']))
        for source, returned in zip(topic['occurrences'], output['data']['occurrences']):
            assert returned['source_position'] == source['source_position']
            assert returned['source_locator']['source_entry_id'] == source['source_entry_id']
            assert returned['source_locator']['numbering_system'] == 'itqan_local_position'
            assert returned['source_citation'].endswith(f"({source['occurrence_id']})")


def test_foreign_edition_number_does_not_replace_missing_position():
    locator = module.Tools._source_locator({'attributed_judgment': 'طبعة أخرى رقم 9876'})
    assert locator['source_position'] is None
    assert '9876' not in locator['display_label']
    assert 'غير متاح' in locator['display_label']


def test_every_lesson_quote_has_local_citation_without_mutating_pack():
    value = tool()
    value._load_data()
    before = json.dumps(value._lesson_packs_cache, sort_keys=True)
    for topic in value._lesson_packs_cache['topics']:
        by_id = {o['occurrence_id']: o for o in topic['occurrences']}
        for audience in ('newcomer', 'new_muslim', 'educator'):
            for form in ('card', 'qa', 'two_minute'):
                output = json.loads(value.get_reviewed_lesson(topic['topic_id'], audience, form))
                assert output['status'] == 'needs_review'
                assert output['data']['scholarly_approved'] is False
                for quote in output['data']['quotes']:
                    expected = by_id[quote['occurrence_id']]['source_position']
                    assert quote['source_locator']['source_position'] == expected
                    assert f'موضع المصدر المحلي: {expected}' in quote['citation']
                    assert quote['occurrence_id'] in quote['citation']
    assert before == json.dumps(value._lesson_packs_cache, sort_keys=True)
