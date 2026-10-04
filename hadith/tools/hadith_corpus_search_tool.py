"""
title: Hadith Corpus & Connections Search Tool
author: Hadith Project
author_url: https://github.com/hadith-ksa
version: 1.0.0
description: Autonomous full-text search across 60,000+ hadiths, cross-collection parallel hadiths, and thematic family topics.
"""

import os
import re
import json
import sqlite3
import urllib.request
import urllib.error
from typing import Optional, Dict, Any, List
from pydantic import BaseModel, Field

class Tools:
    class Valves(BaseModel):
        DB_PATH: str = Field(
            default=r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\hadith_rijal.db",
            description="Absolute path to hadith_rijal.db containing the hadith corpus and cross-hadith connections."
        )
        ITQAN_DATA_DIR: str = Field(
            default=r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\itqan-repo\app\data",
            description="Directory containing Itqan datasets."
        )
        REQUEST_TIMEOUT: int = Field(
            default=10,
            description="Network request timeout in seconds."
        )

    def __init__(self):
        self.valves = self.Valves()

    SYSTEM_INSTRUCTIONS = """
    # HADITH CORPUS & CROSS-REFERENCE GUIDELINES:
    1. Search & Retrieval:
       - When searching for hadith text without an exact number, use `search_hadith_corpus` first with key words (diacritics are handled automatically).
       - When the user asks for a specific hadith (e.g., "Sahih al-Bukhari #1051" or "Muslim #94"), use `get_hadith_by_number`.
    2. Parallel Narrations (Turuq & Shawahid):
       - After finding a hadith, use `get_hadith_connections` to discover parallel narrations across other canonical collections (e.g. Bukhari parallel to Muslim, Abu Dawud, Tirmidhi, etc.).
       - Point out shared keywords and topic families to give the user a comprehensive multi-book perspective.
    3. Thematic Families:
       - When the user inquires about a broader subject (e.g. 'prayer', 'creation', 'knowledge', 'zakat'), use `get_thematic_family` to reveal the lexical roots and associated hadith counts.
    """

    def _normalize_text(self, text: str) -> str:
        if not text:
            return ""
        t = re.sub(r'[\u064B-\u065F\u0670\u0610-\u061A\u06D6-\u06ED]', '', text)
        t = t.replace('\u0640', '')
        t = re.sub(r'[إأآٱ]', 'ا', t)
        t = re.sub(r'ة', 'ه', t)
        t = re.sub(r'ى', 'ي', t)
        return t.strip()

    def search_hadith_corpus(self, query: str, book: str = "all", limit: int = 5) -> str:
        """
        Search 60,000+ hadiths across collections using normalized, tashkeel-insensitive matching.
        
        :param query: Arabic keywords or phrase to search (e.g. 'كسفت الشمس' or 'انما الاعمال بالنيات').
        :param book: Target collection (e.g. 'bukhari', 'muslim', 'abudawud', 'tirmidhi', 'nasai', 'ibnmajah', 'malik') or 'all'.
        :param limit: Maximum number of hadiths to return (default: 5).
        :return: JSON formatted results containing book, hadith_id, Arabic text preview, and English narration if available.
        """
        if not os.path.exists(self.valves.DB_PATH):
            return json.dumps({"error": f"Database not found at {self.valves.DB_PATH}"}, ensure_ascii=False)

        norm_query = self._normalize_text(query)
        if not norm_query:
            return json.dumps({"error": "Search query cannot be empty."}, ensure_ascii=False)

        try:
            conn = sqlite3.connect(self.valves.DB_PATH)
            conn.create_function("NORM_AR", 1, self._normalize_text)
            cur = conn.cursor()

            sql = """
                SELECT book, chapter, hadith_id, id_in_book, arabic_text, english_narrator, english_text
                FROM hadiths
                WHERE NORM_AR(arabic_text) LIKE ?
            """
            params = [f"%{norm_query}%"]

            if book and book.lower() != "all":
                sql += " AND LOWER(book) = ?"
                params.append(book.lower().strip())

            sql += " LIMIT ?"
            params.append(max(1, min(limit, 20)))

            cur.execute(sql, params)
            rows = cur.fetchall()
            conn.close()

            results = []
            for r in rows:
                results.append({
                    "book": r[0],
                    "chapter": r[1],
                    "hadith_number": r[2],
                    "id_in_book": r[3],
                    "arabic_text": r[4],
                    "english_narrator": r[5] or "",
                    "english_text": r[6] or ""
                })

            return json.dumps({
                "query": query,
                "book": book,
                "matches_count": len(results),
                "results": results
            }, ensure_ascii=False, indent=2)

        except Exception as e:
            return json.dumps({"error": f"Search failed: {str(e)}"}, ensure_ascii=False)

    def get_hadith_by_number(self, book: str, hadith_number: int, chapter: Optional[int] = None, language: str = "ar") -> str:
        """
        Fetch full hadith text by canonical book and hadith number with local cache and CDN fallback.
        
        :param book: Collection name: 'bukhari', 'muslim', 'tirmidhi', 'abudawud', 'nasai', 'ibnmajah', 'malik'.
        :param hadith_number: Canonical Hadith number (must be > 0).
        :param chapter: Optional chapter number (essential when numbers repeat across chapters).
        :param language: 'ar' for Arabic, 'en' for English translation.
        :return: JSON formatted hadith details.
        """
        book = book.lower().strip()
        hadith_number = int(hadith_number)
        if hadith_number <= 0:
            return json.dumps({"error": "hadith_number must be greater than 0"}, ensure_ascii=False)

        # 1. Local Database Lookup
        if os.path.exists(self.valves.DB_PATH):
            try:
                conn = sqlite3.connect(self.valves.DB_PATH)
                cur = conn.cursor()
                if chapter is not None:
                    cur.execute(
                        "SELECT book, chapter, hadith_id, arabic_text, english_narrator, english_text FROM hadiths WHERE LOWER(book)=? AND chapter=? AND (hadith_id=? OR id_in_book=?) LIMIT 1",
                        (book, chapter, hadith_number, hadith_number)
                    )
                else:
                    cur.execute(
                        "SELECT book, chapter, hadith_id, arabic_text, english_narrator, english_text FROM hadiths WHERE LOWER(book)=? AND (hadith_id=? OR id_in_book=?) LIMIT 1",
                        (book, hadith_number, hadith_number)
                    )
                row = cur.fetchone()
                conn.close()
                if row:
                    ar_text = row[3] or ""
                    en_text = row[5] or ""
                    if language == "en" and en_text.strip():
                        return json.dumps({
                            "source": "local_db",
                            "book": row[0],
                            "chapter": row[1],
                            "hadith_number": row[2],
                            "narrator": row[4],
                            "text": en_text,
                            "language": "en"
                        }, ensure_ascii=False)
                    elif language == "ar" and ar_text.strip():
                        return json.dumps({
                            "source": "local_db",
                            "book": row[0],
                            "chapter": row[1],
                            "hadith_number": row[2],
                            "narrator": row[4],
                            "text": ar_text,
                            "language": "ar"
                        }, ensure_ascii=False)
            except Exception:
                pass

        # 2. CDN Fallback
        prefix = "ara-" if language == "ar" else "eng-"
        url = f"https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/{prefix}{book}/{hadith_number}.json"

        try:
            req = urllib.request.Request(url, headers={"User-Agent": "HadithApp/1.0"})
            with urllib.request.urlopen(req, timeout=self.valves.REQUEST_TIMEOUT) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                hadith_data = data.get("hadiths", [{}])[0]
                text = hadith_data.get("text", "")

                # Cache back to local DB if available
                if os.path.exists(self.valves.DB_PATH) and text:
                    try:
                        conn = sqlite3.connect(self.valves.DB_PATH)
                        cur = conn.cursor()
                        if language == "ar":
                            cur.execute(
                                "INSERT OR REPLACE INTO hadiths (book, chapter, hadith_id, id_in_book, arabic_text, english_narrator, english_text) "
                                "VALUES (?, ?, ?, ?, ?, COALESCE((SELECT english_narrator FROM hadiths WHERE LOWER(book)=? AND hadith_id=?), ''), COALESCE((SELECT english_text FROM hadiths WHERE LOWER(book)=? AND hadith_id=?), ''))",
                                (book, 0, hadith_number, hadith_number, text, book, hadith_number, book, hadith_number)
                            )
                        else:
                            cur.execute(
                                "INSERT OR REPLACE INTO hadiths (book, chapter, hadith_id, id_in_book, arabic_text, english_narrator, english_text) "
                                "VALUES (?, ?, ?, ?, COALESCE((SELECT arabic_text FROM hadiths WHERE LOWER(book)=? AND hadith_id=?), ''), '', ?)",
                                (book, 0, hadith_number, hadith_number, book, hadith_number, text)
                            )
                        conn.commit()
                        conn.close()
                    except Exception:
                        pass

                return json.dumps({
                    "source": "cdn_api",
                    "book": book,
                    "hadith_number": hadith_number,
                    "text": text,
                    "language": language
                }, ensure_ascii=False)
        except Exception as e:
            return json.dumps({"error": f"Failed to retrieve hadith {book} #{hadith_number}: {str(e)}"}, ensure_ascii=False)

    def get_hadith_connections(self, book: str, hadith_number: int, limit: int = 5) -> str:
        """
        Discover parallel hadiths (Turuq & Shawahid) across 17 Hadith collections with shared keywords and similarity scores.
        
        :param book: Collection name of the source hadith (e.g. 'bukhari', 'muslim', 'abudawud').
        :param hadith_number: Number of the source hadith.
        :param limit: Maximum parallel connections to return (default: 5).
        :return: JSON formatted list of connected parallel hadiths.
        """
        if not os.path.exists(self.valves.DB_PATH):
            return json.dumps({"error": "Database not found."}, ensure_ascii=False)

        book = book.lower().strip()
        hadith_number = int(hadith_number)

        try:
            conn = sqlite3.connect(self.valves.DB_PATH)
            cur = conn.cursor()

            # Bidirectional query: find hadiths where our hadith is either source or target
            cur.execute("""
                SELECT target_hadith_id, target_book, target_num, similarity_score, shared_terms, shared_families
                FROM hadith_connections
                WHERE source_book = ? AND source_num = ?
                UNION
                SELECT source_hadith_id, source_book, source_num, similarity_score, shared_terms, shared_families
                FROM hadith_connections
                WHERE target_book = ? AND target_num = ?
                ORDER BY similarity_score DESC
                LIMIT ?
            """, (book, hadith_number, book, hadith_number, limit))
            rows = cur.fetchall()
            conn.close()

            connections = []
            for r in rows:
                connections.append({
                    "target_id": r[0],
                    "target_book": r[1],
                    "target_number": r[2],
                    "similarity_score": r[3],
                    "shared_terms": json.loads(r[4]) if r[4] else [],
                    "thematic_families": json.loads(r[5]) if r[5] else []
                })

            return json.dumps({
                "source": f"{book}:{hadith_number}",
                "parallel_hadiths_count": len(connections),
                "connections": connections
            }, ensure_ascii=False, indent=2)

        except Exception as e:
            return json.dumps({"error": f"Failed to fetch connections: {str(e)}"}, ensure_ascii=False)

    def get_thematic_family(self, family_id_or_keyword: str) -> str:
        """
        Explore thematic Hadith families (e.g. 'prayer', 'knowledge', 'creation', 'guidance') and their lexical roots.
        
        :param family_id_or_keyword: Family identifier (e.g. 'prayer') or Arabic/English title keyword.
        :return: JSON details of the thematic family, root statistics, and book occurrences.
        """
        if not os.path.exists(self.valves.DB_PATH):
            return json.dumps({"error": "Database not found."}, ensure_ascii=False)

        query = family_id_or_keyword.lower().strip()

        try:
            conn = sqlite3.connect(self.valves.DB_PATH)
            cur = conn.cursor()

            cur.execute("""
                SELECT family_id, name_ar, name_en, meaning, root_count, ayah_count, hadith_count, roots_json, book_breakdown_json
                FROM hadith_families
                WHERE family_id = ? OR name_ar LIKE ? OR meaning LIKE ?
                LIMIT 1
            """, (query, f"%{query}%", f"%{query}%"))
            row = cur.fetchone()
            conn.close()

            if not row:
                return json.dumps({"message": f"No thematic family found matching '{family_id_or_keyword}'."}, ensure_ascii=False)

            return json.dumps({
                "family_id": row[0],
                "name_ar": row[1],
                "name_en": row[2],
                "meaning": row[3],
                "root_count": row[4],
                "ayah_count": row[5],
                "hadith_count": row[6],
                "sample_roots": json.loads(row[7])[:15] if row[7] else [],
                "book_breakdown": json.loads(row[8]) if row[8] else {}
            }, ensure_ascii=False, indent=2)

        except Exception as e:
            return json.dumps({"error": f"Failed to query family: {str(e)}"}, ensure_ascii=False)
