"""Add/remove one reversible script hook; preserve every existing frontend byte outside it."""
from pathlib import Path
import argparse
import hashlib
import json
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parent
START = b'<!-- HADITH_THEME_POC_START -->'
END = b'<!-- HADITH_THEME_POC_END -->'
HOOK = START + b'\n<script type="module" src="http://127.0.0.1:8770/assets/hadith-theme.js"></script>\n' + END

def transform(content, uninstall=False):
    if START in content:
        begin=content.index(START); finish=content.index(END,begin)+len(END)
        content=content[:begin]+content[finish:]
    if uninstall:
        return content
    anchor=content.rfind(b'</body>')
    if anchor<0:
        raise ValueError('Expected HTML body was not found; refusing to modify this file.')
    return content[:anchor]+HOOK+content[anchor:]

def install(path,uninstall=False):
    path=Path(path).resolve(strict=True)
    if path.name not in {'index.html','app.html'}:
        raise ValueError('Target must be the explicit frontend index.html or source app.html.')
    content=path.read_bytes(); updated=transform(content,uninstall)
    if updated==content: return {'status':'unchanged','path':str(path)}
    backup_dir=ROOT/'backups'; backup_dir.mkdir(exist_ok=True)
    digest=hashlib.sha256(content).hexdigest()
    backup=backup_dir/f'{path.stem}.{digest[:16]}.html'
    if not backup.exists(): backup.write_bytes(content)
    path.write_bytes(updated)
    result={'status':'removed' if uninstall else 'installed','path':str(path),'backup':str(backup),'before_sha256':digest,'after_sha256':hashlib.sha256(updated).hexdigest(),'time':datetime.now(timezone.utc).isoformat()}
    (ROOT/'installation.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
    return result

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--frontend',required=True);parser.add_argument('--uninstall',action='store_true');args=parser.parse_args()
    print(json.dumps(install(args.frontend,args.uninstall),indent=2))
