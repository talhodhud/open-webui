# Agent 2 — next implementation package

Read `round2_acceptance_review.md`, A2-01 through A2-07, and `round2_review_evidence_2026-10-06.json`. Keep the successful indexed ID query and known-family distinction.

## P0: make an edge inspectable and truthful

1. Replace the colliding occurrence IDs. Map the six-book source records to the existing `itqan:...` IDs using full source identity/hash. For broader sources, document a versioned namespace with collection/chapter/source-position/hash. Store occurrence, path, mention and edge IDs separately. One occurrence ID may have many edges, but must never identify different source records.
2. Preserve unresolved stages. Tests must prove `هشام بن عروة → رجل → عائشة` never becomes `هشام بن عروة → عائشة`, and an unresolved father remains a gap. Do not drop unnamed transmitters to improve reported precision.
3. Carry original-character offsets through normalization and path splitting. Return the full source or a resolvable stable source ID, exact supporting slice, hash/version, mention bounds, transmission phrase, path membership and transformation provenance. A `name -> name` label is not a text span.
4. Separate extracted mentions from resolved identities. Fixed alias/family tables need cited crosswalk evidence and review states. Unknown parents, ambiguous kunyas and abbreviated names remain candidates. Distinguish a source-supported transmission phrase from a biographically established identity.
5. Supply five corrected drawer fixtures: direct, father, unresolved relative, ambiguous identity and tahwil/partial path. Each must open the same source occurrence through the existing exact-record lookup. Include one intentionally unavailable assessment.

## P1: safe operation and honest coverage

- Replace table-drop-first rebuilds with staging → validation → atomic activation; retain old version. Test rollback on a disposable copy. Do not rebuild or patch the live database during acceptance work.
- Date intervals retain before/after/alternative/unknown semantics. Return unknown when the required dates are absent; no-conflict-detected is not proof of meeting. Tests must call the production logic in both query directions.
- Bound limits, validate book/direction, enforce book scope for link IDs, add stable cursor pagination and total/unresolved/conflict counts.
- Supply per-book source denominators and extraction/resolution/review counts. Explain the change from 547,579 to 455,592 rows. Neither fewer rows nor faster queries establishes higher accuracy.
- Benchmark the production query and full tool for declared cases: first-call and warm median/p95, sample count, versions and environment. Preserve the successful indexed plan.
- Give a rebuild diff manifest for the Amr/Umar corrections; retain original name/ID and evidence. Attach scholar/work/locator to each assessment instead of an unattributed combined grade.

Own builder, narrator tool, domain migrations and linkage tests. Coordinate the shared response schema with Agent 1; do not edit their topic material or Codex UI/review scripts. Prepare export/source/spec hashes and rollback, then hand over installation to Codex through supported Open WebUI mechanisms. Do not make further direct live SQL configuration changes.

Acceptance: no occurrence collisions across source records, no links across unresolved gaps, exact source slices for every accepted fixture, consistent identity/review states, and an atomic activation rehearsal. Correctness gates come before the narrator drawer is presented as verified evidence.
