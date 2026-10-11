<template>
  <div
    ref="track"
    class="cover"
    :class="{
      'cover--band-behind': bandBehind,
      'cover--sheet-on': sheetOn,
      'cover--tucking': tucking,
    }"
  >
    <div ref="stage" class="cover__stage">
      <div class="cover__surface desk-surface" aria-hidden="true">
        <DeskScribbles />
      </div>

      <div ref="desk" class="cover__desk">
        <DeskProps class="cover__props" />

        <div ref="notebook" class="notebook">
          <!-- Tutto ciò che resta del quaderno quando la prima pagina se ne va. -->
          <div class="notebook__body">
            <span class="notebook__pages" aria-hidden="true"></span>
            <div class="notebook__next-page notebook__sheet-box" aria-hidden="true">
              <NotebookPage class="notebook__sheet-paper" />
              <NotebookNotes class="notebook__notes" />
              <span class="notebook__stub"></span>
            </div>
            <span class="notebook__shade" aria-hidden="true"></span>

            <div class="notebook__leaf">
          <div class="notebook__front">
            <span class="notebook__spine" aria-hidden="true"></span>

            <div class="label">
              <h1 :id="headingId">
                <span class="label__row label__title">
                  <span class="label__highlight"><span class="label__written">Portfolio</span></span>
                </span>
                <span class="label__row label__author">
                  <span class="label__written label__written--second">di Giuseppe Pentrelli</span>
                </span>
              </h1>
              <p class="label__row label__occasion">
                Esame di Stato <span class="label__years">2026–2027</span>
              </p>
            </div>

            <!-- Giuseppe davanti all'ingresso della scuola: in copertina niente riferimenti alla storia di Chi sono. -->
            <TapedPhoto class="sketch" :tilt="-3" :tape-at="40" :tape-tilt="5" :drive="leafVelocity" :nudge-on-mount="150">
              <img
                src="@/assets/images/giuseppe-ingresso-scuola.webp"
                alt="Illustrazione a matita: Giuseppe in piedi davanti all'ingresso della sua scuola, l'IISS Marconi-Hack, con lo zaino in spalla e un quaderno rosso in mano."
                width="440"
                height="550"
                decoding="async"
              />
            </TapedPhoto>

            <TapedPhoto class="photo" :tilt="4" :tape-at="38" :drive="leafVelocity" :nudge-on-mount="200">
              <img
                src="@/assets/images/giuseppe-ritratto-zaino.webp"
                alt="Ritratto a matita di Giuseppe seduto all'aperto, con lo zaino in spalla e un quaderno stretto al petto."
                width="400"
                height="487"
                decoding="async"
              />
            </TapedPhoto>
            <CoverStickers />
          </div>

          <div class="notebook__inside" aria-hidden="true">
              <CoverInside :drive="leafVelocity" />
            </div>
        </div>

            <div class="notebook__band">
              <NotebookElastic :nudge-delay="2300" :pull="bandPull" />
            </div>
          </div>

          <!-- Le prime due pagine: compaiono a copertina aperta, vengono strappate insieme e si posano
               sulla scrivania. La prima porta la presentazione, la seconda il disegno, e sta sotto
               la prima finché non si separano. -->
          <div class="notebook__sheet notebook__sheet--two notebook__sheet-box" aria-hidden="true">
            <span class="notebook__sheet-shadow"></span>
            <NotebookPage class="notebook__sheet-paper" torn-left worn="flipped">
              <AboutDrawing decorative />
            </NotebookPage>
          </div>
          <div class="notebook__sheet notebook__sheet--one notebook__sheet-box" aria-hidden="true">
            <span class="notebook__sheet-shadow"></span>
            <NotebookPage class="notebook__sheet-paper" torn-left worn>
              <AboutOpening decorative />
            </NotebookPage>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import DeskProps from '@/components/foundations/DeskProps.vue'
import DeskScribbles from '@/components/foundations/DeskScribbles.vue'
import NotebookElastic from '@/components/foundations/NotebookElastic.vue'
import NotebookNotes from '@/components/foundations/NotebookNotes.vue'
import NotebookPage from '@/components/foundations/NotebookPage.vue'
import TapedPhoto from '@/components/primitives/TapedPhoto.vue'
import AboutOpening from './AboutOpening.vue'
import AboutDrawing from './AboutDrawing.vue'
import CoverInside from './CoverInside.vue'
import CoverStickers from './CoverStickers.vue'

defineProps({
  headingId: { type: String, required: true },
})

// Fasi lungo lo scorrimento della sezione. 1 è la fine del tratto di base; oltre c'è soltanto lo
// scambio tra i due fogli, dove restano impilati (vedi --cover-swap-scroll).
// l'elastico passa dietro, la copertina si apre, la prima pagina esce e si posa sulla scrivania.
const BAND_END = 0.1
const OPEN = [0.06, 0.4]
// Il sottomano scivola sotto il quaderno mentre questo è sollevato per aprirsi.
const DESK = [0.03, 0.27]
const SHEET = [0.46, 0.82]
// Il secondo foglio segue il primo con un attimo di ritardo.
const SHEET_TWO = [0.5, 0.88]
const SWAP = [1.06, 1.36]
// Il disegno sul secondo foglio compare quando il foglio si scopre: mentre si posa accanto al
// primo, oppure durante lo scambio dove restano impilati.
const DRAW_BESIDE = [0.6, 0.94]
const DRAW_STACKED = [1.12, 1.42]
const BASE_SCROLL = 140
// Due fogli affiancati: spazio da lasciare ai lati per gli oggetti della scrivania (in rem) e
// di quanto, al massimo, si può rimpicciolire il quaderno per farceli stare.
const SIDE_MARGIN = 8.5
const MIN_SIDE_SCALE = 0.8
// Il quaderno si richiude ed esce a sinistra, poi rientra sotto la scrivania.
const DEPART = [0.44, 0.9]
const DEPART_TURN = 0.55
// La prima pagina viene scritta mentre la copertina finisce di aprirsi.
const WRITE = [0.25, 0.45]
// Tempo, in millisecondi, con cui l'animazione insegue lo scorrimento: ammorbidisce gli scatti della rotella.
const SMOOTHING = 110

const track = ref(null)
const stage = ref(null)
const desk = ref(null)
const notebook = ref(null)
// Velocità con cui ruota la copertina: muove le foto attaccate con lo scotch.
const leafVelocity = ref(0)
const bandBehind = ref(false)
const bandPull = ref(0)
const sheetOn = ref(false)
const tucking = ref(false)
let stickyTop = 0
let baseShare = 1
let sheetsBeside = false
const written = {}
let departOut = 0
let departEnd = 0
let target = 0
let current = 0
let lastFrame = 0
let running = false
let lastOpen = 0
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

function ramp(value, [from, to]) {
  const t = Math.min(1, Math.max(0, (value - from) / (to - from)))
  return t * t * (3 - 2 * t)
}

function readProgress() {
  const distance = track.value.offsetHeight - stage.value.offsetHeight
  if (distance <= 0) return 0
  const scrolled = stickyTop - track.value.getBoundingClientRect().top
  return Math.min(1, Math.max(0, scrolled / distance)) / baseShare
}

// Scrive una proprietà soltanto quando cambia: ogni scrittura fa ricalcolare gli stili dell'intera scena.
function setVar(name, value) {
  const text = typeof value === 'number' ? value.toFixed(4) : value
  if (written[name] === text) return
  written[name] = text
  track.value.style.setProperty(name, text)
}

function apply(progress) {
  const band = Math.min(1, progress / BAND_END)
  const bandOut = Math.sin(Math.PI * band)
  const open = ramp(progress, OPEN)
  const sheet = ramp(progress, SHEET)

  setVar('--band-out', bandOut)
  setVar('--open', open)
  setVar('--lift', Math.sin(Math.PI * open))
  // Arrivo deciso e frenata morbida, come un foglio spinto sul tavolo.
  setVar('--desk', 1 - (1 - ramp(progress, DESK)) ** 2)
  setVar('--sheet', sheet)
  setVar('--sheet-arc', Math.sin(Math.PI * sheet))
  const sheetTwo = ramp(progress, SHEET_TWO)
  setVar('--sheet-two', sheetTwo)
  setVar('--sheet-two-arc', Math.sin(Math.PI * sheetTwo))
  setVar('--swap', ramp(progress, SWAP))
  setVar('--draw', ramp(progress, sheetsBeside ? DRAW_BESIDE : DRAW_STACKED))
  // Lo strappo: la pagina si stacca dall'alto ruotando sull'angolo in basso, poi cede.
  setVar('--tear', Math.sin(Math.PI * ramp(sheet, [0, 0.3])))
  setVar('--torn', ramp(sheet, [0.02, 0.12]))
  setVar('--write', Math.min(1, Math.max(0, (progress - WRITE[0]) / (WRITE[1] - WRITE[0]))))

  const depart = Math.min(1, Math.max(0, (progress - DEPART[0]) / (DEPART[1] - DEPART[0])))
  const leaving = ramp(depart, [0, DEPART_TURN])
  const returning = ramp(depart, [DEPART_TURN, 1])
  setVar('--close', leaving)
  setVar('--depart-x', `${departOut * leaving + (departEnd - departOut) * returning}px`)

  bandPull.value = bandOut * 16
  bandBehind.value = band >= 0.5
  // Sotto i 90° la copertina copre la pagina: fino ad allora si vede quella identica, ancora vuota, del quaderno.
  sheetOn.value = open >= 0.5
  tucking.value = depart >= DEPART_TURN
}

// Quanto è aperta la copertina, da 0 a 1, tenendo conto di quando si richiude per andarsene.
function leafOpening(progress) {
  const depart = (progress - DEPART[0]) / (DEPART[1] - DEPART[0])
  return ramp(progress, OPEN) - ramp(depart, [0, DEPART_TURN])
}

function tick(now) {
  const elapsed = Math.min(64, now - lastFrame)
  lastFrame = now
  current += (target - current) * (1 - Math.exp(-elapsed / SMOOTHING))
  const arrived = Math.abs(target - current) < 0.0005
  if (arrived) current = target
  apply(current)

  const open = leafOpening(current)
  leafVelocity.value = arrived || elapsed <= 0 ? 0 : (open - lastOpen) / (elapsed / 1000)
  lastOpen = open

  running = !arrived
  if (running) window.requestAnimationFrame(tick)
}

function wake() {
  if (running) return
  running = true
  lastFrame = performance.now()
  window.requestAnimationFrame(tick)
}

function follow() {
  target = readProgress()
  if (target !== current) wake()
}

// Decide come disporre quaderno e fogli nello spazio disponibile e misura l'uscita del quaderno.
function measure() {
  const root = document.documentElement
  // Si riparte dalla misura naturale del quaderno, senza le scelte della misurazione precedente.
  root.classList.remove('notebook-spread-fits', 'sheets-side-by-side')
  root.style.removeProperty('--notebook-cap')

  stickyTop = Number.parseFloat(window.getComputedStyle(stage.value).top) || 0
  const rootStyle = window.getComputedStyle(root)
  const rem = Number.parseFloat(rootStyle.fontSize)
  const deskStyle = window.getComputedStyle(desk.value)
  const deskWidth = Number.parseFloat(deskStyle.width)
  const available =
    deskWidth - Number.parseFloat(deskStyle.paddingLeft) - Number.parseFloat(deskStyle.paddingRight)
  const natural = Number.parseFloat(window.getComputedStyle(notebook.value).width)
  const gap = Number.parseFloat(rootStyle.getPropertyValue('--sheet-gap')) * rem

  // Due fogli affiancati entrano, lasciando posto agli oggetti, se il quaderno non deve rimpicciolire troppo.
  const besideWidth = (available - gap - SIDE_MARGIN * rem * 2) / 2
  const sideBySide = besideWidth >= natural * MIN_SIDE_SCALE
  const spreadFits = sideBySide || natural * 2 <= available
  if (sideBySide && besideWidth < natural) {
    root.style.setProperty('--notebook-cap', `${Math.floor(besideWidth)}px`)
  }
  root.classList.toggle('notebook-spread-fits', spreadFits)
  root.classList.toggle('sheets-side-by-side', sideBySide)
  sheetsBeside = sideBySide

  // Quota dello scorrimento totale occupata dal tratto di base: il resto è lo scambio dei fogli.
  const swapScroll = Number.parseFloat(rootStyle.getPropertyValue('--cover-swap-scroll')) || 0
  baseShare = BASE_SCROLL / (BASE_SCROLL + swapScroll)

  // Il pannello della scrivania coincide con `desk`: il suo bordo sinistro è l'origine.
  const notebookWidth = Number.parseFloat(window.getComputedStyle(notebook.value).width)
  const edgeOffset = (deskWidth - notebookWidth) / 2 + (spreadFits ? notebookWidth / 2 : 0)
  departOut = -(edgeOffset + notebookWidth + 24)
  departEnd = -edgeOffset + 12
  setVar('--edge-offset', `${edgeOffset}px`)
}

function handleResize() {
  measure()
  follow()
}

onMounted(() => {
  measure()
  // L'apertura di Chi sono si vede sul foglio animato: la copia vera, nella sezione, resta trasparente.
  if (!reducedMotion.matches) document.documentElement.style.setProperty('--cover-settle', '0')
  target = readProgress()
  current = target
  apply(current)
  lastOpen = leafOpening(current)
  window.addEventListener('scroll', follow, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
})

onBeforeUnmount(() => {
  running = false
  window.removeEventListener('scroll', follow)
  window.removeEventListener('resize', handleResize)
  document.documentElement.style.removeProperty('--cover-settle')
  document.documentElement.style.removeProperty('--notebook-cap')
  document.documentElement.classList.remove('notebook-spread-fits', 'sheets-side-by-side')
})
</script>

<style scoped>
.cover {
  --band-out: 0;
  --open: 0;
  --lift: 0;
  --desk: 0;
  --sheet: 0;
  --sheet-arc: 0;
  --sheet-two: 0;
  --sheet-two-arc: 0;
  --swap: 0;
  --draw: 0;
  --tear: 0;
  --torn: 0;
  --close: 0;
  --depart-x: 0px;
  --desk-top: var(--space-4);
  --stage-top: calc(var(--navbar-height) + 0.125rem);

  /* Lo scorrimento in più oltre l'altezza della scena è la durata dell'intera sequenza. */
  height: calc(var(--stage-height) + 140svh + var(--cover-swap-scroll));
}

.cover__stage {
  position: sticky;
  top: var(--stage-top);
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  justify-items: center;
  height: var(--stage-height);

  /* Si ritaglia soltanto in orizzontale: in verticale l'ombra della scrivania deve poter uscire
     dalla scena, altrimenti resta tagliata di netto quando la scena scorre via. */
  overflow-x: clip;
}

/* Il pannello della scrivania e l'area che ne ritaglia il contenuto occupano lo stesso riquadro. */
.cover__surface,
.cover__desk {
  grid-area: 1 / 1;
  width: min(100% - var(--desk-gutter) * 2, var(--desk-width));
}

.cover__surface {
  position: relative;
  margin-block: var(--desk-top);
  border-radius: var(--desk-radius);
  box-shadow: var(--desk-shadow);
}

/* La scrivania non compare dal nulla: è un sottomano che entra dal basso e scivola sotto il
   quaderno, portando con sé gli oggetti che ha sopra. */
.cover__surface,
.cover__desk > .cover__props {
  translate: 0 calc((1 - var(--desk)) * var(--stage-height));
}

.cover__desk {
  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: center;
  justify-items: center;
  padding: var(--space-7) var(--space-4);
}

.cover__desk > .cover__props {
  inset-block: var(--desk-top);
}

/* Con le animazioni la scrivania prosegue senza stacchi in quella del Percorso, subito sotto. */
@media (prefers-reduced-motion: no-preference) {
  .cover__surface {
    margin-bottom: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .cover__desk > .cover__props {
    bottom: 0;
  }
}

/* Penna e cappuccio stanno nella striscia libera sopra i fogli, quasi dritti, invece di finirci sotto. */
.cover__props :deep(.desk-props__pen) {
  top: 0.9%;
  rotate: -2deg;
}

.cover__props :deep(.desk-props__pen-cap) {
  top: 0.4%;
  rotate: -5deg;
}

.notebook {
  /* Sulla copertina ogni misura è in cqw: a qualsiasi larghezza è lo stesso disegno, soltanto in scala. */
  --spine-width: min(7cqw, 2.75rem);
  position: relative;
  container-type: inline-size;

  /* Proporzione 3:4 che entra per intero nella scena. */
  width: min(100%, var(--notebook-size));
  /* Larghezza pari, dove round() è supportata: tiene il foglio sui pixel interi. */
  width: round(down, min(100%, var(--notebook-size)), 2px);
  aspect-ratio: 3 / 4;
  translate: calc(var(--open) * var(--notebook-shift)) 0;
  scale: calc(1 + var(--lift) * 0.05);
  rotate: calc(var(--lift) * -1.2deg);
  transform-origin: 50% 35%;
}

/* Quando la prima pagina esce, il resto del quaderno si richiude, esce a sinistra oltre il bordo
   della scrivania e rientra sotto di essa. */
.notebook__body {
  position: absolute;
  inset: 0;
  perspective: 112rem;
  translate: var(--depart-x) 0;
}

/* "Sotto la scrivania": si vede soltanto ciò che sta a sinistra del bordo del pannello. */
.cover--tucking .notebook__body {
  clip-path: inset(-50vh calc(100% + var(--edge-offset, 0px) + var(--depart-x)) -50vh -100vw);
}

.notebook__pages {
  position: absolute;
  inset: 0.5rem -0.4rem -0.45rem 1.5rem;
  background: repeating-linear-gradient(
    180deg,
    var(--paper) 0 0.0625rem,
    var(--paper-edge) 0.0625rem 0.125rem
  );
  border-radius: 0 1.1rem 1.1rem 0;
  box-shadow: 0 0.75rem 1.5rem -0.5rem var(--shadow-paper);
}

.notebook__sheet-box,
.notebook__sheet-paper,
.notebook__sheet-shadow {
  position: absolute;
  inset: 0;
}

/* Strappate dal quaderno, le pagine si staccano dall'alto ruotando sull'angolo in basso, poi si
   sollevano e vanno a posarsi sulla scrivania, grandi com'erano. */
.notebook__sheet {
  visibility: hidden;
  transform-origin: 0 0;
}

/* Dove i fogli restano impilati, il primo alla fine scivola via e scopre il secondo. */
.notebook__sheet--one {
  transform: translate(
      calc(var(--sheet) * var(--sheet-one-x) + var(--swap) * -135%),
      calc(var(--sheet-arc) * -1.25rem)
    )
    scale(calc(1 + var(--sheet-arc) * 0.04))
    rotate(calc(var(--sheet-arc) * -1.5deg + var(--swap) * -10deg)) translate(0, 100%)
    rotate(calc(var(--tear) * 3.5deg)) translate(0, -100%);
}

/* Sotto il primo sporge appena, storto; quando resta solo si raddrizza. */
.notebook__sheet--two {
  --peek: calc(var(--sheet-two) * (1 - var(--swap)));
  transform: translate(
      calc(var(--sheet-two) * var(--sheet-two-x) + var(--peek) * var(--sheet-two-peek)),
      calc(var(--sheet-two-arc) * -0.75rem)
    )
    scale(calc(1 + var(--sheet-two-arc) * 0.03))
    rotate(calc(var(--sheet-two-arc) * 1.2deg + var(--peek) * var(--sheet-two-rest))) translate(0, 100%)
    rotate(calc(var(--tear) * 3.5deg)) translate(0, -100%);
}

.notebook__sheet--two .notebook__sheet-shadow {
  opacity: calc(var(--sheet-two-arc) * 0.8 + var(--sheet-two) * 0.2);
  translate: 0 calc(0.5rem + var(--sheet-two-arc) * 1.5rem);
}

.cover--sheet-on .notebook__sheet {
  visibility: visible;
}

/* Gli appunti della seconda pagina compaiono quando la prima la copre: prima di allora
   questa pagina fa le veci della prima, ancora bianca, mentre la copertina si solleva. */
.notebook__notes {
  position: absolute;
  inset: 0;
  visibility: hidden;
}

.cover--sheet-on .notebook__notes {
  visibility: visible;
}

/* Ciò che resta attaccato al dorso dopo lo strappo. */
.notebook__stub {
  position: absolute;
  inset: 0 auto 0 0;
  width: var(--page-tear);
  background: var(--paper-warm);
  filter: drop-shadow(0.0625rem 0 0.0625rem rgb(57 45 29 / 40%));
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 64' preserveAspectRatio='none'%3E%3Cpath d='M0 0h4l3 5-5 4 4 5-5 6 4 5-2 6 5 5-6 6 4 5-5 6 4 5-1 6H0z'/%3E%3C/svg%3E")
    left top / var(--page-tear) calc(var(--page-line-height) * 2) repeat-y;
  opacity: var(--torn);
}

.notebook__sheet-shadow {
  background: rgb(57 45 29 / 45%);
  filter: blur(1.25rem);
  opacity: calc(var(--sheet-arc) * 0.8 + var(--sheet) * 0.2);
  translate: 0 calc(0.5rem + var(--sheet-arc) * 1.5rem);
}

/* Ombra che la copertina sollevata proietta sulla pagina. */
.notebook__shade {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(90deg, rgb(57 45 29 / 30%), transparent 65%);
  border-radius: 0.35rem 1.1rem 1.1rem 0.35rem;
  opacity: var(--lift);
}

.notebook__leaf {
  position: absolute;
  inset: 0;
  transform: rotateY(calc((var(--open) - var(--close)) * -180deg));
  transform-origin: left center;
  transform-style: preserve-3d;
}

.notebook__front,
.notebook__inside {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border: 0.0625rem solid var(--cover-board-edge);
}

.notebook__front {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  grid-template-columns: minmax(0, 1fr);
  gap: 4.5cqw;
  justify-items: center;
  padding: 9cqw 7cqw 0 calc(var(--spine-width) + 6cqw);
  background:
    repeating-linear-gradient(92deg, rgb(90 64 30 / 5%) 0 0.125rem, transparent 0.125rem 0.4375rem),
    var(--cover-board);
  border-radius: 0.35rem 1.1rem 1.1rem 0.35rem;
  box-shadow:
    inset 0 0 2.5rem rgb(90 64 30 / 12%),
    0 0.75rem 1.75rem -0.5rem var(--shadow-paper);
}

.notebook__inside {
  /* Il dorso, a specchio, resta sul lato destro: lì la pagina è in ombra. */
  padding-right: var(--spine-width);
  background:
    linear-gradient(270deg, rgb(90 64 30 / 22%) 0, transparent var(--spine-width)),
    var(--cover-inside);
  border-radius: 1.1rem 0.35rem 0.35rem 1.1rem;
  transform: rotateY(180deg);
}

/* Un piccolo strappo sul bordo superiore, segno di quaderno vissuto. È ritagliato nello stesso punto
   su entrambe le facce: quella interna è a specchio, quindi posizione e forma sono ribaltate. */
.notebook__front,
.notebook__inside {
  --tear-width: 8cqw;
  --tear-height: 6cqw;
  mask:
    linear-gradient(#000 0 0),
    var(--tear-hole) var(--tear-x) 0 / var(--tear-width) var(--tear-height) no-repeat;
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.notebook__front {
  --tear-x: 66cqw;
  --tear-hole: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 30' preserveAspectRatio='none'%3E%3Cpath d='M0 0H40L33 6 36 12 27 15 29 22 20 28 15 20 17 13 8 10 10 4z'/%3E%3C/svg%3E");
  --tear-edge: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 30' preserveAspectRatio='none'%3E%3Cpath d='M40 0L33 6 36 12 27 15 29 22 20 28 15 20 17 13 8 10 10 4 0 0' fill='none' stroke='%23eadfc6' stroke-width='2' stroke-linejoin='round' vector-effect='non-scaling-stroke'/%3E%3C/svg%3E");
}

.notebook__inside {
  --tear-x: 26cqw;
  --tear-hole: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 30' preserveAspectRatio='none'%3E%3Cpath transform='matrix(-1 0 0 1 40 0)' d='M0 0H40L33 6 36 12 27 15 29 22 20 28 15 20 17 13 8 10 10 4z'/%3E%3C/svg%3E");
  --tear-edge: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 30' preserveAspectRatio='none'%3E%3Cpath transform='matrix(-1 0 0 1 40 0)' d='M40 0L33 6 36 12 27 15 29 22 20 28 15 20 17 13 8 10 10 4 0 0' fill='none' stroke='%23f3ecdc' stroke-width='2' stroke-linejoin='round' vector-effect='non-scaling-stroke'/%3E%3C/svg%3E");
}

/* Il filo più chiaro del cartoncino lungo lo strappo. */
.notebook__front::after,
.notebook__inside::after {
  content: "";
  position: absolute;
  top: -0.0625rem;
  left: calc(var(--tear-x) - 0.0625rem);
  width: var(--tear-width);
  height: var(--tear-height);
  pointer-events: none;
  background: var(--tear-edge) center / 100% 100% no-repeat;
}

.notebook__spine {
  position: absolute;
  inset: 0 auto 0 0;
  width: var(--spine-width);
  background:
    repeating-linear-gradient(0deg, rgb(255 255 255 / 5%) 0 0.0625rem, transparent 0.0625rem 0.1875rem),
    repeating-linear-gradient(90deg, rgb(255 255 255 / 4%) 0 0.0625rem, transparent 0.0625rem 0.1875rem),
    var(--pen-black);
  border-radius: 0.35rem 0 0 0.35rem;
  box-shadow: 0.125rem 0 0.25rem rgb(36 48 58 / 30%);
}

/* L'elastico viene tirato oltre il bordo e torna al suo posto dietro il quaderno:
   da lì ne spuntano soltanto le punte, in alto e in basso. */
.notebook__band {
  position: absolute;
  inset: -0.35rem 0;
  pointer-events: none;
  translate: calc(var(--band-out) * 2rem) 0;
}

.cover--band-behind .notebook__band {
  z-index: -1;
}

.cover--band-behind .notebook__band :deep(.elastic__grip) {
  pointer-events: none;
}

.label {
  display: grid;
  width: 100%;
  padding: 3.65cqw 4.15cqw 3.3cqw;
  color: var(--pen-black);
  font-family: var(--font-hand);
  background: var(--cover-label);
  border: 0.125rem solid var(--cover-label);
  border-radius: 2.5cqw;
  outline: 0.125rem solid var(--cover-label-ink);
  outline-offset: -1.66cqw;
  box-shadow: 0.125rem 0.1875rem 0 rgb(0 0 0 / 12%);
  rotate: -1.5deg;
}

h1,
.label__occasion {
  margin: 0;
  font-size: inherit;
  font-weight: 700;
}

.label__row {
  display: block;
  padding: 1.16cqw 0.83cqw 0.66cqw;
  white-space: nowrap;
  border-bottom: 0.09375rem solid var(--cover-label-rule);
}

.label__title {
  font-size: 12cqw;
  line-height: 1.05;
}

.label__author {
  font-size: 5.9cqw;
  line-height: 1.25;
}

.label__occasion {
  color: var(--ink);
  font-size: 4.35cqw;
  line-height: 1.4;
}

.label__highlight {
  background: linear-gradient(
      transparent 56%,
      rgba(var(--hl-giallo), 0.6) 56% 92%,
      transparent 92%
    )
    no-repeat 0 0 / 100% 100%;
}

.label__written {
  display: inline-block;
}

/* Le due foto condividono la riga sotto l'etichetta. */
.sketch,
.photo {
  --taped-photo-tape-width: 13.3cqw;
  --taped-photo-tape-height: 4.15cqw;
  grid-row: 2;
  grid-column: 1;
  align-self: start;
}

.sketch {
  --taped-photo-padding: 1cqw;
  justify-self: start;
  width: 45%;
  margin: 0.5cqw 0 0 0.5cqw;
}

.photo {
  --taped-photo-padding: 1.33cqw 1.33cqw 4.65cqw;
  justify-self: end;
  width: 33%;
  margin-right: -4cqw;
}

@media (prefers-reduced-motion: no-preference) {
  .label__written {
    animation: pen-write 900ms var(--ease-in-out) 150ms both;
  }

  .label__written--second {
    animation-duration: 800ms;
    animation-delay: 1000ms;
  }

  .label__highlight {
    animation: highlighter-pass 420ms var(--ease-out) 1850ms both;
  }
}

/* Senza movimento il quaderno resta chiuso e la sezione successiva inizia sotto normalmente. */
@media (prefers-reduced-motion: reduce) {
  .cover {
    height: auto;
  }

  .cover__stage {
    position: static;
  }

  .cover__desk {
    padding-bottom: var(--space-7);
  }

  .cover__props,
  .notebook__sheet {
    display: none;
  }
}

@keyframes pen-write {
  from {
    clip-path: inset(-0.2em 100% -0.2em -0.1em);
  }

  to {
    clip-path: inset(-0.2em -0.1em);
  }
}

@keyframes highlighter-pass {
  from {
    background-size: 0% 100%;
  }
}
</style>
