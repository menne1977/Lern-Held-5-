/* ===== Hören & Aussprache: Wörter hören, schreiben, Bedeutung, Minimalpaare (Funktionsdeklarationen) ===== */
function hrLangs(){const L=[['de','Deutsch','🇩🇪','de-DE'],['en','Englisch','🇬🇧','en-GB']];Object.keys(LANGS).forEach(k=>L.push([k,LANGS[k].name,LANGS[k].flag,LANGS[k].tts]));return L}
function hrWords(code){
  if(code==='de')return lsWords().map(x=>[x.w,x.w]);
  if(code==='en'){const a=[];Object.keys(V).forEach(k=>V[k].forEach(w=>{if(w[0]&&w[0].length<=18)a.push([w[0],w[1]])}));return a}
  return langAll(code).filter(w=>!/[.?!…]$/.test(w[0]))}
function hrPairs(code){return code==='de'?[['Bett','Beet'],['Mitte','Miete'],['Hütte','Hüte'],['offen','Ofen'],['Kamm','kam'],['Stadt','Staat'],['Bann','Bahn'],['satt','Saat'],['Höhle','Hölle'],['Rose','Rosse'],['Tier','Teer'],['Kuchen','Kuh'],['Fisch','frisch'],['Wal','Wahl'],['Ball','Bald']]
  :code==='en'?[['ship','sheep'],['live','leave'],['bad','bed'],['cat','cut'],['full','fool'],['sit','seat'],['pen','pan'],['thin','tin'],['three','tree'],['van','fan'],['hat','hut'],['walk','work'],['pull','pool'],['very','berry'],['thank','tank']]:null}
function hrSub(c){const l=hrLangs().find(x=>x[0]===c);return{id:'hoeren',name:'Hören & Aussprache',icon:'👂',color:'#0891b2',lang:l[3],book:''}}
function hrGen(code,mode){
  const l=hrLangs().find(x=>x[0]===code),W=hrWords(code),P=hrPairs(code),tts=l[3];
  return()=>{
    if(mode==='paar'){const p=pick(P),w=pick(p);return Q('👂 Welches Wort hörst du? Hör genau auf den Unterschied.',w,{kind:'choice',opts:shuffle(p.slice()),speak:w,sl:tts,auto:1,steps:`Gesprochen wurde: <b>${esc(w)}</b> (Paar: ${esc(p[0])} – ${esc(p[1])})`})}
    const w=pick(W),o=shuffle(W.filter(x=>x[0]!==w[0])).slice(0,3);
    if(mode==='hoer')return Q('👂 Welches Wort hörst du?',w[0],{kind:'choice',opts:shuffle([w[0]].concat(o.map(x=>x[0]))),speak:w[0],sl:tts,auto:1,steps:code==='de'?esc(w[0]):`${esc(w[0])} = ${esc(w[1])}`});
    if(mode==='bed')return Q('👂 Hör zu: Was bedeutet das Wort?',w[1],{kind:'choice',opts:shuffle([w[1]].concat(o.map(x=>x[1]))),speak:w[0],sl:tts,auto:1,steps:`${esc(w[0])} = ${esc(w[1])}`});
    const b=w[0].trim();return Q('✍️ Hör zu und schreibe das Wort.',[b,langDeacc(b),langDeacc(langStrip(b)),langStrip(b)],{pre:x=>langDeacc(x),ks:true,speak:b,sl:tts,auto:1,hint:`${b.length} Zeichen · beginnt mit „${esc(b[0])}“`,steps:`Richtig: <b>${esc(b)}</b>${code!=='de'?' = '+esc(w[1]):''}`})}}
function hrModes(code){const m=[['hoer','👂','Welches Wort hörst du?','4 Wörter zur Wahl'],['schreib','✍️','Hören und schreiben','Wort-Diktat']];if(code!=='de')m.push(['bed','💡','Was bedeutet das?','hören und verstehen']);if(hrPairs(code))m.push(['paar','⚖️','Ähnliche Wörter','Minimalpaare unterscheiden']);return m}
function hoerenInit(){hrLangs().forEach(l=>hrModes(l[0]).forEach(m=>{const id='hr_'+l[0]+'_'+m[0];
  TOPICS[id]={id,title:l[1]+': '+m[2],tags:'hören aussprache '+l[1]+' '+m[2],sub:hrSub(l[0]),chap:{t:'Hören & Aussprache · '+l[1],i:l[2]},s:[['👂 '+m[2],'Das Wort wird automatisch vorgelesen. Mit <b>🔊 Anhören</b> hörst du es nochmal, mit <b>🐢 Langsam</b> ganz langsam. Kein Ton? Lautstärke prüfen und in Android unter „Text-to-Speech“ die Google-Sprachausgabe mit der Sprache '+l[1]+' installieren.']].concat(l[0]==='la'?[['🏛️ Latein',LANGS.la.note]]:[]),ex:[],extra:[],vgen:hrGen(l[0],m[0])}}))}
function hoerenPage(c){
  setNav('home');const rate=hrRate();
  app().innerHTML=`<a class="back" href="#/">← Start</a><header class="shead" style="--c:#0891b2"><span>👂</span><div><h1>Hören & Aussprache</h1><small>Hörverstehen in ${hrLangs().length} Sprachen</small></div></header>
  <p class="lead">Wähle eine Sprache. Die Wörter werden vorgelesen – du erkennst sie, schreibst sie oder findest die Bedeutung.</p>
  <a class="lnk" href="#/stimme">🔊 Stimme wählen (Frau / Mann)</a><h2>Sprechtempo</h2><div class="chips"><button class="chip hrr${rate==='normal'?' on':''}" data-v="normal">🐇 Normal</button><button class="chip hrr${rate==='langsam'?' on':''}" data-v="langsam">🐢 Langsam</button></div>
  <div class="chips">${hrLangs().map(l=>`<button class="chip hrl${l[0]===(c||'de')?' on':''}" data-c="${l[0]}">${l[2]} ${l[1]}</button>`).join('')}</div>
  <div class="acts">${hrModes(c||'de').map(m=>`<a class="act" href="#/practice/hr_${c||'de'}_${m[0]}">${m[1]}<b>${m[2]}</b><small>${m[3]}</small></a>`).join('')}</div>
  <p class="hint">Tipp: Kopfhörer helfen. Erst zuhören, dann nachsprechen, dann antippen.</p>`;
  document.querySelectorAll('.hrl').forEach(b=>b.onclick=()=>hoerenPage(b.dataset.c));
  document.querySelectorAll('.hrr').forEach(b=>b.onclick=()=>{try{localStorage.setItem('sh5rate',b.dataset.v)}catch(e){}hoerenPage(c)})}
function hrRate(){try{return localStorage.getItem('sh5rate')||'normal'}catch(e){return'normal'}}
/* Sprachen Europas */
function langEuPage(){
  setNav('home');
  app().innerHTML=`<a class="back" href="#/">← Start</a><header class="shead" style="--c:#1d4ed8"><span>🇪🇺</span><div><h1>Sprachen Europas</h1><small>Grundwortschatz mit Aussprache</small></div></header>
  <p class="lead">Begrüßung, Zahlen, Farben, Familie, Tiere, Essen und wichtige Sätze – mit Vorlesen. Französisch, Spanisch und Latein sind eigene Fächer mit noch mehr Wörtern.</p>
  <div class="grid">${['franzoesisch','spanisch','latein'].map(id=>{const s=subjById(id);return `<a class="subj" style="--c:${s.color}" href="#/s/${id}"><span class="ic">${s.icon}</span><b>${s.name}</b><small>eigenes Fach</small></a>`}).join('')}</div>
  ${Object.keys(LANGS).filter(k=>LANGS[k].eu).map(k=>{const L=LANGS[k];return `<details class="chap" style="--c:#1d4ed8"><summary>${L.flag} ${L.name}<small>${langAll(k).length} Wörter</small></summary>${L.cats.map((c,i)=>`<a class="row" href="#/t/lg-${k}-${i}"><span>${c[1]} ${esc(c[0])}</span><em>${starStr('lg-'+k+'-'+i)}</em></a>`).join('')}<a class="row" href="#/practice/lg-${k}-mix"><span>🔀 Alles gemischt üben</span><em>${starStr('lg-'+k+'-mix')}</em></a><a class="row" href="#/s/hoeren/${k}"><span>👂 Hören & Aussprache</span><em></em></a></details>`}).join('')}
  <a class="go" style="display:block;text-align:center;margin-top:12px;background:#0891b2;border-color:#0891b2" href="#/s/hoeren">👂 Hören & Aussprache für alle Sprachen</a>`}
function langInit(){Object.keys(LANGS).filter(k=>LANGS[k].eu).forEach(k=>{const L=LANGS[k],sub={id:'eu',name:L.name,icon:L.flag,color:'#1d4ed8',lang:L.tts,book:'Sprachen Europas'};
  langCh(k).forEach(ch=>ch.tp.forEach(t=>{t.sub=sub;t.chap={t:L.name,i:L.flag};TOPICS[t.id]=t}))})}
