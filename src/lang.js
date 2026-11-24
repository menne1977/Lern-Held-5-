/* ===== Fremdsprachen: Französisch, Spanisch, Latein + Sprachen Europas =====
   Wird VOR app.js geladen (Top-Level-Konstanten erlaubt). Kategorien: [Name, Icon, [[Wort, Deutsch], …], nurAuswahl] */
const LANGS={
fr:{name:'Französisch',flag:'🇫🇷',tts:'fr-FR',cats:[
 ['Begrüßung','👋',[['bonjour','guten Tag'],['salut','hallo'],['au revoir','auf Wiedersehen'],['merci','danke'],["s'il te plaît",'bitte'],['oui','ja'],['non','nein'],['bonsoir','guten Abend'],['à bientôt','bis bald'],['pardon','Entschuldigung']]],
 ['Zahlen 1–10','🔢',[['un','eins'],['deux','zwei'],['trois','drei'],['quatre','vier'],['cinq','fünf'],['six','sechs'],['sept','sieben'],['huit','acht'],['neuf','neun'],['dix','zehn']]],
 ['Farben','🎨',[['rouge','rot'],['bleu','blau'],['vert','grün'],['jaune','gelb'],['noir','schwarz'],['blanc','weiß'],['rose','rosa'],['gris','grau'],['violet','lila'],['marron','braun']]],
 ['Familie','👨‍👩‍👧',[['la mère','die Mutter'],['le père','der Vater'],['le frère','der Bruder'],['la sœur','die Schwester'],['la grand-mère','die Oma'],['le grand-père','der Opa'],["l'enfant",'das Kind'],['la famille','die Familie'],["l'ami",'der Freund'],["l'amie",'die Freundin']]],
 ['Tiere','🐾',[['le chien','der Hund'],['le chat','die Katze'],['le cheval','das Pferd'],["l'oiseau",'der Vogel'],['le poisson','der Fisch'],['la vache','die Kuh'],['la souris','die Maus'],['le lapin','das Kaninchen'],['le cochon','das Schwein'],['le lion','der Löwe']]],
 ['Essen und Trinken','🍞',[['le pain','das Brot'],['le fromage','der Käse'],['la pomme','der Apfel'],["l'eau",'das Wasser'],['le lait','die Milch'],['le gâteau','der Kuchen'],['la viande','das Fleisch'],['les frites','die Pommes'],['le chocolat','die Schokolade'],['le jus','der Saft']]],
 ['Schule','🏫',[["l'école",'die Schule'],['le livre','das Buch'],['le cahier','das Heft'],['le stylo','der Kuli'],['la règle','das Lineal'],['le professeur','der Lehrer'],['la classe','die Klasse'],['le crayon','der Bleistift'],['la gomme','der Radiergummi'],['le sac','die Tasche']]],
 ['Wochentage','📅',[['lundi','Montag'],['mardi','Dienstag'],['mercredi','Mittwoch'],['jeudi','Donnerstag'],['vendredi','Freitag'],['samedi','Samstag'],['dimanche','Sonntag']]],
 ['Wichtige Sätze','💬',[["Je m'appelle …",'Ich heiße …'],['Comment ça va ?',"Wie geht's?"],['Ça va bien.',"Mir geht's gut."],["J'ai onze ans.",'Ich bin elf Jahre alt.'],["J'habite en Allemagne.",'Ich wohne in Deutschland.'],['Où est … ?','Wo ist …?'],['Je ne comprends pas.','Ich verstehe nicht.'],["J'aime le chocolat.",'Ich mag Schokolade.']],1]]},
es:{name:'Spanisch',flag:'🇪🇸',tts:'es-ES',cats:[
 ['Begrüßung','👋',[['hola','hallo'],['buenos días','guten Morgen'],['adiós','tschüss'],['gracias','danke'],['por favor','bitte'],['sí','ja'],['no','nein'],['buenas noches','gute Nacht'],['hasta luego','bis später'],['perdón','Entschuldigung']]],
 ['Zahlen 1–10','🔢',[['uno','eins'],['dos','zwei'],['tres','drei'],['cuatro','vier'],['cinco','fünf'],['seis','sechs'],['siete','sieben'],['ocho','acht'],['nueve','neun'],['diez','zehn']]],
 ['Farben','🎨',[['rojo','rot'],['azul','blau'],['verde','grün'],['amarillo','gelb'],['negro','schwarz'],['blanco','weiß'],['rosa','rosa'],['gris','grau'],['morado','lila'],['marrón','braun']]],
 ['Familie','👨‍👩‍👧',[['la madre','die Mutter'],['el padre','der Vater'],['el hermano','der Bruder'],['la hermana','die Schwester'],['la abuela','die Oma'],['el abuelo','der Opa'],['el niño','der Junge'],['la familia','die Familie'],['el amigo','der Freund'],['la amiga','die Freundin']]],
 ['Tiere','🐾',[['el perro','der Hund'],['el gato','die Katze'],['el caballo','das Pferd'],['el pájaro','der Vogel'],['el pez','der Fisch'],['la vaca','die Kuh'],['el ratón','die Maus'],['el conejo','das Kaninchen'],['el cerdo','das Schwein'],['el león','der Löwe']]],
 ['Essen und Trinken','🍞',[['el pan','das Brot'],['el queso','der Käse'],['la manzana','der Apfel'],['el agua','das Wasser'],['la leche','die Milch'],['el pastel','der Kuchen'],['la carne','das Fleisch'],['las patatas fritas','die Pommes'],['el chocolate','die Schokolade'],['el zumo','der Saft']]],
 ['Schule','🏫',[['la escuela','die Schule'],['el libro','das Buch'],['el cuaderno','das Heft'],['el bolígrafo','der Kuli'],['la regla','das Lineal'],['el profesor','der Lehrer'],['la clase','die Klasse'],['el lápiz','der Bleistift'],['la goma','der Radiergummi'],['la mochila','der Rucksack']]],
 ['Wochentage','📅',[['lunes','Montag'],['martes','Dienstag'],['miércoles','Mittwoch'],['jueves','Donnerstag'],['viernes','Freitag'],['sábado','Samstag'],['domingo','Sonntag']]],
 ['Wichtige Sätze','💬',[['Me llamo …','Ich heiße …'],['¿Cómo estás?',"Wie geht's dir?"],['Estoy bien.',"Mir geht's gut."],['Tengo once años.','Ich bin elf Jahre alt.'],['Vivo en Alemania.','Ich wohne in Deutschland.'],['¿Dónde está …?','Wo ist …?'],['No entiendo.','Ich verstehe nicht.'],['Me gusta el chocolate.','Ich mag Schokolade.']],1]]},
la:{name:'Latein',flag:'🏛️',tts:'it-IT',note:'Latein hat keine eigene Handy-Stimme. Vorgelesen wird mit der italienischen Stimme – das klingt ähnlich wie die Schulaussprache.',cats:[
 ['Begrüßung','👋',[['salve','sei gegrüßt'],['salvete','seid gegrüßt'],['vale','leb wohl'],['valete','lebt wohl'],['gratias tibi ago','ich danke dir'],['non','nicht'],['quid agis?',"wie geht's?"],['bene','gut']]],
 ['Zahlen 1–10','🔢',[['unus','eins'],['duo','zwei'],['tres','drei'],['quattuor','vier'],['quinque','fünf'],['sex','sechs'],['septem','sieben'],['octo','acht'],['novem','neun'],['decem','zehn']]],
 ['Familie und Menschen','👨‍👩‍👧',[['mater','die Mutter'],['pater','der Vater'],['frater','der Bruder'],['soror','die Schwester'],['filius','der Sohn'],['filia','die Tochter'],['puer','der Junge'],['puella','das Mädchen'],['amicus','der Freund'],['amica','die Freundin']]],
 ['Tiere','🐾',[['canis','der Hund'],['equus','das Pferd'],['avis','der Vogel'],['piscis','der Fisch'],['lupus','der Wolf'],['leo','der Löwe'],['feles','die Katze'],['vacca','die Kuh'],['taurus','der Stier'],['serpens','die Schlange']]],
 ['Leben in Rom','🏺',[['villa','das Landhaus'],['via','die Straße'],['aqua','das Wasser'],['terra','die Erde'],['forum','der Marktplatz'],['templum','der Tempel'],['servus','der Sklave'],['dominus','der Herr'],['magister','der Lehrer'],['schola','die Schule']]],
 ['Verben','🏃',[['amare','lieben'],['laborare','arbeiten'],['clamare','rufen'],['videre','sehen'],['ridere','lachen'],['esse','sein'],['ambulare','spazieren gehen'],['cantare','singen'],['audire','hören'],['venire','kommen']]],
 ['Adjektive','✨',[['magnus','groß'],['parvus','klein'],['bonus','gut'],['malus','schlecht'],['laetus','froh'],['longus','lang'],['novus','neu'],['multi','viele'],['pulcher','schön'],['altus','hoch']]],
 ['Berühmte Sätze','💬',[['Carpe diem.','Nutze den Tag.'],['Veni, vidi, vici.','Ich kam, sah und siegte.'],['Errare humanum est.','Irren ist menschlich.'],['Puella cantat.','Das Mädchen singt.'],['Servus laborat.','Der Sklave arbeitet.'],['Magister venit.','Der Lehrer kommt.'],['Ubi est …?','Wo ist …?'],['Roma aeterna','das ewige Rom']],1]]},
it:{name:'Italienisch',flag:'🇮🇹',tts:'it-IT',eu:1,cats:[
 ['Begrüßung','👋',[['ciao','hallo'],['buongiorno','guten Tag'],['arrivederci','auf Wiedersehen'],['grazie','danke'],['per favore','bitte'],['sì','ja'],['no','nein']]],
 ['Zahlen 1–10','🔢',[['uno','eins'],['due','zwei'],['tre','drei'],['quattro','vier'],['cinque','fünf'],['sei','sechs'],['sette','sieben'],['otto','acht'],['nove','neun'],['dieci','zehn']]],
 ['Farben','🎨',[['rosso','rot'],['blu','blau'],['verde','grün'],['giallo','gelb'],['nero','schwarz'],['bianco','weiß']]],
 ['Familie','👨‍👩‍👧',[['la madre','die Mutter'],['il padre','der Vater'],['il fratello','der Bruder'],['la sorella','die Schwester'],['la nonna','die Oma'],['il nonno','der Opa']]],
 ['Tiere','🐾',[['il cane','der Hund'],['il gatto','die Katze'],['il cavallo','das Pferd'],["l'uccello",'der Vogel'],['il pesce','der Fisch'],['la mucca','die Kuh']]],
 ['Essen','🍕',[['il pane','das Brot'],['il formaggio','der Käse'],['la mela','der Apfel'],["l'acqua",'das Wasser'],['il latte','die Milch'],['il gelato','das Eis']]],
 ['Sätze','💬',[['Mi chiamo …','Ich heiße …'],['Come stai?',"Wie geht's dir?"],['Sto bene.',"Mir geht's gut."],['Non capisco.','Ich verstehe nicht.']],1]]},
nl:{name:'Niederländisch',flag:'🇳🇱',tts:'nl-NL',eu:1,cats:[
 ['Begrüßung','👋',[['hallo','hallo'],['goedemorgen','guten Morgen'],['tot ziens','auf Wiedersehen'],['dank je','danke'],['alsjeblieft','bitte'],['ja','ja'],['nee','nein']]],
 ['Zahlen 1–10','🔢',[['een','eins'],['twee','zwei'],['drie','drei'],['vier','vier'],['vijf','fünf'],['zes','sechs'],['zeven','sieben'],['acht','acht'],['negen','neun'],['tien','zehn']]],
 ['Farben','🎨',[['rood','rot'],['blauw','blau'],['groen','grün'],['geel','gelb'],['zwart','schwarz'],['wit','weiß']]],
 ['Familie','👨‍👩‍👧',[['de moeder','die Mutter'],['de vader','der Vater'],['de broer','der Bruder'],['de zus','die Schwester'],['de oma','die Oma'],['de opa','der Opa']]],
 ['Tiere','🐾',[['de hond','der Hund'],['de kat','die Katze'],['het paard','das Pferd'],['de vogel','der Vogel'],['de vis','der Fisch'],['de koe','die Kuh']]],
 ['Essen','🧀',[['het brood','das Brot'],['de kaas','der Käse'],['de appel','der Apfel'],['het water','das Wasser'],['de melk','die Milch'],['het ijs','das Eis']]],
 ['Sätze','💬',[['Ik heet …','Ich heiße …'],['Hoe gaat het?',"Wie geht's?"],['Het gaat goed.',"Es geht gut."],['Ik begrijp het niet.','Ich verstehe es nicht.']],1]]},
pl:{name:'Polnisch',flag:'🇵🇱',tts:'pl-PL',eu:1,cats:[
 ['Begrüßung','👋',[['cześć','hallo'],['dzień dobry','guten Tag'],['do widzenia','auf Wiedersehen'],['dziękuję','danke'],['proszę','bitte'],['tak','ja'],['nie','nein']]],
 ['Zahlen 1–10','🔢',[['jeden','eins'],['dwa','zwei'],['trzy','drei'],['cztery','vier'],['pięć','fünf'],['sześć','sechs'],['siedem','sieben'],['osiem','acht'],['dziewięć','neun'],['dziesięć','zehn']]],
 ['Farben','🎨',[['czerwony','rot'],['niebieski','blau'],['zielony','grün'],['żółty','gelb'],['czarny','schwarz'],['biały','weiß']]],
 ['Familie','👨‍👩‍👧',[['mama','die Mama'],['tata','der Papa'],['brat','der Bruder'],['siostra','die Schwester'],['babcia','die Oma'],['dziadek','der Opa']]],
 ['Tiere','🐾',[['pies','der Hund'],['kot','die Katze'],['koń','das Pferd'],['ptak','der Vogel'],['ryba','der Fisch'],['krowa','die Kuh']]],
 ['Essen','🍞',[['chleb','das Brot'],['ser','der Käse'],['jabłko','der Apfel'],['woda','das Wasser'],['mleko','die Milch'],['lody','das Eis']]],
 ['Sätze','💬',[['Mam na imię …','Ich heiße …'],['Jak się masz?',"Wie geht's dir?"],['Dobrze, dziękuję.','Gut, danke.'],['Nie rozumiem.','Ich verstehe nicht.']],1]]},
pt:{name:'Portugiesisch',flag:'🇵🇹',tts:'pt-PT',eu:1,cats:[
 ['Begrüßung','👋',[['olá','hallo'],['bom dia','guten Morgen'],['adeus','tschüss'],['obrigado','danke'],['por favor','bitte'],['sim','ja'],['não','nein']]],
 ['Zahlen 1–10','🔢',[['um','eins'],['dois','zwei'],['três','drei'],['quatro','vier'],['cinco','fünf'],['seis','sechs'],['sete','sieben'],['oito','acht'],['nove','neun'],['dez','zehn']]],
 ['Farben','🎨',[['vermelho','rot'],['azul','blau'],['verde','grün'],['amarelo','gelb'],['preto','schwarz'],['branco','weiß']]],
 ['Familie','👨‍👩‍👧',[['a mãe','die Mutter'],['o pai','der Vater'],['o irmão','der Bruder'],['a irmã','die Schwester'],['a avó','die Oma'],['o avô','der Opa']]],
 ['Tiere','🐾',[['o cão','der Hund'],['o gato','die Katze'],['o cavalo','das Pferd'],['o pássaro','der Vogel'],['o peixe','der Fisch'],['a vaca','die Kuh']]],
 ['Essen','🍞',[['o pão','das Brot'],['o queijo','der Käse'],['a maçã','der Apfel'],['a água','das Wasser'],['o leite','die Milch'],['o gelado','das Eis']]],
 ['Sätze','💬',[['Chamo-me …','Ich heiße …'],['Como estás?',"Wie geht's dir?"],['Estou bem.',"Mir geht's gut."],['Não percebo.','Ich verstehe nicht.']],1]]},
sv:{name:'Schwedisch',flag:'🇸🇪',tts:'sv-SE',eu:1,cats:[
 ['Begrüßung','👋',[['hej','hallo'],['god morgon','guten Morgen'],['hej då','tschüss'],['tack','danke'],['ja','ja'],['nej','nein']]],
 ['Zahlen 1–10','🔢',[['ett','eins'],['två','zwei'],['tre','drei'],['fyra','vier'],['fem','fünf'],['sex','sechs'],['sju','sieben'],['åtta','acht'],['nio','neun'],['tio','zehn']]],
 ['Farben','🎨',[['röd','rot'],['blå','blau'],['grön','grün'],['gul','gelb'],['svart','schwarz'],['vit','weiß']]],
 ['Familie','👨‍👩‍👧',[['mamma','die Mama'],['pappa','der Papa'],['bror','der Bruder'],['syster','die Schwester'],['mormor','die Oma (Mutter der Mutter)'],['morfar','der Opa (Vater der Mutter)']]],
 ['Tiere','🐾',[['hund','der Hund'],['katt','die Katze'],['häst','das Pferd'],['fågel','der Vogel'],['fisk','der Fisch'],['ko','die Kuh']]],
 ['Essen','🍞',[['bröd','das Brot'],['ost','der Käse'],['äpple','der Apfel'],['vatten','das Wasser'],['mjölk','die Milch'],['glass','das Eis']]],
 ['Sätze','💬',[['Jag heter …','Ich heiße …'],['Hur mår du?',"Wie geht's dir?"],['Jag mår bra.',"Mir geht's gut."],['Jag förstår inte.','Ich verstehe nicht.']],1]]},
tr:{name:'Türkisch',flag:'🇹🇷',tts:'tr-TR',eu:1,cats:[
 ['Begrüßung','👋',[['merhaba','hallo'],['günaydın','guten Morgen'],['hoşça kal','tschüss'],['teşekkürler','danke'],['lütfen','bitte'],['evet','ja'],['hayır','nein']]],
 ['Zahlen 1–10','🔢',[['bir','eins'],['iki','zwei'],['üç','drei'],['dört','vier'],['beş','fünf'],['altı','sechs'],['yedi','sieben'],['sekiz','acht'],['dokuz','neun'],['on','zehn']]],
 ['Farben','🎨',[['kırmızı','rot'],['mavi','blau'],['yeşil','grün'],['sarı','gelb'],['siyah','schwarz'],['beyaz','weiß']]],
 ['Familie','👨‍👩‍👧',[['anne','die Mutter'],['baba','der Vater'],['erkek kardeş','der Bruder'],['kız kardeş','die Schwester'],['büyükanne','die Oma'],['büyükbaba','der Opa']]],
 ['Tiere','🐾',[['köpek','der Hund'],['kedi','die Katze'],['at','das Pferd'],['kuş','der Vogel'],['balık','der Fisch'],['inek','die Kuh']]],
 ['Essen','🍞',[['ekmek','das Brot'],['peynir','der Käse'],['elma','der Apfel'],['su','das Wasser'],['süt','die Milch'],['dondurma','das Eis']]],
 ['Sätze','💬',[['Benim adım …','Ich heiße …'],['Nasılsın?',"Wie geht's dir?"],['İyiyim.',"Mir geht's gut."],['Anlamıyorum.','Ich verstehe nicht.']],1]]},
hr:{name:'Kroatisch',flag:'🇭🇷',tts:'hr-HR',eu:1,cats:[
 ['Begrüßung','👋',[['bok','hallo'],['dobar dan','guten Tag'],['doviđenja','auf Wiedersehen'],['hvala','danke'],['molim','bitte'],['da','ja'],['ne','nein']]],
 ['Zahlen 1–10','🔢',[['jedan','eins'],['dva','zwei'],['tri','drei'],['četiri','vier'],['pet','fünf'],['šest','sechs'],['sedam','sieben'],['osam','acht'],['devet','neun'],['deset','zehn']]],
 ['Farben','🎨',[['crven','rot'],['plav','blau'],['zelen','grün'],['žut','gelb'],['crn','schwarz'],['bijel','weiß']]],
 ['Familie','👨‍👩‍👧',[['majka','die Mutter'],['otac','der Vater'],['brat','der Bruder'],['sestra','die Schwester'],['baka','die Oma'],['djed','der Opa']]],
 ['Tiere','🐾',[['pas','der Hund'],['mačka','die Katze'],['konj','das Pferd'],['ptica','der Vogel'],['riba','der Fisch'],['krava','die Kuh']]],
 ['Essen','🍞',[['kruh','das Brot'],['sir','der Käse'],['jabuka','der Apfel'],['voda','das Wasser'],['mlijeko','die Milch'],['sladoled','das Eis']]],
 ['Sätze','💬',[['Zovem se …','Ich heiße …'],['Kako si?',"Wie geht's dir?"],['Dobro sam.',"Mir geht's gut."],['Ne razumijem.','Ich verstehe nicht.']],1]]}
};
const LANG_SUBJ={franzoesisch:'fr',spanisch:'es',latein:'la'};
function langDeacc(s){return String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/ł/g,'l').replace(/ı/g,'i').replace(/ß/g,'ss').replace(/[¿¡…]/g,'').trim()}
function langStrip(s){return String(s).replace(/^(le |la |les |l'|l’|el |los |las |il |lo |gli |de |het |o |a |os |as )/i,'')}
function langAll(code){return LANGS[code].cats.flatMap(c=>c[2])}
/* Aufgabe zu einer Wortliste: 0 Bedeutung wählen, 1 Fremdwort wählen, 2 hören, 3 schreiben */
function langQ(code,words,mode,onlyChoice){
  const L=LANGS[code],w=pick(words),others=shuffle(words.filter(x=>x!==w)),opt=(k,o)=>shuffle([w[k]].concat(o.slice(0,3).map(x=>x[k])));
  if(onlyChoice&&mode===3)mode=R(0,2);
  if(mode===0)return Q(`Was bedeutet <b>${esc(w[0])}</b>?`,w[1],{kind:'choice',opts:opt(1,others),speak:w[0],sl:L.tts,steps:`${esc(w[0])} = ${esc(w[1])}`});
  if(mode===1)return Q(`Wie heißt <b>${esc(w[1])}</b> auf ${L.name}?`,w[0],{kind:'choice',opts:opt(0,others),steps:`${esc(w[1])} = ${esc(w[0])}`,speakAfter:w[0],sl:L.tts});
  if(mode===2)return Q(`👂 Hör genau hin: Welches Wort hörst du?`,w[0],{kind:'choice',opts:opt(0,others),speak:w[0],sl:L.tts,auto:1,steps:`${esc(w[0])} = ${esc(w[1])}`});
  const base=w[0].replace(/\s*…\s*/g,'').trim(),acc=[base,langStrip(base),langDeacc(base),langDeacc(langStrip(base))];
  return Q(`✍️ Schreibe auf ${L.name}: <b>${esc(w[1])}</b>`,acc,{pre:x=>langDeacc(x),ks:true,hint:`Beginnt mit „${esc(base[0])}“ · ${base.length} Zeichen. Akzente sind egal.`,speak:null,steps:`${esc(w[1])} = <b>${esc(w[0])}</b>`,speakAfter:w[0],sl:L.tts})}
function langGen(code,words,onlyChoice){return()=>langQ(code,words,R(0,3),onlyChoice)}
function langCards(code,words){const L=LANGS[code];return '<div class="cards">'+words.map(w=>`<div class="fc say" data-t="${esc(w[0])}" data-l="${L.tts}"><b>${esc(w[0])}</b><span>${esc(w[1])}</span></div>`).join('')+'</div>Tippe auf eine Karte, um das Wort zu hören 🔊'}
function langTopics(code){const L=LANGS[code];
  return L.cats.map((c,i)=>T('lg-'+code+'-'+i,c[0],L.name+' '+c[0]+' vokabeln '+c[2].map(w=>w[0]+' '+w[1]).join(' '),
    [[c[1]+' '+c[0],langCards(code,c[2])]].concat(L.note?[['🔊 Aussprache',L.note]]:[]).concat([['So übst du','Beim Üben kommen vier Aufgabenarten: Bedeutung wählen, Wort wählen, <b>hören</b> und <b>schreiben</b>. Akzente musst du beim Schreiben nicht tippen.']]),
    {vgen:langGen(code,c[2],!!c[3])}))}
function langCh(code){const L=LANGS[code];return[{t:'Grundwortschatz '+L.name,i:L.flag,tp:langTopics(code)},{t:'Alles gemischt',i:'🔀',tp:[T('lg-'+code+'-mix',L.name+' – alle Wörter gemischt',L.name+' alle wörter gemischt',[['🔀 Alles gemischt','Hier kommen Aufgaben zu <b>allen</b> Wörtern aus '+L.name+'.']],{vgen:langGen(code,langAll(code).filter(w=>!/[.?!…]$/.test(w[0])))})]}]}
function gLang(id){const c=LANG_SUBJ[id];return langQ(c,langAll(c),R(0,3),false)}
