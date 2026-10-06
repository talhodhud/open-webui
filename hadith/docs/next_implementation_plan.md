# Next project implementation plan — 6 October 2026

## Decision and scope

Keep **بيان السُّنّة — الحديث النبوي للمعرّفين بالإسلام** and make أثر ٢ the primary demonstration journey. Preserve the original and أثر ١. No fourth theme, duplicate Tareef model or further corpus expansion in this release.

The interface direction is satisfactory for a POC. The complete journey is not yet accepted: sources can be inspected, but approved explanations, tailored lesson outputs, validated edge evidence and reusable final output are not consistently connected. Passing 27 implementation tests does not close those gaps. See `round2_acceptance_review.md` for measured acceptance status.

## User outcomes we will complete

| Journey | Ordered interaction | Success condition |
|---|---|---|
| Introduce Islam | Choose topic → audience → format → inspect exact evidence → request a concise draft → inspect supported explanation → copy/export sourced material | Audience changes the actual output; quotations remain exact; every claim is linked or marked draft; review state survives export. |
| Understand a Hadith | Enter remembered words in native composer → disambiguate → select exact occurrence → read source and matched explanation → ask follow-up → copy citation | Selected identity persists; invalid references stop; unavailable commentary is clear and does not imply weakness. |
| Specialist research | Open one of the three bound cases → inspect actual collection coverage → choose occurrence/path → inspect narrator/edge evidence → export supported Mermaid/table | Every accepted edge resolves to an exact source slice; candidates/gaps stay visible; no unsupported grades or completeness claims. |

Research graph coverage begins with one accepted route/family, then the three planned families. Broad search coverage and reviewed graph coverage remain separate. Native chat continues to supply the conversational loop.

## Parallel work and ownership

| Owner | Work now | Deliverable / next dependency |
|---|---|---|
| Agent 1 — evidence and learning | Close A1 P0; exact quotes and provider mappings; honest lesson status; actual audience tailoring; model/Knowledge candidate | Follow `agent_1_round2_tasks.md`; deliver an immutable release candidate. |
| Agent 2 — narrator linkage | Close ID collisions and skipped-stage links; exact spans and candidate identities; staging migration and bounded evidence endpoint | Follow `agent_2_round2_tasks.md`; deliver accepted drawer/graph fixtures. |
| Codex — UX and integration | Retain current topic/source preview; build a common result view, preserved selected evidence, source/explanation panels, and sourced output export; verify three case/model routes | Integrate only accepted tool versions. Original interface and native drafts stay available. |
| Optional Agent 3 — independent QA | Freeze evaluation tasks, reproduce round-2 counterexamples, test delivered APIs and user tasks independently | Follow `agent_3_independent_qa_tasks.md`; useful now if another agent is available. |
| Human source reviewer | Confirm selected reports, explanation mappings, attributed judgments and teaching suitability | Explicit reviewer/date/decision; required for an approved educational label. |
| Optional Agent 4 — release/demo | After the candidate scope is fixed, prepare reproducible setup, license/source register, demo script and submission checklist | Follow `agent_4_release_tasks.md`; work only on release/docs, with no live deployment or source-code edits. |

Recommended staffing: the existing two backend agents plus Codex, with one additional independent QA agent. A release agent is useful after the candidate stabilizes. Adding more implementation agents now risks overlapping edits. No extra agents have been launched by this plan.

## Ordered implementation gates

1. **Freeze and correctness.** Agents 1/2 fix the reproduced failures on candidate files/copies. Shared vocabulary and ID contract are agreed before UI binding. Codex keeps current exact-source features usable.
2. **One complete introductory outcome.** Begin with the mercy topic for all three audiences and formats. The result view separates exact quotation, sourced explanation and draft teaching text; evidence panel remains one click away. Add copy/export with references and review state. Once accepted, extend to the other five topics.
3. **One complete research outcome.** Connect one accepted graph family to edge/narrator details and exact original text. Add actual collection coverage, candidates, gaps, attributed assessments and deterministic Mermaid. Expand to three families only after the first passes.
4. **Controlled live integration.** Back up configuration; import accepted tools using supported Open WebUI mechanisms; verify exported/source/runtime hashes and signatures. Upgrade existing `hadith-islam-guide`; bind actual Knowledge collection IDs only to approved material. Preserve other model IDs and case bindings. Run installed-runtime tasks, not only workspace Python tests.
5. **Release acceptance and demonstration.** Independent QA, human content decisions, source/license register, clean setup, public deployment configuration and a two-minute demo. Verify the public link before submission; localhost is not a judge-accessible deployment. Never publish chat history, credentials, live DBs or backups.

## What Codex will implement next

The next UI unit is a **result workspace** in أثر ٢: concise answer, exact selected evidence, sourced explanation, review/coverage state and useful next action. Preserve occurrence and passage IDs across follow-ups. Introductory outputs get a reusable card/Q&A/script export; specialists get an evidence drawer and supported graph export after Agent 2's contract passes. Render source text and statuses deterministically; model prose does not invent data for the components.

I can build layout, state handling and explicitly labeled fixtures while backend fixes run. Live explanation/edge integration depends on acceptance, not on a delivery report saying complete. Existing native model demonstrations remain available; the new source panel excludes unaccepted summaries and linkage assertions.

## Release boundaries

Minimum demonstrable scope: one fully supported introductory topic and one sourced research family, with six-topic navigation and the three existing case buttons retained. Clearly label the wider draft scope. Stop adding features before cutting source fidelity or citation checks. MCP transport and automatic subagent orchestration remain after the reliable evidence loop; they are not prerequisites for this release.

Handoffs are prepared local documents; they have not been sent to external agents. Current runtime snapshot is `runtime_inventory_2026-10-06.json`; independent findings are `round2_review_evidence_2026-10-06.json`.
