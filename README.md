# بيان السنة | Bayan Al-Sunnah
### منصة الذكاء الاصطناعي لخدمة الحديث الشريف وعلومه — مبنية على Open WebUI
### Intelligent Hadith Analytics & Isnad Verification Platform — Built on Open WebUI

---

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](hadith/LICENSE)
[![Open Source](https://img.shields.io/badge/Open_Source-100%25-blue.svg)](LICENSE)
[![Base: Open WebUI](https://img.shields.io/badge/Built_On-Open_WebUI_v0.11+-purple.svg)](https://github.com/open-webui/open-webui)
[![Narrators](https://img.shields.io/badge/Narrators-115%2C000+-amber.svg)](#)
[![Collections](https://img.shields.io/badge/Collections-18_Canonical_Books-teal.svg)](#)
[![UI: Arabic RTL](https://img.shields.io/badge/UI-Arabic_RTL_Native-indigo.svg)](#)

---

## عن المشروع | About Bayan Al-Sunnah

**بيان السنة (Bayan Al-Sunnah)** هو نظام بحثي متقدم لخدمة السنة النبوية الشريفة وعلوم الحديث، يجمع بين منهجيات علماء الحديث الكلاسيكية (التخريج، دراسة الأسانيد، الجرح والتعديل، غريب الحديث) وبين أحدث تقنيات الذكاء الاصطناعي التوليدي، وشبكات الرسم البياني (Graph Networks)، والبحث الدلالي اللحظي.

المشروع مبني على المنصة السيادية المفتوحة المصدر **[Open WebUI](https://github.com/open-webui/open-webui)**، مع تخصيصات كاملة تشمل:
- أدوات برمجية متخصصة (Custom Python Domain Tools).
- نظام تصميم وهوية عربية أصيلة (**واجهة أثر - Athar Design System**).
- محركات ربط للأسانيد وتراجم الرواة مبنية محلياً لتعمل بدون إنترنت (100% Offline Capable).
- ربط موسوعي بقواعد بيانات إتقان، ومصادر الدرر السنية، وموسوعة الأحاديث النبوية، وموقع سنة دوت كوم.

---

## أبرز القدرات والركائز العلمية | Core Capabilities

### 1. 🔍 البحث الحديثي الشامل والمتني (Hadith Corpus Search)
- بحث دقيق عبر **الكتب الستة** و**18 مصدراً حديثياً معتمداً** (صحيح البخاري، صحيح مسلم، سنن أبي داود، سنن الترمذي، سنن النسائي، سنن ابن ماجه، موطأ مالك، مسند أحمد، وغيرها).
- محرك مطابقة لفظية دقيقة (Exact Phrase Match) وتقنيات البحث بالنص الكامل (FTS5).
- ربط سحابي احتياطي متعدد المستويات (Multi-tier fallback) بمصادر الدرر السنية وHadeethEnc وSunnah.com.

### 2. 🌳 شجرة الإسناد ورسم شبكات الرواية (Interactive Isnad Graph)
- توليد شجرة الإسناد التفاعلية من النبي ﷺ والصحابة رضي الله عنهم نزولاً إلى أصحاب المصنفات.
- تمييز مدار الحديث (Common Links) وطرق الرواية والمتابعات والشواهد بترميز بصري ودلالي دقيق.

### 3. 👤 موسوعة الرواة والجرح والتعديل (115,000+ Narrator Encyclopedia)
- فحص تراجم أكثر من **115 ألف راوٍ** مع أقوال أئمة الجرح والتعديل (يحيى بن معين، البخاري، أبو حاتم، النسائي، ابن حجر، الذهبي).
- عرض طبقات الرواة، والشيوخ والتلاميذ، وتحديد درجات التوثيق والضبط.

### 4. 📚 غريب الحديث وشرح المفردات (Gharib al-Hadith & Linguistic Analysis)
- شرح الكلمات الغريبة والنادرة في متون الأحاديث بالاعتماد على أمهات المعاجم الحديثية واللغوية.
- إبراز الفوائد العقدية والفقهية واللغوية المستنبطة من المتن.

### 5. ⚖️ التخريج ودراسة المرويات (Takhrij & Cross-Authentication)
- استخراج أحكام الأئمة والمحدثين المعتبرين على الحديث من مصادر متعددة وتوثيق الجزء ورقم الحديث.

### 6. 🎨 واجهة أثر — الهوية البصرية الفاخرة (Athar Luxury Arabic Design)
- واجهة مستخدم عربية أصيلة مدمجة بالكامل (RTL-First).
- خطوط طباعية تراثية حديثة تشمل خط **الأميري (Amiri)** للنصوص والأحاديث وخط **ريديكس برو (Readex Pro)** للعناصر التفاعلية.

---

## هيكل المجلدات | Repository Structure

```text
open-webui/
├── hadith/                                # حزمة بيان السنة المتخصصة
│   ├── LICENSE                            # رخصة MIT للأدوات والمكونات الحديثية
│   ├── README.md                          # التوثيق التفصيلي للبيانات والربط
│   ├── tools/                             # أدوات بايثون ومخططات JSON لـ Open WebUI
│   │   ├── hadith_bayan_topics_tool.py    # فهرس البيان والتصنيف الموضوعي
│   │   ├── hadith_corpus_search_tool.py   # محرك البحث في المتون والكتب
│   │   ├── hadith_isnad_tree_tool.py      # أداة رسم شجرة الإسناد
│   │   ├── hadith_narrator_tool.py        # أداة موسوعة الرواة والجرح والتعديل
│   │   ├── hadith_sharh_vocab_tool.py     # أداة غريب الحديث والشروح
│   │   ├── hadith_takhrij_tool.py         # أداة التخريج والمقارنة
│   │   └── hadith_contract_helper.py      # مدقق عقود المخرجات وبيانات الأدلة
│   ├── theme/                             # كود واجهة "أثر" (Svelte 5 / Vite)
│   ├── deliverables/                      # أدلة العرض والوثائق التنفيذية
│   ├── fixtures/                          # بيانات العينات واختبارات الواجهة
│   ├── migrations/                        # مخططات ترقية قواعد البيانات
│   ├── tests/                             # حزم الاختبارات الآلية وقبول الجودة
│   ├── poc/phrase_search/                 # محرك الفهرسة اللفظية FTS5
│   ├── docs/                              # المخططات المعمارية ومراجع المصادر
│   └── scripts/                           # سكربتات بناء قواعد البيانات والأتمتة
├── src/                                   # واجهة Open WebUI الأمامية (SvelteKit)
│   └── app.html                           # تفعيل هوية بيان السنة وتضمين واجهة أثر
├── static/hadith-theme-poc/               # حزمة ستايل وهوية واجهة أثر الجاهزة
└── backend/                               # محرك Open WebUI الخلفي (FastAPI / Python)
    ├── open_webui/config.py               # الإعدادات الافتراضية (اللغة العربية: ar-BH)
    └── open_webui/env.py                  # اسم النظام (بيان السنة)
```

---

## الملفات غير المرفوعة على GitHub وطريقة ربطها | Linking External Datasets

نظراً لحجم قواعد البيانات الذي يتجاوز حد الـ 100 ميغابايت المسموح به في GitHub، تم استثناء قواعد البيانات الثنائية في `.gitignore`:

| الملف | الحجم التقريبي | الوظيفة |
| :--- | :--- | :--- |
| **`hadith_rijal.db`** | **~1.03 GB** | قاعدة البيانات الرئيسية (115 ألف راوٍ، شبكات الأسانيد، و18 كتاباً). |
| **`search_index.sqlite`** | **~118 MB** | فهرس البحث بالنص الكامل المطابق (FTS5). |

### طريقة الربط على نظام ويندوز (Windows)

#### الطريقة الأولى: المتغيرات البيئية (موصى بها)
```powershell
[System.Environment]::SetEnvironmentVariable('HADITH_DB_PATH', 'C:\Path\To\hadith_rijal.db', 'User')
[System.Environment]::SetEnvironmentVariable('HADITH_SEARCH_INDEX_PATH', 'C:\Path\To\search_index.sqlite', 'User')
```

#### الطريقة الثانية: الرابط الثابت (Hard Link) دون الحاجة لصلاحيات مدير
```powershell
New-Item -ItemType HardLink -Path "backend\data\hadith_rijal.db" -Target "C:\Path\To\hadith_rijal.db"
New-Item -ItemType HardLink -Path "hadith\poc\phrase_search\search_index.sqlite" -Target "C:\Path\To\search_index.sqlite"
```

#### الطريقة الثالثة: عبر واجهة Open WebUI
1. ادخل إلى **مساحة العمل (Workspace) > الأدوات (Tools)**.
2. اضغط على أيقونة الإعدادات (⚙️ / Valves) بجانب أدوات الحديث.
3. عدّل مسار `DB_PATH` إلى المسار المحلي لقاعدتك ثم احفظ.

---

### طريقة الربط على نظام لينكس / دوكر (Linux / Docker)

#### الطريقة الأولى: المتغيرات البيئية
أضف المتغيرات في ملف `.env` أو `~/.bashrc`:
```bash
export HADITH_DB_PATH="/opt/hadith/hadith_rijal.db"
export HADITH_SEARCH_INDEX_PATH="/opt/hadith/search_index.sqlite"
```

#### الطريقة الثانية: الروابط الرمزية (Symbolic Links)
```bash
mkdir -p backend/data
ln -sf /opt/hadith/hadith_rijal.db ./backend/data/hadith_rijal.db
ln -sf /opt/hadith/search_index.sqlite ./hadith/poc/phrase_search/search_index.sqlite
```

#### الطريقة الثالثة: عبر حاويات Docker
```bash
docker run -d -p 8080:8080 \
  -v open-webui:/app/backend/data \
  -v /path/to/hadith_rijal.db:/app/backend/data/hadith_rijal.db:ro \
  -e HADITH_DB_PATH="/app/backend/data/hadith_rijal.db" \
  --name open-webui ghcr.io/open-webui/open-webui:main
```

---

## إعادة بناء قواعد البيانات محلياً | Rebuilding Databases

إذا تم استنساخ المشروع على خادم جديد بدون ملفات البيانات الثنائية، يمكنك إعادة بنائها تلقائياً بالسكربتات المرفقة:

```bash
# 1. بناء قاعدة بيانات الأحاديث والرواة
python hadith/scripts/build_hadith_db.py
python hadith/scripts/build_full_isnad_transmissions.py

# 2. بناء فهرس البحث اللفظي السريع
python hadith/poc/phrase_search/build_index.py
```

---

## التشغيل السريع | Quick Start

### التشغيل المباشر عبر بايثون:
```bash
# تثبيت المتطلبات
pip install -r backend/requirements.txt

# تشغيل خادم بيان السنة
open-webui serve
```
ثم افتح المتصفح على الرابط: **`http://localhost:8080`**

---

## الترخيص المفتوح | Open Source License

المشروع مفتوح المصدر بالكامل (100% Open Source) ومتاح للباحثين والمطورين والمهتمين بالدراسات الشرعية والتقنية:

1. **مكونات وأدوات بيان السنة الحديثية (`hadith/`):**
   مرخصة بموجب ترخيص **[MIT License](hadith/LICENSE)** المفتوح بالكامل، والذي يتيح الاستخدام والتعديل والتطوير الحر.

2. **منصة Open WebUI الأساسية:**
   مرخصة بموجب **[Open WebUI License](LICENSE)** (المبنية على ترخيص BSD-3-Clause مع الحفاظ على إسناد المصدر).

كل الحقوق العلمية والبرمجية مفتوحة لخدمة كتاب الله وسنة رسوله ﷺ.
