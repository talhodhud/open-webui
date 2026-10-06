import sqlite3
import sys

sys.stdout.reconfigure(encoding='utf-8')
conn = sqlite3.connect('hadith_rijal.db')
c = conn.cursor()

c.execute("SELECT id, book, chapter, hadith_id, id_in_book, SUBSTR(arabic_text, 1, 100) FROM hadiths WHERE arabic_text LIKE '%الصلاة جامعة%'")
rows = c.fetchall()
print(f"Total matching hadiths: {len(rows)}")
for r in rows:
    print(f"ID={r[0]} | Book={r[1]} | Chapter={r[2]} | hadith_id(in chapter)={r[3]} | id_in_book(GLOBAL)={r[4]}")
    print(f"  Text: {r[5]}...")

conn.close()
