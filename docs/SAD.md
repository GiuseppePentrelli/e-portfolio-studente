# Software Architecture Document (SAD)

**Progetto:** Portfolio Dinamico dello Studente  
**Autore:** Giuseppe Pentrelli — IISS G.Marconi-M.Hack, Bari — classe 4RI  
**Versione:** 1.0 — Definitiva  
**Data:** 22 Maggio 2026

---

## 1. Obiettivo e contesto

Il progetto nasce con uno scopo preciso: creare un **hub centrale** che raccolga e presenti tutte le competenze e i lavori prodotti nel quinquennio scolastico, da consegnare alla commissione d'esame tramite la piattaforma ministeriale *Unica*.

Il vincolo principale era la **scadenza del 25 maggio**: Unica chiude le submission in quella data, ma i progetti sottostanti (videogioco, guida Vue) non sarebbero stati pronti. La soluzione architettuale adottata è stata la **separazione tra contenitore e contenuto**:

- su Unica viene caricato esclusivamente il link statico al portfolio (GitHub Pages)
- il portfolio è aggiornabile senza limiti di tempo, anche dopo maggio
- i sotto-progetti vivono su repository GitHub separati, anch'essi aggiornabili fino all'esame di giugno

Questo approccio permette di rispettare la scadenza istituzionale e continuare a raffinare il lavoro in parallelo.

---

## 2. Decisioni architetturali chiave

Questa sezione documenta il *perché* di ogni scelta tecnologica, non solo il *cosa*.

### 2.1 SPA statica invece di applicazione server

**Decisione:** nessun backend, hosting su GitHub Pages.

GitHub Pages serve solo file statici (HTML, CSS, JS). Non esiste un server con interprete PHP, né un database. Questo ha escluso immediatamente Laravel — lo stack che Giuseppe conosce meglio per il backend.

La scelta è caduta su una SPA Vue compilata: Vite produce un bundle statico in `dist/` che GitHub Pages serve direttamente. Il risultato è un'applicazione reattiva senza costi di infrastruttura.

---

### 2.2 Vue 3 — framework UI

**Perché Vue e non React o Svelte:**

Vue 3 è il framework che Giuseppe studia durante il quinquennio. Usare uno strumento già conosciuto in profondità ha significato potersi concentrare sulla qualità del progetto invece che sull'apprendimento del framework. Usare React o Svelte avrebbe introdotto rischio senza vantaggio reale per la commissione.

**Perché Vue 3 e non Vue 2:**

Vue 3 introduce la Composition API — il pattern con cui il codice del progetto è scritto. La Composition API permette di isolare logica riutilizzabile nei composable (`useLocale`, `useTheme`, `useLineReveal`) senza l'overhead dei mixin di Vue 2. È anche il pattern su cui si basa Pinia.

**Perché JavaScript e non TypeScript:**

Giuseppe non conosce TypeScript. Aggiungerlo avrebbe rallentato lo sviluppo senza apportare valore visibile alla commissione. La tipizzazione dei componenti è garantita tramite `defineProps` con le opzioni `type` e `required` — sufficiente per questo scope.

---

### 2.3 Vite — build tool

**Perché Vite e non Webpack o Parcel:**

Vite sfrutta gli ES modules nativi del browser durante lo sviluppo: ogni file viene servito direttamente senza un bundle step. Il risultato è un HMR (Hot Module Replacement) quasi istantaneo — modifiche al codice si riflettono nel browser in meno di 100ms.

Per la produzione, Vite usa Rollup internamente, che produce bundle ottimizzati con tree-shaking automatico.

Il vantaggio decisivo in questo progetto è che **Vitest si configura nello stesso file** `vite.config.js`, senza setup separato. Stessa configurazione, stesso ambiente, stessi alias `@`.

```js
// vite.config.js
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: { alias: { '@': './src' } },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.js'],
  },
})
```

---

### 2.4 Tailwind CSS v4 — styling

**Perché Tailwind e non CSS puro o Bootstrap:**

Tailwind è utility-first: le classi vengono scritte direttamente nel template Vue, eliminando il problema di dover inventare nomi per le classi e mantenere sincronizzati template e file CSS separati.

Bootstrap è stato scartato perché impone un design system rigido (colori, spaziature, componenti) che avrebbe reso impossibile ottenere l'estetica IDE/dark mode voluta senza sovrascrivere continuamente i suoi stili.

**Perché la versione 4 e non la 3:**

Tailwind v4 introduce la direttiva `@theme` in CSS, che permette di definire i design token direttamente nel file CSS senza un `tailwind.config.js` separato. Ogni token definito in `@theme` diventa automaticamente una utility class Tailwind **e** una CSS custom property. Un unico punto di verità per tutto il sistema visivo.

```css
/* src/assets/main.css */
@theme {
  --color-gold: #f5c842;
  /* genera automaticamente: text-gold, bg-gold, border-gold */
  /* e la variabile CSS: var(--color-gold) */
}
```

Cambiare un token aggiorna tutta l'applicazione senza toccare un componente.

**Plugin Vite nativo:**

Tailwind v4 fornisce un plugin Vite (`@tailwindcss/vite`) che si integra direttamente nella pipeline di build, senza PostCSS separato.

---

### 2.5 Pinia — state management

**Perché Pinia e non Vuex o `ref` globali:**

Pinia è la soluzione ufficiale di state management per Vue 3, raccomandata dal team Vue come successore di Vuex. Usa la stessa Composition API dei componenti Vue — non introduce un pattern diverso da imparare.

**Perché non usare semplicemente `ref` globali nei composable:**

`useLocale` e `useTheme` usano `ref` globali nei composable perché gestiscono stato singleton semplice (lingua attiva, tema attivo). Pinia viene usato per `projectsStore` perché questo stato ha bisogno di:

- essere testato in isolamento (Pinia si può resettare tra un test e l'altro con `setActivePinia(createPinia())`)
- esporre getter derivati (`filteredProjects`, `featuredProjects`)
- essere potenzialmente condiviso tra più componenti/viste in futuro

```js
// projectsStore.js — setup store, stessa sintassi dei composable Vue
export const useProjectsStore = defineStore('projects', () => {
  const activeFilter = ref('all')
  const filteredProjects = computed(/* ... */)
  function setFilter(id) { activeFilter.value = id }
  return { activeFilter, filteredProjects, setFilter }
})
```

---

### 2.6 Vue Router 4 con Hash History

**Perché Vue Router:**

Il progetto è una SPA: senza un router, il bottone back del browser non funzionerebbe e non sarebbe possibile linkare direttamente a una sezione. Vue Router 4 è la soluzione standard e ufficiale per Vue 3.

**Perché `createWebHashHistory` e non `createWebHistory`:**

Questo è il dettaglio tecnico più importante del routing. `createWebHistory` usa la History API del browser e produce URL puliti (`/projects`, `/about`). Ma GitHub Pages è un server statico — se un utente accede direttamente a `https://esempio.github.io/portfolio/projects`, il server cerca un file `projects/index.html` che non esiste e restituisce 404.

`createWebHashHistory` aggiunge un `#` all'URL (`/#/projects`). Tutto ciò che segue il `#` non viene mai inviato al server — il browser lo gestisce localmente. Questo rende le URL compatibili al 100% con GitHub Pages senza alcuna configurazione server.

```
https://giuseppe.github.io/portfolio/#/          ← home
https://giuseppe.github.io/portfolio/#/404       ← not found
```

---

### 2.7 Font self-hosted (Fontsource)

**Perché non Google Fonts:**

Google Fonts richiede una richiesta HTTP esterna a ogni caricamento della pagina. Fontsource (`@fontsource-variable/inter`, `@fontsource-variable/jetbrains-mono`) include i font direttamente nel bundle npm: vengono serviti dallo stesso host del portfolio, senza dipendenze esterne.

**Perché variable fonts:**

Un font variable contiene tutti i pesi (100-900) in un singolo file `.woff2`. Rispetto all'alternativa di includere un file per ogni peso, il footprint totale è significativamente minore.

---

### 2.8 GitHub Actions — CI/CD

Il deploy è automatizzato tramite un workflow che si attiva su ogni `push` al branch `main`:

1. `npm install`
2. `npm run build`
3. deploy della cartella `dist/` sul branch `gh-pages`
4. GitHub Pages serve il contenuto del branch `gh-pages`

Il link caricato su Unica punta sempre all'ultima versione del portfolio, aggiornata ad ogni push.

---

## 3. Architettura dei componenti

### Albero completo

```
App.vue
├── AppNavbar.vue          navbar sticky — brand, toggle lingua, toggle tema
├── AppSidebar.vue         sidebar fissa — link esterni (GitHub, LinkedIn, email)
├── views/HomeView.vue
│   ├── HeroSection.vue    presentazione personale + metadati scolastici
│   │   └── BioWindow.vue  finestra IDE con 3 tab (about/stack/stats)
│   │       ├── AppWindow.vue     shell grafica della finestra con tab
│   │       └── WinLine.vue       singola riga di codice con reveal animation
│   ├── MarqueeStrip.vue   striscia scorrevole con skill/tecnologie
│   ├── FeaturedSection.vue
│   │   └── FeaturedCard.vue  card progetto capolavoro (3 varianti grafiche)
│   ├── ProjectFilters.vue    bottoni filtro categoria (legge/scrive store)
│   ├── ProjectGrid.vue       griglia progetti (legge store.filteredProjects)
│   │   └── ProjectCard.vue   card progetto singolo (riceve solo prop `project`)
│   └── ComponentSection.vue  showcase componenti UI con filtri e paginazione
│       └── ComponentCard.vue
└── AppFooter.vue          CTA contatti, link, "git status · clean · main"
```

### Regole architetturali

**Un componente, una responsabilità (SRP).** `ProjectCard` visualizza un progetto. `ProjectFilters` gestisce l'input dell'utente. `projectsStore` gestisce i dati. Nessuno dei tre sa dell'esistenza degli altri due.

**Il dato scende, gli eventi salgono.** I componenti ricevono i dati via props, comunicano verso l'alto via emit. Nessun componente scrive direttamente nello store eccetto quelli esplicitamente deputati a farlo.

**I leaf component sono ignoranti dello store.** `ProjectCard` e `FeaturedCard` non importano Pinia — ricevono un oggetto `project` come prop e lo visualizzano. Questo li rende riutilizzabili in qualsiasi contesto.

---

## 4. Flusso dei dati

```
projects.json
     │
     ▼
projectsStore.js  ←── setFilter()  ◄── ProjectFilters.vue (input utente)
     │
     │  store.filteredProjects (computed)
     ▼
ProjectGrid.vue
     │
     │  :project="p" (prop)
     ▼
ProjectCard.vue
```

`filteredProjects` è un getter `computed` di Pinia: si aggiorna automaticamente ogni volta che `activeFilter` cambia, senza bisogno di chiamate esplicite. Vue re-renderizza solo i componenti che dipendono da questo valore.

---

## 5. Sistema di design token

Tutti i valori visivi sono definiti come token semantici in `src/assets/main.css` tramite la direttiva `@theme` di Tailwind v4. **Mai hardcodare colori, font o dimensioni nei template.**

### Token disponibili

| Token CSS | Utility Tailwind | Uso |
|---|---|---|
| `--color-bg` | `bg-bg` | sfondo pagina |
| `--color-surface` | `bg-surface` | card, navbar, finestre |
| `--color-surface-2` | `bg-surface-2` | elementi secondari, title bar |
| `--color-surface-3` | `bg-surface-3` | slider TogglePill, hover |
| `--color-border` | `border-border` | bordi principali |
| `--color-border-2` | `border-border-2` | bordi secondari |
| `--color-text` | `text-text` | testo primario |
| `--color-text-1` | `text-text-1` | testo corpo |
| `--color-text-2` | `text-text-2` | testo secondario |
| `--color-text-3` | `text-text-3` | numeri di riga, metadati |
| `--color-gold` | `text-gold`, `bg-gold` | accento principale, CTA |
| `--color-blue` | `text-blue` | link, highlight codice |
| `--color-purple` | `text-purple` | funzioni nel codice |
| `--color-green` | `text-green` | stato online, stringhe |
| `--color-coral` | `text-coral` | keyword, enfasi |
| `--color-pink` | `text-pink` | keyword nel syntax highlight |
| `--font-family-sans` | `font-sans` | testo corpo (Inter Variable) |
| `--font-family-mono` | `font-mono` | codice, label, accenti (JetBrains Mono) |
| `--radius-card` | `rounded-card` | border radius card |
| `--radius-btn` | `rounded-btn` | border radius bottoni |
| `--radius-tag` | `rounded-tag` | border radius tag/pill |
| `--shadow-card` | — | ombra card (usata inline via style) |

### Tema light

Il tema light sovrascrive i token via l'attributo `[data-theme="light"]`. `useTheme` imposta questo attributo sul `documentElement`. Non esiste CSS condizionale nei componenti — la palette cambia tutta da un unico punto.

---

## 6. Internazionalizzazione (i18n)

Il progetto supporta italiano (default) e inglese. Il sistema è implementato manualmente con un composable, senza librerie esterne.

**`useLocale`** — composable singleton:

- mantiene la lingua attiva in un `ref` globale (persiste in `localStorage`)
- espone `t(key)` — funzione che risolve chiavi dot-separated (`"hero.chapter"`) nel file locale attivo
- fallback: se la chiave non esiste, `t()` restituisce la chiave stessa — nessun crash, errore visibile in UI
- lingue non supportate vengono ignorate silenziosamente da `setLocale()`
- aggiorna l'attributo `lang` sull'elemento `<html>` per l'accessibilità

```
src/locales/
├── it.json   lingua di default
└── en.json   inglese
```

I file JSON sono strutturati per sezione (`hero`, `nav`, `footer`, `bio`, ecc.) e sono tenuti in sincronia dai test di `locales.test.js`.

---

## 7. Principi SOLID applicati

| Principio | Applicazione concreta |
|---|---|
| **SRP** — Single Responsibility | `projectsStore` gestisce i dati. `ProjectFilters` gestisce l'input. `ProjectCard` visualizza. Nessuno fa due cose. |
| **OCP** — Open/Closed | Aggiungere un progetto = aggiungere una riga in `projects.json`. Zero modifiche al codice. Aggiungere una categoria = aggiungere un oggetto all'array `filters` nello store. |
| **LSP** — Liskov Substitution | `ProjectCard` funziona con qualsiasi oggetto che rispetti lo schema di `projects.json`. `FeaturedCard` analogamente con `capolavori.json`. |
| **ISP** — Interface Segregation | `ProjectCard` riceve solo l'oggetto `project` di cui ha bisogno. Non importa lo store. Non conosce i filtri. |
| **DIP** — Dependency Inversion | `ProjectGrid` dipende dall'astrazione `store.filteredProjects` (un array Vue reattivo), non dalla logica concreta del filtro o dalla struttura di `projects.json`. |

---

## 8. Animazioni

Il progetto contiene 9 animazioni distinte, tutte documentate in [Animazioni.md](Animazioni.md).

Riepilogo:

| Animazione | Tipo | File |
|---|---|---|
| `blink` — cursore lampeggiante | CSS `@keyframes` | `main.css` |
| `marquee` — striscia scorrevole | CSS `@keyframes` | `MarqueeStrip.vue` |
| `pulse` — dot verde in footer | CSS `@keyframes` | `AppFooter.vue` |
| `fade` — dissolvenza tra tab | Vue `<Transition>` | `BioWindow.vue` |
| `cgrid-swap` — swap griglia componenti | Vue `<Transition>` | `ComponentSection.vue` |
| Line reveal — righe che appaiono in sequenza | Composable + CSS | `useLineReveal.js` + `WinLine.vue` |
| FeaturedCard hover lift | CSS `transition` | `FeaturedCard.vue` |
| ProjectCard hover lift | Tailwind `transition` | `ProjectCard.vue` |
| TogglePill slider | CSS `transition-transform` | `TogglePill.vue` |

Tutte le animazioni sono coperte dal media query `prefers-reduced-motion: reduce` in `main.css`, che le azzera globalmente per chi lo richiede dal sistema operativo.

---

## 9. Testing

Documentazione completa in [Testing.md](Testing.md).

**Risultato:** 26/26 test passati.

La strategia testa la logica di business (composable e store) e l'integrità dei dati (file JSON dei locale). I componenti Vue non sono testati perché sono tutti presentational — non hanno logica da isolare.

---

## 10. Deployment

```
push su main
     │
     ▼
GitHub Actions (.github/workflows/deploy.yml)
     │  npm install && npm run build
     ▼
dist/ → branch gh-pages
     │
     ▼
GitHub Pages  →  URL caricato su Unica
```

L'URL su Unica è fisso e non cambia mai. Ogni aggiornamento al portfolio viene pubblicato automaticamente entro pochi minuti dal push, senza interazione manuale.

---

## 11. Struttura del dato — `projects.json`

```json
{
  "id":          "string — identificatore univoco kebab-case",
  "title":       "string — nome del progetto",
  "description": "string — descrizione breve (max ~150 char)",
  "category":    "web | game | guide | other",
  "tags":        ["array di stringhe — tecnologie usate"],
  "featured":    "boolean — true solo per i capolavori in FeaturedSection",
  "externalUrl": "string — URL al repo GitHub o al deploy live",
  "coverImage":  "string | null — path relativo in /public/images/covers/"
}
```

`capolavori.json` ha uno schema esteso con campi per il rendering grafico della card (`art`, `iconName`, `iconColor`, `path`, `stack`, `num`, `cat`).

---

## 12. Stato del progetto

| Funzionalità | Stato |
|---|---|
| SPA Vue con routing | ✅ completato |
| Design system (token, dark/light) | ✅ completato |
| i18n (IT/EN) | ✅ completato |
| HeroSection + BioWindow | ✅ completato |
| MarqueeStrip | ✅ completato |
| FeaturedSection (3 capolavori) | ✅ completato |
| ProjectGrid con filtri | ✅ completato |
| ComponentSection con paginazione | ✅ completato |
| Footer con contatti | ✅ completato |
| Suite di test (26/26) | ✅ completato |
| Deploy su GitHub Pages | ✅ completato |
| Videogioco Kaplay JS | 🔄 in sviluppo (post-maggio) |
| Guida interattiva Vue.js | 🔄 in sviluppo (post-maggio) |
