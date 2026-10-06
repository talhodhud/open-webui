"""
create_modular_model_profile.py
===============================
Registers 'hadith-modular-agent' in Open WebUI webui.db, binding all 5 specialized micro-tools:
1. hadith_corpus_search
2. hadith_takhrij
3. hadith_sharh_vocab
4. hadith_isnad_tree
5. hadith_narrator
"""

import sqlite3
import json
import time

WEBUI_DB_PATH = r"C:\Users\mhdal\AppData\Local\Programs\Python\Python312\Lib\site-packages\open_webui\data\webui.db"
USER_ID = "059a9be7-b5a5-4be9-88d1-7e0e0fa2548d"
MODEL_ID = "hadith-modular-agent"
MODEL_NAME = "Hadith Modular Expert"
BASE_MODEL_ID = "gpt-5.4-mini"

SYSTEM_PROMPT = """أنت "المحقق النبوي المتخصص"، خبير وأكاديمي متضلع في علوم الحديث النبوي الشريف، وعلم الرجال (الجرح والتعديل)، والتخريج، وغريب الحديث وفقهه.

تمتلك مجموعة متخصصة من الأدوات المعرفية المتقدمة للبحث في المتون، وتخريج الأحاديث، وشرح الألفاظ الغريبة، واستخراج شجرات الأسانيد ورسمها، وتحليل سير الرواة وشبكاتهم.

القواعد المنهجية الصارمة:
1. الاستعانة الإلزامية بالأدوات:
   - ابحث دائماً في مصادر التخريج والمتون قبل الحكم على أي حديث أو نسبته إلى كتاب أو راوٍ منعاً للخطأ والهلوسة.
   - إذا سأل المستخدم عن حديث بغير رقم، ابحث في المتون بالكلمات المفتاحية المميزة.
   - إذا سأل عن صحة حديث أو تخريجه، استدعِ أدوات التخريج لاستعراض أحكام الأئمة المتقدمين والمتأخرين.
   - إذا سأل عن غريب الحديث أو معاني الألفاظ، استدعِ معاجم غريب الحديث وجذور الكلمات الكلاسيكية.
   - إذا سأل عن سند أو رسم شجرة، استدعِ أدوات الأسانيد لتوليد رسم بياني دقيق بـ Mermaid مع إبراز درجات الرواة.
   - إذا سأل عن راوٍ، استدعِ بيانات الجرح والتعديل وسيرته وطبقته وشيوخه وتلاميذه.

2. المنهج العلمي في العرض:
   - اذكر المتن مضبوطاً وواضحاً.
   - اذكر درجة الحديث (صحيح، حسن، ضعيف، موضوع) مع بيان أقوال المحدثين ومصادرهم.
   - عند تفصيل السند، فكّك الكنى والمبهمات (مثل: "عن أبيه" أو "عن جده" إلى الاسم الصريح المحقق).
   - اعرض رسومات Mermaid داخل كتل كود نقية (```mermaid ... ```).
   - فرّق بين المعنى الإجمالي الفقهي (الشرح) وبين المعنى المعجمي اللغوي (غريب الحديث).
"""

def main():
    conn = sqlite3.connect(WEBUI_DB_PATH)
    cur = conn.cursor()
    now_ts = int(time.time())

    meta = {
        "profile_image_url": "/static/favicon.png",
        "background_image_url": None,
        "description": "Specialized Hadith Scholar utilizing 5 modular tools: Corpus Search, Multi-Scholar Takhrij, Sharh & Gharib Vocab, Disambiguated Isnad Trees, and 115k Rijal Biographies.",
        "capabilities": {
            "file_context": True,
            "vision": True,
            "file_upload": True,
            "web_search": True,
            "image_generation": True,
            "code_interpreter": True,
            "terminal": True,
            "citations": True,
            "status_updates": True,
            "memory": True,
            "builtin_tools": True
        },
        "toolIds": [
            "hadith_corpus_search",
            "hadith_takhrij",
            "hadith_sharh_vocab",
            "hadith_isnad_tree",
            "hadith_narrator"
        ]
    }

    params = {
        "system": SYSTEM_PROMPT
    }

    cur.execute("""
        INSERT INTO model (id, user_id, base_model_id, name, meta, params, updated_at, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            base_model_id=excluded.base_model_id,
            name=excluded.name,
            meta=excluded.meta,
            params=excluded.params,
            updated_at=excluded.updated_at;
    """, (
        MODEL_ID,
        USER_ID,
        BASE_MODEL_ID,
        MODEL_NAME,
        json.dumps(meta, ensure_ascii=False),
        json.dumps(params, ensure_ascii=False),
        now_ts,
        now_ts
    ))
    conn.commit()
    print(f"Model '{MODEL_ID}' successfully created/updated in webui.db!")

    # Verify
    cur.execute("SELECT id, name, meta FROM model WHERE id=?;", (MODEL_ID,))
    row = cur.fetchone()
    print("Verified Model:", row[0], "-", row[1])
    parsed_meta = json.loads(row[2])
    print("Bound Tools:", parsed_meta.get("toolIds"))

    conn.close()

if __name__ == "__main__":
    main()
