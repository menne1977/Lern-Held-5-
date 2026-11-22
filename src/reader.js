/* Lesegerät: PDF, ePub, Bilder – Vollbild, Drehen, Buchseiten, Doppelseite, Themen, Lesezeichen, Suche.
   Nur Funktions-Deklarationen (kein Top-Level-let/const). */
function rdThemes(){return{light:{n:'Hell',bg:'#f8fafc',fg:'#0f172a',f:''},sepia:{n:'Sepia',bg:'#f4ecd8',fg:'#433422',f:'sepia(.45) contrast(.95)'},dark:{n:'Dunkel',bg:'#1e1e1e',fg:'#d4d4d4',f:'invert(.9) hue-rotate(180deg)'},black:{n:'Schwarz',bg:'#000',fg:'#b3b3b3',f:'invert(1) hue-rotate(180deg) brightness(.85)'}}}
function rdCfg(){const d={theme:'light',bright:1,font:'serif',size:18,lh:1.55,margin:22,dbl:'auto',anim:true};try{return Object.assign(d,JSON.parse(localStorage.getItem('sh5rd')||'{}'))}catch(e){return d}}
function rdCfgSet(c){try{localStorage.setItem('sh5rd',JSON.stringify(c))}catch(e){}}
function rdPosGet(id){let a={};try{a=JSON.parse(localStorage.getItem('sh5libpos')||'{}')}catch(e){}const p=a[id];return p&&typeof p==='object'?p:(typeof p==='number'?{p:p,c:p}:{})}
function rdPosSet(id,o){try{const a=JSON.parse(localStorage.getItem('sh5libpos')||'{}');a[id]=Object.assign(rdPosGet(id),o);localStorage.setItem('sh5libpos',JSON.stringify(a))}catch(e){}}
function rdBmGet(id){try{return(JSON.parse(localStorage.getItem('sh5libbm')||'{}')[id])||[]}catch(e){return[]}}
function rdBmSet(id,l){try{const a=JSON.parse(localStorage.getItem('sh5libbm')||'{}');if(l.length)a[id]=l;else delete a[id];localStorage.setItem('sh5libbm',JSON.stringify(a))}catch(e){}}
function rdBtn(id,t,x){return `<button id="${id}" style="background:rgba(15,23,42,.78);color:#fff;border:0;border-radius:10px;padding:9px 13px;font-size:1.05rem;min-width:44px;${x||''}">${t}</button>`}
async function rdChapClean(doc,path,z){
  doc.querySelectorAll('script,style,link,iframe,object,embed,form,meta,title,audio,video').forEach(n=>n.remove());
  doc.querySelectorAll('*').forEach(n=>{[...n.attributes].forEach(a=>{if(/^on/i.test(a.name)||/^\s*javascript:/i.test(a.value)||a.name==='style'||a.name==='class')n.removeAttribute(a.name)});if(n.tagName==='A')n.removeAttribute('href')});
  const bd=path.indexOf('/')>=0?path.slice(0,path.lastIndexOf('/')):'';
  for(const im of [...doc.querySelectorAll('img,image')]){
    const at=im.tagName==='IMG'?'src':(im.hasAttribute('href')?'href':'xlink:href'),pp=epubPath(bd,im.getAttribute(at));
    if(pp){try{const d=await z.get(pp);if(d){const e=(pp.split('.').pop()||'png').toLowerCase(),mt=e==='svg'?'image/svg+xml':e==='jpg'?'image/jpeg':'image/'+e;
      let s='';for(let i=0;i<d.length;i+=32768)s+=String.fromCharCode.apply(null,d.subarray(i,i+32768));im.setAttribute(at,'data:'+mt+';base64,'+btoa(s))}}catch(e){}}}
  return(doc.body?doc.body.innerHTML:'')||'<p>(leere Seite)</p>'}
async function readerOpen(kind,blob,m){
  if(window.__rdOpen)return;window.__rdOpen=true;
  const cfg=rdCfg(),TH=rdThemes(),pos0=rdPosGet(m.id);
  const R={rot:pos0.rot||0,zoom:1,rz:1,bw:1,bh:1,px:0,py:0,ui:true,cur:0,N:1,spreads:[],token:0,tasks:[],closed:false,panel:'',toc:[],spine:[],ch:0,pi:0,pages:1,frac:0,cache:{},dbl:false};
  const ov=document.createElement('div');ov.id='rdOV';
  ov.style.cssText='position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;overflow:hidden;font-family:system-ui,sans-serif;-webkit-user-select:none;user-select:none';
  ov.innerHTML=`<div id="rdSt" style="position:absolute;inset:0;overflow:hidden;touch-action:none"><div id="rdPg" style="position:absolute;left:0;top:0;transform-origin:0 0;will-change:transform"><div id="rdIn" style="display:flex"></div></div><div id="rdTx" style="position:absolute;display:none;overflow:hidden"></div></div>
  <div id="rdDim" style="position:absolute;inset:0;background:#000;pointer-events:none;opacity:0"></div>
  <div id="rdTop" style="position:absolute;top:0;left:0;right:0;display:flex;gap:6px;align-items:center;padding:calc(env(safe-area-inset-top) + 6px) 8px 6px;background:linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,0));z-index:3">${rdBtn('rdX','✕')}<span id="rdTi" style="flex:1;color:#fff;font-size:.9rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-shadow:0 1px 3px #000"></span>${rdBtn('rdBm','☆')}${rdBtn('rdQ','🔍')}${rdBtn('rdTc','☰')}${rdBtn('rdSe','⚙')}</div>
  <div id="rdBot" style="position:absolute;bottom:0;left:0;right:0;padding:8px 10px calc(env(safe-area-inset-bottom) + 8px);background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.6));z-index:3"><div style="display:flex;gap:8px;align-items:center">${rdBtn('rdP','◀')}<input id="rdSl" type="range" min="0" max="1" value="0" style="flex:1"> ${rdBtn('rdN','▶')}${rdBtn('rdRl','↺')}${rdBtn('rdRr','↻')}</div><div id="rdLb" style="color:#fff;text-align:center;font-size:.85rem;margin-top:4px;text-shadow:0 1px 3px #000"></div></div>
  <div id="rdPn" style="position:absolute;left:0;right:0;bottom:0;max-height:75%;overflow:auto;background:#fff;color:#0f172a;border-radius:16px 16px 0 0;padding:12px 14px calc(env(safe-area-inset-bottom) + 14px);z-index:5;display:none;box-shadow:0 -4px 24px rgba(0,0,0,.4)"></div>`;
  document.body.appendChild(ov);document.body.style.overflow='hidden';
  const $r=s=>ov.querySelector(s),st=$r('#rdSt'),pgEl=$r('#rdPg'),pgIn=$r('#rdIn'),tx=$r('#rdTx');
  $r('#rdTi').textContent=m.name;
  try{history.pushState({rd:1},'')}catch(e){}
  let wl=null;try{if(navigator.wakeLock)wl=await navigator.wakeLock.request('screen')}catch(e){}
  const W=()=>st.clientWidth||innerWidth,H=()=>st.clientHeight||innerHeight;
  /* ---- Themen ---- */
  function applyTheme(){const t=TH[cfg.theme]||TH.light;ov.style.background=t.bg;st.style.background=t.bg;$r('#rdDim').style.opacity=String(Math.max(0,Math.min(.75,1-cfg.bright)));tx.style.color=t.fg;
    pgEl.querySelectorAll('canvas').forEach(c=>{c.style.filter=t.f||'none'})}
  /* ---- Quelle ---- */
  let src=null,epub=null;
  function fail(msg){$r('#rdLb').textContent=msg;st.insertAdjacentHTML('beforeend','<p style="color:#fff;padding:60px 20px;text-align:center">'+esc(msg)+'</p>')}
  try{
    if(kind==='pdf'){const L=await pdfLib(),doc=await L.getDocument({data:new Uint8Array(await blob.arrayBuffer()),isEvalSupported:false}).promise;
      R.N=doc.numPages;src={n:R.N,async page(i){const p=await doc.getPage(i);return{size(rot){const v=p.getViewport({scale:1,rotation:(p.rotate+rot)%360});return[v.width,v.height]},draw(cv,sc,rot){const v=p.getViewport({scale:sc,rotation:(p.rotate+rot)%360});cv.width=Math.floor(v.width);cv.height=Math.floor(v.height);const c=cv.getContext('2d');c.fillStyle='#fff';c.fillRect(0,0,cv.width,cv.height);const t=p.render({canvasContext:c,viewport:v});R.tasks.push(t);return t.promise.then(()=>p.cleanup())}}},doc};
    }else if(kind==='img'){
      let bmp;try{bmp=await createImageBitmap(blob)}catch(e){bmp=await new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=()=>no(new Error('Bild defekt'));i.src=URL.createObjectURL(blob)})}
      const iw=bmp.width||bmp.naturalWidth,ih=bmp.height||bmp.naturalHeight;R.N=1;
      src={n:1,async page(){return{size(rot){return rot%180?[ih,iw]:[iw,ih]},draw(cv,sc,rot){const w=iw*sc,h=ih*sc,sw=rot%180?h:w,sh=rot%180?w:h;cv.width=Math.max(1,Math.floor(sw));cv.height=Math.max(1,Math.floor(sh));const c=cv.getContext('2d');c.fillStyle='#fff';c.fillRect(0,0,cv.width,cv.height);c.save();c.translate(cv.width/2,cv.height/2);c.rotate(rot*Math.PI/180);c.drawImage(bmp,-w/2,-h/2,w,h);c.restore();return Promise.resolve()}}}};
    }else if(kind==='epub'){epub=await rdEpubInit(blob,m);R.spine=epub.spine;R.N=epub.spine.length;R.toc=epub.toc;$r('#rdTi').textContent=epub.title||m.name;$r('#rdRl').style.display=$r('#rdRr').style.display='none'}
  }catch(e){fail('Öffnen hat nicht geklappt: '+(e.message||e));}
  /* ---- Doppelseite ---- */
  function useDbl(){return kind==='pdf'&&R.N>2&&(cfg.dbl==='on'||(cfg.dbl==='auto'&&W()>=700&&W()>H()*1.15))||kind==='epub'&&(cfg.dbl==='on'||(cfg.dbl==='auto'&&W()>=800&&W()>H()*1.15))}
  function buildSpreads(){R.dbl=useDbl();const s=[];if(kind==='pdf'&&R.dbl){s.push([1]);for(let i=2;i<=R.N;i+=2)s.push(i+1<=R.N?[i,i+1]:[i])}else for(let i=1;i<=R.N;i++)s.push([i]);R.spreads=s}
  const spreadOf=pg=>{const i=R.spreads.findIndex(x=>x.indexOf(pg)>=0);return i<0?0:i};
  /* ---- Anzeige PDF/Bild ---- */
  /* Ansicht: Grundgröße bw×bh (passt auf den Schirm), Zoom R.zoom, Verschiebung R.px/R.py */
  function clampV(){const cw=R.bw*R.zoom,ch=R.bh*R.zoom,w=W(),h=H();
    R.px=cw<=w?(w-cw)/2:Math.min(0,Math.max(w-cw,R.px));R.py=ch<=h?(h-ch)/2:Math.min(0,Math.max(h-ch,R.py))}
  function applyV(){clampV();pgEl.style.transform=`translate(${R.px}px,${R.py}px) scale(${R.zoom/R.rz})`}
  function zoomAt(z,cx,cy){z=Math.max(1,Math.min(6,z));const fx=(cx-R.px)/R.zoom,fy=(cy-R.py)/R.zoom;R.zoom=z;R.px=cx-fx*z;R.py=cy-fy*z;applyV();label();sharpLater()}
  let shT=0;function sharpLater(){clearTimeout(shT);shT=setTimeout(()=>{if(Math.abs(R.zoom-R.rz)>.05||R.zoom===1&&R.rz!==1)draw(0,true)},280)}
  async function draw(dir,keep){
    if(R.closed||!src)return;const tok=++R.token;R.tasks.forEach(t=>{try{t.cancel()}catch(e){}});R.tasks=[];
    const sp=R.spreads[R.cur]||[1];
    try{
      const pages=[];for(const i of sp)pages.push(await src.page(i));if(tok!==R.token)return;
      const sizes=pages.map(p=>p.size(R.rot)),totW=sizes.reduce((a,s)=>a+s[0],0),maxH=Math.max(...sizes.map(s=>s[1]));
      const fit=Math.min(W()/totW,H()/maxH);R.bw=totW*fit;R.bh=maxH*fit;
      if(!keep){R.zoom=1;R.px=0;R.py=0}
      const rz=R.zoom,sc=fit*rz;let dpr=Math.min(window.devicePixelRatio||1,2);
      const lim=R.zoom>1?1.2e7:7e6,px=totW*sc*maxH*sc*dpr*dpr;if(px>lim)dpr=Math.sqrt(lim/(totW*sc*maxH*sc));
      const cvs=sp.map(()=>{const c=document.createElement('canvas');c.style.cssText='display:block;background:#fff;flex:none';return c});
      for(let k=0;k<pages.length;k++){await pages[k].draw(cvs[k],sc*dpr,R.rot);if(tok!==R.token)return;cvs[k].style.width=(sizes[k][0]*sc)+'px';cvs[k].style.height=(sizes[k][1]*sc)+'px'}
      if(tok!==R.token)return;
      pgIn.innerHTML='';cvs.forEach(c=>pgIn.appendChild(c));R.rz=rz;applyV();applyTheme();
      if(cfg.anim&&dir){pgIn.style.animation='none';void pgIn.offsetWidth;pgIn.style.animation='rdIn'+(dir>0?'R':'L')+' .25s ease-out'}
      label();rdPosSet(m.id,{p:sp[0],rot:R.rot})
    }catch(e){if(tok===R.token&&!/cancel/i.test(e&&e.message||''))$r('#rdLb').textContent='Seite konnte nicht gezeichnet werden.'}
  }
  /* ---- Anzeige ePub (Seiten wie im Buch) ---- */
  async function chapter(i){if(R.cache[i]!==undefined)return R.cache[i];const h=await epub.html(i);R.cache[i]=h;return h}
  async function layoutEpub(goLast){
    const pad=cfg.margin,w=Math.max(120,W()-pad*2),h=Math.max(120,H()-70);const cols=R.dbl?2:1,gap=R.dbl?pad*2:0,cw=(w-gap*(cols-1))/cols;
    tx.style.cssText=`position:absolute;display:block;overflow:hidden;left:${pad}px;top:34px;width:${w}px;height:${h}px;color:${(TH[cfg.theme]||TH.light).fg}`;
    const ft=cfg.font==='sans'?'system-ui,Arial,sans-serif':'Georgia,"Times New Roman",serif';
    const html=await chapter(R.ch);if(R.closed)return;
    tx.innerHTML=`<div id="rdCo" style="height:${h}px;column-width:${cw}px;column-count:${cols};column-gap:${gap}px;column-fill:auto;font-family:${ft};font-size:${cfg.size}px;line-height:${cfg.lh};text-align:justify;hyphens:auto;-webkit-hyphens:auto;overflow-wrap:anywhere;transition:${cfg.anim?'transform .22s ease':'none'}">${html}</div>`;
    const co=tx.querySelector('#rdCo');co.querySelectorAll('img,svg').forEach(i=>{i.style.maxWidth='100%';i.style.maxHeight=(h-10)+'px';i.style.height='auto';i.style.breakInside='avoid'});
    co.querySelectorAll('h1,h2,h3').forEach(x=>{x.style.lineHeight='1.25';x.style.textAlign='left'});
    await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    R.step=(cw+gap)*cols;R.pages=Math.max(1,Math.ceil((co.scrollWidth-1)/R.step));
    R.pi=goLast?R.pages-1:Math.min(R.pi,R.pages-1);moveEpub(false)}
  function moveEpub(anim){const co=tx.querySelector('#rdCo');if(!co)return;co.style.transition=anim&&cfg.anim?'transform .22s ease':'none';co.style.transform=`translateX(${-R.pi*R.step}px)`;label();rdPosSet(m.id,{c:R.ch,f:R.pages>1?R.pi/(R.pages-1):0})}
  async function epubGo(d){
    if(d>0){if(R.pi+1<R.pages){R.pi++;moveEpub(true)}else if(R.ch+1<R.N){R.ch++;R.pi=0;await layoutEpub(false)}}
    else{if(R.pi>0){R.pi--;moveEpub(true)}else if(R.ch>0){R.ch--;await layoutEpub(true)}}}
  /* ---- Beschriftung, Schieber ---- */
  function label(){
    const sl=$r('#rdSl');
    if(kind==='epub'){const t=R.N?((R.ch+R.pi/Math.max(1,R.pages))/R.N):0;sl.max='1000';sl.value=String(Math.round(t*1000));$r('#rdLb').textContent='Kapitel '+(R.ch+1)+' von '+R.N+' · Seite '+(R.pi+1)+' von '+R.pages+' · '+Math.round(t*100)+' %'}
    else{const sp=R.spreads[R.cur]||[1];sl.max=String(Math.max(1,R.spreads.length-1));sl.value=String(R.cur);sl.style.display=R.N>1?'':'none';
      $r('#rdLb').textContent=(R.N>1?'Seite '+sp.join('–')+' von '+R.N:'')+(R.rot?' · gedreht '+R.rot+'°':'')+(R.zoom>1?' · '+Math.round(R.zoom*100)+' %':'')}
    const here=bmHere();$r('#rdBm').textContent=here?'★':'☆'}
  function posNow(){return kind==='epub'?{c:R.ch,f:R.pages>1?R.pi/(R.pages-1):0}:{p:(R.spreads[R.cur]||[1])[0]}}
  function bmHere(){return rdBmGet(m.id).some(b=>kind==='epub'?(b.c===R.ch&&Math.abs((b.f||0)-(R.pages>1?R.pi/(R.pages-1):0))<(1/Math.max(1,R.pages)))&&true:b.p===(R.spreads[R.cur]||[1])[0]||(R.spreads[R.cur]||[]).indexOf(b.p)>=0)}
  /* ---- Navigation ---- */
  async function turn(d){
    if(kind==='epub'){await epubGo(d);return}
    const n=R.cur+d;if(n<0||n>=R.spreads.length)return;R.cur=n;draw(d)}
  async function gotoPage(p){if(kind==='epub'){return}p=Math.max(1,Math.min(R.N,p));R.cur=spreadOf(p);draw(0)}
  async function gotoEpub(c,f,query){R.ch=Math.max(0,Math.min(R.N-1,c));R.pi=0;await layoutEpub(false);
    if(query){const co=tx.querySelector('#rdCo');try{const tw=document.createTreeWalker(co,NodeFilter.SHOW_TEXT);let n,q=query.toLowerCase();while((n=tw.nextNode())){const ix=n.nodeValue.toLowerCase().indexOf(q);if(ix>=0){const rg=document.createRange();rg.setStart(n,ix);rg.setEnd(n,ix+q.length);const r=rg.getClientRects()[0];if(r){const base=tx.getBoundingClientRect().left;R.pi=Math.max(0,Math.min(R.pages-1,Math.floor((r.left-base+R.pi*R.step)/R.step)))}break}}}catch(e){}moveEpub(false)}
    else if(f){R.pi=Math.round(f*(R.pages-1));moveEpub(false)}}
  /* ---- Gesten: 1 Finger = schieben (gezoomt) / blättern, 2 Finger = zoomen, Doppeltipp = Zoom ---- */
  const ptrs=new Map();let g=null,lastTap=0,lastTapX=0,lastTapY=0,tapT=0;
  const mid=()=>{const a=[...ptrs.values()];return[(a[0][0]+a[1][0])/2,(a[0][1]+a[1][1])/2,Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1])||1]};
  const rel=(x,y)=>{const r=st.getBoundingClientRect();return[x-r.left,y-r.top]};
  st.addEventListener('pointerdown',e=>{try{st.setPointerCapture(e.pointerId)}catch(x){}ptrs.set(e.pointerId,rel(e.clientX,e.clientY));
    if(ptrs.size===1){const p=ptrs.get(e.pointerId);g={mode:'one',x0:p[0],y0:p[1],px0:R.px,py0:R.py,t0:Date.now(),moved:false,multi:false}}
    else if(ptrs.size===2&&kind!=='epub'){const [mx,my,d]=mid();g={mode:'pinch',d0:d,z0:R.zoom,fx:(mx-R.px)/R.zoom,fy:(my-R.py)/R.zoom,multi:true}}
    else if(g)g.multi=true});
  st.addEventListener('pointermove',e=>{if(!ptrs.has(e.pointerId)||!g)return;ptrs.set(e.pointerId,rel(e.clientX,e.clientY));
    if(g.mode==='pinch'&&ptrs.size>=2){const [mx,my,d]=mid();R.zoom=Math.max(1,Math.min(6,g.z0*d/g.d0));R.px=mx-g.fx*R.zoom;R.py=my-g.fy*R.zoom;applyV();label()}
    else if(g.mode==='one'){const p=ptrs.get(e.pointerId),dx=p[0]-g.x0,dy=p[1]-g.y0;if(Math.abs(dx)>8||Math.abs(dy)>8)g.moved=true;
      if(R.zoom>1.01&&kind!=='epub'){R.px=g.px0+dx;R.py=g.py0+dy;applyV()}}});
  const pend=e=>{if(!ptrs.has(e.pointerId))return;const p=ptrs.get(e.pointerId);ptrs.delete(e.pointerId);if(!g)return;
    if(g.mode==='pinch'){if(ptrs.size===1){const q2=[...ptrs.values()][0];g={mode:'one',x0:q2[0],y0:q2[1],px0:R.px,py0:R.py,t0:Date.now(),moved:true,multi:true}}if(R.zoom<1.05&&!ptrs.size){R.zoom=1;applyV()}sharpLater();return}
    if(ptrs.size)return;const gg=g;g=null;if(R.panel)return;
    const dx=p[0]-gg.x0,dy=p[1]-gg.y0,dt=Date.now()-gg.t0;
    if(gg.multi){sharpLater();return}
    if(!gg.moved&&dt<450){
      const now=Date.now();
      if(kind!=='epub'&&now-lastTap<320&&Math.hypot(p[0]-lastTapX,p[1]-lastTapY)<40){clearTimeout(tapT);lastTap=0;if(R.zoom>1.05){R.zoom=1;applyV();label();sharpLater()}else zoomAt(2.5,p[0],p[1]);return}
      lastTap=now;lastTapX=p[0];lastTapY=p[1];const x=p[0]/W();
      clearTimeout(tapT);tapT=setTimeout(()=>{if(R.zoom>1.05)toggleUi();else if(x<.25)turn(-1);else if(x>.75)turn(1);else toggleUi()},kind==='epub'?0:300);return}
    if(R.zoom>1.05&&kind!=='epub'){const cw=R.bw*R.zoom;if(Math.abs(dx)>90&&Math.abs(dx)>Math.abs(dy)*1.5&&((dx<0&&gg.px0<=W()-cw+2)||(dx>0&&gg.px0>=-2)))turn(dx<0?1:-1);return}
    if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.4)turn(dx<0?1:-1)};
  st.addEventListener('pointerup',pend);st.addEventListener('pointercancel',e=>{ptrs.delete(e.pointerId);if(!ptrs.size){g=null;sharpLater()}});
  st.addEventListener('wheel',e=>{if(kind==='epub')return;e.preventDefault();const [x,y]=rel(e.clientX,e.clientY);
    if(e.ctrlKey)zoomAt(R.zoom*(e.deltaY<0?1.12:.9),x,y);else if(R.zoom>1){R.px-=e.deltaX;R.py-=e.deltaY;applyV()}else if(Math.abs(e.deltaY)>30)turn(e.deltaY>0?1:-1)},{passive:false});
  function toggleUi(){R.ui=!R.ui;$r('#rdTop').style.display=$r('#rdBot').style.display=R.ui?'':'none'}
  const key=e=>{if(R.panel)return;if(e.key==='ArrowRight'||e.key==='PageDown'||e.key===' ')turn(1);else if(e.key==='ArrowLeft'||e.key==='PageUp')turn(-1);else if(e.key==='Escape')close()};
  document.addEventListener('keydown',key);
  /* ---- Schließen ---- */
  function close(fromPop){
    if(R.closed)return;R.closed=true;R.token++;R.tasks.forEach(t=>{try{t.cancel()}catch(e){}});
    document.removeEventListener('keydown',key);window.removeEventListener('popstate',pop);window.removeEventListener('resize',onRes);window.removeEventListener('hashchange',hc);
    try{if(src&&src.doc)src.doc.destroy()}catch(e){}try{if(wl)wl.release()}catch(e){}
    ov.remove();document.body.style.overflow='';window.__rdOpen=false;
    if(fromPop!==true){try{if(history.state&&history.state.rd)history.back()}catch(e){}}}
  const pop=()=>close(true),hc=()=>close(true);window.addEventListener('popstate',pop);window.addEventListener('hashchange',hc);
  /* ---- Größenänderung / Drehen des Geräts ---- */
  let rt=0;const onRes=()=>{clearTimeout(rt);rt=setTimeout(async()=>{if(R.closed)return;const pg=(R.spreads[R.cur]||[1])[0];if(kind==='epub'){const was=R.dbl;R.dbl=useDbl();R.cache={};await layoutEpub(false)}else{buildSpreads();R.cur=spreadOf(pg);draw(0)}},250)};window.addEventListener('resize',onRes);
  /* ---- Panel ---- */
  const pn=$r('#rdPn');
  function panel(tab){
    if(R.panel===tab){R.panel='';pn.style.display='none';return}
    R.panel=tab;pn.style.display='block';
    const tabs=[['toc','☰ Inhalt'],['bm','⭐ Lesezeichen'],['q','🔍 Suche'],['set','⚙ Anzeige']];
    const head=`<div style="display:flex;gap:6px;margin-bottom:10px;position:sticky;top:0;background:#fff;padding-bottom:6px">${tabs.map(t=>`<button data-t="${t[0]}" style="flex:1;padding:8px 4px;border-radius:10px;border:1px solid #cbd5e1;background:${t[0]===tab?'#2563eb':'#fff'};color:${t[0]===tab?'#fff':'#0f172a'};font-size:.8rem">${t[1]}</button>`).join('')}<button id="rdPc" style="padding:8px 12px;border-radius:10px;border:1px solid #cbd5e1;background:#fff">✕</button></div>`;
    const body=tab==='toc'?pToc():tab==='bm'?pBm():tab==='q'?pQ():pSet();
    pn.innerHTML=head+`<div id="rdPb">${body.h}</div>`;
    pn.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{R.panel='';panel(b.dataset.t)});
    pn.querySelector('#rdPc').onclick=()=>{R.panel='';pn.style.display='none'};
    body.w&&body.w()}
  const itm=(a,t,sub)=>`<button ${a} style="display:block;width:100%;text-align:left;padding:10px 8px;border:0;border-bottom:1px solid #e2e8f0;background:none;color:#0f172a;font-size:.95rem"><b>${esc(t)}</b>${sub?`<div style="color:#64748b;font-size:.8rem;margin-top:2px">${sub}</div>`:''}</button>`;
  function pToc(){
    if(kind==='img')return{h:'<p>Ein Bild hat kein Inhaltsverzeichnis.</p>'};
    if(kind==='epub'){const l=R.toc.length?R.toc:R.spine.map((x,i)=>({t:'Kapitel '+(i+1),c:i}));
      return{h:l.map((x,i)=>itm(`data-c="${x.c}"`,(x.d?'   ':'')+x.t,'')).join(''),w(){pn.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{R.panel='';pn.style.display='none';gotoEpub(+b.dataset.c,0)})}}}
    return{h:'<p class="hint" id="rdOl">Lade Inhaltsverzeichnis …</p>',async w(){
      try{const ol=await src.doc.getOutline();const el=pn.querySelector('#rdOl');if(!el)return;
        if(!ol||!ol.length){el.innerHTML='Dieses PDF hat kein Inhaltsverzeichnis. Nutze den Schieber unten oder „Seite …“ im Reiter Suche.';return}
        const items=[];const walk=async(a,d)=>{for(const o of a){let p=0;try{const dest=typeof o.dest==='string'?await src.doc.getDestination(o.dest):o.dest;if(dest&&dest[0]!=null)p=(typeof dest[0]==='object'?await src.doc.getPageIndex(dest[0]):dest[0])+1}catch(e){}items.push([o.title,p,d]);if(o.items&&o.items.length)await walk(o.items,d+1)}};await walk(ol,0);
        el.outerHTML=items.map((x,i)=>itm(`data-p="${x[1]}"`,'  '.repeat(x[2])+x[0],x[1]?'Seite '+x[1]:'')).join('');
        pn.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{const p=+b.dataset.p;if(p){R.panel='';pn.style.display='none';gotoPage(p)}})}catch(e){const el=pn.querySelector('#rdOl');if(el)el.textContent='Inhaltsverzeichnis nicht lesbar.'}}}}
  function pBm(){const l=rdBmGet(m.id);
    return{h:`<button id="rdBa" style="width:100%;padding:12px;border-radius:10px;border:0;background:#2563eb;color:#fff;font-size:1rem;margin-bottom:8px">⭐ Lesezeichen hier setzen / entfernen</button>${l.length?l.map((b,i)=>`<div style="display:flex;gap:6px;border-bottom:1px solid #e2e8f0;align-items:center"><button data-g="${i}" style="flex:1;text-align:left;padding:10px 6px;border:0;background:none;color:#0f172a">${esc(b.l||'Lesezeichen')}</button><button data-r="${i}" style="border:0;background:none;color:#dc2626;font-size:1.1rem;padding:8px">🗑</button></div>`).join(''):'<p class="hint">Noch keine Lesezeichen.</p>'}`,
      w(){pn.querySelector('#rdBa').onclick=()=>{toggleBm();R.panel='';panel('bm')};
        pn.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{const x=l[+b.dataset.g];R.panel='';pn.style.display='none';if(kind==='epub')gotoEpub(x.c,x.f);else gotoPage(x.p)});
        pn.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{const a=rdBmGet(m.id);a.splice(+b.dataset.r,1);rdBmSet(m.id,a);label();R.panel='';panel('bm')})}}}
  function toggleBm(){const l=rdBmGet(m.id);
    if(bmHere()){const keep=l.filter(b=>!(kind==='epub'?(b.c===R.ch&&Math.abs((b.f||0)-(R.pages>1?R.pi/(R.pages-1):0))<(1/Math.max(1,R.pages))):((R.spreads[R.cur]||[]).indexOf(b.p)>=0)));rdBmSet(m.id,keep)}
    else{const p=posNow();p.l=kind==='epub'?('Kapitel '+(R.ch+1)+' · Seite '+(R.pi+1)+' · '+(R.toc.find(x=>x.c===R.ch)||{t:''}).t).replace(/ · $/,''):'Seite '+p.p;p.d=Date.now();l.push(p);rdBmSet(m.id,l)}label()}
  function pQ(){return{h:`${kind!=='epub'&&kind!=='img'?`<div style="display:flex;gap:6px;margin-bottom:10px"><input id="rdJp" type="number" min="1" max="${R.N}" placeholder="Zu Seite … (1–${R.N})" style="flex:1;padding:10px;border:1px solid #cbd5e1;border-radius:10px"><button id="rdJg" style="padding:10px 14px;border-radius:10px;border:0;background:#2563eb;color:#fff">Los</button></div>`:''}${kind==='img'?'<p>Bei einem Bild gibt es nichts zu suchen.</p>':`<div style="display:flex;gap:6px;margin-bottom:8px"><input id="rdQi" placeholder="Suchwort" style="flex:1;padding:10px;border:1px solid #cbd5e1;border-radius:10px"><button id="rdQg" style="padding:10px 14px;border-radius:10px;border:0;background:#2563eb;color:#fff">Suchen</button></div><div id="rdQr" class="hint"></div>`}`,
    w(){const jg=pn.querySelector('#rdJg');if(jg)jg.onclick=()=>{const v=parseInt(pn.querySelector('#rdJp').value,10);if(v>=1&&v<=R.N){R.panel='';pn.style.display='none';gotoPage(v)}};
      const go=pn.querySelector('#rdQg');if(!go)return;const inp=pn.querySelector('#rdQi'),out=pn.querySelector('#rdQr');
      const run=async()=>{const q=inp.value.trim();if(q.length<2){out.textContent='Bitte mindestens 2 Buchstaben eingeben.';return}
        out.textContent='Suche …';const res=[];let seenText=false;
        try{if(kind==='epub'){for(let i=0;i<R.N&&res.length<60;i++){const h=await chapter(i);const t=h.replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/\s+/g,' ');if(t.trim())seenText=true;let at=0,lo=t.toLowerCase(),ql=q.toLowerCase(),k;while((k=lo.indexOf(ql,at))>=0&&res.length<60){res.push({c:i,s:t.slice(Math.max(0,k-30),k+q.length+40)});at=k+ql.length;if(res.filter(r=>r.c===i).length>=5)break}if(!out.isConnected)return;out.textContent='Suche … '+Math.round((i+1)/R.N*100)+' %'}}
          else{const lim=Math.min(R.N,600);for(let i=1;i<=lim&&res.length<60;i++){const pg=await src.doc.getPage(i),tc=await pg.getTextContent(),t=tc.items.map(x=>x.str).join(' ');if(t.trim())seenText=true;const k=t.toLowerCase().indexOf(q.toLowerCase());if(k>=0)res.push({p:i,s:t.slice(Math.max(0,k-30),k+q.length+40)});pg.cleanup();if(!out.isConnected)return;if(i%5===0)out.textContent='Suche … Seite '+i+' von '+lim}}}catch(e){out.textContent='Suche abgebrochen.';return}
        out.innerHTML=res.length?res.map((r,i)=>itm(`data-s="${i}"`,r.c!==undefined?'Kapitel '+(r.c+1):'Seite '+r.p,esc(r.s))).join(''):(seenText?'Nichts gefunden.':'In diesem PDF gibt es keinen durchsuchbaren Text (es ist ein Scan aus Bildern).');
        out.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{const r=res[+b.dataset.s];R.panel='';pn.style.display='none';if(r.c!==undefined)gotoEpub(r.c,0,q);else gotoPage(r.p)})};
      go.onclick=run;inp.onkeydown=e=>{if(e.key==='Enter')run()}}}}
  function pSet(){
    const th=Object.keys(TH).map(k=>`<button data-th="${k}" style="flex:1;padding:12px 4px;border-radius:10px;border:2px solid ${cfg.theme===k?'#2563eb':'#cbd5e1'};background:${TH[k].bg};color:${TH[k].fg}">${TH[k].n}</button>`).join('');
    const row=(t,x)=>`<div style="margin:10px 0"><div style="font-weight:700;margin-bottom:6px">${t}</div>${x}</div>`;
    const bt=(id,t)=>`<button id="${id}" style="padding:10px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#fff;color:#0f172a;margin-right:6px">${t}</button>`;
    return{h:row('Farbe',`<div style="display:flex;gap:6px">${th}</div>`)+row('Helligkeit',`<input id="rdBr" type="range" min="25" max="100" value="${Math.round(cfg.bright*100)}" style="width:100%">`)+
      (kind==='epub'?row('Schrift',bt('rdF1','A−')+bt('rdF2','A+')+bt('rdFs','Serif / Sans'))+row('Zeilenabstand &amp; Rand',bt('rdL1','Enger')+bt('rdL2','Weiter')+bt('rdM1','Schmaler Rand')+bt('rdM2','Breiter Rand')):row('Drehen &amp; Zoom',bt('rdR1','↺ 90°')+bt('rdR2','↻ 90°')+bt('rdZ1','🔍−')+bt('rdZ2','🔍+')+bt('rdZ0','Zurück auf 100 %')))+
      row('Doppelseite (Buch aufgeschlagen)',`<div style="display:flex;gap:6px">${['auto','on','off'].map(v=>`<button data-db="${v}" style="flex:1;padding:10px;border-radius:10px;border:2px solid ${cfg.dbl===v?'#2563eb':'#cbd5e1'};background:#fff;color:#0f172a">${{auto:'Automatisch',on:'Immer',off:'Aus'}[v]}</button>`).join('')}</div><p class="hint">„Automatisch“ zeigt zwei Seiten, wenn das Gerät quer liegt.</p>`)+
      row('Blättern',`<label><input type="checkbox" id="rdAn" ${cfg.anim?'checked':''}> Blätter-Animation</label>`)+
      row('Bildschirm',bt('rdFu','⛶ Statusleiste aus / an')),
      w(){const sv=()=>rdCfgSet(cfg),re=async()=>{R.cache={};if(kind==='epub')await layoutEpub(false);else{buildSpreads();draw(0)}};
        pn.querySelectorAll('[data-th]').forEach(b=>b.onclick=()=>{cfg.theme=b.dataset.th;sv();applyTheme();panel('set');R.panel='';panel('set')});
        pn.querySelector('#rdBr').oninput=e=>{cfg.bright=e.target.value/100;sv();applyTheme()};
        pn.querySelectorAll('[data-db]').forEach(b=>b.onclick=async()=>{cfg.dbl=b.dataset.db;sv();const pg=(R.spreads[R.cur]||[1])[0];R.dbl=useDbl();if(kind==='epub')await re();else{buildSpreads();R.cur=spreadOf(pg);draw(0)}R.panel='';panel('set')});
        const q=(id,f)=>{const e=pn.querySelector('#'+id);if(e)e.onclick=f};
        q('rdF1',()=>{cfg.size=Math.max(11,cfg.size-1);sv();re()});q('rdF2',()=>{cfg.size=Math.min(34,cfg.size+1);sv();re()});q('rdFs',()=>{cfg.font=cfg.font==='sans'?'serif':'sans';sv();re()});
        q('rdL1',()=>{cfg.lh=Math.max(1.2,+(cfg.lh-.1).toFixed(2));sv();re()});q('rdL2',()=>{cfg.lh=Math.min(2.2,+(cfg.lh+.1).toFixed(2));sv();re()});
        q('rdM1',()=>{cfg.margin=Math.max(6,cfg.margin-8);sv();re()});q('rdM2',()=>{cfg.margin=Math.min(70,cfg.margin+8);sv();re()});
        q('rdR1',()=>rot(-90));q('rdR2',()=>rot(90));q('rdZ1',()=>zoomAt(R.zoom-.5,W()/2,H()/2));q('rdZ2',()=>zoomAt(R.zoom+.5,W()/2,H()/2));q('rdZ0',()=>{R.zoom=1;applyV();label();sharpLater()});
        pn.querySelector('#rdAn').onchange=e=>{cfg.anim=e.target.checked;sv()};
        q('rdFu',()=>{try{if(document.fullscreenElement)document.exitFullscreen();else (ov.requestFullscreen||ov.webkitRequestFullscreen||function(){}).call(ov)}catch(e){}})}}}
  function rot(d){R.rot=((R.rot+d)%360+360)%360;rdPosSet(m.id,{rot:R.rot});draw(0)}
  /* ---- Knöpfe ---- */
  $r('#rdX').onclick=()=>close();$r('#rdP').onclick=()=>turn(-1);$r('#rdN').onclick=()=>turn(1);
  $r('#rdRl').onclick=()=>rot(-90);$r('#rdRr').onclick=()=>rot(90);
  $r('#rdBm').onclick=toggleBm;$r('#rdTc').onclick=()=>panel('toc');$r('#rdQ').onclick=()=>panel('q');$r('#rdSe').onclick=()=>panel('set');
  $r('#rdSl').oninput=e=>{const v=+e.target.value;if(kind==='epub'){const t=v/1000*R.N;gotoEpub(Math.min(R.N-1,Math.floor(t)),0)}else{R.cur=v;draw(0)}};
  /* ---- Start ---- */
  applyTheme();
  if(src||epub){
    if(kind==='epub'){R.dbl=useDbl();R.ch=Math.min(pos0.c||0,R.N-1);R.pi=0;await layoutEpub(false);if(pos0.f){R.pi=Math.round(pos0.f*(R.pages-1));moveEpub(false)}}
    else{buildSpreads();R.cur=spreadOf(Math.min(pos0.p||1,R.N));await draw(0)}
    if(!sessionStorage.getItem('sh5rdHint')){try{sessionStorage.setItem('sh5rdHint','1')}catch(e){}$r('#rdLb').textContent='Tipp: Rand links/rechts antippen = blättern, Mitte = Menü';setTimeout(()=>{if(!R.closed)label()},3500)}
  }
  return R;
}
async function rdEpubInit(blob,m){
  const z=await zipRead(await blob.arrayBuffer()),dp=new DOMParser();
  const cont=await z.text('META-INF/container.xml');if(!cont)throw new Error('container.xml fehlt');
  const rf=dp.parseFromString(cont,'text/xml').querySelector('rootfile'),opfPath=rf&&rf.getAttribute('full-path');if(!opfPath)throw new Error('Inhaltsverzeichnis fehlt');
  const opf=dp.parseFromString(await z.text(opfPath),'text/xml'),dir=opfPath.indexOf('/')>=0?opfPath.slice(0,opfPath.lastIndexOf('/')):'';
  const man={};opf.querySelectorAll('manifest > item').forEach(i=>{man[i.getAttribute('id')]={href:i.getAttribute('href'),mt:i.getAttribute('media-type')||'',pr:i.getAttribute('properties')||''}});
  const spine=[...opf.querySelectorAll('spine > itemref')].map(r=>man[r.getAttribute('idref')]).filter(x=>x&&/html|xml/.test(x.mt)).map(x=>epubPath(dir,x.href)).filter(Boolean);
  if(!spine.length)throw new Error('Keine Kapitel gefunden');
  const idx={};spine.forEach((p,i)=>{idx[p]=i});const toc=[];
  try{const nav=Object.values(man).find(x=>/\bnav\b/.test(x.pr)),ncx=Object.values(man).find(x=>x.mt==='application/x-dtbncx+xml');
    if(nav){const np=epubPath(dir,nav.href),nd=dp.parseFromString(await z.text(np),'text/html'),nb=np.indexOf('/')>=0?np.slice(0,np.lastIndexOf('/')):'';
      const nv=nd.querySelector('nav[epub\\:type="toc"],nav#toc,nav')||nd;nv.querySelectorAll('a[href]').forEach(a=>{const pp=epubPath(nb,a.getAttribute('href'));if(pp!=null&&idx[pp]!==undefined)toc.push({t:(a.textContent||'').replace(/\s+/g,' ').trim()||'Kapitel',c:idx[pp],d:a.closest('li')&&a.closest('li').parentElement.closest('li')?1:0})})}
    else if(ncx){const np=epubPath(dir,ncx.href),nd=dp.parseFromString(await z.text(np),'text/xml'),nb=np.indexOf('/')>=0?np.slice(0,np.lastIndexOf('/')):'';
      nd.querySelectorAll('navPoint').forEach(n=>{const c=n.querySelector('content'),t=n.querySelector('navLabel > text');if(!c||!t)return;const pp=epubPath(nb,c.getAttribute('src'));if(pp!=null&&idx[pp]!==undefined){let d=0,p=n.parentElement;while(p&&p.tagName==='navPoint'){d++;p=p.parentElement}toc.push({t:(t.textContent||'').trim()||'Kapitel',c:idx[pp],d:d?1:0})}})}
  }catch(e){}
  return{spine,toc,title:(opf.querySelector('metadata title')||{}).textContent||m.name,async html(i){const path=spine[i],txt=await z.text(path);if(txt==null)return'<p>Dieses Kapitel fehlt in der Datei.</p>';return rdChapClean(dp.parseFromString(txt,'text/html'),path,z)}}}
(function(){if(typeof document==='undefined'||document.getElementById('rdCss'))return;const s=document.createElement('style');s.id='rdCss';s.textContent='@keyframes rdInR{from{transform:translateX(7%) rotateY(-8deg);opacity:.2}to{transform:none;opacity:1}}@keyframes rdInL{from{transform:translateX(-7%) rotateY(8deg);opacity:.2}to{transform:none;opacity:1}}#rdOV button{cursor:pointer}';document.head.appendChild(s)})();
