<template>
  <article class="sample">
    <header class="sample__header">
      <p class="sample__eyebrow">appunto 01 · superficie</p>
      <h2>Le idee lasciano <mark>tracce</mark>.</h2>
      <p class="sample__lead">
        Questo contenuto è identico in ogni variante: cambiano soltanto il foglio e ciò che lo circonda.
      </p>
    </header>

    <div class="sample__body">
      <div class="sample__copy">
        <p>
          Il portfolio racconta un percorso costruito tra scuola, lavoro e curiosità. Le imperfezioni
          della carta non nascondono il contenuto: mostrano il processo che lo ha fatto crescere.
        </p>
        <p class="sample__note">Nota a matita: prima capire, poi costruire.</p>
        <button class="sample__button" type="button" @click="showDemoFeedback">
          Prova l’azione <span aria-hidden="true">↗</span>
        </button>
        <p class="sample__feedback" role="status" aria-live="polite">{{ demoFeedback }}</p>
      </div>

      <figure class="sample__portrait">
        <span class="sample__tape" aria-hidden="true"></span>
        <PaperPortrait />
        <figcaption>Ritratto provvisorio · da sostituire con una foto reale</figcaption>
      </figure>
    </div>

    <section class="sample__identity" aria-labelledby="identity-image-title">
      <div>
        <h3 id="identity-image-title">Il cambiamento che ho scelto</h3>
        <p>Non racconta due passioni: racconta il passaggio da un lavoro che non sentivo mio allo sviluppo web, la direzione che ho scelto.</p>
      </div>
      <TornIdentityPortrait />
    </section>

    <HandDrawnTerminal
      command="npm run build"
      output="✓ portfolio pronto per essere raccontato"
    />
  </article>
</template>

<script setup>
import { ref } from 'vue'
import HandDrawnTerminal from './HandDrawnTerminal.vue'
import PaperPortrait from './PaperPortrait.vue'
import TornIdentityPortrait from './TornIdentityPortrait.vue'

const demoFeedback = ref('')

function showDemoFeedback() {
  demoFeedback.value = 'Esempio attivato: nel portfolio definitivo questo comando aprirà un progetto.'
}
</script>

<style scoped>
.sample {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  width: 100%;
  min-width: 0;
  max-width: 100%;
  gap: var(--space-6);
  color: var(--ink);
}

.sample__header {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  min-width: 0;
  gap: var(--space-3);
}

.sample__eyebrow,
.sample__note,
figcaption {
  font-family: var(--font-hand);
}

.sample__eyebrow {
  color: var(--pen-red);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h2 {
  min-width: 0;
  max-width: 13ch;
  color: var(--ink-strong);
  font-family: var(--font-hand);
  font-size: clamp(2rem, 7vw, 4rem);
  font-weight: 600;
  line-height: 1.02;
  overflow-wrap: anywhere;
}

.sample__lead {
  max-width: 58ch;
  color: var(--ink-soft);
  font-size: clamp(1rem, 2vw, 1.18rem);
}

.sample__body {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  min-width: 0;
  gap: var(--space-6);
  align-items: center;
}

.sample__copy {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  min-width: 0;
  gap: var(--space-4);
}

.sample__note {
  width: auto;
  max-width: 100%;
  color: var(--ink-description);
  font-size: 0.93rem;
  rotate: -1deg;
  overflow-wrap: anywhere;
}

.sample__note::before {
  content: "↳ ";
  color: var(--pen-red);
}

.sample__button {
  position: relative;
  width: fit-content;
  min-height: 2.75rem;
  padding: 0.65rem 1rem;
  border: 0.13rem solid var(--ink-strong);
  border-radius: 48% 45% 43% 52% / 12% 18% 13% 16%;
  background: var(--highlight-blue);
  box-shadow: 0.16rem 0.18rem 0 var(--ink-strong);
  font-family: var(--font-hand);
  font-weight: 700;
  transition: transform var(--transition-fast);
}

.sample__feedback {
  min-height: 1.5em;
  color: var(--ink-soft);
  font-size: 0.82rem;
}

.sample__button:active {
  transform: scale(0.97) translateY(0.08rem);
}

.sample__portrait {
  position: relative;
  justify-self: center;
  width: min(100%, 19rem);
  padding: var(--space-2);
  background: var(--paper-photo);
  box-shadow: 0 0.7rem 1.4rem var(--shadow-paper);
  rotate: 1.5deg;
}

.sample__identity {
  display: grid;
  gap: var(--space-4);
  padding-top: var(--space-5);
  border-top: 0.0625rem dashed var(--paper-edge);
}

.sample__identity > div {
  display: grid;
  gap: var(--space-2);
}

.sample__identity h3 {
  color: var(--ink-strong);
  font-family: var(--font-hand);
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  line-height: 1.1;
}

.sample__identity p {
  max-width: 62ch;
  color: var(--ink-soft);
}

@media (prefers-reduced-motion: reduce) {
  .sample__button {
    transition: background-color var(--duration-micro) linear;
  }

  .sample__button:active {
    transform: none;
    background-color: var(--paper-warm);
  }
}

.sample__tape {
  position: absolute;
  top: -0.45rem;
  left: 50%;
  z-index: 1;
  width: 4.6rem;
  height: 1.35rem;
  translate: -50%;
  rotate: -3deg;
  background:
    repeating-linear-gradient(90deg, transparent 0 0.35rem, var(--paper-tape-fiber) 0.36rem 0.38rem),
    var(--paper-tape);
  clip-path: polygon(2% 8%, 98% 0, 96% 94%, 0 100%);
}

figcaption {
  padding: var(--space-2) var(--space-2) var(--space-1);
  color: var(--ink-soft);
  font-size: 0.72rem;
  text-align: center;
}

@media (min-width: 48rem) {
  .sample__body {
    grid-template-columns: minmax(0, 1fr) minmax(14rem, 0.72fr);
  }
}
</style>
