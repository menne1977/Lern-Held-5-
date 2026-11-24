/* ===== Rechenweg: einfach / ausführlich (schriftlich, halbschriftlich, Brüche, Prozent, Potenz, Wurzel) ===== */
function wegMode(){try{return localStorage.getItem('sh5weg')==='einfach'?'einfach':'voll'}catch(e){return'voll'}}
function wegSet(m){try{localStorage.setItem('sh5weg',m)}catch(e){}}
function wgcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a||1}
function wgFr(z,n){return `<span class="fr"><i>${z}</i><i>${n}</i></span>`}
function wgFrT(z,n){return z+'/'+n}
function wgPre(lines){return '<pre class="col">'+lines.join('\n')+'</pre>'}
function wgKurz(a,op,b){
  if(op==='+'||op==='-'){const sg=op==='+'?1:-1;let cur=a,tx=[];const d=String(b).split('');
    d.forEach((c,i)=>{const p=Number(c)*Math.pow(10,d.length-1-i);if(p>0){const nx=cur+sg*p;tx.push(`${fmt(cur)} ${op==='+'?'+':'−'} ${fmt(p)} = ${fmt(nx)}`);cur=nx}});return tx}
  if(op==='*'){const d=String(b).split(''),parts=d.map((c,i)=>Number(c)*Math.pow(10,d.length-1-i)).filter(x=>x>0);
    const tx=parts.map(p=>`${fmt(a)} · ${fmt(p)} = ${fmt(a*p)}`);if(parts.length>1)tx.push(`${parts.map(p=>fmt(a*p)).join(' + ')} = ${fmt(a*b)}`);return tx}
  if(op==='/'){let rest=a,tx=[];[1000000,100000,10000,1000,100,10,1].forEach(p=>{const k=Math.floor(rest/(b*p));if(k>0){tx.push(`${fmt(k*p)} · ${b} = ${fmt(k*p*b)}  (Rest ${fmt(rest-k*p*b)})`);rest-=k*p*b}});
    return tx}
  return[]}
function wgMulCol(a,b){
  const B=String(b).split(''),prod=B.map((c,k)=>String(a*Number(c))),W=String(a*b).length+1;
  if(B.length<2)return '';
  const head=(String(a)+' · '+String(b)),L=[head,'─'.repeat(Math.max(head.length,W))];
  const wd=Math.max(head.length,W);
  prod.forEach((p,k)=>{const sh=B.length-1-k;L.push((p+' '.repeat(sh)).padStart(wd))});
  L.push('─'.repeat(wd));L.push(String(a*b).padStart(wd));
  return `<p>So steht es untereinander (jede Zeile eine Ziffer der zweiten Zahl, immer eine Stelle weiter links):</p>`+wgPre(L)}
function wgDivCol(a,b){
  const A=String(a).split('').map(Number);let rest=0,q='',started=false;const rows=[];
  A.forEach((d,i)=>{const cur=rest*10+d,qd=Math.floor(cur/b),r=cur-qd*b;
    if(!started&&qd===0&&i<A.length-1){rest=cur;return}
    started=true;q+=qd;
    rows.push({t:'−'+(qd*b),e:i});rows.push({t:'─'.repeat(String(qd*b).length+1),e:i});
    const nxt=i<A.length-1?String(r)+String(A[i+1]):String(r);rows.push({t:nxt,e:i<A.length-1?i+1:i});rest=r});
  const first=String(a)+' : '+b+' = '+(q||'0');
  /* Spalten sauber ausrichten: rechtsbündig bei Spalte e */
  const out=[' '+first];rows.forEach(r=>out.push(r.t.padStart(r.e+2)));
  return `<p>Schriftliche Division – dieses Schema schreibst du ins Heft (Rest = Zahl unter dem Strich):</p>`+wgPre(out)}
function wgProbe(a,op,b,res){
  const m={'+':`${fmt(res)} − ${fmt(b)} = ${fmt(a)}`,'-':`${fmt(res)} + ${fmt(b)} = ${fmt(a)}`,'*':`${fmt(res)} : ${fmt(b)} = ${fmt(a)}`,'/':`${fmt(Math.floor(res))} · ${fmt(b)}${a%b?' + '+(a%b):''} = ${fmt(a)}`};
  return `<p>🔎 <b>Probe</b> (Umkehraufgabe): ${m[op]} ✔</p>`}
function wgBruch(z1,n1,op,z2,n2,full){
  let h=`<h3>${wgFrT(z1,n1)} ${op==='*'?'·':op==='/'?':':op==='+'?'+':'−'} ${wgFrT(z2,n2)}</h3>`,Z,N,tx=[];
  if(!n1||!n2)return '<p>Der Nenner darf nicht 0 sein.</p>';
  if(op==='*'){Z=z1*z2;N=n1*n2;tx.push(`Zähler mal Zähler: ${z1} · ${z2} = ${Z}`,`Nenner mal Nenner: ${n1} · ${n2} = ${N}`)}
  else if(op==='/'){if(!z2)return '<p>Durch 0 darf man nicht teilen.</p>';Z=z1*n2;N=n1*z2;tx.push(`Durch einen Bruch teilen = mit dem <b>Kehrbruch</b> malnehmen: ${wgFrT(z1,n1)} · ${wgFrT(n2,z2)}`,`Zähler: ${z1} · ${n2} = ${Z}, Nenner: ${n1} · ${z2} = ${N}`)}
  else{const k=n1*n2/wgcd(n1,n2),a=z1*k/n1,b=z2*k/n2;tx.push(`<b>Hauptnenner</b> suchen (kleinstes gemeinsames Vielfaches von ${n1} und ${n2}): ${k}`,`Erweitern: ${wgFrT(z1,n1)} = ${wgFrT(a,k)} und ${wgFrT(z2,n2)} = ${wgFrT(b,k)}`,`Zähler ${op==='+'?'addieren':'subtrahieren'}: ${a} ${op==='+'?'+':'−'} ${b} = ${op==='+'?a+b:a-b}`);Z=op==='+'?a+b:a-b;N=k}
  const g=wgcd(Z,N);let res=wgFrT(Z,N);
  if(g>1){tx.push(`Kürzen mit ${g}: ${wgFrT(Z,N)} = ${wgFrT(Z/g,N/g)}`);res=wgFrT(Z/g,N/g);Z/=g;N/=g}
  const w=Math.floor(Math.abs(Z)/N),r=Math.abs(Z)%N;let gem=(w>0&&r>0&&N>1)?`  = ${Z<0?'−':''}${w} ${r}/${N} (gemischte Zahl)`:'';
  const kurz=`Ergebnis: <b>${N===1?Z:res}</b>${gem} ≈ ${fmt(Z/N)}`;
  return h+(full?'<ol><li>'+tx.join('</li><li>')+'</li></ol>':`<p>${tx[tx.length-1]}</p>`)+`<p>${kurz}</p>`}
function wgProz(p,g,full){
  const w=g*p/100;let h=`<h3>${fmt(p)} % von ${fmt(g)}</h3>`;
  if(full)h+=`<ol><li>Rechne zuerst <b>1 %</b>: ${fmt(g)} : 100 = ${fmt(g/100)}</li><li>Dann mal ${fmt(p)}: ${fmt(g/100)} · ${fmt(p)} = <b>${fmt(w)}</b></li></ol><div class="trick">💡 <b>Leichte Prozente:</b> 50 % = die Hälfte · 25 % = ein Viertel · 10 % = durch 10 · 20 % = durch 5 · 75 % = drei Viertel.</div><p>Als Bruch: ${p}/100 von ${fmt(g)} → ${fmt(g)} · ${p} : 100 = ${fmt(w)}</p>`;
  else h+=`<p>1 % sind ${fmt(g/100)}, also ${fmt(p)} % = ${fmt(g/100)} · ${fmt(p)}.</p>`;
  return h+`<p>Ergebnis: <b>${fmt(w)}</b></p>`}
function wgPot(b,e,full){
  if(e>12||b>1e6)return '<p>Das ist zu groß für den Rechenweg.</p>';
  const f=Array(e).fill(b).join(' · ');let h=`<h3>${b}<sup>${e}</sup></h3>`;
  if(e===0)return h+'<p>Jede Zahl hoch 0 ist 1.</p><p>Ergebnis: <b>1</b></p>';
  if(full){let cur=b,tx=[];for(let i=2;i<=e;i++){tx.push(`${fmt(cur)} · ${b} = ${fmt(cur*b)}`);cur*=b}
    h+=`<p>Hochzahl ${e} heißt: die Basis ${b} wird <b>${e}-mal</b> mit sich selbst malgenommen:</p><p>${f}</p>`+(tx.length?'<ol><li>'+tx.join('</li><li>')+'</li></ol>':'')}
  return h+`<p>Ergebnis: <b>${fmt(Math.pow(b,e))}</b></p>`}
function wgWurzel(n,full){
  const r=Math.sqrt(n),ok=Number.isInteger(r);let h=`<h3>√${fmt(n)}</h3>`;
  if(full){h+=`<p>Gesucht ist die Zahl, die mit sich selbst mal genommen ${fmt(n)} ergibt.</p>`;
    const lo=Math.floor(r);h+=ok?`<p>Probiere: ${lo} · ${lo} = ${fmt(lo*lo)} ✔</p>`:`<p>${lo} · ${lo} = ${fmt(lo*lo)} (zu klein), ${lo+1} · ${lo+1} = ${fmt((lo+1)*(lo+1))} (zu groß) → die Wurzel liegt zwischen ${lo} und ${lo+1}.</p>`}
  return h+`<p>Ergebnis: <b>${ok?fmt(r):'≈ '+fmt(Math.round(r*1e4)/1e4)}</b></p>`}
function wgStrip(h){return h}
function solveWeg(raw){
  const full=wegMode()==='voll',t=String(raw||'').trim().toLowerCase().replace(/,/g,'.');if(!t)return '';
  let m=t.match(/^(\d+)\s*\/\s*(\d+)\s*([+\-−–·×x*:÷])\s*(\d+)\s*\/\s*(\d+)$/);
  if(m){const o=m[3];return wgBruch(+m[1],+m[2],/[+]/.test(o)?'+':/[\-−–]/.test(o)?'-':/[:÷]/.test(o)?'/':'*',+m[4],+m[5],full)}
  m=t.match(/^(\d+(?:\.\d+)?)\s*%\s*(?:von)?\s*(\d+(?:\.\d+)?)$/);if(m)return wgProz(+m[1],+m[2],full);
  m=t.match(/^(\d+)\s*\^\s*(\d+)$/);if(m)return wgPot(+m[1],+m[2],full);
  m=t.match(/^(?:wurzel|√)\s*(?:aus)?\s*(\d+(?:\.\d+)?)$/);if(m)return wgWurzel(+m[1],full);
  const s=t.replace(/[×x·]/g,'*').replace(/÷|:/g,'/').replace(/[−–]/g,'-').replace(/\s+/g,'');
  m=s.match(/^(\d+)([+\-*/])(\d+)$/);
  if(m){const a=+m[1],op=m[2],b=+m[3];
    if(op==='/'&&!b)return '<p>Durch 0 darf man nicht teilen.</p>';
    if(op==='-'&&b>a)return solveExpr(raw);
    const res=op==='+'?a+b:op==='-'?a-b:op==='*'?a*b:a/b,sym={'+':'+','-':'−','*':'·','/':':'}[op];
    let h=`<h3>${fmt(a)} ${sym} ${fmt(b)}</h3>`;
    const kz=wgKurz(a,op,b),res2=op==='/'?`${fmt(Math.floor(a/b))}${a%b?' Rest '+(a%b):''}`:fmt(res);
    if(!full){h+=`<p><b>Kurz im Kopf / halbschriftlich:</b></p><p>${kz.join('<br>')||'—'}</p><p>Ergebnis: <b>${res2}</b></p>`;return h}
    h+=`<p><b>1) Halbschriftlich</b> (in Schritten, gut im Kopf):</p><p>${kz.join('<br>')||'—'}</p><p><b>2) Schriftlich</b> (wie in der Schule):</p>`;
    if(op==='*')h+=(String(b).length>1?wgMulCol(a,b):stepsMul(a,b));else if(op==='/')h+=wgDivCol(a,b)+`<p>Ergebnis: <b>${res2}</b></p>`;else h+=op==='+'?stepsAdd(a,b):stepsSub(a,b);
    h+=wgProbe(a,op,b,op==='/'?Math.floor(a/b):res);
    const tr=tricksFor(a,op,b);if(tr.length)h+='<div class="trick">💡 <b>Trick:</b><br>'+tr.join('<br>')+'</div>';
    return h}
  const r=solveExpr(raw);return full?r:r.replace(/<p>Regeln:[^]*?<\/p>/,'')}
function wegModeBar(){const c=(v,l)=>`<button class="chip wgm${wegMode()===v?' on':''}" data-v="${v}">${l}</button>`;return `<div class="chips">${c('einfach','⚡ Einfach')}${c('voll','📘 Ausführlich')}</div>`}
