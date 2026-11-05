/* 第二版：点阵云概念、统一动效与更简练的首页。 */
const artDark='assets/cloud-dark-v2.webp',artLight='assets/cloud-light-v2.webp';
const artFlow='assets/flow-v3.webp',artCanopy='assets/canopy-v3.webp';
const serviceArts=[artLight,artCanopy,artFlow];
const imageReady=new Map();
function prepareImage(src){if(!imageReady.has(src)){const img=new Image();img.src=src;imageReady.set(src,img.decode().catch(()=>{}));}return imageReady.get(src)}
[artDark,artLight,artFlow,artCanopy].forEach(prepareImage);
let focusIndex=0;
home=function(){return `<section class="cloud-hero"><img class="cloud-hero-art" src="${artDark}" alt="由蓝色点阵与半透明材质聚合而成的数字云抽象概念图" fetchpriority="high"><div class="hero-shade"></div><div class="wrap cloud-hero-content"><p class="eyebrow">YUNZHENG / INTERNET LAW</p><h1>数字世界，<br>权益有界。<span>守护无界。</span></h1><p>浙江云拯律师事务所<br><span>聚焦互联网法律服务</span></p><div class="actions">${link('/services','探索专业领域','btn light')}${link('/about','走近云拯','hero-about')}</div></div><div class="hero-caption"><span>01 — DIGITAL CLOUD</span><span>云聚成形 · 专业同行</span><a href="#/" data-scroll="focus-section">向下探索 ↓</a></div></section><section class="section focus-section" id="focus-section"><div class="wrap"><div class="section-head"><div><p class="eyebrow">01 / OUR EXPERTISE</p><h2>聚焦三大领域，<br>回应数字时代。</h2></div>${link('/services','全部业务')}</div><div class="focus-explorer"><div class="focus-tabs" role="tablist" aria-label="选择业务领域" aria-orientation="vertical">${C.services.map((s,i)=>`<button class="focus-tab ${i===focusIndex?'selected':''}" role="tab" id="focus-tab-${i}" aria-selected="${i===focusIndex}" aria-controls="focus-panel" tabindex="${i===focusIndex?0:-1}" data-focus="${i}"><span>${s.no}</span><strong>${s.title}</strong><span class="tab-arrow">↗</span></button>`).join('')}</div><div class="focus-panel" role="tabpanel" id="focus-panel" tabindex="0" aria-labelledby="focus-tab-${focusIndex}">${focusPanel(focusIndex)}</div></div><p class="section-demo">业务方向已确认 · 具体服务文案为示例</p></div></section><section class="cloud-manifesto"><div class="manifesto-art"><img src="${artLight}" alt="规则蓝色圆点汇成玻璃云的抽象概念图" loading="lazy"></div><div class="manifesto-copy"><p class="eyebrow">02 / THE YUNZHENG IDEA</p><h2>以秩序，<br>回应复杂。</h2><p>理解互联网。连接法律与真实需求。</p><div class="manifesto-words"><span><i></i>理解</span><span><i></i>梳理</span><span><i></i>回应</span></div>${link('/about','了解云拯')}</div></section><section class="section insights-v2"><div class="wrap"><div class="section-head"><div><p class="eyebrow">03 / INSIGHTS</p><h2>洞察，带来新的视角。</h2></div>${link('/insights','全部洞察')}</div><div class="insight-bento">${C.articles.map((a,i)=>`<a class="insight-tile tile-${i}" href="#/insights/${a.id}"><div class="tile-art">${i===0?`<img src="${artDark}" alt="数字点阵云" loading="lazy">`:i===1?`<img src="${artLight}" alt="聚合的数字云" loading="lazy">`:dotArt()}</div><div class="tile-copy"><span>${a.kind} <small>示例文章</small></span><h3>${a.title}</h3><div class="tile-bottom"><span>READ / 0${i+1}</span>${arrow}</div></div></a>`).join('')}</div></div></section><section class="path-section"><div class="wrap"><div><p class="eyebrow">04 / EXPLORE MORE</p><h2>每一次了解，<br>都更进一步。</h2></div><div class="path-links">${[['/team','01','认识团队','专业背景，一目了然'],['/cases','02','浏览场景','从场景理解服务'],['/contact','03','开始沟通','让问题被清楚理解']].map(([u,n,t,d])=>`<a href="#${u}"><span>${n}</span><div><h3>${t}</h3><p>${d}</p></div>${arrow}</a>`).join('')}</div></div></section>${cta()}`};
function focusPanel(i){const s=C.services[i];return `<div class="focus-art art-${i}"><img src="${serviceArts[i]}" width="1672" height="941" alt="${s.title}抽象数字云概念图"><span class="art-index">0${i+1}</span><span class="art-caption">${s.en.toUpperCase()}</span></div><div class="focus-copy"><p>${s.short}</p><div class="tags">${s.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>${link('/services/'+s.id,'查看服务详情')}</div>`}
function dotArt(){return `<svg class="dot-art" viewBox="0 0 500 300" fill="none" aria-hidden="true"><defs><linearGradient id="dg"><stop stop-color="#0b386a"/><stop offset="1" stop-color="#38cbe8"/></linearGradient></defs><g fill="url(#dg)">${Array.from({length:11},(_,r)=>Array.from({length:19},(_,c)=>{const radius=Math.max(1,8-Math.abs(r-5)*.9-Math.abs(c-9)*.25);return `<circle cx="${30+c*24}" cy="${30+r*24}" r="${radius}"/>`}).join('')).join('')}</g></svg>`}
pageHero=function(title,en,desc='',parent=''){return `<section class="page-hero v2-page-hero"><div class="page-art" aria-hidden="true"><img src="${['专业团队','关于云拯','联系我们'].includes(title)?artLight:artDark}" alt=""></div><div class="wrap"><div class="breadcrumbs"><a href="#/">首页</a> / ${parent?`<a href="#${parent.url}">${parent.title}</a> / `:''}${title}</div><div class="eyebrow">${en}</div><h1>${title}</h1>${desc?`<p>${desc}</p>`:''}</div></section>`};
cta=function(){return `<section class="cta cloud-cta"><div class="wrap"><div><p class="eyebrow">CONNECTED BY TRUST</p><h2>云端万象，<br class="mobile-only">从容相谈。</h2><p>联系方式待补充 · 当前为交互演示</p></div>${link('/contact','与云拯沟通','btn')}</div></section>`};
const originalAbout=about;
about=function(){return originalAbout().replace('<div class="brand-panel"><img src="assets/logo.png" alt="云拯点阵图形">','<div class="brand-panel v2-brand-panel"><img src="assets/cloud-light-v2.webp" alt="点阵聚合的数字云抽象图">')};
const originalCaseCards=caseCards;
caseCards=function(list=C.cases){return originalCaseCards(list).replaceAll('<article class="case-card">',`<article class="case-card"><div class="case-art"><img src="${artLight}" alt="示例业务场景抽象图" loading="lazy"></div>`)};
const originalBind=bindPage;
let sectionObserver=null;
bindPage=function(){
  originalBind();
  sectionObserver?.disconnect();
  document.body.dataset.page=location.hash.split('/')[1]||'home';
  const manifesto=$('.manifesto-art img');if(manifesto){manifesto.src=artFlow;manifesto.alt='有序点阵与玻璃环构成的流动边界抽象概念图';}
  document.querySelectorAll('.tile-art').forEach((el,i)=>{if(i>0)el.innerHTML=`<img src="${i===1?artCanopy:artFlow}" width="1672" height="941" loading="lazy" alt="${i===1?'弧形云幕与点阵':'流动点阵与玻璃环'}抽象概念图">`});
  document.querySelectorAll('.case-art img').forEach((el,i)=>el.src=serviceArts[i%3]);
  const banner=$('.page-art img');if(banner){const page=document.body.dataset.page;banner.src=page==='insights'||page==='cases'?artFlow:page==='services'||page==='contact'?artCanopy:artLight;}
  const brand=$('.v2-brand-panel img');if(brand)brand.src=artFlow;
  const tabs=[...document.querySelectorAll('[data-focus]')];let tabId=0,tabMotion,requestedTab=focusIndex;
  async function selectTab(i,focus=false){
    if(!tabs[i]||i===requestedTab)return;requestedTab=i;const id=++tabId;
    tabs.forEach((t,j)=>{t.classList.toggle('selected',j===i);t.setAttribute('aria-selected',String(j===i));t.tabIndex=j===i?0:-1});if(focus)tabs[i].focus();
    const p=$('#focus-panel'),opacity=getComputedStyle(p).opacity;p.setAttribute('aria-busy','true');tabMotion?.cancel();await prepareImage(serviceArts[i]);if(id!==tabId||!p.isConnected)return;
    if(!reduceMotion()){tabMotion=p.animate([{opacity},{opacity:0}],{duration:280,easing:'ease-in-out',fill:'forwards'});await tabMotion.finished.catch(()=>{});if(id!==tabId||!p.isConnected)return;}
    focusIndex=i;p.setAttribute('aria-labelledby','focus-tab-'+i);p.innerHTML=focusPanel(i);p.setAttribute('aria-busy','false');tabMotion?.cancel();
    if(!reduceMotion()){tabMotion=p.animate([{opacity:0},{opacity:1}],{duration:950,easing:'cubic-bezier(.22,.61,.36,1)'});tabMotion.finished.catch(()=>{});}
  }
  tabs.forEach((t,i)=>{t.addEventListener('click',()=>selectTab(i));t.addEventListener('keydown',e=>{let next=i;if(e.key==='ArrowDown'||e.key==='ArrowRight')next=(i+1)%tabs.length;else if(e.key==='ArrowUp'||e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;else return;e.preventDefault();selectTab(next,true)})});
  document.querySelectorAll('[data-scroll]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.getElementById(a.dataset.scroll)?.scrollIntoView({behavior:reduceMotion()?'instant':'smooth'})}));
  sectionObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.target.classList.contains('cloud-hero')){const img=e.target.querySelector('.cloud-hero-art');if(img)img.style.animationPlayState=e.isIntersecting?'running':'paused';return}if(e.isIntersecting){e.target.classList.add('revealed');sectionObserver.unobserve(e.target)}}),{rootMargin:'0px 0px 60px 0px',threshold:0});
  if($('.cloud-hero'))sectionObserver.observe($('.cloud-hero'));
  document.querySelectorAll('.section > .wrap,.manifesto-copy,.path-section > .wrap').forEach(el=>{if(el.getBoundingClientRect().top<innerHeight+60||reduceMotion())return;el.classList.add('reveal');sectionObserver.observe(el)});
};
const reduceMotion=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const originalRender=render;
let transitionId=0,firstV2Render=true,pageMotion=null;
render=async function(){
  const id=++transitionId,main=$('#main'),opacity=getComputedStyle(main).opacity;pageMotion?.cancel();
  main.classList.remove('page-exit','page-enter');
  if(firstV2Render||reduceMotion()){firstV2Render=false;originalRender();return}
  pageMotion=main.animate([{opacity},{opacity:0}],{duration:360,easing:'ease-in-out',fill:'forwards'});
  await pageMotion.finished.catch(()=>{});if(id!==transitionId)return;
  originalRender();pageMotion.cancel();
  pageMotion=main.animate([{opacity:0},{opacity:1}],{duration:1100,easing:'cubic-bezier(.22,.61,.36,1)'});
  pageMotion.finished.catch(()=>{});
};
window.removeEventListener('hashchange',originalRender);window.addEventListener('hashchange',render);
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#/"]');if(a&&!a.hasAttribute('data-scroll')&&a.getAttribute('href')===location.hash){e.preventDefault();window.scrollTo({top:0,behavior:reduceMotion()?'instant':'smooth'})}});
render();
