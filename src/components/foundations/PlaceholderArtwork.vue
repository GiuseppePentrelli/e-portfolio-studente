<template>
  <!-- L'anteprima di un'opera che non c'è ancora: lo schizzo a matita di quello che sarà, con la
       scritta "anteprima in arrivo". `kind` sceglie lo schizzo: un sito, un gioco o un'app. Riempie
       la cornice finché il progetto vero non ha la sua immagine; con proporzioni diverse resta intero
       e la carta fa da sfondo. -->
  <svg class="sketch" viewBox="0 0 320 200" aria-hidden="true">
    <rect class="sketch__paper" width="320" height="200" />

    <g v-if="kind === 'site'">
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
    </g>

    <g v-else-if="kind === 'game'">
      <path class="sketch__line sketch__line--soft" d="M38 52C36 42 50 38 56 44 60 34 76 36 76 46 86 44 88 56 78 58 64 60 48 60 38 52ZM214 40C213 32 224 29 229 34 232 27 245 28 245 36 253 35 254 45 246 46 235 47 222 47 214 40Z" />
      <path class="sketch__line" d="M14 160C80 159 180 161 306 159" />
      <path class="sketch__line sketch__line--soft" d="M30 160V176M62 160V176M94 160V176M126 160V176M158 160V176M190 160V176M222 160V176M254 160V176M286 160V176" />
      <path class="sketch__line" d="M64 118C84 117 104 118 122 117 123 122 123 127 122 131 104 132 84 131 64 132 63 127 63 122 64 118ZM180 92C200 91 222 92 244 91 245 96 245 101 244 105 222 106 200 105 180 106 179 101 179 96 180 92Z" />
      <circle class="sketch__coin" cx="82" cy="102" r="5" />
      <circle class="sketch__coin" cx="102" cy="100" r="5" />
      <circle class="sketch__coin" cx="200" cy="76" r="5" />
      <circle class="sketch__coin" cx="222" cy="74" r="5" />
      <circle class="sketch__node" cx="150" cy="128" r="9" />
      <path class="sketch__line" d="M150 137V148M150 148 143 159M150 148 157 159M150 141 141 136M150 141 160 135" />
      <path class="sketch__line" d="M282 159V94M282 96C292 99 300 103 306 108 298 111 290 113 282 116" />
      <text class="sketch__note" x="24" y="88">anteprima in arrivo</text>
      <path class="sketch__line sketch__line--red" d="M22 95C56 99 100 98 140 92" />
    </g>

    <g v-else>
      <path class="sketch__line" d="M176 14C196 13 214 13 230 14 237 14 240 18 240 25L239 176C239 183 236 186 229 186 212 187 194 187 177 186 170 186 167 183 167 176L168 24C168 18 170 14 176 14Z" />
      <path class="sketch__line sketch__line--soft" d="M194 22C200 22 207 22 213 22" />
      <path class="sketch__highlight" d="M178 43C192 42 206 42 220 41" />
      <path class="sketch__line sketch__line--bold" d="M178 40C190 39 202 39 214 38" />
      <path class="sketch__line" d="M178 56C196 55 214 55 230 56 231 64 231 72 230 80 214 81 196 81 178 80 177 72 177 64 178 56ZM178 90C196 89 214 89 230 90 231 98 231 106 230 114 214 115 196 115 178 114 177 106 177 98 178 90ZM178 124C196 123 214 123 230 124 231 132 231 140 230 148 214 149 196 149 178 148 177 140 177 132 178 124Z" />
      <path class="sketch__line sketch__line--soft" d="M184 66H214M184 72H206M184 100H218M184 106H200M184 134H212M184 140H204" />
      <path class="sketch__line sketch__line--soft" d="M168 162C190 161 216 161 239 162" />
      <circle class="sketch__dot" cx="184" cy="173" r="3" />
      <circle class="sketch__dot" cx="203" cy="173" r="3" />
      <circle class="sketch__dot" cx="222" cy="173" r="3" />
      <text class="sketch__note" x="22" y="92">anteprima</text>
      <text class="sketch__note" x="22" y="112">in arrivo</text>
      <path class="sketch__line sketch__line--red" d="M96 106C116 108 136 104 156 96M148 90 157 96 150 104" />
    </g>
  </svg>
</template>

<script setup>
defineProps({
  kind: {
    type: String,
    default: 'site',
    validator: value => ['site', 'game', 'app'].includes(value),
  },
})
</script>

<style scoped>
.sketch {
  display: block;
  width: 100%;
  height: 100%;
  background: #fbfaf4;
}

.sketch__paper {
  fill: #fbfaf4;
}

.sketch__line,
.sketch__dot,
.sketch__node,
.sketch__coin {
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

.sketch__coin {
  fill: rgb(255 213 0 / 45%);
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
