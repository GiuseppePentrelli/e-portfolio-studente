<template>
  <section class="lever-study" aria-labelledby="lever-title">
    <div>
      <p>Unica prova aperta</p>
      <h3 id="lever-title">Leva da banco</h3>
      <p>Il comando passa fisicamente da pronto a eseguito. Non è ancora un componente approvato.</p>
    </div>
    <button class="lever" :class="{ 'is-done': done }" type="button" @click="toggle">
      <span class="lever__track" aria-hidden="true"><span></span></span>
      <span>{{ done ? 'Demo avviata' : 'Avvia la demo' }}</span>
    </button>
    <p class="lever-study__status" aria-live="polite">{{ status }}</p>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const done = ref(false)
const status = ref('')
function toggle() {
  done.value = !done.value
  status.value = done.value ? 'Azione di prova completata.' : 'Leva riportata allo stato iniziale.'
}
</script>

<style scoped>
.lever-study { display: grid; gap: var(--space-5); align-items: center; margin-top: var(--space-7); padding: var(--space-5); background: var(--paper); border: 0.0625rem dashed var(--paper-edge); border-radius: var(--radius-medium); }
.lever-study > div { display: grid; gap: var(--space-2); }
.lever-study > div > p:first-child { color: var(--pen-red); font-family: var(--font-code); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
.lever-study h3 { color: var(--ink-strong); font-family: var(--font-hand); font-size: clamp(1.6rem, 4vw, 2.45rem); }
.lever-study > div > p:last-child { max-width: 58ch; color: var(--ink-soft); }
.lever { display: flex; gap: var(--space-3); align-items: center; justify-self: start; min-height: 4rem; padding: 0.65rem 0.9rem 0.65rem 0.65rem; color: var(--ink-strong); font-family: var(--font-hand); font-size: 1.08rem; font-weight: 700; background: var(--paper-warm); border: 0.08rem solid var(--surface-border-strong); border-radius: 0.35rem 0.55rem 0.42rem 0.48rem; box-shadow: 0 0.45rem 0.9rem var(--shadow-soft); cursor: pointer; transition: transform var(--transition-fast), box-shadow var(--transition-fast); }
.lever:focus-visible { outline: 0.1875rem solid var(--focus); outline-offset: 0.3rem; }
.lever:active { transform: scale(0.97); }
.lever__track { position: relative; flex: 0 0 auto; width: 4.8rem; height: 1.7rem; background: linear-gradient(180deg, #ddd1b8, var(--surface-border)); border: 0.1rem solid var(--ink-strong); border-radius: 0.25rem; box-shadow: inset 0 0.15rem 0.35rem var(--shadow-medium); }
.lever__track::before, .lever__track::after { position: absolute; top: 50%; font-family: var(--font-code); font-size: 0.55rem; translate: 0 -50%; }
.lever__track::before { content: "0"; left: 0.45rem; }
.lever__track::after { content: "1"; right: 0.45rem; }
.lever__track > span { position: absolute; top: 50%; left: 50%; z-index: 1; width: 1rem; height: 2.7rem; background: var(--pen-red); border: 0.1rem solid #73302b; border-radius: 0.2rem; box-shadow: 0 0.3rem 0.55rem var(--shadow-medium); transform: translate(-1.7rem, -58%) rotate(-18deg); transform-origin: 50% 80%; transition: transform var(--duration-short) var(--ease-in-out); }
.lever.is-done .lever__track > span { transform: translate(0.7rem, -58%) rotate(18deg); }
.lever-study__status { min-height: 1.4em; color: var(--ink-description); font-family: var(--font-hand); }
@media (hover: hover) and (pointer: fine) { .lever:hover { transform: translateY(-0.08rem); box-shadow: 0 0.6rem 1rem var(--shadow-medium); } .lever:hover .lever__track > span { transform: translate(-1.55rem, -58%) rotate(-12deg); } .lever.is-done:hover .lever__track > span { transform: translate(0.55rem, -58%) rotate(12deg); } }
@media (min-width: 48rem) { .lever-study { grid-template-columns: minmax(0, 1fr) auto; } .lever-study__status { grid-column: 1 / -1; } }
@media (prefers-reduced-motion: reduce) { .lever, .lever__track > span { transition: none; } .lever:active { transform: none; opacity: 0.76; } }
</style>
