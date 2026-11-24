/* ===== Vokabel-Zentrale: alle Vokabeln an einem Ort + 4 Lernmodi ===== */

/* Bildchen: Emoji zu Wörtern */
const _EM='monkey 🐒|tiger 🐯|elephant 🐘|snake 🐍|giraffe 🦒|penguin 🐧|mouse 🐭|mice 🐭|fish 🐟|lion 🦁|flamingo 🦩|zebra 🦓|crocodile 🐊|camel 🐪|horse 🐴|bird 🐦|bear 🐻|parrot 🦜|panda 🐼|gorilla 🦍|chameleon 🦎|seal 🦭|raccoon 🦝|cat 🐱|dog 🐶|pet 🐾|cow 🐄|banana 🍌|apple 🍎|apples 🍎|orange 🍊|oranges 🍊|strawberry 🍓|peach 🍑|fruit 🍇|meat 🥩|egg 🥚|eggs 🥚|cheese 🧀|milk 🥛|butter 🧈|bread 🍞|cake 🎂|pizza 🍕|burger 🍔|sandwich 🥪|pasta 🍝|ice cream 🍦|chocolate 🍫|crisps 🥔|crisp 🥔|coke 🥤|lemonade 🍋|water 💧|tea 🍵|sugar 🍬|sweet 🍬|nut 🌰|nuts 🌰|flour 🌾|candle 🕯️|balloon 🎈|present 🎁|party 🎉|birthday 🎂|Christmas 🎄|Halloween 🎃|fireworks 🎆|pirate 🏴‍☠️|witch 🧙|alien 👽|superman 🦸|dancer 💃|costume 🎭|clothes 👕|T-shirt 👕|scarf 🧣|trainer 👟|nose 👃|money 💰|shop 🏪|corner shop 🏪|cinema 🎬|film 🎬|movie 🎬|book 📖|bed 🛏️|table 🪑|chair 🪑|lamp 💡|alarm clock ⏰|window 🪟|door 🚪|computer 💻|mobile 📱|bike 🚲|photo 📷|garden 🌳|tree 🌳|tree house 🏠|house 🏠|home 🏠|kitchen 🍳|bathroom 🛁|bedroom 🛏️|living room 🛋️|school 🏫|classroom 🏫|playground 🛝|teacher 👩‍🏫|pen 🖊️|pencil ✏️|ruler 📏|eraser 🧽|bag 🎒|calculator 🧮|glue 🧴|scissors ✂️|film 🎞️|star ⭐|circus 🎪|saxophone 🎷|club 🏅|timetable 🗓️|alphabet 🔤|family 👨‍👩‍👧‍👦|mother 👩|father 👨|sister 👧|brother 👦|grandmother 👵|grandfather 👴|friend 🧑‍🤝‍🧑|team 👥|netball 🏀|tennis 🎾|football ⚽|chess ♟️|swimming 🏊|skiing ⛷️|surfing 🏄|fishing 🎣|jogging 🏃|run 🏃|skating ⛸️|skateboarding 🛹|horse riding 🏇|judo 🥋|choir 🎤|music 🎵|sing 🎶|dance 💃|sleep 😴|winter ❄️|wind 💨|night 🌙|day ☀️|clock ⏰|cage 🐦|hole 🕳️|ceiling 🏠|magazine 📰|police officer 👮|café ☕|doorbell 🔔|ring 🔔|sleepover 🛏️|snack 🍿|Africa 🌍|Asia 🌏|Europe 🌍|Australia 🦘|India 🇮🇳|England 🇬🇧|Germany 🇩🇪|world 🌍|leaf 🍃|leaves 🍃|grass 🌱|plant 🌱|January 🗓️|bottle 🍼|can 🥫|box 📦|packet 📦|shopping list 📝|zookeeper 🧑‍🌾|captain 🧑‍✈️|ball ⚽|sun ☀️|rain 🌧️|snow ❄️|hair straightener 💇|poster 🖼️|carpet 🟫|box 📦|wardrobe 🚪|shelf 📚|shelves 📚|camel 🐫|tractor 🚜|hospital 🏥|church ⛪|mosque 🕌|castle 🏰|stadium 🏟️|hotel 🏨|library 📚|museum 🏛️|market 🛒|supermarket 🛒|train 🚆|car 🚗|bus 🚌|tram 🚋|plane ✈️|boat ⛵|submarine 🚢|ship 🚢|helicopter 🚁|underground 🚇|motorbike 🏍️|skateboard 🛹|beach 🏖️|sea 🌊|wave 🌊|storm ⛈️|shark 🦈|sheep 🐑|pig 🐷|chicken 🐔|pizza 🍕|potato 🥔|popcorn 🍿|sunny ☀️|rainy 🌧️|windy 💨|cloudy ☁️|foggy 🌫️|cold 🥶|hot 🥵|coat 🧥|trousers 👖|jeans 👖|sock 🧦|skirt 👗|cap 🧢|shorts 🩳|helmet ⛑️|torch 🔦|wheelchair ♿|map 🗺️|postcard 💌|diary 📔|face 🙂|foot 🦶|feet 🦶|mud 🟤|moon 🌙|wool 🧶|rope 🪢|attic 🏚️|flat 🏢|post office 📮|swimming pool 🏊|shopping centre 🛍️|river 🏞️';
let _EMM=null;
function vemoji(en){
  if(!_EMM){_EMM={};_EM.split('|').forEach(x=>{const i=x.lastIndexOf(' ');const k=x.slice(0,i).toLowerCase();if(!_EMM[k])_EMM[k]=x.slice(i+1)})}
  let k=String(en||'').toLowerCase().replace(/\(.*?\)/g,'').replace(/[…?!.]/g,'').replace(/^(to|a|an|the|go|play|have|watch|listen to)\s+/,'').replace(/\s+/g,' ').trim();
  if(_EMM[k])return _EMM[k];
  const k2=k.replace(/^(a|an|the|go|play|have|to)\s+/,'');if(_EMM[k2])return _EMM[k2];
  const sg=k.split(' / ')[0].split(' (')[0];if(_EMM[sg])return _EMM[sg];
  return '';
}
function vemh(en){const e=vemoji(en);return e?`<div class="vemo">${e}</div>`:''}
function vkey(en){return String(en).toLowerCase().replace(/\s+/g,' ').trim()}
function vocGet(){try{return JSON.parse(localStorage.getItem('sh5voc')||'[]')}catch(e){return[]}}
function vocSet(a){try{localStorage.setItem('sh5voc',JSON.stringify(a))}catch(e){}}
function vocDelGet(){try{return JSON.parse(localStorage.getItem('sh5vocdel')||'[]')}catch(e){return[]}}
function vocDelSet(a){try{localStorage.setItem('sh5vocdel',JSON.stringify(a))}catch(e){}}
function vff(w){return w.f||'englisch'}
function vfk(f,en){return(f&&f!=='englisch'?f+'|':'')+vkey(en)}
function vocNew(en,de,src,f){return{f:f||'englisch',id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),en:String(en).trim(),de:String(de).trim(),src:src||'Eigene Wörter',box:0,ok:0,no:0}}
/* Holt alle Vokabeln aus "Meine Sachen" dazu – sie bleiben hier gespeichert, auch wenn Fotos oder Sachen gelöscht werden. */
function vocSync(){
  const a=vocGet(),seen=new Set(a.map(w=>vfk(vff(w),w.en))),del=new Set(vocDelGet());let ch=false;
  MINE.forEach(it=>{const f=(SUBJ[it.s]||{}).id||'englisch';if(it.s===0)return;(it.vocab||[]).forEach(p=>{if(!p||!p[0]||!p[1])return;const k=vfk(f,p[0]);if(seen.has(k)||del.has(k)||del.has(vkey(p[0]))&&f==='englisch')return;seen.add(k);a.push(vocNew(p[0],p[1],it.name,f));ch=true})});
  if(ch)vocSet(a);return a}
function vst(){return window._vs||(window._vs={src:'all',only:false,f:'englisch'})}
function vfAll(){return vocSync().filter(w=>vff(w)===(vst().f||'englisch'))}
function vfs(){const f=vst().f||'englisch';return SUBJ.find(x=>x.id===f)||SUBJ[1]}
function vocPool(){const vs=vst();let a=vfAll();if(vs.src!=='all')a=a.filter(w=>w.src===vs.src);if(vs.only)a=a.filter(w=>(w.box||0)<3);return a}
function vocMark(id,good){const a=vocGet(),w=a.find(x=>x.id===id);if(!w)return;if(good){w.box=Math.min(5,(w.box||0)+1);w.ok=(w.ok||0)+1}else{w.box=0;w.no=(w.no||0)+1}vocSet(a)}
function vsize(def){const k=vst().n;return k==='all'?9999:(+k||def)}
function vocQueue(def){const n=vsize(def);return shuffle(shuffle(vocPool()).sort((a,b)=>(a.box||0)-(b.box||0)).slice(0,n))}
function vnorm(s){return String(s).toLowerCase().replace(/[’`´]/g,"'").replace(/[.!?…,;]+$/g,'').replace(/\s+/g,' ').trim()}
function vcands(en){const b=en.replace(/\s*\([^)]*\)/g,'').trim();return[...new Set([vnorm(en),vnorm(b),vnorm(b.replace(/^to\s+/i,'')),vnorm(en.replace(/[()]/g,''))])]}
function vpattern(en,r){let n=0;return en.split('').map(c=>{if(c===' ')return'  ';if(!/[A-Za-zÄÖÜäöüß0-9]/.test(c))return c;n++;return n<=r?c:'_'}).join(' ')}
function vsay(t){const f=vst().f||'englisch',s=SUBJ.find(x=>x.id===f);speak(t,f==='englisch'?'en-GB':(s&&s.lang)||'de-DE')}
function vend(good,again,total,mode){
  app().innerHTML=`<h1>🎉 Geschafft!</h1><div class="qcard"><div class="q">${good} von ${total} gewusst</div><p class="lead">${again?again+' Wörter üben wir bald noch einmal.':'Alles gewusst – stark!'}</p></div><a class="go" style="text-align:center" href="#/vocab/${mode}" onclick="setTimeout(route,0)">Nochmal</a><a class="go" style="text-align:center;background:var(--card);color:var(--tx);border:2px solid var(--bd)" href="#/vocab">Zurück zum Vokabel-Trainer</a>`}

/* Router für #/vocab/... */
function vocRoute(m){
  setNav('voc');
  if(m==='cards')return vocCards();if(m==='write')return vocWrite();if(m==='listen')return vocListen();if(m==='match')return vocMatch();if(m==='list')return vocList();
  return vocHome()}

function vocHome(){
  const every=vocSync(),fs=[...new Set(['englisch'].concat(every.map(vff)))],all=vfAll(),vs=vst(),srcs=[...new Set(all.map(w=>w.src))],pool=vocPool(),known=all.filter(w=>(w.box||0)>=3).length;
  if(vs.src!=='all'&&!srcs.includes(vs.src))vs.src='all';
  const ok=(n)=>pool.length>=n,btn=(h,i,t,s,n)=>ok(n)?`<a class="act" href="#/vocab/${h}">${i}<b>${t}</b><small>${s}</small></a>`:`<span class="act" style="opacity:.4">${i}<b>${t}</b><small>zu wenig Wörter</small></span>`;
  app().innerHTML=`<h1>🔤 Vokabel- &amp; Begriffe-Trainer</h1><div class="chips">${fs.map(f=>{const x=SUBJ.find(y=>y.id===f)||SUBJ[1];return `<button class="chip vfb${f===(vs.f||'englisch')?' on':''}" data-f="${f}">${x.icon} ${x.name} (${every.filter(w=>vff(w)===f).length})</button>`}).join('')}</div><p class="lead"><b>${all.length}</b> Wörter gespeichert · <b>${known}</b> schon gelernt · <b>${all.length-known}</b> noch nicht sicher</p>
  ${all.length?`<label class="hint">Üben mit:</label><select id="vsrc" class="ans"><option value="all">Alle Wörter (${all.length})</option>${srcs.map(s=>`<option value="${esc(s)}"${vs.src===s?' selected':''}>${esc(s)} (${all.filter(w=>w.src===s).length})</option>`).join('')}</select>
  <label class="chip" style="display:inline-flex;gap:8px;margin:4px 0 10px"><input type="checkbox" id="vonly"${vs.only?' checked':''}> nur Wörter, die ich noch nicht sicher kann</label>
  <div class="hint">${pool.length} Wörter in dieser Auswahl</div>
  <label class="hint">Wörter pro Runde:</label><select id="vn" class="ans">${[10,20,30,50].map(n=>`<option value="${n}"${String(vs.n||20)===String(n)?' selected':''}>${n}</option>`).join('')}<option value="all"${vs.n==='all'?' selected':''}>Alle ${pool.length}</option></select>
  <div class="hint">Zuerst kommen immer die Wörter, die du noch nicht kannst. Mach einfach mehrere Runden – so kommst du durch alle ${all.length} Wörter.</div>
  <div class="acts">${btn('cards','🃏','Karteikarten','umdrehen · gewusst?',1)}${btn('write','✍️','Schreiben','hören · tippen · Tipp',1)}${btn('listen','👂','Hören &amp; Antippen','richtiges Wort wählen',2)}${btn('match','🔗','Verbinden','6 Wörter zuordnen',3)}</div>`:`<p class="lead">Noch keine Vokabeln. Fotografiere eine Englisch-Seite, füge ein Paket von Claude ein oder trage unten Wörter selbst ein.</p>`}
  <a class="go" style="text-align:center;background:#7c3aed;margin-top:14px" href="#/vocab/list">📚 Meine Vokabeln (alle ansehen &amp; verwalten)</a>`;
  document.querySelectorAll('.vfb').forEach(b=>b.onclick=()=>{vst().f=b.dataset.f;vst().src='all';vocHome()});const s=$('#vsrc');if(s)s.onchange=()=>{vst().src=s.value;vocHome()};const n=$('#vn');if(n)n.onchange=()=>{vst().n=n.value;vocHome()};const o=$('#vonly');if(o)o.onchange=()=>{vst().only=o.checked;vocHome()}}

/* 🃏 Karteikarten */
function vocCards(){
  const q=vocQueue(20);if(!q.length)return go('#/vocab');
  let i=0,good=0,flipped=false;const again=new Set(),first=q.length;
  const show=()=>{
    if(i>=q.length)return vend(first-again.size,again.size,first,'cards');
    const w=q[i];flipped=false;
    app().innerHTML=`<a class="back" href="#/vocab">← Ende</a><div class="vprog">${i+1} / ${q.length}</div><div class="vcard" id="vc"><small>${vfs().icon} ${vfs().name} · tippe zum Umdrehen</small>${vemh(w.en)}<b>${esc(w.en)}</b><button class="vsp" id="vsp">🔊 Anhören</button></div><div id="vbt"></div>`;
    $('#vsp').onclick=e=>{e.stopPropagation();vsay(w.en)};$('#vc').onclick=flip;vsay(w.en)};
  const flip=()=>{
    if(flipped)return;flipped=true;const w=q[i],c=$('#vc');c.classList.add('flip');
    setTimeout(()=>{c.classList.add('de');c.innerHTML=`<small>${vfs().id==='englisch'?'🇩🇪 Deutsch':'💡 Bedeutung'}</small>${vemh(w.en)}<b>${esc(w.de)}</b><button class="vsp" id="vsp2">🔊 ${esc(w.en)}</button>`;$('#vsp2').onclick=e=>{e.stopPropagation();vsay(w.en)}},180);
    $('#vbt').innerHTML=`<div class="row2"><button id="vno" class="vno">❌ Wusste ich nicht</button><button id="vok" class="vok">✅ Wusste ich</button></div>`;
    $('#vok').onclick=()=>{vocMark(w.id,true);good++;i++;show()};
    $('#vno').onclick=()=>{vocMark(w.id,false);if(!again.has(w.id)){again.add(w.id);q.push(w)}i++;show()}};
  show()}

/* ✍️ Schreiben: hören, deutscher Tipp, Buchstaben nach Bedarf zeigen */
function vocWrite(){
  const q=vocQueue(15);if(!q.length)return go('#/vocab');
  let i=0;const again=new Set(),first=q.length;
  const show=()=>{
    if(i>=q.length)return vend(first-again.size,again.size,first,'write');
    const w=q[i];let r=0,done=false,used=false;const base=w.en.replace(/\s*\([^)]*\)/g,'').trim(),cs=vcands(w.en);
    app().innerHTML=`<a class="back" href="#/vocab">← Ende</a><div class="vprog">${i+1} / ${q.length}</div><div class="qcard"><small>✍️ Schreiben</small><div class="q">${vfs().id==='englisch'?'Höre das Wort und schreibe es auf Englisch auf.':'Höre den Begriff und schreibe ihn richtig auf.'}</div><button class="vsp" id="vh">🔊 Anhören</button><div class="vtip">💡 Tipp: <b>${esc(w.de)}</b></div><div class="vpat" id="vp">${esc(vpattern(base,0))}</div><input id="vi" class="ans" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Englisches Wort"><div class="row2"><button id="vt">➕ Buchstabe zeigen</button><button id="vc" class="go" style="margin:0">Prüfen</button></div><div id="vfb"></div></div>`;
    const inp=$('#vi');$('#vh').onclick=()=>vsay(w.en);vsay(w.en);
    $('#vt').onclick=()=>{if(done)return;used=true;r=Math.min(base.replace(/[^A-Za-zÄÖÜäöüß0-9]/g,'').length,r+1);$('#vp').textContent=vpattern(base,r)};
    const check=()=>{
      if(done){i++;show();return}
      const a=vnorm(inp.value);if(!a)return;done=true;const ok=cs.includes(a);
      if(ok){if(!used)vocMark(w.id,true);$('#vfb').innerHTML=`<div class="fb ok"><b>${pick(PRAISE)}</b>${used?' (mit Tipp)':''}</div>`;inp.classList.add('good')}
      else{vocMark(w.id,false);if(!again.has(w.id)){again.add(w.id);q.push(w)}$('#vfb').innerHTML=`<div class="fb no"><b>Nicht ganz.</b> Richtig ist: <b>${esc(w.en)}</b></div>`;inp.classList.add('bad')}
      $('#vc').textContent='Weiter ▶'};
    $('#vc').onclick=check;inp.onkeydown=e=>{if(e.key==='Enter')check()};try{inp.focus()}catch(e){}};
  show()}

/* 👂 Hören & Antippen */
function vocListen(){
  const q=vocQueue(15),all=vfAll();if(!q.length||all.length<2)return go('#/vocab');
  let i=0;const again=new Set(),first=q.length;
  const show=()=>{
    if(i>=q.length)return vend(first-again.size,again.size,first,'listen');
    const w=q[i],others=shuffle(all.filter(x=>vkey(x.en)!==vkey(w.en)));let opts=[w];const seen=new Set([vkey(w.en)]);
    others.forEach(x=>{if(opts.length<4&&!seen.has(vkey(x.en))){seen.add(vkey(x.en));opts.push(x)}});opts=shuffle(opts);
    app().innerHTML=`<a class="back" href="#/vocab">← Ende</a><div class="vprog">${i+1} / ${q.length}</div><div class="qcard"><small>👂 Hören &amp; Antippen</small><div class="q">Höre gut zu und tippe das richtige Wort.</div><button class="vsp" id="vh">🔊 Anhören</button><div class="vopts">${opts.map((o,k)=>`<button class="vopt" data-k="${k}">${esc(o.en)}</button>`).join('')}</div><div id="vfb"></div></div>`;
    vsay(w.en);$('#vh').onclick=()=>vsay(w.en);
    document.querySelectorAll('.vopt').forEach(b=>b.onclick=()=>{
      if(b.dataset.done)return;const o=opts[+b.dataset.k],ok=o===w;
      document.querySelectorAll('.vopt').forEach(x=>{x.dataset.done='1';if(opts[+x.dataset.k]===w)x.classList.add('ok')});
      if(ok)vocMark(w.id,true);else{b.classList.add('no');vocMark(w.id,false);if(!again.has(w.id)){again.add(w.id);q.push(w)}}
      $('#vfb').innerHTML=`<div class="fb ${ok?'ok':'no'}"><b>${ok?pick(PRAISE):'Nicht ganz.'}</b> ${esc(w.en)} = ${esc(w.de)}</div><button id="vn" class="go">Weiter ▶</button>`;$('#vn').onclick=()=>{i++;show()}})};
  show()}

/* 🔗 Verbinden: 6 englische und 6 deutsche Wörter */
function vocMatch(){
  let pool=shuffle(vocPool().sort(()=>0)).sort((a,b)=>(a.box||0)-(b.box||0)).slice(0,vsize(24));if(pool.length<3)return go('#/vocab');
  const seenDe=new Set(),uniq=[];pool.forEach(w=>{const k=vkey(w.de);if(!seenDe.has(k)){seenDe.add(k);uniq.push(w)}});pool=uniq;if(pool.length<3)return go('#/vocab');
  const rounds=[];for(let k=0;k<pool.length;k+=6)rounds.push(pool.slice(k,k+6));
  if(rounds.length>1&&rounds[rounds.length-1].length<3){const l=rounds.pop();rounds[rounds.length-1]=rounds[rounds.length-1].concat(l)}
  let ri=0,good=0,total=0,badWords=0;
  const show=()=>{
    if(ri>=rounds.length)return vend(good,badWords,total,'match');
    const r=rounds[ri],miss={};let left=r.length,sel=null;
    app().innerHTML=`<a class="back" href="#/vocab">← Ende</a><div class="vprog">Runde ${ri+1} / ${rounds.length}</div><p class="lead">Tippe ein englisches Wort und dann das passende deutsche.</p><div class="vmatch"><div>${shuffle(r.slice()).map(w=>`<button class="vm" data-s="en" data-id="${w.id}">${esc(w.en)}</button>`).join('')}</div><div>${shuffle(r.slice()).map(w=>`<button class="vm" data-s="de" data-id="${w.id}">${esc(w.de)}</button>`).join('')}</div></div><div id="vfb"></div>`;
    const bs=[...document.querySelectorAll('.vm')];
    bs.forEach(b=>b.onclick=()=>{
      if(b.classList.contains('done'))return;
      if(!sel||sel.dataset.s===b.dataset.s){if(sel)sel.classList.remove('sel');sel=b;b.classList.add('sel');if(b.dataset.s==='en'){const w=r.find(x=>x.id===b.dataset.id);vsay(w.en)}return}
      const en=sel.dataset.s==='en'?sel:b,de=sel.dataset.s==='en'?b:sel;sel.classList.remove('sel');const s0=sel;sel=null;
      if(en.dataset.id===de.dataset.id){en.classList.add('done');de.classList.add('done');left--;
        if(left===0){r.forEach(w=>{total++;if(miss[w.id]){badWords++;vocMark(w.id,false)}else{good++;vocMark(w.id,true)}});
          $('#vfb').innerHTML=`<div class="fb ok"><b>${pick(PRAISE)}</b> Alle ${r.length} richtig verbunden.</div><button id="vn" class="go">Weiter ▶</button>`;$('#vn').onclick=()=>{ri++;show()}}}
      else{miss[en.dataset.id]=1;[en,de].forEach(x=>{x.classList.add('wrong');setTimeout(()=>x.classList.remove('wrong'),450)})}});
  };
  show()}

/* 📚 Meine Vokabeln: alles ansehen, suchen, ergänzen, löschen */
function vocList(){
  const units=[...new Set(Object.keys(V).map(k=>(k.match(/^u(\d+)/)||[])[1]).filter(Boolean))];
  app().innerHTML=`<a class="back" href="#/vocab">← Vokabel-Trainer</a><h1>📚 Meine ${vfs().id==='englisch'?'Vokabeln':'Begriffe'} – ${vfs().icon} ${vfs().name}</h1><p class="lead">Hier bleiben alle deine Vokabeln gespeichert – auch wenn von den Fotos nur die letzten 4 aufgehoben werden.</p>
  <input id="vq" class="ans" placeholder="🔎 Wort suchen …" autocomplete="off"><div id="vl"></div>
  <h2>➕ Wort hinzufügen</h2><input id="vae" class="ans" placeholder="${vfs().id==='englisch'?'Englisch, z. B. dog':'Begriff, z. B. Photosynthese'}" autocomplete="off" autocapitalize="off"><input id="vad" class="ans" placeholder="${vfs().id==='englisch'?'Deutsch, z. B. Hund':'Bedeutung / Erklärung'}" autocomplete="off"><div class="row2">${vfs().id==='englisch'?'<button id="vtr">🌐 Online übersetzen</button>':''}<button id="vab" class="go">Hinzufügen</button></div><div id="vam" class="hint"></div>
  <h2>📘 Blue Line Wörter dazunehmen</h2><div class="row2"><select id="vun" class="ans" style="margin:0">${units.map(u=>`<option value="${u}">Unit ${u}</option>`).join('')}</select><button id="vub">Hinzufügen</button></div>`;
  const draw=()=>{
    const all=vfAll(),f=vnorm($('#vq').value),l=all.filter(w=>!f||vnorm(w.en).includes(f)||vnorm(w.de).includes(f)),by={};
    l.forEach(w=>(by[w.src]=by[w.src]||[]).push(w));
    $('#vl').innerHTML=l.length?Object.keys(by).map(s=>`<details class="chap" ${f||Object.keys(by).length===1?'open':''}><summary>${esc(s)}<small>${by[s].length}</small></summary>${by[s].map(w=>`<div class="vrow"><span>${vemoji(w.en)} <b>${esc(w.en)}</b> – ${esc(w.de)}<small>${'●'.repeat(w.box||0)}${'○'.repeat(5-(w.box||0))}</small></span><button class="vsp2" data-sp="${esc(w.en)}" aria-label="vorlesen">🔊</button><button class="vdel" data-del="${w.id}" aria-label="löschen">🗑️</button></div>`).join('')}</details>`).join(''):`<p class="lead">${all.length?'Nichts gefunden.':'Noch keine Wörter.'}</p>`;
    $('#vl').querySelectorAll('[data-sp]').forEach(b=>b.onclick=()=>vsay(b.dataset.sp));
    $('#vl').querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{const a=vocGet(),w=a.find(x=>x.id===b.dataset.del);if(!w)return;vocSet(a.filter(x=>x.id!==w.id));const d=vocDelGet();d.push(vfk(vff(w),w.en));vocDelSet(d);draw()})};
  $('#vq').oninput=draw;
  const tr=$('#vtr');if(tr)tr.onclick=async()=>{const en=$('#vae').value.trim(),de=$('#vad').value.trim();if(!en&&!de){$('#vam').textContent='Schreibe ein englisches ODER deutsches Wort.';return}$('#vam').textContent='Übersetze online …';try{const q=en||de,lp=en?'en|de':'de|en',r=await fetch('https://api.mymemory.translated.net/get?q='+encodeURIComponent(q)+'&langpair='+lp),j=await r.json(),t=((j.responseData||{}).translatedText||'').trim();if(!t)throw 0;if(en)$('#vad').value=t;else $('#vae').value=t;$('#vam').textContent='✔ Prüfe die Übersetzung und tippe auf „Hinzufügen“.'}catch(e){$('#vam').textContent='Keine Übersetzung gefunden (Internet?).'}};
  $('#vab').onclick=()=>{const en=$('#vae').value.trim(),de=$('#vad').value.trim();if(!en||!de){$('#vam').textContent='Bitte beides ausfüllen.';return}
    const F=vst().f||'englisch',a=vocSync();if(a.some(w=>vff(w)===F&&vkey(w.en)===vkey(en))){$('#vam').textContent='Dieses Wort gibt es schon.';return}
    a.push(vocNew(en,de,'Eigene Wörter',F));vocSet(a);vocDelSet(vocDelGet().filter(k=>k!==vfk(F,en)));$('#vae').value='';$('#vad').value='';$('#vam').textContent='✔ Gespeichert.';draw()};
  $('#vub').onclick=()=>{const u=$('#vun').value,a=vocSync(),seen=new Set(a.map(w=>vkey(w.en)));let n=0;Object.keys(V).filter(k=>k.indexOf('u'+u)===0&&(k.length===2+u.length||/^u\d+[a-z]$/.test(k))&&(k.match(/^u(\d+)/)||[])[1]===u).forEach(k=>V[k].forEach(p=>{if(seen.has(vkey(p[0])))return;seen.add(vkey(p[0]));a.push(vocNew(p[0],p[1],'Blue Line Unit '+u));n++}));
    vocSet(a);vocDelSet(vocDelGet().filter(k=>seen.has(k)?false:true));$('#vam').textContent=n?'✔ '+n+' Wörter aus Unit '+u+' hinzugefügt.':'Alle Wörter dieser Unit sind schon da.';draw()};
  draw()}
