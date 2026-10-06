import sqlite3
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

def normalize_text(text: str) -> str:
    if not text:
        return ""
    t = re.sub(r'[\u064B-\u065F\u0670\u0610-\u061A\u06D6-\u06ED]', '', text)
    t = t.replace('\u0640', '')
    t = re.sub(r'[إأآٱ]', 'ا', t)
    t = re.sub(r'ة', 'ه', t)
    t = re.sub(r'ى', 'ي', t)
    return t.strip()

conn = sqlite3.connect('hadith_rijal.db')
conn.create_function("NORM_AR", 1, normalize_text)
c = conn.cursor()

c.execute("""
    SELECT book, chapter, hadith_id, id_in_book, SUBSTR(arabic_text, 1, 90)
    FROM hadiths
    WHERE NORM_AR(arabic_text) LIKE '%الصلاه جامعه%'
""")
rows = c.fetchall()
print(f"Total matching hadiths with normalized Arabic: {len(rows)}")
for r in rows:
    print(f"{r[0]:10} | ch={r[1]:3} | hadith_id={r[2]:4} | id_in_book(GLOBAL)={r[3]:5} | {r[4]}")

conn.close()
