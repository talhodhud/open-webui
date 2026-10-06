# Optional Agent 3 — independent acceptance and user-task QA

Purpose: add an independent evaluator, not another feature author. This assignment is prepared; no extra agent was launched.

Own only `tests/acceptance/**`, `planning/evaluation/**` and your QA reports. Read the round-2 review, freeze input artifact hashes, and do not change production code, model presets, source fixtures or other agents' review scripts. Report failures with inputs, expected behavior, actual output and source evidence.

Create 40 distinct tasks: 12 introductory learning tasks spanning six topics, 12 specialist tasks, 8 exact lookup/citation tasks and 8 missing/ambiguous/provider-failure cases. Keep these separate from demonstration examples and implementation assertions. Ask the project owner for a qualified reviewer's labels where scholarly judgments are required; do not invent an approval signature.

Mandatory counterexamples: invalid selected ID with otherwise valid query; full-quote mismatch after character 15; an unresolved father; unnamed narrator between two named narrators; same display number in different chapters; uncertain dates; tahwil; wrong-detail matn; closely related but distinct provider report; unsupported language/format; unavailable service; missing scholarly approval.

Test production methods and installed runtime separately. Run pure offline checks and live-provider smoke checks separately. Measure task completion, exact ID/citation fidelity, supported claim coverage, narrator candidate behavior, warm/cold latency and unresolved rate. Record numerators and denominators. Repeated calls to the same demo pack are not distinct held-out tasks.

Review the native UI at desktop and phone widths: keyboard focus, RTL, reduced motion, right sidebar, original-interface switch, preserved draft, explicit model routing, source inspection and export. Exercise three complete journeys described in `next_implementation_plan.md`. Any wrong-source substitution or unsupported edge shown as verified blocks that feature's release.

Deliver `planning/evaluation/acceptance_report.md`, a task matrix, machine-readable results, exact runtime/source hashes and minimal screenshots. State what is passed, limited, untested and awaiting human review. Do not deploy or overwrite a failing test to match current behavior.
