<template>
  <div class="desk-props" aria-hidden="true">
    <span class="desk-props__tape-roll"></span>
    <span class="desk-props__eraser-two"></span>
    <span class="desk-props__pencil"></span>
    <span class="desk-props__pen"></span>
    <span class="desk-props__pen-cap"></span>
    <span class="desk-props__eraser"></span>
    <svg class="desk-props__clip desk-props__clip--one" viewBox="0 0 24 29">
      <defs>
        <linearGradient id="clip-metal-one" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#555b5f" />
          <stop offset="0.28" stop-color="#f7f8f6" />
          <stop offset="0.5" stop-color="#9ba1a4" />
          <stop offset="0.72" stop-color="#eef0ee" />
          <stop offset="1" stop-color="#4f5559" />
        </linearGradient>
      </defs>
      <path class="desk-props__clip-shadow" d="M20.8 12.9 11.6 24.1a5.8 7 0 0 1-8.2-9.9L12.7 3a3.9 4.7 0 0 1 5.6 6.6L9 20.8a2 2.4 0 0 1-2.8-3.4L14.7 7" />
      <path class="desk-props__clip-metal" stroke="url(#clip-metal-one)" d="M20.8 12.9 11.6 24.1a5.8 7 0 0 1-8.2-9.9L12.7 3a3.9 4.7 0 0 1 5.6 6.6L9 20.8a2 2.4 0 0 1-2.8-3.4L14.7 7" />
    </svg>
    <svg class="desk-props__clip desk-props__clip--two" viewBox="0 0 24 29">
      <defs>
        <linearGradient id="clip-metal-two" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#555b5f" />
          <stop offset="0.28" stop-color="#f7f8f6" />
          <stop offset="0.5" stop-color="#9ba1a4" />
          <stop offset="0.72" stop-color="#eef0ee" />
          <stop offset="1" stop-color="#4f5559" />
        </linearGradient>
      </defs>
      <path class="desk-props__clip-shadow" d="M20.8 12.9 11.6 24.1a5.8 7 0 0 1-8.2-9.9L12.7 3a3.9 4.7 0 0 1 5.6 6.6L9 20.8a2 2.4 0 0 1-2.8-3.4L14.7 7" />
      <path class="desk-props__clip-metal" stroke="url(#clip-metal-two)" d="M20.8 12.9 11.6 24.1a5.8 7 0 0 1-8.2-9.9L12.7 3a3.9 4.7 0 0 1 5.6 6.6L9 20.8a2 2.4 0 0 1-2.8-3.4L14.7 7" />
    </svg>
  </div>
</template>

<style scoped>
.desk-props {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.desk-props__tape-roll {
  position: absolute;
  top: 7%;
  left: 2.5%;
  width: clamp(3.8rem, 7vw, 6.2rem);
  aspect-ratio: 1;
  border: clamp(0.65rem, 1.2vw, 1rem) solid rgb(224 197 127 / 82%);
  border-radius: 50%;
  box-shadow: 0.3rem 0.45rem 0.65rem rgb(66 48 29 / 18%), inset 0 0 0 0.1rem rgb(117 86 44 / 18%);
  rotate: -13deg;
}

.desk-props__eraser-two {
  position: absolute;
  right: 2.5%;
  bottom: 5%;
  width: clamp(2rem, 4vw, 3rem);
  height: clamp(5.5rem, 10vw, 8rem);
  border: 0.12rem solid rgb(40 53 62 / 62%);
  border-radius: 0.45rem 0.45rem 0.65rem 0.65rem;
  background: linear-gradient(to bottom, #e2554b 0 22%, #f6efe1 22% 67%, #72b6d0 67%);
  box-shadow:
    0.1rem 0.14rem 0.12rem rgb(52 39 25 / 30%),
    0.38rem 0.52rem 0.75rem rgb(66 48 29 / 18%);
  rotate: 7deg;
}

.desk-props__pencil {
  position: absolute;
  right: 1.5%;
  top: 25%;
  width: clamp(7rem, 14vw, 12rem);
  height: 0.7rem;
  border: 0.075rem solid rgb(50 53 55 / 58%);
  background:
    linear-gradient(
      to right,
      #d84f48 0 4%,
      #eee9df 4% 6.5%,
      transparent 6.5% 86%,
      #e6c58e 86% 96%,
      #454743 96% 100%
    ),
    linear-gradient(
      to bottom,
      #f3c735 0 23%,
      #232729 24% 73%,
      #dca91f 74% 100%
    );
  box-shadow:
    0.07rem 0.1rem 0.08rem rgb(52 39 25 / 28%),
    0.24rem 0.34rem 0.45rem rgb(66 48 29 / 17%),
    inset 0 0.08rem 0.08rem rgb(255 255 255 / 30%),
    inset 0 -0.08rem 0.08rem rgb(94 56 10 / 22%);
  clip-path: polygon(0 12%, 89% 12%, 100% 50%, 89% 88%, 0 88%);
  rotate: 74deg;
}

.desk-props__pencil::after {
  content: "HB 2";
  position: absolute;
  top: 50%;
  left: 58%;
  color: rgb(244 239 215 / 88%);
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: clamp(0.35rem, 0.65vw, 0.52rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1;
  translate: -50% -50%;
}

.desk-props__pen {
  position: absolute;
  top: 3.5%;
  left: 21%;
  width: clamp(8rem, 16vw, 13rem);
  height: clamp(0.62rem, 1.15vw, 0.82rem);
  border: 0.07rem solid rgb(38 61 83 / 58%);
  border-radius: 0.22rem 0.4rem 0.4rem 0.22rem;
  background:
    linear-gradient(to right, #174d9a 0 9%, transparent 9% 88%, #b9c2c6 88% 94%, #263f5d 94%),
    linear-gradient(to bottom, rgb(219 236 241 / 82%) 0 20%, rgb(139 185 204 / 58%) 21% 72%, rgb(236 245 246 / 86%) 73%);
  box-shadow:
    0.07rem 0.1rem 0.08rem rgb(52 39 25 / 27%),
    0.25rem 0.34rem 0.46rem rgb(66 48 29 / 17%),
    inset 0 0.08rem 0.08rem rgb(255 255 255 / 48%);
  clip-path: polygon(0 6%, 91% 6%, 100% 50%, 91% 94%, 0 94%);
  rotate: -7deg;
}

.desk-props__pen::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 9%;
  width: 78%;
  height: 0.13rem;
  border-radius: 999px;
  background: linear-gradient(to right, #174d9a 0 88%, #496d91 89%);
  box-shadow: 0 0.07rem 0 rgb(255 255 255 / 42%);
  translate: 0 -50%;
}

.desk-props__pen::after {
  content: "";
  position: absolute;
  top: 13%;
  left: 2.5%;
  width: 4%;
  height: 74%;
  border-radius: 0.12rem;
  background: rgb(235 244 247 / 45%);
  box-shadow: 0.18rem 0 0 rgb(17 62 132 / 52%);
}

.desk-props__pen-cap {
  position: absolute;
  top: 1.8%;
  left: 12%;
  width: clamp(2.7rem, 5vw, 3.8rem);
  height: clamp(0.76rem, 1.35vw, 1rem);
  rotate: -11deg;
}

.desk-props__pen-cap::before,
.desk-props__pen-cap::after {
  content: "";
  position: absolute;
}

.desk-props__pen-cap::before {
  inset: 0;
  border: 0.07rem solid rgb(18 48 101 / 72%);
  background:
    linear-gradient(to bottom, rgb(255 255 255 / 22%) 0 16%, transparent 17% 66%, rgb(6 33 100 / 25%) 67%),
    #164dac;
  box-shadow:
    0.07rem 0.1rem 0.08rem rgb(52 39 25 / 28%),
    0.22rem 0.3rem 0.4rem rgb(66 48 29 / 16%);
  clip-path: polygon(0 50%, 19% 10%, 95% 17%, 100% 27%, 100% 73%, 95% 83%, 19% 90%);
}

.desk-props__pen-cap::after {
  top: 4%;
  left: 31%;
  width: 59%;
  height: 24%;
  border: 0.08rem solid rgb(9 39 104 / 82%);
  border-left: 0;
  border-radius: 0 0.18rem 0 0;
  background: linear-gradient(to bottom, #2a67c8, #12469e);
  translate: 0 -62%;
}

.desk-props__eraser {
  position: absolute;
  left: 3%;
  bottom: 6%;
  width: clamp(3.2rem, 6vw, 5rem);
  height: clamp(1.5rem, 3vw, 2.2rem);
  border: 0.1rem solid rgb(60 55 51 / 45%);
  border-radius: 0.3rem 0.55rem 0.4rem 0.35rem;
  background: linear-gradient(100deg, #e999ad 0 58%, #ece5d7 59%);
  box-shadow:
    0.08rem 0.12rem 0.1rem rgb(52 39 25 / 29%),
    0.3rem 0.42rem 0.55rem rgb(66 48 29 / 18%);
  rotate: -8deg;
}

.desk-props__clip {
  position: absolute;
  width: 3rem;
  height: 4.15rem;
  overflow: visible;
  filter: drop-shadow(0.13rem 0.22rem 0.12rem rgb(48 38 27 / 38%));
}

.desk-props__clip path {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.desk-props__clip-shadow {
  stroke: rgb(30 35 38 / 72%);
  stroke-width: 2.28;
}

.desk-props__clip-metal {
  stroke-width: 1.58;
}

.desk-props__clip--one {
  top: 38%;
  left: 2.5%;
  rotate: 24deg;
}

.desk-props__clip--two {
  right: 5%;
  bottom: 32%;
  rotate: -31deg;
}

/* Ingresso dai bordi della scrivania: --desk-props-in va da 0 (fuori) a 1 (al proprio posto).
   Ogni oggetto dichiara da dove arriva e con quale ritardo. */
.desk-props > * {
  --enter: clamp(0, calc((var(--desk-props-in, 1) - var(--enter-delay, 0)) / 0.6), 1);
  translate: calc((1 - var(--enter)) * var(--enter-x, 0rem)) calc((1 - var(--enter)) * var(--enter-y, 0rem));
}

.desk-props__tape-roll {
  --enter-x: -14rem;
}

.desk-props__pen {
  --enter-y: -9rem;
  --enter-delay: 0.1;
}

.desk-props__pen-cap {
  --enter-y: -9rem;
  --enter-delay: 0.18;
}

.desk-props__pencil {
  --enter-x: 16rem;
  --enter-delay: 0.14;
}

.desk-props__clip--one {
  --enter-x: -12rem;
  --enter-delay: 0.24;
}

.desk-props__clip--two {
  --enter-x: 14rem;
  --enter-delay: 0.3;
}

.desk-props__eraser {
  --enter-x: -14rem;
  --enter-delay: 0.34;
}

.desk-props__eraser-two {
  --enter-x: 14rem;
  --enter-delay: 0.4;
}

@media (max-width: 39.99rem) {
  .desk-props__eraser-two,
  .desk-props__pencil,
  .desk-props__pen,
  .desk-props__pen-cap,
  .desk-props__clip--two {
    display: none;
  }
}
</style>
