"""Build a separate search snapshot directly from original Itqan JSON files."""
import argparse
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
import sqlite3
from engine import COLLECTIONS, normalize

def build(source_root, destination, revision):
    if not __import__('re').fullmatch(r'[0-9a-f]{40}', revision):
        raise ValueError('A verified source Git commit is required.')
    source_root, destination = Path(source_root).resolve(), Path(destination).resolve()
    destination.parent.mkdir(parents=True, exist_ok=True)
    staging = destination.with_suffix('.building.sqlite')
    if staging.exists():
        raise FileExistsError(f'Review the previous staging file first: {staging}')
    conn = sqlite3.connect(staging)
    conn.executescript('''
      CREATE TABLE records(record_id TEXT UNIQUE NOT NULL, collection TEXT NOT NULL, chapter_file TEXT NOT NULL,
        chapter_title TEXT NOT NULL, source_position INTEGER NOT NULL, source_entry_id TEXT, source_entry_in_book TEXT,
        arabic TEXT NOT NULL, english TEXT, english_narrator TEXT, normalized TEXT NOT NULL,
        source_file TEXT NOT NULL, source_sha256 TEXT NOT NULL, text_sha256 TEXT NOT NULL, source_url TEXT NOT NULL);
      CREATE INDEX records_collection ON records(collection);
      CREATE VIRTUAL TABLE search_fts USING fts5(normalized, content='records', content_rowid='rowid');
      CREATE VIRTUAL TABLE vocabulary USING fts5vocab(search_fts, 'row');
      CREATE TABLE metadata(key TEXT PRIMARY KEY, value TEXT NOT NULL);
    ''')
    counts, file_hashes = {}, {}
    for collection in COLLECTIONS:
        folder = source_root / collection
        titles = {r['file']: r.get('name_ar',r['file']) for r in json.loads((folder/'index.json').read_text(encoding='utf-8'))}
        count = 0
        for p in sorted(folder.glob('*.json'), key=lambda p:p.name):
            if p.name == 'index.json':
                continue
            raw = p.read_bytes(); file_hash = hashlib.sha256(raw).hexdigest()
            relative = f'app/data/sunni/{collection}/{p.name}'
            file_hashes[relative] = file_hash
            items = json.loads(raw)
            if not isinstance(items,list):
                raise ValueError(f'Unexpected data shape: {relative}')
            for position, item in enumerate(items,1):
                arabic = item.get('arabic','')
                if not isinstance(arabic,str) or not arabic.strip():
                    continue
                text_hash = hashlib.sha256(arabic.encode()).hexdigest()
                rid = f'itqan:{collection}:{p.stem}:{position}:{text_hash[:12]}'
                english = item.get('english',{})
                if not isinstance(english,dict): english = {}
                conn.execute('INSERT INTO records VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',(
                    rid,collection,p.name,titles.get(p.name,p.name),position,str(item.get('id','')),str(item.get('idInBook','')),
                    arabic,english.get('text',''),english.get('narrator',''),normalize(arabic),relative,file_hash,text_hash,
                    f'https://github.com/R3GENESI5/Itqan/blob/{revision}/{relative}',
                )); count += 1
        counts[collection] = count
    conn.execute("INSERT INTO search_fts(search_fts) VALUES('rebuild')")
    fingerprint = hashlib.sha256(json.dumps(file_hashes,sort_keys=True).encode()).hexdigest()
    manifest = {'schema_version':1,'created_at':datetime.now(timezone.utc).isoformat(), 'source':'Itqan', 'source_revision':revision,
                'dataset_id':fingerprint[:16],'source_fingerprint':fingerprint,'record_count':sum(counts.values()),'counts':counts,
                'scope':'six_collections_only','source_review':'unreviewed_dataset_copy','numbering':'source-file position; no canonical edition mapping'}
    conn.execute('INSERT INTO metadata VALUES (?,?)',('manifest',json.dumps(manifest,ensure_ascii=False)))
    conn.commit()
    assert conn.execute('PRAGMA integrity_check').fetchone()[0] == 'ok'
    assert conn.execute('SELECT COUNT(*) FROM records').fetchone()[0] == manifest['record_count']
    conn.close()
    os.replace(staging,destination)
    destination.with_suffix('.manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(manifest,ensure_ascii=False,indent=2))

if __name__ == '__main__':
    p=argparse.ArgumentParser();p.add_argument('--source',required=True);p.add_argument('--output',required=True);p.add_argument('--revision',required=True)
    a=p.parse_args();build(a.source,a.output,a.revision)
