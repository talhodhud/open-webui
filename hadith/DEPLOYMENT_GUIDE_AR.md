# دليل تشغيل ونشر منصة بيان السُّنّة (Bayan Al-Sunnah)

## 📌 نظرة عامة على معمارية النشر والتغليف (Agent 4 Deliverables)

تم بناء دورة حياة النشر والتغليف لمنظومة **بيان السُّنّة** وفق أعلى معايير الموثوقية والسلامة البرمجية، ومعالجة القواطع التشغيلية في بيئات Linux VPS والحاويات (Docker) وقواعد بيانات SQLite المزودة بـ Write-Ahead Logging (WAL):

1. **فصل مرحلة البناء عن النشر وحصر المصادر داخل المستودع (Authoritative In-Repo Build):**
   - أداة البناء والتحقق: [`hadith/scripts/build_exports.py`](hadith/scripts/build_exports.py).
   - المجلد المعتمد الوحيد للصادرات: `hadith/exports/`.
   - تُقرأ كافة الأدوات، المواصفات، والمهارات حصرياً من داخل checkout دون أي استيراد صامت لمسارات خارجية.
   - يولد السكربت وثيقة البصمات والمطابقة الرقمية: [`hadith/exports/delivery_manifest.json`](hadith/exports/delivery_manifest.json) بمجاميع تحقق SHA-256 لكافة الأدوات (6 أدوات)، المهارات (8 مهارات)، النماذج (8 نماذج)، محرك الإسناد المعياري (`hadith/isnad/*.py`)، وأصول واجهة المستخدم.
   - يدعم خيار الفحص المانع الصارم: `python hadith/scripts/build_exports.py --check-only` لمطابقة الملفات الموجودة فعلياً بالـmanifest، ويخرج بكود غير صفري (Exit Code 1) عند أي اختلاف.

2. **معالجة دورة حياة إعدادات Open WebUI (Valves Lifecycle Fix):**
   - لا تعتمد الأدوات على قيم ثابتة أو مهيأة في `__init__` فقط (حيث يعيد Open WebUI بناء الكائن `valves = Valves(**valves)` عند كل استدعاء).
   - تم تطبيق حل ديناميكي (Lazy Resolution) مع Pydantic Validators وفحص هيكل الجداول وبصمة SQLite (`_verify_sqlite_schema`) للتأكد من هوية القاعدة وسلامة جداولها قبل تنفيذ الاستعلام.
   - افتراضيات Valves محايدة تماماً (`default=""`) ولا تحتوي على أي مسارات محلية خاصة.
   - عند غياب القاعدة أو عدم تطابق المخطط، تُرجع الأداة غلافاً دلالياً منضبطاً بحالة `status="unavailable"` دون إنشاء ملفات SQLite فارغة على القرص.

3. **النشر الذري بفحص مانع (Gating Preflight) والنسخ الاحتياطي المراعي لـ SQLite WAL:**
   - سكربت النشر والتحقق: [`hadith/scripts/vps_deploy_all.py`](hadith/scripts/vps_deploy_all.py).
   - **فحص ما قبل الكتابة (Gating Preflight):** يتحقق من بصمات SHA-256 للحزم مقابل `delivery_manifest.json`، ويتأكد من وجود جداول النظام (`user`, `tool`, `skill`, `model`)، ويكتشف أي ربط مفقود (Zero dangling references)، ويختبر إمكان استيراد `hadith.isnad` داخل بيئة بايثون قبل لمس قاعدة البيانات.
   - **التوقف الفوري عند خطأ المسار:** إذا حدد المستخدم مساراً صريحاً غير موجود عبر `--db` أو `WEBUI_DB_PATH`، تتوقف العملية فوراً دون الانتقال الصامت للبحث عن قواعد أخرى.
   - **التعيين الصارم للمشرف:** يستعلم عن المشرف برتبته (`SELECT id FROM user WHERE role = 'admin' LIMIT 1`) أو يقبل `--admin-id` صريحاً، ولا ينتقل أبداً إلى مستخدم عشوائي أو معرف وهمي.
   - **النسخ الاحتياطي الآمن:** يأخذ لقطة ذرية متسقة عبر `PRAGMA wal_checkpoint(TRUNCATE)` و `sqlite3.Connection.backup()`.
   - **التحقق الشامل بعد الكتابة (Read-After-Write Verification):** يتحقق من صحة `content`، `specs`، `meta`، `name` لجميع الأدوات الست؛ و`content`، `meta`، `is_active` لجميع المهارات الثماني؛ و`name`، `base_model_id`، `params`، `meta`، وأسلاك الربط (`toolIds`, `skillIds`) لجميع النماذج الثمانية، بما فيها المساعد الموحد `bayan-unified-pilot`.
   - **التراجع التلقائي (Automated Rollback):** يستعيد اللقطة الاحتياطية فوراً عند أي فشل كتابة أو تحقق، ويدعم الاسترجاع اليدوي عبر المعامل `--rollback`.

---

## 🚀 تعليمات التشغيل على بيئة Linux VPS / Docker

تُنفذ جميع الأوامر مباشرة من جذر المستودع (`open-webui/`):

### 1. ضبط متغيرات البيئة (اختياري / موصى به)

```bash
# مسار قاعدة بيانات Open WebUI الحية
export WEBUI_DB_PATH="/app/backend/data/webui.db"

# مسارات قواعد بيانات الحديث المفهرسة وسجلاتها
export HADITH_DB_PATH="/app/backend/data/hadith_rijal.db"
export HADITH_SEARCH_INDEX_PATH="/app/backend/data/search_index.sqlite"

# مسارات أصول التخطيط والتعريف بالإسلام
export HADITH_TAXONOMY_PATH="/app/backend/data/planning/islam_topic_taxonomy_v1.json"
export HADITH_LESSON_PACKS_PATH="/app/backend/data/planning/bayan_lesson_packs_v1.json"
```

### 2. التحقق من مطابقة الحزمة قبل النشر (--check-only)

```bash
python hadith/scripts/build_exports.py --check-only
```
*يتحقق السكربت من مطابقة الملفات على القرص مع بصمات `delivery_manifest.json`، ويخرج برمز 0 عند التطابق الكامل.*

### 3. إعادة توليد حزم التصدير المعتمدة (عند الحاجة)

```bash
python hadith/scripts/build_exports.py
```
*المخرجات:*
- `hadith/exports/hadith_tools_vps_export.json` (6 أدوات تخصصية كاملة)
- `hadith/exports/hadith_skills_vps_export.json` (8 مهارات موثقة ومعتمدة)
- `hadith/exports/hadith_models_vps_export.json` (8 نماذج موجهة ومربوطة)
- `hadith/exports/delivery_manifest.json` (بيان البصمات المشفرة لجميع الملفات والوحدات)

### 4. فحص الجاهزية دون تعديل القاعدة (--preflight-only)

```bash
python hadith/scripts/vps_deploy_all.py --db /path/to/webui.db --preflight-only
```

### 5. تنفيذ النشر الذري مع التحقق الشامل بعد الكتابة

```bash
python hadith/scripts/vps_deploy_all.py --db /path/to/webui.db
```
أو بالاعتماد على متغير البيئة `WEBUI_DB_PATH`:
```bash
python hadith/scripts/vps_deploy_all.py
```

### 6. التراجع اليدوي إلى نسخة احتياطية سابقة (Rollback)

في حال الرغبة في الرجوع إلى لقطة احتياطية سابقة:
```bash
python hadith/scripts/vps_deploy_all.py --rollback /path/to/snapshots/webui_YYYYMMDD_HHMMSS.db.bak --db /path/to/webui.db
```

---

## 🧪 بوابات التحقق والاختبار (Verification Gates)

لتشغيل حزم الاختبارات:
```bash
# تشغيل اختبارات منظومة بيان السنة الشاملة
python tests/run_all_tests.py

# تشغيل اختبارات مستودع hadith
python -m unittest discover -s hadith/tests
```

---

## 📦 محتويات حزمة الصادرات الموحدة (v2.0.0-rc1)

| المكون | العدد | المعرفات المشمولة |
|---|---|---|
| **الأدوات (Tools)** | 7 | `hadith_corpus_search`, `hadith_takhrij`, `hadith_sharh_vocab`, `hadith_isnad_tree`, `hadith_narrator`, `hadith_bayan_topics`, `hadith_phrase_poc` |
| **المهارات (Skills)** | 8 | `hadith-search-record`, `hadith-takhrij-compare`, `hadith-mermaid-architect`, `hadith-sharh-scholar`, `hadith-rijal-critic`, `hadith-source-provenance`, `hadith-islam-guide`, `hadith-bayan-maestro` |
| **النماذج (Models)** | 8 | `bayan-unified-pilot`, `hadith-islam-guide`, `hadith-mermaid-agent`, `hadith-rijal-agent`, `hadith-sharh-agent`, `hadith-modular-agent`, `hadith-model-1`, `hadith-phrase-poc` |
| **محرك الإسناد (Isnad Engine)** | 6 | `hadith/isnad/` (`__init__.py`, `parser.py`, `resolver.py`, `graph.py`, `render_mermaid.py`, `validation.py`) |
| **وثيقة البصمات (Manifest)** | 1 | `delivery_manifest.json` (بصمات SHA-256 لكافة الصادرات والمصادر ووحدات المحرك والواجهة) |
