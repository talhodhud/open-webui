import { mount } from 'svelte';
import App from './App.svelte';
import themeCSS from './theme.css?inline';
import readexArabic from '@fontsource/readex-pro/files/readex-pro-arabic-400-normal.woff2?url';
import readexLatin from '@fontsource/readex-pro/files/readex-pro-latin-400-normal.woff2?url';
import amiriArabic from '@fontsource/amiri/files/amiri-arabic-400-normal.woff2?url';
import { createNativeVariant } from './nativeVariant';

const PREVIEW = document.documentElement.dataset.hadithPreview === 'true';
const HOST_ID = 'hadith-theme-poc-host';
const API = 'http://127.0.0.1:8770/api';
if (!document.getElementById(HOST_ID)) {
 const host = document.createElement('div'); host.id = HOST_ID;
 const shadow = host.attachShadow({mode:'open'});
 const style = document.createElement('style');
 style.textContent = `@font-face{font-family:Readex;src:url('${readexArabic}') format('woff2');font-weight:400;unicode-range:U+0600-06FF,U+0750-077F,U+08A0-08FF,U+FB50-FDFF,U+FE70-FEFF;font-display:swap}@font-face{font-family:Readex;src:url('${readexLatin}') format('woff2');font-weight:400;font-display:swap}@font-face{font-family:Amiri;src:url('${amiriArabic}') format('woff2');font-weight:400;font-display:swap}` + themeCSS;
 // Register fonts on the document (Chromium does not load @font-face declared only in a shadow root).
 // Unique family names keep the native app's typography unchanged.
 const fonts = document.createElement('style');
 fonts.dataset.hadithFonts = 'true';
 const cssStart = style.textContent.indexOf(':host');
 fonts.textContent = style.textContent.slice(0,cssStart).replaceAll('Readex','AtharReadex').replaceAll('Amiri','AtharAmiri');
 style.textContent = style.textContent.slice(cssStart).replaceAll('Readex','AtharReadex').replaceAll('Amiri','AtharAmiri');
 document.head.appendChild(fonts);shadow.appendChild(style);
 const dialog = document.createElement('dialog'); dialog.className = 'athar-dialog';
 dialog.tabIndex = -1;
 dialog.setAttribute('aria-label','بيان السنة — واجهة الحديث');
 const target = document.createElement('div');dialog.appendChild(target);shadow.appendChild(dialog);document.body.appendChild(host);
 let focusBefore: HTMLElement | null = null;
 let openView: (view: 'landing'|'workspace') => void = () => {};
 function closeOverlay() {if(dialog.open){dialog.close(); document.documentElement.style.overflow = originalOverflow;focusBefore?.focus();}}
 let originalOverflow = '';
 function open(view: 'landing'|'workspace') {
   if (dialog.open) return;
   focusBefore = document.activeElement as HTMLElement;
   originalOverflow = document.documentElement.style.overflow;
   openView(view); dialog.showModal();dialog.focus();document.documentElement.style.overflow = 'hidden';
 }
 const nativeVariant=createNativeVariant();
 let variant:'original'|'journey'|'chat'='original';
 const switchHost=document.createElement('div');switchHost.id='athar-view-switch';
 const switchShadow=switchHost.attachShadow({mode:'open'});
 const switchStyles=document.createElement('style');switchStyles.textContent=`:host{font-family:AtharReadex,system-ui,sans-serif;direction:rtl}button{font:inherit;cursor:pointer}.trigger{display:flex;align-items:center;gap:10px;border:1px solid #6150ea55;background:#292151;color:#f1edfc;font-size:11px;border-radius:99px;padding:10px 15px;white-space:nowrap;box-shadow:0 3px 14px #1a164815}.menu{position:absolute;left:50%;transform:translateX(-50%);top:calc(100% + 9px);background:#fff;border:1px solid #e3ddef;border-radius:13px;width:245px;padding:7px;box-shadow:0 16px 44px #24203b22;direction:rtl}.menu[hidden]{display:none}.menu button{display:block;width:100%;background:transparent;text-align:right;padding:12px 13px;border:0;border-radius:8px;color:#716180;font-size:12px}.menu button small{display:block;font-size:10px;margin-top:5px;color:#a599b4}.menu button[aria-pressed=true]{background:#f1edf8;color:#574278}.menu button:hover{background:#f6f3fb}button:focus-visible{outline:2px solid #a396cd;outline-offset:3px}`;
 switchShadow.append(switchStyles);
 const launcher=document.createElement('button');launcher.id='hadith-theme-launcher';launcher.className='trigger';launcher.type='button';launcher.setAttribute('aria-label','بدّل واجهة أثر');launcher.setAttribute('aria-expanded','false');launcher.setAttribute('aria-controls','athar-views');
 const menu=document.createElement('div');menu.id='athar-views';menu.className='menu';menu.hidden=true;
 const entries=[['original','الواجهة الأصلية','الواجهة الأساسية'],['journey','أثر ١ · رحلة المعرفة','واجهة الاستكشاف الأولى'],['chat','بيان السُّنّة · أثر ٢','الحالات التطبيقية والمحادثة']] as const;
 const labels={original:'الأصلية',journey:'أثر ١',chat:'بيان السُّنّة'};
 function updateSwitch(){launcher.textContent=`الواجهات · ${labels[variant]} ▾`;for(const button of menu.querySelectorAll('button'))button.setAttribute('aria-pressed',String(button.dataset.variant===variant));}
 function setVariant(next:typeof variant){
   closeOverlay();variant=next;nativeVariant.setEnabled(next==='chat');
   try{sessionStorage.setItem('hadith-view',next);}catch{}
   menu.hidden=true;launcher.setAttribute('aria-expanded','false');updateSwitch();
   if(next==='journey')open(location.pathname.startsWith('/auth')||PREVIEW?'landing':'workspace');
 }
 for(const [key,title,description]of entries){const button=document.createElement('button');button.type='button';button.dataset.variant=key;button.textContent=title;const small=document.createElement('small');small.textContent=description;button.append(small);button.addEventListener('click',()=>{if(PREVIEW&&key==='chat'){window.open('http://localhost:8080/?athar=chat','_blank','noopener');return;}setVariant(key);});menu.append(button);}
 launcher.addEventListener('click',()=>{menu.hidden=!menu.hidden;launcher.setAttribute('aria-expanded',String(!menu.hidden));});
 switchShadow.append(launcher,menu);updateSwitch();
 document.addEventListener('pointerdown',event=>{if(!event.composedPath().includes(switchHost)){menu.hidden=true;launcher.setAttribute('aria-expanded','false');}});
 switchHost.addEventListener('keydown',event=>{if(event.key==='Escape'){menu.hidden=true;launcher.setAttribute('aria-expanded','false');launcher.focus();}});
 mount(App,{target,props:{apiBase:PREVIEW ? '/api' : API,onClose:()=>setVariant('original'),onVariant2:()=>{if(PREVIEW)window.open('http://localhost:8080/?athar=chat','_blank','noopener');else setVariant('chat');},onReady:(fn:typeof openView)=>{openView=fn;},webuiOrigin: PREVIEW ? 'http://localhost:8080' : location.origin}});
 dialog.addEventListener('cancel',e=>{e.preventDefault();setVariant('original');});
 // Native app contents remain mounted in both variants. All new CSS is scoped to the selected variant.
 const placeLauncher = () => {
   const auth=location.pathname.startsWith('/auth');
   const chat=location.pathname==='/'||/^\/c\//.test(location.pathname);
   nativeVariant.refresh();
   if (!(auth||chat||PREVIEW)) {switchHost.remove();return;}
   const nav = chat ? document.querySelector('nav') : null;
   const destination = nav || document.body;
   if(switchHost.parentElement!==destination) destination.appendChild(switchHost);
   switchHost.style.cssText=`position:${nav?'absolute':'fixed'};top:${nav?'4px':'18px'};left:50%;transform:translateX(-50%);z-index:60;`;
 };
 const observer = new MutationObserver(placeLauncher);observer.observe(document.body,{childList:true,subtree:true});
 window.addEventListener('popstate',placeLauncher);placeLauncher();
 if(PREVIEW) setVariant('journey');
 else {let saved='';try{saved=sessionStorage.getItem('hadith-view')||'';}catch{}if(new URLSearchParams(location.search).get('athar')==='chat'||saved==='chat')setVariant('chat');}
}
