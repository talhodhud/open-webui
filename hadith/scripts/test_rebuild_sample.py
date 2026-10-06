import sqlite3, sys, re, time, json
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
DB_PATH = ROOT_DIR / 'hadith_rijal.db'

def strip_diacritics(t):
    return re.sub(r'[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0640]', '', t)

def normalize_key(s):
    if not s:
        return ''
    s = strip_diacritics(s.strip())
    s = re.sub(r'[إأآاٱ]', 'ا', s)
    s = re.sub(r'ة\b', 'ه', s)
    s = re.sub(r'ى\b', 'ي', s)
    s = re.sub(r'\b(?:ابي|ابا|ابو)\s+', 'ابو ', s)
    s = re.sub(r'\b(?:ابن|بن)\s+', 'بن ', s)
    s = re.sub(r'[{}\[\]\(\)«»"“”‏\.]', '', s)
    return re.sub(r'\s+', ' ', s).strip()

def clean_narrator_name(s):
    s = strip_diacritics(s)
    s = re.sub(r'\s*رض[يى]\s*الله\s*عنه[ما]*\s*', ' ', s)
    s = re.sub(r'[ـ\s]*عليه\s*السلام[ـ\s]*', ' ', s)
    s = re.sub(r'[ـ\s]*صلى\s*الله\s*عليه\s*(?:وآله\s*)?وسلم[ـ\s]*.*', ' ', s)
    s = re.sub(r'[{}\[\]\(\)«»"“”‏]', '', s)
    s = re.sub(r'^\s*(?:رواه|روى|تابعه|زاد|وقال|قال)\s+', '', s)
    s = re.sub(r'\s+(?:قال|قالت|قالا|يقول|يقال|حدثه|حدثاه|حدثته|حدثهم|أخبره|اخبره|أخبرني|اخبرني|أخبرنا|اخبرنا|أخبراه|اخبروه|حدثوه)\b.*$', '', s)
    s = re.sub(r'\s+(?:اسمه|يعني|تابعه|وقيل)\b.*$', '', s)
    s = re.sub(r'^\s*(?:أن|ان|أنه|انه|أنها|انها|وهو|وهي)\s+', '', s)
    s = re.sub(r'\bهو\s+ابن\s+', 'بن ', s)
    s = re.sub(r'\s+', ' ', s).strip()
    return s

def parse_death_interval(d_str):
    if not d_str or d_str in ('-', 'غير معروف بدقة', 'غير محدد'):
        return None
    nums = [int(n) for n in re.findall(r'\b\d{1,3}\b', d_str) if 1 <= int(n) <= 450]
    if not nums:
        return None
    return min(nums), max(nums)

# Load narrator registry
conn = sqlite3.connect(DB_PATH)
c = conn.cursor()
narrators = {}
for r in c.execute("SELECT id, name, death_year FROM arsanad_narrators").fetchall():
    nid, name, death = r
    d_int = parse_death_interval(death)
    narrators[nid] = {
        'id': nid,
        'name': name,
        'death_min': d_int[0] if d_int else None,
        'death_max': d_int[1] if d_int else None
    }
print(f"Loaded {len(narrators)} narrators for chronology validation.")
conn.close()
