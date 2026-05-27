# Animazioni del progetto

Panoramica di tutte le animazioni e transizioni riutilizzabili presenti nel codebase. In totale: **12 animazioni** distinte.

---

## 1. `blink` — cursore lampeggiante

**Definita in:** `src/assets/main.css`  
**Usata da:** classe `.caret` (globale), presente in `BioWindow.vue`

```css
.caret {
  animation: blink 1s steps(2) infinite;
}
@keyframes blink { 50% { opacity: 0; } }
```

**Come funziona:** alterna opacità 1↔0 ogni 500ms con `steps(2)` (nessuna interpolazione morbida — effetto terminale realistico). Dimensioni fisse 8×14px, colore `--color-coral`.

**Riutilizzo:** basta aggiungere la classe `caret` a qualsiasi elemento inline.

---

## 2. `marquee` — striscia scorrevole orizzontale

**Definita in:** `src/components/home/MarqueeStrip.vue`  
**Usata da:** `MarqueeStrip.vue`

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.marquee-track { animation: marquee 40s linear infinite; }
.marquee:hover .marquee-track { animation-play-state: paused; }
```

**Come funziona:** il track contiene gli item duplicati (×2) così lo scorrimento da 0% a −50% crea un loop seamless. Durata 40s lineare. Al hover si mette in pausa.

**Riutilizzo:** avvolgi il contenuto (duplicato ×2) in un `.marquee > .marquee-track`. Il `mask-image` gradient crea il fade sui bordi.

---

## 3. `fade` — dissolvenza tra tab

**Definita in:** `src/components/home/BioWindow.vue`  
**Usata da:** `BioWindow.vue` (avvolge il contenuto delle tab di AppWindow)

```css
.fade-enter-active, .fade-leave-active { transition: opacity .18s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
```

**Come funziona:** Vue `<Transition name="fade" mode="out-in">` — prima esce il vecchio contenuto (fade-out 180ms), poi entra il nuovo (fade-in 180ms). Il ritardo `setTimeout(..., 200)` su `useLineReveal` è sincronizzato con questa durata.

**Riutilizzo:** qualsiasi `<Transition name="fade" mode="out-in">` beneficia automaticamente di questi stili, oppure aggiungili come classe scoped/globale.

---

## 4. `useLineReveal` + `WinLine` — reveal riga per riga

**Composable:** `src/composables/useLineReveal.js`  
**Componente:** `src/components/ui/WinLine.vue`  
**Usata da:** `BioWindow.vue`

```js
// useLineReveal.js
export function useLineReveal({ speed = 60 } = {}) {
  const revealed = ref(0)
  // setInterval che incrementa revealed ogni `speed` ms
  function start(count) { /* ... */ }
  return { revealed, start }
}
```

```css
/* WinLine.vue */
.win-line {
  opacity: 0;
  transform: translateY(5px);
  transition: opacity .14s ease, transform .14s ease;
}
.win-line.is-visible {
  opacity: 1;
  transform: none;
}
```

**Come funziona:** `useLineReveal` incrementa un contatore `revealed` ogni `speed` ms (default 60ms). Ogni `<WinLine :n="N" :visible="N <= revealed">` riceve la prop `visible` e applica la classe `is-visible` che triggera la transizione CSS: opacity 0→1 + translateY(5px)→0 in 140ms. Le righe "cadono" in sequenza, una ogni 60ms.

**Riutilizzo:**
```vue
const { revealed, start } = useLineReveal({ speed: 80 })
onMounted(() => start(totalLines))
// nel template:
<WinLine :n="1" :visible="1 <= revealed">...</WinLine>
```

---

## 5. `FeaturedCard` — lift + arrow expand al hover

**Definita in:** `src/components/featured/FeaturedCard.vue`

```css
.feat {
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
}
.feat:hover {
  transform: translateY(-4px);
  border-color: var(--color-gold);
  box-shadow: 0 24px 48px -20px rgba(0,0,0,.6), 0 0 0 1px var(--color-gold);
}
.feat-open { transition: gap .2s; }
.feat:hover .feat-open { gap: 10px; }
```

**Come funziona:** al hover la card si solleva di 4px, il bordo diventa gold con un ring aggiuntivo via box-shadow, e il testo "open project →" allarga lo spazio tra testo e freccia (gap 6px→10px, 200ms).

---

## 6. `ProjectCard` — lift al hover

**Definita in:** `src/components/projects/ProjectCard.vue` (Tailwind)

```html
class="... hover:border-blue transition-all duration-300 hover:-translate-y-1"
```

**Come funziona:** sollevamento di 4px (`-translate-y-1`) e cambio del bordo in blu in 300ms. Più leggero della FeaturedCard — adatto a griglie dense.

---

## 7. `TogglePill` — slider scorrevole

**Definita in:** `src/components/ui/TogglePill.vue`

```html
<!-- Il div slider si posiziona sotto il bottone attivo -->
<div
  class="absolute ... rounded-pill bg-surface-3 transition-transform duration-250 ease-in-out"
  :style="{
    width: `${100 / options.length}%`,
    transform: `translateX(${activeIndex * 100}%)`
  }"
/>
```

**Come funziona:** uno slider assoluto largo `100/N %` scivola orizzontalmente con `transform: translateX(index × 100%)` in 250ms. I bottoni sovrastanti cambiano colore (text-gold vs text-text-3) in 250ms.

**Riutilizzo:** il componente accetta `options` (array) e `modelValue` (valore attivo). Emette `select`.

---

## 8. `BaseButton` — hover state

**Definita in:** `src/components/ui/BaseButton.vue` (Tailwind)

Tre varianti, tutte con `transition-all duration-200`:

| Variante | Default | Hover |
|---|---|---|
| `outline` | bordo border-2, bg-surface | bordo gold, bg-surface-2, testo pieno |
| `ghost` | bordo trasparente | bg-surface-2, testo pieno |
| `solid` | bordo gold, bg gold/10, testo gold | bg-gold, testo bg (invertito) |

---

## 9. Glassmorphism navbar

**Definita in:** `src/components/layout/AppNavbar.vue` (Tailwind)

```html
class="sticky top-0 z-50 h-14 bg-bg/80 backdrop-blur-md backdrop-saturate-150 border-b border-border"
```

**Come funziona:** sfondo semi-trasparente (80% opacità) con `backdrop-blur-md` e `backdrop-saturate-150`. Non è un'animazione, ma è un effetto visivo che cambia dinamicamente allo scroll (il contenuto sottostante diventa visibile attraverso la navbar).

---

## 10. `AppIntro` — schermata di intro (4 effetti coordinati)

**Definita in:** `src/components/AppIntro.vue`  
**Usata da:** `App.vue` (solo al primo caricamento della sessione, poi rimossa via `sessionStorage`)

L'intro si compone di 4 effetti in sequenza:

**a) `fadeSlide` — righe terminale che appaiono**
```css
@keyframes fadeSlide {
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: none; }
}
```
Ogni riga ha un `animationDelay` di `i × 40ms` — appaiono in cascata da sinistra.

**b) Warp — terminale che si allontana**
```css
.terminal.warp {
  transform: perspective(600px) translateZ(400px) scale(0.1);
  opacity: 0;
  transition: transform .7s cubic-bezier(0.55, 0, 1, 0.45), opacity .4s ease;
}
```
CSS transition (non keyframe): il terminale sembra sparire verso un punto di fuga 3D in 700ms.

**c) Flash dot — esplosione che riempie lo schermo**
```css
.flash-dot.explode {
  opacity: 1;
  transform: scale(400);
  transition: transform .55s cubic-bezier(0.2, 0, 0.4, 1), opacity .55s ease;
}
```
Un punto bianco di 6px si scala di 400× coprendo l'intero viewport in 550ms.

**d) `intro` — Vue Transition di uscita**
```css
.intro-leave-active { transition: opacity .01s; }
.intro-leave-to     { opacity: 0; }
```
Scomparsa istantanea dopo il flash.

---

## 11. `TechStrip` — striscia tech con icone

**Definita in:** `src/components/home/TechStrip.vue`  
**Usata da:** `HomeView.vue`

Stesso meccanismo del `MarqueeStrip` (item duplicati ×2 per loop seamless), ma con icone `@iconify/vue` invece di testo. La velocità e il keyframe `marquee` sono identici — la striscia usa una classe CSS specifica del componente.

---

## 12. `cert-fade` — transizione griglia certificazioni

**Definita in:** `src/components/certifications/CertificationSection.vue`  
**Usata da:** `CertificationSection.vue`

```css
/* generato da Vue Transition name="cert-fade" */
.cert-fade-enter-active, .cert-fade-leave-active { transition: opacity .2s ease; }
.cert-fade-enter-from,   .cert-fade-leave-to     { opacity: 0; }
```

Vue `<Transition name="cert-fade" mode="out-in">` applicata all'intera griglia: quando cambia il filtro attivo, la griglia fa fade-out e poi fade-in con i nuovi risultati. `:key="store.activeFilter"` forza Vue a trattare ogni filtro come un elemento nuovo, attivando la transizione.

---

## Note globali

### `prefers-reduced-motion`

In `main.css` è presente un override globale che azzera tutte le animazioni per gli utenti che lo richiedono:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .caret { animation: none; opacity: 1; }
}
```

Ogni nuova animazione aggiunta è automaticamente coperta da questo override, senza bisogno di gestione manuale.
