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
try:
    from pydantic import BaseModel, Field, model_validator
except ImportError:
    from pydantic import BaseModel, Field
    model_validator = None

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
    @staticmethod
    def _verify_sqlite_schema(path: str, required_tables: List[str]) -> bool:
        if not path or not os.path.exists(path):
            return False
        try:
            if os.path.getsize(path) == 0:
                return False
            conn = sqlite3.connect(path)
            cur = conn.cursor()
            cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
            tables = {r[0] for r in cur.fetchall()}
            conn.close()
            return all(t in tables for t in required_tables)
        except Exception:
            return False

    @classmethod
    def _resolve_candidate_path(cls, env_var: str, current_val: str, candidates: List[str], required_tables: List[str]) -> str:
        env_val = os.environ.get(env_var)
        if env_val:
            env_val = os.path.abspath(env_val)
            if not required_tables or cls._verify_sqlite_schema(env_val, required_tables):
                return env_val

        if current_val:
            cur_abs = os.path.abspath(current_val) if not current_val.startswith("c:\\") or os.name == 'nt' else current_val
            if os.path.exists(cur_abs) and (not required_tables or cls._verify_sqlite_schema(cur_abs, required_tables)):
                return cur_abs

        search_roots = [
            "/app/backend/data",
            "/app/data",
            "/data",
            "/root/open-webui",
            "/root/open-webui/hadith",
            "/root",
            os.getcwd(),
            os.path.abspath(os.path.join(os.getcwd(), "..")),
            os.path.abspath(os.path.join(os.getcwd(), "../..")),
            os.path.abspath(os.path.join(os.getcwd(), "hadith")),
            os.path.abspath(os.path.join(os.getcwd(), "open-webui")),
            os.path.abspath(os.path.join(os.getcwd(), "open-webui/hadith")),
        ]
        if "__file__" in globals():
            tool_dir = os.path.dirname(os.path.abspath(__file__))
            search_roots.extend([
                tool_dir,
                os.path.abspath(os.path.join(tool_dir, "..")),
                os.path.abspath(os.path.join(tool_dir, "../..")),
                os.path.abspath(os.path.join(tool_dir, "../../..")),
            ])
        if os.name == 'nt':
            search_roots.append(r"c:\Users\mhdal\OneDrive\AI\Hadith KSA")

        for c in candidates:
            if os.path.isabs(c) and (not required_tables or cls._verify_sqlite_schema(c, required_tables)):
                return os.path.abspath(c)
            for root in search_roots:
                p = os.path.abspath(os.path.join(root, c))
                if os.path.exists(p) and (not required_tables or cls._verify_sqlite_schema(p, required_tables)):
                    return p
        return current_val or ""

    class Valves(BaseModel):
        DB_PATH: str = Field(
            default="",
            description="Path to hadith_rijal.db (or set HADITH_DB_PATH). Schema-verified for 'hadith_vocab' and 'hadith_roots'."
        )
        SEARCH_INDEX_PATH: str = Field(
            default="",
            description="Path to search_index.sqlite (or set HADITH_SEARCH_INDEX_PATH). Schema-verified for 'records'."
        )
        REQUEST_TIMEOUT: int = Field(
            default=15,
            description="Network request timeout in seconds."
        )

        def __init__(self, **data):
            super().__init__(**data)
            self._ensure_resolved()

        def _ensure_resolved(self):
            if not self.DB_PATH or not Tools._verify_sqlite_schema(self.DB_PATH, ["hadith_vocab", "hadith_roots"]):
                self.DB_PATH = Tools._resolve_candidate_path(
                    "HADITH_DB_PATH",
                    self.DB_PATH,
                    [
                        "hadith_rijal.db",
                        "hadith/hadith_rijal.db",
                        "open-webui/hadith_rijal.db",
                        "backend/data/hadith_rijal.db",
                        "data/hadith_rijal.db"
                    ],
                    ["hadith_vocab", "hadith_roots"]
                )
            if not self.SEARCH_INDEX_PATH or not Tools._verify_sqlite_schema(self.SEARCH_INDEX_PATH, ["records"]):
                self.SEARCH_INDEX_PATH = Tools._resolve_candidate_path(
                    "HADITH_SEARCH_INDEX_PATH",
                    self.SEARCH_INDEX_PATH,
                    [
                        "poc/phrase_search/search_index.sqlite",
                        "hadith/poc/phrase_search/search_index.sqlite",
                        "search_index.sqlite",
                        "backend/data/search_index.sqlite",
                        "data/search_index.sqlite"
                    ],
                    ["records"]
                )

    def _ensure_db(self) -> str:
        if not self._verify_sqlite_schema(self.valves.DB_PATH, ["hadith_vocab", "hadith_roots"]):
            self.valves.DB_PATH = self._resolve_candidate_path(
                "HADITH_DB_PATH",
                self.valves.DB_PATH,
                [
                    "hadith_rijal.db",
                    "hadith/hadith_rijal.db",
                    "open-webui/hadith_rijal.db",
                    "backend/data/hadith_rijal.db",
                    "data/hadith_rijal.db"
                ],
                ["hadith_vocab", "hadith_roots"]
            )
        return self.valves.DB_PATH

    def _ensure_search_index(self) -> str:
        if not self._verify_sqlite_schema(self.valves.SEARCH_INDEX_PATH, ["records"]):
            self.valves.SEARCH_INDEX_PATH = self._resolve_candidate_path(
                "HADITH_SEARCH_INDEX_PATH",
                self.valves.SEARCH_INDEX_PATH,
                [
                    "poc/phrase_search/search_index.sqlite",
                    "hadith/poc/phrase_search/search_index.sqlite",
                    "search_index.sqlite",
                    "backend/data/search_index.sqlite",
                    "data/search_index.sqlite"
                ],
                ["records"]
            )
        return self.valves.SEARCH_INDEX_PATH

    def _resolve_all_paths(self):
        self._ensure_db()
        self._ensure_search_index()

    def __init__(self):
        self.valves = self.Valves()
        self._resolve_all_paths()

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
        t = re.sub(r'[«»"\'\(\)\[\]،,\.:؛؟!\-]', ' ', t)
        return ' '.join(t.split())

    def get_hadith_explanation(self, query: str, language: str = "ar", occurrence_id: Optional[str] = None) -> str:
        """
        Retrieve authentic Hadith explanation from HadeethEnc matching the query or exact occurrence_id.
        Rejects unrelated first hits and returns 'unavailable' if no authentic commentary matches.
        
        :param query: Part of the hadith text or keywords to find explanation for.
        :param language: Language code ('ar' for Arabic, 'en' for English, 'fr', 'ur', etc. Default: 'ar').
        :param occurrence_id: Optional exact occurrence ID to match commentary against.
        :return: Standardized JSON envelope with commentary, provider ID, source URL, and matching basis.
        """
        self._ensure_search_index()
        self._ensure_db()
        # If occurrence_id is supplied, validate authoritatively against local index
        if occurrence_id:
            clean_occ_id = occurrence_id.strip()
            if not os.path.exists(self.valves.SEARCH_INDEX_PATH):
                return to_json_str(build_response(
                    status="unavailable",
                    data={"occurrence_id": clean_occ_id, "query": query},
                    warnings=["قاعدة السجلات المحلية غير متاحة للتحقق من معرف السجل المطلوب."]
                ))
            try:
                conn = sqlite3.connect(self.valves.SEARCH_INDEX_PATH)
                row = conn.execute("SELECT arabic FROM records WHERE record_id = ?", (clean_occ_id,)).fetchone()
                conn.close()
                if not row or not row[0]:
                    return to_json_str(build_response(
                        status="invalid_reference",
                        data={"occurrence_id": clean_occ_id, "query": query},
                        warnings=[f"معرف السجل المحدد '{clean_occ_id}' غير موجود في قاعدة السجلات المعتمدة. تم إيقاف العملية لمنع المطابقة على سجل خاطئ."]
                    ))
                target_text = row[0]
            except Exception as e:
                return to_json_str(build_response(
                    status="unavailable",
                    data={"occurrence_id": clean_occ_id},
                    warnings=[f"فشل التحقق من معرف السجل في القاعدة المحلية: {str(e)}"]
                ))
        else:
            target_text = query.strip()

        norm_target = self._normalize_arabic(target_text)
        target_tokens = set([t for t in norm_target.split() if len(t) >= 3 and t not in ('قال', 'رسول', 'الله', 'صلى', 'عليه', 'وسلم', 'عنه', 'عنها')])
        if not target_tokens:
            target_tokens = set(norm_target.split())

        try:
            encoded = urllib.parse.quote(query.strip()[:100])
            search_url = f"https://hadeethenc.com/api/v1/hadeeths/search/?phrase={encoded}&language={language}&page=1&per_page=5"
            req = urllib.request.Request(search_url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=self.valves.REQUEST_TIMEOUT) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                hadeeths = data if isinstance(data, list) else data.get("data", [])

                if not hadeeths:
                    return to_json_str(build_response(
                        status="unavailable",
                        data={"query": query, "occurrence_id": occurrence_id},
                        warnings=["لم يتم العثور على شرح مسجل في موسوعة HadeethEnc لهذا النص. غياب الشرح لا يمس صحة الحديث الأصلية."]
                    ))

                # Score each candidate by significant token overlap
                scored_candidates = []
                for item in hadeeths:
                    c_id = item.get("id")
                    c_title = item.get("title", "")
                    c_text = item.get("hadith_text", "") or item.get("title", "")
                    norm_c = self._normalize_arabic(c_text)
                    c_tokens = set(norm_c.split())
                    overlap = sum(1 for t in target_tokens if t in c_tokens or any(t in ct or ct in t for ct in c_tokens if len(ct) >= 4 and len(t) >= 4))
                    ratio = overlap / max(len(target_tokens), 1)
                    scored_candidates.append({
                        "id": c_id,
                        "title": c_title,
                        "overlap_count": overlap,
                        "ratio": ratio,
                        "raw_item": item
                    })

                scored_candidates.sort(key=lambda x: (x["overlap_count"], x["ratio"]), reverse=True)
                best = scored_candidates[0]

                # Strict match threshold: candidate snippet must share significant overlap
                if best["overlap_count"] < 2 or best["ratio"] < 0.35:
                    return to_json_str(build_response(
                        status="unavailable",
                        data={"query": query, "occurrence_id": occurrence_id, "best_candidate_title": best["title"]},
                        warnings=["نتيجة البحث المسترجعة من HadeethEnc لا تطابق متن الحديث المختار؛ تم حجب الشرح غير المطابق حفظاً لدقة العزو."],
                        evidence={"source_name": "HadeethEnc API", "status_detail": "unmatched_first_hit_rejected"}
                    ))

                matched_id = best["id"]
                detail_url = f"https://hadeethenc.com/api/v1/hadeeths/one/?language={language}&id={matched_id}"
                detail_req = urllib.request.Request(detail_url, headers={"User-Agent": "Mozilla/5.0"})
                with urllib.request.urlopen(detail_req, timeout=self.valves.REQUEST_TIMEOUT) as detail_resp:
                    detail_data = json.loads(detail_resp.read().decode("utf-8"))
                    
                    # Phase 2: Verify detailed matn body against target tokens
                    detail_matn = detail_data.get("hadeeth", "") or detail_data.get("title", "")
                    norm_detail = self._normalize_arabic(detail_matn)
                    detail_tokens = set(norm_detail.split())
                    detail_overlap = sum(1 for t in target_tokens if t in detail_tokens or any(t in dt or dt in t for dt in detail_tokens if len(dt) >= 4 and len(t) >= 4))
                    detail_ratio = detail_overlap / max(len(target_tokens), 1)

                    if detail_overlap < 2 or detail_ratio < 0.35:
                        return to_json_str(build_response(
                            status="unavailable",
                            data={
                                "query": query,
                                "occurrence_id": occurrence_id,
                                "detail_title": detail_data.get("title"),
                                "detail_overlap_ratio": round(detail_ratio, 2)
                            },
                            warnings=["متن الحديث المسترجع من تفاصيل HadeethEnc لا يطابق النص المستهدف المختار؛ تم حجب الشرح لمنع الإسناد الخاطئ."],
                            evidence={"source_name": "HadeethEnc Encyclopedia", "provider_id": str(matched_id), "status_detail": "detail_matn_mismatch"}
                        ))

                    return to_json_str(build_response(
                        status="ok",
                        data={
                            "provider_id": matched_id,
                            "source_url": f"https://hadeethenc.com/{language}/browse/hadith/{matched_id}",
                            "matching_basis": "verified_matn_body_overlap",
                            "overlap_score": round(detail_ratio, 2),
                            "title": detail_data.get("title"),
                            "hadith": detail_data.get("hadeeth"),
                            "explanation": detail_data.get("explanation"),
                            "hints": detail_data.get("hints", []),
                            "words_meanings": detail_data.get("words_meanings", []),
                            "reference": detail_data.get("reference"),
                            "language": language,
                            "review_state": "verified_matn_body_match"
                        },
                        evidence={
                            "source_name": "HadeethEnc Encyclopedia",
                            "provider_id": str(matched_id),
                            "source_url": f"https://hadeethenc.com/{language}/browse/hadith/{matched_id}",
                            "review_status": "verified_matn_body_match"
                        }
                    ))

        except Exception as e:
            return to_json_str(build_response(
                status="unavailable",
                warnings=[f"تعذر استرجاع الشرح من HadeethEnc: {str(e)}. لا يعني ذلك ضعف الحديث أو انعدام أصله."]
            ))

    def lookup_gharib_word(self, word: str) -> str:
        """
        self._resolve_all_paths()
        Look up a rare or difficult hadith word in the Gharib al-Hadith lexicon (33k+ definitions) with root and morphological analysis.
        
        :param word: The Arabic word to look up (e.g. 'عسعس', 'كسفت', 'الضيزى').
        :return: Standardized JSON envelope with lexical definition, root, lemma, part of speech, and corpus frequency.
        """
        db_path = self._ensure_db()
        if not self._verify_sqlite_schema(db_path, ["hadith_vocab"]):
            return to_json_str(build_response(status="unavailable", warnings=[f"Database not found or invalid schema at '{db_path}'."]))

        clean_word = word.strip()
        norm_word = self._normalize_arabic(clean_word)

        try:
            conn = sqlite3.connect(db_path)
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
                return to_json_str(build_response(
                    status="no_match",
                    data={"word": word},
                    warnings=[f"Word '{word}' not found in Gharib al-Hadith lexicon."]
                ))

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

            return to_json_str(build_response(
                status="ok",
                data={
                    "query_word": word,
                    "definitions_found": len(results),
                    "entries": results
                },
                evidence={"source_name": "Gharib al-Hadith Lexicon (Al-Nihayah & classical lexicons)", "locator": word}
            ))

        except Exception as e:
            return to_json_str(build_response(
                status="unavailable",
                warnings=[f"Gharib word lookup failed: {str(e)}"]
            ))

    def lookup_root_lexicon(self, root: str) -> str:
        """
        self._resolve_all_paths()
        Look up classical Arabic root etymology and comprehensive Lane's Lexicon definition.
        
        :param root: 3-letter Arabic root (e.g. 'خسف', 'سلم', 'عبد', 'علم').
        :return: Standardized JSON envelope with classical root definitions, Buckwalter code, summary, and Quran frequency.
        """
        db_path = self._ensure_db()
        if not self._verify_sqlite_schema(db_path, ["hadith_roots"]):
            return to_json_str(build_response(status="unavailable", warnings=[f"Database not found or invalid schema at '{db_path}'."]))

        clean_root = root.strip().replace(" ", "").replace(".", "")
        norm_root = self._normalize_arabic(clean_root)

        try:
            conn = sqlite3.connect(db_path)
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
                return to_json_str(build_response(
                    status="no_match",
                    data={"root": root},
                    warnings=[f"Root '{root}' not found in roots lexicon."]
                ))

            return to_json_str(build_response(
                status="ok",
                data={
                    "root": row[0],
                    "buckwalter": row[1],
                    "summary": row[3],
                    "quran_frequency": row[4],
                    "lexicon_excerpt": row[2][:800] + ("..." if len(row[2]) > 800 else "")
                },
                evidence={"source_name": "Lane's Arabic-English Lexicon", "locator": root}
            ))

        except Exception as e:
            return to_json_str(build_response(
                status="unavailable",
                warnings=[f"Root lexicon lookup failed: {str(e)}"]
            ))

    def search_vocab_meaning(self, english_concept: str, limit: int = 5) -> str:
        """
        Search the vocabulary lexicon using English concepts/terms via full-text search (FTS5).
        
        :param english_concept: English keyword or concept to search (e.g. 'eclipse', 'fasting', 'humility', 'prostration').
        :param limit: Maximum entries to return (default: 5).
        :return: Standardized JSON envelope with matching Arabic words, roots, and definitions.
        """
        if not os.path.exists(self.valves.DB_PATH):
            return to_json_str(build_response(status="unavailable", warnings=["Database not found."]))

        concept = english_concept.strip()
        if not concept:
            return to_json_str(build_response(
                status="invalid_reference",
                warnings=["English search concept cannot be empty."]
            ))

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

            if not rows:
                return to_json_str(build_response(
                    status="no_match",
                    data={"concept": english_concept, "matches_count": 0, "results": []},
                    warnings=[f"No vocabulary entries matched concept '{english_concept}'."]
                ))

            results = []
            for r in rows:
                results.append({
                    "word": r[0],
                    "root": r[1],
                    "part_of_speech": r[2],
                    "definition": r[3]
                })

            return to_json_str(build_response(
                status="ok",
                data={
                    "concept": english_concept,
                    "matches_count": len(results),
                    "results": results
                },
                evidence={"source_name": "Hadith Vocabulary FTS", "locator": english_concept}
            ))

        except Exception as e:
            return to_json_str(build_response(
                status="unavailable",
                warnings=[f"FTS5 vocabulary search failed: {str(e)}"]
            ))
