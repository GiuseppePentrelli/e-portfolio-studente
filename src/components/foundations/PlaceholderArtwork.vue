<template>
  <!-- L'anteprima di un'opera che non c'è ancora: lo schizzo a matita di un'interfaccia, con la scritta
       "anteprima in arrivo". Riempie la cornice finché il progetto vero non ha la sua immagine. -->
  <svg class="sketch" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect class="sketch__paper" width="320" height="200" />

    <path class="sketch__line" d="M24 22C60 21 200 19 296 21 299 22 300 24 300 27L299 176C299 180 297 181 294 181 200 182 80 183 25 181 22 181 21 179 21 176L22 26C22 24 22 22 24 22Z" />
    <path class="sketch__line" d="M22 40C90 39 220 38 299 39" />
    <circle class="sketch__dot" cx="33" cy="31" r="3" />
    <circle class="sketch__dot" cx="44" cy="31" r="3" />
    <circle class="sketch__dot" cx="55" cy="31" r="3" />

    <path class="sketch__line sketch__line--soft" d="M86 41C87 90 86 140 87 180" />
    <path class="sketch__line sketch__line--soft" d="M33 57H72M33 71H66M33 85H75M33 99H60M33 113H70M33 127H64" />

    <path class="sketch__highlight" d="M104 63C130 62 165 62 198 61" />
    <path class="sketch__line sketch__line--bold" d="M104 60C130 59 160 59 190 58" />
    <path class="sketch__line sketch__line--soft" d="M104 80C150 79 190 80 230 79M104 92C140 92 190 91 222 92M104 104C140 104 180 103 210 103M104 116C150 116 200 115 226 116" />

    <path class="sketch__line" d="M244 92 270 78 284 104 258 124ZM270 78 258 124" />
    <circle class="sketch__node" cx="244" cy="92" r="5.5" />
    <circle class="sketch__node" cx="270" cy="78" r="5.5" />
    <circle class="sketch__node" cx="284" cy="104" r="5.5" />
    <circle class="sketch__node" cx="258" cy="124" r="5.5" />

    <text class="sketch__note" x="104" y="158">anteprima in arrivo</text>
    <path class="sketch__line sketch__line--red" d="M102 165C140 170 190 168 232 161" />
  </svg>
</template>

<style scoped>
.sketch {
  display: block;
  width: 100%;
  height: 100%;
}

.sketch__paper {
  fill: #fbfaf4;
}

.sketch__line,
.sketch__dot,
.sketch__node {
  fill: none;
  stroke: var(--graphite);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.6;
}

.sketch__line--soft {
  stroke-width: 1.2;
  opacity: 0.7;
}

.sketch__line--bold {
  stroke-width: 2.6;
}

.sketch__line--red {
  stroke: var(--pen-red);
  stroke-width: 1.4;
}

.sketch__node {
  fill: #fbfaf4;
}

.sketch__highlight {
  fill: none;
  stroke: var(--highlight-yellow);
  stroke-linecap: round;
  stroke-width: 9;
  opacity: 0.55;
}

.sketch__note {
  fill: var(--pen-red);
  font-family: var(--font-hand);
  font-size: 15px;
}
</style>
