import shutil
import os
import time
import sqlite3

DB_PATH = r"C:\Users\mhdal\AppData\Local\Programs\Python\Python312\Lib\site-packages\open_webui\data\webui.db"
timestamp = time.strftime('%Y%m%d_%H%M%S')
backup_path = f"{DB_PATH}.snapshot_{timestamp}.bak"

shutil.copy2(DB_PATH, backup_path)
print(f"BACKUP CREATED: {backup_path}")

assert os.path.exists(backup_path), "Backup file does not exist!"
conn = sqlite3.connect(backup_path)
c = conn.cursor()
tables = [r[0] for r in c.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()]
conn.close()

print(f"BACKUP VERIFIED: {len(tables)} tables found.")
with open("planning/last_snapshot_path.txt", "w", encoding="utf-8") as f:
    f.write(backup_path)
print("Recorded snapshot path in planning/last_snapshot_path.txt")
