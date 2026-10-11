<template>
  <section class="palette-lab" aria-labelledby="palette-title">
    <header class="palette-lab__heading">
      <p>Fondazione 03 · colore</p>
      <h2 id="palette-title">Gli inchiostri danno significato</h2>
      <p>Nero, blu, rosso e verde si comportano come penne; carta ed evidenziatori sono materiali separati.</p>
    </header>

    <div class="ink-grid">
      <article v-for="ink in inks" :key="ink.id" class="ink-card" :class="`ink-card--${ink.id}`">
        <span class="ink-card__mark" aria-hidden="true">Aa</span>
        <div>
          <h3>{{ ink.name }}</h3>
          <p>{{ ink.role }}</p>
          <p class="ink-card__value">{{ ink.value }} · contrasto {{ ink.contrast }}:1</p>
        </div>
      </article>
    </div>

    <div class="meaning-demo" aria-label="Esempi del significato dei colori">
      <p class="meaning-demo__info"><span aria-hidden="true">→</span> Apri il caso di studio</p>
      <p class="meaning-demo__warning"><span aria-hidden="true">!</span> Informazione da controllare</p>
      <p class="meaning-demo__success"><span aria-hidden="true">✓</span> Verifica completata</p>
    </div>

    <div class="material-strip">
      <h3>Materiali, non nuovi inchiostri</h3>
      <ul>
        <li class="material-strip__paper">Carta crema</li>
        <li class="material-strip__yellow">Evidenziatore giallo</li>
        <li class="material-strip__blue">Evidenziatore azzurro</li>
        <li class="material-strip__pink">Post-it rosa</li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const inks = [
  { id: 'black', name: 'Nero grafite', role: 'Testo principale e disegni.', value: '#24303A', contrast: '13,22' },
  { id: 'blue', name: 'Blu', role: 'Link, azioni e informazioni.', value: '#155C83', contrast: '7,13' },
  { id: 'red', name: 'Rosso', role: 'Correzioni, avvisi e attenzione.', value: '#A1443D', contrast: '6,04' },
  { id: 'green', name: 'Verde', role: 'Conferme e risultati riusciti.', value: '#2F6F3E', contrast: '5,95' },
]
</script>

<style scoped>
.palette-lab {
  width: min(100%, var(--content-width));
  margin: var(--space-8) auto 0;
}

.palette-lab__heading {
  display: grid;
  gap: var(--space-2);
  margin-bottom: var(--space-5);
}

.palette-lab__heading > p:first-child {
  color: var(--pen-red);
  font-family: var(--font-code);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.palette-lab__heading h2 {
  color: var(--pen-black);
  font-family: var(--font-hand);
  font-size: clamp(2rem, 5vw, 3.4rem);
  line-height: 1.08;
}

.palette-lab__heading > p:last-child {
  max-width: 68ch;
  color: var(--ink-soft);
}

.ink-grid {
  display: grid;
  gap: var(--space-4);
}

.ink-card {
  display: grid;
  grid-template-columns: 4.5rem 1fr;
  gap: var(--space-4);
  align-items: center;
  padding: var(--space-4);
  color: var(--sample-ink);
  background: var(--paper);
  border: 0.08rem solid var(--paper-edge);
  border-radius: var(--radius-medium);
}

.ink-card--black { --sample-ink: var(--pen-black); }
.ink-card--blue { --sample-ink: var(--pen-blue); }
.ink-card--red { --sample-ink: var(--pen-red); }
.ink-card--green { --sample-ink: var(--pen-green); }

.ink-card__mark {
  display: grid;
  width: 4.5rem;
  aspect-ratio: 1;
  place-items: center;
  font-family: var(--font-hand);
  font-size: 1.75rem;
  background: color-mix(in srgb, var(--sample-ink) 10%, var(--paper));
  border: 0.14rem solid currentcolor;
  border-radius: 52% 46% 49% 55%;
  rotate: -1deg;
}

.ink-card h3 {
  font-family: var(--font-hand);
  font-size: 1.35rem;
}

.ink-card__value {
  margin-top: var(--space-1);
  font-family: var(--font-code);
  font-size: 0.75rem;
}

.meaning-demo {
  display: grid;
  gap: var(--space-3);
  margin-top: var(--space-5);
  padding: var(--space-5);
  font-family: var(--font-hand);
  font-size: 1.1rem;
  background: var(--paper);
  border: 0.08rem solid var(--paper-edge);
}

.meaning-demo p {
  display: flex;
  gap: var(--space-3);
  align-items: baseline;
}

.meaning-demo span {
  display: inline-grid;
  min-width: 1.5rem;
  place-items: center;
  font-weight: 700;
}

.meaning-demo__info { color: var(--pen-blue); }
.meaning-demo__warning { color: var(--pen-red); }
.meaning-demo__success { color: var(--pen-green); }

.material-strip {
  margin-top: var(--space-5);
  padding: var(--space-5);
  color: var(--pen-black);
  background: #f1ece3;
  border-radius: var(--radius-medium);
}

.material-strip h3 {
  margin-bottom: var(--space-3);
  font-family: var(--font-hand);
  font-size: 1.3rem;
}

.material-strip ul {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  padding: 0;
  list-style: none;
}

.material-strip li {
  padding: 0.45rem 0.7rem;
  border: 0.06rem solid rgb(36 48 58 / 18%);
}

.material-strip__paper { background: var(--paper); }
.material-strip__yellow { background: var(--highlight-yellow); }
.material-strip__blue { background: var(--highlight-blue); }
.material-strip__pink { background: var(--highlight-pink); }

@media (min-width: 48rem) {
  .ink-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
