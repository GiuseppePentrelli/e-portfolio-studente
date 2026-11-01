<template>
  <!-- Un componente del repository components, caricato dalla sua pagina in un iframe e mostrato in
       piccolo, come un sito aperto su un altro schermo. L'iframe è largo quanto il riquadro diviso
       per BASE_SCALE e poi rimpicciolito: il componente si vede come a quella larghezza, intero e
       usabile. La pagina include embed.js e comunica con postMessage l'altezza che le serve; se non
       ci sta, la scala scende ancora. Si accettano solo i messaggi di quell'iframe e della sua
       origine. -->
  <div ref="box" class="embed">
    <p v-if="!loaded" class="embed__loading">Caricamento…</p>
    <iframe
      ref="frame"
      class="embed__frame"
      :src="src"
      :title="title"
      :style="frameStyle"
      loading="lazy"
      @load="loaded = true"
    ></iframe>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  title: { type: String, required: true },
  height: { type: Number, default: 600 },
})

const BASE_SCALE = 0.68
const MIN_HEIGHT = 200
const MAX_HEIGHT = 1400

const box = ref(null)
const frame = ref(null)
const loaded = ref(false)
const boxSize = reactive({ width: 0, height: 0 })
const contentHeight = ref(props.height)
const origin = new URL(props.src).origin

const frameStyle = computed(() => {
  const { width, height } = boxSize
  if (!width || !height) return { visibility: 'hidden' }
  const virtualWidth = width / BASE_SCALE
  const scale = Math.min(BASE_SCALE, height / contentHeight.value)
  const left = (width - virtualWidth * scale) / 2
  const top = Math.max(0, (height - contentHeight.value * scale) / 2)
  return {
    width: `${virtualWidth}px`,
    height: `${contentHeight.value}px`,
    transform: `translate(${left}px, ${top}px) scale(${scale})`,
  }
})

function onMessage(event) {
  if (event.origin !== origin || event.source !== frame.value?.contentWindow) return
  const height = Number(event.data?.type === 'component:height' && event.data.height)
  if (height) contentHeight.value = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, Math.ceil(height)))
}

let resizeObserver

onMounted(() => {
  window.addEventListener('message', onMessage)
  resizeObserver = new ResizeObserver(([entry]) => {
    boxSize.width = entry.contentRect.width
    boxSize.height = entry.contentRect.height
  })
  resizeObserver.observe(box.value)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', onMessage)
  resizeObserver?.disconnect()
})
</script>

<style scoped>
/* Il riquadro taglia quello che sporge, come il bordo di uno schermo: dentro non ci sono animazioni
   legate allo scorrimento della pagina, quindi hidden non ferma niente. */
.embed {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.embed__frame {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  background: transparent;
  border: 0;
  transform-origin: 0 0;
}

.embed__loading {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  margin: 0;
  color: rgb(207 233 238 / 75%);
  font-family: var(--font-code);
  font-size: 0.85rem;
}
</style>
