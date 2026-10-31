# Idee e questioni aperte

Le voci di questo documento non sono requisiti approvati. Devono essere confrontate, prototipate oppure discusse una alla volta.

## Style Lab

Creare una pagina o un ambiente di sviluppo che mostri componenti e token in isolamento. La costruzione segue questo ordine confermato:

1. fondazioni;
2. contenuto base;
3. primitive;
4. componenti;
5. strutture;
6. stati.

Lo Style Lab deve permettere confronti a parità di contenuto e includere almeno:

- palette e materiali;
- scale tipografiche;
- fogli, quaderni e superfici da scrivania;
- terminale a matita;
- post-it, scotch, graffette, puntine ed evidenziatori;
- pulsanti, link, controlli e stati di focus;
- card e anteprime dei progetti;
- icone custom e loghi ufficiali integri, inseriti in supporti coerenti con il portfolio;
- diagrammi e finestre di codice;
- animazioni e modalità reduced-motion;
- casi con testo italiano e inglese;
- responsive e zoom;
- stati vuoti, errore e caricamento.

## Alternative visive da confrontare

### Bottoni e CTA

- Leva da banco resta l'unica proposta di bottone operativo ancora in valutazione nello Style Lab.
- Le alternative di bottoni e CTA non selezionate sono state rimosse dallo Style Lab per mantenere visibili soltanto le decisioni confermate e la prova ancora attiva.
- Le sei proposte vivono nello Style Lab e non sono componenti approvati finché non viene scelta una variante per ciascuna famiglia.

- Unico quaderno che si sfoglia.
- Scrivania con fogli ed elementi sovrapposti.
- Combinazione di quaderno e scrivania.
- Intera view trattata come un unico foglio continuo, dall'intestazione fino all'ultimo contenuto, senza superficie esterna visibile.
- Scrivania arricchita con graffette, scotch, matite, gomme e altri oggetti coerenti.
- Tema soltanto chiaro.
- Modalità notturna trattata come una scena fisica illuminata, non come inversione dei colori.
- Scrittura manuale ordinata e progettuale.
- Scrittura irregolare da appunti rapidi.
- Ritratto realistico a matita.
- Ritratto stilizzato vicino a Excalidraw.
- Elementi che si disegnano progressivamente durante lo scroll.
- Nel Percorso è in prova una timeline sinuosa a grafite, attraversata da una sola matita, con le tappe trattate come reperti fisici sovrapposti al banco; la direzione visiva deve essere verificata e approvata prima di diventare una decisione confermata.

## Materiali non ancora disponibili

- Fotografia personale da trasformare in ritratto.
- Testi e ordine delle tappe del Percorso (`src/sections/JourneySection.vue`): bozza da confermare, in particolare se il corso HackAdemy viene prima o dopo l'iscrizione al serale e l'anno di inizio.
- Dove elencare tutti i progetti, ora che non stanno più nel Percorso.
- Testi di Chi sono: le frasi in `src/sections/AboutOpening.vue` sono una bozza scritta a partire dal profilo nella DevBase; Giuseppe deve confermare i fatti (Modugno, tirocinio, Istituto Marconi, quinto anno) e approvare o riscrivere le parole. Manca la versione inglese.
- Su schermi molto grandi quaderno e fogli restano piccoli rispetto allo schermo, perché la scrivania è larga al massimo 80rem: valutare se allargarla.
- Illustrazione "Dalle forbici al codice": i libri disegnati citano React e Next.js, mentre il portfolio è in Vue; le scritte sui biglietti sono dentro l'immagine e restano in italiano anche nella versione inglese.
- Valutare nello Style Lab il trattamento della fotografia strappata già disponibile: parrucchiere da una parte e web developer dall'altra.
- Inventario completo dei repository GitHub esistenti.

## Contenuti e capolavori candidati

- Second Brain: knowledge base scolastica ispirata al metodo DevBase, con identità propria, metodo editoriale, plugin e regole.
- Possibile versione di Second Brain consultabile direttamente dal browser.
- Progetti full stack e AI.
- Cybersecurity come qualità trasversale o progetto dedicato.
- Uno o più giochi web.
- Apprendimento della pixel art per correggere e animare asset generati con strumenti AI.

## Decisioni tecniche aperte

- Valori cromatici definitivi degli inchiostri e dei materiali, dopo verifica nello Style Lab.

- JavaScript o TypeScript dopo una prova concreta.
- Strategia affidabile per URL puliti su GitHub Pages in una SPA.
- Formato definitivo dei dati strutturati.
- Organizzazione dei file Markdown bilingui.
- Strategia di caricamento delle demo interattive.
- Demo attiva nella card oppure apertura in uno spazio più grande.
- Libreria di animazione oppure CSS e Web Animations API. L'apertura del quaderno in Copertina usa soltanto CSS guidato dalla posizione di scorrimento, senza librerie.
- Confine tra SVG inline, componenti Icon e asset statici.
- Strategia per rendere Second Brain accessibile dal browser.
- Numero di linguette della navbar a regime e larghezza a cui passare all'Indice, da verificare con le etichette reali in italiano e in inglese.

## Questioni organizzative aperte

- Data di consegna del link su Unica.
- Tempo settimanale disponibile.
- Possibilità e modalità d'uso della chiavetta sul computer dell'esame.
- Eventuale analisi dei vecchi repository prima della cancellazione.
- Nome definitivo del portfolio e testi definitivi dell'etichetta in Copertina (oggi: "Portfolio", "di Giuseppe Pentrelli", "Esame di Stato 2026–2027").
- Numero e scope dei nuovi capolavori.
