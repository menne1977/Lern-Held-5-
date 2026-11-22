const T=(id,title,tags,s,o={})=>Object.assign({id,title,tags,s},o);
const say=t=>`<span class="say" data-t="${esc(t)}">🔊 ${esc(t)}</span>`;
const MATHE=[
{t:'Natürliche Zahlen',i:'🔢',tp:[
T('m-vergleichen','Zahlen vergleichen und ordnen','größer kleiner zeichen zahlenstrahl ordnen sortieren aufsteigend absteigend krokodil',[
 ['Der Zahlenstrahl','Zahlen liegen der Größe nach auf einer Linie. <b>Je weiter rechts, desto größer.</b>'+nl(0,100,10,70)],
 ['Die Zeichen &lt; und &gt;','Stell dir ein Krokodil 🐊 vor: Das Maul ist immer zur <b>größeren</b> Zahl offen.<div class="big">3 &lt; 7 &nbsp;&nbsp; 9 &gt; 4 &nbsp;&nbsp; 5 = 5</div>„&lt;“ heißt kleiner als, „&gt;“ heißt größer als, „=“ heißt gleich.'],
 ['Große Zahlen vergleichen','<ol><li>Mehr Stellen = größere Zahl.</li><li>Gleich viele Stellen? Vergleiche <b>von links</b>. Die erste Ziffer, die anders ist, entscheidet.</li></ol>Beispiel: 48 215 &lt; 48 790, denn an der Hunderterstelle ist 2 &lt; 7.'],
 ['Ordnen','<b>aufsteigend</b> ↗ = vom Kleinsten zum Größten<br><b>absteigend</b> ↘ = vom Größten zum Kleinsten<br><br>Beispiel: 305, 53, 350 → aufsteigend: <b>53, 305, 350</b>']
],{trick:'Krokodil-Trick: Das Maul zeigt immer zur größeren Zahl.',gen:'cmp',ex:[
 X('Ordne aufsteigend: <b>305, 53, 350</b> <small>(mit Leerzeichen)</small>','53 305 350','Vom Kleinsten zum Größten',null,'53 hat 2 Stellen (kleinste), 305 &lt; 350.'),
 X('Ordne absteigend: <b>1 200, 987, 1 020</b>','1200 1020 987','Vom Größten zum Kleinsten',null,'1200 &gt; 1020 &gt; 987')]}),
T('m-stellenwert','Natürliche Zahlen im Dezimalsystem','stellenwert tafel einer zehner hunderter tausender million ziffer zahl dezimalsystem',[
 ['Die Stellenwerttafel','<table class="tbl"><tr><th>M</th><th>HT</th><th>ZT</th><th>T</th><th>H</th><th>Z</th><th>E</th></tr><tr><td>1</td><td>4</td><td>0</td><td>7</td><td>2</td><td>5</td><td>8</td></tr></table>E = Einer, Z = Zehner, H = Hunderter, T = Tausender, ZT = Zehntausender, HT = Hunderttausender, M = Million.'],
 ['10-mal so viel','Jede Stelle links ist <b>zehnmal so viel</b> wie die Stelle rechts davon. 10 Einer = 1 Zehner, 10 Zehner = 1 Hunderter, 10 Hunderter = 1 Tausender …'],
 ['Zahlen lesen','1 407 258 sprichst du: <i>eine Million vierhundertsieben­tausend zwei­hundert­acht­und­fünfzig</i>. Gruppiere immer in <b>Dreierblöcke von rechts</b>: 1 | 407 | 258.']
],{trick:'Dreierblöcke von rechts machen große Zahlen leicht lesbar.',gen:'stellenwert'}),
T('m-runden','Zahlen runden','runden aufrunden abrunden rundungsstelle',[
 ['Die Rundungsregel','Schau auf die Ziffer <b>rechts neben</b> der Stelle, auf die du rundest.<br>0, 1, 2, 3, 4 → <b>abrunden</b> ⬇️<br>5, 6, 7, 8, 9 → <b>aufrunden</b> ⬆️'],
 ['Beispiel','4 <u>3</u>7 auf Zehner runden: Rechts neben der 3 steht 7 → aufrunden → <b>440</b>.<br>4 372 auf Hunderter: neben der 3 steht 7 → <b>4 400</b>.'],
 ['Wozu runden?','Wenn es nicht genau sein muss, zum Beispiel „ungefähr 5 000 Zuschauer“. Beim Überschlag rundest du zuerst, dann rechnest du leichter.']
],{trick:'Fünf und mehr – wir steigen auf, vier und weniger – wir ruhen aus.',gen:'runden'}),
T('m-schaetzen','Zahlen schätzen und Überschlag','schätzen überschlag fermi aufgaben ungefähr',[
 ['Überschlagen','Runde die Zahlen so, dass du im Kopf rechnen kannst.<br>398 + 203 ≈ 400 + 200 = <b>600</b>. Das genaue Ergebnis (601) muss ungefähr gleich sein.'],
 ['Fermi-Aufgaben','Manchmal kann man nur schätzen: „Wie viele Schritte sind es von Schule nach Hause?“ Messe ein kleines Stück (z. B. 10 Schritte) und rechne hoch!'],
 ['Schlüsselwörter beim Runden','„ungefähr“, „etwa“, „circa“, „rund“ → hier darf gerundet werden.']
],{gen:'ueberschlag'}),
T('m-roemisch','Römische Zahlen','römisch römische zahlen I V X L C D M',[
 ['Die Zeichen','I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000'],
 ['Die Regeln','Kleiner Zeichen <b>hinter</b> einem größeren: addieren → VI = 6, XII = 12.<br>Kleineres Zeichen <b>davor</b>: abziehen → IV = 4, IX = 9, XL = 40.<br>Nie mehr als dreimal dasselbe Zeichen: III = 3, aber 4 = IV.'],
 ['Beispiel','246 = CC (200) + XL (40) + VI (6) = <b>CCXLVI</b>']
],{trick:'Merke: I V X L C D M – „Ich Vermisse Xaver, Lisa Cooked Dumplings Mittags“.',gen:'roman'})
]},
{t:'Addition und Subtraktion',i:'➕',tp:[
T('m-kopf-addsub','Kopfrechnen mit Strategien','kopfrechnen strategien hilfsaufgabe zehnerübergang schrittweise ergänzen plus minus',[
 ['Schrittweise rechnen','47 + 28: erst die Zehner (47 + 20 = 67), dann die Einer (67 + 8 = <b>75</b>).'],
 ['Hilfsaufgabe','Bei Zahlen nahe 100 oder 10: 346 + 98 = 346 + 100 − 2 = <b>444</b>. Rechne mit der runden Zahl und gleiche den Unterschied aus.'],
 ['Zehnerübergang','57 + 8: Fülle erst bis zum nächsten Zehner auf (57 + 3 = 60), dann den Rest (60 + 5 = <b>65</b>).'],
 ['Ergänzen','Bei Minus hilft Ergänzen: 83 − 76 → von 76 bis 80 sind es 4, bis 83 noch 3. Zusammen <b>7</b>.']
],{trick:'Plus 99 = plus 100 und dann 1 zurück. Minus 49 = minus 50 und dann 1 dazu.',gen:'hilfsaufgabe'}),
T('m-gesetze-add','Vertauschungs- und Verbindungsgesetz','vertauschungsgesetz verbindungsgesetz klammern vorteilhaft rechnen kommutativ assoziativ',[
 ['Vertauschungsgesetz','Bei Plus darfst du die Zahlen <b>tauschen</b>: 17 + 3 = 3 + 17. Bei Minus geht das <b>nicht</b>!'],
 ['Verbindungsgesetz','Bei Plus darfst du die Klammern <b>anders setzen</b>: (37 + 25) + 75 = 37 + (25 + 75) = 37 + 100 = <b>137</b>.'],
 ['Vorteilhaft rechnen','Suche Zahlen, die zusammen 10, 100 oder 1000 ergeben, und rechne diese zuerst.'],
 ['Klammern','Was in Klammern steht, rechnest du <b>zuerst</b>: 20 − (8 + 2) = 20 − 10 = 10 (aber 20 − 8 + 2 = 14).']
],{trick:'Suche Partner, die zusammen 10 oder 100 sind.',gen:'vorteil'}),
T('m-add','Schriftlich addieren','schriftlich addieren plus übertrag spalten',[
 ['Stellen untereinander','Schreibe die Zahlen so, dass <b>Einer unter Einer</b>, Zehner unter Zehner usw. stehen.'],
 ['Von rechts nach links','Addiere Spalte für Spalte, beginne bei den Einern. Ist das Ergebnis 10 oder mehr, schreibst du die Einerstelle hin und <b>merkst dir den Übertrag</b>.<pre class="col">  347\n+ 285\n─────\n 1 1\n  632</pre>'],
 ['Probe','Mache einen Überschlag (350 + 290 ≈ 640) oder die Umkehraufgabe 632 − 285 = 347.']
],{trick:'Der Übertrag ist immer höchstens 1 (bei zwei Zahlen).',gen:'add'}),
T('m-sub','Schriftlich subtrahieren','schriftlich subtrahieren minus ergänzungsverfahren übertrag',[
 ['Ergänzungsverfahren','Du fragst: „Welche Zahl muss ich zur unteren addieren, um die obere zu erhalten?“ Beginne rechts bei den Einern.'],
 ['Beispiel','<pre class="col">  632\n− 285\n─────\n 1 1\n  347</pre>2 + ? = 12 → 7 (Übertrag 1). 8 + 1 = 9, 9 + ? = 13 → 4 (Übertrag 1). 2 + 1 = 3, 3 + ? = 6 → 3.'],
 ['Probe','Addiere das Ergebnis zur unteren Zahl: 347 + 285 = 632 ✔']
],{gen:'sub'}),
T('m-umkehr','Umkehraufgabe als Probe','umkehraufgabe probe kontrolle prüfen',[
 ['Plus und Minus sind Gegenspieler','Wenn 120 + 35 = 155 stimmt, dann muss auch 155 − 35 = 120 stimmen. Das ist die <b>Umkehraufgabe</b>.'],
 ['So nutzt du die Probe','Rechne die Umkehraufgabe. Kommst du bei der Startzahl an, ist deine Rechnung richtig.']
],{gen:'umkehr'}),
T('m-sachaufgaben-add','Sachaufgaben lösen','sachaufgaben textaufgaben schlüsselwörter mehr weniger zusammen insgesamt rest',[
 ['Schlüsselwörter','<b>zusammen, insgesamt, mehr, dazu</b> → Plus ➕<br><b>weniger, Rest, übrig, verschenkt</b> → Minus ➖'],
 ['Die 4 Schritte','1. Lies genau. 2. Unterstreiche die Zahlen. 3. Rechne (mit Rechnung auf dem Papier). 4. Schreibe einen Antwortsatz.']
],{ex:[
 X('Lea hat 135 Sticker. Sie bekommt 48 dazu. Wie viele hat sie jetzt?',183,'„dazu“ → Plus',null,'135 + 48 = 183'),
 X('In der Schule sind 412 Kinder. 267 fahren mit dem Bus. Wie viele kommen anders?',145,'„anders“ → Rest, also Minus',null,'412 − 267 = 145'),
 X('Eine Jacke kostet 79 €, eine Hose 45 €. Wie viel kosten beide zusammen?',124,'„zusammen“ → Plus',null,'79 + 45 = 124'),
 X('Tim spart 250 €. Das Fahrrad kostet 389 €. Wie viel fehlt ihm noch?',139,'Unterschied → Minus',null,'389 − 250 = 139')]})
]},
{t:'Grundbegriffe der Geometrie',i:'📐',tp:[
T('m-strecke','Strecke, Strahl, Gerade','strecke strahl gerade punkt geometrie linie',[
 ['Drei Linien','<b>Strecke</b>: hat Anfang und Ende, man kann sie messen (z. B. 5 cm).<br><b>Strahl</b>: hat einen Anfang, geht unendlich weiter.<br><b>Gerade</b>: hat keinen Anfang und kein Ende.'],
 ['Zeichnen','Zeichne immer mit <b>gespitztem Bleistift</b> und Lineal. Punkte bezeichnest du mit Großbuchstaben (A, B), Geraden mit kleinen (g, h). Die Strecke von A nach B schreibst du <b>[AB]</b>.']
],{ex:[
 X('Welche Linie kann man messen?','Strecke','Sie hat Anfang und Ende.',['Strecke','Strahl','Gerade']),
 X('Wie viele Enden hat ein Strahl?','1','Einen Anfang, aber kein Ende.',['0','1','2']),
 X('Welche Linie geht in beide Richtungen endlos weiter?','Gerade','',['Strecke','Strahl','Gerade'])]}),
T('m-senkrecht','Senkrecht und parallel','senkrecht parallel geodreieck rechter winkel',[
 ['Senkrecht ⊥','Zwei Geraden stehen <b>senkrecht</b> zueinander, wenn sie einen <b>rechten Winkel</b> (90°) bilden. Zeichen: g ⊥ h.'],
 ['Parallel ∥','Zwei Geraden sind <b>parallel</b>, wenn sie überall <b>gleichen Abstand</b> haben und sich nie schneiden. Zeichen: g ∥ h.'],
 ['Mit dem Geodreieck','Senkrechte: Lege die Mittellinie des Geodreiecks auf die Gerade und zeichne an der Kante. Parallele: Verschiebe das Geodreieck entlang einer senkrechten Linie.']
],{ex:[
 X('Wie groß ist der Winkel zwischen zwei senkrechten Geraden?','90','',['45','90','180']),
 X('Welches Zeichen bedeutet „parallel“?','∥','',['⊥','∥','=']),
 X('Zwei Schienen eines Zuggleises sind …','parallel','Gleichen Abstand, schneiden sich nie.',['senkrecht','parallel','gleich'])]}),
T('m-abstand','Abstand','abstand punkt gerade kürzeste entfernung',[
 ['Der kürzeste Weg','Der <b>Abstand</b> eines Punktes von einer Geraden ist die <b>kürzeste</b> Strecke – sie steht <b>senkrecht</b> auf der Geraden.'],
 ['Messen','Lege das Geodreieck mit der Mittellinie auf die Gerade, schiebe es zum Punkt und miss die Strecke.']
],{ex:[X('Wie verläuft der kürzeste Weg von einem Punkt zu einer Geraden?','senkrecht','',['senkrecht','schräg','parallel'])]}),
T('m-koordinaten','Koordinatensystem','koordinatensystem koordinaten x-achse y-achse punkt ursprung',[
 ['Zwei Achsen','Die <b>x-Achse</b> geht waagerecht, die <b>y-Achse</b> senkrecht. Sie treffen sich im <b>Ursprung</b> (0|0).'],
 ['Punkte ablesen','Ein Punkt hat zwei Koordinaten: <b>P(x|y)</b>. Immer zuerst x (nach rechts), dann y (nach oben).'+'<div class="svgbox">'+gridSvg([[3,2,'P(3|2)']],5)+'</div>'],
 ['Merkhilfe','„<b>Erst laufen, dann hochspringen!</b>“ Oder: x kommt im Alphabet vor y.']
],{trick:'Erst laufen (x), dann hochspringen (y).',gen:'koordinaten'}),
T('m-achsensym','Achsensymmetrie','achsensymmetrie spiegeln spiegelachse symmetrieachse faltprobe symmetrisch',[
 ['Spiegelbild','Eine Figur ist <b>achsensymmetrisch</b>, wenn man sie so falten kann, dass beide Hälften genau aufeinander liegen. Die Faltlinie ist die <b>Symmetrieachse</b>.'],
 ['Symmetrieachsen zählen','Quadrat: 4 · Rechteck: 2 · gleichseitiges Dreieck: 3 · Kreis: unendlich viele · Buchstabe A: 1'],
 ['Spiegeln','Jeder Punkt und sein Bildpunkt haben <b>gleichen Abstand</b> zur Achse und liegen auf einer Senkrechten dazu.']
],{ex:[
 X('Wie viele Symmetrieachsen hat ein Quadrat?',4,'Zwei Mittellinien und zwei Diagonalen.'),
 X('Wie viele Symmetrieachsen hat ein Rechteck (kein Quadrat)?',2,'Nur die zwei Mittellinien.'),
 X('Wie viele Symmetrieachsen hat ein gleichseitiges Dreieck?',3,'Eine durch jede Ecke.'),
 X('Welcher Buchstabe ist achsensymmetrisch?','A','Falte ihn in Gedanken.',['F','A','G'])]}),
T('m-punktsym','Punktsymmetrie','punktsymmetrie drehen symmetriezentrum 180 grad',[
 ['Halbe Drehung','Eine Figur ist <b>punktsymmetrisch</b>, wenn sie nach einer <b>halben Drehung (180°)</b> um einen Punkt (das Symmetriezentrum) genau wieder so aussieht.'],
 ['Beispiele','Punktsymmetrisch: Buchstabe Z, N, S, ein Parallelogramm, ein Rechteck. Nicht punktsymmetrisch: ein Dreieck, der Buchstabe A.']
],{ex:[
 X('Welcher Buchstabe ist punktsymmetrisch?','Z','Drehe ihn um 180°.',['A','Z','F']),
 X('Wie viel Grad dreht man bei Punktsymmetrie?','180','',['90','180','360'])]}),
T('m-verschiebung','Verschiebung und Drehung','verschiebung drehung verschieben pfeil winkel',[
 ['Verschiebung','Bei einer Verschiebung wird jeder Punkt um <b>denselben Pfeil</b> bewegt (gleiche Richtung, gleiche Länge). Die Figur bleibt gleich groß und gleich gedreht.'],
 ['Im Koordinatensystem','A(2|3) wird um 4 nach rechts und 1 nach oben verschoben: A\'(2+4 | 3+1) = <b>A\'(6|4)</b>.'],
 ['Drehung','Bei einer Drehung wird die Figur um einen Punkt gedreht, z. B. um 90° gegen den Uhrzeigersinn.']
],{gen:'verschieb'})
]},
{t:'Multiplikation und Division',i:'✖️',tp:[
T('m-kopf-muldiv','Kopfrechnen mit Strategien','kopfrechnen malnehmen einmaleins zerlegen verdoppeln halbieren mal 10',[
 ['Zerlegen','18 · 7 = 10 · 7 + 8 · 7 = 70 + 56 = <b>126</b>'],
 ['Verdoppeln & Halbieren','16 · 5 = 8 · 10 = 80. Die eine Zahl halbieren, die andere verdoppeln – das Ergebnis bleibt gleich.'],
 ['Mal 10, 100, 1000','Hänge Nullen an: 34 · 100 = 3 400. Beim Teilen streichst du Nullen: 3 400 : 100 = 34.'],
 ['Einmaleins-Reihen','Wer die kleine Einmaleins-Reihe kann, kann alles zerlegen. Übe täglich 5 Minuten!']
],{trick:'Zerlege eine Zahl in Zehner und Einer – dann wird alles leicht.',gen:'kopfmult'}),
T('m-vorrang','Vorrangregeln','vorrangregeln punkt vor strich klammern reihenfolge',[
 ['Punkt vor Strich','Mal (·) und geteilt (:) <b>vor</b> Plus (+) und Minus (−). 3 + 4 · 5 = 3 + 20 = <b>23</b> (nicht 35!).'],
 ['Klammern zuerst','Was in Klammern steht, rechnest du als Erstes: (3 + 4) · 5 = 7 · 5 = <b>35</b>.'],
 ['Gleichwertig: von links','Bei gleich starken Zeichen rechnest du von links nach rechts: 20 − 5 + 3 = 15 + 3 = 18.']
],{trick:'Klammer → Punkt → Strich.',gen:'vorrang'}),
T('m-rechengesetze','Rechengesetze und Rechenvorteile','vertauschungsgesetz verbindungsgesetz verteilungsgesetz rechenvorteile klammern auflösen',[
 ['Vertauschen','a · b = b · a: 4 · 25 = 25 · 4. Bei Mal und Plus darfst du tauschen.'],
 ['Verbinden','(2 · 5) · 17 = 2 · (5 · 17): erst 2 · 5 = 10, dann 10 · 17 = 170. Suche Partner, die 10 oder 100 ergeben (2·5, 4·25).'],
 ['Verteilungsgesetz','6 · 47 = 6 · (40 + 7) = 240 + 42 = <b>282</b>. Oder 7 · 98 = 7 · (100 − 2) = 700 − 14 = <b>686</b>.']
],{trick:'Zahlen nahe an 10, 100 oder 1000: erst mit der runden Zahl, dann ausgleichen.',gen:'verteil'}),
T('m-mult','Schriftlich multiplizieren','schriftlich multiplizieren malnehmen halbschriftlich',[
 ['Halbschriftlich','347 · 6: 300·6 = 1 800, 40·6 = 240, 7·6 = 42. Zusammen: 1 800 + 240 + 42 = <b>2 082</b>.'],
 ['Zwei Ziffern in der zweiten Zahl','347 · 25 = 347 · 20 + 347 · 5 = 6 940 + 1 735 = <b>8 675</b>.'],
 ['Probe','Überschlag: 350 · 25 ≈ 8 750. Einerprobe: 7 · 5 = 35 → endet auf 5 ✔']
],{gen:'mult'}),
T('m-div','Schriftlich dividieren','schriftlich dividieren teilen geteilt durch',[
 ['Stelle für Stelle','Teile von links nach rechts. 756 : 6 → 7 : 6 = 1 Rest 1; 15 : 6 = 2 Rest 3; 36 : 6 = 6. Ergebnis <b>126</b>.'],
 ['Die Schritte','Teilen – Multiplizieren – Subtrahieren – nächste Ziffer herunterholen.'],
 ['Probe','126 · 6 = 756 ✔ (Multiplikation ist die Umkehrung).']
],{trick:'Teilen, Malnehmen, Abziehen, Herunterholen – immer wieder.',gen:'div'}),
T('m-divrest','Division mit Rest','division rest teilen mit rest',[
 ['Wenn es nicht aufgeht','47 : 5 = 9 Rest 2, denn 9 · 5 = 45 und 47 − 45 = 2. Schreibe: <b>47 : 5 = 9 R 2</b>.'],
 ['Der Rest ist immer kleiner als der Teiler','Bei : 5 kann der Rest nur 0, 1, 2, 3 oder 4 sein.'],
 ['Probe','9 · 5 + 2 = 47 ✔']
],{gen:'divrest'}),
T('m-pruefen','Ergebnisse prüfen','überschlag probe einerprobe ergebnis prüfen kontrolle',[
 ['Überschlag','Runde die Zahlen und rechne: 24 · 19 ≈ 20 · 20 = 400. Das Ergebnis muss in der Nähe liegen.'],
 ['Einerprobe','Die letzte Ziffer des Ergebnisses hängt nur von den letzten Ziffern ab: 24 · 19 → 4 · 9 = 36 → endet auf <b>6</b>. 456 ✔'],
 ['Umkehraufgabe','456 : 19 = 24 ✔']
],{gen:'probe'}),
T('m-sachaufgaben-md','Sachaufgaben mit Mal und Geteilt','sachaufgaben mal geteilt jedes pro verteilen',[
 ['Schlüsselwörter','<b>jeder, pro, mal so viele</b> → Mal ✖️<br><b>verteilen, gleichmäßig, jeder bekommt</b> → Geteilt ➗']
],{ex:[
 X('Ein Päckchen kostet 4 €. Was kosten 18 Päckchen? (in €)',72,'„18 Päckchen, jedes 4 €“ → Mal',null,'18 · 4 = 72'),
 X('84 Bonbons werden gleichmäßig an 6 Kinder verteilt. Wie viele bekommt jedes?',14,'„gleichmäßig verteilen“ → Geteilt',null,'84 : 6 = 14'),
 X('Ein Bus hat 52 Plätze. Wie viele Plätze haben 7 Busse?',364,'',null,'52 · 7 = 364'),
 X('Wie oft passt 8 in 100? (mit Rest: Schreibe z. B. 3 R 2)','12r4','100 : 8',null,'8 · 12 = 96, Rest 4')].map(q=>q.a==='12r4'?Object.assign(q,{rest:true}):q)})
]},
{t:'Größen im Alltag',i:'📏',tp:[
T('m-geld','Geld','geld euro cent addieren subtrahieren rückgeld',[
 ['Euro und Cent','1 € = 100 ct. 3,45 € = 345 ct. Beim Rechnen schreibst du <b>Komma unter Komma</b>.'],
 ['Rückgeld','Bezahlt − Preis = Rückgeld. 5,00 € − 3,45 € = <b>1,55 €</b>. Tipp: Ergänze vom Preis aus bis zum nächsten Euro.']
],{gen:'geld'}),
T('m-laenge','Länge','länge mm cm dm m km umrechnen meter zentimeter kilometer',[
 ['Die Längeneinheiten','1 cm = 10 mm · 1 dm = 10 cm · 1 m = 10 dm = 100 cm · 1 km = 1 000 m'],
 ['Umrechnen','In die <b>kleinere</b> Einheit → mal. 4 m = 4 · 100 = 400 cm.<br>In die <b>größere</b> Einheit → durch. 350 cm = 350 : 100 = 3,5 m.'],
 ['Länge addieren','Rechne nur mit gleichen Einheiten: 2 m 30 cm + 85 cm = 230 cm + 85 cm = 315 cm = 3 m 15 cm.']
],{trick:'Kleiner werden = mehr Zahl (mal). Größer werden = weniger Zahl (durch).',gen:'laenge'}),
T('m-gewicht','Gewicht','gewicht g kg t gramm kilogramm tonne',[
 ['Die Einheiten','1 kg = 1 000 g · 1 t = 1 000 kg'],
 ['Beispiele','Ein Apfel wiegt ca. 150 g, ein Schüler etwa 40 kg, ein Auto etwa 1 t.']
],{gen:'gewicht'}),
T('m-zeit','Zeit','zeit stunde minute sekunde uhr h min s',[
 ['Zeiteinheiten','1 h = 60 min · 1 min = 60 s · 1 Tag = 24 h'],
 ['Zeitspannen','Von 14:35 bis 16:10: erst bis 15:00 (25 min), dann bis 16:00 (60 min), dann 10 min → <b>1 h 35 min</b>.']
],{trick:'Zeit rechnet man mit 60, nicht mit 10!',gen:'zeit'}),
T('m-massstab','Maßstab','maßstab verkleinern vergrößern karte plan zeichnung',[
 ['Was bedeutet 1 : 100?','1 cm auf der Zeichnung sind 100 cm (= 1 m) in Wirklichkeit.'],
 ['Rechnen','Zeichnung → Wirklichkeit: <b>mal</b> Maßstabszahl. Wirklichkeit → Zeichnung: <b>durch</b> Maßstabszahl.']
],{gen:'massstab'})
]},
{t:'Flächen',i:'🟦',tp:[
T('m-rechteck','Rechteck und Quadrat','rechteck quadrat fläche flächeninhalt umfang formel a mal b',[
 ['Umfang','Der Umfang ist die Länge des Randes. <b>Rechteck: U = 2 · (a + b)</b> · Quadrat: U = 4 · a'],
 ['Flächeninhalt','Der Flächeninhalt ist, wie viel Platz die Fläche hat. <b>Rechteck: A = a · b</b> · Quadrat: A = a · a'],
 ['Einheiten','Länge in cm → Umfang in cm. Fläche in <b>cm²</b> (Quadratzentimeter).']
],{trick:'Umfang = Zaun um die Wiese, Fläche = Rasen darin.',gen:'rechteck'}),
T('m-parallelogramm','Parallelogramm, Raute, Trapez, Drachen','parallelogramm raute trapez drachen dreieck höhe grundseite fläche',[
 ['Die Vierecke','<b>Parallelogramm</b>: gegenüberliegende Seiten parallel · <b>Raute</b>: alle 4 Seiten gleich lang · <b>Trapez</b>: ein Paar paralleler Seiten · <b>Drachen</b>: zwei Paare gleich langer Nachbarseiten.'],
 ['Flächeninhalt Parallelogramm','<b>A = Grundseite · Höhe</b>. Die Höhe steht senkrecht auf der Grundseite.'],
 ['Dreieck','Ein Dreieck ist ein halbes Parallelogramm: <b>A = g · h : 2</b>.']
],{gen:'parallelogramm'}),
T('m-flaecheneinheiten','Flächeneinheiten','flächeneinheiten mm² cm² dm² m² ar hektar km² umrechnen',[
 ['Mit 100 springen','1 cm² = 100 mm² · 1 dm² = 100 cm² · 1 m² = 100 dm²'],
 ['Große Flächen','1 a (Ar) = 100 m² · 1 ha (Hektar) = 100 a = 10 000 m² · 1 km² = 100 ha'],
 ['Vorstellung','1 m² ist so groß wie eine Fliese 1 m × 1 m. Ein Fußballfeld hat etwa 1 ha.']
],{trick:'Bei Längen springst du mit 10, bei Flächen mit 100.',gen:'flaecheneinheit'}),
T('m-zusammengesetzt','Zusammengesetzte Figuren','zusammengesetzte figuren l-form zerlegen fläche',[
 ['Zerlegen','Teile eine L-förmige Figur in zwei Rechtecke. Rechne beide Flächen aus und <b>addiere</b>.'],
 ['Oder ergänzen','Ergänze zum großen Rechteck und ziehe das fehlende Stück <b>ab</b>.']
],{ex:[
 X('Eine L-Figur besteht aus einem Rechteck 6 cm × 4 cm und einem Rechteck 3 cm × 2 cm. Wie groß ist die Fläche (cm²)?',30,'Beide Flächen addieren.',null,'6·4 = 24, 3·2 = 6, zusammen 30'),
 X('Ein Rechteck 10 cm × 8 cm hat links oben eine Ecke 4 cm × 3 cm herausgeschnitten. Wie groß ist der Rest (cm²)?',68,'Große Fläche minus fehlendes Stück.',null,'80 − 12 = 68')]})
]},
{t:'Brüche',i:'🍕',tp:[
T('m-bruchteile','Brüche als Teile vom Ganzen','bruch zähler nenner bruchteil teile vom ganzen pizza',[
 ['Zähler und Nenner','<div class="big">3/8</div>Der <b>Nenner</b> (unten) sagt, in wie viele gleich große Teile das Ganze geteilt ist. Der <b>Zähler</b> (oben) sagt, wie viele Teile genommen werden.'],
 ['Beispiel Pizza 🍕','Eine Pizza in 8 Stücke, du isst 3 → du isst <b>3/8</b>. Übrig bleiben 5/8.'],
 ['Ein Ganzes','Alle Teile zusammen sind ein Ganzes: 8/8 = 1.']
],{trick:'Nenner = Nummer der Teile (unten), Zähler = Zahl der Teile die du nimmst (oben).',gen:'bruchteil'}),
T('m-bruchzus','Brüche zusammenfassen','brüche addieren subtrahieren zusammenfassen gleichnamig',[
 ['Gleiche Nenner','Bei gleichem Nenner rechnest du nur mit den <b>Zählern</b>. Der Nenner bleibt. 2/8 + 3/8 = <b>5/8</b>.'],
 ['Subtrahieren','7/10 − 4/10 = <b>3/10</b>.'],
 ['Wichtig','Den Nenner addierst du nie! 2/8 + 3/8 ist nicht 5/16.']
],{gen:'bruchadd'}),
T('m-gemischt','Gemischte Zahlen','gemischte zahlen unechter bruch ganze',[
 ['Ganze und Teile','7/4 = 1 3/4, denn 4/4 sind ein Ganzes und 3/4 bleiben.'],
 ['Umwandeln','Bruch → gemischte Zahl: Zähler : Nenner = Ganze mit Rest. 11/4 → 11 : 4 = 2 Rest 3 → 2 3/4.<br>Gemischte Zahl → Bruch: Ganze · Nenner + Zähler. 2 3/4 → 2·4+3 = 11 → 11/4.']
],{gen:'gemischt'}),
T('m-anteile','Anteile von Größen','anteile von größen bruch von',[
 ['So rechnest du','<b>1/4 von 20 €</b>: Teile durch den Nenner: 20 : 4 = 5 €.<br><b>3/4 von 20 €</b>: erst 1/4 = 5 €, dann mal 3 = 15 €.'],
 ['Tipp','Die Hälfte ist 1/2, ein Viertel die Hälfte von der Hälfte, ein Zehntel streichst du eine Null.']
],{gen:'anteil'})
]},
{t:'Daten',i:'📊',tp:[
T('m-listen','Daten in Listen','daten listen strichliste tabelle umfrage',[
 ['Strichliste','Bei einer Umfrage machst du für jede Antwort einen Strich. Jeder 5. Strich geht <b>quer</b> durch: ||||̸ = 5.'],
 ['Tabelle','Zähle die Striche und schreibe die Anzahl in eine Tabelle.']
],{ex:[X('Eine Strichliste zeigt: Hund |||| ||, Katze |||| |||. Wie viele Kinder haben insgesamt geantwortet?',13,'Hund 6, Katze 7',null,'6 + 7 = 13')]}),
T('m-diagramme','Diagramme lesen und zeichnen','diagramm säulendiagramm balkendiagramm lesen zeichnen',[
 ['Säulendiagramm','Die Höhe jeder Säule zeigt die Anzahl. Lies auf der <b>y-Achse</b> den Wert ab.'],
 ['Zeichnen','1. Achsen zeichnen. 2. Gleichmäßige Skala wählen. 3. Säulen gleich breit. 4. Beschriften und Titel.']
],{gen:'diagramm'}),
T('m-daten-vgl','Daten vergleichen','daten vergleichen größter kleinster spannweite',[
 ['Größter und kleinster Wert','Suche den größten Wert (Maximum) und den kleinsten (Minimum).'],
 ['Spannweite','<b>Spannweite = größter − kleinster Wert</b>. Sie zeigt, wie weit die Werte auseinanderliegen.']
],{gen:'datenliste'})
]},
{t:'🪄 Trick-Kiste',i:'🪄',tp:[
T('t-11','Mal 11','mal 11 trick quersumme elf',[
 ['Der 11-Trick','Zweistellige Zahl · 11: <b>Schreibe die beiden Ziffern auseinander und setze ihre Summe in die Mitte.</b><br>35 · 11 = 3 | 3+5 | 5 = <b>385</b>.'],
 ['Mit Übertrag','78 · 11 = 7 | 7+8=15 | 8 → die 1 vom Übertrag zur 7: 8 | 5 | 8 = <b>858</b>.']
],{gen:'trick11'}),
T('t-5','Mal 5','mal 5 trick halbieren fünf',[['Mal 10, halbieren','48 · 5 = 480 : 2 = <b>240</b>.<br>Oder: erst halbieren, dann mal 10: 24 · 10 = 240.']],{gen:'trick5'}),
T('t-9','Mal 9','mal 9 trick neun finger',[
 ['Mal 10 minus die Zahl','47 · 9 = 470 − 47 = <b>423</b>.'],
 ['Fingertrick für die 9er-Reihe','Halte beide Hände vor dich. Für 9 · 4: knicke den 4. Finger. Links davon sind 3 Finger (Zehner), rechts 6 Finger (Einer): <b>36</b>.']
],{gen:'trick9'}),
T('t-25','Mal 25','mal 25 trick viertel',[['Durch 4, mal 100','48 · 25 = (48 : 4) · 100 = 12 · 100 = <b>1 200</b>. Denn 4 · 25 = 100.']],{gen:'trick25'}),
T('t-4','Mal 4 und mal 8','mal 4 mal 8 verdoppeln',[['Verdoppeln','Mal 4 = zweimal verdoppeln: 37 · 4 → 74 → 148.<br>Mal 8 = dreimal verdoppeln.']],{gen:'trick4'}),
T('t-99','Plus und minus 9 / 99','plus 99 minus 9 trick',[['Fast ein Zehner / Hunderter','356 + 99 = 356 + 100 − 1 = <b>455</b>.<br>356 − 99 = 356 − 100 + 1 = <b>257</b>.']],{gen:'plus99'}),
T('t-teilbar','Teilbarkeitsregeln','teilbarkeit teilbar durch 2 3 5 9 10 quersumme',[
 ['Die Regeln','<b>2</b>: letzte Ziffer gerade · <b>5</b>: letzte Ziffer 0 oder 5 · <b>10</b>: letzte Ziffer 0 · <b>3</b>: Quersumme durch 3 teilbar · <b>9</b>: Quersumme durch 9 teilbar'],
 ['Quersumme','Addiere alle Ziffern: 4 374 → 4+3+7+4 = 18. 18 ist durch 3 und 9 teilbar → 4 374 auch!']
],{gen:'teilbar'}),
T('t-quadrat5','Zahlen mit 5 am Ende quadrieren','quadrat 5 trick 35 mal 35',[['Der Trick','35 · 35: Nimm die Zehnerziffer 3 mal die nächste Zahl 4 = 12, hänge 25 an → <b>1 225</b>.']],{gen:'quadrat5'}),
T('t-durch5','Durch 5 teilen','geteilt durch 5 trick',[['Mal 2, dann durch 10','135 : 5 = 270 : 10 = <b>27</b>.']],{gen:'geteilt5'})
]}
];
