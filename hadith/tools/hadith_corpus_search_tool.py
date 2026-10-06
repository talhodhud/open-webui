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
            description="Absolute path to hadith_rijal.db containing the hadith corpus and cross-hadith connections."
        )
        SEARCH_INDEX_PATH: str = Field(
            default=r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\poc\phrase_search\search_index.sqlite",
            description="Absolute path to search_index.sqlite containing stable occurrence IDs."
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
        t = re.sub(r'ى', 'ي', t)
        return t.strip()

    SIX_BOOKS = {"bukhari", "muslim", "abudawud", "tirmidhi", "nasai", "ibnmajah"}

    def search_hadith_corpus(self, query: str, book: str = "all", limit: int = 5) -> str:
        """
        Search hadiths across collections using normalized matching, returning stable occurrence IDs.
        
        :param query: Arabic keywords or phrase to search (e.g. 'كسفت الشمس' or 'انما الاعمال بالنيات').
        :param book: Target collection (e.g. 'bukhari', 'muslim', 'abudawud', 'tirmidhi', 'nasai', 'ibnmajah') or 'all'.
        :param limit: Maximum number of hadiths to return (default: 5).
        :return: Standardized JSON envelope with occurrence IDs, collection, chapter, and text.
        """
        norm_query = self._normalize_text(query)
        if not norm_query:
            return to_json_str(build_response(
                status="invalid_reference",
                warnings=["Search query cannot be empty."]
            ))

        target_book = (book or "all").lower().strip()
        limit = max(1, min(limit, 20))
        results = []

        try:
            # 1. Search in search_index.sqlite (6 canonical books with stable occurrence IDs)
            if os.path.exists(self.valves.SEARCH_INDEX_PATH):
                conn = sqlite3.connect(self.valves.SEARCH_INDEX_PATH)
                conn.row_factory = sqlite3.Row
                cur = conn.cursor()

                tokens = [t for t in norm_query.split() if len(t) >= 2]
                fts_expr = " AND ".join(f'"{t}"' for t in tokens)

                sql = "SELECT r.* FROM search_fts JOIN records r ON r.rowid=search_fts.rowid WHERE search_fts MATCH ?"
                params = [fts_expr]
                if target_book != "all" and target_book in self.SIX_BOOKS:
                    sql += " AND r.collection = ?"
                    params.append(target_book)
                sql += " LIMIT ?"
                params.append(limit)

                try:
                    cur.execute(sql, params)
                    rows = cur.fetchall()
                except Exception:
                    # Fallback to normalized LIKE
                    like_sql = "SELECT * FROM records WHERE normalized LIKE ?"
                    like_params = [f"%{norm_query}%"]
                    if target_book != "all" and target_book in self.SIX_BOOKS:
                        like_sql += " AND collection = ?"
                        like_params.append(target_book)
                    like_sql += " LIMIT ?"
                    like_params.append(limit)
                    cur.execute(like_sql, like_params)
                    rows = cur.fetchall()

                conn.close()

                for r in rows:
                    results.append({
                        "occurrence_id": r["record_id"],
                        "book": r["collection"],
                        "chapter": r["chapter_file"].replace(".json", ""),
                        "chapter_title": r["chapter_title"],
                        "hadith_number": r["source_entry_id"],
                        "source_position": r["source_position"],
                        "arabic_text": r["arabic"],
                        "english_text": r["english"] or "",
                        "source_url": r["source_url"]
                    })

            # 2. Fallback to hadith_rijal.db if no results or target book is outside six books
            if not results and os.path.exists(self.valves.DB_PATH) and target_book not in self.SIX_BOOKS:
                conn = sqlite3.connect(self.valves.DB_PATH)
                conn.create_function("NORM_AR", 1, self._normalize_text)
                cur = conn.cursor()
                sql = "SELECT book, chapter, hadith_id, id_in_book, arabic_text, english_narrator, english_text FROM hadiths WHERE NORM_AR(arabic_text) LIKE ?"
                params = [f"%{norm_query}%"]
                if target_book != "all":
                    sql += " AND LOWER(book) = ?"
                    params.append(target_book)
                sql += " LIMIT ?"
                params.append(limit)
                cur.execute(sql, params)
                for r in cur.fetchall():
                    results.append({
                        "occurrence_id": f"rijal_db:{r[0]}:{r[1]}:{r[2]}",
                        "book": r[0],
                        "chapter": str(r[1]),
                        "chapter_title": f"باب {r[1]}",
                        "hadith_number": str(r[2]),
                        "source_position": r[3],
                        "arabic_text": r[4],
                        "english_text": r[6] or "",
                        "source_url": ""
                    })
                conn.close()

            if not results:
                return to_json_str(build_response(
                    status="no_match",
                    data={"query": query, "book": book, "matches_count": 0, "results": []},
                    coverage={"searched_scope": "six_canonical_books" if target_book in self.SIX_BOOKS or target_book == "all" else "extended_corpus"}
                ))

            return to_json_str(build_response(
                status="ok",
                data={"query": query, "book": book, "matches_count": len(results), "results": results},
                coverage={
                    "searched_scope": "six_canonical_books" if target_book in self.SIX_BOOKS or target_book == "all" else "extended_corpus",
                    "returned_count": len(results)
                },
                evidence={"source_name": "Itqan Verified Search Index", "dataset_id": "six_collections_indexed"}
            ))

        except Exception as e:
            return to_json_str(build_response(
                status="unavailable",
                warnings=[f"Search failed: {str(e)}"]
            ))

    def get_hadith_by_number(self, book: str = "", hadith_number: int = 0, chapter: Optional[int] = None, language: str = "ar", occurrence_id: Optional[str] = None) -> str:
        """
        Fetch full hadith text by exact occurrence_id or by canonical book and hadith number.
        Returns 'ambiguous' with candidate list when multiple chapter records share the same number.
        
        :param book: Collection name: 'bukhari', 'muslim', 'tirmidhi', 'abudawud', 'nasai', 'ibnmajah', 'malik'.
        :param hadith_number: Hadith number within the collection.
        :param chapter: Optional chapter number (disambiguates repeated numbering).
        :param language: 'ar' for Arabic, 'en' for English translation.
        :param occurrence_id: Stable occurrence ID (e.g. 'itqan:bukhari:1:1:bf026de7e155'). Highest precedence.
        :return: Standardized JSON response envelope.
        """
        try:
            # 1. Authoritative Lookup by Occurrence ID
            if occurrence_id:
                clean_occ_id = occurrence_id.strip()
                if not os.path.exists(self.valves.SEARCH_INDEX_PATH):
                    return to_json_str(build_response(
                        status="unavailable",
                        data={"occurrence_id": clean_occ_id},
                        warnings=["فهرس السجلات المحلي غير متاح للتحقق من معرف السجل."]
                    ))
                conn = sqlite3.connect(self.valves.SEARCH_INDEX_PATH)
                conn.row_factory = sqlite3.Row
                row = conn.execute("SELECT * FROM records WHERE record_id = ?", (clean_occ_id,)).fetchone()
                conn.close()
                if row:
                    text_content = row["english"] if language == "en" and row["english"] else row["arabic"]
                    return to_json_str(build_response(
                        status="ok",
                        data={
                            "occurrence_id": row["record_id"],
                            "book": row["collection"],
                            "chapter": row["chapter_file"].replace(".json", ""),
                            "chapter_title": row["chapter_title"],
                            "hadith_number": row["source_entry_id"],
                            "source_position": row["source_position"],
                            "text": text_content,
                            "arabic_text": row["arabic"],
                            "english_text": row["english"] or "",
                            "language": language
                        },
                        evidence={
                            "source_name": "Itqan Verified Canonical Dataset",
                            "locator": row["record_id"],
                            "source_file": row["source_file"],
                            "source_url": row["source_url"],
                            "review_status": "unreviewed_dataset_copy"
                        }
                    ))
                else:
                    return to_json_str(build_response(
                        status="invalid_reference",
                        data={"occurrence_id": clean_occ_id},
                        warnings=[f"معرف السجل المحدد '{clean_occ_id}' غير موجود في قاعدة السجلات المعتمدة."]
                    ))

            # 2. Disambiguation Lookup by Book & Number
            book = book.lower().strip()
            hadith_number = int(hadith_number)
            if hadith_number <= 0:
                return to_json_str(build_response(
                    status="invalid_reference",
                    warnings=["رقم الحديث يجب أن يكون أكبر من الصفر."]
                ))

            candidates = []
            if os.path.exists(self.valves.SEARCH_INDEX_PATH) and book in self.SIX_BOOKS:
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
                    # Filter by specified chapter
                    ch_str = str(chapter)
                    rows = [r for r in rows if r["chapter_file"].replace(".json", "") == ch_str or ch_str in r["chapter_title"]]

                if len(rows) > 1:
                    # AMBIGUOUS: Do NOT pick LIMIT 1 silently! Return all candidates for disambiguation.
                    cand_list = []
                    for r in rows:
                        cand_list.append({
                            "occurrence_id": r["record_id"],
                            "chapter": r["chapter_file"].replace(".json", ""),
                            "chapter_title": r["chapter_title"],
                            "source_position": r["source_position"],
                            "arabic_snippet": (r["arabic"][:140] + "...") if len(r["arabic"]) > 140 else r["arabic"]
                        })
                    return to_json_str(build_response(
                        status="ambiguous",
                        data={
                            "book": book,
                            "hadith_number": hadith_number,
                            "candidates_count": len(rows),
                            "candidates": cand_list
                        },
                        warnings=["تتعدد الأحاديث التي تحمل هذا الرقم في أبواب مختلفة من هذا الديوان. يرجى تمرير رقم الباب chapter أو معرف السجل occurrence_id للتحديد القطعي."]
                    ))
                elif len(rows) == 1:
                    row = rows[0]
                    text_content = row["english"] if language == "en" and row["english"] else row["arabic"]
                    return to_json_str(build_response(
                        status="ok",
                        data={
                            "occurrence_id": row["record_id"],
                            "book": row["collection"],
                            "chapter": row["chapter_file"].replace(".json", ""),
                            "chapter_title": row["chapter_title"],
                            "hadith_number": row["source_entry_id"],
                            "source_position": row["source_position"],
                            "text": text_content,
                            "arabic_text": row["arabic"],
                            "english_text": row["english"] or "",
                            "language": language
                        },
                        evidence={
                            "source_name": "Itqan Verified Canonical Dataset",
                            "locator": row["record_id"],
                            "source_file": row["source_file"],
                            "source_url": row["source_url"],
                            "review_status": "unreviewed_dataset_copy"
                        }
                    ))

            # 3. Read-Only CDN Fallback (Does NOT mutate or overwrite local database)
            prefix = "ara-" if language == "ar" else "eng-"
            url = f"https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/{prefix}{book}/{hadith_number}.json"

            try:
                req = urllib.request.Request(url, headers={"User-Agent": "HadithApp/1.0"})
                with urllib.request.urlopen(req, timeout=self.valves.REQUEST_TIMEOUT) as resp:
                    data = json.loads(resp.read().decode("utf-8"))
                    hadith_data = data.get("hadiths", [{}])[0]
                    text = hadith_data.get("text", "")

                    if text:
                        return to_json_str(build_response(
                            status="ok",
                            data={
                                "occurrence_id": f"cdn:{book}:{hadith_number}",
                                "book": book,
                                "chapter": "0",
                                "hadith_number": hadith_number,
                                "text": text,
                                "language": language
                            },
                            evidence={
                                "source_name": "Hadith-API CDN (Read-Only Provider Fallback)",
                                "locator": url,
                                "review_status": "external_api_unverified"
                            },
                            warnings=["هذا النص مسترجع من خادم خارجي كنسخة احتياطية؛ لم يتم تعديل قاعدة البيانات المحلية."]
                        ))
            except Exception:
                pass

            return to_json_str(build_response(
                status="no_match",
                data={"book": book, "hadith_number": hadith_number},
                warnings=[f"لم يتم العثور على حديث برقم {hadith_number} في كتاب {book}."]
            ))

        except Exception as e:
            return to_json_str(build_response(
                status="unavailable",
                warnings=[f"Failed to retrieve hadith {book} #{hadith_number}: {str(e)}"]
            ))

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

            return to_json_str(build_response(
                status="ok" if connections else "no_match",
                data={
                    "source": f"{book}:{hadith_number}",
                    "parallel_hadiths_count": len(connections),
                    "connections": connections
                },
                coverage={"source_book": book, "source_num": hadith_number, "parallel_count": len(connections)},
                evidence={"source_name": "Itqan Cross-Hadith Connections Graph", "locator": f"connections:{book}:{hadith_number}"}
            ))

        except Exception as e:
            return to_json_str(build_response(
                status="unavailable",
                warnings=[f"Failed to fetch connections: {str(e)}"]
            ))

    def get_thematic_family(self, family_id_or_keyword: str) -> str:
        """
        Explore thematic Hadith families (e.g. 'prayer', 'knowledge', 'creation', 'guidance') and their lexical roots.
        
        :param family_id_or_keyword: Family identifier (e.g. 'prayer') or Arabic/English title keyword.
        :return: Standardized JSON envelope with thematic family details and roots.
        """
        if not os.path.exists(self.valves.DB_PATH):
            return to_json_str(build_response(status="unavailable", warnings=["Database not found."]))

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
                return to_json_str(build_response(
                    status="no_match",
                    data={"family_id_or_keyword": family_id_or_keyword},
                    warnings=[f"No thematic family found matching '{family_id_or_keyword}'."]
                ))

            return to_json_str(build_response(
                status="ok",
                data={
                    "family_id": row[0],
                    "name_ar": row[1],
                    "name_en": row[2],
                    "meaning": row[3],
                    "root_count": row[4],
                    "ayah_count": row[5],
                    "hadith_count": row[6],
                    "sample_roots": json.loads(row[7])[:15] if row[7] else [],
                    "book_breakdown": json.loads(row[8]) if row[8] else {}
                },
                evidence={"source_name": "Itqan Thematic Taxonomy", "locator": f"families:{row[0]}"}
            ))

        except Exception as e:
            return to_json_str(build_response(
                status="unavailable",
                warnings=[f"Failed to query family: {str(e)}"]
            ))
