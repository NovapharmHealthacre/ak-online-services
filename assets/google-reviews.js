/* Reviews shown here were transcribed from dated screenshots supplied by the business.
   This is NOT a live Google Places feed. Never invent authors, ratings or permalinks. */
(async function () {
  const scroller=document.getElementById('ak-google-review-scroller');
  const track=document.getElementById('ak-google-review-track');
  const empty=document.getElementById('ak-google-review-empty');
  const attribution=document.getElementById('ak-google-review-attribution');
  if(!scroller||!track||!empty||!attribution)return;
  const fallbackURL='https://share.google/LYhl4cIHpJTKEJvXz';
  const safeGoogleURL=(url)=>{
    try{
      const u=new URL(url);
      const host=u.hostname.toLowerCase();
      return u.protocol==='https:' &&
        (host==='share.google'||host==='maps.app.goo.gl'||host==='www.google.com'||host==='google.com'||host==='maps.google.com') ? u.href : null;
    }catch(_){return null;}
  };
  let payload;
  try{
    const response=await fetch('/assets/google-reviews.json',{cache:'no-store'});
    if(!response.ok)return;
    payload=await response.json();
  }catch(_){return;}
  if(!payload||!Array.isArray(payload.reviews))return;
  const profile=safeGoogleURL(payload.sourceUrl)||fallbackURL;
  const screenshotDate=payload.screenshotDate==='2026-10-15'?'15 Oct 2026':String(payload.screenshotDate||'date not recorded');
  const entries=payload.reviews.filter(r=>
    r&&typeof r.author==='string'&&r.author.trim().length>0&&
    typeof r.text==='string'&&r.text.trim().length>0&&
    typeof r.rating==='number'&&r.rating>=1&&r.rating<=5
  ).slice(0,12);
  if(!entries.length)return;
  function textEl(tag,className,value){
    const el=document.createElement(tag);
    if(className)el.className=className;
    el.textContent=value;
    return el;
  }
  function cardFor(review){
    const card=document.createElement('article');
    card.className='ak-gr-card';
    const stars=textEl('div','ak-gr-stars','★'.repeat(Math.round(review.rating))+'☆'.repeat(5-Math.round(review.rating)));
    stars.setAttribute('aria-label',review.rating+' out of 5 stars');
    const quote=textEl('blockquote','',review.text.trim());
    if(review.language==='romanized-hi')quote.lang='hi-Latn';
    const author=textEl('div','ak-gr-who',review.author.trim());
    const dateText=(typeof review.date==='string'?review.date+' · shown on '+screenshotDate:'Screenshot dated '+screenshotDate);
    const date=textEl('div','ak-gr-meta',dateText);
    const dateGu='Google પર દર્શાવેલ સમય: '+(review.date||'')+' · સ્ક્રીનશૉટ '+screenshotDate;
    date.dataset.en=dateText;
    date.dataset.gu=dateGu;
    const translation=review.language==='google-translated-en'?textEl('div','ak-gr-translation','Google-translated excerpt') : null;
    if(translation){translation.dataset.en='Google-translated excerpt';translation.dataset.gu='Google દ્વારા અનુવાદિત રિવ્યૂ';}
    const link=document.createElement('a');
    const individualLink=safeGoogleURL(review.reviewUrl);
    link.href=individualLink||profile;
    link.dataset.en=individualLink?'View review on Google ↗':'Explore reviews on Google ↗';
    link.dataset.gu=individualLink?'Google પર રિવ્યૂ જુઓ ↗':'Google પર બધા રિવ્યૂ જુઓ ↗';
    link.textContent=localStorage.getItem('ak-lang')==='gu'?link.dataset.gu:link.dataset.en;
    link.target='_blank';
    link.rel='noopener noreferrer';
    card.append(stars,quote,author,date);
    if(translation)card.append(translation);
    card.append(link);
    if(localStorage.getItem('ak-lang')==='gu'){date.textContent=date.dataset.gu;if(translation)translation.textContent=translation.dataset.gu;}
    return card;
  }
  function makeSet(items){
    const set=document.createElement('div');
    set.className='ak-gr-set';
    for(const item of items)set.append(cardFor(item));
    return set;
  }
  track.replaceChildren(makeSet(entries));
  const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(entries.length>1&&!prefersReduced){
    const repeated=makeSet(entries);
    repeated.setAttribute('aria-hidden','true');
    repeated.querySelectorAll('a').forEach(a=>a.tabIndex=-1);
    track.append(repeated);
    track.style.setProperty('--ak-review-duration',Math.max(50,entries.length*7)+'s');
    track.classList.add('is-animated');
  } else {
    scroller.style.overflowX='auto';
  }
  scroller.hidden=false;
  empty.hidden=true;
  attribution.hidden=false;
})();