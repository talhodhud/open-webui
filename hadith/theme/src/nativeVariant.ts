import css from './nativeVariant.css?inline';
import {
  BRAND,
  JOURNEYS,
  TOPIC_JOURNEYS,
  getJourney,
  buildJourneyURL,
  buildFollowupURL,
  buildEvidenceURL,
  topicQuestion,
  buildRouteSelectorItems,
  formatNarratorEvidenceDetails,
  type Journey,
  type GraphPath,
  type NarratorNodeDetails
} from './journeys';
import { TOPIC_EVIDENCE } from './topicEvidence';
import { localizeAuthPage } from './authLocalizer';

type Audience='topics'|'learn'|'research';

const DEFAULT_CASE_OCCURRENCES: Record<string, string[]> = {
  'prayer-call': ['itqan:bukhari:1:1:bf026de7e155'],
  'hajj-arafah': ['itqan:muslim:32:8:6900c9057c27', 'itqan:tirmidhi:814:d13e'],
  'abu-hurairah': ['itqan:bukhari:78:55:022c1dbdd753']
};

const paths:Record<string,string>={book:'M12 5v16M3 3h5a4 4 0 0 1 4 2 4 4 0 0 1 4-2h5v16h-5a4 4 0 0 0-4 2 4 4 0 0 0-4-2H3Z',layers:'m12 3 10 6-10 6L2 9Zm-9 11 9 5 9-5m-18 5 9 5 9-5',branch:'M6 6v9a4 4 0 0 0 4 4h5M6 8h8a4 4 0 0 0 4-4M3 3a3 3 0 1 0 6 0 3 3 0 0 0-6 0M15 3a3 3 0 1 0 6 0 3 3 0 0 0-6 0M15 19a3 3 0 1 0 6 0 3 3 0 0 0-6 0',person:'M20 21v-2a7 7 0 0 0-14 0v2M8 7a5 5 0 1 0 10 0A5 5 0 0 0 8 7',arrow:'M19 12H5m6-6-6 6 6 6',close:'m6 6 12 12M6 18 18 6',play:'m8 4 12 8-12 8Z'};
function icon(name:string){const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');svg.setAttribute('stroke-width','1.5');svg.setAttribute('stroke-linecap','round');svg.setAttribute('stroke-linejoin','round');svg.setAttribute('aria-hidden','true');const p=document.createElementNS(svg.namespaceURI,'path');p.setAttribute('d',paths[name]||paths.book);svg.append(p);return svg;}
function element<K extends keyof HTMLElementTagNameMap>(tag:K,className:string,text?:string){const e=document.createElement(tag);e.className=className;if(text)e.textContent=text;return e;}
function button(className:string,text:string,action:()=>void){const b=element('button',className,text);b.type='button';b.onclick=action;return b;}

export function createNativeVariant(){
  const style=element('style','');style.dataset.atharVariant='2';style.textContent=css;document.head.append(style);
  const audiencePanel=element('section','athar-v2-audience');audiencePanel.id='athar-v2-audience';audiencePanel.dir='rtl';audiencePanel.setAttribute('aria-label','اختر مسارك في الحديث');
  const cardsPanel=element('section','athar-v2-cards');cardsPanel.id='athar-v2-cards';cardsPanel.dir='rtl';cardsPanel.setAttribute('aria-label','حالات تطبيقية');
  const status=element('p','athar-v2-status');status.setAttribute('role','status');
  const contextPanel=element('section','bayan-context');contextPanel.dir='rtl';contextPanel.setAttribute('aria-label','مسار المحادثة');
  const followupPanel=element('div','bayan-followups');followupPanel.dir='rtl';followupPanel.setAttribute('aria-label','توسّع في هذه الحالة');
  const demoDialog=element('dialog','bayan-demo');demoDialog.dir='rtl';demoDialog.setAttribute('aria-labelledby','bayan-demo-title');
  demoDialog.addEventListener('click',event=>{if(event.target===demoDialog)demoDialog.close();});
  const authIntro=element('aside','athar-v2-auth-intro');authIntro.id='athar-v2-auth-intro';authIntro.dir='rtl';
  authIntro.append(element('span','athar-v2-eyebrow',BRAND.subtitle),element('h1','',BRAND.name),element('p','','من الحديث إلى فهمٍ واضح، ومصدرٍ تستطيع الرجوع إليه. ثلاث تجارب عملية تساعدك على عرض المعرفة والتوسّع في دليلها.'));
  const authFeatures=element('div','athar-v2-auth-features');for(const [i,t]of [['book','تعلّم وعرّف'],['branch','توسّع وتحقّق']]){const item=element('span','');item.append(icon(i),document.createTextNode(t));authFeatures.append(item);}authIntro.append(authFeatures);
  const authCases=element('div','bayan-auth-cases');for(const item of JOURNEYS){const b=button('','',()=>openDemo(item));b.append(icon(item.icon),document.createTextNode(item.title),icon('arrow'));authCases.append(b);}authIntro.append(authCases,element('small','','مشروع بيان السنة'));
  const authTopic=button('bayan-auth-topic','رحلة التعريف بالإسلام · استكشف الموضوعات',()=>openGallery(true));authIntro.insertBefore(authTopic,authCases);
  let enabled=false;let audience:Audience='topics';const marked=new Set<HTMLElement>();
  let selectedPathId: string | undefined = undefined;
  let routeKind: 'all_paths' | 'specific_path' = 'all_paths';
  let activeMentionId: string | undefined = undefined;
  let activeAnchorName: string | undefined = undefined;
  let activeGraphData: { occurrence_id?: string; paths: GraphPath[]; nodes: Map<string, NarratorNodeDetails> } | null = null;
  let active=getJourney(new URLSearchParams(location.search).get('case'));
  let pendingLaunch=!!active;let lastPath=location.pathname;let lastContext='';
  const caseMap:Record<string,string>=readCaseMap();if(!active)active=getJourney(caseMap[location.pathname]);

  function readCaseMap(){try{const v=JSON.parse(sessionStorage.getItem('bayan-case-map')||'{}');return v&&typeof v==='object'&&!Array.isArray(v)?v:{};}catch{return {};}}
  function mark(e:HTMLElement|undefined|null,kind:string){if(!e)return;if(e.dataset.atharV2Slot!==kind)e.dataset.atharV2Slot=kind;marked.add(e);}
  function clearMarks(){for(const e of marked)delete e.dataset.atharV2Slot;marked.clear();}
  function hasMessages(){return [...document.querySelectorAll('#chat-pane [id^="message-"]')].some(e=>/^message-[a-f\d]{8}-/i.test(e.id));}
  function fillPrompt(prompt:string){
    const input=document.querySelector<HTMLElement>('#chat-input[contenteditable="true"]');if(!input)return;
    input.focus();const range=document.createRange();range.selectNodeContents(input);range.collapse(false);const selection=window.getSelection();selection?.removeAllRanges();selection?.addRange(range);
    const inserted=document.execCommand('insertText',false,(input.innerText.trim()?'\n\n':'')+prompt);
    followupPanel.dataset.notice=inserted?'أضيف السؤال إلى المسودة.':'يمكنك كتابة السؤال في مربع المحادثة.';
  }
  function launch(journey:Journey,submit:boolean,question?:string){
    launchDestination(buildJourneyURL(location.origin,journey.id,submit,question,{mode:'unified'}));
  }
  function launchDestination(destination:string){
    if(location.pathname.startsWith('/auth'))destination='/auth?'+new URLSearchParams({redirect:new URL(destination).pathname+new URL(destination).search,athar:'chat'});
    const hasDraft=!!document.getElementById('chat-input')?.innerText.trim();
    if(hasDraft||hasMessages()){
      const tab=window.open('about:blank','_blank');
      if(!tab){const hint=demoDialog.querySelector('.bayan-demo-note');if(hint)hint.textContent='اسمح بفتح تبويب جديد للحفاظ على محادثتك ومسودتك الحالية.';return;}
      tab.opener=null;tab.location.href=destination;demoDialog.close();
    }else location.assign(destination);
  }
  function evidenceView(journey:Journey){
    const records=TOPIC_EVIDENCE[journey.id]||[];const view=element('details','bayan-evidence');
    view.append(element('summary','',`راجع الشواهد ومصادرها · ${records.length}`));
    view.append(element('p','bayan-evidence-state','النصوص مطابقة للفهرس المحلي. اختيارها التعليمي وشرحها يحتاجان إلى مراجعة علمية.'));
    const names:Record<string,string>={bukhari:'صحيح البخاري',muslim:'صحيح مسلم',tirmidhi:'جامع الترمذي',abudawud:'سنن أبي داود',nasai:'سنن النسائي',ibnmajah:'سنن ابن ماجه'};
    const coverage=element('div','bayan-evidence-coverage');for(const [id,name]of Object.entries(names)){const count=records.filter(r=>r.collection===id).length;const badge=element('span','',`${name} · ${count?count+' في هذه الحزمة':'غير ممثّل في الحزمة'}`);badge.dataset.present=String(count>0);coverage.append(badge);}view.append(coverage);
    for(const record of records){
      const item=element('details','bayan-evidence-record');item.append(element('summary','',`${names[record.collection]} · ${record.chapter} · الموضع المحلي ${record.position}`));
      item.append(element('p','bayan-source-text',record.text),element('code','bayan-source-id',record.id));
      const tools=element('div','bayan-source-actions');const link=element('a','','افتح ملف المصدر');link.href=record.url;link.target='_blank';link.rel='noopener noreferrer';
      const copy=button('','انسخ النص ومصدره',async()=>{try{await navigator.clipboard.writeText(`${record.text}\n\n${names[record.collection]} — ${record.chapter}\nالموضع المحلي: ${record.position}\n${record.id}\n${record.url}\nمطابق للفهرس المحلي؛ يحتاج اختيار الشاهد وشرحه إلى مراجعة علمية.`);copy.textContent='نُسخ النص مع مصدره';}catch{copy.textContent='تعذر النسخ؛ حدّد النص لنسخه';}});
      tools.append(link,copy,button('','حضّر فتح السجل بالأداة',()=>launchDestination(buildEvidenceURL(location.origin,record.id,{mode:'unified'}))));item.append(tools);view.append(item);
    }return view;
  }

  function normalizeGraphPayload(payload: any): { occurrence_id?: string; paths: GraphPath[]; nodes: Map<string, NarratorNodeDetails> } | null {
    if (!payload || typeof payload !== 'object') return null;
    const d = payload.data || payload;
    const occurrence_id = d.occurrence_id || payload.occurrence_id;
    const paths: GraphPath[] = d.paths || payload.paths || [];
    const nodesArr = d.nodes || payload.nodes || d.graph?.nodes || [];
    const nodes = new Map<string, NarratorNodeDetails>();

    if (Array.isArray(nodesArr)) {
      for (const n of nodesArr) {
        const raw = (n.raw_name || n.name || n.canonical_name || n.id || '').trim();
        if (raw) {
          nodes.set(raw, {
            raw_text: n.raw_name || n.name || raw,
            occurrence_id: occurrence_id || n.occurrence_id,
            mention_id: n.mention_id,
            source_span: n.source_span,
            source_span_text: n.source_span_text,
            canonical_name: n.canonical_name,
            identity_status: n.identity_status || n.status,
            candidates: n.candidates,
            grade_text: n.grade || n.grade_ar,
            grade_source: n.grade_source,
            ibn_hajar: n.ibn_hajar,
            dhahabi: n.dhahabi,
            anchor_name: n.anchor_name
          });
        }
      }
    }
    return { occurrence_id, paths, nodes };
  }

  function extractActiveGraphData(): { occurrence_id?: string; paths: GraphPath[]; nodes: Map<string, NarratorNodeDetails> } | null {
    if (typeof window !== 'undefined' && (window as any).__BAYAN_GRAPH__) {
      return normalizeGraphPayload((window as any).__BAYAN_GRAPH__);
    }
    const chatPane = document.getElementById('chat-pane');
    if (!chatPane) return null;

    const blocks = chatPane.querySelectorAll('pre, code, details, [data-tool-output], .message-content');
    for (const block of Array.from(blocks).reverse()) {
      const txt = block.textContent || '';
      if (txt.includes('"paths"') || txt.includes('"paths_count"') || (txt.includes('"occurrence_id"') && txt.includes('"nodes"'))) {
        try {
          const s = txt.indexOf('{');
          const e = txt.lastIndexOf('}');
          if (s !== -1 && e > s) {
            const parsed = JSON.parse(txt.slice(s, e + 1));
            const norm = normalizeGraphPayload(parsed);
            if (norm && norm.paths.length > 0) return norm;
          }
        } catch {}
      }
    }
    return null;
  }

  function openNarratorDrawer(details: NarratorNodeDetails){
    if(!demoDialog.isConnected)document.body.append(demoDialog);demoDialog.replaceChildren();
    const formatted = formatNarratorEvidenceDetails(details);
    const close=button('bayan-close','',()=>demoDialog.close());close.setAttribute('aria-label','أغلق درج الدليل');close.append(icon('close'));
    const content=element('div','bayan-demo-content');content.append(close,element('span','bayan-kicker','درج دليل الراوي والتحقيق'));
    const title=element('h2','',formatted.raw_text);content.append(title);
    const card=element('div','bayan-narrator-card');
    card.append(element('p','bayan-detail-row','اللفظ التراثي في الإسناد: '+formatted.raw_text));
    card.append(element('p','bayan-detail-row','معرف السجل (occurrence_id): '+formatted.occurrence_id));
    card.append(element('p','bayan-detail-row','معرف الورود (mention_id): '+formatted.mention_id));
    card.append(element('p','bayan-detail-row','النطاق النصي (source_span): '+formatted.source_span_display));
    card.append(element('p','bayan-detail-row','التعيين المعتمد: '+formatted.canonical_name));
    if(details.anchor_name)card.append(element('p','bayan-detail-row','صاحب الضمير والسياق: '+details.anchor_name));

    const badgeWrap=element('div','bayan-badge-group');
    const statusClass=details.identity_status==='resolved'?'bayan-badge-resolved':(details.identity_status==='ambiguous'?'bayan-badge-ambiguous':'bayan-badge-unresolved');
    badgeWrap.append(element('span',statusClass,formatted.identity_status),element('span','bayan-badge-review','تحليل جزئي يحتاج مراجعة علمية (needs_review)'));
    card.append(badgeWrap);

    if(details.candidates&&details.candidates.length>0){
      const candsWrap=element('div','bayan-candidates-section');candsWrap.append(element('strong','','المرشحون المحتملون:'));
      const ul=element('ul','bayan-candidates-list');
      for(const c of details.candidates){const li=element('li','',`${c.name} — ${c.grade||'غير محدد'}`);ul.append(li);}
      candsWrap.append(ul);card.append(candsWrap);
    }

    const gradesSection=element('div','bayan-grades-section');gradesSection.append(element('strong','','أقوال النقاد ومصادر الرتبة:'));
    gradesSection.append(
      element('p','bayan-grade-item','قول الحافظ ابن حجر (تقريب التهذيب): '+formatted.ibn_hajar),
      element('p','bayan-grade-item','قول الإمام الذهبي (الكاشف): '+formatted.dhahabi),
      element('p','bayan-grade-item','الرتبة الحديثية الموثقة: '+formatted.general_grade),
      element('p','bayan-grade-item','مصدر الرتبة: '+formatted.grade_source)
    );
    if(formatted.missing_evidence_note){
      gradesSection.append(element('p','bayan-missing-evidence-note',formatted.missing_evidence_note));
    }
    card.append(gradesSection);
    content.append(card);demoDialog.append(content);
    if(!demoDialog.open)demoDialog.showModal();close.focus();
  }

  function resolveNarratorDetailsFromDOM(text:string,el:HTMLElement):NarratorNodeDetails{
    if(activeGraphData&&activeGraphData.nodes){
      for(const [key,n]of activeGraphData.nodes.entries()){
        if(key===text||text.includes(key)||key.includes(text)){
          return n;
        }
      }
    }
    const ds=el.dataset;
    if(ds&&(ds.rawText||ds.narratorId||ds.canonicalName)){
      return {
        raw_text:ds.rawText||text,
        occurrence_id:ds.occurrenceId||activeGraphData?.occurrence_id,
        mention_id:ds.mentionId,
        canonical_name:ds.canonicalName,
        identity_status:ds.identityStatus||'unresolved',
        grade_text:ds.grade,
        ibn_hajar:ds.ibnHajar,
        dhahabi:ds.dhahabi
      };
    }
    return {
      raw_text:text,
      occurrence_id:activeGraphData?.occurrence_id||(active?DEFAULT_CASE_OCCURRENCES[active.id]?.[0]:undefined),
      identity_status:'unresolved'
    };
  }

  document.addEventListener('click',event=>{
    const target=(event.target as HTMLElement)?.closest('.node, g.node, [data-narrator-id], .bayan-narrator-node, g[id^="flowchart-"]');
    if(target&&!demoDialog.open){
      const text=target.textContent?.trim().replace(/\s+/g,' ')||'';
      if(text){
        const details=resolveNarratorDetailsFromDOM(text,target as HTMLElement);
        openNarratorDrawer(details);
      }
    }
  });

  function openDemo(journey:Journey){
    if(!demoDialog.isConnected)document.body.append(demoDialog);demoDialog.replaceChildren();
    const close=button('bayan-close','',()=>demoDialog.close());close.setAttribute('aria-label','أغلق عرض الحالة');close.append(icon('close'));
    const content=element('div','bayan-demo-content');content.append(close,element('span','bayan-kicker','حالة تطبيقية · '+journey.category));
    const title=element('h2','',journey.title);title.id='bayan-demo-title';content.append(title,element('p','bayan-demo-intro',journey[audience==='research'?'research':'learn']));
    let reader='newcomer';let format='card';let prepared=journey.topic?topicQuestion(journey,reader,format):journey.question;
    const question=element('blockquote','bayan-question',prepared);
    if(journey.topic){
      const choices=element('div','bayan-topic-options');
      for(const [label,values,key]of [['لمن تُعدّ المادة؟',[['مهتم يتعرف على الإسلام','newcomer'],['حديث العهد بالإسلام','new_muslim'],['معرّف بالإسلام','educator']],'reader'],['كيف تريد تقديمها؟',[['بطاقة تعريفية قصيرة','card'],['حوار سؤال وجواب','qa'],['كلمة تعريفية من دقيقتين','two_minute']],'format']] as const){
        const field=element('label','',label);const select=element('select','');for(const [txt,val] of values){const option=element('option','',txt);option.value=val;select.append(option);}select.onchange=()=>{if(key==='reader')reader=select.value;else format=select.value;prepared=topicQuestion(journey,reader,format);question.textContent=prepared;};field.append(select);choices.append(field);
      }content.append(choices);
      content.append(evidenceView(journey));
    }
    const agentLabel=journey.topic?'دليل المعرّف بالإسلام':journey.id==='abu-hurairah'?'ناقد الأسانيد وخبير الرجال':journey.id==='hajj-arafah'?'محقق السنة · الروايات والشجرة':'محقق السنة · النص والتخريج';
    content.append(element('p','bayan-agent','ينفّذها: '+agentLabel));
    if(journey.topic){const request=element('details','bayan-request');request.append(element('summary','','راجع السؤال الذي سيُرسل'),question);content.append(request);}else content.append(element('span','bayan-question-label','السؤال الذي تبدأ به'),question);
    content.append(element('h3','','ما الذي ستستكشفه؟'));
    const steps=element('div','bayan-demo-steps');steps.setAttribute('role','group');steps.setAttribute('aria-label','مراحل الحالة');
    const detail=element('p','bayan-step-detail',journey.outputs[0].description);detail.id='bayan-step-detail';detail.setAttribute('aria-live','polite');
    journey.outputs.forEach((step,index)=>{const b=button('','',()=>{detail.textContent=step.description;for(const other of steps.querySelectorAll('button'))other.setAttribute('aria-pressed',String(other===b));});b.setAttribute('aria-pressed',String(index===0));b.setAttribute('aria-controls',detail.id);b.append(element('span','',String(index+1).padStart(2,'0')),document.createTextNode(step.title));steps.append(b);});
    content.append(steps,detail,element('p','bayan-demo-note','تُنفّذ الحالة مباشرة بالأدوات المتاحة. افحص المصادر في الإجابة، وقد تختلف النتائج عند إعادة التجربة.'));
    const actions=element('div','bayan-demo-actions');const run=button('bayan-primary',journey.topic?'ابدأ رحلة الموضوع':'ابدأ العرض المباشر',()=>launch(journey,true,prepared));run.append(icon('play'));actions.append(run,button('bayan-secondary','عدّل السؤال أولًا',()=>launch(journey,false,prepared)));content.append(actions);demoDialog.append(content);
    if(!demoDialog.open)demoDialog.showModal();close.focus();
  }

  function openGallery(topics=false){
    if(!demoDialog.isConnected)document.body.append(demoDialog);demoDialog.replaceChildren();
    const content=element('div','bayan-demo-content');const close=button('bayan-close','',()=>demoDialog.close());close.setAttribute('aria-label','أغلق عرض الحالات');close.append(icon('close'));const title=element('h2','','اختر تجربة جديدة');title.id='bayan-demo-title';content.append(close,element('span','bayan-kicker',BRAND.name),title);
    content.append(button('bayan-gallery-switch',topics?'انتقل إلى الحالات البحثية':'انتقل إلى موضوعات التعريف بالإسلام',()=>openGallery(!topics)));
    const list=element('div','bayan-gallery');for(const journey of topics?TOPIC_JOURNEYS:JOURNEYS){const b=button('','',()=>openDemo(journey));b.append(icon(journey.icon),element('strong','',journey.title),element('span','',journey.category),icon('arrow'));list.append(b);}content.append(list,element('p','bayan-demo-note','إذا كانت لديك محادثة أو مسودة، تُفتح الحالة الجديدة في تبويب مستقل.'));demoDialog.append(content);if(!demoDialog.open)demoDialog.showModal();close.focus();
  }

  function render(){
    audiencePanel.replaceChildren();cardsPanel.replaceChildren();
    const intro=element('div','athar-v2-intro');intro.append(element('h1','bayan-wordmark',BRAND.name),element('p','bayan-subtitle',BRAND.subtitle));audiencePanel.append(intro);
    const toggles=element('div','athar-v2-toggles');toggles.setAttribute('role','group');toggles.setAttribute('aria-label','نوع المستخدم');
    for(const [key,title,subtitle,i]of [['topics','أُعرّف بالإسلام','من الموضوع إلى مادة بمصادرها','book'],['learn','أستكشف حديثًا','حالات واضحة لفهم الحديث','layers'],['research','أتوسّع وأبحث','للروايات والأسانيد والرجال','branch']]){
      const b=button('athar-v2-persona','',()=>{audience=key as Audience;render();audiencePanel.querySelector<HTMLButtonElement>(`[data-audience="${key}"]`)?.focus();});b.setAttribute('aria-pressed',String(audience===key));b.dataset.audience=key;
      const copy=element('span','athar-v2-persona-copy');copy.append(element('strong','',title),element('small','',subtitle));b.append(icon(i),copy,element('span','athar-v2-radio'));toggles.append(b);
    }audiencePanel.append(toggles);
    const isTopics=audience==='topics';cardsPanel.dataset.track=isTopics?'topics':'cases';
    const head=element('div','athar-v2-cards-heading');head.append(element('span','',isTopics?'أيّ باب تفتح للتعريف بالإسلام؟':'جرّب قدرات بيان السُّنّة'),element('span','bayan-count',isTopics?'موضوع ← دليل ← معنى':'٣ حالات تطبيقية'));cardsPanel.append(head);
    const grid=element('div','athar-v2-grid');for(const journey of isTopics?TOPIC_JOURNEYS:JOURNEYS){
      const card=button('athar-v2-card','',()=>openDemo(journey));card.dataset.case=journey.id;card.setAttribute('aria-label','استعرض حالة '+journey.title);card.setAttribute('aria-haspopup','dialog');
      const top=element('span','athar-v2-card-top');top.append(icon(journey.icon),element('small','',journey.category));card.append(top,element('strong','',journey.title),element('span','athar-v2-card-description',journey[audience==='research'?'research':'learn']));const action=element('span','bayan-card-action',isTopics?'صمّم رحلتك':'استعرض التجربة');action.append(icon('arrow'));card.append(action);grid.append(card);
    }cardsPanel.append(grid,status);status.textContent=isTopics?'٦ موضوعات · ١٣ شاهدًا مطابقًا للفهرس المحلي · المادة التعليمية قيد المراجعة.':'اختر حالة لتشاهد السؤال وخطوات التجربة، أو اكتب سؤالك مباشرة.';
  }

  function updatePathSelection(pathBar:HTMLElement){
    for(const b of pathBar.querySelectorAll<HTMLButtonElement>('.bayan-route-btn')){
      const r=b.dataset.route;
      b.setAttribute('aria-pressed',String(r==='all_paths'?!selectedPathId:selectedPathId===r));
    }
  }

  function selectPath(pId:string){
    selectedPathId=pId==='all'?undefined:pId;
    routeKind=pId==='all'?'all_paths':'specific_path';
    const pathBar=followupPanel.querySelector('.bayan-route-selector');
    if(pathBar)updatePathSelection(pathBar as HTMLElement);

    // Modify/filter visible SVG elements in DOM
    const svgs=document.querySelectorAll<SVGElement>('#chat-pane svg, .mermaid svg');
    svgs.forEach(svg=>{
      if(selectedPathId){
        svg.setAttribute('data-selected-path',selectedPathId);
        svg.querySelectorAll<SVGElement>('.node, g.node').forEach(nodeEl=>{
          const nodePath=nodeEl.getAttribute('data-path-id');
          if(nodePath&&nodePath!==selectedPathId&&nodePath!=='shared'){
            nodeEl.style.opacity='0.35';
          }else{
            nodeEl.style.opacity='1';
          }
        });
      }else{
        svg.removeAttribute('data-selected-path');
        svg.querySelectorAll<SVGElement>('.node, g.node').forEach(nodeEl=>{
          nodeEl.style.opacity='1';
        });
      }
    });

    window.dispatchEvent(new CustomEvent('bayan:path-selected',{
      detail:{selectedPathId,routeKind,occurrence_id:activeGraphData?.occurrence_id}
    }));

    if(active){
      const activeOccurrences=activeGraphData?.occurrence_id
        ?[activeGraphData.occurrence_id]
        :(DEFAULT_CASE_OCCURRENCES[active.id]||[]);

      const buttons=followupPanel.querySelectorAll<HTMLButtonElement>('button:not(.bayan-route-btn)');
      const followupsToRender=active.track==='islam'
        ?active.followups.filter(f=>f.task!=='isnad_graph')
        :active.followups;

      buttons.forEach((btn,index)=>{
        if(followupsToRender[index]){
          btn.onclick=()=>launchDestination(buildFollowupURL(location.origin,active!.id,index,{
            mode:'unified',
            routeKind,
            selectedPathId,
            occurrenceIds:activeOccurrences,
            mentionId:activeMentionId,
            anchorName:activeAnchorName
          }));
        }
      });
      followupPanel.dataset.notice=selectedPathId
        ?`تم عزل ${selectedPathId}. انقر على أي مسودة لتحميل هذا الطريق.`
        :'تم عرض جميع الطرق.';
    }
  }

  function renderContext(){
    const key=active?.id||'none';if(lastContext===key)return;lastContext=key;contextPanel.replaceChildren();followupPanel.replaceChildren();delete followupPanel.dataset.notice;
    contextPanel.append(element('span','bayan-context-brand',BRAND.name));if(active)contextPanel.append(element('span','bayan-context-case',active.title));contextPanel.append(button('','الحالات التطبيقية',openGallery));
    if(active){
      activeGraphData=extractActiveGraphData();
      const availablePaths=activeGraphData?.paths||[];
      const selectorItems=buildRouteSelectorItems(availablePaths);
      if(selectorItems){
        const pathBar=element('div','bayan-route-selector');
        pathBar.setAttribute('role','group');
        pathBar.setAttribute('aria-label','اختيار مسار الإسناد');
        selectorItems.forEach(item=>{
          const btn=button('bayan-route-btn',item.label,()=>selectPath(item.id));
          btn.dataset.route=item.route;
          btn.setAttribute('aria-pressed',String(item.id==='all'?!selectedPathId:selectedPathId===item.id));
          pathBar.append(btn);
        });
        followupPanel.append(pathBar);
      }
      followupPanel.append(element('span','','افتح مسودة متخصصة لهذه الحالة'));
      const activeOccurrences=activeGraphData?.occurrence_id
        ?[activeGraphData.occurrence_id]
        :(DEFAULT_CASE_OCCURRENCES[active.id]||[]);

      const followupsToRender=active.track==='islam'?active.followups.filter(f=>f.task!=='isnad_graph'):active.followups;
      followupsToRender.forEach((item,index)=>{
        const b=button('',item.label,()=>launchDestination(buildFollowupURL(location.origin,active!.id,index,{
          mode:'unified',
          routeKind,
          selectedPathId,
          occurrenceIds:activeOccurrences,
          mentionId:activeMentionId,
          anchorName:activeAnchorName
        })));
        b.title='تُفتح مسودة بالنموذج المناسب مع تثبيت السجل ومسار العرض المختار';
        followupPanel.append(b);
      });
    }
  }

  function syncRoute(){
    if(location.pathname===lastPath)return;
    if(pendingLaunch&&/^\/c\//.test(location.pathname)&&active){caseMap[location.pathname]=active.id;try{sessionStorage.setItem('bayan-case-map',JSON.stringify(caseMap));}catch{}pendingLaunch=false;}
    else{active=getJourney(caseMap[location.pathname]);pendingLaunch=false;}
    lastPath=location.pathname;lastContext='';
  }

  function refresh(){
    syncRoute();localizeAuthPage();const chat=location.pathname==='/'||/^\/c\//.test(location.pathname);const auth=location.pathname.startsWith('/auth');
    document.documentElement.toggleAttribute('data-athar-chat-v2',enabled&&chat);document.documentElement.toggleAttribute('data-athar-auth-v2',enabled&&auth);
    if(!enabled||(!chat&&!auth)){audiencePanel.remove();cardsPanel.remove();authIntro.remove();contextPanel.remove();followupPanel.remove();if(demoDialog.open)demoDialog.close();clearMarks();return;}
    if(auth){audiencePanel.remove();cardsPanel.remove();contextPanel.remove();followupPanel.remove();if(!authIntro.isConnected)document.body.append(authIntro);return;}authIntro.remove();
    const composer=document.querySelector<HTMLElement>('#message-input-container');const form=composer?.closest('form');
    if(hasMessages()){
      audiencePanel.remove();cardsPanel.remove();clearMarks();renderContext();const pane=document.getElementById('chat-pane');if(pane&&contextPanel.parentElement!==pane)pane.prepend(contextPanel);
      if(form&&active&&followupPanel.nextElementSibling!==form)form.before(followupPanel);else if(!active)followupPanel.remove();return;
    }
    contextPanel.remove();followupPanel.remove();if(!composer||!form){audiencePanel.remove();cardsPanel.remove();return;}
    let slot:HTMLElement|null=form.parentElement;while(slot&&slot.id!=='chat-pane'&&!(slot.classList.contains('text-base')&&slot.classList.contains('py-3')))slot=slot.parentElement;
    if(!slot||slot.id==='chat-pane')slot=form.parentElement;
    if(slot&&slot.parentElement){mark(slot,'composer-slot');mark(slot.closest<HTMLElement>('.py-24'),'welcome');const modelIntro=[...slot.parentElement.children].find(e=>e!==slot&&e!==audiencePanel&&e.classList.contains('flex-row'));mark(modelIntro as HTMLElement,'model-intro');if(audiencePanel.nextElementSibling!==slot)slot.before(audiencePanel);}
    const nativeList=document.querySelector<HTMLElement>('#chat-pane [role="list"]:has(button.waterfall[role="listitem"])');const nativeWrapper=nativeList?.parentElement?.parentElement;
    if(nativeWrapper){mark(nativeWrapper,'suggestions');mark(nativeWrapper.parentElement,'suggestions-width');if(cardsPanel.previousElementSibling!==nativeWrapper)nativeWrapper.after(cardsPanel);}
    else if(!cardsPanel.isConnected&&slot)slot.after(cardsPanel);
  }

  render();localizeAuthPage();return {setEnabled(value:boolean){enabled=value;refresh();},refresh};
}
