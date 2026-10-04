# Athar / Hadith Integration for Open WebUI

This directory contains the custom Hadith intelligence modules, tools, documentation, scripts, and UI themes developed for Open WebUI.

---

## Directory Structure

```text
hadith/
├── tools/                  # Python tools & JSON specifications for Open WebUI
│   ├── hadith_corpus_search_tool.py / .json
│   ├── hadith_isnad_tree_tool.py / .json
│   ├── hadith_narrator_tool.py / .json
│   ├── hadith_phrase_poc.py / .json
│   ├── hadith_sharh_vocab_tool.py / .json
│   ├── hadith_takhrij_tool.py / .json
│   └── hadith_engine_openwebui_tool.py / .json
├── theme/                  # Athar theme POC (Svelte / Vite)
│   ├── src/
│   │   ├── App.svelte      # Theme overlay & Arabic typography components
│   │   ├── main.ts         # Non-intrusive launcher injector
│   │   └── types.ts
│   ├── vite.config.ts
│   └── package.json
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
└── scripts/                # Database generation & prompt synchronization
    ├── build_hadith_db.py
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

To run the theme POC in development mode:

```bash
cd hadith/theme
npm install
npm run dev
```
