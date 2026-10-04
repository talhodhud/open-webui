"""Loopback-only test harness for the same engine and UI used by the WebUI tool."""
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse,parse_qs
import json
from engine import PhraseSearch,render_interface,COLLECTIONS

ROOT=Path(__file__).resolve().parent
ENGINE=PhraseSearch(ROOT/'search_index.sqlite')
TEMPLATE=(ROOT/'interface.html').read_text(encoding='utf-8')

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        request=urlparse(self.path);params=parse_qs(request.query)
        try:
            if request.path=='/':
                body=render_interface(TEMPLATE,{'collections':COLLECTIONS},mode='demo').encode('utf-8');content='text/html; charset=utf-8'
            elif request.path=='/api/search':
                data=ENGINE.search(params.get('query',[''])[0],params.get('collection',['all'])[0]);body=json.dumps(data,ensure_ascii=False).encode();content='application/json; charset=utf-8'
            elif request.path=='/api/record':
                data=ENGINE.get(params.get('record_id',[''])[0]);body=json.dumps(data,ensure_ascii=False).encode();content='application/json; charset=utf-8'
            elif request.path=='/health':
                body=b'{"status":"ok"}';content='application/json'
            else:
                self.send_error(404);return
            self.send_response(200);self.send_header('Content-Type',content);self.send_header('Cache-Control','no-store');self.send_header('X-Content-Type-Options','nosniff');self.end_headers();self.wfile.write(body)
        except (ValueError,FileNotFoundError) as exc:
            self.send_response(400);self.send_header('Content-Type','application/json; charset=utf-8');self.end_headers();self.wfile.write(json.dumps({'status':'error','message':str(exc)},ensure_ascii=False).encode())

if __name__=='__main__':
    import argparse
    p=argparse.ArgumentParser();p.add_argument('--port',type=int,default=8765);a=p.parse_args()
    print(f'Phrase-search test harness: http://127.0.0.1:{a.port}',flush=True)
    ThreadingHTTPServer(('127.0.0.1',a.port),Handler).serve_forever()
