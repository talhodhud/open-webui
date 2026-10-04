"""
title: Hadith Sharh & Gharib Vocab Tool
author: Hadith Project
author_url: https://github.com/hadith-ksa
version: 1.0.0
description: Comprehensive Hadith commentary (Sharh) from HadeethEnc combined with classical Gharib al-Hadith vocabulary lexicon (33k+ definitions) and Lane's Lexicon root etymology.
"""

import os
import re
import json
import sqlite3
import urllib.request
import urllib.parse
import urllib.error
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field

class Tools:
    class Valves(BaseModel):
        DB_PATH: str = Field(
            default=r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\hadith_rijal.db",
            description="Path to hadith_rijal.db containing hadith_vocab and hadith_roots."
        )
        REQUEST_TIMEOUT: int = Field(
            default=15,
            description="Network request timeout in seconds."
        )

    def __init__(self):
        self.valves = self.Valves()

    SYSTEM_INSTRUCTIONS = """
    # HADITH SHARH & GHARIB AL-HADITH GUIDELINES:
    1. Distinction between Sharh and Gharib:
       - Sharh (شرح الحديث): General meaning, legal deductions (fiqh), moral lessons, and context of the hadith. Use `get_hadith_explanation`.
       - Gharib al-Hadith (غريب الحديث): Precise lexical, morphological, and etymological definitions of uncommon or archaic words used in the Prophetic tongue. Use `lookup_gharib_word` and `lookup_root_lexicon`.
    2. When analyzing hadith words:
       - Provide the root (الجذر), part of speech, classical gloss, and how classical lexicographers (e.g. Ibn al-Athir in *Al-Nihayah*, Ibn Manzur in *Lisan al-Arab*) defined it.
    3. Structural formatting:
       - Present the general explanation first, followed by a dedicated 'غريب الحديث والألفاظ' (Vocabulary Breakdown) section with word -> root -> classical meaning.
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

    def get_hadith_explanation(self, query: str, language: str = "ar") -> str:
        """
        Search HadeethEnc to retrieve detailed hadith commentary (Sharh), vocabulary meanings, and derived benefits.
        
        :param query: Part of the hadith text or keywords to find explanation for.
        :param language: Language code ('ar' for Arabic, 'en' for English, 'fr', 'ur', etc. Default: 'ar').
        :return: JSON formatted commentary, vocabulary words, benefits, and references.
        """
        try:
            encoded = urllib.parse.quote(query.strip())
            search_url = f"https://hadeethenc.com/api/v1/hadeeths/search/?phrase={encoded}&language={language}&page=1&per_page=5"
            req = urllib.request.Request(
                search_url,
                headers={"User-Agent": "Mozilla/5.0"}
            )
            with urllib.request.urlopen(req, timeout=self.valves.REQUEST_TIMEOUT) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                if isinstance(data, list):
                    hadeeths = data
                elif isinstance(data, dict):
                    hadeeths = data.get("data", [])
                else:
                    hadeeths = []

                if not hadeeths:
                    return json.dumps({"message": f"No explanation found on HadeethEnc for: {query}"}, ensure_ascii=False)

                matched_id = hadeeths[0].get("id")

                # Fetch full explanation details
                detail_url = f"https://hadeethenc.com/api/v1/hadeeths/one/?language={language}&id={matched_id}"
                detail_req = urllib.request.Request(detail_url, headers={"User-Agent": "Mozilla/5.0"})
                with urllib.request.urlopen(detail_req, timeout=self.valves.REQUEST_TIMEOUT) as detail_resp:
                    detail_data = json.loads(detail_resp.read().decode("utf-8"))
                    return json.dumps({
                        "title": detail_data.get("title"),
                        "hadith": detail_data.get("hadeeth"),
                        "explanation": detail_data.get("explanation"),
                        "hints": detail_data.get("hints", []),
                        "words_meanings": detail_data.get("words_meanings", []),
                        "reference": detail_data.get("reference")
                    }, ensure_ascii=False, indent=2)

        except Exception as e:
            return json.dumps({"error": f"Failed to retrieve explanation from HadeethEnc: {str(e)}"}, ensure_ascii=False)

    def lookup_gharib_word(self, word: str) -> str:
        """
        Look up a rare or difficult hadith word in the Gharib al-Hadith lexicon (33k+ definitions) with root and morphological analysis.
        
        :param word: The Arabic word to look up (e.g. 'عسعس', 'كسفت', 'الضيزى').
        :return: JSON formatted lexical definition, root, lemma, part of speech, and corpus frequency.
        """
        if not os.path.exists(self.valves.DB_PATH):
            return json.dumps({"error": "Database not found."}, ensure_ascii=False)

        clean_word = word.strip()
        norm_word = self._normalize_arabic(clean_word)

        try:
            conn = sqlite3.connect(self.valves.DB_PATH)
            cur = conn.cursor()

            # First exact or normalized match
            cur.execute("""
                SELECT word, root, root_dotted, transliteration, definition, frequency, lemma, pos, form, aspect
                FROM hadith_vocab
                WHERE word = ? OR word_norm = ?
                LIMIT 5
            """, (clean_word, norm_word))
            rows = cur.fetchall()

            # If not found, try prefix / root search
            if not rows:
                cur.execute("""
                    SELECT word, root, root_dotted, transliteration, definition, frequency, lemma, pos, form, aspect
                    FROM hadith_vocab
                    WHERE root = ? OR word_norm LIKE ?
                    ORDER BY frequency DESC
                    LIMIT 3
                """, (clean_word, f"{norm_word}%"))
                rows = cur.fetchall()

            conn.close()

            if not rows:
                return json.dumps({"message": f"Word '{word}' not found in Gharib al-Hadith lexicon."}, ensure_ascii=False)

            results = []
            for r in rows:
                results.append({
                    "word": r[0],
                    "root": r[1],
                    "root_dotted": r[2],
                    "transliteration": r[3],
                    "classical_definition": r[4],
                    "frequency": r[5],
                    "lemma": r[6],
                    "part_of_speech": r[7],
                    "form": r[8],
                    "aspect": r[9]
                })

            return json.dumps({
                "query_word": word,
                "definitions_found": len(results),
                "entries": results
            }, ensure_ascii=False, indent=2)

        except Exception as e:
            return json.dumps({"error": f"Gharib word lookup failed: {str(e)}"}, ensure_ascii=False)

    def lookup_root_lexicon(self, root: str) -> str:
        """
        Look up classical Arabic root etymology and comprehensive Lane's Lexicon definition.
        
        :param root: 3-letter Arabic root (e.g. 'خسف', 'سلم', 'عبد', 'علم').
        :return: JSON formatted classical root definitions, Buckwalter code, summary, and Quran frequency.
        """
        if not os.path.exists(self.valves.DB_PATH):
            return json.dumps({"error": "Database not found."}, ensure_ascii=False)

        clean_root = root.strip().replace(" ", "").replace(".", "")
        norm_root = self._normalize_arabic(clean_root)

        try:
            conn = sqlite3.connect(self.valves.DB_PATH)
            cur = conn.cursor()

            cur.execute("""
                SELECT root, buckwalter, definition_en, summary_en, quran_freq
                FROM hadith_roots
                WHERE root = ? OR root = ?
                LIMIT 1
            """, (clean_root, norm_root))
            row = cur.fetchone()
            conn.close()

            if not row:
                return json.dumps({"message": f"Root '{root}' not found in roots lexicon."}, ensure_ascii=False)

            return json.dumps({
                "root": row[0],
                "buckwalter": row[1],
                "summary": row[3],
                "quran_frequency": row[4],
                "lexicon_excerpt": row[2][:800] + ("..." if len(row[2]) > 800 else "")
            }, ensure_ascii=False, indent=2)

        except Exception as e:
            return json.dumps({"error": f"Root lexicon lookup failed: {str(e)}"}, ensure_ascii=False)

    def search_vocab_meaning(self, english_concept: str, limit: int = 5) -> str:
        """
        Search the vocabulary lexicon using English concepts/terms via full-text search (FTS5).
        
        :param english_concept: English keyword or concept to search (e.g. 'eclipse', 'fasting', 'humility', 'prostration').
        :param limit: Maximum entries to return (default: 5).
        :return: JSON formatted matching Arabic words, roots, and definitions.
        """
        if not os.path.exists(self.valves.DB_PATH):
            return json.dumps({"error": "Database not found."}, ensure_ascii=False)

        concept = english_concept.strip()
        if not concept:
            return json.dumps({"error": "English search concept cannot be empty."}, ensure_ascii=False)

        try:
            conn = sqlite3.connect(self.valves.DB_PATH)
            cur = conn.cursor()

            cur.execute("""
                SELECT v.word, v.root, v.pos, v.definition
                FROM hadith_vocab_fts f
                JOIN hadith_vocab v ON f.rowid = v.id
                WHERE hadith_vocab_fts MATCH ?
                LIMIT ?
            """, (concept, limit))
            rows = cur.fetchall()
            conn.close()

            results = []
            for r in rows:
                results.append({
                    "word": r[0],
                    "root": r[1],
                    "part_of_speech": r[2],
                    "definition": r[3]
                })

            return json.dumps({
                "concept": english_concept,
                "matches_count": len(results),
                "results": results
            }, ensure_ascii=False, indent=2)

        except Exception as e:
            return json.dumps({"error": f"FTS5 vocabulary search failed: {str(e)}"}, ensure_ascii=False)
