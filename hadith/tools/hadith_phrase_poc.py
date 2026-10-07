"""
title: Hadith Phrase Search POC
author: Hadith KSA
version: 0.1.0
license: MIT
description: Interactive Arabic phrase search, exact source-record selection, and evidence cards. Does not assign Hadith grades.
"""
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

def _find_default_search_db():
    env_val = os.environ.get("HADITH_SEARCH_INDEX_PATH")
    if env_val and os.path.exists(env_val):
        return os.path.abspath(env_val)
    candidates = [
        "/app/backend/data/search_index.sqlite",
        "/app/data/search_index.sqlite",
        "/data/search_index.sqlite",
        "poc/phrase_search/search_index.sqlite",
        "hadith/poc/phrase_search/search_index.sqlite",
        "search_index.sqlite",
        "backend/data/search_index.sqlite"
    ]
    for c in candidates:
        if os.path.exists(c):
            return os.path.abspath(c)
    if os.name == 'nt':
        win_cand = r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\poc\phrase_search\search_index.sqlite"
        if os.path.exists(win_cand):
            return win_cand
    return ""

DEFAULT_DATABASE = _find_default_search_db()
UI_TEMPLATE = '<!doctype html>\n<html lang="ar" dir="rtl">\n<head>\n<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">\n<title>ابحث عن الحديث — تجربة الكلمات المتذكّرة</title>\n<style>\n:root{color-scheme:light dark;--bg:#f6f7f8;--surface:#fff;--text:#182438;--muted:#58677a;--line:#dde3e8;--brand:#125d50;--tint:#e9f5ef;--mark:#fff0ae;--warn:#77571c;--warn-bg:#fff6df}\n@media(prefers-color-scheme:dark){:root{--bg:#141b24;--surface:#1c2632;--text:#edf2f7;--muted:#b0bdcc;--line:#344454;--brand:#88d9bc;--tint:#233e37;--mark:#66541d;--warn:#efd59e;--warn-bg:#39301f}}\n*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font-family:"Segoe UI",Tahoma,Arial,sans-serif;font-size:16px;line-height:1.65}\nmain{max-width:1200px;margin:auto;padding:28px}header{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:23px}.identity{display:flex;align-items:center;gap:12px}.seal{border:1px solid var(--brand);color:var(--brand);border-radius:12px;width:42px;height:42px;display:grid;place-items:center;font-size:25px}h1{font-size:27px;margin:0;font-weight:650}h2{font-size:20px;margin:0 0 14px}h3{font-size:18px;margin:0}.subtitle,.muted{color:var(--muted)}.subtitle{margin:0;font-size:14px}.step{color:var(--brand);font-size:13px;white-space:nowrap}\nbutton,input,select,textarea{font:inherit}button,a,input,select{touch-action:manipulation}button{cursor:pointer;border:1px solid var(--line);border-radius:9px;padding:9px 15px;background:var(--surface);color:var(--text);min-height:44px}button:hover{border-color:var(--brand)}button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible,summary:focus-visible{outline:3px solid var(--brand);outline-offset:3px}.primary{background:var(--brand);color:var(--surface);border-color:var(--brand);font-weight:600}button:disabled{opacity:.6;cursor:wait}a{color:var(--brand);text-underline-offset:3px}.search-area{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:20px}label{display:block;margin-bottom:8px;font-weight:600}.search-row{display:grid;grid-template-columns:minmax(100px,1fr) 170px auto;gap:10px}input,select,textarea{width:100%;background:var(--bg);color:var(--text);border:1px solid var(--line);border-radius:9px;padding:11px 13px;min-height:46px}.example-row{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:12px;font-size:13px}.example-row button{min-height:34px;padding:4px 10px}.notice{font-size:13px;margin:13px 0 0;color:var(--muted)}.results-heading{display:flex;justify-content:space-between;gap:12px;align-items:center;margin:23px 0 12px}.results-heading h2{margin:0}.workspace{display:grid;grid-template-columns:minmax(260px,.88fr) minmax(0,1.3fr);gap:18px;align-items:start}.candidates{display:grid;gap:10px}.candidate{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px;text-align:right;width:100%;display:block}.candidate[aria-pressed=true]{border:2px solid var(--brand);padding:15px;background:var(--tint)}.candidate-head{display:flex;gap:10px;align-items:center;justify-content:space-between}.collection{font-weight:650;font-size:16px}.match{font-size:12px;color:var(--brand)}.snippet{font-size:16px;line-height:1.95;margin:9px 0;display:block}.source-line{color:var(--muted);font-size:12px;display:block}.open-label{color:var(--brand);font-size:13px;margin-top:6px;display:block}mark{background:var(--mark);color:inherit;border-radius:2px;padding:0 1px}.evidence{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:23px;min-width:0}.placeholder{padding:44px 20px;text-align:center;color:var(--muted)}.placeholder strong{display:block;color:var(--text);font-size:20px;margin-bottom:10px}.evidence-top{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center}.eyebrow{color:var(--brand);font-size:13px}.source-state{background:var(--warn-bg);color:var(--warn);padding:7px 10px;border-radius:7px;font-size:12px;margin:12px 0 18px}.full-arabic{font-size:20px;line-height:2.2;white-space:pre-wrap;overflow-wrap:anywhere;margin:10px 0 22px}details{border-top:1px solid var(--line);padding:13px 0}summary{cursor:pointer;color:var(--brand);font-weight:600;min-height:35px}dl{margin:7px 0;display:grid;grid-template-columns:140px minmax(0,1fr);gap:8px;font-size:13px}dt{color:var(--muted)}dd{margin:0;overflow-wrap:anywhere}code{font-size:12px;direction:ltr;unicode-bidi:embed}.actions{display:flex;flex-wrap:wrap;gap:9px;margin:17px 0 8px}.links{display:flex;flex-wrap:wrap;gap:17px;font-size:13px;margin-top:14px}.status{font-size:14px;color:var(--brand);margin:12px 0;min-height:23px;overflow-wrap:anywhere}.empty{padding:30px;background:var(--surface);border:1px dashed var(--line);border-radius:12px;text-align:center}.suggestions{display:flex;justify-content:center;gap:10px;flex-wrap:wrap}.foot{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;border-top:1px solid var(--line);margin-top:25px;padding-top:14px;font-size:12px;color:var(--muted)}.trace{font-size:12px;margin-top:8px;color:var(--muted)}.hidden,[hidden]{display:none!important}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}textarea{min-height:140px;line-height:1.7}.error{color:var(--warn)}.translation{direction:ltr;text-align:left;white-space:pre-wrap;font-size:16px}\n@media(max-width:760px){main{padding:16px}.workspace{grid-template-columns:1fr}header{align-items:flex-start}.step{display:none}h1{font-size:23px}.search-row{grid-template-columns:1fr 100px}.search-row input{grid-column:1/-1}.search-row select{width:100%}.evidence{padding:18px}.full-arabic{font-size:19px}dl{grid-template-columns:100px minmax(0,1fr)}}\n</style>\n</head>\n<body>\n<main id="hadith-phrase-poc">\n<header><div class="identity"><span class="seal" aria-hidden="true">ح</span><div><h1>ابحث عن الحديث</h1><p class="subtitle">ابدأ بالكلمات التي تتذكّرها، ثم افتح النص ومصدره</p></div></div><span class="step">٠١ البحث بالكلمات</span></header>\n<section class="search-area" aria-label="البحث بالكلمات المتذكّرة">\n<form id="search-form"><label for="query">ما الكلمات التي تتذكّرها؟</label><div class="search-row"><input id="query" type="search" maxlength="200" placeholder="مثال: الأعمال بالنيات" autocomplete="off" required><select id="collection" aria-label="مجموعة البحث"><option value="all">الكتب الستة</option></select><button class="primary" id="search-button" type="submit">ابحث</button></div></form>\n<div class="example-row"><span class="muted">جرّب:</span><button type="button" data-example="الأعمال بالنيات">الأعمال بالنيات</button><button type="button" data-example="فليقل خيرا أو ليصمت">فليقل خيرًا أو ليصمت</button><button type="button" data-example="يسروا ولا تعسروا">يسّروا ولا تعسّروا</button></div>\n<p class="notice">البحث يتجاوز اختلاف التشكيل وبعض صور الحروف. مطابقة الكلمات لا تعني الحكم بصحة الحديث.</p>\n</section>\n<div id="status" class="status" role="status" aria-live="polite"></div>\n<div class="results-heading"><h2 id="result-title">اختر كلمات مميزة من الحديث</h2><span id="result-count" class="muted"></span></div>\n<div class="workspace"><section class="candidates" id="candidates" aria-label="النصوص المطابقة"></section><section class="evidence" id="evidence" aria-label="النص ومصدره"><div class="placeholder"><strong>كل نتيجة لها نص ومصدر</strong>اختر نتيجة لقراءة النص كاملًا وفحص بيانات مصدره.</div></section></div>\n<div class="foot"><span id="coverage">نسخة بحث محلية من الكتب الستة</span><span>المصدر الرقمي: Itqan · إثبات مفهوم</span></div><div id="trace" class="trace" aria-live="polite"></div>\n</main>\n<script id="poc-data" type="application/json">__POC_DATA__</script>\n<script>\n(() => {\n  \'use strict\';\n  const config=JSON.parse(document.getElementById(\'poc-data\').textContent);\n  const root=document.getElementById(\'hadith-phrase-poc\');\n  const $=id=>root.querySelector(\'#\'+id);\n  let payload=config.payload || {}, selected=null, busy=false;\n  const fmt=n=>Number(n).toLocaleString(\'ar\');\n  const labels=payload.collections || {bukhari:\'صحيح البخاري\',muslim:\'صحيح مسلم\',abudawud:\'سنن أبي داود\',tirmidhi:\'جامع الترمذي\',nasai:\'سنن النسائي\',ibnmajah:\'سنن ابن ماجه\'};\n  for(const [id,name] of Object.entries(labels)){const o=document.createElement(\'option\');o.value=id;o.textContent=name;$(\'collection\').append(o)}\n  function el(tag,text,cls){const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e}\n  function say(text,error=false){$(\'status\').textContent=text;$(\'status\').classList.toggle(\'error\',error)}\n  function parts(parent,items){for(const p of items || [])parent.append(el(p.match?\'mark\':\'span\',p.text))}\n  function height(){if(window.parent!==window)window.parent.postMessage({type:\'iframe:height\',height:document.documentElement.scrollHeight},\'*\')}\n  function sendPrompt(text){\n    if(window.parent===window){say(\'هذه الصفحة خارج المحادثة. افتحها كأداة في Open WebUI لإرسال الاختيار.\',true);return}\n    window.parent.postMessage({type:\'input:prompt:submit\',text},\'*\');\n    say(\'أُرسل الطلب إلى المحادثة. قد يظهر تأكيد الإرسال من Open WebUI.\');\n  }\n  async function runSearch(query){\n    if(busy)return;\n    query=query.trim();$(\'query\').value=query;\n    if(!query){say(\'اكتب كلمات من الحديث أولًا.\',true);return}\n    if(config.mode===\'embed\'){\n      sendPrompt(\'ابحث بالكلمات التالية باستخدام search_remembered_hadith واعرض البطاقة التفاعلية. لا تضف حكمًا على صحة النتائج. query=\'+JSON.stringify(query)+\' collection=\'+$(\'collection\').value);return;\n    }\n    busy=true;$(\'search-button\').disabled=true;say(\'جارٍ البحث في النصوص…\');\n    try{\n      const response=await fetch(\'/api/search?\'+new URLSearchParams({query,collection:$(\'collection\').value}));\n      const data=await response.json();if(!response.ok)throw new Error(data.message || \'تعذر البحث\');\n      payload=data;selected=null;render();say(\'تم البحث. اختر نتيجة لفتح النص ومصدره.\');\n      $(\'trace\').textContent=\'بحث فعلي بالأداة · \'+data.elapsed_ms+\' ms · لا يُستخدم نموذج لغوي في صفحة الاختبار هذه\';\n    }catch(e){say(e.message,true)}finally{busy=false;$(\'search-button\').disabled=false;height()}\n  }\n  function render(){\n    $(\'candidates\').replaceChildren();$(\'query\').value=payload.query || \'\';$(\'collection\').value=payload.collection || \'all\';\n    $(\'result-title\').textContent=payload.query?\'نتائج الكلمات المتذكّرة\':\'اختر كلمات مميزة من الحديث\';\n    $(\'result-count\').textContent=payload.query?fmt(payload.shown || 0)+\' من \'+fmt(payload.total_matches || 0)+\' نتيجة\':\'\';\n    if(payload.manifest)$(\'coverage\').textContent=fmt(payload.manifest.record_count)+\' سجل · ٦ مجموعات · نسخة \'+payload.manifest.dataset_id;\n    if(payload.status===\'no_match\'){\n      const empty=el(\'div\',undefined,\'empty\');empty.append(el(\'h3\',\'لم نعثر على مطابقة في النسخة المفهرسة\'),el(\'p\',\'غياب النتيجة لا يعني أن العبارة ليست حديثًا. جرّب كلمات أقل أو راجع الكتابة.\',\'muted\'));\n      if(payload.suggestions?.length){empty.append(el(\'p\',\'هل تقصد؟\'));const row=el(\'div\',undefined,\'suggestions\');for(const s of payload.suggestions){const b=el(\'button\',s);b.type=\'button\';b.onclick=()=>runSearch(s);row.append(b)}empty.append(row)}$(\'candidates\').append(empty);\n    }\n    for(const [index,r] of (payload.results || []).entries()){\n      const b=el(\'button\',undefined,\'candidate\');b.type=\'button\';b.dataset.recordId=r.record_id;b.setAttribute(\'aria-pressed\',\'false\');b.setAttribute(\'aria-label\',\'افتح النتيجة \'+(index+1)+\' من \'+r.collection_label);\n      const top=el(\'span\',undefined,\'candidate-head\');top.append(el(\'span\',r.collection_label,\'collection\'),el(\'span\',fmt(index+1),\'muted\'));b.append(top,el(\'span\',r.match_label,\'match\'));\n      const snippet=el(\'span\',undefined,\'snippet\');parts(snippet,r.snippet);b.append(snippet,el(\'span\',r.chapter_title+\' · موضع \'+fmt(r.source_position)+\' في الملف الرقمي\',\'source-line\'),el(\'span\',\'النص والمصدر ←\',\'open-label\'));\n      b.onclick=()=>selectRecord(r);$(\'candidates\').append(b);\n    }\n    if(!selected){$(\'evidence\').replaceChildren();const p=el(\'div\',undefined,\'placeholder\');p.append(el(\'strong\',\'افتح نتيجة لقراءة النص\'),el(\'span\',\'ستظهر بيانات المصدر وحالة المراجعة هنا.\'));$(\'evidence\').append(p)}\n    if(config.selected && !selected){selected=config.selected;showEvidence(selected);config.selected=null;$(\'result-title\').textContent=\'النص الذي اخترته\';$(\'candidates\').hidden=true;root.querySelector(\'.workspace\').style.gridTemplateColumns=\'1fr\'}\n    height();\n  }\n  async function selectRecord(r){\n    if(config.mode===\'demo\'){\n      try{const res=await fetch(\'/api/record?\'+new URLSearchParams({record_id:r.record_id}));const data=await res.json();if(!res.ok||data.status!==\'ok\')throw new Error(data.message || \'تعذر فتح السجل\');selected={...data.record,arabic_parts:r.arabic_parts};$(\'trace\').textContent=\'اكتملت الحلقة: search_remembered_hadith ← اختيار المعرف ← open_hadith_record\';}\n      catch(e){say(e.message,true);return}\n    }else selected=r;\n    showEvidence(selected);say(\'فُتح النص المحدد. يمكنك فحص المصدر أو اعتماد اختياره في المحادثة.\');\n    if(window.innerWidth<761)$(\'evidence\').scrollIntoView({behavior:\'smooth\',block:\'start\'});\n  }\n  function showEvidence(r){\n    for(const b of $(\'candidates\').querySelectorAll(\'button[data-record-id]\'))b.setAttribute(\'aria-pressed\',String(b.dataset.recordId===r.record_id));\n    const panel=$(\'evidence\');panel.replaceChildren();const top=el(\'div\',undefined,\'evidence-top\');top.append(el(\'span\',\'النص المحدد\',\'eyebrow\'),el(\'span\',r.collection_label,\'collection\'));panel.append(top,el(\'h2\',r.chapter_title));\n    panel.append(el(\'div\',\'حالة المصدر: نسخة بيانات وسيطة، لم تُراجع هنا على طبعة معتمدة. لا تعرض هذه البطاقة حكمًا على الصحة.\',\'source-state\'));\n    const arabic=el(\'div\',undefined,\'full-arabic\');arabic.id=\'selected-arabic\';parts(arabic,r.arabic_parts || [{text:r.arabic,match:false}]);panel.append(arabic);\n    if(r.english){const translation=el(\'details\');translation.append(el(\'summary\',\'الترجمة الإنجليزية في المصدر الرقمي\'),el(\'p\',r.english_narrator+\'\\n\'+r.english,\'translation\'));panel.append(translation)}\n    const provenance=el(\'details\');provenance.open=true;provenance.append(el(\'summary\',\'بيانات المصدر والتتبّع\'));\n    const dl=el(\'dl\');for(const [key,value] of [[\'العمل\',r.collection_label],[\'قسم المصدر\',r.chapter_title],[\'ملف البيانات\',r.source_file],[\'الموضع في الملف\',String(r.source_position)],[\'نظام الترقيم\',\'موضع داخل الملف، وليس رقمًا معتمدًا بين الطبعات\'],[\'معرف السجل\',r.record_id],[\'بصمة النص\',r.text_sha256]]){dl.append(el(\'dt\',key),el(\'dd\',value))}provenance.append(dl);panel.append(provenance);\n    const actions=el(\'div\',undefined,\'actions\');const select=el(\'button\',config.mode===\'demo\'?\'تأكيد اختيار النص\':\'اعتمد هذا النص في المحادثة\',\'primary\');select.type=\'button\';select.onclick=()=>{\n      if(config.mode===\'demo\'){say(\'تم تثبيت اختيار النص بالمعرف الدقيق. جرّب أداة Open WebUI لإكماله مع المساعد.\');$(\'trace\').textContent=\'المعرف المختار: \'+r.record_id;return}\n      sendPrompt(\'اخترت السجل \'+r.record_id+\'. استدع open_hadith_record بهذا المعرف كما هو، ثم اذكر مصدر النص وحالة مراجعته بإيجاز. لا تستبدله برقم حديث عام ولا تستنتج درجة صحة.\');\n    };const copy=el(\'button\',\'انسخ النص مع مصدره\');copy.type=\'button\';copy.onclick=async()=>{\n      const text=r.arabic+\'\\n\\n\'+r.citation;try{await navigator.clipboard.writeText(text);say(\'نُسخ النص ومصدره وحالة مراجعته.\')}catch{let box=panel.querySelector(\'#copy-fallback\');if(!box){const label=el(\'label\',\'النص والمصدر للنسخ\');label.htmlFor=\'copy-fallback\';box=el(\'textarea\');box.id=\'copy-fallback\';box.readOnly=true;panel.append(label,box)}box.value=text;box.focus();box.select();say(\'النسخ التلقائي غير متاح هنا. النص والمصدر محددان للنسخ اليدوي.\')}height();\n    };actions.append(select,copy);panel.append(actions);\n    const links=el(\'div\',undefined,\'links\');for(const [name,url] of [[\'افتح ملف المصدر الرقمي\',r.source_url],[\'ابحث عن العبارة في الدرر\',r.dorar_search_url]]){const a=el(\'a\',name);a.href=url;a.target=\'_blank\';a.rel=\'noopener noreferrer\';links.append(a)}panel.append(links,el(\'p\',\'رابط الدرر يفتح بحثًا مستقلًا؛ لم تُطابق أحكامه آليًا بهذا السجل.\',\'notice\'));height();\n  }\n  $(\'search-form\').addEventListener(\'submit\',e=>{e.preventDefault();runSearch($(\'query\').value)});\n  for(const b of root.querySelectorAll(\'[data-example]\'))b.onclick=()=>runSearch(b.dataset.example);\n  render();\n  window.addEventListener(\'load\',height);new ResizeObserver(height).observe(document.body);\n})();\n</script>\n</body></html>\n'
from fastapi.responses import HTMLResponse
from pydantic import BaseModel, Field
import asyncio


class Tools:
    class Valves(BaseModel):
        SEARCH_DB_PATH: str = Field(default="", description="Path to phrase-search SQLite index (or set HADITH_SEARCH_INDEX_PATH).")

        def __init__(self, **data):
            super().__init__(**data)
            if not self.SEARCH_DB_PATH or not os.path.exists(self.SEARCH_DB_PATH):
                self.SEARCH_DB_PATH = _find_default_search_db()

    def _ensure_search_db(self) -> str:
        if not self.valves.SEARCH_DB_PATH or not os.path.exists(self.valves.SEARCH_DB_PATH):
            self.valves.SEARCH_DB_PATH = _find_default_search_db()
        return self.valves.SEARCH_DB_PATH

    def __init__(self):
        self.valves = self.Valves()
        self._ensure_search_db()

    async def search_remembered_hadith(self, query: str, collection: str = "all", limit: int = 6) -> tuple:
        """
        Search remembered ARABIC words across six Hadith collections and display an interactive evidence card.
        Call this for a phrase-search request. Return the card; never infer authenticity from a match.
        Ask the user to select a result; use its complete record_id with open_hadith_record.
        :param query: Only the remembered Arabic words, not the surrounding question. Maximum 200 characters and 12 words.
        :param collection: all, bukhari, muslim, abudawud, tirmidhi, nasai, or ibnmajah.
        :param limit: Number of candidates, 1 to 12.
        :return: Interactive HTML and structured result context with exact record identifiers.
        """
        try:
            result = await asyncio.to_thread(PhraseSearch(self.valves.SEARCH_DB_PATH).search, query, collection, limit)
            context = {k: result[k] for k in ['status','query','collection','total_matches','suggestions','notice','manifest']}
            context['results'] = [{k:r[k] for k in ['record_id','collection_label','chapter_title','source_position','match_type','source_url','review_status']} for r in result['results']]
            context['next_step'] = 'The user can inspect cards locally. On selection, call open_hadith_record with the exact record_id. Do not output grades or invent a canonical Hadith number.'
            return HTMLResponse(render_interface(UI_TEMPLATE,result),headers={'Content-Disposition':'inline'}), context
        except (ValueError,FileNotFoundError,sqlite3.Error) as exc:
            return self._error(str(exc))

    async def open_hadith_record(self, record_id: str) -> tuple:
        """
        Retrieve the exact occurrence chosen from the interactive phrase-search card, preserving its source.
        :param record_id: Complete opaque record_id returned by search_remembered_hadith; never substitute a Hadith number.
        :return: Full source text, citation, unreviewed status, and interactive evidence card.
        """
        try:
            result=await asyncio.to_thread(PhraseSearch(self.valves.SEARCH_DB_PATH).get,record_id)
            if result['status']!='ok':
                return self._error(result['message'])
            record=result['record']
            payload={'status':'ok','query':'','results':[],'shown':0,'total_matches':0,'collections':COLLECTIONS,'manifest':result['manifest']}
            context={'status':'ok','record_id':record_id,'arabic':record['arabic'],'citation':record['citation'],'review_status':record['review_status'],'grade':None,
                     'instruction':'Acknowledge the exact selected text and its source. This is a dataset transcription, not independent authentication. Do not add a grade, inferred chain, or canonical number.'}
            return HTMLResponse(render_interface(UI_TEMPLATE,payload,selected=record),headers={'Content-Disposition':'inline'}),context
        except (ValueError,FileNotFoundError,sqlite3.Error) as exc:
            return self._error(str(exc))

    def _error(self,message):
        import html
        return HTMLResponse('<html lang="ar" dir="rtl"><body><p>'+html.escape(message)+'</p></body></html>',headers={'Content-Disposition':'inline'}),{'status':'error','message':message}
