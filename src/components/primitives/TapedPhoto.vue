<template>
  <figure
    ref="root"
    class="taped-photo"
    :style="{ '--tilt': `${tilt}deg`, '--tape-at': `${tapeAt}%`, '--tape-tilt': `${tapeTilt}deg` }"
    @pointerenter="touch"
    @pointermove="touch"
    @pointerleave="release"
  >
    <span class="taped-photo__tape" aria-hidden="true"></span>
    <slot />
  </figure>
</template>

<script setup>
import { ref } from 'vue'
import { usePaperSpring } from '@/composables/usePaperSpring'

// Una foto fissata soltanto in alto con lo scotch: il lembo libero si solleva e la foto oscilla
// attorno allo scotch, poi torna ferma da sola. Il movimento è quello di `usePaperSpring`.
const props = defineProps({
  // Inclinazione a riposo, in gradi.
  tilt: { type: Number, default: 4 },
  // Posizione orizzontale dello scotch, in percentuale: è anche il punto attorno a cui la foto oscilla.
  tapeAt: { type: Number, default: 30 },
  tapeTilt: { type: Number, default: -8 },
  // Velocità del supporto, con segno: più è alta, più il lembo si solleva.
  drive: { type: Number, default: 0 },
  // Colpetto iniziale, per far assestare la foto appena compare. 0 per lasciarla ferma.
  nudgeOnMount: { type: Number, default: 0 },
})

const root = ref(null)
const { nudge, touch, release } = usePaperSpring(root, {
  drive: () => props.drive,
  nudgeOnMount: props.nudgeOnMount,
})

defineExpose({ nudge })
</script>

<style scoped>
.taped-photo {
  --lifted: calc(var(--flap, 0) / 24);
  position: relative;
  margin: 0;
  padding: var(--taped-photo-padding, 0.4rem 0.4rem 1.4rem);
  background: var(--paper-photo);
  box-shadow: 0.125rem calc(0.25rem + var(--lifted) * 0.9rem) calc(0.5rem + var(--lifted) * 1.1rem) -0.125rem
    var(--shadow-paper);

  /* Lo scotch fa da cerniera. */
  transform: perspective(36rem) rotate(calc(var(--tilt) + var(--swing, 0) * 1deg))
    rotateX(calc(var(--flap, 0) * 1deg));
  transform-origin: var(--tape-at) 0;
}

.taped-photo :slotted(img) {
  display: block;
  width: 100%;
  height: auto;
}

.taped-photo__tape {
  position: absolute;
  top: calc(var(--taped-photo-tape-height, 1.25rem) * -0.48);
  left: var(--tape-at);
  width: var(--taped-photo-tape-width, 4rem);
  height: var(--taped-photo-tape-height, 1.25rem);
  background: var(--paper-tape);
  box-shadow: 0 0.0625rem 0.125rem var(--shadow-soft);
  translate: -50% 0;
  rotate: var(--tape-tilt);
}
</style>
