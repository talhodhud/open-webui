import shutil
import os
import sys

DB_PATH = r"C:\Users\mhdal\AppData\Local\Programs\Python\Python312\Lib\site-packages\open_webui\data\webui.db"
SNAPSHOT_PATH_RECORD = "planning/last_snapshot_path.txt"

def rollback(snapshot_file=None):
    if not snapshot_file:
        if os.path.exists(SNAPSHOT_PATH_RECORD):
            with open(SNAPSHOT_PATH_RECORD, "r", encoding="utf-8") as f:
                snapshot_file = f.read().strip()
        else:
            print("Error: No recorded snapshot file found.")
            sys.exit(1)

    if not os.path.exists(snapshot_file):
        print(f"Error: Snapshot file does not exist: {snapshot_file}")
        sys.exit(1)

    shutil.copy2(snapshot_file, DB_PATH)
    print(f"ROLLBACK SUCCESSFUL: Restored {DB_PATH} from {snapshot_file}")

if __name__ == "__main__":
    snap = sys.argv[1] if len(sys.argv) > 1 else None
    rollback(snap)
