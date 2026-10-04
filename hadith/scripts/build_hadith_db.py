import json
import sqlite3
import sys
import os
import io
from pathlib import Path

# Ensure UTF-8 output
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

DATA_DIR = Path("itqan-repo/app/data")
DB_PATH = Path("hadith_rijal.db")

def normalize_arabic(text: str) -> str:
    """Normalize Arabic text for resilient indexing and searching."""
    if not text or not isinstance(text, str):
        return ""
    text = text.replace("أ", "ا").replace("إ", "ا").replace("آ", "ا")
    text = text.replace("ة", "ه").replace("ى", "ي")
    # Remove common diacritics
    for c in ["\u064B", "\u064C", "\u064D", "\u064E", "\u064F", "\u0650", "\u0651", "\u0652"]:
        text = text.replace(c, "")
    return text.strip()

def build_database():
    print(f"Building SQLite database at: {DB_PATH.resolve()}")
    if DB_PATH.exists():
        DB_PATH.unlink()

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    # Optimize SQLite for bulk insert
    cur.execute("PRAGMA journal_mode = WAL;")
    cur.execute("PRAGMA synchronous = NORMAL;")
    cur.execute("PRAGMA cache_size = 100000;")
    cur.execute("PRAGMA foreign_keys = OFF;")

    print("Creating tables...")

    # 1. Narrators Table
    cur.execute("""
    CREATE TABLE narrators (
        id INTEGER PRIMARY KEY,
        full_name TEXT NOT NULL,
        full_name_norm TEXT,
        kunya TEXT,
        grade_ar TEXT,
        grade_en TEXT,
        death TEXT,
        city TEXT,
        tabaqat TEXT,
        laqab TEXT,
        nasab TEXT,
        classical_sources TEXT,
        teachers TEXT,
        students TEXT,
        namings TEXT
    );
    """)

    cur.execute("CREATE INDEX idx_narrators_name_norm ON narrators(full_name_norm);")
    cur.execute("CREATE INDEX idx_narrators_grade ON narrators(grade_en);")

    # 2. FTS5 Virtual Table for Instant Search
    cur.execute("""
    CREATE VIRTUAL TABLE narrators_fts USING fts5(
        id UNINDEXED,
        full_name,
        full_name_norm,
        kunya,
        namings
    );
    """)

    # 3. Isnad Graphs
    cur.execute("""
    CREATE TABLE isnad_nodes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        book TEXT NOT NULL,
        name TEXT NOT NULL,
        name_norm TEXT,
        count INTEGER,
        grade_ar TEXT,
        grade_en TEXT,
        death TEXT,
        places TEXT
    );
    """)
    cur.execute("CREATE INDEX idx_nodes_book_name ON isnad_nodes(book, name);")

    cur.execute("""
    CREATE TABLE isnad_links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        book TEXT NOT NULL,
        source_idx INTEGER,
        target_idx INTEGER,
        source_name TEXT,
        target_name TEXT,
        weight INTEGER
    );
    """)
    cur.execute("CREATE INDEX idx_links_book ON isnad_links(book);")
    cur.execute("CREATE INDEX idx_links_source ON isnad_links(source_name);")
    cur.execute("CREATE INDEX idx_links_target ON isnad_links(target_name);")

    # 4. Hadith Texts Table
    cur.execute("""
    CREATE TABLE hadiths (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        book TEXT NOT NULL,
        chapter INTEGER,
        hadith_id INTEGER,
        id_in_book INTEGER,
        arabic_text TEXT,
        english_narrator TEXT,
        english_text TEXT
    );
    """)
    cur.execute("CREATE INDEX idx_hadiths_book_num ON hadiths(book, id_in_book);")

    # -------------------------------------------------------------
    # Insert Narrators
    # -------------------------------------------------------------
    rijal_dir = DATA_DIR / "rijal"
    profile_files = [
        "profiles_companion.json",
        "profiles_reliable.json",
        "profiles_mostly_reliable.json",
        "profiles_weak.json",
        "profiles_abandoned.json",
        "profiles_fabricator.json",
        "profiles_unknown.json"
    ]

    total_narrators = 0
    batch_narrators = []
    batch_fts = []

    for filename in profile_files:
        filepath = rijal_dir / filename
        if not filepath.exists():
            print(f"Skipping {filename} (not found)")
            continue

        print(f"Processing {filename}...")
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)

        for nid, p in data.items():
            nid_int = int(p.get("id", nid))
            full_name = p.get("full_name", "")
            full_name_norm = normalize_arabic(full_name)
            kunya = p.get("kunya", "")
            grade_ar = p.get("grade_ar", "")
            grade_en = p.get("grade_en", "")
            death = str(p.get("death", "-"))
            city = str(p.get("city", "-"))
            tabaqat = str(p.get("tabaqat", "-"))
            laqab = str(p.get("laqab", "-"))
            nasab = str(p.get("nasab", "-"))
            sources_json = json.dumps(p.get("classical_sources", {}), ensure_ascii=False)
            teachers_json = json.dumps(p.get("teachers", []), ensure_ascii=False)
            students_json = json.dumps(p.get("students", []), ensure_ascii=False)
            namings_list = p.get("namings", [])
            namings_json = json.dumps(namings_list, ensure_ascii=False)

            batch_narrators.append((
                nid_int, full_name, full_name_norm, kunya, grade_ar, grade_en,
                death, city, tabaqat, laqab, nasab,
                sources_json, teachers_json, students_json, namings_json
            ))

            batch_fts.append((
                nid_int, full_name, full_name_norm, kunya, " ".join(namings_list)
            ))
            total_narrators += 1

            if len(batch_narrators) >= 10000:
                cur.executemany("""
                INSERT OR REPLACE INTO narrators VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
                """, batch_narrators)
                cur.executemany("""
                INSERT INTO narrators_fts VALUES (?,?,?,?,?);
                """, batch_fts)
                conn.commit()
                batch_narrators.clear()
                batch_fts.clear()
                print(f"  Inserted {total_narrators} narrators...")

    if batch_narrators:
        cur.executemany("INSERT OR REPLACE INTO narrators VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", batch_narrators)
        cur.executemany("INSERT INTO narrators_fts VALUES (?,?,?,?,?);", batch_fts)
        conn.commit()
        batch_narrators.clear()
        batch_fts.clear()

    print(f"Total narrators indexed: {total_narrators}")

    # -------------------------------------------------------------
    # Insert Isnad Graph
    # -------------------------------------------------------------
    isnad_file = DATA_DIR / "isnad_graph.json"
    if isnad_file.exists():
        print("Indexing isnad transmission graphs...")
        with open(isnad_file, "r", encoding="utf-8") as f:
            isnad_data = json.load(f)

        for book_name, g in isnad_data.items():
            nodes = g.get("nodes", [])
            links = g.get("links", [])
            
            # Map index to node name
            node_map = {}
            nodes_to_insert = []
            for idx, n in enumerate(nodes):
                name = n.get("id", "")
                node_map[idx] = name
                nodes_to_insert.append((
                    book_name, name, normalize_arabic(name),
                    n.get("count", 0), n.get("grade_ar", ""), n.get("grade_en", ""),
                    str(n.get("death", "")), str(n.get("places", ""))
                ))

            cur.executemany("""
            INSERT INTO isnad_nodes (book, name, name_norm, count, grade_ar, grade_en, death, places)
            VALUES (?,?,?,?,?,?,?,?);
            """, nodes_to_insert)

            links_to_insert = []
            for l in links:
                s_idx = l.get("source")
                t_idx = l.get("target")
                s_name = node_map.get(s_idx, "")
                t_name = node_map.get(t_idx, "")
                links_to_insert.append((
                    book_name, s_idx, t_idx, s_name, t_name, l.get("value", 1)
                ))

            cur.executemany("""
            INSERT INTO isnad_links (book, source_idx, target_idx, source_name, target_name, weight)
            VALUES (?,?,?,?,?,?);
            """, links_to_insert)
            conn.commit()

        print(f"Indexed isnad graphs for {len(isnad_data)} books.")

    # -------------------------------------------------------------
    # Insert Sunni Hadith Texts
    # -------------------------------------------------------------
    sunni_dir = DATA_DIR / "sunni"
    if sunni_dir.exists():
        print("Indexing Sunni hadith collections...")
        total_hadiths = 0
        batch_hadiths = []
        for book_dir in sunni_dir.iterdir():
            if not book_dir.is_dir():
                continue
            book_slug = book_dir.name
            for chapter_file in book_dir.glob("*.json"):
                if chapter_file.name == "index.json":
                    continue
                try:
                    chapter_num = int(chapter_file.stem)
                except ValueError:
                    chapter_num = 0

                with open(chapter_file, "r", encoding="utf-8") as f:
                    hadith_list = json.load(f)

                if isinstance(hadith_list, list):
                    for h in hadith_list:
                        h_id = h.get("id", 0)
                        id_in_book = h.get("idInBook", 0)
                        ar_text = h.get("arabic", "")
                        en_dict = h.get("english", {})
                        if isinstance(en_dict, dict):
                            en_narrator = en_dict.get("narrator", "")
                            en_text = en_dict.get("text", "")
                        else:
                            en_narrator = ""
                            en_text = str(en_dict)

                        batch_hadiths.append((
                            book_slug, chapter_num, h_id, id_in_book,
                            ar_text, en_narrator, en_text
                        ))
                        total_hadiths += 1

                if len(batch_hadiths) >= 5000:
                    cur.executemany("""
                    INSERT INTO hadiths (book, chapter, hadith_id, id_in_book, arabic_text, english_narrator, english_text)
                    VALUES (?,?,?,?,?,?,?);
                    """, batch_hadiths)
                    conn.commit()
                    batch_hadiths.clear()
                    print(f"  Inserted {total_hadiths} hadiths...")

        if batch_hadiths:
            cur.executemany("""
            INSERT INTO hadiths (book, chapter, hadith_id, id_in_book, arabic_text, english_narrator, english_text)
            VALUES (?,?,?,?,?,?,?);
            """, batch_hadiths)
            conn.commit()
            batch_hadiths.clear()

        print(f"Total hadiths indexed: {total_hadiths}")

    # Optimize and Close
    print("Optimizing SQLite indexes (PRAGMA optimize)...")
    cur.execute("PRAGMA optimize;")
    conn.commit()
    conn.close()

    db_size_mb = DB_PATH.stat().st_size / (1024 * 1024)
    print(f"SUCCESS! Database created: {DB_PATH.name} ({db_size_mb:.2f} MB)")

if __name__ == "__main__":
    build_database()
