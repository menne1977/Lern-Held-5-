/* ===== Echte Aufnahmen (Tierstimmen, Geräusche) aus Wikimedia Commons – nur mit Internet ===== */
const QZ_TIERE=[['Hund','🐶','dog bark',/bark|dog|canis|hund/i],['Katze','🐱','cat meow',/meow|miau|cat|felis|katze/i],['Kuh','🐮','cow moo',/moo|cow|bos taurus|kuh|rind/i],['Schaf','🐑','sheep bleat',/bleat|sheep|ovis|schaf/i],['Ente','🦆','duck quack',/quack|duck|anas|ente/i],['Hahn','🐓','rooster crow',/rooster|crow|cock|gallus|hahn/i],['Schwein','🐷','pig grunt',/pig|sus scrofa|grunt|hog|schwein/i],['Frosch','🐸','frog croak',/frog|rana|croak|frosch/i],['Pferd','🐴','horse neigh',/horse|neigh|equus|pferd|whinny/i],['Wolf','🐺','wolf howl',/wolf|howl|canis lupus/i],['Löwe','🦁','lion roar',/lion|roar|panthera leo|löwe/i],['Eule','🦉','owl hoot',/owl|hoot|strix|eule|bubo/i],['Esel','🫏','donkey bray',/donkey|bray|esel|asinus/i],['Truthahn','🦃','turkey gobble',/turkey|gobble|meleagris/i]];
const QZ_GERAEUSCHE=[['Kirchenglocke','🔔','church bell',/bell|glocke/i],['Sirene','🚨','siren',/siren|sirene/i],['Telefon','📞','telephone ring',/phone|ring|telefon/i],['Wecker','⏰','alarm clock',/alarm|wecker/i],['Regen','🌧️','rain',/rain|regen/i],['Donner','⛈️','thunder',/thunder|donner/i],['Meeresrauschen','🌊','ocean waves',/wave|ocean|surf|sea|meer/i],['Zug','🚂','train',/train|zug|locomotive/i],['Hubschrauber','🚁','helicopter',/helicopter|hubschrauber/i],['Auto-Hupe','🚗','car horn',/horn|honk|hupe/i],['Wasserfall','💧','waterfall',/waterfall|wasserfall/i],['Uhr-Ticken','🕰️','clock ticking',/tick|clock|uhr/i]];
const QZ_BAD=/^(De|En|Fr|Es|It|Nl|Pl)-|pronunc|spoken|speech|voice|aussprache|\bsong\b|music|musik|remix|lyrics|interview|^Wiktionary/i;
function qzAudCache(){try{return JSON.parse(localStorage.getItem('sh5aud')||'{}')}catch(e){return{}}}
function qzAudSave(c){try{localStorage.setItem('sh5aud',JSON.stringify(c))}catch(e){}}
async function qzAudFind(name,query,re){
  const c=qzAudCache();if(c[name]&&c[name].length)return c[name];
  const u='https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrlimit=20&gsrsearch='+encodeURIComponent(query+' filetype:audio')+'&prop=imageinfo&iiprop=url|mime&format=json&origin=*';
  const ctl=new AbortController(),to=setTimeout(()=>ctl.abort(),9000);
  const r=await fetch(u,{signal:ctl.signal});clearTimeout(to);const j=await r.json(),pg=Object.values((j.query&&j.query.pages)||{});
  const L=pg.filter(p=>p.imageinfo&&p.imageinfo[0]&&/^audio\/|ogg/.test(p.imageinfo[0].mime||'')&&re.test(p.title)&&!QZ_BAD.test(p.title.replace(/^File:/,''))).map(p=>({url:p.imageinfo[0].url,page:'https://commons.wikimedia.org/wiki/'+encodeURI(p.title.replace(/ /g,'_')),title:p.title.replace(/^File:/,'')})).slice(0,8);
  if(L.length){c[name]=L;qzAudSave(c)}return L}
/* lädt je Quiz die Aufnahmen; liefert Liste [{name,emoji,files}] nur für gefundene */
async function qzAudLoad(id){
  const S=id==='tier'?QZ_TIERE:QZ_GERAEUSCHE,out=[];
  await Promise.all(S.map(async s=>{try{const f=await qzAudFind(s[0],s[2],s[3]);if(f.length)out.push({name:s[0],emoji:s[1],files:f})}catch(e){}}));
  window.__qzAud=window.__qzAud||{};window.__qzAud[id]=out;return out}
function qzAudPlay(url){try{if(window.__qza){window.__qza.pause()}const a=new Audio(url);window.__qza=a;a.play().catch(()=>noSound());clearTimeout(window.__qzat);window.__qzat=setTimeout(()=>{try{a.pause()}catch(e){}},12000)}catch(e){noSound()}}
