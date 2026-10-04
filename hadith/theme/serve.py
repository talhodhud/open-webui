"""Loopback theme assets and read-only corpus search. Never receives Open WebUI credentials."""
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit, parse_qs
import json
import sys
import sqlite3

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT.parent / 'phrase_search'))
from engine import PhraseSearch

ENGINE = PhraseSearch(ROOT.parent / 'phrase_search' / 'search_index.sqlite')
ALLOWED_ORIGINS = {'http://localhost:8080', 'http://127.0.0.1:8080', 'http://localhost:8770', 'http://127.0.0.1:8770', 'http://127.0.0.1:5175'}

class Handler(BaseHTTPRequestHandler):
    def send_body(self, body, content_type='application/json; charset=utf-8', code=200):
        self.send_response(code)
        origin = self.headers.get('Origin', '')
        if origin in ALLOWED_ORIGINS:
            self.send_header('Access-Control-Allow-Origin', origin)
            self.send_header('Vary', 'Origin')
        self.send_header('Content-Type', content_type)
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.end_headers()
        self.wfile.write(body)

    def data(self, value, code=200):
        self.send_body(json.dumps(value, ensure_ascii=False).encode('utf-8'), code=code)

    def do_GET(self):
        # Bound to loopback; reject arbitrary web origins and DNS-rebinding hostnames.
        if self.headers.get('Host', '').split(':')[0] not in {'localhost','127.0.0.1'}:
            self.data({'message':'Unsupported host'},403); return
        origin = self.headers.get('Origin')
        if origin and origin not in ALLOWED_ORIGINS:
            self.data({'message':'Unsupported origin'},403); return
        url = urlsplit(self.path); query = parse_qs(url.query)
        try:
            if url.path in {'/','/preview.html'}:
                self.send_body((ROOT/'preview.html').read_bytes(),'text/html; charset=utf-8')
            elif url.path == '/assets/hadith-theme.js':
                self.send_body((ROOT/'dist'/'hadith-theme.js').read_bytes(),'text/javascript; charset=utf-8')
            elif url.path == '/health':
                self.data({'status':'ok','theme':'athar','index_available':ENGINE.path.is_file()})
            elif url.path == '/api/search':
                self.data(ENGINE.search(query.get('query',[''])[0], query.get('collection',['all'])[0], 12))
            elif url.path == '/api/record':
                self.data(ENGINE.get(query.get('record_id',[''])[0]))
            else:
                self.data({'message':'Not found'},404)
        except ValueError as e:
            self.data({'status':'error','message':str(e)},400)
        except (FileNotFoundError,sqlite3.Error):
            self.data({'status':'error','message':'ملفات التجربة غير متاحة. أعد بناء الحزمة وفهرس البحث.'},503)

if __name__ == '__main__':
    print('Hadith theme POC: http://127.0.0.1:8770', flush=True)
    ThreadingHTTPServer(('127.0.0.1',8770),Handler).serve_forever()
