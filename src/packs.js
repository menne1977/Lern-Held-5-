/* ===== Paket-Bibliothek + Sichern/Wiederherstellen (nur Funktionsdeklarationen!) ===== */
function BOOKS_(i){return ['Parallelo 5 NRW','Blue Line 1','Deutschbuch 5'][i]||'Klasse '+klasse()}
function bookOf(it){return it.book||(/blue line/i.test(it.name)?'Blue Line 1':BOOKS_(it.s))}
function grpOf(it){return (SUBJ[it.s]||SUBJ[2]).name+' · '+bookOf(it)}
function packImport(j){
  const txt=JSON.stringify(j),r=parseAI(txt);
  if(!r.tasks.length&&!r.vocab.length&&!r.slides.length&&!r.dict.length)throw new Error('Das Paket enthält keine Aufgaben, Vokabeln, Folien oder Diktatsätze.');
  const sb=subIdx(j.subject),key=String(j.key||j.title||'Paket'),nm=String(j.title||(['Mathe','Englisch','Deutsch'][sb]+' '+new Date().toLocaleDateString('de-DE')));
  const book=String(j.book||BOOKS_(sb)),ex={slides:r.slides,dict:r.dict,kl:+j.klasse||klasse()};
  const old=MINE.find(x=>x.name===nm&&x.s===sb);
  if(old){old.text=key;old.vocab=mergePairs([],r.vocab);old.ai=r.tasks;old.d=Date.now();old.book=book;Object.assign(old,ex);saveMine();buildMine(old);return old}
  const it={id:Date.now().toString(36)+Math.random().toString(36).slice(2,4),name:nm,s:sb,sn:SUBJ[sb].name,text:key,vocab:mergePairs([],r.vocab),d:Date.now(),ai:r.tasks,book:book,slides:ex.slides,dict:ex.dict,kl:ex.kl};
  MINE.unshift(it);saveMine();buildMine(it);return it;
}
async function packsPage(){
  setNav('mine');
  app().innerHTML='<a class="back" href="#/mine">← Meine Sachen</a><h1>📦 Fertige Pakete</h1><p class="lead">Fertige Vokabeln und Übungen zu den Büchern. Tippe auf „Hinzufügen“ – alles landet in „Meine Sachen“ und im Vokabel-Trainer.</p><div id="pk">Lade …</div>';
  let idx=[];try{const r=await fetch('packs/index.json',{cache:'no-cache'});idx=await r.json()}catch(e){$('#pk').innerHTML='<p>Die Pakete konnten nicht geladen werden (kein Netz und noch nicht gespeichert?). Versuche es mit Internet noch einmal.</p>';return}
  const have=t=>MINE.some(x=>x.name===t);
  $('#pk').innerHTML=idx.map((p,i)=>`${i===0||idx[i-1].subject!==p.subject?`<h2>${(SUBJ[subIdx(p.subject)]||{}).icon||''} ${esc(p.subject)} · ${esc(p.book||'')}</h2>`:''}<div class="card" style="margin:10px 0;padding:12px"><b>${esc(p.title)}</b><div style="color:#64748b;font-size:.85rem;margin:4px 0 8px">${p.words} Vokabeln · ${p.tasks} Aufgaben</div><button class="go" data-i="${i}" style="width:100%">${have(p.title)?'✓ Drin – neu laden':'➕ Hinzufügen'}</button></div>`).join('')+'<button class="go" id="pkall" style="width:100%;background:#16a34a;border-color:#16a34a">➕ Alle Pakete hinzufügen</button><p id="pkst" style="margin-top:10px"></p>';
  const add=async i=>{const r=await fetch('packs/'+idx[i].file);return packImport(await r.json())};
  document.querySelectorAll('#pk button[data-i]').forEach(b=>b.onclick=async()=>{try{await add(+b.dataset.i);b.textContent='✓ Hinzugefügt';$('#pkst').textContent='Fertig – du findest es unter „Meine Sachen“.'}catch(e){$('#pkst').textContent='Fehler: '+e.message}});
  $('#pkall').onclick=async()=>{try{for(let i=0;i<idx.length;i++)await add(i);packsPage();setTimeout(()=>{$('#pkst').textContent='Alle '+idx.length+' Pakete sind drin.'},50)}catch(e){$('#pkst').textContent='Fehler: '+e.message}};
}
async function imgSet(id,arr){try{const d=await idbOpen();await new Promise(ok=>{const t=d.transaction('i','readwrite');t.objectStore('i').put(arr,id);t.oncomplete=ok;t.onerror=ok})}catch(e){}}
async function backupData(withImg,books){
  const sel=books&&books.length?new Set(books):null,items=MINE.filter(it=>!sel||sel.has(grpOf(it))),names=new Set(items.map(it=>it.name));
  const vv=vocGet().filter(w=>!sel||names.has(w.src)||(sel.has('Eigene Wörter')&&!MINE.some(it=>it.name===w.src)));
  const pr={};Object.keys(P).forEach(k=>{if(!sel||items.some(it=>k.indexOf(it.id)>=0)||!/^m[v]?_/.test(k)&&sel.has('Fortschritt (Lernen)'))pr[k]=P[k]});
  const d={app:'schulheld5',v:2,date:new Date().toISOString(),books:[...new Set(items.map(grpOf))],mine:items.map(it=>Object.assign({},it,{book:bookOf(it)})),mybooks:myBooks().filter(b=>!sel||[...sel].some(g=>g.indexOf(b.subj)===0)),voc:vv,vocdel:sel?[]:vocDelGet(),progress:pr,images:{}};
  if(withImg)for(const it of items){const a=await imgGet(it.id);if(a&&a.length)d.images[it.id]=a}
  return d;
}
async function backupRestore(d){
  if(!d||d.app!=='schulheld5')throw new Error('Das ist keine Schul-Held-Sicherung.');
  let n=0;const ids=new Set(MINE.map(x=>x.id));
  (d.mine||[]).forEach(it=>{if(it&&it.id&&!ids.has(it.id)){if(!it.book)it.book=bookOf(it);MINE.push(it);ids.add(it.id);n++}});
  const v=vocGet(),seen=new Map(v.map(w=>[vkey(w.en),w]));let nv=0;
  (d.voc||[]).forEach(w=>{if(!w||!w.en)return;const k=vkey(w.en),o=seen.get(k);if(!o){v.push(w);seen.set(k,w);nv++}else if((w.box||0)>(o.box||0)){o.box=w.box;o.ok=Math.max(o.ok||0,w.ok||0);o.no=Math.max(o.no||0,w.no||0)}});
  vocSet(v);try{const mb=myBooks(),ks=new Set(mb.map(b=>b.isbn+'|'+b.title));(d.mybooks||[]).forEach(b=>{if(!ks.has(b.isbn+'|'+b.title))mb.push(b)});myBooksSet(mb)}catch(e){}vocDelSet([...new Set(vocDelGet().concat(d.vocdel||[]))]);
  Object.keys(d.progress||{}).forEach(k=>{const a=P[k]||{},b=d.progress[k]||{};P[k]=Object.assign({},b,a,{r:Math.max(a.r||0,b.r||0)})});save();
  for(const id of Object.keys(d.images||{})){const cur=await imgGet(id);if(!cur.length)await imgSet(id,d.images[id])}
  saveMine();MINE.forEach(it=>{try{buildMine(it)}catch(e){}});
  return{n,nv};
}
async function backupSave(blobTxt,name){
  const C=window.Capacitor;
  if(C&&C.isNativePlatform&&C.isNativePlatform()){
    try{
      const FS=C.Plugins.Filesystem||C.registerPlugin('Filesystem'),SH=C.Plugins.Share||C.registerPlugin('Share');
      const w=await FS.writeFile({path:name,data:blobTxt,directory:'CACHE',encoding:'utf8'});
      await SH.share({title:'Schul-Held Sicherung',text:'Sicherung von Schul-Held 5',url:w.uri,dialogTitle:'Sicherung speichern / senden'});return'share';
    }catch(e){if(e&&/cancel/i.test(e.message||''))return'cancel'}
  }
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([blobTxt],{type:'application/json'}));a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>a.remove(),500);return'download';
}
function backupPage(){
  setNav('mine');
  const g={};MINE.forEach(it=>{const b=grpOf(it);(g[b]=g[b]||{n:0,v:0});g[b].n++;g[b].v+=(it.vocab||[]).length});
  const own=vocGet().filter(w=>!MINE.some(it=>it.name===w.src)).length;if(own)g['Eigene Wörter']={n:0,v:own};
  const bks=Object.keys(g);
  app().innerHTML=`<a class="back" href="#/mine">← Meine Sachen</a><h1>💾 Sichern &amp; Übertragen</h1><p class="lead">Sichere <b>nach Fach und Buch getrennt</b> – jede Datei trägt Fach und Buch im Namen und kann nichts anderes überschreiben. Beim Wiederherstellen wird immer nur <b>hinzugefügt</b>.</p>
  <div class="card" style="padding:12px;margin:10px 0"><b>1) Sichern – was?</b>${bks.length?bks.map((b,i)=>`<label style="display:block;margin:8px 0"><input type="checkbox" class="bkc" value="${esc(b)}" checked> <b>${esc(b)}</b><br><small style="color:#64748b">${g[b].n} Sachen · ${g[b].v} Vokabeln</small></label>`).join(''):'<p>Noch nichts gespeichert.</p>'}
  <label style="display:block;margin:6px 0"><input type="checkbox" id="bimg" checked> Fotos mitsichern (Datei wird größer)</label>
  <button class="go" id="bex" style="width:100%">📤 Auswahl in EINE Datei sichern</button>
  <button class="go" id="bsep" style="width:100%;margin-top:8px;background:#0891b2;border-color:#0891b2">📚 Jedes Fach/Buch in eigene Datei sichern</button></div>
  <div class="card" style="padding:12px;margin:10px 0"><b>2) Wiederherstellen</b><p style="font-size:.9rem">Wähle eine Sicherungsdatei. Es wird nichts gelöscht oder überschrieben – alles kommt zu dem dazu, was schon da ist.</p><input type="file" id="bfi" accept=".json,application/json" style="display:none"><button class="go" id="bim" style="width:100%;background:#7c3aed;border-color:#7c3aed">📥 Datei auswählen</button></div><p id="bst"></p>`;
  const st=$('#bst'),slug=t=>t.replace(/[^A-Za-z0-9ÄÖÜäöüß]+/g,'').slice(0,40)||'Buch',day=()=>new Date().toISOString().slice(0,10);
  const one=async(books,img)=>{const d=await backupData(img,books),nm='SchulHeld5-'+(books.length===1?slug(books[0]):'Auswahl')+'-'+day()+'.json',r=await backupSave(JSON.stringify(d),nm);return{d,nm,r}};
  $('#bex').onclick=async()=>{try{const sel=[...document.querySelectorAll('.bkc:checked')].map(x=>x.value);if(!sel.length){st.textContent='Bitte mindestens ein Buch ankreuzen.';return}st.textContent='Wird gesichert …';const o=await one(sel,$('#bimg').checked);st.textContent=o.r==='cancel'?'Abgebrochen.':(o.r==='share'?'Fertig – ':'Datei „'+o.nm+'“ in Downloads gespeichert. ')+o.d.mine.length+' Sachen, '+o.d.voc.length+' Vokabeln ('+o.d.books.join(', ')+').'}catch(e){st.textContent='Fehler: '+e.message}};
  $('#bsep').onclick=async()=>{try{let n=0;for(const b of bks){st.textContent='Sichere '+b+' …';const o=await one([b],$('#bimg').checked);if(o.r==='cancel')break;n++}st.textContent=n+' Datei(en) gesichert – eine pro Buch.'}catch(e){st.textContent='Fehler: '+e.message}};
  $('#bim').onclick=()=>$('#bfi').click();
  $('#bfi').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const j=JSON.parse(await f.text()),r=await backupRestore(j);st.textContent='Fertig'+(j.books?' ('+j.books.join(', ')+')':'')+': '+r.n+' neue Sachen und '+r.nv+' neue Vokabeln hinzugefügt. Schon Vorhandenes blieb unverändert.'}catch(x){st.textContent='Fehler: '+x.message}};
}
