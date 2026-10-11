# Registro delle decisioni

Il registro riassume le decisioni che cambiano la direzione del prodotto. Le future decisioni architetturali potranno diventare ADR separati quando richiederanno alternative, conseguenze e motivazioni più estese.

| ID | Data | Decisione | Stato |
| --- | --- | --- | --- |
| DEC-001 | 2026-10-09 | Il vecchio portfolio viene studiato ma non usato come base da copiare. | Confermata |
| DEC-002 | 2026-10-09 | DevBase Carta è il riferimento principale per l'identità visiva. | Confermata |
| DEC-003 | 2026-10-09 | La crescita dal secondo al quinto anno viene raccontata anche attraverso la maturazione del design. | Confermata |
| DEC-004 | 2026-10-09 | Secondo, terzo e quarto anno formano un capitolo retrospettivo unico; il quinto è una fase separata. | Confermata |
| DEC-005 | 2026-10-09 | Home narrativa continua più pagine di approfondimento. | Confermata |
| DEC-006 | 2026-10-09 | SPA basata su Vue 3 e Vite. | Confermata |
| DEC-007 | 2026-10-09 | CSS nativo; Tailwind non viene installato inizialmente. | Confermata |
| DEC-008 | 2026-10-09 | Pinia viene introdotto soltanto se emerge un bisogno reale. | Confermata |
| DEC-009 | 2026-10-09 | Astro è escluso. | Confermata |
| DEC-010 | 2026-10-09 | TypeScript viene deciso dopo una prova nello Style Lab. | Da validare |
| DEC-011 | 2026-10-09 | WCAG 2.2 AA obbligatorio e AAA dove applicabile. | Confermata |
| DEC-012 | 2026-10-09 | Lighthouse minimo 95 per categoria, obiettivo 100. | Confermata |
| DEC-013 | 2026-10-09 | Nessun backend e nessun analytics. | Confermata |
| DEC-014 | 2026-10-09 | Il sito resta all'URL `/e-portfolio-studente/`. | Confermata |
| DEC-015 | 2026-10-09 | Il nuovo repository avrà cronologia pulita; il vecchio progetto verrà archiviato localmente prima della cancellazione. | Confermata |
| DEC-016 | 2026-10-09 | Processo Scrumban leggero con sprint settimanali. | Confermata |
| DEC-017 | 2026-10-09 | Documentazione tecnica in italiano e Markdown. | Confermata |
| DEC-018 | 2026-10-09 | Lo Style Lab procede da fondazioni e contenuto base verso primitive, componenti, strutture e stati. | Confermata |
| DEC-019 | 2026-10-09 | Git verrà inizializzato su Windows insieme all'identità personale, non nell'attuale workspace. | Confermata |
| DEC-020 | 2026-10-09 | Lo Style Lab viene integrato nell'applicazione principale e promuove nei componenti condivisi soltanto le varianti approvate. | Confermata |
| DEC-021 | 2026-10-09 | La prima implementazione dello Style Lab è limitata a superfici, sfondi e forma del foglio. | Confermata |
| DEC-022 | 2026-10-09 | Si usano inizialmente soltanto script npm; il Makefile verrà valutato se nasceranno workflow complessi. | Confermata |
| DEC-023 | 2026-10-09 | Scrivania, Illustrato e Solo foglio restano disponibili e potranno avere funzioni narrative diverse. | Confermata |
| DEC-024 | 2026-10-09 | Quaderno è la forma preferita del foglio; Solo foglio estende il foglio all'intera pagina. | Confermata |
| DEC-025 | 2026-10-09 | Il terminale chiaro disegnato a matita di DevBase entra nel linguaggio visivo come componente riutilizzabile. | Confermata |
| DEC-026 | 2026-10-10 | Il sistema tipografico usa Nunito per l'interfaccia esterna al quaderno, Excalifont per il quaderno, Comic Shanns per il terminale e Allura, a dimensione maggiore, per le citazioni brevi. | Confermata |
| DEC-027 | 2026-10-10 | Il budget iniziale dei font è 135 kB complessivi in WOFF2, con `font-display: swap`, nessun preload indiscriminato e nessuna variante inutilizzata. | Confermata |
| DEC-028 | 2026-10-10 | La palette separa quattro inchiostri con ruoli stabili — nero/grafite, blu, rosso e verde — dai colori dei materiali; nessun significato dipende soltanto dal colore. | Confermata |
| DEC-029 | 2026-10-10 | Le evidenziazioni adottano il tratto irregolare e traslucido della DevBase Carta, con estremità più cariche e supporto multilinea. | Confermata |
| DEC-030 | 2026-10-10 | La navigazione principale adotta la navbar a linguette del prototipo: sticky, con avanzamento a matita e menu mobile su foglio rigato, implementata come componente Vue accessibile. | Confermata |
| DEC-031 | 2026-10-10 | Il footer adotta il retro di copertina del prototipo, con etichetta scolastica, navigazione, contatti, codice a barre decorativo e ritorno all'inizio. | Confermata |
| DEC-032 | 2026-10-10 | I checkbox adottano il modello del prototipo con controllo nativo accessibile, spunta rossa disegnata e barratura irregolare a penna. | Confermata |
| DEC-033 | 2026-10-10 | Il comando mobile della navbar adotta tre tratti di matita con etichetta “Indice”; nello stato aperto i tratti vengono attraversati da una X rossa. | Confermata |
| DEC-034 | 2026-10-10 | Il pannello mobile della navbar sostituisce il foglio rigato con il post-it del prototipo; la sezione corrente viene cerchiata in rosso. | Confermata |
| DEC-035 | 2026-10-10 | I collegamenti GitHub e LinkedIn nel footer diventano francobolli verticali: marchi ufficiali integri su carta avorio vissuta, bordo dentellato e frammenti interni di timbro postale. | Confermata |
| DEC-036 | 2026-10-10 | I link nel contenuto usano inchiostro blu e una passata gialla di evidenziatore che compare su hover, focus e pressione, mantenendo semantica e comportamento nativi. | Confermata |
| DEC-037 | 2026-10-11 | `HighlighterLink` diventa la primitiva condivisa per tutti i collegamenti nel contenuto, con freccia `→` automatica; navbar, footer e skip link restano sistemi separati. | Confermata |
| DEC-038 | 2026-10-11 | Le azioni distruttive adottano una conferma sul posto riutilizzabile, con scelta sicura focalizzata e annullamento tramite Escape, clic esterno o scadenza. | Confermata |
| DEC-039 | 2026-10-11 | `FocusLensLink` diventa la CTA narrativa principale: la lente rende nitido e rosso il soggetto sfocato e conclude il movimento sulle lettere finali. | Confermata |
| DEC-040 | 2026-10-11 | La home narrativa ha otto sezioni in ordine fisso: Copertina, Chi sono, Percorso, Capolavori, Componenti, Competenze, Certificazioni, Documenti; i contatti restano nel footer. | Confermata |
| DEC-041 | 2026-10-11 | I progetti compaiono sia nel Percorso (tutti, per anno, in forma compatta) sia in Capolavori (soltanto quelli in evidenza, con card ricche), a partire da un unico dato con indicatore di capolavoro. | Confermata |
| DEC-042 | 2026-10-11 | È autorizzato lo scheletro del portfolio a partire da navbar e footer: la home nasce da un unico elenco di sezioni letto anche da navbar e footer, e lo Style Lab si sposta su `/style-lab`. | Confermata |
| DEC-043 | 2026-10-11 | La Copertina si raggiunge dal marchio "Giuseppe." e non ha linguetta; le linguette si aggiungono una alla volta insieme alle sezioni. Il numero definitivo di linguette è rinviato. | Confermata |
| DEC-044 | 2026-10-11 | La Copertina è il fronte del quaderno chiuso, in continuità con il footer che ne è il retro; il titolo sull'etichetta si scrive a penna una volta all'apertura. Scrivania e pagina che si scrive restano alternative scartate per la Copertina. | Confermata, in prova |
| DEC-045 | 2026-10-11 | Il quaderno in Copertina adotta l'elastico del prototipo come elemento decorativo: si tira, torna a molla e vibra una volta a fine apertura, senza aprire il quaderno. | Confermata |
| DEC-046 | 2026-10-11 | Il ritratto a matita con zaino e quaderno, ritagliato dalla tavola dei quattro schizzi, viene fissato con lo scotch sul quaderno in Copertina. | Confermata |
| DEC-047 | 2026-10-11 | La chiamata all'azione in Copertina viene rimossa: il passaggio a Chi sono avviene scorrendo, con il quaderno che si apre e si posa sulla scrivania e la prima pagina che prosegue nel foglio della sezione. | Confermata |
| DEC-048 | 2026-10-11 | Nell'apertura del quaderno l'elastico non sparisce ma passa dietro, lasciando visibili le punte; l'animazione insegue lo scorrimento in modo ammorbidito su un tratto più breve; copertina aperta e pagina hanno la stessa lunghezza. | Confermata |
| DEC-049 | 2026-10-11 | Il quaderno resta di dimensione normale (3:4, intero nello schermo). Il passaggio a Chi sono è la prima pagina che esce dal quaderno e si posa sulla scrivania dello Style Lab, con gli oggetti che entrano dai bordi; sostituisce il quaderno aperto lungo quanto la sezione (parte di DEC-047 e DEC-048). | Confermata |
| DEC-050 | 2026-10-11 | Su desktop la scrivania non è a tutta larghezza: riprende il pannello dello Style Lab (massimo 80rem, centrato, angoli arrotondati, ombra). | Confermata |
| DEC-051 | 2026-10-11 | Quando la prima pagina esce, il quaderno si richiude, esce a sinistra oltre il bordo della scrivania e sparisce rientrando sotto di essa, invece di essere tagliato al bordo. | Confermata |
| DEC-052 | 2026-10-11 | La foto in Copertina si comporta come un foglio fissato solo in alto con lo scotch: il lembo libero si solleva e oscilla leggermente in risposta al movimento della copertina e al puntatore. | Confermata |
| DEC-053 | 2026-10-11 | Il titolo e le prime righe di Chi sono vengono scritti sulla prima pagina del quaderno mentre si apre; il testo attuale è riempitivo. | Confermata |
| DEC-054 | 2026-10-11 | La prima pagina esce dal quaderno con uno strappo: bordo sinistro frastagliato sul foglio (che prosegue in Chi sono) e moncone di carta lasciato lungo il dorso. | Confermata |
| DEC-055 | 2026-10-11 | Scrivania e foglio strappato hanno la lunghezza della scena e non proseguono sotto: la pagina resta della dimensione del quaderno. Lo scorrimento successivo apparterrà a un'altra sezione con animazioni proprie (sostituisce la prosecuzione del foglio di DEC-049). | Confermata |
| DEC-056 | 2026-10-11 | L'illustrazione "Dalle forbici al codice" non va sulla copertina ma sul foglio di Chi sono, fissata con lo scotch sotto il titolo, in prova. | Confermata, in prova |
| DEC-057 | 2026-10-11 | Il movimento della foto fissata con lo scotch diventa il componente condiviso `TapedPhoto`; la copertina è dimensionata interamente in proporzione al quaderno. Adesivi e seconda immagine in copertina restano in prova. | Confermata |
| DEC-058 | 2026-10-11 | La pagina che resta nel quaderno dopo lo strappo è una pagina di appunti decorativa con testi veri dalla DevBase (nota Vue 3 — Composition API), diagrammi e scarabocchi disegnati a mano. | Confermata |
| DEC-059 | 2026-10-11 | L'interno della copertina diventa una "Tavola delle scorciatoie" stampata, sul modello delle tabelline dei quaderni di scuola, con righello e annotazioni a mano; non ripete più nome e cognome. | Confermata, in prova |
| DEC-060 | 2026-10-11 | I fogli strappati diventano due: affiancati sulla scrivania su schermi larghi, impilati e scambiati con lo scorrimento sugli altri. Il testo del secondo foglio è riempitivo. | Confermata, in prova |
| DEC-061 | 2026-10-11 | La scena di Copertina e Chi sono si adatta allo spazio misurato invece che a soglie di larghezza, e fogli e quaderno sono dimensionati in proporzione; sui due fogli entra una prima bozza della presentazione, da approvare. | Confermata; testi in bozza |
| DEC-062 | 2026-10-11 | Regola di movimento: nel sito nulla compare o sparisce dal nulla; ogni elemento entra ed esce in modo fisico. La scrivania, che appariva in dissolvenza, ora entra dal basso scivolando sotto il quaderno con i suoi oggetti sopra. | Confermata |
| DEC-063 | 2026-10-11 | In Copertina l'illustrazione doppia viene sostituita da Giuseppe davanti all'ingresso della scuola; "Dalle forbici al codice" resta solo sul foglio di Chi sono. | Confermata |

## Modello per una nuova decisione

```text
ID:
Data:
Contesto:
Alternative considerate:
Decisione:
Motivazione:
Conseguenze:
Stato:
```
