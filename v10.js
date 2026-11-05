/* Independent chapter artwork, with persistent flow rather than an entrance-only effect. */
const pageArtwork10=Object.fromEntries(['home','about','services','team','insights','cases','contact'].map(name=>[name,`assets/${name}-v10.webp`]));
const descriptions10={home:'数字云潮',about:'环抱云拱',services:'三环协作',team:'聚合之翼',insights:'洞察之镜',cases:'路径与桥梁',contact:'对话流线'};
let sceneryCleanup10=()=>{};
function flowingScenery10(host,theme,light=false){
  host.classList.add('motion-scenery');host.dataset.scenery=theme;
  const canvas=document.createElement('canvas');canvas.className='atmosphere-canvas';canvas.setAttribute('aria-hidden','true');host.append(canvas);
  const mist=document.createElement('span');mist.className='scene-mist';mist.setAttribute('aria-hidden','true');host.append(mist);
  const ctx=canvas.getContext('2d');if(!ctx)return{destroy(){canvas.remove();mist.remove()},enable(){}};
  let width=1,height=1,ratio=1,frame=0,last=0,time=0,visible=false,enabled=true,dead=false,painted=0,visibilityFrame=0;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)'),index=Math.max(0,Object.keys(pageArtwork10).indexOf(theme));
  function point(t,p){const v=1-t;return[v*v*v*p[0]+3*v*v*t*p[2]+3*v*t*t*p[4]+t*t*t*p[6],v*v*v*p[1]+3*v*v*t*p[3]+3*v*t*t*p[5]+t*t*t*p[7]]}
  function draw(now){frame=0;if(dead||!visible||!enabled||document.hidden||reduce.matches)return;
    if(last&&now-last<32){frame=requestAnimationFrame(draw);return}const dt=last?Math.min(now-last,80):0;last=now;time+=dt/1000;ctx.clearRect(0,0,width,height);
    const mobile=width<600;
    for(let line=0;line<3;line++){
      const phase=time*.055+index*.65+line*.7,wave=Math.sin(phase)*.09;
      const p=light?[.07,.48+line*.06,.25,.08+wave,.69,.9-wave,.96,.34+line*.05]:[.22,.82+line*.05,.5,.08+wave+line*.06,.74,.96-wave,.99,.21+line*.12];
      ctx.beginPath();ctx.moveTo(p[0]*width,p[1]*height);ctx.bezierCurveTo(p[2]*width,p[3]*height,p[4]*width,p[5]*height,p[6]*width,p[7]*height);ctx.strokeStyle=light?'rgba(24,124,160,.15)':'rgba(131,223,242,.16)';ctx.lineWidth=line===1?1.6:.7;ctx.stroke();
      const count=mobile?8:14;for(let n=0;n<count;n++){const t=(n/count+time*(.012+line*.002)+index*.13)%1,[x,y]=point(t,p);ctx.beginPath();ctx.arc(x*width,y*height,(mobile?1:1.3)+(n%3)*.45,0,Math.PI*2);ctx.fillStyle=light?`rgba(7,125,167,${.26+Math.sin(t*Math.PI)*.35})`:`rgba(148,234,248,${.25+Math.sin(t*Math.PI)*.42})`;ctx.fill();}
    }
    if(++painted%30===0)canvas.dataset.motionTick=String(painted);frame=requestAnimationFrame(draw);
  }
  function sync(){const running=visible&&enabled&&!document.hidden&&!reduce.matches;host.style.setProperty('--scene-play',running?'running':'paused');canvas.dataset.motionState=running?'running':'paused';if(running&&!frame){last=0;frame=requestAnimationFrame(draw)}else if(!running){cancelAnimationFrame(frame);frame=0;last=0}}
  function measure(){visibilityFrame=0;const rect=host.getBoundingClientRect();visible=rect.bottom>0&&rect.top<innerHeight&&rect.width>0&&rect.height>0;sync()}
  function queueVisibility(){if(!visibilityFrame&&!dead)visibilityFrame=requestAnimationFrame(measure)}
  const resize=new ResizeObserver(()=>{width=host.clientWidth;height=host.clientHeight;ratio=Math.min(devicePixelRatio||1,1.25);canvas.width=Math.max(1,Math.round(width*ratio));canvas.height=Math.max(1,Math.round(height*ratio));ctx.setTransform(ratio,0,0,ratio,0,0);queueVisibility()});resize.observe(host);
  window.addEventListener('scroll',queueVisibility,{passive:true});window.addEventListener('resize',queueVisibility,{passive:true});queueVisibility();
  document.addEventListener('visibilitychange',sync);reduce.addEventListener('change',sync);
  return{enable(value){enabled=value;measure()},destroy(){dead=true;cancelAnimationFrame(frame);cancelAnimationFrame(visibilityFrame);resize.disconnect();window.removeEventListener('scroll',queueVisibility);window.removeEventListener('resize',queueVisibility);document.removeEventListener('visibilitychange',sync);reduce.removeEventListener('change',sync);canvas.remove();mist.remove()}};
}
function decorateScenery10(){sceneryCleanup10();const effects=[];let chapterObserver;
  const page=(location.hash.slice(2).split('/')[0]||'home'),theme=pageArtwork10[page]?page:'about';
  const hero=document.querySelector('.cloud-hero,.v2-page-hero');
  if(hero){const art=hero.querySelector('.cloud-hero-art,.page-art img');if(art){art.getAnimations().filter(a=>!('animationName'in a)).forEach(a=>a.cancel());art.src=pageArtwork10[theme];art.alt=descriptions10[theme]+'独立概念背景';art.classList.add('scene-art');art.width=1672;art.height=941;}effects.push(flowingScenery10(hero,theme));}
  const connect=document.querySelector('.journey-connect-art');if(connect){const image=connect.querySelector('img');image.src='assets/connect-v10.webp';image.alt='透明开放式点阵云网络，与周围渐变背景融合';image.width=1456;image.height=1056;image.classList.add('transparent-connect');const effect=flowingScenery10(connect,'connect',true),dots=flowingScenery10(document.querySelector('.diagram-shell'),'cloud',true);effects.push(effect,dots);const journey=document.querySelector('.brand-journey');const sync=()=>{effect.enable(journey.dataset.phase==='1');dots.enable(journey.dataset.phase!=='1')};chapterObserver=new MutationObserver(sync);chapterObserver.observe(journey,{attributes:true,attributeFilter:['data-phase']});sync();}
  const brand=document.querySelector('.v2-brand-panel img');if(brand){brand.src='assets/flow-v3.webp';brand.alt='流动点阵与清晰边界的品牌概念图';}
  const cta=document.querySelector('.cloud-cta');if(cta){cta.style.setProperty('--cta-art',`url('${pageArtwork10.contact}')`);effects.push(flowingScenery10(cta,'contact'));}
  sceneryCleanup10=()=>{effects.forEach(effect=>effect.destroy());chapterObserver?.disconnect()};
}
const binderBefore10=bindPage;
bindPage=function(){binderBefore10();decorateScenery10()};
/* Keep the existing V9 navigation/reading rail and its initial entrance choreography. */
decorateScenery10();
