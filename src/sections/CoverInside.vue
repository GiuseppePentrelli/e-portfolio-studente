<template>
  <!-- Interno della copertina: come le tabelline stampate nei quaderni di scuola, ma con le scorciatoie
       da tastiera, e una tasca di cartoncino in fondo. Decorativo: si vede solo a quaderno aperto,
       su schermi larghi. -->
  <svg class="inside" viewBox="0 0 448 640" aria-hidden="true">
    <g class="inside__print">
      <text class="inside__title" x="224" y="62">Tavola delle scorciatoie</text>
      <path class="inside__rule inside__rule--bold" d="M44 80h360" />
      <path class="inside__rule" d="M44 85h360" />
      <path class="inside__rule" d="M44 104h360M44 156h360M44 208h360M44 260h360M44 312h360M44 364h360M44 416h360M44 104v312M224 104v312M404 104v312" />
      <rect class="inside__key" x="56" y="112" width="37.6" height="17" rx="3.5" />
      <text class="inside__key-text" x="74.8" y="124.5">Ctrl</text>
      <text class="inside__plus" x="99.6" y="124.5">+</text>
      <rect class="inside__key" x="105.6" y="112" width="18.4" height="17" rx="3.5" />
      <text class="inside__key-text" x="114.8" y="124.5">C</text>
      <text class="inside__meaning" x="56" y="145">copia</text>
      <rect class="inside__key" x="56" y="164" width="37.6" height="17" rx="3.5" />
      <text class="inside__key-text" x="74.8" y="176.5">Ctrl</text>
      <text class="inside__plus" x="99.6" y="176.5">+</text>
      <rect class="inside__key" x="105.6" y="164" width="18.4" height="17" rx="3.5" />
      <text class="inside__key-text" x="114.8" y="176.5">V</text>
      <text class="inside__meaning" x="56" y="197">incolla</text>
      <rect class="inside__key" x="56" y="216" width="37.6" height="17" rx="3.5" />
      <text class="inside__key-text" x="74.8" y="228.5">Ctrl</text>
      <text class="inside__plus" x="99.6" y="228.5">+</text>
      <rect class="inside__key" x="105.6" y="216" width="18.4" height="17" rx="3.5" />
      <text class="inside__key-text" x="114.8" y="228.5">Z</text>
      <text class="inside__meaning" x="56" y="249">annulla</text>
      <rect class="inside__key" x="56" y="268" width="37.6" height="17" rx="3.5" />
      <text class="inside__key-text" x="74.8" y="280.5">Ctrl</text>
      <text class="inside__plus" x="99.6" y="280.5">+</text>
      <rect class="inside__key" x="105.6" y="268" width="18.4" height="17" rx="3.5" />
      <text class="inside__key-text" x="114.8" y="280.5">S</text>
      <text class="inside__meaning" x="56" y="301">salva</text>
      <rect class="inside__key" x="56" y="320" width="37.6" height="17" rx="3.5" />
      <text class="inside__key-text" x="74.8" y="332.5">Ctrl</text>
      <text class="inside__plus" x="99.6" y="332.5">+</text>
      <rect class="inside__key" x="105.6" y="320" width="18.4" height="17" rx="3.5" />
      <text class="inside__key-text" x="114.8" y="332.5">F</text>
      <text class="inside__meaning" x="56" y="353">cerca nella pagina</text>
      <rect class="inside__key" x="56" y="372" width="37.6" height="17" rx="3.5" />
      <text class="inside__key-text" x="74.8" y="384.5">Ctrl</text>
      <text class="inside__plus" x="99.6" y="384.5">+</text>
      <rect class="inside__key" x="105.6" y="372" width="18.4" height="17" rx="3.5" />
      <text class="inside__key-text" x="114.8" y="384.5">A</text>
      <text class="inside__meaning" x="56" y="405">seleziona tutto</text>
      <rect class="inside__key" x="236" y="112" width="24.8" height="17" rx="3.5" />
      <text class="inside__key-text" x="248.4" y="124.5">F5</text>
      <text class="inside__meaning" x="236" y="145">ricarica la pagina</text>
      <rect class="inside__key" x="236" y="164" width="37.6" height="17" rx="3.5" />
      <text class="inside__key-text" x="254.8" y="176.5">Ctrl</text>
      <text class="inside__plus" x="279.6" y="176.5">+</text>
      <rect class="inside__key" x="285.6" y="164" width="44.0" height="17" rx="3.5" />
      <text class="inside__key-text" x="307.6" y="176.5">Shift</text>
      <text class="inside__plus" x="335.6" y="176.5">+</text>
      <rect class="inside__key" x="341.6" y="164" width="18.4" height="17" rx="3.5" />
      <text class="inside__key-text" x="350.8" y="176.5">R</text>
      <text class="inside__meaning" x="236" y="197">ricarica senza cache</text>
      <rect class="inside__key" x="236" y="216" width="31.2" height="17" rx="3.5" />
      <text class="inside__key-text" x="251.6" y="228.5">F12</text>
      <text class="inside__meaning" x="236" y="249">strumenti di sviluppo</text>
      <rect class="inside__key" x="236" y="268" width="37.6" height="17" rx="3.5" />
      <text class="inside__key-text" x="254.8" y="280.5">Ctrl</text>
      <text class="inside__plus" x="279.6" y="280.5">+</text>
      <rect class="inside__key" x="285.6" y="268" width="18.4" height="17" rx="3.5" />
      <text class="inside__key-text" x="294.8" y="280.5">/</text>
      <text class="inside__meaning" x="236" y="301">commenta la riga</text>
      <rect class="inside__key" x="236" y="320" width="31.2" height="17" rx="3.5" />
      <text class="inside__key-text" x="251.6" y="332.5">Alt</text>
      <text class="inside__plus" x="273.2" y="332.5">+</text>
      <rect class="inside__key" x="279.2" y="320" width="31.2" height="17" rx="3.5" />
      <text class="inside__key-text" x="294.8" y="332.5">Tab</text>
      <text class="inside__meaning" x="236" y="353">cambia finestra</text>
      <rect class="inside__key" x="236" y="372" width="37.6" height="17" rx="3.5" />
      <text class="inside__key-text" x="254.8" y="384.5">Ctrl</text>
      <text class="inside__plus" x="279.6" y="384.5">+</text>
      <rect class="inside__key" x="285.6" y="372" width="44.0" height="17" rx="3.5" />
      <text class="inside__key-text" x="307.6" y="384.5">Shift</text>
      <text class="inside__plus" x="335.6" y="384.5">+</text>
      <rect class="inside__key" x="341.6" y="372" width="18.4" height="17" rx="3.5" />
      <text class="inside__key-text" x="350.8" y="384.5">P</text>
      <text class="inside__meaning" x="236" y="405">tutti i comandi dell'editor</text>
    </g>

    <!-- Annotazioni a mano sopra la stampa. -->
    <ellipse class="inside__pen" cx="88" cy="276" rx="42" ry="15" transform="rotate(-5 88 276)" />
    <path class="inside__pencil" d="M138 288q14 6 30 0M138 293q14 5 28 1" />
    <text class="inside__note" x="136" y="284" transform="rotate(-4 136 284)">sempre.</text>

    <!-- Ciò che spunta dalla tasca: un foglio con uno schizzo e due post-it. I testi sono veri
         (cose da fare del progetto, appunti di CSS e di accessibilità) ma non pensati per essere letti. -->
    <path class="inside__slot" d="M16 494L432 444v10L16 504z" />
    <g transform="rotate(6 325 470)">
      <g ref="sheet" class="inside__paper" @pointerenter="sheetSpring.touch" @pointermove="sheetSpring.touch" @pointerleave="sheetSpring.release">
      <rect class="inside__sheet" x="252" y="388" width="150" height="170" />
      <path class="inside__pencil" d="M262 397h130v62H262zM277 410h100v36H277zM293 421h68v14h-68z" />
      <text class="inside__scrap" x="266" y="407">margin</text>
      <text class="inside__scrap" x="281" y="419">padding</text>
      <text class="inside__scrap inside__scrap--center" x="327" y="431.500">content</text>
      </g>
    </g>
    <g transform="rotate(-7 118 440)">
      <g ref="yellow" class="inside__paper" @pointerenter="yellowSpring.touch" @pointermove="yellowSpring.touch" @pointerleave="yellowSpring.release">
      <rect class="inside__postit" x="70" y="386" width="98" height="110" />
      <path class="inside__postit-top" d="M70 386h98v13H70z" />
      <text class="inside__scrap inside__scrap--bold" x="79" y="413">da fare</text>
      <path class="inside__pencil" d="M79 421h7v7h-7zM79 436h7v7h-7zM79 451h7v7h-7zM78 416q14 3 30 0" />
      <text class="inside__scrap" x="91" y="428">Lighthouse 95+</text>
      <text class="inside__scrap" x="91" y="443">backup</text>
      <text class="inside__scrap" x="91" y="458">dormire</text>
      </g>
    </g>
    <g transform="rotate(5 212 452)">
      <g ref="pink" class="inside__paper" @pointerenter="pinkSpring.touch" @pointermove="pinkSpring.touch" @pointerleave="pinkSpring.release">
      <rect class="inside__postit inside__postit--pink" x="172" y="412" width="82" height="96" />
      <path class="inside__postit-top" d="M172 412h82v11h-82z" />
      <text class="inside__scrap inside__scrap--bold" x="181" y="440">WCAG 2.2</text>
      <text class="inside__scrap inside__scrap--red" x="181" y="455">AA, sempre</text>
      <path class="inside__pen" d="M179 459q18 3 40-1" />
      </g>
    </g>

    <path class="inside__pocket" d="M16 502L432 452v162a10 10 0 0 1-10 10H26a10 10 0 0 1-10-10z" />
    <path class="inside__stitch" d="M24 510L424 462" />
    <g class="inside__print inside__print--pocket">
      <text class="inside__imprint" x="224" y="546">80 fogli · rigo 28 px</text>
      <text class="inside__imprint" x="224" y="562">fatto con Vue 3, Vite e CSS nativo</text>
      <path class="inside__rule" d="M44 586h360M44 586v12M53 586v5M62 586v5M71 586v5M80 586v5M89 586v8M98 586v5M107 586v5M116 586v5M125 586v5M134 586v12M143 586v5M152 586v5M161 586v5M170 586v5M179 586v8M188 586v5M197 586v5M206 586v5M215 586v5M224 586v12M233 586v5M242 586v5M251 586v5M260 586v5M269 586v8M278 586v5M287 586v5M296 586v5M305 586v5M314 586v12M323 586v5M332 586v5M341 586v5M350 586v5M359 586v8M368 586v5M377 586v5M386 586v5M395 586v5M404 586v12" />
      <text class="inside__ruler-number" x="44" y="610">0</text>
      <text class="inside__ruler-number" x="134" y="610">1</text>
      <text class="inside__ruler-number" x="224" y="610">2</text>
      <text class="inside__ruler-number" x="314" y="610">3</text>
      <text class="inside__ruler-number" x="404" y="610">4</text>
    </g>
  </svg>
</template>

<script setup>
import { ref, toValue } from 'vue'
import { usePaperSpring } from '@/composables/usePaperSpring'

const props = defineProps({
  // Velocità con cui ruota la copertina: fa ondeggiare i foglietti nella tasca. Numero, ref o funzione.
  drive: { type: [Number, Object, Function], default: 0 },
})

const sheet = ref(null)
const yellow = ref(null)
const pink = ref(null)
const drive = () => toValue(props.drive)
const sheetSpring = usePaperSpring(sheet, { drive })
const yellowSpring = usePaperSpring(yellow, { drive })
const pinkSpring = usePaperSpring(pink, { drive })
</script>

<style scoped>
.inside {
  display: block;
  width: 100%;
  height: 100%;
}

.inside__print {
  fill: var(--cover-label-ink);
  font-family: var(--font-body);
}

.inside__title {
  font-size: 23px;
  font-weight: 900;
  text-anchor: middle;
}

.inside__imprint {
  font-size: 11px;
  font-weight: 600;
  text-anchor: middle;
}

.inside__rule {
  fill: none;
  stroke: var(--cover-label-ink);
  stroke-width: 0.8;
}

.inside__rule--bold {
  stroke-width: 2.4;
}

.inside__key {
  fill: var(--cover-label);
  stroke: var(--cover-label-ink);
  stroke-width: 1;
}

.inside__key-text {
  font-family: var(--font-code);
  font-size: 10.5px;
  text-anchor: middle;
}

.inside__plus {
  font-size: 11px;
  font-weight: 800;
  text-anchor: middle;
}

.inside__meaning {
  font-size: 11.5px;
  font-weight: 600;
}

.inside__ruler-number {
  font-family: var(--font-code);
  font-size: 9px;
  text-anchor: middle;
}

.inside__pen,
.inside__pencil {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.inside__pen {
  stroke: var(--pen-red);
  stroke-width: 1.8;
}

.inside__pencil {
  stroke: var(--graphite);
  stroke-width: 1.4;
}

.inside__note {
  fill: var(--graphite);
  font-family: var(--font-hand);
  font-size: 15px;
}

/* Stampa sul cartoncino della tasca: più scura per restare leggibile. */
.inside__print--pocket {
  fill: var(--pen-black);
}

.inside__print--pocket .inside__rule {
  stroke: var(--pen-black);
}

.inside__scrap {
  fill: var(--graphite);
  font-family: var(--font-hand);
  font-size: 8.5px;
}

.inside__scrap--center {
  text-anchor: middle;
}

.inside__scrap--bold {
  fill: var(--pen-black);
  font-size: 11px;
  font-weight: 700;
}

.inside__scrap--red {
  fill: var(--pen-red);
  font-size: 10px;
}

/* I foglietti sono trattenuti in basso dalla tasca: la parte libera, in alto, si solleva e oscilla,
   e l'ombra sotto si allunga. Il movimento è quello di `usePaperSpring`. */
.inside__paper {
  --lifted: calc(var(--flap, 0) / 24);
  filter: drop-shadow(
    calc(var(--lifted) * 2px) calc(0.5px + var(--lifted) * 6px) calc(0.8px + var(--lifted) * 5px) rgb(57 45 29 / 38%)
  );
  transform: translateY(calc(var(--flap, 0) * -0.24px)) rotate(calc(var(--swing, 0) * 0.9deg));
  transform-origin: 50% 100%;
  transform-box: fill-box;
}

.inside__slot {
  fill: rgb(57 45 29 / 22%);
}

.inside__sheet {
  fill: var(--paper);
  stroke: var(--paper-edge);
  stroke-width: 1;
}

.inside__postit {
  fill: var(--tab-yellow);
}

.inside__postit--pink {
  fill: var(--tab-pink);
}

.inside__postit-top {
  fill: rgb(36 48 58 / 6%);
}

.inside__pocket {
  fill: var(--cover-board);
  stroke: var(--cover-board-edge);
  stroke-width: 1.2;
  filter: drop-shadow(0 -0.0625rem 0.125rem rgb(57 45 29 / 30%));
}

.inside__stitch {
  fill: none;
  stroke: var(--cover-label-ink);
  stroke-dasharray: 5 4;
  stroke-linecap: round;
  stroke-width: 1.1;
}
</style>
