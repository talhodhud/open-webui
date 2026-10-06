import sqlite3
import re

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
    SELECT id, book, chapter, hadith_id, id_in_book, SUBSTR(arabic_text, 1, 100)
    FROM hadiths
    WHERE LOWER(book) = 'abudawud' AND NORM_AR(arabic_text) LIKE '%الصلاه جامعه%'
""")
print("Abu Dawud rows:", c.fetchall())

c.execute("""
    SELECT id, book, chapter, hadith_id, id_in_book, SUBSTR(arabic_text, 1, 100)
    FROM hadiths
    WHERE LOWER(book) = 'muslim' AND NORM_AR(arabic_text) LIKE '%الصلاه جامعه%'
""")
print("Muslim rows:", c.fetchall())

c.execute("""
    SELECT id, book, chapter, hadith_id, id_in_book, SUBSTR(arabic_text, 1, 100)
    FROM hadiths
    WHERE LOWER(book) = 'bukhari' AND NORM_AR(arabic_text) LIKE '%الصلاه جامعه%'
""")
print("Bukhari rows:", c.fetchall())

conn.close()
