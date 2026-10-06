# Hadith: prioritized execution plan

Reviewed 6 October 2026. This plan supersedes the execution order, not the product vision, in `hadith_product_blueprint.md`.

**Latest — second delivery review:** use [next implementation plan](next_implementation_plan.md) and [round-2 acceptance review](round2_acceptance_review.md). All 27 supplied tests pass; independent probes still expose invalid-ID fallback, colliding linkage IDs and links across omitted unknown narrators. Earlier P0 findings are partly repaired; the round-2 assignments identify the remaining work. A new independent QA agent is recommended, not yet launched.

## Current acceptance and next work — 6 October

The journey now has three explicitly routed demonstrations and six introductory topics, audience/format selection, and expandable evidence for 13 exact source-matched occurrences. Users can copy a citation or prepare an exact-record lookup without sending it. The dedicated `hadith-islam-guide` is installed with bounded corpus retrieval; it is not yet connected to reviewed lessons or Knowledge. The original interface and أثر ١ remain available.

| Priority | Owner | Next acceptance gate |
|---|---|---|
| P0 | Agent 1 | Correct explanation matching, quote boundaries, isnad grades/offsets/endpoints and response-contract failures. Seven original passing tests do not close these reproduced defects. |
| P0 | Agent 2 | Preserve occurrence evidence for identities/family links; replace silent asymmetric date rejection with sourced diagnostics; add stable occurrence/path/span provenance. |
| P1 | Agent 1 | Repair the six topic packs and 13 mappings; obtain explicit scholarly review; provide real Knowledge bindings and upgrade the existing guide ID. Eleven passing static-pack tests are not a held-out evaluation. |
| P1 | Agent 2 | Make name corrections rebuild-safe, benchmark the actual tool query, and supply per-book coverage and attributed assessments. |
| Integration | Codex | Import accepted releases through supported mechanisms, add matched explanations and traceable narrator-edge views, then rerun end-to-end journeys. Current UI uses exact source text only from the new P1 packs. |

Separate assignments: [Agent 1 P0/P1 review and next work](agent_1_p0_p1_review_and_next.md) and [Agent 2 linkage review and next work](agent_2_narrator_linkage_review_and_next.md). These are prepared handoffs, not messages sent to external agents. Read-only live snapshot: `runtime_inventory_2026-10-06.json`. Findings and measurements: `p1_linkage_review_evidence_2026-10-06.json`. Earlier snapshots and proposals below are retained as historical context; this table takes precedence.

## Decision

**Later update, 5 October — current execution order:** preserve the three tested user presets. Their demonstration buttons now select specific models. أثر ٢ is branded **بيان السُّنّة** and includes the new subject track/model `hadith-islam-guide`. Explicit V2 selection is remembered per tab session. The new guide was added separately; the inventory and findings below describe the earlier baseline.

1. Finish frontend routing, audience/format choices, and native chat demonstrations (Codex).
2. Correct newly reproduced backend defects before tool replacement (backend agent). Seven original tests pass, but additional evidence cases fail; see [review and acceptance cases](bayan_agent_next_handoff.md).
3. Curate six introductory topic packs with exact evidence and approved commentary; prepare the Knowledge manifest and topic tool (backend agent).
4. Import accepted tools/lesson contracts, connect source/coverage cards, and verify learner/specialist journeys (Codex).
5. Scholarly review, held-out evaluation, reproducible demo and delivery; MCP/delegation follows only if it adds measured value.

The current handoff supersedes the earlier recommendation to repurpose `hadith-model-1` and `hadith-modular-agent`.

Freeze the three interface experiments for now. Use **أثر ٢ · المحادثة** as the proposed primary chat experience, retain **أثر ١ · رحلة المعرفة** for guided discovery and evidence exploration, and keep the original Open WebUI as the fallback and comparison baseline.

The next deliverable is one complete, source-traceable journey: **remembered words → select the exact occurrence → inspect the source → compare supported variants → inspect a sourced explanation → view supported paths and narrator evidence → copy with citations**. Ship the verified steps progressively. Broad search and a smaller reviewed graph set must have separate coverage labels.

Successful tool calling is established at the configuration level, and representative live chats have exercised it. It does not yet establish record identity, quotation fidelity, complete graph paths, or scholarly correctness. This review is configuration/code inspection, not a new evaluation of all four models.

## What is actually present

Read-only inventory: `runtime_inventory_2026-10-05.json`, extracted from the running pip installation's database, excluding users, credentials, chat content, and valve values. The empty workspace `webui.db` is not the live database.

| Preset ID | Current role/configuration | Recommended role |
|---|---|---|
| `hadith-phrase-poc` | Phrase search + exact-record selection; only `hadith_phrase_poc` attached | Preserve as the focused regression baseline; reuse its occurrence-ID discipline |
| `hadith-model-1` | Name: مُحَقِّق السُّنَّة — خبير التخريج وشبكات الأسانيد; corpus, takhrij, sharh/vocabulary, narrator tools | Repurpose as the public **تعلّم وافهم** preset after prompt review |
| `hadith-modular-agent` | Currently identical name, system prompt, base model, and tool attachments to `hadith-model-1` | Repurpose as public **ابحث وقارن**, coordinating the research journey |
| `hadith-rijal-agent` | Name: ناقد الأسانيد وخبير الرجال والعلل; narrator, isnad, takhrij, corpus tools | Keep as the focused research specialist; do not present its judgments as independent validation |

All four use `gpt-5.4-mini` and `function_calling: native`. All four have `builtin_tools: false`; their stored Knowledge bindings are empty/null. Seven Hadith tool packages are registered, including the older unified `hadith_engine`, which is not attached to these four presets in this snapshot.

These are four configured presets sharing one base model. They are not yet four automatically coordinated agents. No Hadith MCP integration was demonstrated in this inspection; the verified attachments are local Python tool IDs. Global MCP settings were not inspected.

The current audience tiles in أثر ٢ change suggestion cards. They do **not** yet switch model policy, select a specialist automatically, or carry structured selected-record state across tools. That integration is the next UI task.

Interface status:

- Original: native chat remains available and default on a normal refresh.
- أثر ١: working real corpus search and selection, two-record display, bounded source-transcribed chain example, narrator evidence, session notebook, citation copy.
- أثر ٢: native chat with learner/researcher tiles, six editable prompt cards, right violet sidebar, three-way view selector, and matching sign-in styling; desktop and phone checked.

## P0: fix evidence correctness and deployment consistency first

| Finding | Evidence in inspected implementation | Required acceptance condition |
|---|---|---|
| Missing narrator grades can become a positive grade | `tools/hadith_narrator_tool.py:196` and `:623` fall back to `ثقة ثبت`; `:227–228` can reuse that value as Ibn Hajar/Dhahabi ranks | Missing assessments remain unavailable; each named scholar's rank comes from that scholar's own sourced record |
| Exact selection can be lost | `tools/hadith_corpus_search_tool.py:141–146` still chooses `LIMIT 1` for `(hadith_id OR id_in_book)`, even though numbering can repeat | Downstream operations take stable occurrence IDs; ambiguous display-number requests return candidates, never an arbitrary first record |
| Code and exposed signatures disagree | Stored `get_hadith_by_number` spec lacks `chapter`, although code and prompts use it | Exported/registered specs match callable signatures; a real tool-call test passes the discriminator |
| Explanation matching is implicit | `tools/hadith_sharh_vocab_tool.py:81` selects `hadeeths[0]` | Explicit selected-occurrence ↔ HadeethEnc mapping, or user/reviewer candidate selection; no silent first-result substitution |
| Source and installed tree revisions differ | Live `hadith_isnad_tree` content hash differs from its workspace file | Preserve both, explain the diff, choose a reviewed revision, and verify installed hash/specs after import |
| Prompts demand completeness even without evidence | Current research prompts require fully connected paths, resolved names, and categorical chapter names | Permit partial paths, ambiguous identities, unavailable metadata, and non-Prophetic endpoints when source evidence requires them |
| Broad retrieval does not prove six-book coverage | Current modular search uses substring filtering plus a capped `LIMIT`, without relevance ordering or a six-book allowlist for `all` | Explicit six-book scope, ranked results, pagination/coverage, and honest “not found in indexed source” wording |

The chapter argument is a useful partial improvement, but it does not replace edition-aware IDs. The focused POC already preserves original records with stable occurrence IDs; reuse that work instead of creating another incompatible ID scheme.

The grade fallbacks are concrete code findings, not an assertion that every returned biography is wrong. The prompt rules are risk factors, not proof that every generated chain is wrong. A release evaluation must establish the actual error rate.

## Ordered milestones and ownership

| Order | Deliverable | My work (Codex) | Your AI agent's work | Done when |
|---|---|---|---|---|
| 1 — now | Shared evidence contract and corrected tools | Define IDs, rendering contract, missing-data states, and UI fixtures | Remove fabricated defaults, correct lookup/mapping behavior, reconcile installed tool/schema versions, add regression tests | Search result → exact open returns the same source text; missing grades stay missing; ambiguous lookup stays ambiguous |
| 2 — next | Complete learner journey | Connect a selected occurrence to source and explanation views in أثر ٢; add citation copy and clear loading/error states | Return source-backed Arabic explanation and English translation only for matched records | User finds, selects, understands, and copies one supported Hadith without losing its identity |
| 3 — next | Specialist journey for a declared small set | Six-book coverage panel, actual word-difference view, route selection, narrator drawer, deterministic Mermaid rendering | Prepare occurrence-specific paths, quoted source spans, narrator candidates, and distinct attributed assessments | Every displayed edge and assessment has a traceable supporting source; unsupported cases visibly stop at available evidence |
| 4 — before release | Two public presets with meaningful roles | Bind learner/researcher entry points to reviewed preset configurations; preserve selection when handing off; import verified exports | Export distinct prompts/tool permissions and model JSON; keep specialist scope explicit | Toggling audience changes the intended behavior, not just labels; simple search does not trigger every tool |
| 5 — before release | Evaluation and judge-ready delivery | Run end-to-end UI tasks, record latency/errors, prepare demo and deployment documentation, integrate release package | Run backend/source tests, provide reviewed fixtures, licenses/source register, setup commands and provider fallbacks | Another person can reproduce supported cases from a clean setup/live deployment |
| 6 — after a working baseline | MCP and measured delegation | Integrate one Hadith service and compare coordination quality/cost | Expose existing validated operations via Streamable HTTP without changing their contract | Identical results over local adapter and MCP; delegation adds measured benefit |

Start the reviewed graph set with **three report families**, then expand toward the blueprint's suggested ten only if review and time permit. This is a proposed target, not completed coverage. Pick families from source-supported records: one straightforward route, one multi-book wording comparison, and one case with meaningful ambiguity/chain switching. A qualified reviewer must confirm the evidence; either AI agent can prepare the material but neither should label its own work a completed scholarly review.

The supplied guide's schedule places development on 4–6 October and submission on 6 October at 23:59 Saudi time. This plan uses that supplied schedule; later organizer changes were not checked in this update. Prioritize milestones 1–3 on 5 October and evaluation/deployment/demo on 6 October. If review capacity is smaller, reduce reviewed coverage and state the limit.

## Shared contract, version 1 (to implement next)

One response envelope:

`schema_version`, `status`, `data`, `evidence`, `coverage`, `warnings`, `dataset_version`, `retrieved_at`.

Statuses: `ok`, `no_match`, `ambiguous`, `unavailable`, `invalid_reference`, `needs_review`.

Core rules:

- `occurrence_id` identifies the exact immutable imported source occurrence, not a universal Hadith number. Display numbers include an edition/numbering scheme.
- A `family_id` relates reviewed variants; topical or lexical similarity alone does not establish that relation.
- Every explanation mapping records its source ID, selected occurrence(s), matching basis, and review state.
- Every assessment has its own scholar, work, quotation, locator, target scope, and evidence ID. Missing Ibn Hajar data cannot inherit a different scholar's grade.
- Every graph edge has occurrence/path membership and a supporting text span. Paths may be partial. Mention identity may remain unresolved.
- Six-book coverage distinguishes found, not found in searched/indexed data, not indexed, and unavailable; a capped search does not establish absence.
- Keep imported text immutable; provider caches and normalized search fields are separate derived data.

The browser should render trusted components from this JSON. It should not depend on a model inventing HTML or reconstructing graphs from prose. Model prose can explain the package, but exact quotations, citations, and Mermaid should be rendered deterministically.

## Agents, MCP, and Knowledge

Use one coordinator per conversation. Call deterministic tools directly for simple requests. Keep the rijal preset for an explicit specialist task; do not run all four presets on every question.

Open WebUI's native `delegate_task` inherits the parent model/tools and does not automatically select another Workspace preset. Different-preset delegation would need explicit orchestration. External MCP/OpenAPI tools are inherited by foreground subagents, not background subagents. Source: [Open WebUI subagent documentation](https://docs.openwebui.com/features/chat-conversations/chat-features/subagents/), checked 5 October.

After evidence contracts pass, expose one Hadith MCP service with search, exact record, variants, paths, narrator, explanation, and source-passage operations. Reuse existing Python adapters during migration. Transport work must not delay the first reliable user journey.

Knowledge should contain curated explanations, terminology, and source-method notes with work/edition/locator metadata. The agent can prepare a small approved set now. Exact Hadith texts, narrator identities, and paths stay in structured records. Do not upload the whole narrator graph as documents and expect retrieval to reconstruct it.

## Working boundaries

- I own `poc/theme/**`, user journey state, UI renderers, contract coordination, integration checks, and final import/deployment coordination.
- Your AI agent owns `tools/**`, source/provider adapters, data corrections, model export files, and backend regression fixtures.
- Preserve `poc/phrase_search/**` as the reference implementation; agree on changes at the contract boundary.
- One installer/configuration owner applies verified releases. Avoid both agents editing the live Open WebUI database or the same files concurrently. Prefer supported import/update APIs over direct SQL configuration updates, so schemas and runtime caches stay aligned.
- You choose the presentation route and arrange source review. We prepare the reviewable outputs and handoffs.

## Immediate next work package

My next implementation: **selected-Hadith evidence panel in أثر ٢**, beginning with stable ID, exact source, and citation copy; add explanation and specialist views as validated endpoints arrive.

Your AI agent's next implementation: **evidence-correctness pass on the existing tools**, with no new UI or bulk data rebuild. The ready-to-send task is `ai_agent_backend_handoff.md`. This file is a proposed assignment; no other agent was contacted or started by this review.
