'use strict';
/* ===== Hilfsfunktionen ===== */
const R=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const pick=a=>a[R(0,a.length-1)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=R(0,i);[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function fmt(n){n=Math.round(n*1e6)/1e6;let [i,d]=String(Math.abs(n)).split('.');i=i.replace(/\B(?=(\d{3})+(?!\d))/g,' ');return (n<0?'−':'')+i+(d?','+d:'')}
const eur=c=>(c/100).toFixed(2).replace('.',',')+' €';
const Q=(q,a,o={})=>Object.assign({q,a,kind:typeof a==='number'?'num':'text'},o);
const X=(q,a,hint,opts,steps)=>Q(q,a,{hint,opts,steps,kind:opts?'choice':typeof a==='number'?'num':'text'});
const PL=['Einer','Zehner','Hunderter','Tausender','Zehntausender','Hunderttausender','Millionen'];
const G={};

/* ===== Antwort prüfen ===== */
function checkAns(q,input){
  input=String(input==null?'':input).trim(); if(!input) return null;
  const acc=[].concat(q.a).map(String);
  if(q.kind==='choice') return acc.includes(input);
  if(q.kind==='num'){
    let s=input.replace(/\s+/g,'').replace(/[−–]/g,'-');
    s=s.replace(/(\d)[.](?=\d{3}(?!\d))/g,'$1');
    s=s.replace(',','.');
    const v=Number(s); if(!isFinite(v)||s==='') return false;
    return acc.some(x=>Math.abs(Number(x)-v)<1e-9);
  }
  let n=input.toLowerCase();
  if(q.pre) n=q.pre(n);
  n=n.replace(/[„“”"'’`´.!?]/g,'');
  n=q.ks?n.replace(/\s+/g,' ').trim():n.replace(/\s+/g,'');
  if(q.loose) n=n.replace(/-/g,'');
  if(q.rest) n=n.replace(/rest/g,'r');
  return acc.some(x=>{let y=String(x).toLowerCase().replace(/[„“”"'’`´.!?]/g,'');y=q.ks?y.replace(/\s+/g,' ').trim():y.replace(/\s+/g,'');if(q.loose)y=y.replace(/-/g,'');if(q.rest)y=y.replace(/rest/g,'r');return y===n});
}

/* ===== Schriftliche Rechenwege ===== */
function lay(a,b,op,res,carry){
  const w=Math.max(String(a).length,String(b).length,String(res).length)+2, p=s=>String(s).padStart(w,' ');
  return `<pre class="col">${p(a)}\n${op} ${String(b).padStart(w-2,' ')}\n${'─'.repeat(w)}\n${carry?carry.join('')+'  ← Übertrag\n':''}${p(res)}</pre>`;
}
function stepsAdd(a,b){
  const A=String(a),B=String(b),n=Math.max(A.length,B.length);
  const da=A.padStart(n,'0').split('').map(Number),db=B.padStart(n,'0').split('').map(Number);
  let c=0,tx=[];const w=String(a+b).length+2,car=Array(w).fill(' ');
  for(let i=n-1;i>=0;i--){const pos=n-1-i,s=da[i]+db[i]+c,d=s%10,nc=Math.floor(s/10);
    tx.push(`<b>${PL[pos]||'Stelle '+(pos+1)}:</b> ${da[i]} + ${db[i]}${c?' + '+c+' (Übertrag)':''} = ${s} → schreibe ${d}${nc?', merke '+nc:''}`);
    if(nc) car[w-1-(pos+1)]=nc; c=nc;}
  if(c) tx.push(`Ganz vorne: schreibe den Übertrag ${c}.`);
  return lay(a,b,'+',a+b,car)+'<ol><li>'+tx.join('</li><li>')+'</li></ol>Ergebnis: <b>'+fmt(a+b)+'</b>';
}
function stepsSub(a,b){
  if(b>a) return `Hier ist die zweite Zahl größer – das Ergebnis ist negativ: ${fmt(a-b)}. (In Klasse 5 rechnest du meist mit a ≥ b.)`;
  const A=String(a),n=A.length,da=A.split('').map(Number),db=String(b).padStart(n,'0').split('').map(Number);
  let br=0,tx=[],res=Array(n),w=n+2,car=Array(w).fill(' ');
  for(let i=n-1;i>=0;i--){const pos=n-1-i,bd=db[i]+br,ad=da[i];let d;
    if(bd>ad){d=ad+10-bd;tx.push(`<b>${PL[pos]}:</b> ${bd} + ? = ${ad+10} → ? = ${d} (schreibe ${d}, Übertrag 1)`);br=1;if(i>0)car[w-1-(pos+1)]=1;}
    else{d=ad-bd;tx.push(`<b>${PL[pos]}:</b> ${bd} + ? = ${ad} → ? = ${d}`);br=0;}
    res[i]=d;}
  return lay(a,b,'−',a-b,car)+'<p>Ergänzungsverfahren: Du fragst „Wie viel fehlt von unten bis oben?“</p><ol><li>'+tx.join('</li><li>')+'</li></ol>Ergebnis: <b>'+fmt(a-b)+'</b>';
}
function stepsMul(a,b){
  const B=String(b);
  if(B.length===1){
    const A=String(a).split('');const parts=A.map((d,i)=>[Number(d)*Math.pow(10,A.length-1-i),Number(d)]).filter(p=>p[0]>0);
    const lines=parts.map(p=>`${fmt(p[0])} · ${b} = ${fmt(p[0]*b)}`);
    return `<p>Zerlege ${fmt(a)} in Stellen und rechne einzeln:</p><ol><li>${lines.join('</li><li>')}</li></ol><p>Zusammen: ${parts.map(p=>fmt(p[0]*b)).join(' + ')} = <b>${fmt(a*b)}</b></p>`;
  }
  const Bd=B.split('');const parts=Bd.map((d,i)=>Number(d)*Math.pow(10,Bd.length-1-i)).filter(x=>x>0);
  return `<p>Zerlege die zweite Zahl (${fmt(b)}) und rechne Teil für Teil:</p><ol><li>${parts.map(p=>`${fmt(a)} · ${fmt(p)} = ${fmt(a*p)}`).join('</li><li>')}</li></ol><p>Addiere: ${parts.map(p=>fmt(a*p)).join(' + ')} = <b>${fmt(a*b)}</b></p>`;
}
function stepsDiv(a,b){
  if(b===0) return 'Durch 0 darf man nicht teilen!';
  const A=String(a).split('').map(Number);let rest=0,q='',tx=[],started=false;
  A.forEach((d,i)=>{const cur=rest*10+d,qd=Math.floor(cur/b),r=cur-qd*b;
    if(!started&&qd===0&&i<A.length-1){tx.push(`${cur} : ${b} geht noch nicht → weiter mit der nächsten Ziffer`);rest=cur;return;}
    started=true;tx.push(`${cur} : ${b} = ${qd} (denn ${qd} · ${b} = ${qd*b}), Rest ${cur}−${qd*b} = ${r}`);rest=r;q+=qd;});
  const qq=Math.floor(a/b),rr=a%b;
  return `<ol><li>${tx.join('</li><li>')}</li></ol><p>Ergebnis: <b>${fmt(qq)}${rr?' Rest '+rr:''}</b></p><p>Probe: ${fmt(qq)} · ${b}${rr?' + '+rr:''} = ${fmt(a)} ✔</p>`;
}
function tricksFor(a,op,b){
  const t=new Set();
  if(op==='*'){for(const [x,y] of [[a,b],[b,a]]){
    if([10,100,1000].includes(y)) t.add(`Mal ${y}: hänge ${String(y).length-1} Null(en) an → ${fmt(x*y)}`);
    if(y===5) t.add(`Mal 5 = mal 10 und dann halbieren: ${fmt(x*10)} : 2 = ${fmt(x*5)}`);
    if(y===9) t.add(`Mal 9 = mal 10 minus die Zahl: ${fmt(x*10)} − ${fmt(x)} = ${fmt(x*9)}`);
    if(y===4) t.add(`Mal 4 = zweimal verdoppeln: ${fmt(x*2)} → ${fmt(x*4)}`);
    if(y===25) t.add(`Mal 25: erst mal 100, dann durch 4: ${fmt(x*100)} : 4 = ${fmt(x*25)}`);
    if(y===11&&x>9&&x<100){const d1=Math.floor(x/10),d2=x%10;t.add(`Mal 11: Schreibe die Ziffern ${d1} und ${d2} auseinander und setze die Quersumme (${d1+d2}) in die Mitte${d1+d2>9?' (Übertrag beachten!)':''} → ${fmt(x*11)}`);}
  }}
  if(op==='+'||op==='-'){const s=op==='+'?'plus':'minus';
    if(b%10===9&&b<100) t.add(`${s} ${b} = ${s} ${b+1} und dann 1 ${op==='+'?'zurück':'wieder dazu'}`);
    if(b===99||b===999) t.add(`${s} ${b} = ${s} ${b+1} und dann 1 ${op==='+'?'zurück':'wieder dazu'}`);
    if(op==='+'&&a%10===9&&a<100) t.add(`Tausche die Zahlen: ${b} + ${a} ist einfacher.`);}
  if(op==='/'){ if(b===2) t.add('Durch 2 = halbieren.'); if(b===4) t.add('Durch 4 = zweimal halbieren.'); if(b===5) t.add(`Durch 5 = mal 2 und dann durch 10: ${fmt(a*2)} : 10 = ${fmt(a/5)}`); if([10,100].includes(b)) t.add(`Durch ${b}: streiche ${String(b).length-1} Null(en) bzw. verschiebe das Komma.`);}
  return [...t];
}
/* ===== Rechen-Helfer ===== */
function evalFlat(t){
  const toks=t.match(/\d+(?:\.\d+)?|[+\-*/]/g)||[];const out=[];
  const ap=(a,o,b)=>o==='+'?a+b:o==='-'?a-b:o==='*'?a*b:a/b;
  for(const grp of [['*','/'],['+','-']]){for(let i=1;i<toks.length;){if(grp.includes(toks[i])){const v=ap(+toks[i-1],toks[i],+toks[i+1]);toks.splice(i-1,3,String(Math.round(v*1e9)/1e9));out.push(toks.join(' '));}else i+=2;}}
  return {val:+toks[0],steps:out};
}
function evalSteps(expr){
  let s=expr,steps=[];
  while(/\(/.test(s)){
    const m=s.match(/\(([^()]+)\)/);if(!m)throw 0;
    const r=evalFlat(m[1]);const before=s.slice(0,m.index),after=s.slice(m.index+m[0].length);
    r.steps.forEach((st,i)=>{steps.push(before+(i===r.steps.length-1?st:'('+st+')')+after)});
    if(!r.steps.length) steps.push(before+m[1]+after);
    s=before+String(r.val)+after;
  }
  const r=evalFlat(s);r.steps.forEach(x=>steps.push(x));return {val:r.val,steps};
}
const pretty=s=>s.replace(/\*/g,' · ').replace(/\//g,' : ').replace(/-/g,' − ').replace(/\+/g,' + ').replace(/\s+/g,' ');
function solveExpr(raw){
  let s=raw.trim().toLowerCase().replace(/[×x·]/g,'*').replace(/[÷]/g,'/').replace(/:/g,'/').replace(/[−–]/g,'-').replace(/,/g,'.').replace(/ |\s+/g,'');
  if(!s) return '';
  let m=s.match(/^(\d+)\/(\d+)von(\d+(?:\.\d+)?)$/);
  if(m){const z=+m[1],n=+m[2],g=+m[3];return `<h3>${z}/${n} von ${fmt(g)}</h3><ol><li>Teile ${fmt(g)} durch den Nenner ${n}: ${fmt(g)} : ${n} = ${fmt(g/n)}</li><li>Multipliziere mit dem Zähler ${z}: ${fmt(g/n)} · ${z} = <b>${fmt(g/n*z)}</b></li></ol>`;}
  m=s.match(/^teiler(?:von)?(\d+)$/);
  if(m){const n=+m[1],d=[];for(let i=1;i<=n;i++)if(n%i===0)d.push(i);return `<h3>Teiler von ${n}</h3><p>${d.join(', ')}</p><p>Trick: Probiere nur bis √${n}. Immer wenn ${'a'} · ${'b'} = ${n}, sind beide Teiler.</p>`;}
  m=s.match(/^(\d+)runden?auf(10|100|1000)$/)||s.match(/^runde(\d+)auf(10|100|1000)$/);
  if(m){const n=+m[1],p=+m[2],r=Math.floor((n+p/2)/p)*p;return `<h3>${fmt(n)} runden auf ${p}</h3><p>Schau auf die Ziffer rechts neben der Rundungsstelle: ${Math.floor((n%p)/(p/10))}. Bei 0–4 abrunden, bei 5–9 aufrunden.</p><p>Ergebnis: <b>${fmt(r)}</b></p>`;}
  if(!/^[\d+\-*/().]+$/.test(s)) return '<p>🤔 Das verstehe ich noch nicht. Schreibe zum Beispiel <b>345 + 278</b>, <b>47 : 5</b>, <b>3 + 4 · 5</b>, <b>3/4 von 20</b> oder <b>teiler 36</b>.</p>';
  m=s.match(/^(\d+(?:\.\d+)?)([+\-*/])(\d+(?:\.\d+)?)$/);
  if(m){
    const a=+m[1],op=m[2],b=+m[3],ints=Number.isInteger(a)&&Number.isInteger(b);let h=`<h3>${fmt(a)} ${pretty(op).trim()} ${fmt(b)}</h3>`;
    if(op==='/'&&b===0) return h+'<p>Durch 0 darf man nicht teilen.</p>';
    const res=op==='+'?a+b:op==='-'?a-b:op==='*'?a*b:a/b;
    if(ints){h+=op==='+'?stepsAdd(a,b):op==='-'?stepsSub(a,b):op==='*'?stepsMul(a,b):stepsDiv(a,b);}
    else h+=`<p>Mit Kommazahlen: Beim Addieren und Subtrahieren schreibst du <b>Komma unter Komma</b>. Beim Multiplizieren rechnest du erst ohne Komma und setzt es am Ende so, dass das Ergebnis genau so viele Nachkommastellen hat wie beide Zahlen zusammen.</p><p>Ergebnis: <b>${fmt(res)}</b></p>`;
    const tr=ints?tricksFor(a,op,b):[];if(tr.length)h+='<div class="trick">💡 <b>Trick:</b><br>'+tr.join('<br>')+'</div>';
    return h;
  }
  try{const r=evalSteps(s);
    return `<h3>${pretty(s)}</h3><p>Regeln: <b>Klammern zuerst, dann Punkt vor Strich</b> (· und : vor + und −).</p><ol><li>${r.steps.map(pretty).join('</li><li>')}</li></ol><p>Ergebnis: <b>${fmt(r.val)}</b></p>`;
  }catch(e){return '<p>🤔 Bitte prüfe die Klammern und Rechenzeichen.</p>';}
}

/* ===== Grafiken ===== */
function barSvg(labels,vals){
  const W=320,H=190,L=34,B=34,T=10,max=Math.max(...vals),top=Math.ceil((max+1)/2)*2,bw=(W-L-10)/labels.length;
  let s=`<svg viewBox="0 0 ${W} ${H}" class="chart" role="img">`;
  for(let v=0;v<=top;v+=2){const y=H-B-(H-B-T)*v/top;s+=`<line x1="${L}" x2="${W-6}" y1="${y}" y2="${y}" stroke="#cbd5e1"/><text x="${L-6}" y="${y+4}" font-size="11" text-anchor="end" fill="currentColor">${v}</text>`;}
  vals.forEach((v,i)=>{const h=(H-B-T)*v/top,x=L+i*bw+bw*.18;s+=`<rect x="${x}" y="${H-B-h}" width="${bw*.64}" height="${h}" rx="4" fill="${['#f59e0b','#3b82f6','#10b981','#ef4444','#8b5cf6'][i%5]}"/><text x="${x+bw*.32}" y="${H-B+15}" font-size="11" text-anchor="middle" fill="currentColor">${labels[i]}</text>`;});
  return s+'</svg>';
}
function gridSvg(pts,n=8){
  const c=28,o=30,W=o+c*(n+1)+10;let s=`<svg viewBox="0 0 ${W} ${W}" class="chart" role="img">`;
  for(let i=0;i<=n;i++){s+=`<line x1="${o+i*c}" x2="${o+i*c}" y1="${o}" y2="${o+n*c}" stroke="#cbd5e1"/><line y1="${o+i*c}" y2="${o+i*c}" x1="${o}" x2="${o+n*c}" stroke="#cbd5e1"/><text x="${o+i*c}" y="${o+n*c+16}" font-size="11" text-anchor="middle" fill="currentColor">${i}</text><text x="${o-8}" y="${o+n*c-i*c+4}" font-size="11" text-anchor="end" fill="currentColor">${i}</text>`;}
  s+=`<text x="${o+n*c+6}" y="${o+n*c+4}" font-size="12" fill="currentColor">x</text><text x="${o-4}" y="${o-10}" font-size="12" fill="currentColor">y</text>`;
  pts.forEach(p=>{s+=`<circle cx="${o+p[0]*c}" cy="${o+n*c-p[1]*c}" r="6" fill="${p[3]||'#ef4444'}"/>${p[2]?`<text x="${o+p[0]*c+9}" y="${o+n*c-p[1]*c-8}" font-size="13" font-weight="700" fill="currentColor">${p[2]}</text>`:''}`});
  return s+'</svg>';
}
function nl(from,to,step,mark){
  const W=320,L=14,span=to-from;let s=`<svg viewBox="0 0 ${W} 54" class="chart"><line x1="${L}" x2="${W-L}" y1="22" y2="22" stroke="currentColor" stroke-width="2"/>`;
  for(let v=from;v<=to;v+=step){const x=L+(W-2*L)*(v-from)/span;s+=`<line x1="${x}" x2="${x}" y1="16" y2="28" stroke="currentColor"/><text x="${x}" y="44" font-size="11" text-anchor="middle" fill="currentColor">${fmt(v)}</text>`;}
  if(mark!=null){const x=L+(W-2*L)*(mark-from)/span;s+=`<circle cx="${x}" cy="22" r="6" fill="#ef4444"/>`;}
  return s+'</svg>';
}
function toRoman(n){const m=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];let r='';for(const [v,s] of m)while(n>=v){r+=s;n-=v}return r}

/* ===== Mathe-Generatoren ===== */
G.cmp=()=>{let a=R(100,99999),b=R(0,3)?R(100,99999):a;if(R(0,2)===0)b=Math.max(1,a+R(-9,9)*pick([1,10,100]));
  const c=a<b?'<':a>b?'>':'=';return Q(`Setze das richtige Zeichen:<div class="big">${fmt(a)} ⬜ ${fmt(b)}</div>`,c,{kind:'choice',opts:['<','>','='],steps:`Mehr Stellen = größer. Bei gleich vielen Stellen vergleichst du von links Stelle für Stelle. Also: ${fmt(a)} ${c} ${fmt(b)}.`})};
G.stellenwert=()=>{
  if(R(0,1)){const n=R(10000,999999),L=String(n).length,i=R(0,L-1),names=['Einer','Zehner','Hunderter','Tausender','Zehntausender','Hunderttausender'],d=String(n)[L-1-i];
    return Q(`Welche Ziffer steht bei <b>${fmt(n)}</b> an der <b>${names[i]}</b>-Stelle?`,Number(d),{steps:`Von rechts: Einer, Zehner, Hunderter, Tausender, Zehntausender, Hunderttausender … Die gesuchte Ziffer ist ${d}.`})}
  const t=R(1,9),h=R(0,9),z=R(0,9),e=R(0,9);
  return Q(`Schreibe als Zahl: <b>${t} T + ${h} H + ${z} Z + ${e} E</b>`,t*1000+h*100+z*10+e,{steps:`T = Tausender, H = Hunderter, Z = Zehner, E = Einer. ${t*1000} + ${h*100} + ${z*10} + ${e} = ${t*1000+h*100+z*10+e}`})};
G.runden=()=>{const n=R(1000,99999),[p,nm]=pick([[10,'Zehner'],[100,'Hunderter'],[1000,'Tausender']]),r=Math.floor((n+p/2)/p)*p,d=Math.floor((n%p)/(p/10));
  return Q(`Runde <b>${fmt(n)}</b> auf ${nm}.`,r,{steps:`Die Ziffer rechts neben der Rundungsstelle ist ${d}. ${d<5?'0 bis 4 → abrunden':'5 bis 9 → aufrunden'}. Ergebnis: ${fmt(r)}`})};
G.roman=()=>{if(R(0,1)){const n=R(1,399);return Q(`Schreibe <b>${n}</b> mit römischen Zahlen.`,toRoman(n),{hint:'Großbuchstaben I V X L C – Groß/klein ist egal.',steps:`${n} = ${toRoman(n)}. Merke: I=1, V=5, X=10, L=50, C=100.`})}
  const n=R(1,399);return Q(`Welche Zahl ist <b>${toRoman(n)}</b>?`,n,{steps:`${toRoman(n)} = ${n}`})};
G.ueberschlag=()=>{const a=R(120,990),b=R(120,990),add=R(0,1)||a<b,A=Math.round(a/100)*100,B=Math.round(b/100)*100;
  return Q(`Überschlage <b>${a} ${add?'+':'−'} ${b}</b>: Runde beide Zahlen auf Hunderter und rechne.`,add?A+B:A-B,{steps:`${a} ≈ ${A}, ${b} ≈ ${B}. Dann ${A} ${add?'+':'−'} ${B} = ${add?A+B:A-B}. (Genau: ${fmt(add?a+b:a-b)})`})};
G.hilfsaufgabe=()=>{const a=R(23,87),k=pick([1,2,3]),b=pick([100,100,50,20])-k,add=R(0,1);const base=b+k;
  const A=add?a:a+base;
  return Q(`Rechne im Kopf mit einer Hilfsaufgabe: <b>${A} ${add?'+':'−'} ${b}</b>`,add?A+b:A-b,{steps:`${b} = ${base} − ${k}. Rechne ${A} ${add?'+':'−'} ${base} = ${add?A+base:A-base}, dann ${add?'zurück: −':'wieder dazu: +'} ${k} = ${add?A+b:A-b}.`})};
G.vorteil=()=>{const a=R(11,89),c=100-a,b=R(11,89),pos=R(0,2),arr=[a,b,c];if(pos===0)[arr[0],arr[1]]=[arr[1],arr[0]];if(pos===2)[arr[2],arr[1]]=[arr[1],arr[2]];
  return Q(`Rechne vorteilhaft: <b>${arr.join(' + ')}</b>`,a+b+c,{hint:'Suche zwei Zahlen, die zusammen 100 ergeben.',steps:`${a} + ${c} = 100 (Vertauschungs- und Verbindungsgesetz), dann 100 + ${b} = ${a+b+c}.`})};
G.add=()=>{const a=R(120,9999),b=R(120,9999);return Q(`Rechne schriftlich: <b>${fmt(a)} + ${fmt(b)}</b>`,a+b,{steps:stepsAdd(a,b)})};
G.sub=()=>{let a=R(300,9999),b=R(120,9999);if(b>a)[a,b]=[b,a];if(a===b)a++;return Q(`Rechne schriftlich: <b>${fmt(a)} − ${fmt(b)}</b>`,a-b,{steps:stepsSub(a,b)})};
G.umkehr=()=>{const a=R(300,999),b=R(100,a-1),add=R(0,1);
  return add?Q(`Aufgabe: ${b} + ${a-b} = ${a}. Wie lautet die <b>Umkehraufgabe</b> zur Probe? Rechne <b>${a} − ${b} = ?</b>`,a-b,{steps:`Plus und Minus sind Umkehrungen. ${a} − ${b} = ${a-b} ✔`}):Q(`Aufgabe: ${a} − ${b} = ${a-b}. Mache die Probe mit der Umkehraufgabe: <b>${a-b} + ${b} = ?</b>`,a,{steps:`${a-b} + ${b} = ${a} – das ist wieder die Startzahl, also stimmt es ✔`})};
G.kopfmult=()=>{const a=R(12,49),b=R(3,9);const t=Math.floor(a/10)*10,o=a%10;
  return Q(`Rechne im Kopf: <b>${a} · ${b}</b>`,a*b,{steps:`Zerlege ${a} = ${t} + ${o}: ${t} · ${b} = ${t*b} und ${o} · ${b} = ${o*b}. Zusammen: ${t*b} + ${o*b} = ${a*b}.`,hint:'Zerlege in Zehner und Einer.'})};
G.vorrang=()=>{const a=R(2,12),b=R(2,9),c=R(2,9),f=R(1,5);
  if(f===1)return Q(`Rechne: <b>${a} + ${b} · ${c}</b>`,a+b*c,{steps:`Punkt vor Strich: ${b} · ${c} = ${b*c}. Dann ${a} + ${b*c} = ${a+b*c}.`});
  if(f===2){if(a*b<=c)return G.vorrang();return Q(`Rechne: <b>${a} · ${b} − ${c}</b>`,a*b-c,{steps:`Punkt vor Strich: ${a} · ${b} = ${a*b}. Dann ${a*b} − ${c} = ${a*b-c}.`})}
  if(f===3)return Q(`Rechne: <b>(${a} + ${b}) · ${c}</b>`,(a+b)*c,{steps:`Klammer zuerst: ${a} + ${b} = ${a+b}. Dann ${a+b} · ${c} = ${(a+b)*c}.`});
  if(f===4){const A=b*c+R(1,20);return Q(`Rechne: <b>${A} − ${b} · ${c}</b>`,A-b*c,{steps:`Punkt vor Strich: ${b} · ${c} = ${b*c}. Dann ${A} − ${b*c} = ${A-b*c}.`})}
  return Q(`Rechne: <b>${a*b} : ${b} + ${c}</b>`,a+c,{steps:`Punkt vor Strich: ${a*b} : ${b} = ${a}. Dann ${a} + ${c} = ${a+c}.`})};
G.verteil=()=>{const a=R(3,9),b=R(13,98);if(b%10===0)return G.verteil();const o=b%10,t=b-o;
  return o>=7?Q(`Rechne mit dem Verteilungsgesetz: <b>${a} · ${b}</b>`,a*b,{hint:`Tipp: ${b} = ${t+10} − ${10-o}`,steps:`${a} · ${b} = ${a} · (${t+10} − ${10-o}) = ${a*(t+10)} − ${a*(10-o)} = ${a*b}`}):Q(`Rechne mit dem Verteilungsgesetz: <b>${a} · ${b}</b>`,a*b,{hint:`Tipp: ${b} = ${t} + ${o}`,steps:`${a} · ${b} = ${a} · (${t} + ${o}) = ${a*t} + ${a*o} = ${a*b}`})};
G.mult=()=>{const big=R(0,2)===0,a=big?R(120,999):R(12,99)*R(1,9),b=big?R(11,89):R(2,9);return Q(`Rechne schriftlich: <b>${fmt(a)} · ${b}</b>`,a*b,{steps:stepsMul(a,b)})};
G.div=()=>{const b=R(2,9),q=R(12,300);return Q(`Rechne schriftlich: <b>${fmt(b*q)} : ${b}</b>`,q,{steps:stepsDiv(b*q,b)})};
G.divrest=()=>{const b=R(3,9),q=R(5,60),r=R(1,b-1),a=b*q+r;return Q(`Teile mit Rest: <b>${a} : ${b}</b><br><small>Schreibe so: ${q} R ${r}</small>`,`${q}r${r}`,{rest:true,steps:stepsDiv(a,b)})};
G.probe=()=>{const a=R(12,49),b=R(11,29),ok=R(0,1);let r=a*b;if(!ok)r+=pick([-20,-10,-2,-1,1,2,10,20]);
  return Q(`Stimmt die Rechnung? <div class="big">${a} · ${b} = ${r}</div>`,r===a*b?'Ja':'Nein',{kind:'choice',opts:['Ja','Nein'],steps:`Überschlag: ${Math.round(a/10)*10} · ${Math.round(b/10)*10} = ${Math.round(a/10)*10*Math.round(b/10)*10}. Einerprobe: ${a%10} · ${b%10} = ${(a%10)*(b%10)} → endet auf ${((a%10)*(b%10))%10}. Richtig ist ${a*b}.`})};
G.geld=()=>{const t=R(0,3);
  if(t===0){const c=R(105,995);return Q(`<b>${eur(c)}</b> = ? Cent`,c,{steps:`1 € = 100 ct. ${eur(c)} → ${c} ct.`})}
  if(t===1){const c=R(105,995);return Q(`<b>${c} ct</b> = ? €`,c/100,{hint:'Schreibe z. B. 7,25',steps:`100 ct = 1 €. ${c} : 100 = ${(c/100).toFixed(2).replace('.',',')}`})}
  const a=R(120,950),b=R(60,480);
  return t===2?Q(`Rechne: <b>${eur(a)} + ${eur(b)}</b> (in €)`,(a+b)/100,{steps:`Komma unter Komma! ${a} ct + ${b} ct = ${a+b} ct = ${eur(a+b)}`}):Q(`Du hast ${eur(a+b)} und kaufst etwas für ${eur(b)}. Wie viel Rückgeld? (in €)`,a/100,{steps:`${eur(a+b)} − ${eur(b)} = ${eur(a)}`})};
function umr(units,vals){return()=>{const [f,t,fac]=pick(units),big=R(0,1);
  if(big){const v=R(1,50);return Q(`<b>${v} ${f}</b> = ? ${t}`,v*fac,{steps:`1 ${f} = ${fac} ${t}. Also ${v} · ${fac} = ${v*fac}.`})}
  const v=R(1,99)/10;const x=Math.round(v*fac*1e6)/1e6;return Q(`<b>${fmt(x)} ${t}</b> = ? ${f}`,v,{hint:'Du darfst ein Komma verwenden.',steps:`${fac} ${t} = 1 ${f}. Also ${fmt(x)} : ${fac} = ${fmt(v)}.`})}}
G.laenge=umr([['cm','mm',10],['dm','cm',10],['m','dm',10],['m','cm',100],['km','m',1000],['m','mm',1000]]);
G.gewicht=umr([['kg','g',1000],['t','kg',1000]]);
G.zeit=()=>{const t=R(0,3);
  if(t===0){const h=R(1,9);return Q(`<b>${h} h</b> = ? min`,h*60,{steps:`1 h = 60 min. ${h} · 60 = ${h*60}`})}
  if(t===1){const h=R(1,9);return Q(`<b>${h*60} min</b> = ? h`,h,{steps:`60 min = 1 h. ${h*60} : 60 = ${h}`})}
  if(t===2){const h=R(1,5),m=R(1,11)*5;return Q(`<b>${h} h ${m} min</b> = ? min`,h*60+m,{steps:`${h} · 60 = ${h*60}; dazu ${m} → ${h*60+m}`})}
  const m=R(1,9);return Q(`<b>${m} min</b> = ? s`,m*60,{steps:`1 min = 60 s. ${m} · 60 = ${m*60}`})};
G.massstab=()=>{const N=pick([10,50,100,200,500,1000]),d=R(2,12),real=d*N;const m=real>=100;
  return Q(`Maßstab <b>1 : ${N}</b>. Auf der Zeichnung sind es <b>${d} cm</b>. Wie lang ist es in Wirklichkeit (in ${m?'m':'cm'})?`,m?real/100:real,{steps:`In Wirklichkeit ist alles ${N}-mal so groß: ${d} · ${N} = ${real} cm${m?' = '+fmt(real/100)+' m':''}.`})};
G.rechteck=()=>{const a=R(3,15),b=R(2,12),sq=R(0,3)===0;
  if(sq)return R(0,1)?Q(`Quadrat mit Seite a = ${a} cm. Wie groß ist der <b>Flächeninhalt</b>? (in cm²)`,a*a,{steps:`A = a · a = ${a} · ${a} = ${a*a} cm²`}):Q(`Quadrat mit Seite a = ${a} cm. Wie groß ist der <b>Umfang</b>? (in cm)`,4*a,{steps:`U = 4 · a = 4 · ${a} = ${4*a} cm`});
  return R(0,1)?Q(`Rechteck: a = ${a} cm, b = ${b} cm. <b>Flächeninhalt</b>? (in cm²)`,a*b,{steps:`A = a · b = ${a} · ${b} = ${a*b} cm²`}):Q(`Rechteck: a = ${a} cm, b = ${b} cm. <b>Umfang</b>? (in cm)`,2*(a+b),{steps:`U = 2 · (a + b) = 2 · (${a} + ${b}) = 2 · ${a+b} = ${2*(a+b)} cm`})};
G.flaecheneinheit=()=>{const [f,t,fac]=pick([['cm²','mm²',100],['dm²','cm²',100],['m²','dm²',100],['a','m²',100],['ha','a',100],['ha','m²',10000],['km²','ha',100]]);const v=R(1,30);
  return Q(`<b>${v} ${f}</b> = ? ${t}`,v*fac,{hint:'a = 100 m², ha = 100 a = 10 000 m²',steps:`Bei Flächen springt man mit 100 (a→m², ha→a). ${v} · ${fac} = ${fmt(v*fac)}.`})};
G.parallelogramm=()=>{const g=R(2,12)*2,h=R(2,9);return R(0,1)?Q(`Parallelogramm mit Grundseite g = ${g} cm und Höhe h = ${h} cm. <b>Flächeninhalt</b> in cm²?`,g*h,{steps:`A = g · h = ${g} · ${h} = ${g*h} cm²`}):Q(`Dreieck mit Grundseite g = ${g} cm und Höhe h = ${h} cm. <b>Flächeninhalt</b> in cm²?`,g*h/2,{steps:`Das Dreieck ist ein halbes Parallelogramm: A = g · h : 2 = ${g} · ${h} : 2 = ${g*h/2} cm²`})};
G.bruchteil=()=>{const n=pick([4,5,6,8,10,12]),k=R(1,n-1);return Q(`Eine Pizza ist in <b>${n}</b> gleich große Stücke geschnitten. <b>${k}</b> Stück${k>1?'e':''} wurden gegessen. Welcher Bruchteil wurde gegessen? <small>(schreibe z. B. 3/8)</small>`,`${k}/${n}`,{steps:`Zähler = gegessene Stücke (${k}), Nenner = alle Stücke (${n}). Bruch: ${k}/${n}`})};
G.bruchadd=()=>{const n=pick([4,5,6,8,10,12]),a=R(1,n-2),b=R(1,n-1-a),add=R(0,1);
  return add?Q(`Rechne: <b>${a}/${n} + ${b}/${n}</b> <small>(Ergebnis als Bruch, z. B. 5/8)</small>`,`${a+b}/${n}`,{steps:`Gleiche Nenner: Zähler addieren, Nenner bleibt. ${a} + ${b} = ${a+b} → ${a+b}/${n}`}):Q(`Rechne: <b>${a+b}/${n} − ${a}/${n}</b> <small>(Ergebnis als Bruch)</small>`,`${b}/${n}`,{steps:`Zähler subtrahieren: ${a+b} − ${a} = ${b} → ${b}/${n}`})};
G.anteil=()=>{const k=pick([2,3,4,5,10]),z=R(1,k-1),u=R(2,12)*k,unit=pick(['€','cm','kg','Schüler']);
  return Q(`Berechne: <b>${z}/${k} von ${u} ${unit}</b>`,u/k*z,{steps:`Erst teilen: ${u} : ${k} = ${u/k}. Dann mal ${z}: ${u/k} · ${z} = ${u/k*z}.`})};
G.gemischt=()=>{if(R(0,1)){const d=pick([3,4,5,6,8]),g=R(1,4),r=R(1,d-1),n=g*d+r;return Q(`Schreibe <b>${n}/${d}</b> als gemischte Zahl. <small>(z. B. 1 3/4)</small>`,`${g} ${r}/${d}`,{ks:true,steps:`${n} : ${d} = ${g} Rest ${r} → ${g} ${r}/${d}`})}
  const d=pick([3,4,5,6,8]),g=R(1,4),r=R(1,d-1);return Q(`Schreibe <b>${g} ${r}/${d}</b> als Bruch. <small>(z. B. 7/4)</small>`,`${g*d+r}/${d}`,{steps:`${g} · ${d} + ${r} = ${g*d+r} → ${g*d+r}/${d}`})};
G.diagramm=()=>{const all=['Hund','Katze','Pferd','Hase','Fisch'],labels=all.slice(0,4),vals=labels.map(()=>R(2,12)),t=R(0,2);let max=Math.max(...vals);
  const svg=`<div class="svgbox">${barSvg(labels,vals)}</div>`,i=R(0,3);
  if(t===0)return Q(svg+`Wie viele Kinder mögen <b>${labels[i]}</b>?`,vals[i],{steps:`Lies die Höhe des Balkens ab: ${vals[i]}.`});
  if(t===1)return Q(svg+`Wie viele Kinder wurden <b>insgesamt</b> gefragt?`,vals.reduce((a,b)=>a+b),{steps:`Addiere alle Balken: ${vals.join(' + ')} = ${vals.reduce((a,b)=>a+b)}`});
  const best=labels[vals.indexOf(max)];if(vals.filter(v=>v===max).length>1)return G.diagramm();
  return Q(svg+'Welches Tier ist am beliebtesten?',best,{kind:'choice',opts:labels,steps:`Der höchste Balken (${max}) gehört zu ${best}.`})};
G.datenliste=()=>{const n=R(5,8),v=Array.from({length:n},()=>R(3,40)),mx=Math.max(...v),mn=Math.min(...v),t=R(0,2);
  const l=`Messwerte: <b>${v.join(', ')}</b><br>`;
  return t===0?Q(l+'Wie groß ist der <b>größte</b> Wert?',mx,{steps:`Der größte Wert ist ${mx}.`}):t===1?Q(l+'Wie groß ist der <b>kleinste</b> Wert?',mn,{steps:`Der kleinste Wert ist ${mn}.`}):Q(l+'Wie groß ist der Unterschied zwischen größtem und kleinstem Wert (<b>Spannweite</b>)?',mx-mn,{steps:`${mx} − ${mn} = ${mx-mn}`})};
G.koordinaten=()=>{const x=R(1,8),y=R(1,8);return Q(`<div class="svgbox">${gridSvg([[x,y,'P']])}</div>Welche Koordinaten hat der Punkt <b>P</b>? <small>(schreibe z. B. 3|5)</small>`,`${x}|${y}`,{pre:s=>s.replace(/[()\s]/g,'').replace(/[,;/]/g,'|'),steps:`Erst nach rechts (x = ${x}), dann nach oben (y = ${y}): P(${x}|${y}). Merke: „Erst laufen, dann hochspringen!“`})};
G.verschieb=()=>{const x=R(0,5),y=R(0,5),r=R(1,3),u=R(1,3),dir=R(0,1);
  return Q(`Der Punkt A(${x}|${y}) wird um <b>${r}</b> nach rechts und um <b>${u}</b> nach ${dir?'oben':'oben'} verschoben. Wie lauten die neuen Koordinaten? <small>(z. B. 4|5)</small>`,`${x+r}|${y+u}`,{pre:s=>s.replace(/[()\s]/g,'').replace(/[,;/]/g,'|'),steps:`x: ${x} + ${r} = ${x+r}; y: ${y} + ${u} = ${y+u} → A'(${x+r}|${y+u})`})};
/* Tricks */
G.trick11=()=>{const a=R(12,98),d1=Math.floor(a/10),d2=a%10,s=d1+d2;return Q(`11-Trick: <b>${a} · 11</b>`,a*11,{hint:'Quersumme in die Mitte!',steps:`${d1} _ ${d2} → in die Mitte kommt ${d1}+${d2} = ${s}${s>9?' (Übertrag: die 1 geht zur ersten Ziffer)':''} → ${a*11}`})};
G.trick5=()=>{const a=R(12,98);return Q(`5-Trick: <b>${a} · 5</b>`,a*5,{hint:'Mal 10 und halbieren',steps:`${a} · 10 = ${a*10}, halbiert: ${a*5}`})};
G.trick9=()=>{const a=R(12,98);return Q(`9-Trick: <b>${a} · 9</b>`,a*9,{hint:'Mal 10 minus die Zahl',steps:`${a} · 10 = ${a*10}, minus ${a} = ${a*9}`})};
G.trick25=()=>{const a=R(2,24)*4;return Q(`25-Trick: <b>${a} · 25</b>`,a*25,{hint:'Durch 4 und mal 100',steps:`${a} : 4 = ${a/4}, mal 100 = ${a*25}`})};
G.trick4=()=>{const a=R(12,99);return Q(`4-Trick: <b>${a} · 4</b>`,a*4,{hint:'Zweimal verdoppeln',steps:`${a}·2 = ${a*2}, ·2 = ${a*4}`})};
G.plus99=()=>{const a=R(120,900),add=R(0,1),k=pick([9,99,19,29]);return Q(`Rechne im Kopf: <b>${a} ${add?'+':'−'} ${k}</b>`,add?a+k:a-k,{steps:`${add?'+':'−'} ${k+1} und dann ${add?'1 zurück':'1 wieder dazu'}: ${add?a+k+1:a-k-1} ${add?'−':'+'} 1 = ${add?a+k:a-k}`})};
G.teilbar=()=>{const t=pick([2,3,5,9,10]),n=R(100,9999),d=n.toString().split('').map(Number),qs=d.reduce((a,b)=>a+b),ok=n%t===0;
  const rule={2:'Die letzte Ziffer ist gerade (0,2,4,6,8).',3:`Die Quersumme (${qs}) ist durch 3 teilbar.`,5:'Die letzte Ziffer ist 0 oder 5.',9:`Die Quersumme (${qs}) ist durch 9 teilbar.`,10:'Die letzte Ziffer ist 0.'}[t];
  return Q(`Ist <b>${fmt(n)}</b> durch <b>${t}</b> teilbar?`,ok?'Ja':'Nein',{kind:'choice',opts:['Ja','Nein'],steps:`Regel für ${t}: ${rule} → ${ok?'Ja':'Nein'}.`})};
G.quadrat5=()=>{const a=R(1,9),n=a*10+5;return Q(`Quadrat-Trick: <b>${n} · ${n}</b>`,n*n,{hint:`${a} · ${a+1} und dann 25 anhängen`,steps:`${a} · ${a+1} = ${a*(a+1)}, dann 25 anhängen → ${n*n}`})};
G.geteilt5=()=>{const a=R(3,60)*5;return Q(`Durch-5-Trick: <b>${a} : 5</b>`,a/5,{hint:'Mal 2, dann durch 10',steps:`${a}·2 = ${a*2}, durch 10 = ${a/5}`})};
