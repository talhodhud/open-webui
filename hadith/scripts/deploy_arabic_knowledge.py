"""Add source-preserving Arabic passage documents and verify natural queries.

Uses the native authenticated Open WebUI API. Existing knowledge files stay intact.
Token comes from BAYAN_WEBUI_TOKEN and is never logged or written to evidence.
"""
import argparse
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
import re
import urllib.request
import urllib.parse
import uuid

HADITH = Path(__file__).resolve().parents[1]
NATURAL_QUERIES = [
    ('ما معنى الأعمال بالنيات والإخلاص في الإسلام؟', ['itqan:bukhari:1:1:bf026de7e155']),
    ('كيف يعلّم الإسلام الرحمة والرفق بالناس؟', ['itqan:tirmidhi:27:30:b5e57ce2441d',
        'itqan:bukhari:78:55:022c1dbdd753', 'itqan:bukhari:97:6:c70c14ec93c8']),
    ('اشرح إن الله يحب الرفق في الأمر كله', ['itqan:bukhari:78:55:022c1dbdd753']),
]

def searchable(text):
    return re.sub(r'[^\w\s]', ' ', re.sub('[\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06ed]', '', text)).strip()

def build_documents():
    packs = json.loads((HADITH / 'planning/bayan_lesson_packs_v1.json').read_text(encoding='utf-8'))
    directory = HADITH / 'planning/knowledge_arabic'
    directory.mkdir(exist_ok=True)
    assets = []
    for topic in packs['topics']:
        for occurrence in topic['occurrences']:
            original = occurrence['arabic_text']
            quote = occurrence['exact_quote']['arabic']
            start, end = occurrence['exact_quote']['source_span']
            if original[start:end] != quote or hashlib.sha256(original.encode()).hexdigest() != occurrence['text_sha256']:
                raise ValueError('Source quote/hash mismatch: ' + occurrence['occurrence_id'])
            # Retrieval words are labelled explicitly and are not substituted for the quoted text.
            words = searchable(' '.join([topic['title_ar'], topic['initial_question'], quote]))
            content = '\n\n'.join([
                '# ' + topic['title_ar'],
                'occurrence_id: ' + occurrence['occurrence_id'],
                'الشاهد الحرفي من المصدر: «' + quote + '»',
                'المصدر: ' + occurrence['collection'] + ' — ' + occurrence['chapter_title'],
                'كلمات البحث (ليست نص الحديث): ' + words,
                'رقم الموضع المحلي: ' + str(occurrence['source_position']) + '؛ لا يمثل ترقيم كل الطبعات.',
                'source_span: ' + json.dumps([start, end]),
                'source_url: ' + occurrence['source_url'],
                'حالة المادة التعليمية: needs_review؛ scholarly_approved: false. التحقق من النص لا يعني اعتماد الشرح.',
            ]) + '\n'
            name = occurrence['passage_id'] + '.md'
            (directory / name).write_bytes(content.encode('utf-8'))
            assets.append({'filename': name, 'sha256': hashlib.sha256(content.encode()).hexdigest(),
                'occurrence_id': occurrence['occurrence_id'], 'review_status': 'needs_review'})
    (directory / 'manifest.json').write_bytes(json.dumps({'version': '1', 'assets': assets}, ensure_ascii=False, indent=2).encode('utf-8'))
    return directory, assets

def install(webui_url, token, evidence_path, collection=None):
    directory, assets = build_documents()
    base = webui_url.rstrip('/')
    headers = {'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'}
    def api(path, data=None, method=None, timeout=90):
        request = urllib.request.Request(base + path, data=json.dumps(data).encode() if data is not None else None,
            headers=headers, method=method)
        with urllib.request.urlopen(request, timeout=timeout) as response: return json.load(response)
    # Store only the settings we change; never API keys or provider configuration.
    config = api('/api/v1/retrieval/config')
    keys = ['ENABLE_RAG_HYBRID_SEARCH', 'HYBRID_BM25_WEIGHT', 'TOP_K_RERANKER']
    before = {key: config.get(key) for key in keys}
    name = 'بيان السنة — الشواهد العربية الموثقة (13 شاهدًا)'
    if collection is None:
        # A clean collection avoids unrelated fragments from the archival raw JSON index.
        records = api('/api/v1/knowledge/')
        records = records if isinstance(records, list) else records.get('items', [])
        knowledge = next((k for k in records if k.get('name') == name), None)
        if knowledge is None:
            knowledge = api('/api/v1/knowledge/create', {'name': name,
                'description': 'source-preserving-arabic-v1; 13 شواهد حرفية؛ المادة التعليمية needs_review؛ scholarly_approved: false.'})
        collection = knowledge['id']
    evidence = {'checked_at': datetime.now(timezone.utc).isoformat(), 'collection': collection,
        'previous_settings': before, 'indexed_files': [], 'natural_queries': [], 'status': 'pending'}
    try:
        existing = api('/api/v1/files/')
        files = existing if isinstance(existing, list) else existing.get('items', [])
        current = api('/api/v1/knowledge/' + collection + '/files')
        current_files = current.get('items') or []
        for asset in assets:
            match = next((f for f in files if f.get('meta', {}).get('data', {}).get('bayan_asset_sha256') == asset['sha256']), None)
            if match is None:
                boundary = 'bayan-' + uuid.uuid4().hex
                metadata = json.dumps({'bayan_asset_sha256': asset['sha256'], 'review_status': 'needs_review'})
                body = (f'--{boundary}\r\nContent-Disposition: form-data; name="metadata"\r\n\r\n{metadata}\r\n'
                    f'--{boundary}\r\nContent-Disposition: form-data; name="file"; filename="{asset["filename"]}"\r\n'
                    'Content-Type: text/markdown; charset=utf-8\r\n\r\n').encode()
                body += (directory / asset['filename']).read_bytes() + f'\r\n--{boundary}--\r\n'.encode()
                request = urllib.request.Request(base + '/api/v1/files/?process=false', data=body,
                    headers={'Authorization': 'Bearer ' + token, 'Content-Type': 'multipart/form-data; boundary=' + boundary})
                with urllib.request.urlopen(request, timeout=60) as response: match = json.load(response)
            processed = api('/api/v1/retrieval/process/file', {'file_id': match['id'],
                'content': (directory / asset['filename']).read_text(encoding='utf-8')})
            if not processed.get('status'): raise ValueError('Native document processing failed')
            result = api(f'/api/v1/knowledge/{collection}/file/add', {'file_id': match['id']})
            if not result: raise ValueError('Native file indexing returned no knowledge record')
            evidence['indexed_files'].append({**asset, 'file_id': match['id']})
            for old in current_files:
                if old.get('filename') == asset['filename'] and old['id'] != match['id']:
                    api(f'/api/v1/knowledge/{collection}/file/remove', {'file_id': old['id']})
        api('/api/v1/retrieval/config/update', {'ENABLE_RAG_HYBRID_SEARCH': True, 'HYBRID_BM25_WEIGHT': 1.0, 'TOP_K_RERANKER': 3})
        for query, occurrence_ids in NATURAL_QUERIES:
            result = api('/api/v1/retrieval/query/collection', {'collection_names': [collection], 'query': query,
                'k': 2, 'k_reranker': 2, 'hybrid': True, 'hybrid_bm25_weight': 1.0})
            docs = result.get('documents', [[]])[0]
            matched = any(occurrence_id in doc for occurrence_id in occurrence_ids for doc in docs)
            evidence['natural_queries'].append({'query': query, 'expected_occurrence_ids': occurrence_ids,
                'matched': matched, 'sources': [m.get('source') for m in result.get('metadatas', [[]])[0]],
                'snippets': [d[:250] for d in docs]})
        if not all(row['matched'] for row in evidence['natural_queries']):
            raise ValueError('Natural Arabic queries did not retrieve their expected source records')
        evidence['status'] = 'verified'
        evidence['retrieval_mode'] = 'native_hybrid_bm25_candidates_with_embedding_rerank'
        evidence['bm25_weight'] = 1.0
        evidence['previous_model_knowledge'] = {}
        for model_id in ['bayan-unified-pilot', 'hadith-islam-guide']:
            model = api('/api/v1/models/model?id=' + urllib.parse.quote(model_id))
            if not model: raise ValueError('Required model missing: ' + model_id)
            evidence['previous_model_knowledge'][model_id] = model.get('meta', {}).get('knowledge')
            model['meta']['knowledge'] = [{'id': collection, 'name': name, 'type': 'collection',
                'review_status': 'needs_review', 'scholarly_approved': False}]
            api('/api/v1/models/model/update', model)
        evidence['model_wiring'] = ['bayan-unified-pilot', 'hadith-islam-guide']
        return evidence
    except Exception as error:
        evidence['status'] = 'failed'
        evidence['error_type'] = type(error).__name__
        for model_id, previous in evidence.get('previous_model_knowledge', {}).items():
            model = api('/api/v1/models/model?id=' + urllib.parse.quote(model_id))
            model['meta']['knowledge'] = previous
            api('/api/v1/models/model/update', model)
        # Restore only altered configuration. Added source documents are retained for inspection.
        api('/api/v1/retrieval/config/update', {k: v for k, v in before.items() if v is not None})
        raise
    finally:
        evidence_path.parent.mkdir(parents=True, exist_ok=True)
        evidence_path.write_text(json.dumps(evidence, ensure_ascii=False, indent=2), encoding='utf-8')

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--build-only', action='store_true')
    parser.add_argument('--webui-url', default='http://127.0.0.1:8080')
    parser.add_argument('--evidence', type=Path, default=HADITH / 'planning/arabic_knowledge_live_evidence.json')
    args = parser.parse_args()
    if args.build_only:
        _, assets = build_documents(); print(json.dumps({'status': 'built', 'files': len(assets)}))
    else:
        token = os.environ.get('BAYAN_WEBUI_TOKEN')
        if not token: raise SystemExit('Set BAYAN_WEBUI_TOKEN; it will never be printed or stored.')
        result = install(args.webui_url, token, args.evidence)
        print(json.dumps({'status': result['status'], 'files': len(result['indexed_files']), 'natural_queries': len(result['natural_queries'])}))
