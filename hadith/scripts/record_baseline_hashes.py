import hashlib
import json
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

files = [
    ROOT / 'hadith_rijal.db',
    ROOT / 'planning/hadith_rijal.db.bak_20261006',
    ROOT / 'tools/hadith_narrator_tool.py',
    ROOT / 'tools/hadith_narrator.json',
    ROOT / 'scripts/build_full_isnad_transmissions.py'
]

hashes = {}
for p in files:
    if p.exists():
        rel = p.relative_to(ROOT).as_posix()
        data = p.read_bytes()
        hashes[rel] = {
            'size': p.stat().st_size,
            'sha256': hashlib.sha256(data).hexdigest()
        }

webui_db = Path(r'C:\Users\mhdal\AppData\Local\Programs\Python\Python312\Lib\site-packages\open_webui\data\webui.db')
if webui_db.exists():
    conn = sqlite3.connect(webui_db)
    cur = conn.cursor()
    row = cur.execute("SELECT content, meta FROM tool WHERE id='hadith_narrator'").fetchone()
    if row:
        c_bytes = row[0].encode('utf-8')
        hashes['webui.db:hadith_narrator:content'] = {
            'length': len(row[0]),
            'sha256': hashlib.sha256(c_bytes).hexdigest()
        }
        meta_obj = json.loads(row[1]) if row[1] else {}
        hashes['webui.db:hadith_narrator:meta_version'] = meta_obj.get('manifest', {}).get('version')
    conn.close()

out_path = ROOT / 'planning/baseline_hashes_2026-10-06.json'
out_path.write_text(json.dumps(hashes, indent=2, ensure_ascii=False), encoding='utf-8')
print('Baseline hashes successfully recorded to', out_path)
print(json.dumps(hashes, indent=2))
