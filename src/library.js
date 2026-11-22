/* Bibliothek: eigene Dateien (ePub, PDF, Bilder, Text, HTML …) pro Fach.
   Nur Funktions-Deklarationen (route() läuft vor diesem Code). */
function libMeta(){try{return JSON.parse(localStorage.getItem('sh5lib')||'[]')}catch(e){return[]}}
function libMetaSet(a){try{localStorage.setItem('sh5lib',JSON.stringify(a))}catch(e){}}
function libDbOpen(){return new Promise((ok,no)=>{const r=indexedDB.open('sh5lib',1);r.onupgradeneeded=()=>r.result.createObjectStore('f');r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)})}
async function libPut(id,blob){const d=await libDbOpen();return new Promise((ok,no)=>{const t=d.transaction('f','readwrite');t.objectStore('f').put(blob,id);t.oncomplete=()=>ok();t.onerror=()=>no(t.error);t.onabort=()=>no(t.error||new Error('Speicher voll'))})}
async function libGet(id){const d=await libDbOpen();return new Promise(ok=>{const q=d.transaction('f').objectStore('f').get(id);q.onsuccess=()=>ok(q.result||null);q.onerror=()=>ok(null)})}
async function libDelDb(id){try{const d=await libDbOpen();await new Promise(ok=>{const t=d.transaction('f','readwrite');t.objectStore('f').delete(id);t.oncomplete=ok;t.onerror=ok})}catch(e){}}
function libKind(name,mime){const e=(name.split('.').pop()||'').toLowerCase();
  if(e==='epub')return'epub';if(e==='pdf'||mime==='application/pdf')return'pdf';
  if(/^(png|jpe?g|gif|webp|bmp|svg|avif)$/.test(e)||/^image\//.test(mime||''))return'img';
  if(/^(txt|md|csv)$/.test(e))return'txt';if(/^(html?|xhtml)$/.test(e))return'html';
  if(/^(mp4|webm|m4v|mov)$/.test(e)||/^video\//.test(mime||''))return'video';
  if(/^(mp3|m4a|ogg|wav)$/.test(e)||/^audio\//.test(mime||''))return'audio';
  return'other'}
function libIcon(k){return{epub:'📖',pdf:'📕',img:'🖼️',txt:'📄',html:'🌐',video:'🎬',audio:'🎧',other:'📎'}[k]||'📎'}
function libSize(n){return n>1048576?(n/1048576).toFixed(1).replace('.',',')+' MB':Math.max(1,Math.round(n/1024))+' KB'}
function libSubj(f){return(typeof subjById==='function'&&subjById(f))||null}
function libDownload(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{a.remove()},800)}
function libB64(blob){return new Promise((ok,no)=>{const r=new FileReader();r.onload=()=>ok(String(r.result).split(',')[1]||'');r.onerror=()=>no(r.error);r.readAsDataURL(blob)})}
async function libOpenExt(id){
  const m=libMeta().find(x=>x.id===id),b=await libGet(id);if(!m||!b)return false;
  const C=window.Capacitor;
  if(C&&C.isNativePlatform&&C.isNativePlatform()){
    const st=document.querySelector('#lpst')||document.querySelector('#lpv');
    try{const FS=C.Plugins.Filesystem||C.registerPlugin('Filesystem'),SH=C.Plugins.Share||C.registerPlugin('Share');
      const nm=m.name.replace(/[^\w.\-äöüÄÖÜß ]/g,'_'),CH=3*1024*1024;let w=null;
      for(let o=0;o<b.size||o===0;o+=CH){
        const part=await libB64(b.slice(o,o+CH));
        if(o===0)w=await FS.writeFile({path:nm,data:part,directory:'CACHE'});else await FS.appendFile({path:nm,data:part,directory:'CACHE'});
        if(b.size>CH&&st&&st.id==='lpst')st.textContent='Bereite vor … '+Math.min(100,Math.round((o+CH)/b.size*100))+' %';
        if(b.size===0)break}
      if(!w)w=await FS.getUri({path:nm,directory:'CACHE'});
      if(st&&st.id==='lpst')st.textContent='';
      await SH.share({title:m.name,url:w.uri,dialogTitle:'Öffnen mit …'});return true}
    catch(e){if(e&&/cancel/i.test(e.message||''))return true;alert('Öffnen hat nicht geklappt: '+(e&&e.message||e));return false}
  }
  libDownload(b,m.name);return true}
async function libAdd(files,fid){
  const meta=libMeta();let n=0,err='';
  for(const f of files){
    try{const id=Date.now().toString(36)+Math.random().toString(36).slice(2,5);
      await libPut(id,f);
      meta.push({id,name:f.name,kind:libKind(f.name,f.type),size:f.size,subj:fid||'',date:Date.now()});n++;libMetaSet(meta)}
    catch(e){err='Nicht genug Speicher für „'+f.name+'“. Lösche erst etwas anderes.';break}
  }
  try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persist()}catch(e){}
  return{n,err}}
async function libDelete(ids){const set=new Set(ids);for(const id of ids)await libDelDb(id);libMetaSet(libMeta().filter(x=>!set.has(x.id)));
  try{const p=JSON.parse(localStorage.getItem('sh5libpos')||'{}');ids.forEach(i=>delete p[i]);localStorage.setItem('sh5libpos',JSON.stringify(p))}catch(e){}}
function libPage(f){
  setNav('home');
  const fid=(f&&f!=='alle'&&libSubj(f))?f:'',meta=libMeta(),all=meta.slice().sort((a,b)=>b.date-a.date);
  const list=fid?all.filter(x=>x.subj===fid):all;
  const chips=`<div class="chips"><button class="chip${!fid?' on':''}" data-f="alle">Alle (${all.length})</button>${SUBJ.map(s=>`<button class="chip${fid===s.id?' on':''}" data-f="${s.id}">${s.icon||''} ${esc(s.name)} (${all.filter(x=>x.subj===s.id).length})</button>`).join('')}<button class="chip${fid==='-'?' on':''}" data-f="-">Ohne Fach (${all.filter(x=>!x.subj).length})</button></div>`;
  const shown=fid==='-'?all.filter(x=>!x.subj):list;
  const total=all.reduce((a,x)=>a+(x.size||0),0);
  const row=x=>{const s=libSubj(x.subj);return `<div class="card" style="margin:8px 0;padding:10px"><div style="font-weight:700;word-break:break-word">${libIcon(x.kind)} ${esc(x.name)}</div><div style="color:#64748b;font-size:.85rem;margin:3px 0 8px">${s?esc(s.name)+' · ':''}${libSize(x.size||0)} · ${new Date(x.date).toLocaleDateString('de-DE')}</div><div class="row2"><button class="go" data-lv="${x.id}">👁 Ansehen</button><button data-lx="${x.id}">↗ Öffnen mit …</button></div><div class="row2" style="margin-top:6px"><button data-lm="${x.id}">📁 Fach ändern</button><button data-ld="${x.id}" style="color:#dc2626">🗑 Löschen</button></div></div>`};
  app().innerHTML=`<a class="back" href="#/">← Start</a><h1>📁 Meine Dateien</h1><p class="lead">Lege hier eBooks, PDFs und Bilder ab – sortiert nach Fach. Sie bleiben auf diesem Gerät und du kannst alles wieder löschen.</p>
  ${chips}
  <div class="card" style="padding:12px;margin:10px 0"><b>➕ Dateien hinzufügen${fid&&fid!=='-'?' zu '+esc(libSubj(fid).name):''}</b><div style="color:#64748b;font-size:.85rem;margin:4px 0 8px">ePub, PDF, Bilder (PNG, JPG …), Text, HTML. Mehrere auf einmal sind möglich.</div><input type="file" id="lpf" multiple accept=".epub,.pdf,.png,.jpg,.jpeg,.gif,.webp,.bmp,.svg,.txt,.md,.csv,.html,.htm,.mp4,.webm,.mp3,.m4a,.docx,.pptx,.xlsx,application/epub+zip,application/pdf,image/*,text/*,*/*" style="width:100%"><p id="lpst" class="hint" style="margin-top:8px"></p></div>
  <p class="hint">${all.length} Datei${all.length===1?'':'en'} · ${libSize(total)} belegt</p>
  ${shown.length?shown.map(row).join(''):'<p class="hint">Hier ist noch nichts drin.</p>'}
  ${shown.length?`<button id="lpda" style="width:100%;margin-top:10px;color:#dc2626">🗑 ${fid&&fid!=='-'?'Alle Dateien dieses Fachs löschen':'Alle angezeigten Dateien löschen'}</button>`:''}`;
  document.querySelectorAll('.chips .chip').forEach(b=>b.onclick=()=>{location.hash='#/lib/'+b.dataset.f});
  $('#lpf').onchange=async e=>{const fs=[...e.target.files];if(!fs.length)return;$('#lpst').textContent='Speichere …';
    const r=await libAdd(fs,fid==='-'?'':fid);$('#lpst').textContent=r.err||('✔ '+r.n+' Datei'+(r.n===1?'':'en')+' gespeichert.');if(r.n)setTimeout(()=>libPage(f),600)};
  document.querySelectorAll('[data-lv]').forEach(b=>b.onclick=()=>{location.hash='#/lib/view/'+b.dataset.lv});
  document.querySelectorAll('[data-lx]').forEach(b=>b.onclick=()=>libOpenExt(b.dataset.lx));
  document.querySelectorAll('[data-ld]').forEach(b=>b.onclick=async()=>{const m=meta.find(x=>x.id===b.dataset.ld);if(m&&confirm('„'+m.name+'“ wirklich löschen?')){await libDelete([m.id]);libPage(f)}});
  document.querySelectorAll('[data-lm]').forEach(b=>b.onclick=()=>{const m=libMeta(),x=m.find(y=>y.id===b.dataset.lm);if(!x)return;
    const names=SUBJ.map((s,i)=>(i+1)+' = '+s.name).join('\n'),v=prompt('Zu welchem Fach? Nummer eingeben (0 = ohne Fach):\n'+names,'');if(v===null)return;
    const k=parseInt(v,10);if(isNaN(k)||k<0||k>SUBJ.length)return;x.subj=k===0?'':SUBJ[k-1].id;libMetaSet(m);libPage(f)});
  const da=$('#lpda');if(da)da.onclick=async()=>{if(confirm(shown.length+' Datei(en) wirklich löschen?')){await libDelete(shown.map(x=>x.id));libPage(f)}};
}
/* ---------- Viewer ---------- */
async function libView(id){
  setNav('home');const m=libMeta().find(x=>x.id===id);
  if(!m){location.hash='#/lib';return}
  const back='#/lib/'+(m.subj||'alle');
  app().innerHTML=`<a class="back" href="${back}">← Meine Dateien</a><h2 style="word-break:break-word">${libIcon(m.kind)} ${esc(m.name)}</h2><div id="lpv">Lade …</div>`;
  const b=await libGet(id);if(!b){$('#lpv').innerHTML='<p>Die Datei wurde nicht gefunden. Bitte noch einmal hinzufügen.</p>';return}
  const ext=`<div class="row2" style="margin:10px 0"><button id="lpvx">↗ Öffnen mit …</button><button id="lpvd" style="color:#dc2626">🗑 Löschen</button></div>`;
  const wire=()=>{const x=$('#lpvx');if(x)x.onclick=()=>libOpenExt(id);const d=$('#lpvd');if(d)d.onclick=async()=>{if(confirm('Wirklich löschen?')){await libDelete([id]);location.hash=back}}};
  try{
    if(m.kind==='img'||m.kind==='pdf'||m.kind==='epub'){
      $('#lpv').innerHTML=`<button id="lpRead" class="go" style="width:100%;font-size:1.1rem;padding:14px">📖 Lesen (Vollbild-Lesegerät)</button><p class="hint">Drehen, Doppelseite, Nachtmodus, Lesezeichen, Suche und Inhaltsverzeichnis findest du im Lesegerät.</p>${ext}`;
      $('#lpRead').onclick=()=>readerOpen(m.kind,b,m);
      if(!window.__noAutoRead)readerOpen(m.kind,b,m)}
    else if(m.kind==='txt'){const t=await b.text();$('#lpv').innerHTML=`<pre style="white-space:pre-wrap;word-break:break-word;background:var(--card,#fff);padding:12px;border-radius:8px;border:1px solid #e2e8f0">${esc(t.slice(0,300000))}</pre>${ext}`}
    else if(m.kind==='html'){const t=await b.text();$('#lpv').innerHTML=`<iframe sandbox="" srcdoc="${esc(t)}" style="width:100%;height:70vh;border:1px solid #cbd5e1;border-radius:8px;background:#fff"></iframe>${ext}`}
    else if(m.kind==='video'||m.kind==='audio'){const u=URL.createObjectURL(b);$('#lpv').innerHTML=(m.kind==='video'?`<video src="${u}" controls playsinline style="width:100%;border-radius:8px"></video>`:`<audio src="${u}" controls style="width:100%"></audio>`)+ext}
    else $('#lpv').innerHTML=`<p>Dieses Dateiformat kann die App nicht selbst anzeigen. Tippe auf „Öffnen mit …“, dann öffnet es dein Handy mit einem passenden Programm.</p>${ext}`;
  }catch(e){$('#lpv').innerHTML=`<p>Anzeigen hat nicht geklappt (${esc(e.message||e)}). Du kannst die Datei mit „Öffnen mit …“ in einem anderen Programm ansehen.</p>${ext}`}
  wire();
}
/* ---------- Mini-Zip + ePub ---------- */
async function zipRead(buf){
  const dv=new DataView(buf),u8=new Uint8Array(buf);let e=-1;
  for(let i=u8.length-22;i>=Math.max(0,u8.length-66000);i--){if(dv.getUint32(i,true)===0x06054b50){e=i;break}}
  if(e<0)throw new Error('Keine gültige ePub-Datei');
  const cnt=dv.getUint16(e+10,true);let p=dv.getUint32(e+16,true);const ents={};
  for(let i=0;i<cnt;i++){
    if(dv.getUint32(p,true)!==0x02014b50)break;
    const meth=dv.getUint16(p+10,true),csz=dv.getUint32(p+20,true),nl=dv.getUint16(p+28,true),xl=dv.getUint16(p+30,true),cl=dv.getUint16(p+32,true),off=dv.getUint32(p+42,true);
    const name=new TextDecoder().decode(u8.subarray(p+46,p+46+nl));ents[name]={meth,csz,off};p+=46+nl+xl+cl}
  async function get(name){
    const en=ents[name];if(!en)return null;const o=en.off,nl=dv.getUint16(o+26,true),xl=dv.getUint16(o+28,true),s=o+30+nl+xl,raw=u8.subarray(s,s+en.csz);
    if(en.meth===0)return raw;
    if(typeof DecompressionStream==='undefined')throw new Error('Dieses Handy kann ePub nicht entpacken (zu altes System).');
    const ds=new DecompressionStream('deflate-raw'),w=ds.writable.getWriter();w.write(raw);w.close();
    return new Uint8Array(await new Response(ds.readable).arrayBuffer())}
  return{names:Object.keys(ents),get,text:async n=>{const x=await get(n);return x?new TextDecoder('utf-8').decode(x):null}}}
function epubPath(base,rel){
  rel=decodeURIComponent(String(rel||'').split('#')[0].split('?')[0]);if(/^[a-z]+:/i.test(rel))return null;
  const parts=(rel.charAt(0)==='/'?rel.slice(1):(base?base+'/':'')+rel).split('/'),o=[];
  parts.forEach(s=>{if(s==='..')o.pop();else if(s&&s!=='.')o.push(s)});return o.join('/')}
async function pdfLib(){
  if(window.__pdfLib)return window.__pdfLib;
  const base=new URL('./pdfjs/',location.href).href;let L;
  try{L=await import(base+'pdf.min.mjs');L.GlobalWorkerOptions.workerSrc=base+'pdf.worker.min.mjs'}
  catch(e){L=await import('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/legacy/build/pdf.min.mjs');L.GlobalWorkerOptions.workerSrc='https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/legacy/build/pdf.worker.min.mjs'}
  window.__pdfLib=L;return L}
