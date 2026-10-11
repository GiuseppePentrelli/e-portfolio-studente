<template>
  <div
    class="page"
    :class="{
      'page--continues-above': continuesAbove,
      'page--continues-below': continuesBelow,
      'page--torn': tornLeft,
    }"
  >
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
})
</script>

<style scoped>
.page {
  --page-margin: clamp(2.5rem, 9vw, 4rem);
  padding: var(--paper-line-height) clamp(1rem, 4vw, 2rem) calc(var(--paper-line-height) * 2)
    calc(var(--page-margin) + clamp(0.75rem, 3vw, 1.5rem));
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
    100% var(--paper-line-height);
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
      left var(--tear-anchor) / 0.75rem calc(var(--paper-line-height) * 2) repeat-y,
    linear-gradient(#000 0 0) right / calc(100% - 0.75rem + 0.0625rem) 100% no-repeat;
}

.page--torn.page--continues-below {
  --tear-anchor: bottom;
}
</style>
