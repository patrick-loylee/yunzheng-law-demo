/* Brand narrative: three scroll states, one observer, no per-frame layout work. */
function pointCloud(){
  let dots='';
  for(let y=55;y<480;y+=21)for(let x=50;x<580;x+=21){
    const cap=((x-310)/120)**2+((y-170)/115)**2<1;
    const left=((x-200)/130)**2+((y-255)/120)**2<1;
    const right=((x-425)/125)**2+((y-255)/110)**2<1;
    const tail=y>270&&Math.abs(x-310)<(480-y)*.9;
    if(cap||left||right||tail){const r=Math.max(1.4,8.3-(y-170)*.018-Math.abs(x-310)*.012);dots+=`<circle cx="${x}" cy="${y}" r="${r.toFixed(1)}"/>`;}
  }
  return dots;
}
function brandDiagram(){return `<svg class="brand-diagram" viewBox="0 0 640 560" aria-hidden="true"><defs><linearGradient id="cloud-color" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#17457e"/><stop offset="1" stop-color="#00b9d9"/></linearGradient></defs><g class="diagram-grid" fill="#5291aa" opacity=".17">${Array.from({length:17},(_,r)=>Array.from({length:20},(_,c)=>`<circle cx="${35+c*30}" cy="${30+r*30}" r="1"/>`).join('')).join('')}</g><g class="diagram-orbits" fill="none" stroke="#4b92ad" stroke-width=".8"><circle cx="320" cy="280" r="207"/><ellipse cx="320" cy="280" rx="266" ry="116" transform="rotate(-28 320 280)"/><ellipse cx="320" cy="280" rx="248" ry="140" transform="rotate(40 320 280)"/></g><g class="diagram-cloud" fill="url(#cloud-color)">${pointCloud()}</g><g class="diagram-network" fill="none" stroke="#2795b3" stroke-width="1.4"><path pathLength="1" d="M320 280L130 160 490 130 510 375 155 420 130 160M320 280L490 130M320 280L510 375M320 280L155 420M130 160L510 375M490 130L155 420"/><g fill="#d5edf2" stroke-width="2">${[[130,160],[490,130],[510,375],[155,420]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="12"/>`).join('')}</g></g><g class="diagram-guard" fill="none" stroke="#1687a8"><rect x="145" y="105" width="350" height="350" rx="120" stroke-width="1.5" transform="rotate(45 320 280)"/><rect x="169" y="129" width="302" height="302" rx="100" stroke-opacity=".3" transform="rotate(45 320 280)"/><path d="M320 148L413 180V273Q413 353 320 403Q227 353 227 273V180Z" stroke-width="2"/><path d="M284 273L310 299 360 246" stroke-width="3"/></g></svg>`}
const brandChapters=[
  {label:'01 / CLOUD',title:'点聚成云。',copy:'每一个点，都是需要被看见的权益。',tags:['点阵','聚合','云拯'],name:'点聚成云'},
  {label:'02 / CONNECT',title:'连接，产生力量。',copy:'从创作到传播，从平台到用户。理解连接，也厘清边界。',tags:['互联网','连接','数字世界'],name:'连接成网'},
  {label:'03 / PROTECT',title:'让权益，有所依。',copy:'以专业回应复杂，让每一次行动更清晰。',tags:['秩序','边界','权益守护'],name:'权益守护'}
];
function brandJourney(){return `<section class="brand-journey" id="brand-journey" data-phase="0" aria-label="云拯品牌理念"><div class="journey-heading wrap"><p class="eyebrow">THE CLOUD, CONNECTED</p><h2>一朵云里的数字世界。</h2><p>下滑，走进云拯的连接方式。</p></div><div class="journey-layout wrap"><div class="journey-visual"><div class="diagram-shell">${brandDiagram()}<div class="logo-seal"><img src="assets/logo.png" alt="浙江云拯律师事务所原始点阵云 Logo"><span>云拯 · YUNZHENG</span></div><span class="diagram-coordinate coordinate-a">120° E / DIGITAL</span><span class="diagram-coordinate coordinate-b">CONNECTED BY TRUST</span></div><nav class="journey-controls" aria-label="品牌理念章节">${brandChapters.map((s,i)=>`<button type="button" data-chapter="${i}" aria-label="查看${s.name}" aria-pressed="${i===0}"><span>0${i+1}</span>${s.name}</button>`).join('')}</nav></div><div class="journey-story">${brandChapters.map((s,i)=>`<article class="journey-step" id="journey-step-${i}" data-step="${i}"><p class="eyebrow">${s.label}</p><h3>${s.title}</h3><p>${s.copy}</p><div class="journey-tags">${s.tags.map(t=>`<span>${t}</span>`).join('')}</div></article>`).join('')}</div></div><div class="journey-end wrap"><span>从数字世界，走向具体问题</span><a href="#/" data-scroll="focus-section">探索业务领域 ↓</a></div></section>`}
function digitalScenes(){return `<section class="digital-scenes" id="digital-scenes"><div class="wrap"><div class="section-head"><div><p class="eyebrow">INTERNET / EVERYDAY</p><h2>数字生活的每一面，<br>都有值得守护的价值。</h2></div><p>从你熟悉的场景，找到服务方向。</p></div><div class="scene-list">${[
  ['ip','01','创作与表达','让原创被尊重','文章 / 图片 / 视频 / 品牌','creation'],
  ['reputation','02','传播与声誉','让事实被看见','网络内容 / 商誉 / 人格权益','signal'],
  ['disputes','03','交易与协作','让争议有路径','平台 / 合同 / 线上履行','orbit']
].map(([id,no,title,sub,tags,type])=>`<a class="scene-link" href="#/services/${id}"><div class="scene-symbol ${type}" aria-hidden="true"><i></i><i></i><i></i><b></b></div><div class="scene-copy"><span class="scene-number">${no} / DIGITAL RIGHTS</span><h3>${title}</h3><p>${sub}</p><small>${tags}</small></div><span class="scene-arrow" aria-hidden="true">↗</span></a>`).join('')}</div></div></section>`}
const homeV3=home;
home=function(){let html=homeV3();html=html.replace('<section class="section focus-section"',brandJourney()+'<section class="section focus-section"');html=html.replace('<section class="section insights-v2">',digitalScenes()+'<section class="section insights-v2">');html=html.replace('<div class="hero-shade"></div>','<div class="hero-shade"></div><div class="hero-cloud-mark" aria-hidden="true"><svg viewBox="0 0 640 560"><defs><linearGradient id="hero-dots" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#3794c3"/><stop offset="1" stop-color="#96ecf2"/></linearGradient></defs><g fill="url(#hero-dots)">'+pointCloud()+'</g></svg><span>YUNZHENG</span><small>CLOUD · CONNECTION · RIGHTS</small></div>');html=html.replace('data-scroll="focus-section">向下探索','data-scroll="brand-journey">向下探索');return html;};
let narrativeObserver=null,entranceObserver=null,journeyCleanup=()=>{};
const bindV3=bindPage;
bindPage=function(){
  narrativeObserver?.disconnect();entranceObserver?.disconnect();journeyCleanup();bindV3();
  const journey=document.querySelector('.brand-journey');
  if(!journey)return;
  const steps=[...journey.querySelectorAll('.journey-step')],controls=[...journey.querySelectorAll('[data-chapter]')];
  let active=-1,locked=false,scrollFrame=0,tweenFrame=0,disposed=false;
  function setPhase(i){if(i===active)return;active=i;journey.dataset.phase=i;controls.forEach((b,j)=>b.setAttribute('aria-pressed',String(j===i)));steps.forEach((s,j)=>s.classList.toggle('step-current',j===i));}
  setPhase(0);
  let mobile=matchMedia('(max-width:700px)').matches;
  function update(){scrollFrame=0;if(disposed||locked)return;const focus=innerHeight*(mobile?.66:.56),distances=steps.map(s=>{const r=s.getBoundingClientRect();return Math.abs(r.top+r.height/2-focus)}),next=distances.indexOf(Math.min(...distances));if(next===active||distances[active]-distances[next]<70)return;setPhase(next)}
  function onScroll(){mobile=matchMedia('(max-width:700px)').matches;if(!scrollFrame)scrollFrame=requestAnimationFrame(update)}
  function cancelTween(e){if(e?.type==='keydown'&&!['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(e.key))return;cancelAnimationFrame(tweenFrame);tweenFrame=0;locked=false;onScroll()}
  function goTo(i){cancelAnimationFrame(tweenFrame);setPhase(i);locked=true;const start=scrollY,r=steps[i].getBoundingClientRect(),target=Math.max(0,Math.min(document.documentElement.scrollHeight-innerHeight,start+r.top+r.height/2-innerHeight*(mobile?.66:.56)));if(reduceMotion()){window.scrollTo({top:target,behavior:'instant'});locked=false;return}let began;
    function tick(now){if(disposed)return;if(began===undefined)began=now;const t=Math.min(1,(now-began)/1700),ease=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;window.scrollTo({top:start+(target-start)*ease,behavior:'instant'});if(t<1)tweenFrame=requestAnimationFrame(tick);else{tweenFrame=0;locked=false;setPhase(i)}}tweenFrame=requestAnimationFrame(tick);
  }
  window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll,{passive:true});window.addEventListener('wheel',cancelTween,{passive:true});window.addEventListener('touchstart',cancelTween,{passive:true});window.addEventListener('keydown',cancelTween);
  controls.forEach(b=>b.addEventListener('click',()=>goTo(Number(b.dataset.chapter))));onScroll();
  journeyCleanup=()=>{disposed=true;cancelAnimationFrame(scrollFrame);cancelAnimationFrame(tweenFrame);window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);window.removeEventListener('wheel',cancelTween);window.removeEventListener('touchstart',cancelTween);window.removeEventListener('keydown',cancelTween)};
  entranceObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');entranceObserver.unobserve(e.target);}});},{threshold:.08});
  document.querySelectorAll('.scene-link,.journey-heading,.journey-end').forEach(el=>{if(reduceMotion())return;el.classList.add('soft-enter');entranceObserver.observe(el);});
};
firstV2Render=true;render();
