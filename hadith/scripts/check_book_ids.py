import sqlite3

conn = sqlite3.connect('hadith_rijal.db')
c = conn.cursor()

c.execute("SELECT id, book, chapter, hadith_id, id_in_book FROM hadiths WHERE book='bukhari' ORDER BY id ASC LIMIT 5")
print("Bukhari first 5:", c.fetchall())

c.execute("SELECT id, book, chapter, hadith_id, id_in_book FROM hadiths WHERE book='bukhari' ORDER BY id DESC LIMIT 5")
print("Bukhari last 5:", c.fetchall())

c.execute("SELECT min(id), max(id), count(*) FROM hadiths WHERE book='bukhari'")
print("Bukhari id range:", c.fetchone())

c.execute("SELECT min(id), max(id), count(*) FROM hadiths WHERE book='muslim'")
print("Muslim id range:", c.fetchone())

c.execute("SELECT min(id), max(id), count(*) FROM hadiths WHERE book='abudawud'")
print("Abudawud id range:", c.fetchone())

c.execute("SELECT min(id), max(id), count(*) FROM hadiths WHERE book='nasai'")
print("Nasai id range:", c.fetchone())

conn.close()
