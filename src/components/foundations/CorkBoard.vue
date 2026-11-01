<template>
  <!-- La bacheca appesa al muro: cornice di legno e piano di sughero, che è anche un container per
       chi ci appunta sopra. Il filo rosso va da una puntina con `thread` alla successiva, nell'ordine
       in cui compaiono: la sua forma si calcola dalle loro posizioni, a qualsiasi larghezza. -->
  <div class="cork-board">
    <div ref="surface" class="cork-board__surface" :style="{ 'timeline-scope': timelineScope }">
      <svg
        class="cork-board__thread"
        :viewBox="`0 0 ${size.width} ${size.height}`"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g
          v-for="segment in segments"
          :key="segment.timeline"
          :style="{ '--length': segment.length, '--timeline': segment.timeline }"
        >
          <path class="cork-board__thread-shadow" :d="segment.d" />
          <path class="cork-board__thread-line" :d="segment.d" />
          <path class="cork-board__thread-shine" :d="segment.d" />
        </g>
      </svg>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'

const surface = ref(null)
const size = reactive({ width: 1000, height: 1000 })
const segments = ref([])
const timelineScope = ref('none')
let resizeObserver

const round = value => value.toFixed(1)

function curveLength(from, control, to) {
  let length = 0
  let previous = from
  for (let step = 1; step <= 24; step++) {
    const t = step / 24
    const point = {
      x: (1 - t) ** 2 * from.x + 2 * (1 - t) * t * control.x + t ** 2 * to.x,
      y: (1 - t) ** 2 * from.y + 2 * (1 - t) * t * control.y + t ** 2 * to.y,
    }
    length += Math.hypot(point.x - previous.x, point.y - previous.y)
    previous = point
  }
  return length
}

// Fra due puntine il filo scende un poco per il peso, tanto più quanto il tratto è orizzontale. Un
// tratto quasi verticale, come in colonna sul telefono, si incurva invece di lato, verso il bordo più
// vicino della bacheca, così resta fuori dai fogli; un tratto sì e uno no l'arco è più stretto,
// perché un filo vero non fa curve tutte uguali. Ogni tratto si tende quando la sua puntina d'arrivo
// entra nello schermo: la puntina diventa la timeline del tratto, resa visibile al filo da
// timeline-scope.
function drawThread() {
  const box = surface.value.getBoundingClientRect()
  const pins = [...surface.value.querySelectorAll('[data-thread-pin]')]
  const points = pins.map((pin) => {
    const rect = pin.getBoundingClientRect()
    return { x: rect.left + rect.width / 2 - box.left, y: rect.top + rect.height / 2 - box.top }
  })

  const next = []
  for (let index = 1; index < points.length; index++) {
    const from = points[index - 1]
    const to = points[index]
    const dx = Math.abs(to.x - from.x)
    const dy = Math.abs(to.y - from.y)
    const middleX = (from.x + to.x) / 2
    const side = middleX < box.width / 2 ? -1 : 1
    const bow = dx < 48 ? Math.min(44, dy * 0.08) * (index % 2 ? 1 : 0.7) : 0
    const control = {
      x: middleX + side * bow,
      y: (from.y + to.y) / 2 + Math.min(60, dx * 0.25),
    }
    const timeline = `--thread-pin-${index}`
    pins[index].style.setProperty('view-timeline-name', timeline)
    next.push({
      timeline,
      d: `M${round(from.x)} ${round(from.y)} Q${round(control.x)} ${round(control.y)} ${round(to.x)} ${round(to.y)}`,
      length: Math.ceil(curveLength(from, control, to)),
    })
  }

  size.width = Math.round(box.width)
  size.height = Math.round(box.height)
  segments.value = next
  timelineScope.value = next.length ? next.map(segment => segment.timeline).join(', ') : 'none'
}

onMounted(() => {
  resizeObserver = new ResizeObserver(drawThread)
  resizeObserver.observe(surface.value)
  document.fonts.ready.then(drawThread)
})

onBeforeUnmount(() => resizeObserver?.disconnect())
</script>

<style scoped>
.cork-board {
  padding: clamp(0.65rem, 1.6vw, 1rem);
  background:
    linear-gradient(135deg, rgb(255 236 200 / 28%), transparent 40%, rgb(60 32 10 / 18%)),
    repeating-linear-gradient(90deg, rgb(90 55 22 / 10%) 0 0.08rem, transparent 0.08rem 0.9rem),
    var(--cork-frame);
  border-radius: 0.55rem;
  box-shadow:
    inset 0 0 0 0.08rem rgb(255 240 210 / 30%),
    inset 0 -0.18rem 0.25rem var(--cork-frame-dark),
    0.6rem 1.1rem 1.6rem -0.5rem rgb(48 34 20 / 42%);
}

/* Granuli scuri e chiari generati da un rumore, su un fondo caldo. I filtri lavorano in sRGB:
   nello spazio lineare predefinito i granuli uscirebbero molto più chiari. overflow: clip taglia ciò
   che pende oltre il bordo senza creare un contenitore di scorrimento, che fermerebbe le animazioni
   legate allo scorrimento di chi sta sulla bacheca. */
.cork-board__surface {
  position: relative;
  isolation: isolate;
  padding: var(--cork-board-padding, clamp(1.5rem, 4vw, 3rem));
  overflow: clip;
  background-color: var(--cork);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='f' x='0' y='0' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.3' numOctaves='1' seed='5' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .45 0 0 0 0 .28 0 0 0 0 .12 0 0 0 1.2 -.5'/%3E%3C/filter%3E%3Cfilter id='a' x='0' y='0' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.42' numOctaves='2' seed='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .5 0 0 0 0 .31 0 0 0 0 .14 0 0 0 7 -3.75'/%3E%3C/filter%3E%3Cfilter id='b' x='0' y='0' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.38' numOctaves='2' seed='11' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .87 0 0 0 0 .69 0 0 0 0 .47 0 0 0 7 -3.9'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23f)'/%3E%3Crect width='240' height='240' filter='url(%23a)'/%3E%3Crect width='240' height='240' filter='url(%23b)'/%3E%3C/svg%3E");
  background-size: 240px 240px;
  border-radius: 0.2rem;
  box-shadow:
    inset 0 0.45rem 0.8rem rgb(64 36 12 / 34%),
    inset 0 -0.1rem 0.3rem rgb(255 228 186 / 18%);
  container-type: inline-size;
}

/* Il filo sta sopra i fogli e sotto le teste delle puntine: un'ombra spostata sul piano, il filo e
   un riflesso sottile al centro. */
.cork-board__thread {
  position: absolute;
  inset: 0;
  z-index: 5;
  width: 100%;
  height: 100%;
  overflow: visible;
  fill: none;
  pointer-events: none;
}

.cork-board__thread path {
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
}

.cork-board__thread-shadow {
  stroke: rgb(40 20 8 / 26%);
  stroke-width: 3px;
  translate: 3px 6px;
}

.cork-board__thread-line {
  stroke: var(--thread-red);
  stroke-width: 2.6px;
}

.cork-board__thread-shine {
  stroke: rgb(255 170 150 / 45%);
  stroke-width: 0.8px;
  translate: -0.4px -0.5px;
}

/* Dove il browser lo permette e il movimento non è ridotto, ogni tratto si tende mentre la sua
   puntina d'arrivo sale dal fondo dello schermo; altrove il filo è già teso. */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .cork-board__thread path {
      stroke-dasharray: var(--length) calc(var(--length) + 10);
      animation: cork-board-thread linear both;
      animation-timeline: var(--timeline);
      animation-range: cover 4vh cover 34vh;
    }
  }
}

@keyframes cork-board-thread {
  from {
    stroke-dashoffset: var(--length);
  }

  to {
    stroke-dashoffset: 0;
  }
}
</style>
