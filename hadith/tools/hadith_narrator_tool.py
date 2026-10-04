"""
title: Hadith Narrator (Rijal) Biography & Network Tool
author: Hadith Project
author_url: https://github.com/hadith-ksa
version: 1.0.0
description: Comprehensive biographical lookup across 115,735 Hadith narrators, Jarh wa Ta'dil credibility evaluations, death dates, tabaqat, and book-level transmission networks.
"""

import os
import re
import json
import sqlite3
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field

class Tools:
    class Valves(BaseModel):
        DB_PATH: str = Field(
            default=r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\hadith_rijal.db",
            description="Path to hadith_rijal.db containing narrators, narrators_fts, isnad_nodes, and isnad_links."
        )

    def __init__(self):
        self.valves = self.Valves()

    SYSTEM_INSTRUCTIONS = """
    # HADITH RIJAL & JARH WA TA'DIL EVALUATION GUIDELINES:
    1. Jarh wa Ta'dil Hierarchy (مراتب الجرح والتعديل):
       - Tier 1 (Highest): Thiqah Thabt / Thiqah Hafiz (ثقة ثبت / ثقة حافظ) - exemplary authority.
       - Tier 2: Thiqah / Saduq (ثقة / صدوق حسن الحديث) - acceptable narrator of Sahih/Hasan hadith.
       - Tier 3 (Contested/Minor Weakness): Saduq Yahim / Layyin (صدوق يهم / لين الحديث) - corroborated narrations accepted.
       - Tier 4 (Severe Weakness): Da'if / Matruk / Munkar (ضعيف / متروك / منكر الحديث) - rejected unless severe shawahid exist.
       - Tier 5 (Discredited): Kadhdhab / Wadda' (كذاب / وضاع) - fabricated narrations.
    2. Transmission Analysis:
       - When inspecting a narrator, highlight their death year (وفاته), geographical hub (Kufah, Basrah, Madinah, Damascus), generation (Tabaqah), and key teachers and students.
       - Use `get_book_narrator_network` to visualize how central this narrator is within a specific collection (e.g. Sahih al-Bukhari).
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

    def search_narrator(self, query: str, limit: int = 5) -> str:
        """
        Search the 115,735 Rijal database using full-text search (FTS5) or normalized Arabic matching.
        
        :param query: Name, kunya, or title of the narrator (e.g. 'سفيان الثوري', 'الزهري', 'شعبة').
        :param limit: Maximum results to return (default: 5).
        :return: JSON formatted list of matching narrators with ID, full name, grade, death year, and city.
        """
        if not os.path.exists(self.valves.DB_PATH):
            return json.dumps({"error": "Database not found."}, ensure_ascii=False)

        q_clean = query.strip()
        q_norm = self._normalize_arabic(q_clean)
        if not q_norm:
            return json.dumps({"error": "Query cannot be empty."}, ensure_ascii=False)

        try:
            conn = sqlite3.connect(self.valves.DB_PATH)
            cur = conn.cursor()

            # Try FTS5 first
            fts_query = " ".join([f'"{w}"*' for w in q_norm.split() if len(w) >= 2])
            rows = []
            if fts_query:
                try:
                    cur.execute("""
                        SELECT n.id, n.full_name, n.grade_ar, n.grade_en, n.death, n.city, n.tabaqat
                        FROM narrators_fts f
                        JOIN narrators n ON f.rowid = n.id
                        WHERE narrators_fts MATCH ?
                        LIMIT ?
                    """, (fts_query, limit))
                    rows = cur.fetchall()
                except Exception:
                    rows = []

            # Fallback to LIKE if FTS yielded few or no results
            if not rows:
                cur.execute("""
                    SELECT id, full_name, grade_ar, grade_en, death, city, tabaqat
                    FROM narrators
                    WHERE full_name_norm LIKE ? OR full_name_norm LIKE ?
                    LIMIT ?
                """, (f"%{q_norm}%", f"%{q_clean}%", limit))
                rows = cur.fetchall()

            conn.close()

            results = []
            for r in rows:
                results.append({
                    "id": r[0],
                    "name": r[1],
                    "grade_ar": r[2] or "غير محدد",
                    "grade_en": r[3] or "unspecified",
                    "death": r[4] or "غير معروف",
                    "city": r[5] or "غير محدد",
                    "tabaqat": r[6] or "غير محدد"
                })

            return json.dumps({
                "query": query,
                "matches_count": len(results),
                "narrators": results
            }, ensure_ascii=False, indent=2)

        except Exception as e:
            return json.dumps({"error": f"Narrator search failed: {str(e)}"}, ensure_ascii=False)

    def get_narrator_biography(self, narrator_id: int) -> str:
        """
        Fetch complete biographical profile of a narrator by their database ID.
        
        :param narrator_id: Integer ID of the narrator from search_narrator.
        :return: JSON formatted detailed biography including classical sources, teachers, and students.
        """
        if not os.path.exists(self.valves.DB_PATH):
            return json.dumps({"error": "Database not found."}, ensure_ascii=False)

        try:
            conn = sqlite3.connect(self.valves.DB_PATH)
            cur = conn.cursor()

            cur.execute("""
                SELECT id, full_name, kunya, grade_ar, grade_en, death, city, tabaqat,
                       laqab, nasab, classical_sources, teachers, students, namings
                FROM narrators
                WHERE id = ?
                LIMIT 1
            """, (narrator_id,))
            row = cur.fetchone()
            conn.close()

            if not row:
                return json.dumps({"error": f"Narrator ID {narrator_id} not found."}, ensure_ascii=False)

            def parse_list(val):
                if not val: return []
                try:
                    parsed = json.loads(val)
                    return parsed if isinstance(parsed, list) else [val]
                except Exception:
                    return [s.strip() for s in val.split(";") if s.strip()]

            return json.dumps({
                "id": row[0],
                "full_name": row[1],
                "kunya": row[2] or "",
                "grade_ar": row[3] or "غير محدد",
                "grade_en": row[4] or "unspecified",
                "death": row[5] or "غير معروف",
                "city": row[6] or "غير محدد",
                "tabaqat": row[7] or "غير محدد",
                "laqab": row[8] or "",
                "nasab": row[9] or "",
                "classical_sources": parse_list(row[10]),
                "teachers": parse_list(row[11]),
                "students": parse_list(row[12]),
                "alternate_namings": parse_list(row[13])
            }, ensure_ascii=False, indent=2)

        except Exception as e:
            return json.dumps({"error": f"Biography lookup failed: {str(e)}"}, ensure_ascii=False)

    def get_book_narrator_network(self, book: str, narrator_name: str = "") -> str:
        """
        Inspect precomputed transmission network for a specific canonical book, revealing central narrators and their links.
        
        :param book: Collection name: 'bukhari', 'muslim', 'tirmidhi', 'abudawud', 'nasai', 'ibnmajah', 'ahmed', 'malik', 'darimi'.
        :param narrator_name: Optional narrator name to focus on within that book's network.
        :return: JSON formatted top nodes and transmission links.
        """
        if not os.path.exists(self.valves.DB_PATH):
            return json.dumps({"error": "Database not found."}, ensure_ascii=False)

        book = book.lower().strip()
        norm_name = self._normalize_arabic(narrator_name) if narrator_name else ""

        try:
            conn = sqlite3.connect(self.valves.DB_PATH)
            cur = conn.cursor()

            if norm_name:
                cur.execute("""
                    SELECT name, count, grade_ar, grade_en, death, places
                    FROM isnad_nodes
                    WHERE LOWER(book) = ? AND (name_norm LIKE ? OR name LIKE ?)
                    LIMIT 5
                """, (book, f"%{norm_name}%", f"%{narrator_name}%"))
                nodes = cur.fetchall()

                cur.execute("""
                    SELECT source_name, target_name, weight
                    FROM isnad_links
                    WHERE LOWER(book) = ? AND (source_name LIKE ? OR target_name LIKE ?)
                    ORDER BY weight DESC
                    LIMIT 10
                """, (book, f"%{narrator_name}%", f"%{narrator_name}%"))
                links = cur.fetchall()
            else:
                cur.execute("""
                    SELECT name, count, grade_ar, grade_en, death, places
                    FROM isnad_nodes
                    WHERE LOWER(book) = ?
                    ORDER BY count DESC
                    LIMIT 10
                """, (book,))
                nodes = cur.fetchall()

                cur.execute("""
                    SELECT source_name, target_name, weight
                    FROM isnad_links
                    WHERE LOWER(book) = ?
                    ORDER BY weight DESC
                    LIMIT 15
                """, (book,))
                links = cur.fetchall()

            conn.close()

            node_list = []
            for n in nodes:
                node_list.append({
                    "name": n[0],
                    "hadith_count_in_book": n[1],
                    "grade_ar": n[2],
                    "grade_en": n[3],
                    "death": n[4],
                    "locations": n[5]
                })

            link_list = []
            for l in links:
                link_list.append({
                    "source": l[0],
                    "target": l[1],
                    "transmission_frequency": l[2]
                })

            return json.dumps({
                "book": book,
                "focus_narrator": narrator_name or "All Top Transmitters",
                "top_nodes": node_list,
                "strongest_links": link_list
            }, ensure_ascii=False, indent=2)

        except Exception as e:
            return json.dumps({"error": f"Transmission network lookup failed: {str(e)}"}, ensure_ascii=False)
