"""Install the verified theme bundle into an existing Open WebUI frontend.

Preserves a backup and changes only the theme asset and its loader tag.
"""
import argparse
from datetime import datetime, timezone
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import shutil

HADITH = Path(__file__).resolve().parents[1]

def install(frontend: Path, check_only: bool = False):
    bundle = HADITH / "theme/dist/hadith-theme.js"
    manifest = json.loads((HADITH / "exports/delivery_manifest.json").read_text(encoding="utf-8"))
    expected = manifest.get("theme_assets", {}).get("dist/hadith-theme.js", {}).get("sha256")
    content = bundle.read_bytes()
    digest = hashlib.sha256(content).hexdigest()
    if not expected or digest != expected:
        raise ValueError("Build and export the theme first: its bundle must match the delivery manifest.")
    index = frontend / "index.html"
    html = index.read_text(encoding="utf-8")
    target = frontend / "hadith-theme-poc/hadith-theme.js"
    tag = f'<script type="module" src="/hadith-theme-poc/hadith-theme.js?v={digest[:16]}"></script>'
    pattern = r'<script\b[^>]*src=[\"\']/hadith-theme-poc/hadith-theme\.js(?:\?[^\"\']*)?[\"\'][^>]*>\s*</script>'
    if check_only:
        if not target.is_file() or hashlib.sha256(target.read_bytes()).hexdigest() != digest or tag not in html:
            raise ValueError("The installed theme or its cache version differs from the verified bundle.")
        return {"status": "verified", "sha256": digest, "frontend": str(frontend)}
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    backup = HADITH.parent / ".bayan-runtime-backups" / stamp
    backup.mkdir(parents=True, exist_ok=True)
    shutil.copy2(index, backup / "index.html")
    if target.exists():
        shutil.copy2(target, backup / "hadith-theme.js")
    changed, count = re.subn(pattern, lambda _: tag, html)
    if count > 1:
        raise ValueError("Multiple theme loaders found; refusing an ambiguous installation.")
    if count == 0:
        if "</body>" not in html:
            raise ValueError("Open WebUI index.html has no closing body tag.")
        changed = html.replace("</body>", tag + "\n</body>", 1)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(content)
    index.write_bytes(changed.encode("utf-8"))
    result = install(frontend, check_only=True)
    result["backup"] = str(backup)
    return result

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--frontend-dir", type=Path)
    parser.add_argument("--check-only", action="store_true")
    args = parser.parse_args()
    frontend = args.frontend_dir
    if frontend is None:
        spec = importlib.util.find_spec("open_webui")
        if spec is None or not spec.origin:
            raise SystemExit("Open WebUI package not found; pass --frontend-dir.")
        frontend = Path(spec.origin).parent / "frontend"
    print(json.dumps(install(frontend.resolve(), args.check_only), ensure_ascii=False))
