<template>
  <!-- Omaggio ai labirinti a puntini: una scia di puntini luminosi, con qualche puntino più grande, e
       una paperella in pixel art (la stessa della mensola) che la mangia. Quanta ne ha mangiata lo
       dice --trail-eat, da 0 a 1, che chi la usa anima: i puntini a sinistra della paperella sono
       spariti. Disegnata da zero, senza il personaggio originale. Decorativa. Le misure sono in em. -->
  <div class="trail" aria-hidden="true">
    <span class="trail__dots"></span>
    <svg class="trail__duck" viewBox="0 0 12 10" shape-rendering="crispEdges">
      <path class="trail__yellow" d="M6 0h3v1H6zM5 1h5v3H5zM6 4h3v1H6zM1 5h9v1H1zM0 6h10v2H0zM1 8h8v1H1z" />
      <path class="trail__wing" d="M3 6h4v2H3z" />
      <path class="trail__beak" d="M10 2h2v2h-2zM10 4h1v1h-1z" />
      <path class="trail__eye" d="M8 2h1v1H8z" />
      <path class="trail__shade" d="M2 9h6v1H2z" />
    </svg>
  </div>
</template>

<style scoped>
@property --trail-eat { syntax: "<number>"; inherits: true; initial-value: 0; }

.trail {
  position: relative;
  height: 2.2em;
  font-size: 1rem;
}

/* I puntini: piccoli ogni 1,6em e, ogni dieci, uno più grande. Quelli a sinistra della paperella
   sono stati mangiati. */
.trail__dots {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle, #fff2c4 0 0.42em, transparent 0.5em) 0.8em 50% / 16em 100% repeat-x,
    radial-gradient(circle, #ffe9a8 0 0.16em, transparent 0.22em) 0 50% / 1.6em 100% repeat-x;
  filter: drop-shadow(0 0 0.3em rgb(255 214 120 / 70%));
  clip-path: inset(0 0 0 calc(var(--trail-eat) * (100% - 2.6em) + 1.4em));
}

.trail__duck {
  position: absolute;
  top: 50%;
  left: calc(var(--trail-eat) * (100% - 2.6em));
  width: 2.6em;
  height: 2.2em;
  translate: 0 -55%;
  filter: drop-shadow(0 0 0.35em rgb(255 214 80 / 55%));
}

.trail__yellow {
  fill: #f5c518;
}

.trail__wing {
  fill: #e0a90f;
}

.trail__beak {
  fill: #f08a24;
}

.trail__eye {
  fill: #1b1b1b;
}

.trail__shade {
  fill: #b9860a;
}
</style>
