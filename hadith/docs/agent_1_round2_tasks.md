# Agent 1 — next implementation package

Read `round2_acceptance_review.md`, especially A1-01 through A1-07, and `round2_review_evidence_2026-10-06.json`. Preserve the fixes already accepted. This is a focused completion pass, not another complete rewrite.

## First: close P0 with reproducible counterexamples

1. Reject invalid occurrence IDs without alternative lookup in corpus/tree/explanation operations. Missing local storage is unavailable, not permission to choose a different source. Add mocked tests proving zero provider calls for an invalid selected ID.
2. In `hadith_isnad_tree_tool.py`, remove positional Companion inference and arbitrary relative/kunya selection; export candidate arrays. Work with Agent 2's evidence schema, but do not edit their builder or narrator tool. If full parsing is unsupported, return a partial graph. Test a mursal report, a non-Prophetic endpoint and a Prophet mention inside matn that does not establish the current path's endpoint.
3. Correct original mention bounds; exact source spans must explain their displayed mention. Keep raw mention, display label, identity candidate and scholar assessment separate.
4. Regenerate all 13 exact excerpts directly from source slices; update card quotes and Knowledge. Test full equality, not a prefix or normalized subset. Do not rewrite imported full text.
5. Freeze full provider responses with ID, matn, explanation passage, source URL, retrieval time and hashes. Supply each occurrence's mapping as exact / reviewed variant / related candidate / unavailable. Related reports may be useful but cannot lend their narrative context to an unmatching occurrence. Review all 13, including the Muslim `من غشنا` versus HadeethEnc 66132 variant. Keep explanatory summaries clearly authored/draft until reviewed.

## Then: finish the Tareef contract

- `get_reviewed_lesson` returns `needs_review` for drafts. Include audience, language, format, exact quotes, claim-to-passage mappings, limitations and reviewer decision. Invalid audience/format must return an explicit supported error state, not silently switch.
- Make the actual output appropriate to newcomer, new Muslim and educator; objectives alone are not sufficient. Prioritize one topic in all three formats, then apply the same contract to six topics.
- Expose approved and draft resources distinctly. Replace contradictory `الشرح المعتمد` headings on unreviewed authored summaries.
- Upgrade **existing** `hadith-islam-guide`; do not create another model. Its prompt must pass audience/language/format, respect review status, retrieve before quoting, retain exact source IDs, and offer one useful next action. Keep the current base model and native calling unless measured evidence justifies change.
- Prepare Knowledge documents and hashes, but leave `meta.knowledge` empty until the importer supplies actual collection IDs. Use approved explanatory material for the public guide. A file path is not a binding.
- Preserve `hadith-model-1`, `hadith-modular-agent`, `hadith-rijal-agent` and their demonstrated case bindings. Do not import all four replacement model exports wholesale.

## Delivery and ownership

Own topic/lesson/provider/contract code, `hadith_isnad_tree_tool.py`, corresponding tests and exports. Agent 2 owns narrator linkage. Codex owns `poc/theme/**` and installation. Provide a release manifest with exact files/hashes, offline tests, separate live checks, known limits, and rollback material. Do not edit Codex's independent review scripts or evidence files to make a report pass. Do not write directly to live `webui.db`.

Acceptance: A1-01–07 reproduced checks pass; no quote or mapping is described more strongly than its evidence supports. A human scholarly decision remains external to automated tests.
