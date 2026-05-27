<template>
  <Transition name="intro" @after-leave="$emit('done')">
    <button v-if="visible" type="button" class="intro-screen" aria-label="Salta introduzione" @click="skip">

      <!-- Terminale -->
      <div class="terminal" :class="{ warp: phase === 'warp' }">
        <div v-for="(line, i) in shownLines" :key="i" class="term-line">
          <span class="prompt">▸</span>
          <span class="term-text" :style="{ animationDelay: `${i * 0.04}s` }">{{ line }}</span>
        </div>
        <span v-if="phase === 'typing'" class="cursor" />
      </div>

      <!-- Flash al centro che esplode nel reveal -->
      <div class="flash-dot" :class="{ explode: phase === 'reveal' }" />

      <!-- Hint skip -->
      <span class="skip-hint">click to skip</span>

    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineEmits(['done'])

const LINES = [
  'init portfolio.exe',
  'loading assets...',
  'checking coffee levels... OK',
  'welcome, giuseppe.',
]

const visible    = ref(true)
const phase      = ref('typing')   // typing | pause | warp | reveal
const shownLines = ref([])

function skip() {
  visible.value = false
}

onMounted(async () => {
  // Typewriter: una riga ogni 400ms
  for (let i = 0; i < LINES.length; i++) {
    await delay(i === 0 ? 200 : 420)
    shownLines.value.push(LINES[i])
  }

  // Pausa dopo l'ultima riga
  await delay(600)
  phase.value = 'warp'

  // Warp dura 700ms poi reveal
  await delay(700)
  phase.value = 'reveal'

  // Flash espande, poi l'intro scompare
  await delay(500)
  visible.value = false
})

function delay(ms) {
  return new Promise(r => setTimeout(r, ms))
}
</script>

<style scoped>
.intro-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #0d1117;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  border: none;
  padding: 0;
  appearance: none;
}

/* --- Terminale --- */
.terminal {
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: transform .7s cubic-bezier(0.55, 0, 1, 0.45),
              opacity   .4s ease;
  will-change: transform, opacity;
}
.terminal.warp {
  transform: perspective(600px) translateZ(400px) scale(0.1);
  opacity: 0;
}

.term-line {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'JetBrains Mono Variable', monospace;
  font-size: clamp(14px, 2vw, 18px);
  color: #e6edf3;
}
.prompt {
  color: #f5c842;
  font-size: 1em;
}
.term-text {
  opacity: 0;
  animation: fadeSlide .3s ease forwards;
}
.cursor {
  display: inline-block;
  width: 10px;
  height: 1.2em;
  background: #f5c842;
  margin-left: 4px;
  vertical-align: -2px;
  animation: blink .9s steps(2) infinite;
}

@keyframes fadeSlide {
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: none; }
}
@keyframes blink {
  50% { opacity: 0; }
}

/* --- Flash dot --- */
.flash-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 24px 8px rgba(245, 200, 66, 0.8);
  opacity: 0;
  transform: scale(1);
  transition: none;
}
.flash-dot.explode {
  opacity: 1;
  transform: scale(400);
  transition: transform .55s cubic-bezier(0.2, 0, 0.4, 1),
              opacity   .55s ease;
}

/* --- Skip hint --- */
.skip-hint {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'JetBrains Mono Variable', monospace;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.2);
  letter-spacing: .12em;
}

/* --- Transition uscita dell'intro --- */
.intro-leave-active {
  transition: opacity .01s;
}
.intro-leave-to {
  opacity: 0;
}
</style>
