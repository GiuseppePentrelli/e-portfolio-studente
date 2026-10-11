<template>
  <!-- Adesivi decorativi fustellati: bordo bianco, cucitura tratteggiata, giallo e nero. -->
  <svg class="sticker sticker--tag" viewBox="0 0 72 72" aria-hidden="true">
    <circle class="sticker__cut" cx="36" cy="36" r="34" />
    <circle class="sticker__stitch" cx="36" cy="36" r="30" />
    <circle class="sticker__black" cx="36" cy="36" r="25" />
    <path class="sticker__line sticker__line--yellow" d="M27 27l-9 9 9 9M45 27l9 9-9 9M40 23l-8 26" />
  </svg>

  <!-- La pagina spoglia (HTML) dice la frase all'evidenziatore (CSS) che la sta colorando. -->
  <svg class="sticker sticker--talk" viewBox="0 0 170 130" aria-hidden="true">
    <!-- Sagoma dell'adesivo: fumetto, i due personaggi e le braccia che li uniscono.
         Disegnata tre volte: bordo bianco, fascia tratteggiata, copertura che ne lascia solo il filo esterno. -->
    <defs>
      <g id="sticker-talk-shape">
        <path d="M30 16h110a11 11 0 0 1 11 11v16a11 11 0 0 1-11 11H30a11 11 0 0 1-11-11V27a11 11 0 0 1 11-11z" />
        <rect x="37" y="50" width="28" height="68" rx="9" />
        <rect x="97" y="52" width="42" height="66" rx="7" />
        <rect x="58" y="48" width="46" height="44" rx="7" />
      </g>
    </defs>
    <use class="sticker__die" href="#sticker-talk-shape" />
    <use class="sticker__die-stitch" href="#sticker-talk-shape" />
    <use class="sticker__die-cover" href="#sticker-talk-shape" />

    <path class="sticker__cut sticker__outlined" d="M30 16h110a11 11 0 0 1 11 11v16a11 11 0 0 1-11 11h-13l-4 10-7-10H30a11 11 0 0 1-11-11V27a11 11 0 0 1 11-11z" />
    <text class="sticker__text" x="85" y="32" text-anchor="middle">You're the CSS</text>
    <text class="sticker__text" x="80" y="46" text-anchor="middle">of my HTML</text>
    <path class="sticker__heart" d="M121 39.500c1.600-2.400 5.200-.600 3.600 2.200l-3.600 4.300-3.600-4.300c-1.600-2.800 2-4.600 3.600-2.200z" />

    <path class="sticker__limb" d="M45 104v12h-4M57 104v12h4M64 91l17-7M108 111v6h-4M128 111v6h4M98 89l-17-5" />

    <g transform="translate(0 6)">
    <path class="sticker__yellow sticker__outlined" d="M45 57h12l-2-9-7 3z" />
    <rect class="sticker__black" x="43" y="56" width="16" height="10" rx="2" />
    <rect class="sticker__yellow sticker__outlined" x="38" y="64" width="26" height="41" rx="7" />
    <path class="sticker__shine" d="M43 70v12" />
    <circle class="sticker__black" cx="47" cy="83" r="2.500" />
    <circle class="sticker__black" cx="57" cy="83" r="2.500" />
    <circle class="sticker__eye sticker__eye--light" cx="47.800" cy="82.200" r="0.800" />
    <circle class="sticker__eye sticker__eye--light" cx="57.800" cy="82.200" r="0.800" />
    <path class="sticker__smile" d="M49 89q3 3 6 0" />
    <ellipse class="sticker__cheek" cx="43" cy="88.500" rx="2.500" ry="1.700" />
    <ellipse class="sticker__cheek" cx="61" cy="88.500" rx="2.500" ry="1.700" />
    </g>

    <rect class="sticker__cut sticker__outlined" x="98" y="66" width="40" height="45" rx="5" />
    <path class="sticker__rule" d="M98 75h40" />
    <circle class="sticker__black" cx="103.500" cy="70.500" r="1.300" />
    <circle class="sticker__black" cx="108" cy="70.500" r="1.300" />
    <circle class="sticker__black" cx="112.500" cy="70.500" r="1.300" />
    <path class="sticker__swipe" d="M104 100l26-2" />
    <path class="sticker__wire" d="M104 100h28M104 105h18" />
    <circle class="sticker__black" cx="112" cy="85" r="2.500" />
    <circle class="sticker__black" cx="124" cy="85" r="2.500" />
    <circle class="sticker__eye sticker__eye--light" cx="112.800" cy="84.200" r="0.800" />
    <circle class="sticker__eye sticker__eye--light" cx="124.800" cy="84.200" r="0.800" />
    <path class="sticker__smile" d="M115 91q3 3.500 6 0" />
    <ellipse class="sticker__cheek" cx="106.500" cy="90.500" rx="2.500" ry="1.700" />
    <ellipse class="sticker__cheek" cx="129.500" cy="90.500" rx="2.500" ry="1.700" />
  </svg>

  <!-- Due tasti veri, con lato e faccia superiore: uno regge una gomma, l'altro il simbolo del riavvolgimento. -->
  <svg class="sticker sticker--keys" viewBox="0 0 196 132" aria-hidden="true">
    <rect class="sticker__cut sticker__cut--outline" x="14" y="12" width="168" height="108" rx="18" />
    <rect class="sticker__stitch" x="14" y="12" width="168" height="108" rx="18" />
    <text class="sticker__text sticker__text--title" x="98" y="37" text-anchor="middle">Life has no</text>

    <path
      class="sticker__limb"
      d="M54 102v10h-4M74 102v10h4M38 80l-10-9M90 80l5 8M122 102v10h-4M142 102v10h4M158 80l10-9M106 80l-5 8"
    />

    <g transform="rotate(-28 24 64)">
      <rect class="sticker__eraser sticker__outlined" x="13" y="58" width="22" height="12" rx="3" />
      <path class="sticker__cut" d="M27 59h5a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-5z" />
      <rect class="sticker__eraser-edge" x="13" y="58" width="22" height="12" rx="3" />
    </g>

    <circle class="sticker__black" cx="173" cy="63" r="10.500" />
    <path class="sticker__yellow" d="M173 58.500v9l-7-4.500zM180 58.500v9l-7-4.500z" />

    <rect class="sticker__key-side sticker__key-side--yellow sticker__outlined" x="38" y="48" width="52" height="55" rx="10" />
    <rect class="sticker__yellow" x="43" y="51" width="42" height="40" rx="7" />
    <path class="sticker__shine" d="M48 56h20" />
    <text class="sticker__text sticker__text--small" x="48" y="66">ctrl</text>
    <circle class="sticker__black" cx="57" cy="76" r="2.700" />
    <circle class="sticker__black" cx="71" cy="76" r="2.700" />
    <circle class="sticker__eye sticker__eye--light" cx="57.900" cy="75.100" r="0.900" />
    <circle class="sticker__eye sticker__eye--light" cx="71.900" cy="75.100" r="0.900" />
    <path class="sticker__smile" d="M60 82q4 4 8 0" />
    <ellipse class="sticker__cheek" cx="50.500" cy="81" rx="3" ry="2" />
    <ellipse class="sticker__cheek" cx="77.500" cy="81" rx="3" ry="2" />

    <rect class="sticker__key-side sticker__outlined" x="106" y="48" width="52" height="55" rx="10" />
    <rect class="sticker__black" x="111" y="51" width="42" height="40" rx="7" />
    <path class="sticker__shine sticker__shine--dark" d="M116 56h20" />
    <text class="sticker__text sticker__text--yellow" x="116" y="68">Z</text>
    <circle class="sticker__eye sticker__eye--light" cx="125" cy="77" r="3.100" />
    <circle class="sticker__eye sticker__eye--light" cx="139" cy="77" r="3.100" />
    <circle class="sticker__black" cx="125.800" cy="77.300" r="1.500" />
    <circle class="sticker__black" cx="139.800" cy="77.300" r="1.500" />
    <path class="sticker__smile sticker__smile--yellow" d="M128 84q4 3.500 8 0" />
    <ellipse class="sticker__cheek" cx="118.500" cy="82" rx="3" ry="2" />
    <ellipse class="sticker__cheek" cx="145.500" cy="82" rx="3" ry="2" />
  </svg>
</template>

<style scoped>
.sticker {
  position: absolute;
  height: auto;
  overflow: visible;
  filter: drop-shadow(0.0625rem 0.125rem 0.09rem rgb(48 38 27 / 38%));
}

.sticker--tag {
  top: 3.5%;
  left: calc(var(--spine-width) - 6.5%);
  width: 13%;
  rotate: -12deg;
}

.sticker--talk {
  bottom: 2.5%;
  left: calc(var(--spine-width) + 6%);
  width: 29%;
  rotate: -6deg;
}

.sticker--keys {
  right: 10%;
  bottom: 2.5%;
  width: 31%;
  rotate: 5deg;
}

.sticker__cut {
  fill: #fff;
}

/* Il bordo fustellato è lo stesso profilo dell'adesivo, ingrossato da un tratto bianco. */
.sticker__cut--outline {
  stroke: #fff;
  stroke-linejoin: round;
  stroke-width: 14;
}

/* Adesivo sagomato: il filo tratteggiato segue il profilo a distanza costante. */
.sticker__die {
  fill: #fff;
  stroke: #fff;
  stroke-linejoin: round;
  stroke-width: 17;
}

.sticker__die-stitch {
  fill: none;
  stroke: var(--pen-black);
  stroke-dasharray: 4 3;
  stroke-linejoin: round;
  stroke-width: 11.5;
}

.sticker__die-cover {
  fill: #fff;
  stroke: #fff;
  stroke-linejoin: round;
  stroke-width: 9.3;
}

.sticker__stitch {
  fill: none;
  stroke: var(--pen-black);
  stroke-dasharray: 4 3;
  stroke-linecap: round;
  stroke-width: 1.1;
}

.sticker__black {
  fill: var(--pen-black);
}

.sticker__yellow {
  fill: var(--highlight-yellow);
}

.sticker__outlined {
  stroke: var(--pen-black);
  stroke-linejoin: round;
  stroke-width: 2;
}

.sticker__key-side {
  fill: #0f161b;
}

.sticker__key-side--yellow {
  fill: #c9a700;
}

.sticker__line {
  fill: none;
  stroke: var(--pen-black);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 5.5;
}

.sticker__line--yellow {
  stroke: var(--highlight-yellow);
  stroke-width: 4.5;
}

.sticker__limb {
  fill: none;
  stroke: var(--pen-black);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2.6;
}

.sticker__eye--light {
  fill: #fff;
}

.sticker__smile {
  fill: none;
  stroke: var(--pen-black);
  stroke-linecap: round;
  stroke-width: 1.8;
}

.sticker__smile--yellow {
  stroke: var(--highlight-yellow);
}

.sticker__cheek {
  fill: var(--highlight-pink);
}

.sticker__eraser {
  fill: #e999ad;
}

.sticker__eraser-edge {
  fill: none;
  stroke: var(--pen-black);
  stroke-width: 2;
}

.sticker__rule {
  fill: none;
  stroke: var(--pen-black);
  stroke-width: 1.6;
}

.sticker__wire {
  fill: none;
  stroke: var(--ink-soft);
  stroke-linecap: round;
  stroke-width: 2;
}

.sticker__swipe {
  fill: none;
  stroke: var(--highlight-yellow);
  stroke-linecap: round;
  stroke-width: 7;
}

.sticker__heart {
  fill: var(--pen-red);
}

.sticker__shine {
  fill: none;
  stroke: rgb(255 255 255 / 55%);
  stroke-linecap: round;
  stroke-width: 2;
}

.sticker__shine--dark {
  stroke: rgb(255 255 255 / 16%);
}

.sticker__text {
  fill: var(--pen-black);
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 900;
}

.sticker__text--small {
  font-size: 8.5px;
}

.sticker__text--title {
  font-size: 19px;
}

.sticker__text--yellow {
  fill: var(--highlight-yellow);
}
</style>
