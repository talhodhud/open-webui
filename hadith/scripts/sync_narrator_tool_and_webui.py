import json
import sqlite3
import hashlib
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

py_path = ROOT / 'tools/hadith_narrator_tool.py'
json_path = ROOT / 'tools/hadith_narrator.json'
webui_db_path = Path(r'C:\Users\mhdal\AppData\Local\Programs\Python\Python312\Lib\site-packages\open_webui\data\webui.db')

py_content = py_path.read_text(encoding='utf-8').replace('\r\n', '\n')
manifest = json.loads(json_path.read_text(encoding='utf-8'))

# Ensure get_narrator_link_evidence is in specs
specs = [s for s in manifest.get('specs', []) if s.get('name') != 'get_narrator_link_evidence']
specs.append({
    "name": "get_narrator_link_evidence",
    "description": "Fetch authentic occurrence-level provenance for any transmission edge, including exact isnad text snippet, occurrence ID, chapter, hadith number, relation type ('direct', 'father', 'grandfather', 'aunt', 'unresolved_gap'), resolution rule, character offsets, and honest chronology diagnostics.",
    "parameters": {
        "type": "object",
        "properties": {
            "book": {
                "type": "string",
                "default": "bukhari",
                "description": "Hadith collection key (e.g. 'bukhari', 'muslim', 'abudawud', 'tirmidhi', 'nasai', 'ibnmajah', 'ahmed', 'malik')."
            },
            "student_id": {
                "type": "integer",
                "description": "Narrator ID of the transmitting student."
            },
            "teacher_id": {
                "type": "integer",
                "description": "Narrator ID of the teacher."
            },
            "link_id": {
                "type": "integer",
                "description": "Optional specific transmission link ID."
            },
            "limit": {
                "type": "integer",
                "default": 5,
                "description": "Maximum evidence occurrences to return (1-50, default: 5)."
            },
            "cursor": {
                "type": "integer",
                "description": "Optional integer cursor for stable forward pagination."
            }
        }
    }
})

manifest['specs'] = specs
manifest['version'] = "2.2.0"
manifest['content'] = py_content

json_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding='utf-8')
print("tools/hadith_narrator.json successfully updated with version 2.2.0 and new spec.")

# Update webui.db
if webui_db_path.exists():
    conn = sqlite3.connect(webui_db_path)
    cur = conn.cursor()
    meta_json = json.dumps({"manifest": manifest}, ensure_ascii=False)
    cur.execute("""
        UPDATE tool
        SET content = ?, meta = ?
        WHERE id = 'hadith_narrator'
    """, (py_content, meta_json))
    conn.commit()
    conn.close()
    print("Open WebUI webui.db successfully synchronized.")

# Compute hashes
h_py = hashlib.sha256(py_content.encode('utf-8')).hexdigest()
h_spec_content = hashlib.sha256(manifest['content'].encode('utf-8')).hexdigest()
print(f"Python file content hash: {h_py}")
print(f"Manifest content hash:    {h_spec_content}")
assert h_py == h_spec_content, "Hashes must match exactly!"
print("Exact 100% hash match verified!")
