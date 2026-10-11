<template>
  <div class="opening">
    <component :is="decorative ? 'p' : 'h2'" :id="headingId" class="opening__title">
      <span class="opening__highlight"><span class="opening__ink">Chi sono</span></span>
    </component>
    <figure class="opening__figure">
      <span class="opening__tape" aria-hidden="true"></span>
      <img
        src="@/assets/images/dalle-forbici-al-codice.webp"
        :alt="decorative ? '' : illustrationAlt"
        width="720"
        height="658"
        decoding="async"
      />
    </figure>
    <!-- Didascalia provvisoria, ripresa dai biglietti dell'illustrazione. -->
    <p class="opening__line">Da forbici a codice: stessa persona, nuovi orizzonti.</p>
  </div>
</template>

<script setup>
const illustrationAlt =
  'Illustrazione a matita: Giuseppe di spalle, con asciugacapelli e forbici da parrucchiere, guarda in uno specchio che lo riflette alla scrivania da sviluppatore, tra monitor pieni di codice e libri di HTML, CSS e JavaScript. Sui biglietti attaccati allo specchio: «Stessa persona, nuovi orizzonti», «Stessa passione, diversi strumenti», «Da forbici a codice», «Evolvere è sempre una bella idea».'

defineProps({
  headingId: { type: String, default: undefined },
  // Copia mostrata sul foglio animato in Copertina: stesso aspetto, nessun titolo nella struttura della pagina.
  decorative: { type: Boolean, default: false },
})
</script>

<style scoped>
/* --write va da 0 a 1 e compone il blocco: il titolo viene scritto, l'illustrazione viene
   attaccata, poi arriva la didascalia. Senza --write il blocco è già completo. */
.opening {
  --written: var(--write, 1);
  color: var(--ink-strong);
  font-family: var(--font-hand);
}

.opening__title,
.opening__line {
  margin: 0;
}

.opening__title {
  --ink: clamp(0, calc(var(--written) / 0.36), 1);
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: 700;
  line-height: calc(var(--paper-line-height) * 2);
}

.opening__line {
  --ink: clamp(0, calc((var(--written) - 0.74) / 0.26), 1);
  font-size: 1.25rem;
  line-height: var(--paper-line-height);
}

.opening__ink,
.opening__line {
  clip-path: inset(-0.3em calc((1 - var(--ink)) * 100%) -0.3em -0.2em);
}

.opening__ink {
  display: inline-block;
}

.opening__line {
  width: fit-content;
  max-width: 100%;
}

/* Attaccata con lo scotch: scende sulla pagina, si raddrizza e si ferma. */
.opening__figure {
  --placed: clamp(0, calc((var(--written) - 0.4) / 0.3), 1);
  position: relative;
  width: min(100%, 22rem);
  margin: var(--space-2) 0 var(--space-3);
  padding: 0.3rem;
  background: var(--paper-photo);
  box-shadow: 0.125rem 0.25rem 0.5rem -0.125rem var(--shadow-paper);
  opacity: var(--placed);
  transform: translateY(calc((1 - var(--placed)) * -1.25rem)) scale(calc(1.06 - var(--placed) * 0.06))
    rotate(calc(-1.5deg + (1 - var(--placed)) * 5deg));
}

.opening__figure img {
  display: block;
  width: 100%;
  height: auto;
}

.opening__tape {
  position: absolute;
  top: -0.6rem;
  left: 50%;
  width: 4.5rem;
  height: 1.25rem;
  background: var(--paper-tape);
  box-shadow: 0 0.0625rem 0.125rem var(--shadow-soft);
  translate: -50% 0;
  rotate: 3deg;
}

.opening__highlight {
  --passed: clamp(0, calc((var(--written) - 0.3) / 0.14), 1);
  background: linear-gradient(transparent 56%, rgba(var(--hl-giallo), 0.6) 56% 92%, transparent 92%) no-repeat 0 0 /
    calc(var(--passed) * 100%) 100%;
}
</style>
