/* Lightweight brand transitions. Navigation renders immediately; effects never take pointer input. */
const connectArtV8='assets/connect-v8.webp';
prepareImage(connectArtV8);
const journeyBeforeV8=brandJourney;
brandJourney=function(){return journeyBeforeV8().replace('<div class="diagram-shell">',`<div class="diagram-shell"><div class="journey-connect-art"><img src="${connectArtV8}" width="1672" height="941" alt="独立的连接成网概念图：点阵云通过透明流线连接四个数字节点" decoding="async"></div>`)};
const transitionLayer=document.createElement('div');transitionLayer.className='route-cloud';transitionLayer.setAttribute('aria-hidden','true');
transitionLayer.innerHTML=`<svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="route-dot-color"><stop stop-color="#438eb1"/><stop offset="1" stop-color="#73dce8"/></linearGradient></defs>${Array.from({length:6},(_,g)=>`<g class="cloud-band" fill="url(#route-dot-color)">${Array.from({length:16},(_,i)=>{const x=210+i*39,y=190+g*49+Math.sin(i*.4)*28,r=Math.max(2,9-Math.abs(i-7.5)*.55-Math.abs(g-2.5));return `<circle cx="${x}" cy="${y}" r="${r}"/>`}).join('')}</g>`).join('')}</svg>`;
document.body.append(transitionLayer);
let routeAnimations=[],ambientObserver=null;
const bindBeforeV8=bindPage;
bindPage=function(){ambientObserver?.disconnect();bindBeforeV8();
  ambientObserver=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('motion-visible',e.isIntersecting)),{threshold:0});
  document.querySelectorAll('.cloud-hero,.cloud-cta,.journey-visual').forEach(el=>ambientObserver.observe(el));
};
function clearRouteFx(){routeAnimations.forEach(a=>a.cancel());routeAnimations=[];transitionLayer.classList.remove('active')}
const renderBeforeV8=render;
window.removeEventListener('hashchange',renderBeforeV8);
render=function(){
  clearRouteFx();pageMotion?.cancel();originalRender();
  if(reduceMotion())return;
  transitionLayer.classList.add('active');
  const main=document.querySelector('#main');
  routeAnimations.push(main.animate([{opacity:.68,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:1850,easing:'cubic-bezier(.22,.61,.36,1)'}));
  transitionLayer.querySelectorAll('.cloud-band').forEach((band,i)=>{const direction=i%2?1:-1;const motion=band.animate([{opacity:0,transform:`translate(${direction*120}px,${(i-2.5)*28}px) scale(1.16)`},{opacity:.28,transform:'translate(0,0) scale(1)',offset:.37},{opacity:.18,transform:'translate(0,-8px) scale(.97)',offset:.63},{opacity:0,transform:`translate(${-direction*72}px,${(i-2.5)*-18}px) scale(.88)`}],{duration:2250,delay:i*55,easing:'cubic-bezier(.22,.61,.36,1)'});routeAnimations.push(motion);});
  const last=routeAnimations[routeAnimations.length-1];last.finished.then(()=>transitionLayer.classList.remove('active')).catch(()=>{});
};
window.addEventListener('hashchange',render);
document.addEventListener('visibilitychange',()=>{document.body.classList.toggle('motion-hidden',document.hidden);if(document.hidden)clearRouteFx()});
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',clearRouteFx);
/* Initial load stays steady; the decorative transition is only for real route changes. */
originalRender();
