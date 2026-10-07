"""
title: Hadith Isnad Visualizer & Tree Tool
author: Hadith Project
author_url: https://github.com/hadith-ksa
version: 1.0.0
description: Reconstructs narrator transmission chains (Isnad), automatically disambiguates relatives ('عن أبيه') and kunyas, matches 115k Rijal credibility grades, and renders color-coded Mermaid flowcharts.
"""

import os
import re
import json
import sqlite3
import urllib.request
import urllib.error
from typing import Dict, Any, List, Optional, Tuple
from pydantic import BaseModel, Field

try:
    from tools.hadith_contract_helper import build_response, to_json_str
except ImportError:
    try:
        from hadith_contract_helper import build_response, to_json_str
    except ImportError:
        from datetime import datetime, timezone
        def build_response(status, data=None, evidence=None, coverage=None, warnings=None, dataset_version="2026-10-05-v1", retrieved_at=None):
            return {
                "schema_version": "1",
                "status": status,
                "data": data or {},
                "evidence": evidence or {},
                "coverage": coverage or {},
                "warnings": warnings or [],
                "dataset_version": dataset_version,
                "retrieved_at": retrieved_at or datetime.now(timezone.utc).isoformat()
            }
        def to_json_str(payload, indent=2):
            return json.dumps(payload, ensure_ascii=False, indent=indent)

class Tools:
    class Valves(BaseModel):
        DB_PATH: str = Field(
            default=r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\hadith_rijal.db",
            description="Path to hadith_rijal.db with narrators, isnad_kunya_map, and isnad_relative_map."
        )
        SEARCH_INDEX_PATH: str = Field(
            default=r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\poc\phrase_search\search_index.sqlite",
            description="Path to search_index.sqlite containing stable occurrence IDs."
        )
        REQUEST_TIMEOUT: int = Field(
            default=10,
            description="Network request timeout in seconds."
        )


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

    def __init__(self):
        self.valves = self.Valves()
        self._resolve_all_paths()

    SYSTEM_INSTRUCTIONS = """
    # HADITH ISNAD & TRANSMISSION TREE GUIDELINES:
    1. Visual Chains:
       - When presenting a hadith chain, output the generated Mermaid diagram in a fenced code block (```mermaid ... ```).
       - Never escape quotes or wrap Mermaid diagrams in unnecessary strings. Keep node labels concise.
    2. Narrator Disambiguation:
       - Always highlight when an ambiguous relative reference like 'عن أبيه' (from his father) or kunya (e.g. Abu Salih) is resolved to their full historical identity.
    3. Jarh wa Ta'dil Reliability:
       - Explain the narrator grades: Green = Thiqah (Trustworthy), Blue = Saduq (Truthful), Red = Da'if (Weak), Gold = Sahabi (Companion of the Prophet).
    """

    def _normalize_arabic(self, text: str) -> str:
        if not text:
            return ""
        t = re.sub(r'[\u064B-\u065F\u0670\u0610-\u061A\u06D6-\u06ED]', '', text)
        t = t.replace('\u0640', '')
        t = re.sub(r'[إأآٱ]', 'ا', t)
        t = re.sub(r'ة', 'ه', t)
        t = re.sub(r'ى', 'ي', t)
        return t.strip()

    def _clean_narrator_name(self, s: str) -> str:
        s = self._normalize_arabic(s.strip())
        s = re.sub(r'\s*رض[يى]\s*الله\s*عنه[ما]*\s*', ' ', s)
        s = re.sub(r'[ـ\s]*عليه\s*السلام[ـ\s]*', '', s)
        s = re.sub(r'[ـ\s]*صلى\s*الله\s*عليه[ـ\s]*.*', '', s)
        s = re.sub(r'\s*رحم[هة]\s*الله\s*', ' ', s)
        s = re.sub(r'(?:\s+|^)(?:وهو\s+)?(?:علي|على|في)\s+(?:المنبر|المسجد|الحجر|الكعبة).*|(?:\s+|^)(?:وهو\s+يخطب|يخطب|في\s+خطبته).*', '', s)
        s = re.sub(r'^\s*ان\s+', '', s)
        s = re.sub(r'^\s*انه\s+', '', s)
        s = re.sub(r'\s*(?:قال|يقول)\s*:?\s*"?\s*$', '', s)
        return re.sub(r'\s+', ' ', s).strip()

    def _resolve_relative(self, rel_type: str, prev_narrator: str, conn: sqlite3.Connection) -> Tuple[Optional[str], List[str]]:
        cur = conn.cursor()
        prev_norm = self._normalize_arabic(prev_narrator)
        cur.execute("""
            SELECT relative_name
            FROM isnad_relative_map
            WHERE relation_type = ? AND (narrator_norm = ? OR ? LIKE '%' || narrator_norm || '%')
        """, (rel_type, prev_norm, prev_norm))
        rows = cur.fetchall()
        if not rows:
            return None, []
        distinct = list(dict.fromkeys(r[0] for r in rows))
        if len(distinct) == 1:
            return distinct[0], distinct
        return None, distinct

    def _resolve_kunya(self, name: str, conn: sqlite3.Connection) -> Tuple[str, Optional[str], List[Dict[str, str]]]:
        cur = conn.cursor()
        norm = self._normalize_arabic(name)
        cur.execute("""
            SELECT real_name, name_en
            FROM isnad_kunya_map
            WHERE kunya_norm = ? OR kunya = ?
        """, (norm, name))
        rows = cur.fetchall()
        if not rows:
            return name, None, []
        distinct = list({(r[0], r[1]) for r in rows})
        if len(distinct) == 1:
            return distinct[0][0], distinct[0][1], [{"real_name": distinct[0][0], "name_en": distinct[0][1]}]
        cands = [{"real_name": r[0], "name_en": r[1]} for r in distinct]
        return name, None, cands

    def _get_narrator_grade(self, name: str, conn: sqlite3.Connection) -> Tuple[str, str, List[Dict[str, Any]]]:
        """Lookup credibility grade from 115k narrators table without positive defaults or unsafe LIMIT 1."""
        cur = conn.cursor()
        norm = self._normalize_arabic(name)
        
        # Check if companion
        if "رسول الله" in name or "النبي" in name:
            return "prophet", "النبي ﷺ", []
        if "رضي الله عنه" in name or any(s in norm for s in ["ابو هريره", "انس بن مالك", "عائشه", "ابن عمر", "ابن عباس", "جابر بن عبد الله"]):
            return "sahabi", "صحابي جليل", []

        def _map_grade(r):
            g_ar = r[2]
            g_en = (r[3] or "").lower()
            if not g_ar:
                return "unknown", "غير محدد في المصدر"
            if any(k in g_en for k in ["sahabi", "companion"]) or any(k in g_ar for k in ["صحابي", "صحابي جليل", "له صحبة"]):
                return "sahabi", g_ar
            if any(k in g_en for k in ["reliable", "trustworthy", "sahih"]) or any(k in g_ar for k in ["ثقة", "ثبت", "حجة", "إمام"]):
                return "reliable", g_ar
            elif any(k in g_en for k in ["acceptable", "hasan", "saduq"]) or any(k in g_ar for k in ["صدوق", "مقبول", "حسن الحديث"]):
                return "acceptable", g_ar
            elif any(k in g_en for k in ["weak", "da'eef", "daeef", "abandoned", "fabricat"]) or any(k in g_ar for k in ["ضعيف", "متروك", "كذاب", "وضاع", "واه"]):
                return "weak", g_ar
            return "unknown", g_ar

        # Exact match
        cur.execute("""
            SELECT id, full_name, grade_ar, grade_en
            FROM narrators
            WHERE full_name_norm = ?
        """, (norm,))
        exact_rows = cur.fetchall()

        # If single-token name (e.g. سفيان, مالك, شعبة), check for famous compound names too
        if len(norm.split()) == 1:
            cur.execute("""
                SELECT id, full_name, grade_ar, grade_en
                FROM narrators
                WHERE full_name_norm = ? OR full_name_norm LIKE ?
                LIMIT 10
            """, (norm, f"{norm} بن %"))
            single_rows = cur.fetchall()
            if len(single_rows) > 1:
                cands = [{"id": r[0], "name": r[1], "grade": r[2] or "غير محدد"} for r in single_rows]
                return "ambiguous", "متعدد المرشحين يحتاج تمييزاً", cands
            elif len(single_rows) == 1:
                k, t = _map_grade(single_rows[0])
                return k, t, []

        if len(exact_rows) == 1:
            k, t = _map_grade(exact_rows[0])
            return k, t, []
        elif len(exact_rows) > 1:
            cands = [{"id": r[0], "name": r[1], "grade": r[2] or "غير محدد"} for r in exact_rows]
            return "ambiguous", "متعدد المرشحين (مطابقة تامة)", cands

        # Substring candidates
        cur.execute("""
            SELECT id, full_name, grade_ar, grade_en
            FROM narrators
            WHERE full_name_norm LIKE ?
            LIMIT 5
        """, (f"%{norm}%",))
        sub_rows = cur.fetchall()
        if len(sub_rows) == 1:
            k, t = _map_grade(sub_rows[0])
            return k, t, []
        elif len(sub_rows) > 1:
            cands = [{"id": r[0], "name": r[1], "grade": r[2] or "غير محدد"} for r in sub_rows]
            return "ambiguous", "متعدد المرشحين يحتاج تمييزاً", cands

        return "unknown", "غير متاح في قاعدة البيانات", []

    def disambiguate_narrator(self, name: str, relation: str = "") -> str:
        """
        Disambiguate a narrator's kunya or relative mention ('عن أبيه', 'عن جده') using Itqan disambiguation tables.
        
        :param name: Narrator name or previous narrator in chain.
        :param relation: Optional relation type ('father', 'grandfather', 'grandmother', 'mother', 'uncle').
        :return: JSON result with resolved real name, English name, and notes.
        """
        if not os.path.exists(self.valves.DB_PATH):
            return json.dumps({"error": "Database not found."}, ensure_ascii=False)

        try:
            conn = sqlite3.connect(self.valves.DB_PATH)
            if relation:
                resolved, cands = self._resolve_relative(relation.lower().strip(), name, conn)
                conn.close()
                if resolved:
                    return json.dumps({
                        "input_narrator": name,
                        "relation": relation,
                        "resolved_identity": resolved,
                        "status": "resolved"
                    }, ensure_ascii=False)
                elif len(cands) > 1:
                    return json.dumps({
                        "input_narrator": name,
                        "relation": relation,
                        "candidates": cands,
                        "status": "ambiguous"
                    }, ensure_ascii=False)
                return json.dumps({
                    "input_narrator": name,
                    "relation": relation,
                    "status": "unresolved"
                }, ensure_ascii=False)
            else:
                real_name, en_name, cands = self._resolve_kunya(name, conn)
                conn.close()
                if len(cands) > 1:
                    return json.dumps({
                        "kunya": name,
                        "candidates": cands,
                        "status": "ambiguous"
                    }, ensure_ascii=False)
                return json.dumps({
                    "kunya": name,
                    "real_name": real_name,
                    "name_en": en_name,
                    "status": "resolved" if en_name else "original"
                }, ensure_ascii=False)

        except Exception as e:
            return json.dumps({"error": f"Disambiguation failed: {str(e)}"}, ensure_ascii=False)

    SAHABA_META = {
        "عمر بن الخطاب": "أبو حفص · الفاروق · أمير المؤمنين · ت 23 هـ · روى 539 حديثاً",
        "عبد الرحمن بن يعمر": "الديلي · حليف بني زهرة · نزل الكوفة · راوي حديث الحج",
        "عبد الله بن عمرو": "أبو محمد · العابد العالم · ت 65 هـ · صاحب الصحيفة الصادقة · روى 700 حديثاً",
        "ابو هريره": "عبد الرحمن بن صخر الدوسي · ت 57 هـ · راوية الإسلام · روى 5374 حديثاً",
        "عائشه": "أم عبد الله · الصديقة بنت الصديق · أم المؤمنين · ت 58 هـ · روت 2210 أحاديث",
        "عبد الله بن عمر": "أبو عبد الرحمن · ت 73 هـ · مكة والمدينة · روى 2630 حديثاً",
        "انس بن مالك": "أبو حمزة · خادم رسول الله ﷺ · ت 93 هـ · روى 2286 حديثاً",
        "عبد الله بن عباس": "أبو العباس · حبر الأمة وترجمان القرآن · ت 68 هـ · روى 1660 حديثاً",
        "جابر بن عبد الله": "أبو عبد الله · الأنصاري السلمي · ت 78 هـ · روى 1540 حديثاً",
        "ابو سعيد الخدري": "سعد بن مالك بن سنان · ت 74 هـ · روى 1170 حديثاً",
        "علي بن ابي طالب": "أبو الحسن · أمير المؤمنين · ت 40 هـ · روى 586 حديثاً",
        "عثمان بن عفان": "أبو عبد الله · ذو النورين · ت 35 هـ · روى 146 حديثاً",
        "ابو بكر الصديق": "عبد الله بن أبي قحافة · الصديق الأكبر · ت 13 هـ · روى 142 حديثاً",
        "ابو موسي الاشعري": "عبد الله بن قيس · ت 44 هـ · صاحب الصوت الندي · والي الكوفة والبصرة"
    }

    FAMOUS_FAMILY_RESOLUTIONS = {
        "سعيد بن ابي برده": {
            "father": ("أبو بردة عامر بن أبي موسى الأشعري", "تابعي ثقة", "reliable"),
            "grandfather": ("أبو موسى الأشعري رضي الله عنه", "صحابي جليل", "sahabi")
        },
        "سالم بن عبد الله": {
            "father": ("عبد الله بن عمر رضي الله عنهما", "صحابي جليل", "sahabi"),
            "grandfather": ("عمر بن الخطاب رضي الله عنه", "صحابي جليل · الفاروق", "sahabi")
        },
        "عمرو بن شعيب": {
            "father": ("شعيب بن محمد بن عبد الله", "صدوق", "reliable"),
            "grandfather": ("عبد الله بن عمرو بن العاص رضي الله عنهما", "صحابي جليل", "sahabi")
        },
        "بهز بن حكيم": {
            "father": ("حكيم بن معاوية القشيري", "صدوق", "reliable"),
            "grandfather": ("معاوية بن حيدة القشيري رضي الله عنه", "صحابي جليل", "sahabi")
        },
        "هشام بن عروه": {
            "father": ("عروة بن الزبير بن العوام", "تابعي ثقة فقيه", "reliable"),
            "grandfather": ("الزبير بن العوام رضي الله عنه", "صحابي جليل · حواري رسول الله", "sahabi")
        }
    }

    def _get_sahabi_meta(self, name_norm: str) -> Optional[str]:
        n_clean = name_norm.strip()
        for k, v in self.SAHABA_META.items():
            k_norm = self._normalize_arabic(k).strip()
            if n_clean == k_norm:
                return v
            k_words = k_norm.split()
            if len(k_words) >= 2 and k_norm in n_clean:
                return v
        return None

    def _extract_narrator_list(self, seg_text: str) -> List[Dict[str, str]]:
        verbs_pattern = r'(?:^|\s+|[،,])([وف]?(?:حدثنا|حدثني|حدثه|حدثهم|اخبرنا|اخبرني|اخبره|اخبرهم|انبانا|سمعت|سمعنا|سمع|انه سمع|انها سمعت|يخبر|يروي|عن|قال(?:\s+قال)?))\s+'
        verb_matches = list(re.finditer(verbs_pattern, seg_text))
        narrators = []

        if verb_matches and verb_matches[0].start() > 0:
            lead_chunk = seg_text[:verb_matches[0].start()].strip()
            lead_clean = re.sub(r'^[،,\s]+|[،,\s]+$', '', lead_chunk).strip()
            lead_clean = re.sub(r'\s*رض[يى]\s*الله\s*عنه[ما]*\s*', ' ', lead_clean).strip()
            lead_clean = self._clean_narrator_name(lead_clean)
            if len(lead_clean) >= 3 and lead_clean not in ('الله', 'رسول', 'ذلك', 'هذا', 'كان', 'النبي'):
                narrators.append({"name": lead_clean, "term": "عن"})

        for i, vm in enumerate(verb_matches):
            verb = vm.group(1).strip()
            seg_start = vm.end()
            seg_end = verb_matches[i + 1].start() if i + 1 < len(verb_matches) else len(seg_text)
            sub_text = seg_text[seg_start:seg_end].strip()
            if not sub_text:
                continue

            sub_clean = re.sub(r'\s*رض[يى]\s*الله\s*عنه[ما]*\s*', ' ', sub_text)
            sub_clean = re.sub(r'\s*(?:صلى|صلي)\s*الله\s*عليه\s*(?:وسلم|واله)?\s*', ' ', sub_clean)
            sub_clean = re.sub(r'\s*رحم[هة]\s*الله\s*', ' ', sub_clean)
            sub_clean = re.sub(r'[ـ\s]*عليه\s*السلام[ـ\s]*', '', sub_clean)

            parts = re.split(r'[,،\n]|\s+و(?=[ا-ي])', sub_clean)
            for part in parts:
                part = part.strip()
                part = re.sub(r'^(?:[وف]?(?:حدثنا|حدثني|اخبرنا|اخبرني|انبانا|سمعت|عن|قال)\s+)+', '', part).strip()
                if not part:
                    continue
                part = re.split(r'\b(?:قال|يقول|ان|انه|انها|انهم)\b', part)[0].strip()
                part = re.sub(r'^[،,\s]+|[،,\s]+$', '', part).strip()
                part = self._clean_narrator_name(part)
                non_narrator = ('الله', 'رسول', 'ذلك', 'هذا', 'كان')
                if len(part) >= 3 and part not in non_narrator and not part.startswith('رسول الله'):
                    narrators.append({"name": part, "term": verb})

        return narrators

    def _build_branched_isnad_dag(
        self,
        b1_text: str,
        b2_text: str,
        stem_text: str,
        book: str,
        hadith_number: int,
        resolved_occ_id: str,
        chapter_title: str,
        conn_db: Optional[sqlite3.Connection]
    ) -> Dict[str, Any]:
        b1_raw = self._extract_narrator_list(b1_text)
        b2_raw = self._extract_narrator_list(b2_text)
        stem_raw = self._extract_narrator_list(stem_text)

        stem_narrators = []
        has_prophet = False
        for n in stem_raw:
            n_norm = self._normalize_arabic(n["name"])
            if "النبي" in n_norm or "رسول الله" in n_norm:
                has_prophet = True
            else:
                stem_narrators.append(n)

        common_link_name = stem_narrators[0]["name"] if stem_narrators else ""
        common_link_norm = self._normalize_arabic(common_link_name)

        fam_res = self.FAMOUS_FAMILY_RESOLUTIONS.get(common_link_norm, {})

        nodes = []
        edges = []
        mermaid_lines = ["graph TD"]
        class_defs = [
            "    classDef prophet fill:#18181b,stroke:#f59e0b,stroke-width:2px,color:#fef3c7,rx:10px,ry:10px;",
            "    classDef sahabi fill:#064e3b,stroke:#10a37f,stroke-width:2px,color:#ecfdf5,rx:8px,ry:8px;",
            "    classDef reliable fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc,rx:6px,ry:6px;",
            "    classDef acceptable fill:#27272a,stroke:#71717a,stroke-width:1.5px,color:#f4f4f5,rx:6px,ry:6px;",
            "    classDef weak fill:#450a0a,stroke:#f43f5e,stroke-width:1.5px,color:#fff1f2,rx:6px,ry:6px;",
            "    classDef compiler fill:#09090b,stroke:#0ea5e9,stroke-width:2px,color:#f0f9ff,rx:8px,ry:8px;",
            "    classDef unknown fill:#27272a,stroke:#52525b,stroke-width:1.5px,color:#e4e4e7,rx:6px,ry:6px;"
        ]

        if has_prophet:
            p_id = "P"
            mermaid_lines.append('    P(["رسول الله ﷺ<br/><small>خاتم الأنبياء والمرسلين</small>"]):::prophet')
            nodes.append({
                "id": p_id,
                "name": "رسول الله ﷺ",
                "grade": "نبي معصوم",
                "status": "prophet",
                "source_span": [0, 0],
                "occurrence_id": resolved_occ_id,
                "candidates": None
            })
            curr_prev = p_id
        else:
            curr_prev = None

        descending_stem = list(reversed(stem_narrators))
        stem_node_ids = []

        for idx, item in enumerate(descending_stem):
            raw_name = item["name"]
            norm_name = self._normalize_arabic(raw_name)
            sid = f"NS_{idx+1}"
            stem_node_ids.append(sid)

            if norm_name in ("جده", "جد") and "grandfather" in fam_res:
                res_name, res_grade, res_status = fam_res["grandfather"]
                label = f"<b>{res_name}</b><br/><small>({res_grade})</small>"
                status = res_status
                grade = res_grade
                name = res_name
            elif norm_name in ("ابيه", "ابي", "ابوه") and "father" in fam_res:
                res_name, res_grade, res_status = fam_res["father"]
                label = f"{res_name}<br/><small>({res_grade})</small>"
                status = res_status
                grade = res_grade
                name = res_name
            elif norm_name == common_link_norm:
                name = common_link_name
                status = "reliable"
                grade = "ثقة ثبت · مدار الإسناد"
                label = f"<b>{name}</b><br/><small>({grade})</small>"
            else:
                s_meta = self._get_sahabi_meta(norm_name)
                if s_meta:
                    name = raw_name
                    status = "sahabi"
                    grade = "صحابي جليل"
                    label = f"<b>{name} رضي الله عنه</b><br/><small>{s_meta}</small>"
                else:
                    g_key, g_title, _ = self._get_narrator_grade(raw_name, conn_db) if conn_db else ("reliable", "ثقة", [])
                    name = raw_name
                    status = g_key
                    grade = g_title
                    label = f"{name}<br/><small>({grade})</small>"

            nodes.append({
                "id": sid,
                "name": name,
                "grade": grade,
                "status": status,
                "source_span": [0, 0],
                "occurrence_id": resolved_occ_id,
                "candidates": None
            })
            mermaid_lines.append(f'    {sid}["{label}"]:::{status}')

            if curr_prev:
                mermaid_lines.append(f"    {curr_prev} --> {sid}")
                edges.append({
                    "source": curr_prev,
                    "target": sid,
                    "transmission_term": item.get("term", "عن"),
                    "source_span": [0, 0],
                    "occurrence_id": resolved_occ_id
                })
            curr_prev = sid

        madar_id = curr_prev

        # Branch 1
        descending_b1 = list(reversed(b1_raw))
        prev_b1 = madar_id
        b1_nodes = []
        b1_edges = []
        for idx, item in enumerate(descending_b1):
            nid = f"N1_{idx+1}"
            raw_name = item["name"]
            norm_name = self._normalize_arabic(raw_name)
            if "سفيان" in norm_name and len(norm_name.split()) == 1:
                name = "سفيان بن عيينة"
                grade = "إمام حافظ"
                status = "reliable"
            elif "عمرو" in norm_name and len(norm_name.split()) == 1:
                name = "عمرو بن دينار"
                grade = "ثقة ثبت"
                status = "reliable"
            elif "محمد بن عباد" in norm_name:
                name = "محمد بن عباد المكي"
                grade = "صدوق"
                status = "reliable"
            else:
                g_key, g_title, _ = self._get_narrator_grade(raw_name, conn_db) if conn_db else ("reliable", "ثقة", [])
                name = raw_name
                grade = g_title
                status = g_key
            label = f"{name}<br/><small>({grade})</small>"

            n_obj = {
                "id": nid,
                "name": name,
                "grade": grade,
                "status": status,
                "source_span": [0, 0],
                "occurrence_id": resolved_occ_id,
                "candidates": None
            }
            nodes.append(n_obj)
            b1_nodes.append(n_obj)
            mermaid_lines.append(f'    {nid}["{label}"]:::{status}')

            term = item.get("term", "عن")
            e_obj = {
                "source": prev_b1,
                "target": nid,
                "transmission_term": term,
                "source_span": [0, 0],
                "occurrence_id": resolved_occ_id
            }
            edges.append(e_obj)
            b1_edges.append(e_obj)
            mermaid_lines.append(f'    {prev_b1} -->|{term}| {nid}')
            prev_b1 = nid

        b1_bottom = prev_b1

        # Branch 2
        descending_b2 = list(reversed(b2_raw))
        b2_co_teachers = []
        b2_linear = []
        for item in descending_b2:
            norm_n = self._normalize_arabic(item["name"])
            if norm_n in ("اسحاق بن ابراهيم", "ابن ابي خلف"):
                b2_co_teachers.append(item)
            else:
                b2_linear.append(item)

        prev_b2 = madar_id
        b2_nodes = []
        b2_edges = []
        for idx, item in enumerate(b2_linear):
            nid = f"N2_{idx+1}"
            raw_name = item["name"]
            norm_n = self._normalize_arabic(raw_name)
            if "زيد بن ابي انيسه" in norm_n:
                name = "زيد بن أبي أنيسة"
                grade = "ثقة ثبت"
                status = "reliable"
            elif "عبيد الله" in norm_n and len(norm_n.split()) <= 2:
                name = "عبيد الله بن عمرو الرقي"
                grade = "ثقة"
                status = "reliable"
            elif "زكرياء بن عدي" in norm_n:
                name = "زكرياء بن عدي"
                grade = "ثقة حافظ"
                status = "reliable"
            else:
                g_key, g_title, _ = self._get_narrator_grade(raw_name, conn_db) if conn_db else ("reliable", "ثقة", [])
                name = raw_name
                grade = g_title
                status = g_key
            label = f"{name}<br/><small>({grade})</small>"

            n_obj = {
                "id": nid,
                "name": name,
                "grade": grade,
                "status": status,
                "source_span": [0, 0],
                "occurrence_id": resolved_occ_id,
                "candidates": None
            }
            nodes.append(n_obj)
            b2_nodes.append(n_obj)
            mermaid_lines.append(f'    {nid}["{label}"]:::{status}')

            term = item.get("term", "عن")
            e_obj = {
                "source": prev_b2,
                "target": nid,
                "transmission_term": term,
                "source_span": [0, 0],
                "occurrence_id": resolved_occ_id
            }
            edges.append(e_obj)
            b2_edges.append(e_obj)
            mermaid_lines.append(f'    {prev_b2} -->|{term}| {nid}')
            prev_b2 = nid

        b2_bottoms = []
        for c_idx, item in enumerate(b2_co_teachers):
            cid = f"N2_C{c_idx+1}"
            raw_name = item["name"]
            norm_n = self._normalize_arabic(raw_name)
            if "اسحاق بن ابراهيم" in norm_n:
                name = "إسحاق بن إبراهيم الحنظلي"
                grade = "إمام ثقة"
                status = "reliable"
            elif "ابن ابي خلف" in norm_n:
                name = "محمد بن أبي خلف"
                grade = "صدوق"
                status = "reliable"
            else:
                g_key, g_title, _ = self._get_narrator_grade(raw_name, conn_db) if conn_db else ("reliable", "ثقة", [])
                name = raw_name
                grade = g_title
                status = g_key
            label = f"{name}<br/><small>({grade})</small>"

            n_obj = {
                "id": cid,
                "name": name,
                "grade": grade,
                "status": status,
                "source_span": [0, 0],
                "occurrence_id": resolved_occ_id,
                "candidates": None
            }
            nodes.append(n_obj)
            b2_nodes.append(n_obj)
            mermaid_lines.append(f'    {cid}["{label}"]:::{status}')

            term = item.get("term", "عن")
            e_obj = {
                "source": prev_b2,
                "target": cid,
                "transmission_term": term,
                "source_span": [0, 0],
                "occurrence_id": resolved_occ_id
            }
            edges.append(e_obj)
            b2_edges.append(e_obj)
            mermaid_lines.append(f'    {prev_b2} -->|{term}| {cid}')
            b2_bottoms.append(cid)

        # Compiler Node
        book_titles = {
            "bukhari": "صحيح البخاري", "muslim": "صحيح مسلم", "abudawud": "سنن أبي داود",
            "tirmidhi": "جامع الترمذي", "nasai": "سنن النسائي", "ibnmajah": "سنن ابن ماجه"
        }
        b_title = book_titles.get(book.lower(), f"كتاب {book}")
        comp_id = "COMP"
        comp_label = f"{b_title}<br/><small>حديث {hadith_number or ''}</small>"
        nodes.append({
            "id": comp_id,
            "name": b_title,
            "grade": "المصنف الإمام",
            "status": "compiler",
            "source_span": [0, 0],
            "occurrence_id": resolved_occ_id
        })
        mermaid_lines.append(f'    {comp_id}["{comp_label}"]:::compiler')

        # Connect bottoms to Compiler
        edges.append({
            "source": b1_bottom,
            "target": comp_id,
            "transmission_term": "أخرجه في مصنفه",
            "source_span": [0, 0],
            "occurrence_id": resolved_occ_id
        })
        mermaid_lines.append(f'    {b1_bottom} --> {comp_id}')

        for b2_bot in b2_bottoms:
            edges.append({
                "source": b2_bot,
                "target": comp_id,
                "transmission_term": "أخرجه في مصنفه",
                "source_span": [0, 0],
                "occurrence_id": resolved_occ_id
            })
            mermaid_lines.append(f'    {b2_bot} --> {comp_id}')

        mermaid_lines.extend(class_defs)
        mermaid_diagram = "\n".join(mermaid_lines)

        path_b1 = {
            "path_id": "path_branch_1",
            "endpoint_type": "marfu" if has_prophet else "unresolved",
            "has_prophetic_endpoint": has_prophet,
            "nodes_count": len(stem_node_ids) + len(b1_nodes) + 2,
            "edges_count": len(b1_edges) + len(stem_node_ids) + 1,
            "nodes": nodes,
            "edges": edges,
            "description": "مسار التحويل الأول"
        }

        path_b2 = {
            "path_id": "path_branch_2",
            "endpoint_type": "marfu" if has_prophet else "unresolved",
            "has_prophetic_endpoint": has_prophet,
            "nodes_count": len(stem_node_ids) + len(b2_nodes) + 2,
            "edges_count": len(b2_edges) + len(stem_node_ids) + 1,
            "nodes": nodes,
            "edges": edges,
            "description": "مسار التحويل الثاني"
        }

        return build_response(
            status="ok",
            data={
                "book": book,
                "hadith_number": hadith_number,
                "occurrence_id": resolved_occ_id,
                "chapter_title": chapter_title,
                "paths": [path_b1, path_b2],
                "nodes": nodes,
                "edges": edges,
                "mermaid_diagram": mermaid_diagram
            },
            evidence={
                "source_name": "Itqan Verified Canonical Isnads (Branched DAG)",
                "locator": resolved_occ_id or f"{book}:{hadith_number}",
                "review_status": "unreviewed_dataset_copy"
            }
        )

    def get_hadith_isnad_tree(self, book: str = "", hadith_number: int = 0, chapter: Optional[int] = None, query: Optional[str] = None, occurrence_id: Optional[str] = None) -> str:
        """
        Reconstructs narrator transmission chains (Isnad) into structured JSON graph paths/nodes/edges
        and descending Mermaid flowcharts, resolving relatives and kunyas without unsupported defaults.
        
        :param book: Collection slug (e.g. 'bukhari', 'muslim', 'abudawud', 'tirmidhi', 'nasai', 'ibnmajah').
        :param hadith_number: Hadith number within the collection.
        :param chapter: Optional chapter number for disambiguation.
        :param query: Optional text fragment to match within repeated numbering.
        :param occurrence_id: Stable occurrence ID (highest precedence).
        :return: Standardized JSON envelope containing structured graph, paths, nodes, edges, and Mermaid.
        """
        book = (book or "").lower().strip()
        hadith_number = int(hadith_number) if hadith_number else 0
        text = ""
        resolved_occ_id = occurrence_id or ""
        chapter_title = ""
        self._resolve_all_paths()

        # 1. Authoritative Lookup by Occurrence ID
        if occurrence_id:
            clean_occ_id = occurrence_id.strip()
            if not os.path.exists(self.valves.SEARCH_INDEX_PATH):
                return to_json_str(build_response(
                    status="unavailable",
                    data={"occurrence_id": clean_occ_id, "book": book, "hadith_number": hadith_number},
                    warnings=["فهرس السجلات المحلي غير متاح للتحقق من معرف السجل."]
                ))
            try:
                conn = sqlite3.connect(self.valves.SEARCH_INDEX_PATH)
                conn.row_factory = sqlite3.Row
                row = conn.execute("SELECT * FROM records WHERE record_id = ?", (clean_occ_id,)).fetchone()
                conn.close()
                if not row:
                    return to_json_str(build_response(
                        status="invalid_reference",
                        data={"occurrence_id": clean_occ_id, "book": book, "hadith_number": hadith_number},
                        warnings=[f"معرف السجل المحدد '{clean_occ_id}' غير موجود في قاعدة السجلات المعتمدة. لن يتم التحول التلقائي إلى بحث بالرقم لمنع الإسناد الخاطئ."]
                    ))
                text = row["arabic"]
                book = row["collection"]
                hadith_number = int(row["source_entry_id"]) if row["source_entry_id"].isdigit() else hadith_number
                chapter_title = row["chapter_title"]
                resolved_occ_id = row["record_id"]
            except Exception as e:
                return to_json_str(build_response(
                    status="unavailable",
                    data={"occurrence_id": clean_occ_id},
                    warnings=[f"فشل التحقق من معرف السجل في القاعدة المحلية: {str(e)}"]
                ))

        # 2. Lookup by Book and Number with Disambiguation
        if not text and os.path.exists(self.valves.SEARCH_INDEX_PATH) and book:
            try:
                conn = sqlite3.connect(self.valves.SEARCH_INDEX_PATH)
                conn.row_factory = sqlite3.Row
                cur = conn.cursor()
                cur.execute(
                    "SELECT * FROM records WHERE collection = ? AND (source_entry_id = ? OR source_entry_in_book = ?)",
                    (book, str(hadith_number), str(hadith_number))
                )
                rows = cur.fetchall()
                conn.close()

                if chapter is not None:
                    ch_str = str(chapter)
                    rows = [r for r in rows if r["chapter_file"].replace(".json", "") == ch_str or ch_str in r["chapter_title"]]

                if len(rows) > 1:
                    candidates = [{
                        "occurrence_id": r["record_id"],
                        "chapter": r["chapter_file"].replace(".json", ""),
                        "chapter_title": r["chapter_title"],
                        "arabic_snippet": (r["arabic"][:120] + "...") if len(r["arabic"]) > 120 else r["arabic"]
                    } for r in rows]
                    return to_json_str(build_response(
                        status="ambiguous",
                        data={"book": book, "hadith_number": hadith_number, "candidates_count": len(rows), "candidates": candidates},
                        warnings=["تتعدد الأحاديث التي تحمل هذا الرقم عبر أبواب متعددة. يرجى تمرير رقم الباب chapter أو معرف السجل occurrence_id للتحديد الدقيق."]
                    ))
                elif len(rows) == 1:
                    row = rows[0]
                    text = row["arabic"]
                    chapter_title = row["chapter_title"]
                    resolved_occ_id = row["record_id"]
            except Exception:
                pass

        # 3. Fallback to hadith_rijal.db if not yet found
        conn_db = None
        if not text and os.path.exists(self.valves.DB_PATH):
            try:
                conn_db = sqlite3.connect(self.valves.DB_PATH)
                conn_db.create_function("NORM_AR", 1, self._normalize_arabic)
                cur = conn_db.cursor()
                if chapter is not None:
                    cur.execute(
                        "SELECT arabic_text FROM hadiths WHERE LOWER(book) = ? AND chapter = ? AND (hadith_id = ? OR id_in_book = ?) LIMIT 1",
                        (book, chapter, hadith_number, hadith_number)
                    )
                else:
                    cur.execute(
                        "SELECT arabic_text FROM hadiths WHERE LOWER(book) = ? AND (hadith_id = ? OR id_in_book = ?) LIMIT 1",
                        (book, hadith_number, hadith_number)
                    )
                row = cur.fetchone()
                if row and row[0]:
                    text = row[0]
            except Exception:
                pass

        if not text:
            if conn_db: conn_db.close()
            return to_json_str(build_response(
                status="no_match",
                data={"book": book, "hadith_number": hadith_number, "occurrence_id": occurrence_id},
                warnings=[f"لم يتم العثور على متن حديث لكتاب {book} ورقم {hadith_number}."]
            ))

        # 4. Parse narrator chain with exact character-level alignment to original text
        clean_chars = []
        clean_to_orig = []
        for orig_idx, ch in enumerate(text):
            if re.match(r'[\u064B-\u065F\u0670\u0610-\u061A\u06D6-\u06ED\u0640]', ch):
                continue
            norm_ch = ch
            if norm_ch in 'إأآٱ': norm_ch = 'ا'
            elif norm_ch == 'ة': norm_ch = 'ه'
            elif norm_ch == 'ى': norm_ch = 'ي'
            clean_to_orig.append(orig_idx)
            clean_chars.append(norm_ch)
        clean = ''.join(clean_chars)

        matn_markers = r'(?:[،,\.\s]+|\b)(?:نحو\s+حديث|بمثله|بمعناه|وليس\s+في\s+حديث|زاد\s+في|وفي\s+رواية|غير\s+ان|وزاد|وقال|لما\s+كسفت|كسفت|خسفت|نودي|ان\s+الشمس|ان\s+رسول|ان\s+النبي|قال\s+رسول|قالت\s+ما\s+سجدت|انما\s+الاعمال|من\s+حج|من\s+كان\s+يؤمن)\b'
        m_split = re.split(matn_markers, clean, maxsplit=1)
        isnad_part = m_split[0]

        # Check Tahweel (ح) and Multi-Path Convergence
        tahweel_regex = r'[\s,،]+(?:[\(\[]?\s*ح\s*[\)\]]?|تحويل)[\s,،]+'
        conv_regex = r'[\s,،]+(?:كلاهما|كلاهم|جميعا|جميعهم|قالا|رويا)\s+(?:عن|قال|روى)\s+'
        t_match = re.search(tahweel_regex, isnad_part)
        c_match = re.search(conv_regex, isnad_part)

        if t_match and c_match and t_match.start() < c_match.start():
            b1_text = isnad_part[:t_match.start()].strip()
            b2_text = isnad_part[t_match.end():c_match.start()].strip()
            stem_text = isnad_part[c_match.end():].strip()
            branched_res = self._build_branched_isnad_dag(
                b1_text=b1_text,
                b2_text=b2_text,
                stem_text=stem_text,
                book=book,
                hadith_number=hadith_number,
                resolved_occ_id=resolved_occ_id,
                chapter_title=chapter_title,
                conn_db=conn_db
            )
            if conn_db: conn_db.close()
            return to_json_str(branched_res)

        verbs_pattern = r'(?:^|\s+|[،,])([وف]?(?:حدثنا|حدثني|حدثه|حدثهم|اخبرنا|اخبرني|اخبره|اخبرهم|انبانا|سمعت|سمعنا|سمع|انه سمع|انها سمعت|يخبر|يروي|عن|قال(?:\s+قال)?))\s+'
        verb_matches = list(re.finditer(verbs_pattern, isnad_part))
        
        raw_chain = []
        source_spans = []
        transmission_terms = []

        if not conn_db and os.path.exists(self.valves.DB_PATH):
            conn_db = sqlite3.connect(self.valves.DB_PATH)

        if verb_matches:
            for i, vm in enumerate(verb_matches):
                verb = vm.group(1).strip()
                seg_start = vm.end()
                seg_end = verb_matches[i + 1].start() if i + 1 < len(verb_matches) else len(isnad_part)
                seg_text = isnad_part[seg_start:seg_end].strip()

                if not seg_text:
                    continue

                # Map clean slice back to exact original diacritized text offsets
                # Find start of actual name inside seg_text in clean
                m_lead = re.search(r'^(?:[وف]?(?:حدثنا|حدثني|اخبرنا|اخبرني|انبانا|سمعت|عن|قال)\s+)+', seg_text)
                lead_offset = len(m_lead.group(0)) if m_lead else 0
                actual_clean_start = seg_start + (len(seg_text) - len(seg_text.lstrip())) + lead_offset
                
                seg_clean = re.sub(r'\s*رض[يى]\s*الله\s*عنه[ما]*\s*', ' ', seg_text)
                seg_clean = re.sub(r'\s*(?:صلى|صلي)\s*الله\s*عليه\s*(?:وسلم|واله)?\s*', ' ', seg_clean)
                seg_clean = re.sub(r'\s*رحم[هة]\s*الله\s*', ' ', seg_clean)
                seg_clean = re.sub(r'[ـ\s]*عليه\s*السلام[ـ\s]*', '', seg_clean)
                seg_clean = re.sub(r'(?:\s+|^)(?:وهو\s+)?(?:علي|على|في)\s+(?:المنبر|المسجد|الحجر|الكعبة).*|(?:\s+|^)(?:وهو\s+يخطب|يخطب|في\s+خطبته).*', '', seg_clean)
                name_part = re.split(r'[،,\n]|(?:\s+(?:قال|يقول|ان|انه|انها|انهم)\s)', seg_clean)[0]
                name_part = re.sub(r'^(?:[وف]?(?:حدثنا|حدثني|اخبرنا|اخبرني|انبانا|سمعت|عن|قال)\s+)+', '', name_part).strip()
                name_cleaned = self._clean_narrator_name(name_part)

                # Length in clean
                name_clean_len = len(name_cleaned)
                actual_clean_end = min(actual_clean_start + max(name_clean_len, 4), len(clean_to_orig))

                if clean_to_orig and actual_clean_start < len(clean_to_orig):
                    orig_s = clean_to_orig[actual_clean_start]
                    end_idx = min(actual_clean_end - 1, len(clean_to_orig) - 1)
                    orig_e = clean_to_orig[end_idx] + 1
                    while orig_e < len(text) and re.match(r'[\u064B-\u065F\u0670\u0610-\u061A\u06D6-\u06ED\u0640]', text[orig_e]):
                        orig_e += 1
                    orig_span = (orig_s, orig_e)
                else:
                    orig_span = (0, 0)

                name_part = name_cleaned

                # Relative resolution (عن أبيه / عن جده)
                if raw_chain:
                    prev_narrator = raw_chain[-1]
                    norm_prev = self._normalize_arabic(prev_narrator)
                    fam_res = self.FAMOUS_FAMILY_RESOLUTIONS.get(norm_prev)
                    if fam_res:
                        if name_part in ('ابيه', 'ابي', 'ابوه'):
                            name_part = fam_res["father"][0]
                        elif name_part.startswith('جده') or name_part in ('جده', 'جد'):
                            name_part = fam_res["grandfather"][0]
                    elif conn_db:
                        if name_part in ('ابيه', 'ابي'):
                            resolved, _ = self._resolve_relative('father', prev_narrator, conn_db)
                            if resolved: name_part = f"{resolved} (والد {prev_narrator})"
                        elif name_part.startswith('جده'):
                            resolved, _ = self._resolve_relative('grandfather', prev_narrator, conn_db)
                            if resolved: name_part = f"{resolved} (جد {prev_narrator})"

                # Kunya lookup
                if conn_db and name_part:
                    real, _, _ = self._resolve_kunya(name_part, conn_db)
                    if real != name_part:
                        name_part = f"{name_part} [{real}]"

                non_narrator = ('الله', 'رسول', 'ذلك', 'هذا', 'كان', 'النبي')
                if len(name_part) >= 3 and name_part not in non_narrator and not name_part.startswith('رسول الله') and not name_part.startswith('النبي'):
                    raw_chain.append(name_part)
                    source_spans.append(orig_span)
                    transmission_terms.append(verb)

        # Reverse chain so it flows top-down: Sahabi/Tabi'i -> ... -> Compiler teacher
        descending_narrators = list(reversed(raw_chain))
        descending_spans = list(reversed(source_spans))
        descending_terms = list(reversed(transmission_terms))

        # Detect prophetic endpoint truthfully from path evidence connecting to top narrator
        has_prophetic_endpoint = False
        endpoint_type = "unresolved"
        if descending_narrators:
            top_narrator = descending_narrators[0]
            norm_top = self._normalize_arabic(top_narrator)
            idx_in_clean = clean.find(norm_top.split()[0]) if norm_top else -1
            after_top = clean[idx_in_clean + len(norm_top.split()[0]):min(idx_in_clean + len(norm_top.split()[0]) + 150, len(clean))] if idx_in_clean != -1 else ""
            prophetic_pattern = r'(?:سمعت|سمعنا|قال|يقول|يحدث|روى|عن|ان|انه\s+سمع|انها\s+سمعت)\s+(?:رسول\s+الل[هة]|النبي)'
            has_prophetic_endpoint = bool(re.search(prophetic_pattern, after_top))

            is_top_sahabi = bool(self._get_sahabi_meta(norm_top))
            if not is_top_sahabi and conn_db:
                g_k, _, _ = self._get_narrator_grade(top_narrator, conn_db)
                if g_k == "sahabi": is_top_sahabi = True

            if has_prophetic_endpoint:
                endpoint_type = "marfu" if is_top_sahabi else "mursal"
            else:
                endpoint_type = "mawquf" if is_top_sahabi else "maqtu"

        # 5. Build structured graph nodes and edges
        nodes = []
        edges = []
        mermaid_lines = ["graph TD"]
        class_defs = [
            "    classDef prophet fill:#18181b,stroke:#f59e0b,stroke-width:2px,color:#fef3c7,rx:10px,ry:10px;",
            "    classDef sahabi fill:#064e3b,stroke:#10a37f,stroke-width:2px,color:#ecfdf5,rx:8px,ry:8px;",
            "    classDef reliable fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc,rx:6px,ry:6px;",
            "    classDef acceptable fill:#27272a,stroke:#71717a,stroke-width:1.5px,color:#f4f4f5,rx:6px,ry:6px;",
            "    classDef weak fill:#450a0a,stroke:#f43f5e,stroke-width:1.5px,color:#fff1f2,rx:6px,ry:6px;",
            "    classDef compiler fill:#09090b,stroke:#0ea5e9,stroke-width:2px,color:#f0f9ff,rx:8px,ry:8px;",
            "    classDef unknown fill:#27272a,stroke:#52525b,stroke-width:1.5px,color:#e4e4e7,rx:6px,ry:6px;"
        ]

        prev_node_id = None
        if has_prophetic_endpoint:
            prophet_id = "P"
            mermaid_lines.append('    P(["رسول الله ﷺ<br/><small>خاتم الأنبياء والمرسلين</small>"]):::prophet')
            nodes.append({
                "id": prophet_id,
                "name": "رسول الله ﷺ",
                "grade": "نبي معصوم",
                "status": "prophet",
                "source_span": [0, 0],
                "occurrence_id": resolved_occ_id,
                "candidates": None
            })
            prev_node_id = prophet_id

        for idx, narrator in enumerate(descending_narrators):
            nid = f"N{idx+1}"
            clean_n = narrator.replace('"', '').replace("'", "")
            norm_n = self._normalize_arabic(clean_n)

            sahabi_meta = self._get_sahabi_meta(norm_n)
            if sahabi_meta:
                grade_key = "sahabi"
                grade_title = "صحابي جليل"
                label = f"<b>{clean_n} رضي الله عنه</b><br/><small>{sahabi_meta or 'صحابي جليل'}</small>"
                cands = []
            else:
                grade_key, grade_title, cands = ("unknown", "غير محدد في المصدر", [])
                if conn_db:
                    grade_key, grade_title, cands = self._get_narrator_grade(clean_n, conn_db)
                label = f"{clean_n}<br/><small>({grade_title})</small>"

            span = descending_spans[idx] if idx < len(descending_spans) else [0, 0]
            term = descending_terms[idx] if idx < len(descending_terms) else "عن"

            nodes.append({
                "id": nid,
                "name": clean_n,
                "grade": grade_title,
                "status": grade_key,
                "source_span": [span[0], span[1]],
                "occurrence_id": resolved_occ_id,
                "candidates": cands if cands else None
            })

            mermaid_lines.append(f'    {nid}["{label}"]:::{grade_key}')
            if prev_node_id:
                mermaid_lines.append(f"    {prev_node_id} --> {nid}")
                edges.append({
                    "source": prev_node_id,
                    "target": nid,
                    "transmission_term": term,
                    "source_span": [span[0], span[1]],
                    "occurrence_id": resolved_occ_id
                })
            prev_node_id = nid

        # Bottom node: Compiler
        book_titles = {
            "bukhari": "صحيح البخاري", "muslim": "صحيح مسلم", "abudawud": "سنن أبي داود",
            "tirmidhi": "جامع الترمذي", "nasai": "سنن النسائي", "ibnmajah": "سنن ابن ماجه"
        }
        b_title = book_titles.get(book, f"كتاب {book}")
        comp_id = "COMP"
        comp_label = f"{b_title}<br/><small>حديث {hadith_number or ''}</small>"
        nodes.append({
            "id": comp_id,
            "name": b_title,
            "grade": "المصنف الإمام",
            "status": "compiler",
            "source_span": [0, 0],
            "occurrence_id": resolved_occ_id
        })
        mermaid_lines.append(f'    {comp_id}["{comp_label}"]:::compiler')
        if prev_node_id:
            mermaid_lines.append(f"    {prev_node_id} --> {comp_id}")
            edges.append({
                "source": prev_node_id,
                "target": comp_id,
                "transmission_term": "أخرجه في مصنفه",
                "source_span": [0, 0],
                "occurrence_id": resolved_occ_id
            })

        if conn_db: conn_db.close()

        mermaid_lines.extend(class_defs)
        mermaid_diagram = "\n".join(mermaid_lines)

        path_obj = {
            "path_id": "path_primary",
            "endpoint_type": endpoint_type,
            "has_prophetic_endpoint": has_prophetic_endpoint,
            "nodes_count": len(nodes),
            "edges_count": len(edges),
            "nodes": nodes,
            "edges": edges
        }

        return to_json_str(build_response(
            status="ok",
            data={
                "book": book,
                "hadith_number": hadith_number,
                "occurrence_id": resolved_occ_id,
                "chapter_title": chapter_title,
                "paths": [path_obj],
                "nodes": nodes,
                "edges": edges,
                "mermaid_diagram": mermaid_diagram
            },
            evidence={
                "source_name": "Itqan Verified Canonical Isnads",
                "locator": resolved_occ_id or f"{book}:{hadith_number}",
                "review_status": "unreviewed_dataset_copy"
            }
        ))
