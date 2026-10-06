# Agent 1 — P0/P1 review and next work

**Second delivery reviewed:** several repairs below are now accepted. Follow [round-2 tasks](agent_1_round2_tasks.md) and [current acceptance review](round2_acceptance_review.md); retain this document as the earlier review record.

Reviewed 6 October 2026. This supersedes the acceptance status claimed in `bayan_p1_delivery_report.md`; retain the prior handoff for architecture/context.

## Accepted progress

- Six topic definitions, 13 proposed source occurrences, six lesson/Knowledge drafts, three read-only topic methods, and native-shaped model exports exist.
- All 13 occurrence IDs resolve, their Arabic text matches the local search index byte-for-byte, and their SHA-256 hashes match. This verifies copying from the local dataset, not authenticity, topical suitability, or scholarly approval.
- The 11 P1 tests pass locally (0.018s in this run). The “24 cases” are assertions about the same six static packs, not 24 independent held-out evaluation tasks.
- The three model export shapes have been corrected to native arrays with base model, `meta.toolIds`, and native calling.

## Not accepted yet

1. **P0 core fixes remain outstanding.** The isnad tool still contains positive grade fallback, single-row identity selection, normalized-text offsets, and mixed-length endpoint detection described in `bayan_agent_next_handoff.md`. Explanation matching still accepts a two-word overlap and does not verify the fetched detail matn. Contract error branches remain inconsistent. File inspection confirms these earlier findings still apply; do not mark P0 closed.
2. **Wrong explanation mappings.** The faith pack links the branches-of-faith occurrence to HadeethEnc **3154**, whose actual entry is the Abu Sufyan/Heraclius report. The knowledge pack links `يسروا ولا تعسروا` to **3161**, whose entry concerns plague and patience. Verified pages: https://hadeethenc.com/ar/browse/hadith/3154 and https://hadeethenc.com/ar/browse/hadith/3161. Recheck every provider ID against the full returned matn; sequential-looking IDs are not evidence.
3. **Composite quotations.** Faith, fairness, and knowledge cards combine passages from different reports inside one `core_quote`. Replace this with an array of separately attributed exact excerpts, each carrying occurrence ID and original-text offsets. Ellipses must not imply that two reports are one quotation. Validate each excerpt against its own source.
4. **Approval is self-declared.** `reviewed_topic_evidence_v1`, `reviewed_taxonomy_v1`, `approved_knowledge_doc_v1`, and “academically reviewed” have no reviewer identity/date/decision record in the supplied artifacts. Change them to `draft`/`needs_review` until a qualified reviewer signs off. Keep AI checks, source-byte checks, and scholarly approval as separate fields.
5. **The tool contract overstates its behavior.** `claim_evidence` contains generic prose, not claim-to-passage mappings. `searched_collections` is hard-coded to all six, though the tool reads static packs rather than executing those searches. `language='en'` returns Arabic content as `ok`. There is no audience parameter for the lesson operation; the same drafted lesson is returned for all audiences. Return honest availability for unsupported language/format and expose actual pack selection coverage separately from search history.
6. **Knowledge is not installed.** A local `manifest` path in model metadata is not an Open WebUI Knowledge binding. Live inspection finds no Knowledge bound to `hadith-islam-guide`, and `hadith_bayan_topics` is not registered. Supply a manifest for import, then use the actual collection ID returned by Open WebUI. Do not call proposed JSON live deployment.

## Frontend integration completed by Codex

The six subject cards retain stable IDs. Their preview now includes the 13 source-matched candidates, actual package coverage by collection, expandable original texts, copy with source, and an exact-record handoff through `hadith-phrase-poc` with `submit=false`. The UI labels educational selection and explanation as pending scholarly review. It does not display your unverified judgments, HadeethEnc summaries, or approval labels.

The live dedicated guide **already exists**: `hadith-islam-guide`, name **بيان السُّنّة — دليل المعرّف بالإسلام**, base `gpt-5.4-mini`, native calling, currently corpus-search only. Upgrade this model when accepted; do not create a duplicate. The existing three user models and their working case bindings stay intact.

## Next delivery order

### P0-A: exact evidence and safe adapters

Fix the outstanding isnad/identity/span/endpoint/explanation defects first, coordinated with Agent 2 for narrator linkage. Add offline mocked adversarial tests and separate live-provider smoke tests. Return invalid references as invalid; do not fall back to a different record. Verify embedded Python, source Python, and tool specs together. Provide an import candidate and rollback manifest, without direct writes to live `webui.db`.

### P0-B: repair the 13 mappings and all quotations

For every occurrence, supply `provider_id`, fetched original provider matn, matching rationale, exact explanation passage ID, source URL, source/version/hash, mapping status, and reviewer decision. Keep distinct wording variants explicit. Replace general “متفق عليه”/consensus labels with attributed judgment records and their exact scope/locator. Remove unsupported summaries until matched. Repair Knowledge drafts from the corrected structured records.

### P1-A: implement an enforceable lesson contract

Required fields: `topic_id`, `lesson_id`, `audience`, `language`, `format`, `learning_objective`, `quotes[]`, `explanatory_passages[]`, `claim_evidence[]`, `occurrence_ids`, `review_status`, `reviewer`, `coverage`, `limitations`. Each quote is tied to exactly one occurrence; each paraphrase states its supporting passage(s). Evidence and lesson operations must never infer approval from a file's presence. A `get_reviewed_lesson` call must withhold unreviewed lesson content or explicitly return `needs_review`.

### P1-B: upgrade the existing Tareef guide

Prepare one revised native export for `hadith-islam-guide` with:

- Native calling and the current base model unless measured evidence supports changing it.
- Primary `hadith_bayan_topics` after its contract passes; exact occurrence retrieval through the corrected corpus adapter or existing `hadith_phrase_poc`; matched explanation retrieval only after P0 acceptance. No narrator grading or graph construction in this introductory model.
- Actual Knowledge collection IDs after import, with only approved explanatory passages. Never treat unreviewed family reports as approved RAG sources.
- System instructions to establish audience/format, choose a topic, retrieve the accepted pack, retain occurrence/passage IDs, separate quotations from commentary/pedagogical prose, state coverage, respect unavailable states, avoid personal fatwa, and produce a short answer followed by one useful next step.
- First-answer budget: one topic-pack lookup plus exact-source/approved-commentary lookups as needed; no automatic calls to every tool and no automatic subagents.
- Resource manifest and evaluation results for newcomer/new-Muslim/educator audiences and card/Q&A/two-minute outputs. Unsupported languages remain visibly unavailable; translations require provenance.

### P1-C: meaningful evaluation and delivery

Use 24 distinct held-out tasks (minimum two positive and two difficult tasks per topic). Include wrong explanation IDs, mismatched quote/occurrence, composite quotes, invalid topic/format/language, provider outage, missing scholarly review, incidental word matches, and partial collection coverage. Measure exact citation resolution and task completion; add reviewer-backed relevance and comprehension checks. Do not count substring assertions over training/demo packs as held-out evaluation.

Deliver corrected artifacts, tests, immutable evidence captures, and a concise acceptance table. Codex then imports accepted artifacts through supported Open WebUI mechanisms, wires the richer responses, and runs the user journeys. Leave `poc/theme/**` to Codex.

Evidence: `p1_linkage_review_evidence_2026-10-06.json`, `runtime_inventory_2026-10-06.json`, `backend_delivery_review_evidence.json`.
