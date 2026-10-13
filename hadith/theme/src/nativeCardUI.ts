import {cardDocument, cardPlainText, safeSourceURL} from './nativeLesson';

const el = <K extends keyof HTMLElementTagNameMap>(tag:K, cls='', text?:string) => {
  const n=document.createElement(tag);n.className=cls;if(text!==undefined)n.textContent=text;return n;
};
function action(text:string, run:()=>void){const b=el('button','bayan-card-button',text);b.type='button';b.onclick=run;return b;}

/** Text nodes only: tool strings cannot inject HTML, scripts, or event handlers. */
export function createLessonCard(lesson:any, explore:()=>void, toggleText?:()=>void):HTMLElement {
  const c=lesson.presentation, card=el('article','bayan-lesson-card');card.dir='rtl';
  card.setAttribute('aria-label','بطاقة تعليمية: '+c.headline);
  const content=el('div','bayan-card-face');
  const top=el('div','bayan-card-top');top.append(el('span','bayan-card-brand','بيان السُّنّة'),el('span','bayan-card-topic',lesson.title_ar));
  content.append(top,el('h2','',c.headline),el('p','bayan-card-takeaway',c.takeaway));
  for(const q of c.quotes){const quote=el('blockquote','bayan-card-quote');quote.append(el('p','',`«${q.exact_text}»`),el('cite','',q.source_label));content.append(quote);}
  content.append(el('p','bayan-card-review','مسودة تعليمية · تحتاج مراجعة علمية'));
  card.append(content);
  const controls=el('div','bayan-card-controls');
  const feedback=el('span','bayan-card-feedback');feedback.setAttribute('role','status');
  controls.append(action('عرض البطاقة',()=>{
    const dialog=el('dialog','bayan-card-dialog');dialog.dir='rtl';dialog.setAttribute('aria-label','عرض البطاقة التعليمية');
    dialog.append(action('إغلاق البطاقة',()=>{dialog.close();dialog.remove();}),createLessonCard(lesson,explore));
    // The enlarged view has no nested enlargement button.
    dialog.querySelectorAll('.bayan-card-controls button')[0]?.remove();
    dialog.onclick=e=>{if(e.target===dialog){dialog.close();dialog.remove();}};
    dialog.onclose=()=>dialog.remove();document.body.append(dialog);dialog.showModal();
  }));
  controls.append(action('نسخ البطاقة',async()=>{try{await navigator.clipboard.writeText(cardPlainText(lesson,false));feedback.textContent='نُسخت البطاقة بمصادرها المختصرة';}catch{feedback.textContent='تعذر النسخ؛ يمكنك تنزيل البطاقة';}}));
  controls.append(action('تنزيل البطاقة',()=>{const a=el('a');const url=URL.createObjectURL(new Blob([cardDocument(lesson)],{type:'text/html;charset=utf-8'}));a.href=url;a.download=`bayan-${lesson.topic_id}${lesson.subtopic_id?'-'+lesson.subtopic_id:''}.html`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);feedback.textContent='بطاقة HTML مستقلة؛ افتحها للعرض أو اطبعها إلى PDF';}));
  controls.append(action('استكشف موضوعًا آخر',explore));
  if(toggleText)controls.append(action('عرض نص المحادثة',toggleText));
  card.append(controls,feedback);
  const sources=el('details','bayan-card-sources');sources.append(el('summary','',`المصادر والتحقق · ${c.quotes.length} شواهد`),el('p','',lesson.scope_note));
  for(const q of c.quotes){const item=el('div','bayan-card-source');const link=el('a','',q.source_label);link.href=safeSourceURL(q.source_url)!;link.target='_blank';link.rel='noopener noreferrer';item.append(link,el('p','',q.selection_rationale));
    item.append(el('p','',q.source_locator?.display_label||''),el('code','',q.occurrence_id),el('p','',q.source_locator?.numbering_note||''),el('code','',`SHA-256: ${q.text_sha256}`));
    if(q.attributed_judgment)item.append(el('p','',typeof q.attributed_judgment==='string'?q.attributed_judgment:JSON.stringify(q.attributed_judgment)));
    sources.append(item);
  }
  sources.append(action('نسخ تفاصيل التوثيق',async()=>{try{await navigator.clipboard.writeText(cardPlainText(lesson,true));feedback.textContent='نُسخت تفاصيل التوثيق كاملة';}catch{feedback.textContent='تعذر النسخ';}}));
  sources.append(el('p','','مطابقة النص للفهرس المحلي لا تعني اعتماد التفسير أو اكتمال تغطية الكتب الستة.'));card.append(sources);return card;
}
