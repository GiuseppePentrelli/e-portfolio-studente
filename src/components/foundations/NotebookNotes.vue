<template>
  <!-- Pagina di appunti decorativa: testi presi dalla nota "Vue 3 — Composition API" della DevBase,
       ridisegnati a penna e matita. Non è pensata per essere letta. -->
  <svg class="notes" viewBox="0 0 480 640" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <filter id="notes-hand" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7" />
        <feDisplacementMap in="SourceGraphic" scale="3.2" />
      </filter>
    </defs>

    <g class="notes__marker" filter="url(#notes-hand)">
      <path class="notes__hl notes__hl--yellow" d="M86 44l236-4 2 22-238 3z" />
      <path class="notes__hl notes__hl--green" d="M86 142l152-2 1 15-153 2z" />
      <path class="notes__hl notes__hl--green" d="M98 280l146-2 1 27-147 2z" />
      <path class="notes__hl notes__hl--pink" d="M98 434l146-2 1 27-147 2z" />
      <path class="notes__hl notes__hl--blue" d="M86 584l168-3 1 17-169 2z" />
      <path class="notes__hl notes__hl--orange" d="M256 300l120-2 1 13-121 2z" />
    </g>

    <g class="notes__pencil" filter="url(#notes-hand)">
      <path d="M88 70q30 5 58-1t60 2 58-2 62 1" />
      <rect x="98" y="180" width="146" height="28" rx="4" />
      <rect x="98" y="230" width="146" height="28" rx="4" />
      <rect x="98" y="280" width="146" height="28" rx="4" />
      <rect class="notes__dashed" x="98" y="332" width="146" height="28" rx="13" />
      <rect x="98" y="382" width="146" height="28" rx="4" />
      <rect x="98" y="432" width="146" height="28" rx="4" />
      <path d="M171 208v20m-4-6l4 6 4-6M171 258v20m-4-6l4 6 4-6M171 308v22m-4-6l4 6 4-6M171 360v20m-4-6l4 6 4-6M171 410v20m-4-6l4 6 4-6" />
      <path d="M98 396q-22-2-21-26t20-24m-7-4l7 4-5 7" />
      <path d="M246 244h8M246 294h8M246 446h8" />
      <path d="M86 524h196M86 544h196M86 564h196M170 508v60" />
      <path d="M392 196q10-12 20-2t-2 20-24-2-2-28 30-12 28 20-18 34" />
      <path d="M408 548l5 13 14 1-11 9 4 14-12-8-12 8 4-14-11-9 14-1z" />
      <path d="M376 388l26-10 26 10v30l-26 10-26-10zM376 388l26 10 26-10M402 398v30" />
      <path d="M380 394l18 7M380 402l18 7M380 410l18 7M380 418l14 5" />
      <path d="M300 590q26-4 54 2" />
      <path d="M88 604q40 4 82 0t82 1M90 609q40 3 80 0" />
      <path d="M430 96q8 20-2 40m-6-8l6 8 7-7" />
    </g>

    <g class="notes__red" filter="url(#notes-hand)">
      <ellipse cx="362" cy="124" rx="48" ry="19" transform="rotate(-6 362 124)" />
      <path d="M252 128l10 10m0-10l-10 10" />
    </g>
    <path class="notes__green" filter="url(#notes-hand)" d="M246 149l5 6 10-13" />

    <g class="notes__text">
      <text class="notes__title" x="92" y="60" transform="rotate(-1 92 60)">Vue 3 — Composition API</text>
      <text x="88" y="96">reattività = Vue traccia i dati</text>
      <text x="88" y="114">e aggiorna il DOM da solo</text>
      <text x="88" y="136">let, const → non li traccia</text>
      <text x="88" y="154">ref, reactive → li traccia</text>

      <text class="notes__node" x="171" y="199">setup()</text>
      <text class="notes__node" x="171" y="249">onBeforeMount</text>
      <text class="notes__node" x="171" y="299">onMounted</text>
      <text class="notes__node" x="171" y="351">[stato cambia]</text>
      <text class="notes__node" x="171" y="401">onUpdated</text>
      <text class="notes__node" x="171" y="451">onUnmounted</text>

      <text class="notes__small" x="258" y="248">il DOM non esiste ancora</text>
      <text class="notes__small notes__text--blue" x="258" y="294">il DOM esiste →</text>
      <text class="notes__small notes__text--blue" x="258" y="310">fetch iniziale</text>
      <text class="notes__small notes__text--red" x="258" y="444">pulisci listener,</text>
      <text class="notes__small notes__text--red" x="258" y="460">timer, websocket</text>

      <text class="notes__small" x="322" y="98" transform="rotate(-4 322 98)">in JS sempre</text>
      <text class="notes__text--red notes__bold" x="330" y="130" transform="rotate(-6 330 130)">.value !</text>
      <text class="notes__small" x="322" y="160" transform="rotate(-3 322 160)">nel template no</text>

      <text class="notes__bold" x="88" y="502">watch o watchEffect</text>
      <text class="notes__question" x="296" y="512" transform="rotate(12 296 512)">?</text>
      <text class="notes__question notes__question--small" x="330" y="494" transform="rotate(-9 330 494)">?</text>
      <text class="notes__small" x="90" y="538">watch</text>
      <text class="notes__small" x="176" y="538">lazy, valore vecchio sì</text>
      <text class="notes__small" x="90" y="558">watchEffect</text>
      <text class="notes__small" x="176" y="558">parte subito</text>

      <text class="notes__text--blue notes__bold" x="90" y="597">usa ref per quasi tutto</text>
      <text class="notes__small" x="302" y="594">reactive</text>
    </g>
  </svg>
</template>

<style scoped>
.notes {
  display: block;
  width: 100%;
  height: 100%;
}

.notes__hl--yellow {
  fill: rgba(var(--hl-giallo), 0.5);
}

.notes__hl--green {
  fill: rgba(var(--hl-verde), 0.55);
}

.notes__hl--pink {
  fill: rgba(var(--hl-rosa), 0.45);
}

.notes__hl--blue {
  fill: rgba(var(--hl-azzurro), 0.45);
}

.notes__hl--orange {
  fill: rgba(var(--hl-arancio), 0.45);
}

.notes__pencil,
.notes__red,
.notes__green {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.notes__pencil {
  stroke: var(--graphite);
  stroke-width: 1.5;
  opacity: 0.82;
}

.notes__dashed {
  stroke-dasharray: 5 4;
}

.notes__red {
  stroke: var(--pen-red);
  stroke-width: 1.8;
}

.notes__green {
  stroke: var(--pen-green);
  stroke-width: 2.2;
}

.notes__text {
  fill: var(--pen-black);
  font-family: var(--font-hand);
  font-size: 13px;
}

.notes__title {
  font-size: 21px;
  font-weight: 700;
}

.notes__node {
  font-size: 13.5px;
  text-anchor: middle;
}

.notes__small {
  fill: var(--graphite);
  font-size: 11px;
}

.notes__bold {
  font-size: 15px;
  font-weight: 700;
}

.notes__text--blue {
  fill: var(--pen-blue);
}

.notes__text--red {
  fill: var(--pen-red);
}

.notes__question {
  fill: var(--graphite);
  font-size: 46px;
  opacity: 0.8;
}

.notes__question--small {
  font-size: 24px;
}
</style>
