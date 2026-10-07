import os
import sys
import json
import sqlite3

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPO_DIR = os.path.dirname(BASE_DIR)
LOCAL_WEBUI_DB = r"C:\Users\mhdal\AppData\Local\Programs\Python\Python312\Lib\site-packages\open_webui\data\webui.db"

def sync_tools_and_skills():
    print("[1/4] Reading updated tool source code...")
    isnad_tree_path = os.path.join(BASE_DIR, "tools", "hadith_isnad_tree_tool.py")
    narrator_path = os.path.join(BASE_DIR, "tools", "hadith_narrator_tool.py")

    with open(isnad_tree_path, "r", encoding="utf-8") as f:
        isnad_tree_code = f.read()

    with open(narrator_path, "r", encoding="utf-8") as f:
        narrator_code = f.read()

    # Update tools export bundles
    print("[2/4] Updating tools export bundles...")
    tools_export_paths = [
        os.path.join(BASE_DIR, "exports", "hadith_tools_vps_export.json"),
        os.path.join(REPO_DIR, "hadith_tools_vps_export.json"),
        os.path.join(BASE_DIR, "..", "..", "hadith_tools_vps_export.json")
    ]

    for p in tools_export_paths:
        if os.path.exists(p):
            with open(p, "r", encoding="utf-8") as f:
                tools = json.load(f)
            updated = False
            for t in tools:
                if t.get("id") == "hadith_isnad_tree":
                    t["content"] = isnad_tree_code
                    updated = True
                elif t.get("id") == "hadith_narrator":
                    t["content"] = narrator_code
                    updated = True
            if updated:
                with open(p, "w", encoding="utf-8") as f:
                    json.dump(tools, f, ensure_ascii=False, indent=2)
                print(f"  -> Updated {p}")

    # Update skills export bundles
    print("[3/4] Updating skills export bundles with Tahweel DAG guidance...")
    skills_export_paths = [
        os.path.join(BASE_DIR, "exports", "hadith_skills_vps_export.json"),
        os.path.join(REPO_DIR, "hadith_skills_vps_export.json"),
        os.path.join(BASE_DIR, "..", "..", "hadith_skills_vps_export.json")
    ]

    tahweel_guidance = """
   - **تحويل الأسانيد (ح) والتفرع الإسنادي الشجري (Tahwil & Multi-Path DAG):**
     * عند وجود علامة التحويل `( ح )` وعبارات الجمع كـ «كلاهما عن» أو «جميعاً عن»: يُحظر قطعياً رسم السند كسلسلة خطية مفردة مضللة.
     * تُرسم الشجرة كمخطط متفرع (Branched DAG): يلتقي المساران عند **مدار الإسناد المشترك** (المدار الجامع)، ويتشعب منه الطريقان المنفصلان.
     * في القاع، يصب كلا المسارين عبر شيوخ المصنف المباشرين في كتاب الحديث نفسه (مثل صحيح مسلم).
     * **السلاسل العائلية الشهيرة («عن أبيه عن جده»):** تُفكك هويتها بدقة علمية محققة عند ثبوتها:
       - سعيد بن أبي بردة عن أبيه (أبو بردة عامر بن أبي موسى) عن جده (أبو موسى الأشعري رضي الله عنه).
       - سالم بن عبد الله عن أبيه (عبد الله بن عمر رضي الله عنهما) عن جده (عمر بن الخطاب رضي الله عنه).
       - عمرو بن شعيب عن أبيه (شعيب بن محمد) عن جده (عبد الله بن عمرو بن العاص رضي الله عنهما).
       - بهز بن حكيم عن أبيه (حكيم بن معاوية) عن جده (معاوية بن حيدة رضي الله عنه).
       ولا تُترك معلقة كمجاهيل أو مبهمين عند توثيق هوياتهم في تراجم المحدثين."""

    for sp in skills_export_paths:
        if os.path.exists(sp):
            with open(sp, "r", encoding="utf-8") as f:
                skills = json.load(f)
            updated = False
            for s in skills:
                if s.get("id") == "hadith-mermaid-architect":
                    content = s["content"]
                    if "تحويل الأسانيد (ح)" not in content:
                        # Insert under section 2
                        target = "الفجوات والمسارات الجزئية (تحويل ح) تُمثل بدقة كما وردت في السند المسترجع."
                        if target in content:
                            content = content.replace(target, target + "\n" + tahweel_guidance)
                        else:
                            content += "\n\n" + tahweel_guidance
                        s["content"] = content
                        updated = True
            if updated:
                with open(sp, "w", encoding="utf-8") as f:
                    json.dump(skills, f, ensure_ascii=False, indent=2)
                print(f"  -> Updated {sp}")

    # Update local webui.db if present
    print("[4/4] Updating local webui.db if accessible...")
    if os.path.exists(LOCAL_WEBUI_DB):
        try:
            conn = sqlite3.connect(LOCAL_WEBUI_DB)
            c = conn.cursor()
            # Update hadith_isnad_tree
            c.execute("UPDATE tool SET content = ? WHERE id = 'hadith_isnad_tree'", (isnad_tree_code,))
            # Update hadith_narrator
            c.execute("UPDATE tool SET content = ? WHERE id = 'hadith_narrator'", (narrator_code,))
            # Update hadith-mermaid-architect skill if in db
            mermaid_skill = None
            for sp in skills_export_paths:
                if os.path.exists(sp):
                    with open(sp, "r", encoding="utf-8") as f:
                        skills = json.load(f)
                    for s in skills:
                        if s.get("id") == "hadith-mermaid-architect":
                            mermaid_skill = s.get("content")
                            break
                    if mermaid_skill:
                        break
            if mermaid_skill:
                c.execute("UPDATE skill SET content = ? WHERE id = 'hadith-mermaid-architect'", (mermaid_skill,))
            conn.commit()
            conn.close()
            print("  -> Successfully updated tools & skills in local webui.db!")
        except Exception as e:
            print(f"  -> Note: could not update webui.db: {e}")

    print("\n✅ All bundles and local databases synchronized successfully!")

if __name__ == "__main__":
    sync_tools_and_skills()
