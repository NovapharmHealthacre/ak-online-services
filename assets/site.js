const menuBtn=document.querySelector('.menu-btn'),mobileMenu=document.querySelector('.mobile-menu');
if(menuBtn){menuBtn.addEventListener('click',()=>{const open=mobileMenu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));menuBtn.textContent=open?'×':'☰';});}
document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>{mobileMenu?.classList.remove('open');if(menuBtn){menuBtn.textContent='☰';menuBtn.setAttribute('aria-expanded','false');}}));
const serviceMenu=document.querySelector('.service-menu');
const serviceToggle=serviceMenu?.querySelector(':scope > button');
if(serviceMenu&&serviceToggle){
 serviceToggle.addEventListener('click',e=>{e.preventDefault();const open=serviceMenu.classList.toggle('open');serviceToggle.setAttribute('aria-expanded',String(open));});
 document.addEventListener('click',e=>{if(!serviceMenu.contains(e.target)){serviceMenu.classList.remove('open');serviceToggle.setAttribute('aria-expanded','false');}});
 serviceMenu.addEventListener('keydown',e=>{if(e.key==='Escape'){serviceMenu.classList.remove('open');serviceToggle.setAttribute('aria-expanded','false');serviceToggle.focus();}});
}
function applyLang(lang){
  const safe=lang==='gu'?'gu':'en';
  document.documentElement.lang=safe;
  document.querySelectorAll('[data-en][data-gu]').forEach(el=>{el.textContent=el.dataset[safe];});
  document.querySelectorAll('[data-placeholder-en][data-placeholder-gu]').forEach(el=>{el.placeholder=el.dataset['placeholder'+(safe==='gu'?'Gu':'En')];});
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===safe));
  localStorage.setItem('ak-lang',safe);
}
document.querySelectorAll('.lang-btn').forEach(b=>b.addEventListener('click',()=>applyLang(b.dataset.lang)));
applyLang(localStorage.getItem('ak-lang')||'en');
const form=document.querySelector('#enquiryForm');
if(form){form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const text='Hello A K Online Services,%0A%0AName: '+encodeURIComponent(d.get('name')||'')+'%0AMobile: '+encodeURIComponent(d.get('phone')||'')+'%0AService: '+encodeURIComponent(d.get('service')||'')+'%0ARequest: '+encodeURIComponent(d.get('message')||'Please contact me about this service.')+'%0A%0ASent from akonlineservices.in';window.open('https://wa.me/917383853535?text='+text,'_blank','noopener');});}
function syncLangA11y(lang){
  document.querySelectorAll('.lang-btn').forEach(btn=>{
    const active=btn.dataset.lang===lang;
    btn.setAttribute('aria-pressed',String(active));
    btn.setAttribute('aria-label',btn.dataset.lang==='gu'?'ગુજરાતી ભાષા પસંદ કરો':'Select English language');
  });
}
const originalApplyLang=applyLang;
applyLang=function(lang){
  originalApplyLang(lang);
  syncLangA11y(lang==='gu'?'gu':'en');
};
syncLangA11y(localStorage.getItem('ak-lang')==='gu'?'gu':'en');
