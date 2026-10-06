# Hadith AI Agent Backend Delivery Report · تقرير تسليم الواجهة الخلفية لنظام الحديث الذكي

**Date:** 2026-10-05  
**Workspace:** `C:\Users\mhdal\OneDrive\AI\Hadith KSA`  
**Target Audience:** Codex (Frontend & Integration Lead) & Academic Reviewers  
**Status:** **Completed & Verified (7/7 Regression Checks Passing)**  

---

## 1. Executive Summary · ملخص تنفيذي

تم إنجاز كافة المهام الموكلة للواجهة الخلفية (Backend) المحددة في وثيقة التسليم [`planning/ai_agent_backend_handoff.md`](file:///c:/Users/mhdal/OneDrive/AI/Hadith%20KSA/planning/ai_agent_backend_handoff.md) بدقة متناهية ودون المساس بالواجهات الأمامية (`poc/theme/**`) أو التعديل المباشر على قواعد البيانات الحية (`webui.db`):
1. **معالجة قواطع الإطلاق (P0 Blockers):** إزالة كافة الافتراضات التلقائية المسبقة (`ثقة ثبت`)، وفصل تقييمات ابن حجر والذهبي فصلاً تاماً لمنع التلفيق (Cross-Imputation)، وضبط البحث والفتح عبر المعرفات المستقرة `occurrence_id` المتوافقة مع محرك الفهرسة (`poc/phrase_search`)، وتصحيح مطابقة الشروح في HadeethEnc لمنع إلصاق الشروح غير المطابقة، وفك الارتباط التلقائي بالنبي ﷺ في شجرة الإسناد للسماح بالأحاديث الموقوفة والمقطوعة.
2. **عقد الاستجابة الموحد (Response Contract v1):** تم توحيد مغلفات الرد لجميع الأدوات الخمس لتعود بصيغة معيارية `schema_version: "1"` تشمل: `status`, `data`, `evidence`, `coverage`, `warnings`, `dataset_version`, `retrieved_at` مع دعم الحالات الدلالية (`ok`, `no_match`, `ambiguous`, `unavailable`, `invalid_reference`, `needs_review`).
3. **توليد النماذج السبعة للواجهة (7 UI Contract Fixtures):** تجهيز ملفات JSON حقيقية في مجلد `planning/fixtures/` لاستخدام Codex في بناء واختبار واجهات العرض التفاعلية.
4. **عائلات الأحاديث التوثيقية الثلاث (3 Report Families):** توثيق ثلاث عائلات حديثية نموذجية في مجلد `planning/report_families/` للتحكيم العلمي الخارجي تشمل: الأسانيد الفردية، مقارنة الألفاظ المتقابلة، وتفكيك تحويلات الأسانيد (ح).
5. **تصدير إعدادات النماذج الثلاثة (3 Clean Model Exports):** إعداد ملفات التصدير للنماذج الثلاثة في `planning/model_exports/` (المرشد التعليمي، منسق البحوث، وناقد الأسانيد) بضوابط نقدية منقحة تسمح بالمسارات المبتورة والمبهمات غير المحلولة.
6. **جناح الاختبارات الانحدارية الآلي (Automated Regression Suite):** بناء وتنفيذ `tests/test_hadith_backend.py` والتأكد من نجاح كافة الفحوصات الـ 7 بنسبة 100%.

---

## 2. Changed & Created Files · قائمة الملفات المعدلة والمنشأة

| File Path | Status | Purpose / Description |
|:---|:---|:---|
| [`tools/hadith_contract_helper.py`](file:///c:/Users/mhdal/OneDrive/AI/Hadith%20KSA/tools/hadith_contract_helper.py) | **Created** | Standard envelope builder for Response Contract v1. |
| [`tools/hadith_corpus_search_tool.py`](file:///c:/Users/mhdal/OneDrive/AI/Hadith%20KSA/tools/hadith_corpus_search_tool.py) | **Updated** | Added `SEARCH_INDEX_PATH`, stable `occurrence_id`, numeric disambiguation, and read-only fallback. |
| [`tools/hadith_narrator_tool.py`](file:///c:/Users/mhdal/OneDrive/AI/Hadith%20KSA/tools/hadith_narrator_tool.py) | **Updated** | Removed positive defaults (`ثقة ثبت`), disentangled Ibn Hajar/Dhahabi ranks. |
| [`tools/hadith_sharh_vocab_tool.py`](file:///c:/Users/mhdal/OneDrive/AI/Hadith%20KSA/tools/hadith_sharh_vocab_tool.py) | **Updated** | Removed blind first-hit selection; added token-overlap scoring and `unavailable` rejection. |
| [`tools/hadith_isnad_tree_tool.py`](file:///c:/Users/mhdal/OneDrive/AI/Hadith%20KSA/tools/hadith_isnad_tree_tool.py) | **Updated** | Supported `occurrence_id`, structured JSON paths/nodes/edges with `source_span`, mawquf chains. |
| [`tools/hadith_takhrij_tool.py`](file:///c:/Users/mhdal/OneDrive/AI/Hadith%20KSA/tools/hadith_takhrij_tool.py) | **Updated** | Standardized response envelope, explicit provider outage disclaimers. |
| `tools/*.json` (5 files) | **Updated** | Synchronized Open WebUI specs and embedded executable Python codes. |
| `planning/revisions/*.py` (2 files) | **Created** | Preserved installed (`59eeb795...`) and workspace (`6e1b6a9e...`) isnad revisions. |
| `planning/fixtures/*.json` (7 files) | **Created** | 7 UI contract JSON fixtures for Codex frontend development. |
| `planning/report_families/*.json` (3 files) | **Created** | 3 comprehensive source-traceable report families for academic review. |
| `planning/model_exports/*.json` (3 files) | **Created** | Clean proposed model configurations (Learner, Research Coordinator, Rijal Specialist). |
| [`tests/test_hadith_backend.py`](file:///c:/Users/mhdal/OneDrive/AI/Hadith%20KSA/tests/test_hadith_backend.py) | **Created** | Comprehensive regression test suite covering all 7 handoff requirements. |

---

## 3. Installed-versus-Source Hash Comparison · جدول مطابقة البصمات الرقمية (SHA-256)

| Component | File Path | SHA-256 Digest | Status & Review Notes |
|:---|:---|:---|:---|
| **Contract Helper** | `tools/hadith_contract_helper.py` | `9a1ef1991616102cab4d351c4ec5f42706695a3e02a52fc62b15333180949827` | Verified Response Contract v1 |
| **Corpus Tool** | `tools/hadith_corpus_search_tool.py` | `8f5e398de4171c69f8c770378bad0432aeb2c8e90d7c81bf82436de08b073bb4` | Stable ID + Ambiguity handling |
| **Corpus Tool Spec**| `tools/hadith_corpus_search.json` | `728ab305b088e4b26899366716c5d247904ee5a960910f2918e5d237450508fb` | Synced with Python implementation |
| **Narrator Tool** | `tools/hadith_narrator_tool.py` | `79c93ff87ad470db153d891f7d2fd8ff31efbc7b7a5c9f3df73584ec0a327e13` | No positive defaults, no cross-imputation |
| **Narrator Tool Spec**| `tools/hadith_narrator.json` | `6f21798a5d243e18721182cb57d56c49db00d55e8de9844918fd37a89c5f388b` | Synced with Python implementation |
| **Sharh Tool** | `tools/hadith_sharh_vocab_tool.py` | `43400aecf568ff3f49511ac2cc6547655ba15f3eaa760b0294ef1132eda86daf` | Matn-overlap scoring & safe rejection |
| **Sharh Tool Spec** | `tools/hadith_sharh_vocab.json` | `28a9797290c10eac47303f46b1e5a42a354f35778c489fcb55f3477a5a1124c4` | Synced with Python implementation |
| **Isnad Tool (Preserved Installed)** | `planning/revisions/installed_hadith_isnad_tree_7b75ee2f.py` | `59eeb795e79b16f448de2f42b0fbc68b53c84cc15c88ad0cd23b6bf842c0234d` | Baseline installed revision |
| **Isnad Tool (Preserved Workspace)** | `planning/revisions/workspace_hadith_isnad_tree_6e1b6a9e.py` | `6e1b6a9e80bc6901cee98231130b9f2ba4659aa62711f940aaa581c9ae9a9a07` | Baseline workspace revision |
| **Isnad Tool (Current Active)** | `tools/hadith_isnad_tree_tool.py` | `15edb2f10f51796dd1ce00e1741ea4ac489345be90c2809ebb8dca06795cecf6` | Reconciled, graph JSON, source spans |
| **Isnad Tool Spec** | `tools/hadith_isnad_tree.json` | `72cb6fc878feb1e54be25627813eb5b7f9c1f06d19ded3fb714ebaa2662d4420` | Synced with Python implementation |
| **Takhrij Tool** | `tools/hadith_takhrij_tool.py` | `1756c541aa52485543bda81739243f08ce8554f10fa8504d295c3e585c085037` | Outage disclaimers + Contract v1 |
| **Takhrij Tool Spec**| `tools/hadith_takhrij.json` | `e9862969a7b5d9729026f0916ca1b36ff13fca07c3c7209dbbb35654c9b3123c` | Synced with Python implementation |
| **Regression Suite** | `tests/test_hadith_backend.py` | `a20ea858dbecce0accade899fcd1a819c076eedde392bfceb762e74e9bab256e` | 7 automated tests passing |

---

## 4. UI Contract Fixtures · نماذج بيانات واجهة المستخدم (7 Fixtures)

تم إنشاء وتوثيق 7 نماذج بيانات JSON كاملة ومطابقة لـ Response Contract v1 في مجلد `planning/fixtures/`:

1. **`fixture_01_search_and_open.json`** (`status: "ok"`):
   - **العملية:** البحث بعبارة («الأعمال بالنيات») واستخراج المعرف المستقر، ثم فتح السجل الدقيق بالمعرف `itqan:bukhari:1:1:bf026de7e155`.
   - **المحتوى:** المتن العربي الكامل المشكول، بيانات المصدر الرقمي (Itqan)، القسم، الموضع، والبصمة الرقمية.
2. **`fixture_02_ambiguous_numeric.json`** (`status: "ambiguous"`):
   - **العملية:** طلب الحديث رقم `1` في صحيح البخاري دون تحديد الباب.
   - **المحتوى:** قائمة مرشحين (97 مرشحاً) مع عناوين الأبواب ومعرفات السجلات، وتوجيه علمي يطلب تحديد الباب أو المعرف.
3. **`fixture_03_missing_grade.json`** (`status: "ok"`):
   - **العملية:** جلب ترجمة الراوي رقم `320` (سعيد بن سماك).
   - **المحتوى:** رتبة ابن حجر: `"غير متاح في تقريب التهذيب"`، رتبة الذهبي: `"غير متاح في الكاشف"`. انعدام التلفيق أو الافتراض المسبق (`ثقة ثبت`).
4. **`fixture_04_matched_explanation.json`** (`status: "ok"`):
   - **العملية:** جلب الشرح المعتمد لحديث «إنما الأعمال بالنيات» من موسوعة HadeethEnc.
   - **المحتوى:** رقم الحديث في الموسوعة (`4560`)، نسبة التطابق (`1.0`)، الشرح المفصل، الفوائد التربوية، ومعاني المفردات.
5. **`fixture_05_explanation_unavailable.json`** (`status: "unavailable"`):
   - **العملية:** طلب شرح لعبارة غير موجودة في الموسوعة («كهرومغناطيسية الذرة الكمومية»).
   - **المحتوى:** حجب الشرح لعدم تطابق المتن، مع بيان أن عدم وجود شرح في الموسوعة لا يمس صحة الحديث.
6. **`fixture_06_provider_failure.json`** (`status: "unavailable"`):
   - **العملية:** محاكاة انقطاع الاتصال الخارجي أو انتهاء مهلة الطلب (Gateway Timeout / 504).
   - **المحتوى:** تنبيه منهجي صريح بأن انقطاع الخدمة عارض تقني ولا يعني إطلاقاً ضعف الحديث أو وضعه.
7. **`fixture_07_partial_graph.json`** (`status: "ok"`):
   - **العملية:** بناء شجرة الإسناد مع هيكل بياني JSON متكامل (`paths`, `nodes`, `edges`).
   - **المحتوى:** توثيق المسار الخطي، ومواضع الكلمات الإسنادية (`source_span`)، وتفكيك العلاقات دون فرض اتصال وهمي.

---

## 5. Curated Report Families · العائلات الحديثية الموثقة الثلاث

تم إنشاء 3 تقارير علمية متكاملة للتحكيم الخارجي في مجلد `planning/report_families/`:

1. **`family_01_niyyah.json`** (حديث: «إنما الأعمال بالنيات»):
   - **التركيز:** نموذج الحديث الفرد الغريب في طبقته العليا، ومدار يحيى بن سعيد الأنصاري.
   - **المحتوى:** السجلات المستخرجة من الكتب الستة، الشجرة الهابطة، وبيان تفرد عمر ثم علقمة ثم التيمي ثم يحيى بن سعيد وتواتره عنه.
2. **`family_02_khayran_aw_liyasmut.json`** (حديث: «فليقل خيراً أو ليصمت»):
   - **التركيز:** دراسة مقارنة الألفاظ المتقابلة (Wording Variants Matrix).
   - **المحتوى:** رصد اختلاف الروايات بين «فليكرم جاره» و«فلا يؤذ جاره»، و«فليكرم ضيفه جائزته»، وبيان مخرجي الحديث عن أبي هريرة وأبي شريح الخزاعي دون دمج تلفيقي.
3. **`family_03_kusuf_tahweel.json`** (حديث: صلاة الكسوف والتحويل الإسنادي `ح`):
   - **التركيز:** تفكيك تحويلات الأسانيد (ح) والمدارات المتقاطعة في صحيح مسلم وصحيح البخاري.
   - **المحتوى:** مسارات التحويل عند مدار هشام بن عروة ومدار الزهري، وتوثيق نقاط الالتقاء والافتراق في السند.

---

## 6. Proposed Model Configurations · إعدادات النماذج المقترحة للتوريد

تم تجهيز 3 ملفات تصدير نظيفة ومتوافقة تماماً مع معايير Open WebUI في مجلد `planning/model_exports/`:

1. **`learner_model_export.json`** (**المرشد التعليمي — تعلّم وافهم**):
   - **الأدوات:** `hadith_corpus_search`, `hadith_sharh_vocab`, `hadith_takhrij`, `hadith_narrator`.
   - **المنهج:** تبسيط المعاني، شرح الغريب، واستنباط الفوائد الأخلاقية والتربوية مع الأمانة في حجب الشروح غير المطابقة.
2. **`research_coordinator_export.json`** (**منسق البحوث — ابحث وقارن**):
   - **الأدوات:** `hadith_corpus_search`, `hadith_takhrij`, `hadith_isnad_tree`, `hadith_sharh_vocab`.
   - **المنهج:** المقارنة بين دواوين السنة، بناء مصفوفة الألفاظ المتقابلة، تفكيك التحويلات (ح)، وقبول المسارات المبتورة (الموقوف والمقطوع والمرسل).
3. **`rijal_specialist_export.json`** (**ناقد الأسانيد وخبير الرجال والعلل**):
   - **الأدوات:** `hadith_narrator`, `hadith_isnad_tree`, `hadith_corpus_search`.
   - **المنهج:** الجرح والتعديل الصارم، حظر الافتراضات المسبقة (`ثقة ثبت`)، الفصل القاطع بين أحكام ابن حجر والذهبي، وحل المبهمات والكنى بالبينات دون تخمين.

---

## 7. Automated Regression Suite Results · نتائج الاختبارات الانحدارية

تم تنفيذ الاختبارات بنجاح تام عبر الأمر:
```bash
python -m unittest tests/test_hadith_backend.py
```

### سجل التنفيذ (Execution Log):
```text
.......
----------------------------------------------------------------------
Ran 7 tests in 6.487s

OK
```

### تفاصيل الفحوصات السبعة:
1. `test_01_stable_occurrence_id_and_ambiguous_numeric`: **نجح** (فتح النص الدقيق عبر المعرف المستقر، وإرجاع حالة `ambiguous` وقائمة المرشحين عند طلب البخاري رقم 1 دون باب).
2. `test_02_unknown_grade_and_no_cross_imputation`: **نجح** (بقاء الرتب المجهولة غير متاحة، وعدم ملء رتبة ابن حجر برتبة الذهبي أو العكس للرواة 320 و 13 و 290).
3. `test_03_narrator_identities_remain_candidates_without_crosswalk`: **نجح** (بقاء الرواة متعددي المرشحين عند البحث العام مثل "أبو صالح"، وعدم فرض تعيين قسري).
4. `test_04_unrelated_hadeethenc_result_rejected`: **نجح** (حجب الشروح غير المتطابقة وإرجاع `unavailable` للنصوص غير الحديثية، واسترجاع الشرح المطابق للحديث الصحيح).
5. `test_05_graph_edges_resolve_with_source_spans`: **نجح** (احتواء كافة حواف الشجرة `edges` وعقدها `nodes` على مجالات النص المصدر `source_span` والمعرفات).
6. `test_06_provider_error_and_no_hit_semantics`: **نجح** (إرجاع `no_match` عند غياب النتائج، وإرجاع `unavailable` عند انقطاع الشبكة مع تنبيه منهجي بأن الانقطاع لا يعني الضعف).
7. `test_07_tool_specs_match_callable_signatures`: **نجح** (تطابق تام بين مدخلات مواصفات JSON في `tools/*.json` والدوال البرمجية القابلة للاستدعاء في بايثون).

---

## 8. Coordination Instructions for Codex · تعليمات التنسيق مع فريق الواجهة (Codex)

1. **الواجهة الأمامية (`poc/theme/**`):**
   - تم الالتزام بعدم لمس أو تعديل أي ملف في `poc/theme/**`.
   - يمكن لـ Codex استهلاك حقول العقد المعياري v1 مباشرة (`data`, `evidence`, `coverage`, `warnings`).
2. **استخدام نماذج البيانات (Fixtures):**
   - استخدم الملفات السبعة في `planning/fixtures/` لاختبار سلوك الواجهة في مختلف الحالات: النجاح، الالتباس العددي، انقطاع المزود، وغياب الشرح.
3. **تحديث قواعد البيانات الحية (`webui.db`):**
   - لم يتم تنفيذ أي تعديل كتابي على `webui.db` حفظاً للبيانات.
   - يتولى Codex تنسيق استيراد الأدوات والنماذج عبر مسار Open WebUI المعتمد في خطوة استيراد واحدة خاضعة للمراجعة (Reviewed Import).
4. **استدعاء الأدوات البرمجية:**
   - كافة أدوات `tools/*_tool.py` و `tools/*.json` متزامنة ذاتياً وتحتوي على آليات استيراد مرنة مع دعم السقوط الآمن (Fallback) عند التشغيل المستقل.

---
**جاهز للتسليم والدمج بواسطة Codex.**
