# Bayan al-Sunnah: P1 Islamic Topics Track Delivery Report

**Date:** 2026-10-05  
**Product Track:** بيان السُّنّة — الحديث النبوي للمعرّفين بالإسلام (Bayan al-Sunnah)  
**Author:** Backend AI Agent  
**Target:** Codex (Frontend Lead) & Academic Reviewers  

---

## 1. Summary of Completed P1 Deliverables

In accordance with [`planning/bayan_agent_next_handoff.md`](bayan_agent_next_handoff.md), the entire subject-based Islam introduction track (P1) has been designed, implemented, and verified offline:

### 1.1 Topic Taxonomy v1 (`planning/islam_topic_taxonomy_v1.json`)
- **Corpus Basis:** 336 canonical chapters across all six collections (34,240 indexed occurrences).
- **Structure:** Covers all 6 core introductory topics:
  1. `topic-faith` (الإيمان والمعنى)
  2. `topic-mercy` (الرحمة وحسن الخلق)
  3. `topic-worship` (العبادة والحياة)
  4. `topic-family` (الأسرة والجوار)
  5. `topic-fairness` (العدل والأمانة)
  6. `topic-knowledge` (العلم والحوار)
- **Features:** Detailed subtopics, normalized chapter patterns, confidence ratings (`high`), explicit negative exclusion rules (e.g. excluding juristic oath-taking from faith), and cross-topic multi-label intersections.

### 1.2 First Six Reviewed Lesson Packs (`planning/bayan_lesson_packs_v1.json`)
- **Vetted Occurrences:** 2–3 authentic occurrences per topic from `search_index.sqlite`, with exact text, `text_sha256`, collection, chapter title, local numbering, and source URLs.
- **Attributed Judgments:** Consensus designations (e.g. agreed upon by Bukhari and Muslim / Tirmidhi).
- **Verified Explanations:** Referenced directly to HadeethEnc encyclopedia entries with IDs.
- **Vocabulary Glosses:** Classical definitions of difficult words.
- **Audience Objectives:** Specifically tailored for `newcomer` (interested seeker), `new_muslim` (new practitioner), and `educator` (teacher/mentor).
- **Presentation Formats:** Ready drafted content for `card` (short card), `qa` (Q&A), and `two_minute` (narrative).
- **Explicit Exclusions:** Documented rationale for excluding incidental/polemical texts.

### 1.3 Knowledge Collection (`planning/knowledge/`)
- **Manifest:** `planning/knowledge/manifest.json` for Open WebUI Knowledge collection `Bayan — Introduction to Islam`.
- **Documents:** 6 comprehensive markdown files (`topic-faith.md`, `topic-mercy.md`, `topic-worship.md`, `topic-family.md`, `topic-fairness.md`, `topic-knowledge.md`).
- **Passage Identifiers:** Stable passage IDs (`bayan-pass-faith-01`, etc.) linked to exact structured occurrences and SHA-256 hashes.

### 1.4 Three Read-Only Tool Operations (`tools/hadith_bayan_topics_tool.py` & `.json`)
- **`list_islam_topics()`**: Returns summary of the 6 topics, subtopics count, and coverage metadata.
- **`get_topic_evidence(topic_id, audience, language)`**: Returns vetted scriptural occurrences, learning objectives, vocabulary, and sources for the chosen topic.
- **`get_reviewed_lesson(topic_id, format, language)`**: Returns drafted educational lesson content in `card`, `qa`, or `two_minute` format.
- **Contract:** Fully strictly adheres to Response Contract v1 (`schema_version: "1"`, `status`, `data`, `evidence`, `coverage`, `warnings`). No arbitrary machine authenticity scores.

### 1.5 Upgraded Guide Model & Reformatted Exports (`planning/model_exports/`)
- **`bayan_islam_guide_native.json`**: Upgraded to equip `hadith_bayan_topics` and `hadith_corpus_search`, linking to the Knowledge collection, with native tool calling (`params.function_calling: "native"`) and strict pedagogical guidelines.
- **Reformatted 3 Presets:** `learner_model_export.json`, `research_coordinator_export.json`, and `rijal_specialist_export.json` reformatted to the Open WebUI native import array format (`[{ ... }]`) with `base_model_id: "gpt-5.4-mini"` and `meta.toolIds`, directly resolving review Finding 6.

### 1.6 Offline Evaluation Suite (`tests/test_bayan_topics.py`)
- **Coverage:** 24 distinct evaluation cases (2 positive + 2 difficult/negative test assertions for each of the 6 topics).
- **Verification:** Evaluates citation resolution, audience tailoring, format generation, negative exclusions, and boundary error handling.
- **Performance:** **11/11 tests pass in 0.075s** in a completely offline, deterministic environment.

---

## 2. File Manifest & Hashes

| File Path | Description |
|:---|:---|
| `planning/islam_topic_taxonomy_v1.json` | 6-topic taxonomy mapping across 336 chapters |
| `planning/bayan_lesson_packs_v1.json` | 6 reviewed lesson packs with 2-3 vetted occurrences |
| `planning/knowledge/manifest.json` | Open WebUI Knowledge collection manifest |
| `planning/knowledge/*.md` (6 files) | Approved educational knowledge passages |
| `tools/hadith_bayan_topics_tool.py` | Python implementation of the 3 read-only operations |
| `tools/hadith_bayan_topics.json` | Open WebUI tool specification bundle |
| `planning/model_exports/bayan_islam_guide_native.json` | Upgraded guide model export for native import |
| `planning/model_exports/*.json` (3 files) | Reformatted native model exports (Learner, Coordinator, Rijal) |
| `tests/test_bayan_topics.py` | 24-case offline evaluation test suite |

---
**Ready for Codex frontend wiring and reviewed Open WebUI import.**
