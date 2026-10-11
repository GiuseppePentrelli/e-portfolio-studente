<template>
  <section class="type-lab" aria-labelledby="type-lab-title">
    <header class="type-lab__heading">
      <p>Fondazione 02 · tipografia</p>
      <h2 id="type-lab-title">Una voce per ogni ambiente</h2>
      <p>L'interfaccia orienta, il quaderno racconta e il terminale mostra il lavoro tecnico.</p>
    </header>

    <div class="type-demo">
      <nav class="type-demo__interface" aria-label="Esempio di navigazione del portfolio">
        <a href="#type-lab-title">Percorso</a>
        <a href="#type-lab-title">Progetti</a>
        <a href="#type-lab-title">Competenze</a>
      </nav>

      <article class="notebook-page">
        <p class="notebook-page__eyebrow">Quarto anno · 2025–2026</p>
        <h3>Ogni progetto lascia una traccia.</h3>
        <p class="notebook-page__lead">
          Un portfolio non è un elenco: è il racconto di come ho imparato a costruire.
        </p>
        <p>
          Dietro ogni risultato ci sono tentativi, domande e decisioni. Voglio mostrare il
          lavoro finito senza nascondere il percorso che lo ha reso possibile.
        </p>

        <blockquote class="notebook-page__quote">
          <p>“Prima capire, poi costruire.”</p>
          <cite>— una regola che voglio portare con me</cite>
        </blockquote>

        <p class="notebook-page__note">
          Nota a margine: anche gli errori fanno parte della storia.
        </p>

        <HandDrawnTerminal
          title="giuseppe@portfolio: ~/progetto"
          command="npm run build"
          output="✓ progetto pronto per essere raccontato"
        />

        <p><HighlighterLink href="#type-lab-title">Scopri il progetto</HighlighterLink></p>
      </article>

      <footer class="type-demo__interface type-demo__legend">
        <p><strong>Interfaccia:</strong> Nunito</p>
        <p><strong>Quaderno:</strong> Excalifont</p>
        <p><strong>Terminale:</strong> Comic Shanns</p>
        <p><strong>Citazioni:</strong> Allura</p>
      </footer>
    </div>
  </section>
</template>

<script setup>
import HandDrawnTerminal from '@/components/foundations/HandDrawnTerminal.vue'
import HighlighterLink from '@/components/primitives/HighlighterLink.vue'
</script>

<style scoped>
.type-lab {
  width: min(100%, var(--content-width));
  margin: var(--space-8) auto 0;
}

.type-lab__heading {
  display: grid;
  gap: var(--space-2);
  margin-bottom: var(--space-5);
  font-family: var(--font-body);
}

.type-lab__heading > p:first-child {
  color: #a1443d;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.type-lab__heading h2 {
  color: var(--ink-strong);
  font-size: clamp(2rem, 5vw, 3.4rem);
  font-weight: 750;
  line-height: 1.08;
}

.type-lab__heading > p:last-child {
  max-width: 62ch;
  color: var(--ink-soft);
}

.type-demo {
  overflow: hidden;
  border: 0.08rem solid rgb(92 82 65 / 35%);
  border-radius: var(--radius-medium);
  box-shadow: 0.35rem 0.45rem 0.8rem rgb(65 48 27 / 11%);
}

.type-demo__interface {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3) var(--space-5);
  align-items: center;
  padding: var(--space-4) clamp(1rem, 4vw, 2.5rem);
  color: #37434c;
  font-family: var(--font-body);
  background: #f1ece3;
}

.type-demo__interface a {
  font-weight: 750;
  text-decoration-thickness: 0.1em;
  text-underline-offset: 0.22em;
}

.type-demo__interface a:focus-visible {
  outline: 0.18rem solid var(--focus);
  outline-offset: 0.22rem;
}

.notebook-page {
  display: grid;
  gap: var(--space-4);
  padding: clamp(1.5rem, 5vw, 3.5rem) clamp(1.25rem, 7vw, 6rem);
  color: var(--ink);
  font-family: var(--font-hand);
  font-size: clamp(1.05rem, 2vw, 1.18rem);
  line-height: 1.68;
  background-color: var(--paper);
  background-image:
    linear-gradient(
      90deg,
      transparent 0 clamp(2.8rem, 8vw, 5.2rem),
      var(--margin-red) clamp(2.8rem, 8vw, 5.2rem) calc(clamp(2.8rem, 8vw, 5.2rem) + 0.08rem),
      transparent calc(clamp(2.8rem, 8vw, 5.2rem) + 0.1rem)
    ),
    repeating-linear-gradient(
      to bottom,
      transparent 0 calc(var(--paper-line-height) - 0.0625rem),
      var(--line-blue) calc(var(--paper-line-height) - 0.0625rem) var(--paper-line-height)
    );
}

.notebook-page__eyebrow {
  width: fit-content;
  padding-inline: 0.2rem;
  color: #91463f;
  font-weight: 700;
  background: linear-gradient(178deg, transparent 38%, rgb(255 228 123 / 68%) 38% 86%, transparent 86%);
}

.notebook-page h3 {
  max-width: 18ch;
  color: var(--ink-strong);
  font-size: clamp(2.1rem, 6vw, 4rem);
  font-weight: 600;
  line-height: 1.02;
}

.notebook-page__lead {
  max-width: 58ch;
  color: #4d5d68;
  font-size: 1.14em;
  font-weight: 650;
}

.notebook-page__quote {
  margin: var(--space-2) 0;
  padding: var(--space-2) 0 var(--space-2) clamp(1rem, 3vw, 2rem);
  border-left: 0.15rem solid #d36a5e;
  color: #3f4e58;
  font-family: var(--font-cursive);
  font-size: clamp(2.15rem, 5vw, 3.4rem);
  line-height: 1.05;
  rotate: -0.45deg;
}

.notebook-page cite {
  display: block;
  margin-top: var(--space-2);
  font-size: 0.62em;
}

.notebook-page__note {
  color: #59636a;
  rotate: -0.55deg;
}

.notebook-page__note::before {
  content: "↳ ";
  color: #a1443d;
}

.notebook-page :deep(.terminal__content),
.notebook-page :deep(.terminal__title) {
  font-family: var(--font-code);
}

.type-demo__legend {
  align-items: baseline;
  color: var(--ink-soft);
  font-size: 0.85rem;
}

@media (max-width: 35rem) {
  .notebook-page {
    background-image: repeating-linear-gradient(
      to bottom,
      transparent 0 calc(var(--paper-line-height) - 0.0625rem),
      var(--line-blue) calc(var(--paper-line-height) - 0.0625rem) var(--paper-line-height)
    );
  }
}
</style>
