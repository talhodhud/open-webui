"""
register_modular_tools.py
=========================
Generates JSON manifests and registers the 5 specialized modular Hadith micro-tools into Open WebUI (webui.db):
1. hadith_corpus_search
2. hadith_takhrij
3. hadith_sharh_vocab
4. hadith_isnad_tree
5. hadith_narrator

Maintains the existing 'hadith_engine' (v1.3.0) intact without disruption.
"""

import os
import sys
import json
import time
import sqlite3

WEBUI_DB_PATH = r"C:\Users\mhdal\AppData\Local\Programs\Python\Python312\Lib\site-packages\open_webui\data\webui.db"
TOOLS_DIR = r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\tools"
USER_ID = "059a9be7-b5a5-4be9-88d1-7e0e0fa2548d"

TOOLS_METADATA = [
    {
        "id": "hadith_corpus_search",
        "name": "Hadith Corpus & Connections Search",
        "filename": "hadith_corpus_search_tool.py",
        "description": "Full-text search across 60,000+ hadiths, cross-collection parallel hadiths (50k links), and thematic families.",
        "version": "1.0.0",
        "specs": [
            {
                "name": "search_hadith_corpus",
                "description": "Search 60,000+ hadiths across collections using normalized, tashkeel-insensitive matching.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "query": {"type": "string", "description": "Arabic keywords or phrase to search (e.g. 'كسفت الشمس')."},
                        "book": {"type": "string", "default": "all", "description": "Target collection ('bukhari', 'muslim', 'abudawud', etc.) or 'all'."},
                        "limit": {"type": "integer", "default": 5, "description": "Maximum number of hadiths to return."}
                    },
                    "required": ["query"]
                }
            },
            {
                "name": "get_hadith_by_number",
                "description": "Fetch full hadith text by canonical book and hadith number with local cache and CDN fallback.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "book": {"type": "string", "description": "Collection name: 'bukhari', 'muslim', 'tirmidhi', 'abudawud', 'nasai', 'ibnmajah', 'malik'."},
                        "hadith_number": {"type": "integer", "description": "Canonical Hadith number (> 0)."},
                        "language": {"type": "string", "default": "ar", "description": "'ar' for Arabic, 'en' for English."}
                    },
                    "required": ["book", "hadith_number"]
                }
            },
            {
                "name": "get_hadith_connections",
                "description": "Discover parallel hadiths (Turuq & Shawahid) across 17 Hadith collections with shared keywords and similarity scores.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "book": {"type": "string", "description": "Collection name of source hadith."},
                        "hadith_number": {"type": "integer", "description": "Number of the source hadith."},
                        "limit": {"type": "integer", "default": 5, "description": "Maximum parallel connections to return."}
                    },
                    "required": ["book", "hadith_number"]
                }
            },
            {
                "name": "get_thematic_family",
                "description": "Explore thematic Hadith families (e.g. 'prayer', 'knowledge', 'creation', 'guidance') and their lexical roots.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "family_id_or_keyword": {"type": "string", "description": "Family identifier or keyword (e.g. 'prayer', 'worship')."}
                    },
                    "required": ["family_id_or_keyword"]
                }
            }
        ]
    },
    {
        "id": "hadith_takhrij",
        "name": "Hadith Takhrij & Scholar Verification",
        "filename": "hadith_takhrij_tool.py",
        "description": "Multi-scholar takhrij, authenticity rulings (al-Albani, Ibn Hajar, al-Arna'ut, al-Dhahabi), and source citations via Dorar al-Sunniyyah.",
        "version": "1.0.0",
        "specs": [
            {
                "name": "search_dorar_hadith",
                "description": "Search Dorar al-Sunniyyah hadith database to verify authenticity gradings, multi-scholar rulings, and source citations.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "query": {"type": "string", "description": "Arabic text fragment to search for."},
                        "page": {"type": "integer", "default": 1, "description": "Page number for pagination."}
                    },
                    "required": ["query"]
                }
            },
            {
                "name": "get_hadith_takhrij_summary",
                "description": "Synthesizes multi-scholar takhrij from Dorar, categorizing scholar rulings into consensus, primary narrators, and book sources.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "query": {"type": "string", "description": "Arabic text fragment to takhrij."}
                    },
                    "required": ["query"]
                }
            }
        ]
    },
    {
        "id": "hadith_sharh_vocab",
        "name": "Hadith Sharh & Gharib Vocab",
        "filename": "hadith_sharh_vocab_tool.py",
        "description": "Comprehensive Hadith commentary (Sharh) from HadeethEnc combined with classical Gharib al-Hadith vocabulary lexicon (33k+ definitions) and Lane's Lexicon root etymology.",
        "version": "1.0.0",
        "specs": [
            {
                "name": "get_hadith_explanation",
                "description": "Search HadeethEnc to retrieve detailed hadith commentary (Sharh), vocabulary meanings, and derived benefits.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "query": {"type": "string", "description": "Keywords or text of the hadith."},
                        "language": {"type": "string", "default": "ar", "description": "'ar' for Arabic, 'en' for English."}
                    },
                    "required": ["query"]
                }
            },
            {
                "name": "lookup_gharib_word",
                "description": "Look up a rare or difficult hadith word in the Gharib al-Hadith lexicon (33k+ definitions) with root and morphological analysis.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "word": {"type": "string", "description": "Arabic word to look up (e.g. 'عسعس', 'كسفت')."}
                    },
                    "required": ["word"]
                }
            },
            {
                "name": "lookup_root_lexicon",
                "description": "Look up classical Arabic root etymology and comprehensive Lane's Lexicon definition.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "root": {"type": "string", "description": "3-letter Arabic root (e.g. 'خسف', 'سلم')."}
                    },
                    "required": ["root"]
                }
            },
            {
                "name": "search_vocab_meaning",
                "description": "Search the vocabulary lexicon using English concepts/terms via full-text search (FTS5).",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "english_concept": {"type": "string", "description": "English keyword or concept to search (e.g. 'slave', 'eclipse')."},
                        "limit": {"type": "integer", "default": 5, "description": "Maximum entries to return."}
                    },
                    "required": ["english_concept"]
                }
            }
        ]
    },
    {
        "id": "hadith_isnad_tree",
        "name": "Hadith Isnad Visualizer & Tree",
        "filename": "hadith_isnad_tree_tool.py",
        "description": "Reconstructs transmission chains (Isnad), disambiguates relatives ('عن أبيه') and kunyas, matches 115k Rijal credibility grades, and renders color-coded Mermaid flowcharts.",
        "version": "1.0.0",
        "specs": [
            {
                "name": "get_hadith_isnad_tree",
                "description": "Build a complete Mermaid transmission graph for a hadith, resolving kunyas, relative references, and narrator grades.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "book": {"type": "string", "description": "Collection name: 'bukhari', 'muslim', 'tirmidhi', 'abudawud', 'nasai', 'ibnmajah', 'malik'."},
                        "hadith_number": {"type": "integer", "description": "Canonical Hadith number."}
                    },
                    "required": ["book", "hadith_number"]
                }
            },
            {
                "name": "disambiguate_narrator",
                "description": "Disambiguate a narrator's kunya or relative mention ('عن أبيه', 'عن جده') using Itqan disambiguation tables.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "name": {"type": "string", "description": "Narrator name or previous narrator in chain."},
                        "relation": {"type": "string", "default": "", "description": "Optional relation type ('father', 'grandfather', 'grandmother', 'mother', 'uncle')."}
                    },
                    "required": ["name"]
                }
            }
        ]
    },
    {
        "id": "hadith_narrator",
        "name": "Hadith Narrator (Rijal) Biography & Network",
        "filename": "hadith_narrator_tool.py",
        "description": "Biographical lookup across 115,735 Hadith narrators, Jarh wa Ta'dil credibility evaluations, death dates, tabaqat, and book-level transmission networks.",
        "version": "1.0.0",
        "specs": [
            {
                "name": "search_narrator",
                "description": "Search the 115,735 Rijal database using full-text search (FTS5) or normalized Arabic matching.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "query": {"type": "string", "description": "Name, kunya, or title of the narrator."},
                        "limit": {"type": "integer", "default": 5, "description": "Maximum results to return."}
                    },
                    "required": ["query"]
                }
            },
            {
                "name": "get_narrator_biography",
                "description": "Fetch complete biographical profile of a narrator by their database ID.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "narrator_id": {"type": "integer", "description": "Integer ID of the narrator."}
                    },
                    "required": ["narrator_id"]
                }
            },
            {
                "name": "get_book_narrator_network",
                "description": "Inspect precomputed transmission network for a specific canonical book, revealing central narrators and their links.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "book": {"type": "string", "description": "Collection name: 'bukhari', 'muslim', 'tirmidhi', 'abudawud', 'nasai', 'ibnmajah', 'ahmed', 'malik', 'darimi'."},
                        "narrator_name": {"type": "string", "default": "", "description": "Optional narrator name to focus on."}
                    },
                    "required": ["book"]
                }
            }
        ]
    }
]

def main():
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')

    print(f"Connecting to Open WebUI SQLite DB: {WEBUI_DB_PATH}...")
    conn = sqlite3.connect(WEBUI_DB_PATH)
    cur = conn.cursor()
    now_ts = int(time.time())

    for tool in TOOLS_METADATA:
        tool_id = tool["id"]
        tool_name = tool["name"]
        filename = tool["filename"]
        py_path = os.path.join(TOOLS_DIR, filename)

        if not os.path.exists(py_path):
            print(f"  [ERROR] Code file not found: {py_path}")
            continue

        with open(py_path, "r", encoding="utf-8") as f:
            code_content = f.read()

        meta_obj = {
            "description": tool["description"],
            "manifest": {
                "title": tool_name,
                "author": "Hadith Project",
                "author_url": "https://github.com/hadith-ksa",
                "version": tool["version"],
                "description": tool["description"]
            }
        }

        # 1. Export JSON manifest in tools directory
        json_path = os.path.join(TOOLS_DIR, f"{tool_id}.json")
        export_bundle = {
            "id": tool_id,
            "name": tool_name,
            "meta": meta_obj,
            "specs": tool["specs"],
            "content": code_content
        }
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(export_bundle, f, ensure_ascii=False, indent=2)
        print(f"  [OK] Exported JSON bundle: {json_path}")

        # 2. Upsert into Open WebUI SQLite database
        cur.execute("""
            INSERT INTO tool (id, user_id, name, content, specs, meta, valves, updated_at, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                name=excluded.name,
                content=excluded.content,
                specs=excluded.specs,
                meta=excluded.meta,
                valves=excluded.valves,
                updated_at=excluded.updated_at;
        """, (
            tool_id,
            USER_ID,
            tool_name,
            code_content,
            json.dumps(tool["specs"], ensure_ascii=False),
            json.dumps(meta_obj, ensure_ascii=False),
            None,
            now_ts,
            now_ts
        ))
        conn.commit()
        print(f"  [OK] Registered tool in Open WebUI DB: {tool_id} ({tool_name})")

    # List all registered tools in Open WebUI
    cur.execute("SELECT id, name, updated_at FROM tool ORDER BY created_at;")
    all_tools = cur.fetchall()
    print("\n=== Current Tools in Open WebUI ===")
    for t in all_tools:
        print(f"  - {t[0]:25} | {t[1]}")

    conn.close()
    print("\nAll modular micro-tools registered successfully!")

if __name__ == "__main__":
    main()
