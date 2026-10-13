"""Source-preservation and fail-closed checks for native Arabic knowledge."""
import hashlib
import importlib.util
import io
import json
from pathlib import Path
import pytest

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / 'open-webui/hadith/scripts/deploy_arabic_knowledge.py'
if not SCRIPT.exists():
    SCRIPT = ROOT / 'scripts/deploy_arabic_knowledge.py'
spec = importlib.util.spec_from_file_location('bayan_arabic_knowledge_test', SCRIPT)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

def test_all_curated_quotes_remain_exact_with_their_own_source():
    directory, assets = module.build_documents()
    packs = json.loads((module.HADITH / 'planning/bayan_lesson_packs_v1.json').read_text(encoding='utf-8'))
    records = {r['occurrence_id']: r for topic in packs['topics'] for r in topic['occurrences']}
    assert len(assets) == len(records) == 13
    for asset in assets:
        raw = (directory / asset['filename']).read_bytes()
        text = raw.decode()
        record = records[asset['occurrence_id']]
        assert hashlib.sha256(raw).hexdigest() == asset['sha256']
        assert record['exact_quote']['arabic'] in text
        assert record['occurrence_id'] in text
        assert record['source_url'] in text
        assert 'scholarly_approved: false' in text

def test_modified_quote_is_rejected_before_indexing(tmp_path, monkeypatch):
    packs = json.loads((module.HADITH / 'planning/bayan_lesson_packs_v1.json').read_text(encoding='utf-8'))
    packs['topics'][0]['occurrences'][0]['exact_quote']['arabic'] = 'اقتباس مختلف غير موجود في المصدر'
    (tmp_path / 'planning').mkdir()
    (tmp_path / 'planning/bayan_lesson_packs_v1.json').write_text(json.dumps(packs), encoding='utf-8')
    monkeypatch.setattr(module, 'HADITH', tmp_path)
    with pytest.raises(ValueError, match='Source quote/hash mismatch'):
        module.build_documents()

def test_http_200_with_failed_processing_cannot_be_accepted(tmp_path, monkeypatch):
    asset = {'filename': 'passage.md', 'sha256': 'expected', 'occurrence_id': 'test'}
    (tmp_path / asset['filename']).write_text('source evidence', encoding='utf-8')
    monkeypatch.setattr(module, 'build_documents', lambda: (tmp_path, [asset]))
    endpoints = []
    def fake_urlopen(request, timeout=None):
        path = request.full_url.split('example.test')[-1]
        endpoints.append(path)
        if path == '/api/v1/retrieval/config': value = {'ENABLE_RAG_HYBRID_SEARCH': False, 'HYBRID_BM25_WEIGHT': 0.5, 'TOP_K_RERANKER': 1}
        elif path == '/api/v1/files/': value = [{'id': 'file1', 'meta': {'data': {'bayan_asset_sha256': 'expected'}}}]
        elif path.endswith('/files'): value = {'items': []}
        elif path.endswith('/process/file'): value = {'status': False}
        elif path.endswith('/config/update'): value = {'status': True}
        else: raise AssertionError('Unexpected API call: ' + path)
        return io.BytesIO(json.dumps(value).encode())
    monkeypatch.setattr(module.urllib.request, 'urlopen', fake_urlopen)
    evidence = tmp_path / 'evidence.json'
    with pytest.raises(ValueError, match='Native document processing failed'):
        module.install('https://example.test', 'test-token', evidence, collection='test-collection')
    result = json.loads(evidence.read_text())
    assert result['status'] == 'failed'
    assert result['natural_queries'] == []
    assert 'model_wiring' not in result
    assert not any('/models/' in path for path in endpoints)
    assert 'test-token' not in evidence.read_text()
