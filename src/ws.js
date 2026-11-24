/* ===== Arbeitsblätter selbst erstellen: aus App/Meine Sachen, mit KI oder aus dem Internet – zum Ausdrucken (Funktionsdeklarationen) ===== */
function doPrint(title){const t=document.title;if(title)document.title=title;try{if(window.AndroidPrint&&AndroidPrint.print){AndroidPrint.print(title||'Schul-Held');setTimeout(()=>document.title=t,3000);return}}catch(e){}try{window.print()}catch(e){}setTimeout(()=>document.title=t,1000)}
function wsOpt(){let o={};try{o=JSON.parse(localStorage.getItem('sh5ws')||'{}')}catch(e){}return Object.assign({f:'mathe',k:klasse(),thema:'',n:10,typ:'mix',sol:1,src:'app'},o)}
function wsSave(o){try{localStorage.setItem('sh5ws',JSON.stringify(o))}catch(e){}}
function wsMatch(t,words){if(!words.length)return true;const h=(t.title+' '+(t.tags||'')).toLowerCase();return words.some(w=>h.indexOf(w)>=0)}
function wsFromApp(o){
  const s=subjById(o.f)||SUBJ[0],si=SUBJ.indexOf(s),words=o.thema.toLowerCase().split(/[\s,]+/).filter(w=>w.length>2);
  const tops=Object.values(TOPICS).filter(t=>t.sub&&t.sub.id===s.id&&hasQ(t)&&wsMatch(t,words));
  const mine=MINE.filter(it=>it.s===si&&(!words.length||words.some(w=>(it.name+' '+it.text).toLowerCase().indexOf(w)>=0))).map(it=>TOPICS['m_'+it.id]).filter(t=>t&&hasQ(t));
  let srcs=tops.concat(mine).map(qSource);if(!srcs.length&&TOPICS['gen_'+s.id])srcs=[qSource(TOPICS['gen_'+s.id])];
  return{srcs,info:`${tops.length} App-Themen · ${mine.length} aus Meine Sachen`+(words.length&&!tops.length&&!mine.length?' · zum Thema nichts gefunden, deshalb allgemeine Aufgaben':'')}}
function wsCollect(srcs,o){const out=[],seen=new Set();let tries=0;
  while(out.length<o.n&&tries++<o.n*25&&srcs.length){let q=pick(srcs)();if(!q||q.auto||q.snd)continue;q=o.typ==='tap'?qzTap(q):o.typ==='write'?qzWrite(q):q;if(!q)continue;const k=strip(q.q);if(seen.has(k))continue;seen.add(k);out.push(q)}
  return out}
function wsHtml(qs,o,title){
  const s=subjById(o.f)||SUBJ[0];
  const task=(q,i)=>`<li>${q.q}${q.kind==='choice'&&q.opts?`<div class="ws-opts">${shuffle(q.opts).map(x=>`<span>☐ ${esc(x)}</span>`).join('')}</div>`:`<div class="ws-line"></div>`}</li>`;
  return `<div class="ws" contenteditable="true" spellcheck="false"><div class="ws-head"><b>${esc(title)}</b><span>${s.icon} ${esc(s.name)} · Klasse ${o.k}</span></div><div class="ws-name">Name: ______________________ &nbsp; Datum: ____________</div>
  <ol class="ws-list">${qs.map(task).join('')}</ol>${o.sol?`<div class="ws-sol"><b>Lösungen – ${esc(title)}</b><ol>${qs.map(q=>`<li>${ansText(q)}</li>`).join('')}</ol></div>`:''}</div>`}
function wsPrompt(o){const s=subjById(o.f)||SUBJ[0],k=o.k,n=o.n;
  return `Erstelle ein Arbeitsblatt für das Fach ${s.name}, Klasse ${k}${o.thema?', Thema: '+o.thema:''}. ${n} Aufgaben, ${o.typ==='tap'?'nur Ankreuz-Aufgaben (Multiple Choice mit 3–4 Antworten)':o.typ==='write'?'nur Aufgaben zum Schreiben/Rechnen':'gemischt: Ankreuz-Aufgaben und Aufgaben zum Schreiben'}. Kindgerecht, sachlich richtig, eigene Formulierungen.
Antworte NUR mit JSON in einem Code-Kasten, genau so:
{"subject":"${s.name}","title":"Arbeitsblatt: …","key":"kurze Zusammenfassung","tasks":[{"type":"choice","q":"Frage","options":["A","B","C"],"answer":"A","explain":"kurze Erklärung"},{"type":"text","q":"Frage","answer":"Lösung","alt":["andere richtige Schreibweise"]},{"type":"num","q":"Rechenaufgabe","answer":42}],"vocab":[],"slides":[]}`}
function wsPage(f){
  setNav('home');const o=wsOpt();if(f&&subjById(f)&&o.f!==f){o.f=f;wsSave(o)}const s=subjById(o.f)||SUBJ[0];
  const chip=(k,v,l)=>`<button class="chip wso${String(o[k])===String(v)?' on':''}" data-k="${k}" data-v="${v}">${l}</button>`;
  app().innerHTML=`<div class="noprint"><a class="back" href="#/">← Start</a><h1>🖨️ Arbeitsblatt erstellen</h1><p class="lead">Fach und Thema wählen, Aufgaben erzeugen, bei Bedarf direkt im Blatt ändern (antippen und tippen) und ausdrucken.</p>
  <h2>1. Fach</h2><div class="chips">${SUBJ.map(x=>chip('f',x.id,x.icon+' '+x.name)).join('')}</div>
  <h2>2. Klasse und Thema</h2><div class="chips">${[5,6,7,8,9,10,11,12,13].map(k=>chip('k',k,k)).join('')}</div>
  <input id="wst" class="ans" placeholder="Thema, z. B. Brüche, Vögel, Simple Past (leer = alles)" value="${esc(o.thema)}">
  <h2>3. Aufgaben</h2><div class="chips">${[5,10,15,20].map(n=>chip('n',n,n+' Aufgaben')).join('')}</div><div class="chips">${chip('typ','mix','🔀 Gemischt')}${chip('typ','tap','☐ Nur ankreuzen')}${chip('typ','write','✍️ Nur schreiben')}${chip('sol',1,'✅ mit Lösungsblatt')}${chip('sol',0,'ohne Lösungen')}</div>
  <h2>4. Woher kommen die Aufgaben?</h2><div class="chips">${chip('src','app','📘 App & Meine Sachen')}${chip('src','ki','🤖 Mit KI')}${chip('src','net','🌐 Aus dem Internet')}</div>
  <div id="wssrc"></div></div><div id="wsst" class="hint noprint"></div><div id="wsout"></div>`;
  document.querySelectorAll('.wso').forEach(b=>b.onclick=()=>{o.thema=$('#wst').value.trim();o[b.dataset.k]=/^\d+$/.test(b.dataset.v)?+b.dataset.v:b.dataset.v;wsSave(o);wsPage()});
  $('#wst').onchange=()=>{o.thema=$('#wst').value.trim();wsSave(o)};
  const title=()=>'Arbeitsblatt'+(o.thema?': '+o.thema:' '+s.name);
  const show=(qs,tt,extra)=>{if(!qs.length){$('#wsst').textContent='Keine passenden Aufgaben gefunden. Anderes Thema oder andere Quelle probieren.';$('#wsout').innerHTML='';return}
    $('#wsout').innerHTML=`<div class="row2 noprint"><button class="go" id="wsp">🖨️ Drucken</button><button id="wsn">🔀 Neu erstellen</button></div><p class="hint noprint">${extra||''} Du kannst Text im Blatt antippen und ändern, bevor du druckst.</p>`+wsHtml(qs,o,tt);
    $('#wsp').onclick=()=>doPrint(tt);$('#wsn').onclick=()=>run();$('#wsout').scrollIntoView({behavior:'smooth'})};
  let run=()=>{};
  if(o.src==='app'){$('#wssrc').innerHTML='<button class="go" id="wsg" style="width:100%">📝 Arbeitsblatt erstellen</button>';
    run=()=>{o.thema=$('#wst').value.trim();wsSave(o);const r=wsFromApp(o);show(wsCollect(r.srcs,o),title(),'Quelle: '+r.info+'.')};$('#wsg').onclick=run}
  else if(o.src==='ki'){const pr=wsPrompt(Object.assign({},o,{thema:$('#wst').value.trim()}));
    $('#wssrc').innerHTML=`<p class="hint">So geht's: Auftrag kopieren → in ChatGPT, Gemini oder Claude einfügen → die Antwort (den Code-Kasten) kopieren → unten einfügen.</p><textarea id="wsprm" class="ans" rows="6" readonly>${esc(pr)}</textarea>
    <div class="row2"><button class="go" id="wscp">📋 Auftrag kopieren</button>${gemCfg().key?'<button id="wsgm">🤖 Direkt mit Gemini</button>':''}</div>
    <p class="hint"><a href="https://chatgpt.com/" target="_blank" rel="noopener" style="color:var(--ac)">ChatGPT</a> · <a href="https://gemini.google.com/" target="_blank" rel="noopener" style="color:var(--ac)">Gemini</a> · <a href="https://claude.ai/" target="_blank" rel="noopener" style="color:var(--ac)">Claude</a></p>
    <textarea id="wsin" class="ans" rows="5" placeholder="Antwort der KI hier einfügen …"></textarea><button class="go" id="wsimp" style="width:100%">📝 Arbeitsblatt aus KI-Antwort</button>`;
    const fromTxt=txt=>{try{const r=parseAI(txt),j=JSON.parse(txt.slice(txt.indexOf('{'),txt.lastIndexOf('}')+1));const qs=r.tasks.map(aiToQ).map(q=>o.typ==='tap'?qzTap(q):o.typ==='write'?qzWrite(q):q).filter(Boolean).slice(0,Math.max(o.n,r.tasks.length));show(qs,String(j.title||title()),'Quelle: KI-Antwort.')}catch(e){$('#wsst').textContent='Die Antwort konnte nicht gelesen werden. Bitte den ganzen Code-Kasten einfügen.'}};
    run=()=>fromTxt($('#wsin').value);
    $('#wscp').onclick=async()=>{try{await navigator.clipboard.writeText(pr);$('#wsst').textContent='Auftrag kopiert ✔'}catch(e){$('#wsprm').select();$('#wsst').textContent='Bitte den markierten Text kopieren.'}};
    $('#wsimp').onclick=run;
    const gm=$('#wsgm');if(gm)gm.onclick=async()=>{$('#wsst').textContent='Die KI erstellt das Arbeitsblatt … (10–30 Sekunden)';try{const t=await gemini(pr,{json:true});$('#wsin').value=t;$('#wsst').textContent='';fromTxt(t)}catch(e){$('#wsst').textContent='Fehler: '+e.message}}}
  else{const q=encodeURIComponent((($('#wst').value.trim()||s.name)+' Arbeitsblatt Klasse '+o.k+' '+s.name).trim());
    $('#wssrc').innerHTML=`<button class="go" id="wsnet" style="width:100%">📝 Lückentext-Blatt aus Lexikon-Artikel</button><p class="hint">Die App holt einen Artikel aus ${o.k<=7?'Klexikon (für Kinder)':'Wikipedia'} zum Thema und baut daraus Lückensätze.</p>
    <h2>Fertige Arbeitsblätter im Netz suchen</h2><a class="row" target="_blank" rel="noopener" href="https://www.google.com/search?q=${q}+pdf+kostenlos"><span>🔎 Arbeitsblätter als PDF suchen<small>Google-Suche, öffnet den Browser</small></span><em>↗</em></a><a class="row" target="_blank" rel="noopener" href="https://www.google.com/search?q=${q}+%C3%BCbungen+mit+l%C3%B6sungen"><span>🔎 Übungen mit Lösungen suchen<small>Google-Suche</small></span><em>↗</em></a><a class="row" target="_blank" rel="noopener" href="https://www.google.com/search?tbm=isch&q=${q}"><span>🖼️ Bilder zum Thema<small>Google-Bildersuche</small></span><em>↗</em></a>`;
    run=async()=>{const th=$('#wst').value.trim();if(!th){$('#wsst').textContent='Bitte ein Thema eingeben.';return}o.thema=th;wsSave(o);$('#wsst').textContent='Lade Artikel …';
      try{let d=await wikiFetch(o.k<=7?'klexikon':'wiki',th);if(!d&&o.k<=7)d=await wikiFetch('wiki',th);if(!d){$('#wsst').textContent='Zum Thema nichts gefunden.';return}
        const g=clozeGen(d.text,s.id==='englisch'?'en':'de');if(!g){$('#wsst').textContent='Der Artikel ist zu kurz.';return}$('#wsst').textContent='';
        const o2=Object.assign({},o,{typ:o.typ==='tap'?'tap':'all'});show(wsCollect([g],o2),'Lückentext: '+d.title,`Quelle: <a href="${d.url}" target="_blank" rel="noopener" style="color:var(--ac)">${esc(d.title)}</a>.`)}catch(e){$('#wsst').textContent='Keine Verbindung zum Internet.'}};
    $('#wsnet').onclick=run}}
