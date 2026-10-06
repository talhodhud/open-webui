# Agent 2 — Narrator linkage review and next work

**Second delivery reviewed:** indexed queries and other repairs below are now accepted. Follow [round-2 tasks](agent_2_round2_tasks.md) and [current acceptance review](round2_acceptance_review.md); retain this document as the earlier review record.

Reviewed 6 October 2026. Scope: inspect `hadith_narrator_tool.py` v2.1.0, its exported/live code, materialized links and the reported five improvements. No domain database or live application rows were modified during this review.

## Confirmed

- The stop-word list, fixed family-hop table, chronological filters and expanded book alias map are present.
- `isnad_transmissions` contains **547,579 rows across 18 nonempty book keys**. This confirms stored rows, not complete or correct transmission coverage. Some collections contain very few rows; a per-source denominator is needed.
- The claimed composite book/teacher and book/student indexes exist. Several equivalent duplicate indexes also exist.
- Live narrator code equals the JSON export content. Workspace content differs only in the header **version 2.1.0 versus 2.0.0**; functional code matches in this snapshot, but the claimed exact byte/hash synchronization is false.

## Findings and priorities

### P0: family substitutions require occurrence evidence

`UNIVERSAL_FAMILY_HOPS` is a fixed dictionary of narrator IDs. For several entries it replaces any retrieved relation with a father ID unless a narrow exception applies. This is not an occurrence-level parse of `عن أبيه/جده/عمته`, and can turn direct links into inferred intermediaries. The aunt case is also stored under `target_father`, losing the relationship type. Preserve the observed raw mention and resolved candidates separately. Apply a family resolution only when that occurrence/path and exact phrase support it, with a sourced parent/relative crosswalk. Never change all relations of a narrator because some known route uses a relative.

### P0: chronology is a review signal, not an automatic impossibility proof

Differences between two death dates do not by themselves establish whether lifetimes overlap or a meeting occurred. The current 95/50 cutoffs silently discard edges without preserving rejection evidence. The implementation is also asymmetric: a student death 140 and teacher death 60 passes the `students` direction (difference 80), but is removed in the reverse `teachers` direction because the same sign checks are reused. Add a reciprocal-edge test using that synthetic pair. Parse uncertain/range/alternative dates as structured data, not `max(re.findall(...))`. Use explicit birth/death intervals and source evidence; record potential chronological conflict as a flag requiring review. Keep absent/uncertain dates unknown.

### P0: no “zero ghosts” claim without a labeled evaluation

The stop-word exclusion is useful, but name fallback still contains hard-coded pivots, alias/substring matching and special replacement IDs. A unique alias in this index is not proof of identity. Preserve candidate sets and unresolved mentions; report precision, unresolved rate, coverage, and false positive counts against a held-out labeled set. Stop-word handling alone cannot justify a corpus-wide zero-error claim. Do not silently discard difficult cases from the denominator.

### P0: edge provenance is missing

Current table fields are `id, book, hadith_id, step, student_name, student_id, teacher_name, teacher_id`. They do not provide a stable occurrence ID, chapter discriminator, path ID, original-text hash/span, resolution rule or review decision. Returned strongest links have names and counts but no inspectable supporting occurrences. This prevents trustworthy per-edge source views and may collapse chapter-local repeated numbers. Add a non-destructive, versioned evidence table/migration with these fields. Distinguish raw extracted, identity-candidate, identity-resolved and reviewed edges. Every transformation must retain the raw evidence.

### P1: reproduce performance on the query actually used

`EXPLAIN QUERY PLAN` for the tool's `LOWER(book)=? AND (teacher_id=? OR teacher_name LIKE ?)` returns **SCAN isnad_transmissions**. Cold/warm full tool calls for Abu Hurayrah in Bukhari measured **1.6218s / 0.3151s**, including resolution/serialization; these are single measurements, not a benchmark distribution. The sub-50ms claim is not reproduced for this path.

Canonicalize the book before storage/query and query `book=? AND teacher_id=?` (or student ID) first. Keep uncertain name matching in a separate bounded candidate search, rather than OR-ing a wildcard into the verified-ID query. Deduplicate indexes only through a reviewed migration. Report SQL-only and full-tool cold/warm median/p95 over declared cases, row counts, plans, environment and versions.

### P1: make corrections rebuild-safe and auditable

`scratch_fix_amr_id.py` directly patches matching names to ID 368. No before/after row manifest proving **1,463 corrected occurrences** was supplied. A current row count cannot establish that historical change. Provide the exact changed row/occurrence IDs, before/after values, rule, evidence, backup and rollback. Apply the rule inside the reproducible builder and test a clean rebuild so ad hoc fixes are not lost. Protect both عبد الله بن عمر and عبد الله بن عمرو, including ambiguous abbreviated forms, with explicit positive and negative cases.

### P1: books and assessments

Keep the product's six-book scope distinct from this broader 18-key research corpus. Book aliases establish routing, not content coverage. Add per-book source record counts, extracted paths/edges, unresolved/excluded counts, and reviewed counts. Reject unknown direction/book values explicitly. A combined `grade` selected from Ibn Hajar else Dhahabi must carry the actual scholar/work/source; never present it as a neutral universal grade. Coordinate the assessment schema with Agent 1.

## Next delivery, in order

1. Freeze and hash the current DB/source/export snapshots; supply backup/rollback and migration manifest. Do not perform more direct live SQL edits for tool installation.
2. Implement evidence-backed identity/family resolution and symmetric chronology diagnostics; add tests for direct versus family routes, ambiguous pronouns, multiple candidates, repeated local numbers, `ح` switches, partial chains, uncertain dates and reciprocal edges.
3. Add stable occurrence/path/span provenance and expose `get_narrator_link_evidence` plus a bounded/paginated network response with source IDs, rejected/ambiguous counts and assessment attribution.
4. Correct the query plan, benchmark it, and prove corrected-name rules survive a clean rebuild.
5. Supply source/export/spec hashes, a functional deployment comparison, and the reviewed UI fixtures. Preserve model IDs and existing chats. Codex will integrate a narrator drawer only when a selected edge can show its actual occurrence evidence.

Ownership: you own linkage extraction/resolution, graph evidence, domain migrations and performance. Agent 1 owns topic/lesson/Knowledge and shared contract coordination. Codex owns `poc/theme/**`, presentation, routing and supported import. Do not label your own generated data scholarly-approved.

Reproduction: run `planning/review_p1_linkage.py`; results are in `planning/p1_linkage_review_evidence_2026-10-06.json`. Live installation facts: `planning/runtime_inventory_2026-10-06.json`.
