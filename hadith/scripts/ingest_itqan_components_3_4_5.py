"""
ingest_itqan_components_3_4_5.py
================================
ETL script to ingest untapped Itqan components into hadith_rijal.db:
- Component 3: Isnad disambiguation maps (kunya, father, grandfather, grandmother, mother, uncle)
- Component 4: Thematic Hadith families & cross-hadith parallel connections
- Component 5: Gharib al-Hadith vocabulary lexicon (33k+ definitions) & classical Arabic roots (1,651 roots) + FTS5
"""

import os
import sys
import json
import re
import sqlite3
import time

DB_PATH = r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\hadith_rijal.db"
ITQAN_REPO = r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\itqan-repo"

def normalize_arabic(text: str) -> str:
    """Normalize Arabic text for resilient indexing and searching."""
    if not text:
        return ""
    # Strip tashkeel / harakat
    t = re.sub(r'[\u064B-\u065F\u0670\u0610-\u061A\u06D6-\u06ED]', '', text)
    # Strip tatweel / kashida
    t = t.replace('\u0640', '')
    # Normalize alefs
    t = re.sub(r'[إأآٱ]', 'ا', t)
    # Normalize teh marbuta
    t = re.sub(r'ة', 'ه', t)
    # Normalize alef maksura
    t = re.sub(r'ى', 'ي', t)
    return t.strip()

def create_tables(conn: sqlite3.Connection):
    cur = conn.cursor()
    print("Creating/verifying database tables...")

    # Component 3: Kunya Map
    cur.execute("""
    CREATE TABLE IF NOT EXISTS isnad_kunya_map (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        kunya TEXT UNIQUE NOT NULL,
        kunya_norm TEXT NOT NULL,
        real_name TEXT NOT NULL,
        real_name_norm TEXT NOT NULL,
        name_en TEXT,
        note TEXT
    );
    """)
    cur.execute("CREATE INDEX IF NOT EXISTS idx_kunya_norm ON isnad_kunya_map(kunya_norm);")

    # Component 3: Relative Disambiguation Map
    cur.execute("""
    CREATE TABLE IF NOT EXISTS isnad_relative_map (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        relation_type TEXT NOT NULL,
        narrator TEXT NOT NULL,
        narrator_norm TEXT NOT NULL,
        relative_name TEXT NOT NULL,
        relative_name_norm TEXT NOT NULL,
        note TEXT,
        UNIQUE(relation_type, narrator)
    );
    """)
    cur.execute("CREATE INDEX IF NOT EXISTS idx_rel_narrator_norm ON isnad_relative_map(relation_type, narrator_norm);")

    # Component 4: Thematic Families
    cur.execute("""
    CREATE TABLE IF NOT EXISTS hadith_families (
        family_id TEXT PRIMARY KEY,
        name_ar TEXT NOT NULL,
        name_en TEXT,
        meaning TEXT,
        root_count INTEGER,
        ayah_count INTEGER,
        hadith_count INTEGER,
        roots_json TEXT,
        ayahs_json TEXT,
        root_stats_json TEXT,
        book_breakdown_json TEXT
    );
    """)

    # Component 4: Cross-Hadith Connections
    cur.execute("""
    CREATE TABLE IF NOT EXISTS hadith_connections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        source_hadith_id TEXT NOT NULL,
        source_book TEXT NOT NULL,
        source_num INTEGER NOT NULL,
        target_hadith_id TEXT NOT NULL,
        target_book TEXT NOT NULL,
        target_num INTEGER NOT NULL,
        shared_terms TEXT,
        shared_secondary TEXT,
        shared_families TEXT,
        similarity_score INTEGER NOT NULL
    );
    """)
    cur.execute("CREATE INDEX IF NOT EXISTS idx_conn_source ON hadith_connections(source_book, source_num);")
    cur.execute("CREATE INDEX IF NOT EXISTS idx_conn_source_id ON hadith_connections(source_hadith_id);")
    cur.execute("CREATE INDEX IF NOT EXISTS idx_conn_target_id ON hadith_connections(target_hadith_id);")
    cur.execute("CREATE INDEX IF NOT EXISTS idx_conn_score ON hadith_connections(similarity_score DESC);")

    # Component 5: Vocabulary / Lexicon
    cur.execute("""
    CREATE TABLE IF NOT EXISTS hadith_vocab (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word TEXT NOT NULL,
        word_norm TEXT NOT NULL,
        root TEXT NOT NULL,
        root_dotted TEXT,
        transliteration TEXT,
        definition TEXT,
        frequency INTEGER,
        lemma TEXT,
        pos TEXT,
        form TEXT,
        aspect TEXT,
        UNIQUE(word, root)
    );
    """)
    cur.execute("CREATE INDEX IF NOT EXISTS idx_vocab_word ON hadith_vocab(word);")
    cur.execute("CREATE INDEX IF NOT EXISTS idx_vocab_word_norm ON hadith_vocab(word_norm);")
    cur.execute("CREATE INDEX IF NOT EXISTS idx_vocab_root ON hadith_vocab(root);")

    # Component 5: Roots Lexicon
    cur.execute("""
    CREATE TABLE IF NOT EXISTS hadith_roots (
        root TEXT PRIMARY KEY,
        buckwalter TEXT,
        definition_en TEXT,
        summary_en TEXT,
        quran_freq INTEGER
    );
    """)

    # Component 5: FTS5 Full-Text Search on Vocabulary
    cur.execute("""
    CREATE VIRTUAL TABLE IF NOT EXISTS hadith_vocab_fts USING fts5(
        word,
        root,
        definition,
        content='hadith_vocab',
        content_rowid='id'
    );
    """)

    conn.commit()
    print("Tables and indexes successfully initialized.")

def ingest_component_3(conn: sqlite3.Connection):
    """Ingest isnad kunya map and relative maps."""
    cur = conn.cursor()
    src_dir = os.path.join(ITQAN_REPO, "src")
    print("\n--- Ingesting Component 3: Isnad Disambiguation Maps ---")

    # 1. Kunya map
    kunya_file = os.path.join(src_dir, "isnad_kunya_map.json")
    if os.path.exists(kunya_file):
        with open(kunya_file, "r", encoding="utf-8") as f:
            data = json.load(f)
        rows = []
        for kunya, info in data.items():
            if kunya.startswith("_") or not isinstance(info, dict):
                continue
            real_name = info.get("real", "")
            en_name = info.get("en", "")
            note = info.get("note", "")
            rows.append((
                kunya.strip(),
                normalize_arabic(kunya),
                real_name.strip(),
                normalize_arabic(real_name),
                en_name.strip(),
                note.strip()
            ))
        cur.executemany("""
        INSERT INTO isnad_kunya_map (kunya, kunya_norm, real_name, real_name_norm, name_en, note)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(kunya) DO UPDATE SET
            kunya_norm=excluded.kunya_norm,
            real_name=excluded.real_name,
            real_name_norm=excluded.real_name_norm,
            name_en=excluded.name_en,
            note=excluded.note;
        """, rows)
        conn.commit()
        print(f"  [OK] Ingested {len(rows)} entries into isnad_kunya_map.")

    # 2. Relative maps
    rel_files = [
        ("father", "isnad_father_map.json"),
        ("grandfather", "isnad_grandfather_map.json"),
        ("grandmother", "isnad_grandmother_map.json"),
        ("mother", "isnad_mother_map.json"),
        ("uncle", "isnad_uncle_map.json")
    ]

    total_rel = 0
    for rel_type, fname in rel_files:
        fpath = os.path.join(src_dir, fname)
        if not os.path.exists(fpath):
            continue
        with open(fpath, "r", encoding="utf-8") as f:
            data = json.load(f)
        rows = []
        for narr, rel_name in data.items():
            if narr.startswith("_") or not isinstance(rel_name, str):
                continue
            rows.append((
                rel_type,
                narr.strip(),
                normalize_arabic(narr),
                rel_name.strip(),
                normalize_arabic(rel_name),
                f"Resolved via {fname}"
            ))
        cur.executemany("""
        INSERT INTO isnad_relative_map (relation_type, narrator, narrator_norm, relative_name, relative_name_norm, note)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(relation_type, narrator) DO UPDATE SET
            narrator_norm=excluded.narrator_norm,
            relative_name=excluded.relative_name,
            relative_name_norm=excluded.relative_name_norm,
            note=excluded.note;
        """, rows)
        conn.commit()
        total_rel += len(rows)
        print(f"  [OK] Ingested {len(rows)} entries for '{rel_type}' from {fname}.")

    print(f"Component 3 complete: Total relative mappings = {total_rel}.")

def ingest_component_4(conn: sqlite3.Connection):
    """Ingest thematic families and cross-hadith connections."""
    cur = conn.cursor()
    data_dir = os.path.join(ITQAN_REPO, "app", "data")
    print("\n--- Ingesting Component 4: Hadith Families & Connections ---")

    # 1. Hadith Families
    fam_file = os.path.join(data_dir, "family_corpus.json")
    if os.path.exists(fam_file):
        with open(fam_file, "r", encoding="utf-8") as f:
            families = json.load(f)
        fam_rows = []
        for fam_id, data in families.items():
            name_ar = data.get("name_ar", "")
            meaning = data.get("meaning", "")
            roots = data.get("roots", [])
            ayahs = data.get("ayahs", [])
            hadith_ids = data.get("hadith_ids", [])
            root_stats = data.get("root_stats", [])
            book_breakdown = data.get("book_breakdown", {})

            fam_rows.append((
                fam_id,
                name_ar,
                fam_id.replace("_", " ").title(),
                meaning,
                len(roots),
                len(ayahs),
                len(hadith_ids),
                json.dumps(roots, ensure_ascii=False),
                json.dumps(ayahs, ensure_ascii=False),
                json.dumps(root_stats, ensure_ascii=False),
                json.dumps(book_breakdown, ensure_ascii=False)
            ))
        cur.executemany("""
        INSERT INTO hadith_families (family_id, name_ar, name_en, meaning, root_count, ayah_count, hadith_count,
                                     roots_json, ayahs_json, root_stats_json, book_breakdown_json)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(family_id) DO UPDATE SET
            name_ar=excluded.name_ar,
            name_en=excluded.name_en,
            meaning=excluded.meaning,
            root_count=excluded.root_count,
            ayah_count=excluded.ayah_count,
            hadith_count=excluded.hadith_count,
            roots_json=excluded.roots_json,
            ayahs_json=excluded.ayahs_json,
            root_stats_json=excluded.root_stats_json,
            book_breakdown_json=excluded.book_breakdown_json;
        """, fam_rows)
        conn.commit()
        print(f"  [OK] Ingested {len(fam_rows)} thematic families into hadith_families.")

    # 2. Cross-hadith connections
    conn_file = os.path.join(data_dir, "hadith_connections.json")
    if os.path.exists(conn_file):
        with open(conn_file, "r", encoding="utf-8") as f:
            connections = json.load(f)
        
        # Clear existing connections to do clean bulk insert
        cur.execute("DELETE FROM hadith_connections;")
        
        conn_rows = []
        for src_id, targets in connections.items():
            src_parts = src_id.split(":")
            if len(src_parts) != 2:
                continue
            src_book = src_parts[0]
            try:
                src_num = int(src_parts[1])
            except ValueError:
                continue

            for tgt in targets:
                tgt_id = tgt.get("id", "")
                tgt_parts = tgt_id.split(":")
                if len(tgt_parts) != 2:
                    continue
                tgt_book = tgt_parts[0]
                try:
                    tgt_num = int(tgt_parts[1])
                except ValueError:
                    continue

                shared_terms = json.dumps(tgt.get("t1", []), ensure_ascii=False)
                shared_sec = json.dumps(tgt.get("t2", []), ensure_ascii=False)
                shared_fam = json.dumps(tgt.get("t3", []), ensure_ascii=False)
                score = int(tgt.get("score", 0))

                conn_rows.append((
                    src_id,
                    src_book,
                    src_num,
                    tgt_id,
                    tgt_book,
                    tgt_num,
                    shared_terms,
                    shared_sec,
                    shared_fam,
                    score
                ))

        print(f"  Inserting {len(conn_rows):,} connection edges...")
        # Batch insert for high performance
        batch_size = 5000
        for i in range(0, len(conn_rows), batch_size):
            cur.executemany("""
            INSERT INTO hadith_connections (source_hadith_id, source_book, source_num,
                                           target_hadith_id, target_book, target_num,
                                           shared_terms, shared_secondary, shared_families, similarity_score)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            """, conn_rows[i:i+batch_size])
            conn.commit()

        print(f"  [OK] Ingested {len(conn_rows):,} hadith connection links.")

def ingest_component_5(conn: sqlite3.Connection):
    """Ingest Gharib al-Hadith vocabulary, roots lexicon, and FTS5 index."""
    cur = conn.cursor()
    data_dir = os.path.join(ITQAN_REPO, "app", "data")
    print("\n--- Ingesting Component 5: Vocabulary & Roots Lexicon ---")

    # 1. Roots Lexicon
    roots_file = os.path.join(data_dir, "roots_lexicon.json")
    if os.path.exists(roots_file):
        with open(roots_file, "r", encoding="utf-8") as f:
            roots_data = json.load(f)
        root_rows = []
        for root, d in roots_data.items():
            root_rows.append((
                root.strip(),
                d.get("buckwalter", "").strip(),
                d.get("definition_en", "").strip(),
                d.get("summary_en", "").strip(),
                d.get("quran_freq", 0)
            ))
        cur.executemany("""
        INSERT INTO hadith_roots (root, buckwalter, definition_en, summary_en, quran_freq)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(root) DO UPDATE SET
            buckwalter=excluded.buckwalter,
            definition_en=excluded.definition_en,
            summary_en=excluded.summary_en,
            quran_freq=excluded.quran_freq;
        """, root_rows)
        conn.commit()
        print(f"  [OK] Ingested {len(root_rows)} roots into hadith_roots.")

    # 2. Word definitions (Gharib al-Hadith)
    vocab_file = os.path.join(data_dir, "word_defs_v2.json")
    if os.path.exists(vocab_file):
        with open(vocab_file, "r", encoding="utf-8") as f:
            defs_data = json.load(f)
        
        cur.execute("DELETE FROM hadith_vocab;")
        conn.commit()

        vocab_rows = []
        for word, d in defs_data.items():
            if not isinstance(d, dict):
                continue
            root = d.get("r", "").strip()
            vocab_rows.append((
                word.strip(),
                normalize_arabic(word),
                root,
                d.get("rc", "").strip(),
                d.get("s", "").strip(),
                d.get("g", "").strip(),
                d.get("n", 0),
                d.get("lem", "").strip(),
                d.get("pos", "").strip(),
                d.get("form", "").strip(),
                d.get("asp", "").strip()
            ))

        print(f"  Inserting {len(vocab_rows):,} vocabulary definitions...")
        batch_size = 5000
        for i in range(0, len(vocab_rows), batch_size):
            cur.executemany("""
            INSERT OR IGNORE INTO hadith_vocab (word, word_norm, root, root_dotted, transliteration,
                                               definition, frequency, lemma, pos, form, aspect)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            """, vocab_rows[i:i+batch_size])
            conn.commit()

        print(f"  [OK] Ingested {len(vocab_rows):,} vocabulary entries.")

        # 3. Populate FTS5 table
        print("  Rebuilding hadith_vocab_fts index...")
        cur.execute("INSERT INTO hadith_vocab_fts(hadith_vocab_fts) VALUES('rebuild');")
        conn.commit()
        print("  [OK] hadith_vocab_fts populated successfully.")

def run_verification(conn: sqlite3.Connection):
    """Run sanity checks and query validation."""
    cur = conn.cursor()
    print("\n=== Ingestion Verification & Sanity Checks ===")

    # Table counts
    tables = [
        "isnad_kunya_map",
        "isnad_relative_map",
        "hadith_families",
        "hadith_connections",
        "hadith_roots",
        "hadith_vocab",
        "hadith_vocab_fts"
    ]
    for t in tables:
        cur.execute(f"SELECT count(*) FROM [{t}]")
        cnt = cur.fetchone()[0]
        print(f"  Table {t:22}: {cnt:>8,} rows")

    # Test query 1: Kunya lookup
    cur.execute("SELECT kunya, real_name, name_en FROM isnad_kunya_map WHERE kunya_norm='ابو هريره' LIMIT 1")
    row = cur.fetchone()
    print(f"\n[Test 1] Kunya Lookup (أبو هريرة): {row}")

    # Test query 2: Relative lookup
    cur.execute("SELECT relation_type, narrator, relative_name FROM isnad_relative_map WHERE narrator_norm LIKE '%هشام بن عروه%'")
    rows = cur.fetchall()
    print(f"[Test 2] Relative Lookup (هشام بن عروة -> أبيه): {rows}")

    # Test query 3: Parallel hadiths
    cur.execute("""
    SELECT target_hadith_id, target_book, target_num, similarity_score, shared_terms
    FROM hadith_connections
    WHERE source_hadith_id='abudawud:1'
    ORDER BY similarity_score DESC LIMIT 3
    """)
    conn_rows = cur.fetchall()
    print(f"[Test 3] Connections for Abu Dawud #1: {conn_rows}")

    # Test query 4: Gharib vocabulary lookup
    cur.execute("SELECT word, root, definition FROM hadith_vocab WHERE word_norm='عبد' LIMIT 1")
    vocab_row = cur.fetchone()
    print(f"[Test 4] Vocab lookup ('عبد'): {vocab_row[0]} -> Root: {vocab_row[1]}, Def: {vocab_row[2][:60]}...")

    # Test query 5: FTS5 search
    cur.execute("SELECT word, root, definition FROM hadith_vocab_fts WHERE hadith_vocab_fts MATCH 'slave' LIMIT 1")
    fts_row = cur.fetchone()
    print(f"[Test 5] FTS5 search ('slave'): {fts_row[0]} -> Root: {fts_row[1]}")

def main():
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    t0 = time.time()
    print(f"Starting ETL ingestion into {DB_PATH}...")
    conn = sqlite3.connect(DB_PATH)
    try:
        create_tables(conn)
        ingest_component_3(conn)
        ingest_component_4(conn)
        ingest_component_5(conn)
        run_verification(conn)
    finally:
        conn.close()
    print(f"\nAll ETL tasks completed successfully in {time.time() - t0:.2f} seconds.")

if __name__ == "__main__":
    main()
