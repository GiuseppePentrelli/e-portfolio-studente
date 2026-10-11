<template>
  <!-- Il Percorso racconta la persona, non i progetti. Testi in bozza, scritti dai fatti del profilo di
       Giuseppe: ordine delle tappe e parole vanno confermati da lui. -->
  <div class="journey">
    <div class="journey__desk desk-surface">
      <h2 :id="headingId" class="journey__title">Il mio percorso</h2>

      <ol class="journey__steps">
        <li v-for="step in steps" :key="step.title" class="journey__step">
          <span class="journey__tape" aria-hidden="true"></span>
          <NotebookPage class="journey__card">
            <p class="journey__when">{{ step.when }}</p>
            <h3 class="journey__name">{{ step.title }}</h3>
            <p class="journey__text">{{ step.text }}</p>
          </NotebookPage>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import NotebookPage from '@/components/foundations/NotebookPage.vue'

defineProps({
  headingId: { type: String, required: true },
})

const steps = [
  {
    when: 'Prima',
    title: 'Il salone',
    text: 'Ho fatto il parrucchiere. Era un lavoro vero, ma non era la mia strada.',
  },
  {
    when: 'La svolta',
    title: 'Il primo codice',
    text: 'Con il corso full stack di HackAdemy, in Aulab, ho imparato HTML, CSS, JavaScript, PHP e Laravel.',
  },
  {
    when: 'Dal 2023',
    title: 'Di nuovo a scuola',
    text: "Mi sono iscritto al corso serale dell'Istituto Marconi: secondo, terzo e quarto anno, studiando dopo il lavoro.",
  },
  {
    when: 'Oggi · 2026–2027',
    title: 'Quinto anno',
    text: "Faccio un tirocinio da sviluppatore web in Aulab e preparo l'Esame di Stato. Questo quaderno è il mio capolavoro.",
  },
]
</script>

<style scoped>
/* La scrivania prosegue quella della Copertina: scorrendo, lo sguardo si sposta più in basso sullo
   stesso piano, dove i foglietti del percorso sono già appoggiati. */
.journey {
  position: relative;
  z-index: 1;
}

.journey__desk {
  position: relative;
  isolation: isolate;
  width: min(100% - var(--desk-gutter) * 2, var(--desk-width));
  margin-inline: auto;
  padding: var(--space-7) var(--space-4) var(--space-8);
  border-radius: 0 0 var(--desk-radius) var(--desk-radius);
  box-shadow: var(--desk-shadow);

  /* L'ombra è ritagliata in alto perché non cada sulla scrivania della Copertina. */
  clip-path: inset(0 -4rem -4rem);
}

/* Il titolo è un post-it appoggiato sul piano. */
.journey__title {
  width: fit-content;
  margin: 0 auto var(--space-7);
  padding: 1.4rem 1.25rem 1rem;
  color: var(--pen-black);
  font-family: var(--font-hand);
  font-size: clamp(1.75rem, 5vw, 2.25rem);
  line-height: 1.1;
  background:
    linear-gradient(rgb(36 48 58 / 6%) 0 0.9rem, transparent 0.9rem),
    var(--tab-yellow);
  box-shadow: 0 0.5rem 0.75rem -0.375rem rgb(38 50 58 / 35%);
  rotate: -2deg;
}

.journey__steps {
  position: relative;
  display: grid;
  gap: var(--space-7);
  width: min(100%, 58rem);
  margin: 0 auto;
  padding: 0;
  list-style: none;
}

/* Il filo del percorso: una linea a matita tracciata sul banco, da una tappa all'altra. */
.journey__steps::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 50%;
  z-index: -1;
  width: 0.1875rem;
  background: repeating-linear-gradient(to bottom, var(--graphite) 0 0.6rem, transparent 0.6rem 1.05rem);
  opacity: 0.5;
  translate: -50% 0;
  transform-origin: top;
}

.journey__step {
  position: relative;
  width: min(100%, calc(var(--u) * 86));
  rotate: -1.2deg;
}

.journey__step:nth-child(even) {
  justify-self: end;
  rotate: 1.4deg;
}

.journey__tape {
  position: absolute;
  top: calc(var(--u) * -2);
  left: 50%;
  z-index: 1;
  width: calc(var(--u) * 16);
  height: calc(var(--u) * 4.4);
  background: var(--paper-tape);
  box-shadow: 0 0.0625rem 0.125rem var(--shadow-soft);
  translate: -50% 0;
  rotate: -3deg;
}

.journey__card {
  color: var(--ink-strong);
  font-family: var(--font-hand);
}

.journey__when,
.journey__name,
.journey__text {
  margin: 0;
}

.journey__when {
  color: var(--pen-blue);
  font-size: calc(var(--u) * 3.9);
  font-weight: 700;
  line-height: var(--page-line-height);
}

.journey__name {
  font-size: calc(var(--u) * 7.4);
  line-height: calc(var(--page-line-height) * 2);
}

.journey__text {
  font-size: calc(var(--u) * 4.3);
  line-height: var(--page-line-height);
}

@media (max-width: 47.99rem) {
  .journey__steps::before {
    left: calc(var(--u) * 8);
  }

  .journey__step,
  .journey__step:nth-child(even) {
    justify-self: center;
  }
}

/* Dove il browser lo permette, scorrendo il filo viene tracciato e ogni foglietto viene scritto
   a penna quando entra in vista. Altrove, e con movimento ridotto, è tutto già scritto. */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .journey__steps::before {
      animation: journey-draw linear both;
      animation-timeline: view();
      animation-range: entry 20% exit 60%;
    }

    .journey__card > * {
      animation: journey-write linear both;
      animation-timeline: view();
      animation-range: entry 80% cover 38%;
    }
  }
}

@keyframes journey-draw {
  from {
    scale: 1 0;
  }
}

@keyframes journey-write {
  from {
    clip-path: inset(-0.3em 100% -0.3em -0.4em);
  }

  to {
    clip-path: inset(-0.3em -0.4em);
  }
}

/* Con movimento ridotto la scrivania della Copertina non è una scena: questa è un piano a sé. */
@media (prefers-reduced-motion: reduce) {
  .journey__desk {
    margin-top: var(--space-6);
    border-radius: var(--desk-radius);
    clip-path: none;
  }
}
</style>
