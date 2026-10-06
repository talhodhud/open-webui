# Bayan delivery review and next backend assignment

Date: 2026-10-05. This is the user's next handoff to their backend AI agent. Frontend owner: Codex. Do not overwrite the user's three working model presets.

## What is live in the interface

Working product name: **بيان السُّنّة — الحديث النبوي للمعرّفين بالإسلام**.

The original Open WebUI and أثر ١ remain available. أثر ٢ now has three entry paths: **أُعرّف بالإسلام**, **أستكشف حديثًا**, **أتوسّع وأبحث**. The separate Hadith search widget is absent from أثر ٢; the native composer, history, tools, model selector, and rich responses remain.

| Button or subject | Explicit native model ID | Role |
|---|---|---|
| الصلاة جامعة | `hadith-model-1` | Existing tested text/takhrij case |
| الحج عرفة | `hadith-modular-agent` | Existing tested comparison/Mermaid case |
| رواة أبي هريرة | `hadith-rijal-agent` | Existing tested narrator case |
| All six introductory subject cards | `hadith-islam-guide` | New bounded introductory guide |

Each card opens a preview and provides **run now** and **edit first**. Model selection is explicit in the native URL, not inherited from the last selected model. Existing drafts and chats are preserved by opening a new tab. Conversation follow-ups prepare a draft without sending it.

The additive `hadith-islam-guide` export is `planning/model_exports/bayan_islam_guide_native.json`. It uses the already-configured `gpt-5.4-mini`, native tool calling, and only `hadith_corpus_search`. It prepares sourced introductory drafts and labels unreviewed summaries. Commentary, grading, graph, and autonomous delegation are not enabled in this guide while their evidence paths are being corrected. It is a POC, not a reviewed educational curriculum.

## Review outcome: useful progress, not yet accepted for backend replacement

I reproduced **7/7 passing tests in 5.807 seconds** with public API access. The sandboxed run failed the live HadeethEnc test because it returned `unavailable`; this was an environment dependency, not evidence of a code regression. Separate offline unit tests from provider smoke tests.

The tests confirm selected behaviors, but their assertions are narrower than the delivery report's claims. `planning/review_delivery.py` provides a read-only reproducible review; its results are in `planning/backend_delivery_review_evidence.json`.

### P0: correct these before importing the replacement tool bundle

1. **Isnad identity and grading remain unsafe.** `tools/hadith_isnad_tree_tool.py:_get_narrator_grade` still uses a substring/name query with `LIMIT 1`, `row[0] or "ثقة"`, and a final `return "reliable", grade_ar`. Kunya/relative resolution also selects a single row without occurrence-specific evidence. Removing defaults in the separate narrator tool did not remove them here. Make ambiguous identities explicit candidates; require a sourced identity crosswalk before attaching an assessment. Keep each scholar/work/quotation separate. Test the graph path, not just `get_narrator_biography`.

2. **Graph offsets do not locate the original source.** The code parses normalized `clean` and exports those positions as `source_span` for the original record. In fixture 07, the node named عمر بن الخطاب has `[177,217]`, but slicing the original gives part of محمد بن إبراهيم التيمي. Other nodes are similarly misaligned. Preserve original codepoint offsets or an explicit normalization-to-original map. Include source hash, path membership, transmission phrase span, and node mention span. Compiler links are metadata, not zero-length textual evidence.

3. **Endpoint and route handling are not verified.** Fixture 07 labels the intentions report `mawquf_or_maqtu` even though its original text explicitly reports the Messenger's speech. Detection mixes normalized lengths with diacritized text; absence of a regex hit must yield `unresolved`, not a scholarly classification. Add actual مرفوع/موقوف/مقطوع/مرسل cases, multiple `ح` routes, partial paths, and shared-segment checks. Do not label a regex-extracted linear sequence a complete verified graph.

4. **Explanation matching still admits unrelated content.** The threshold accepts any two shared words, even at a low ratio, and does not recheck the detail response's full text. The controlled probe returns `status: ok`, score **0.17**, and an unrelated explanation. A candidate title overlap is retrieval evidence, not a verified mapping. Match the fetched full Arabic matn to the selected occurrence, use reviewed one-to-many mappings where needed, require disambiguation for short/generic phrases, and return `needs_review`/`unavailable` when identity is unestablished. Add a mocked nonempty wrong first hit, shared-word negative, contradicted detail body, and invalid occurrence ID case.

5. **Contract and specs need complete validation.** Some public branches still return raw JSON such as `status: unresolved` instead of Contract v1. Test every exported method's success/empty/error branches and validate the enum. The current spec test only checks that declared parameters exist in Python; it does not catch omitted Python parameters, wrong types/defaults/required flags, missing methods, or embedded-code drift. Validate these bidirectionally and import the isolated embedded code in a temp module without workspace helper imports.

6. **The three proposed model exports are not native import-ready.** They are single objects, use top-level `tools`, omit `base_model_id`, omit `meta.toolIds`, and omit `params.function_calling="native"`. This installation's Models import expects an array. Use `bayan_islam_guide_native.json` as a format example, with the appropriate tools for each role. Keep proposed IDs separate from the three tested preset IDs and include a migration mapping. Do not silently replace tested prompts.

7. **Report-family claims need evidence manifests.** The three family files contain useful retrieved occurrences, but analytical claims/grades such as `convergence_grade`, `consensus_grade`, and `dorar_synthesis` are not thereby reviewed or attributable. Attach each assertion to an exact source passage/locator, occurrence/path IDs, and reviewer state. Mark unsupported analysis as a draft. Rebuild fixtures only after the code is fixed and label mocked failures as mocked. Do not call all seven fixtures “real verified outputs” indiscriminately.

Deliver corrected source and embedded JSON, a precise change/hash manifest, the expanded offline tests, separate live-provider smoke results, and refreshed fixtures. Codex will review and import through Open WebUI's supported UI/API workflow; no direct SQL writes to `webui.db`.

## P1: build the subject-based Islam introduction track

The journey is **موضوع → شواهد موثقة → معنى واضح → مادة تناسب الجمهور → مراجعة ومشاركة**. The user chooses an audience (interested newcomer, new Muslim, or educator) and a format (short card, Q&A, or two-minute introduction). Avoid assuming the reader is already Muslim or familiar with specialist terms.

Start from the actual **336 chapter files / 34,240 indexed occurrences** inventory in `planning/six_book_chapter_inventory.json`. `planning/islam_topic_map_v0.json` is only a reproducible keyword map of chapter titles. Topics overlap; these counts are source occurrences, not distinct reports, certified lessons, or exhaustive topical coverage.

| Topic ID | Interface subject | Initial question |
|---|---|---|
| `topic-faith` | الإيمان والمعنى | كيف يربط الإسلام الإيمان بالنية والعمل؟ |
| `topic-mercy` | الرحمة وحسن الخلق | كيف تظهر الرحمة في تعامل المسلم مع الناس؟ |
| `topic-worship` | العبادة والحياة | ما الصلة بين العبادة والحياة اليومية؟ |
| `topic-family` | الأسرة والجوار | كيف يحفظ الإسلام حقوق الأسرة والجار؟ |
| `topic-fairness` | العدل والأمانة | كيف تحضر الأمانة والعدل في التعاملات؟ |
| `topic-knowledge` | العلم والحوار | كيف يدعو الحديث إلى التعلم وحسن الحوار؟ |

### Deliverables, in order

**Observed live relevance case:** the initial mercy query `يرحم` returned a contextual supplication from a purification report as a teaching witness. The UI seed now uses `من لا يرحم` plus `الرفق`, and asks for the selection rationale. Add that incidental-supplication example as a negative label in the topic retrieval tests; prompt refinement does not replace a reviewed lesson set. The first guide smoke test completed two corpus calls and returned the requested Q&A draft with provisional-summary/coverage labels, but selected three snippets under a heading claiming two. Include exact cardinality and thematic relevance in the next model evaluation.

1. **Topic taxonomy v1:** inventory actual source book/chapter semantics across all six collections, normalize aliases without replacing original labels, propose subtopics, record mapping method/confidence/review status. Do not classify matn merely because its chapter title matched a keyword. Preserve negative examples and multi-label mappings.
2. **First six lesson packs:** one reviewed pack per visible topic, each with 2–3 selected occurrences where available. Include exact text/hash, collection/chapter/local numbering, source URLs, attributed judgments with scope, verified explanation IDs/passages, relevant vocabulary, learning objective, and selection rationale. Do not force an occurrence from every book into every topic.
3. **Knowledge files:** export only the approved explanatory passages and educator notes, with stable passage IDs, language, rights/provenance, and links to structured occurrences. Keep exact text/IDs/graphs in structured storage. Supply a manifest for a Knowledge collection named `Bayan — Introduction to Islam`. Do not upload unrevised family drafts as approved knowledge.
4. **Three small read-only operations:** `list_islam_topics`, `get_topic_evidence(topic_id, audience, language)`, `get_reviewed_lesson(topic_id, format, language)`. Return Contract v1 plus `topic_id`, `lesson_id`, `audience`, `learning_objective`, `occurrence_ids`, `explanation_ids`, `claim_evidence`, `review_status`, and honest `coverage` (searched/retrieved/reviewed/missing collections). No machine authenticity score.
5. **Upgrade the existing new guide:** revise `hadith-islam-guide` with the reviewed topic tool and Knowledge collection after P0 acceptance. Keep native calling. Distinguish quotations, attributed commentary, and pedagogical wording. Respect unknown status; avoid fatwa and fabricated historical context. Keep initial responses short and suited to the selected audience/format.
6. **Evaluation:** add at least two positive and two difficult/negative cases per topic (24 total minimum), separate from the six demonstration packs. Evaluate citation resolution, exact quotation, topic relevance, no unsupported attribution, audience comprehension, incomplete coverage, wrong explanations, and provider outage behavior. Require a named qualified reviewer for educational approval; record disagreement and unavailable judgments.

### Coordination boundary

Backend agent owns tools, topic/lesson contracts, source mappings, Knowledge artifacts, and proposed model exports. Codex owns `poc/theme/**`, rendering, navigation, model routing, responsive checks, import/rollback, and end-to-end demonstrations. Do not edit frontend files. Preserve the six topic IDs and model ID above so the new evidence service can replace the initial search prompts without changing the journey.

Subagents are optional later. One guide plus bounded deterministic retrieval is enough for this release. If delegation is introduced, document actual inherited tools and model behavior; role labels alone do not create distinct specialist models.
