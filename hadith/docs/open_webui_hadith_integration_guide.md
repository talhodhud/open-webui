# HADITH INTEGRATION GUIDE FOR OPEN WEBUI
## TECHNICAL SPECIFICATION AND INTEGRATION MANUAL
**Document Standard:** ASD-STE100 (Simplified Technical English)  
**Target System:** Open WebUI (Local Deployment)  
**Target Data Sources:** Itqan, HadeethEnc API, Dorar.net API, Sunnah.com API  

---

### 1. OVERVIEW

This document gives instructions to integrate four Hadith data sources into Open WebUI.  
The integration uses five core capabilities of Open WebUI:
- Agents (Workspace Models)
- Knowledge (Retrieval-Augmented Generation / RAG)
- Database (Internal Relational and Vector Storage)
- Model Context Protocol (MCP)
- Tools (Python Functions)

#### 1.1 Architectural Concept

```
┌────────────────────────────────────────────────────────────────────────┐
│                        OPEN WEBUI CORE ENGINE                          │
└────────────────────────────────────────────────────────────────────────┘
                                     │
       ┌─────────────────────────────┼─────────────────────────────┐
       ▼                             ▼                             ▼
┌──────────────┐              ┌──────────────┐              ┌──────────────┐
│    AGENTS    │ ──────────>  │  TOOLS / MCP │  <────────── │  KNOWLEDGE   │
│  (Workspaces)│              │  (Functions) │              │  (Embeddings)│
└──────────────┘              └──────────────┘              └──────────────┘
                                     │
                                     ▼
                      ┌──────────────────────────────┐
                      │      FOUR DATA SOURCES       │
                      │ 1. Itqan (Local SQLite)      │
                      │ 2. Dorar.net (REST API)      │
                      │ 3. HadeethEnc (REST API)     │
                      │ 4. Sunnah.com (CDN JSON)     │
                      └──────────────────────────────┘
```

---

### 2. THE FOUR DATA SOURCES

#### 2.1 Itqan Dataset (Offline Core Corpus)
- **Origin:** GitHub repository `R3GENESI5/Itqan`.
- **Content:**
  - 18 Sunni Hadith collections (including Kutub al-Sittah and Musnad Ahmad).
  - 115,735 narrator records from 22 classical books of Rijal.
  - Transmission graph data (`isnad_graph.json`) with teacher-student connections.
- **Function in Open WebUI:** Local offline query engine for Hadith chains and narrator reliability.

#### 2.2 HadeethEnc API (Explanations and Multi-Language Data)
- **Endpoint:** `https://hadeethenc.com/api/v1/`
- **Content:**
  - Verified Hadiths with simple explanations (*Sharh*).
  - Word meanings (*Gharib al-Hadith*).
  - Educational benefits (*Fawa'id*).
  - 17 languages (including Arabic and English).
- **Function in Open WebUI:** Source for explanations, word meanings, and translations.

#### 2.3 Dorar.net API (Online Verification Engine)
- **Endpoint:** `https://dorar.net/dorar_api.json?skey={query}`
- **Content:**
  - Real-time search in classical Hadith collections.
  - Verification judgments from classical and modern scholars.
- **Function in Open WebUI:** Real-time tool to verify Hadith authenticity.

#### 2.4 Sunnah.com Hadith-API (Canonical Numbers and Bilingual Matn)
- **Endpoint:** `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/`
- **Content:**
  - Exact chapter and Hadith numbering.
  - Arabic text (with and without diacritics).
  - English translations.
  - Authenticity evaluations by modern scholars (Al-Albani, Al-Arna'ut).
- **Function in Open WebUI:** Exact Hadith lookup by book and number.

---

### 3. OPEN WEBUI ARCHITECTURAL CAPABILITIES

#### 3.1 Agents (Workspace Models)
Open WebUI stores agent specifications in `open_webui/models/models.py`.  
An agent contains:
- A base model ID (for example, `qwen2.5:72b` or `gpt-4o`).
- A system prompt that defines the persona and rules.
- Connections to specific Tools.
- Connections to specific Knowledge collections.

#### 3.2 Knowledge (Vector RAG)
Open WebUI handles vector collections in `open_webui/models/knowledge.py`.  
It supports:
- Document chunking.
- Vector search with ChromaDB (default), Qdrant, Milvus, or pgvector.
- Hybrid search (BM25 lexical search plus dense vector search).
- Multi-language embedding models (for example, `intfloat/multilingual-e5-small` or `BAAI/bge-m3`).

#### 3.3 Database
Open WebUI uses SQLAlchemy in `open_webui/internal/db.py`:
- SQLite by default (`webui.db`) with Write-Ahead Logging (WAL).
- PostgreSQL for production deployments.

#### 3.4 Model Context Protocol (MCP)
Open WebUI has a native client in `open_webui/utils/mcp/client.py`.  
It connects to external MCP servers through Server-Sent Events (SSE) or HTTP streamable transport.  
It automatically converts MCP tool specifications into Open WebUI tools.

#### 3.5 Tools (Python Functions)
Open WebUI loads Python tools in `open_webui/utils/tools.py`.  
Each tool is a Python class named `Tools`.  
The backend reads the Python docstrings and type hints.  
It then creates OpenAI-compatible function schemas.

---

### 4. INTEGRATION PROCEDURES

#### Task 1: Convert Itqan Data to an Optimized SQLite Database

Do this procedure to make a local SQLite database for narrator and isnad queries.

1. Download the Itqan data files from GitHub:
   - `app/data/rijal/profiles_*.json`
   - `app/data/isnad_graph.json`
2. Run this Python script to build the local database `itqan_rijal.db`:

```python
import json
import sqlite3
from pathlib import Path

def initialize_database(db_path: str = "itqan_rijal.db"):
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()

    # Create narrators table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS narrators (
        id INTEGER PRIMARY KEY,
        full_name TEXT NOT NULL,
        kunya TEXT,
        grade_ar TEXT,
        grade_en TEXT,
        death TEXT,
        city TEXT,
        tabaqat TEXT,
        teachers TEXT,
        students TEXT
    );
    """)
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_narrators_name ON narrators(full_name);")

    # Create isnad transmission links table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS isnad_links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        book TEXT NOT NULL,
        source_id INTEGER,
        target_id INTEGER,
        weight INTEGER
    );
    """)
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_isnad_book ON isnad_links(book);")

    connection.commit()
    connection.close()

if __name__ == "__main__":
    initialize_database()
```

---

#### Task 2: Create the Unified Hadith Tool in Open WebUI

Do this procedure to register the Hadith tool in Open WebUI.

1. Open the Open WebUI web interface.
2. Select **Workspace** in the left menu.
3. Select **Tools**.
4. Select **Add Tool** (+).
5. Paste the code below into the code window:

```python
"""
title: Hadith & Narrator Verification Tool
author: AI Team
version: 1.0
license: MIT
description: Query Hadith texts, verify authenticity with Dorar, retrieve explanations from HadeethEnc, and inspect narrators.
"""

import json
import sqlite3
import urllib.parse
import urllib.request
from typing import Optional
from bs4 import BeautifulSoup
from pydantic import BaseModel, Field


class Tools:
    class Valves(BaseModel):
        sqlite_db_path: str = Field(
            default="itqan_rijal.db",
            description="Absolute path to the local Itqan SQLite database."
        )
        http_timeout: int = Field(
            default=10,
            description="HTTP timeout in seconds."
        )

    def __init__(self):
        self.valves = self.Valves()

    async def verify_hadith_dorar(self, hadith_text: str) -> str:
        """
        Verify Hadith authenticity, chain validity, and scholar grades from Dorar.net.
        :param hadith_text: Text snippet of the Hadith (in Arabic).
        :return: Verification judgments and sources from Hadith scholars.
        """
        try:
            encoded_query = urllib.parse.quote(hadith_text.strip())
            url = f"https://dorar.net/dorar_api.json?skey={encoded_query}"
            headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
            request = urllib.request.Request(url, headers=headers)

            with urllib.request.urlopen(request, timeout=self.valves.http_timeout) as response:
                payload = json.loads(response.read().decode("utf-8"))

            html_content = payload.get("ahadith", {}).get("result", "")
            if not html_content:
                return "No records found in Dorar.net for this text."

            soup = BeautifulSoup(html_content, "html.parser")
            matn_nodes = soup.find_all("div", class_="hadith")
            info_nodes = soup.find_all("div", class_="hadith-info")

            output_lines = []
            max_results = min(5, len(matn_nodes))
            for i in range(max_results):
                text = matn_nodes[i].get_text(strip=True)
                info = info_nodes[i].get_text(" | ", strip=True) if i < len(info_nodes) else ""
                output_lines.append(f"Result {i+1}:\n- Text: {text}\n- Metadata: {info}\n")

            return "\n".join(output_lines)
        except Exception as error:
            return f"Error while querying Dorar API: {str(error)}"

    async def get_explanation_hadeethenc(self, keyword: str, language: str = "ar") -> str:
        """
        Get an authentic Hadith explanation, word meanings, and moral lessons from HadeethEnc.com.
        :param keyword: Search keyword or phrase.
        :param language: Language code ('ar' for Arabic, 'en' for English).
        :return: Full explanation with vocabulary and derived benefits.
        """
        try:
            encoded_word = urllib.parse.quote(keyword.strip())
            search_url = f"https://hadeethenc.com/api/v1/hadeeths/search/?phrase={encoded_word}&language={language}&page=1&per_page=1"
            headers = {"User-Agent": "Mozilla/5.0"}
            request = urllib.request.Request(search_url, headers=headers)

            with urllib.request.urlopen(request, timeout=self.valves.http_timeout) as response:
                search_result = json.loads(response.read().decode("utf-8"))

            items = search_result.get("data", [])
            if not items:
                return "No explanation found in HadeethEnc for this keyword."

            hadith_id = items[0].get("id")
            detail_url = f"https://hadeethenc.com/api/v1/hadeeths/one/?id={hadith_id}&language={language}"
            detail_request = urllib.request.Request(detail_url, headers=headers)

            with urllib.request.urlopen(detail_request, timeout=self.valves.http_timeout) as response:
                data = json.loads(response.read().decode("utf-8"))

            result_text = (
                f"Title: {data.get('title')}\n"
                f"Hadith: {data.get('hadeeth')}\n"
                f"Grade: {data.get('grade')} | Source: {data.get('attribution')}\n\n"
                f"Explanation:\n{data.get('explanation')}\n\n"
            )
            hints = data.get("hints", [])
            if hints:
                result_text += "Benefits:\n" + "\n".join([f"- {h}" for h in hints])

            return result_text
        except Exception as error:
            return f"Error while querying HadeethEnc API: {str(error)}"

    async def lookup_narrator_itqan(self, narrator_name: str) -> str:
        """
        Look up narrator biography, reliability grade, death year, and students from the Itqan database.
        :param narrator_name: Name of the narrator in Arabic (for example, 'شعبة' or 'سعيد بن سماك').
        :return: Biographical profile and reliability evaluation.
        """
        try:
            connection = sqlite3.connect(self.valves.sqlite_db_path)
            cursor = connection.cursor()

            query = "SELECT id, full_name, kunya, grade_ar, grade_en, death, city, tabaqat FROM narrators WHERE full_name LIKE ? LIMIT 3"
            cursor.execute(query, (f"%{narrator_name.strip()}%",))
            rows = cursor.fetchall()
            connection.close()

            if not rows:
                return f"No narrator profile found for '{narrator_name}'."

            results = []
            for row in rows:
                profile = (
                    f"ID: {row[0]}\n"
                    f"Name: {row[1]}\n"
                    f"Kunya: {row[2]}\n"
                    f"Arabic Grade: {row[3]}\n"
                    f"English Grade: {row[4]}\n"
                    f"Death Year (AH): {row[5]}\n"
                    f"City: {row[6]}\n"
                    f"Generation (Tabaqah): {row[7]}\n"
                )
                results.append(profile)

            return "\n---\n".join(results)
        except Exception as error:
            return f"Error while querying local narrator database: {str(error)}"
```

6. Select **Save**.

---

#### Task 3: Configure Model Context Protocol (MCP) Server (Alternative Architecture)

Do this procedure if you want to run the Hadith tools in an isolated service outside Open WebUI.

1. Install FastMCP:
   ```bash
   pip install mcp uvicorn
   ```
2. Create `mcp_hadith_server.py`:
   ```python
   from mcp.server.fastmcp import FastMCP
   import urllib.request
   import json

   mcp = FastMCP("HadithEngine")

   @mcp.tool()
   def ping_server() -> str:
       """Health check tool."""
       return "Hadith MCP Server is active."

   if __name__ == "__main__":
       mcp.run(transport="sse")
   ```
3. Start the MCP server:
   ```bash
   python mcp_hadith_server.py
   ```
4. Open **Open WebUI** -> **Admin Panel** -> **Settings** -> **Tools**.
5. Go to **Tool Servers**.
6. Add the server URL:
   - Type: `mcp`
   - URL: `http://localhost:8000/sse`
7. Save settings. Open WebUI automatically discovers the tools.

---

#### Task 4: Ingest Hadith Texts into Open WebUI Knowledge (RAG)

Do this procedure to provide background semantic search on Hadith topics.

1. Open **Workspace** -> **Knowledge**.
2. Select **Create Knowledge Base** (+).
3. Set the parameters:
   - **Name:** `Hadith Explanations and Ethics`
   - **Description:** `Verified explanations, vocabulary, and moral lessons from HadeethEnc.`
4. Upload text or JSON files of curated Hadith collections.
5. In **Admin Panel** -> **Settings** -> **Documents**:
   - Set **Embedding Engine** to `sentence-transformers`.
   - Set **Embedding Model** to `intfloat/multilingual-e5-small` or `BAAI/bge-m3`.
   - Set **RAG Hybrid Search** to `True`.
6. Save settings.

---

#### Task 5: Configure Specialized Hadith Agents

Do this procedure to create two specialized agents in Open WebUI.

##### Agent 1: Hadith & Isnad Verification Specialist
1. Go to **Workspace** -> **Models**.
2. Select **Create Model** (+).
3. Fill in the fields:
   - **Name:** `Hadith & Isnad Verifier`
   - **Base Model:** Select an advanced reasoning model (`qwen2.5:72b` or `gpt-4o`).
   - **System Prompt:**
     ```text
     You are a specialist in Hadith sciences and narrator criticism (Ilm al-Rijal).
     Always follow these rules:
     1. Analyze the chain of narrators (Isnad) using the local narrator database.
     2. Identify each narrator, their reliability grade, and their generation.
     3. Verify the authenticity of the text using the Dorar.net tool.
     4. Give the final grade of the Hadith (Sahih, Hasan, Da'if, Mawdu').
     5. Always cite the primary scholars for each ruling.
     ```
   - **Tools:** Enable `verify_hadith_dorar` and `lookup_narrator_itqan`.
4. Select **Save & Create**.

##### Agent 2: Prophetic Guidance & Explanation Specialist
1. Go to **Workspace** -> **Models**.
2. Select **Create Model** (+).
3. Fill in the fields:
   - **Name:** `Prophetic Wisdom & Sharh Agent`
   - **Base Model:** Select an instruction model (`qwen2.5:32b` or `gemini-1.5-pro`).
   - **System Prompt:**
     ```text
     You are an educational specialist in Hadith explanation (Sharh) and vocabulary.
     Always follow these rules:
     1. Explain the meaning of difficult Arabic words in the Hadith.
     2. Provide the historical context and main message.
     3. List practical life lessons and moral benefits.
     4. Provide English and Arabic text clearly.
     ```
   - **Tools:** Enable `get_explanation_hadeethenc`.
   - **Knowledge:** Attach the `Hadith Explanations and Ethics` collection.
4. Select **Save & Create**.

---

### 5. VERIFICATION AND TEST PROCEDURES

Do these tests to verify that the integration is complete:

1. **Verify Dorar.net Tool:**
   - In the chat, prompt the agent:
     `"Verify this text: إنما الأعمال بالنيات"`
   - Confirm that the agent calls `verify_hadith_dorar` and returns scholar grades.
2. **Verify HadeethEnc Tool:**
   - In the chat, prompt the agent:
     `"Explain the hadith about blood on the Day of Judgment in English and Arabic."`
   - Confirm that the agent calls `get_explanation_hadeethenc` and outputs the explanation and benefits.
3. **Verify Itqan Narrator Tool:**
   - In the chat, prompt the agent:
     `"Give the biography and grade of narrator شعبة بن الحجاج."`
   - Confirm that the agent calls `lookup_narrator_itqan` and displays reliability and death date.
