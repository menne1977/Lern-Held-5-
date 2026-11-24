/* ===== Quiz: Fächer, Allgemeinwissen, Geräusche, Tierlaute, Bilder-Rätsel (Funktionsdeklarationen) ===== */
function qzSP(){return{allg:{name:'Allgemeinwissen',icon:'🧠',color:'#7c3aed',sub:'leicht bis schwer'},ton:{name:'Geräusche raten',icon:'👂',color:'#0891b2',sub:'Was hörst du?'},tier:{name:'Tierlaute raten',icon:'🐾',color:'#16a34a',sub:'Wer macht das?'},bild:{name:'Bilder-Rätsel',icon:'🧩',color:'#db2777',sub:'Emojis zum Wort erraten'}}}
function qzOpt(){let o={};try{o=JSON.parse(localStorage.getItem('sh5qz')||'{}')}catch(e){}return Object.assign({src:'mix',typ:'all'},o)}
function qzSet(k,v){const o=qzOpt();o[k]=v;try{localStorage.setItem('sh5qz',JSON.stringify(o))}catch(e){}}
function quizPool(si){
  const own=[];MINE.forEach(it=>{if(it.s!==si)return;const t=TOPICS['m_'+it.id];if(t&&t.ex)t.ex.forEach(q=>{if(q&&q.q&&q.a!==undefined&&!q.scr){q._it=it.id;own.push(q)}})});
  return own}
function qzTap(q){ /* nur Antippen: Rechenaufgaben bekommen Antwortkarten, Schreibaufgaben fallen weg */
  if(q.kind==='choice'&&q.opts)return q;
  if(q.kind==='num'&&typeof q.a==='number'){const a=q.a,s=new Set([a]);let n=0;const st=Math.max(1,Math.abs(a)>20?Math.round(Math.abs(a)/10):1);while(s.size<4&&n++<40){const d=(R(1,4))*st*(R(0,1)?1:-1);s.add(Math.round((a+d)*100)/100)}
    const f=x=>String(x).replace('.',',');return Object.assign({},q,{kind:'choice',a:f(a),opts:[...s].map(f)})}
  return null}
function qzNoEmo(x){return String(x).replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu,'').trim()}
function qzWrite(q,force){ /* Schreibaufgabe: Auswahlfragen ohne Antwortkarten; zu lange Antworten bleiben Auswahl (oder fallen weg) */
  if(q.kind!=='choice')return q;const a0=String([].concat(q.a)[0]),clean=qzNoEmo(a0);
  if(clean.split(/\s+/).length>3||clean.length>28)return force?null:q;
  const acc=[a0,clean,langDeacc(clean)];return Object.assign({},q,{kind:'text',opts:null,a:acc,pre:x=>langDeacc(qzNoEmo(x)),ks:true,hint:q.hint||('Die Antwort beginnt mit „'+clean[0]+'“ und hat '+clean.length+' Zeichen.')})}
function qzFit(q,typ){if(!q)return null;if(typ==='tap')return qzTap(q);if(typ==='write')return qzWrite(q,true);return R(0,1)?(qzWrite(q,true)||qzTap(q)||q):(qzTap(q)||q)}
function quizSrc(si,id){
  const o=qzOpt(),own=quizPool(si);let queue=shuffle(own),seen=new Set(),useOwn=o.src!=='app'&&own.length,useApp=o.src!=='own'||!own.length;
  const fit=q=>qzFit(q,o.typ);
  return()=>{for(let i=0;i<60;i++){let q;
    if(useOwn&&(!useApp||R(0,1))){if(!queue.length)queue=shuffle(own);q=queue.shift()}else q=genQ(id);
    q=fit(q);if(!q)continue;if(!seen.has(q.q)||i>50){seen.add(q.q);if(seen.size>300)seen.clear();return q}}
    const g=genQ(id);return o.typ==='write'?(qzWrite(g)||g):o.typ==='tap'?(qzTap(g)||g):g}}
function qzSounds_play(n){
  const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return false;
  const c=window.__qzc||(window.__qzc=new AC());if(c.state==='suspended')c.resume();const t0=c.currentTime+.05,g=c.createGain();g.connect(c.destination);g.gain.value=.4;
  const osc=(type,f,s,d,v)=>{const o=c.createOscillator(),e=c.createGain();o.type=type;o.frequency.setValueAtTime(f,t0+s);o.connect(e);e.connect(g);e.gain.setValueAtTime(0,t0+s);e.gain.linearRampToValueAtTime(v||.5,t0+s+.01);e.gain.exponentialRampToValueAtTime(.001,t0+s+d);o.start(t0+s);o.stop(t0+s+d+.05);return o};
  const noise=(s,d,fr,type,v)=>{const b=c.createBuffer(1,c.sampleRate*d,c.sampleRate),a=b.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1;const sr=c.createBufferSource();sr.buffer=b;const f=c.createBiquadFilter();f.type=type;f.frequency.value=fr;const e=c.createGain();sr.connect(f);f.connect(e);e.connect(g);e.gain.setValueAtTime(0,t0+s);e.gain.linearRampToValueAtTime(v||.6,t0+s+.05);e.gain.exponentialRampToValueAtTime(.001,t0+s+d);sr.start(t0+s);return f};
  if(n==='glocke'){osc('sine',880,0,2,.6);osc('sine',1320,0,1.6,.3);osc('sine',2200,0,1,.15);osc('sine',880,1.2,2,.5)}
  else if(n==='sirene'){const o=osc('sawtooth',600,0,3,.3);for(let i=0;i<6;i++)o.frequency.linearRampToValueAtTime(i%2?600:900,t0+(i+1)*.5)}
  else if(n==='telefon'){for(let r=0;r<2;r++)for(let i=0;i<6;i++){osc('square',i%2?480:440,r*1.6+i*.06,.06,.25)}}
  else if(n==='wecker'){for(let i=0;i<8;i++)osc('square',1800,i*.28,.12,.3)}
  else if(n==='regen'){for(let i=0;i<12;i++)noise(i*.2,.35,4000+R(0,2000),'highpass',.35)}
  else if(n==='donner'){const f=noise(0,3,200,'lowpass',.9);f.frequency.setValueAtTime(300,t0);f.frequency.exponentialRampToValueAtTime(60,t0+3);noise(0,.08,1500,'highpass',.5)}
  else if(n==='trommel'){for(let i=0;i<4;i++){const o=osc('sine',160,i*.35,.3,.9);o.frequency.exponentialRampToValueAtTime(50,t0+i*.35+.25);noise(i*.35,.05,2000,'bandpass',.4)}}
  else if(n==='uhr'){for(let i=0;i<8;i++){noise(i*.5,.05,i%2?3000:2000,'bandpass',.7)}}
  else if(n==='hupe'){osc('square',400,0,.7,.25);osc('square',500,0,.7,.25);osc('square',400,.9,.5,.25);osc('square',500,.9,.5,.25)}
  else if(n==='meer'){const f=noise(0,3.5,900,'lowpass',.5);f.frequency.setValueAtTime(300,t0);f.frequency.linearRampToValueAtTime(1200,t0+1.5);f.frequency.linearRampToValueAtTime(300,t0+3.4)}
  return true}
function qzSpecialSrc(id,opt){
  if(id==='allg'){const lv=opt==='leicht'?1:opt==='mittel'?2:opt==='schwer'?3:0,pool=qzAllg().filter(x=>!lv||x[0]===lv);let queue=shuffle(pool);
    return()=>{if(!queue.length)queue=shuffle(pool);const x=queue.shift();return Q(esc(x[1]),x[2],{kind:'choice',opts:shuffle([x[2]].concat(x[3])),steps:esc(x[4]),lv:x[0]})}}
  if(id==='ton'){const L=qzSounds();let queue=shuffle(L);
    return()=>{if(!queue.length)queue=shuffle(L);const x=queue.shift(),o=shuffle(L.filter(y=>y[0]!==x[0])).slice(0,3).map(y=>y[2]+' '+y[1]);return Q('Welches Geräusch hörst du?',x[2]+' '+x[1],{kind:'choice',opts:shuffle([x[2]+' '+x[1]].concat(o)),snd:x[0],steps:'Das war: '+x[2]+' '+x[1]})}}
  if(id==='tier'){const L=qzAnimals();let queue=shuffle(L);
    return()=>{if(!queue.length)queue=shuffle(L);const x=queue.shift(),o=shuffle(L.filter(y=>y[0]!==x[0])).slice(0,3).map(y=>y[2]+' '+y[0]);return Q('Welches Tier macht „'+x[1]+'“?',x[2]+' '+x[0],{kind:'choice',opts:shuffle([x[2]+' '+x[0]].concat(o)),speak:x[1],steps:x[2]+' '+x[0]+' macht „'+x[1]+'“'})}}
  const L=qzRiddles();let queue=shuffle(L),n=0;
  return()=>{n++;if(n%4===0){const k=R(3,12),e=pick(['⭐','🍎','🐟','🎈','🍪','🐞']);const o=new Set([k]);while(o.size<4)o.add(Math.max(1,k+R(-3,3)));return Q('Wie viele '+e+' siehst du?',String(k),{kind:'choice',opts:shuffle([...o].map(String)),big:e.repeat(k),steps:'Es sind '+k+'.'})}
    if(!queue.length)queue=shuffle(L);const x=queue.shift();return Q('Welches Wort ist gemeint?',x[1],{kind:'choice',opts:shuffle([x[1]].concat(x[2])),big:x[0],steps:x[0]+' = '+x[1]})}}
function quizHome(){
  setNav('home');
  app().innerHTML=`<a class="back" href="#/">← Start</a><h1>🎯 Quiz</h1><p class="lead">Fach-Quiz mit 10 Fragen oder endlos – und Spiel-Quizze zum Raten.</p>
  <h2>🎮 Spiel-Quizze</h2><div class="grid">${Object.keys(qzSP()).map(k=>{const s=qzSP()[k];return `<a class="subj" style="--c:${s.color}" href="#/quiz/${k}"><span class="ic">${s.icon}</span><b>${s.name}</b><small>${s.sub}</small></a>`}).join('')}</div>
  <h2>📚 Fächer</h2><div class="grid">${SUBJ.map(s=>`<a class="subj" style="--c:${s.color}" href="#/quiz/${s.id}"><span class="ic">${s.icon}</span><b>${s.name}</b><small>${quizPool(SUBJ.indexOf(s)).length} eigene Fragen</small></a>`).join('')}</div>`}
function quizSubject(id){
  const sp=qzSP()[id],s=sp||subjById(id);if(!s)return quizHome();setNav('home');
  const A=(h,i,t,sm)=>`<a class="act" href="${h}">${i}<b>${t}</b><small>${sm}</small></a>`;
  if(sp){
    const lv=id==='allg'?`<h2>Schwierigkeit</h2><div class="acts">${[['leicht','🟢','Leicht'],['mittel','🟡','Mittel'],['schwer','🔴','Schwer'],['alle','🌈','Alles gemischt']].map(x=>A('#/quiz/allg/'+x[0],x[1],x[2],'wählen')).join('')}</div>`:'';
    app().innerHTML=`<a class="back" href="#/quiz">← Quiz</a><header class="shead" style="--c:${sp.color}"><span>${sp.icon}</span><div><h1>${sp.name}</h1><small>${sp.sub}</small></div></header>`+(id==='allg'?lv:qzModes(id));if(id!=='allg')qzModeBind(id);return}
  const n=quizPool(SUBJ.indexOf(s)).length,o=qzOpt();
  app().innerHTML=`<a class="back" href="#/quiz">← Quiz</a><header class="shead" style="--c:${s.color}"><span>${s.icon}</span><div><h1>${s.name}-Quiz</h1><small>🎓 Klasse ${klasse()} · ${n} Fragen aus deinen Paketen</small></div></header>
  <h2>Woher kommen die Fragen?</h2><div class="chips">${[['mix','🔀 Beides'],['own','🗂️ Nur meine Sachen'],['app','📘 Nur App-Aufgaben']].map(x=>`<button class="chip qo${o.src===x[0]?' on':''}" data-v="${x[0]}">${x[1]}</button>`).join('')}</div>${n?'':'<p class="hint">Noch keine eigenen Fragen: unter „Meine Sachen“ oder „Fertige Pakete“ etwas hinzufügen.</p>'}`+qzModes(id);
  document.querySelectorAll('.qo').forEach(b=>b.onclick=()=>{qzSet('src',b.dataset.v);quizSubject(id)});qzModeBind(id)}
function qzModes(id,pre){const o=qzOpt(),len=o.len||'10';
  return `<h2>Wie lange?</h2><div class="chips"><button class="chip ql${len==='10'?' on':''}" data-v="10">🎯 10 Fragen</button><button class="chip ql${len==='inf'?' on':''}" data-v="inf">♾️ Endlos</button></div>
  <h2>Quiz starten</h2><div class="qzm">${[['tap','👆','Tipp-Quiz','nur antippen'],['write','✍️','Schreib-Quiz','selbst schreiben'],['all','🔀','Gemischt','tippen und schreiben']].map(m=>`<button class="qzb" data-t="${m[0]}" data-h="#/quiz/${id}/${pre?pre+'/':''}">${m[1]}<b>${m[2]}</b><small>${m[3]}</small></button>`).join('')}</div>`}
function qzModeBind(id,pre){
  document.querySelectorAll('.ql').forEach(b=>b.onclick=()=>{qzSet('len',b.dataset.v);document.querySelectorAll('.ql').forEach(c=>c.classList.toggle('on',c===b))});
  document.querySelectorAll('.qzb').forEach(b=>b.onclick=()=>{qzSet('typ',b.dataset.t);go(b.dataset.h+(qzOpt().len||'10'))})}
function quizPlay(id,mode,opt){
  const sp=qzSP()[id],s=sp||subjById(id);if(!s)return quizHome();setNav('home');
  const inf=mode==='inf',N=10,si=sp?-1:SUBJ.indexOf(s),src=sp?(()=>{const g=qzSpecialSrc(id,opt),ty=qzOpt().typ;return()=>{let q,n=0;do{q=qzFit(g(),ty)}while(!q&&n++<20);return q||g()}})():quizSrc(si,id),back=sp?'#/quiz/'+id:'#/quiz/'+id,ttl=sp?s.name+(opt&&opt!=='alle'?' · '+opt:''):s.name+'-Quiz';
  const S={n:0,ok:0,streak:0,bad:[],q:null,opts:null,done:false};
  const next=()=>{S.q=src();S.opts=S.q.opts?shuffle(S.q.opts):null;S.done=false;draw()};
  const end=()=>{const tot=S.n,p=tot?S.ok/tot:0;
    app().innerHTML=`<div class="qcard" style="--c:${s.color};text-align:center"><div style="font-size:3rem">${p>=.9?'🏆':p>=.6?'🎉':'💪'}</div><h1>${S.ok} von ${tot} richtig</h1>${p>=.9?'<p>Fantastisch!</p>':p>=.6?'<p>Gut gemacht!</p>':'<p>Übung macht den Meister – nochmal?</p>'}</div>
    ${S.bad.length?`<h2>Das üben wir nochmal</h2>`+S.bad.map(q=>`<div class="card" style="margin:8px 0;padding:12px"><b>${q.q}</b>${q.big?`<div style="font-size:1.6rem">${q.big}</div>`:''}<div>✔ ${ansText(q)}</div>${q.steps?`<div class="steps">${q.steps}</div>`:''}</div>`).join(''):''}
    <a class="go" style="display:block;text-align:center;margin-top:12px" href="#" id="qa">Nochmal</a><a class="go" style="display:block;text-align:center;margin-top:8px;background:#475569;border-color:#475569" href="#/quiz">Anderes Quiz</a>`;
    $('#qa').onclick=e=>{e.preventDefault();quizPlay(id,mode,opt)}};
  const draw=()=>{const q=S.q;
    app().innerHTML=`<div class="stop"><a href="${back}">✕ Ende</a><div class="bar"><i style="width:${inf?(S.n%10)*10:S.n/N*100}%"></i></div><span>${inf?'♾️ ':''}⭐ ${S.ok}/${S.n}${inf?'':' · '+(S.n+1)+'/'+N}</span></div>
    <div class="qcard" style="--c:${s.color}"><small class="qt">${s.icon} ${ttl}${q.lv?' · '+['','🟢 leicht','🟡 mittel','🔴 schwer'][q.lv]:''}</small>${q._it?'<div id="qimg"></div>':''}${q.big?`<div style="font-size:${q.big.length>16?'1.8':'3.2'}rem;text-align:center;line-height:1.3;margin:8px 0">${q.big}</div>`:''}<div class="q">${q.q}</div>${q.snd?`<button class="go" id="snd" style="margin:8px 0">🔊 Geräusch abspielen</button>`:''}${q.speak?`<button class="say spk" data-t="${esc(q.speak)}"${q.sl?` data-l="${q.sl}"`:''}>🔊 Anhören</button>`:''}
    ${S.opts?`<div class="opts">${S.opts.map((o,k)=>`<button class="opt" data-k="${k}">${esc(o)}</button>`).join('')}</div>`:`<input id="in" class="ans" autocomplete="off" autocapitalize="off" spellcheck="false" inputmode="${q.kind==='num'?'decimal':'text'}" placeholder="Deine Antwort"><button id="chk" class="go">Prüfen</button>`}
    ${q.hint?`<button id="hb" class="lnk">💡 Tipp</button><div id="hint" class="tip" hidden>${q.hint}</div>`:''}<div id="fb"></div></div>`;
    if(q.speak&&q.auto)setTimeout(()=>speak(q.speak,q.sl),300);
    if(q.snd){const pl=()=>{if(!qzSounds_play(q.snd))noSound()};$('#snd').onclick=pl}
    if(q._it)imgGet(q._it).then(a=>{if(a&&a[0]&&$('#qimg'))$('#qimg').innerHTML='<img alt="" style="max-width:100%;max-height:240px;border-radius:12px;display:block;margin:0 auto 8px" src="data:image/jpeg;base64,'+a[0]+'">'});
    if(q.hint)$('#hb').onclick=()=>{$('#hint').hidden=false};
    if(S.opts)document.querySelectorAll('.opt').forEach(b=>b.onclick=()=>fin(S.opts[+b.dataset.k],b));
    else{const inp=$('#in');inp.focus();inp.onkeydown=e=>{if(e.key==='Enter')fin(inp.value)};$('#chk').onclick=()=>fin(inp.value)}};
  const fin=(val,btn)=>{
    if(S.done)return;const q=S.q,ok=checkAns(q,val);if(ok===null)return;S.done=true;S.n++;if(ok){S.ok++;S.streak++}else{S.streak=0;S.bad.push(q)}if(q.speakAfter)speak(q.speakAfter,q.sl);
    document.querySelectorAll('.opt').forEach(b=>{b.disabled=true;if(q.kind==='choice'&&[].concat(q.a).map(String).includes(S.opts[+b.dataset.k]))b.classList.add('good');else if(b===btn)b.classList.add('bad')});
    const inp=$('#in');if(inp){inp.disabled=true;inp.classList.add(ok?'good':'bad');$('#chk').remove()}
    const last=!inf&&S.n>=N;
    $('#fb').innerHTML=`<div class="fb ${ok?'ok':'no'}"><b>${ok?pick(PRAISE):'Nicht ganz.'}</b>${ok?'':` Richtig ist: <b>${ansText(q)}</b>`}${S.streak>=3&&ok?` · 🔥 ${S.streak} in Folge`:''}</div>${q.steps?`<div class="steps"><b>So geht's:</b><div>${q.steps}</div></div>`:''}<button id="nxt" class="go">${last?'Ergebnis 🏁':'Weiter ▶'}</button>${inf?'<button id="qe" class="lnk">⏹ Beenden und Ergebnis</button>':''}`;
    const nb=$('#nxt');nb.focus();nb.onclick=last?end:next;const qe=$('#qe');if(qe)qe.onclick=end};
  next()}

function quizAllgMode(lv){
  const s=qzSP().allg;setNav('home');
  app().innerHTML=`<a class="back" href="#/quiz/allg">← Schwierigkeit</a><header class="shead" style="--c:${s.color}"><span>${s.icon}</span><div><h1>${s.name}</h1><small>${lv==='alle'?'Alles gemischt':lv}</small></div></header>`+qzModes('allg',lv);qzModeBind('allg',lv)}
