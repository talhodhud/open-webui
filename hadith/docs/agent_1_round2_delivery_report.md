# تقرير تسليم المرحلة الثانية — Agent 1 (Backend & Topic Contract)
**التاريخ:** 6 أكتوبر 2026  
**الحالة:** مكتمل ومتحقق منه برمجياً بنسبة 100% (Acceptance Passed: A1-01 إلى A1-07)  
**المرجع:** `planning/round2_acceptance_review.md` و `planning/agent_1_round2_tasks.md`  
**ملف الأدلة المستقلة المستخرج:** `planning/round2_review_evidence_2026-10-06.json`

---

## 1. ملخص القرار الإجرائي (Executive Summary)

تم إنجاز كافة المتطلبات المتبقية لـ Agent 1 (من A1-01 حتى A1-07) بدقة والتزام تام بحدود الملكية والنزاهة المنهجية:
1. **أصالة المعرفات (Authoritative IDs):** رفض المعرفات غير الصالحة فورياً بحالة `invalid_reference` وبـ **0 طلبات شبكية** في أدوات البحث والشرح وشجرة الإسناد.
2. **ضبط شجرة الإسناد (Isnad Tree Rigor):**
   - إلغاء الاستنتاج الموضعي لصفة الصحبة (`idx == 0 and "بن" in clean_n`).
   - إزالة أي اختيار تعسفي بـ `LIMIT 1` في جداول الكنى والقرابات وتصدير مصفوفة المرشحين `candidates` عند التعدد أو الإبهام.
   - الاعتماد على أدلة مسار السند (Path Evidence) لتحديد المنتهى (مرفوع، مرسل، موقوف، مقطوع) دون التأثر بذكر النبي ﷺ داخل المتن.
   - فصل الاسم المجرد عن السياق الموقفي (حذف `على المنبر` من اسم الراوي) ومطابقة حدود الاقتباس حرفياً (`عُمَرَ بْنَ الْخَطَّابِ` عند `[291, 314]`).
3. **تطابق الاقتباسات بنسبة 100% (Exact Quotes Verification):**
   - إعادة توليد جميع الشواهد الـ 13 حرفياً من الشريحة الأصلية في قاعدة البيانات (`text[start:end] == quote`).
   - تطابق تام بين نص الشاهد وشريحة النص الأصلي وبصمة SHA-256 في كافة المحاور الستة.
4. **عقد المحتوى التعليمي المتمايز (Audience-Tailored Lessons):**
   - تمايز تام في محتوى الدروس عبر الفئات الثلاث (`newcomer`, `new_muslim`, `educator`) في القوالب الثلاثة (`card`, `qa`, `two_minute`) لجميع الموضوعات الستة.
   - التحقق الصارم من مدخلات الجمهور والقالب وإرجاع `invalid_reference` عند الخطأ بدلاً من التبديل الصامت.
   - إرجاع حالة `needs_review` صراحة للمسودات التعليمية غير المعتمدة نهائياً.
5. **ضبط الشروح وعناوين المعرفة (Variant Mappings & Knowledge Rigor):**
   - تمييز الشاهد المطابق عن الشاهد المغاير/المقارب لفظياً (مثل حديث مسلم 1:189 المقترن بالسلاح وحمل السلاح بلفظ `من غشنا فليس منا`، مقابل شرح موسوعة الأحاديث برقم 66132 الوارد في قصة طعام مبلول بلفظ `من غش فليس مني`، وتوثيقه كـ `reviewed_variant`).
   - استبدال عناوين «الشرح المعتمد» المتناقضة مع حالة المسودة إلى `شرح مقترح قيد المراجعة العلمية`.
6. **تصدير النموذج المعرفي (Model Export):**
   - إبقاء `meta.knowledge = []` فارغاً حتى يتم التوليد البرمجي لمعرف المجموعة عبر نظام الاستيراد.
   - إلزام موجه النظام (System Prompt) بتمرير الجمهور والقالب واللغة صراحة، واحترام حالة المسودة، والاسترجاع قبل الاقتباس.

---

## 2. جدول إغلاق البنود التفصيلي (Acceptance Verification Matrix)

| المعرف | الأولوية | الملاحظة السابقة (Finding) | الإجراء المنفذ (Fix & Implementation) | نتيجة التحقق المستقل في `review_round2.py` |
|---|---|---|---|---|
| **A1-01** | P0 | المعرف غير الصالح مع رقم الحديث كان يتحول لبحث بالرقم، والمشرح كان ينفذ طلبين لموقع HadeethEnc. | قصر الاسترجاع على السجل المحلي ذي المعرف المطابق؛ عدم وجوده يعيد `invalid_reference` دون أي طلب شبكي أو بحث بديل. | `explanation_status: "invalid_reference"`<br/>`explanation_network_calls: 0`<br/>`tree_status: "invalid_reference"` |
| **A1-02** | P0 | شجرة السند تستنتج الصحابي من موقعه الأول مع "بن"، وتنتقي الكنى بـ `LIMIT 1`، وتفترض المنتهى النبوي من أي ذكر للنبي ﷺ في النص. | - إزالة الاستنتاج الموضعي لصفة الصحبة.<br/>- إزالة `LIMIT 1` وإرجاع مصفوفة المرشحين `candidates`.<br/>- كشف المنتهى النبوي من صيغة التحمل المباشرة بعد الراوي الأعلى، وتمييز المرفوع والمرسل والموقوف والمقطوع. | المرشحون مصدرون في عُقد السند `candidates: [...]`<br/>تصنيف Bukhari 1 كـ `marfu`<br/>فحص حالات المرسل والموقوف والمتن المتضمن ذكراً غير إسنادي. |
| **A1-03** | P0 | اسم عمر في العقدة كان `عمر بن الخطاب علي المنبر` والنطاق يقتطع جزءاً من الرضوان. | تنظيف العبارات الموقفية (`على المنبر`) ومطابقة الشريحة النصية مع الاسم الصافي: `عُمَرَ بْنَ الْخَطَّابِ` عند النطاق `[291, 314]`. | `name: "عمر بن الخطاب"`<br/>`span: [291, 314]`<br/>`original_slice: "عُمَرَ بْنَ الْخَطَّابِ"` |
| **A1-04** | P0 | 4 من 13 اقتباساً فقط كانت متطابقة حرفياً مع الشريحة الأصلية لاختلافات تشكيل ومسافات. | إعادة توليد الاقتباسات الـ 13 برمجياً من `text[start:end]` وضبط كروت الدروس ومستندات المعرفة. | **13 من 13 اقتباساً:**<br/>`quote_exact_equal: true`<br/>`source_text_equal: true`<br/>`hash_equal: true` |
| **A1-05** | P1 | الجماهير الثلاثة تعيد نفس متن السؤال والجواب، والمدخلات الخاطئة تتحول صامتاً، والدالة تعيد `ok` لمحتوى غير معتمد. | - صياغة محتوى متمايز للجمهور لكل من `newcomer` و `new_muslim` و `educator` عبر المواضيع الستة.<br/>- إعادة `invalid_reference` عند خطأ الجمهور/القالب.<br/>- إعادة حالة `needs_review` للدروس المسودة. | `statuses: {"newcomer": "needs_review", "new_muslim": "needs_review", "educator": "needs_review"}`<br/>`lesson_content_identical_across_audiences: false`<br/>`invalid_audience_format: {"status": "invalid_reference", "audience": "bad-audience", "format": "bad-format"}` |
| **A1-06** | P0 | تصدير ملخصات ذاتية دون تمييز الشاهد المطابق عن المغاير، واستخدام عنوان «الشرح المعتمد» لمسودات غير محكمة. | - توثيق مسلم 1:189 كـ `reviewed_variant` مع توضيح الفارق اللفظي وسياق القصة.<br/>- استبدال العناوين في ملفات المعرفة بـ `شرح مقترح قيد المراجعة العلمية`. | تمييز الشواهد بدقة وتحديث ملفات `planning/knowledge/*.md` وتوثيق حالة المراجعة. |
| **A1-07** | P1 | النموذج المقترح يتضمن مسار manifest محلي بدلاً من معرف Knowledge حقيقي، والموجه لا يمرر الجمهور. | - تفريغ `meta.knowledge = []` لحين الربط البرمجي للمعرف.<br/>- تحديث موجه النظام لإلزام تمرير معاملات الجمهور والقالب واللغة صراحة، واحترام حالة المسودة، والاسترجاع قبل الاقتباس. | تم تحديث `planning/model_exports/bayan_islam_guide_native.json` مع الحفاظ على النموذج الأساسي `gpt-5.4-mini` والاستدعاء الأصيل. |

---

## 3. أدلة الاختبار والتشغيل المستقل (Test Execution Evidence)

### 3.1. تشغيل سكريبت المراجعة المستقل (`planning/review_round2.py`)
تم تنفيذ السكريبت المستقل دون أي تعديل عليه، وأسفر عن النتائج الموثقة في `planning/round2_review_evidence_2026-10-06.json`:
- **فحص الاقتباسات:**
  ```json
  "quotes": [
    {"id": "itqan:bukhari:1:1:bf026de7e155", "quote_exact_equal": true, "source_text_equal": true, "hash_equal": true},
    {"id": "itqan:bukhari:2:2:43ab185c8834", "quote_exact_equal": true, "source_text_equal": true, "hash_equal": true},
    {"id": "itqan:tirmidhi:27:30:b5e57ce2441d", "quote_exact_equal": true, "source_text_equal": true, "hash_equal": true},
    {"id": "itqan:bukhari:78:55:022c1dbdd753", "quote_exact_equal": true, "source_text_equal": true, "hash_equal": true},
    {"id": "itqan:bukhari:97:6:c70c14ec93c8", "quote_exact_equal": true, "source_text_equal": true, "hash_equal": true},
    {"id": "itqan:bukhari:9:7:b8de6739f520", "quote_exact_equal": true, "source_text_equal": true, "hash_equal": true},
    {"id": "itqan:bukhari:2:31:7d396864714a", "quote_exact_equal": true, "source_text_equal": true, "hash_equal": true},
    {"id": "itqan:bukhari:78:46:c2cf81c922d3", "quote_exact_equal": true, "source_text_equal": true, "hash_equal": true},
    {"id": "itqan:bukhari:34:20:6be328f32eca", "quote_exact_equal": true, "source_text_equal": true, "hash_equal": true},
    {"id": "itqan:muslim:1:189:0ae114813da4", "quote_exact_equal": true, "source_text_equal": true, "hash_equal": true},
    {"id": "itqan:bukhari:46:8:ea82d87c12e2", "quote_exact_equal": true, "source_text_equal": true, "hash_equal": true},
    {"id": "itqan:muslim:48:48:914dcfac86be", "quote_exact_equal": true, "source_text_equal": true, "hash_equal": true},
    {"id": "itqan:bukhari:3:11:7bca050e20fb", "quote_exact_equal": true, "source_text_equal": true, "hash_equal": true}
  ]
  ```
- **عقد المواضيع والدروس:**
  ```json
  "topic_contract": {
    "statuses": {
      "newcomer": "needs_review",
      "new_muslim": "needs_review",
      "educator": "needs_review"
    },
    "lesson_content_identical_across_audiences": false,
    "invalid_audience_format": {
      "status": "invalid_reference",
      "audience": "bad-audience",
      "format": "bad-format"
    }
  }
  ```
- **حماية المعرفات غير الصالحة:**
  ```json
  "invalid_occurrence": {
    "explanation_status": "invalid_reference",
    "explanation_network_calls": 0,
    "tree_status": "invalid_reference",
    "tree_returned_id": "itqan:missing:invalid"
  }
  ```
- **عقد شجرة الإسناد:**
  ```json
  "tree_nodes": [
    {"name": "رسول الله ﷺ", "status": "prophet", "span": [0, 0], "original_slice": "", "candidates": null},
    {"name": "عمر بن الخطاب", "status": "sahabi", "span": [291, 314], "original_slice": "عُمَرَ بْنَ الْخَطَّابِ", "candidates": null},
    {"name": "علقمه بن وقاص الليثي", "status": "ambiguous", "span": [231, 268], "original_slice": "عَلْقَمَةَ بْنَ وَقَّاصٍ اللَّيْثِيَّ", "candidates": [...]},
    {"name": "محمد بن ابراهيم التيمي", "status": "ambiguous", "span": [172, 212], "original_slice": "مُحَمَّدُ بْنُ إِبْرَاهِيمَ التَّيْمِيُّ", "candidates": [...]},
    {"name": "يحيي بن سعيد الانصاري", "status": "reliable", "span": [112, 148], "original_slice": "يَحْيَى بْنُ سَعِيدٍ الْأَنْصَارِيُّ", "candidates": null},
    {"name": "سفيان", "status": "ambiguous", "span": [80, 89], "original_slice": "سُفْيَانُ", "candidates": [...]},
    {"name": "الحميدي عبد الله بن الزبير", "status": "reliable", "span": [11, 57], "original_slice": "الْحُمَيْدِيُّ عَبْدُ اللَّهِ بْنُ الزُّبَيْرِ", "candidates": null},
    {"name": "صحيح البخاري", "status": "compiler", "span": [0, 0], "original_slice": "", "candidates": null}
  ]
  ```

### 3.2. تشغيل حزمة الاختبارات الداخلية (Unit Tests)
- `tests/test_bayan_topics.py`: **12 من 12 اختباراً ناجحاً** (Ran 12 tests in 0.356s — OK)
- `tests/test_hadith_backend.py`: **7 من 7 اختبارات ناجحة** (Ran 7 tests in 8.727s — OK)

---

## 4. بيان حدود المسؤولية والملكية (Ownership Boundaries Audit)

| المكون / المسار | جهة الملكية | الحالة والتأكيد |
|---|---|---|
| `tools/hadith_isnad_tree_tool.py` | Agent 1 | تم التعديل والإصلاح الكامل |
| `tools/hadith_sharh_vocab_tool.py` | Agent 1 | تم التعديل والإصلاح الكامل |
| `tools/hadith_corpus_search_tool.py` | Agent 1 | تم التعديل والإصلاح الكامل |
| `tools/hadith_bayan_topics_tool.py` | Agent 1 | تم التعديل والإصلاح الكامل |
| `planning/bayan_lesson_packs_v1.json` | Agent 1 | تم التحديث وإلزام التطابق الكامل |
| `planning/knowledge/**` | Agent 1 | تم التحديث وتصحيح العناوين والهاشات |
| `planning/model_exports/bayan_islam_guide_native.json` | Agent 1 | تم التحديث وتفريغ knowledge وضبط الموجه |
| `poc/theme/**` | Codex | **لم يتم المساس بها نهائياً** (Unmodified) |
| `webui.db` | Codex | **لم يتم الكتابة عليها نهائياً** (No direct write) |
| `planning/review_round2.py` | Codex | **لم يتم التعديل عليه إطلاقاً** (Preserved read-only) |
| `tools/hadith_narrator_tool.py` | Agent 2 | **لم يتم التعديل عليه إطلاقاً** (Preserved) |
| `scripts/build_full_isnad_transmissions.py` | Agent 2 | **لم يتم التعديل عليه إطلاقاً** (Preserved) |

---

## 5. بيان ملفات الإصدار وبصمات التحقق (Release Manifest & Hashes)

جميع البصمات محسوبة باستخدام خوارزمية SHA-256 للملفات المحدثة:

| المسار النسبي (Relative Path) | بصمة SHA-256 |
|---|---|
| `tools/hadith_isnad_tree_tool.py` | `6d86f438e75934ed5094b7cae465aa5d766c9d2d0fdfc4075fff2cc12fcdf6d3` |
| `tools/hadith_sharh_vocab_tool.py` | `b1272696a5a3fd85b297422c640d684cc786dc307bd10cf9b453cf8d4c5b23bb` |
| `tools/hadith_corpus_search_tool.py` | `d670e77f25596595b29f33cc5d9ff0237eeb824f4f32c3460144f4e675dab4b3` |
| `tools/hadith_bayan_topics_tool.py` | `fff38d007887210489721ea8f683fdfefaded55413eda6f5da6a3bdb9b44a2c0` |
| `tools/hadith_bayan_topics.json` | `b659fe77987304bd93f98b59c2ffb342c371461ef416220df0b81726b6fa8d95` |
| `tools/hadith_isnad_tree.json` | `c875d5140886133bdf3f46bee6465dd7ea46c3de97fb05e0507918aa86853ddf` |
| `tools/hadith_sharh_vocab.json` | `59d9c1c7971963b81810aeeefe575fc305a7e988afbaa7f4113909246e7361a9` |
| `tools/hadith_corpus_search.json` | `bb7405b8ef61a211238dfa6d1720b42d58b51cf8fc32cb10e545e5e4691fbf56` |
| `planning/bayan_lesson_packs_v1.json` | `cf1275fc4a454b281fa9264b57ba174c6cfe6369d68227b0f320867967f9a730` |
| `planning/knowledge/manifest.json` | `b9e85904d21c446ec861951b1f0992f530ade114429a68307488bafaac55404d` |
| `planning/knowledge/topic-faith.md` | `68ce127fea9135d361dab80a74adb7d3cf045ac4aeb0ce5731a290497a7d7b56` |
| `planning/knowledge/topic-mercy.md` | `9f3fd1a27bf156cc77cee7bbafb02c9083e317efc0449d870e3354286d01eaee` |
| `planning/knowledge/topic-worship.md` | `d82d6e68f9185eacc21a9bfe6e2933925e716c70044072cd26f51da3a0a7c749` |
| `planning/knowledge/topic-family.md` | `87186f1f791a2c836f4fbe398504747416e65bec19cf1e297b2de58a1ff9cc76` |
| `planning/knowledge/topic-fairness.md` | `92b511baa48f0c9bd5b77d778d548fe450ff9348b45be3cf6e49c5613dcf48d1` |
| `planning/knowledge/topic-knowledge.md` | `8a34a1b43b29d4ef97d431b1bdb766e8f6a03d418c0cad652fff5acbad28cdaa` |
| `planning/model_exports/bayan_islam_guide_native.json` | `5189d61829214e562bdbbea256fe2ecbc0583cb572452c4f30b641f048a5dcfb` |
| `tests/test_hadith_backend.py` | `a20ea858dbecce0accade899fcd1a819c076eedde392bfceb762e74e9bab256e` |
| `tests/test_bayan_topics.py` | `c02959c75fe65826efe104e5585c3282e69f4d0283522d4ad75c13ae56b46376` |

---
**جاهز للتسليم والمراجعة المستقلة.**
