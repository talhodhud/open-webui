# Backend task for the existing Hadith AI agent

Work in `C:\Users\mhdal\OneDrive\AI\Hadith KSA`. Read `planning/prioritized_execution_plan.md` and `planning/runtime_inventory_2026-10-05.json` first. Preserve the three interfaces and existing user chats. Codex owns the frontend and integration; you own the domain tools and evidence quality.

## Objective

Make the existing tools preserve exact record identity and source attribution throughout search → selection → explanation → comparison → isnad/narrator lookup. Keep native tool calling working. Deliver code, compatible model/tool exports, sample JSON, and meaningful regression tests.

## First batch: release blockers

1. Remove positive-grade defaults from `tools/hadith_narrator_tool.py`, including `ثقة ثبت` fallbacks at current lines 196 and 623. Missing grade means unavailable. Keep Ibn Hajar and Dhahabi assessments separate; never fill one scholar's missing value with another scholar's grade. Each statement needs a source locator. Reconcile narrator IDs across datasets explicitly instead of assuming matching integer IDs establish identity.
2. Make exact record lookup use stable occurrence IDs compatible with `poc/phrase_search/engine.py`. Keep original imported text immutable. Numeric lookup is a disambiguation operation: require an edition/scheme and return candidates when ambiguous. Remove `LIMIT 1` selection of uncertain candidates. Keep CDN/provider caches separate from imported data.
3. Reconcile signatures, stored tool specs, and model prompts. In the current export, `get_hadith_by_number` code accepts `chapter` but its stored spec does not. Prefer supported Open WebUI import/update paths and verify the effective registered signature after deployment.
4. Preserve and compare both revisions of the isnad tool: installed `hadith_isnad_tree` differs from `tools/hadith_isnad_tree_tool.py`. Do not overwrite either before understanding the difference. Export the reviewed revision and its hash.
5. Replace HadeethEnc first-result selection with explicit selected-occurrence mapping or candidate selection. Return provider ID, source URL, original text, matching basis, language availability, and review state. Unmatched explanation must stay unavailable.
6. Correct prompt requirements that force a completed chain, resolved identity, positive grade, or exact chapter label without sufficient evidence. Permit incomplete paths, non-Prophetic endpoints, unknown fields, and ambiguity. Keep the roles of tool retrieval, source support, and scholarly review separate.

## Response contract

Use `schema_version: "1"`, `status`, `data`, `evidence`, `coverage`, `warnings`, `dataset_version`, `retrieved_at`.

Allowed statuses: `ok`, `no_match`, `ambiguous`, `unavailable`, `invalid_reference`, `needs_review`.

Every operation after selection accepts or returns the same `occurrence_id`. Source records carry provider, edition/numbering scheme when known, collection, chapter, original locator, text, and version. Unknown metadata remains explicitly unknown. Assessment records carry scholar, work, exact quotation, locator, target scope, and evidence ID. Graphs return JSON paths/nodes/edges with occurrence membership and source spans, not just Mermaid.

Provide small JSON fixtures for: successful search/open, ambiguous numeric lookup, missing grade, matched explanation, explanation unavailable, provider failure, and a partial graph. Codex will use these in the UI, then connect the real operations.

## Second batch: bounded specialist coverage

- Enforce the advertised six-book search scope. Add relevance ordering, honest coverage states, and pagination rather than interpreting the first 20 SQL rows as complete coverage.
- Distinguish exact duplicates, candidate same-report variants, reviewed family relations, and topical similarity.
- Prepare three source-traceable report families for external scholarly review. Preserve all ordered paths, chain switches, unresolved narrator mentions, and evidence spans. Do not claim all six collections contain every family.
- Supply source-backed narrator facts and separate attributed statements for the chosen graph nodes. Do not infer a chain from an aggregate teacher/student network.
- Keep the focused phrase POC working as a regression baseline.

## Required regression checks

- A remembered-phrase result opens the same Arabic text by stable ID, including repeated-number cases.
- Unknown grade stays unknown; missing Ibn Hajar/Dhahabi values are not imputed.
- Two plausible narrator identities remain two candidates unless a sourced crosswalk resolves them.
- An unrelated first HadeethEnc search result is not attached to the selected Hadith.
- Every graph edge resolves to an occurrence/path and supporting source span; partial evidence yields a partial graph.
- A provider error returns `unavailable`, and no hit returns `no_match`; neither means fabricated/weak Hadith.
- Native registered tool arguments match the exported callable signatures.

## Deliverables and change boundaries

Return: changed file list; tests/results; sample JSON fixtures; source/licensing notes; tool/model exports; remaining uncertainties; installed-versus-source hash comparison. Do not silently execute a bulk rebuild or publish data. Preserve source data and backup before migrations. Do not change `poc/theme/**` or run existing scripts that overwrite every model's system prompt. Prepare distinct proposed exports for learner, research coordinator, and rijal specialist; Codex will coordinate a single reviewed import.

Do not spend this batch on new themes, additional model presets, broad subagent orchestration, or a transport rewrite. MCP can wrap the validated contract afterward.
