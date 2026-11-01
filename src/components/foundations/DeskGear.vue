<template>
  <!-- Gli oggetti sul piano della scrivania, decorativi: il tappetino con la tastiera e il mouse,
       stesi sul piano e quindi visti in prospettiva, e una lattina in piedi. Le misure sono in em:
       cambiando font-size si ridimensionano tutti insieme. -->
  <div class="gear" aria-hidden="true">
    <span class="gear__pad">
      <span class="gear__keyboard"><i></i></span>
      <span class="gear__mouse"></span>
    </span>
    <span class="gear__can"></span>
  </div>
</template>

<style scoped>
.gear {
  display: flex;
  gap: 1.2em;
  align-items: flex-end;
  font-size: 1rem;
}

/* Il tappetino è steso sul piano: ruota all'indietro attorno al bordo davanti, e la prospettiva lo
   restringe verso il fondo. Tastiera e mouse stanno sopra e lo seguono. */
.gear__pad {
  display: flex;
  gap: 1.4em;
  align-items: center;
  padding: 1em 1.4em;
  background: #121519;
  border-radius: 0.5em;
  box-shadow: 0 0 0 0.12em #1d2227;
  transform: perspective(40em) rotateX(56deg);
  transform-origin: 50% 100%;
}

/* La tastiera: la luce arcobaleno passa negli spazi fra i tasti, che sono scuri. */
.gear__keyboard {
  position: relative;
  width: 22em;
  height: 6.4em;
  padding: 0.45em;
  background: #1d2125;
  border-radius: 0.4em;
  box-shadow:
    0 0 0.8em rgb(54 214 255 / 45%),
    0 0 1.6em rgb(214 79 255 / 25%);
}

.gear__keyboard::before {
  content: "";
  position: absolute;
  inset: -0.15em;
  z-index: -1;
  background: linear-gradient(90deg, #36d6ff, #8b5cff, #ff4fb8, #ffb547, #5dff9b);
  border-radius: 0.5em;
  filter: blur(0.25em);
  opacity: 0.8;
}

/* I tasti sono uno strato scuro ritagliato da due maschere a righe: resta solo dove tutte e due lo
   lasciano, e fra un tasto e l'altro si vede la luce. */
.gear__keyboard i {
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #4cc9f0, #9d7bff, #ff7ac6, #ffc46b, #7dffb2);
  border-radius: 0.2em;
}

.gear__keyboard i::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(#30363c, #1f2327);
  mask:
    repeating-linear-gradient(90deg, #000 0 1.2em, transparent 1.2em 1.38em),
    repeating-linear-gradient(#000 0 0.92em, transparent 0.92em 1.1em);
  mask-composite: intersect;
}

.gear__mouse {
  position: relative;
  width: 2.6em;
  height: 4.2em;
  background: radial-gradient(ellipse at 35% 25%, #4a5056, #1d2125 60%);
  border-radius: 48% 48% 46% 46% / 40% 40% 60% 60%;
}

.gear__mouse::after {
  content: "";
  position: absolute;
  top: 0.6em;
  left: 50%;
  width: 0.25em;
  height: 0.9em;
  background: #ff4fb8;
  border-radius: 0.2em;
  box-shadow: 0 0 0.4em #ff4fb8;
  translate: -50% 0;
}

/* La lattina in piedi: il cilindro, il coperchio ellittico visto dall'alto e l'ombra sul piano. */
.gear__can {
  position: relative;
  flex: none;
  width: 2.6em;
  height: 4.6em;
  margin-bottom: 0.4em;
  background:
    linear-gradient(90deg, rgb(0 0 0 / 35%), transparent 30%, rgb(255 255 255 / 35%) 45%, transparent 60%, rgb(0 0 0 / 35%)),
    linear-gradient(transparent 22%, #c6ff3d 22% 70%, transparent 70%),
    #1f2a1a;
  border-radius: 0.35em 0.35em 0.5em 0.5em / 0.35em 0.35em 0.6em 0.6em;
  box-shadow: 0.5em 0.35em 0.5em rgb(0 0 0 / 55%);
}

.gear__can::before {
  content: "";
  position: absolute;
  inset: -0.3em 0 auto;
  height: 0.7em;
  background: radial-gradient(ellipse at 50% 40%, #f3f5f6, #9aa3a8 70%);
  border-radius: 50%;
}
</style>
