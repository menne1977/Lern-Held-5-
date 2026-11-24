/* ===== Quiz: Runden mit 10 Fragen oder Endlos, je Fach (Funktionsdeklarationen) ===== */
function quizPool(si){
  const own=[];MINE.forEach(it=>{if(it.s!==si)return;const t=TOPICS['m_'+it.id];if(t&&t.ex)t.ex.forEach(q=>{if(q&&q.q&&q.a!==undefined&&!q.scr)own.push(q)})});
  return own}
function quizSrc(si,id){
  const own=quizPool(si);let queue=shuffle(own),seen=new Set();
  return()=>{for(let i=0;i<30;i++){let q;
    if(queue.length&&(R(0,1)||!genQ(id)))q=queue.shift();else{q=genQ(id);if(!q)q=queue.shift()}
    if(!q)q=genQ(id);
    if(!seen.has(q.q)||i>25){seen.add(q.q);if(seen.size>400)seen.clear();return q}
    if(!queue.length&&own.length)queue=shuffle(own)}
    return genQ(id)}}
function quizHome(){
  setNav('home');
  app().innerHTML=`<a class="back" href="#/">← Start</a><h1>🎯 Quiz</h1><p class="lead">Wähle ein Fach: 10 Fragen pro Runde oder endlos. Fragen aus deinen Paketen (Meine Sachen) und immer neue Aufgaben aus der App.</p><div class="grid">${SUBJ.map(s=>`<a class="subj" style="--c:${s.color}" href="#/quiz/${s.id}"><span class="ic">${s.icon}</span><b>${s.name}</b><small>${quizPool(SUBJ.indexOf(s)).length} eigene Fragen</small></a>`).join('')}</div>`}
function quizSubject(id){
  const s=subjById(id);if(!s)return quizHome();setNav('home');
  app().innerHTML=`<a class="back" href="#/quiz">← Quiz</a><header class="shead" style="--c:${s.color}"><span>${s.icon}</span><div><h1>${s.name}-Quiz</h1><small>🎓 Klasse ${klasse()} · ${quizPool(SUBJ.indexOf(s)).length} Fragen aus deinen Paketen</small></div></header>
  <div class="acts"><a class="act" href="#/quiz/${id}/10">🎯<b>10er-Runde</b><small>mit Ergebnis</small></a><a class="act" href="#/quiz/${id}/inf">♾️<b>Endlos</b><small>nie zu Ende</small></a></div>
  <p class="hint">Mehr Fragen: unter <a href="#/packs" style="color:var(--ac)">Fertige Pakete</a> Pakete für ${s.name} hinzufügen.</p>`}
function quizPlay(id,mode){
  const s=subjById(id);if(!s)return quizHome();setNav('home');
  const si=SUBJ.indexOf(s),inf=mode==='inf',N=10,src=quizSrc(si,id);
  const S={n:0,ok:0,streak:0,bad:[],q:null,opts:null,done:false};
  const next=()=>{S.q=src();S.opts=S.q.opts?shuffle(S.q.opts):null;S.done=false;draw()};
  const end=()=>{const tot=S.n,p=tot?S.ok/tot:0;
    app().innerHTML=`<div class="qcard" style="--c:${s.color};text-align:center"><div style="font-size:3rem">${p>=.9?'🏆':p>=.6?'🎉':'💪'}</div><h1>${S.ok} von ${tot} richtig</h1>${p>=.9?'<p>Fantastisch!</p>':p>=.6?'<p>Gut gemacht!</p>':'<p>Übung macht den Meister – nochmal?</p>'}</div>
    ${S.bad.length?`<h2>Das üben wir nochmal</h2>`+S.bad.map(q=>`<div class="card" style="margin:8px 0;padding:12px"><b>${q.q}</b><div>✔ ${ansText(q)}</div>${q.steps?`<div class="steps">${q.steps}</div>`:''}</div>`).join(''):''}
    <a class="go" style="display:block;text-align:center;margin-top:12px" href="#" id="qa">Nochmal</a><a class="go" style="display:block;text-align:center;margin-top:8px;background:#475569;border-color:#475569" href="#/quiz">Anderes Fach</a>`;
    $('#qa').onclick=e=>{e.preventDefault();quizPlay(id,mode)}};
  const draw=()=>{const q=S.q;
    app().innerHTML=`<div class="stop"><a href="#/quiz/${id}">✕ Ende</a><div class="bar"><i style="width:${inf?(S.n%10)*10:S.n/N*100}%"></i></div><span>${inf?'♾️ ':''}⭐ ${S.ok}/${S.n}${inf?'':' · '+(S.n+1)+'/'+N}</span></div>
    <div class="qcard" style="--c:${s.color}"><small class="qt">${s.icon} ${s.name}-Quiz</small><div class="q">${q.q}</div>${q.speak?`<button class="say spk" data-t="${esc(q.speak)}">🔊 Anhören</button>`:''}
    ${S.opts?`<div class="opts">${S.opts.map((o,k)=>`<button class="opt" data-k="${k}">${esc(o)}</button>`).join('')}</div>`:`<input id="in" class="ans" autocomplete="off" autocapitalize="off" spellcheck="false" inputmode="${q.kind==='num'?'decimal':'text'}" placeholder="Deine Antwort"><button id="chk" class="go">Prüfen</button>`}
    ${q.hint?`<button id="hb" class="lnk">💡 Tipp</button><div id="hint" class="tip" hidden>${q.hint}</div>`:''}<div id="fb"></div></div>`;
    if(q.hint)$('#hb').onclick=()=>{$('#hint').hidden=false};
    if(S.opts)document.querySelectorAll('.opt').forEach(b=>b.onclick=()=>fin(S.opts[+b.dataset.k],b));
    else{const inp=$('#in');inp.focus();inp.onkeydown=e=>{if(e.key==='Enter')fin(inp.value)};$('#chk').onclick=()=>fin(inp.value)}};
  const fin=(val,btn)=>{
    if(S.done)return;const q=S.q,ok=checkAns(q,val);if(ok===null)return;S.done=true;S.n++;if(ok){S.ok++;S.streak++}else{S.streak=0;S.bad.push(q)}
    document.querySelectorAll('.opt').forEach(b=>{b.disabled=true;if(q.kind==='choice'&&[].concat(q.a).map(String).includes(S.opts[+b.dataset.k]))b.classList.add('good');else if(b===btn)b.classList.add('bad')});
    const inp=$('#in');if(inp){inp.disabled=true;inp.classList.add(ok?'good':'bad');$('#chk').remove()}
    const last=!inf&&S.n>=N;
    $('#fb').innerHTML=`<div class="fb ${ok?'ok':'no'}"><b>${ok?pick(PRAISE):'Nicht ganz.'}</b>${ok?'':` Richtig ist: <b>${ansText(q)}</b>`}${S.streak>=3&&ok?` · 🔥 ${S.streak} in Folge`:''}</div>${q.steps?`<div class="steps"><b>So geht's:</b><div>${q.steps}</div></div>`:''}<button id="nxt" class="go">${last?'Ergebnis 🏁':'Weiter ▶'}</button>${inf?'<button id="qe" class="lnk">⏹ Beenden und Ergebnis</button>':''}`;
    const nb=$('#nxt');nb.focus();nb.onclick=last?end:next;const qe=$('#qe');if(qe)qe.onclick=end};
  next()}
