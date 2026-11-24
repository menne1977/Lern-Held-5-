/* ===== Stimme: weiblich / männlich / automatisch + einzelne Stimmen wählen ===== */
const VC_F=/female|weiblich|femme|mujer|donna|frau|\b(anna|petra|marlene|vicki|helena|hedda|katja|amelie|marie|paulina|monica|samantha|karen|victoria|susan|zira|hazel|siri|lena|julia|elsa|carmen|paloma|lucia|ioana|sara)\b/i;
const VC_M=/\bmale\b|männlich|homme|hombre|uomo|mann\b|\b(hans|markus|stefan|thomas|daniel|jorge|diego|paul|david|mark|george|alex|luca|yannick|conrad|guy|klaus|jürgen|martin|reed|rishi|ryan|pablo|enrique|giorgio)\b/i;
function vcOpt(){let o={};try{o=JSON.parse(localStorage.getItem('sh5voice')||'{}')}catch(e){}return Object.assign({g:'auto',v:{}},o)}
function vcSave(o){try{localStorage.setItem('sh5voice',JSON.stringify(o))}catch(e){}}
window.__vcList=window.__vcList||[];
function vcNative(){try{const C=window.Capacitor;return C&&C.isNativePlatform&&C.isNativePlatform()&&(C.Plugins.TextToSpeech||(C.registerPlugin&&C.registerPlugin('TextToSpeech')))}catch(e){return null}}
async function vcLoad(){
  let L=[];const P=vcNative();
  try{if(P&&P.getSupportedVoices){const r=await P.getSupportedVoices();L=(r.voices||[]).map((v,i)=>({i,name:v.name||v.voiceURI,uri:v.voiceURI||v.name,lang:String(v.lang||'').replace('_','-'),net:/network|online/i.test((v.name||'')+(v.voiceURI||''))}))}}catch(e){}
  if(!L.length&&window.speechSynthesis){L=(speechSynthesis.getVoices()||[]).map((v,i)=>({i,name:v.name,uri:v.voiceURI,lang:String(v.lang||'').replace('_','-'),net:!v.localService}))}
  window.__vcList=L;return L}
function vcGender(v){const n=v.name+' '+v.uri;return VC_F.test(n)?'f':VC_M.test(n)?'m':''}
function vcFor(lang){return(window.__vcList||[]).filter(v=>v.lang.toLowerCase().startsWith(String(lang).slice(0,2).toLowerCase()))}
/* Liefert {voice, pitch} für Sprache: gespeicherte Wahl > Geschlecht per Name > Tonhöhe als Ersatz */
function vcChoose(lang){
  const o=vcOpt(),pre=String(lang).slice(0,2).toLowerCase(),L=vcFor(lang),want=o.v[pre];
  if(want){const v=L.find(x=>x.uri===want||x.name===want);if(v)return{voice:v,pitch:1}}
  if(o.g==='auto')return{voice:null,pitch:1};
  const m=L.filter(x=>vcGender(x)===o.g);
  if(m.length)return{voice:m.find(x=>!x.net)||m[0],pitch:1};
  return{voice:null,pitch:o.g==='m'?.72:1.22}}
function vcTest(lang){const t={de:'Hallo! So klingt meine Stimme.','de-DE':'Hallo! So klingt meine Stimme.',en:'Hello! This is how my voice sounds.',fr:'Bonjour ! Voici ma voix.',es:'¡Hola! Así suena mi voz.',it:'Ciao! Questa è la mia voce.',la:'Salve! Haec est vox mea.',nl:'Hallo! Zo klinkt mijn stem.',pl:'Cześć! Tak brzmi mój głos.',pt:'Olá! Esta é a minha voz.',sv:'Hej! Så låter min röst.',tr:'Merhaba! Sesim böyle.',hr:'Bok! Ovako zvuči moj glas.'};
  const code=lang.slice(0,2);speak(t[lang]||t[code]||'Hallo! So klingt meine Stimme.',lang)}
async function stimmePage(){
  setNav('home');const o=vcOpt();await vcLoad();
  const c=(v,l)=>`<button class="chip vcg${o.g===v?' on':''}" data-v="${v}">${l}</button>`,rate=hrRate();
  const langs=[['de-DE','Deutsch','🇩🇪'],['en-GB','English','🇬🇧'],['fr-FR','Français','🇫🇷'],['es-ES','Español','🇪🇸'],['it-IT','Italiano','🇮🇹']].concat(Object.keys(typeof LANGS!=='undefined'?LANGS:{}).filter(k=>!['fr','es','la','it'].includes(k)).map(k=>[LANGS[k].tts,LANGS[k].name,LANGS[k].flag]));
  const sel=window.__vcSel||'de-DE';
  const vs=vcFor(sel),pre=sel.slice(0,2).toLowerCase();
  app().innerHTML=`<a class="back" href="#/">← Start</a><h1>🔊 Stimme</h1>
  <p class="lead">Wähle, ob dir vorgelesen wird von einer <b>Frauen-</b> oder <b>Männerstimme</b>. Das gilt für alle Aufgaben, Quiz, Hören und Lesen lernen.</p>
  <div class="chips">${c('auto','⚙️ Automatisch')}${c('f','👩 Frau')}${c('m','👨 Mann')}</div>
  <h2>Sprechtempo</h2><div class="chips"><button class="chip hrr${rate==='normal'?' on':''}" data-v="normal">🐇 Normal</button><button class="chip hrr${rate==='langsam'?' on':''}" data-v="langsam">🐢 Langsam</button></div>
  <h2>Anhören</h2><div class="chips">${langs.map(l=>`<button class="chip vct" data-l="${l[0]}">${l[2]} ${esc(l[1])}</button>`).join('')}</div>
  <h2>Einzelne Stimme wählen</h2><p class="hint">Dein Handy bringt je Sprache mehrere Stimmen mit (auch Online-Stimmen, wenn du Internet hast). Hier kannst du sie anhören und eine festlegen.</p>
  <div class="chips">${langs.map(l=>`<button class="chip vcs${l[0]===sel?' on':''}" data-l="${l[0]}">${l[2]}</button>`).join('')}</div>
  ${vs.length?vs.map((v,k)=>{const g=vcGender(v);return `<div class="row"><span>${g==='f'?'👩':g==='m'?'👨':'🔈'} Stimme ${k+1}${g?(g==='f'?' · weiblich':' · männlich'):''}<small>${esc(v.name)} · ${esc(v.lang)}${v.net?' · online':''}</small></span><em><button class="chip vcp" data-u="${esc(v.uri)}">▶</button><button class="chip vcu${o.v[pre]===v.uri?' on':''}" data-u="${esc(v.uri)}">${o.v[pre]===v.uri?'✓ gewählt':'Nehmen'}</button></em></div>`}).join(''):`<p class="hint">Für diese Sprache wurden keine einzelnen Stimmen gefunden. Auf Android: Einstellungen → System → Sprache → Text-to-Speech → Stimmen/Sprachdaten installieren. „Frau/Mann“ ändert dann trotzdem die Tonhöhe.</p>`}
  ${o.v[pre]?`<button class="lnk" id="vcr">Auswahl für diese Sprache zurücksetzen</button>`:''}
  <p class="hint">Frau/Mann nimmt automatisch passende Stimmen, wenn das Handy sie als weiblich/männlich kennzeichnet. Sonst wird die Tonhöhe angepasst. Genauer klappt es mit „Einzelne Stimme wählen“.</p>`;
  document.querySelectorAll('.vcg').forEach(b=>b.onclick=()=>{o.g=b.dataset.v;vcSave(o);stimmePage();setTimeout(()=>vcTest(window.__vcSel||'de-DE'),150)});
  document.querySelectorAll('.hrr').forEach(b=>b.onclick=()=>{try{localStorage.setItem('sh5rate',b.dataset.v)}catch(e){}stimmePage()});
  document.querySelectorAll('.vct').forEach(b=>b.onclick=()=>vcTest(b.dataset.l));
  document.querySelectorAll('.vcs').forEach(b=>b.onclick=()=>{window.__vcSel=b.dataset.l;stimmePage()});
  document.querySelectorAll('.vcp').forEach(b=>b.onclick=()=>{const v=(window.__vcList||[]).find(x=>x.uri===b.dataset.u);if(!v)return;const keep=vcOpt();const tmp=JSON.parse(JSON.stringify(keep));tmp.v[pre]=v.uri;vcSave(tmp);vcTest(sel);vcSave(keep)});
  document.querySelectorAll('.vcu').forEach(b=>b.onclick=()=>{o.v[pre]=b.dataset.u;vcSave(o);stimmePage()});
  const r=$('#vcr');if(r)r.onclick=()=>{delete o.v[pre];vcSave(o);stimmePage()}}

try{vcLoad();if(window.speechSynthesis)speechSynthesis.onvoiceschanged=()=>vcLoad();setTimeout(vcLoad,1500)}catch(e){}
