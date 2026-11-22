/* ===== Deutsch Klasse 5 ===== */
const pairGen=(list,frage,tip)=>()=>{const p=pick(list),opts=shuffle([p[0],p[1]]);
  return Q(`${frage}`,p[0],{kind:'choice',opts,speak:p[0],hint:tip,steps:`Richtig: <b>${p[0]}</b>${p[2]?' – '+p[2]:''}`})};
const WORDS_ABC=['Apfel','Ball','Baum','Dach','Esel','Fisch','Garten','Haus','Igel','Jacke','Katze','Lampe','Maus','Nase','Ohr','Pferd','Regen','Sonne','Tisch','Uhr','Vogel','Wald','Zebra','Zahn','Buch','Brot','Dorf','Eis','Feder','Gabel','Hund','Insel','Kind','Löwe','Mond','Nuss','Oma','Puppe','Rad','Schule','Tasche','Wasser','Zug'];
const GRP_ABC=[['Baum','Bett','Brot','Buch','Ball','Bein','Besen','Bus'],['Sonne','Stuhl','Schule','Schaf','Sand','Stern','Strand'],['Katze','Kind','Kuh','Käse','Korb','Kuchen','Kamm'],['Haus','Hund','Hase','Hand','Hose','Hut','Herz']];
G.abc=()=>{const list=R(0,1)?shuffle(pick(GRP_ABC)).slice(0,4):shuffle(WORDS_ABC).slice(0,4),sorted=list.slice().sort((a,b)=>a.localeCompare(b,'de'));
  return Q(`Ordne die Wörter nach dem <b>Abc</b>:<div class="big">${list.join(' · ')}</div><small>Schreibe sie hintereinander mit Leerzeichen.</small>`,sorted.join(' '),{pre:s=>s.replace(/[,;·]/g,' '),ks:false,steps:`Bei gleichem Anfangsbuchstaben entscheidet der zweite (dritte …) Buchstabe. → ${sorted.join(', ')}`,hint:'Erster Buchstabe, dann zweiter …'})};
const SIL=['Schmet-ter-ling','Fen-ster','Kat-ze','Ap-fel','Scho-ko-la-de','Bi-ber','Son-ne','Re-gen-schirm','Kro-ko-dil','Fa-mi-li-e','Le-ser','Fuß-ball','Kü-chen-tisch','Zau-be-rer','Ge-spenst','Ham-mer','But-ter','Tel-ler','Kof-fer','Lö-we','Schu-le','Ta-sche','Win-ter','Ha-se','Kar-tof-fel','Eis-bär','Dra-che','Ba-na-ne','Fe-der','Ge-heim-nis'];
G.silben=()=>{const w=pick(SIL),p=w.split('-'),j=p.join('');
  return R(0,1)?Q(`Wie viele <b>Silben</b> hat das Wort <b>${j}</b>? <small>(klatsche mit!)</small>`,p.length,{speak:j,steps:`${w} → ${p.length} Silben. Du klatschst bei jedem Sprechstück.`}):Q(`Trenne das Wort in Silben mit Bindestrichen: <b>${j}</b>`,w,{speak:j,hint:'z. B. Ka-tze',steps:`Richtig getrennt: <b>${w}</b>. Jede Silbe hat einen Vokal (a, e, i, o, u). Zwischen zwei Konsonanten trennst du: Kat-ze. Ein einzelner Konsonant geht zur nächsten Silbe: Ta-sche.`})};
const DK=[['Ball','Bal','nach kurzem Vokal doppelt: Bal-l-e / Ball'],['Kamm','Kam','Kamm: kurzer Vokal'],['Mutter','Muter','kurzer Vokal – Mut-ter'],['Sonne','Sone','kurzer Vokal – Son-ne'],['Bett','Bet','kurzer Vokal'],['Tanne','Tane','kurzer Vokal – Tan-ne'],['Himmel','Himel','kurzer Vokal – Him-mel'],['Teller','Teler','kurzer Vokal – Tel-ler'],['Schiff','Schif','kurzer Vokal'],['Mann','Man','kurzer Vokal'],['Affe','Afe','kurzer Vokal – Af-fe'],['Futter','Futer','kurzer Vokal – Fut-ter'],['Pille','Pile','kurzer Vokal – Pil-le'],['Löffel','Löfel','kurzer Vokal – Löf-fel'],['Mappe','Mape','kurzer Vokal – Map-pe']];
G.doppel=pairGen(DK,'Welches Wort ist richtig geschrieben?','Der Vokal ist kurz → der Konsonant wird doppelt.');
const DH=[['Zahn','Zan'],['Huhn','Hun'],['Bahn','Ban'],['Uhr','Ur'],['Sohn','Son'],['Stuhl','Stul'],['Kuh','Ku'],['Schuh','Schu'],['Jahr','Jar'],['Ohr','Or'],['Lehrer','Lerer'],['wohnen','wonen'],['fühlen','fülen'],['Zahl','Zal'],['Hahn','Han'],['Mehl','Mel'],['Sahne','Sane']];
G.dehnungh=pairGen(DH,'Welches Wort ist richtig geschrieben?','Langer Vokal – manchmal steht ein stummes Dehnungs-h.');
const IE=[['Biene','Bine'],['Wiese','Wise'],['Tier','Tir'],['Spiel','Spil'],['Ziege','Zige'],['Brief','Brif'],['Liebe','Libe'],['Fliege','Flige'],['Riese','Rise'],['Spiegel','Spigel'],['Ziel','Zil'],['Tiger','Tieger'],['Igel','Iegel'],['Biber','Bieber'],['Maschine','Maschiene'],['Fieber','Fiber']];
G.ie=pairGen(IE,'Welches Wort ist richtig geschrieben?','Langes i schreibt man meist ie – Ausnahmen: Tiger, Igel, Biber, Maschine …');
const AA=[['Haar','Har'],['Paar','Par'],['Saal','Sal'],['Meer','Mer'],['See','Se'],['Tee','Te'],['Boot','Bot'],['Moos','Mos'],['Zoo','Zo'],['Beere','Bere'],['Schnee','Schne'],['Klee','Kle'],['Waage','Wage'],['Aal','Al']];
G.aa=pairGen(AA,'Welches Wort ist richtig geschrieben?','Nur diese Wörter haben aa, ee, oo – lernen!');
const SS=[['Fuß','Fuss','ß nach langem Vokal'],['Straße','Strasse','ß nach langem Vokal'],['groß','gross','ß nach langem Vokal'],['heiß','heiss','ß nach Doppellaut ei'],['Spaß','Spass','ß nach langem Vokal'],['Fluss','Fluß','ss nach kurzem Vokal'],['Wasser','Waßer','ss nach kurzem Vokal'],['müssen','müßen','ss nach kurzem Vokal'],['essen','eßen','ss nach kurzem Vokal'],['Kuss','Kuß','ss nach kurzem Vokal'],['nass','naß','ss nach kurzem Vokal'],['Schloss','Schloß','ss nach kurzem Vokal'],['draußen','draussen','ß nach Doppellaut au'],['beißen','beissen','ß nach Doppellaut ei'],['Gruß','Gruss','ß nach langem Vokal']];
G.ss=pairGen(SS,'Welches Wort ist richtig geschrieben?','Kurzer Vokal → ss. Langer Vokal oder Doppellaut (ei, au, eu) → ß.');
const VL=[['Hun_','d','Hunde',['d','t']],['Ber_','g','Berge',['g','k']],['Kor_','b','Körbe',['b','p']],['Rad','d','Räder',['d','t']],['Ta_','g','Tage',['g','k']],['Wal_','d','Wälder',['d','t']],['Die_','b','Diebe',['b','p']],['Zu_','g','Züge',['g','k']],['Kin_','d','Kinder',['d','t']],['Sie_','g','Siege',['g','k']],['Gra_','b','Gräber',['b','p']],['Hem_','d','Hemden',['d','t']],['Ber_','g','Berge',['g','k']],['Bil_','d','Bilder',['d','t']],['Kal_','b','Kälber',['b','p']],['Zwer_','g','Zwerge',['g','k']]];
G.verlaengern=()=>{const v=pick(VL);return Q(`Verlängere das Wort! Welcher Buchstabe fehlt?<div class="big">${v[0]}</div><small>Tipp: Mehrzahl oder Verkleinerung: <i>${v[2]}</i></small>`,v[1],{kind:'choice',opts:v[3],speak:v[2],steps:`Verlängern: <b>${v[2]}</b> – hier hörst du das ${v[1]} deutlich. Also: ${v[0].replace('_','<b>'+v[1]+'</b>')}`})};
const AL=[['Bäume','Beume','Baum'],['Häuser','Heuser','Haus'],['Gänse','Gense','Gans'],['Äpfel','Epfel','Apfel'],['kälter','kelter','kalt'],['läuft','leuft','laufen'],['Mäuse','Meuse','Maus'],['Träume','Treume','Traum'],['Bäcker','Becker','backen'],['Nächte','Nechte','Nacht'],['Hände','Hende','Hand'],['Wälder','Welder','Wald'],['Männer','Menner','Mann'],['Räume','Reume','Raum'],['Bälle','Belle','Ball'],['Gärten','Gerten','Garten']];
G.ableiten=()=>{const p=pick(AL);return Q(`Leite ab: Welches Wort ist richtig?<br><small>(Verwandtes Wort: ${p[2]})</small>`,p[0],{kind:'choice',opts:shuffle([p[0],p[1]]),speak:p[0],steps:`Weil es von <b>${p[2]}</b> kommt, schreibt man <b>${p[0]}</b> (ä/äu ← a/au).`})};
const GROSS=[['Der Hund bellt laut.','Hund',['Hund','bellt','laut']],['Meine Katze schläft gern.','Katze',['Katze','schläft','gern']],['Wir spielen im Garten.','Garten',['spielen','Garten','im']],['Das Mädchen liest ein Buch.','Buch',['liest','Buch','ein']],['Die Sonne scheint hell.','Sonne',['Sonne','scheint','hell']],['Beim Essen redet niemand.','Essen',['Beim','Essen','redet']],['Der Mut des Jungen ist groß.','Mut',['Mut','groß','ist']],['Tom hat Angst im Dunkeln.','Angst',['hat','Angst','im']],['Mama kauft frisches Brot.','Brot',['kauft','frisches','Brot']],['Ich lerne für die Schule.','Schule',['lerne','für','Schule']]];
G.gross=()=>{const g=pick(GROSS),o=shuffle(g[2].map(w=>w.toLowerCase()));const ans=g[1].toLowerCase();return Q(`Welches Wort in diesem Satz ist ein <b>Nomen</b> (wird großgeschrieben)?<div class="big">${g[0].toLowerCase()}</div>`,ans,{kind:'choice',opts:o,steps:`<b>${g[1]}</b> ist ein Nomen: Es kann einen Artikel bekommen (der/die/das) und man kann es sehen oder fühlen. Richtig: ${g[0]}`})};
const BD=[['Bett','b'],['Dach','d'],['Baum','b'],['Dorf','d'],['Bad','b'],['Dose','d'],['Bein','b'],['Dame','d'],['Buch','b'],['Brot','b'],['Draht','d'],['Besen','b'],['Dackel','d'],['Boot','b'],['Dorn','d'],['Ball','b'],['Dusche','d'],['Biene','b'],['Dinosaurier','d'],['Banane','b']];
G.bd=()=>{const w=pick(BD),gap='_'+w[0].slice(1);return Q(`b oder d?<div class="big">${gap}</div>`,w[1],{kind:'choice',opts:['b','d'],speak:w[0],steps:`Richtig ist <b>${w[0]}</b>. Merkhilfe: Beide Fäuste mit Daumen nach oben: die linke Faust sieht aus wie ein <b>b</b>, die rechte wie ein <b>d</b> – zusammen ergibt es „<b>b</b>e<b>d</b>“ (Bett).`})};
G.wortfam=()=>{const f=pick([['fahren',['Fahrer','Fahrrad','Abfahrt'],'Farbe'],['spielen',['Spielzeug','Spieler','verspielt'],'Spiegel'],['lesen',['Leser','Lesebuch','vorlesen'],'Leder'],['schreiben',['Schreiber','Schreibtisch','Schrift'],'Schreck'],['wohnen',['Wohnung','Bewohner','Wohnzimmer'],'Wolke'],['backen',['Bäcker','Backofen','Gebäck'],'Bank']]);
  return Q(`Welches Wort gehört <b>nicht</b> zur Wortfamilie von <b>${f[0]}</b>?`,f[2],{kind:'choice',opts:shuffle([...f[1],f[2]]),steps:`Zur Familie „${f[0]}“ gehören: ${f[1].join(', ')}. Der <b>Wortstamm</b> bleibt gleich (${f[0].slice(0,4)}…). ${f[2]} gehört nicht dazu.`})};
const MERK=[['Hexe','Hekse'],['Taxi','Taksi'],['Axt','Akst'],['Text','Tekst'],['Quelle','Kwelle'],['Qualle','Kwalle'],['Mai','Mei'],['Hai','Hei'],['Kaiser','Keiser'],['Mais','Meis'],['quaken','kwaken'],['bequem','bekwem']];
G.merk=pairGen(MERK,'Welches Merkwort ist richtig geschrieben?','Merkwörter musst du dir einprägen: x, qu, ai.');
/* Grammatik */
const WA=[['Hund','Nomen'],['Freude','Nomen'],['Baum','Nomen'],['Zauberer','Nomen'],['Mut','Nomen'],['laufen','Verb'],['singt','Verb'],['schreibe','Verb'],['sprang','Verb'],['spielen','Verb'],['schnell','Adjektiv'],['klein','Adjektiv'],['gruselig','Adjektiv'],['blau','Adjektiv'],['lustig','Adjektiv'],['der','Artikel'],['eine','Artikel'],['das','Artikel'],['ich','Pronomen'],['sie','Pronomen'],['wir','Pronomen']];
G.wortarten=()=>{const w=pick(WA);return Q(`Welche Wortart ist <b>${w[0]}</b>?`,w[1],{kind:'choice',opts:['Nomen','Verb','Adjektiv','Artikel','Pronomen'],steps:`<b>${w[0]}</b> ist ein ${w[1]}. Nomen = Namenwort (großgeschrieben), Verb = Tunwort, Adjektiv = Wie-Wort, Artikel = Begleiter (der, die, das, ein), Pronomen = Stellvertreter (ich, du, er …).`})};
const NG=[['der','Tisch'],['die','Lampe'],['das','Fenster'],['der','Baum'],['die','Schule'],['das','Buch'],['der','Mond'],['die','Sonne'],['das','Kind'],['der','Hund'],['die','Katze'],['das','Pferd'],['der','Stuhl'],['die','Tür'],['das','Haus'],['der','Zauberer'],['die','Hexe'],['das','Gespenst']];
G.genus=()=>{const n=pick(NG);return Q(`Welcher Artikel passt? <div class="big">___ ${n[1]}</div>`,n[0],{kind:'choice',opts:['der','die','das'],speak:n[0]+' '+n[1],steps:`<b>${n[0]} ${n[1]}</b>. Probe: Ein Wort mit „der“ ist männlich (der/ein), „die“ weiblich (die/eine), „das“ sächlich (das/ein).`})};
const PLD=[['Baum','Bäume'],['Haus','Häuser'],['Kind','Kinder'],['Hund','Hunde'],['Katze','Katzen'],['Buch','Bücher'],['Ball','Bälle'],['Maus','Mäuse'],['Auto','Autos'],['Apfel','Äpfel'],['Tür','Türen'],['Blume','Blumen'],['Stuhl','Stühle'],['Zahn','Zähne'],['Hand','Hände'],['Fisch','Fische'],['Lehrer','Lehrer'],['Mädchen','Mädchen'],['Ei','Eier'],['Wald','Wälder']];
G.plural_de=()=>{const p=pick(PLD);return Q(`Bilde die <b>Mehrzahl</b> (Plural): <div class="big">das/der/die ${p[0]}</div>`,[p[1],'die '+p[1]],{speak:p[1],steps:`Einzahl: ${p[0]} → Mehrzahl: <b>${p[1]}</b>`})};
const FALL=[['Der Hund bellt.','Der Hund','Nominativ'],['Ich sehe den Hund.','den Hund','Akkusativ'],['Mia hilft ihrem Bruder.','ihrem Bruder','Dativ'],['Das ist das Haus meines Onkels.','meines Onkels','Genitiv'],['Tom kauft einen Ball.','einen Ball','Akkusativ'],['Die Katze schläft.','Die Katze','Nominativ'],['Er gibt der Lehrerin das Heft.','der Lehrerin','Dativ'],['Er gibt der Lehrerin das Heft.','das Heft','Akkusativ'],['Das ist der Hut des Zauberers.','des Zauberers','Genitiv'],['Wir danken dem Koch.','dem Koch','Dativ'],['Lena liest ein Buch.','ein Buch','Akkusativ'],['Das Buch der Schülerin liegt hier.','der Schülerin','Genitiv']];
G.faelle=()=>{const f=pick(FALL),fr={Nominativ:'Wer oder was? (Wer bellt? Der Hund)',Genitiv:'Wessen?',Dativ:'Wem?',Akkusativ:'Wen oder was?'}[f[2]];
  return Q(`In welchem <b>Fall</b> steht <b>${f[1]}</b>?<div class="big">${f[0]}</div>`,f[2],{kind:'choice',opts:['Nominativ','Genitiv','Dativ','Akkusativ'],steps:`Frage: <b>${fr}</b> → ${f[2]}. (1. Fall Wer/Was? · 2. Fall Wessen? · 3. Fall Wem? · 4. Fall Wen/Was?)`})};
const PRO=[['Mia singt.','Sie singt.'],['Der Hund bellt.','Er bellt.'],['Das Kind lacht.','Es lacht.'],['Tom und ich spielen.','Wir spielen.'],['Mama und Papa kochen.','Sie kochen.'],['Der Lehrer schreibt.','Er schreibt.'],['Die Katze schläft.','Sie schläft.'],['Das Buch liegt hier.','Es liegt hier.']];
G.pronomen=()=>{const p=pick(PRO);return Q(`Ersetze die Wörter am Satzanfang durch ein <b>Personalpronomen</b>:<div class="big">${p[0]}</div>`,p[1],{steps:`Personalpronomen: ich, du, er/sie/es, wir, ihr, sie. → ${p[1]}`})};
const VB={spielen:['spiele','spielst','spielt','spielen','spielt','spielen'],lachen:['lache','lachst','lacht','lachen','lacht','lachen'],kaufen:['kaufe','kaufst','kauft','kaufen','kauft','kaufen'],lernen:['lerne','lernst','lernt','lernen','lernt','lernen'],laufen:['laufe','läufst','läuft','laufen','lauft','laufen'],fahren:['fahre','fährst','fährt','fahren','fahrt','fahren'],lesen:['lese','liest','liest','lesen','lest','lesen'],sehen:['sehe','siehst','sieht','sehen','seht','sehen'],schlafen:['schlafe','schläfst','schläft','schlafen','schlaft','schlafen'],essen:['esse','isst','isst','essen','esst','essen'],sein:['bin','bist','ist','sind','seid','sind'],haben:['habe','hast','hat','haben','habt','haben']};
const PER=['ich','du','er','wir','ihr','sie (Mehrzahl)'];
G.konjug=()=>{const v=pick(Object.keys(VB)),i=R(0,5);return Q(`Setze die richtige Personalform ein:<div class="big">${PER[i]} ___ (${v})</div>`,VB[v][i],{steps:`${PER[i]} <b>${VB[v][i]}</b>. Manche Verben ändern den Stammvokal (laufen → du läufst, lesen → du liest).`,speak:PER[i]+' '+VB[v][i]})};
const ZF=[['spielen','spielte','hat gespielt'],['lachen','lachte','hat gelacht'],['gehen','ging','ist gegangen'],['fahren','fuhr','ist gefahren'],['essen','aß','hat gegessen'],['sehen','sah','hat gesehen'],['laufen','lief','ist gelaufen'],['schreiben','schrieb','hat geschrieben'],['kommen','kam','ist gekommen'],['singen','sang','hat gesungen'],['lesen','las','hat gelesen'],['schwimmen','schwamm','ist geschwommen']];
G.zeiten=()=>{const z=pick(ZF),t=R(0,2);
  if(t===0)return Q(`<b>Präteritum</b> (3. Person Einzahl): er/sie/es ___ (${z[0]})`,z[1],{steps:`Präteritum: <b>${z[1]}</b> („Er ${z[1]} nach Hause.“)`});
  if(t===1)return Q(`<b>Perfekt</b>: er/sie/es ___ ___ (${z[0]})<br><small>z. B. hat gespielt / ist gegangen</small>`,z[2],{steps:`Perfekt = haben/sein + Partizip II: <b>${z[2]}</b>. Mit „sein“ bei Bewegung (gehen, fahren, laufen, kommen, schwimmen).`});
  return Q(`<b>Futur</b>: er/sie/es ___ ___ (${z[0]})<br><small>z. B. wird spielen</small>`,'wird '+z[0],{steps:`Futur = <b>wird</b> + Grundform: wird ${z[0]}`})};
const ADJ=[['schnell','schneller','am schnellsten'],['groß','größer','am größten'],['klein','kleiner','am kleinsten'],['stark','stärker','am stärksten'],['alt','älter','am ältesten'],['jung','jünger','am jüngsten'],['gut','besser','am besten'],['viel','mehr','am meisten'],['gern','lieber','am liebsten'],['hoch','höher','am höchsten'],['lang','länger','am längsten'],['warm','wärmer','am wärmsten'],['kalt','kälter','am kältesten'],['nah','näher','am nächsten']];
G.steigern=()=>{const a=pick(ADJ);return R(0,1)?Q(`<b>Komparativ</b> (1. Steigerung) von <b>${a[0]}</b>:`,a[1],{steps:`${a[0]} – <b>${a[1]}</b> – ${a[2]}`}):Q(`<b>Superlativ</b> (2. Steigerung) von <b>${a[0]}</b>: <small>(z. B. am schnellsten)</small>`,[a[2],a[2].replace('am ','')],{steps:`${a[0]} – ${a[1]} – <b>${a[2]}</b>`})};
const SA=[['Der Hund bellt.','Aussagesatz'],['Wo wohnst du?','Fragesatz'],['Komm bitte her!','Aufforderungssatz'],['Das ist ja toll!','Ausrufesatz'],['Ich gehe zur Schule.','Aussagesatz'],['Hast du Hunger?','Fragesatz'],['Mach die Tür zu!','Aufforderungssatz'],['Wie schön das ist!','Ausrufesatz']];
G.satzarten=()=>{const s=pick(SA);return Q(`Welche <b>Satzart</b> ist das?<div class="big">${s[0]}</div>`,s[1],{kind:'choice',opts:['Aussagesatz','Fragesatz','Aufforderungssatz','Ausrufesatz'],steps:`${s[1]}: Aussage → Punkt. Frage → Fragezeichen. Aufforderung → Ausrufezeichen/Punkt. Ausruf → Ausrufezeichen.`})};
const SG=[[['Der Hund','jagt','die Katze','im Garten'],['Subjekt','Prädikat','Akkusativobjekt','Adverbiale']],[['Mia','schenkt','ihrem Bruder','ein Buch'],['Subjekt','Prädikat','Dativobjekt','Akkusativobjekt']],[['Heute','spielen','wir','Fußball'],['Adverbiale','Prädikat','Subjekt','Akkusativobjekt']],[['Der Zauberer','zaubert','einen Hasen','aus dem Hut'],['Subjekt','Prädikat','Akkusativobjekt','Adverbiale']],[['Die Kinder','laufen','schnell','nach Hause'],['Subjekt','Prädikat','Adverbiale','Adverbiale']]];
G.satzglieder=()=>{const s=pick(SG),i=R(0,3);const opts=['Subjekt','Prädikat','Akkusativobjekt','Dativobjekt','Adverbiale'];return Q(`Welches <b>Satzglied</b> ist <b>${s[0][i]}</b>?<div class="big">${s[0].join(' ')}.</div>`,s[1][i],{kind:'choice',opts,steps:`Subjekt: Wer oder was? · Prädikat: Was tut …? · Akkusativobjekt: Wen oder was? · Dativobjekt: Wem? · Adverbiale: Wo? Wann? Wie? Warum? → ${s[1][i]}`})};
const KOMP=[['Haus','Tür','die','Haustür'],['Hand','Schuh','der','Handschuh'],['Zahn','Bürste','die','Zahnbürste'],['Apfel','Baum','der','Apfelbaum'],['Fuß','Ball','der','Fußball'],['Buch','Regal','das','Buchregal'],['Wasser','Glas','das','Wasserglas'],['Schul','Tasche','die','Schultasche'],['Zauber','Stab','der','Zauberstab'],['Hand','Tasche','die','Handtasche'],['Kinder','Zimmer','das','Kinderzimmer'],['Tisch','Bein','das','Tischbein']];
G.kompos=()=>{const k=pick(KOMP);return Q(`Setze zusammen: <div class="big">${k[0]} + ${k[1]} = ?</div><small>Mit oder ohne Artikel</small>`,[k[3],k[2]+' '+k[3]],{steps:`<b>${k[2]} ${k[3]}</b>. Das letzte Wort (${k[1]}) bestimmt den Artikel und die Wortart.`})};
const ST=(q,a,steps)=>({q,a,kind:'choice',steps});
const WR=[['Welcher Satz ist richtig?',`Tom fragt: „Kommst du mit?“`,[`Tom fragt „Kommst du mit.“`,`Tom fragt: Kommst du mit?`],'Nach dem Begleitsatz steht ein <b>Doppelpunkt</b>, die wörtliche Rede steht in „Anführungszeichen“.'],['Welcher Satz ist richtig?',`„Ich habe Hunger“, sagt Lena.`,[`„Ich habe Hunger.“, sagt Lena.`,`Ich habe Hunger, sagt Lena.`],'Steht der Begleitsatz <b>hinter</b> der wörtlichen Rede, entfällt der Punkt und es steht ein <b>Komma</b> hinter den Anführungszeichen.'],['Welcher Satz ist richtig?',`Der Lehrer ruft: „Setzt euch!“`,[`Der Lehrer ruft „Setzt euch“!`,`Der Lehrer ruft: „Setzt euch“.`],'Ausrufe- und Fragezeichen bleiben <b>innerhalb</b> der Anführungszeichen.'],['Welcher Satz ist richtig?',`„Wo bist du?“, fragt Papa.`,[`„Wo bist du“, fragt Papa?`,`„Wo bist du?“ fragt Papa.`],'Das Fragezeichen bleibt in der wörtlichen Rede, danach steht trotzdem ein Komma.'],['Welcher Satz ist richtig?',`„Komm schnell“, flüstert Mia, „sonst sehen sie uns!“`,[`„Komm schnell“, flüstert Mia „sonst sehen sie uns!“`,`„Komm schnell.“ flüstert Mia, „sonst sehen sie uns!“`],'Wird die wörtliche Rede unterbrochen, setzt du vor und nach dem Begleitsatz ein Komma.']];
G.rede=()=>{const w=pick(WR);return Q(w[0],w[1],{kind:'choice',opts:shuffle([w[1],...w[2]]),steps:w[3]})};
const KM=[['Ich kaufe Äpfel, Birnen und Bananen.',['Ich kaufe Äpfel Birnen, und Bananen.','Ich kaufe, Äpfel, Birnen und Bananen.'],'Bei Aufzählungen steht ein Komma, aber <b>nicht vor „und“ / „oder“</b>.'],['Wir spielen Fußball, aber es regnet.',['Wir spielen Fußball aber, es regnet.','Wir spielen, Fußball aber es regnet.'],'Vor <b>aber, denn, sondern</b> steht ein Komma.'],['Ich glaube, dass er kommt.',['Ich glaube dass er kommt.','Ich glaube dass, er kommt.'],'Vor <b>dass</b> steht immer ein Komma.'],['Er bleibt zu Hause, weil er krank ist.',['Er bleibt zu Hause weil er krank ist.','Er bleibt, zu Hause weil er krank ist.'],'Vor <b>weil</b> steht immer ein Komma.'],['Es gibt rote, gelbe und grüne Bälle.',['Es gibt rote gelbe, und grüne Bälle.','Es gibt, rote gelbe und grüne Bälle.'],'Aufzählung: Kommas zwischen den Wörtern, vor „und“ keines.']];
G.komma=()=>{const k=pick(KM);return Q('Wo steht das Komma richtig?',k[0],{kind:'choice',opts:shuffle([k[0],...k[1]]),steps:k[2]})};
const OP=[['nenne','Begriffe ohne Erklärung aufzählen'],['beschreibe','genau und sachlich sagen, wie etwas aussieht oder abläuft'],['erkläre','Gründe angeben (Warum?)'],['vergleiche','Gemeinsamkeiten und Unterschiede aufschreiben'],['begründe','mit „weil“ oder „denn“ eine Begründung angeben'],['fasse zusammen','das Wichtigste kurz in eigenen Worten wiedergeben'],['erzähle','spannend und anschaulich ein Geschehen erzählen']];
G.operatoren=()=>{const o=pick(OP),opts=shuffle([o[1],...shuffle(OP.filter(x=>x!==o)).slice(0,3).map(x=>x[1])]);return Q(`Was bedeutet der Arbeitsauftrag <b>„${o[0]}“</b>?`,o[1],{kind:'choice',opts,steps:`„${o[0]}“ = ${o[1]}.`})};
const DEU=[
{t:'Rechtschreibung',i:'✏️',tp:[
 T('d-abc','Nachschlagen mit dem Abc','abc alphabet wörterbuch nachschlagen alphabetisch ordnen',[
  ['Das Abc','A B C D E F G H I J K L M N O P Q R S T U V W X Y Z<br>Im Wörterbuch stehen die Wörter nach dem Abc.'],
  ['Zweiter und dritter Buchstabe','Haben zwei Wörter denselben Anfangsbuchstaben, entscheidet der <b>zweite</b>: <i>Baum</i> kommt vor <i>Bett</i> (a vor e). Bei gleichem zweiten Buchstaben der dritte …'],
  ['Hilfen im Wörterbuch','Auf jeder Seite oben stehen <b>Leitwörter</b> (erstes und letztes Wort der Seite). Verben suchst du in der <b>Grundform</b> (läuft → laufen), Nomen in der <b>Einzahl</b> (Häuser → Haus).']
 ],{trick:'Sprich das Abc leise mit, bis du zum Buchstaben kommst.',gen:'abc'}),
 T('d-silben','Wörter in Silben mitsprechen','silben klatschen trennen silbentrennung',[
  ['Silben klatschen','Jedes Wort besteht aus Silben (Sprechstücken). Klatsche mit: <b>Schmet-ter-ling</b> = 3 Silben. Jede Silbe hat mindestens einen Vokal.'],
  ['Trennen','Zwischen zwei Konsonanten: <b>Kat-ze</b>, <b>Ham-mer</b>. Ein einzelner Konsonant geht zur nächsten Silbe: <b>Ta-sche</b>, <b>Ba-na-ne</b>. Aus „st“ wird nicht getrennt: Fen-ster.'],
  ['Silbenbögen','Schwierige Wörter schreibst du in Silben und setzt Bögen darunter, dann wird die Rechtschreibung sichtbar.']
 ],{trick:'Sprich mit Mund-Klatschen: Jede Silbe = ein Klatscher.',gen:'silben'}),
 T('d-doppel','Wörter mit doppeltem Konsonanten','doppelkonsonant doppelt kurzer vokal ball mutter',[
  ['Kurzer Vokal → doppelter Konsonant','Nach einem <b>kurzen</b> Vokal steht oft ein <b>doppelter</b> Mitlaut: Ball, Mut-ter, Son-ne, Bett. Du hörst: Ba-ll → Ball.'],
  ['Probe','Sprich das Wort in Silben: Ta-ne? oder Tan-ne? Wenn die erste Silbe auf Konsonant endet und der Vokal kurz klingt → doppelt: <b>Tan-ne</b>.'],
  ['Aber','k wird nicht kk, z nicht zz – dafür gibt es <b>ck</b> (Bäcker) und <b>tz</b> (Katze).']
 ],{trick:'Kurzer Vokal, doppelter Mitlaut – lang gesprochener Vokal: einfacher Mitlaut.',gen:'doppel'}),
 T('d-dehnung','Wörter mit Dehnungs-h','dehnungs-h stummes h zahn uhr bahn sohn',[
  ['Das stumme h','Bei manchen Wörtern mit langem Vokal steht ein <b>h</b> hinter dem Vokal, das man nicht hört: Zahn, Bahn, Uhr, Sohn, Stuhl, Jahr.'],
  ['Wann?','Meist vor l, m, n, r: <b>Stuhl, Lehm, Bahn, Uhr</b>. Merke dir Wortfamilien: Zahn – Zähne.'],
  ['Silbentrennendes h','Es steht in der Mitte: ge-hen, se-hen, Kü-he. Man hört es, wenn man das Wort verlängert.']
 ],{gen:'dehnungh'}),
 T('d-ie','Wörter mit ie','ie langes i biene wiese tier spiel',[
  ['ie = langes i','Das lange „i“ schreibt man meistens <b>ie</b>: Biene, Wiese, Tier, Spiel, Brief.'],
  ['Ausnahmen','Mit einfachem langen i: <b>Tiger, Igel, Biber, Maschine, Kino, Krokodil</b> – das sind Merkwörter!']
 ],{trick:'Meistens ie – Ausnahmen lernen!',gen:'ie'}),
 T('d-aa','Wörter mit aa, ee, oo','aa ee oo doppelvokal haar meer boot',[
  ['Doppelvokale','Nur wenige Wörter haben doppelte Vokale: <b>Haar, Paar, Saal, Meer, See, Tee, Boot, Moos, Zoo</b>. Diese Wörter solltest du dir merken.'],
  ['Wortfamilien','Auch verwandte Wörter behalten den Doppelvokal: Meer – Meere, Boot – Boote.']
 ],{gen:'aa'}),
 T('d-ss','Wörter mit ss oder ß','ss ß eszett scharfes s fuß straße fluss',[
  ['Die Regel','Nach einem <b>kurzen</b> Vokal schreibst du <b>ss</b>: Fluss, Wasser, müssen, essen.<br>Nach einem <b>langen</b> Vokal oder einem <b>Doppellaut</b> (ei, au, eu, äu) schreibst du <b>ß</b>: Fuß, Straße, heiß, draußen.'],
  ['Probe','Sprich das Wort: Höre den Vokal – kurz oder lang? Fluss (kurz) – Fuß (lang).']
 ],{trick:'Kurz: ss. Lang: ß.',gen:'ss'}),
 T('d-s-laute','s-Laute zum Klingen bringen','s laute stimmhaft stimmlos klingen s ss ß',[
  ['Stimmhaft oder stimmlos?','Das einzelne <b>s</b> kann summen (stimmhaft): Rose, Hase, lesen. Stimmloses s zischt: ss/ß.'],
  ['So findest du es heraus','Verlängere das Wort: Haus → Häuser (summt: s). Haus bleibt s.']
 ],{gen:'ss'}),
 T('d-verlaengern','Verlängern: b/p, d/t, g/k im Auslaut','verlängern auslaut b p d t g k hund berg korb',[
  ['Das Problem','Am Wortende klingen b und p, d und t, g und k gleich: Hun<b>d</b> oder Hun<b>t</b>? Berg oder Berk?'],
  ['Die Lösung','<b>Verlängere</b> das Wort, dann hörst du den Laut: Hund → Hun<b>d</b>e → d! · Berg → Ber<b>g</b>e → g! · Korb → Kör<b>b</b>e → b!'],
  ['Wie verlängern?','Nomen: Mehrzahl (Hund – Hunde). Verben: Grundform (er liegt → liegen). Adjektive: Steigerung (rund → runder).']
 ],{trick:'Verlängern, verlängern, verlängern – dann hörst du den richtigen Buchstaben.',gen:'verlaengern'}),
 T('d-ableiten','Ableiten: ä/äu von a/au','ableiten ä äu e eu bäume häuser stammwort',[
  ['Die Regel','Wenn du ein verwandtes Wort mit <b>a</b> oder <b>au</b> findest, schreibst du <b>ä</b> oder <b>äu</b>: B<b>ä</b>ume ← B<b>a</b>um · H<b>äu</b>ser ← H<b>au</b>s · k<b>ä</b>lter ← k<b>a</b>lt.'],
  ['Ausnahmen','Merkwörter ohne Ableitung: Eltern, Käfer, Lärm, Träne. Sonst gilt die Regel.']
 ],{trick:'Suche das verwandte Wort mit a / au.',gen:'ableiten'}),
 T('d-trennen','Wörter richtig trennen','trennen silbentrennung zeilenende',[
  ['Am Zeilenende','Trenne nach Silben: Ka-tze, Fen-ster. Einzelne Buchstaben am Anfang oder Ende lässt man nicht allein stehen (nicht „A-bend“ am Zeilenende – besser „A-bend“ ganz oder „Abend“).']
 ],{gen:'silben'}),
 T('d-gross','Nomen an ihren Signalwörtern erkennen','nomen großschreibung signalwörter artikel großschreiben substantiv',[
  ['Nomen schreibt man groß','Nomen sind Namenwörter für Menschen, Tiere, Pflanzen, Dinge – und für Gedanken (Freude, Mut, Angst).'],
  ['Signalwörter','Vor Nomen stehen oft: <b>Artikel</b> (der, die, das, ein, eine), <b>Possessive</b> (mein, dein), <b>Präposition + Artikel</b> (im, am, beim, zum) oder <b>Adjektive</b>. Auch die Endungen <b>-ung, -heit, -keit, -nis, -schaft</b> zeigen Nomen.'],
  ['Probe','Kannst du „ein / eine / das“ davor setzen? Dann schreibst du es groß: <i>das Lachen</i> (aus „lachen“).']
 ],{trick:'Mit „der, die, das“ davor? Dann großschreiben!',gen:'gross'}),
 T('d-anrede','Anredepronomen richtig schreiben','anrede sie ihnen du dein briefe großschreiben pronomen',[
  ['Du und ihr im Brief','Im Brief schreibst du <b>du, dein, ihr, euch</b> klein (seit der Reform erlaubt auch groß – klein ist üblich). <b>Sie, Ihnen, Ihr</b> (höflich) schreibst du <b>groß</b>.'],
  ['Beispiele','Lieber Tom, ich habe <b>dir</b> geschrieben. · Sehr geehrte Frau Meyer, ich danke <b>Ihnen</b>.']
 ],{ex:[
  X('Welcher Satz ist höflich und richtig?','Ich danke Ihnen.','',['Ich danke ihnen.','Ich danke Ihnen.','Ich danke IHNEN.']),
  X('Sehr geehrte Frau Berger, wie geht es ___? (höfliche Anrede)','Ihnen','',['ihnen','Ihnen','dir'])]}),
 T('d-b-d','b oder d? – Merkhilfen','b d verwechseln bett merkhilfe lrs lesen schreiben',[
  ['Bett-Hände','Strecke beide Daumen nach oben und balle beide Hände zu Fäusten. Halte die Hände mit den Rücken zu dir. Die <b>linke</b> Hand bildet ein <b>b</b>, die <b>rechte</b> ein <b>d</b>. Zusammen heißt es: <b>b e d</b> (Bett).'],
  ['Schreibreihenfolge','<b>b</b>: erst der Stab von oben nach unten, dann der Bauch nach rechts. <b>d</b>: erst der Bogen (wie ein c), dann der Stab nach oben und hinunter.'],
  ['Sprich mit','<b>b</b> ist weich und lässt die Lippen zusammen („b“-brrr). <b>d</b> spricht die Zunge hinter den Zähnen (d).'],
  ['Wörter aufsagen','<b>b</b>: Bett, Baum, Buch · <b>d</b>: Dach, Dorf, Dose. Sprich das Wort laut, tippe 🔊 zum Hören.']
 ],{trick:'Daumen hoch, Fäuste zusammen: links b, rechts d – „BeD“.',gen:'bd'})
]},
{t:'Wortarten & Wortbildung',i:'🔤',tp:[
 T('d-wortarten','Wortarten','wortarten nomen verb adjektiv artikel pronomen namenwort tunwort wiewort',[
  ['Nomen (Namenwort)','Menschen, Tiere, Pflanzen, Dinge, Gedanken – <b>immer groß</b>: der Hund, die Freude.'],
  ['Verb (Tunwort)','Was passiert? <b>laufen, schreibt, sprang</b>. Verben verändern sich: ich laufe, du läufst.'],
  ['Adjektiv (Wiewort)','Wie ist etwas? <b>klein, schnell, gruselig</b>. Man kann sie steigern.'],
  ['Artikel und Pronomen','Artikel begleiten Nomen: <b>der, die, das, ein, eine</b>. Pronomen stehen für Nomen: <b>ich, du, er, sie, es, wir, ihr, sie</b>.']
 ],{trick:'Probe: Nomen kann man oft in die Mehrzahl setzen, Verben konjugieren, Adjektive steigern.',gen:'wortarten'}),
 T('d-genus','Das grammatische Geschlecht der Nomen','genus der die das artikel geschlecht',[
  ['Drei Artikel','<b>der</b> (männlich), <b>die</b> (weiblich), <b>das</b> (sächlich). Beispiel: der Tisch, die Lampe, das Fenster.'],
  ['Nicht logisch!','Das Geschlecht passt nicht immer zur Wirklichkeit: <i>das Mädchen</i>, <i>die Sonne</i>. Lerne Nomen immer <b>mit Artikel</b>.']
 ],{trick:'Wortschatz immer mit Artikel lernen: „der Mond“, nie nur „Mond“.',gen:'genus'}),
 T('d-plural','Singular und Plural von Nomen bilden','plural singular mehrzahl einzahl',[
  ['Einzahl und Mehrzahl','Singular = Einzahl (ein Baum), Plural = Mehrzahl (zwei Bäume).'],
  ['Endungen','-e (Hund → Hunde), -en (Blume → Blumen), -er (Kind → Kinder), -s (Auto → Autos), oder gleich (Lehrer → Lehrer). Oft mit Umlaut: Baum → Bäume, Haus → Häuser.']
 ],{gen:'plural_de'}),
 T('d-faelle','Nomen im richtigen Fall verwenden','fälle kasus nominativ genitiv dativ akkusativ wer wessen wem wen',[
  ['Vier Fälle','1. <b>Nominativ</b> – Wer oder was? (Der Hund bellt.)<br>2. <b>Genitiv</b> – Wessen? (Das ist das Haus des Onkels.)<br>3. <b>Dativ</b> – Wem? (Ich helfe dem Kind.)<br>4. <b>Akkusativ</b> – Wen oder was? (Ich sehe den Hund.)'],
  ['Frageprobe','Stelle die passende Frage zum unterstrichenen Wort und finde den Fall.'],
  ['Artikel ändern sich','der Hund – des Hundes – dem Hund – den Hund']
 ],{trick:'Wer-wessen-wem-wen: 1-2-3-4.',gen:'faelle'}),
 T('d-pronomen','Personalpronomen einsetzen','personalpronomen ich du er sie es wir ihr ersetzen',[
  ['Die Personalpronomen','<table class="tbl"><tr><th>ich</th><th>du</th><th>er / sie / es</th></tr><tr><th>wir</th><th>ihr</th><th>sie</th></tr></table>'],
  ['Ersetzen','Pronomen verhindern Wiederholungen: Mia singt. <b>Sie</b> singt laut. · Der Hund bellt. <b>Er</b> bellt laut.']
 ],{gen:'pronomen'}),
 T('d-personalform','Personalformen des Verbs verwenden','verb personalform konjugieren ich du er wir ihr sie',[
  ['Konjugieren','Das Verb ändert seine Endung: ich spiel<b>e</b>, du spiel<b>st</b>, er/sie/es spiel<b>t</b>, wir spiel<b>en</b>, ihr spiel<b>t</b>, sie spiel<b>en</b>.'],
  ['Unregelmäßig','Manche Verben wechseln den Vokal: laufen → du läufst · lesen → du liest · fahren → du fährst · sein → ich bin, du bist, er ist.']
 ],{gen:'konjug'}),
 T('d-zeiten','Präsens, Präteritum, Perfekt und Futur','zeitformen präsens präteritum perfekt futur vergangenheit zukunft',[
  ['Präsens','jetzt: Er <b>spielt</b>.'],
  ['Präteritum','Erzählvergangenheit (in Geschichten): Er <b>spielte</b>. Er <b>ging</b>.'],
  ['Perfekt','Gesprochene Vergangenheit: Er <b>hat gespielt</b>. Er <b>ist gegangen</b>.'],
  ['Futur','Zukunft: Er <b>wird spielen</b>.']
 ],{trick:'Geschichten schreibt man im Präteritum, im Gespräch benutzt man Perfekt.',gen:'zeiten'}),
 T('d-adjektive','Adjektive steigern und vergleichen','adjektive steigern komparativ superlativ vergleichen',[
  ['Drei Stufen','Grundstufe: schnell · <b>Komparativ</b>: schnell<b>er</b> · <b>Superlativ</b>: am schnell<b>sten</b>.'],
  ['Mit Umlaut','groß – größer – am größten · alt – älter – am ältesten'],
  ['Ganz unregelmäßig','gut – <b>besser</b> – am <b>besten</b> · viel – <b>mehr</b> – am <b>meisten</b> · gern – <b>lieber</b> – am <b>liebsten</b>'],
  ['Vergleichen','Du bist <b>so</b> schnell <b>wie</b> ich. Du bist schnell<b>er als</b> ich.']
 ],{gen:'steigern'}),
 T('d-komposita','Wortzusammensetzungen kennen','zusammensetzung kompositum wortbildung grundwort bestimmungswort',[
  ['Zusammengesetzte Nomen','Aus zwei Wörtern wird ein neues: Haus + Tür = <b>die Haustür</b>.'],
  ['Der Artikel kommt vom letzten Wort','<b>die</b> Tür → die Haustür · <b>der</b> Ball → der Fußball.'],
  ['Fugen','Manchmal steht ein Buchstabe dazwischen: Sonne<b>n</b>brille, Geburtstag<b>s</b>kuchen.']
 ],{gen:'kompos'}),
 T('d-wortfamilien','Wortfamilien haben Gemeinsamkeiten','wortfamilie wortstamm verwandte wörter',[
  ['Wortstamm','Wörter mit demselben <b>Wortstamm</b> gehören zu einer Familie: <i>fahren, Fahrer, Fahrrad, Abfahrt</i>.'],
  ['Wozu?','Du kannst die Schreibweise ableiten: Wenn du weißt, dass <i>Fahrrad</i> zu <i>fahren</i> gehört, schreibst du das h.']
 ],{gen:'wortfam'}),
 T('d-merkwoerter','Merkwörter','merkwörter ai x qu hexe taxi quelle',[
  ['x und qu','<b>x</b>: Hexe, Taxi, Axt, Text · <b>qu</b>: Quelle, Qualle, quaken, bequem (q gibt es nur mit u!).'],
  ['ai oder ei?','Die meisten Wörter haben <b>ei</b>. Nur wenige mit <b>ai</b>: Mai, Hai, Kaiser, Mais, Laib, Saite (Gitarre) – <i>Seite</i> (Buch) ist mit ei!']
 ],{gen:'merk'})
]},
{t:'Sätze und Zeichen',i:'❗',tp:[
 T('d-satzarten','Satzarten','satzarten aussagesatz fragesatz aufforderungssatz ausrufesatz satzzeichen',[
  ['Vier Satzarten','<b>Aussagesatz</b> → Punkt (Ich gehe.)<br><b>Fragesatz</b> → Fragezeichen (Gehst du?)<br><b>Aufforderungssatz</b> → Punkt/Ausrufezeichen (Geh!)<br><b>Ausrufesatz</b> → Ausrufezeichen (Wie toll!)']
 ],{gen:'satzarten'}),
 T('d-satzglieder','Satzglieder: Subjekt, Prädikat, Objekt, Adverbiale','satzglieder subjekt prädikat objekt adverbiale satzglied umstellprobe ersatzprobe erweiterungsprobe',[
  ['Satzglieder finden','Die <b>Umstellprobe</b> zeigt, was zusammengehört: <i>Der Hund | jagt | die Katze | im Garten.</i> → <i>Im Garten jagt der Hund die Katze.</i> Was zusammen wandert, ist ein Satzglied.'],
  ['Subjekt & Prädikat','Das <b>Prädikat</b> ist das Verb (Was tut …?). Das <b>Subjekt</b> fragst du mit „Wer oder was + Prädikat?“ → Wer jagt? <i>Der Hund</i>.'],
  ['Objekte','<b>Akkusativobjekt</b>: Wen oder was jagt der Hund? <i>die Katze</i>. <b>Dativobjekt</b>: Wem gibt …? <i>dem Bruder</i>.'],
  ['Adverbiale','Sagen Ort, Zeit, Art und Grund: <i>im Garten</i> (Wo?), <i>heute</i> (Wann?), <i>schnell</i> (Wie?), <i>weil es regnet</i> (Warum?).']
 ],{trick:'Erst das Prädikat suchen, dann das Subjekt, dann die Objekte.',gen:'satzglieder'}),
 T('d-redezeichen','Zeichen der wörtlichen Rede setzen','wörtliche rede anführungszeichen redezeichen begleitsatz doppelpunkt komma',[
  ['Wörtliche Rede','Was jemand sagt, steht in „Anführungszeichen“: Tom sagt: „Ich komme gleich.“'],
  ['Begleitsatz davor','Tom fragt: „Kommst du mit?“ (Doppelpunkt vor der Rede)'],
  ['Begleitsatz dahinter','„Ich komme gleich“, sagt Tom. (Kein Punkt, aber Komma nach „)'],
  ['Begleitsatz dazwischen','„Komm schnell“, flüstert Mia, „sonst sehen sie uns!“']
 ],{trick:'Vorne Doppelpunkt, hinten Komma.',gen:'rede'}),
 T('d-komma','Kommas bei Aufzählungen und Nebensätzen','komma aufzählung nebensatz weil dass aber denn',[
  ['Aufzählung','Zwischen gleichartigen Wörtern steht ein Komma: Äpfel, Birnen und Bananen. <b>Vor „und“ und „oder“ kein Komma.</b>'],
  ['Vor aber, denn, sondern','Wir spielen Fußball, <b>aber</b> es regnet.'],
  ['Vor weil, dass, wenn','Ich glaube<b>,</b> dass er kommt. Er bleibt zu Hause<b>,</b> weil er krank ist.']
 ],{trick:'Komma vor: aber, denn, weil, dass, wenn.',gen:'komma'})
]},
{t:'Texte schreiben & Lesen',i:'📖',tp:[
 T('d-erzaehlen','Erzählen: Plan und Aufbau','erzählen erzählplan einleitung hauptteil schluss spannung höhepunkt geschichte schreiben',[
  ['Der Erzählplan','<b>Einleitung</b>: Wer? Wo? Wann? · <b>Hauptteil</b>: Was passiert? Spannung steigt bis zum <b>Höhepunkt</b> · <b>Schluss</b>: Wie geht es aus?'],
  ['Spannend erzählen','Benutze <b>Präteritum</b>, wörtliche Rede, treffende Verben (flüstern, rennen) und Adjektive (gruselig, finster). Überschrift nicht vergessen!'],
  ['Gespenstergeschichte','Beginne mit dem Ort (altes Schloss), baue Geräusche und Schatten ein, löse am Ende überraschend auf.']
 ],{trick:'Show, don\'t tell: Statt „Er hatte Angst.“ besser „Seine Knie zitterten.“'}),
 T('d-inhalt','Inhalt zusammenfassen','inhaltsangabe zusammenfassung präsens w-fragen',[
  ['Inhaltsangabe','Fasse kurz zusammen, <b>was passiert</b>. Schreibe im <b>Präsens</b> und in eigenen Worten.'],
  ['W-Fragen','Wer? Was? Wo? Wann? Warum? Wie endet es? – Beantworte sie der Reihe nach.'],
  ['Beispiel','Das Gespenst Hugo lebt auf einem Schloss. Eines Nachts trifft es ein Mädchen, das keine Angst hat …']
 ],{}),
 T('d-anleitung','Eine Anleitung schreiben','anleitung vorgangsbeschreibung material schritte imperativ nacheinander',[
  ['Aufbau','1. <b>Überschrift</b> · 2. <b>Material</b> · 3. <b>Schritte</b> (1., 2., 3. …) · 4. Tipp.'],
  ['Sprache','Befehlsform (Schneide …) oder Präsens (Man schneidet …), Zeitfolge-Wörter: zuerst, dann, danach, schließlich.']
 ],{ex:[X('Welches Wort passt in eine Anleitung als Anfang?','Zuerst','',['Zuerst','Gestern','Vielleicht'])]}),
 T('d-infos','Informationen ermitteln und vergleichen','informationen ermitteln flyer sachtext diagramm schlüsse ziehen text lesen',[
  ['Texte lesen','1. Überfliege. 2. Lies genau. 3. Unterstreiche Schlüsselwörter. 4. Beantworte Fragen mit eigenen Worten.'],
  ['Vergleichen','Lege eine Tabelle an: Spalte Text A, Spalte Text B. Trage Gemeinsamkeiten und Unterschiede ein.']
 ],{}),
 T('d-operatoren','Operatoren (Arbeitsaufträge)','operatoren aufgabenstellung nenne beschreibe erkläre vergleiche begründe',[
  ['Was ist ein Operator?','Ein Operator ist das Verb in der Aufgabe: <b>nenne, beschreibe, erkläre, vergleiche, begründe, fasse zusammen</b>. Er sagt dir, was du tun sollst.']
 ],{gen:'operatoren'})
]}
];
