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
            default="hadith_rijal.db",
            description="Path to hadith_rijal.db with narrators, isnad_kunya_map, and isnad_relative_map."
        )
        SEARCH_INDEX_PATH: str = Field(
            default="poc/phrase_search/search_index.sqlite",
            description="Path to search_index.sqlite containing stable occurrence IDs."
        )
        REQUEST_TIMEOUT: int = Field(
            default=10,
            description="Network request timeout in seconds."
        )


    @staticmethod
    def _resolve_path(env_var: str, current_val: str, candidates: list) -> str:
        env_val = os.environ.get(env_var)
        if env_val and os.path.exists(env_val) and os.path.getsize(env_val) > 10000:
            return os.path.abspath(env_val)
        if current_val and os.path.exists(current_val) and os.path.getsize(current_val) > 10000:
            return os.path.abspath(current_val)
        search_roots = [
            os.getcwd(),
            os.path.abspath(os.path.join(os.getcwd(), "..")),
            os.path.abspath(os.path.join(os.getcwd(), "../..")),
            os.path.abspath(os.path.join(os.getcwd(), "../../..")),
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
            if os.path.isabs(c) and os.path.exists(c) and os.path.getsize(c) > 10000:
                return os.path.abspath(c)
            for root in search_roots:
                p = os.path.join(root, c)
                if os.path.exists(p) and os.path.getsize(p) > 10000:
                    return os.path.abspath(p)
        return current_val
    @staticmethod
    def _verify_sqlite_schema(db_path: str, required_tables: list) -> bool:
        if not db_path or not os.path.exists(db_path):
            return False
        try:
            conn = sqlite3.connect(db_path)
            cur = conn.cursor()
            cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
            tables = {r[0] for r in cur.fetchall()}
            conn.close()
            return all(t in tables for t in required_tables)
        except Exception:
            return False

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

    def disambiguate_narrator(self, name: str, relation: str = "", occurrence_id: str = "", anchor_name: str = "") -> str:
        """
        Disambiguate a narrator's kunya or relative mention ('عن أبيه', 'عن جده') using authentic evidence.
        
        :param name: Narrator name or relative mention.
        :param relation: Optional relation type ('father', 'grandfather', 'grandmother', 'mother', 'uncle').
        :param occurrence_id: Optional occurrence ID context.
        :param anchor_name: The child or anchor narrator whom this relative belongs to (e.g. 'سعيد بن أبي بردة' for 'أبيه').
        :return: JSON result with resolved identity, evidence source, and status.
        """
        self._resolve_all_paths()
        if not os.path.exists(self.valves.DB_PATH):
            return json.dumps({"error": "Database not found."}, ensure_ascii=False)

        clean_name = (name or "").strip()
        norm_name = re.sub(r'[\u064B-\u065F\u0670\u0610-\u061A\u06D6-\u06ED\u0640]', '', clean_name)
        norm_name = re.sub(r'[إأآاٱ]', 'ا', norm_name).replace('ة', 'ه').replace('ى', 'ي').strip()

        # If anchor_name is not provided but occurrence_id is present, resolve anchor context from record
        if not anchor_name and occurrence_id:
            record_text = ""
            if os.path.exists(self.valves.SEARCH_INDEX_PATH):
                try:
                    conn_s = sqlite3.connect(self.valves.SEARCH_INDEX_PATH)
                    conn_s.row_factory = sqlite3.Row
                    r_row = conn_s.execute("SELECT arabic FROM records WHERE record_id = ?", (occurrence_id.strip(),)).fetchone()
                    conn_s.close()
                    if r_row:
                        record_text = r_row["arabic"]
                except Exception:
                    pass
            if not record_text and os.path.exists(self.valves.DB_PATH):
                try:
                    conn_db = sqlite3.connect(self.valves.DB_PATH)
                    parts = occurrence_id.strip().split(":")
                    if len(parts) >= 4:
                        b, ch, hn = parts[1], parts[2], parts[3]
                        cur = conn_db.cursor()
                        cur.execute("SELECT arabic_text FROM hadiths WHERE LOWER(book) = ? AND chapter = ? AND (hadith_id = ? OR id_in_book = ?) LIMIT 1", (b, int(ch), int(hn), int(hn)))
                        r_db = cur.fetchone()
                        if r_db and r_db[0]:
                            record_text = r_db[0]
                    conn_db.close()
                except Exception:
                    pass

            if record_text:
                try:
                    try:
                        from hadith.isnad.parser import IsnadParser
                    except ImportError:
                        import sys
                        _cur = os.path.dirname(os.path.abspath(__file__))
                        for root_cand in [
                            os.path.abspath(os.path.join(_cur, "..", "..")),
                            os.path.abspath(os.path.join(_cur, "..")),
                            os.path.abspath(os.path.join(_cur, "..", "open-webui")),
                            os.path.abspath(os.path.join(_cur, "..", "..", "open-webui")),
                        ]:
                            if os.path.exists(os.path.join(root_cand, "hadith", "isnad")) and root_cand not in sys.path:
                                sys.path.insert(0, root_cand)
                        from hadith.isnad.parser import IsnadParser
                    p = IsnadParser().parse(record_text)
                    if p.common_link and p.stem_stages:
                        for s_idx, stage in enumerate(p.stem_stages):
                            for m in stage:
                                if m.raw_text == clean_name or m.norm_text == norm_name or norm_name in m.norm_text:
                                    if s_idx == 0:
                                        anchor_name = p.common_link.raw_text
                                    else:
                                        prev_stage = p.stem_stages[s_idx - 1]
                                        if prev_stage:
                                            anchor_name = prev_stage[0].raw_text
                                    break
                            if anchor_name:
                                break
                    if not anchor_name:
                        for branch in p.branches:
                            for s_idx, stage in enumerate(branch.stages):
                                for m in stage:
                                    if m.raw_text == clean_name or m.norm_text == norm_name or norm_name in m.norm_text:
                                        if s_idx > 0:
                                            prev_stage = branch.stages[s_idx - 1]
                                            if prev_stage:
                                                anchor_name = prev_stage[0].raw_text
                                        break
                                if anchor_name:
                                    break
                            if anchor_name:
                                break
                except Exception:
                    pass

        # Reject relative pronoun queries without an anchor narrator context
        if norm_name in ("ابيه", "ابي", "ابوه", "جده", "جد", "عمه", "عم", "خاله", "خالته") and not anchor_name:
            return json.dumps({
                "status": "missing_context",
                "input_narrator": name,
                "relation": relation or norm_name,
                "warning": f"طلب تمييز القرابة المبهمة '{name}' يتطلب تمرير اسم الراوي صاحب الضمير (anchor_name) أو سياق السجل occurrence_id لحل الهوية بدليل وتجنب التخمين."
            }, ensure_ascii=False)

        try:
            from hadith.isnad.parser import ExtractedMention, IsnadParser
            from hadith.isnad.resolver import NarratorResolver
        except ImportError:
            import sys
            _cur = os.path.dirname(os.path.abspath(__file__))
            for root_cand in [
                os.path.abspath(os.path.join(_cur, "..", "..")),
                os.path.abspath(os.path.join(_cur, "..")),
                os.path.abspath(os.path.join(_cur, "..", "open-webui")),
                os.path.abspath(os.path.join(_cur, "..", "..", "open-webui")),
            ]:
                if os.path.exists(os.path.join(root_cand, "hadith", "isnad")) and root_cand not in sys.path:
                    sys.path.insert(0, root_cand)
            from hadith.isnad.parser import ExtractedMention, IsnadParser
            from hadith.isnad.resolver import NarratorResolver

        resolver = NarratorResolver(self.valves.DB_PATH)

        if relation or norm_name in ("ابيه", "ابي", "ابوه", "جده", "جد", "عمه", "عم", "خاله", "خالته"):
            rel_type = relation.lower().strip() or ("father" if norm_name in ("ابيه", "ابي", "ابوه") else "grandfather")
            effective_anchor = anchor_name or (name if norm_name not in ("ابيه", "ابي", "ابوه", "جده", "جد") else "")
            
            rel_mention = ExtractedMention(
                mention_id="m_query",
                raw_text=name,
                norm_text=norm_name,
                source_span=(0, 0),
                transmission_term="عن",
                transmission_span=(0, 0),
                is_relative=True,
                relation_type=rel_type
            )
            anchor_mention = ExtractedMention(
                mention_id="m_anchor",
                raw_text=effective_anchor,
                norm_text=IsnadParser.normalize_arabic(effective_anchor),
                source_span=(0, 0),
                transmission_term="",
                transmission_span=(0, 0)
            ) if effective_anchor else None

            resolved = resolver.resolve_relative(rel_mention, anchor_mention)
            return json.dumps({
                "input_narrator": name,
                "relation": rel_type,
                "anchor_narrator": effective_anchor,
                "resolved_identity": resolved.canonical_name,
                "grade": resolved.grade,
                "status": resolved.identity_status,
                "evidence_source": resolved.evidence_source,
                "resolution_rule": resolved.resolution_rule,
                "candidates": resolved.candidates
            }, ensure_ascii=False)

        # Kunya or direct name resolution
        conn = sqlite3.connect(self.valves.DB_PATH)
        real_name, en_name, cands = self._resolve_kunya(name, conn)
        if not cands and not en_name:
            cur = conn.cursor()
            norm = self._normalize_arabic(name)
            cur.execute("""
                SELECT id, full_name, grade_ar
                FROM narrators
                WHERE full_name_norm = ? OR full_name_norm LIKE ?
                LIMIT 10
            """, (norm, f"{norm} بن %"))
            rows = cur.fetchall()
            if len(rows) > 1:
                cands = [{"id": r[0], "real_name": r[1], "grade": r[2] or "غير محدد"} for r in rows]
                conn.close()
                return json.dumps({
                    "name": name,
                    "candidates": cands,
                    "status": "ambiguous"
                }, ensure_ascii=False)
            elif len(rows) == 1:
                conn.close()
                return json.dumps({
                    "name": name,
                    "real_name": rows[0][1],
                    "status": "resolved"
                }, ensure_ascii=False)
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
            "status": "resolved" if en_name else "unresolved"
        }, ensure_ascii=False)

    def get_hadith_isnad_tree(self, book: str = "", hadith_number: Any = 0, chapter: Optional[int] = None, query: Optional[str] = None, occurrence_id: Optional[str] = None, path_id: Optional[str] = None) -> str:
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
        parsed_hadith_number = 0
        if hadith_number is not None and hadith_number != "":
            try:
                parsed_hadith_number = int(hadith_number)
            except (ValueError, TypeError):
                parsed_hadith_number = 0
                if not occurrence_id:
                    s_hn = str(hadith_number).strip()
                    if ":" in s_hn:
                        parts = s_hn.split(":")
                        warning_msg = f"الرقم المركب '{hadith_number}' يشير إلى (الفصل {parts[0]}، الموضع {parts[1]}). يرجى تمرير رقم الحديث كعدد صحيح، أو تحديد الباب عبر معامل chapter={parts[0]}، أو استخدام معرف السجل occurrence_id للتحديد الدقيق."
                    else:
                        warning_msg = f"رقم الحديث '{hadith_number}' غير صالح. يجب تمرير عدد صحيح أو معرف السجل المستقر occurrence_id."
                    return to_json_str(build_response(
                        status="invalid_reference",
                        data={"book": book, "hadith_number": hadith_number, "occurrence_id": occurrence_id},
                        warnings=[warning_msg]
                    ))
        hadith_number = parsed_hadith_number
        text = ""
        resolved_occ_id = occurrence_id or ""
        chapter_title = ""
        self._resolve_all_paths()

        # 1. Authoritative Lookup by Occurrence ID
        if occurrence_id:
            clean_occ_id = occurrence_id.strip()
            if not self._verify_sqlite_schema(self.valves.SEARCH_INDEX_PATH, ["records"]):
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
        if not text and self._verify_sqlite_schema(self.valves.SEARCH_INDEX_PATH, ["records"]) and book:
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
        if not text and self._verify_sqlite_schema(self.valves.DB_PATH, ["hadiths"]):
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

        # 4. Modular Evidence-Based Isnad Parsing, Resolution, and Graph Construction
        try:
            from hadith.isnad.parser import IsnadParser
            from hadith.isnad.resolver import NarratorResolver
            from hadith.isnad.graph import IsnadGraphBuilder
            from hadith.isnad.render_mermaid import MermaidRenderer
            from hadith.isnad.validation import validate_isnad_graph
        except ImportError:
            import sys
            _cur = os.path.dirname(os.path.abspath(__file__))
            for root_cand in [
                os.path.abspath(os.path.join(_cur, "..", "..")),
                os.path.abspath(os.path.join(_cur, "..")),
                os.path.abspath(os.path.join(_cur, "..", "open-webui")),
                os.path.abspath(os.path.join(_cur, "..", "..", "open-webui")),
            ]:
                if os.path.exists(os.path.join(root_cand, "hadith", "isnad")) and root_cand not in sys.path:
                    sys.path.insert(0, root_cand)
            from hadith.isnad.parser import IsnadParser
            from hadith.isnad.resolver import NarratorResolver
            from hadith.isnad.graph import IsnadGraphBuilder
            from hadith.isnad.render_mermaid import MermaidRenderer
            from hadith.isnad.validation import validate_isnad_graph

        resolver = NarratorResolver(self.valves.DB_PATH)
        parser = IsnadParser()
        builder = IsnadGraphBuilder(resolver)

        parsed = parser.parse(text)
        graph = builder.build_graph(
            parsed=parsed,
            book=book or '',
            hadith_number=hadith_number or 0,
            occurrence_id=resolved_occ_id,
            chapter_title=chapter_title
        )
        if path_id:
            matching = [p for p in graph.paths if p.path_id == path_id]
            if not matching:
                avail_ids = [p.path_id for p in graph.paths]
                return to_json_str(build_response(
                    status="invalid_reference",
                    data={
                        "book": graph.book,
                        "hadith_number": graph.hadith_number,
                        "occurrence_id": resolved_occ_id,
                        "requested_path_id": path_id,
                        "available_path_ids": avail_ids,
                        "paths_count": len(graph.paths)
                    },
                    evidence={
                        'source_name': 'Itqan Verified Canonical Isnads',
                        'locator': resolved_occ_id or f'{book}:{hadith_number}',
                        'database_path': self.valves.DB_PATH,
                    },
                    coverage={
                        'complete': False,
                        'selected_path_id': None,
                        'available_path_ids': avail_ids,
                        'routes_discovered': len(graph.paths),
                        'biography_coverage_note': 'المسار المطلوب غير موجود ضمن مسارات الحديث المثبتة'
                    },
                    warnings=[f"مسار الإسناد المطلوب '{path_id}' غير موجود. المسارات المتاحة لهذا الحديث هي: {', '.join(avail_ids)}."]
                ))
            graph.paths = matching
            path_node_ids = {n["id"] for n in matching[0].nodes}
            graph.nodes = [n for n in graph.nodes if n["id"] in path_node_ids]
            graph.edges = matching[0].edges
        graph_dict = graph.to_dict()
        mermaid_diagram = MermaidRenderer.render(graph)
        is_valid_dag, validation_errors = validate_isnad_graph(graph_dict, text)

        data_payload = {
            'book': graph.book,
            'hadith_number': graph.hadith_number,
            'occurrence_id': graph.occurrence_id,
            'chapter_title': graph.chapter_title,
            'isnad_text': text,
            'is_branched': graph.is_branched,
            'referral_note': graph.referral_note,
            'variant_notes': graph.variant_notes,
            'selected_path_id': path_id if path_id else None,
            'paths_count': len(graph.paths),
            'paths': [p.to_dict() for p in graph.paths],
            'nodes': graph.nodes,
            'edges': graph.edges,
            'mermaid_diagram': mermaid_diagram,
            'graph_topology': {
                'is_valid_dag': is_valid_dag,
                'validation_errors': validation_errors
            }
        }

        return to_json_str(build_response(
            status='ok' if is_valid_dag else 'needs_review',
            data=data_payload,
            evidence={
                'source_name': 'Itqan Verified Canonical Isnads',
                'locator': resolved_occ_id or f'{book}:{hadith_number}',
                'database_path': self.valves.DB_PATH,
                'referral_note': graph.referral_note,
                'variant_notes': graph.variant_notes
            },
            coverage={
                'complete': is_valid_dag,
                'selected_path_id': path_id if path_id else None,
                'routes_discovered': len(graph.paths),
                'nodes_count': len(graph.nodes),
                'biography_coverage_note': 'اكتمال الرسم الطوبولوجي للمسار لا يعني اكتمال توثيق كافة رواته'
            },
            warnings=validation_errors if validation_errors else []
        ))
