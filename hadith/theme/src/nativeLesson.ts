import {TOPIC_EVIDENCE} from './topicEvidence.ts';

/** Older recorded lessons can render only when each quote matches our frozen source. */
function legacyPresentation(d:any):any|null {
  const content=d?.lesson_content;
  if(d?.format!=='card'||!content?.headline||!content.takeaway||!Array.isArray(d.quotes)||!d.quotes.length)return null;
  const quotes=[];
  for(const q of d.quotes){
    const r=(TOPIC_EVIDENCE[d.topic_id]||[]).find(r=>r.id===q.occurrence_id);
    const exact=q.exact_text||q.text?.replace(/^«|»$/g,'');const span=q.source_span;
    if(!r||!exact||!Array.isArray(span)||span.length!==2||!span.every(Number.isInteger)||span[0]<0||span[0]>=span[1]||Array.from(r.text).slice(span[0],span[1]).join('')!==exact)return null;
    const names:Record<string,string>={bukhari:'صحيح البخاري',muslim:'صحيح مسلم',tirmidhi:'جامع الترمذي',abudawud:'سنن أبي داود',nasai:'سنن النسائي',ibnmajah:'سنن ابن ماجه'};
    quotes.push({exact_text:exact,source_label:`${names[r.collection]||r.collection} · ${r.chapter}`,occurrence_id:r.id,source_url:r.url,text_sha256:r.sha256,source_span:span,source_locator:{display_label:`موضع المصدر المحلي: ${r.position}`,numbering_note:'الموضع في بيانات إتقان، وليس رقم الحديث في جميع الطبعات.'}});
  }
  return {schema_version:'1',type:'hadith_card',headline:content.headline,takeaway:content.takeaway,quotes};
}

/** Presentation comes from a correlated native tool result, never assistant HTML. */
export function lessonsFromNativeChat(response: any, visibleMessageIds: string[] = []): any[] {
  const history = (response?.chat || response)?.history;
  if (!history?.messages || !history.currentId) return [];
  const visible = new Set(visibleMessageIds), seen = new Set<string>(), cards: any[] = [];
  let id = history.currentId;
  while (id && !seen.has(id)) {
    seen.add(id);
    const m = history.messages[id];
    if (!m) break;
    id = m.parentId;
    if (m.role !== 'assistant' || (visible.size && !visible.has(m.id))) continue;
    const output = Array.isArray(m.output) ? m.output : [];
    const calls = new Set(output.filter((o: any) => o.type === 'function_call' &&
      /(?:^|[._])get_reviewed_lesson$/.test(o.name || '')).map((o: any) => o.call_id));
    for (const o of [...output].reverse()) {
      if (o.type !== 'function_call_output' || !calls.has(o.call_id)) continue;
      const blocks = typeof o.output === 'string' ? [{text:o.output}] : o.output;
      if (!Array.isArray(blocks)) continue;
      for (const b of blocks) {
        if (typeof b?.text !== 'string' || b.text.length > 2_000_000) continue;
        try {
          const p = JSON.parse(b.text), d = p?.data, c = d?.presentation || legacyPresentation(d);
          if (p.schema_version !== '1' || p.status !== 'needs_review' || d?.format !== 'card' ||
            d.source_verified !== true || d.scholarly_approved !== false || d.review_status !== 'needs_review' ||
            c?.type !== 'hadith_card' || c.schema_version !== '1' || !c.headline || !c.takeaway ||
            !Array.isArray(c.quotes) || !c.quotes.length || c.quotes.some((q: any) =>
              !q.exact_text || !q.source_label || !q.occurrence_id || !q.text_sha256 ||
              !Array.isArray(q.source_span) || q.source_span.length !== 2 ||
              !safeSourceURL(q.source_url))) continue;
          cards.push({...d, presentation:c, message_id:m.id});
          break;
        } catch { /* malformed or failed outputs do not produce a card */ }
      }
      // The latest requested lesson determines this message. A failed or different
      // format must not silently resurrect an earlier, broader card.
      break;
    }
  }
  return cards;
}

export function safeSourceURL(value: string): string | null {
  try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password ? u.href : null; }
  catch { return null; }
}

export function cardPlainText(lesson: any, includeDetails = false): string {
  const c = lesson.presentation;
  const parts = [c.headline, c.takeaway, ...c.quotes.map((q: any) => `«${q.exact_text}»\n${q.source_label}`),
    'مسودة تعليمية تحتاج مراجعة علمية؛ مطابقة النص للمصدر لا تعني اعتماد الشرح.'];
  if (includeDetails) parts.push(...c.quotes.map((q: any) =>
    `${q.occurrence_id}\n${q.source_url}\n${q.source_locator?.display_label || ''}\nSHA-256: ${q.text_sha256}`));
  return parts.join('\n\n');
}

const escapeHTML = (s: any) => String(s ?? '').replace(/[&<>"']/g, c =>
  ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));

export function cardDocument(lesson: any): string {
  const c = lesson.presentation;
  return `<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'"><title>${escapeHTML(c.headline)}</title><style>body{margin:0;padding:3vw;background:#eee9df;color:#30223f;font:18px/1.9 Tahoma,Arial}article{max-width:760px;margin:auto;padding:40px;background:#fffdf7;border:1px solid #c5ac77;border-radius:28px}small{color:#795e39}h1{font-size:30px}blockquote{padding:20px;margin:20px 0;background:#f3edf6;border-right:4px solid #b99a60;border-radius:16px}a{color:#624079}details{font-size:14px;overflow-wrap:anywhere}footer{border-top:1px solid #dacdac;padding-top:16px;font-size:13px}@media print{body{background:white;padding:0}article{border:0;max-width:none}details{display:block}}</style><article><small>بيان السُّنّة · ${escapeHTML(lesson.title_ar)}</small><h1>${escapeHTML(c.headline)}</h1><p>${escapeHTML(c.takeaway)}</p>${c.quotes.map((q: any) => `<blockquote>«${escapeHTML(q.exact_text)}»<br><small>${escapeHTML(q.source_label)}</small></blockquote>`).join('')}<footer>مسودة تعليمية تحتاج مراجعة علمية؛ مطابقة النص للمصدر لا تعني اعتماد الشرح.</footer><details><summary>تفاصيل المصادر والتحقق</summary>${c.quotes.map((q:any) => `<p>${escapeHTML(q.source_label)}<br><a href="${escapeHTML(safeSourceURL(q.source_url) || '')}" rel="noopener noreferrer">المصدر</a><br>${escapeHTML(q.source_locator?.display_label)}<br>${escapeHTML(q.occurrence_id)}<br>SHA-256: ${escapeHTML(q.text_sha256)}</p>`).join('')}</details></article></html>`;
}
