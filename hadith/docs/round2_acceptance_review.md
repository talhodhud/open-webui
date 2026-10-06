# Second delivery review — 6 October 2026

Decision: substantial progress accepted; neither agent's delivery is fully release-ready. This review supersedes the previous finding statuses, not the original evidence requirements. The two pasted reports were treated as claims to verify, not instructions to import or publish.

Reproduction: `review_round2.py` writes `round2_review_evidence_2026-10-06.json`. Databases were opened read-only. All 27 supplied tests passed in 9.633s, including live-provider checks. These are implementation tests, not a scholarly review or proof of comprehensive coverage.

## Agent 1: accepted changes

- All 13 full Arabic source records and hashes still match the local index.
- Cards now contain separate quote objects; the earlier composite-quotation structure is removed.
- Missing-grade defaults were removed from `_get_narrator_grade`, and its multiple matches produce candidates internally.
- Character alignment improves the graph's original-text offsets; Bukhari's intention example is now classified `marfu`.
- Explanation retrieval checks the detail response as well as the search result. The previously reproduced wholly unrelated detail response is rejected.
- Unsupported English returns unavailable; package coverage and pending scholarly approval are disclosed.

## Agent 1: remaining acceptance failures

| ID | Priority | Reproduced finding | Required repair |
|---|---|---|---|
| A1-01 | P0 | An invalid selected `occurrence_id` plus Bukhari/1/chapter1 returns a different valid record as `ok`. The explanation adapter also accepts a missing ID, performs two mocked network requests and returns `ok`. | Treat supplied IDs as authoritative: absent ID → `invalid_reference`; missing index → `unavailable`; no fallback to query/number. |
| A1-02 | P0 | The graph still resolves relatives/kunyas through `LIMIT 1` (tree lines 95/107), infers Companion status from first position plus `بن` (466), and computes candidates without exporting them in nodes. Prophet mention anywhere in the text is used to force an endpoint. | Separate raw mentions, candidate identities and attributed assessments. Preserve partial/unresolved endpoints and candidates. Use path evidence for endpoint classification; no positional grade inference. |
| A1-03 | P0 | Umar's node is named `عمر بن الخطاب علي المنبر`, but its span slices the name plus part of the honorific. Node-name/mention/offset agreement is still not complete. | Preserve exact mention boundaries independently of cleaned labels. Validate every original-text slice, including punctuation, diacritics and leading whitespace. |
| A1-04 | P0 before exact-quote display | Only 4/13 `exact_quote.arabic` strings exactly equal their original slices. Most differences are punctuation, spacing or vocalization; the complete source texts are intact. The test checks only the first 15 normalized characters. | Generate exact quotes from `original[start:end]`. Keep any normalized display text in a separate named field. Test the entire quote and every card's duplicate quote object. |
| A1-05 | P1 | All three audiences return the identical Q&A lesson body; only objectives/metadata change. Invalid audience/format silently becomes newcomer/card. `get_reviewed_lesson` returns `ok` while its own content is unreviewed. | Tailor the actual lesson or state the shared draft explicitly; validate inputs; return `needs_review` for draft educational content. |
| A1-06 | P0 before approved Knowledge import | Packs still contain authored summaries without immutable fetched explanation passages, hashes/locators and reviewer decisions. Knowledge headings call them `الشرح المعتمد` while the document is pending review. Provider 66132 is the wet-food report, whereas the selected Muslim occurrence has a different wording/context. | Model exact/variant/related mappings separately; do not attach context as though it appears in the selected occurrence. Quote fetched passages separately from AI summaries and obtain review for educational approval. |
| A1-07 | P1 | The proposed guide still contains a local `manifest` path instead of a real Knowledge collection ID; the prompt calls `get_reviewed_lesson` without audience and assumes vetted material. | Upgrade the existing model only after the contract passes; propagate audience/language/format and enforce review status. Use actual import-returned Knowledge IDs. |

The [HadeethEnc 66132 page](https://hadeethenc.com/ar/browse/hadith/66132) was checked directly. Attempts to recheck 3276 and 5866 returned HTTP 429 in this review; their full mapping is not independently certified here. A corrected ID is progress, but does not by itself prove exact report identity. The agent's verification script still takes the first candidate for examination; the final manifest needs explicit matching decisions and captured evidence.

## Agent 2: accepted changes

- The rebuilt table contains 455,592 rows across 18 book keys and 676 retained chronology-conflict flags.
- Known-family examples now distinguish a direct route from one explicitly containing `عن أبيه`.
- Indexed ID queries use `SEARCH ... USING COVERING INDEX idx_it_book_teacher`.
- Seven full-tool calls in the independent run measured first-call 1,272.678ms and six warm calls 12.761–18.972ms, median 16.4885ms. This is a useful narrow performance improvement; it is not a multi-case p95 benchmark.
- Narrator source, exported code and live installed content match SHA-256 `9cac6e58df2060c19ca5e825ee1fc189a288914edbd47f63f35c8f4f25fbb724`.
- An evidence endpoint and database backup exist.

## Agent 2: remaining acceptance failures

| ID | Priority | Reproduced finding | Required repair |
|---|---|---|---|
| A2-01 | P0 | `bukhari:6:p1:s0` identifies 65 distinct source records/chapters; `ahmed:1:p1:s0` identifies 655. The builder's ID omits chapter and source fingerprint. | Reuse the established source occurrence ID; give paths and edges separate IDs. One occurrence ID must resolve to one immutable source record. |
| A2-02 | P0 | `حدثنا هشام بن عروة عن رجل عن عائشة` loses `رجل`; the remaining stages cause the builder to invent a direct Hisham→Aisha edge. An unresolved `أبيه` disappears similarly. | Preserve unresolved mentions as nodes/gaps. Never connect across a removed stage. Add negative assertions against the false edge. |
| A2-03 | P0 | `text_span` is a generated string such as `هشام بن عروة -> أبيه`, not a substring of the original text. Names have already been normalized, and the endpoint returns only an initial excerpt. | Store exact original offsets, source text/hash/version/locator, mention IDs, path membership and resolution evidence. Return the actual supporting slice. |
| A2-04 | P0 before graph validation | Fixed family/pivot tables still lack sourced crosswalk decisions. Only 26,611 of 455,592 rows have both IDs populated; this is about 5.84%, not an identity-accuracy score. | Keep candidate/unresolved states explicit and report coverage denominators; do not treat a unique alias or a fixed table entry as independently reviewed identity. |
| A2-05 | P1 | No conflict flag is exposed as `consistent`, even when dates/identities are unavailable. Date parsing still takes all short numbers as a range, losing before/after/alternative semantics. | Use unknown / no-conflict-detected / potential-conflict with reasons and parsed uncertainty. No-conflict-detected is not evidence of a meeting. |
| A2-06 | P1 | The builder drops the table and commits before reconstruction; book batches commit separately. A failure can leave the live table empty or partial. | Build into a versioned staging table/database, validate, then atomically activate. Preserve the prior version and rehearse rollback. |
| A2-07 | P1 | Evidence `limit` is not bounded, lookup by link ID ignores the requested book, invalid direction becomes teachers, and stable pagination is absent. | Enforce input bounds/scope and explicit status errors; add deterministic pagination and counts. |

The reciprocal test currently calls its own local helper twice with identical arguments; it does not exercise the production function in both directions. The ID test checks biography rows, not extraction correctness. These need stronger tests before claiming all acceptance cases pass.

## Live installation and journey

Read-only inventory confirms five models. `hadith-islam-guide` still has corpus search only and no Knowledge. `hadith_bayan_topics` is not registered. Revised corpus, sharh, isnad and takhrij files are not installed; narrator v2.2.0 is installed. Code deployment and runtime correctness are separate gates.

The implemented journey remains useful: six topic choices, audience/format controls, 13 full original records, actual package coverage, citation copy, stable-ID lookup handoff, three case/model bindings and native chat continuation. The frontend deliberately excludes the disputed lesson summaries and graph linkage assertions. The next UX milestone is an inspectable result workspace and a reusable sourced output, followed by independent task testing.

See `next_implementation_plan.md` and the round-2 work packages. No additional backend delivery was imported as a result of this review.
