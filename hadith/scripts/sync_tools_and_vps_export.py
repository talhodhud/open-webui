"""
apply_resilient_tools.py
========================
1. Injects dynamic OS-agnostic path resolution into all 5 SQLite/file-dependent Hadith tools:
   - hadith_corpus_search_tool.py
   - hadith_bayan_topics_tool.py
   - hadith_isnad_tree_tool.py
   - hadith_narrator_tool.py
   - hadith_sharh_vocab_tool.py
2. Syncs both open-webui/hadith/tools/ and tools/ directories.
3. Updates corresponding tool JSON manifests.
4. Generates hadith/exports/hadith_tools_vps_export.json (containing all 6 micro-tools).
5. Injects/updates all 6 tools into local webui.db.
6. Updates models in webui.db:
   - hadith-islam-guide: adds hadith_bayan_topics, hadith-islam-guide skill, updated prompt
   - bayan-unified-pilot: all 6 tools, all 7 skills
   - other specialist models: verifies tools and skills
7. Exports updated hadith_models_vps_export.json and hadith_skills_vps_export.json.
"""

import os
import sys
import json
import time
import sqlite3
import re

WEBUI_DB_PATH = r"C:\Users\mhdal\AppData\Local\Programs\Python\Python312\Lib\site-packages\open_webui\data\webui.db"
USER_ID = "059a9be7-b5a5-4be9-88d1-7e0e0fa2548d"

RESOLVER_METHOD_CODE = '''
    @staticmethod
    def _resolve_path(env_var: str, current_val: str, candidates: list) -> str:
        env_val = os.environ.get(env_var)
        if env_val and os.path.exists(env_val):
            return os.path.abspath(env_val)
        if current_val and os.path.exists(current_val):
            return os.path.abspath(current_val)
        search_roots = [
            os.getcwd(),
            os.path.abspath(os.path.join(os.getcwd(), "..")),
            os.path.abspath(os.path.join(os.getcwd(), "../..")),
            os.path.abspath(os.path.join(os.getcwd(), "hadith")),
            os.path.abspath(os.path.join(os.getcwd(), "open-webui")),
            os.path.abspath(os.path.join(os.getcwd(), "open-webui/hadith")),
            "/app/backend/data",
            "/app/data",
            "/app",
            "/root/open-webui",
            "/root/open-webui/hadith",
            "/root",
        ]
        if "__file__" in globals():
            tool_dir = os.path.dirname(os.path.abspath(__file__))
            search_roots.extend([
                tool_dir,
                os.path.abspath(os.path.join(tool_dir, "..")),
                os.path.abspath(os.path.join(tool_dir, "../..")),
                os.path.abspath(os.path.join(tool_dir, "../../..")),
            ])
        for c in candidates:
            if os.path.isabs(c) and os.path.exists(c):
                return os.path.abspath(c)
            for root in search_roots:
                p = os.path.join(root, c)
                if os.path.exists(p):
                    return os.path.abspath(p)
        return current_val
'''

ISLAM_GUIDE_PROMPT_V2 = """أنت «بيان السُّنّة — دليل المعرّف بالإسلام». تساعد المعرّفين بالإسلام على إعداد مسودة تعريفية عربية واضحة من نصوص حديثية مسترجعة، باحترام القارئ دون افتراض ديانته أو معرفته بالمصطلحات.
هذه نسخة تجريبية لجمع الأدلة وصياغة مادة أولية؛ ليست منهجاً معتمداً ولا حكماً مستقلاً على صحة الأحاديث.

## 🚨 استدعاء الأدوات المعتمدة:
1. **أداة الموضوعات والشواهد المعتمدة (hadith_bayan_topics):**
   - استدعِ `list_islam_topics()` لاستعراض المحاور الستة وتساؤلاتها المركزية:
     * topic-faith (الإيمان والمعنى - مع استبعاد الأيمان والنذور القضائية).
     * topic-mercy (الرحمة وحسن الخلق).
     * topic-worship (العبادة والحياة).
     * topic-family (الأسرة والجوار).
     * topic-fairness (العدل والأمانة).
     * topic-knowledge (العلم والحوار).
   - استدعِ `get_topic_evidence(topic_id=..., audience=...)` لجلب شواهد الموضوع المعتمدة مع بصماتها ومصادرها الثابتة للجمهور المحدد (newcomer, new_muslim, educator).
   - استدعِ `get_reviewed_lesson(topic_id=..., audience=..., format=...)` لجلب مسودات الدروس المراجعة بحسب الجمهور والقالب (card, qa, two_minute).

2. **أداة البحث المتني (search_hadith_corpus):**
   - استدعِ `search_hadith_corpus(query=..., book="all", limit=5)` للبحث عن ألفاظ إضافية أو التحقق من المتون في الكتب الستة.
   - لا تدّعِ أن البحث المحدود يستوعب الكتب الستة كلها، واذكر حدود التغطية بأمانة.

## 🚨 الأمانة العلمية والتنظيم:
- اقتبس فقط النص العربي الذي أعادته الأداة حرفياً، وارفق اسم الكتاب والباب ومعرف السجل (occurrence_id) إن توفر. حافظ على تسمية رقم المصدر المحلي، ولا تحوله إلى رقم طبعة مشهورة.
- لا تنقل حديثاً من الذاكرة دون استرجاع. لا تستخرج رتب الرواة ولا ترسم أسانيد في هذا المسار.
- نظم الرد في أربعة أجزاء واضحة:
  (1) سؤال إنساني تمهيدي
  (2) شاهد أو شاهدان بنصهما ومصدرهما من الأداة
  (3) معنى تعريفي مبسط موسوم «تلخيص أولي يحتاج مراجعة» دون فتوى أو ادعاء سياق تاريخي
  (4) مسودة المادة بالشكل الذي اختاره المستخدم (بطاقة / حوار / كلمة) مع المصادر وحدود التغطية
- بيّن حالة المراجعة بوضوح: المحتوى التعليمي والتلخيص هو مسودة استرشادية قيد المراجعة والاعتماد العلمي (review_status: needs_review).
- اختم بسؤال متابعة واحد يساعد المعرّف على اختيار الجمهور أو مستوى التبسيط.
"""

def patch_corpus_search(code: str) -> str:
    if "_resolve_all_paths" in code:
        return code
    # Insert _resolve_path and _resolve_all_paths before def __init__
    insert_code = RESOLVER_METHOD_CODE + '''
    def _resolve_all_paths(self):
        self.valves.DB_PATH = self._resolve_path(
            "HADITH_DB_PATH",
            self.valves.DB_PATH,
            [
                "hadith_rijal.db",
                "hadith/hadith_rijal.db",
                "open-webui/hadith_rijal.db",
                "backend/data/hadith_rijal.db",
                "data/hadith_rijal.db"
            ]
        )
        self.valves.SEARCH_INDEX_PATH = self._resolve_path(
            "HADITH_SEARCH_INDEX_PATH",
            self.valves.SEARCH_INDEX_PATH,
            [
                "poc/phrase_search/search_index.sqlite",
                "hadith/poc/phrase_search/search_index.sqlite",
                "search_index.sqlite",
                "backend/data/search_index.sqlite",
                "data/search_index.sqlite"
            ]
        )
        self.valves.ITQAN_DATA_DIR = self._resolve_path(
            "HADITH_ITQAN_DIR",
            self.valves.ITQAN_DATA_DIR,
            [
                "itqan-repo/app/data",
                "../itqan-repo/app/data",
                "data",
                "/app/backend/data"
            ]
        )
'''
    code = code.replace("    def __init__(self):\n        self.valves = self.Valves()",
                        insert_code + "\n    def __init__(self):\n        self.valves = self.Valves()\n        self._resolve_all_paths()")
    # Call _resolve_all_paths at start of search_hadith_corpus, get_hadith_by_number, get_hadith_connections
    code = code.replace('    def search_hadith_corpus(self, query: str, book: str = "all", limit: int = 5) -> str:\n        """',
                        '    def search_hadith_corpus(self, query: str, book: str = "all", limit: int = 5) -> str:\n        """\n        self._resolve_all_paths()')
    code = code.replace('    def get_hadith_by_number(self, book: str = "", hadith_number: int = 0, language: str = "ar", occurrence_id: str = "", chapter: int = 0) -> str:\n        """',
                        '    def get_hadith_by_number(self, book: str = "", hadith_number: int = 0, language: str = "ar", occurrence_id: str = "", chapter: int = 0) -> str:\n        """\n        self._resolve_all_paths()')
    code = code.replace('    def get_hadith_connections(self, hadith_id: str, limit: int = 10) -> str:\n        """',
                        '    def get_hadith_connections(self, hadith_id: str, limit: int = 10) -> str:\n        """\n        self._resolve_all_paths()')
    return code

def patch_bayan_topics(code: str) -> str:
    if "_resolve_all_paths" in code:
        return code
    insert_code = RESOLVER_METHOD_CODE + '''
    def _resolve_all_paths(self):
        self.valves.TAXONOMY_PATH = self._resolve_path(
            "HADITH_TAXONOMY_PATH",
            self.valves.TAXONOMY_PATH,
            [
                "planning/islam_topic_taxonomy_v1.json",
                "hadith/planning/islam_topic_taxonomy_v1.json",
                "open-webui/hadith/planning/islam_topic_taxonomy_v1.json",
                "backend/data/islam_topic_taxonomy_v1.json",
                "islam_topic_taxonomy_v1.json"
            ]
        )
        self.valves.LESSON_PACKS_PATH = self._resolve_path(
            "HADITH_LESSON_PACKS_PATH",
            self.valves.LESSON_PACKS_PATH,
            [
                "planning/bayan_lesson_packs_v1.json",
                "hadith/planning/bayan_lesson_packs_v1.json",
                "open-webui/hadith/planning/bayan_lesson_packs_v1.json",
                "backend/data/bayan_lesson_packs_v1.json",
                "bayan_lesson_packs_v1.json"
            ]
        )
'''
    code = code.replace("    def __init__(self):\n        self.valves = self.Valves()",
                        insert_code + "\n    def __init__(self):\n        self.valves = self.Valves()\n        self._resolve_all_paths()")
    code = code.replace("    def _load_data(self):",
                        "    def _load_data(self):\n        self._resolve_all_paths()")
    return code

def patch_isnad_tree(code: str) -> str:
    if "_resolve_all_paths" in code:
        return code
    insert_code = RESOLVER_METHOD_CODE + '''
    def _resolve_all_paths(self):
        self.valves.DB_PATH = self._resolve_path(
            "HADITH_DB_PATH",
            self.valves.DB_PATH,
            [
                "hadith_rijal.db",
                "hadith/hadith_rijal.db",
                "open-webui/hadith_rijal.db",
                "backend/data/hadith_rijal.db",
                "data/hadith_rijal.db"
            ]
        )
        self.valves.SEARCH_INDEX_PATH = self._resolve_path(
            "HADITH_SEARCH_INDEX_PATH",
            self.valves.SEARCH_INDEX_PATH,
            [
                "poc/phrase_search/search_index.sqlite",
                "hadith/poc/phrase_search/search_index.sqlite",
                "search_index.sqlite",
                "backend/data/search_index.sqlite",
                "data/search_index.sqlite"
            ]
        )
'''
    code = code.replace("    def __init__(self):\n        self.valves = self.Valves()",
                        insert_code + "\n    def __init__(self):\n        self.valves = self.Valves()\n        self._resolve_all_paths()")
    code = code.replace('    def generate_isnad_mermaid(self, query: str = "", book: str = "bukhari", hadith_number: int = 1, occurrence_id: str = "") -> str:\n        """',
                        '    def generate_isnad_mermaid(self, query: str = "", book: str = "bukhari", hadith_number: int = 1, occurrence_id: str = "") -> str:\n        """\n        self._resolve_all_paths()')
    return code

def patch_narrator(code: str) -> str:
    if "_resolve_all_paths" in code:
        return code
    insert_code = RESOLVER_METHOD_CODE + '''
    def _resolve_all_paths(self):
        self.valves.DB_PATH = self._resolve_path(
            "HADITH_DB_PATH",
            self.valves.DB_PATH,
            [
                "hadith_rijal.db",
                "hadith/hadith_rijal.db",
                "open-webui/hadith_rijal.db",
                "backend/data/hadith_rijal.db",
                "data/hadith_rijal.db"
            ]
        )
'''
    code = code.replace("    def __init__(self):\n        self.valves = self.Valves()",
                        insert_code + "\n    def __init__(self):\n        self.valves = self.Valves()\n        self._resolve_all_paths()")
    code = code.replace("    def _load_rijal_cache(self):",
                        "    def _load_rijal_cache(self):\n        self._resolve_all_paths()")
    return code

def patch_sharh_vocab(code: str) -> str:
    if "_resolve_all_paths" in code:
        return code
    insert_code = RESOLVER_METHOD_CODE + '''
    def _resolve_all_paths(self):
        self.valves.DB_PATH = self._resolve_path(
            "HADITH_DB_PATH",
            self.valves.DB_PATH,
            [
                "hadith_rijal.db",
                "hadith/hadith_rijal.db",
                "open-webui/hadith_rijal.db",
                "backend/data/hadith_rijal.db",
                "data/hadith_rijal.db"
            ]
        )
        self.valves.SEARCH_INDEX_PATH = self._resolve_path(
            "HADITH_SEARCH_INDEX_PATH",
            self.valves.SEARCH_INDEX_PATH,
            [
                "poc/phrase_search/search_index.sqlite",
                "hadith/poc/phrase_search/search_index.sqlite",
                "search_index.sqlite",
                "backend/data/search_index.sqlite",
                "data/search_index.sqlite"
            ]
        )
'''
    code = code.replace("    def __init__(self):\n        self.valves = self.Valves()",
                        insert_code + "\n    def __init__(self):\n        self.valves = self.Valves()\n        self._resolve_all_paths()")
    code = code.replace('    def get_hadith_explanation(self, hadith_id: int = 1, book: str = "bukhari", hadith_number: int = 1, occurrence_id: str = "") -> str:\n        """',
                        '    def get_hadith_explanation(self, hadith_id: int = 1, book: str = "bukhari", hadith_number: int = 1, occurrence_id: str = "") -> str:\n        """\n        self._resolve_all_paths()')
    code = code.replace('    def lookup_gharib_word(self, word: str) -> str:\n        """',
                        '    def lookup_gharib_word(self, word: str) -> str:\n        """\n        self._resolve_all_paths()')
    code = code.replace('    def lookup_root_lexicon(self, root: str) -> str:\n        """',
                        '    def lookup_root_lexicon(self, root: str) -> str:\n        """\n        self._resolve_all_paths()')
    return code

def main():
    print("=== Step 1: Patching Python Tool Sources for Dynamic Path Resolution ===")
    tools_info = [
        ("hadith_corpus_search_tool.py", patch_corpus_search),
        ("hadith_bayan_topics_tool.py", patch_bayan_topics),
        ("hadith_isnad_tree_tool.py", patch_isnad_tree),
        ("hadith_narrator_tool.py", patch_narrator),
        ("hadith_sharh_vocab_tool.py", patch_sharh_vocab),
    ]

    base_dirs = [
        r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\open-webui\hadith\tools",
        r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\tools"
    ]

    for fname, patch_fn in tools_info:
        for bdir in base_dirs:
            fpath = os.path.join(bdir, fname)
            if os.path.exists(fpath):
                with open(fpath, "r", encoding="utf-8") as f:
                    content = f.read()
                new_content = patch_fn(content)
                with open(fpath, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"  [PATCHED] {fpath}")

    # Step 2: Update JSON manifests for all 6 tools
    print("\n=== Step 2: Updating Tool JSON Manifests and Building hadith_tools_vps_export.json ===")
    all_tool_ids = [
        "hadith_corpus_search",
        "hadith_takhrij",
        "hadith_sharh_vocab",
        "hadith_isnad_tree",
        "hadith_narrator",
        "hadith_bayan_topics"
    ]

    tools_export_list = []
    tools_src_dir = r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\open-webui\hadith\tools"

    for tid in all_tool_ids:
        json_path = os.path.join(tools_src_dir, f"{tid}.json")
        py_path = os.path.join(tools_src_dir, f"{tid}_tool.py")
        if not os.path.exists(json_path) or not os.path.exists(py_path):
            print(f"  [ERROR] Missing tool file for {tid}")
            continue

        with open(json_path, "r", encoding="utf-8") as f:
            manifest = json.load(f)
        with open(py_path, "r", encoding="utf-8") as f:
            py_code = f.read()

        manifest["content"] = py_code

        # Save back to JSON in both tool directories
        for bdir in base_dirs:
            target_json = os.path.join(bdir, f"{tid}.json")
            with open(target_json, "w", encoding="utf-8") as f:
                json.dump(manifest, f, ensure_ascii=False, indent=2)

        # Build clean export object for Open WebUI import
        tools_export_list.append({
            "id": manifest.get("id", tid),
            "name": manifest.get("name", tid),
            "meta": manifest.get("meta", {}),
            "specs": manifest.get("specs", []),
            "content": py_code
        })
        print(f"  [SYNCED] {tid}")

    # Write hadith_tools_vps_export.json
    exports_dirs = [
        r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\open-webui\hadith\exports",
        r"c:\Users\mhdal\OneDrive\AI\Hadith KSA"
    ]
    for edir in exports_dirs:
        os.makedirs(edir, exist_ok=True)
        out_path = os.path.join(edir, "hadith_tools_vps_export.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(tools_export_list, f, ensure_ascii=False, indent=2)
        print(f"  [EXPORTED] {out_path} ({len(tools_export_list)} tools)")

    # Step 3: Register/Update tools in webui.db
    print("\n=== Step 3: Updating Tools in webui.db ===")
    conn = sqlite3.connect(WEBUI_DB_PATH)
    cur = conn.cursor()
    now = int(time.time())

    for tool in tools_export_list:
        tid = tool["id"]
        tname = tool["name"]
        tcontent = tool["content"]
        tspecs = json.dumps(tool["specs"], ensure_ascii=False)
        tmeta = json.dumps(tool["meta"], ensure_ascii=False)

        cur.execute("SELECT id FROM tool WHERE id = ?", (tid,))
        if cur.fetchone():
            cur.execute("""
                UPDATE tool
                SET name = ?, content = ?, specs = ?, meta = ?, updated_at = ?
                WHERE id = ?
            """, (tname, tcontent, tspecs, tmeta, now, tid))
            print(f"  [DB UPDATED] Tool: {tid}")
        else:
            cur.execute("""
                INSERT INTO tool (id, user_id, name, content, specs, meta, updated_at, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (tid, USER_ID, tname, tcontent, tspecs, tmeta, now, now))
            print(f"  [DB CREATED] Tool: {tid}")

    # Step 4: Update models in webui.db
    print("\n=== Step 4: Wiring Models with Tools & Skills in webui.db ===")
    
    # 4.1 Update hadith-islam-guide
    cur.execute("SELECT params, meta FROM model WHERE id = 'hadith-islam-guide'")
    row = cur.fetchone()
    if row:
        ig_params = json.loads(row[0] or '{}')
        ig_meta = json.loads(row[1] or '{}')
    else:
        ig_params = {}
        ig_meta = {}

    ig_params["system"] = ISLAM_GUIDE_PROMPT_V2
    ig_params["function_calling"] = "native"
    ig_params["temperature"] = 0.2

    ig_tools = ["hadith_bayan_topics", "hadith_corpus_search"]
    ig_skills = ["hadith-islam-guide", "hadith-search-record"]

    ig_meta["toolIds"] = ig_tools
    ig_meta["tools"] = ig_tools
    ig_meta["tool_ids"] = ig_tools
    ig_meta["skillIds"] = ig_skills
    ig_meta["skill_ids"] = ig_skills
    ig_meta["description"] = "دليل المعرّف بالإسلام لمشروع بيان السُّنّة. يستعرض المحاور الستة والدروس والشواهد المعتمدة بأداة hadith_bayan_topics وأداة البحث المتني."

    cur.execute("""
        UPDATE model
        SET params = ?, meta = ?, updated_at = ?
        WHERE id = 'hadith-islam-guide'
    """, (json.dumps(ig_params, ensure_ascii=False), json.dumps(ig_meta, ensure_ascii=False), now))
    print("  [DB UPDATED] Model: hadith-islam-guide (wired hadith_bayan_topics + hadith_corpus_search + skills)")

    # 4.2 Update bayan-unified-pilot
    cur.execute("SELECT params, meta FROM model WHERE id = 'bayan-unified-pilot'")
    row = cur.fetchone()
    if row:
        b_meta = json.loads(row[1] or '{}')
        b_meta["toolIds"] = all_tool_ids
        b_meta["tools"] = all_tool_ids
        b_meta["tool_ids"] = all_tool_ids
        all_skills = [
            "hadith-search-record",
            "hadith-takhrij-compare",
            "hadith-sharh-scholar",
            "hadith-rijal-critic",
            "hadith-mermaid-architect",
            "hadith-islam-guide",
            "hadith-bayan-maestro"
        ]
        b_meta["skillIds"] = all_skills
        b_meta["skill_ids"] = all_skills
        cur.execute("""
            UPDATE model
            SET meta = ?, updated_at = ?
            WHERE id = 'bayan-unified-pilot'
        """, (json.dumps(b_meta, ensure_ascii=False), now))
        print("  [DB UPDATED] Model: bayan-unified-pilot (all 6 tools + all 7 skills)")

    # 4.3 Update other models to have proper skills
    model_skill_map = {
        "hadith-modular-agent": ["hadith-search-record", "hadith-takhrij-compare", "hadith-sharh-scholar", "hadith-rijal-critic", "hadith-mermaid-architect"],
        "hadith-rijal-agent": ["hadith-rijal-critic", "hadith-mermaid-architect", "hadith-search-record"],
        "hadith-mermaid-agent": ["hadith-mermaid-architect", "hadith-rijal-critic", "hadith-search-record"],
        "hadith-sharh-agent": ["hadith-sharh-scholar", "hadith-search-record"],
        "hadith-model-1": ["hadith-search-record", "hadith-takhrij-compare", "hadith-sharh-scholar"]
    }
    for mid, sk_list in model_skill_map.items():
        cur.execute("SELECT meta FROM model WHERE id = ?", (mid,))
        mrow = cur.fetchone()
        if mrow:
            mm = json.loads(mrow[0] or '{}')
            mm["skillIds"] = sk_list
            mm["skill_ids"] = sk_list
            cur.execute("UPDATE model SET meta = ?, updated_at = ? WHERE id = ?", (json.dumps(mm, ensure_ascii=False), now, mid))
            print(f"  [DB UPDATED] Model: {mid} skills")

    conn.commit()

    # Step 5: Re-export models and skills for VPS
    print("\n=== Step 5: Re-exporting Models & Skills for VPS ===")
    cur.execute("SELECT id, name, base_model_id, params, meta, is_active FROM model WHERE id LIKE 'hadith%' OR id LIKE 'bayan%'")
    exported_models = []
    for r in cur.fetchall():
        exported_models.append({
            "id": r[0],
            "name": r[1],
            "base_model_id": r[2],
            "params": json.loads(r[3]) if r[3] else {},
            "meta": json.loads(r[4]) if r[4] else {},
            "is_active": bool(r[5])
        })

    cur.execute("SELECT id, name, description, content, meta, is_active FROM skill")
    exported_skills = []
    for r in cur.fetchall():
        exported_skills.append({
            "id": r[0],
            "name": r[1],
            "description": r[2],
            "content": r[3],
            "meta": json.loads(r[4]) if r[4] else {},
            "is_active": bool(r[5])
        })

    for edir in exports_dirs:
        m_path = os.path.join(edir, "hadith_models_vps_export.json")
        s_path = os.path.join(edir, "hadith_skills_vps_export.json")
        with open(m_path, "w", encoding="utf-8") as f:
            json.dump(exported_models, f, ensure_ascii=False, indent=2)
        with open(s_path, "w", encoding="utf-8") as f:
            json.dump(exported_skills, f, ensure_ascii=False, indent=2)
        print(f"  [SAVED] {m_path} ({len(exported_models)} models)")
        print(f"  [SAVED] {s_path} ({len(exported_skills)} skills)")

    conn.close()
    print("\n=== SUCCESS: All tools, models, skills and VPS export bundles synchronized! ===")

if __name__ == "__main__":
    main()
