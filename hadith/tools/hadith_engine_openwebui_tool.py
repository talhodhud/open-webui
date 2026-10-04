"""
title: Hadith & Rijal Knowledge Engine
author: Advanced Islamic AI Team
author_url: https://github.com/mhdal
version: 1.3.0
license: MIT
description: Comprehensive tool for Hadith verification (Dorar.net), authentic explanations & vocabulary (HadeethEnc), narrator biographical evaluations & transmission graph (Itqan 115k Rijal), and canonical bilingual texts with verified Isnad Mermaid trees (Kutub al-Sittah).
"""

import json
import sqlite3
import re
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Optional, List, Dict, Any
from bs4 import BeautifulSoup
from pydantic import BaseModel, Field


class Tools:
    class Valves(BaseModel):
        sqlite_db_path: str = Field(
            default="c:\\Users\\mhdal\\OneDrive\\AI\\Hadith KSA\\hadith_rijal.db",
            description="Absolute path to the local Itqan SQLite database (hadith_rijal.db)."
        )
        http_timeout: int = Field(
            default=10,
            description="Default HTTP timeout in seconds for external APIs."
        )

    def __init__(self):
        self.valves = self.Valves()

    def _normalize_arabic(self, text: str) -> str:
        """Helper to normalize Arabic search terms."""
        if not text:
            return ""
        text = text.replace("أ", "ا").replace("إ", "ا").replace("آ", "ا")
        text = text.replace("ة", "ه").replace("ى", "ي")
        for c in ["\u064B", "\u064C", "\u064D", "\u064E", "\u064F", "\u0650", "\u0651", "\u0652"]:
            text = text.replace(c, "")
        return text.strip()

    def _get_salient_tokens(self, text: str) -> List[str]:
        """Extract meaningful root tokens from an Arabic narrator name."""
        norm = self._normalize_arabic(text)
        stopwords = {"بن", "ابن", "ابي", "ابو", "عبد", "الله", "عن", "حدثنا", "اخبرنا", "قال"}
        tokens = [w for w in re.split(r'[\s\-_،,.]+', norm) if w and w not in stopwords and len(w) > 2]
        return tokens

    async def lookup_narrator(self, name_or_id: str) -> str:
        """
        Search for a Hadith narrator (راوٍ) in the comprehensive 115,735 Rijal database.
        Returns full biography, reliability grade (ثقة / صدوق / ضعيف), death year, city, tabaqah, classical scholar assessments, and teachers/students.
        
        :param name_or_id: Arabic name, kunya, or integer ID of the narrator (e.g. 'شعبة بن الحجاج' or 'أبو هريرة' or '320').
        :return: Detailed scholarly narrator profile.
        """
        db_file = Path(self.valves.sqlite_db_path)
        if not db_file.exists():
            return f"❌ Database file not found at {db_file}. Please check the Valves configuration."

        try:
            conn = sqlite3.connect(db_file)
            cur = conn.cursor()

            term = name_or_id.strip()
            # If numeric ID
            if term.isdigit():
                cur.execute("""
                SELECT id, full_name, kunya, grade_ar, grade_en, death, city, tabaqat, laqab, classical_sources, teachers, students
                FROM narrators WHERE id = ?
                """, (int(term),))
                rows = cur.fetchall()
            else:
                norm_term = self._normalize_arabic(term)
                # First try FTS5
                try:
                    cur.execute("""
                    SELECT n.id, n.full_name, n.kunya, n.grade_ar, n.grade_en, n.death, n.city, n.tabaqat, n.laqab, n.classical_sources, n.teachers, n.students
                    FROM narrators_fts f
                    JOIN narrators n ON f.id = n.id
                    WHERE narrators_fts MATCH ?
                    LIMIT 3;
                    """, (f'"{norm_term}"',))
                    rows = cur.fetchall()
                except Exception:
                    rows = []

                # Fallback to direct LIKE
                if not rows:
                    cur.execute("""
                    SELECT id, full_name, kunya, grade_ar, grade_en, death, city, tabaqat, laqab, classical_sources, teachers, students
                    FROM narrators
                    WHERE full_name_norm LIKE ? OR kunya LIKE ?
                    LIMIT 3;
                    """, (f"%{norm_term}%", f"%{term}%"))
                    rows = cur.fetchall()

                # Fallback to salient token search
                if not rows:
                    tokens = self._get_salient_tokens(term)
                    if tokens:
                        conds = " OR ".join(["full_name_norm LIKE ?" for _ in tokens])
                        params = [f"%{t}%" for t in tokens]
                        cur.execute(f"""
                        SELECT id, full_name, kunya, grade_ar, grade_en, death, city, tabaqat, laqab, classical_sources, teachers, students
                        FROM narrators WHERE {conds} LIMIT 3;
                        """, params)
                        rows = cur.fetchall()

            conn.close()

            if not rows:
                return f"لم يتم العثور على ترجمة للراوي '{name_or_id}' في قاعدة بيانات الرواة."

            results = []
            for r in rows:
                nid, name, kunya, gr_ar, gr_en, death, city, tabaqat, laqab, sources_raw, teachers_raw, students_raw = r
                
                # Parse sources
                sources_str = ""
                try:
                    sources_dict = json.loads(sources_raw) if sources_raw else {}
                    if sources_dict:
                        src_lines = []
                        for s_name, s_info in sources_dict.items():
                            g = s_info.get("grade_ar") or s_info.get("grade_en") or ""
                            src_lines.append(f"  • {s_name}: {g}")
                        sources_str = "\n" + "\n".join(src_lines)
                except Exception:
                    sources_str = str(sources_raw)

                # Parse teachers & students count
                t_count = len(json.loads(teachers_raw)) if teachers_raw else 0
                s_count = len(json.loads(students_raw)) if students_raw else 0

                card = (
                    f"👤 **الراوي (معرف: {nid}):** {name}\n"
                    f"🏷️ **الكنية / اللقب:** {kunya or '-'} / {laqab or '-'}\n"
                    f"⚖️ **الرتبة والضبط:** {gr_ar} ({gr_en})\n"
                    f"📅 **سنة الوفاة:** {death} هـ | 📍 **البلد:** {city}\n"
                    f"📚 **الطبقة:** {tabaqat}\n"
                    f"👥 **الشيوخ والتلاميذ المسجلون:** {t_count} شيخاً | {s_count} تلميذاً"
                )
                if sources_str:
                    card += f"\n📖 **أقوال أئمة الجرح والتعديل:**{sources_str}"

                results.append(card)

            return "\n\n" + ("="*40) + "\n\n".join(results)

        except Exception as e:
            return f"❌ خطأ أثناء البحث عن الراوي: {str(e)}"

    async def trace_isnad_network(self, book: str, narrator_name: str) -> str:
        """
        Trace the transmission chain (Isnad Network) for a narrator in a specific Hadith collection.
        Shows who this narrator narrated from (teachers) and who narrated from them (students) in that book.
        Uses resilient tokenized search to handle full or abbreviated names.
        
        :param book: Hadith collection slug (e.g. 'bukhari', 'muslim', 'abudawud', 'tirmidhi', 'nasai', 'ibnmajah', 'ahmed', 'malik').
        :param narrator_name: Narrator name in Arabic (e.g. 'شعبة' or 'الزهري' or 'سفيان بن عيينة' or 'عمر بن الخطاب').
        :return: List of transmission edges with frequency counts in the book.
        """
        db_file = Path(self.valves.sqlite_db_path)
        if not db_file.exists():
            return f"❌ Database file not found at {db_file}."

        try:
            conn = sqlite3.connect(db_file)
            cur = conn.cursor()
            norm_name = self._normalize_arabic(narrator_name.strip())

            # 1. Try exact/substring match
            cur.execute("""
            SELECT source_name, weight FROM isnad_links
            WHERE book = ? AND (target_name LIKE ? OR target_name = ?)
            ORDER BY weight DESC LIMIT 5;
            """, (book.lower(), f"%{norm_name}%", narrator_name))
            teachers = cur.fetchall()

            cur.execute("""
            SELECT target_name, weight FROM isnad_links
            WHERE book = ? AND (source_name LIKE ? OR source_name = ?)
            ORDER BY weight DESC LIMIT 5;
            """, (book.lower(), f"%{norm_name}%", narrator_name))
            students = cur.fetchall()

            # 2. If no direct match, use salient token matching
            if not teachers and not students:
                tokens = self._get_salient_tokens(narrator_name)
                if tokens:
                    t_conds = " OR ".join(["target_name LIKE ?" for _ in tokens])
                    cur.execute(f"""
                    SELECT source_name, weight FROM isnad_links
                    WHERE book = ? AND ({t_conds})
                    ORDER BY weight DESC LIMIT 5;
                    """, [book.lower()] + [f"%{t}%" for t in tokens])
                    teachers = cur.fetchall()

                    s_conds = " OR ".join(["source_name LIKE ?" for _ in tokens])
                    cur.execute(f"""
                    SELECT target_name, weight FROM isnad_links
                    WHERE book = ? AND ({s_conds})
                    ORDER BY weight DESC LIMIT 5;
                    """, [book.lower()] + [f"%{t}%" for t in tokens])
                    students = cur.fetchall()

            conn.close()

            if not teachers and not students:
                return f"لم يتم العثور على أسانيد مسجلة للراوي '{narrator_name}' في كتاب '{book}'."

            out = [f"📊 **شبكة أسانيد الراوي ({narrator_name}) في كتاب ({book}):**\n"]
            if teachers:
                out.append("⬆️ **روى عن (شيوخه في هذا الكتاب):**")
                for t, w in teachers:
                    out.append(f"  • {t} (تكرر السند: {w} مرة)")
            if students:
                out.append("\n⬇️ **روى عنه (تلاميذه في هذا الكتاب):**")
                for s, w in students:
                    out.append(f"  • {s} (تكرر السند: {w} مرة)")

            return "\n".join(out)

        except Exception as e:
            return f"❌ خطأ أثناء تتبع شبكة السند: {str(e)}"

    async def get_hadith_isnad_tree(self, book: str, hadith_number: int) -> str:
        """
        Extract the exact Isnad transmission chain from a specific Hadith text and generate a verified Mermaid flowchart with narrator reliability grades.
        Supports both local database lookup and global canonical Hadith numbering via Hadith CDN.
        
        :param book: Collection slug (e.g. 'bukhari', 'muslim', 'abudawud', 'tirmidhi', 'nasai', 'ibnmajah').
        :param hadith_number: Number of the Hadith in the book (e.g. 1 or 1051).
        :return: Extracted Isnad segment, verified narrators list, and ready-to-render Mermaid code.
        """
        db_file = Path(self.valves.sqlite_db_path)
        if not db_file.exists():
            return f"❌ Database file not found at {db_file}."

        try:
            conn = sqlite3.connect(db_file)
            cur = conn.cursor()

            cur.execute("""
            SELECT arabic_text, english_narrator, english_text, chapter
            FROM hadiths WHERE book = ? AND id_in_book = ? LIMIT 1;
            """, (book.lower(), hadith_number))
            row = cur.fetchone()

            if row:
                ar_text, en_narrator, en_text, chapter = row
            else:
                # Fallback to CDN for canonical numbers
                try:
                    url = f"https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-{book.lower()}/{hadith_number}.json"
                    headers = {"User-Agent": "Mozilla/5.0"}
                    req = urllib.request.Request(url, headers=headers)
                    with urllib.request.urlopen(req, timeout=self.valves.http_timeout) as resp:
                        data = json.loads(resp.read().decode("utf-8"))
                    h_obj = data.get("hadiths", [{}])[0]
                    ar_text = h_obj.get("text", "")
                    if not ar_text:
                        conn.close()
                        return f"لم يتم العثور على الحديث رقم {hadith_number} في كتاب {book}."
                    chapter = str(data.get("metadata", {}).get("section", {}).get("name", ""))
                    # Cache in local SQLite
                    try:
                        cur.execute("""
                        INSERT OR IGNORE INTO hadiths (book, id_in_book, chapter, arabic_text, english_narrator, english_text)
                        VALUES (?, ?, ?, ?, ?, ?)
                        """, (book.lower(), hadith_number, chapter, ar_text, "", ""))
                        conn.commit()
                    except Exception:
                        pass
                except Exception as ex:
                    conn.close()
                    return f"لم يتم العثور على الحديث رقم {hadith_number} في كتاب {book}: {str(ex)}"

            # Split isnad from matn
            clean_ar = re.sub(r'[\u064B-\u065F\u0670]', '', ar_text)
            matn_markers = [
                r'[\s،]+(?:أنه|انه|أنها|انها)\s+(?:قال|قالت)\b',
                r'[\s،]+(?:قال|قالت|يقول|سمعت)\s+(?:رسول الله|النبي)\b',
                r'[\s،]+عن\s+(?:النبي|رسول الله)\b',
                r'[\s،]+عهد\s+رسول الله\b'
            ]
            matn_idx = -1
            for pat in matn_markers:
                m = re.search(pat, clean_ar)
                if m and (matn_idx == -1 or m.start() < matn_idx):
                    matn_idx = m.start()

            isnad_raw = clean_ar[:matn_idx] if matn_idx != -1 else clean_ar[:250]
            matn_raw = clean_ar[matn_idx:] if matn_idx != -1 else clean_ar[250:]

            verb_pattern = r'(?:[،:.\s]+|^)(?:حدثنا|حدثني|[إأا]خبرنا|[إأا]خبرني|[إأا]نبانا|عن|سمعت|سمع|قال)\s+'
            raw_segments = [s.strip() for s in re.split(verb_pattern, isnad_raw) if len(s.strip()) > 2]

            def resolve_narrator(seg: str, is_last: bool = False):
                seg_clean = re.sub(r'^[،:.\s]+|[،:.\s]+$', '', seg).strip()
                seg_clean = re.sub(r'رضي\s+الله\s+عنه(?:ما)?|رحمه\s+الله', '', seg_clean).strip()
                seg_clean = re.sub(r'^(?:حدثنا|حدثني|[إأا]خبرنا|[إأا]خبرني|[إأا]نبانا|عن|سمعت|سمع|قال)\s+', '', seg_clean).strip()
                norm = self._normalize_arabic(seg_clean)
                norm_abu = norm.replace('ابي ', 'ابو ')

                if is_last:
                    order_clause = "CASE WHEN grade_ar = 'صحابي' THEN 0 WHEN grade_ar LIKE '%ثقة%' THEN 1 WHEN grade_ar LIKE '%صدوق%' THEN 2 ELSE 3 END"
                else:
                    order_clause = "CASE WHEN grade_ar LIKE '%ثقة%' THEN 0 WHEN grade_ar LIKE '%صدوق%' THEN 1 WHEN grade_ar = 'صحابي' THEN 2 ELSE 3 END"

                # 1. Check if full_name_norm starts with this name
                cur.execute(f'''
                SELECT full_name, grade_ar FROM narrators 
                WHERE full_name_norm LIKE ? 
                ORDER BY {order_clause}, LENGTH(full_name) ASC 
                LIMIT 1
                ''', (f'{norm_abu}%',))
                m = cur.fetchone()
                if m:
                    return m[0], m[1]

                # 2. Check kunya if starts with Abu/Abi
                if norm.startswith(('ابو ', 'ابي ')):
                    k_search = seg_clean.replace('أبي ', 'أبو ').replace('ابي ', 'ابو ')
                    cur.execute(f'''
                    SELECT full_name, grade_ar FROM narrators 
                    WHERE kunya = ? OR kunya LIKE ? 
                    ORDER BY 
                        CASE WHEN kunya = ? THEN 0 ELSE 1 END,
                        {order_clause},
                        LENGTH(full_name) ASC 
                    LIMIT 1
                    ''', (k_search, f'%{k_search}%', k_search))
                    m = cur.fetchone()
                    if m:
                        return m[0], m[1]

                # 3. Salient tokens match
                tokens = self._get_salient_tokens(seg_clean)
                if len(tokens) >= 2:
                    conds = ' AND '.join(['full_name_norm LIKE ?' for _ in tokens[:3]])
                    params = [f'%{t}%' for t in tokens[:3]]
                    cur.execute(f'''
                    SELECT full_name, grade_ar FROM narrators 
                    WHERE {conds} 
                    ORDER BY {order_clause}, LENGTH(full_name) ASC 
                    LIMIT 1
                    ''', params)
                    m = cur.fetchone()
                    if m:
                        return m[0], m[1]

                # 4. Substring match on full_name_norm
                cur.execute(f'''
                SELECT full_name, grade_ar FROM narrators 
                WHERE full_name_norm LIKE ? 
                ORDER BY {order_clause}, LENGTH(full_name) ASC 
                LIMIT 1
                ''', (f'%{norm}%',))
                m = cur.fetchone()
                if m:
                    return m[0], m[1]

                return None, None

            nodes = []
            mermaid_lines = []

            # Add compiler as initial node
            compiler_name = f"الإمام {book.capitalize()}"
            compiler_id = "compiler"
            mermaid_lines.append(f'    {compiler_id}["{compiler_name}"]')
            prev_node_id = compiler_id

            valid_segments = []
            for seg in raw_segments:
                seg_clean = re.sub(r'^[،:.\s]+|[،:.\s]+$', '', seg).strip()
                seg_clean = re.sub(r'رضي\s+الله\s+عنه(?:ما)?|رحمه\s+الله', '', seg_clean).strip()
                seg_clean = re.sub(r'على\s+المنبر', '', seg_clean).strip()
                seg_clean = re.sub(r'^(?:حدثنا|حدثني|[إأا]خبرنا|[إأا]خبرني|[إأا]نبانا|عن|سمعت|سمع|قال)\s+', '', seg_clean).strip()
                seg_clean = re.sub(r'[\s،]+(?:أنه|انه|أنها|انها)$', '', seg_clean).strip()
                seg_clean = re.sub(r'[\s،]+يقول$', '', seg_clean).strip()
                seg_clean = re.sub(r'^[،:.\s]+|[،:.\s]+$', '', seg_clean).strip()
                if len(seg_clean) < 3 or seg_clean in ['لما', 'ان', 'انه', 'انها']:
                    continue
                valid_segments.append(seg_clean)

            total_valid = len(valid_segments[:8])
            for idx, seg_clean in enumerate(valid_segments[:8]):
                is_last = (idx == total_valid - 1)
                full_name, grade = resolve_narrator(seg_clean, is_last=is_last)
                node_id = f"N{idx+1}"
                if is_last:
                    grade = "صحابي"

                label = f"{seg_clean}<br/>[{grade}]" if grade else seg_clean
                mermaid_lines.append(f'    {node_id}["{label}"]')
                mermaid_lines.append(f'    {prev_node_id} --> {node_id}')
                prev_node_id = node_id

            # Add Prophet as final apex node
            prophet_id = "Prophet"
            mermaid_lines.append(f'    {prophet_id}["النبي ﷺ"]:::prophet')
            mermaid_lines.append(f'    {prev_node_id} --> {prophet_id}')
            mermaid_lines.append('    classDef prophet fill:#fdf2d0,stroke:#a67c00,stroke-width:2px;')

            conn.close()

            mermaid_code = "```mermaid\nflowchart TD\n" + "\n".join(mermaid_lines) + "\n```"

            return (
                f"📜 **سند الحديث المستخرج ({book.capitalize()} #{hadith_number}):**\n"
                f"{isnad_raw.strip()}...\n\n"
                f"📊 **شجرة الإسناد المستخرجة آلياً (Mermaid):**\n"
                f"{mermaid_code}\n\n"
                f"📖 **مطلع المتن:** {matn_raw[:150].strip()}..."
            )

        except Exception as e:
            return f"❌ خطأ أثناء استخراج شجرة الإسناد: {str(e)}"

    async def verify_hadith_dorar(self, hadith_text: str) -> str:
        """
        Verify Hadith authenticity, takhrij, and scholar grades in real-time using Dorar.net Hadith Encyclopedia (الموسوعة الحديثية).
        
        :param hadith_text: Text snippet of the Hadith in Arabic (e.g. 'إنما الأعمال بالنيات').
        :return: Matn, primary narrator, muhaddith (scholar), source book, and authenticity evaluation.
        """
        try:
            encoded_query = urllib.parse.quote(hadith_text.strip())
            url = f"https://dorar.net/dorar_api.json?skey={encoded_query}"
            headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
            req = urllib.request.Request(url, headers=headers)

            with urllib.request.urlopen(req, timeout=self.valves.http_timeout) as resp:
                data = json.loads(resp.read().decode("utf-8"))

            html = data.get("ahadith", {}).get("result", "")
            if not html:
                return "لم يتم العثور على نتائج في الموسوعة الحديثية لهذا النص."

            soup = BeautifulSoup(html, "html.parser")
            hadiths = soup.find_all("div", class_="hadith")
            infos = soup.find_all("div", class_="hadith-info")

            results = []
            for i in range(min(5, len(hadiths))):
                matn = hadiths[i].get_text(strip=True)
                info = infos[i].get_text(" | ", strip=True) if i < len(infos) else ""
                results.append(f"🔹 **الحديث [{i+1}]:** {matn}\n   📋 **البيانات والتخريج:** {info}")

            return "\n\n".join(results)
        except Exception as e:
            return f"❌ خطأ أثناء الاستعلام من الدرر السنية: {str(e)}"

    async def get_hadith_explanation_hadeethenc(self, search_phrase: str, language: str = "ar") -> str:
        """
        Retrieve authentic Hadith with simplified explanation (شرح الحديث), rare word meanings (معاني الكلمات الغريبة), and derived lessons (فوائد وهدايات) from HadeethEnc.com.
        
        :param search_phrase: Search keyword or phrase (e.g. 'الدماء' or 'الأعمال بالنيات').
        :param language: Language code ('ar' for Arabic, 'en' for English, 'fr', 'es', 'ur', etc.).
        :return: Hadith matn, attribution, grade, simplified explanation, and educational benefits.
        """
        try:
            encoded = urllib.parse.quote(search_phrase.strip())
            search_url = f"https://hadeethenc.com/api/v1/hadeeths/search/?phrase={encoded}&language={language}&page=1&per_page=1"
            headers = {"User-Agent": "Mozilla/5.0"}
            req = urllib.request.Request(search_url, headers=headers)

            with urllib.request.urlopen(req, timeout=self.valves.http_timeout) as resp:
                search_data = json.loads(resp.read().decode("utf-8"))

            if isinstance(search_data, list):
                items = search_data
            elif isinstance(search_data, dict):
                items = search_data.get("data", [])
            else:
                items = []

            if not items:
                return f"لم يتم العثور على شرح للحديث في موسوعة الأحاديث النبوية لعبارة: '{search_phrase}'."

            hadith_id = items[0].get("id")

            # Fetch detailed card
            detail_url = f"https://hadeethenc.com/api/v1/hadeeths/one/?id={hadith_id}&language={language}"
            req_detail = urllib.request.Request(detail_url, headers=headers)
            with urllib.request.urlopen(req_detail, timeout=self.valves.http_timeout) as resp:
                h = json.loads(resp.read().decode("utf-8"))

            output = (
                f"📌 **العنوان:** {h.get('title')}\n"
                f"📜 **المتن:** {h.get('hadeeth')}\n"
                f"⚖️ **التخريج والحكم:** {h.get('attribution')} | **الدرجة:** {h.get('grade')}\n\n"
                f"📖 **الشرح الميسر:**\n{h.get('explanation')}\n\n"
            )
            hints = h.get("hints", [])
            if hints:
                output += "💡 **الفوائد والهدايات المستنبطة:**\n" + "\n".join([f"  • {hint}" for hint in hints])

            return output
        except Exception as e:
            return f"❌ خطأ أثناء جلب الشرح من HadeethEnc: {str(e)}"

    async def get_hadith_by_number(self, book: str, hadith_number: int, language: str = "ar") -> str:
        """
        Fetch a canonical Hadith by book slug and Hadith number.
        Uses local database first; falls back to Hadith-API CDN.
        
        :param book: Collection slug (e.g. 'bukhari', 'muslim', 'abudawud', 'tirmidhi', 'nasai', 'ibnmajah', 'malik').
        :param hadith_number: Hadith number within the book (e.g. 1 or 1051).
        :param language: 'ar' for Arabic or 'en' for English.
        :return: Canonical Hadith text with chapter metadata.
        """
        if hadith_number <= 0:
            return f"❌ رقم الحديث غير صالح ({hadith_number}). يرجى تحديد رقم الحديث الصحيح في كتاب {book}."

        db_file = Path(self.valves.sqlite_db_path)
        if db_file.exists():
            try:
                conn = sqlite3.connect(db_file)
                cur = conn.cursor()
                cur.execute("""
                SELECT arabic_text, english_narrator, english_text, chapter
                FROM hadiths WHERE book = ? AND id_in_book = ?
                LIMIT 1;
                """, (book.lower(), hadith_number))
                row = cur.fetchone()

                if row:
                    ar_text, en_narrator, en_text, chapter = row
                    if language == "en" and en_text and en_text.strip():
                        conn.close()
                        return f"📚 **Book:** {book.capitalize()} | **Hadith #:** {hadith_number} (Chapter {chapter})\n\n**{en_narrator}**\n{en_text}"
                    elif language == "ar" and ar_text and ar_text.strip():
                        conn.close()
                        return f"📚 **كتاب:** {book.capitalize()} | **حديث رقم:** {hadith_number} (الباب: {chapter})\n\n{ar_text}"
                conn.close()
            except Exception:
                pass

        # Fallback to CDN
        try:
            edition = f"ara-{book.lower()}" if language == "ar" else f"eng-{book.lower()}"
            url = f"https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/{edition}/{hadith_number}.json"
            headers = {"User-Agent": "Mozilla/5.0"}
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=self.valves.http_timeout) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            h_obj = data.get("hadiths", [{}])[0]
            grades = h_obj.get("grades", [])
            grades_str = ", ".join([f"{g.get('name')}: {g.get('grade')}" for g in grades]) if grades else "Not specified"
            h_text = h_obj.get("text", "")

            # Update cache in SQLite if possible
            if db_file.exists() and h_text:
                try:
                    conn = sqlite3.connect(db_file)
                    cur = conn.cursor()
                    if language == "en":
                        cur.execute("UPDATE hadiths SET english_text = ? WHERE book = ? AND id_in_book = ?", (h_text, book.lower(), hadith_number))
                    else:
                        cur.execute("UPDATE hadiths SET arabic_text = ? WHERE book = ? AND id_in_book = ?", (h_text, book.lower(), hadith_number))
                    conn.commit()
                    conn.close()
                except Exception:
                    pass

            return (
                f"📚 **{book.capitalize()} (Hadith #{hadith_number}):**\n\n"
                f"{h_text}\n\n"
                f"⚖️ **الأحكام:** {grades_str}"
            )
        except Exception as e:
            return f"❌ تعذر العثور على الحديث رقم {hadith_number} في كتاب {book}: {str(e)}"

    async def search_hadith_corpus(self, query: str, book: str = "all", limit: int = 5) -> str:
        """
        Search for Hadiths across the Six Canonical Books (Kutub al-Sittah: Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasai, Ibn Majah) and Musnad Ahmad by keywords or phrase.
        Returns the collection name, chapter, Hadith number, and complete text (Sanad + Matn).
        
        :param query: Search keywords or phrase in Arabic (e.g. 'الصلاة جامعة' or 'إنما الأعمال بالنيات').
        :param book: Target collection ('all', 'bukhari', 'muslim', 'abudawud', 'tirmidhi', 'nasai', 'ibnmajah', 'ahmed').
        :param limit: Maximum number of results to return (default 5).
        :return: Matching Hadiths with collection names, numbers, and text.
        """
        db_file = Path(self.valves.sqlite_db_path)
        if not db_file.exists():
            return f"❌ Database file not found at {db_file}."

        try:
            conn = sqlite3.connect(db_file)

            def strip_tashkeel(text: str) -> str:
                if not text:
                    return ""
                text = re.sub(r'[\u064B-\u065F\u0670]', '', text)
                return text.replace("أ", "ا").replace("إ", "ا").replace("آ", "ا").replace("ة", "ه").replace("ى", "ي").strip()

            conn.create_function("strip_tashkeel", 1, strip_tashkeel)
            cur = conn.cursor()

            q_norm = strip_tashkeel(query)
            tokens = [t for t in q_norm.split() if len(t) > 2]
            if not tokens:
                tokens = [q_norm]

            conds = " AND ".join(["strip_tashkeel(arabic_text) LIKE ?" for _ in tokens])
            params = [f"%{t}%" for t in tokens]

            if book and book.lower() != "all":
                conds = f"book = ? AND ({conds})"
                params = [book.lower()] + params

            cur.execute(f"""
            SELECT book, chapter, id_in_book, arabic_text, english_narrator, english_text
            FROM hadiths 
            WHERE {conds}
            LIMIT ?;
            """, params + [limit])
            rows = cur.fetchall()
            conn.close()

            if not rows:
                return f"لم يتم العثور على أحاديث تطابق العبارة '{query}' في كتاب '{book}'."

            out = [f"🔍 **نتائج البحث عن ({query}) في مصادر الحديث:**\n"]
            for idx, r in enumerate(rows, 1):
                b_name, ch, h_num, ar_txt, en_narr, en_txt = r
                snippet = ar_txt[:250].strip() + ("..." if len(ar_txt) > 250 else "")
                out.append(
                    f"🔹 **[{idx}] {b_name.capitalize()} (حديث رقم: {h_num} | الباب: {ch}):**\n"
                    f"{snippet}\n"
                )

            return "\n".join(out)
        except Exception as e:
            return f"❌ خطأ أثناء البحث في نصوص الأحاديث: {str(e)}"
