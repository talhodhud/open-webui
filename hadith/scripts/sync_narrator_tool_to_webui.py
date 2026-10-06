import json, sqlite3, os, time

py_path = "tools/hadith_narrator_tool.py"
json_path = "tools/hadith_narrator.json"
db_path = r"C:\Users\mhdal\AppData\Local\Programs\Python\Python312\Lib\site-packages\open_webui\data\webui.db"

with open(py_path, "r", encoding="utf-8") as f:
    py_code = f.read()

specs = [
    {
        "name": "search_narrator",
        "description": "Search the 115,735 Rijal database using full-text search (FTS5) or normalized Arabic matching.",
        "parameters": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "Name, kunya, or title of the narrator."
                },
                "limit": {
                    "type": "integer",
                    "default": 5,
                    "description": "Maximum results to return."
                }
            },
            "required": ["query"]
        }
    },
    {
        "name": "get_narrator_biography",
        "description": "Fetch complete biographical profile of a narrator by their database ID, including authentic Ibn Hajar & Dhahabi ranks, death dates, tabaqa, teachers, and students.",
        "parameters": {
            "type": "object",
            "properties": {
                "narrator_id": {
                    "type": "integer",
                    "description": "Integer ID of the narrator."
                }
            },
            "required": ["narrator_id"]
        }
    },
    {
        "name": "get_narrator_scholar_quotes",
        "description": "Retrieve verbatim Jarh wa Ta'dil statements and critical evaluations from classical masters (Ahmad ibn Hanbal, Ibn Ma'in, al-Bukhari, Abu Hatim, al-Nasa'i, Ibn Hibban, etc.) with exact book, volume, and page citations.",
        "parameters": {
            "type": "object",
            "properties": {
                "narrator_name": {
                    "type": "string",
                    "description": "Name of the narrator (e.g. 'سعيد بن المسيب', 'الحميدي', 'سليمان بن يسار')."
                },
                "scholar_filter": {
                    "type": "string",
                    "default": "",
                    "description": "Optional filter for a specific critic (e.g. 'أحمد بن حنبل', 'يحيى بن معين')."
                }
            },
            "required": ["narrator_name"]
        }
    },
    {
        "name": "get_book_narrator_network",
        "description": "Inspect dynamic transmission network for any canonical book, revealing central narrators, their transmitters (students), or their teachers with exact frequencies and classical ranks.",
        "parameters": {
            "type": "object",
            "properties": {
                "book": {
                    "type": "string",
                    "description": "Collection name: 'bukhari', 'muslim', 'tirmidhi', 'abudawud', 'nasai', 'ibnmajah', 'ahmed', 'malik', 'darimi'."
                },
                "narrator_name": {
                    "type": "string",
                    "default": "",
                    "description": "Optional narrator name to focus on (e.g. 'أبو هريرة', 'الزهري', 'قتادة')."
                },
                "direction": {
                    "type": "string",
                    "default": "students",
                    "enum": ["students", "teachers"],
                    "description": "Direction of transmission: 'students' (transmitters from him / الرواة عنه) or 'teachers' (those he transmitted from / شيوخه)."
                }
            },
            "required": ["book"]
        }
    },
    {
        "name": "compare_narrator_across_books",
        "description": "Compare the transmission network of any narrator across two canonical Hadith collections (e.g. Bukhari vs Muslim, or Bukhari vs Abu Dawud). Reveals shared transmitters, unique transmitters to book 1, unique transmitters to book 2, and exact frequencies for any layer of narrators (Sahaba, Tabi'in, Madar pivots).",
        "parameters": {
            "type": "object",
            "properties": {
                "narrator_name": {
                    "type": "string",
                    "description": "Name of the narrator to compare (e.g. 'أبو هريرة', 'الزهري', 'قتادة', 'الأعمش', 'نافع', 'مالك')."
                },
                "book1": {
                    "type": "string",
                    "default": "bukhari",
                    "description": "First collection (e.g. 'bukhari', 'muslim', 'abudawud', 'tirmidhi', 'nasai', 'ibnmajah', 'ahmed', 'malik')."
                },
                "book2": {
                    "type": "string",
                    "default": "muslim",
                    "description": "Second collection (e.g. 'bukhari', 'muslim', 'abudawud', 'tirmidhi', 'nasai', 'ibnmajah', 'ahmed', 'malik')."
                },
                "direction": {
                    "type": "string",
                    "default": "students",
                    "enum": ["students", "teachers"],
                    "description": "Direction: 'students' (transmitters from him / الرواة عنه) or 'teachers' (those he transmitted from / شيوخه)."
                }
            },
            "required": ["narrator_name"]
        }
    }
]

manifest = {
    "id": "hadith_narrator",
    "name": "Hadith Narrator (Rijal) Biography & Network",
    "description": "Comprehensive biographical lookup across 115,735 Hadith narrators, Jarh wa Ta'dil credibility evaluations, death dates, tabaqat, verbatim scholar quotes with volume/page citations, and dynamic multi-book transmission comparison across all isnad layers.",
    "version": "2.0.0",
    "specs": specs,
    "content": py_code
}

with open(json_path, "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)
print("Updated tools/hadith_narrator.json successfully.")

# Sync to webui.db
conn = sqlite3.connect(db_path)
cur = conn.cursor()

# Check if tool exists
cur.execute("SELECT id FROM tool WHERE id = 'hadith_narrator'")
row = cur.fetchone()
meta_json = json.dumps({"description": manifest["description"]}, ensure_ascii=False)
specs_json = json.dumps(manifest["specs"], ensure_ascii=False)

now_ts = int(time.time())
if row:
    cur.execute("""
        UPDATE tool
        SET name = ?, content = ?, specs = ?, meta = ?, updated_at = ?
        WHERE id = 'hadith_narrator'
    """, (manifest["name"], py_code, specs_json, meta_json, now_ts))
    print("Updated tool in webui.db.")
else:
    cur.execute("""
        INSERT INTO tool (id, user_id, name, content, specs, meta, created_at, updated_at)
        VALUES ('hadith_narrator', 'system', ?, ?, ?, ?, ?, ?)
    """, (manifest["name"], py_code, specs_json, meta_json, now_ts, now_ts))
    print("Inserted tool into webui.db.")

conn.commit()
conn.close()
print("Sync complete.")
