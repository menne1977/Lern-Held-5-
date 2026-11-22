/* ===== Englisch Klasse 5 (Themen der Units 1–6) ===== */
const V={}; // Vokabellisten: [en, de]
V.u1a=[['hello','hallo'],['goodbye','auf Wiedersehen'],['name','Name'],['boy','Junge'],['girl','Mädchen'],['friend','Freund / Freundin'],['mother','Mutter'],['father','Vater'],['brother','Bruder'],['sister','Schwester'],['grandma','Oma'],['grandpa','Opa'],['parents','Eltern'],['family','Familie'],['years old','Jahre alt'],['nice to meet you','schön, dich kennenzulernen']];
V.u1b=[['bed','Bett'],['table','Tisch'],['chair','Stuhl'],['desk','Schreibtisch'],['window','Fenster'],['door','Tür'],['wardrobe','Kleiderschrank'],['shelf','Regal'],['lamp','Lampe'],['carpet','Teppich'],['bag','Tasche'],['mobile phone','Handy'],['room','Zimmer'],['on','auf'],['in','in'],['under','unter'],['next to','neben'],['behind','hinter'],['in front of','vor']];
V.u2a=[['school','Schule'],['teacher','Lehrer/in'],['pupil','Schüler/in'],['classroom','Klassenzimmer'],['pencil','Bleistift'],['pen','Kugelschreiber'],['rubber','Radiergummi'],['ruler','Lineal'],['book','Buch'],['exercise book','Heft'],['board','Tafel'],['pencil case','Federmappe']];
V.u2b=[['English','Englisch'],['Maths','Mathe'],['German','Deutsch'],['Art','Kunst'],['Music','Musik'],['PE','Sport'],['Science','Naturwissenschaften'],['History','Geschichte'],['Monday','Montag'],['Tuesday','Dienstag'],['Wednesday','Mittwoch'],['Thursday','Donnerstag'],['Friday','Freitag'],['Saturday','Samstag'],['Sunday','Sonntag'],['open','öffnen'],['close','schließen'],['listen','zuhören'],['write','schreiben'],['read','lesen'],['sit down','sich hinsetzen'],['stand up','aufstehen']];
V.u3a=[['tiger','Tiger'],['monkey','Affe'],['penguin','Pinguin'],['snake','Schlange'],['elephant','Elefant'],['bird','Vogel'],['horse','Pferd'],['cat','Katze'],['dog','Hund'],['fish','Fisch'],['rabbit','Kaninchen'],['mouse','Maus'],['animal','Tier'],['eat','essen'],['sleep','schlafen'],['like','mögen'],['love','lieben']];
V.u3b=[['get up','aufstehen'],['have breakfast','frühstücken'],['go to school','zur Schule gehen'],['have lunch','zu Mittag essen'],['do homework','Hausaufgaben machen'],['watch TV','fernsehen'],['play football','Fußball spielen'],['listen to music','Musik hören'],['go to bed','ins Bett gehen'],["o'clock",'Uhr (volle Stunde)'],['half past','halb nach'],['quarter past','Viertel nach'],['quarter to','Viertel vor'],['free time','Freizeit'],['always','immer'],['often','oft'],['sometimes','manchmal'],['never','nie']];
V.u4a=[['January','Januar'],['February','Februar'],['March','März'],['April','April'],['May','Mai'],['June','Juni'],['July','Juli'],['August','August'],['September','September'],['October','Oktober'],['November','November'],['December','Dezember'],['birthday','Geburtstag'],['party','Party'],['cake','Kuchen'],['present','Geschenk'],['candle','Kerze'],['balloon','Luftballon'],['card','Karte']];
V.u4b=[['shop','Geschäft'],['buy','kaufen'],['milk','Milch'],['bread','Brot'],['apple','Apfel'],['cheese','Käse'],['money','Geld'],['pound','Pfund'],['pence','Pence'],['How much is it?','Wie viel kostet es?'],['Can I help you?','Kann ich helfen?'],['Here you are.','Bitte schön.'],['bottle','Flasche'],['Christmas','Weihnachten'],['Easter','Ostern']];
V.u5a=[['town','Stadt'],['street','Straße'],['house','Haus'],['flat','Wohnung'],['café','Café'],['park','Park'],['cinema','Kino'],['supermarket','Supermarkt'],['zoo','Zoo'],['station','Bahnhof'],['bus','Bus'],['train','Zug'],['car','Auto'],['bike','Fahrrad'],['by bus','mit dem Bus'],['weekend','Wochenende'],['trip','Ausflug']];
V.u5b=[['went','ging / fuhr'],['saw','sah'],['ate','aß'],['had','hatte / aß'],['made','machte'],['took','nahm'],['came','kam'],['got','bekam'],['bought','kaufte'],['wrote','schrieb'],['played','spielte'],['watched','sah an'],['visited','besuchte'],['walked','ging zu Fuß']];
V.u6a=[['farm','Bauernhof'],['field','Feld'],['tractor','Traktor'],['sheep','Schaf'],['cow','Kuh'],['pig','Schwein'],['chicken','Huhn'],['tree','Baum'],['river','Fluss'],['hill','Hügel'],['countryside','Landschaft'],['postcard','Postkarte'],['holiday','Urlaub / Ferien'],['lots of','viele']];
V.u6b=[['jacket','Jacke'],['jumper','Pullover'],['trousers','Hose'],['shoes','Schuhe'],['hat','Mütze / Hut'],['T-shirt','T-Shirt'],['boots','Stiefel'],['raincoat','Regenmantel'],['sunny','sonnig'],['rainy','regnerisch'],['cloudy','bewölkt'],['windy','windig'],['snowy','verschneit'],['warm','warm'],['cold','kalt'],['hot','heiß'],['wear','tragen']];
const ALLVOC=[].concat(...Object.entries(V).map(([k,l])=>l.map(w=>({en:w[0],de:w[1],u:k}))));
const vgen=(list)=>()=>{const w=pick(list);
  if(R(0,1)){const others=shuffle(list.filter(x=>x[1]!==w[1])).slice(0,3).map(x=>x[1]);
    return Q(`Was heißt <b>${esc(w[0])}</b> auf Deutsch?`,w[1],{kind:'choice',opts:shuffle([w[1],...others]),speak:w[0],steps:`${w[0]} = ${w[1]}`})}
  return Q(`Wie heißt <b>${esc(w[1])}</b> auf Englisch?`,w[0],{loose:false,speak:null,hint:'Achte auf die Schreibweise.',steps:`${w[1]} = <b>${w[0]}</b> ${say(w[0])}`})};
const vtopic=(id,title,list,u)=>T(id,title+' – Vokabeln','vokabeln wörter '+list.map(w=>w[0]+' '+w[1]).join(' ').toLowerCase(),
  [['Karteikarten','Tippe auf ein Wort zum Anhören:<div class="cards">'+list.map(w=>`<div class="fc say" data-t="${esc(w[0])}"><b>${esc(w[0])}</b><span>${esc(w[1])}</span></div>`).join('')+'</div>']],
  {gen:null,vgen:vgen(list),vocab:list,lang:'en'});
/* Grammatik-Generatoren */
const BE=[['I','am',' from Greenwich.'],['You','are',' my friend.'],['He','is',' my brother.'],['She','is',' my sister.'],['It','is',' a cat.'],['We','are',' in the classroom.'],['They','are',' my parents.'],['My mum','is',' at work.'],['The dogs','are',' in the garden.'],['Tom and I','are',' friends.'],['My name','is',' Anna.'],['The books','are',' on the desk.'],['Her jokes','are',' not funny.'],['Mr Brown','is',' our teacher.']];
G.tobe=()=>{const s=pick(BE);return Q(`Ergänze <i>am / is / are</i>:<div class="big">${s[0]} ___${s[2]}</div>`,s[1],{kind:'choice',opts:['am','is','are'],steps:`I → am · he/she/it (und ein Einzelner) → is · you/we/they (und mehrere) → are. Also: ${s[0]} <b>${s[1]}</b>${s[2]}`,speak:`${s[0]} ${s[1]}${s[2]}`})};
const VP=[['play','plays'],['watch','watches'],['go','goes'],['like','likes'],['eat','eats'],['have','has'],['study','studies'],['live','lives'],['do','does'],['listen','listens'],['sleep','sleeps'],['drink','drinks'],['wash','washes'],['fly','flies'],['cook','cooks'],['read','reads'],['help','helps'],['teach','teaches'],['run','runs'],['swim','swims']];
G.present=()=>{const v=pick(VP),third=R(0,1),subj=third?pick(['He','She','It','My dad','Tom','The cat']):pick(['I','You','We','They','My friends']);
  return Q(`Simple Present: <div class="big">${subj} ___ (${v[0]}) every day.</div>`,third?v[1]:v[0],{loose:true,hint:'He/she/it + -s',steps:`${third?'He/she/it bekommt ein <b>-s</b> (bei -ch, -sh, -s, -o: -es; bei Konsonant+y: -ies).':'I/you/we/they: das Verb bleibt unverändert.'} → ${subj} ${third?v[1]:v[0]}`,speak:`${subj} ${third?v[1]:v[0]} every day`})};
const NEG=[["She likes football.","She doesn't like football.","Does she like football?"],["He plays the guitar.","He doesn't play the guitar.","Does he play the guitar?"],["They watch TV.","They don't watch TV.","Do they watch TV?"],["I eat fish.","I don't eat fish.","Do you eat fish?"],["My dad works in a shop.","My dad doesn't work in a shop.","Does my dad work in a shop?"],["We like pizza.","We don't like pizza.","Do you like pizza?"]];
G.neg=()=>{const s=pick(NEG),n=R(0,1);return n?Q(`Mache die Frage: <div class="big">${s[0]}</div>`,[s[2]],{steps:`Frage: Do/Does + Subjekt + Grundform. → ${s[2]}`,hint:'Do oder Does am Anfang'}):Q(`Verneine den Satz: <div class="big">${s[0]}</div>`,[s[1],s[1].replace("n't"," not")],{steps:`Verneinung: don't / doesn't + Grundform (ohne -s!). → ${s[1]}`,hint:"Nutze don't oder doesn't"})};
const PAST=[['play','played'],['watch','watched'],['visit','visited'],['walk','walked'],['live','lived'],['study','studied'],['stop','stopped'],['help','helped'],['go','went'],['see','saw'],['eat','ate'],['have','had'],['make','made'],['take','took'],['come','came'],['get','got'],['buy','bought'],['write','wrote'],['run','ran'],['swim','swam'],['meet','met'],['give','gave'],['find','found'],['say','said'],['be (I/he)','was']];
G.past=()=>{const p=pick(PAST),irr=!/ed$/.test(p[1]);return Q(`Simple Past von <b>${p[0]}</b>:`,p[1],{loose:true,steps:`${irr?'Unregelmäßiges Verb – auswendig lernen!':'Regelmäßig: Verb + <b>-ed</b>.'} ${p[0]} → <b>${p[1]}</b> ${say(p[1])}`,hint:irr?'Unregelmäßig!':'Regelmäßig: -ed'})};
const PLU=[['child','children'],['man','men'],['woman','women'],['mouse','mice'],['foot','feet'],['tooth','teeth'],['sheep','sheep'],['fish','fish'],['box','boxes'],['bus','buses'],['watch','watches'],['baby','babies'],['city','cities'],['dog','dogs'],['book','books'],['party','parties'],['knife','knives'],['class','classes']];
G.plural=()=>{const p=pick(PLU);return Q(`Mehrzahl von <b>${p[0]}</b>:`,p[1],{steps:`${p[0]} → <b>${p[1]}</b>. (Meist + s; nach s, x, ch, sh + es; Konsonant+y → ies; manche sind unregelmäßig.)`})};
const ONES=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'],TENS=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
const enNum=n=>n<20?ONES[n]:n<100?TENS[Math.floor(n/10)]+(n%10?'-'+ONES[n%10]:''):'one hundred';
G.numbers=()=>{const n=pick([R(13,20),R(21,99),R(1,12),pick([30,40,50,60,70,80,90,100])]);return Q(`Schreibe die Zahl <b>${n}</b> auf Englisch.`,enNum(n),{loose:true,steps:`${n} = <b>${enNum(n)}</b> ${say(enNum(n))}`,hint:'Bei 21–99 mit Bindestrich: twenty-one'})};
const HM=['one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];
G.clock=()=>{const h=R(1,12),m=pick([0,15,30,45,10,50]),h2=h%12+1;let w;
  if(m===0)w=`${HM[h-1]} o'clock`;if(m===15)w=`quarter past ${HM[h-1]}`;if(m===30)w=`half past ${HM[h-1]}`;if(m===45)w=`quarter to ${HM[h2-1]}`;if(m===10)w=`ten past ${HM[h-1]}`;if(m===50)w=`ten to ${HM[h2-1]}`;
  return Q(`Wie spät ist es? <div class="big">${h}:${String(m).padStart(2,'0')}</div>Schreibe die Uhrzeit auf Englisch.`,w,{loose:true,steps:`${h}:${String(m).padStart(2,'0')} = <b>${w}</b> ${say(w)}`,hint:"o'clock, quarter past, half past, quarter to, … past / … to"})};
const MON=['January','February','March','April','May','June','July','August','September','October','November','December'];
G.month=()=>{const i=R(0,10);return Q(`Welcher Monat kommt nach <b>${MON[i]}</b>?`,MON[i+1],{steps:`${MON.join(', ')}`,hint:'Englisch, mit Großbuchstaben (Groß/klein egal).'})};
const ORD=['first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','eleventh','twelfth'];
G.ordinal=()=>{const i=R(0,11),n=i+1,suf=n===1?'st':n===2?'nd':n===3?'rd':'th';return Q(`Schreibe <b>${n}${suf}</b> in Worten.`,ORD[i],{steps:`${n}${suf} = <b>${ORD[i]}</b>. Datum: „My birthday is on the ${ORD[i]} of ${pick(MON)}.“`})};
const PREP=[['The cat is ___ the box. (📦 inside)','in'],['The book is ___ the table. (📖 on top)','on'],['The ball is ___ the bed. (🛏️ below)','under'],['The lamp is ___ the bed. (beside it)','next to'],['The dog is ___ the door. (the door is in front, the dog is hidden)','behind'],['The girl stands ___ the shop. (right at the entrance)','in front of'],['My mobile is ___ my bag. (inside)','in'],['The poster is ___ the wall. (stuck to it)','on']];
G.prep=()=>{const p=pick(PREP);return Q(p[0],p[1],{kind:'choice',opts:shuffle(['in','on','under','next to','behind','in front of']),steps:`Richtige Präposition: <b>${p[1]}</b>.`})};
const FREQ=[["She always goes to school by bus.","She goes always to school by bus.","She goes to school always by bus."],["We often play football.","We play often football.","Often we plays football."],["He never eats fish.","He eats never fish.","He never eat fish."],["I am sometimes late.","I sometimes am late.","Sometimes I late am."],["They are always happy.","They always are happy.","They are happy always."]];
G.freq=()=>{const f=pick(FREQ);return Q('Welcher Satz ist richtig?',f[0],{kind:'choice',opts:shuffle(f),steps:'Häufigkeitswörter (always, often, sometimes, never) stehen <b>vor</b> dem Verb, aber <b>nach</b> „to be“ (am/is/are).'})};
const IMP=[['Frage Tom höflich, ob er die Tür öffnet (Befehl):','Open the door, please.'],['Sage: Setz dich!','Sit down.'],['Sage: Schreibe es an die Tafel.','Write it on the board.'],['Sage: Iss nicht im Klassenzimmer. (Verbot)',"Don't eat in the classroom."],['Sage: Hör zu!','Listen.'],['Sage: Steh auf!','Stand up.']];
G.imp=()=>{const i=pick(IMP);return Q(i[0],[i[1],i[1].replace(', please',''),i[1].replace('Open the door, please.','Open the door.'),i[1].replace("Don't","Do not")],{loose:true,steps:`Befehlsform: Grundform des Verbs (Verbot: Don't + Verb). → ${i[1]}`})};
const ENG=[
{t:'Unit 1 – I\'m from Greenwich',i:'🏡',tp:[
 T('e-u1-intro','Sich vorstellen','vorstellen hello my name is i am how old are you introduce greeting',[
  ['Hallo sagen','<div class="dlg">'+say('Hello! My name is Anna.')+say("I'm eleven years old.")+say('Nice to meet you!')+say("How are you? – I'm fine, thanks.")+'</div>Tippe auf einen Satz, um ihn zu hören 🔊'],
  ['Wichtige Sätze','My name is … = Ich heiße … · I\'m … (= I am) = Ich bin … · I\'m … years old. = Ich bin … Jahre alt. · I\'m from … = Ich komme aus …']
 ],{trick:"I'm = I am – im Gespräch benutzt man die Kurzform.",gen:'tobe'}),
 vtopic('e-u1-fam','Family and friends',V.u1a),
 T('e-u1-tobe','to be (am, is, are)','to be sein am is are present',[
  ['Die Formen','<table class="tbl"><tr><th>I</th><td>am</td></tr><tr><th>you</th><td>are</td></tr><tr><th>he / she / it</th><td>is</td></tr><tr><th>we / you / they</th><td>are</td></tr></table>'],
  ['Kurzformen und Verneinung','I\'m, you\'re, he\'s, she\'s, it\'s, we\'re, they\'re<br>Verneinung: I\'m not, he isn\'t, they aren\'t'],
  ['Frage','Are you OK? – Yes, I am. / No, I\'m not.<br>Is she your sister? – Yes, she is.']
 ],{trick:'Bei Fragen tauschst du Verb und Person: You are → Are you …?',gen:'tobe'}),
 vtopic('e-u1-room','My room',V.u1b),
 T('e-u1-prep','Präpositionen des Ortes','präpositionen on in under next to behind in front of wo ort',[
  ['Wo ist die Katze?','in = in · on = auf · under = unter · next to = neben · behind = hinter · in front of = vor<br><br>The cat is <b>on</b> the bed. The mobile is <b>under</b> the bed. Where is my bag? It\'s <b>behind</b> the door.']
 ],{gen:'prep'})
]},
{t:'Unit 2 – This is my school',i:'🏫',tp:[
 vtopic('e-u2-school','Schulsachen',V.u2a),
 T('e-u2-imp','Aufforderungen (Imperativ)','imperativ aufforderung befehl open close listen don\'t klassenzimmer',[
  ['So geht\'s','Die Befehlsform ist einfach die <b>Grundform</b> des Verbs: Open your book. · Listen, please. · Write it on the board.<br>Verbot: <b>Don\'t</b> + Verb → Don\'t eat in the classroom.'],
  ['Hörprobe',say("Can I have your pencil, please?")+say("Don't eat in the classroom.")+say('Stand up and sit down.')]
 ],{gen:'imp'}),
 vtopic('e-u2-subj','School subjects & days',V.u2b),
 T('e-u2-abc','ABC und Buchstabieren','abc alphabet buchstabieren spelling',[['Das englische ABC','A (ei) B (bie) C (sie) D (die) E (ie) F (äff) G (dschie) H (eitsch) I (ai) J (dschei) K (kei) L (äl) M (äm) N (än) O (ou) P (pie) Q (kju) R (ar) S (äss) T (tie) U (ju) V (wie) W (dabbl-ju) X (ecks) Y (wai) Z (säd)<br>'+say('A B C D E F G H I J K L M N O P Q R S T U V W X Y Z')]],{}),
 T('e-u2-likes','Sagen, was ich mag oder nicht mag','mag nicht mag favourite subject isn\'t funny',[['Meinungen','My favourite subject is Art. · I like Music. · English isn\'t my favourite subject. · Her jokes aren\'t funny.<br>'+say("My favourite subject is Art.")]],{gen:'tobe'})
]},
{t:'Unit 3 – My free time',i:'⚽',tp:[
 vtopic('e-u3-animals','Animals',V.u3a),
 T('e-u3-present','Simple Present','simple present gegenwart he she it s verneinung do does frage',[
  ['Regel','I, you, we, they: Verb ohne Endung → I play.<br>He, she, it: Verb + <b>-s</b> → He plays.<br>Besonderheiten: watch<b>es</b>, go<b>es</b>, stud<b>ies</b>, ha<b>s</b>.'],
  ['Verneinung','don\'t / doesn\'t + Grundform. She doesn\'t like bananas. (Kein -s mehr am Verb!)'],
  ['Fragen','Do you like music? – Yes, I do. / No, I don\'t.<br>Does he play football? – Yes, he does. / No, he doesn\'t.']
 ],{trick:'Das -s wandert zu „does“: Does he play? (nicht plays!)',gen:'present'}),
 T('e-u3-neg','Simple Present: Verneinung & Fragen','verneinung frage do does don\'t doesn\'t',[['Merke','Frage: <b>Do / Does</b> + Subjekt + Grundform.<br>Verneinung: Subjekt + <b>don\'t / doesn\'t</b> + Grundform.']],{gen:'neg'}),
 T('e-u3-numbers','Zahlen bis 100','zahlen numbers eins zwei drei hundert zwanzig',[
  ['Zahlen','1 one · 2 two · 3 three · 4 four · 5 five · 6 six · 7 seven · 8 eight · 9 nine · 10 ten<br>11 eleven · 12 twelve · 13 thirteen … 19 nineteen<br>20 twenty · 30 thirty · 40 forty · 50 fifty · 60 sixty · 70 seventy · 80 eighty · 90 ninety · 100 one hundred'],
  ['Zusammengesetzt','21 = twenty-one · 45 = forty-five · 99 = ninety-nine.<br>'+say('twenty-one')+say('forty-five')]
 ],{trick:'-teen (13–19) und -ty (30–90) klingen ähnlich: thirteen /ˈtienn/ – thirty /ˈthörtie/.',gen:'numbers'}),
 vtopic('e-u3-routine','Daily routine & time',V.u3b),
 T('e-u3-clock','Die Uhrzeit','uhrzeit time clock o\'clock half past quarter past quarter to',[
  ['Volle und halbe Stunden','3:00 = three o\'clock · 3:30 = half past three (!)'],
  ['Viertel','3:15 = quarter past three · 3:45 = quarter to four'],
  ['Andere Zeiten','3:10 = ten past three · 3:50 = ten to four · Von :01–:30 sagst du „past“, von :31–:59 sagst du „to“.']
 ],{trick:'half past three = halb nach drei (nicht halb vier!).',gen:'clock'}),
 T('e-u3-freq','Wie oft? (Adverbien der Häufigkeit)','always often sometimes never immer oft manchmal nie stellung adverbien',[['Reihenfolge','always (100%) → often → sometimes → never (0%)<br>Position: <b>vor</b> dem Verb: I often play football. Aber <b>nach</b> to be: She is always late.']],{gen:'freq'})
]},
{t:'Unit 4 – Let\'s celebrate!',i:'🎉',tp:[
 vtopic('e-u4-party','Months, birthdays & parties',V.u4a),
 T('e-u4-months','Monate und Datum','monate datum ordnungszahlen birthday first second third',[
  ['Ordnungszahlen','1st first · 2nd second · 3rd third · 4th fourth · 5th fifth · 6th sixth · 7th seventh · 8th eighth · 9th ninth · 10th tenth · 11th eleventh · 12th twelfth'],
  ['Datum sagen','Schreibe: 7th July · Sage: <b>the seventh of July</b>.<br>'+say('My birthday is on the seventh of July.')]
 ],{gen:'ordinal'}),
 T('e-u4-months2','Die Monate','monate months reihenfolge',[['Reihenfolge','January, February, March, April, May, June, July, August, September, October, November, December<br>Monate schreibt man im Englischen <b>immer groß</b>.']],{gen:'month'}),
 vtopic('e-u4-shop','Shopping',V.u4b),
 T('e-u4-dialog','Einkaufsgespräch','einkaufen dialog shopping how much can i help you here you are pounds',[
  ['Im Geschäft','<div class="dlg">'+say('Can I help you?')+say('A bottle of milk, please.')+say('How much is it?')+say("It's one pound twenty-five.")+say('Here you are.')+say('Thank you!')+'</div>'],
  ['Geld','£1.25 = one pound twenty-five · 50p = fifty pence']
 ],{gen:'numbers'})
]},
{t:'Unit 5 – Where I live',i:'🏘️',tp:[
 vtopic('e-u5-town','My town',V.u5a),
 T('e-u5-past','Simple Past','simple past vergangenheit ed regelmäßig unregelmäßig went saw ate',[
  ['Regelmäßige Verben','Verb + <b>-ed</b>: play → played, watch → watched, visit → visited. Endet es auf -e: nur -d (live → lived). Konsonant + y: -ied (study → studied).'],
  ['Unregelmäßige Verben','go → <b>went</b>, see → <b>saw</b>, eat → <b>ate</b>, have → <b>had</b>, make → <b>made</b>, take → <b>took</b>, come → <b>came</b>, get → <b>got</b>, buy → <b>bought</b>. Die muss man lernen!'],
  ['Beispiele',say('I played netball.')+say('We watched a film.')+say('She went to the zoo.')]
 ],{trick:'Karteikarten für unregelmäßige Verben: vorne Grundform, hinten Past.',gen:'past'}),
 vtopic('e-u5-past-vocab','Past forms',V.u5b),
 T('e-u5-pastq','Past: Verneinung & Fragen','didn\'t did past frage verneinung',[['Merke','Frage: <b>Did</b> + Subjekt + Grundform? → Did you watch the film?<br>Verneinung: <b>didn\'t</b> + Grundform → She didn\'t listen.<br>Kein -ed mehr, wenn did/didn\'t da ist!']],{gen:'past'}),
 T('e-u5-transport','Verkehrsmittel','verkehrsmittel by car by train by bus transport',[['By …','by car · by train · by bus · by bike · <b>on foot</b> (zu Fuß). I went to school by bus.']],{})
]},
{t:'Unit 6 – A trip to the country',i:'🐑',tp:[
 vtopic('e-u6-farm','On the farm',V.u6a),
 T('e-u6-waswere','was / were (Past von to be)','was were past to be vergangenheit',[
  ['Die Formen','I / he / she / it → <b>was</b><br>you / we / they → <b>were</b>'],
  ['Beispiele',say('It was sunny.')+say('We were there.')+say("It wasn't easy.")],
  ['Frage','Was it a good day? – Yes, it was. · Were they happy? – No, they weren\'t.']
 ],{gen:'tobe'}),
 vtopic('e-u6-clothes','Clothes & weather',V.u6b),
 T('e-u6-postcard','Eine Postkarte schreiben','postkarte brief schreiben dear postcard weather',[
  ['Aufbau','<i>Dear Tom,</i><br>We are on a farm. It was sunny and warm. We watched the animals. The food was great!<br><i>Love, Anna</i>'],
  ['Hilfen','Anrede: Dear … · Schluss: Love / Best wishes / See you soon · Wetter: It was sunny/rainy. · Aktivitäten im Past: We played, we went …']
 ],{gen:'past'})
]}
];
