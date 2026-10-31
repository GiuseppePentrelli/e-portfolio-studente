<template>
  <!-- Il portatile è aperto del tutto e appoggiato sul banco: lo si guarda dall'alto, come il resto
       della scrivania. Quello che gli si attacca sopra (un biglietto) arriva dallo slot. -->
  <div
    ref="laptop"
    class="laptop"
    @pointermove="tiltLaptop"
    @pointerleave="resetLaptop"
    @pointercancel="resetLaptop"
  >
    <slot />

    <div class="laptop__lid">
      <span class="laptop__camera" aria-hidden="true"></span>
      <div class="laptop__screen">
        <div class="laptop__tabs" role="group" aria-label="Contenuto dello schermo">
          <button
            type="button"
            :aria-pressed="activeView === 'code'"
            @click="activeView = 'code'"
          >
            index.html
          </button>
          <button
            type="button"
            :aria-pressed="activeView === 'preview'"
            @click="activeView = 'preview'"
          >
            Anteprima
          </button>
        </div>

        <code v-if="activeView === 'code'" class="laptop__editor">
          <span><b>&lt;!DOCTYPE html&gt;</b></span>
          <span>&lt;<strong>html</strong>&gt;</span>
          <span>&nbsp;&nbsp;&lt;<strong>body</strong>&gt;</span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<strong>h1</strong>&gt;Il mio sito&lt;/<strong>h1</strong>&gt;</span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<strong>img</strong> src=<q>foto.jpg</q>&gt;</span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<strong>button</strong>&gt;Clicca!&lt;/<strong>button</strong>&gt;</span>
          <span>&nbsp;&nbsp;&lt;/<strong>body</strong>&gt;</span>
          <span>&lt;/<strong>html</strong>&gt;</span>
        </code>

        <div v-else class="laptop__preview">
          <strong>IL MIO PRIMO SITO</strong>
          <span class="laptop__mountain" aria-hidden="true"></span>
          <p>Benvenuti nella mia pagina web!</p>
          <span class="laptop__fake-button">CLICCA QUI!!!</span>
        </div>
      </div>
      <span class="laptop__mark" aria-hidden="true">hp</span>
    </div>

    <div class="laptop__deck" aria-hidden="true">
      <span class="laptop__speaker"></span>
      <span class="laptop__keyboard">
        <template v-for="(row, rowIndex) in keyRows" :key="rowIndex">
          <i
            v-for="(key, keyIndex) in row"
            :key="keyIndex"
            :class="key.kind && `laptop__key--${key.kind}`"
            :style="{ gridColumn: `span ${key.size}` }"
          >{{ key.label }}</i>
        </template>
      </span>
      <span class="laptop__trackpad"></span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeView = ref('code')
const laptop = ref(null)

// Una tastiera italiana da portatile, in quarti di tasto: ogni fila somma 60 (15 tasti normali).
const keys = (labels, size = 4) => [...labels].map((label) => ({ label, size }))

const keyRows = [
  ['esc', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12', 'ins', 'canc']
    .map((label) => ({ label, size: 4, kind: 'fn' })),
  [...keys("\\1234567890'ì"), { label: '⌫', size: 8 }],
  [{ label: '↹', size: 6 }, ...keys('QWERTYUIOPè+'), { label: 'ù', size: 6 }],
  [{ label: '⇪', size: 7 }, ...keys('ASDFGHJKLòà'), { label: 'invio', size: 9 }],
  [{ label: '⇧', size: 5 }, ...keys('<ZXCVBNM,.-'), { label: '⇧', size: 11 }],
  [
    ...['ctrl', 'fn', '⊞', 'alt'].map((label) => ({ label, size: 4 })),
    { label: '', size: 24 },
    { label: 'alt gr', size: 4 },
    { label: 'ctrl', size: 4 },
    { label: '←', size: 4, kind: 'low' },
    { label: '', size: 4, kind: 'updown' },
    { label: '→', size: 4, kind: 'low' },
  ],
]

function motionAllowed(event) {
  return event.pointerType === 'mouse'
    && window.matchMedia('(hover: hover) and (pointer: fine)').matches
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Il lato sotto il puntatore si abbassa appena, come un oggetto premuto sul banco.
function tiltLaptop(event) {
  if (!motionAllowed(event) || !laptop.value) return

  const bounds = laptop.value.getBoundingClientRect()
  const x = (event.clientX - bounds.left) / bounds.width - 0.5
  const y = (event.clientY - bounds.top) / bounds.height - 0.5

  laptop.value.style.setProperty('--tilt-x', `${-y * 5}deg`)
  laptop.value.style.setProperty('--tilt-y', `${x * 6}deg`)
}

function resetLaptop() {
  laptop.value?.style.removeProperty('--tilt-x')
  laptop.value?.style.removeProperty('--tilt-y')
}
</script>

<style scoped>
/* Tutte le misure sono in cqw: il portatile resta in proporzione a qualsiasi larghezza. */
.laptop {
  --tilt-x: 0deg;
  --tilt-y: 0deg;
  position: relative;
  container-type: inline-size;
  width: 100%;
  transform:
    perspective(70rem)
    rotateX(calc(2deg + var(--tilt-x)))
    rotateY(calc(-2deg + var(--tilt-y)))
    rotateZ(-2deg);
  transition: transform var(--duration-short) var(--ease-out);
}

.laptop__lid,
.laptop__deck {
  position: relative;
  box-shadow: 0.55rem 0.9rem 1.1rem -0.42rem rgb(47 36 24 / 42%);
}

/* Il coperchio, aperto a libro: lo schermo guarda in alto e il bordo lontano dalla cerniera è in cima. */
.laptop__lid {
  padding: 3.4cqw 2.6cqw 5.6cqw;
  background: linear-gradient(170deg, #262b2f, #0f1214 55%, #171b1e);
  border: 0.8cqw solid #c3c8ca;
  border-bottom: 0;
  border-radius: 2.8cqw 2.8cqw 0.4cqw 0.4cqw;
}

.laptop__camera {
  position: absolute;
  top: 1.2cqw;
  left: 50%;
  width: 1cqw;
  height: 1cqw;
  background: #263037;
  border-radius: 50%;
  translate: -50% 0;
  box-shadow: inset 0 0 0 0.2cqw #0b1115;
}

.laptop__mark {
  position: absolute;
  bottom: 1.3cqw;
  left: 50%;
  color: #a5adb1;
  font-family: Arial, sans-serif;
  font-size: 2.8cqw;
  font-style: italic;
  font-weight: 700;
  letter-spacing: -0.08em;
  translate: -50% 0;
}

.laptop__screen {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #1d2227;
  box-shadow: inset 0 0 2cqw rgb(0 0 0 / 34%);
}

.laptop__tabs {
  display: flex;
  align-items: end;
  gap: 0.6cqw;
  padding: 0.8cqw 1cqw 0;
  background: #292f34;
}

.laptop__tabs button {
  min-height: max(1.5rem, 6cqw);
  padding: 0.6cqw 2cqw;
  color: #bfc6ca;
  font-family: var(--font-code);
  font-size: max(0.6rem, 2.6cqw);
  line-height: 1;
  background: #363d43;
  border: 0;
  border-radius: 0.8cqw 0.8cqw 0 0;
  cursor: pointer;
}

.laptop__tabs button[aria-pressed="true"] {
  color: #fff;
  background: #1d2227;
  box-shadow: inset 0 0.4cqw #d6ad48;
}

.laptop__tabs button:focus-visible {
  position: relative;
  z-index: 2;
  outline: 0.13rem solid #f2ca55;
  outline-offset: -0.13rem;
}

/* I numeri di riga sono un contatore: si vedono ma non vengono letti con il codice. */
.laptop__editor {
  display: block;
  padding: 2cqw 1.6cqw;
  overflow: hidden;
  color: #d8dcdf;
  font-family: var(--font-code);
  font-size: 2.9cqw;
  line-height: 1.55;
  counter-reset: line;
}

.laptop__editor span {
  display: block;
  white-space: nowrap;
  counter-increment: line;
}

.laptop__editor span::before {
  content: counter(line);
  display: inline-block;
  width: 3.4cqw;
  margin-right: 2.2cqw;
  color: #747e84;
  text-align: right;
}

.laptop__editor b { color: #9a9fa3; font-weight: 400; }
.laptop__editor strong { color: #75bfea; font-weight: 400; }
.laptop__editor q { color: #d8ba7c; }

.laptop__preview {
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  grid-template-rows: auto 1fr auto;
  gap: 1cqw;
  align-items: center;
  padding: 2.4cqw 3cqw;
  color: #351454;
  font-family: Arial, sans-serif;
  background: #87eee9;
}

.laptop__preview > strong {
  grid-column: 1 / -1;
  color: #e52d64;
  font-size: 4.4cqw;
  line-height: 0.9;
  text-align: center;
  transform: scaleX(1.16);
}

.laptop__mountain {
  grid-row: 2 / 4;
  grid-column: 2;
  width: 100%;
  height: 100%;
  background:
    linear-gradient(145deg, transparent 0 44%, #40a55d 45% 63%, transparent 64%),
    linear-gradient(35deg, #f8ca3c 0 38%, #5597d8 39%);
  border: 0.7cqw solid #fff;
  transform: scaleY(1.12);
}

.laptop__preview p {
  margin: 0;
  font-size: 2.8cqw;
  line-height: 1.1;
  text-align: center;
}

.laptop__fake-button {
  display: block;
  padding: 1.4cqw 1cqw;
  color: #fff;
  font-size: 2.8cqw;
  font-weight: 900;
  text-align: center;
  background: #8b26d2;
  border: 0.6cqw outset #c66ff1;
}

/* La base: alluminio spazzolato, la cerniera sul bordo vicino al coperchio. */
.laptop__deck {
  display: grid;
  justify-items: center;
  gap: 2cqw;
  padding: 3.6cqw 5cqw 4.4cqw;
  background:
    repeating-linear-gradient(90deg, rgb(255 255 255 / 6%) 0 0.25cqw, transparent 0.25cqw 0.8cqw),
    linear-gradient(165deg, #f1f3f2, #cfd4d5 55%, #b4babd);
  border-radius: 0.4cqw 0.4cqw 3.2cqw 3.2cqw;
  box-shadow:
    inset 0 -0.6cqw 0 rgb(80 88 92 / 30%),
    inset 0 0.4cqw 0.6cqw rgb(255 255 255 / 60%),
    0.55rem 0.9rem 1.1rem -0.42rem rgb(47 36 24 / 42%);
}

.laptop__deck::before {
  content: "";
  position: absolute;
  top: -1.1cqw;
  right: 9%;
  left: 9%;
  height: 2.2cqw;
  background: linear-gradient(#2a2f33, #6a7378 50%, #2a2f33);
  border-radius: 1.1cqw;
}

.laptop__speaker {
  width: 72%;
  height: 1.3cqw;
  background: radial-gradient(circle, rgb(78 86 90 / 70%) 0 30%, transparent 36%) 0 0 / 0.9cqw 0.9cqw;
}

.laptop__keyboard {
  display: grid;
  grid-template-columns: repeat(60, minmax(0, 1fr));
  grid-template-rows: 3.2cqw repeat(5, 5.8cqw);
  width: 100%;
  padding: 0.5cqw;
  background: rgb(68 76 80 / 22%);
  border-radius: 1cqw;
  box-shadow: inset 0 0.2cqw 0.4cqw rgb(40 46 50 / 25%);
}

.laptop__keyboard i,
.laptop__key--updown::before,
.laptop__key--updown::after {
  display: grid;
  place-items: center;
  min-width: 0;
  color: rgb(222 227 230 / 82%);
  font-family: var(--font-body);
  font-size: 1.55cqw;
  font-style: normal;
  line-height: 1;
  white-space: nowrap;
  background: linear-gradient(160deg, #30363a, #16191b);
  border-radius: 0.6cqw;
  box-shadow: 0 0.22cqw 0 #0b0d0e, inset 0 0.12cqw 0 rgb(255 255 255 / 12%);
}

.laptop__keyboard i {
  margin: 0.3cqw;
}

.laptop__keyboard .laptop__key--fn {
  font-size: 1.15cqw;
}

.laptop__keyboard .laptop__key--low {
  align-self: end;
  height: 46%;
}

/* Su e giù sono due mezzi tasti impilati fra le frecce laterali. */
.laptop__keyboard .laptop__key--updown {
  grid-template-rows: 1fr 1fr;
  gap: 0.3cqw;
  place-items: stretch;
  background: none;
  box-shadow: none;
}

.laptop__key--updown::before {
  content: "↑";
}

.laptop__key--updown::after {
  content: "↓";
}

.laptop__trackpad {
  width: 40%;
  aspect-ratio: 16 / 9.5;
  background: linear-gradient(165deg, #e9ecec, #c6cbcd);
  border-radius: 1.4cqw;
  box-shadow:
    inset 0 0 0 0.18cqw rgb(110 118 122 / 45%),
    inset 0.3cqw 0.4cqw 0.5cqw rgb(255 255 255 / 55%);
}

@media (prefers-reduced-motion: reduce) {
  .laptop {
    transition: none;
  }
}
</style>
