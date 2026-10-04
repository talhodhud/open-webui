"""Read-only, edition-honest phrase retrieval. No grading or chain inference."""

import difflib
import hashlib
import json
from pathlib import Path
import re
import sqlite3
import time
import unicodedata
from urllib.parse import quote

COLLECTIONS = {
    "bukhari": "صحيح البخاري", "muslim": "صحيح مسلم",
    "abudawud": "سنن أبي داود", "tirmidhi": "جامع الترمذي",
    "nasai": "سنن النسائي", "ibnmajah": "سنن ابن ماجه",
}
FOLD = str.maketrans({"أ": "ا", "إ": "ا", "آ": "ا", "ٱ": "ا", "ى": "ي"})
STOP = {"في", "من", "عن", "على", "الى", "ان", "ما", "لا", "قال", "هذا", "الذي", "هو", "و", "يا"}
MAX_QUERY = 200


def normalize(text):
    """Fold search-only characters; originals are never modified."""
    return normalized_offsets(text)[0]


def normalized_offsets(text):
    out, starts, ends = [], [], []
    for index, char in enumerate(text):
        if unicodedata.category(char) in ("Mn", "Me", "Cf") or char == "ـ":
            if ends:
                ends[-1] = index + 1
            continue
        char = char.translate(FOLD).lower()
        if not char.isalnum():
            char = " "
        if char == " " and (not out or out[-1] == " "):
            continue
        out.append(char); starts.append(index); ends.append(index + 1)
    while out and out[-1] == " ":
        out.pop(); starts.pop(); ends.pop()
    return "".join(out), starts, ends


def highlighted_parts(text, terms, excerpt=False):
    normalized, starts, ends = normalized_offsets(text)
    spans = []
    for term in sorted(set(terms), key=len, reverse=True):
        for match in re.finditer(r"(?<!\w)" + re.escape(term) + r"(?!\w)", normalized):
            spans.append((starts[match.start()], ends[match.end() - 1]))
    spans.sort()
    merged = []
    for a, b in spans:
        if merged and a <= merged[-1][1]:
            merged[-1] = (merged[-1][0], max(b, merged[-1][1]))
        else:
            merged.append((a, b))
    lo, hi = 0, len(text)
    if excerpt and len(text) > 240:
        anchor = merged[0][0] if merged else 0
        lo = max(0, anchor - 50); hi = min(len(text), lo + 240)
    parts, cursor = [], lo
    if lo:
        parts.append({"text": "… ", "match": False})
    for a, b in merged:
        a, b = max(a, lo), min(b, hi)
        if a >= b:
            continue
        if cursor < a:
            parts.append({"text": text[cursor:a], "match": False})
        parts.append({"text": text[a:b], "match": True}); cursor = b
    if cursor < hi:
        parts.append({"text": text[cursor:hi], "match": False})
    if hi < len(text):
        parts.append({"text": " …", "match": False})
    return parts


class PhraseSearch:
    def __init__(self, database):
        self.path = Path(database).resolve()

    def _connect(self):
        if not self.path.is_file():
            raise FileNotFoundError("Search index is missing. Build it and set SEARCH_DB_PATH in the tool valves.")
        conn = sqlite3.connect(self.path.as_uri() + "?mode=ro", uri=True, timeout=5)
        conn.row_factory = sqlite3.Row
        return conn

    def _metadata(self, conn):
        return json.loads(conn.execute("SELECT value FROM metadata WHERE key='manifest'").fetchone()[0])

    def _record(self, row, query=""):
        d = dict(row)
        d.pop("normalized", None); d.pop("rank", None); d.pop("rowid", None)
        d["collection_label"] = COLLECTIONS[d["collection"]]
        d["review_status"] = "unreviewed_dataset_copy"
        d["grade"] = None
        d["citation"] = (
            f"{d['collection_label']} — {d['chapter_title']}\n"
            f"المصدر الرقمي: Itqan، {d['source_file']}، العنصر {d['source_position']}\n"
            f"معرف السجل: {d['record_id']}\n"
            f"نسخة بيانات وسيطة؛ لم تُراجع هنا على طبعة معتمدة.\n{d['source_url']}"
        )
        terms = normalize(query).split()
        d["snippet"] = highlighted_parts(d["arabic"], terms, excerpt=True)
        d["arabic_parts"] = highlighted_parts(d["arabic"], terms)
        d["dorar_search_url"] = "https://dorar.net/hadith/search?q=" + quote(query or " ".join(normalize(d['arabic']).split()[-18:]))
        return d

    def search(self, query, collection="all", limit=6):
        started = time.perf_counter()
        if not isinstance(query, str) or len(query) > MAX_QUERY:
            raise ValueError("اكتب عبارة لا تتجاوز ٢٠٠ حرف.")
        query = query.strip()
        q = normalize(query)
        tokens = list(dict.fromkeys(q.split()))
        useful = [t for t in tokens if t not in STOP and len(t) >= 2]
        if not useful or len(tokens) > 12:
            raise ValueError("اكتب كلمات مميزة من الحديث، بحد أقصى ١٢ كلمة.")
        if collection != "all" and collection not in COLLECTIONS:
            raise ValueError("المجموعة المطلوبة خارج نطاق الكتب الستة.")
        limit = max(1, min(int(limit), 12))
        # Token quotation prevents user input from becoming FTS query syntax.
        fts = " AND ".join('"' + t.replace('"', '""') + '"' for t in tokens)
        phrase = '"' + q.replace('"', '""') + '"'
        conditions, params = "", []
        if collection != "all":
            conditions = " AND r.collection = ?"; params = [collection]
        with self._connect() as conn:
            manifest = self._metadata(conn)
            count = conn.execute(
                "SELECT count(*) FROM search_fts JOIN records r ON r.rowid=search_fts.rowid WHERE search_fts MATCH ?" + conditions,
                [fts] + params,
            ).fetchone()[0]
            sql = "SELECT r.*, bm25(search_fts) rank FROM search_fts JOIN records r ON r.rowid=search_fts.rowid WHERE search_fts MATCH ?" + conditions + " ORDER BY rank, r.record_id LIMIT 120"
            candidates = {r['record_id']: dict(r) for r in conn.execute(sql, [fts] + params)}
            # Include phrase matches explicitly even when BM25's top token matches differ.
            for row in conn.execute(sql, [phrase] + params):
                candidates[row['record_id']] = dict(row)
            ordered = sorted(candidates.values(), key=lambda r: (0 if q in r['normalized'] else 1, r['rank'], r['record_id']))
            results = []
            for row in ordered[:limit]:
                d = self._record(row, query)
                d['match_type'] = 'normalized_phrase' if q in row['normalized'] else 'all_words'
                d['match_label'] = 'العبارة متصلة بعد التطبيع' if d['match_type'] == 'normalized_phrase' else 'الكلمات موجودة في مواضع مختلفة'
                results.append(d)
            suggestions = []
            if not count:
                # Suggest one lexical correction only; never silently change the query.
                for token in useful:
                    if len(token) < 4 or conn.execute("SELECT 1 FROM vocabulary WHERE term=?", [token]).fetchone():
                        continue
                    vocab = [r[0] for r in conn.execute("SELECT term FROM vocabulary WHERE length(term) BETWEEN ? AND ? AND term LIKE ? ORDER BY doc DESC LIMIT 1500", [len(token)-1, len(token)+1, token[0]+'%'])]
                    for replacement in difflib.get_close_matches(token, vocab, n=3, cutoff=0.78):
                        amended = ' '.join(replacement if t == token else t for t in tokens)
                        amended_fts = ' AND '.join('"'+t+'"' for t in amended.split())
                        if conn.execute("SELECT 1 FROM search_fts JOIN records r ON r.rowid=search_fts.rowid WHERE search_fts MATCH ?"+conditions+" LIMIT 1", [amended_fts]+params).fetchone():
                            suggestions.append(amended)
                    if suggestions:
                        break
        return {
            "status": "ok" if results else "no_match", "query": query,
            "collection": collection, "total_matches": count, "shown": len(results),
            "results": results, "suggestions": suggestions[:3],
            "collections": COLLECTIONS, "manifest": manifest,
            "elapsed_ms": round((time.perf_counter()-started)*1000),
            "notice": "مطابقة النص لا تعني الحكم بصحة الحديث. النتائج من نسخة بيانات وسيطة محددة المصدر.",
        }

    def get(self, record_id):
        if not isinstance(record_id, str) or len(record_id) > 160:
            raise ValueError("معرف السجل غير صالح.")
        with self._connect() as conn:
            row = conn.execute("SELECT * FROM records WHERE record_id = ?", [record_id]).fetchone()
            if row is None:
                return {"status": "not_found", "record_id": record_id, "message": "لم يُعثر على هذا المعرف في نسخة الفهرس الحالية. أعد البحث."}
            return {"status": "ok", "record": self._record(row), "manifest": self._metadata(conn)}


def render_interface(template, payload, mode="embed", selected=None):
    data = {"payload": payload, "mode": mode, "selected": selected}
    # JSON resides in a script element. Escape HTML delimiters, including </script>.
    encoded = json.dumps(data, ensure_ascii=False).replace("<", "\\u003c").replace(">", "\\u003e").replace("&", "\\u0026").replace("\u2028", "\\u2028").replace("\u2029", "\\u2029")
    return template.replace("__POC_DATA__", encoded)
