# Bayan al-Sunnah: P0/P1 Comprehensive Review Resolution & Delivery Report

**Date:** 2026-10-06  
**Author:** Backend AI Agent (Antigravity)  
**Addressed To:** Codex (Frontend Owner) & Academic Integration Team  
**Reference Document:** `planning/agent_1_p0_p1_review_and_next.md`  

---

## 1. Executive Summary: All Outstanding Review Issues Resolved

Every issue raised in `agent_1_p0_p1_review_and_next.md` has been investigated, resolved in source code, and verified using reproducible automated test suites and review scripts:

| Issue # | Review Finding | Implemented Resolution | Verification Evidence |
|:---|:---|:---|:---|
| **1 (P0)** | Isnad tool positive defaults & `LIMIT 1` | Completely removed `row[0] or 'ثقة'` and `'reliable'` fallbacks in `_get_narrator_grade`. When ambiguous/multiple candidates match, returns candidate list. | Slices match exact original text; grades return candidate lists; verified in `review_delivery.py` |
| **2 (P0)** | Graph offsets (`source_span`) misaligned | Implemented character-level alignment mapping `clean_to_orig` from normalized text to original diacritized text codepoints. | Fixture 07 node slices: `عُمَرَ بْنَ الْخَطَّابِ` at `[291, 331]` byte-for-byte; verified in `review_delivery.py` |
| **3 (P0)** | Bukhari #1 misclassified as `mawquf_or_maqtu` | Fixed Prophet mention regex against normalized text and classified as `marfu` (or `unresolved` if absent). | `paths[0].endpoint_type == 'marfu'`; verified in `review_delivery.py` |
| **4 (P0)** | HadeethEnc 2-word overlap admits unrelated content | Implemented two-phase verification: strict search token ratio + full matn body verification on detail response. | Controlled probe returns `status: unavailable`, `unrelated_detail_returned: false`; verified in `review_delivery.py` |
| **5 (P1)** | Guessed sequential HadeethEnc IDs (3154, 3161) | Replaced all 13 occurrences with real, verified HadeethEnc IDs (e.g. Branches of faith -> `3276`, Yassiru -> `5866`, etc.). | Fully verified against HadeethEnc API; tested in `test_01` of `test_bayan_topics.py` |
| **6 (P1)** | Composite quotations in card lessons | Replaced single combined quotes with an array `quotes: [...]` of discrete, separately attributed excerpts with exact occurrence IDs and `source_span`. | Tested in `test_02` & `test_03` of `test_bayan_topics.py` |
| **7 (P1)** | Self-declared approval labels | Changed all review statuses to `needs_review` / `draft`, separating `source_verified: true` from `scholarly_approved: false`. | Tested in `test_08` of `test_bayan_topics.py` |
| **8 (P1)** | Overstated tool contract (language & audience) | Added `audience` to `get_reviewed_lesson`, returned `unavailable` for unsupported language (`en`), and reported honest pack collection coverage. | Tested in `test_04`, `test_05`, `test_07` of `test_bayan_topics.py` |
| **9 (P1)** | Models export format for Open WebUI | Reformatted all 4 model exports into Open WebUI native import array format `[{ ... }]` with `base_model_id: 'gpt-5.4-mini'`, `meta.toolIds`, and native calling. | Verified in `model_exports` of `review_delivery.py` |

---

## 2. Test Verification Summary

1. **Foundational Backend Regression Suite (`tests/test_hadith_backend.py`):**
   - **7/7 tests PASS** in 8.905s.
2. **Comprehensive Topics & Invariants Suite (`tests/test_bayan_topics.py`):**
   - **12/12 tests PASS** in 0.254s (covering 24 held-out evaluation tasks completely offline).
3. **Independent Reproducible Review Script (`planning/review_delivery.py`):**
   - Graph fixture endpoint: `marfu` (Confirmed)
   - Graph fixture slices: 100% exact match on diacritized text (Confirmed)
   - Controlled unrelated probe: `status: unavailable`, `unrelated_detail_returned: false` (Confirmed)
   - Model exports: All 4 native import arrays with `base_model_id` and `meta.toolIds` (Confirmed)

---

## 3. Deliverables Manifest & SHA-256 Hashes

| Relative File Path | SHA-256 Hash |
|:---|:---|
| `tools/hadith_isnad_tree_tool.py` | `19ff6b476c46108a84a3f9985cbf0f8b10fcf35fbbefb827f823ddf124859b0b` |
| `tools/hadith_sharh_vocab_tool.py` | `84deb0ce67a5d11cc7577d86234e135503771476b17dcafea39c6a4179ac71a9` |
| `tools/hadith_bayan_topics_tool.py` | `a5cc777f0204eb48a8cc49e24572a5a02472eb08f64663e33104414a946ed2d9` |
| `tools/hadith_bayan_topics.json` | `f5d5a6aa30032d8a7b0d8292a778abfb6d2aeefd24b29974c4d7b4c7513d99e5` |
| `tools/hadith_corpus_search.json` | `728ab305b088e4b26899366716c5d247904ee5a960910f2918e5d237450508fb` |
| `tools/hadith_isnad_tree.json` | `02e0aa78730190cbac673df6ffc6a2be2b853c3c753d1bfb01159bd6c2b7c987` |
| `tools/hadith_narrator.json` | `279b93c419ff60ee0d902f859c284f7653db418c05c4625ee01fffbc4830b8bf` |
| `tools/hadith_sharh_vocab.json` | `c8748479d1b39599b958a7e26ad82464d35b3ab3b80779bf7f803628eca0dc46` |
| `tools/hadith_takhrij.json` | `e9862969a7b5d9729026f0916ca1b36ff13fca07c3c7209dbbb35654c9b3123c` |
| `planning/bayan_lesson_packs_v1.json` | `1704e0e074391414ef95d5c17b3a9d3db0fa24b65502827a3bc999f1350c2e40` |
| `planning/knowledge/manifest.json` | `f305b5524b01be5c36e23da1557ca85984bdf2dc6461bf8bdd09a0a0461eeee6` |
| `planning/fixtures/fixture_07_partial_graph.json` | `8b767402706f364a1ced21824bbd74712e23599fd082e174491b094d3d15eafe` |
| `planning/model_exports/bayan_islam_guide_native.json` | `84b435ba8fe33ef5ba1bfda538fe45b63a51dcf52867d1c5c1e90f1b45cbf88a` |
| `planning/model_exports/learner_model_export.json` | `36c5ded8de1371c8a72d7cc7bf6eb332c104aaa40c3e2ac67f73ab24dc9b4a35` |
| `planning/model_exports/research_coordinator_export.json` | `84acc81e660e2d9b49da6057bb099a12e0ee0a0d243f335558f1aa88c3acb047` |
| `planning/model_exports/rijal_specialist_export.json` | `bd18d6cd38ce4c477f15e1c7f9238e874a2aa1688dae2a33f9f96f5b35869cdc` |
| `tests/test_hadith_backend.py` | `a20ea858dbecce0accade899fcd1a819c076eedde392bfceb762e74e9bab256e` |
| `tests/test_bayan_topics.py` | `b878d162594527d46ef6e6056c78fbef7c906a9ec004a6c5356631f3f5fbe119` |
| `planning/backend_delivery_review_evidence.json` | `62709377de922f1b632e828a08c66d07aa04aedba2cb90c005473b283fce441b` |

---

## 4. Coordination & Next Steps for Codex

1. **Open WebUI Import:** Import the 4 updated model exports from `planning/model_exports/` through supported Open WebUI UI/API endpoints (no direct database writes).
2. **Knowledge Collection:** Use `planning/knowledge/manifest.json` and the 6 Markdown files in `planning/knowledge/` to register the collection `Bayan — Introduction to Islam` in Open WebUI.
3. **Frontend Wiring:** The 6 subject cards and their discrete `quotes[]` are ready to render in `poc/theme/**` with honest `needs_review` scholarly disclaimers.
