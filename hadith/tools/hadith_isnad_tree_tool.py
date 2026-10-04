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

class Tools:
    class Valves(BaseModel):
        DB_PATH: str = Field(
            default=r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\hadith_rijal.db",
            description="Path to hadith_rijal.db with narrators, isnad_kunya_map, and isnad_relative_map."
        )
        REQUEST_TIMEOUT: int = Field(
            default=10,
            description="Network request timeout in seconds."
        )

    def __init__(self):
        self.valves = self.Valves()

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
        s = re.sub(r'\s*رض[يى]\s*الله\s*عنه[ما]*\s*', '', s)
        s = re.sub(r'[ـ\s]*عليه\s*السلام[ـ\s]*', '', s)
        s = re.sub(r'[ـ\s]*صلى\s*الله\s*عليه[ـ\s]*.*', '', s)
        s = re.sub(r'^\s*ان\s+', '', s)
        s = re.sub(r'^\s*انه\s+', '', s)
        s = re.sub(r'\s*قال\s*:?\s*"?\s*$', '', s)
        return re.sub(r'\s+', ' ', s).strip()

    def _resolve_relative(self, rel_type: str, prev_narrator: str, conn: sqlite3.Connection) -> Optional[str]:
        cur = conn.cursor()
        prev_norm = self._normalize_arabic(prev_narrator)
        cur.execute("""
            SELECT relative_name
            FROM isnad_relative_map
            WHERE relation_type = ? AND (narrator_norm = ? OR narrator_norm LIKE ? OR ? LIKE '%' || narrator_norm || '%')
            LIMIT 1
        """, (rel_type, prev_norm, f"%{prev_norm}%", prev_norm))
        row = cur.fetchone()
        return row[0] if row else None

    def _resolve_kunya(self, name: str, conn: sqlite3.Connection) -> Tuple[str, Optional[str]]:
        cur = conn.cursor()
        norm = self._normalize_arabic(name)
        cur.execute("""
            SELECT real_name, name_en
            FROM isnad_kunya_map
            WHERE kunya_norm = ? OR kunya = ?
            LIMIT 1
        """, (norm, name))
        row = cur.fetchone()
        if row:
            return row[0], row[1]
        return name, None

    def _get_narrator_grade(self, name: str, conn: sqlite3.Connection) -> Tuple[str, str]:
        """Lookup credibility grade from 115k narrators table."""
        cur = conn.cursor()
        norm = self._normalize_arabic(name)
        
        # Check if companion
        if "رسول الله" in name or "النبي" in name:
            return "prophet", "النبي ﷺ"
        if "رضي الله عنه" in name or any(s in norm for s in ["ابو هريره", "انس بن مالك", "عائشه", "ابن عمر", "ابن عباس", "جابر بن عبد الله"]):
            return "sahabi", "صحابي جليل"

        cur.execute("""
            SELECT grade_ar, grade_en
            FROM narrators
            WHERE full_name_norm = ? OR full_name_norm LIKE ?
            LIMIT 1
        """, (norm, f"%{norm}%"))
        row = cur.fetchone()
        if row:
            grade_ar = row[0] or "ثقة"
            grade_en = (row[1] or "").lower()
            if any(k in grade_en for k in ["reliable", "trustworthy", "sahih"]) or "ثقة" in grade_ar or "صحابي" in grade_ar:
                return "reliable", grade_ar
            elif any(k in grade_en for k in ["acceptable", "hasan", "saduq"]) or "صدوق" in grade_ar:
                return "acceptable", grade_ar
            elif any(k in grade_en for k in ["weak", "da'eef", "daeef", "abandoned", "fabricat"]) or "ضعيف" in grade_ar or "متروك" in grade_ar:
                return "weak", grade_ar
            return "reliable", grade_ar

        return "unknown", "غير محدد"

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
                resolved = self._resolve_relative(relation.lower().strip(), name, conn)
                conn.close()
                if resolved:
                    return json.dumps({
                        "input_narrator": name,
                        "relation": relation,
                        "resolved_identity": resolved,
                        "status": "resolved"
                    }, ensure_ascii=False)
                return json.dumps({
                    "input_narrator": name,
                    "relation": relation,
                    "status": "unresolved"
                }, ensure_ascii=False)
            else:
                real_name, en_name = self._resolve_kunya(name, conn)
                conn.close()
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
        "ابو بكر الصديق": "عبد الله بن أبي قحافة · الصديق الأكبر · ت 13 هـ · روى 142 حديثاً"
    }

    def _get_sahabi_meta(self, name_norm: str) -> Optional[str]:
        for k, v in self.SAHABA_META.items():
            k_norm = self._normalize_arabic(k)
            if k_norm in name_norm or name_norm in k_norm:
                return v
        return None

    def get_hadith_isnad_tree(self, book: str, hadith_number: int, chapter: Optional[int] = None, query: Optional[str] = None) -> str:
        """
        Reconstructs the authentic narrator transmission chain (Isnad) from the original text,
        resolves ambiguous relative mentions ('عن أبيه') and kunyas, queries credibility grades,
        and generates a descending luxury Mermaid flowchart.
        """
        book = book.lower().strip()
        hadith_number = int(hadith_number)

        # 1. Fetch Arabic text
        text = ""
        conn = None
        if os.path.exists(self.valves.DB_PATH):
            try:
                conn = sqlite3.connect(self.valves.DB_PATH)
                conn.create_function("NORM_AR", 1, self._normalize_arabic)
                cur = conn.cursor()
                if chapter is not None:
                    cur.execute("""
                        SELECT arabic_text 
                        FROM hadiths 
                        WHERE LOWER(book) = ? AND chapter = ? AND (hadith_id = ? OR id_in_book = ?)
                        LIMIT 1
                    """, (book, chapter, hadith_number, hadith_number))
                elif query:
                    norm_q = self._normalize_arabic(query)
                    cur.execute("""
                        SELECT arabic_text 
                        FROM hadiths 
                        WHERE LOWER(book) = ? AND (hadith_id = ? OR id_in_book = ?) AND NORM_AR(arabic_text) LIKE ?
                        LIMIT 1
                    """, (book, hadith_number, hadith_number, f"%{norm_q}%"))
                else:
                    cur.execute("""
                        SELECT arabic_text 
                        FROM hadiths 
                        WHERE LOWER(book) = ? AND (hadith_id = ? OR id_in_book = ?)
                        ORDER BY id ASC
                        LIMIT 1
                    """, (book, hadith_number, hadith_number))
                row = cur.fetchone()
                if row and row[0]:
                    text = row[0]
            except Exception:
                pass

        if not text:
            # Fallback to CDN API
            url = f"https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-{book}/{hadith_number}.json"
            try:
                req = urllib.request.Request(url, headers={"User-Agent": "HadithApp/1.0"})
                with urllib.request.urlopen(req, timeout=self.valves.REQUEST_TIMEOUT) as resp:
                    data = json.loads(resp.read().decode("utf-8"))
                    text = data.get("hadiths", [{}])[0].get("text", "")
            except Exception:
                pass

        if not text:
            if conn: conn.close()
            return json.dumps({"error": f"No text found for {book} #{hadith_number}"}, ensure_ascii=False)

        # 2. Parse narrator chain using transmission verbs
        clean = self._normalize_arabic(text)
        
        # Stop at matn beginning
        matn_markers = r'\b(?:لما\s+كسفت|كسفت|خسفت|نودي|ان\s+الشمس|ان\s+رسول|ان\s+النبي|قال\s+رسول|قالت\s+ما\s+سجدت)\b'
        m_split = re.split(matn_markers, clean, maxsplit=1)
        isnad_part = m_split[0]

        verbs = r'(?:^|\s+|[،,])(?:[وف]?(?:حدثنا|حدثني|حدثه|حدثهم|اخبرنا|اخبرني|اخبره|اخبرهم|انبانا|سمعت|سمعنا|سمع|انه سمع|انها سمعت|يخبر|يروي|عن|قال(?:\s+قال)?))\s+'
        segments = re.split(verbs, isnad_part)
        raw_chain = []

        segs = segments[1:]
        for idx, seg in enumerate(segs):
            if not seg or not seg.strip():
                continue
            seg_clean = re.sub(r'\s*رض[يى]\s*الله\s*عنه[ما]*\s*', ' ', seg)
            seg_clean = re.sub(r'\s*(?:صلى|صلي)\s*الله\s*عليه\s*(?:وسلم|واله)?\s*', ' ', seg_clean)
            name_part = re.split(r'[،,\n]|(?:\s+(?:قال|ان|انه|انها|انهم)\s)', seg_clean)[0]
            name_part = re.sub(r'^(?:[وف]?(?:حدثنا|حدثني|اخبرنا|اخبرني|انبانا|سمعت|عن|قال)\s+)+', '', name_part).strip()
            name_part = re.sub(r'\s+(?:علي\s+المنبر|وهو\s+بعرفه|وهو\s+ب|في\s+المسجد|يقول|خطبنا|حدثنا|اخبرنا).*', '', name_part).strip()
            name_part = self._clean_narrator_name(name_part)

            # Kunya repair (أبو + صالح)
            if name_part in ('ابي', 'ابو') and idx + 1 < len(segs):
                next_seg = re.split(r'[،,\n]|(?:\s+(?:قال|ان|انه)\s)', segs[idx + 1])[0]
                next_name = self._clean_narrator_name(next_seg)
                if next_name and len(next_name) >= 2 and next_name not in ('الله', 'رسول', 'النبي'):
                    name_part = name_part + ' ' + next_name
                    segs[idx + 1] = ''

            # Relative resolution (عن أبيه / عن جده)
            if raw_chain and conn:
                prev_narrator = raw_chain[-1]
                if name_part in ('ابيه', 'ابي'):
                    resolved = self._resolve_relative('father', prev_narrator, conn)
                    if resolved: name_part = f"{resolved} (والد {prev_narrator})"
                elif name_part.startswith('جده'):
                    resolved = self._resolve_relative('grandfather', prev_narrator, conn)
                    if resolved: name_part = f"{resolved} (جد {prev_narrator})"

            # Kunya lookup
            if conn and name_part:
                real, _ = self._resolve_kunya(name_part, conn)
                if real != name_part:
                    name_part = f"{name_part} [{real}]"

            non_narrator = ('الله', 'رسول', 'ذلك', 'هذا', 'كان')
            if len(name_part) >= 3 and name_part not in non_narrator and not name_part.startswith('رسول الله'):
                raw_chain.append(name_part)

        # Reverse chain so it descends: Sahabi -> Tabi'i -> ... -> Compiler teacher
        descending_narrators = list(reversed(raw_chain))

        # 3. Build Descending Luxury Mermaid Diagram
        nodes_info = []
        mermaid_lines = ["graph TD"]
        class_defs = [
            "    classDef prophet fill:#18181b,stroke:#f59e0b,stroke-width:2px,color:#fef3c7,rx:10px,ry:10px;",
            "    classDef sahabi fill:#064e3b,stroke:#10a37f,stroke-width:2px,color:#ecfdf5,rx:8px,ry:8px;",
            "    classDef commonlink fill:#1e1b4b,stroke:#6366f1,stroke-width:2.5px,color:#e0e7ff,rx:8px,ry:8px;",
            "    classDef reliable fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc,rx:6px,ry:6px;",
            "    classDef acceptable fill:#27272a,stroke:#71717a,stroke-width:1.5px,color:#f4f4f5,rx:6px,ry:6px;",
            "    classDef weak fill:#450a0a,stroke:#f43f5e,stroke-width:1.5px,color:#fff1f2,rx:6px,ry:6px;",
            "    classDef compiler fill:#09090b,stroke:#0ea5e9,stroke-width:2px,color:#f0f9ff,rx:8px,ry:8px;",
            "    classDef unknown fill:#27272a,stroke:#52525b,stroke-width:1.5px,color:#e4e4e7,rx:6px,ry:6px;"
        ]

        # Top node: Prophet ﷺ
        mermaid_lines.append('    P(["رسول الله ﷺ<br/><small>خاتم الأنبياء والمرسلين</small>"]):::prophet')
        prev_node_id = "P"

        for i, narrator in enumerate(descending_narrators):
            nid = f"N{i+1}"
            clean_n = narrator.replace('"', '').replace("'", "")
            norm_n = self._normalize_arabic(clean_n)

            grade_key = "reliable"
            grade_title = "ثقة"

            # Check Sahabi
            sahabi_meta = self._get_sahabi_meta(norm_n)
            if i == 0 or sahabi_meta:
                grade_key = "sahabi"
                meta_str = sahabi_meta if sahabi_meta else "صحابي جليل وروايته حجة"
                label = f"<b>{clean_n} رضي الله عنه</b><br/><small>{meta_str}</small>"
                grade_title = "صحابي جليل"
            else:
                if conn:
                    grade_key, grade_title = self._get_narrator_grade(clean_n, conn)
                label = f"{clean_n}<br/><small>({grade_title})</small>"

            nodes_info.append({
                "id": nid,
                "name": clean_n,
                "grade": grade_title,
                "status": grade_key
            })

            mermaid_lines.append(f'    {nid}["{label}"]:::{grade_key}')
            mermaid_lines.append(f"    {prev_node_id} --> {nid}")
            prev_node_id = nid

        # Bottom node: Compiler Book
        book_titles = {
            "bukhari": "صحيح البخاري",
            "muslim": "صحيح مسلم",
            "abudawud": "سنن أبي داود",
            "tirmidhi": "جامع الترمذي",
            "nasai": "سنن النسائي",
            "ibnmajah": "سنن ابن ماجه"
        }
        b_title = book_titles.get(book, f"كتاب {book}")
        comp_id = "COMP"
        mermaid_lines.append(f'    {comp_id}["{b_title}<br/><small>حديث رقم {hadith_number}</small>"]:::compiler')
        mermaid_lines.append(f"    {prev_node_id} --> {comp_id}")

        if conn: conn.close()

        mermaid_lines.extend(class_defs)
        mermaid_diagram = "\n".join(mermaid_lines)

        return json.dumps({
            "book": book,
            "hadith_number": hadith_number,
            "narrators_count": len(descending_narrators),
            "narrators": nodes_info,
            "mermaid_diagram": mermaid_diagram
        }, ensure_ascii=False, indent=2)
