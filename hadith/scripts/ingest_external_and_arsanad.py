import sqlite3
import pandas as pd
import json
import re
import os
import sys

def normalize_arabic(text: str) -> str:
    if not text:
        return ""
    t = re.sub(r'[\u064B-\u065F\u0670\u0610-\u061A\u06D6-\u06ED]', '', text)
    t = t.replace('\u0640', '')
    t = re.sub(r'[إأآٱ]', 'ا', t)
    t = re.sub(r'ة', 'ه', t)
    t = re.sub(r'ى', 'ي', t)
    return re.sub(r'\s+', ' ', t).strip()

def main():
    db_path = r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\hadith_rijal.db"
    arsanad_csv = r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\itqan-repo\src\arsanad_narrators.csv"
    ext_json = r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\itqan-repo\src\external_narrators_db.json"

    print(f"Connecting to {db_path}...")
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()

    cur.execute("PRAGMA journal_mode = WAL;")
    cur.execute("PRAGMA synchronous = NORMAL;")

    # 1. Ingest arsanad_narrators
    print("Creating table arsanad_narrators...")
    cur.execute("""
    CREATE TABLE IF NOT EXISTS arsanad_narrators (
        id INTEGER PRIMARY KEY,
        name TEXT,
        name_norm TEXT,
        ibnhajar_rank TEXT,
        zahabi_rank TEXT,
        tabaqa TEXT,
        living_city TEXT,
        death_year TEXT,
        birth_year TEXT,
        death_city TEXT,
        journey_city TEXT,
        mazhab TEXT,
        selat_karaba TEXT,
        shuhra TEXT,
        laqab TEXT,
        nasab TEXT
    );
    """)

    print(f"Reading {arsanad_csv}...")
    df = pd.read_csv(arsanad_csv)
    df = df.fillna("-")
    
    rows = []
    for _, r in df.iterrows():
        nid = int(r["id"])
        name = str(r["name"]).strip()
        name_norm = normalize_arabic(name)
        ibnhajar = str(r.get("Ibnhajar_rank", "-")).strip()
        zahabi = str(r.get("zahabi_rank", "-")).strip()
        tabaqa = str(r.get("tabaqa", "-")).strip()
        living_city = str(r.get("living_city", "-")).strip()
        death_year = str(r.get("death_year", "-")).strip()
        birth_year = str(r.get("birth_year", "-")).strip()
        death_city = str(r.get("death_city", "-")).strip()
        journey_city = str(r.get("journey_city", "-")).strip()
        mazhab = str(r.get("mazhab", "-")).strip()
        selat_karaba = str(r.get("selat_karaba", "-")).strip()
        shuhra = str(r.get("shuhra", "-")).strip()
        laqab = str(r.get("laqab", "-")).strip()
        nasab = str(r.get("nasab", "-")).strip()

        rows.append((
            nid, name, name_norm, ibnhajar, zahabi, tabaqa,
            living_city, death_year, birth_year, death_city, journey_city,
            mazhab, selat_karaba, shuhra, laqab, nasab
        ))

    cur.execute("DELETE FROM arsanad_narrators;")
    cur.executemany("""
    INSERT INTO arsanad_narrators VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
    """, rows)
    cur.execute("CREATE INDEX IF NOT EXISTS idx_arsanad_name_norm ON arsanad_narrators(name_norm);")
    conn.commit()
    print(f"Inserted {len(rows)} rows into arsanad_narrators.")

    # 2. Ingest external_narrators_db.json
    print("Creating table narrator_scholars...")
    cur.execute("""
    CREATE TABLE IF NOT EXISTS narrator_scholars (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key_id TEXT,
        name TEXT,
        name_norm TEXT,
        full_name_formal TEXT,
        kunya TEXT,
        laqab TEXT,
        nasab TEXT,
        living_city TEXT,
        death_year TEXT,
        tabaqa TEXT,
        ibnhajar_rank TEXT,
        zahabi_rank TEXT,
        quotes_json TEXT
    );
    """)

    print(f"Reading {ext_json}...")
    with open(ext_json, "r", encoding="utf-8") as f:
        ext_data = json.load(f)

    ext_rows = []
    for k, v in ext_data.items():
        name = v.get("name", "")
        name_norm = normalize_arabic(name)
        d = v.get("data", {})
        formal_name = d.get("الاسم", "")
        kunya = d.get("الكنية", "")
        laqab = d.get("اللقب", "")
        nasab = d.get("النسب", "")
        living_city = d.get("بلد الإقامة", "")
        death_year = d.get("تاريخ الوفاة", "")
        tabaqa = d.get("طبقة رواة التقريب", "")
        ibnhajar = d.get("الرتبة عند ابن حجر", "")
        zahabi = d.get("الرتبة عند الذهبي", "")
        quotes = json.dumps(d.get("الجرح والتعديل", {}), ensure_ascii=False)

        ext_rows.append((
            str(k), name, name_norm, formal_name, kunya, laqab, nasab,
            living_city, death_year, tabaqa, ibnhajar, zahabi, quotes
        ))

    cur.execute("DELETE FROM narrator_scholars;")
    cur.executemany("""
    INSERT INTO narrator_scholars (
        key_id, name, name_norm, full_name_formal, kunya, laqab, nasab,
        living_city, death_year, tabaqa, ibnhajar_rank, zahabi_rank, quotes_json
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);
    """, ext_rows)
    cur.execute("CREATE INDEX IF NOT EXISTS idx_scholars_name_norm ON narrator_scholars(name_norm);")
    conn.commit()
    print(f"Inserted {len(ext_rows)} rows into narrator_scholars.")

    # 3. Create FTS5 table for fast scholar search
    cur.execute("DROP TABLE IF EXISTS narrator_scholars_fts;")
    cur.execute("""
    CREATE VIRTUAL TABLE narrator_scholars_fts USING fts5(
        id UNINDEXED,
        name,
        name_norm,
        full_name_formal,
        kunya
    );
    """)
    cur.execute("""
    INSERT INTO narrator_scholars_fts (id, name, name_norm, full_name_formal, kunya)
    SELECT id, name, name_norm, full_name_formal, kunya FROM narrator_scholars;
    """)
    conn.commit()
    print("Built narrator_scholars_fts virtual index.")

    conn.close()
    print("Database enrichment complete!")

if __name__ == "__main__":
    main()
