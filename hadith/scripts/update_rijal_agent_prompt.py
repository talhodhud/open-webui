import sqlite3
import json
import re

WEBUI_DB_PATH = r"C:\Users\mhdal\AppData\Local\Programs\Python\Python312\Lib\site-packages\open_webui\data\webui.db"

def update_rijal_agent():
    conn = sqlite3.connect(WEBUI_DB_PATH)
    cur = conn.cursor()
    cur.execute("SELECT params FROM model WHERE id = 'hadith-rijal-agent'")
    row = cur.fetchone()
    if not row or not row[0]:
        print("Model hadith-rijal-agent not found.")
        conn.close()
        return

    params = json.loads(row[0])
    sys_p = params.get('system', '')

    target_pattern = r"(1\.\s+\*\*استدعاء أداة الرواة والتراجم.*?\n\s+- استدعِ `get_narrator_biography.*?\n)"
    replacement = (
        "1. **استدعاء أداة الرواة والتراجم واستخراج نصوص النقاد (Mandatory Rijal & Scholar Quotes Lookup):**\n"
        "   - استدعِ `search_narrator(query=..., limit=5)` للبحث الدقيق في قاعدة بيانات الرواة (115,735 راوٍ) لجلب الاسم الكامل، الكنية، اللقب، المدينة، وسنة الوفاة الدقيقة.\n"
        "   - استدعِ `get_narrator_biography(narrator_id=...)` لجلب البطاقة التوثيقية التراثية (رتبة ابن حجر في التقريب، رتبة الذهبي في الكاشف، الطبقة، البلد، سنة الوفاة، وشيوخه وتلاميذه).\n"
        "   - استدعِ `get_narrator_scholar_quotes(narrator_name=..., scholar_filter=...)` لجلب نصوص أئمة الجرح والتعديل الكلاسيكيين (أحمد، ابن معين، البخاري، أبو حاتم، النسائي، ابن حبان...) بنصوصهم الأصلية المنقولة وأرقام الأجزاء والصفحات من تهذيب الكمال، وتهذيب التهذيب، والجرح والتعديل، والثقات.\n"
        "   - **تطهير التراجم من وسوم الاستنباط الآلي:** يُمنع منعاً باتاً إظهار وسوم برمجية أو استنباطات تقنية خام (مثل `Albani loop` أو `استنباط من الأسانيد`)؛ التزم حصراً بالرتب التراثية المعتمدة المسترجعة من أداة التراجم (رتبة الحافظ ابن حجر في التقريب والإمام الذهبي في الكاشف).\n"
    )

    new_sys_p = re.sub(target_pattern, replacement, sys_p, count=1, flags=re.DOTALL)
    if new_sys_p != sys_p:
        params['system'] = new_sys_p
        cur.execute("UPDATE model SET params = ? WHERE id = 'hadith-rijal-agent'", (json.dumps(params, ensure_ascii=False),))
        conn.commit()
        print("Updated hadith-rijal-agent prompt successfully.")
    else:
        print("Regex pattern did not match in hadith-rijal-agent prompt.")

    conn.close()

if __name__ == '__main__':
    update_rijal_agent()
