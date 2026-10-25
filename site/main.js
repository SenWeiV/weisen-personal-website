(() => {
  'use strict';
  const root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const {gsap,ScrollTrigger}=window;
  if(gsap&&ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
  let userPaused=false;
  try{userPaused=sessionStorage.getItem('trace-motion-paused')==='true';}catch{}
  const off=()=>userPaused||reduce.matches;
  const canvas=document.getElementById('field'),engine=new FieldRenderer(canvas);
  const slots=[...document.querySelectorAll('.scene-slot')];
  const motionButton=document.getElementById('motion-toggle');
  const range=document.getElementById('constraint'),output=document.getElementById('constraint-value');
  const state={x:innerWidth*.66,y:innerHeight*.39,scale:200,opacity:0,weights:[1,0,0,0,0],order:.55,time:0,turnX:0,turnY:0,pointerX:4,pointerY:4,unfold:0,hold:0,drive:0,pulse:10};
  const target={...state,weights:[1,0,0,0,0]};
  let selected=null,frameId=0,measureId=0,lastTime=0,lastPaint=0,grab=null,unfoldVelocity=0,lastScroll=scrollY;
  let turnX=0,turnY=0,inertia=0,modalOpen=false,context=null,introSeen=false,footerSeen=false;
  const chaptersSeen=new WeakSet();
  const clamp=(min,max,value)=>Math.min(max,Math.max(min,value));
  const mix=(a,b,k)=>a+(b-a)*k;

  function measure(){
    const height=innerHeight,width=innerWidth;
    let closest=null,closestRect=null,best=Infinity;
    // One batch of layout reads per scroll/resize, never inside the draw loop.
    const rects=slots.map(slot=>({slot,rect:slot.getBoundingClientRect()}));
    rects.forEach(({slot,rect})=>{
      const visible=Math.min(height,rect.bottom)-Math.max(0,rect.top);
      const distance=Math.abs(rect.top+rect.height*.5-height*.5);
      if(visible>35&&distance<best){closest=slot;closestRect=rect;best=distance;}
    });
    if(closest){
      const rect=closestRect,id=Number(closest.dataset.form);
      target.x=rect.left+rect.width*.5;target.y=rect.top+rect.height*.5;
      target.scale=Math.min(rect.width,rect.height)*.30;
      target.opacity=clamp(0,1,(Math.min(rect.bottom,height-rect.top))/170);
      target.weights=target.weights.map((_,i)=>i===id?1:0);
      if(selected!==closest){selected=closest;engine.canvas.dataset.scene=String(id);}
    }else{target.opacity=0;selected=null;}
    const distance=scrollY-lastScroll;lastScroll=scrollY;
    if(!off()&&Math.abs(distance)>1)target.drive=clamp(-1,1,distance/height*7);
    const progress=scrollY/Math.max(1,document.documentElement.scrollHeight-height);
    document.querySelector('.page-progress span').style.transform=`scaleX(${clamp(0,1,progress)})`;
    wake();
  }
  function queueMeasure(){cancelAnimationFrame(measureId);measureId=requestAnimationFrame(measure);}
  function draw(now){
    frameId=0;
    if(document.hidden||modalOpen||!engine.ready)return;
    const dt=clamp(.001,.05,(now-lastTime)/1000||.016);lastTime=now;
    const live=!off(),k=live?1-Math.exp(-dt*8):1;
    // Layout coordinates stay attached to the DOM; only the assembly itself morphs.
    ['x','y','scale'].forEach(key=>state[key]=target[key]);
    ['opacity','order','pointerX','pointerY','hold','drive'].forEach(key=>state[key]=mix(state[key],target[key],k));
    state.weights=state.weights.map((value,i)=>mix(value,target.weights[i],k));
    if(live){
      state.time+=dt;state.pulse+=dt;target.drive*=Math.exp(-dt*5);
      const springDt=Math.min(dt,.025);unfoldVelocity+=((target.unfold-state.unfold)*100-unfoldVelocity*10)*springDt;
      state.unfold=clamp(0,1.12,state.unfold+unfoldVelocity*springDt);
      if(!grab){turnX+=inertia*dt;inertia*=Math.exp(-dt*3.5);}
    }else{state.unfold=target.unfold;unfoldVelocity=0;state.hold=0;state.drive=0;}
    state.turnX=turnX+state.time*.21+Math.sin(state.time*.35)*.18;
    state.turnY=turnY+Math.sin(state.time*.29)*.23;
    if((!engine.mobile&&engine.backend==='webgl')||now-lastPaint>30||!live){engine.render({...state,scale:state.scale*(1-state.unfold*.26-state.hold*.09)});lastPaint=now;}
    if(live&&(selected||state.opacity>.003))frameId=requestAnimationFrame(draw);
  }
  function wake(){if(!frameId&&!document.hidden)frameId=requestAnimationFrame(draw);}
  engine.onWake=()=>{engine.resize();measure();};
  if(engine.ready){root.classList.add('rendered');document.querySelector('.play-controls').hidden=false;}
  addEventListener('scroll',queueMeasure,{passive:true});
  addEventListener('resize',()=>{engine.resize();queueMeasure();},{passive:true});
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){cancelAnimationFrame(frameId);frameId=0;}
    else{lastTime=performance.now();measure();}
  });

  slots.forEach(slot=>{
    const button=slot.querySelector('.art-grab');button.hidden=!engine.ready;
    button.addEventListener('pointerdown',event=>{
      if(event.button!==0||event.isPrimary===false)return;
      const rect=slot.getBoundingClientRect();
      grab={id:event.pointerId,x:event.clientX,y:event.clientY,turnX,turnY,rect,lastX:event.clientX,lastAt:performance.now(),moved:false};inertia=0;target.hold=off()?0:1;
      button.setPointerCapture(event.pointerId);button.classList.add('grabbing');
      wake();
    });
    button.addEventListener('pointermove',event=>{
      if(grab&&grab.id===event.pointerId){
        const now=performance.now();
        grab.moved ||= Math.hypot(event.clientX-grab.x,event.clientY-grab.y)>7;
        inertia=off()?0:clamp(-2.8,2.8,(event.clientX-grab.lastX)/Math.max(1,now-grab.lastAt)*.65);
        grab.lastX=event.clientX;grab.lastAt=now;
        turnX=grab.turnX+(event.clientX-grab.x)*.011;
        turnY=clamp(-1.2,1.2,grab.turnY+(event.clientY-grab.y)*.007);
      }
      if(selected===slot){
        const rect=grab?.rect||slot.getBoundingClientRect();
        target.pointerX=(event.clientX-(rect.left+rect.width*.5))/Math.max(target.scale,1);
        target.pointerY=-(event.clientY-(rect.top+rect.height*.5))/Math.max(target.scale,1);
      }
      wake();
    });
    const release=event=>{if(event.type==='pointerup'&&grab&&!grab.moved)sendPulse();grab=null;target.hold=0;button.classList.remove('grabbing');wake();};
    button.addEventListener('pointerup',release);button.addEventListener('pointercancel',release);button.addEventListener('lostpointercapture',release);
    button.addEventListener('click',event=>{if(event.detail===0)sendPulse();});
    button.addEventListener('pointerleave',()=>{if(!grab){target.pointerX=4;target.pointerY=4;wake();}});
    button.addEventListener('keydown',event=>{
      if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(event.key))return;
      event.preventDefault();
      if(event.key==='Home'){turnX=0;turnY=0;inertia=0;}
      else if(event.key==='ArrowLeft')turnX-=.28;
      else if(event.key==='ArrowRight')turnX+=.28;
      else turnY=clamp(-1.2,1.2,turnY+(event.key==='ArrowUp'?-.20:.20));
      wake();
    });
  });
  function setOrder(value){
    range.value=String(value);output.value=`${value}%`;output.textContent=`${value}%`;target.order=Number(value)/100;
    document.querySelectorAll('[data-order]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.order)===Number(value))));
    wake();
  }
  range.addEventListener('input',()=>setOrder(Number(range.value)));
  document.querySelectorAll('[data-order]').forEach(button=>button.addEventListener('click',()=>setOrder(Number(button.dataset.order))));
  function sendPulse(){if(off())return;state.pulse=0;wake();}
  function setUnfold(value){
    target.unfold=value;
    document.querySelectorAll('[data-unfold]').forEach(button=>{button.setAttribute('aria-pressed',String(value===1));button.querySelector('span').textContent=value?'Assemble':'Unfold';});
    wake();
  }
  document.querySelectorAll('[data-unfold]').forEach(button=>{button.hidden=!engine.ready;button.addEventListener('click',()=>setUnfold(target.unfold?0:1));});
  document.getElementById('pulse-form').addEventListener('click',sendPulse);
  document.getElementById('reset-form').addEventListener('click',()=>{turnX=0;turnY=0;inertia=0;state.pulse=10;setUnfold(0);setOrder(55);});
  setOrder(55);

  // DOM motion is separate from the single shared generative field.
  document.querySelectorAll('.chapter-title').forEach(title=>{
    const lines=title.innerHTML.split(/<br\s*\/?\s*>/i);
    title.innerHTML=lines.map(line=>`<span class="title-line"><span>${line}</span></span>`).join('');
  });
  function configureMotion(){
    context?.revert();context=null;
    root.classList.toggle('motion-off',off());
    if(off()){inertia=0;state.pulse=10;target.hold=0;dialogAnimation?.cancel();}
    document.getElementById('pulse-form').disabled=off();
    motionButton.hidden=false;motionButton.disabled=reduce.matches;
    const label=reduce.matches?'Motion reduced by system setting':off()?'Resume motion':'Pause motion';
    motionButton.setAttribute('aria-label',label);motionButton.setAttribute('aria-pressed',String(off()));motionButton.title=label;
    motionButton.querySelector('.motion-symbol').textContent=off()?'▷':'Ⅱ';
    motionButton.querySelector('.motion-text').textContent=reduce.matches?'Reduced motion':label;
    if(!off()&&gsap&&ScrollTrigger){
      context=gsap.context(()=>{
        if(!introSeen&&scrollY<100){
          introSeen=true;
          const intro=gsap.timeline({defaults:{ease:'power3.out'}});
          intro.from('.wordmark>span',{yPercent:115,rotation:3,duration:1.35,stagger:.12,clearProps:'transform'},.08)
            .from('.hero-art-note',{opacity:0,duration:.7,clearProps:'opacity'},.65);
        }
        gsap.to('.wordmark>span:first-child',{xPercent:-12,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.6}});
        gsap.to('.wordmark>span:last-child',{xPercent:12,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.6}});
        gsap.from('.thesis-type span',{x:index=>index%2?80:-80,opacity:.3,duration:1,stagger:.15,ease:'power2.out',scrollTrigger:{trigger:'.thesis',start:'top 85%',end:'center 60%',scrub:.5}});
        document.querySelectorAll('.chapter').forEach(chapter=>{
          if(chaptersSeen.has(chapter)||chapter.getBoundingClientRect().bottom<0)return;
          gsap.from(chapter.querySelectorAll('.title-line>span'),{yPercent:105,duration:.95,stagger:.1,ease:'power3.out',clearProps:'transform',onStart:()=>chaptersSeen.add(chapter),scrollTrigger:{trigger:chapter,start:'top 85%',once:true}});
        });
        gsap.to('.about-line span',{scaleX:1,ease:'none',scrollTrigger:{trigger:'.career',start:'top 85%',end:'bottom 45%',scrub:.5}});
        if(!footerSeen)gsap.from('.footer-wordmark>span',{yPercent:70,rotation:2,duration:1.2,stagger:.1,ease:'power3.out',clearProps:'transform',onStart:()=>{footerSeen=true;},scrollTrigger:{trigger:'.footer-wordmark',start:'top 95%',once:true}});
      });
    }
    cancelAnimationFrame(frameId);frameId=0;lastTime=performance.now();measure();
    ScrollTrigger?.refresh();
  }
  motionButton.addEventListener('click',()=>{
    userPaused=!userPaused;try{sessionStorage.setItem('trace-motion-paused',String(userPaused));}catch{}
    configureMotion();
  });
  reduce.addEventListener('change',configureMotion);

  const dialog=document.getElementById('case-dialog');let opener=null,dialogAnimation=null;
  document.querySelectorAll('.read-case').forEach(button=>{
    button.hidden=false;
    button.addEventListener('click',()=>{
      const record=document.getElementById(`record-${button.dataset.case}`);
      const body=record.querySelector('.record-body').cloneNode(true);
      const heading=body.querySelector('h4');
      document.getElementById('case-dialog-title').textContent=heading.textContent;heading.remove();
      document.getElementById('case-dialog-body').replaceChildren(...body.childNodes);
      opener=button;modalOpen=true;cancelAnimationFrame(frameId);frameId=0;dialog.showModal();dialog.scrollTop=0;
      if(!off())dialogAnimation=dialog.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'none'}],{duration:300,easing:'cubic-bezier(.23,1,.32,1)'});
    });
  });
  const closeDialog=()=>{dialogAnimation?.cancel();dialog.close();};
  document.getElementById('close-case').addEventListener('click',closeDialog);
  dialog.addEventListener('click',event=>{
    if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();
    if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeDialog();
  });
  dialog.addEventListener('close',()=>{modalOpen=false;opener?.focus({preventScroll:true});queueMeasure();});
  document.querySelectorAll('.record').forEach(record=>record.addEventListener('toggle',()=>{queueMeasure();ScrollTrigger?.refresh();}));
  function openRecordHash(){let id='';try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}const record=document.getElementById(id);if(record?.matches('.record'))record.open=true;}
  addEventListener('hashchange',openRecordHash);openRecordHash();
  document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
    if(event.metaKey||event.ctrlKey||event.altKey||event.shiftKey)return;
    const section=document.getElementById(link.hash.slice(1));if(!section)return;
    event.preventDefault();history.pushState(null,'',link.hash);openRecordHash();
    section.scrollIntoView({behavior:off()?'auto':'smooth',block:'start'});
  }));
  document.fonts?.ready.then(()=>{queueMeasure();ScrollTrigger?.refresh();});
  configureMotion();
})();
