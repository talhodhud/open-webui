import jwt
import uuid
from datetime import datetime, timezone
import urllib.request
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

secret = 'Ql0+mtMQUEkuvRVNQYtiFDGGOFHBeQ3J'
user_id = '059a9be7-b5a5-4be9-88d1-7e0e0fa2548d'
payload = {'id': user_id, 'jti': str(uuid.uuid4()), 'iat': datetime.now(timezone.utc)}
token = jwt.encode(payload, secret, algorithm='HS256')

url = 'http://localhost:8080/api/chat/completions'
body = {
    'model': 'hadith-modular-agent',
    'messages': [
        {'role': 'user', 'content': 'حديث الصلاة جامعة'}
    ],
    'tool_ids': [
        'hadith_corpus_search',
        'hadith_takhrij',
        'hadith_sharh_vocab',
        'hadith_isnad_tree',
        'hadith_narrator'
    ],
    'stream': False
}

data = json.dumps(body).encode('utf-8')
req = urllib.request.Request(
    url,
    data=data,
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
)

print("Sending request with tool_ids to Open WebUI for model hadith-modular-agent...")
try:
    with urllib.request.urlopen(req, timeout=120) as resp:
        result = json.loads(resp.read().decode('utf-8'))
        choice = result.get('choices', [{}])[0]
        msg = choice.get('message', {})
        content = msg.get('content', '')
        print("\n=== MODEL RESPONSE PREVIEW (First 1500 chars) ===")
        print(content[:1500])
        print("\n=== MODEL RESPONSE TAIL (Last 1000 chars) ===")
        print(content[-1000:])
        
        # Validation checks
        print("\n=== AUTOMATED VALIDATION CHECKS ===")
        b_bug = '<b/>' in content or '</b >' in content
        print(f"1. Tag bug (<b/>) present? {'FAILED: Yes' if b_bug else 'PASSED: None found'}")
        
        has_matn = 'الصلاة جامعة' in content
        print(f"2. Authentic Matn present? {'PASSED' if has_matn else 'FAILED'}")
        
        has_sahabi = 'عائشة' in content or 'عبد الله بن عمرو' in content
        print(f"3. Sahabi identified? {'PASSED' if has_sahabi else 'FAILED'}")
        
        has_mermaid = '```mermaid' in content
        print(f"4. Mermaid tree present? {'PASSED' if has_mermaid else 'FAILED'}")
        
        has_next_steps = 'خيارات المتابعة' in content or 'بقية الكتب الستة' in content or 'شبكة الأسانيد' in content
        print(f"5. Interactive Next Steps present? {'PASSED' if has_next_steps else 'FAILED'}")
        
        with open('scripts/last_test_output.md', 'w', encoding='utf-8') as out_f:
            out_f.write(content)
        print("\nFull output saved to scripts/last_test_output.md")

except Exception as e:
    print("Error during test:", e)
    if hasattr(e, 'read'):
        print("Response body:", e.read().decode('utf-8', errors='replace'))
