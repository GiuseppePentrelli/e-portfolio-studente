# Decisioni confermate

Questo documento raccoglie soltanto decisioni già approvate. Le alternative non ancora risolte si trovano in [Idee e questioni aperte](04-idee-e-questioni-aperte.md).

## Prodotto

- Nome di lavoro: Portfolio2026.
- Destinazione principale: Esame di Stato 2026-2027.
- Il sito rimarrà utile e aggiornabile anche dopo l'esame.
- Home narrativa lunga con pagine di approfondimento.
- SPA.
- Portfolio interamente statico, senza backend e senza analytics.
- Italiano e inglese completi.

## Stack iniziale

- Vue 3.
- Vite.
- CSS nativo.
- Vue Router, necessario per le pagine della SPA.
- Nessun Tailwind nello stack iniziale.
- Nessun Pinia nello stack iniziale; verrà introdotto soltanto se emerge stato globale complesso.
- TypeScript da provare nello Style Lab prima della decisione definitiva.
- Astro escluso.

## Design

- DevBase Carta come riferimento identitario.
- Lo Style Lab procede nell'ordine: fondazioni, contenuto base, primitive, componenti, strutture, stati.
- Scrivania e sfondo illustrato sono entrambi approvati come ambienti candidati per sezioni differenti.
- La variante neutra è scartata; viene sostituita da un esperimento in cui l'intero sito coincide con il foglio.
- La forma Quaderno è la preferita per il foglio.
- Foglio a righe con margine sinistro.
- Terminale disegnato a matita.
- Linguaggio Excalidraw, penna, matita, diagrammi e disegni.
- Colori pastello, evidenziatori e post-it.
- Le evidenziazioni riprendono il tratto di pennarello della DevBase Carta: irregolare, traslucido e più carico alle estremità, anche quando il testo va a capo.
- La palette distingue gli inchiostri dai materiali: nero/grafite per il testo principale, blu per collegamenti e informazioni, rosso per correzioni e attenzione, verde per conferme e risultati positivi; carta, evidenziatori e post-it appartengono a un livello separato.
- Il significato non viene mai affidato soltanto al colore, ma anche a testo, icone o forme.
- Immagini fissate con lo scotch.
- Progressione da giocoso e spontaneo a più elegante e maturo.
- Icone dell'interfaccia progettate localmente.
- Riconoscibilità dei loghi ufficiali prioritaria rispetto alla personalizzazione.
- Portfolio silenzioso per impostazione predefinita.
- La navigazione principale usa la navbar a linguette del prototipo approvato: sticky su carta, linguette colorate per le sezioni, indicatore di lettura a matita e menu mobile su post-it.
- La navbar mantiene la stessa identità visiva del prototipo e viene implementata come componente Vue accessibile, con gestione di tastiera, focus, sezione corrente e responsive.
- Il footer riprende il retro della copertina del prototipo approvato: etichetta scolastica, collegamenti interni ed esterni, codice a barre decorativo, nota di build e comando per tornare all'inizio.
- Nel footer, GitHub e LinkedIn sono collegamenti a forma di francobollo: gli asset ufficiali restano integri sulla carta avorio vissuta; bordo dentellato e frammenti interni di timbro postale completano il supporto senza modificare i marchi.
- I checkbox riprendono il prototipo approvato: quadratino disegnato, spunta rossa e testo completato attraversato da un tratto irregolare a penna; il controllo nativo rimane accessibile.
- I collegamenti nel contenuto usano il componente condiviso `HighlighterLink`: inchiostro blu, freccia `→` automatica e passata gialla di evidenziatore su hover, focus da tastiera e pressione. Navbar, footer e skip link mantengono componenti dedicati e il comportamento nativo del collegamento resta invariato.
- Le azioni distruttive usano una conferma sul posto tramite il componente condiviso `DestructiveConfirmButton`: “No” riceve il focus iniziale, Escape, clic esterno e scadenza annullano l'azione, mentre l'operazione reale resta responsabilità del componente genitore.
- Le CTA narrative principali usano il componente condiviso `FocusLensLink`: il soggetto resta sfocato, mentre una lente lo rende nitido e rosso durante il passaggio e si ferma sulle lettere finali. I collegamenti ordinari continuano a usare `HighlighterLink`.
- Il comando mobile della navbar usa tre tratti di matita accompagnati dalla parola “Indice”; quando il menu è aperto, una X rossa attraversa i tratti.
- Il menu mobile esce come un post-it giallo; la sezione corrente è racchiusa da un cerchio rosso irregolare.
- Il sistema tipografico assegna una voce stabile a ogni ambiente: Nunito all'interfaccia esterna al quaderno, Excalifont ai contenuti del quaderno, Comic Shanns al terminale e Allura alle citazioni brevi.
- Allura viene usato a dimensione maggiore e soltanto come accento, per conservarne la leggibilità.
- Il budget iniziale dei font è fissato a 135 kB complessivi in formato WOFF2; ogni aggiunta futura deve rientrare nella soglia oppure motivarne esplicitamente la revisione.
- I font usano `font-display: swap`; non vengono precaricati indiscriminatamente e le varianti inutilizzate non fanno parte della build.

## Struttura del sito

- La home narrativa è composta da otto sezioni, in quest'ordine: Copertina, Chi sono, Percorso, Capolavori, Componenti, Competenze, Certificazioni, Documenti. I contatti restano nel footer.
- Il Percorso racconta la persona, non i progetti: le tappe di Giuseppe (il salone, il primo codice, il ritorno a scuola, il quinto anno). I progetti entrano nelle sezioni successive.
- Dalla scena di Chi sono al Percorso la scrivania della Copertina finisce con il suo bordo; sotto, sul muro, è appesa una bacheca di sughero con la cornice di legno. Il titolo è una scheda a righe fissata con due puntine. Le tappe sono reperti appuntati con le puntine e un filo rosso le unisce nell'ordine del racconto: si tende un tratto alla volta, mentre la puntina d'arrivo entra nello schermo, e con movimento ridotto è già teso. La forma del filo si calcola dalla posizione delle puntine. Su desktop le tappe si alternano ai due lati, ognuna comincia prima che la precedente finisca, e la puntina del filo sta nell'angolo verso il centro: il filo scende fra le colonne senza passare sui testi. Quando la bacheca è più stretta di 46rem le tappe sono in colonna e il filo scende lungo il margine sinistro. Gli oggetti che non si appendono diventano polaroid appuntate.
- Nella tappa del salone c'è la pagina della settimana strappata da un'agenda a spirale, con i fori rotti in alto, i giorni da lunedì a mercoledì e appuntamenti generici; sopra, un post-it giallo porta il racconto personale; accanto, la polaroid di phon e spazzola, che si sviluppa come una Polaroid vera mentre entra nello schermo: parte nera, si schiarisce e i colori arrivano per ultimi. Non compaiono nomi o dati di clienti.
- Nella tappa del primo codice c'è il primo index.html stampato, con i numeri di riga e una piega a metà, e sopra un post-it azzurro con il racconto. Il portatile HP interattivo, costruito in HTML e CSS con la tastiera italiana e lo schermo che passa dal codice all'anteprima del primo sito, esce dal Percorso e resta disponibile per i Capolavori. Anche il terminale disegnato resta disponibile per un uso successivo.
- Nella tappa del ritorno a scuola il racconto è su un foglio a quadretti staccato dal quaderno ad anelli, con la spunta verde su 2°, 3° e 4° anno conclusi; accanto c'è una polaroid viva con lo zaino blu costruito in 3D in HTML e CSS: mentre scorri la metà davanti si apre e salgono i libri di Informatica, con in copertina una mano umana e una robotica che quasi si toccano come nella Creazione di Adamo, e di Sistemi e reti. Si apre una volta sola, seguendo lo scorrimento; con movimento ridotto è già aperto.
- Nella tappa di oggi c'è il foglio con la foto davanti alla scuola; accanto, appeso a una puntina, pende il badge del tirocinio con il viso preso dal ritratto a matita della Copertina, nome, ruolo e cordino. Sul badge non compaiono nome o logo dell'azienda.
- I testi di ogni tappa si scrivono a mano seguendo lo scorrimento, in ordine di lettura: la data, il titolo, poi il testo una riga dopo l'altra. Le spunte sugli anni arrivano a testo finito. Con movimento ridotto, o dove il browser non lo supporta, i testi sono già scritti.
- I Capolavori sono una mostra: dopo la bacheca si entra in una sala con la parete scura color petrolio, il cornicione in alto e il battiscopa in basso. Le opere pendono a filo da un chiodo, in cornici di legno chiaro con passe-partout, e accanto a ognuna c'è un cartellino da museo con anno, tecnica, ruolo e riassunto. Il capolavoro principale è l'opera grande, illuminata dalla sua lampada da quadro in ottone; le altre opere sono più piccole e stanno sotto. Mentre un'opera sale nello schermo la penombra se ne va e si accende la luce sulla parete; con movimento ridotto è già tutto acceso. I posti ancora senza opera sono cornici imballate nella carta da pacchi con il cartello "Opera in allestimento", almeno due. Finché il progetto non è scelto, il capolavoro principale è un segnaposto con un'anteprima disegnata a matita. Il cartellino porta alla pagina dell'opera con la CTA Messa a fuoco, quando la pagina esiste.
- I progetti compaiono in Capolavori, quelli in evidenza con card ricche; dove elencarli tutti è da ridefinire, non più nel Percorso. Il dato è unico: ogni progetto è un solo elemento con un indicatore di capolavoro, ed entrambe le sezioni portano alla stessa pagina di approfondimento.
- La Copertina si raggiunge dal marchio "Giuseppe." della navbar e non ha una linguetta propria.
- Regola di movimento del sito: nulla compare dal nulla e nulla sparisce nel nulla. Ogni elemento entra ed esce in modo fisico e credibile (scivola, si apre, viene posato, passa sotto o dietro qualcos'altro); dissolvenze e comparse improvvise non sono ammesse come unico mezzo.
- La Copertina è il fronte del quaderno chiuso, speculare al footer che ne è il retro: cartoncino, dorso, etichetta scolastica con titolo e autore. All'apertura il titolo viene scritto a penna e poi evidenziato, una sola volta; con movimento ridotto compare già scritto. I testi dell'etichetta sono provvisori.
- Il quaderno in Copertina ha proporzione 3:4 e sta per intero nello schermo, a ogni larghezza: non si allunga con il contenuto.
- Il passaggio dalla Copertina a Chi sono avviene scorrendo, senza pulsanti, in una scena unica: l'elastico viene tirato oltre il bordo e passa dietro il quaderno, lasciando visibili le punte; mentre il quaderno si solleva per aprirsi, la scrivania entra dal basso come un sottomano e gli scivola sotto, con gli oggetti già appoggiati sopra; la copertina ruota sul dorso e si apre; la prima pagina viene strappata dal quaderno — si stacca dall'alto, resta con il bordo sinistro frastagliato e lascia un moncone lungo il dorso —, si solleva e si posa al centro della scrivania, grande com'era nel quaderno, mentre il quaderno si richiude, esce a sinistra oltre il bordo della scrivania e rientra verso destra infilandosi sotto di essa, e matita, penna, nastro, gomme e graffette dello Style Lab entrano dai bordi; sulla prima pagina, mentre la copertina finisce di aprirsi, vengono scritti a penna il titolo di Chi sono e la presentazione, un capoverso alla volta; tutto viaggia con il foglio. Scrivania e foglio restano della lunghezza della scena: non proseguono sotto. Ciò che viene dopo sarà un'altra sezione, con animazioni proprie ancora da definire.
- L'animazione segue lo scorrimento in entrambe le direzioni, inseguendolo con un breve ritardo che ammorbidisce gli scatti della rotella. Con movimento ridotto il quaderno resta chiuso e Chi sono inizia sotto, già su foglio e scrivania.
- Chi sono usa l'ambiente "foglio su scrivania" provato nello Style Lab.
- Sul piano della scrivania ci sono piccole scritte a matita sbiadite e sbavate, come su un banco di scuola (un tris, tacche di conteggio, iniziali e anno, uno scarabocchio, "404 sonno non trovato"): decorative, fanno parte del piano e si muovono con lui.
- Da 64rem di larghezza la scrivania è un pannello con le misure dello Style Lab: largo al massimo 80rem, centrato, con margine laterale, angoli arrotondati e ombra, sullo sfondo neutro della pagina. Sotto quella larghezza occupa tutto lo schermo.
- La copertina ha un piccolo strappo sul bordo superiore, segno di quaderno vissuto: è ritagliato davvero, nello stesso punto su fronte e interno, e lascia vedere la carta delle pagine a quaderno chiuso e la scrivania a quaderno aperto.
- L'interno della copertina riprende le tabelline stampate nei quaderni di scuola: una "Tavola delle scorciatoie" da tastiera con un'annotazione a mano, e in fondo una tasca di cartoncino da cui spuntano un foglio a righe e due post-it; sulla tasca sono stampati la riga "80 fogli · rigo 28 px · fatto con Vue 3, Vite e CSS nativo" e un righello. I foglietti portano appunti veri del progetto e, come le foto in copertina, si sollevano e oscillano con un'ombra che si allunga quando la copertina si muove o il puntatore ci passa sopra. È decorativo e sostituisce la scritta con nome e cognome.
- Dal quaderno vengono strappati insieme due fogli, per raddoppiare lo spazio della presentazione: il primo, a sinistra, porta il titolo e la presentazione in prima persona; il secondo, a destra, il disegno "Dalle forbici al codice", senza cornice né didascalia, con i bordi irregolari sfumati a matita, che compare in diagonale quando il foglio si scopre. Si posano uno accanto all'altro quando lo spazio lo permette, altrimenti restano impilati e, con un tratto di scorrimento in più, il primo scivola via e scopre il secondo. Non più di due fogli.
- La disposizione non dipende da soglie fisse di larghezza: la Copertina misura lo spazio reale e decide se il quaderno aperto entra per intero e se i due fogli stanno affiancati lasciando posto agli oggetti della scrivania; per farceli stare può rimpicciolire il quaderno fino al 20%. Quaderno e fogli sono centrati in altezza nella scrivania.
- Sui fogli ogni misura (testo, righe, margini, immagine) è proporzionale alla larghezza del foglio: a qualsiasi schermo il testo va a capo negli stessi punti e ci sta la stessa quantità di contenuto, circa venti righe per foglio.
- I due fogli strappati hanno segni d'uso leggeri: angoli ingialliti, una piega orizzontale, sbavature di grafite e la grana della carta, disposti a specchio sul secondo foglio; soltanto il primo ha l'alone di una tazza di caffè, in alto a destra; soltanto il secondo un angolo stropicciato, in basso a destra.
- Sotto la pagina strappata il quaderno mostra una pagina di appunti decorativa, disegnata a penna e matita: titolo, diagramma di flusso, evidenziazioni di più colori, cerchiature, punti interrogativi e scarabocchi. I testi sono veri, presi dalla nota "Vue 3 — Composition API" della DevBase; non è pensata per essere letta ed è nascosta alle tecnologie assistive.
- In Copertina, a sinistra del ritratto, è fissata con lo scotch l'illustrazione di Giuseppe davanti all'ingresso della scuola. L'illustrazione "Dalle forbici al codice" sta soltanto sul primo foglio di Chi sono, dove racconta la sua storia.
- Sul quaderno in Copertina è fissato con lo scotch il ritratto a matita di Giuseppe con zaino e quaderno, in basso a destra, con il bordo infilato sotto l'elastico. Lo scotch fa da cerniera: il lembo libero si solleva e oscilla appena quando la copertina si muove o quando il puntatore passa sulla foto, e torna fermo da solo; con movimento ridotto resta immobile. Questo comportamento è il componente condiviso `TapedPhoto`, riutilizzabile per qualsiasi immagine fissata con lo scotch.
- Sulla copertina ogni misura è proporzionale alla larghezza del quaderno: a qualsiasi schermo etichetta, foto e adesivi mantengono le stesse posizioni reciproche del desktop.
- Il quaderno in Copertina ha un elastico sul lato destro, ripreso dal prototipo: si può tirare e torna in posizione come una molla, e vibra una volta alla fine dell'animazione di apertura. È decorativo: non apre nulla, non riceve il focus e resta fermo con movimento ridotto.
- Le linguette vengono aggiunte una alla volta, insieme alla sezione che rappresentano; quante mostrarne a regime resta una questione aperta.
- Home, navbar e footer leggono le sezioni da un unico elenco ordinato (`src/sections/index.js`).
- Il dettaglio di ogni sezione e le parti ancora in discussione sono in [Struttura del sito](08-struttura-del-sito.md).

## Contenuti

- Il primo anno è escluso.
- Secondo, terzo e quarto anno formano un capitolo retrospettivo unico.
- Il quinto anno costituisce la fase presente.
- Ogni progetto conserva l'anno scolastico reale.
- Componenti custom provabili nel sito.
- Sezione certificazioni obbligatoria.
- Sezione competenze tecniche obbligatoria.
- Nessuna percentuale arbitraria per le competenze.
- SAD web più documento ufficiale.
- CV professionale.
- Ritratto disegnato derivato da una fotografia reale.
- Second Brain scolastico come primo capolavoro candidato.

## Qualità

- WCAG 2.2 AA obbligatorio; AAA dove applicabile.
- Lighthouse minimo 95 per categoria, obiettivo 100.
- Responsive completo per mobile, tablet e desktop.
- Test automatici e manuali, inclusi confronti visivi.
- Gli effetti visivi sono sacrificabili quando danneggiano accessibilità o performance.

## Processo

- Scrumban leggero con sprint settimanali.
- Documentazione tecnica in italiano e in Markdown.
- Il repository `GiuseppePentrelli/e-portfolio-studente` ha una cronologia pulita a nome di Giuseppe ed è gestito dalla cartella di lavoro in WSL con l'account personale, senza chiavi SSH lavorative.
- Il push su `main` pubblica il sito: GitHub Actions esegue la build e la pubblica su GitHub Pages, con `404.html` copia di `index.html` per le rotte aperte direttamente.
- Il nuovo portfolio ha già sostituito il vecchio allo stesso indirizzo, anche se è in costruzione; il vecchio è archiviato in locale.

## Stato di implementazione

- È autorizzata la prima implementazione circoscritta dello Style Lab.
- Lo Style Lab vive nella stessa applicazione del portfolio, non in un progetto separato, all'indirizzo `/style-lab`.
- È autorizzato lo scheletro del portfolio: home costruita dall'elenco delle sezioni, navbar e footer collegati allo stesso elenco. Le sezioni vengono aggiunte una alla volta; contenuti definitivi, pagine di approfondimento e internazionalizzazione restano da autorizzare.
- La prima area implementata confronta superfici, sfondi e proporzioni del foglio.
- Gli script npm sono l'unica interfaccia iniziale dei comandi; nessun Makefile per ora.
- Le sezioni della home si progettano direttamente nell'applicazione; lo Style Lab resta il banco di prova di componenti e primitive (DEC-079).
