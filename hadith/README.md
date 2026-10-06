# Athar / Hadith Integration for Open WebUI (بيان السنة)

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
├── planning/               # Verified curriculum packs, taxonomy & architectural audit
│   ├── bayan_lesson_packs_v1.json             # 6 introduction topics & vetted occurrences
│   ├── islam_topic_taxonomy_v1.json           # Pedagogical taxonomy
│   └── unified_six_skills_execution_audit.json# Cryptographic release fingerprints
├── exports/                # One-click Open WebUI JSON packages
│   ├── hadith_skills_vps_export.json          # 7 unified Hadith skills
│   └── hadith_models_vps_export.json          # bayan-unified-pilot model definition
├── theme/                  # Athar theme POC (Svelte / Vite)
│   ├── src/
│   │   ├── App.svelte      # Theme overlay & Arabic typography components
│   │   ├── main.ts         # Non-intrusive launcher injector
│   │   ├── journeys.ts     # User journey route definitions
│   │   ├── topics.ts       # Semantic topic packs
│   │   ├── topicEvidence.ts# Vetted evidence mapping
│   │   └── types.ts
│   ├── vite.config.ts
│   └── package.json
├── deliverables/           # Presentation guides & client-facing deliverables
│   ├── Bayan_AlSunnah_AlHudhud403_AR.pptx      # 22-slide bilingual pitch deck
│   ├── Bayan_AlSunnah_Presentation_Guide_AR.md # Hackathon presentation notes
│   ├── Bayan_AlSunnah_Visual_Handoff_AR.md
│   └── Bayan_Unified_Architecture.mmd
├── fixtures/               # UI fixtures & narrator drawer evidence
│   └── narrator_drawer_evidence.json
├── migrations/             # Database schema migrations
│   └── 001_add_link_provenance.sql
├── tests/                  # Verification test suites (39 tests, 100% pass)
│   ├── run_all_tests.py    # Master runner for AI evaluators and CI/CD
│   ├── test_unified_u01_u08.py # U01-U08 architectural acceptance tests
│   ├── test_bayan_topics.py    # 12 pedagogical & exclusion tests
│   ├── test_hadith_backend.py  # 7 retrieval & provider tests
│   ├── test_isnad_linkage_rigor.py # 13 transmission & DAG tests
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
│   ├── unified_skills_architecture_AR.md
│   └── source_and_implementation_review.md
└── scripts/                # Database generation, indexing & prompt synchronization
    ├── deploy_unified_v2.py# Production deployer with safe rollback
    ├── rollback_snapshot.py# Instant database restoration
    ├── build_full_isnad_transmissions.py
    └── build_hadith_db.py
```

---

## Files NOT in GitHub Repository (And How to Link Them)

Due to GitHub's **100 MB per-file upload limit** and security policies, large compiled binary databases and secret keys are excluded via `.gitignore`:

| File | Approximate Size | Purpose | Why Excluded |
| :--- | :--- | :--- | :--- |
| **`hadith_rijal.db`** | **~1.03 GB** | Primary SQLite database (115k+ narrators, isnad graph, Itqan components, 18 canonical books). | Exceeds GitHub 100 MB limit. |
| **`search_index.sqlite`** | **~118 MB** | Pre-computed FTS5 exact phrase index for rapid full-text matching. | Exceeds GitHub 100 MB limit. |
| **`itqan-repo/`** | **~500 MB** | Upstream raw dataset repository (`https://github.com/R3GENESI5/Itqan.git`). | Separate external Git repository. |
| **`.webui_secret_key`** | **32 bytes** | Cryptographic session & token signing key for Open WebUI auth. | Sensitive private credential. |

---

### How to Link the Database Files to the Project

The Python tools locate `hadith_rijal.db` through:
1. Environment Variable `HADITH_DB_PATH` (Recommended)
2. Tool Valves settings in Open WebUI UI
3. Default path `./hadith_rijal.db` or `../hadith_rijal.db`

Choose the linking method suited to your operating system:

---

#### 1. On Windows

##### Method A: Environment Variable (Recommended)
Set the user environment variable pointing to the database file:
```powershell
[System.Environment]::SetEnvironmentVariable('HADITH_DB_PATH', 'C:\Path\To\hadith_rijal.db', 'User')
[System.Environment]::SetEnvironmentVariable('HADITH_SEARCH_INDEX_PATH', 'C:\Path\To\search_index.sqlite', 'User')
```
*(Restart your terminal or Open WebUI server after setting).*

##### Method B: NTFS Hard Link or Symbolic Link
Create a direct file link into Open WebUI's data directory so the backend accesses it natively:
```powershell
# Hard Link (Recommended on Windows — does NOT require Administrator privileges):
New-Item -ItemType HardLink -Path "backend\data\hadith_rijal.db" -Target "C:\Path\To\hadith_rijal.db"
New-Item -ItemType HardLink -Path "hadith\poc\phrase_search\search_index.sqlite" -Target "C:\Path\To\search_index.sqlite"

# Or Symbolic Link (Requires Developer Mode or Run as Administrator):
New-Item -ItemType SymbolicLink -Path "backend\data\hadith_rijal.db" -Target "C:\Path\To\hadith_rijal.db"
```

##### Method C: Configure via Open WebUI Admin Interface (GUI)
1. Go to **Open WebUI > Workspace > Tools**.
2. Click the gear icon (⚙️ / Valves) next to each Hadith tool (e.g. `hadith_corpus_search`, `hadith_narrator`, `hadith_isnad_tree`).
3. Set `DB_PATH` to the absolute Windows path: `C:\Path\To\hadith_rijal.db`.
4. Click **Save**.

---

#### 2. On Linux / macOS / Docker

##### Method A: Environment Variable
Add the export to your `.env` file, `/etc/environment`, or shell profile:
```bash
export HADITH_DB_PATH="/opt/hadith/hadith_rijal.db"
export HADITH_SEARCH_INDEX_PATH="/opt/hadith/search_index.sqlite"
```

##### Method B: Symbolic Link
Create symlinks directly to the database in your Open WebUI repository:
```bash
# Link hadith_rijal.db into backend data folder
mkdir -p backend/data
ln -sf /opt/hadith/hadith_rijal.db ./backend/data/hadith_rijal.db

# Link phrase search index
ln -sf /opt/hadith/search_index.sqlite ./hadith/poc/phrase_search/search_index.sqlite
```

##### Method C: Docker Deployment
Mount the host database file into the container's persistent data volume:
```bash
docker run -d -p 8080:8080 \
  -v open-webui:/app/backend/data \
  -v /path/to/hadith_rijal.db:/app/backend/data/hadith_rijal.db:ro \
  -e HADITH_DB_PATH="/app/backend/data/hadith_rijal.db" \
  --name open-webui ghcr.io/open-webui/open-webui:main
```

---

### How to Rebuild Databases from Scratch (If Not Provided)

If you clone the repository onto a fresh machine without the database binaries, all builder scripts are included:

1. **Rebuild `hadith_rijal.db`**:
   ```bash
   python hadith/scripts/build_hadith_db.py
   python hadith/scripts/build_full_isnad_transmissions.py
   ```
2. **Rebuild `search_index.sqlite`**:
   ```bash
   python hadith/poc/phrase_search/build_index.py
   ```
3. **Sparse-clone Itqan raw records (if building from source)**:
   ```bash
   git clone --depth 1 --filter=blob:none --sparse https://github.com/R3GENESI5/Itqan.git itqan-repo
   cd itqan-repo
   git sparse-checkout set app/data
   ```

---

## Quick Start: Importing Tools into Open WebUI

1. In Open WebUI, navigate to **Workspace > Tools**.
2. Click **+ Add Tool** or **Import**.
3. Load any tool specification JSON from `hadith/tools/` or paste the Python source code from `hadith/tools/*_tool.py`.
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
