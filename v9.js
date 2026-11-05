/* V9 — first-paint choreography, sliding navigation ink, and a reading rail.
   Every effect is additive and yields to prefers-reduced-motion. */
(function(){
  'use strict';
  var ease='cubic-bezier(.22,.61,.36,1)';
  function reduced(){return matchMedia('(prefers-reduced-motion: reduce)').matches}

  /* 1. Home entrance: text settles in sequence, artwork eases to rest. */
  var introDone=false;
  function heroIntro(){
    if(introDone||reduced())return;
    var hero=document.querySelector('.cloud-hero');
    if(!hero)return;
    introDone=true;
    var seq=['.cloud-hero-content .eyebrow','.cloud-hero-content h1','.cloud-hero-content>p:not(.eyebrow)','.cloud-hero-content .actions','.hero-caption'];
    seq.forEach(function(sel,i){
      var el=hero.querySelector(sel);
      if(!el)return;
      el.animate([{opacity:0,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}],{duration:1500,delay:180+i*150,easing:ease,fill:'both'});
    });
    var art=hero.querySelector('.cloud-hero-art');
    if(art)art.animate([{transform:'scale(1.045)'},{transform:'scale(1)'}],{duration:2600,easing:'ease-out',fill:'both'});
    var mark=hero.querySelector('.hero-cloud-mark');
    if(mark)mark.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:2200,delay:420,easing:'ease-out',fill:'both'});
  }

  /* 2. Navigation ink: the active underline slides from the previous section. */
  var inkState=null;
  function navInk(){
    var nav=document.querySelector('#navigation');
    if(!nav)return;
    var ink=nav.querySelector('.nav-ink');
    if(!ink){
      ink=document.createElement('span');
      ink.className='nav-ink';
      ink.setAttribute('aria-hidden','true');
      nav.appendChild(ink);
    }
    var active=nav.querySelector('a.active');
    if(!active){ink.classList.remove('ready');return}
    var x=active.offsetLeft,w=active.offsetWidth;
    if(!ink.dataset.placed&&inkState){
      ink.style.transition='none';
      ink.style.width=inkState.w+'px';
      ink.style.transform='translateX('+inkState.x+'px)';
      ink.getBoundingClientRect();
    }
    ink.style.transition='';
    ink.style.width=w+'px';
    ink.style.transform='translateX('+x+'px)';
    ink.classList.add('ready');
    ink.dataset.placed='1';
    inkState={x:x,w:w};
  }


  /* 3. Reading rail: dot column fills with scroll progress; cheap rAF updates. */
  var rail=null,railFrame=0;
  function ensureRail(){
    if(rail&&rail.isConnected)return rail;
    rail=document.createElement('div');
    rail.className='scroll-rail';
    rail.setAttribute('aria-hidden','true');
    rail.innerHTML='<i class="rail-track"></i><i class="rail-fill"></i>';
    document.body.appendChild(rail);
    return rail;
  }
  function paintRail(){
    railFrame=0;
    var el=ensureRail();
    var doc=document.documentElement;
    var max=doc.scrollHeight-innerHeight;
    var p=max>160?Math.min(1,Math.max(0,scrollY/max)):0;
    el.classList.toggle('visible',max>160);
    var fill=el.querySelector('.rail-fill');
    if(fill)fill.style.clipPath='inset(0 0 '+((1-p)*100).toFixed(2)+'% 0)';
    el.style.setProperty('--rail-p',p.toFixed(4));
  }
  function queueRail(){
    if(reduced())return;
    if(!railFrame)railFrame=requestAnimationFrame(paintRail);
  }

  /* 4. Rhythmic staggering inside card lists. */
  function stagger(){
    if(reduced())return;
    document.querySelectorAll('.scene-list .scene-link').forEach(function(el,i){
      var d=(i%3)*110+'ms';
      el.style.transitionDelay=d+', '+d;
    });
  }

  /* Hook the per-route binder so chrome survives every navigation. */
  var bindBeforeV9=bindPage;
  bindPage=function(){
    bindBeforeV9.apply(this,arguments);
    navInk();
    if(!introDone)heroIntro();
    stagger();
    window.requestAnimationFrame(function(){paintRail()});
  };

  addEventListener('scroll',queueRail,{passive:true});
  addEventListener('resize',function(){navInk();queueRail()},{passive:true});
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',function(){queueRail()});

  /* Initial paint: the binder already ran before this script, so set up directly. */
  heroIntro();
  navInk();
  stagger();
  paintRail();
})();
