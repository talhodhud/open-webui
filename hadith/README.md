# Athar / Hadith Integration for Open WebUI

This directory contains the custom Hadith intelligence modules, tools, documentation, scripts, tests, deliverables, and UI themes developed for Open WebUI.

---

## Directory Structure

```text
hadith/
├── tools/                  # Python tools & JSON specifications for Open WebUI
│   ├── hadith_bayan_topics_tool.py / .json    # Topical Hadith index & Bayan classification
│   ├── hadith_contract_helper.py              # Schema contract validation & formatting
│   ├── hadith_corpus_search_tool.py / .json   # Multi-source Hadith text search
│   ├── hadith_isnad_tree_tool.py / .json      # Chain of transmission visualizer & graph
│   ├── hadith_narrator_tool.py / .json        # Jarh & Ta'dil narrator inspector
│   ├── hadith_phrase_poc.py / .json           # Exact phrase finder tool
│   ├── hadith_sharh_vocab_tool.py / .json     # Rare terms (Gharib) & commentaries
│   ├── hadith_takhrij_tool.py / .json         # Cross-referencing & authentication
│   └── hadith_engine_openwebui_tool.py / .json# Unified Hadith orchestrator tool
├── theme/                  # Athar theme POC (Svelte / Vite)
│   ├── src/
│   │   ├── App.svelte      # Theme overlay & Arabic typography components
│   │   ├── main.ts         # Non-intrusive launcher injector
│   │   └── types.ts
│   ├── vite.config.ts
│   └── package.json
├── deliverables/           # Presentation guides & client-facing deliverables
│   └── Bayan_AlSunnah_Presentation_Guide_AR.md
├── fixtures/               # UI fixtures & narrator drawer evidence
│   └── narrator_drawer_evidence.json
├── migrations/             # Database schema migrations
│   └── 001_add_link_provenance.sql
├── tests/                  # Verification test suites
│   ├── test_bayan_topics.py
│   ├── test_hadith_backend.py
│   ├── test_isnad_linkage_rigor.py
│   └── acceptance/
├── poc/
│   └── phrase_search/      # Exact phrase matching & FTS indexing engine
│       ├── build_index.py  # Generates phrase search SQLite index
│       ├── engine.py       # Core search engine
│       └── tool_adapter.py # Adapter for Open WebUI
├── docs/                   # Specifications, architecture guides & references
│   ├── open_webui_hadith_integration_guide.md
│   ├── hadith_datasets_and_apis_reference.md
│   ├── hadith_product_blueprint.md
│   └── source_and_implementation_review.md
└── scripts/                # Database generation, indexing & prompt synchronization
    ├── build_full_isnad_transmissions.py
    ├── build_hadith_db.py
    ├── sync_narrator_tool_and_webui.py
    └── update_*.py
```

---

## Quick Start: Importing Tools into Open WebUI

1. In Open WebUI, navigate to **Workspace > Tools**.
2. Click **+ Add Tool** or **Import**.
3. Load any tool specification JSON from `hadith/tools/` or copy the Python source code from the corresponding `*_tool.py` file.
4. Enable the tool in your models / assistant settings.

---

## Athar Theme POC

The Athar theme POC bundle is located in `static/hadith-theme-poc/hadith-theme.js` and loaded via `src/app.html`.

To run the theme source in standalone development mode:

```bash
cd hadith/theme
npm install
npm run dev
```
