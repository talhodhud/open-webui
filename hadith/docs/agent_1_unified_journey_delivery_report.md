# تقرير تسليم Agent 1: توحيد الرحلة وربط الموضوع والمهارة (Unified Journey Delivery Report)

**التاريخ:** 6 أكتوبر 2026  
**المكلف بالتنفيذ:** الوكيل الأول (Agent 1)  
**المرجع:** وثيقة التكليف [`planning/agent_1_unified_journey_task_AR.md`](agent_1_unified_journey_task_AR.md)  
**الحالة:** تم التنفيذ والاختبار بنجاح (100% Passed)

---

## 1. ملخص الإنجاز والنتائج (Executive Summary)

تم إنجاز كافة متطلبات التكليف بدقة وصرامة مع الالتزام التام بحدود العزل وعدم المساس بقاعدة البيانات الحية (`webui.db`):
1. **مصدر واحد للمعنى (U04):** تم إلغاء الاشتقاق السطحي من عناوين الأبواب وإعادة توليد موضوعات الواجهة من [`planning/islam_topic_taxonomy_v1.json`](islam_topic_taxonomy_v1.json) و[`planning/bayan_lesson_packs_v1.json`](bayan_lesson_packs_v1.json)، مع تطبيق قواعد الاستبعاد السلبي الصريحة واستبعاد «كتاب الأيمان والنذور» من موضوع الإيمان (`topic-faith`).
2. **عقد الرحلة الموحد (Typed Journey Contract):** تم بناء عقد برمجي منضبط (`JourneyContract`) يدعم تسميات العرض العربية مع القيم البرمجية الموحدة (`newcomer`, `new_muslim`, `educator` / `card`, `qa`, `two_minute`) ورفض المعرفات الباطلة صراحةً.
3. **خريطة الأزرار وصمام الأمان (U06, U03):** تم ربط الأزرار الـ11 بنموذج ومهام `bayan-unified-pilot`، مع **الحفاظ التام على النماذج التخصصية السابقة كـ Fallback Baseline** دون إخلال بمسارات الرجوع.
4. **تصدير النموذج الموحد المصحح (U02, U03, U06):** تم تصدير مواصفة نموذج `bayan-unified-pilot` في [`planning/model_exports/bayan_unified_pilot_export.json`](model_exports/bayan_unified_pilot_export.json) لمعالجة مشكلات U02 (اعتماد `data.explanation` وعزل HadeethEnc)، وU03 (أسبقية `occurrence_id`)، وU06 (مرونة القوالب وعدم فرض تقرير الأقسام السبعة والشجرة على الأسئلة التعريفية).
5. **التحقق الشامل (Acceptance Testing):** نجاح 9/9 أجنحة اختبار في واجهة الثيم تشمل كافة التوليفات الـ 54 لمسار التعريف بالإسلام، بالتزامن مع نجاح 19/19 اختبار وحدة في الباك إند.

---

## 2. جدول الملفات المعدلة وبصمات SHA-256

| مسار الملف | الحجم (بايت) | بصمة التوثيق (SHA-256) | الدور في التكليف |
|---|---|---|---|
| `poc/theme/build_topics.py` | 3,645 | `18599088efe5b31c5178271a0d0fd1853cff2f8a8cf5b455584bd38836ec9803` | سكريبت توليد موضوعات الواجهة دلالياً من Taxonomy والحزم |
| `poc/theme/src/topics.ts` | 12,294 | `c6a481aeb6581646f8d0ff1b5ee3f9e720f586afc074812d4e7995565e568e5c` | قائمة الموضوعات الدلالية الستة (استبعاد الأيمان والنذور) |
| `poc/theme/src/topics.json` | 12,091 | `7b8917c44f49d55e3251ee21920f30d0f4be0a2f5e3381c57962ef82cbd24dc7` | تصدير JSON لموضوعات الواجهة الدلالية |
| `poc/theme/build_topic_evidence.py` | 2,359 | `8c7f8604ce0870039df45115e49ef1109406c152005696b0c058f7102fb8bdf8` | توليد وفحص شواهد الموضوعات الـ13 وفصل حالة المراجعة |
| `poc/theme/src/topicEvidence.ts` | 18,295 | `a12f78b3551833baeca15166e7797d9886fbb5c2bd31a3d5c2ba570e36f7625f` | شواهد الـ13 موثقة بحقول `source_verified` و`needs_review` |
| `poc/theme/src/journeys.ts` | 19,388 | `d3e62cd86e46e323c56d960e9ef181586a2adf160922cd808a98989d3bb63dc2` | عقد الرحلة `JourneyContract`، والتوجيه المزدوج والأزرار |
| `poc/theme/src/nativeVariant.ts` | 20,319 | `83d52878c9c493aee6d9e9d05382f6cc51ef97f277a929e67fe53a5e5c01658e` | ربط خيارات الجمهور والصيغة ومنع ظهور مسودة الرسم لمسار التعريف |
| `poc/theme/test_journeys.mjs` | 9,090 | `76d649590b95a4991a444cfb8167a59c7147b6684598be17372af112de19a10a` | اختبارات العقد، 54 توليفة، الاستبعاد السلبي، والتحقق الصارم |
| `planning/model_exports/bayan_unified_pilot_export.json` | 5,888 | `9fd33a403d35ba3e01f1f99a0ea9814a613d7042fdb02e532c6a6f521fb622e0` | تصدير مواصفة النموذج الموحد المصحح لمعالجة U02 وU03 وU06 |

---

## 3. خريطة الأزرار والمهام والمهارات والأدوات (Button / Skill / Tool Map)

تم تنفيذ الخريطة وفق مواصفة [`planning/journey_skill_routes_v1.json`](journey_skill_routes_v1.json) مع تمكين المسار الموحد وحفظ خط الرجوع:

| الزر / المعرف | المسار (Track) | المهمة (Task) | الوجهة السابقة (Fallback) | الوجهة الموحدة (Target) | المهارة الأساسية | الأدوات المربوطة |
|---|---|---|---|---|---|---|
| **الصلاة جامعة: بحث** (`prayer-call`) | `explore` | `phrase_search` | `hadith-model-1` | `bayan-unified-pilot` | `hadith-search-record` | `hadith_corpus_search` |
| **الحج عرفة** (`hajj-arafah`) | `research` | `compare_and_graph` | `hadith-modular-agent` | `bayan-unified-pilot` | `hadith-takhrij-compare` | `hadith_corpus_search`, `hadith_takhrij`, `hadith_isnad_tree` |
| **رواة أبي هريرة** (`abu-hurairah`) | `research` | `narrator_network` | `hadith-rijal-agent` | `bayan-unified-pilot` | `hadith-rijal-critic` | `hadith_narrator` |
| **اعرض شجرة الأسانيد** (`prayer-call:0`) | `research` | `isnad_graph` | `hadith-mermaid-agent` | `bayan-unified-pilot` | `hadith-mermaid-architect` | `hadith_isnad_tree` |
| **بسّط لي المعنى** (`prayer-call:1`) | `explore` | `explanation` | `hadith-sharh-agent` | `bayan-unified-pilot` | `hadith-sharh-scholar` | `hadith_sharh_vocab` |
| **قارن ألفاظ الروايات** (`hajj-arafah:0`) | `research` | `compare` | `hadith-modular-agent` | `bayan-unified-pilot` | `hadith-takhrij-compare` | `hadith_takhrij` |
| **هيّئ بطاقة للتعريف** (`hajj-arafah:1`) | `islam` | `introductory_material` | `hadith-islam-guide` | `bayan-unified-pilot` | `hadith-islam-guide` | `hadith_bayan_topics`, `hadith_corpus_search` |
| **أضف الرتب ومصادرها** (`abu-hurairah:0`) | `research` | `narrator_grades` | `hadith-rijal-agent` | `bayan-unified-pilot` | `hadith-rijal-critic` | `hadith_narrator` |
| **ارسم شبكة مختصرة** (`abu-hurairah:1`) | `research` | `narrator_network` | `hadith-rijal-agent` | `bayan-unified-pilot` | `hadith-rijal-critic` | `hadith_narrator` |
| **الموضوعات الستة** (`topic-*`) | `islam` | `introductory_material` | `hadith-islam-guide` | `bayan-unified-pilot` | `hadith-islam-guide` | `hadith_bayan_topics`, `hadith_corpus_search` |
| **افتح الدليل** (`open-evidence`) | `evidence` | `exact_record` | `hadith-phrase-poc` | `bayan-unified-pilot` | `hadith-search-record` | `get_hadith_by_number` |

---

## 4. بنية عقد الرحلة الموحد (The Journey Contract)

```typescript
export interface JourneyContract {
  version: 1;
  modelId: string;                     // "bayan-unified-pilot" (أو خط الرجوع)
  track: 'islam' | 'explore' | 'research' | 'evidence';
  caseId?: string;
  topicId?: string;
  task: string;
  primarySkillId: string;
  optionalSkillIds?: string[];
  audience?: 'newcomer' | 'new_muslim' | 'educator';
  format?: 'card' | 'qa' | 'two_minute';
  language: 'ar';
  occurrenceIds: string[];             // تُملأ من الشواهد المسترجعة/المحددة حصراً
  evidenceIds: string[];
  reviewStatus: 'needs_review' | 'reviewed';
  submit: boolean;                     // false افتراضياً لحماية مسودة المستخدم
}
```

---

## 5. نتائج الاختبار والتحقق (Test Results & Acceptance Evidence)

### أ) اختبارات واجهة الثيم (`poc/theme/test_journeys.mjs`):
تم تشغيل الاختبار عبر محرك `node --test` واجتازت كافة الاختبارات الـ9 بنجاح تام:
```text
TAP version 13
# Subtest: three demonstrations route to legacy baseline presets by default and support unified mode
ok 1 - three demonstrations route to legacy baseline presets by default and support unified mode
# Subtest: candidate evidence opens only a known stable ID in legacy and unified models
ok 2 - candidate evidence opens only a known stable ID in legacy and unified models
# Subtest: only explicit live-demo action requests native auto-submit
ok 3 - only explicit live-demo action requests native auto-submit
# Subtest: unknown case and executable origin rejected
ok 4 - unknown case and executable origin rejected
# Subtest: all six subject cards are derived from semantic packs with negative exclusion
ok 5 - all six subject cards are derived from semantic packs with negative exclusion
# Subtest: 54 combinations of topic x audience x format satisfy the typed contract without forced tahqiq reports
ok 6 - 54 combinations of topic x audience x format satisfy the typed contract without forced tahqiq reports
# Subtest: specialist follow-ups preserve occurrence identity and route explicitly
ok 7 - specialist follow-ups preserve occurrence identity and route explicitly
# Subtest: validation rejects invalid audience, format, or invented occurrence ID
ok 8 - validation rejects invalid audience, format, or invented occurrence ID
# Subtest: evidence records retain source verification without asserting scholarly approval
ok 9 - evidence records retain source verification without asserting scholarly approval
1..9
# tests 9
# suites 0
# pass 9
# fail 0
```

### ب) اختبارات الباك إند (`tests/test_hadith_backend.py` + `tests/test_bayan_topics.py`):
```text
Ran 19 tests in 9.982s
OK
```

---

## 6. حدود التعذر والتسليم للوكلاء اللاحقين (Hand-off & Boundaries)

1. **الوكيل الثاني (Agent 2):**
   - يتولى تدقيق معالجة U01 وU07 في توليد شجرة Mermaid الإسنادية من JSON المثبت وحفظ المنتهى الحقيقي (المرفوع، الموقوف، المرسل) وحالات «عن أبيه» غير المحلولة.
2. **الوكيل الرابع (Agent 4):**
   - يتولى استيراد مواصفة النموذج الموحد المحدثة [`planning/model_exports/bayan_unified_pilot_export.json`](model_exports/bayan_unified_pilot_export.json) والمهارات إلى Open WebUI بعد فحص التوافق وتجهيز خطة التراجع دون التعديل العشوائي عبر SQL المباشر.
3. **الوكيل الثالث (Agent 3):**
   - يتولى تدقيق القبول والتحقق التشغيلي الميداني للمخرجات وحمل المهارات والأدوات في بيئة المحادثة الحية.
4. **فريق Codex:**
   - يمتلك الجوانب البصرية وواجهات المكونات في الثيم؛ والتعديلات التي تمت في `nativeVariant.ts` حافظت بدقة على كافة فئات الـ CSS وبنية المكونات الأصلية.
