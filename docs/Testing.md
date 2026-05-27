# Testing

## Panoramica

**26 test totali: 24 passati, 2 falliti.**

La strategia di test si concentra sulla **logica di business** (composable, store, file di dati) e non sui componenti Vue, che non hanno logica significativa da isolare — sono presentational.

### Test falliti (da correggere)

Entrambi i fallimenti sono in `useLocale.test.js` e riguardano la chiave `hero.chapter`:

| Test | Atteso | Ricevuto |
|---|---|---|
| `t('hero.chapter')` in IT | `"capitolo 01"` | valore diverso |
| `t('hero.chapter')` in EN | `"chapter 01"` | `"Student E-Portfolio"` |

Il locale `en.json` (e probabilmente `it.json`) è stato aggiornato e la chiave `hero.chapter` è stata rinominata o rimossa. I test vanno aggiornati per rispecchiare i valori attuali dei file locale.

---

## Setup

**Framework:** Vitest 4.1.7  
**Ambiente DOM:** jsdom 29.1.1  
**Utility Vue:** @vue/test-utils 2.4.10

Vitest è configurato direttamente in `vite.config.js`, senza file separato:

```js
test: {
  environment: 'jsdom',
  globals: true,
  setupFiles: ['./src/tests/setup.js'],
}
```

`globals: true` rende `describe`, `it`, `expect` disponibili senza import esplicito in ogni file.

`setup.js` inizializza Pinia prima di ogni test e svuota i plugin Vue globali:

```js
beforeEach(() => {
  setActivePinia(createPinia())
})
config.global.plugins = []
```

---

## Suite

### `locales.test.js` — 6 test

Verifica la consistenza dei file di traduzione `en.json` e `it.json`.

| Test | Cosa verifica |
|---|---|
| EN e IT hanno lo stesso numero di chiavi | nessuna chiave mancante tra le due lingue |
| tutte le chiavi di EN esistono in IT | sincronizzazione EN → IT |
| tutte le chiavi di IT esistono in EN | sincronizzazione IT → EN |
| `marquee.items` ha la stessa lunghezza | array allineati nelle due lingue |
| nessuna stringa vuota in EN | nessuna traduzione dimenticata |
| nessuna stringa vuota in IT | nessuna traduzione dimenticata |

Utilizza `flatKeys()` — funzione ricorsiva che appiattisce l'oggetto annidato del locale in un array di chiavi dot-separated (es. `"hero.chapter"`).

---

### `useLocale.test.js` — 7 test

Verifica il composable `useLocale` che gestisce lingua attiva e funzione `t()`.

| Test | Cosa verifica |
|---|---|
| locale di default è `"it"` | lingua iniziale corretta |
| `t()` restituisce la traduzione italiana | funzione di traduzione base |
| `t()` cambia dopo `setLocale("en")` | cambio lingua reattivo |
| `t()` con chiave inesistente restituisce la chiave | fallback — nessun crash |
| `setLocale("fr")` non cambia locale | valori non supportati ignorati |
| `SUPPORTED_LOCALES` contiene `"it"` e `"en"` | contratto dell'API pubblica |
| `t()` accede a chiavi profondamente annidate | dot-notation funzionante |

---

### `projectsStore.test.js` — 9 test

Verifica lo store Pinia che gestisce i progetti e i filtri per categoria.

| Test | Cosa verifica |
|---|---|
| filtro iniziale è `"all"` | stato iniziale corretto |
| `filteredProjects` con `"all"` restituisce tutti i progetti | getter base |
| `setFilter("web")` mostra solo progetti web | filtro per categoria |
| `setFilter("game")` mostra solo progetti game | filtro per categoria |
| `setFilter("other")` restituisce array vuoto se non ci sono `"other"` | caso bordo — categoria vuota |
| `featuredProjects` restituisce solo i progetti con `featured: true` | getter featured |
| `featuredProjects` non include progetti non featured | assenza di falsi positivi |
| `filters` contiene le 5 categorie corrette | contratto del array filtri |
| ogni progetto ha i campi obbligatori | integrità del dato in `projects.json` |

---

### `useTheme.test.js` — 4 test

Verifica il composable `useTheme` che gestisce dark/light mode.

| Test | Cosa verifica |
|---|---|
| tema di default è `"dark"` | stato iniziale |
| `setTheme("light")` cambia il tema | switch funzionante |
| `setTheme("dark")` riporta a dark | idempotenza |
| `setTheme` aggiorna `data-theme` sul `documentElement` | effetto collaterale DOM |

L'ultimo test è il più importante: verifica che il cambio tema si rifletta effettivamente sull'attributo HTML che Tailwind CSS legge per applicare la palette light.

---

## Cosa non è testato e perché

| Area | Motivo |
|---|---|
| Componenti Vue (.vue) | Sono tutti presentational — ricevono dati via props e li mostrano. Nessuna logica da isolare. |
| Rendering HTML/CSS | Richiederebbe test end-to-end (Playwright/Cypress) — fuori scope per questo progetto. |
| Router | Una sola route + 404. Nessuna guardia o logica condizionale da testare. |
| `useLineReveal` | Logica basata su `setInterval` — testabile ma richiederebbe fake timer. Non prioritario. |
| `certificationsStore` | Aggiunto dopo la suite iniziale. Il pattern è identico a `projectsStore` — sarebbe utile aggiungere i test. |

---

## Eseguire i test

```bash
npm run test:run   # una singola esecuzione, report finale
npm test           # watch mode — riesegue al salvataggio dei file
```
