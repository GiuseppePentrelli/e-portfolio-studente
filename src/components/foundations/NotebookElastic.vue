<template>
  <svg
    ref="svg"
    class="elastic"
    :class="{ 'elastic--dragging': dragging }"
    :viewBox="`0 0 ${WIDTH} ${height}`"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path class="elastic__shadow" :d="path" transform="translate(2,3)" />
    <path class="elastic__band" :d="path" />
    <path class="elastic__light" :d="path" transform="translate(-3,0)" />
    <path
      class="elastic__grip"
      :d="path"
      @pointerdown="startDrag"
      @pointermove="drag"
      @pointerup="release"
      @pointercancel="release"
    />
  </svg>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  // Millisecondi dopo i quali l'elastico vibra una volta; null per non farlo vibrare.
  nudgeDelay: { type: Number, default: null },
  // Tensione aggiunta dall'esterno, nelle stesse unità della curvatura.
  pull: { type: Number, default: 0 },
})

const WIDTH = 150
const REST_X = 132
const GRIP_MARGIN = 40

const svg = ref(null)
const height = ref(520)
const bend = ref(0)
const bendY = ref(260)
const dragging = ref(false)

const path = computed(
  () =>
    `M${REST_X} 0 Q ${REST_X + (bend.value + props.pull) * 2} ${bendY.value} ${REST_X} ${height.value}`,
)

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
let spring = null
let nudgeTimer = null
let resizeObserver = null
let startX = 0
let startBend = 0
let scale = 1
let samples = []

function stopSpring() {
  spring?.stop()
  spring = null
}

// Molla smorzata e interrompibile: `response` è il periodo in secondi, `damping` lo smorzamento.
function springBack({ velocity = 0, response, damping }) {
  stopSpring()
  if (reducedMotion.matches) {
    bend.value = 0
    return
  }

  const stiffness = (2 * Math.PI / response) ** 2
  const friction = 4 * Math.PI * damping / response
  let position = bend.value
  let last = performance.now()
  let frame = null
  let stopped = false

  function step(now) {
    if (stopped) return
    const delta = Math.min(0.032, (now - last) / 1000) / 4
    last = now
    for (let i = 0; i < 4; i += 1) {
      velocity += (-stiffness * position - friction * velocity) * delta
      position += velocity * delta
    }

    if (Math.abs(velocity) < 4 && Math.abs(position) < 0.4) {
      bend.value = 0
      return
    }
    bend.value = position
    frame = window.requestAnimationFrame(step)
  }

  frame = window.requestAnimationFrame(step)
  spring = {
    stop() {
      stopped = true
      window.cancelAnimationFrame(frame)
    },
  }
}

function gripY(event) {
  const rect = svg.value.getBoundingClientRect()
  const y = (event.clientY - rect.top) * (height.value / rect.height)
  return Math.max(GRIP_MARGIN, Math.min(height.value - GRIP_MARGIN, y))
}

function track(event) {
  const now = performance.now()
  samples.push([event.clientX, now])
  while (samples.length > 2 && now - samples[0][1] > 100) samples.shift()
}

function horizontalVelocity() {
  if (samples.length < 2) return 0
  const first = samples[0]
  const lastSample = samples[samples.length - 1]
  return (lastSample[0] - first[0]) / Math.max(1, lastSample[1] - first[1])
}

function startDrag(event) {
  stopSpring()
  window.clearTimeout(nudgeTimer)
  dragging.value = true
  scale = WIDTH / svg.value.getBoundingClientRect().width
  startX = event.clientX
  startBend = bend.value
  samples = []
  track(event)
  bendY.value = gripY(event)
  event.currentTarget.setPointerCapture(event.pointerId)
}

function drag(event) {
  if (!dragging.value) return
  track(event)
  bendY.value = gripY(event)

  // L'elastico resiste sempre di più man mano che viene tirato.
  let pull = startBend + (event.clientX - startX) * scale
  if (pull < 0) pull *= 0.15
  else if (pull > 40) pull = 40 + (pull - 40) * 0.35
  bend.value = pull
}

function release() {
  if (!dragging.value) return
  dragging.value = false
  const moved = Math.abs(bend.value - startBend) > 1
  springBack({
    velocity: moved ? horizontalVelocity() * 1000 * scale : 220,
    response: 0.35,
    damping: 0.45,
  })
}

onMounted(() => {
  resizeObserver = new ResizeObserver(([entry]) => {
    height.value = Math.max(1, Math.round(entry.contentRect.height))
    if (!dragging.value) bendY.value = height.value / 2
  })
  resizeObserver.observe(svg.value)

  if (props.nudgeDelay !== null && !reducedMotion.matches) {
    nudgeTimer = window.setTimeout(() => {
      if (!dragging.value) springBack({ velocity: 220, response: 0.45, damping: 0.35 })
    }, props.nudgeDelay)
  }
})

onBeforeUnmount(() => {
  stopSpring()
  window.clearTimeout(nudgeTimer)
  resizeObserver?.disconnect()
})
</script>

<style scoped>
.elastic {
  position: absolute;
  top: -0.25rem;
  right: 0;
  bottom: -0.25rem;
  z-index: 2;
  width: 9.375rem;
  height: calc(100% + 0.5rem);
  overflow: visible;
  pointer-events: none;
  user-select: none;
  -webkit-touch-callout: none;
}

.elastic path {
  fill: none;
  stroke-linecap: round;
}

.elastic__shadow {
  stroke: rgb(0 0 0 / 25%);
  stroke-width: 15;
}

.elastic__band {
  stroke: var(--pen-black);
  stroke-width: 13;
}

.elastic__light {
  stroke: rgb(255 255 255 / 14%);
  stroke-width: 3;
}

.elastic__grip {
  stroke: transparent;
  stroke-width: 48;
  pointer-events: stroke;
  cursor: grab;
  touch-action: pan-y;
}

.elastic--dragging .elastic__grip {
  cursor: grabbing;
}
</style>
