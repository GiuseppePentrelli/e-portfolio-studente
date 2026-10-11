<template>
  <!-- Bozza della presentazione, da far approvare a Giuseppe: i fatti vengono dal suo profilo. -->
  <div class="opening">
    <component :is="decorative ? 'p' : 'h2'" :id="headingId" class="opening__title">
      <span class="opening__highlight"><span class="opening__ink">Chi sono</span></span>
    </component>
    <p class="opening__line" style="--starts-at: 0.36">
      Mi chiamo Giuseppe e vengo da Modugno, in provincia di Bari.
    </p>
    <p class="opening__line" style="--starts-at: 0.5">
      Di giorno faccio un tirocinio da <mark>sviluppatore web</mark>; la sera studio informatica
      all'Istituto Marconi, al quinto anno.
    </p>
    <p class="opening__line" style="--starts-at: 0.64">
      Ho fatto il parrucchiere, ma non era la mia strada. Poi ho scoperto <mark>il codice</mark> e
      non l'ho più lasciato.
    </p>
    <p class="opening__line" style="--starts-at: 0.78">
      Mi piace costruire cose nuove e curare le interfacce finché non sono belle da usare.
    </p>
  </div>
</template>

<script setup>
defineProps({
  headingId: { type: String, default: undefined },
  // Copia mostrata sul foglio animato in Copertina: stesso aspetto, nessun titolo nella struttura della pagina.
  decorative: { type: Boolean, default: false },
})
</script>

<style scoped>
/* --write va da 0 a 1 e scrive il foglio come farebbe una penna: prima il titolo, poi un
   capoverso alla volta. Senza --write è già scritto. Le misure sono multipli di --u, cioè
   proporzionali al foglio: il testo va a capo negli stessi punti a ogni schermo. */
.opening {
  --written: var(--write, 1);
  color: var(--ink-strong);
  font-family: var(--font-hand);
}

.opening__title,
.opening__line {
  margin: 0 0 var(--page-line-height);
}

.opening__title {
  --ink: clamp(0, calc(var(--written) / 0.3), 1);
  font-size: calc(var(--u) * 10);
  font-weight: 700;
  line-height: calc(var(--page-line-height) * 2);
}

.opening__line {
  --ink: clamp(0, calc((var(--written) - var(--starts-at, 0)) / 0.2), 1);
  font-size: calc(var(--u) * 4.3);
  line-height: var(--page-line-height);
}

.opening__line:last-child {
  margin-bottom: 0;
}

.opening__ink,
.opening__line {
  clip-path: inset(-0.3em calc((1 - var(--ink)) * 100%) -0.3em -0.4em);
}

.opening__ink {
  display: inline-block;
}

.opening__highlight {
  --passed: clamp(0, calc((var(--written) - 0.24) / 0.14), 1);
  background: linear-gradient(transparent 56%, rgba(var(--hl-giallo), 0.6) 56% 92%, transparent 92%) no-repeat 0 0 /
    calc(var(--passed) * 100%) 100%;
}
</style>
