# Struttura del sito

> **Stato: proposta in discussione.** È confermato soltanto ciò che è indicato come tale (DEC-040: sezioni della home; DEC-041: progetti in Percorso e Capolavori; DEC-042: scheletro autorizzato; DEC-043: Copertina sul marchio; DEC-044: Copertina come fronte del quaderno). Ogni altro punto diventa una decisione soltanto quando Giuseppe lo approva e viene registrato in [Decisioni confermate](03-decisioni-confermate.md) e nel [Registro](06-registro-decisioni.md). L'ordine delle fasi resta quello della [Roadmap](05-roadmap.md).

Il documento risponde a tre domande: che cosa contiene il sito, come è organizzato perché possa crescere, da dove si comincia e quando si può dire finito.

## 1. Mappa del sito

Il vincolo già confermato è: home narrativa lunga più pagine di approfondimento, in una SPA.

### Home: sezioni in ordine di lettura

Elenco e ordine confermati (DEC-040).

| # | Sezione | Che cosa racconta | Fonte dei contenuti |
| --- | --- | --- | --- |
| 1 | Copertina | Il portfolio come capolavoro, poi Giuseppe come autore. I dieci secondi di stupore. | testo breve |
| 2 | Chi sono | Presentazione personale, ritratto, tono spontaneo. | testo breve |
| 3 | Percorso | Le tappe di Giuseppe, dal lavoro precedente al quinto anno: racconta la persona, non i progetti (DEC-064). | testo breve |
| 4 | Capolavori | Selezione dei lavori in evidenza, con Second Brain come primo candidato. | collezione progetti |
| 5 | Componenti | Componenti custom provabili sul posto. | collezione componenti |
| 6 | Competenze | Competenze per stato, ciascuna collegata alle prove. | collezione competenze |
| 7 | Certificazioni | Attestati con certificato, badge o entrambi. | collezione certificazioni |
| 8 | Documenti | SAD e CV, consultabili e scaricabili. | pagine dedicate |
| — | Contatti | Email, GitHub, LinkedIn. | footer già approvato |

La progressione "da giocoso a maturo" segue l'ordine delle sezioni: le prime usano il linguaggio più spontaneo, le ultime quello più elegante.

### Pagine di approfondimento

| Percorso | Contenuto |
| --- | --- |
| `/` | Home narrativa |
| `/progetti` | Indice completo dei progetti, filtrabile per anno e tecnologia |
| `/progetti/:slug` | Caso di studio di un progetto (Markdown) |
| `/componenti` | Galleria dei componenti custom con demo |
| `/certificazioni` | Elenco completo con documenti |
| `/sad` | SAD in versione web, con download del documento ufficiale |
| `/cv` | Curriculum, con download |
| `/style-lab` | Lo Style Lab attuale, che resta come strumento di lavoro |
| qualsiasi altro | Pagina 404 |

Come le due lingue entrano negli URL è una questione aperta (punto 5).

## 2. Come cresce senza rompersi

Tre regole, ognuna legata a un requisito già scritto in [Requisiti](02-requisiti.md) → "Contenuti data-driven" e "Manutenzione".

### 2.1 Registro delle sezioni

La home non elenca le sezioni a mano nel template. Esiste un solo elenco ordinato, e sia la home sia la navbar lo leggono:

```text
registro sezioni ──┬──> Home: disegna le sezioni nell'ordine dell'elenco
                   └──> Navbar: genera le linguette dallo stesso elenco
```

Ogni voce dichiara identificativo, etichetta, colore della linguetta (un token, non un valore esadecimale) e componente da mostrare. Aggiungere una sezione domani significa scrivere un componente e aggiungere una riga: home, navbar e ancore si aggiornano da sole. L'elenco esiste in `src/sections/index.js` (DEC-042).

### 2.2 Collezioni di contenuti

I contenuti stanno fuori dai componenti. Ogni tipo ha un modello unico e una cartella:

| Collezione | Un elemento descrive | Formato |
| --- | --- | --- |
| progetti | titolo, anno scolastico, tecnologie, riassunto, link, se è un capolavoro, immagine | dati strutturati + Markdown per il caso di studio |
| competenze | nome, categoria, stato | dati strutturati |
| certificazioni | nome, ente, data, certificato, badge | dati strutturati |
| componenti | nome, descrizione, demo da caricare | dati strutturati |

Aggiungere un progetto significa aggiungere un file, mai toccare un componente.

### 2.3 Collegamenti per identificativo

Gli elementi si citano tra loro per identificativo, non ripetendo i testi:

- un progetto elenca le competenze che usa;
- la pagina di una competenza mostra in automatico i progetti che la citano.

Questo realizza il principio "prove concrete, non percentuali": lo stato di una competenza è sostenuto dai progetti che la dimostrano. Anche la sezione Percorso può essere derivata: i progetti hanno già l'anno, quindi i due capitoli si popolano da soli.

Un controllo in fase di build verifica che ogni identificativo citato esista e che ogni elemento abbia i campi obbligatori in entrambe le lingue.

### 2.4 Organizzazione delle cartelle (ipotesi)

```text
src/
  content/        collezioni e testi, separati per lingua
  sections/       una cartella per sezione della home + il registro
  views/          una vista per pagina
  components/
    foundations/  già esistente
    primitives/   già esistente
    navigation/   già esistente
    blocks/       composizioni riusabili: card progetto, voce certificazione…
  style-lab/      già esistente, spostato su /style-lab
  router/
```

Regola di dipendenza: `views` e `sections` usano `components` e `content`; `components` non conosce mai una sezione o una pagina specifica. È ciò che permette di spostare o aggiungere sezioni senza effetti collaterali.

## 3. Come si comincia

Tappe piccole, ognuna lascia il sito presentabile. Corrispondono alle fasi 4-6 della roadmap.

1. **Approvare questa struttura**, una decisione alla volta (punto 5).
2. **Definire i modelli** delle quattro collezioni e compilare un inventario reale: quali progetti, quali certificazioni, quali competenze.
3. **Scheletro**: Style Lab spostato su `/style-lab`, home costruita dal registro con tutte le sezioni presenti ma vuote, navbar collegata al registro, pagina 404.
4. **Una fetta verticale completa**: un solo progetto reale portato dall'inizio alla fine — dato, card nella home, pagina di approfondimento, versione inglese, test. Serve a scoprire i problemi su un caso solo prima di ripeterli su dieci.
5. **Le altre sezioni**, una per volta, nello stesso modo.

Il passaggio 3 è autorizzato (DEC-042) ed è stato anticipato rispetto ai passaggi 1 e 2: oggi lo scheletro contiene Copertina e Chi sono come segnaposto, senza contenuti definitivi.

## 4. Quando è finito

Il sito è pronto per sostituire quello attuale quando:

- tutte le sezioni della mappa hanno contenuti reali in italiano e in inglese;
- ogni pagina è raggiungibile con URL diretto su GitHub Pages;
- WCAG 2.2 AA è verificato anche manualmente e Lighthouse è almeno 95 per categoria su mobile e desktop;
- i test automatici coprono dati, percorsi principali, link e regressioni visive;
- esistono l'archivio del vecchio portfolio e il backup su chiavetta.

"Finito" riguarda la consegna, non il sito: dopo l'esame si continua ad aggiungere file alle collezioni.

## 5. Decisioni da prendere, in ordine

1. ~~**Sezioni della home**~~: confermate con DEC-040.
2. ~~**Percorso e progetti**~~: confermato con DEC-041. Percorso mostra tutti i progetti per anno in forma compatta, Capolavori soltanto quelli in evidenza con card ricche; il dato è unico.
3. **Linguette**: rinviata. Per ora la Copertina sta sul marchio e ogni nuova sezione porta la propria linguetta (DEC-043); quante mostrarne a regime, e a quale larghezza passare all'Indice, si decide quando le sezioni saranno abbastanza da porre il problema.
4. **Pagine dedicate**: quali sezioni meritano una pagina propria oltre ai progetti?
5. **Lingue negli URL**: `/it/…` e `/en/…`, oppure italiano senza prefisso e `/en/…`.
6. **Formato dei dati**: già aperta in [Idee e questioni aperte](04-idee-e-questioni-aperte.md), insieme a TypeScript, Markdown bilingue e URL puliti su GitHub Pages.
