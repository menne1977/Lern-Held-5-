/* ===== Taschenrechner (wissenschaftlich) + Rechenweg (Funktionsdeklarationen) ===== */
function tcState(){if(!window.__tc){let s={};try{s=JSON.parse(localStorage.getItem('sh5tc')||'{}')}catch(e){}window.__tc=Object.assign({ex:'',deg:true,mem:0,ans:0,hist:[],sci:true},s)}return window.__tc}
function tcSave(){const s=tcState();try{localStorage.setItem('sh5tc',JSON.stringify({deg:s.deg,mem:s.mem,ans:s.ans,hist:s.hist.slice(0,30),sci:s.sci}))}catch(e){}}
function tcFact(n){if(n<0||n%1)throw new Error('Fakultät nur für natürliche Zahlen');if(n>170)return Infinity;let r=1;for(let i=2;i<=n;i++)r*=i;return r}
/* Sicherer Rechner ohne eval: Zahlen, + − × ÷ ^, %, !, Klammern, Funktionen, π, e, Ans */
function tcEval(src,deg){
  const s=String(src).replace(/\s+/g,'').replace(/·|\*/g,'×').replace(/:|\//g,'÷').replace(/-/g,'−').replace(/,/g,'.');let i=0;
  const F={sin:x=>Math.sin(deg?x*Math.PI/180:x),cos:x=>Math.cos(deg?x*Math.PI/180:x),tan:x=>{const v=Math.tan(deg?x*Math.PI/180:x);if(deg&&Math.abs((x%180+180)%180-90)<1e-9)throw new Error('tan ist hier nicht definiert');return v},
    asin:x=>{const v=Math.asin(x);return deg?v*180/Math.PI:v},acos:x=>{const v=Math.acos(x);return deg?v*180/Math.PI:v},atan:x=>{const v=Math.atan(x);return deg?v*180/Math.PI:v},
    '√':x=>{if(x<0)throw new Error('Keine Wurzel aus negativen Zahlen');return Math.sqrt(x)},'∛':Math.cbrt,ln:x=>{if(x<=0)throw new Error('ln nur für Zahlen > 0');return Math.log(x)},log:x=>{if(x<=0)throw new Error('log nur für Zahlen > 0');return Math.log10(x)},abs:Math.abs};
  const peek=()=>s[i],eat=c=>{if(s.startsWith(c,i)){i+=c.length;return true}return false};
  function primary(){
    if(eat('(')){const v=expr();if(!eat(')'))throw new Error('Klammer fehlt');return v.v}
    for(const f of Object.keys(F).sort((a,b)=>b.length-a.length))if(s.startsWith(f,i)){i+=f.length;let v;if(eat('(')){v=expr().v;if(!eat(')'))throw new Error('Klammer fehlt')}else v=unary().v;return F[f](v)}
    if(eat('π'))return Math.PI;if(eat('Ans'))return tcState().ans;if(s[i]==='e'&&!/[a-z]/.test(s[i+1]||'')){i++;return Math.E}
    const m=s.slice(i).match(/^\d*\.?\d+(E[+−]?\d+)?|^\d+\./);if(m){i+=m[0].length;return parseFloat(m[0].replace('−','-'))}
    throw new Error(i>=s.length?'Rechnung unvollständig':'Unbekanntes Zeichen: '+s[i])}
  function postfix(){let v=primary(),pct=false;for(;;){if(eat('!'))v=tcFact(v);else if(eat('²'))v=v*v;else if(eat('%')){v=v/100;pct=true}else break}
    return{v,pct}}
  function power(){const a=postfix();if(eat('^')){const b=unary();return{v:Math.pow(a.v,b.v),pct:false}}return a}
  function unary(){if(eat('−')){const x=unary();return{v:-x.v,pct:x.pct}}if(eat('+'))return unary();return power()}
  function implicit(){let a=unary();while(i<s.length&&/[\d(π√∛a-zA]/.test(s[i])){const b=unary();a={v:a.v*b.v,pct:false}}return a}
  function term(){let a=implicit();for(;;){if(eat('×')){const b=implicit();a={v:a.v*b.v,pct:false}}else if(eat('÷')){const b=implicit();if(b.v===0)throw new Error('Teilen durch 0 geht nicht');a={v:a.v/b.v,pct:false}}else return a}}
  function expr(){let a=term();for(;;){if(eat('+')){const b=term();a={v:b.pct?a.v*(1+b.v):a.v+b.v,pct:false}}else if(eat('−')){const b=term();a={v:b.pct?a.v*(1-b.v):a.v-b.v,pct:false}}else return a}}
  const r=expr();if(i<s.length)throw new Error(s[i]===')'?'Klammer zu viel':'Unbekanntes Zeichen: '+s[i]);const v=typeof r==='object'?r.v:r;if(!isFinite(v))throw new Error(isNaN(v)?'Nicht definiert':'Zahl zu groß');return v}
function tcFmt(v){if(Math.abs(v)<1e-12)v=0;const a=Math.abs(v);if(a!==0&&(a>=1e15||a<1e-9))return v.toExponential(8).replace(/\.?0+e/,'e').replace('.',',').replace('e+',' · 10^').replace('e-',' · 10^−');
  return (+v.toPrecision(12)).toLocaleString('de-DE',{maximumFractionDigits:10})}
function tcFrac(v){if(!isFinite(v)||Math.abs(v)>1e9)return null;const sg=v<0?-1:1;v=Math.abs(v);let h1=1,h0=0,k1=0,k0=1,b=v;for(let n=0;n<30;n++){const a=Math.floor(b);[h1,h0]=[a*h1+h0,h1];[k1,k0]=[a*k1+k0,k1];if(Math.abs(v-h1/k1)<1e-10||k1>100000)break;b=1/(b-a)}
  if(k1===1||k1>100000)return null;const w=Math.floor(h1/k1),z=h1%k1;return (sg<0?'−':'')+h1+'/'+k1+(w>0?`  (gemischt: ${sg<0?'−':''}${w} ${z}/${k1})`:'')}
function calc(){
  setNav('calc');const S=tcState();
  const K=(l,v,c)=>`<button class="tk${c?' '+c:''}" data-v="${esc(v===undefined?l:v)}">${l}</button>`;
  const sci=[K('sin','sin('),K('cos','cos('),K('tan','tan('),K('π'),K('e'),K('sin⁻¹','asin('),K('cos⁻¹','acos('),K('tan⁻¹','atan('),K('ln','ln('),K('log','log('),K('x²','²'),K('xʸ','^'),K('√','√('),K('∛','∛('),K('n!','!'),K('(','('),K(')',')'),K('%'),K('1/x','#inv'),K('Ans'),K(S.deg?'DEG':'RAD','#deg','tkf'),K('MC','#mc','tkm'),K('MR','#mr','tkm'),K('M+','#m+','tkm'),K('M−','#m-','tkm')].join('');
  const base=[K('C','#c','tkc'),K('⌫','#del','tkf'),K('±','#neg','tkf'),K('÷','÷','tko'),K('7'),K('8'),K('9'),K('×','×','tko'),K('4'),K('5'),K('6'),K('−','−','tko'),K('1'),K('2'),K('3'),K('+','+','tko'),K('0','0','tk0'),K(',',','),K('=','#eq','tke')].join('');
  app().innerHTML=`<h1>🧮 Rechner</h1><div class="chips"><button class="chip on">🧮 Taschenrechner</button><a class="chip" href="#/calc/weg">📝 Rechenweg zeigen</a></div>
  <div class="tcd"><div class="tcm">${S.deg?'DEG':'RAD'}${S.mem?' · M = '+tcFmt(S.mem):''}</div><div id="tcx" class="tcx"></div><div id="tcr" class="tcr">0</div><div id="tcf" class="tcm"></div></div>
  <button class="lnk" id="tcs">${S.sci?'▲ Wissenschaftliche Tasten ausblenden':'▼ Wissenschaftliche Tasten (sin, √, π …)'}</button>
  ${S.sci?`<div class="tcg tcsci">${sci}</div>`:''}<div class="tcg">${base}</div>
  <div class="row2"><button id="tcfr">½ Als Bruch</button><button id="tcw">📝 Rechenweg</button></div>
  <h2>Verlauf</h2><div id="tch">${S.hist.length?S.hist.map((h,k)=>`<a class="row" href="#" data-k="${k}"><span>${esc(h[0])}<small>= ${esc(h[1])}</small></span><em>↩</em></a>`).join('')+'<button class="lnk" id="tchc">Verlauf löschen</button>':'<p class="hint">Noch keine Rechnungen.</p>'}</div>
  <p class="hint">Tipps: „5 + 10 %“ rechnet 5 plus 10 Prozent von 5. Winkel in DEG = Grad, RAD = Bogenmaß. Ans = letztes Ergebnis.</p>`;
  const show=()=>{$('#tcx').textContent=S.ex||' ';try{if(S.ex){const v=tcEval(S.ex,S.deg);$('#tcr').textContent=tcFmt(v);$('#tcr').classList.remove('err')}else $('#tcr').textContent='0'}catch(e){$('#tcr').textContent=S.ex?'…':'0'}};
  const eq=()=>{if(!S.ex)return;try{const v=tcEval(S.ex,S.deg),r=tcFmt(v);S.hist.unshift([S.ex,r]);S.hist=S.hist.slice(0,30);S.ans=v;S.last=v;$('#tcx').textContent=S.ex+' =';$('#tcr').textContent=r;S.ex='';S.done=true;tcSave();
      $('#tch').innerHTML=S.hist.map((h,k)=>`<a class="row" href="#" data-k="${k}"><span>${esc(h[0])}<small>= ${esc(h[1])}</small></span><em>↩</em></a>`).join('')+'<button class="lnk" id="tchc">Verlauf löschen</button>';bindH()}
    catch(e){$('#tcr').textContent=e.message;$('#tcr').classList.add('err')}};
  const press=v=>{$('#tcf').textContent='';
    if(v==='#eq')return eq();if(v==='#c'){S.ex='';S.done=false;return show()}if(v==='#del'){S.ex=S.ex.replace(/(sin|cos|tan|asin|acos|atan|ln|log|Ans)\($|Ans$|.$/u,'');return show()}
    if(v==='#deg'){S.deg=!S.deg;tcSave();return calc()}if(v==='#mc'){S.mem=0;tcSave();return calc()}
    if(v==='#mr'){S.ex+=String(+S.mem.toPrecision(12)).replace('.',',');return show()}
    if(v==='#m+'||v==='#m-'){try{const x=S.ex?tcEval(S.ex,S.deg):(S.last||0);S.mem+=v==='#m+'?x:-x;tcSave();calc()}catch(e){$('#tcr').textContent=e.message}return}
    if(v==='#neg'){S.ex=S.ex?'−('+S.ex+')':'−';return show()}
    if(v==='#inv'){S.ex=S.ex?'1÷('+S.ex+')':'1÷';return show()}
    if(S.done){S.done=false;if(/^[+−×÷^²!%]/.test(v))S.ex='Ans';else S.ex=''}
    S.ex+=v;show()};
  document.querySelectorAll('.tk').forEach(b=>b.onclick=()=>press(b.dataset.v));
  const bindH=()=>{document.querySelectorAll('#tch .row').forEach(a=>a.onclick=e=>{e.preventDefault();S.ex=S.hist[+a.dataset.k][0];S.done=false;show()});const c=$('#tchc');if(c)c.onclick=()=>{S.hist=[];tcSave();calc()}};bindH();
  $('#tcs').onclick=()=>{S.sci=!S.sci;tcSave();calc()};
  $('#tcfr').onclick=()=>{try{const v=S.ex?tcEval(S.ex,S.deg):S.last;const f=tcFrac(v);$('#tcf').textContent=f?'Als Bruch: '+f:'Kein einfacher Bruch'}catch(e){$('#tcf').textContent=e.message}};
  $('#tcw').onclick=()=>{const ex=S.ex||(S.hist[0]||[''])[0];window.__tcWeg=ex.replace(/×/g,'·').replace(/÷/g,':');go('#/calc/weg')};
  window.onkeydown=e=>{if(location.hash.indexOf('#/calc')!==0||location.hash==='#/calc/weg')return;const m={'*':'×','/':'÷','-':'−',Enter:'#eq','=':'#eq',Backspace:'#del',Escape:'#c','.':','};const v=m[e.key]||(/^[0-9+(),%^!]$/.test(e.key)?e.key:null);if(v){e.preventDefault();press(v)}};
  show()}
