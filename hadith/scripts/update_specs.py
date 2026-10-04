import sqlite3
import json

db_path = r"C:\Users\mhdal\AppData\Local\Programs\Python\Python312\Lib\site-packages\open_webui\data\webui.db"
conn = sqlite3.connect(db_path)
cur = conn.cursor()

cur.execute("SELECT specs FROM tool WHERE id = ?", ("hadith_engine",))
row = cur.fetchone()
if row:
    specs = json.loads(row[0]) if row[0] else []
    names = [s.get("name") for s in specs]
    if "get_hadith_isnad_tree" not in names:
        new_spec = {
            "name": "get_hadith_isnad_tree",
            "description": "Extract the exact Isnad transmission chain from a specific Hadith text and generate a verified Mermaid flowchart with narrator reliability grades.",
            "parameters": {
                "properties": {
                    "book": {
                        "description": "Collection slug (e.g. 'bukhari', 'muslim', 'abudawud', 'tirmidhi', 'nasai', 'ibnmajah').",
                        "type": "string"
                    },
                    "hadith_number": {
                        "description": "Number of the Hadith in the book (e.g. 1).",
                        "type": "integer"
                    }
                },
                "required": ["book", "hadith_number"],
                "type": "object"
            }
        }
        specs.append(new_spec)
        cur.execute("UPDATE tool SET specs = ? WHERE id = ?", (json.dumps(specs, ensure_ascii=False), "hadith_engine"))
        conn.commit()
        print(f"Added get_hadith_isnad_tree! Total specs: {len(specs)}")
    else:
        print("get_hadith_isnad_tree already exists in specs.")

conn.close()
