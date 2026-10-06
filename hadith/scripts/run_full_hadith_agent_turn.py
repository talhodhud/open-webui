import jwt
import uuid
from datetime import datetime, timezone
import urllib.request
import json
import sys
import asyncio

sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, 'tools')

from hadith_corpus_search_tool import Tools as CorpusTools
from hadith_takhrij_tool import Tools as TakhrijTools
from hadith_sharh_vocab_tool import Tools as SharhTools
from hadith_isnad_tree_tool import Tools as IsnadTools
from hadith_narrator_tool import Tools as NarratorTools

corpus_tools = CorpusTools()
takhrij_tools = TakhrijTools()
sharh_tools = SharhTools()
isnad_tools = IsnadTools()
narrator_tools = NarratorTools()

secret = 'Ql0+mtMQUEkuvRVNQYtiFDGGOFHBeQ3J'
user_id = '059a9be7-b5a5-4be9-88d1-7e0e0fa2548d'
payload = {'id': user_id, 'jti': str(uuid.uuid4()), 'iat': datetime.now(timezone.utc)}
token = jwt.encode(payload, secret, algorithm='HS256')

url = 'http://localhost:8080/api/chat/completions'

def execute_tool_call(name, args):
    print(f"  -> Executing tool: {name}({args})")
    try:
        if name == 'search_hadith_corpus':
            res = corpus_tools.search_hadith_corpus(**args)
        elif name == 'search_dorar_hadith':
            res = takhrij_tools.search_dorar_hadith(**args)
        elif name in ('get_hadith_explanation', 'get_hadith_explanation_hadeethenc'):
            query = args.get('query') or args.get('search_phrase')
            lang = args.get('language', 'ar')
            res = sharh_tools.get_hadith_explanation(query=query, language=lang)
        elif name == 'get_hadith_isnad_tree':
            res = isnad_tools.get_hadith_isnad_tree(**args)
        elif name == 'get_narrator_profile':
            res = narrator_tools.get_narrator_profile(**args)
        else:
            res = f"Tool {name} not found"
            
        if asyncio.iscoroutine(res):
            res = asyncio.run(res)
        if isinstance(res, (dict, list)):
            return json.dumps(res, ensure_ascii=False)
        return str(res)
    except Exception as e:
        print(f"Tool execution error: {e}")
        return json.dumps({"error": str(e)}, ensure_ascii=False)

def call_api(messages):
    body = {
        'model': 'hadith-modular-agent',
        'messages': messages,
        'tool_ids': [
            'hadith_corpus_search',
            'hadith_takhrij',
            'hadith_sharh_vocab',
            'hadith_isnad_tree',
            'hadith_narrator'
        ],
        'stream': False
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode('utf-8'),
        headers={
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.loads(resp.read().decode('utf-8'))

user_message = {"role": "user", "content": "حديث الصلاة جامعة"}
messages = [user_message]

print("Starting multi-step agent interaction loop...")
final_content = None

for step in range(1, 10):
    print(f"\n--- Interaction Round {step} ---")
    resp = call_api(messages)
    choice = resp['choices'][0]
    msg = choice['message']
    messages.append(msg)
    
    tool_calls = msg.get('tool_calls', [])
    if tool_calls:
        print(f"Round {step}: Model requested {len(tool_calls)} tool calls.")
        for tc in tool_calls:
            fn_name = tc['function']['name']
            fn_args = json.loads(tc['function']['arguments'])
            tool_result = execute_tool_call(fn_name, fn_args)
            messages.append({
                "role": "tool",
                "tool_call_id": tc['id'],
                "content": tool_result
            })
    else:
        print(f"Round {step}: Model finished calling tools and returned final response.")
        final_content = msg.get('content', '')
        break

print("\n=== FINAL GENERATED RESPONSE ===\n")
print(final_content)

print("\n=== AUTOMATED VALIDATION CHECKS ===")
if final_content:
    b_bug = '<b/>' in final_content or '</b >' in final_content
    print(f"1. Tag bug (<b/>) present? {'FAILED: Found!' if b_bug else 'PASSED: None found'}")

    has_matn = 'الصلاة جامعة' in final_content
    print(f"2. Authentic Matn present? {'PASSED' if has_matn else 'FAILED'}")

    has_sahabi = 'عائشة' in final_content or 'عبد الله بن عمرو' in final_content
    print(f"3. Sahabi identified? {'PASSED' if has_sahabi else 'FAILED'}")

    has_mermaid = '```mermaid' in final_content
    print(f"4. Mermaid tree present? {'PASSED' if has_mermaid else 'FAILED'}")

    has_next_steps = 'خيارات المتابعة' in final_content or 'بقية الكتب الستة' in final_content or 'شبكة الأسانيد' in final_content
    print(f"5. Interactive Next Steps present? {'PASSED' if has_next_steps else 'FAILED'}")

    with open('scripts/final_test_output.md', 'w', encoding='utf-8') as out_f:
        out_f.write(final_content)
    print("\nFull output saved to scripts/final_test_output.md")
else:
    print("FAILED: No final content received.")
