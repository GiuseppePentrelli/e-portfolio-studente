<template>
  <!-- La mappa della città da videogioco: isolati, parchi, acqua, strade e la statale, la casa con la
       freccia di chi gioca e un luogo per ogni elemento di `places`. Il luogo scelto (v-model) è la
       destinazione: il navigatore disegna il percorso più breve da dove si trova la freccia e,
       scegliendo un luogo con un clic, la freccia lo percorre seguendo le strade e si ferma davanti
       al luogo; la volta dopo riparte da lì. Emette `trip` con la lunghezza del percorso, in unità
       della mappa. I luoghi sono bottoni veri, della stessa misura a qualsiasi larghezza.
       `places`: { id, node, kind ('site', 'game', 'app' o 'locked'), label, tone ('personale' o
       'scuola') }. -->
  <div class="world-map">
    <svg class="world-map__ground" viewBox="0 0 160 160" aria-hidden="true">
      <rect class="world-map__land" width="160" height="160" />
      <polygon v-for="cell in CELLS" :key="cell.id" :class="`world-map__${cell.kind}`" :points="cell.points" />
      <polyline v-for="[a, b] in EDGES" :key="`${a}-${b}`" class="world-map__road" :points="toPoints([a, b])" />
      <path class="world-map__highway-casing" :d="HIGHWAY" />
      <path class="world-map__highway" :d="HIGHWAY" />
      <polyline class="world-map__route" :points="routePoints" />
      <path class="world-map__home" :d="homePath" />
      <g :transform="`translate(${playerPos[0]} ${playerPos[1]})`">
        <path class="world-map__player" d="M0 -5 5 5 0 2.5 -5 5Z" :style="{ rotate: `${heading}deg` }" />
      </g>
    </svg>

    <div class="world-map__places">
      <button
        v-for="place in places"
        :key="place.id"
        type="button"
        class="world-map__place"
        :class="[
          `world-map__place--${place.tone ?? 'personale'}`,
          {
            'world-map__place--locked': place.kind === 'locked',
            'world-map__place--label-below': NODES[place.node][1] < 32,
            'world-map__place--label-left': NODES[place.node][0] > 120,
            'world-map__place--label-right': NODES[place.node][0] < 40,
          },
        ]"
        :style="{ left: `${(NODES[place.node][0] / 160) * 100}%`, top: `${(NODES[place.node][1] / 160) * 100}%` }"
        :aria-pressed="String(place.id === model)"
        @click="pick(place)"
      >
        <svg class="world-map__icon" viewBox="-7 -7 14 14" aria-hidden="true">
          <g v-if="place.kind === 'site'">
            <path class="world-map__glyph" d="M-4.5 -3.5H4.5V3.5H-4.5Z" />
            <path class="world-map__glyph-fill" d="M-4.5 -3.5H4.5V-1.4H-4.5Z" />
          </g>
          <g v-else-if="place.kind === 'game'">
            <path
              class="world-map__glyph-fill"
              d="M-5 -1.2A2.6 2.6 0 0 1 -2.4 -3.8H2.4A2.6 2.6 0 0 1 5 -1.2V1.2A2.6 2.6 0 0 1 0.8 2.8H-0.8A2.6 2.6 0 0 1 -5 1.2Z"
            />
            <path class="world-map__glyph-cut" d="M-3.6 -0.5H-1.4M-2.5 -1.6V0.6" />
            <circle class="world-map__glyph-dot" cx="2" cy="-1" r="0.65" />
            <circle class="world-map__glyph-dot" cx="3.2" cy="0.3" r="0.65" />
          </g>
          <g v-else-if="place.kind === 'app'">
            <path class="world-map__glyph" d="M-2.6 -4.6H2.6V4.6H-2.6Z" />
            <path class="world-map__glyph" d="M-0.8 3H0.8" />
          </g>
          <g v-else>
            <path class="world-map__glyph" d="M-1.9 -2.2A2 2 0 1 1 0.7 -0.3C0 0.2 0 0.8 0 1.4" />
            <circle class="world-map__glyph-fill" cx="0" cy="3.4" r="0.7" />
          </g>
        </svg>
        <span class="world-map__label">{{ place.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import { CELLS, EDGES, HIGHWAY, HOME, NODES, planFrom, toPoints } from './openWorldMap.js'

const props = defineProps({
  places: { type: Array, required: true },
})

const emit = defineEmits(['trip'])
const model = defineModel({ type: String, default: null })

// La freccia si ferma a STOP unità dal centro del luogo, così resta visibile davanti al bottone, e
// corre a SPEED unità al secondo, fra MIN_MS e MAX_MS di viaggio.
const STOP = 12
const SPEED = 70
const MIN_MS = 500
const MAX_MS = 2600

const home = NODES[HOME]
const homePath = `M${home[0] - 13} ${home[1] + 9} ${home[0] - 8} ${home[1] + 4} ${home[0] - 3} ${home[1] + 9}V${home[1] + 14}H${home[0] - 13}Z`

const playerPos = ref([...home])
const heading = ref(0)
const routePoints = ref('')

// Dove si trova la freccia: un punto sulla strada fra due incroci. All'inizio è a casa.
let location = { a: HOME, b: HOME, pos: [...home] }
let frame = 0
let picking = false

const distance = (p, q) => Math.hypot(q[0] - p[0], q[1] - p[1])
const format = points => points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')

// La freccia gira sempre dal lato più corto.
function turnTowards(p, q) {
  const angle = (Math.atan2(q[1] - p[1], q[0] - p[0]) * 180) / Math.PI + 90
  heading.value += ((((angle - heading.value) % 360) + 540) % 360) - 180
}

function firstMove(points) {
  for (let i = 1; i < points.length; i++) if (distance(points[i - 1], points[i]) > 0.01) return [points[i - 1], points[i]]
  return null
}

// Il percorso fermo: la linea da dove si trova la freccia al luogo, e la freccia girata verso la
// prima strada. È così all'apertura, cambiando strato e con movimento ridotto.
function show(place) {
  cancelAnimationFrame(frame)
  const plan = planFrom(location, place.node)
  routePoints.value = format(plan.points)
  const move = firstMove(plan.points)
  if (move) turnTowards(...move)
  emit('trip', plan.length)
}

// Il viaggio: la freccia segue la strada fino a STOP unità dal luogo, girando a ogni incrocio, e la
// linea del navigatore si accorcia davanti a lei. Un nuovo clic durante il viaggio riparte dal punto
// in cui la freccia è arrivata.
function drive(place) {
  cancelAnimationFrame(frame)
  const plan = planFrom(location, place.node)
  emit('trip', plan.length)

  const target = plan.points.at(-1)
  const before = plan.points.at(-2)
  const last = distance(before, target)
  if (plan.points.length === 2 && last <= STOP + 0.5) {
    routePoints.value = format(plan.points)
    return
  }
  const stop = last > STOP ? [target[0] - ((target[0] - before[0]) * STOP) / last, target[1] - ((target[1] - before[1]) * STOP) / last] : before
  const path = [...plan.points.slice(0, -1), stop]
  const ids = plan.ids
  const lengths = [0]
  for (let i = 1; i < path.length; i++) lengths.push(lengths[i - 1] + distance(path[i - 1], path[i]))
  const total = lengths.at(-1)
  const duration = Math.min(MAX_MS, Math.max(MIN_MS, (total / SPEED) * 1000))
  const origin = location
  const started = performance.now()
  let segment = -1

  function step(now) {
    const t = Math.min(1, (now - started) / duration)
    const eased = t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2
    const travelled = eased * total
    let i = 0
    while (i < path.length - 2 && lengths[i + 1] < travelled) i++
    const piece = lengths[i + 1] - lengths[i]
    const k = piece > 0 ? (travelled - lengths[i]) / piece : 1
    const pos = [path[i][0] + (path[i + 1][0] - path[i][0]) * k, path[i][1] + (path[i + 1][1] - path[i][1]) * k]
    if (i !== segment && piece > 0.01) {
      segment = i
      turnTowards(path[i], path[i + 1])
    }
    playerPos.value = pos
    routePoints.value = format([pos, ...path.slice(i + 1, -1), target])
    location = ids[i] === null ? { a: origin.a, b: origin.b, pos } : { a: ids[i], b: ids[i + 1], pos }
    if (t < 1) frame = requestAnimationFrame(step)
  }
  frame = requestAnimationFrame(step)
}

function pick(place) {
  picking = true
  model.value = place.id
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) show(place)
  else drive(place)
}

// Una destinazione cambiata da fuori, come all'apertura o cambiando strato, mostra solo il percorso.
watch(
  model,
  (id) => {
    if (picking) {
      picking = false
      return
    }
    const place = props.places.find(item => item.id === id)
    if (place) show(place)
  },
  { immediate: true },
)

onBeforeUnmount(() => cancelAnimationFrame(frame))
</script>

<style scoped>
/* La mappa è quadrata, con gli angoli arrotondati e la cornice chiara, ed è un container: i luoghi
   si misurano su di lei. */
.world-map {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border: 0.2rem solid rgb(255 255 255 / 85%);
  border-radius: 9%;
  box-shadow: 0 1rem 2rem rgb(0 0 0 / 55%);
  container-type: inline-size;
}

.world-map__ground {
  display: block;
  width: 100%;
  height: 100%;
}

.world-map__land { fill: var(--map-land); }
.world-map__block { fill: var(--map-block); }
.world-map__block-alt { fill: var(--map-block-alt); }
.world-map__park { fill: var(--map-park); }
.world-map__water { fill: var(--map-water); }

.world-map__road {
  fill: none;
  stroke: var(--map-road);
  stroke-linecap: round;
  stroke-width: 2.4;
}

.world-map__highway-casing {
  fill: none;
  stroke: #1a2027;
  stroke-width: 6.4;
}

.world-map__highway {
  fill: none;
  stroke: var(--map-highway);
  stroke-width: 4;
}

.world-map__route {
  fill: none;
  stroke: var(--map-route);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 3;
  filter: drop-shadow(0 0 1.5px var(--map-route));
}

.world-map__home {
  fill: var(--map-home);
  stroke: var(--map-pin);
  stroke-width: 1;
}

.world-map__player {
  fill: #fff;
  stroke: var(--map-pin);
  stroke-linejoin: round;
  stroke-width: 1;
  transform-box: fill-box;
  transform-origin: center;
  transition: rotate 180ms var(--ease-out);
}

/* I luoghi: bottoni tondi sull'incrocio. L'anello è bianco per i progetti per conto mio, giallo per
   quelli di scuola, tratteggiato per le missioni ancora da sbloccare. Il nome compare sopra (o sotto,
   vicino al bordo in alto) quando ci si passa, con il focus e sulla destinazione. */
.world-map__places {
  position: absolute;
  inset: 0;
}

.world-map__place {
  --ring: var(--map-mark);
  position: absolute;
  display: grid;
  place-items: center;
  width: max(2.75rem, 9.5cqw);
  aspect-ratio: 1;
  padding: 0;
  color: var(--map-mark);
  font: inherit;
  background: var(--map-pin);
  border: 0.15rem solid var(--ring);
  border-radius: 50%;
  cursor: pointer;
  translate: -50% -50%;
}

.world-map__place--scuola {
  --ring: var(--map-highway);
}

.world-map__place--locked {
  color: rgb(244 241 234 / 70%);
  border-style: dashed;
}

.world-map__place[aria-pressed="true"] {
  border-color: var(--map-route);
  box-shadow:
    0 0 0 0.2rem rgb(214 76 216 / 35%),
    0 0 0.8rem var(--map-route);
}

.world-map__place:focus-visible {
  outline: 0.2rem solid var(--map-focus);
  outline-offset: 0.2rem;
}

.world-map__icon {
  width: 72%;
  height: 72%;
  overflow: visible;
}

.world-map__glyph {
  fill: none;
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.1;
}

.world-map__glyph-fill {
  fill: currentcolor;
}

.world-map__glyph-cut {
  fill: none;
  stroke: var(--map-pin);
  stroke-linecap: round;
  stroke-width: 0.9;
}

.world-map__glyph-dot {
  fill: var(--map-pin);
}

.world-map__label {
  position: absolute;
  bottom: calc(100% + 0.4rem);
  left: 50%;
  z-index: 2;
  padding: 0.2rem 0.55rem;
  color: var(--map-mark);
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 800;
  white-space: nowrap;
  background: rgb(17 22 27 / 94%);
  border-radius: 0.4rem;
  opacity: 0;
  pointer-events: none;
  translate: -50% 0.25rem;
  transition: opacity var(--duration-fast) ease, translate var(--duration-fast) ease;
}

.world-map__place--label-below .world-map__label {
  top: calc(100% + 0.4rem);
  bottom: auto;
  translate: -50% -0.25rem;
}

/* Vicino ai bordi a destra e a sinistra il nome si allinea al bottone verso l'interno, o la mappa lo
   taglierebbe. */
.world-map__place--label-left .world-map__label {
  right: 0;
  left: auto;
  translate: 0 0.25rem;
}

.world-map__place--label-right .world-map__label {
  left: 0;
  translate: 0 0.25rem;
}

.world-map__place--label-below.world-map__place--label-left .world-map__label,
.world-map__place--label-below.world-map__place--label-right .world-map__label {
  translate: 0 -0.25rem;
}

.world-map__place:is(.world-map__place--label-left, .world-map__place--label-right):is(:hover, :focus-visible, [aria-pressed="true"]) .world-map__label {
  translate: 0 0;
}

.world-map__place:hover .world-map__label,
.world-map__place:focus-visible .world-map__label,
.world-map__place[aria-pressed="true"] .world-map__label {
  opacity: 1;
  translate: -50% 0;
}

.world-map__place[aria-pressed="true"] {
  z-index: 1;
}

@media (hover: hover) and (pointer: fine) {
  .world-map__place:hover {
    border-color: #fff;
  }
}

@media (prefers-reduced-motion: reduce) {
  .world-map__player,
  .world-map__label {
    transition: none;
  }
}
</style>
