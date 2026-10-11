<template>
  <figure class="drawing">
    <img
      src="@/assets/images/dalle-forbici-al-codice.webp"
      :alt="decorative ? '' : illustrationAlt"
      width="720"
      height="658"
      decoding="async"
    />
  </figure>
</template>

<script setup>
const illustrationAlt =
  'Illustrazione a matita: Giuseppe di spalle, con asciugacapelli e forbici da parrucchiere, guarda in uno specchio che lo riflette alla scrivania da sviluppatore, tra monitor pieni di codice e libri di HTML, CSS e JavaScript. Sui biglietti attaccati allo specchio: «Stessa persona, nuovi orizzonti», «Stessa passione, diversi strumenti», «Da forbici a codice», «Evolvere è sempre una bella idea».'

defineProps({
  // Copia mostrata sul foglio animato in Copertina: stesso aspetto, nessun testo alternativo.
  decorative: { type: Boolean, default: false },
})
</script>

<style scoped>
/* Un disegno fatto direttamente sulla pagina: niente cornice né scotch, i bordi sfumano a matita
   e le righe del foglio si intravedono sotto. --draw va da 0 a 1 e lo fa comparire come viene
   disegnato, in diagonale dall'angolo in alto a sinistra; senza --draw è già completo. */
.drawing {
  --drawn: var(--draw, 1);
  width: calc(var(--u) * 78);
  margin: calc(var(--u) * 12) 0 0 calc(var(--u) * -3);
  mask: linear-gradient(
    to bottom right,
    #000 calc(var(--drawn) * 125% - 25%),
    transparent calc(var(--drawn) * 125%)
  );
}

.drawing img {
  display: block;
  width: 100%;
  height: auto;
  mix-blend-mode: multiply;

  /* Bordo irregolare e sfumato: una macchia frastagliata e sfocata, stirata sull'immagine. */
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cfilter id='f' x='-30%25' y='-30%25' width='160%25' height='160%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.055' numOctaves='3' seed='11'/%3E%3CfeDisplacementMap in='SourceGraphic' scale='20'/%3E%3CfeGaussianBlur stdDeviation='4.2'/%3E%3C/filter%3E%3Crect x='10' y='11' width='80' height='78' rx='12' filter='url(%23f)'/%3E%3C/svg%3E")
    center / 100% 100% no-repeat;
}
</style>
