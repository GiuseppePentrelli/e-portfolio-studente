<template>
  <!-- Scritte a matita sul piano, come su un banco di scuola: sbiadite, un po' sbavate, decorative. -->
  <div class="scribbles" aria-hidden="true">
    <svg class="scribble scribble--tris" viewBox="0 0 80 80">
      <path d="M28 6q2 34-1 68M53 5q-2 36 1 70M5 28q36-3 70 1M6 53q34 2 69-1" />
      <path d="M10 10l12 13m0-13L10 23M34 34l12 13m0-13L34 47M60 59l11 12m0-12L60 71" />
      <circle cx="65" cy="16" r="7" />
      <circle cx="16" cy="41" r="7" />
      <circle cx="41" cy="65" r="7" />
      <path class="scribble__faint" d="M4 4l72 72" />
    </svg>

    <svg class="scribble scribble--tally" viewBox="0 0 120 50">
      <path d="M8 8v30M18 7v31M28 8v30M38 7v31M3 32l40-20M56 8v30M66 7v31M76 8v30M86 7v31M51 32l40-20M104 8v30M113 7v31" />
    </svg>

    <svg class="scribble scribble--note" viewBox="0 0 190 44">
      <text x="4" y="20">404</text>
      <text class="scribble__small" x="4" y="38">sonno non trovato</text>
      <path d="M48 12q10-6 20 0t20 0" />
    </svg>

    <svg class="scribble scribble--initials" viewBox="0 0 110 60">
      <text x="6" y="28" transform="rotate(-6 6 28)">G.P.</text>
      <text class="scribble__small" x="10" y="48" transform="rotate(-6 10 48)">2026/27</text>
      <path d="M4 34q30-8 62-6" />
    </svg>

    <svg class="scribble scribble--doodle" viewBox="0 0 110 60">
      <path d="M22 30l4 10 11 1-9 7 3 11-9-6-9 6 3-11-9-7 11-1z" />
      <path d="M70 30q8-10 16-2t-2 16-18-2-2-20 22-10" />
      <path class="scribble__faint" d="M40 12q10 4 20 0" />
    </svg>

    <span class="scribbles__smudge"></span>
  </div>
</template>

<style scoped>
.scribbles {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
  pointer-events: none;
}

.scribble {
  position: absolute;
  overflow: visible;
  fill: none;
  stroke: var(--graphite);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.6;
  opacity: 0.42;
  filter: blur(0.35px);
}

.scribble text {
  fill: var(--graphite);
  stroke: none;
  font-family: var(--font-hand);
  font-size: 18px;
  font-weight: 700;
}

.scribble .scribble__small {
  font-size: 12px;
  font-weight: 400;
}

.scribble__faint {
  opacity: 0.5;
}

.scribble--tris {
  bottom: 21%;
  left: 4.5%;
  width: 4.2rem;
  rotate: -8deg;
}

.scribble--tally {
  top: 5%;
  right: 6.5%;
  width: 6rem;
  rotate: 4deg;
}

.scribble--note {
  bottom: 2.5%;
  left: 28%;
  width: 10rem;
  rotate: -3deg;
}

.scribble--initials {
  top: 52%;
  right: 3.5%;
  width: 5.2rem;
}

.scribble--doodle {
  top: 6%;
  left: 38%;
  width: 6rem;
  rotate: 6deg;
}

/* Una sbavatura di grafite, dove ci è passata sopra la mano. */
.scribbles__smudge {
  position: absolute;
  bottom: 1.5%;
  left: 30%;
  width: 9rem;
  height: 2.6rem;
  background: radial-gradient(ellipse, rgb(74 77 80 / 14%), transparent 70%);
  rotate: -5deg;
}
</style>
