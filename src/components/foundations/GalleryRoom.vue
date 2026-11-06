<template>
  <!-- Una sala della mostra, a tutta larghezza: parete intonacata del colore che le si passa, cornicione
       in alto con la sua ombra, battiscopa in basso e il nome della sala in lettere sulla parete. Le
       sale si susseguono con un tratto di corridoio fra l'una e l'altra. È un container: chi ci sta
       dentro può misurarsi su di lei.
       Con `walk` la sala si percorre a piedi, dove il browser lo permette, il movimento non è ridotto
       e lo schermo è abbastanza alto: la scena resta ferma sotto la navbar e scorrendo si cammina
       lungo la parete, dal nome della sala fino alla porta d'uscita, che si apre sulla notte e da cui
       si esce. Il contenuto riceve `walking` per disporsi in fila. Ogni elemento con
       `data-walk-stop` è un'opera, che si accende quando ci si arriva davanti; ogni elemento con
       `data-walk-depth` sta più vicino (sopra 1) o più lontano (sotto 1) della parete e scorre più o
       meno veloce. -->
  <div
    ref="room"
    class="room"
    :class="{ 'room--walk': walk, 'room--walking': walking }"
    :style="{ '--room-wall': wall }"
  >
    <div ref="stage" class="room__stage">
      <div class="room__world">
        <template v-if="walking">
          <span class="room__floor" aria-hidden="true"></span>
          <span class="room__ceiling" aria-hidden="true"></span>
        </template>

        <div ref="row" class="room__row" @focusin="reveal">
          <header class="room__heading">
            <h2 :id="headingId" class="room__title">{{ title }}</h2>
            <p v-if="subtitle" class="room__subtitle">{{ subtitle }}</p>
            <p v-if="walking" class="room__start" aria-hidden="true">Inizio della visita <span>→</span></p>
          </header>

          <slot :walking="walking" />

          <div v-if="walking" class="room__exit" aria-hidden="true">
            <span class="room__sign">
              <svg viewBox="0 0 16 16">
                <path d="M2.5 1.5h7v13h-7z" />
                <path d="M7 8h7.5M12 5.5 14.5 8 12 10.5" />
              </svg>
              Uscita
            </span>
            <span class="room__doorway">
              <span class="room__outside">
                <span ref="sky" class="room__sky"></span>
                <svg class="room__city" viewBox="0 0 100 60" preserveAspectRatio="none">
                  <path
                    class="room__buildings"
                    d="M0 36V16h9v-5h8v25h4V8h11v28h3V19h10v17h5V12h4V6h6v6h4v24h3V22h12v14h4V14h9v22h8V24h3v12Z"
                  />
                  <path
                    class="room__windows"
                    d="M3 20h2v2H3zM3 26h2v2H3zM11 15h2v2h-2zM13 22h2v2h-2zM24 12h2v2h-2zM28 17h2v2h-2zM24 24h2v2h-2zM28 30h2v2h-2zM38 23h2v2h-2zM41 29h2v2h-2zM52 16h2v2h-2zM56 10h2v2h-2zM52 25h2v2h-2zM58 30h2v2h-2zM72 26h2v2h-2zM76 31h2v2h-2zM86 18h2v2h-2zM89 26h2v2h-2zM94 28h2v2h-2z"
                  />
                  <path class="room__street" d="M0 36h100v24H0z" />
                  <path class="room__line" d="M2 48h9M17 48h9M32 48h9M47 48h9M62 48h9M77 48h9M92 48h8" />
                </svg>
              </span>
              <span class="room__door"><span class="room__handle"></span></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  headingId: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  wall: { type: String, default: 'var(--gallery-wall)' },
  walk: { type: Boolean, default: false },
})

// Il tratto d'uscita, in altezze della scena: la porta si apre nella sua prima parte, e poco dopo
// che ha cominciato ad aprirsi si avanza verso di lei fino a uscire.
const EXIT_SCROLL = 0.9
const DOOR_OPEN = 0.45
const ZOOM_FROM = 0.12
// Dove sta un'opera, in larghezze della scena, quando la sua luce comincia e finisce di accendersi.
const LIGHT_FROM = 0.82
const LIGHT_TO = 0.56
// Quanto la notte fuori dalla porta deborda dallo schermo alla fine dell'uscita.
const EXIT_MARGIN = 1.12

const TRACK_PROPS = [
  '--walk-distance',
  '--walk-length',
  '--walk-end',
  '--exit-zoom-from',
  '--exit-door-to',
  '--exit-origin',
  '--exit-scale',
]

const room = ref(null)
const stage = ref(null)
const row = ref(null)
const sky = ref(null)
const walking = ref(false)

let distance = 0
let observer = null
let motion = null

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

// La posizione di un elemento nella fila, senza le trasformazioni: la fila si sposta e la scena si
// ingrandisce, ma gli offset restano quelli dell'impaginazione.
function offsetIn(element, ancestor) {
  let x = 0
  let y = 0
  let node = element
  while (node && node !== ancestor) {
    x += node.offsetLeft
    y += node.offsetTop
    node = node.offsetParent
  }
  return node === ancestor ? { x, y } : null
}

function update() {
  if (!props.walk || !room.value) return
  const next = getComputedStyle(room.value).getPropertyValue('--room-can-walk').trim() === '1'
  if (next === walking.value) {
    measure()
    return
  }
  walking.value = next
  nextTick(() => {
    if (row.value && observer) observer.observe(row.value)
    measure()
  })
}

function measure() {
  const track = room.value
  if (!track) return

  if (!walking.value) {
    for (const name of TRACK_PROPS) track.style.removeProperty(name)
    for (const stop of track.querySelectorAll('[data-walk-stop]')) stop.style.removeProperty('--artwork-range')
    distance = 0
    return
  }

  const width = stage.value.clientWidth
  const height = stage.value.clientHeight
  distance = Math.max(0, row.value.offsetWidth - width)
  const exit = Math.round(height * EXIT_SCROLL)
  const length = distance + exit
  const at = value => `${((clamp(value, 0, length) / length) * 100).toFixed(3)}%`

  track.style.setProperty('--walk-distance', `${distance}px`)
  track.style.setProperty('--walk-length', `${length}px`)
  track.style.setProperty('--walk-end', at(distance))
  track.style.setProperty('--exit-zoom-from', at(distance + exit * ZOOM_FROM))
  track.style.setProperty('--exit-door-to', at(distance + exit * DOOR_OPEN))

  for (const stop of track.querySelectorAll('[data-walk-stop]')) {
    const spot = offsetIn(stop, row.value)
    if (!spot) continue
    const center = spot.x + stop.offsetWidth / 2
    const from = Math.min(center - width * LIGHT_FROM, distance)
    const to = Math.min(center - width * LIGHT_TO, distance)
    stop.style.setProperty('--artwork-range', `contain ${at(from)} contain ${at(to)}`)
  }

  // Chi è più vicino della parete scorre più veloce: è al suo posto quando la sua parte di parete è
  // al centro dello schermo, e da lì si sposta in proporzione al cammino.
  for (const item of track.querySelectorAll('[data-walk-depth]')) {
    const spot = offsetIn(item, row.value)
    if (!spot) continue
    const extra = Number(item.dataset.walkDepth) - 1
    const centered = spot.x + item.offsetWidth / 2 - width / 2
    item.style.setProperty('--depth-from', `${(extra * centered).toFixed(1)}px`)
    item.style.setProperty('--depth-to', `${(extra * (centered - distance)).toFixed(1)}px`)
  }

  // L'uscita: la scena si ingrandisce attorno al cielo oltre la porta finché il cielo non riempie lo
  // schermo, così sotto la sala continua la notte.
  const opening = offsetIn(sky.value, row.value)
  if (opening) {
    const skyWidth = sky.value.offsetWidth
    const skyHeight = sky.value.offsetHeight
    const originX = opening.x - distance + skyWidth / 2
    const originY = row.value.offsetTop + opening.y + skyHeight / 2
    const scale =
      EXIT_MARGIN *
      Math.max(
        (2 * originX) / skyWidth,
        (2 * (width - originX)) / skyWidth,
        (2 * originY) / skyHeight,
        (2 * (height - originY)) / skyHeight,
      )
    track.style.setProperty('--exit-origin', `${originX.toFixed(1)}px ${originY.toFixed(1)}px`)
    track.style.setProperty('--exit-scale', scale.toFixed(3))
  }
}

// Con la tastiera si può arrivare a un elemento che è ancora fuori dallo schermo, di lato: la pagina
// scorre fin dove la sala lo porta al centro.
function reveal(event) {
  if (!walking.value) return
  const spot = offsetIn(event.target, row.value)
  if (!spot) return
  const walk = clamp(spot.x + event.target.offsetWidth / 2 - stage.value.clientWidth / 2, 0, distance)
  const start =
    room.value.getBoundingClientRect().top + window.scrollY - parseFloat(getComputedStyle(stage.value).top)
  window.scrollTo({ top: start + walk, behavior: 'instant' })
}

onMounted(() => {
  if (!props.walk) return
  observer = new ResizeObserver(update)
  observer.observe(room.value)
  motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  motion.addEventListener('change', update)
  document.fonts?.ready.then(update)
  update()
})

onBeforeUnmount(() => {
  observer?.disconnect()
  motion?.removeEventListener('change', update)
})
</script>

<style scoped>
/* L'unità della sala percorribile: un centesimo dell'altezza della scena, o un sessantesimo della
   larghezza se lo schermo è stretto. Registrata, arriva in pixel anche dentro le cornici, che sono
   container a loro volta. */
@property --room-u {
  syntax: "<length>";
  inherits: true;
  initial-value: 0px;
}

/* overflow-x: clip taglia ciò che sporge ai lati (mensole, luci) senza creare un contenitore di
   scorrimento, che fermerebbe le animazioni legate allo scorrimento delle opere. */
.room {
  --room-plaster:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='p' x='0' y='0' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' seed='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .45 -.19'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23p)'/%3E%3C/svg%3E") 0 0 / 220px 220px,
    var(--room-wall);
  position: relative;
  margin-top: var(--space-8);
  padding: clamp(4.5rem, 9vw, 7rem) var(--space-4) clamp(5.5rem, 10vw, 8rem);
  overflow-x: clip;
  color: var(--gallery-lettering);
  background:
    linear-gradient(rgb(0 0 0 / 30%), transparent 8rem),
    linear-gradient(transparent calc(100% - 10rem), rgb(0 0 0 / 20%)),
    var(--room-plaster);
  container-type: inline-size;
}

/* Finché la sala resta ferma, le parti della scena percorribile non esistono: titolo e opere stanno
   direttamente nella sala. */
.room__stage,
.room__world,
.room__row {
  display: contents;
}

.room::before,
.room::after,
.room__ceiling {
  content: "";
  position: absolute;
  inset-inline: 0;
}

.room::before,
.room__ceiling {
  top: 0;
  height: 1rem;
  background: linear-gradient(#f4efe4, #ddd5c5 55%, #b3aa98);
  box-shadow: 0 0.35rem 0.7rem rgb(0 0 0 / 38%);
}

.room::after,
.room--walking .room__row::after {
  content: "";
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: 1.5rem;
  background: linear-gradient(#f1ebdf 0 12%, #d9d1c1 13% 100%);
  box-shadow: 0 -0.2rem 0.5rem rgb(0 0 0 / 28%);
}

.room__heading {
  margin-bottom: clamp(4rem, 9cqw, 6.5rem);
  text-align: center;
}

.room__title {
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(2.25rem, 6.5cqw, 4.5rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.26em;
  text-transform: uppercase;

  /* La spaziatura aggiunge spazio anche dopo l'ultima lettera: questo lo compensa. */
  margin-right: -0.26em;
}

.room__subtitle {
  margin: var(--space-3) 0 0;
  color: rgb(239 232 216 / 78%);
  font-size: 0.9rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

/* ——— La sala percorribile ———
   La sala diventa un binario alto quanto la scena più la strada da fare. La scena resta ferma sotto
   la navbar; la sua linea temporale (--room-walk) va da quando si ferma a quando riparte, e un pixel
   di scorrimento è un pixel di cammino. Le misure arrivano dallo script: --walk-distance (la strada
   lungo la parete), --walk-length (la strada più l'uscita), --walk-end (dove finisce la parete),
   --exit-* (la porta e il passaggio fuori). */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) and (min-height: 34rem) and (min-aspect-ratio: 1),
    (prefers-reduced-motion: no-preference) and (min-height: 44rem) {
    .room--walk {
      --room-can-walk: 1;
    }
  }
}

.room--walking {
  --walk-distance: 0px;
  --walk-length: 0px;
  --walk-end: 80%;
  --exit-zoom-from: 82%;
  --exit-door-to: 90%;
  --exit-origin: 50% 60%;
  --exit-scale: 6;
  height: calc(var(--stage-height) + var(--walk-length));
  padding: 0;
  background: var(--room-wall);
  view-timeline: --room-walk block;
  view-timeline-inset: calc(var(--navbar-height) + 0.125rem) 0;
}

.room--walking::before,
.room--walking::after {
  content: none;
}

.room--walking .room__stage {
  position: sticky;
  top: calc(var(--navbar-height) + 0.125rem);
  display: block;
  height: var(--stage-height);
  overflow: clip;
  background: var(--room-wall);
  container: room-stage / size;
}

/* Gli angoli in penombra, come in una sala con le luci sulle opere; si dissolvono uscendo. */
.room--walking .room__stage::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 3;
  background: radial-gradient(ellipse 78% 82% at 50% 44%, transparent 55%, rgb(0 0 0 / 42%));
  pointer-events: none;
  animation: room-fade linear both;
  animation-timeline: --room-walk;
  animation-range: contain var(--walk-end) contain 100%;
}

/* Il mondo della sala: pavimento, cornicione e parete. Alla fine si ingrandisce attorno alla porta. */
.room--walking .room__world {
  --room-u: min(1cqh, calc(100cqw / 60));
  position: absolute;
  inset: 0;
  display: block;
  perspective: calc(var(--room-u) * 40);
  perspective-origin: 50% calc((100% - var(--room-u) * 15) * 0.5);
  transform-origin: var(--exit-origin);
  will-change: scale;
  animation: room-zoom cubic-bezier(0.6, 0, 1, 0.5) both;
  animation-timeline: --room-walk;
  animation-range: contain var(--exit-zoom-from) contain 100%;
}

.room__ceiling {
  z-index: 2;
}

/* Il pavimento è un piano vero, steso verso chi guarda, che scorre con la parete: i listoni vicini
   corrono più veloci di quelli contro il muro. */
.room__floor {
  position: absolute;
  top: calc(100% - var(--room-u) * 15);
  left: -100cqw;
  width: calc(var(--walk-distance) + 300cqw);
  height: calc(var(--room-u) * 30);
  background:
    linear-gradient(rgb(255 228 186 / 16%), transparent 35%),
    linear-gradient(transparent 30%, rgb(0 0 0 / 50%)),
    repeating-linear-gradient(90deg, rgb(28 14 4 / 60%) 0 1px, transparent 1px calc(var(--room-u) * 5.5)),
    repeating-linear-gradient(90deg, rgb(255 226 180 / 5%) 0 calc(var(--room-u) * 5.5), rgb(0 0 0 / 7%) 0 calc(var(--room-u) * 11)),
    linear-gradient(#7d5739, #5b3d27);
  transform: rotateX(80deg);
  transform-origin: 50% 0;
  will-change: translate;
  animation: room-walk linear both;
  animation-timeline: --room-walk;
  animation-range: contain 0% contain var(--walk-end);
}

/* La parete con tutto quello che c'è appeso: una fila lunga quanto la sala, che scorre. */
.room--walking .room__row {
  position: absolute;
  inset: 0 auto calc(var(--room-u) * 15) 0;
  z-index: 1;
  display: flex;
  align-items: stretch;
  width: max-content;
  background:
    linear-gradient(rgb(0 0 0 / 30%), transparent 8rem),
    linear-gradient(transparent calc(100% - 10rem), rgb(0 0 0 / 20%)),
    var(--room-plaster);
  will-change: translate;
  animation: room-walk linear both;
  animation-timeline: --room-walk;
  animation-range: contain 0% contain var(--walk-end);
}

.room--walking .room__row :deep([data-walk-stop]) {
  --artwork-timeline: --room-walk;
}

.room--walking .room__row :deep([data-walk-depth]) {
  will-change: translate;
  animation: room-depth linear both;
  animation-timeline: --room-walk;
  animation-range: contain 0% contain var(--walk-end);
}

/* L'ingresso: il nome della sala al centro del primo schermo, e la prima opera che si affaccia sul
   bordo destro. */
.room--walking .room__heading {
  display: grid;
  flex: none;
  align-content: center;
  justify-items: center;
  width: 85cqw;
  margin: 0;
  padding: 0 0 calc(var(--room-u) * 6) 15cqw;
}

/* Su uno schermo stretto o alto l'ingresso occupa tutto lo schermo: la prima opera, più alta che
   larga, coprirebbe il nome della sala. */
@container room-stage (aspect-ratio < 1) or (width < 56rem) {
  .room--walking .room__heading {
    width: 100cqw;
    padding-left: 0;
  }
}

.room__start {
  margin: calc(var(--room-u) * 6) 0 0;
  padding: 0.6rem 1rem;
  color: var(--gallery-lettering);
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  background: rgb(0 0 0 / 22%);
  border: 1px solid rgb(201 163 90 / 70%);
  border-radius: 0.2rem;
}

.room__start span {
  display: inline-block;
  margin-left: 0.3em;
  color: var(--gallery-brass);
  animation: room-nudge 1.8s var(--ease-in-out) infinite;
}

/* L'uscita, in fondo alla parete: stipite chiaro, porta che si apre verso l'esterno della sala e,
   oltre, la notte sulla città. Dopo la porta resta mezza scena di parete, così a fine cammino la
   porta è al centro. */
.room__exit {
  position: relative;
  z-index: 1;
  flex: none;
  align-self: flex-end;
  width: calc(var(--room-u) * 30);
  height: calc(var(--room-u) * 52);
  margin-inline: calc(var(--room-u) * 30) calc(50cqw - var(--room-u) * 15);
  background: linear-gradient(90deg, #a69d8b, #f1ebdf 10%, #ddd5c5 50%, #c9c0ae 90%, #958c7a);
  box-shadow:
    0.5rem 0.4rem 1rem rgb(0 0 0 / 35%),
    inset 0 0.25rem 0.3rem rgb(255 255 255 / 30%);
}

.room__sign {
  position: absolute;
  bottom: calc(100% + var(--room-u) * 3);
  left: 50%;
  display: flex;
  gap: 0.45em;
  align-items: center;
  padding: 0.4em 0.75em;
  color: #effff4;
  font-family: var(--font-body);
  font-size: clamp(0.7rem, calc(var(--room-u) * 2), 1.05rem);
  font-weight: 800;
  letter-spacing: 0.16em;
  white-space: nowrap;
  text-transform: uppercase;
  background: #178a4a;
  border-radius: 0.15rem;
  box-shadow:
    0 0 0 0.15rem #0e5a30,
    0 0 1.6rem rgb(70 230 140 / 45%);
  translate: -50% 0;
}

.room__sign svg {
  width: 1.2em;
  height: 1.2em;
  fill: none;
  stroke: currentcolor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Il vano ritaglia la porta: aprendosi verso l'esterno oltre l'angolo retto, l'anta finisce dietro
   lo stipite e il passaggio resta libero. */
.room__doorway {
  position: absolute;
  inset: calc(var(--room-u) * 2) calc(var(--room-u) * 2) 0;
  overflow: clip;
  perspective: calc(var(--room-u) * 70);
  background: #06090c;
}

.room__outside {
  position: absolute;
  inset: 0;
  overflow: clip;
  background: var(--map-night);
}

/* Il cielo: è la parte della notte che riempie lo schermo uscendo, quindi ha il colore della mappa
   che segue, con qualche stella. */
.room__sky {
  position: absolute;
  inset: 0 0 40%;
  background: var(--map-night);
}

/* Le stelle svaniscono mentre si esce, così la notte arriva pulita alla mappa. */
.room__sky::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 18% 14%, rgb(255 255 255 / 70%) 0 0.06rem, transparent 0.1rem),
    radial-gradient(circle at 72% 9%, rgb(255 255 255 / 55%) 0 0.05rem, transparent 0.09rem),
    radial-gradient(circle at 44% 30%, rgb(255 255 255 / 45%) 0 0.05rem, transparent 0.09rem),
    radial-gradient(circle at 84% 42%, rgb(255 255 255 / 50%) 0 0.05rem, transparent 0.09rem),
    radial-gradient(circle at 28% 56%, rgb(255 255 255 / 40%) 0 0.05rem, transparent 0.09rem);
  animation: room-fade linear both;
  animation-timeline: --room-walk;
  animation-range: contain var(--exit-door-to) contain 100%;
}

.room__city {
  position: absolute;
  inset: 60% 0 0;
  width: 100%;
  height: 40%;
}

.room__buildings {
  fill: #080c10;
}

.room__windows {
  fill: #f2cf7a;
  opacity: 0.85;
}

.room__street {
  fill: var(--map-land);
}

.room__line {
  fill: none;
  stroke: var(--map-highway);
  stroke-width: 1.2;
}

/* La porta: due specchiature in rilievo e il pomolo d'ottone. Ruota sui cardini a sinistra e si apre
   verso la notte, come le porte d'uscita. */
.room__door {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgb(0 0 0 / 25%), transparent 8% 92%, rgb(0 0 0 / 30%)),
    #26332f;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 45%);
  transform-origin: 0 50%;
  animation: room-door var(--ease-in-out) both;
  animation-timeline: --room-walk;
  animation-range: contain var(--walk-end) contain var(--exit-door-to);
}

.room__door::before,
.room__door::after {
  content: "";
  position: absolute;
  inset-inline: 14%;
  border-radius: 0.15rem;
  box-shadow:
    inset 0.12rem 0.12rem 0.2rem rgb(255 255 255 / 10%),
    inset -0.15rem -0.15rem 0.25rem rgb(0 0 0 / 45%),
    0 0 0 1px rgb(0 0 0 / 25%);
}

.room__door::before {
  top: 8%;
  height: 46%;
}

.room__door::after {
  top: 60%;
  bottom: 8%;
}

.room__handle {
  position: absolute;
  top: 54%;
  right: 9%;
  width: calc(var(--room-u) * 1.6);
  aspect-ratio: 1;
  background: radial-gradient(circle at 35% 30%, #f3dca6, var(--gallery-brass) 45%, #6f5222);
  border-radius: 50%;
  box-shadow: 0.1rem 0.15rem 0.2rem rgb(0 0 0 / 50%);
}

@keyframes room-walk {
  from {
    translate: 0 0;
  }

  to {
    translate: calc(var(--walk-distance) * -1) 0;
  }
}

@keyframes room-depth {
  from {
    translate: var(--depth-from, 0) 0;
  }

  to {
    translate: var(--depth-to, 0) 0;
  }
}

@keyframes room-zoom {
  from {
    scale: 1;
  }

  to {
    scale: var(--exit-scale);
  }
}

@keyframes room-door {
  from {
    transform: rotateY(0deg);
  }

  to {
    transform: rotateY(115deg);
  }
}

@keyframes room-fade {
  to {
    opacity: 0;
  }
}

@keyframes room-nudge {
  50% {
    translate: 0.35em 0;
  }
}
</style>
