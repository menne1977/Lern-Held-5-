/* ===== App ===== */
const SUBJ=[
 {id:'mathe',name:'Mathe',icon:'🔢',color:'#2563eb',book:'Parallelo 5 · NRW',ch:MATHE,lang:'de-DE'},
 {id:'englisch',name:'Englisch',icon:'🇬🇧',color:'#dc2626',book:'Blue Line 1',ch:ENG,lang:'en-GB'},
 {id:'deutsch',name:'Deutsch',icon:'📚',color:'#16a34a',book:'Rechtschreibung · Deutschbuch 5',ch:DEU,lang:'de-DE'},
 {id:'biologie',name:'Biologie',icon:'🌱',color:'#059669',book:'',ch:[],lang:'de-DE'},
 {id:'physik',name:'Physik',icon:'⚡',color:'#0284c7',book:'',ch:[],lang:'de-DE'},
 {id:'chemie',name:'Chemie',icon:'🧪',color:'#9333ea',book:'',ch:[],lang:'de-DE'},
 {id:'informatik',name:'Informatik',icon:'💻',color:'#0f766e',book:'',ch:[],lang:'de-DE'},
 {id:'politik',name:'Politik',icon:'🏛️',color:'#b45309',book:'',ch:[],lang:'de-DE'},
 {id:'geschichte',name:'Geschichte',icon:'📜',color:'#92400e',book:'',ch:[],lang:'de-DE'},
 {id:'musik',name:'Musik',icon:'🎵',color:'#db2777',book:'',ch:[],lang:'de-DE'},
 {id:'erdkunde',name:'Erdkunde',icon:'🌍',color:'#15803d',book:'',ch:[],lang:'de-DE'},
 {id:'franzoesisch',name:'Französisch',icon:'🇫🇷',color:'#1d4ed8',book:'Grundwortschatz',ch:langCh('fr'),lang:'fr-FR'},
 {id:'spanisch',name:'Spanisch',icon:'🇪🇸',color:'#ea580c',book:'Grundwortschatz',ch:langCh('es'),lang:'es-ES'},
 {id:'latein',name:'Latein',icon:'🏛️',color:'#78716c',book:'Grundwortschatz',ch:langCh('la'),lang:'it-IT'}];
function subIdx(name){const n=String(name||'').toLowerCase();if(/mathe/.test(n))return 0;if(/engl/.test(n))return 1;if(/deutsch|german/.test(n))return 2;if(/geo|erdk/.test(n))return 10;const i=SUBJ.findIndex(x=>n.indexOf(x.id.slice(0,4))>=0||n.indexOf(x.name.toLowerCase().slice(0,4))>=0);return i<0?2:i}
function klasse(){let k=5;try{k=+localStorage.getItem('sh5kl')||5}catch(e){}return Math.min(13,Math.max(5,k))}
const TOPICS={};
SUBJ.forEach(s=>s.ch.forEach((c,ci)=>c.tp.forEach(t=>{t.sub=s;t.chap=c;t.ci=ci;TOPICS[t.id]=t;})));
const $=s=>document.querySelector(s), app=()=>$('#app');
let P={};try{P=JSON.parse(localStorage.getItem('sh5')||'{}')}catch(e){}
const save=()=>{try{localStorage.setItem('sh5',JSON.stringify(P))}catch(e){}};
const stars=id=>{const r=(P[id]||{}).r||0;return r>=30?3:r>=15?2:r>=5?1:0};
const starStr=id=>'★'.repeat(stars(id))+'☆'.repeat(3-stars(id));
const gf=t=>t.vgen||(t.gen&&G[t.gen]);
const hasQ=t=>!!(gf(t)||(t.ex&&t.ex.length));
const strip=h=>String(h).replace(/<[^>]+>/g,' ').replace(/&[a-z]+;/g,' ').replace(/\s+/g,' ');
let curLang='de-DE';
function hrR(r){if(r)return r;try{return localStorage.getItem('sh5rate')==='langsam'?.55:.9}catch(e){return .9}}
function webSpeak(t,l,r){try{if(!window.speechSynthesis||!window.SpeechSynthesisUtterance)throw 0;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang=l;u.rate=hrR(r);const ch=(typeof vcChoose==='function')?vcChoose(l):{voice:null,pitch:1};u.pitch=ch.pitch;let v=ch.voice&&(speechSynthesis.getVoices()||[]).find(x=>x.voiceURI===ch.voice.uri||x.name===ch.voice.name);if(!v)v=(speechSynthesis.getVoices()||[]).find(x=>x.lang&&x.lang.replace('_','-').toLowerCase().startsWith(l.slice(0,2).toLowerCase()));if(v)u.voice=v;speechSynthesis.speak(u)}catch(e){noSound()}}
function noSound(){let d=document.getElementById('nosnd');if(!d){d=document.createElement('div');d.id='nosnd';d.style.cssText='position:fixed;left:12px;right:12px;bottom:80px;z-index:99;background:#333;color:#fff;padding:12px;border-radius:12px;font-size:14px';document.body.appendChild(d)}d.textContent='Kein Ton? Prüfe: Lautstärke an und in den Android-Einstellungen unter „Text-to-Speech“ die Google-Sprachausgabe mit Deutsch und Englisch installieren.';d.style.display='block';clearTimeout(d._t);d._t=setTimeout(()=>d.style.display='none',6000)}
function speak(t,l,r){l=l||curLang;try{const C=window.Capacitor,P=C&&C.isNativePlatform&&C.isNativePlatform()&&(C.Plugins.TextToSpeech||(C.registerPlugin&&C.registerPlugin('TextToSpeech')));if(P&&P.speak){try{P.stop&&P.stop().catch(()=>{})}catch(e){}(()=>{const ch=(typeof vcChoose==='function')?vcChoose(l):{voice:null,pitch:1},a={text:t,lang:l,rate:hrR(r),pitch:ch.pitch,volume:1,category:'ambient'};if(ch.voice&&typeof ch.voice.i==='number')a.voice=ch.voice.i;return P.speak(a)})().catch(()=>webSpeak(t,l,r));return}}catch(e){}webSpeak(t,l,r)}
document.addEventListener('click',e=>{const s=e.target.closest('.say');if(s){e.preventDefault();speak(s.dataset.t,s.dataset.l||(/[äöüß]/i.test(s.dataset.t)?'de-DE':curLang));}});
function ansText(q){let a=Array.isArray(q.a)?q.a[0]:q.a;if(q.kind==='num')return fmt(a);a=String(a);if(q.rest)a=a.replace('r',' R ');return a}
const PRAISE=['Super! 🎉','Richtig! ⭐','Stark! 💪','Genau! ✅','Klasse! 🚀','Top! 🌟','Prima! 👍'];

/* Router */
function go(h){location.hash=h}
window.addEventListener('hashchange',route);
function setNav(k){document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('on',a.dataset.k===k))}
function route(){
  const raw=location.hash.slice(1)||'/',[path,qs]=raw.split('?'),p=path.split('/').filter(Boolean);
  window.scrollTo(0,0);document.body.dataset.v=p[0]||'home';
  const t=TOPICS[p[1]];if(t)curLang=t.sub.lang;
  if(!p.length)return home();
  if(p[0]==='s'&&p[1]==='eu')return langEuPage();
  if(p[0]==='s'&&p[1]==='hoeren'||p[0]==='hoeren')return hoerenPage(p[0]==='hoeren'?p[1]:p[2]);
  if(p[0]==='s'&&p[1]==='lesen')return lesenPage();
  if(p[0]==='lesen')return lesenRoute(p[1]);
  if(p[0]==='sprachen')return langEuPage();
  if(p[0]==='ws')return wsPage(p[1]);
  if(p[0]==='bilder'&&t)return bilderPage(t);
  if(p[0]==='s')return subject(p[1]);
  if(p[0]==='t'&&t)return topic(t);
  if(p[0]==='slides'&&t)return slides(t,+p[2]||0);
  if(p[0]==='practice'&&t)return practice(t);
  if(p[0]==='sheet'&&t)return sheet(t);
  if(p[0]==='search')return search(decodeURIComponent((qs||'').replace(/^q=/,'')));
  if(p[0]==='stimme')return stimmePage();
  if(p[0]==='calc')return p[1]==='weg'?calcWeg():calc();
  if(p[0]==='photo')return photo();
  if(p[0]==='mine')return mineList();
  if(p[0]==='import')return importPage();
  if(p[0]==='packs')return packsPage();
  if(p[0]==='backup')return backupPage();
  if(p[0]==='vocab')return vocRoute(p[1]);
  if(p[0]==='settings')return settings();
  if(p[0]==='ki')return kiPage(p[1]);
  if(p[0]==='help')return helpPage();
  if(p[0]==='klasse')return klassePage();
  if(p[0]==='explain')return explainPage(p[1],decodeURIComponent((qs||'').replace(/^q=/,'')));
  if(p[0]==='dictat')return dictatPage(p[1]);
  if(p[0]==='books')return booksPage(p[1]);
  if(p[0]==='lib')return p[1]==='view'?libView(p[2]):libPage(p[1]);
  if(p[0]==='manage')return managePage();
  if(p[0]==='videos')return videosPage(p[1]);
  if(p[0]==='online')return onlineExPage(p[1],decodeURIComponent((qs||'').replace(/^q=/,'')));
  if(p[0]==='tricks')return tricks();
  if(p[0]==='quiz')return p[1]==='allg'&&p[2]&&p[2]!=='10'&&p[2]!=='inf'?(p[3]?quizPlay('allg',p[3],p[2]):quizAllgMode(p[2])):p[2]?quizPlay(p[1],p[2]):p[1]?quizSubject(p[1]):quizHome();
  home();
}
/* Home */
let deferredInstall=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstall=e;const b=$('#inst');if(b)b.hidden=false});
function home(){
  setNav('home');
  const total=Object.keys(TOPICS).length,got=Object.keys(TOPICS).filter(id=>stars(id)>0).length;
  app().innerHTML=`<header class="hero"><div class="logo">🦸</div><h1>Schul-Held</h1><p>Alle Fächer · üben, verstehen, erklären lassen</p><a class="klbtn" href="#/klasse">🎓 Klasse ${klasse()} – ändern</a></header>
  <a class="searchbar" href="#/search">🔎 Suche in allen Fächern …</a>
  <div class="grid">${SUBJ.map(s=>{const ids=s.ch.flatMap(c=>c.tp.map(t=>t.id)),d=ids.filter(i=>stars(i)>0).length;return `<a class="subj" style="--c:${s.color}" href="#/s/${s.id}"><span class="ic">${s.icon}</span><b>${s.name}</b><small>${s.book}</small><i class="pb"><u style="width:${ids.length?Math.round(d/ids.length*100):0}%"></u></i><small>${d} von ${ids.length} Themen geübt</small></a>`}).join('')}</div>
  <h2>Schnell starten</h2>
  <div class="quick"><a href="#/lesen">📖<b>Lesen lernen</b><small>Silben farbig, Blitzlesen, Lesetempo</small></a><a href="#/sprachen">🇪🇺<b>Sprachen Europas</b><small>Französisch, Spanisch, Latein und mehr</small></a><a href="#/hoeren">👂<b>Hören &amp; Aussprache</b><small>Hörverstehen in 12 Sprachen</small></a><a href="#/stimme">🔊<b>Stimme</b><small>Frau oder Mann, Tempo, Stimme wählen</small></a><a href="#/ws">🖨️<b>Arbeitsblatt erstellen</b><small>App, KI oder Internet – zum Drucken</small></a><a href="#/quiz">🎯<b>Quiz</b><small>10er-Runde oder endlos, alle Fächer</small></a><a href="#/ki">🤖<b>KI-Auftrag bauen</b><small>Foto → ChatGPT/Gemini/Claude → App</small></a><a href="#/explain">📖<b>Erklär mir …</b><small>Folien für Kinder, einfach oder ausführlich</small></a><a href="#/dictat">✍️<b>Diktat</b><small>endlos, zum Hören und Schreiben</small></a><a href="#/lib">📁<b>Meine Dateien</b><small>eBooks, PDF, Bilder je Fach</small></a><a href="#/books">📚<b>Bücher &amp; ISBN</b><small>freie Bücher online finden</small></a><a href="#/help">❓<b>Anleitung</b><small>So funktioniert die App</small></a><a href="#/calc">🧮<b>Rechen-Helfer</b><small>Rechnung eingeben – Rechenweg sehen</small></a><a href="#" id="rnd">🎲<b>Zufalls-Übung</b><small>Ein Thema wird ausgewählt</small></a><a href="#/photo">📷<b>Seite fotografieren</b><small>Aufgaben aus dem Buch bauen</small></a><a href="#/mine">🗂️<b>Meine Sachen</b><small>Meine Fotos &amp; Übungen</small></a><a href="#/tricks">🪄<b>Trick-Kiste</b><small>Schneller rechnen</small></a><a href="#/settings">🤖<b>KI-Hilfe (Gemini)</b><small>Optional: mehr Übungen &amp; Erklärungen</small></a><a href="#/search?q=Wortarten">🌐<b>Im Netz suchen</b><small>Kinderlexikon &amp; Wikipedia</small></a></div>
  <button id="inst" class="big-btn" ${deferredInstall?'':'hidden'}>📲 Als App installieren</button>
  <p class="hint" id="ioshint" hidden>iPhone/iPad: In Safari auf <b>Teilen</b> tippen → <b>Zum Home-Bildschirm</b>.</p>
  <p class="foot">⭐ ${got} von ${total} Themen mit Sternen · Daten bleiben auf diesem Gerät</p>`;
  $('#rnd').onclick=e=>{e.preventDefault();const ids=Object.keys(TOPICS).filter(i=>hasQ(TOPICS[i]));go('#/practice/'+pick(ids))};
  const ib=$('#inst');if(ib)ib.onclick=async()=>{deferredInstall.prompt();deferredInstall=null;ib.hidden=true};
  if(/iphone|ipad|ipod/i.test(navigator.userAgent)&&!window.navigator.standalone)$('#ioshint').hidden=false;
}
/* Fach */
function subject(id){
  if(id==='mine')return mineList();
  setNav('home');const s=SUBJ.find(x=>x.id===id);if(!s)return home();const si=SUBJ.indexOf(s);
  app().innerHTML=`<a class="back" href="#/">← Start</a><header class="shead" style="--c:${s.color}"><span>${s.icon}</span><div><h1>${s.name}</h1><small>${s.book}</small></div></header>
  <a class="searchbar" href="#/search">🔎 Suchen …</a>`+subjTools(s,si)+(s.ch.length?'<h2>📘 Themen aus der App</h2>':'')+s.ch.map((c,ci)=>`<details class="chap" ${ci===0?'open':''} style="--c:${s.color}"><summary>${c.i} ${c.t}<small>${c.tp.length} Themen</small></summary>${c.tp.map(t=>`<a class="row" href="#/t/${t.id}"><span>${t.title}</span><em>${hasQ(t)?starStr(t.id):'📖'}</em></a>`).join('')}</details>`).join('')+subjMine(si);
}
function tricks(){
  setNav('tricks');const c=MATHE[MATHE.length-1];
  app().innerHTML=`<a class="back" href="#/">← Start</a><header class="shead" style="--c:#7c3aed"><span>🪄</span><div><h1>Trick-Kiste</h1><small>Schneller rechnen im Kopf</small></div></header><p class="lead">Mit diesen Tricks rechnest du viele Aufgaben im Kopf. Öffne einen Trick, lies die Folien und probiere ihn aus!</p>`+c.tp.map(t=>`<a class="row" href="#/t/${t.id}"><span>${t.title}</span><em>${starStr(t.id)}</em></a>`).join('');
}
/* Thema */
function topic(t){
  setNav('home');const s=t.sub;
  app().innerHTML=`<a class="back" href="#/s/${s.id}">← ${s.name}</a>
  <header class="thead" style="--c:${s.color}"><small>${t.chap.i} ${t.chap.t}</small><h1>${t.title}</h1><div class="st">${hasQ(t)?starStr(t.id):''}</div></header>
  <div class="acts"><a class="act" href="#/slides/${t.id}/0">📖<b>Erklärung</b><small>${t.s.length} Folien</small></a>
  ${hasQ(t)?`<a class="act" href="#/practice/${t.id}">✏️<b>Üben</b><small>endlos</small></a><a class="act" href="#/sheet/${t.id}">📝<b>Aufgaben</b><small>10 mit Lösungen</small></a>`:''}
  ${(t.extra||[]).map(e=>`<a class="act" href="${e.h}">${e.i}<b>${e.l}</b><small>${e.s||''}</small></a>`).join('')}<a class="act" href="#/bilder/${t.id}">🖼️<b>Bilder</b><small>aus Wikipedia</small></a><a class="act" href="#/search?q=${encodeURIComponent(t.title)}">🌐<b>Im Netz</b><small>mehr erfahren</small></a><a class="act" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent((t.title+' '+(t.mine?t.chap.t:s.name)+' Klasse '+klasse()+' einfach erklärt').replace(/<[^>]+>/g,''))}">🎬<b>Videos</b><small>Erklärvideos (online)</small></a></div>
  ${t.trick?`<div class="trick">💡 <b>Merke:</b> ${t.trick}</div>`:''}
  <h2>Zum Nachlesen</h2>${t.s.map(x=>`<section class="rd"><h3>${x[0]}</h3><div>${x[1]}</div></section>`).join('')}${t.mine?'<button id="gm2" class="big-btn" style="background:#7c3aed">🤖 Mehr Übungen mit KI bauen</button><div id="gst" class="hint"></div><button id="dm" class="big-btn" style="background:#dc2626">🗑️ Diese Sache löschen</button>':''}`;
  if(t.mine)$('#gm2').onclick=async()=>{if(!gemCfg().key){$('#gst').innerHTML='Erst den KI-Schlüssel eintragen: <a href="#/settings" style="color:var(--ac)">KI-Einstellungen</a>';return}const it=MINE.find(x=>x.id===t.mine);$('#gst').textContent='Die KI baut Übungen … (kann 10–30 Sekunden dauern)';try{const n=await aiBuild(it,12,null);$('#gst').textContent=n+' neue Aufgaben! Seite wird neu geladen …';setTimeout(()=>topic(TOPICS['m_'+it.id]),900)}catch(e){$('#gst').textContent='Fehler: '+e.message}};
  if(t.mine)$('#dm').onclick=()=>{if(!confirm('Wirklich löschen?'))return;MINE=MINE.filter(x=>x.id!==t.mine);delete TOPICS['m_'+t.mine];delete TOPICS['mv_'+t.mine];saveMine();go('#/mine')};
}
/* Folien */
function slides(t,i){
  setNav('home');i=Math.max(0,Math.min(t.s.length-1,i));const x=t.s[i],last=i===t.s.length-1,s=t.sub;
  app().innerHTML=`<div class="stop"><a href="#/t/${t.id}">✕</a><div class="dots">${t.s.map((_,k)=>`<i class="${k<=i?'on':''}"></i>`).join('')}</div><span>${i+1}/${t.s.length}</span></div>
  <div class="slide in" style="--c:${s.color}"><h2>${x[0]}</h2><div class="sbody">${x[1]}${!t.mine&&i===0&&!/<svg/.test(x[1])&&t.sub&&!['englisch','franzoesisch','spanisch','latein','eu','hoeren','lesen'].includes(t.sub.id)?bildFor(t.title+' '+(t.tags||'')):''}</div></div>
  <div class="snav"><button id="pv" ${i?'':'disabled'}>◀ Zurück</button>${last?(hasQ(t)?`<a class="go" href="#/practice/${t.id}">✏️ Jetzt üben</a>`:`<a class="go" href="#/t/${t.id}">Fertig ✔</a>`):`<button id="nx" class="go">Weiter ▶</button>`}</div>`;
  const to=k=>go(`#/slides/${t.id}/${k}`);
  const pv=$('#pv'),nx=$('#nx');if(pv)pv.onclick=()=>to(i-1);if(nx)nx.onclick=()=>to(i+1);
  let x0=null;const sl=$('.slide');sl.ontouchstart=e=>x0=e.touches[0].clientX;sl.ontouchend=e=>{if(x0==null)return;const d=e.changedTouches[0].clientX-x0;x0=null;if(d<-50&&!last)to(i+1);if(d>50&&i)to(i-1)};
  window.onkeydown=e=>{if(location.hash.indexOf('#/slides/')!==0)return;if(e.key==='ArrowRight'&&!last)to(i+1);if(e.key==='ArrowLeft'&&i)to(i-1)};
}
/* Üben */
function qSource(t){const g=gf(t),ex=t.ex||[];let queue=shuffle(ex);
  return()=>{let q;if(queue.length)q=queue.shift();else if(g)q=g();else{queue=shuffle(ex);q=queue.shift()}return q}}
function practice(t){
  setNav('home');if(!hasQ(t))return go('#/t/'+t.id);
  const S={src:qSource(t),n:0,ok:0,streak:0,q:null,opts:null,done:false};
  const next=()=>{S.q=S.src();S.opts=S.q.opts?shuffle(S.q.opts):null;S.done=false;draw()};
  const draw=()=>{const q=S.q;
    app().innerHTML=`<div class="stop"><a href="#/t/${t.id}">✕ Ende</a><div class="bar"><i style="width:${(S.n%10)*10}%"></i></div><span>⭐ ${S.ok}/${S.n}</span></div>
    <div class="qcard" style="--c:${t.sub.color}"><small class="qt">${t.title}</small><div class="q">${q.q}</div>${q.speak?`<button class="say spk" data-t="${esc(q.speak)}"${q.sl?` data-l="${q.sl}"`:''}>🔊 Anhören</button><button class="spk" id="slow">🐢 Langsam</button>`:''}
    ${S.opts?`<div class="opts">${S.opts.map((o,k)=>`<button class="opt" data-k="${k}">${esc(o)}</button>`).join('')}</div>`:`<input id="in" class="ans" autocomplete="off" autocapitalize="off" spellcheck="false" inputmode="${q.kind==='num'?'decimal':'text'}" placeholder="Deine Antwort"><button id="chk" class="go">Prüfen</button>`}
    ${q.hint?`<button id="hb" class="lnk">💡 Tipp</button><div id="hint" class="tip" hidden>${q.hint}</div>`:''}
    <div id="fb"></div></div>`;
    if(q.speak){$('#slow').onclick=()=>speak(q.speak,q.sl||curLang,.5);if(q.auto)setTimeout(()=>speak(q.speak,q.sl||curLang),300)}
    if(q.hint)$('#hb').onclick=()=>{$('#hint').hidden=false};
    if(S.opts)document.querySelectorAll('.opt').forEach(b=>b.onclick=()=>finish(S.opts[+b.dataset.k],b));
    else{const inp=$('#in');inp.focus();inp.onkeydown=e=>{if(e.key==='Enter')finish(inp.value)};$('#chk').onclick=()=>finish(inp.value)}
  };
  const finish=(val,btn)=>{
    if(S.done)return;const q=S.q,ok=checkAns(q,val);if(ok===null)return;S.done=true;S.n++;if(ok){S.ok++;S.streak++}else S.streak=0;
    const rec=P[t.id]||(P[t.id]={n:0,r:0});rec.n++;if(ok)rec.r++;save();if(q.speakAfter)speak(q.speakAfter,q.sl||curLang);
    document.querySelectorAll('.opt').forEach(b=>{b.disabled=true;if(q.kind==='choice'&&[].concat(q.a).map(String).includes(S.opts[+b.dataset.k]))b.classList.add('good');else if(b===btn)b.classList.add('bad')});
    const inp=$('#in');if(inp){inp.disabled=true;inp.classList.add(ok?'good':'bad');$('#chk').remove()}
    $('#fb').innerHTML=`<div class="fb ${ok?'ok':'no'}"><b>${ok?pick(PRAISE):'Nicht ganz.'}</b>${ok?'':` Richtig ist: <b>${ansText(q)}</b>`}${S.streak>=3&&ok?` · 🔥 ${S.streak} in Folge`:''}</div>${q.steps?`<div class="steps"><b>So geht's:</b><div>${q.steps}</div></div>`:''}${S.n%10===0?`<div class="round">🎉 ${S.n} Aufgaben geschafft! Weiter so – oder oben auf „Ende“.</div>`:''}${gemCfg().key?'<button id="ge" class="lnk">🤖 Erkläre mir das</button><div id="gx" class="steps" hidden></div>':''}<button id="nxt" class="go">Weiter ▶</button>`;
    const ge=$('#ge');if(ge)ge.onclick=async()=>{const gx=$('#gx');gx.hidden=false;gx.textContent='Die KI überlegt …';try{gx.textContent=await gemini(`Erkläre einem Kind der ${klasse()}. Klasse (${sfText()}) kurz, einfach und freundlich auf Deutsch (höchstens 5 Sätze, Beispiel erlaubt), warum die richtige Antwort stimmt. Fach: ${t.sub.name}. Aufgabe: ${strip(q.q)}. Richtige Antwort: ${ansText(q)}. Antwort des Kindes: ${val}.`)}catch(e){gx.textContent='Fehler: '+e.message}};
    const nb=$('#nxt');nb.focus();nb.onclick=next;
  };
  next();
}
/* Arbeitsblatt */
function sheet(t){
  setNav('home');if(!hasQ(t))return go('#/t/'+t.id);const src=qSource(t),qs=[];for(let i=0;i<10;i++)qs.push(src());
  app().innerHTML=`<a class="back" href="#/t/${t.id}">← ${t.title}</a><h1>📝 ${t.title}</h1><p class="lead">Rechne zuerst selbst auf einem Blatt. Dann zeigst du die Lösungen.</p>
  <ol class="sheet">${qs.map(q=>`<li><div>${q.q}</div>${q.speak?`<button class="say spk" data-t="${esc(q.speak)}">🔊 Anhören</button>`:''}${q.opts?`<div class="chs">${q.opts.map((o,k)=>`<button class="opt sh-opt" data-k="${k}">${esc(o)}</button>`).join('')}</div>`:`<div class="shin"><input class="ans sh-in" inputmode="${q.kind==='num'?'decimal':'text'}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Deine Antwort"><button class="go sh-chk">Prüfen</button></div>`}<div class="sh-fb"></div><details class="sol"><summary>Lösung</summary><b>${ansText(q)}</b>${q.steps?`<div class="steps">${q.steps}</div>`:''}</details></li>`).join('')}</ol>
  <div class="row2"><button id="sa" class="go">Alle Lösungen zeigen</button><button id="nw">🔄 Neue Aufgaben</button><button id="pr">🖨️ Drucken</button></div>`;
  document.querySelectorAll('.sheet > li').forEach((li,i)=>{const q=qs[i],fb=li.querySelector('.sh-fb');
    const show=(ok)=>{fb.innerHTML=`<div class="fb ${ok?'ok':'no'}"><b>${ok?'Richtig! 🎉':'Nicht ganz.'}</b>${ok?'':` Richtig ist: <b>${ansText(q)}</b>`}</div>`};
    li.querySelectorAll('.sh-opt').forEach(b=>b.onclick=()=>{if(li.dataset.done)return;li.dataset.done=1;const ok=checkAns(q,q.opts[+b.dataset.k])===true;
      li.querySelectorAll('.sh-opt').forEach(x=>{x.disabled=true;if([].concat(q.a).map(String).includes(q.opts[+x.dataset.k]))x.classList.add('good')});if(!ok)b.classList.add('bad');show(ok)});
    const inp=li.querySelector('.sh-in');if(inp){const check=()=>{if(li.dataset.done)return;const r=checkAns(q,inp.value);if(r===null)return;li.dataset.done=1;const ok=r===true;inp.disabled=true;inp.classList.add(ok?'good':'bad');li.querySelector('.sh-chk').remove();show(ok)};
      inp.onkeydown=e=>{if(e.key==='Enter')check()};li.querySelector('.sh-chk').onclick=check}
  });
  $('#sa').onclick=()=>document.querySelectorAll('.sol').forEach(d=>d.open=true);$('#nw').onclick=()=>sheet(t);$('#pr').onclick=()=>doPrint(t.title);
}
/* Suche */
let INDEX=null;
function buildIndex(){INDEX=Object.values(TOPICS).map(t=>({t,title:t.title.toLowerCase(),tags:(t.tags||'').toLowerCase(),text:strip(t.s.map(x=>x[0]+' '+x[1]).join(' ')+' '+(t.trick||'')).toLowerCase()}))}
function searchLocal(q){if(!INDEX)buildIndex();const toks=q.toLowerCase().split(/\s+/).filter(Boolean);if(!toks.length)return[];
  return INDEX.map(e=>{let sc=0;for(const k of toks){let m=0;if(e.title.includes(k))m+=6;if(e.tags.includes(k))m+=3;if(e.text.includes(k))m+=1;if(!m)return null;sc+=m}return {t:e.t,sc}}).filter(Boolean).sort((a,b)=>b.sc-a.sc).slice(0,30)}
function search(q){
  setNav('search');
  app().innerHTML=`<h1>🔎 Suche</h1><input id="sq" class="ans" type="search" placeholder="z. B. Brüche, Plural, simple past, Umfang …" value="${esc(q)}" autocomplete="off"><div id="res"></div><div id="web"></div>`;
  const run=()=>{const v=$('#sq').value.trim(),res=$('#res');$('#web').innerHTML='';
    if(!v){res.innerHTML='<p class="lead">Tippe ein Stichwort. Ich suche in allen Themen, Vokabeln und – mit Internet – auch im Kinderlexikon.</p>';return}
    const r=searchLocal(v),vo=v.length>1?ALLVOC.filter(w=>w.en.toLowerCase().includes(v.toLowerCase())||w.de.toLowerCase().includes(v.toLowerCase())).slice(0,10):[];
    res.innerHTML=(r.length?'<h2>Themen</h2>'+r.map(x=>`<a class="row" href="#/t/${x.t.id}"><span>${x.t.sub.icon} ${x.t.title}<small>${x.t.chap.t}</small></span><em>${hasQ(x.t)?starStr(x.t.id):'📖'}</em></a>`).join(''):'<p class="lead">Nichts gefunden in den Themen.</p>')
     +(vo.length?'<h2>Englisch-Wörterbuch</h2>'+vo.map(w=>`<div class="row"><span>${esc(w.en)} <small>${esc(w.de)}</small></span><button class="say spk" data-t="${esc(w.en)}">🔊</button></div>`).join(''):'')
     +`<button id="wb" class="big-btn">🌐 Im Internet weitersuchen</button>`;
    $('#wb').onclick=()=>online(v);
  };
  $('#sq').oninput=()=>{clearTimeout(search.t);search.t=setTimeout(run,150)};$('#sq').onkeydown=e=>{if(e.key==='Enter')run()};
  run();if(q)$('#sq').blur();else $('#sq').focus();
}
async function online(q){
  const out=$('#web'),enc=encodeURIComponent(q);out.innerHTML='<p class="lead">Suche im Internet …</p>';
  const src=[['Klexikon – das Kinderlexikon','https://klexikon.zum.de/api.php','https://klexikon.zum.de/wiki/'],['Wikipedia','https://de.wikipedia.org/w/api.php','https://de.wikipedia.org/wiki/']];
  const links=`<div class="row2"><a class="btn" target="_blank" rel="noopener" href="https://klexikon.zum.de/index.php?search=${enc}">Klexikon</a><a class="btn" target="_blank" rel="noopener" href="https://de.wikipedia.org/w/index.php?search=${enc}">Wikipedia</a><a class="btn" target="_blank" rel="noopener" href="https://www.google.com/search?q=${enc}+Klasse+${klasse()}">Google</a><a class="btn" target="_blank" rel="noopener" href="https://www.dict.cc/?s=${enc}">dict.cc</a></div>`;
  let html='';
  for(const [name,api,base] of src){
    try{const r=await fetch(`${api}?action=query&format=json&origin=*&generator=search&gsrsearch=${enc}&gsrlimit=3&prop=extracts&exintro=1&explaintext=1&exlimit=max&exchars=420`);const j=await r.json();
      const pages=Object.values((j.query&&j.query.pages)||{}).sort((a,b)=>a.index-b.index);
      if(pages.length)html+=`<h2>${name}</h2>`+pages.map(p=>`<article class="web"><h3>${esc(p.title)}</h3><p>${esc(p.extract||'')}</p><a target="_blank" rel="noopener" href="${base}${encodeURIComponent(p.title.replace(/ /g,'_'))}">Weiterlesen ↗</a></article>`).join('');
    }catch(e){}
  }
  out.innerHTML=(html||'<p class="lead">Keine Online-Treffer – bist du mit dem Internet verbunden? Probiere die Links:</p>')+links;
}
/* Rechen-Helfer */
function calcWeg(){
  setNav('calc');
  app().innerHTML=`<a class="back" href="#/calc">← Taschenrechner</a><h1>📝 Rechenweg</h1><p class="lead">Gib eine Rechnung ein – ich zeige dir <b>Ergebnis, Rechenweg und Tricks</b>.</p>${wegModeBar()}<p class="hint" style="margin-top:0">⚡ Einfach = kurzer Weg · 📘 Ausführlich = Schritt für Schritt wie im Heft mit Probe</p>
  <input id="ex" class="ans" autocomplete="off" autocapitalize="off" placeholder="z. B. 345 + 278" inputmode="text">
  <div class="keys">${['+','−','·',':','(',')','/','von'].map(k=>`<button data-k="${k}">${k}</button>`).join('')}<button id="del">⌫</button></div>
  <button id="go" class="go big-btn">Rechnen</button><div id="out"></div>
  <h2>Beispiele</h2><div class="chips">${['345 + 278','1203 − 457','47 · 6','345 · 27','1296 : 12','156 : 12','3 + 4 · 5','(3 + 4) · 5','3/4 von 20','3/4 + 1/6','2/3 · 3/5','12,5 + 3,75','4,2 · 1,5','7,5 : 2,5','10 : 3','primfaktoren 84','ggt 12 18','kgv 4 6','kürze 18/24','20 % von 150','2^5','wurzel 144','teiler 36','4372 runden auf 100','48 · 11'].map(e=>`<button class="chip">${e}</button>`).join('')}</div>
  <p class="hint">Auch möglich: Brüche (3/4 + 1/6), Prozent (20 % von 150), Potenzen (2^5), Wurzeln (wurzel 144). Tausenderpunkte bitte weglassen. Für Kommazahlen: 2,5 + 1,25. Teilen: <b>:</b> oder <b>/</b>.</p>`;
  const inp=$('#ex'),run=()=>{$('#out').innerHTML=`<div class="result">${solveWeg(inp.value)}</div>`};
  document.querySelectorAll('.wgm').forEach(b=>b.onclick=()=>{wegSet(b.dataset.v);document.querySelectorAll('.wgm').forEach(x=>x.classList.toggle('on',x===b));if(inp.value.trim())run()});
  $('#go').onclick=run;inp.onkeydown=e=>{if(e.key==='Enter')run()};
  document.querySelectorAll('.keys [data-k]').forEach(b=>b.onclick=()=>{inp.value+=b.dataset.k==='von'?' von ':b.dataset.k;inp.focus()});
  $('#del').onclick=()=>{inp.value=inp.value.slice(0,-1);inp.focus()};
  document.querySelectorAll('.chip').forEach(b=>b.onclick=()=>{inp.value=b.textContent;run()});
  if(window.__tcWeg){inp.value=window.__tcWeg;window.__tcWeg='';run()}
}

/* Foto -> Aufgaben */
async function ocrConf(){try{const r=await fetch('ocr/tesseract.min.js',{method:'HEAD'});if(r.ok&&/javascript/.test(r.headers.get('content-type')||'')){const b=n=>new URL(n,location.href).href;return{src:'ocr/tesseract.min.js',local:true,opt:{workerPath:b('ocr/worker.min.js'),corePath:b('ocr/core'),langPath:b('ocr/lang'),gzip:false,workerBlobURL:false}}}}catch(e){}return{src:'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js',local:false,opt:{}}}
function loadScript(u){return new Promise((ok,no)=>{if(window.Tesseract)return ok();const s=document.createElement('script');s.src=u;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
function shrink(file){return new Promise(ok=>{const im=new Image();im.onload=()=>{const k=Math.min(1,2000/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*k;c.height=im.height*k;c.getContext('2d').drawImage(im,0,0,c.width,c.height);c.toBlob(b=>ok(b),'image/jpeg',.9)};im.onerror=()=>ok(file);im.src=URL.createObjectURL(file)})}
function isEnglish(t){const en=(t.toLowerCase().match(/\b(the|and|is|are|you|i|to|a|my|he|she|it|we|they|in|on|of)\b/g)||[]).length,de=(t.toLowerCase().match(/\b(der|die|das|und|ist|ich|nicht|ein|eine|wir|sie|er|es|mit|zu|auf)\b/g)||[]).length;return en>de}
function findMath(text){const out=[],seen=new Set(),re=/(\d[\d.,]*)\s*([+\-−–·×x*:÷\/])\s*(\d[\d.,]*)(?:\s*([+\-−–·×x*:÷\/])\s*(\d[\d.,]*))?/g;let m;
  while((m=re.exec(text))){let e=m[0].toLowerCase().replace(/[×x·]/g,'*').replace(/÷/g,'/').replace(/:/g,'/').replace(/[−–]/g,'-').replace(/,/g,'.').replace(/\s+/g,'');if(seen.has(e)||!/^[\d+\-*/.]+$/.test(e)||/\.\./.test(e))continue;
    try{const r=evalSteps(e);if(!isFinite(r.val))continue;seen.add(e);out.push({e,show:e.replace(/\*/g,' · ').replace(/\//g,' : ').replace(/-/g,' − ').replace(/\+/g,' + '),val:Math.round(r.val*1e6)/1e6})}catch(x){}}
  return out}
function makeEx(text){
  const sents=text.replace(/\s+/g,' ').split(/(?<=[.!?])\s+/).filter(x=>x.split(' ').length>=4&&x.length<160);
  const words=[...new Set((text.match(/[A-Za-zÄÖÜäöüß]{4,}/g)||[]))];const ex=[];
  sents.forEach(se=>{const ws=se.split(' ').map((w,i)=>({w:w.replace(/[^A-Za-zÄÖÜäöüß]/g,''),i})).filter(x=>x.w.length>=4&&x.i>0);if(!ws.length)return;const c=pick(ws);
    const gap=se.split(' ').map((w,i)=>i===c.i?w.replace(c.w,'_____'):w).join(' ');ex.push(Q(`Setze das fehlende Wort ein:<div class="big">${esc(gap)}</div>`,c.w,{hint:`Das Wort beginnt mit „${c.w[0]}“ und hat ${c.w.length} Buchstaben.`,steps:`Richtig: ${esc(se)}`,speak:se}))});
  shuffle(words).slice(0,25).forEach(w=>ex.push(Q('Höre das Wort und schreibe es richtig auf:',w,{speak:w,hint:`${w.length} Buchstaben, Anfang: ${w[0]}`,steps:`Richtig: <b>${esc(w)}</b>`})));
  return ex}
/* ===== KI (Gemini, optional) ===== */
const gemCfg=()=>{try{return JSON.parse(localStorage.getItem('sh5gem')||'{}')}catch(e){return{}}};
async function gemini(prompt,o={}){const c=gemCfg();if(!c.key)throw new Error('Kein KI-Schlüssel eingetragen.');
  const parts=[{text:prompt}];[].concat(o.img||[]).forEach(d=>parts.push({inline_data:{mime_type:'image/jpeg',data:d}}));
  const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+encodeURIComponent(c.model||'gemini-2.5-flash')+':generateContent?key='+encodeURIComponent(c.key),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts}],generationConfig:Object.assign({temperature:.4},o.json?{responseMimeType:'application/json'}:{})})});
  const j=await r.json();if(!r.ok)throw new Error((j.error&&j.error.message)||('Fehler '+r.status));
  return(((j.candidates||[])[0]||{}).content||{parts:[]}).parts.map(x=>x.text||'').join('')}
function parseAI(txt){const a=txt.indexOf('{'),b=txt.lastIndexOf('}');const j=JSON.parse(txt.slice(a,b+1));
  const tasks=(j.tasks||[]).filter(t=>t&&t.q&&t.answer!=null&&String(t.answer)!=='').map(t=>{let ty=t.type==='choice'&&Array.isArray(t.options)&&t.options.length>=2?'choice':(t.type==='num'&&isFinite(Number(String(t.answer).replace(',','.')))?'num':'text');
    return{t:ty,q:String(t.q),o:(t.options||[]).map(String),a:ty==='num'?Number(String(t.answer).replace(',','.')):String(t.answer),al:(t.alt||[]).map(String),h:t.hint?String(t.hint):'',e:t.explain?String(t.explain):''}});
  const vocab=(j.vocab||[]).filter(v=>Array.isArray(v)&&v.length>=2&&v[0]&&v[1]).map(v=>[String(v[0]),String(v[1])]);const slides=(j.slides||[]).filter(x=>x&&(x.title||x.text)).map(x=>({title:String(x.title||''),text:String(x.text||''),emoji:String(x.emoji||'')}));const dict=(j.dictation||j.dict||[]).map(String).filter(Boolean);return{tasks,vocab,slides,dict}}
function aiToQ(t){const q=esc(t.q).replace(/\n/g,'<br>'),o={hint:t.h?esc(t.h):undefined,steps:t.e?esc(t.e):undefined};
  if(t.t==='choice'){const opts=t.o.slice();if(!opts.includes(String(t.a)))opts.push(String(t.a));return Q(q,String(t.a),Object.assign(o,{kind:'choice',opts}))}
  if(t.t==='num')return Q(q,t.a,o);return Q(q,[String(t.a)].concat(t.al||[]),o)}
const idbOpen=()=>new Promise((ok,no)=>{const r=indexedDB.open('sh5img',1);r.onupgradeneeded=()=>r.result.createObjectStore('i');r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)});
async function imgGet(id){try{const d=await idbOpen();return await new Promise(ok=>{const q=d.transaction('i').objectStore('i').get(id);q.onsuccess=()=>ok(q.result||[]);q.onerror=()=>ok([])})}catch(e){return[]}}
async function imgPut(id,b64){try{const a=(await imgGet(id)).concat([b64]).slice(-4),d=await idbOpen();await new Promise(ok=>{const t=d.transaction('i','readwrite');t.objectStore('i').put(a,id);t.oncomplete=ok;t.onerror=ok})}catch(e){}}
async function aiBuild(it,n,img){if(!img)img=await imgGet(it.id);if(img&&!img.length)img=null;
  const fach=SUBJ[it.s].name;
  const regeln=it.s===0?'Löse jede Rechnung/Aufgabe der Seite mit Rechenweg (in "explain") und erfinde ähnliche Aufgaben mit anderen Zahlen. Aufgabentyp meist "num".':it.s===1?'Gib in "vocab" ALLE Vokabeln der Seite als [englisch, deutsch] aus. Erstelle Aufgaben: Lückensätze, Übersetzen, Grammatik (Simple Present/Past, to be …), Wortschatz-Auswahlfragen. Die Fragen sind auf Deutsch, die Beispielsätze englisch.':it.s===2?'Erstelle Aufgaben zu Rechtschreibung, Wortarten, Satzgliedern, Zeitformen, Zeichensetzung und Lückentexte passend zum Text der Seite.':'Erstelle Verständnisfragen, Fachbegriff-Fragen, Lückensätze und Anwendungsaufgaben zum Inhalt der Seite. Gib wichtige Fachbegriffe in "vocab" als [Begriff, kurze Erklärung] aus.';
  const prompt=`Du bist eine freundliche Lehrkraft für Klasse ${klasse()} (${sfText()}).${sfLevel()} Fach: ${fach}. Konzentriere dich auf das Wichtige der Seite und ignoriere Unwichtiges wie Seitenzahlen, Kopf-/Fußzeilen und Bildunterschriften. Erstelle aus dem folgenden Seiteninhalt genau ${n} abwechslungsreiche Übungsaufgaben für ein Kind. ${regeln}\nAntworte NUR mit JSON in genau dieser Form:\n{"vocab":[["english","deutsch"]],"tasks":[{"type":"choice|text|num","q":"Frage","options":["A","B","C"],"answer":"richtige Antwort","alt":["weitere akzeptierte Schreibweisen"],"hint":"kurzer Tipp","explain":"kindgerechte Erklärung in 1–3 Sätzen"}]}\nRegeln: Bei "choice" 3–4 Optionen, answer ist genau eine davon. Bei "num" ist answer nur eine Zahl (Dezimalkomma als Punkt). Bei "text" ist answer kurz (ein Wort oder eine kurze Zahlen-/Wortfolge). Keine Aufgaben, die man nur mit dem Bild lösen kann. Der Text kann Erkennungsfehler enthalten${img?'; das Foto ist maßgeblich':''}.\nSeiteninhalt:\n"""\n${it.text.slice(0,6000)}\n"""`;
  const r=parseAI(await gemini(prompt,{json:true,img}));if(!r.tasks.length)throw new Error('Die KI hat keine brauchbaren Aufgaben geliefert. Bitte nochmal versuchen.');
  it.ai=(it.ai||[]).concat(r.tasks);if(r.vocab.length)it.vocab=mergePairs(it.vocab||[],r.vocab);
  saveMine();buildMine(it);return r.tasks.length}
function settings(){
  setNav('home');const c=gemCfg();
  app().innerHTML=`<a class="back" href="#/">← Start</a><h1>🤖 KI-Hilfe (Gemini)</h1><p class="lead">Optional. Mit einem Google-Gemini-Schlüssel kann die App aus deinen Fotos <b>mehr und bessere Übungen</b> bauen, das Foto direkt lesen und Fragen <b>kindgerecht erklären</b>. Ohne Schlüssel geht alles andere weiter.</p>
  <ol><li>Auf <a style="color:var(--ac);font-weight:700" target="_blank" rel="noopener" href="https://aistudio.google.com/apikey">aistudio.google.com/apikey</a> einen kostenlosen Schlüssel erstellen.</li><li>Hier einfügen und speichern.</li></ol>
  <input id="gk" class="ans" type="password" placeholder="API-Schlüssel (AIza …)" value="${esc(c.key||'')}" autocomplete="off"><input id="gm" class="ans" placeholder="Modell" value="${esc(c.model||'gemini-2.5-flash')}">
  <div class="row2"><button id="gs" class="go">💾 Speichern</button><button id="gt">🧪 Testen</button><button id="gd">Schlüssel löschen</button></div><div id="gout" class="hint"></div>
  <p class="hint">Der Schlüssel bleibt nur auf diesem Gerät. Beim Benutzen werden Seitentext, Foto oder Fragen an Google gesendet – bei der kostenlosen Nutzung kann Google sie zur Verbesserung seiner Dienste verwenden. Fotos von Kindern oder persönliche Daten bitte nicht verwenden.</p>`;
  const save=()=>{try{localStorage.setItem('sh5gem',JSON.stringify({key:$('#gk').value.trim(),model:$('#gm').value.trim()||'gemini-2.5-flash'}))}catch(e){}};
  $('#gs').onclick=()=>{save();$('#gout').textContent='Gespeichert ✔'};$('#gd').onclick=()=>{try{localStorage.removeItem('sh5gem')}catch(e){}$('#gk').value='';$('#gout').textContent='Gelöscht.'};
  $('#gt').onclick=async()=>{save();$('#gout').textContent='Teste …';try{const t=await gemini('Antworte nur mit dem Wort: Hallo');$('#gout').textContent='Funktioniert ✔ ('+t.trim().slice(0,40)+')'}catch(e){$('#gout').textContent='Fehler: '+e.message}};
}
/* ===== Meine Sachen ===== */
let MINE=[];try{MINE=JSON.parse(localStorage.getItem('sh5mine')||'[]')}catch(e){}
const saveMine=()=>{try{localStorage.setItem('sh5mine',JSON.stringify(MINE))}catch(e){}try{vocSync()}catch(e){}};
const STOPW=new Set('the and are you that this with have from they what your were will would there their about which when them then than some into just like make know take come could other more also very only over such here should these those been being does done'.split(' '));
function extractPairs(text){const out=[];text.split(/\n/).forEach(l=>{const m=l.match(/^\s*(?:[•·*\d.)\-]+\s*)?([A-Za-z][A-Za-z' ,.\/()?!-]{1,40}?)\s*(?:[-–—=:|]|\t|\s{2,})\s*([A-Za-zÄÖÜäöüß][^\n]{1,50})$/);if(!m)return;const en=m[1].trim(),de=m[2].trim();if(/[äöüß]/i.test(en)||de.split(/\s+/).length>6||en.split(/\s+/).length>4)return;out.push([en,de])});return out}
function dictPairs(text){const out=[];[...new Set(text.toLowerCase().match(/[a-z']{2,}/g)||[])].forEach(w=>{const h=ALLVOC.find(x=>x.en.toLowerCase()===w);if(h)out.push([h.en,h.de])});return out}
async function onlinePairs(text,known){const k=new Set(known.map(x=>x[0].toLowerCase())),ws=[...new Set(text.toLowerCase().match(/[a-z]{3,}/g)||[])].filter(w=>!STOPW.has(w)&&!k.has(w)).slice(0,25),out=[];
  await Promise.all(ws.map(async w=>{try{const r=await fetch('https://api.mymemory.translated.net/get?q='+encodeURIComponent(w)+'&langpair=en|de'),j=await r.json(),t=((j.responseData||{}).translatedText||'').trim();if(t&&t.toLowerCase()!==w&&t.length<40&&!/[A-Z]{4,}/.test(t))out.push([w,t])}catch(e){}}));return out}
function mergePairs(a,b){const seen=new Set(),o=[];a.concat(b).forEach(p=>{const k=p[0].toLowerCase();if(!seen.has(k)){seen.add(k);o.push(p)}});return o}
function mathQ(m){return Q(`Rechne: <b>${m.show}</b>`,m.val,{steps:solveExpr(m.e)})}
function variantQ(m){const x=m.e.match(/^(\d+)([+\-*/])(\d+)$/);if(!x)return mathQ(m);const op=x[2],dA=x[1].length,dB=x[3].length,rn=d=>R(d===1?2:Math.pow(10,d-1),Math.pow(10,d)-1);let a=rn(dA),b=rn(dB),e;
  if(op==='-'&&b>a)[a,b]=[b,a];if(op==='/'){b=Math.max(2,rn(dB));a=b*R(2,Math.max(3,Math.min(60,Math.pow(10,Math.max(1,dA-dB+1))-1)))}
  e=''+a+op+b;const val=op==='+'?a+b:op==='-'?a-b:op==='*'?a*b:a/b;return Q(`Rechne (ähnliche Aufgabe): <b>${a} ${op==='*'?'·':op==='/'?':':op==='-'?'−':'+'} ${b}</b>`,val,{steps:solveExpr(e)})}
function scrambleQ(w){let t=w;for(let i=0;i<8&&t===w;i++)t=shuffle(w.split('')).join('');return Q(`Ordne die Buchstaben zu einem Wort:<div class="big">${esc(t.toUpperCase())}</div>`,w,{speak:w,hint:`Das Wort beginnt mit „${w[0]}“.`,steps:`Richtig: <b>${esc(w)}</b>`})}
function extraDeu(text,words){const ex=[],sents=text.replace(/\s+/g,' ').split(/(?<=[.!?])\s+/);
  shuffle(words.filter(w=>w.length>=5&&w.length<=12)).slice(0,12).forEach(w=>ex.push(scrambleQ(w)));
  sents.forEach(se=>{const ws=se.split(' ').map(w=>w.replace(/[^A-Za-zÄÖÜäöüß]/g,'')).filter(Boolean);const nouns=ws.filter((w,i)=>i>0&&/^[A-ZÄÖÜ]/.test(w)&&w.length>2),oth=ws.filter((w,i)=>i>0&&/^[a-zäöüß]/.test(w));if(nouns.length&&oth.length>=2){const n=pick(nouns),o=shuffle([n.toLowerCase(),...shuffle(oth).slice(0,2).map(x=>x.toLowerCase())]);ex.push(Q(`Welches Wort in diesem Satz ist ein <b>Nomen</b> (wird großgeschrieben)?<div class="big">${esc(se.toLowerCase())}</div>`,n.toLowerCase(),{kind:'choice',opts:o,steps:`Richtig: ${esc(se)}`}))}});
  for(let i=0;i<5&&words.length>=4;i++){const l=shuffle(words).slice(0,4),so=l.slice().sort((a,b)=>a.localeCompare(b,'de'));ex.push(Q(`Ordne die Wörter nach dem <b>Abc</b>:<div class="big">${l.join(' · ')}</div><small>Mit Leerzeichen schreiben.</small>`,so.join(' '),{pre:x=>x.replace(/[,;·]/g,' '),steps:so.join(', ')}))}
  return ex}
function vocabGen(list,en){if(en===false)return()=>{const w=pick(list);if(list.length>=4&&R(0,1)){const o=shuffle(list.filter(x=>x[1]!==w[1])).slice(0,3).map(x=>x[1]);return Q(`Was bedeutet <b>${esc(w[0])}</b>?`,w[1],{kind:'choice',opts:shuffle([w[1],...o]),steps:`${esc(w[0])}: ${esc(w[1])}`})}const o=shuffle(list.filter(x=>x[0]!==w[0])).slice(0,3).map(x=>x[0]);return Q(`Welcher Begriff passt? <b>${esc(w[1])}</b>`,w[0],{kind:'choice',opts:shuffle([w[0],...o]),steps:`${esc(w[0])}: ${esc(w[1])}`})};return()=>{const w=pick(list);if(list.length>=4&&R(0,1)){const o=shuffle(list.filter(x=>x[1]!==w[1])).slice(0,3).map(x=>x[1]);return Q(`Was heißt <b>${esc(w[0])}</b> auf Deutsch?`,w[1],{kind:'choice',opts:shuffle([w[1],...o]),speak:w[0],steps:`${esc(w[0])} = ${esc(w[1])}`})}
  return Q(`Wie heißt <b>${esc(w[1])}</b> auf Englisch?`,w[0],{hint:`Beginnt mit „${w[0][0]}“, ${w[0].length} Buchstaben.`,steps:`${esc(w[1])} = <b>${esc(w[0])}</b> ${say(w[0])}`})}}
function buildMine(it){
  const sub=Object.assign({},SUBJ[it.s],{id:'mine',name:'Meine Sachen'}),words=[...new Set(it.text.match(/[A-Za-zÄÖÜäöüß]{4,}/g)||[])];
  const base={id:'m_'+it.id,title:it.name,tags:it.text.slice(0,400),sub,chap:{t:it.sn,i:'🗂️'},s:[['Mein Text',esc(it.text).replace(/\n/g,'<br>')]],mine:it.id,ex:[],extra:[]};
  if(it.s===0){const ms=findMath(it.text);base.ex=ms.map(mathQ);if(ms.length)base.vgen=()=>R(0,2)?variantQ(pick(ms)):mathQ(pick(ms))}
  else if(it.s===1){base.ex=makeEx(it.text);const v=it.vocab||[];if(v.length){TOPICS['mv_'+it.id]=Object.assign({},base,{id:'mv_'+it.id,title:it.name+' – Vokabeln',ex:[],extra:[],s:[['Vokabelkarten','<div class="cards">'+v.map(w=>`<div class="fc say" data-t="${esc(w[0])}"><b>${esc(w[0])}</b><span>${esc(w[1])}</span></div>`).join('')+'</div>']],vgen:vocabGen(v)});base.extra=[{h:'#/practice/mv_'+it.id,i:'🃏',l:'Vokabel-Trainer',s:v.length+' Wörter'}]}}
  else{base.ex=makeEx(it.text).concat(extraDeu(it.text,words));const v=it.vocab||[];if(v.length>=2){TOPICS['mv_'+it.id]=Object.assign({},base,{id:'mv_'+it.id,title:it.name+' – Fachbegriffe',ex:[],extra:[],s:[['Fachbegriffe','<div class="cards">'+v.map(w=>`<div class="fc"><b>${esc(w[0])}</b><span>${esc(w[1])}</span></div>`).join('')+'</div>']],vgen:vocabGen(v,false)});base.extra=[{h:'#/practice/mv_'+it.id,i:'🃏',l:'Fachbegriffe üben',s:v.length+' Begriffe'}]}}
  if(it.slides&&it.slides.length){const used=new Set();base.s=it.slides.map(x=>[(x.emoji?x.emoji+' ':'')+esc(x.title),esc(x.text).replace(/\n/g,'<br>')+(it.s===1||it.s>=11?'':bildFor(x.title+' '+x.text,used))]).concat(base.s)}
  if(it.dict&&it.dict.length)base.extra=(base.extra||[]).concat([{h:'#/dictat/m_'+it.id,i:'✍️',l:'Diktat',s:it.dict.length+' Sätze'}]);
  base.chap={t:SUBJ[it.s].name+(it.book?' · '+it.book:''),i:SUBJ[it.s].icon};
  if(it.ai&&it.ai.length)base.ex=base.ex.concat(it.ai.map(aiToQ));
  TOPICS['m_'+it.id]=base}
MINE.forEach(buildMine);
function mineList(){
  setNav('mine');const names=['Mathe','Englisch','Deutsch'];
  app().innerHTML=`<h1>🗂️ Meine Sachen</h1><p class="lead">Deine fotografierten Seiten – mit Übungen, Vokabel-Trainer und Rechenwegen.</p><a class="go" style="text-align:center;background:#0891b2;border-color:#0891b2" href="#/packs">📦 Fertige Pakete (Unit 1, 2 …)</a><a class="go" style="text-align:center;background:#475569;border-color:#475569" href="#/backup">💾 Sichern &amp; auf anderes Tablet / Stick</a><a class="go" style="text-align:center;background:#16a34a;border-color:#16a34a" href="#/vocab">🔤 Vokabel-Trainer &amp; alle meine Vokabeln</a><a class="go" style="text-align:center" href="#/photo">📷 Neue Seite fotografieren</a><a class="go" style="text-align:center;background:#7c3aed;border-color:#7c3aed;margin-top:8px" href="#/ki">🤖 KI-Auftrag bauen (ChatGPT · Gemini · Claude)</a><a class="go" style="text-align:center;background:#6d28d9;border-color:#6d28d9;margin-top:8px" href="#/import">📥 Antwort der KI einfügen</a><a class="go" style="text-align:center;background:#dc2626;border-color:#dc2626;margin-top:8px" href="#/manage">🗑️ Aufräumen &amp; Löschen (nach Fach)</a>`+(MINE.length?SUBJ.map((_,k)=>k).map(k=>{const l=MINE.filter(x=>x.s===k);return l.length?`<details class="chap" open style="--c:${SUBJ[k].color}"><summary>${SUBJ[k].icon} ${SUBJ[k].name}<small>${l.length}</small></summary>${l.map(x=>`<a class="row" href="#/t/m_${x.id}"><span>${esc(x.name)}<small>${new Date(x.d).toLocaleDateString('de-DE')}${x.s===1&&x.vocab?' · '+x.vocab.length+' Wörter':''}</small></span><em>${starStr('m_'+x.id)}</em></a>`).join('')}</details>`:''}).join(''):'<p class="lead">Noch nichts gespeichert. Mache ein Foto von einer Buchseite!</p>');
}
/* ===== Foto ===== */
async function ocrConf(){try{const r=await fetch('ocr/tesseract.min.js',{method:'HEAD'});if(r.ok&&/javascript/.test(r.headers.get('content-type')||'')){const b=n=>new URL(n,location.href).href;return{src:'ocr/tesseract.min.js',local:true,opt:{workerPath:b('ocr/worker.min.js'),corePath:b('ocr/core'),langPath:b('ocr/lang'),gzip:false,workerBlobURL:false}}}}catch(e){}return{src:'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js',local:false,opt:{}}}
function loadScript(u){return new Promise((ok,no)=>{if(window.Tesseract)return ok();const s=document.createElement('script');s.src=u;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
function shrink(file){return new Promise(ok=>{const im=new Image();im.onload=()=>{const k=Math.min(1,2000/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*k;c.height=im.height*k;c.getContext('2d').drawImage(im,0,0,c.width,c.height);c.toBlob(b=>ok(b),'image/jpeg',.9)};im.onerror=()=>ok(file);im.src=URL.createObjectURL(file)})}
function isEnglish(t){const en=(t.toLowerCase().match(/\b(the|and|is|are|you|i|to|a|my|he|she|it|we|they|in|on|of)\b/g)||[]).length,de=(t.toLowerCase().match(/\b(der|die|das|und|ist|ich|nicht|ein|eine|wir|sie|er|es|mit|zu|auf)\b/g)||[]).length;return en>de}
function findMath(text){const out=[],seen=new Set(),re=/(\d[\d.,]*)\s*([+\-−–·×x*:÷\/])\s*(\d[\d.,]*)(?:\s*([+\-−–·×x*:÷\/])\s*(\d[\d.,]*))?/g;let m;
  while((m=re.exec(text))){let e=m[0].toLowerCase().replace(/[×x·]/g,'*').replace(/÷/g,'/').replace(/:/g,'/').replace(/[−–]/g,'-').replace(/,/g,'.').replace(/\s+/g,'');if(seen.has(e)||!/^[\d+\-*/.]+$/.test(e)||/\.\./.test(e))continue;
    try{const r=evalSteps(e);if(!isFinite(r.val))continue;seen.add(e);out.push({e,show:e.replace(/\*/g,' · ').replace(/\//g,' : ').replace(/-/g,' − ').replace(/\+/g,' + '),val:Math.round(r.val*1e6)/1e6})}catch(x){}}
  return out}
function makeEx(text){
  const sents=text.replace(/\s+/g,' ').split(/(?<=[.!?])\s+/).filter(x=>x.split(' ').length>=4&&x.length<160);
  const words=[...new Set((text.match(/[A-Za-zÄÖÜäöüß]{4,}/g)||[]))];const ex=[];
  sents.forEach(se=>{const ws=se.split(' ').map((w,i)=>({w:w.replace(/[^A-Za-zÄÖÜäöüß]/g,''),i})).filter(x=>x.w.length>=4&&x.i>0);if(!ws.length)return;const c=pick(ws);
    const gap=se.split(' ').map((w,i)=>i===c.i?w.replace(c.w,'_____'):w).join(' ');ex.push(Q(`Setze das fehlende Wort ein:<div class="big">${esc(gap)}</div>`,c.w,{hint:`Das Wort beginnt mit „${c.w[0]}“ und hat ${c.w.length} Buchstaben.`,steps:`Richtig: ${esc(se)}`,speak:se}))});
  shuffle(words).slice(0,25).forEach(w=>ex.push(Q('Höre das Wort und schreibe es richtig auf:',w,{speak:w,hint:`${w.length} Buchstaben, Anfang: ${w[0]}`,steps:`Richtig: <b>${esc(w)}</b>`})));
  return ex}
function photo(){
  setNav('photo');window.lastImg=null;let curId=null;
  app().innerHTML=`<h1>📷 Seite fotografieren</h1><p class="lead">Fotografiere eine Buchseite. Ich lese den Text, du kannst ihn verbessern – dann landet alles in <b>Meine Sachen</b> mit Übungen (Englisch: auch <b>Vokabel-Trainer</b>).</p>
  <div class="row2"><button type="button" id="pcb" class="btn">📷 Kamera</button><input id="pc" type="file" accept="image/*" capture="environment" hidden><label class="btn">🖼️ Galerie<input id="pg" type="file" accept="image/*" hidden></label></div>
  <div id="pst" class="hint"></div><textarea id="ptx" class="ans" rows="8" placeholder="Hier erscheint der erkannte Text. Du kannst ihn auch einfügen oder selbst tippen (z. B. Vokabeln: dog – Hund, oder Aufgaben: 345 + 278)."></textarea>
  <h2>Fach</h2><div class="chips">${SUBJ.map((x,i)=>`<label class="chip"><input type="radio" name="sb" value="${i}"${i===2?' checked':''}> ${x.icon} ${x.name}</label>`).join('')}</div>
  <h2>Speichern</h2><p class="hint">Neue Fotos werden automatisch in „Meine Sachen“ gespeichert. Hier kannst du Namen und Fach ändern und mit „Speichern & üben“ weitergehen.</p><input id="pn" class="ans" placeholder="Name, z. B. Unit 2 Seite 34" autocomplete="off"><select id="ps" class="ans"><option value="">Als neue Sache speichern</option>${MINE.map(x=>`<option value="${x.id}">Zu „${esc(x.name)}“ hinzufügen</option>`).join('')}</select>
  <div class="row2"><button id="psv" class="go">💾 Speichern &amp; üben</button><button id="pai" style="background:#7c3aed;color:#fff;border-color:#7c3aed">🤖 KI: Wichtiges finden &amp; Übungen bauen</button><button id="pma">🧮 Rechnungen lösen</button><button id="pvo">🔊 Vorlesen</button></div><div id="pout"></div>
  <p class="hint">Die Texterkennung läuft auf dem Gerät (offline, wenn der Ordner <b>ocr</b> dabei ist, sonst lädt sie einmalig aus dem Internet). Das Foto bleibt auf deinem Gerät (nur die letzten 4 Fotos je Sache), damit die KI es später noch einmal ansehen kann.</p>`;
  const ta=$('#ptx'),st=$('#pst'),draft=()=>{try{localStorage.setItem('sh5draft',ta.value)}catch(e){}};try{const d=localStorage.getItem('sh5draft');if(d){ta.value=d;st.textContent='Entwurf wiederhergestellt – dein Text ist nicht verloren.'}}catch(e){}
  const setSub=()=>{const tx=ta.value,ms=findMath(tx),L=(tx.match(/[A-Za-z]/g)||[]).length;const k=ms.length>=2&&L<ms.length*30?0:isEnglish(tx)?1:2;const r=document.querySelector(`input[name=sb][value="${k}"]`);if(r)r.checked=true};
  const cleanOcr=t=>t.split('\n').map(l=>l.trim()).filter(l=>{const a=(l.match(/[A-Za-zÄÖÜäöüß0-9]/g)||[]).length;return a>=2&&a/l.length>=.45&&!/^\d{1,3}$/.test(l)}).join('\n');
  const aiAnalyze=async b64=>{const prompt=`Du siehst das Foto einer Schulbuch- oder Arbeitsheftseite für Klasse ${klasse()} (${sfText()}).${sfLevel()} Analysiere die Seite wie eine Lehrkraft: Erkenne das Fach, den Titel/das Thema und NUR das Wichtige. Ignoriere Seitenzahlen, Kopf- und Fußzeilen, Verlagswerbung, Bildunterschriften, Dekoration und alles, was für das Lernen unwichtig ist. Fasse das Wichtige kurz zusammen (Regeln, Merksätze, Beispiele, Vokabeln, Aufgabenstellungen) und baue daraus 15 abwechslungsreiche Übungsaufgaben für ein Kind. Mathe: Rechnungen der Seite lösen und ähnliche Aufgaben mit anderen Zahlen erfinden, Rechenweg in "explain". Englisch: ALLE Vokabeln der Seite in "vocab" als [englisch, deutsch]; Aufgaben: Lückensätze, Übersetzen, Grammatik. Deutsch: Rechtschreibung, Wortarten, Satzglieder, Zeiten, Zeichensetzung, Lückentexte. Andere Fächer: Verständnisfragen, Fachbegriffe in "vocab" als [Begriff, Erklärung], Lückensätze.\nAntworte NUR mit JSON: {"subject":"Mathe|Englisch|Deutsch|Biologie|Physik|Chemie|Informatik|Politik|Geschichte|Musik|Erdkunde","title":"kurzer Titel","key":"das Wichtigste der Seite als kurze Stichpunkte, eine pro Zeile","vocab":[["english","deutsch"]],"tasks":[{"type":"choice|text|num","q":"Frage","options":["A","B","C"],"answer":"richtige Antwort","alt":["weitere akzeptierte Schreibweisen"],"hint":"kurzer Tipp","explain":"kindgerechte Erklärung in 1–3 Sätzen"}]}\nBei "choice" 3–4 Optionen, answer ist genau eine davon. Bei "num" ist answer nur eine Zahl (Dezimalpunkt). Bei "text" ist answer kurz. Fragen auf Deutsch.`;
    const txt=await gemini(prompt,{json:true,img:b64});const r=parseAI(txt),j=JSON.parse(txt.slice(txt.indexOf('{'),txt.lastIndexOf('}')+1));r.key=String(j.key||'').trim();r.title=String(j.title||'').trim();r.sub=subIdx(j.subject);return r};
  const onFile=async f=>{if(!f)return;st.textContent='Foto wird vorbereitet …';
    try{const img=await shrink(f);window.lastImg=await new Promise(ok=>{const fr=new FileReader();fr.onload=()=>ok(String(fr.result).split(',')[1]);fr.readAsDataURL(img)});
      if(gemCfg().key){st.textContent='🤖 Die KI liest die Seite und sucht das Wichtigste … (10–30 Sekunden)';
        try{const r=await aiAnalyze(window.lastImg);if(r.key)ta.value=(ta.value?ta.value+'\n\n':'')+r.key;if(r.title&&!$('#pn').value)$('#pn').value=r.title;const rd=document.querySelector(`input[name=sb][value="${r.sub}"]`);if(rd)rd.checked=true;draft();
          await doSave(false,true);const it=MINE.find(x=>x.id===curId);if(it){it.ai=(it.ai||[]).concat(r.tasks);if(r.vocab.length)it.vocab=mergePairs(it.vocab||[],r.vocab);saveMine();buildMine(it);imgPut(it.id,window.lastImg);st.innerHTML=`✔ Die KI hat das Wichtigste gefunden und ${r.tasks.length} Aufgaben gebaut: „${esc(it.name)}“ in <b>Meine Sachen</b>. <a href="#/t/m_${it.id}" style="color:var(--ac);font-weight:700">jetzt üben ▶</a>`}return}
        catch(e){st.textContent='KI hat nicht geklappt ('+e.message+') – ich lese den Text auf dem Gerät …'}}
      const oc=await ocrConf();await loadScript(oc.src);st.textContent='Text wird erkannt … (bitte warten)';
      const r=await Tesseract.recognize(img,'deu+eng',Object.assign({logger:m=>{if(m.status==='recognizing text')st.textContent='Text wird erkannt … '+Math.round(m.progress*100)+' %'}},oc.opt));
      ta.value=(ta.value?ta.value+'\n\n':'')+cleanOcr(r.data.text.trim());draft();setSub();st.textContent='Text erkannt – wird gespeichert …';await doSave(false,true);if(curId)imgPut(curId,window.lastImg);
    }catch(e){st.textContent='Die Texterkennung konnte nicht geladen werden (Internet nötig). Du kannst den Text auch selbst eintippen.'}};
  $('#pcb').onclick=async()=>{const C=window.Capacitor;if(C&&C.isNativePlatform&&C.isNativePlatform()){try{const P=C.Plugins.Camera||C.registerPlugin('Camera');const r=await P.getPhoto({quality:90,allowEditing:false,resultType:'dataUrl',source:'CAMERA',correctOrientation:true});if(r&&r.dataUrl){onFile(await (await fetch(r.dataUrl)).blob());return}}catch(e){const m=String((e&&e.message)||e);if(/cancel/i.test(m))return;st.textContent='Kamera: '+m+' – ich öffne die normale Auswahl.'}}$('#pc').click()};
  $('#pc').onchange=e=>onFile(e.target.files[0]);$('#pg').onchange=e=>onFile(e.target.files[0]);ta.oninput=()=>{draft();clearTimeout(photo.t);photo.t=setTimeout(setSub,400)};
  $('#pvo').onclick=()=>speak(ta.value,isEnglish(ta.value)?'en-GB':'de-DE');
  $('#pma').onclick=()=>{const ms=findMath(ta.value),o=$('#pout');
    o.innerHTML=ms.length?'<h2>Erkannte Rechnungen</h2>'+ms.map(m=>`<details class="sol" open><summary><b>${m.show} = ${fmt(m.val)}</b></summary><div class="steps">${solveExpr(m.e)}</div></details>`).join(''):'<p class="lead">Ich habe keine Rechnung wie „345 + 278“ gefunden.</p>'};
  const doSave=async(ai,silent)=>{const tx=ta.value.trim(),o=$('#pout');if(tx.length<5){o.innerHTML='<p class="lead">Bitte erst ein Foto machen oder Text eintippen.</p>';return}
    if(ai&&!gemCfg().key){o.innerHTML='<p class="lead">Für die KI brauchst du einen Schlüssel: <a href="#/settings" style="color:var(--ac);font-weight:700">KI-Einstellungen</a>. Oder nutze „Speichern & üben“ ohne KI.</p>';return}
    const sb=+document.querySelector('input[name=sb]:checked').value,eid=$('#ps').value;let it=eid&&MINE.find(x=>x.id===eid),own=!eid&&curId&&MINE.find(x=>x.id===curId);
    if(own){it=own;it.text=tx}else if(it){it.text+='\n\n'+tx}else{const nm=$('#pn').value.trim()||(SUBJ[sb].name+' '+new Date().toLocaleDateString('de-DE'));it={id:Date.now().toString(36),name:nm,s:sb,sn:SUBJ[sb].name,text:tx,vocab:[],d:Date.now()};MINE.unshift(it)}
    if(it.s===1){let pr=extractPairs(tx).concat(dictPairs(tx));if(pr.length<5){st.textContent='Übersetze Wörter online …';pr=pr.concat(await onlinePairs(tx,pr));st.textContent=''}it.vocab=mergePairs(it.vocab||[],pr)}
    saveMine();buildMine(it);curId=it.id;
    if(silent){st.innerHTML=`✔ Gespeichert in <b>Meine Sachen</b> als „${esc(it.name)}“. Prüfe den Text, ergänze weitere Fotos – oder <a href="#/t/m_${it.id}" style="color:var(--ac);font-weight:700">jetzt üben ▶</a>`;return}
    try{localStorage.removeItem('sh5draft')}catch(e){}
    if(ai){st.textContent='🤖 Die KI baut Übungen … (kann 10–30 Sekunden dauern)';try{const n=await aiBuild(it,15,window.lastImg);st.textContent=n+' KI-Aufgaben gebaut ✔'}catch(e){o.innerHTML=`<p class="lead">Gespeichert, aber die KI hat nicht geklappt: ${esc(e.message)}</p><a class="go" style="text-align:center" href="#/t/m_${it.id}">Trotzdem öffnen</a>`;return}}
    go('#/t/m_'+it.id)};
  $('#psv').onclick=()=>doSave(false);$('#pai').onclick=()=>doSave(true);
  setSub();
}
if('serviceWorker'in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js').catch(()=>{});
try{hubInit()}catch(e){console.log(e)}
try{langInit();hoerenInit();lesenInit()}catch(e){console.log(e)}
route();

/* Paket-Import (von Claude aus dem Chat) */
function importPage(){
  setNav('mine');
  app().innerHTML=`<a class="back" href="#/mine">← Meine Sachen</a><h1>📥 Antwort der KI einfügen</h1><p class="lead">Den Auftrag baust du unter <a href="#/ki" style="color:var(--ac);font-weight:700">🤖 KI-Auftrag</a>. Die Antwort von ChatGPT, Gemini, Claude oder Copilot (den Code-Kasten) kopieren und hier einfügen – das Fach wird automatisch erkannt.</p><button id="ipp" class="btn">📋 Aus Zwischenablage einfügen</button><textarea id="itx" class="ans" rows="10" placeholder="Hier den kopierten Text einfügen …"></textarea><button id="ibt" class="go">Importieren</button><div id="ist" class="hint"></div>`;
  const ta=$('#itx'),st=$('#ist');
  $('#ipp').onclick=async()=>{try{ta.value=await navigator.clipboard.readText()}catch(e){st.textContent='Einfügen ging nicht automatisch – halte im Feld gedrückt und wähle „Einfügen“.'}};
  $('#ibt').onclick=()=>{try{
    const txt=ta.value;if(txt.indexOf('{')<0)throw new Error('Kein Paket gefunden.');
    const j=JSON.parse(txt.slice(txt.indexOf('{'),txt.lastIndexOf('}')+1)),it=packImport(j);go('#/t/m_'+it.id);
  }catch(e){st.textContent='Fehler: '+e.message+' – kopiere das ganze Paket noch einmal.'}};
}
