/* Google review carousel. Never invent or scrape customer reviews.
 * Display only authenticated, attributed entries supplied with publishing rights.
 * Google Maps Platform reviews must be fetched through a compliant integration.
 */
(async function(){
 const section=document.querySelector('#google-reviews');
 if(!section)return;
 const scroller=document.querySelector('#ak-google-review-scroller');
 const track=document.querySelector('#ak-google-review-track');
 const empty=document.querySelector('#ak-google-review-empty');
 const attribution=document.querySelector('#ak-google-review-attribution');
 if(!scroller||!track||!empty||!attribution)return;
 let payload;
 try {
   const response=await fetch('/assets/google-reviews.json',{cache:'no-store'});
   if(!response.ok)return;
   payload=await response.json();
 }catch(e){return;}
 if(!payload||!Array.isArray(payload.reviews))return;
 const valid=payload.reviews.filter(r=>
   r&&typeof r.author==='string'&&r.author.trim().length>0&&
   typeof r.text==='string'&&r.text.trim().length>0&&
   Number.isFinite(Number(r.rating))&&Number(r.rating)>=1&&Number(r.rating)<=5&&
   typeof r.reviewUrl==='string'&&/^https:\/\/(?:www\.)?(?:google\.[^/]+|maps\.app\.goo\.gl|share\.google)\//i.test(r.reviewUrl)
 ).slice(0,15);
 if(!valid.length)return;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function makeCard(review){
   const card=document.createElement('article');
   card.className='ak-gr-card';
   const stars=document.createElement('div');
   stars.className='ak-gr-stars';
   stars.setAttribute('aria-label',Number(review.rating)+' out of 5 stars');
   stars.textContent='★'.repeat(Math.round(Number(review.rating)))+'☆'.repeat(5-Math.round(Number(review.rating)));
   const quote=document.createElement('blockquote');
   quote.textContent=review.text.trim();
   const who=document.createElement('div');
   who.className='ak-gr-who';
   who.textContent=review.author.trim();
   const meta=document.createElement('div');
   meta.className='ak-gr-meta';
   meta.textContent=typeof review.date==='string'?review.date:'Google Maps review';
   const link=document.createElement('a');
   link.href=review.reviewUrl;
   link.target='_blank';
   link.rel='noopener noreferrer';
   link.textContent='View on Google ↗';
   card.append(stars,quote,who,meta,link);
   return card;
 }
 function makeSet(entries){const set=document.createElement('div');set.className='ak-gr-set';entries.forEach(r=>set.append(makeCard(r)));return set;}
 const set=makeSet(valid);
 track.append(set);
 if(valid.length>=2&&!reduced){
   const clone=makeSet(valid);clone.setAttribute('aria-hidden','true');
   clone.querySelectorAll('a').forEach(a=>a.tabIndex=-1);
   track.append(clone);track.classList.add('is-animated');
 }else {
   scroller.style.overflowX='auto';
 }
 scroller.hidden=false;
 empty.hidden=true;
 attribution.hidden=false;
})();