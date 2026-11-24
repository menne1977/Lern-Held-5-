/* ===== Lesen lernen: Silben farbig, Wortlisten, Blitzlesen, Silben-Puzzle, Lesetempo, Lesen & Verstehen (Funktionsdeklarationen) ===== */
function lsSub(){return{id:'lesen',name:'Lesen lernen',icon:'📖',color:'#16a34a',lang:'de-DE',book:''}}
function lsLists(){return[
 ['Stufe 1 – leichte Wörter (2 Silben)','Ma-ma Pa-pa O-ma O-pa Ro-se Na-se Ho-se Do-se Ha-se Ra-be Hu-pe Lu-pe Ki-no So-fa Au-to Ta-fel Na-me Li-mo Ku-chen Fe-der'],
 ['Stufe 2 – mit zwei Mitlauten','Kat-ze Son-ne Tan-ne Fens-ter Gar-ten Blu-me Schu-le Hun-de Pup-pe Kis-te Wol-ke Zim-mer Kir-sche Ap-fel Bir-ne Lam-pe Tas-se Mut-ter Schwes-ter Zu-cker'],
 ['Stufe 3 – lange Wörter (3 und mehr Silben)','Ba-na-ne To-ma-te Me-lo-ne Scho-ko-la-de Ei-sen-bahn Fe-ri-en Te-le-fon Kro-ko-dil Pa-pa-gei Gi-raf-fe E-le-fant Ka-rot-te Re-gen-bo-gen Ge-burts-tag Bü-che-rei Ka-nin-chen Schmet-ter-ling Fuß-ball-spiel Ham-bur-ger Ap-fel-saft']]}
function lsWords(lv){const L=lsLists();return(lv==null?L.flatMap(x=>x[1].split(' ')):L[lv][1].split(' ')).map(x=>({w:x.replace(/-/g,''),s:x.split('-')}))}
function lsTexts(){return[
 ['Der kleine Hund','Tim hat einen kleinen Hund. Er heißt Bello. Bello ist braun und hat lange Ohren. Jeden Morgen gehen Tim und Bello in den Park. Dort spielt Bello mit einem roten Ball. Am liebsten springt er in die Pfützen. Danach ist er ganz nass und schmutzig. Zu Hause gibt es dann ein Bad.',
  [['Wie heißt der Hund?','Bello',['Tim','Rex']],['Welche Farbe hat der Ball?','rot',['blau','gelb']],['Was macht Bello am liebsten?','in Pfützen springen',['schlafen','Katzen jagen']]]],
 ['Der Ausflug zum See','Am Samstag fährt Lena mit ihrer Familie an den See. Sie packen Brote, Äpfel und Saft ein. Die Sonne scheint und das Wasser ist warm. Lena baut mit ihrem Bruder eine Sandburg. Plötzlich zieht eine dunkle Wolke auf. Schnell packen alle ihre Sachen und laufen zum Auto. Gerade rechtzeitig, denn jetzt regnet es.',
  [['Wann fährt Lena an den See?','am Samstag',['am Montag','am Sonntag']],['Was baut Lena mit ihrem Bruder?','eine Sandburg',['ein Boot','ein Zelt']],['Warum laufen alle zum Auto?','Es fängt an zu regnen.',['Das Essen ist alle.','Es wird dunkel.']]]],
 ['Die Igel im Garten','Im Herbst kommt oft ein Igel in unseren Garten. Er sucht unter den Blättern nach Käfern und Würmern. Igel sind nachts unterwegs. Am Tag schlafen sie in einem Versteck. Im Winter halten Igel einen langen Winterschlaf. Dafür bauen sie sich ein warmes Nest aus Laub.',
  [['Wonach sucht der Igel?','nach Käfern und Würmern',['nach Äpfeln','nach Steinen']],['Wann sind Igel unterwegs?','nachts',['mittags','morgens']],['Woraus bauen Igel ihr Nest?','aus Laub',['aus Steinen','aus Papier']]]],
 ['Das neue Fahrrad','Mia hat Geburtstag. Sie wünscht sich schon lange ein neues Fahrrad. Als sie morgens in die Küche kommt, steht dort ein großes Paket. Darin ist ein Helm. Mia ist ein bisschen enttäuscht. Doch dann ruft Papa sie in den Garten. Dort steht ein blaues Fahrrad mit einer Schleife. Mia jubelt und dreht sofort eine Runde.',
  [['Was wünscht sich Mia?','ein Fahrrad',['einen Hund','ein Buch']],['Was ist im Paket?','ein Helm',['ein Ball','eine Puppe']],['Welche Farbe hat das Fahrrad?','blau',['rot','grün']]]]]}
/* Silbentrennung (Regeln für deutsche Wörter, automatisch – kann bei einzelnen Wörtern abweichen) */
function lsSyl(w){
  const low=w.toLowerCase(),M=['sch','ch','ck','ph','qu','th','ie','ei','ai','au','eu','äu','aa','ee','oo'],u=[];
  for(let i=0;i<w.length;){const m=M.find(x=>low.startsWith(x,i)),n=m?m.length:1;u.push(w.substr(i,n));i+=n}
  const isV=x=>/^[aeiouäöüy]/i.test(x)&&x.toLowerCase()!=='qu',vi=u.map((x,i)=>isV(x)?i:-1).filter(i=>i>=0);
  if(vi.length<2)return[w];
  const cut=[];for(let k=0;k<vi.length-1;k++){const a=vi[k],b=vi[k+1],c=b-a-1;if(c===0)cut.push(b);else if(c===1)cut.push(a+1);else{const two=(u[b-2]+u[b-1]).toLowerCase();cut.push(c>=3&&/^(bl|br|pl|pr|kl|kr|gl|gr|fl|fr|dr|tr|schl|schm|schn|schw|schr|zw|kn|sp)$/.test(two)?b-2:b-1)}}
  const out=[];let s=0;cut.forEach(c=>{out.push(u.slice(s,c).join(''));s=c});out.push(u.slice(s).join(''));return out.filter(Boolean)}
function lsWordHtml(word,arc){const p=lsSyl(word);return `<span class="lsw" data-w="${esc(word)}">`+p.map((x,i)=>`<span class="ls${i%2?2:1}${arc?' lsa':''}">${esc(x)}</span>`).join('')+'</span>'}
function lsColor(text,mode){if(mode==='aus')return esc(text).replace(/\n/g,'<br>');
  return text.split(/(\s+)/).map(t=>{if(/^\s+$/.test(t))return t.indexOf('\n')>=0?'<br>':' ';const m=t.match(/^([^A-Za-zÄÖÜäöüß]*)([A-Za-zÄÖÜäöüß-]+)([^A-Za-zÄÖÜäöüß]*)$/);if(!m)return esc(t);return esc(m[1])+m[2].split('-').map(x=>lsWordHtml(x,mode==='boegen')).join('-')+esc(m[3])}).join('')}
function lsOpt(){let o={};try{o=JSON.parse(localStorage.getItem('sh5ls')||'{}')}catch(e){}return Object.assign({size:22,mode:'farbe',text:'',c1:'#2563eb',c2:'#dc2626'},o)}
const LS_PRE=[['Blau · Rot','#2563eb','#dc2626'],['Grün · Orange','#16a34a','#ea580c'],['Lila · Türkis','#7c3aed','#0891b2'],['Schwarz · Blau','#111827','#2563eb'],['Pink · Grün','#db2777','#15803d']];
function lsApply(){const o=lsOpt(),r=document.documentElement.style;r.setProperty('--ls1',o.c1);r.setProperty('--ls2',o.c2)}
function lsKiPrompt(f){return `Schreibe einen Lesetext für eine Schülerin/einen Schüler (${klasse()}. Klasse, ${sfText()}).${sfLevel()}\nThema: ${f.topic||'(Thema einfügen)'}\nLänge: ${f.len==='kurz'?'etwa 5 Sätze':f.len==='lang'?'etwa 15 Sätze':'etwa 9 Sätze'}.\nRegeln: kurze, klare Sätze (höchstens 12 Wörter), einfache bekannte Wörter, keine Abkürzungen, keine Aufzählungszeichen, nur normaler Fließtext, Absätze mit Leerzeile. Der Text soll gut vorlesbar sein und zum Thema passen. Schreibe ausschließlich den Text, ohne Überschrift und ohne Kommentar.`}
function lsSave(o){try{localStorage.setItem('sh5ls',JSON.stringify(o))}catch(e){}}
function lsTopic(id,title,slides,gen){TOPICS[id]={id,title,tags:'lesen silben '+title,sub:lsSub(),chap:{t:'Lesen lernen',i:'📖'},s:slides,ex:[],extra:[],vgen:gen};return TOPICS[id]}
function lesenInit(){lsApply();
  const W=lsWords();
  lsTopic('ls_zaehlen','Silben zählen',[['👏 Silben klatschen','Sprich das Wort langsam und klatsche bei jeder Silbe. <b>Ba-na-ne</b> = 3 Mal klatschen. Jede Silbe hat einen Selbstlaut (a, e, i, o, u, ä, ö, ü, au, ei, eu).']],
    ()=>{const x=pick(W);return Q(`Wie viele Silben hat das Wort?<div class="big">${esc(x.w)}</div>`,String(x.s.length),{kind:'choice',opts:['1','2','3','4'],speak:x.w,sl:'de-DE',steps:`<span class="lsbig">${x.s.map((y,i)=>`<span class="ls${i%2?2:1}">${esc(y)}</span>`).join('·')}</span> = ${x.s.length} Silben`})});
  const D=[['🐻','_är','B',['D','P']],['🍞','_rot','B',['D','P']],['🐬','_elfin','D',['B','P']],['🎈','_allon','B',['D','P']],['🏠','_ach','D',['B','P']],['🍐','_irne','B',['D','P']],['📦','_aket','P',['B','D']],['🐧','_inguin','P',['B','D']],['🌲','_aum','B',['D','P']],['🌙','_ond','M',['N']],['👃','_ase','N',['M']],['🐭','_aus','M',['N']],['🪺','_est','N',['M']],['🧊','_s','Ei',['Ie']],['🦵','B_n','ei',['ie']],['✉️','Br_f','ie',['ei']],['🐝','B_ne','ie',['ei']],['🧅','Zw_bel','ie',['ei']],['🧼','S_fe','ei',['ie']],['🎻','G_ge','ei',['ie']],['🧸','Sp_lzeug','ie',['ei']]];
  lsTopic('ls_detektiv','Buchstaben-Detektiv (b/d/p, m/n, ei/ie)',[['🔍 Genau hinschauen','b, d und p sehen ähnlich aus, genauso m und n. Bei <b>ei</b> und <b>ie</b> hilft: Bei <b>ie</b> hörst du ein langes i (Biene), bei <b>ei</b> ein „ai“ (Eis).']],
    ()=>{const x=pick(D),full=x[1].replace('_',x[2]);return Q(`<div class="big">${x[0]}</div>Welcher Buchstabe fehlt?<div class="big">${esc(x[1]).replace('_','<u>&nbsp;?&nbsp;</u>')}</div>`,x[2],{kind:'choice',opts:shuffle([x[2]].concat(x[3])),speak:full,sl:'de-DE',steps:`Richtig geschrieben: <b>${esc(full)}</b>`})});
  lsTexts().forEach((t,i)=>lsTopic('ls_text'+i,'Lesen & verstehen: '+t[0],[['📖 '+t[0],`<div class="lstext" style="font-size:1.2rem;line-height:2">${lsColor(t[1],'farbe')}</div>`],['❓ Jetzt beantworten','Lies den Text genau. Danach kommen Fragen dazu. Du kannst jederzeit zurück zum Text.']],
    (()=>{let q=shuffle(t[2]);return()=>{if(!q.length)q=shuffle(t[2]);const x=q.shift();return Q(`<small>${esc(t[0])}</small><br>${esc(x[0])}`,x[1],{kind:'choice',opts:shuffle([x[1]].concat(x[2])),steps:'Schau noch einmal in den Text.'})}})()));
}
function lesenPage(){
  setNav('home');lsApply();const A=(h,i,t,sm)=>`<a class="act" href="${h}">${i}<b>${t}</b><small>${sm}</small></a>`;
  app().innerHTML=`<a class="back" href="#/">← Start</a><header class="shead" style="--c:#16a34a"><span>📖</span><div><h1>Lesen lernen</h1><small>Silben farbig · Schritt für Schritt besser lesen</small></div></header>
  <p class="lead">Wörter werden in <span class="ls1">Sil</span><span class="ls2">ben</span> zerlegt und abwechselnd <b style="color:#2563eb">blau</b> und <b style="color:#dc2626">rot</b> gefärbt. So erkennst du Wortteile schneller.</p>
  <div class="acts">${A('#/lesen/text','🌈','Silbentext','eigener Text farbig')}${A('#/lesen/listen','📋','Wortlisten','3 Stufen, antippen = hören')}${A('#/practice/ls_zaehlen','👏','Silben zählen','klatschen und tippen')}${A('#/lesen/puzzle','🧩','Silben-Puzzle','Wort zusammensetzen')}${A('#/lesen/blitz','⚡','Blitzlesen','Wort kurz sehen')}${A('#/lesen/tempo','⏱️','Lesetempo','Wörter pro Minute')}${A('#/practice/ls_detektiv','🔍','Buchstaben-Detektiv','b/d/p · m/n · ei/ie')}${A('#/lesen/zeile','📏','Zeile für Zeile','Leselineal')}</div>
  <h2>📖 Lesen & verstehen</h2>${lsTexts().map((t,i)=>`<a class="row" href="#/t/ls_text${i}"><span>${esc(t[0])}<small>Text lesen, dann 3 Fragen</small></span><em>${starStr('ls_text'+i)}</em></a>`).join('')}
  <h2>💡 So wirst du besser</h2><div class="card" style="padding:12px;line-height:1.6">• <b>Jeden Tag 10 Minuten</b> lesen ist besser als einmal in der Woche lange.<br>• Erst die <b>Silben</b> lesen, dann das ganze Wort.<br>• <b>Laut lesen</b> – auch mal einem Kuscheltier oder den Eltern vor.<br>• Texte <b>zweimal</b> lesen: beim zweiten Mal geht es schon flüssiger.<br>• Mit dem <b>Finger</b> oder dem Leselineal unter der Zeile mitfahren.<br>• Schwierige Wörter <b>anhören</b> (antippen) und nachsprechen.<br>• Beim Lesetempo nicht hetzen: <b>richtig</b> lesen ist wichtiger als schnell.</div>`}
function lesenRoute(p){lsApply();if(p==='text')return lsTextPage();if(p==='listen')return lsListPage();if(p==='puzzle')return lsPuzzle();if(p==='blitz')return lsBlitz();if(p==='tempo')return lsTempo();if(p==='zeile')return lsZeile();lesenPage()}
function lsBack(){return '<a class="back noprint" href="#/lesen">← Lesen lernen</a>'}
function lsBindWords(root){root.querySelectorAll('.lsw').forEach(s=>s.onclick=()=>speak(s.dataset.w,'de-DE'))}
function lsTextPage(){
  setNav('home');const o=lsOpt();if(!o.text)o.text=lsTexts()[0][1];
  const chip=(v,l)=>`<button class="chip lsm${o.mode===v?' on':''}" data-v="${v}">${l}</button>`;
  app().innerHTML=`${lsBack()}<h1 class="noprint">🌈 Silbentext</h1><div class="noprint"><p class="hint">Eigenen Text einfügen oder einen Beispieltext wählen. Ein Wort antippen = vorlesen.</p>
  <div class="chips">${lsTexts().map((t,i)=>`<button class="chip lst" data-i="${i}">${esc(t[0])}</button>`).join('')}</div>
  <textarea id="lstx" class="ans" rows="4">${esc(o.text)}</textarea>
  <div class="chips">${chip('farbe','🌈 Silben farbig')}${chip('boegen','⌒ Silbenbögen')}${chip('aus','Aus')}<button class="chip" id="lsm">A−</button><button class="chip" id="lsp">A+</button><button class="chip" id="lsv">🔊 Vorlesen</button><button class="chip" id="lspr">🖨️ Drucken</button></div>
  <h2>🎨 Farben der Silben</h2><div class="chips">${LS_PRE.map((x,i)=>`<button class="chip lsc${o.c1===x[1]&&o.c2===x[2]?' on':''}" data-i="${i}"><b style="color:${x[1]}">Sil</b><b style="color:${x[2]}">ben</b> ${x[0]}</button>`).join('')}</div>
  <div class="chips" style="align-items:center"><label>Farbe 1 <input type="color" id="lsc1" value="${o.c1}"></label><label>Farbe 2 <input type="color" id="lsc2" value="${o.c2}"></label></div>
  <h2>🤖 Text von der KI schreiben lassen</h2><p class="hint">Thema eingeben, Auftrag kopieren, in ChatGPT/Gemini/Claude einfügen, die Antwort oben in das Textfeld einfügen – fertig.</p>
  <input id="lskt" class="ans" placeholder="Thema, z. B. Ein Tag am Meer" value="${esc(o.ktopic||'')}"><div class="chips">${['kurz','mittel','lang'].map(v=>`<button class="chip lskl${(o.klen||'mittel')===v?' on':''}" data-v="${v}">${v}</button>`).join('')}</div>
  ${sfChips('lssf')}<div class="row2"><button class="go" id="lskc">📋 Auftrag kopieren</button>${gemCfg().key?'<button id="lskg">🤖 Direkt mit Gemini</button>':''}</div><p class="hint" id="lsks"></p></div>
  <div id="lsout" class="lstext" style="font-size:${o.size}px">${lsColor(o.text,o.mode)}</div><p class="hint noprint">Die Silben werden automatisch getrennt – bei einzelnen Wörtern kann die Trennung abweichen.</p>`;
  const upd=()=>{o.text=$('#lstx').value;lsSave(o);$('#lsout').innerHTML=lsColor(o.text,o.mode);$('#lsout').style.fontSize=o.size+'px';lsBindWords($('#lsout'))};
  $('#lstx').oninput=upd;lsBindWords($('#lsout'));
  document.querySelectorAll('.lsm').forEach(b=>b.onclick=()=>{o.mode=b.dataset.v;lsSave(o);lsTextPage()});
  document.querySelectorAll('.lst').forEach(b=>b.onclick=()=>{$('#lstx').value=lsTexts()[+b.dataset.i][1];upd()});
  $('#lsm').onclick=()=>{o.size=Math.max(14,o.size-2);upd()};$('#lsp').onclick=()=>{o.size=Math.min(48,o.size+2);upd()};
  $('#lsv').onclick=()=>speak($('#lstx').value,'de-DE');$('#lspr').onclick=()=>doPrint('Silbentext');
  const setc=(a,b)=>{o.c1=a;o.c2=b;lsSave(o);lsApply()};
  document.querySelectorAll('.lsc').forEach(b=>b.onclick=()=>{const x=LS_PRE[+b.dataset.i];setc(x[1],x[2]);lsTextPage()});
  $('#lsc1').oninput=e=>{setc(e.target.value,o.c2);$('#lsout').innerHTML=lsColor(o.text,o.mode)};$('#lsc2').oninput=e=>{setc(o.c1,e.target.value);$('#lsout').innerHTML=lsColor(o.text,o.mode)};
  const kf=()=>({topic:$('#lskt').value.trim(),len:o.klen||'mittel'});
  $('#lskt').oninput=()=>{o.ktopic=$('#lskt').value;lsSave(o)};
  document.querySelectorAll('.lskl').forEach(b=>b.onclick=()=>{o.klen=b.dataset.v;lsSave(o);document.querySelectorAll('.lskl').forEach(x=>x.classList.toggle('on',x===b))});
  document.querySelectorAll('.lssf').forEach(b=>b.onclick=()=>{sfSet(b.dataset.v);lsTextPage()});
  $('#lskc').onclick=async()=>{if(!schulform()){$('#lsks').textContent='⚠️ Bitte erst die Schulform wählen.';return}if(!kf().topic){$('#lsks').textContent='⚠️ Bitte ein Thema eintragen.';return}const t=lsKiPrompt(kf());try{await navigator.clipboard.writeText(t);$('#lsks').textContent='✅ Auftrag kopiert. In die KI einfügen und die Antwort oben ins Textfeld einfügen.'}catch(e){window.prompt('Auftrag kopieren:',t)}};
  const g=$('#lskg');if(g)g.onclick=async()=>{if(!schulform()){$('#lsks').textContent='⚠️ Bitte erst die Schulform wählen.';return}if(!kf().topic){$('#lsks').textContent='⚠️ Bitte ein Thema eintragen.';return}$('#lsks').textContent='Die KI schreibt … (10–20 Sekunden)';try{const t=await gemini(lsKiPrompt(kf()));$('#lstx').value=t.trim();upd();$('#lsks').textContent='✅ Text eingefügt.'}catch(e){$('#lsks').textContent='⚠️ '+e.message}}}
function lsListPage(){
  setNav('home');
  app().innerHTML=`${lsBack()}<h1>📋 Silben-Wortlisten</h1><p class="hint noprint">Lies jedes Wort erst in Silben, dann ganz. Antippen = anhören.</p><button class="chip noprint" id="lspr">🖨️ Drucken</button>`+
  lsLists().map((l,i)=>`<h2>${esc(l[0])}</h2><div class="lsgrid">${lsWords(i).map(x=>`<span class="lsw lsbig" data-w="${esc(x.w)}">${x.s.map((y,k)=>`<span class="ls${k%2?2:1}">${esc(y)}</span>`).join('')}</span>`).join('')}</div>`).join('');
  lsBindWords(app());$('#lspr').onclick=()=>doPrint('Silben-Wortlisten')}
function lsPuzzle(){
  setNav('home');const st={n:0,ok:0};
  const next=()=>{const x=pick(lsWords().filter(y=>y.s.length>=2)),parts=shuffle(x.s.map((s,i)=>({s,i})));let built=[];
    if(parts.every((p,i)=>p.i===i)&&parts.length>1)parts.reverse();
    app().innerHTML=`${lsBack()}<h1>🧩 Silben-Puzzle</h1><p class="lead">Tippe die Silben in der richtigen Reihenfolge. ⭐ ${st.ok}/${st.n}</p>
    <div class="qcard" style="--c:#16a34a"><button class="say spk" data-t="${esc(x.w)}" data-l="de-DE">🔊 Wort anhören</button><div id="pz" class="big" style="min-height:56px;letter-spacing:1px">&nbsp;</div><div class="opts">${parts.map((p,k)=>`<button class="opt pzb" data-k="${k}">${esc(p.s)}</button>`).join('')}</div><button class="lnk" id="pzr">↺ Nochmal</button><div id="fb"></div></div>`;
    const show=()=>{$('#pz').innerHTML=built.map((p,i)=>`<span class="ls${i%2?2:1}">${esc(p.s)}</span>`).join('')||'&nbsp;'};
    document.querySelectorAll('.pzb').forEach(b=>b.onclick=()=>{if(b.disabled)return;b.disabled=true;built.push(parts[+b.dataset.k]);show();
      if(built.length===parts.length){st.n++;const ok=built.map(p=>p.s).join('')===x.w;if(ok)st.ok++;speak(x.w,'de-DE');
        $('#fb').innerHTML=`<div class="fb ${ok?'ok':'no'}"><b>${ok?pick(PRAISE):'Nicht ganz.'}</b> ${ok?'':'Richtig: '}<span class="lsbig">${x.s.map((y,i)=>`<span class="ls${i%2?2:1}">${esc(y)}</span>`).join('')}</span></div><button class="go" id="nxt">Weiter ▶</button>`;$('#nxt').onclick=next}});
    $('#pzr').onclick=()=>{built=[];document.querySelectorAll('.pzb').forEach(b=>b.disabled=false);show();$('#fb').innerHTML=''}};
  next()}
function lsBlitz(){
  setNav('home');let ms=+(lsOpt().blitz||900),lv=0;const st={n:0,ok:0};
  const intro=()=>{app().innerHTML=`${lsBack()}<h1>⚡ Blitzlesen</h1><p class="lead">Ein Wort erscheint ganz kurz. Danach tippst du an, welches Wort es war.</p>
    <h2>Stufe</h2><div class="chips">${lsLists().map((l,i)=>`<button class="chip bl${i===lv?' on':''}" data-i="${i}">Stufe ${i+1}</button>`).join('')}</div>
    <h2>Anzeigezeit: <span id="msv">${ms}</span> ms</h2><input type="range" id="msr" min="200" max="2000" step="100" value="${ms}" style="width:100%">
    <button class="go" id="bgo" style="width:100%;margin-top:12px">▶ Start</button>`;
    document.querySelectorAll('.bl').forEach(b=>b.onclick=()=>{lv=+b.dataset.i;intro()});$('#msr').oninput=e=>{ms=+e.target.value;$('#msv').textContent=ms;const o=lsOpt();o.blitz=ms;lsSave(o)};$('#bgo').onclick=run};
  const run=()=>{const L=lsWords(lv),x=pick(L),o=shuffle([x.w].concat(shuffle(L.filter(y=>y.w!==x.w)).slice(0,3).map(y=>y.w)));
    app().innerHTML=`${lsBack()}<h1>⚡ Blitzlesen</h1><p class="hint">⭐ ${st.ok}/${st.n} · ${ms} ms</p><div class="qcard" style="--c:#16a34a;text-align:center"><div id="bw" style="font-size:2.6rem;min-height:70px;font-weight:700">👀</div><div id="bo"></div><div id="fb"></div></div>`;
    setTimeout(()=>{$('#bw').textContent=x.w;setTimeout(()=>{if(!$('#bw'))return;$('#bw').textContent='❓';$('#bo').innerHTML=`<div class="opts">${o.map(w=>`<button class="opt">${esc(w)}</button>`).join('')}</div>`;
      document.querySelectorAll('#bo .opt').forEach(b=>b.onclick=()=>{if($('#nxt'))return;st.n++;const ok=b.textContent===x.w;if(ok)st.ok++;document.querySelectorAll('#bo .opt').forEach(c=>{c.disabled=true;if(c.textContent===x.w)c.classList.add('good');else if(c===b)c.classList.add('bad')});$('#bw').textContent=x.w;
        $('#fb').innerHTML=`<div class="fb ${ok?'ok':'no'}"><b>${ok?pick(PRAISE):'Nicht ganz.'}</b>${ok&&ms>300?' Tipp: Stell die Zeit kürzer!':''}</div><button class="go" id="nxt">Weiter ▶</button><button class="lnk" id="bset">⚙️ Zeit ändern</button>`;$('#nxt').onclick=run;$('#bset').onclick=intro})},ms)},700)};
  intro()}
function lsTempo(){
  setNav('home');let lv=0,t0=0;let best={};try{best=JSON.parse(localStorage.getItem('sh5tempo')||'{}')}catch(e){}
  const draw=()=>{const L=shuffle(lsWords(lv));
    app().innerHTML=`${lsBack()}<h1>⏱️ Lesetempo</h1><p class="lead">Drücke Start und lies alle Wörter <b>laut</b>. Danach Stopp drücken.</p>
    <div class="chips">${lsLists().map((l,i)=>`<button class="chip tl${i===lv?' on':''}" data-i="${i}">Stufe ${i+1}${best[i]?' · Rekord '+best[i]:''}</button>`).join('')}</div>
    <button class="go" id="tgo" style="width:100%">▶ Start</button><div id="tl" class="lsgrid" style="filter:blur(6px)">${L.map(x=>`<span class="lsbig">${x.s.map((y,k)=>`<span class="ls${k%2?2:1}">${esc(y)}</span>`).join('')}</span>`).join('')}</div><div id="tr"></div>`;
    document.querySelectorAll('.tl').forEach(b=>b.onclick=()=>{lv=+b.dataset.i;draw()});
    $('#tgo').onclick=()=>{if(!t0){t0=Date.now();$('#tl').style.filter='none';$('#tgo').textContent='⏹ Fertig gelesen';return}
      const s=(Date.now()-t0)/1000,wpm=Math.round(L.length/s*60);t0=0;const rec=!best[lv]||wpm>best[lv];if(rec){best[lv]=wpm;try{localStorage.setItem('sh5tempo',JSON.stringify(best))}catch(e){}}
      $('#tr').innerHTML=`<div class="fb ok"><b>${L.length} Wörter in ${Math.round(s)} Sekunden = ${wpm} Wörter pro Minute${rec?' · 🏆 Neuer Rekord!':''}</b></div><p class="hint">Hast du alle Wörter richtig gelesen? Richtig lesen ist wichtiger als schnell.</p>`;$('#tgo').textContent='🔁 Nochmal';$('#tgo').onclick=draw}};
  draw()}
function lsZeile(){
  setNav('home');const o=lsOpt(),text=o.text||lsTexts()[0][1],S=text.replace(/\n+/g,' ').match(/[^.!?]+[.!?]*/g).map(x=>x.trim()).filter(Boolean);let i=0;
  const draw=()=>{app().innerHTML=`${lsBack()}<h1>📏 Zeile für Zeile</h1><p class="hint">Ein Satz nach dem anderen – wie mit einem Leselineal. Den Text änderst du unter „Silbentext“.</p>
    <div class="qcard" style="--c:#16a34a"><small>Satz ${i+1} von ${S.length}</small><div class="lstext" style="font-size:${Math.max(26,o.size+6)}px;line-height:1.9">${lsColor(S[i],o.mode==='aus'?'farbe':o.mode)}</div>
    <div class="row2"><button id="zp" ${i?'':'disabled'}>◀ Zurück</button><button class="go" id="zn">${i<S.length-1?'Weiter ▶':'Fertig ✔'}</button></div><button class="lnk" id="zv">🔊 Satz vorlesen</button></div>`;
    lsBindWords(app());$('#zp').onclick=()=>{i--;draw()};$('#zn').onclick=()=>{if(i<S.length-1){i++;draw()}else go('#/lesen')};$('#zv').onclick=()=>speak(S[i],'de-DE')};
  draw()}
