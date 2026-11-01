<template>
  <!-- Omaggio a Itachi: un corvo appollaiato sulla mensola, girato di profilo, nero con i riflessi
       bluastri e l'occhio rosso, che si accende di più al passaggio del mouse. Disegnato da zero.
       Decorativo. Le misure sono in em. -->
  <svg class="raven" viewBox="0 0 60 64" aria-hidden="true">
    <path class="raven__tail" d="M38 40 58 55 55 60 49 57 52 61 46 60 34 47Z" />
    <ellipse class="raven__body" cx="31" cy="39" rx="16" ry="12.5" transform="rotate(-24 31 39)" />
    <path class="raven__wing" d="M22 33C30 27 42 30 48 42 44 44 40 43 37 46 33 45 29 47 26 44 23 42 21 38 22 33Z" />
    <path class="raven__sheen" d="M24 34C30 30 38 31 43 37" />
    <circle class="raven__body" cx="17" cy="21" r="9.5" />
    <path class="raven__beak" d="M9 18 0 23 9.5 25Z" />
    <circle class="raven__eye" cx="15.5" cy="19.5" r="2.4" />
    <circle class="raven__pupil" cx="15" cy="19.4" r="0.9" />
    <path class="raven__feet" d="M27 50 26 63M33 50 34 63M23 63H29M30 63H37" />
  </svg>
</template>

<style scoped>
.raven {
  display: block;
  width: 6.8em;
  height: 7.3em;
  overflow: visible;
  filter: drop-shadow(0.25em 0.3em 0.25em rgb(0 0 0 / 55%));
}

.raven__body,
.raven__tail {
  fill: #121419;
}

.raven__wing {
  fill: #1c2230;
}

.raven__sheen {
  fill: none;
  stroke: rgb(110 140 200 / 45%);
  stroke-linecap: round;
  stroke-width: 1.2;
}

.raven__beak {
  fill: #2a2d33;
}

.raven__eye {
  fill: #d81f26;
  filter: drop-shadow(0 0 1.5px #ff3b3b);
  transition: filter var(--duration-short) var(--ease-out);
}

.raven__pupil {
  fill: #1a0507;
}

.raven__feet {
  fill: none;
  stroke: #3a3f46;
  stroke-linecap: round;
  stroke-width: 1.4;
}

@media (hover: hover) and (pointer: fine) {
  .raven:hover .raven__eye {
    filter: drop-shadow(0 0 2px #ff3b3b) drop-shadow(0 0 5px #ff3b3b);
  }
}
</style>
