import json
import sqlite3
import time
import os

WEBUI_DB_PATH = r"C:\Users\mhdal\AppData\Local\Programs\Python\Python312\Lib\site-packages\open_webui\data\webui.db"
USER_ID = "059a9be7-b5a5-4be9-88d1-7e0e0fa2548d"

maestro_skill = {
    "id": "hadith-bayan-maestro",
    "name": "بيان السُّنّة — المايسترو الموحد (Bayan Unified Maestro)",
    "description": "المنسق العام لمنظومة بيان السُّنّة: يدير تكامل المهارات السبع، يوجّه الاستفسارات نحو المسار العلمي المناسب (تخريج، أسانيد، رجال، شرح، تعريف بالإسلام)، ويشغّل المحرك التكيفي لصياغة المخرجات.",
    "content": """# دليل المايسترو الموحد لمنظومة بيان السُّنّة (Bayan Unified Maestro)

أنت «المايسترو الموحد لمنظومة بيان السُّنّة». مهمتك إدارة الاستجابة التكيفية والتنسيق بين المهارات الست التخصصية وبوابة الدليل الصارم.

## 🚨 مبادئ القيادة والتنسيق:
1. **المحرك التكيفي (Adaptive Engine):** قدّم إجابة مباشرة وموجزة في الاستفسارات العادية، ونشّط التحقيق الموسع وشجرة الإسناد فقط عند الطلب.
2. **التكامل المهاري الصارم:** وجّه كل جزء من السؤال إلى مهارته المختصة دون تداخل أو ادعاء استيعاب لما لم يُسترجع.
3. **بوابة الدليل الصارم (Evidence Gate):** لا تنقل حديثاً من الذاكرة دون فتح سجله عبر أداة البحث أو التخريج.
""",
    "meta": {"tags": ["hadith", "maestro", "orchestration", "adaptive", "unified"]},
    "is_active": True
}

# 1. Update hadith_skills_vps_export.json
for p in ["open-webui/hadith/exports/hadith_skills_vps_export.json", "hadith_skills_vps_export.json"]:
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            skills = json.load(f)
        skills = [s for s in skills if s.get("id") != "hadith-bayan-maestro"]
        skills.append(maestro_skill)
        with open(p, "w", encoding="utf-8") as f:
            json.dump(skills, f, ensure_ascii=False, indent=2)
        print("Updated skills export:", p, "count:", len(skills))

# 2. Update hadith_models_vps_export.json to have all 8 skills in pilot
all_8_skills = [
    "hadith-search-record",
    "hadith-takhrij-compare",
    "hadith-sharh-scholar",
    "hadith-rijal-critic",
    "hadith-source-provenance",
    "hadith-mermaid-architect",
    "hadith-islam-guide",
    "hadith-bayan-maestro"
]

for p in ["open-webui/hadith/exports/hadith_models_vps_export.json", "hadith_models_vps_export.json"]:
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            models = json.load(f)
        for m in models:
            if m.get("id") == "bayan-unified-pilot":
                m["meta"]["skillIds"] = all_8_skills
                m["meta"]["skill_ids"] = all_8_skills
        with open(p, "w", encoding="utf-8") as f:
            json.dump(models, f, ensure_ascii=False, indent=2)
        print("Updated models export:", p)

# 3. Update webui.db
conn = sqlite3.connect(WEBUI_DB_PATH)
cur = conn.cursor()
now = int(time.time())

cur.execute("SELECT id FROM skill WHERE id = ?", (maestro_skill["id"],))
if cur.fetchone():
    cur.execute("""
        UPDATE skill
        SET name = ?, description = ?, content = ?, meta = ?, is_active = 1, updated_at = ?
        WHERE id = ?
    """, (maestro_skill["name"], maestro_skill["description"], maestro_skill["content"], json.dumps(maestro_skill["meta"], ensure_ascii=False), now, maestro_skill["id"]))
else:
    cur.execute("""
        INSERT INTO skill (id, user_id, name, description, content, meta, is_active, updated_at, created_at)
        VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)
    """, (maestro_skill["id"], USER_ID, maestro_skill["name"], maestro_skill["description"], maestro_skill["content"], json.dumps(maestro_skill["meta"], ensure_ascii=False), now, now))
print("Updated skill in webui.db: hadith-bayan-maestro")

cur.execute("SELECT meta FROM model WHERE id = 'bayan-unified-pilot'")
row = cur.fetchone()
if row:
    meta = json.loads(row[0] or "{}")
    meta["skillIds"] = all_8_skills
    meta["skill_ids"] = all_8_skills
    cur.execute("UPDATE model SET meta = ?, updated_at = ? WHERE id = 'bayan-unified-pilot'", (json.dumps(meta, ensure_ascii=False), now))
    print("Updated bayan-unified-pilot in webui.db with all 8 skills")

conn.commit()
conn.close()
print("Maestro skill and model synchronization finished.")
