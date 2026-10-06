<script lang="ts">
 import { onMount, tick } from 'svelte';
 import gsap from 'gsap';
 import { ArrowLeft, ArrowUpLeft, BookOpen, Search, GitBranch, Layers, Bookmark, X, Check, Copy, ExternalLink, ArrowRight, ShieldCheck, Sparkles, PanelRightClose, ChevronLeft, SlidersHorizontal, FileText, RotateCcw, Compass, ListFilter, Download } from 'lucide-svelte';
 import { collections, exampleChain, bukhariExampleId, type HadithRecord, type SearchResponse } from './types';
 export let apiBase: string;
 export let webuiOrigin: string;
 export let onClose: () => void;
 export let onVariant2: () => void = onClose;
 export let onReady: (fn: (view:'landing'|'workspace')=>void) => void;
 let root: HTMLElement;
 let view: 'landing'|'workspace'='landing';
 let persona: 'learn'|'research'='learn';
 let query=''; let collection='all'; let busy=false; let error=''; let searched=false;
 let response: SearchResponse | null=null; let selected: HadithRecord|null=null;
 let activeTab='text'; let narrator=-1; let compareId=''; let trayOpen=false; let sourceOpen=false;
 let saved: HadithRecord[]=[]; let copied=false; let notice=''; let mobileNav=false;
 let requestNo=0; let aborter: AbortController | null=null;
 let canAnimate=false;
 $: research=persona==='research';
 $: compared=response?.results.find(r=>r.record_id===compareId);
 $: isSaved=!!selected && saved.some(r=>r.record_id===selected?.record_id);
 const examples=['الأعمال بالنيات','فليقل خيرا أو ليصمت','يسروا ولا تعسروا'];
 function animateEntry(selector='[data-enter]'){ if(canAnimate && root) gsap.fromTo(root.querySelectorAll(selector),{opacity:0,y:12},{opacity:1,y:0,duration:.45,stagger:.045,ease:'power3.out',clearProps:'transform'}); }
 async function showWorkspace(mode:'learn'|'research'){persona=mode;view='workspace';mobileNav=false;await tick();root.closest('dialog')?.scrollTo({top:0});animateEntry();}
 async function search(value=query){
  query=value.trim(); if(!query || busy)return;
  const request=++requestNo;aborter?.abort();aborter=new AbortController();busy=true;error='';notice='';searched=true;selected=null;response=null;activeTab='text';narrator=-1;
  try{
   const res=await fetch(`${apiBase}/search?${new URLSearchParams({query,collection})}`,{signal:aborter.signal,credentials:'omit'});
   const data=await res.json(); if(!res.ok)throw new Error(data.message||'تعذّر الوصول إلى فهرس البحث.');
   if(request!==requestNo)return;response=data;
  }catch(e){if((e as Error).name!=='AbortError')error=(e as Error).message.includes('fetch')?'خدمة البحث المحلية غير متاحة. شغّل خدمة تجربة الواجهة ثم أعد المحاولة.':(e as Error).message;}
  finally{if(request===requestNo){busy=false;await tick();animateEntry('.result-card');}}
 }
 async function selectRecord(record:HadithRecord){selected=record;activeTab='text';narrator=-1;sourceOpen=false;compareId=response?.results.find(r=>r.record_id!==record.record_id)?.record_id||'';await tick();root.querySelector('.evidence-layout')?.scrollIntoView({block:'start',behavior:canAnimate?'smooth':'instant'});animateEntry('.evidence-layout');}
 function reset(){aborter?.abort();requestNo++;busy=false;response=null;selected=null;searched=false;query='';error='';notice='';trayOpen=false;}
 function saveRecord(){if(!selected)return;const wasSaved=isSaved;if(wasSaved){saved=saved.filter(r=>r.record_id!==selected?.record_id);}else{saved=[...saved,selected];}notice=wasSaved?'أزيل النص من دفتر الجلسة.':'أضيف النص إلى دفتر هذه الجلسة.';}
 async function copyRecord(){if(!selected)return;try{await navigator.clipboard.writeText(`${selected.arabic}\n\n${selected.citation}`);copied=true;setTimeout(()=>copied=false,2000);}catch{notice='النسخ غير متاح في هذا المتصفح. يمكنك تحديد النص والمصدر ونسخهما.';}}
 function exportTray(){const file=new Blob([saved.map(r=>`${r.arabic}\n\n${r.citation}`).join('\n\n---\n\n')],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(file);const a=document.createElement('a');a.href=url;a.download='athar-evidence.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),500);}
 function nativeLink(){const prompt=selected?`افتح السجل ${selected.record_id} باستخدام open_hadith_record واعرض مصدره وحالة المراجعة.`:`ابحث عن الحديث بالكلمات: ${query}`;return `${webuiOrigin}/?${new URLSearchParams({model:'hadith-phrase-poc',q:prompt,submit:'false'})}`;}
 function mermaid(){return 'flowchart TD\n'+exampleChain.map((n,i)=>`  N${i}["${n.name}"]`).join('\n')+'\n'+exampleChain.slice(1).map((_,i)=>`  N${i} --> N${i+1}`).join('\n');}
 async function copyMermaid(){try{await navigator.clipboard.writeText(mermaid());notice='نُسخ مخطط هذا السجل فقط بصيغة Mermaid.';}catch{notice='تعذّر النسخ من المتصفح.';}}
 onMount(()=>{
   const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion: no-preference)',()=>{canAnimate=true;animateEntry();return()=>{canAnimate=false;};});
   onReady((next)=>{view=next;tick().then(()=>animateEntry());});
   return()=>{mm.revert();aborter?.abort();};
 });
</script>

<div class="athar" dir="rtl" lang="ar" bind:this={root}>
 {#if view==='landing'}
  <section class="landing">
   <div class="ambient ambient-one"></div><div class="ambient ambient-two"></div>
   <header class="landing-nav">
    <button class="brand" on:click={()=>{view='landing';}} aria-label="أثر — الصفحة الرئيسية"><span class="brand-symbol"><GitBranch size={24}/></span><span class="wordmark">أثــر</span><span class="brand-caption">معرفةٌ يُستدلّ عليها</span></button>
    <nav class="landing-links" aria-label="التنقل"><button on:click={()=>root.querySelector('#journeys')?.scrollIntoView({behavior:canAnimate?'smooth':'instant'})}>رحلتك مع الحديث</button><button on:click={()=>root.querySelector('#approach')?.scrollIntoView({behavior:canAnimate?'smooth':'instant'})}>منهجنا</button><span class="quiet-tag">تجربة تصميمية</span></nav>
    <div class="variant-actions"><button class="return-light" on:click={onVariant2}>بيان السُّنّة · المحادثة <ArrowUpLeft size={16}/></button><button class="return-light" on:click={onClose}>الأصلية <ArrowUpLeft size={16}/></button></div>
   </header>
   <main>
    <div class="hero">
     <div class="hero-copy" data-enter>
      <div class="eyebrow"><span class="live-dot"></span> من سؤالٍ تتذكّره… إلى مصدرٍ تتبيّنه</div>
      <h1>كلُّ معرفةٍ<br/>تبدأ <em>بأثــر.</em></h1>
      <p class="hero-description">رحلة هادئة في رحاب الحديث النبوي.<br/>ابحث عن النص، افهم سياقه، وتأمّل الطريق إلى مصدره.</p>
      <div class="hero-actions"><button class="button mint" on:click={()=>showWorkspace('learn')}>ابدأ رحلتك <ArrowLeft size={18}/></button><button class="text-button light" on:click={()=>showWorkspace('research')}>ادخل مساحة الباحث <ArrowUpLeft size={17}/></button></div>
      <div class="hero-note"><ShieldCheck size={16}/><span>النص ومصدره أولًا. وما يحتاج إلى مراجعة، ظاهرٌ لك.</span></div>
     </div>
     <div class="knowledge-orbit" aria-label="تصور بصري يربط سؤال المستخدم بمصادر الكتب الستة" data-enter>
      <div class="orbit-caption">A CONNECTED JOURNEY OF KNOWLEDGE</div>
      <svg class="orbital-lines" viewBox="0 0 600 520" aria-hidden="true"><defs><radialGradient id="halo"><stop offset="0" stop-color="#6150ea" stop-opacity=".35"/><stop offset="1" stop-color="#6150ea" stop-opacity="0"/></radialGradient></defs><circle cx="300" cy="260" r="220" fill="url(#halo)"/><ellipse cx="300" cy="260" rx="252" ry="190" fill="none" stroke="#a9aad2" stroke-opacity=".19"/><ellipse cx="300" cy="260" rx="194" ry="139" fill="none" stroke="#a9aad2" stroke-opacity=".17"/><path class="orbit-trace" d="M300 80 Q565 165 300 443 Q35 345 300 80Z" fill="none" stroke="#2ef2c2" stroke-opacity=".4" stroke-dasharray="4 15"/><path d="M150 110L300 260 472 148M90 270L300 260 495 346M208 437L300 260" fill="none" stroke="#b1a5fe" stroke-opacity=".23"/></svg>
      <div class="orbit-core"><div class="core-glyph"><GitBranch size={34} strokeWidth={1}/></div><span>الكلمة… وأثرها</span><small>نص · فهم · مصدر</small></div>
      {#each collections.slice(1) as book,i}<div class="book-orbit book-{i}"><BookOpen size={17} strokeWidth={1.2}/><span>{book[1]}</span></div>{/each}
      <div class="orbit-footer"><span class="small-line"></span> ستة مصنّفات، ومساحة واحدة للاستكشاف <span class="small-line"></span></div>
     </div>
    </div>
    <section class="journeys" id="journeys" aria-labelledby="journeys-title">
     <div class="section-label" data-enter><span>مصادر واحدة. عدستان مختلفتان.</span><h2 id="journeys-title">اختر كيف تبدأ.</h2></div>
     <button class="journey-card" data-enter on:click={()=>showWorkspace('learn')}><span class="journey-number">01 / LEARN</span><div class="journey-heading"><BookOpen size={26} strokeWidth={1.3}/><h3>تعلّم وافهم</h3></div><p>أتذكّر كلمات، أريد فهم معنى،<br/>أبحث عن دليلٍ أشاركه بثقة.</p><span class="journey-bottom">للمتعلّم والمُعرّف بالإسلام <ArrowLeft size={19}/></span></button>
     <button class="journey-card researcher" data-enter on:click={()=>showWorkspace('research')}><span class="journey-number">02 / RESEARCH</span><div class="journey-heading"><GitBranch size={26} strokeWidth={1.3}/><h3>ابحث وقارن</h3></div><p>أجمع المواضع، أقارن الألفاظ،<br/>وأتتبّع الإسناد وشواهد الهوية.</p><span class="journey-bottom">للباحث والمتخصص <ArrowLeft size={19}/></span></button>
    </section>
    <section class="approach" id="approach"><span class="eyebrow">وضوحٌ في كل خطوة</span><h2>جمال التجربة، في وضوح الدليل.</h2><div class="approach-grid"><div><span>01</span><h3>اعثر على النص</h3><p>مطابقات من فهرس الكتب الستة، مع إبراز الكلمات التي تبحث عنها.</p></div><div><span>02</span><h3>افتح المصدر</h3><p>النص الأصلي، وموضعه في النسخة الرقمية، وحالة مراجعته.</p></div><div><span>03</span><h3>واصل على بيّنة</h3><p>اختيار محفوظ أثناء الفحص، ونسخٌ يحمل المصدر معه.</p></div></div></section>
   </main>
   <footer class="landing-footer"><span class="wordmark">أثــر</span><span>تصوّر واجهة مشروع الحديث · هاكاثون الذكاء الاصطناعي الإسلامي</span><span>مشروع <b>بيان السنة</b></span></footer>
  </section>
 {:else}
  <div class="workspace" class:research>
   <aside class:mobile-open={mobileNav} class="sidebar">
    <button class="mobile-only close-menu icon-button" aria-label="أغلق قائمة المساحة" on:click={()=>mobileNav=false}><X size={18}/></button>
    <button class="brand" on:click={()=>{view='landing';}}><span class="brand-symbol"><GitBranch size={22}/></span><span class="wordmark">أثــر</span><span class="lab-label">مختبر الواجهة</span></button>
    <button class="new-journey" on:click={reset}><Sparkles size={16}/> رحلة جديدة <span>+</span></button>
    <span class="sidebar-label">مساحتك المعرفية</span>
    <button class:nav-active={!trayOpen} class="sidebar-link" on:click={()=>{trayOpen=false;mobileNav=false;}}><Compass size={18}/> الاستكشاف</button>
    <button class:nav-active={trayOpen} class="sidebar-link" on:click={()=>{trayOpen=true;mobileNav=false;}}><Bookmark size={18}/> دفتر المصادر <span class="count">{saved.length}</span></button>
    <div class="side-separator"></div><span class="sidebar-label">عدسة العرض</span>
    <button class="persona-option" class:chosen={!research} on:click={()=>{persona='learn';}}><BookOpen size={17}/><span>تعلّم وافهم<small>مسار مبسّط نحو المعنى</small></span>{#if !research}<Check size={15}/>{/if}</button>
    <button class="persona-option" class:chosen={research} on:click={()=>{persona='research';}}><GitBranch size={17}/><span>ابحث وقارن<small>تفاصيل النص والمصدر</small></span>{#if research}<Check size={15}/>{/if}</button>
    <div class="sidebar-bottom"><div class="integrity-note"><ShieldCheck size={20}/><p>قيمة المعرفة<br/><strong>في إمكانية تتبّعها.</strong></p></div><span class="powered">مشروع بيان السنة</span></div>
   </aside>
   <div class="workspace-body">
    <header class="workspace-top"><div class="breadcrumb"><button class="icon-button mobile-only" aria-label="افتح قائمة المساحة" on:click={()=>mobileNav=!mobileNav}><PanelRightClose size={20}/></button><span>مساحة {research?'الباحث':'المعرفة'}</span><ChevronLeft size={13}/><strong>{trayOpen?'دفتر المصادر':searched?'من الكلمة إلى الدليل':'بداية الرحلة'}</strong></div><div class="top-actions"><button class="original-button" on:click={onVariant2}>بيان السُّنّة · المحادثة <ArrowUpLeft size={15}/></button><button class="original-button" on:click={onClose}>الأصلية <ArrowUpLeft size={15}/></button></div></header>
    <main class="workspace-main">
     {#if trayOpen}
      <div class="page-heading" data-enter><span class="eyebrow">ما اخترتَ الاحتفاظ به</span><h1>دفتر المصادر</h1><p>نصوص ومراجع لهذه الجلسة. صدّرها للاحتفاظ بها.</p></div>
      {#if saved.length}<button class="button violet" on:click={exportTray}><Download size={16}/> تصدير النصوص بمصادرها</button><div class="saved-list">{#each saved as record}<button class="saved-item" on:click={()=>{trayOpen=false;selectRecord(record);searched=true;}}><BookOpen size={20}/><span>{record.collection_label}<small>{record.chapter_title}</small></span><ArrowLeft size={17}/></button>{/each}</div>{:else}<div class="empty-state"><Bookmark size={36} strokeWidth={1}/><h2>كلّ بحثٍ يبدأ باختيار.</h2><p>افتح أي نتيجة، ثم احفظها هنا مع مصدرها.</p><button class="button outline" on:click={()=>trayOpen=false}>ابدأ البحث <ArrowLeft size={16}/></button></div>{/if}
     {:else}
      {#if !searched}
       <div class="welcome" data-enter><span class="welcome-emblem">{#if research}<GitBranch size={30} strokeWidth={1.2}/>{:else}<BookOpen size={30} strokeWidth={1.2}/>{/if}</span><div class="eyebrow">{research?'من موضع الرواية… إلى تفاصيلها':'مساحةٌ للسؤال، وطريقٌ إلى المصدر'}</div><h1>{research?'وراء كلّ نص، رحلة.':'ما الذي تتطلّع إلى معرفته؟'}</h1><p>{research?'ابدأ بعبارة، واجمع نتائجها، ثم افحص النصوص وأسانيد المثال المتاح.':'ربما تتذكّر بضع كلمات. دعها تقودك إلى النص ومصدره.'}</p></div>
      {:else}
       <div class="result-heading" data-enter><div><span class="eyebrow">رحلتك في الحديث</span><h1>{selected?'من النص، إلى الدليل.':'أثر الكلمات التي تذكّرتها.'}</h1></div><button class="icon-button" aria-label="ابدأ بحثًا جديدًا" on:click={reset}><RotateCcw size={19}/></button></div>
       <ol class="journey-steps"><li class:complete={searched}><span>01</span> ابحث</li><li class:complete={!!selected}><span>02</span> اختر النص</li><li class:complete={!!selected}><span>03</span> افحص المصدر</li><li><span>04</span> واصل الفهم</li></ol>
      {/if}
      <form class:compact={searched} class="search-composer" data-enter on:submit|preventDefault={()=>search()}><div class="composer-input"><Search size={23} strokeWidth={1.4}/><label class="sr-only" for="athar-query">الكلمات التي تتذكرها من الحديث</label><input id="athar-query" bind:value={query} maxlength={200} placeholder={research?'أدخل ألفاظ المتن للبحث في الكتب الستة…':'اكتب الكلمات التي تتذكّرها من الحديث…'} disabled={busy} required autocomplete="off"/></div><div class="composer-bottom"><label class="collection-filter"><Layers size={15}/><select aria-label="اختر مجموعة البحث" bind:value={collection} disabled={busy}>{#each collections as book}<option value={book[0]}>{book[1]}</option>{/each}</select></label><span class="search-type">بحث في ألفاظ النص</span><button class="submit-search" disabled={busy||!query.trim()} aria-label="ابحث عن الحديث">{#if busy}<span class="spinner"></span>{:else}<ArrowLeft size={20}/>{/if}</button></div></form>
      {#if !searched}<div class="quick-examples" data-enter><span>جرّب أن تتذكّر</span>{#each examples as example}<button on:click={()=>search(example)}>{example} <ArrowUpLeft size={13}/></button>{/each}</div><div class="usecases" data-enter><button on:click={()=>search(examples[0])}><Search size={20}/><span>أتذكّر كلمات<small>من العبارة إلى موضع النص</small></span><ArrowUpLeft size={16}/></button><button on:click={()=>{persona='research';search(examples[0]);}}><Layers size={20}/><span>أقارن الألفاظ<small>النتائج جنبًا إلى جنب</small></span><ArrowUpLeft size={16}/></button><button on:click={()=>{persona='research';search(examples[0]);notice='اختر نتيجة صحيح البخاري، ثم افتح «الإسناد» لاستكشاف المثال.';}}><GitBranch size={20}/><span>أستكشف الإسناد<small>مثال تفاعلي من صحيح البخاري</small></span><ArrowUpLeft size={16}/></button></div><div class="source-strip"><span>نطاق الفهرس</span>{#each collections.slice(1) as book}<span>{book[1]}</span>{/each}</div><div class="welcome-footnote"><ShieldCheck size={14}/> نتائج البحث من نسخة Itqan الرقمية. الحكم على الصحة يحتاج إلى مصدر علمي مطابق.</div>{/if}
      {#if error}<div class="error-box" role="alert"><h2>لم يكتمل البحث</h2><p>{error}</p><button class="button outline" on:click={()=>search()}>أعد المحاولة</button></div>{/if}
      {#if busy}<div class="loading-state" role="status"><span class="spinner"></span> نبحث عن أثر كلماتك في الفهرس…<div class="skeleton"></div><div class="skeleton"></div></div>{/if}
      {#if response && !busy}
       {#if !response.results.length}<div class="empty-state" data-enter><Search size={34} strokeWidth={1}/><h2>لم نجد مطابقة في النطاق المختار.</h2><p>جرّب كلمات أقل أو نطاقًا أوسع. عدم العثور هنا لا يعني أن العبارة ليست حديثًا.</p>{#each response.suggestions as suggestion}<button class="button outline" on:click={()=>search(suggestion)}>هل تقصد: {suggestion}؟</button>{/each}</div>
       {:else if !selected}<div class="results-meta"><h2>اختر النص الذي تقصده</h2><span>{response.total_matches.toLocaleString('ar')} موضع بيانات · نعرض {response.results.length.toLocaleString('ar')}</span></div><div class="result-grid">{#each response.results as record,i}<button class="result-card" data-enter on:click={()=>selectRecord(record)}><div class="result-card-top"><span class="book-label"><BookOpen size={14}/>{record.collection_label}</span><span class="result-index">{String(i+1).padStart(2,'0')}</span></div><h3>{record.chapter_title}</h3><p class="hadith-snippet">{#each record.snippet as part}{#if part.match}<mark>{part.text}</mark>{:else}{part.text}{/if}{/each}</p><div class="result-card-bottom"><span>{record.match_label}</span><ArrowLeft size={17}/></div></button>{/each}</div><p class="small-note">المواضع قد تتضمن نسخًا مكررة من النص؛ عدد النتائج ليس عدد طرق الإسناد.</p>{/if}
      {/if}
      {#if selected}
       <div class="evidence-layout" data-enter><section class="evidence-panel"><div class="evidence-header"><div><span class="eyebrow">النص الذي اخترته</span><h2>{selected.collection_label}</h2><p>{selected.chapter_title}</p></div><button class:saved={isSaved} class="icon-button" aria-label={isSaved?'أزل من دفتر المصادر':'احفظ في دفتر المصادر'} on:click={saveRecord}><Bookmark size={21}/></button></div>
        <div class="evidence-tabs" role="tablist" aria-label="عدسات فحص النص">{#each [['text','النص والمصدر'],['compare','مقارنة الألفاظ'],['chain','الإسناد']] as tab}<button role="tab" aria-selected={activeTab===tab[0]} on:click={()=>{activeTab=tab[0];narrator=-1;}}>{tab[1]}{#if tab[0]==='chain'}<span class="tab-dot"></span>{/if}</button>{/each}</div>
        {#if activeTab==='text'}<div class="text-lens"><span class="source-state"><span></span> نسخة رقمية · تحتاج إلى مراجعة على طبعة معتمدة</span><p class="full-hadith">{#each selected.arabic_parts as part}{#if part.match}<mark>{part.text}</mark>{:else}{part.text}{/if}{/each}</p>{#if selected.english}<details class="translation"><summary>الترجمة الإنجليزية في النسخة الرقمية</summary><p dir="ltr">{selected.english}</p></details>{/if}<button class="source-disclosure" aria-expanded={sourceOpen} on:click={()=>sourceOpen=!sourceOpen}><FileText size={16}/> بيانات المصدر والتتبّع <span>{sourceOpen?'−':'+'}</span></button>{#if sourceOpen}<div class="source-data"><p>{selected.citation}</p><a href={selected.source_url} target="_blank" rel="noreferrer">افتح ملف المصدر <ExternalLink size={14}/></a></div>{/if}</div>
        {:else if activeTab==='compare'}<div class="comparison-lens"><p class="small-note">مقارنة بين نتائج البحث، وليست إثباتًا لوحدة الرواية أو استقلال الطريق.</p>{#if response && response.results.length>1}<label class="compare-select">قارن النص المحدد مع <select bind:value={compareId}>{#each response.results.filter(r=>r.record_id!==selected?.record_id) as r}<option value={r.record_id}>{r.collection_label} · موضع {r.source_position}</option>{/each}</select></label>{#if compared}<div class="comparison-columns"><article><span class="book-label">{selected.collection_label}</span><p>{#each selected.arabic_parts as part}{#if part.match}<mark>{part.text}</mark>{:else}{part.text}{/if}{/each}</p><a href={selected.source_url} target="_blank" rel="noreferrer">مصدر النص <ExternalLink size={12}/></a></article><article><span class="book-label">{compared.collection_label}</span><p>{#each compared.arabic_parts as part}{#if part.match}<mark>{part.text}</mark>{:else}{part.text}{/if}{/each}</p><a href={compared.source_url} target="_blank" rel="noreferrer">مصدر النص <ExternalLink size={12}/></a></article></div><p class="small-note">التظليل يبيّن كلمات البحث فقط؛ محاذاة الفروق آليًا مرحلة لاحقة.</p>{/if}{:else}<div class="empty-state"><Layers size={30}/><p>ابحث في نطاق أوسع للحصول على نص آخر للمقارنة.</p></div>{/if}</div>
        {:else}<div class="chain-lens">{#if selected.record_id===bukhariExampleId}<div class="chain-caption"><span>مسار واحد · من المصنف إلى طرف الرواية</span><button class="text-button" on:click={copyMermaid}><Copy size={13}/> Mermaid</button></div><p class="small-note">نقل يدوي لأسماء هذا السجل، قبل المراجعة العلمية. اختر اسمًا لفحص شاهده.</p><div class="chain-nodes">{#each exampleChain as n,i}<div class="chain-row"><span class="chain-index">{String(i+1).padStart(2,'0')}</span><button class:node-active={narrator===i} on:click={()=>narrator=i}><span class="node-dot"></span><span>{n.name}<small>{n.detail}</small></span><ChevronLeft size={15}/></button></div>{/each}</div>{:else}<div class="empty-state"><GitBranch size={34} strokeWidth={1}/><h3>هذا المسار لم يُجهّز بعد.</h3><p>مثال الواجهة متاح لسجل «الأعمال بالنيات» في أول ملف صحيح البخاري. لن نرسم مسارًا تخمينيًا لهذا النص.</p><button class="button outline" on:click={()=>{collection='bukhari';search(examples[0]);}}>افتح بحث المثال</button></div>{/if}</div>{/if}
        <div class="evidence-actions"><button class="button outline small" on:click={copyRecord}>{#if copied}<Check size={15}/>{:else}<Copy size={15}/>{/if}{copied?'نُسخ مع المصدر':'انسخ النص ومصدره'}</button>{#if response}<button class="text-button" on:click={()=>selected=null}>كل النتائج <ArrowLeft size={15}/></button>{/if}</div>
       </section><aside class="insight-panel">{#if narrator>=0}<div class="insight-icon"><GitBranch size={24}/></div><span class="eyebrow">شاهد الاسم في السند</span><h2>{exampleChain[narrator].name}</h2><blockquote>{exampleChain[narrator].quote}</blockquote><div class="insight-divider"></div><dl><dt>توثيق الهوية</dt><dd>لم يُربط بعد بترجمة موثّقة</dd><dt>الجرح والتعديل</dt><dd>لا يوجد حكم منقول في هذا المثال</dd><dt>المصدر</dt><dd>{selected.collection_label} · {selected.chapter_title}</dd></dl><a class="text-button" href={selected.source_url} target="_blank" rel="noreferrer">راجع النص الأصلي <ExternalLink size={14}/></a>{:else}<div class="insight-icon"><ShieldCheck size={25} strokeWidth={1.4}/></div><span class="eyebrow">نافذة الدليل</span><h2>ماذا نعرف<br/>عن هذا النص؟</h2><ul class="evidence-checklist"><li><Check size={15}/><span>موضع رقمي محدد<small>{selected.collection_label}</small></span></li><li><Check size={15}/><span>مرجع قابل للفحص<small>نسخة Itqan · موضع {selected.source_position}</small></span></li><li class="pending"><span class="hollow-dot"></span><span>المراجعة العلمية<small>لم تُنجز داخل هذه التجربة</small></span></li></ul><div class="insight-divider"></div><h3>خطوتك التالية</h3><p>افحص نتيجة الدرر، أو افتح النص المحدد في محادثة الأداة.</p><a class="button violet" href={nativeLink()} target="_blank" rel="noreferrer">افتح في محادثة جديدة <ArrowUpLeft size={15}/></a><small class="handoff-note">يفتح طلبًا جاهزًا؛ راجعه ثم أرسله.</small><a class="dorar-link" href={selected.dorar_search_url} target="_blank" rel="noreferrer">ابحث عن العبارة في الدرر <ExternalLink size={13}/></a><p class="small-note">بحث مستقل؛ لم تُطابق أحكامه آليًا بهذا السجل.</p>{/if}</aside></div>
      {/if}
     {/if}
     {#if notice}<div class="notice" role="status">{notice}<button class="icon-button" aria-label="أغلق التنبيه" on:click={()=>notice=''}><X size={14}/></button></div>{/if}
    </main><footer class="workspace-footer"><span>أثــر / رحلة معرفية قابلة للتتبّع</span><span>تصميم تجريبي · البحث متصل بالفهرس المحلي</span></footer>
   </div>
  </div>
 {/if}
</div>
