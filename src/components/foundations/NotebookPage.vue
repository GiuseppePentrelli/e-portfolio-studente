<template>
  <div
    class="page"
    :class="{
      'page--continues-above': continuesAbove,
      'page--continues-below': continuesBelow,
      'page--torn': tornLeft,
      'page--worn': worn,
    }"
  >
    <span v-if="worn" class="page__wear" :class="{ 'page__wear--flipped': worn === 'flipped' }" aria-hidden="true"></span>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  // Il foglio prosegue in un altro elemento sopra o sotto: il bordo combacia senza stacchi.
  continuesAbove: { type: Boolean, default: false },
  continuesBelow: { type: Boolean, default: false },
  // Bordo sinistro frastagliato, come un foglio strappato dal quaderno.
  tornLeft: { type: Boolean, default: false },
  // Segni d'uso: macchie, un alone di tazza, una piega, la grana della carta. 'flipped' li dispone
  // a specchio, per non avere due fogli identici.
  worn: { type: [Boolean, String], default: false },
})
</script>

<style scoped>
.page {
  /* Margini e passo delle righe arrivano dai token --page-*: sono proporzionali alla larghezza del foglio. */
  padding: var(--page-line-height) var(--page-padding) calc(var(--page-line-height) * 2)
    calc(var(--page-margin) + var(--page-gutter));
  background-color: var(--paper);
  background-image:
    linear-gradient(
      90deg,
      transparent 0 var(--page-margin),
      var(--margin-red) var(--page-margin) calc(var(--page-margin) + 0.0625rem),
      transparent calc(var(--page-margin) + 0.0625rem)
    ),
    linear-gradient(to bottom, transparent calc(100% - 0.0625rem), var(--line-blue) 0);
  background-repeat: no-repeat, repeat-y;
  background-position:
    0 0,
    left top;
  background-size:
    auto,
    100% var(--page-line-height);
  border-radius: 0.35rem 1.1rem 1.1rem 0.35rem;
  box-shadow: 0 0.75rem 1.5rem -0.5rem var(--shadow-paper);
}

.page--continues-above {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.page--continues-below {
  background-position:
    0 0,
    left bottom;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

/* Lo strappo è una maschera che si ripete in verticale; parte dallo stesso lato delle righe,
   così due fogli consecutivi combaciano. La maschera nasconde anche l'ombra del foglio. */
.page--torn {
  --tear-anchor: top;
  mask:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 64' preserveAspectRatio='none'%3E%3Cpath d='M12 0H4l3 5-5 4 4 5-5 6 4 5-2 6 5 5-6 6 4 5-5 6 4 5-1 6h8z'/%3E%3C/svg%3E")
      left var(--tear-anchor) / var(--page-tear) calc(var(--page-line-height) * 2) repeat-y,
    linear-gradient(#000 0 0) right / calc(100% - var(--page-tear) + 0.0625rem) 100% no-repeat;
}

/* I segni d'uso stanno tra lo sfondo e il contenuto. `contain` fa da riferimento per la loro
   posizione senza toccare `position`, che spesso è deciso da chi usa il foglio. */
.page--worn {
  contain: layout;
}

.page__wear {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    /* piega orizzontale: un'ombra sottile e, sotto, il filo di luce */
    linear-gradient(
      to bottom,
      transparent calc(52% - 0.0625rem),
      rgb(57 45 29 / 9%) 52%,
      rgb(255 255 255 / 55%) calc(52% + 0.0625rem),
      transparent calc(52% + 0.1875rem)
    ),
    /* sbavatura di grafite, dove appoggia la mano */
    radial-gradient(ellipse 22% 6% at 62% 71%, rgb(74 77 80 / 11%), transparent 70%),
    radial-gradient(ellipse 9% 3% at 30% 93%, rgb(74 77 80 / 9%), transparent 70%),
    /* carta ingiallita agli angoli */
    radial-gradient(ellipse at 100% 0%, rgb(170 130 70 / 13%), transparent 34%),
    radial-gradient(ellipse at 0% 100%, rgb(150 120 80 / 12%), transparent 38%),
    radial-gradient(ellipse at 12% 10%, var(--paper-stain-warm), transparent 30%),
    /* grana */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .35 0 0 0 0 .28 0 0 0 0 .18 0 0 0 .13 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  border-radius: inherit;
}

/* L'alone di una tazza di caffè: bordo irregolare, più carico da un lato, con qualche goccia.
   In alto a destra, soltanto su un foglio. */
.page__wear::after {
  content: "";
  position: absolute;
  top: calc(var(--u) * 3);
  right: calc(var(--u) * 5);
  width: calc(var(--u) * 22);
  aspect-ratio: 1;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Cfilter id='w' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.035' numOctaves='2' seed='5'/%3E%3CfeDisplacementMap in='SourceGraphic' scale='7'/%3E%3CfeGaussianBlur stdDeviation='0.35'/%3E%3C/filter%3E%3Cg filter='url(%23w)' fill='none' stroke='%236f4a25'%3E%3Ccircle cx='60' cy='60' r='40' fill='%236f4a25' fill-opacity='.06' stroke='none'/%3E%3Ccircle cx='60' cy='60' r='40' stroke-width='3.2' stroke-opacity='.3' stroke-dasharray='190 22 30 9'/%3E%3Ccircle cx='61' cy='59' r='37.5' stroke-width='1' stroke-opacity='.2' stroke-dasharray='60 30 90 71'/%3E%3Ccircle cx='60' cy='60' r='41.8' stroke-width='.8' stroke-opacity='.45' stroke-dasharray='120 143'/%3E%3C/g%3E%3Cg fill='%236f4a25' fill-opacity='.3'%3E%3Ccircle cx='108' cy='84' r='2.2'/%3E%3Ccircle cx='113' cy='92' r='1.1'/%3E%3Ccircle cx='14' cy='30' r='1.4'/%3E%3C/g%3E%3C/svg%3E") center / contain no-repeat;
  rotate: -24deg;
}

.page__wear--flipped {
  scale: -1 -1;
}

/* Sul foglio "a specchio", al posto dell'alone, una zona stropicciata: il rilievo è una piccola immagine di
   carta stropicciata, in grigio, moltiplicata sul foglio e sfumata ai bordi.
   L'elemento è ribaltato: in alto a sinistra qui significa in basso a destra sul foglio. */
.page__wear--flipped::after {
  top: 0;
  right: auto;
  left: 0;
  width: calc(var(--u) * 44);
  background: url("@/assets/images/carta-stropicciata.webp") center / cover no-repeat;
  mix-blend-mode: multiply;
  mask: radial-gradient(ellipse at 30% 30%, #000 12%, transparent 66%);
  opacity: 0.6;
  rotate: none;
}

.page--torn.page--continues-below {
  --tear-anchor: bottom;
}
</style>
