# Portfolio Studente — Giuseppe Pentrelli

Portfolio personale a tema IDE, costruito come progetto capolavoro per l'esame di Stato 2025.  
Single Page Application statica, ospitata su GitHub Pages, aggiornabile senza vincoli di scadenza.

**Live →** [giuseppe-pentrelli.github.io/portfolio](https://Giuseppe-Pentrelli.github.io/portfolio)  
**Autore →** [github.com/Giuseppe-Pentrelli](https://github.com/Giuseppe-Pentrelli)

---

## Stack

| | Tecnologia | Versione |
|---|---|---|
| Framework | Vue 3 (Composition API) | 3.5.13 |
| Build tool | Vite | 6.3.5 |
| Styling | Tailwind CSS v4 | 4.1.6 |
| State | Pinia | 2.3.1 |
| Router | Vue Router 4 | 4.5.0 |
| Test | Vitest + jsdom | 4.1.7 |
| Font | Inter + JetBrains Mono (variable, self-hosted) | — |
| Hosting | GitHub Pages | — |

---

## Quick start

```bash
npm install
npm run dev       # development server → http://localhost:5173
npm run build     # build di produzione in dist/
npm run preview   # preview del build locale
```

---

## Test

```bash
npm run test:run  # esegue la suite una volta
npm test          # watch mode
```

```
26/26 test passati

locales.test.js        6  chiavi EN/IT allineate, nessuna stringa vuota
useLocale.test.js      7  t(), fallback, cambio lingua, locale non supportata
projectsStore.test.js  9  filtri, featured, campi obbligatori
useTheme.test.js       4  switch tema, data-theme sul DOM
```

---

## Struttura

```
src/
├── assets/         design token (@theme) + stili globali
├── components/
│   ├── custom/     ComponentCard, ComponentSection
│   ├── featured/   FeaturedCard, FeaturedSection
│   ├── home/       BioWindow, HeroSection, MarqueeStrip
│   ├── layout/     AppNavbar, AppSidebar, AppFooter
│   ├── projects/   ProjectCard, ProjectFilters, ProjectGrid
│   └── ui/         AppWindow, BaseButton, SectionLabel, TogglePill, WinLine
├── composables/    useLocale, useTheme, useLineReveal
├── data/           capolavori.json, components.json, me.json, projects.json
├── locales/        en.json, it.json
├── router/         index.js (hash history)
├── stores/         projectsStore.js (Pinia)
├── tests/          4 suite, 26 test
└── views/          HomeView, NotFound
```

---

## Documentazione

| Documento | Contenuto |
|---|---|
| [docs/SAD.md](docs/SAD.md) | Architettura software completa — stack, decisioni, componenti, flusso dati |
| [docs/Testing.md](docs/Testing.md) | Strategia di test, suite, setup, copertura |
| [docs/Animazioni.md](docs/Animazioni.md) | Catalogo delle 9 animazioni riutilizzabili |
| [docs/mockup/](docs/mockup/) | Mockup visivi |
