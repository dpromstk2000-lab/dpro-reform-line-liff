/* DPRO TUTORIAL / REFORM / FIRST10 / STANDARD V1.1 / R3 */
(() => {
  'use strict';
  if (window.DPRO_REFORM_TUTORIAL?.version === 'R3-V1.1') return;

  const VERSION = 'R3-V1.1';
  const STATE_KEY = 'dpro_tutorial_reform_first10_v1';
  const POS_KEY = 'dpro_tutorial_reform_first10_pos_v1';
  const ROOT_ID = 'dpro-tutorial-first10';
  const HIGHLIGHT_CLASS = 'dpro-tutorial-target';
  const SAFE = 10;

  const STEPS = Object.freeze([
    {id:'F10-01',route:'/demo-guide.html',primary:'.hero',fallback:'main.page',title:'公開デモの入口',guidance:'リフォーム相談から工事後フォローまでを、実在する公開デモ画面で確認する入口です。ここでは画面全体の目的だけをつかみます。'},
    {id:'F10-02',route:'/demo-guide.html',primary:'#screenGrid',fallback:'.grid',title:'4画面・5業務ステップの全体像',guidance:'お客様、マイページ、担当者、オーナーPCの4画面をつなぎ、写真付き相談→現地調査・見積→工事進捗・写真→案件管理→アフターフォローを追います。'},
    {id:'F10-03',route:'/index.html?demo=1&v=reform-10',primary:'#steps',fallback:'.steps-wrap',title:'相談受付は6段階',guidance:'相談内容、希望詳細、物件、写真、現地調査、確認・送信の順です。First10では構造を学ぶだけで、最終送信はしません。'},
    {id:'F10-04',route:'/index.html?demo=1&v=reform-10',primary:'#historyLink',fallback:'.top-actions',title:'相談後はマイページへ',guidance:'受付後の案件・現地調査・見積・工事進捗はマイページで確認します。Tutorialの次へで既存デモのマイページへ直接移動します。'},
    {id:'F10-05',route:'/member.html?demo=1&v=reform-10',primary:'#projectList',fallback:'.layout',title:'案件一覧から状況を確認',guidance:'既存のデモ案件一覧から、相談・工事の状態と最終更新を読み取ります。既存案件を開く操作はGETの詳細表示に限り任意です。'},
    {id:'F10-06',route:'/member.html?demo=1&v=reform-10',primary:'#detailCard',fallback:'main',title:'調査・見積・工事・公開写真を読む',guidance:'案件詳細には現在工程、現地調査、見積、工事、報告、公開写真がまとまります。操作ボタンではなく情報の見方を学びます。'},
    {id:'F10-07',route:'/staff.html?demo=1&staff=tanaka&v=reform-10',primary:'#schedulePanel',fallback:'.main-grid',title:'担当者は今日の訪問・工事から確認',guidance:'担当者画面では本日の現地調査・工事と未完了タスクを先に確認します。First10では状況を読むだけです。'},
    {id:'F10-08',route:'/staff.html?demo=1&staff=tanaka&v=reform-10',primary:'#detailModal .detail-tabs',fallback:'#scheduleList',title:'案件詳細はタブで追う',guidance:'既存の予定から案件を開ける場合は、基本情報・現地調査・工事/報告・写真・タスクのタブ構成を確認します。予定がない場合は予定一覧を対象にして次へ進めます。'},
    {id:'F10-09',route:'/owner.html?demo=1&v=reform-10',primary:'#stats',fallback:'#stageGrid',title:'オーナーは今日の優先順位を俯瞰',guidance:'新規相談、現地調査、見積回答待ち、工事中、完了確認、アフターフォローを件数と工程で俯瞰します。'},
    {id:'F10-10',route:'/owner.html?demo=1&v=reform-10',primary:'#sidebar .nav',fallback:'#sidebar',title:'相談からアフターまで一つの管理導線',guidance:'相談・案件、タスク、顧客検索、現地調査、見積、工事、写真報告までの管理導線を確認してFirst10完了です。ReplayはTutorial状態だけを初期化し、demo-guideへ戻ります。'}
  ]);

  const STYLE = `
#${ROOT_ID}{position:fixed;z-index:2147483000;left:12px;top:12px;width:min(390px,calc(100vw - 20px));max-height:calc(100vh - 20px);overflow:auto;background:#fff;color:#13211f;border:1px solid #b8d3ce;border-radius:18px;box-shadow:0 18px 55px rgba(6,63,57,.28);font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans JP",sans-serif;line-height:1.55}
#${ROOT_ID}[hidden]{display:none!important}
#${ROOT_ID} *{box-sizing:border-box}
#${ROOT_ID} .dpro-tut-handle{display:flex;align-items:center;gap:10px;min-height:48px;padding:10px 12px;background:linear-gradient(135deg,#063f39,#0b8375);color:#fff;border-radius:17px 17px 0 0;cursor:grab;touch-action:none;user-select:none}
#${ROOT_ID} .dpro-tut-handle:active{cursor:grabbing}
#${ROOT_ID} .dpro-tut-grip{font-size:18px;letter-spacing:-2px;opacity:.9}
#${ROOT_ID} .dpro-tut-step{font-size:12px;font-weight:900;flex:1}
#${ROOT_ID} .dpro-tut-close{width:36px;height:36px;border:1px solid rgba(255,255,255,.5);border-radius:10px;background:rgba(255,255,255,.10);color:#fff;font-size:20px;font-weight:900;cursor:pointer}
#${ROOT_ID} .dpro-tut-body{padding:15px}
#${ROOT_ID} .dpro-tut-kicker{font-size:10px;font-weight:1000;letter-spacing:.12em;color:#0b8375}
#${ROOT_ID} .dpro-tut-title{margin:5px 0 7px;font-size:20px;line-height:1.35;outline:none}
#${ROOT_ID} .dpro-tut-title:focus-visible{outline:3px solid #f5b942;outline-offset:3px;border-radius:4px}
#${ROOT_ID} .dpro-tut-copy{margin:0;color:#536461;font-size:13px}
#${ROOT_ID} .dpro-tut-note{margin:11px 0 0;padding:9px 10px;border-radius:10px;background:#f1faf8;color:#315a54;font-size:11px;font-weight:750}
#${ROOT_ID} .dpro-tut-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
#${ROOT_ID} button{min-height:44px;border-radius:11px;border:1px solid #b8cbc7;background:#fff;color:#17332f;padding:8px 12px;font:inherit;font-size:12px;font-weight:900;cursor:pointer}
#${ROOT_ID} button[data-primary="1"]{background:#0b8375;border-color:#0b8375;color:#fff}
#${ROOT_ID} button:focus-visible,#dpro-tutorial-launcher:focus-visible{outline:3px solid #f5b942;outline-offset:2px}
#${ROOT_ID} .dpro-tut-status{margin-top:9px;font-size:10px;color:#6d7977}
#dpro-tutorial-launcher{position:fixed;z-index:2147482999;right:max(12px,env(safe-area-inset-right));bottom:max(12px,env(safe-area-inset-bottom));min-height:48px;padding:10px 15px;border:0;border-radius:999px;background:#063f39;color:#fff;box-shadow:0 10px 28px rgba(6,63,57,.28);font:900 13px/1.2 system-ui,-apple-system,"Segoe UI","Noto Sans JP",sans-serif;cursor:pointer}
.${HIGHLIGHT_CLASS}{outline:4px solid #f5b942!important;outline-offset:4px!important;box-shadow:0 0 0 8px rgba(245,185,66,.22)!important;position:relative}
@media(max-width:420px){#${ROOT_ID}{width:calc(100vw - 16px);max-height:calc(100vh - 16px);border-radius:15px}#${ROOT_ID} .dpro-tut-handle{border-radius:14px 14px 0 0}#${ROOT_ID} .dpro-tut-body{padding:13px}#${ROOT_ID} .dpro-tut-title{font-size:18px}}
`;

  let root, launcher, titleEl, targetEl = null, drag = null;

  function addStyle(){
    if (document.getElementById('dpro-tutorial-first10-style')) return;
    const s=document.createElement('style'); s.id='dpro-tutorial-first10-style'; s.textContent=STYLE; document.head.appendChild(s);
  }
  function nowIso(){ return new Date().toISOString(); }
  function cleanState(raw){
    const idx=STEPS.findIndex(s=>s.id===raw?.currentStepId);
    return {
      schemaVersion:'1.1', tutorialVersion:VERSION,
      currentStepId: idx>=0 ? STEPS[idx].id : 'F10-01',
      expectedRoute: idx>=0 ? STEPS[idx].route : STEPS[0].route,
      status:['active','paused','completed','skipped'].includes(raw?.status)?raw.status:'paused',
      updatedAt: raw?.updatedAt || nowIso()
    };
  }
  function loadState(){
    try{return cleanState(JSON.parse(localStorage.getItem(STATE_KEY)||'null'));}catch{return cleanState(null);}
  }
  function saveState(partial){
    const state=cleanState({...loadState(),...partial,updatedAt:nowIso()});
    localStorage.setItem(STATE_KEY,JSON.stringify(state));
    return state;
  }
  function loadPos(){try{const p=JSON.parse(localStorage.getItem(POS_KEY)||'null');return Number.isFinite(p?.x)&&Number.isFinite(p?.y)?p:null;}catch{return null;}}
  function savePos(x,y){localStorage.setItem(POS_KEY,JSON.stringify({x:Math.round(x),y:Math.round(y)}));}
  function currentIndex(){const s=loadState(); const i=STEPS.findIndex(x=>x.id===s.currentStepId); return i<0?0:i;}
  const ROUTE_BASE = new URL('./', document.currentScript?.src || location.href);
  function routeUrl(route){return new URL(String(route||'').replace(/^\/+/,''),ROUTE_BASE);}
  function routePath(route){return routeUrl(route).pathname;}
  function onExpectedRoute(step){return location.pathname===routePath(step.route);}
  function navigateRoute(route){location.href=routeUrl(route).href;}
  function clearHighlight(){if(targetEl){targetEl.classList.remove(HIGHLIGHT_CLASS);targetEl.removeAttribute('data-dpro-tutorial-target');targetEl=null;}}
  function findTarget(step){
    let el=null;
    try{el=document.querySelector(step.primary);}catch{}
    if(!el || !isVisible(el)){try{el=document.querySelector(step.fallback);}catch{}}
    return el;
  }
  function isVisible(el){if(!el)return false;const r=el.getBoundingClientRect();const cs=getComputedStyle(el);return cs.display!=='none'&&cs.visibility!=='hidden'&&r.width>0&&r.height>0;}
  function applyHighlight(step){
    clearHighlight();
    const start=performance.now();
    const tryIt=()=>{
      if(!root || root.hidden) return;
      const el=findTarget(step);
      if(el){targetEl=el;el.classList.add(HIGHLIGHT_CLASS);el.setAttribute('data-dpro-tutorial-target',step.id);avoidTargetCollision(el);return;}
      if(performance.now()-start<2200) setTimeout(tryIt,180);
    };
    tryIt();
  }
  function clampXY(x,y){
    const r=root.getBoundingClientRect();
    const maxX=Math.max(SAFE,innerWidth-r.width-SAFE), maxY=Math.max(SAFE,innerHeight-r.height-SAFE);
    return {x:Math.min(Math.max(SAFE,x),maxX),y:Math.min(Math.max(SAFE,y),maxY)};
  }
  function setPosition(x,y,persist=true){
    if(!root)return;
    root.style.right='auto';root.style.bottom='auto';
    const p=clampXY(x,y);root.style.left=p.x+'px';root.style.top=p.y+'px';
    if(persist) savePos(p.x,p.y);
  }
  function defaultPosition(){
    const r=root.getBoundingClientRect();
    setPosition(Math.max(SAFE,innerWidth-r.width-SAFE),Math.max(SAFE,innerHeight-r.height-SAFE),false);
  }
  function restorePosition(){const p=loadPos(); if(p)setPosition(p.x,p.y,false); else defaultPosition();}
  function overlaps(a,b){return !(a.right<b.left||a.left>b.right||a.bottom<b.top||a.top>b.bottom);}
  function avoidTargetCollision(el){
    if(loadPos()) return;
    requestAnimationFrame(()=>{
      if(!root||!el)return; const rr=root.getBoundingClientRect(), tr=el.getBoundingClientRect(); if(!overlaps(rr,tr))return;
      const candidates=[[SAFE,SAFE],[innerWidth-rr.width-SAFE,SAFE],[SAFE,innerHeight-rr.height-SAFE],[innerWidth-rr.width-SAFE,innerHeight-rr.height-SAFE]];
      const pick=candidates.map(([x,y])=>({x,y,r:{left:x,top:y,right:x+rr.width,bottom:y+rr.height}})).find(c=>!overlaps(c.r,tr));
      if(pick)setPosition(pick.x,pick.y,false);
    });
  }
  function buildUi(){
    if(document.getElementById(ROOT_ID)) return;
    addStyle();
    launcher=document.createElement('button'); launcher.id='dpro-tutorial-launcher'; launcher.type='button'; launcher.textContent='First10'; launcher.addEventListener('click',()=>resume()); document.body.appendChild(launcher);
    root=document.createElement('section'); root.id=ROOT_ID; root.hidden=true; root.setAttribute('role','region'); root.setAttribute('aria-label','REFORM First10 Tutorial'); root.innerHTML=`
      <div class="dpro-tut-handle" id="dpro-tut-handle" role="toolbar" aria-label="Tutorialカード移動ハンドル" tabindex="0">
        <span class="dpro-tut-grip" aria-hidden="true">⠿</span><span class="dpro-tut-step" id="dpro-tut-step"></span>
        <button class="dpro-tut-close" type="button" id="dpro-tut-close" aria-label="Tutorialを閉じる">×</button>
      </div>
      <div class="dpro-tut-body">
        <div class="dpro-tut-kicker">DPRO TUTORIAL / FIRST10</div>
        <h2 class="dpro-tut-title" id="dpro-tut-title" tabindex="-1"></h2>
        <p class="dpro-tut-copy" id="dpro-tut-copy"></p>
        <div class="dpro-tut-note" id="dpro-tut-note">閲覧のみ。入力・送信・保存・状態変更・アップロードはFirst10では行いません。</div>
        <div class="dpro-tut-actions">
          <button type="button" id="dpro-tut-back">戻る</button>
          <button type="button" id="dpro-tut-next" data-primary="1">次へ</button>
          <button type="button" id="dpro-tut-skip">スキップ</button>
          <button type="button" id="dpro-tut-replay">Replay</button>
        </div>
        <div class="dpro-tut-status" id="dpro-tut-status" aria-live="polite"></div>
      </div>`;
    document.body.appendChild(root);
    titleEl=root.querySelector('#dpro-tut-title');
    root.querySelector('#dpro-tut-close').addEventListener('click',pause);
    root.querySelector('#dpro-tut-back').addEventListener('click',back);
    root.querySelector('#dpro-tut-next').addEventListener('click',next);
    root.querySelector('#dpro-tut-skip').addEventListener('click',skip);
    root.querySelector('#dpro-tut-replay').addEventListener('click',replay);
    setupDrag(root.querySelector('#dpro-tut-handle'));
    window.addEventListener('resize',()=>{if(!root.hidden){const r=root.getBoundingClientRect();setPosition(r.left,r.top,false);}});
    window.addEventListener('orientationchange',()=>setTimeout(()=>{if(!root.hidden){const r=root.getBoundingClientRect();setPosition(r.left,r.top,false);}},80));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!root.hidden){e.preventDefault();pause();}});
  }
  function setupDrag(handle){
    handle.addEventListener('pointerdown',e=>{
      if(e.target.closest('button,a,input,select,textarea,label')) return;
      if(e.button!==undefined && e.button!==0) return;
      const r=root.getBoundingClientRect(); drag={id:e.pointerId,dx:e.clientX-r.left,dy:e.clientY-r.top};
      try{handle.setPointerCapture(e.pointerId);}catch{}
      e.preventDefault();
    });
    handle.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;setPosition(e.clientX-drag.dx,e.clientY-drag.dy,false);e.preventDefault();});
    const end=e=>{if(!drag||drag.id!==e.pointerId)return;const r=root.getBoundingClientRect();setPosition(r.left,r.top,true);try{handle.releasePointerCapture(e.pointerId);}catch{}drag=null;};
    handle.addEventListener('pointerup',end);handle.addEventListener('pointercancel',end);
    handle.addEventListener('keydown',e=>{
      const delta=e.shiftKey?24:10; let dx=0,dy=0;
      if(e.key==='ArrowLeft')dx=-delta; else if(e.key==='ArrowRight')dx=delta; else if(e.key==='ArrowUp')dy=-delta; else if(e.key==='ArrowDown')dy=delta; else return;
      const r=root.getBoundingClientRect();setPosition(r.left+dx,r.top+dy,true);e.preventDefault();
    });
  }
  function render(focus=true){
    buildUi();
    const state=loadState();
    if(state.status!=='active'){root.hidden=true;launcher.hidden=false;launcher.textContent=state.status==='completed'?'Replay First10':'Resume First10';clearHighlight();return;}
    const i=currentIndex(), step=STEPS[i];
    if(!onExpectedRoute(step)){navigateRoute(step.route);return;}
    root.hidden=false;launcher.hidden=true;
    root.querySelector('#dpro-tut-step').textContent=`${i+1} / ${STEPS.length}　${step.id}`;
    titleEl.textContent=step.title;
    root.querySelector('#dpro-tut-copy').textContent=step.guidance;
    root.querySelector('#dpro-tut-status').textContent=`現在: ${step.id} / business mutation 0`;
    const backBtn=root.querySelector('#dpro-tut-back'), nextBtn=root.querySelector('#dpro-tut-next'), skipBtn=root.querySelector('#dpro-tut-skip'), replayBtn=root.querySelector('#dpro-tut-replay');
    backBtn.hidden=false; nextBtn.hidden=false; skipBtn.hidden=false;
    backBtn.disabled=i===0;
    nextBtn.textContent=i===STEPS.length-1?'完了':'次へ';
    replayBtn.hidden=i!==STEPS.length-1;
    restorePosition();applyHighlight(step);
    if(focus)setTimeout(()=>titleEl.focus({preventScroll:true}),30);
  }
  function goToIndex(i){
    if(i<0||i>=STEPS.length)return;
    const step=STEPS[i]; saveState({currentStepId:step.id,expectedRoute:step.route,status:'active'});
    if(!onExpectedRoute(step)){navigateRoute(step.route);return;} render();
  }
  function start(){localStorage.removeItem(POS_KEY);saveState({currentStepId:'F10-01',expectedRoute:STEPS[0].route,status:'active'}); if(location.pathname!==routePath(STEPS[0].route)){navigateRoute(STEPS[0].route);return;} render();}
  function resume(){const s=loadState(); if(s.status==='completed')return replay(); if(!localStorage.getItem(STATE_KEY))return start(); saveState({status:'active'});render();}
  function pause(){saveState({status:'paused'});root.hidden=true;launcher.hidden=false;launcher.textContent='Resume First10';clearHighlight();launcher.focus();}
  function skip(){saveState({status:'skipped'});root.hidden=true;launcher.hidden=false;launcher.textContent='Resume First10';clearHighlight();launcher.focus();}
  function back(){goToIndex(currentIndex()-1);}
  function next(){const i=currentIndex(); if(i===STEPS.length-1){saveState({status:'completed'});clearHighlight();root.querySelector('#dpro-tut-step').textContent='10 / 10　COMPLETE';titleEl.textContent='First10 完了';root.querySelector('#dpro-tut-copy').textContent='相談からアフターフォローまでの基本導線を確認しました。ReplayはTutorial状態だけを初期化します。';root.querySelector('#dpro-tut-next').hidden=true;root.querySelector('#dpro-tut-back').hidden=true;root.querySelector('#dpro-tut-skip').hidden=true;root.querySelector('#dpro-tut-replay').hidden=false;root.querySelector('#dpro-tut-status').textContent='COMPLETE / business mutation 0';titleEl.focus({preventScroll:true});return;} goToIndex(i+1);}
  function replay(){localStorage.removeItem(STATE_KEY);localStorage.removeItem(POS_KEY);saveState({currentStepId:'F10-01',expectedRoute:STEPS[0].route,status:'active'});if(location.pathname!==routePath(STEPS[0].route)){navigateRoute(STEPS[0].route);return;}render();}
  function snapshot(){const s=loadState();const i=STEPS.findIndex(x=>x.id===s.currentStepId);const step=STEPS[i<0?0:i];const t=findTarget(step);const rr=root?.getBoundingClientRect();return {version:VERSION,state:s,stepCount:STEPS.length,index:i,targetFound:!!t,targetSelector:t?(t.matches(step.primary)?step.primary:step.fallback):null,card:rr?{left:rr.left,top:rr.top,right:rr.right,bottom:rr.bottom,width:rr.width,height:rr.height}:null,viewport:{innerWidth,innerHeight,documentElementScrollWidth:document.documentElement.scrollWidth,bodyScrollWidth:document.body?.scrollWidth||0}};}

  window.DPRO_REFORM_TUTORIAL={version:VERSION,steps:STEPS,stateKey:STATE_KEY,posKey:POS_KEY,start,resume,pause,skip,next,back,replay,snapshot};
  function init(){buildUi();const raw=localStorage.getItem(STATE_KEY);if(raw){const s=loadState();if(s.status==='active')render(true);else{launcher.textContent=s.status==='completed'?'Replay First10':'Resume First10';}}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
