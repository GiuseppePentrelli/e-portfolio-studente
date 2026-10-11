# Requisiti

## Requisiti funzionali

### Contenuti

Il portfolio deve includere:

- presentazione personale con tono spontaneo, naturale, umile e progressivamente professionale;
- percorso scolastico dal secondo al quinto anno;
- progetti e capolavori con anno, tecnologie, descrizione e collegamenti;
- componenti custom interattivi e provabili direttamente nel portfolio;
- certificazioni e attestati, tutti accompagnati da certificato, badge o entrambi;
- competenze tecniche distinte tra in studio, utilizzate nei progetti, usate regolarmente e consolidate;
- SAD consultabile sul web e disponibile anche come documento ufficiale scaricabile;
- curriculum professionale riutilizzabile dopo la scuola;
- contatti: email personale, email scolastica, GitHub e LinkedIn.

### Navigazione

- Home narrativa continua.
- Pagine dedicate agli approfondimenti.
- Navigazione comprensibile sia quando Giuseppe guida la presentazione sia quando il visitatore esplora autonomamente.
- URL diretti e senza hash quando ciò può essere ottenuto in modo affidabile su GitHub Pages.
- Navigazione principale a linguette, con alternativa mobile accessibile e comprensibile.

### Lingue

- Interfaccia e contenuti pubblici completamente disponibili in italiano e inglese.
- Nessuna porzione importante deve rimanere in una lingua diversa dopo lo switch.
- Giuseppe scrive e approva entrambe le versioni con supporto alla revisione linguistica.
- La documentazione tecnica interna rimane soltanto in italiano.

### Contenuti data-driven

- Aggiungere un elemento non deve richiedere la duplicazione del componente che lo visualizza.
- Dati brevi e strutturati vivono in JSON o TypeScript.
- Approfondimenti e casi di studio vivono in Markdown.
- I dati devono essere validati durante build e test.

### Pubblicazione e continuità

- Hosting statico su GitHub Pages.
- URL definitivo: `https://giuseppepentrelli.github.io/e-portfolio-studente/`.
- Il nuovo sito sostituirà quello vecchio soltanto quando sarà pronto e verificato.
- Il nuovo repository avrà una cronologia pulita.
- Prima della cancellazione, il vecchio portfolio verrà conservato in un archivio locale verificato.
- Sarà preparato un backup portatile su chiavetta con build, documenti, immagini e registrazioni delle demo essenziali.

## Requisiti di accessibilità

### Conformità

- WCAG 2.2 livello AA obbligatorio per l'intero prodotto.
- Criteri AAA applicati e documentati quando ragionevolmente compatibili con contenuti e design.
- Nessuna dichiarazione di conformità basata soltanto su strumenti automatici.

### Criteri operativi

- Funzionalità complete da tastiera.
- Focus visibile e mai coperto.
- Struttura semantica comprensibile agli screen reader.
- Test con screen reader, tastiera e zoom elevato.
- Contrasto verificato per testo, controlli e stati interattivi.
- Informazioni mai affidate esclusivamente al colore.
- Alternative testuali appropriate per immagini, disegni e diagrammi.
- Contenuti utilizzabili con testo ingrandito e reflow.
- Target touch sufficientemente grandi.
- Supporto a `prefers-reduced-motion`.
- Assenza di audio automatico.
- Lingua del documento aggiornata correttamente allo switch.
- Gli effetti decorativi vengono modificati o rimossi quando ostacolano l'accessibilità.

## Requisiti di performance e qualità

- Obiettivo Lighthouse: 100/100 in Performance, Accessibility, Best Practices e SEO.
- Soglia minima accettabile: 95/100 in ciascuna categoria.
- Misurazioni separate per mobile e desktop.
- Immagini, font, SVG, iframe e animazioni devono rispettare budget definiti prima dell'implementazione.
- Demo e iframe caricati soltanto quando necessari.
- Nessun analytics.
- Nessun backend.
- Nessuna dipendenza runtime esterna per le icone dell'interfaccia.
- Test automatici per logica, componenti, percorsi principali, accessibilità, link, build e regressioni visive.
- Verifiche manuali sui flussi critici.

## Requisiti responsive e compatibilità

- Mobile, tablet e desktop hanno pari importanza.
- Progettazione mobile-first.
- Le composizioni possono riordinarsi sui dispositivi piccoli; non devono limitarsi a ridursi.
- Supporto alle versioni recenti di Chrome, Edge, Firefox e Safari.
- Internet Explorer è escluso.
- Progressive enhancement: la mancanza di un effetto decorativo non deve bloccare contenuto o navigazione.

## Requisiti di manutenzione

- Componenti piccoli, con responsabilità e API chiare.
- Design token come fonte unica delle decisioni visive ricorrenti.
- Nessuna astrazione introdotta senza un caso d'uso reale.
- Decisioni importanti motivate e registrate.
- Contenuti, design e implementazione separati dove utile.
- Documentazione in Markdown nello stesso progetto.
