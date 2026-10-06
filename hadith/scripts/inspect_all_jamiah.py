import sqlite3
import sys

sys.stdout.reconfigure(encoding='utf-8')
conn = sqlite3.connect('hadith_rijal.db')
c = conn.cursor()

c.execute("""
    SELECT book, chapter, hadith_id, id_in_book, SUBSTR(arabic_text, 1, 90)
    FROM hadiths
    WHERE arabic_text LIKE '%جامعة%' OR arabic_text LIKE '%جامعه%'
""")
for r in c.fetchall():
    print(f"{r[0]:10} | ch={r[1]:3} | hadith_id={r[2]:4} | id_in_book(GLOBAL)={r[3]:5} | {r[4]}")

conn.close()
