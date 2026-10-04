import { mount } from 'svelte';
import App from './App.svelte';
import themeCSS from './theme.css?inline';
import readexArabic from '@fontsource/readex-pro/files/readex-pro-arabic-400-normal.woff2?url';
import readexLatin from '@fontsource/readex-pro/files/readex-pro-latin-400-normal.woff2?url';
import amiriArabic from '@fontsource/amiri/files/amiri-arabic-400-normal.woff2?url';

const PREVIEW = document.documentElement.dataset.hadithPreview === 'true';
const HOST_ID = 'hadith-theme-poc-host';
const API = 'http://127.0.0.1:8770/api';
if (!document.getElementById(HOST_ID)) {
 const host = document.createElement('div'); host.id = HOST_ID;
 const shadow = host.attachShadow({mode:'open'});
 const style = document.createElement('style');
 style.textContent = `@font-face{font-family:Readex;src:url('${readexArabic}') format('woff2');font-weight:400;unicode-range:U+0600-06FF,U+0750-077F,U+08A0-08FF,U+FB50-FDFF,U+FE70-FEFF;font-display:swap}@font-face{font-family:Readex;src:url('${readexLatin}') format('woff2');font-weight:400;font-display:swap}@font-face{font-family:Amiri;src:url('${amiriArabic}') format('woff2');font-weight:400;font-display:swap}` + themeCSS;
 shadow.appendChild(style);
 const dialog = document.createElement('dialog'); dialog.className = 'athar-dialog';
 dialog.setAttribute('aria-label','أثر — تجربة واجهة الحديث');
 const target = document.createElement('div');dialog.appendChild(target);shadow.appendChild(dialog);document.body.appendChild(host);
 let focusBefore: HTMLElement | null = null;
 let openView: (view: 'landing'|'workspace') => void = () => {};
 function close() {dialog.close(); document.documentElement.style.overflow = originalOverflow;focusBefore?.focus();}
 let originalOverflow = '';
 function open(view: 'landing'|'workspace') {
   if (dialog.open) return;
   focusBefore = document.activeElement as HTMLElement;
   originalOverflow = document.documentElement.style.overflow;
   openView(view); dialog.showModal();document.documentElement.style.overflow = 'hidden';
 }
 mount(App,{target,props:{apiBase:PREVIEW ? '/api' : API,onClose:close,onReady:(fn:typeof openView)=>{openView=fn;},webuiOrigin: PREVIEW ? 'http://localhost:8080' : location.origin}});
 dialog.addEventListener('cancel',e=>{e.preventDefault();close();});
 const launcher = document.createElement('button');
 launcher.id='hadith-theme-launcher';launcher.type='button';
 launcher.textContent='✦ جرّب واجهة أثر';launcher.setAttribute('aria-label','جرّب واجهة أثر الجديدة');
 launcher.style.cssText='font:500 12px system-ui,sans-serif;flex-shrink:0;white-space:nowrap;color:#fff;background:#12183f;border:1px solid #6150ea;border-radius:99px;padding:9px 16px;cursor:pointer;margin:4px 8px;z-index:45;box-shadow:0 2px 10px #6150ea20;direction:rtl;';
 launcher.addEventListener('click',()=>open(location.pathname.startsWith('/auth') || PREVIEW ? 'landing':'workspace'));
 // One isolated launcher; no replacement of native controls, auth flow, chat DOM, or theme preferences.
 const placeLauncher = () => {
   const auth=location.pathname.startsWith('/auth');
   const chat=location.pathname==='/'||/^\/c\//.test(location.pathname);
   if (!(auth||chat||PREVIEW)) {launcher.remove();return;}
   const nav = chat ? document.querySelector('nav') : null;
   const destination = nav || document.body;
   if(launcher.parentElement!==destination) destination.appendChild(launcher);
   launcher.style.position=nav?'absolute':'fixed';launcher.style.top=nav?'4px':'18px';
   launcher.style.left=nav?'50%':'18px';launcher.style.transform=nav?'translateX(-50%)':'none';
 };
 const observer = new MutationObserver(placeLauncher);observer.observe(document.body,{childList:true,subtree:true});
 window.addEventListener('popstate',placeLauncher);placeLauncher();
 if(PREVIEW) open('landing');
}
