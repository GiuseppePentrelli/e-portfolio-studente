<template>
  <!-- Lo zaino è in piedi sul banco e lo si guarda di tre quarti, dall'alto a destra. È un vero
       oggetto 3D: il corpo è una pila di sagome uguali in profondità, così fianco e cima hanno
       spessore. La metà davanti è separata da quella dietro dalla cerniera: scorrendo si apre
       ruotando sul fondo e i libri salgono. -->
  <div class="backpack" aria-hidden="true">
    <span class="backpack__shadow"></span>
    <div class="backpack__stage">
      <div class="backpack__model">
        <div class="backpack__half backpack__half--back">
          <span
            v-for="n in layers"
            :key="n"
            class="backpack__layer"
            :class="{ 'backpack__layer--inside': n === 1 }"
            :style="{ '--z': layers + n - 1 }"
          ></span>
          <span class="backpack__handle"></span>
          <span class="backpack__handle backpack__handle--edge"></span>
        </div>

        <span class="backpack__books">
          <i class="backpack__book backpack__book--networks">
            Sistemi e reti
            <svg class="backpack__cover-art" viewBox="0 0 100 64">
              <path
                class="backpack__network-links"
                d="M18 20 50 12 82 26 66 52 32 46ZM18 20 66 52M50 12 32 46M50 12 66 52"
              />
              <circle cx="18" cy="20" r="5" />
              <circle cx="50" cy="12" r="5" />
              <circle cx="82" cy="26" r="5" />
              <circle cx="66" cy="52" r="5" />
              <circle class="backpack__network-hub" cx="32" cy="46" r="6" />
            </svg>
          </i>
          <!-- In copertina, una mano umana e una robotica quasi si toccano, come nella Creazione di
               Adamo di Michelangelo. Le braccia escono dal bordo, come nell'inquadratura famosa. -->
          <i class="backpack__book backpack__book--computing">
            <svg class="backpack__cover-art" viewBox="0 0 74 100" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="backpack-sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stop-color="#253f6f" />
                  <stop offset="0.45" stop-color="#8eabd0" />
                  <stop offset="1" stop-color="#f1d6b0" />
                </linearGradient>
                <radialGradient id="backpack-spark">
                  <stop offset="0" stop-color="#fffbe8" />
                  <stop offset="0.4" stop-color="#ffe08a" stop-opacity="0.9" />
                  <stop offset="1" stop-color="#ffe08a" stop-opacity="0" />
                </radialGradient>
                <linearGradient id="backpack-gloss" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="#fff" stop-opacity="0.28" />
                  <stop offset="0.4" stop-color="#fff" stop-opacity="0" />
                </linearGradient>
              </defs>
              <rect width="74" height="100" fill="url(#backpack-sky)" />
              <ellipse cx="16" cy="30" rx="18" ry="4" fill="#fff" opacity="0.3" />
              <ellipse cx="58" cy="64" rx="22" ry="6" fill="#fff" opacity="0.35" />
              <g transform="translate(37 44) rotate(-10) scale(0.85) translate(-62.6 -39.4)">
                <g fill="#e7b18b" stroke="#9c6747" stroke-width="0.9" stroke-linejoin="round">
                  <path d="M-30 64C-10 54 12 45 33 40L35 49C14 54-8 62-30 72Z" />
                  <path d="M31 39C35 35 43 34 49 36 52 37 54 39 54 42 53 45 49 47 44 47 39 48 34 48 32 47Z" />
                  <path d="M50 37.5C54 36.8 58 37.2 61.6 38.6 62.7 39 62.5 40.6 61.3 40.6 57.9 40.4 54 40.6 51 41.4Z" />
                  <path d="M51 42C54 42.5 56 44 55.5 46 55 47.5 53 47.4 52 46.2 51 45 49.5 44.6 48.5 44.6Z" />
                  <path d="M47 45C49.5 46 50.5 47.8 49.5 49.2 48.6 50.3 46.8 49.8 46 48.6Z" />
                  <path d="M40 35.5C43 32.5 47 32 49.8 33.4 50.8 34 50.2 35.4 49 35.4 46.6 35.4 44 36 42 37.2Z" />
                </g>
                <g stroke="#4a5560" stroke-width="0.9">
                  <path d="M150 28 90 35V46L150 50Z" fill="#aab6c1" />
                  <path d="M100 34V46.4M112 33.2V47M124 32.4V47.6" fill="none" stroke="#6f7d89" />
                  <path d="M92 41H150" stroke="#4fd1e8" stroke-width="1.1" />
                  <rect x="76" y="34" width="15" height="13" rx="3" fill="#cfd8df" />
                  <rect x="69" y="36.2" width="9" height="3.6" rx="1.8" fill="#dfe6eb" />
                  <rect x="63.4" y="36.6" width="7" height="3.2" rx="1.6" fill="#dfe6eb" />
                  <circle cx="69.6" cy="38" r="1.5" fill="#56636f" />
                  <circle cx="77" cy="38" r="1.6" fill="#56636f" />
                  <path d="M77 41.5H71.5A1.6 1.6 0 0 0 71.5 44.7H77" fill="#c3ccd4" />
                  <path d="M78 44.5H74A1.5 1.5 0 0 0 74 47.5H78" fill="#c3ccd4" />
                  <rect x="78" y="30" width="9" height="3.4" rx="1.7" fill="#dfe6eb" transform="rotate(-28 82 32)" />
                </g>
                <circle cx="62.6" cy="39.4" r="6" fill="url(#backpack-spark)" />
              </g>
              <rect width="74" height="100" fill="url(#backpack-gloss)" />
              <rect width="3.5" height="100" fill="#000" opacity="0.22" />
            </svg>
            <span>Informatica</span>
          </i>
        </span>

        <div class="backpack__half backpack__half--front">
          <span
            v-for="n in layers"
            :key="n"
            class="backpack__layer"
            :class="{ 'backpack__layer--lining': n === layers }"
            :style="{ '--z': n - 1 }"
          ></span>
          <span class="backpack__face"></span>
          <span
            v-for="n in pocketLayers"
            :key="`pocket-${n}`"
            class="backpack__pocket-layer"
            :style="{ '--z': -n }"
          ></span>
          <span class="backpack__pocket"><span class="backpack__pocket-zip"></span></span>
          <span class="backpack__pull backpack__pull--left"></span>
          <span class="backpack__pull backpack__pull--right"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Sagome per ciascuna metà del corpo e per la tasca: più sono, più il fianco è liscio.
const layers = 20
const pocketLayers = 6
</script>

<style scoped>
/* Tutte le misure sono in cqw: lo zaino resta in proporzione a qualsiasi larghezza. La luce arriva
   dall'alto a sinistra, come per gli altri oggetti del banco. */
.backpack {
  --step: 0.7cqw;
  --half: 14cqw;
  --open: -22deg;
  --bag-radius: 46% 46% 17% 17% / 34% 34% 11% 11%;
  --fabric: #2d4867;
  --fabric-side: #1d3249;
  --teeth: #c9d1d7;
  --grain: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  --weave:
    repeating-linear-gradient(45deg, rgb(255 255 255 / 3.5%) 0 0.3cqw, transparent 0.3cqw 0.8cqw),
    repeating-linear-gradient(-45deg, rgb(0 0 0 / 6%) 0 0.3cqw, transparent 0.3cqw 0.8cqw);
  position: relative;
  isolation: isolate;
  container-type: inline-size;
  width: 100%;
  aspect-ratio: 100 / 122;
}

/* L'ombra sul banco cade in basso a destra. */
.backpack__shadow {
  position: absolute;
  right: 0;
  bottom: 4cqw;
  left: 16cqw;
  height: 22cqw;
  background: radial-gradient(ellipse 50% 50% at 52% 50%, rgb(40 28 16 / 48%), rgb(40 28 16 / 18%) 60%, transparent 100%);
}

.backpack__stage {
  position: absolute;
  inset: 0;
  perspective: 170cqw;
  perspective-origin: 40% 20%;
}

.backpack__model {
  position: absolute;
  top: 30cqw;
  left: 12cqw;
  width: 64cqw;
  height: 84cqw;
  transform: rotateX(-17deg) rotateY(-32deg);
  transform-style: preserve-3d;
}

.backpack__half {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
}

/* La metà davanti si apre ruotando sul fondo, lungo la cerniera. */
.backpack__half--front {
  transform: rotateX(var(--open));
  transform-origin: 50% 100% calc(var(--half) * -1);
}

/* Ogni sagoma mostra solo il suo bordo: in alto prende luce, sul fianco destro è in ombra. */
.backpack__layer,
.backpack__face,
.backpack__pocket-layer,
.backpack__pocket {
  position: absolute;
  transform: translateZ(calc(var(--z, 0) * var(--step) * -1));
}

.backpack__layer {
  inset: 0;
  background:
    linear-gradient(to bottom, #557aa1 0 2.5%, transparent 8%),
    linear-gradient(to right, transparent 86%, rgb(6 14 24 / 50%)),
    var(--fabric-side);
  border-radius: var(--bag-radius);
}

/* I due nastri della cerniera: da chiusa sono una riga di dentini lungo cima e fianco; da aperta
   orlano la fodera della metà davanti e l'interno buio di quella dietro. */
.backpack__layer--lining,
.backpack__layer--inside {
  border: 1.2cqw dashed var(--teeth);
}

.backpack__layer--lining {
  background: #141f2b;
}

.backpack__layer--inside {
  background:
    radial-gradient(ellipse 70% 60% at 50% 30%, #23364a, #0a1118 75%),
    #0a1118;
}

/* Il davanti: tessuto con grana, imbottitura che prende luce e cucitura lungo il bordo. */
.backpack__face {
  --z: -0.15;
  inset: 0;
  background:
    var(--grain),
    var(--weave),
    radial-gradient(ellipse 80% 62% at 30% 26%, rgb(150 185 220 / 38%), transparent 70%),
    radial-gradient(ellipse 72% 72% at 46% 48%, transparent 58%, rgb(4 10 18 / 50%) 100%),
    var(--fabric);
  border-radius: var(--bag-radius);
  box-shadow: inset 0 0 0 0.8cqw #1d3249, inset 0.8cqw 0.8cqw 1.4cqw rgb(255 255 255 / 14%);
}

.backpack__face::after {
  content: "";
  position: absolute;
  inset: 2.4cqw;
  border: 0.35cqw dashed rgb(170 198 225 / 34%);
  border-radius: var(--bag-radius);
}

/* La tasca sporge dal davanti con un suo spessore. */
.backpack__pocket-layer,
.backpack__pocket {
  inset: 50% 11% 7%;
  border-radius: 22% 22% 26% 26% / 24% 24% 28% 28%;
}

.backpack__pocket-layer {
  background:
    linear-gradient(to bottom, #5a80a8 0 3%, transparent 10%),
    linear-gradient(to right, transparent 84%, rgb(6 14 24 / 50%)),
    #223a52;
}

.backpack__pocket {
  --z: -6.15;
  background:
    var(--grain),
    var(--weave),
    radial-gradient(ellipse 85% 70% at 32% 24%, rgb(160 195 230 / 34%), transparent 68%),
    radial-gradient(ellipse 70% 70% at 48% 45%, transparent 55%, rgb(4 10 18 / 45%) 100%),
    #31506f;
  box-shadow: inset 0 0 0 0.7cqw #1d3249, inset 0.7cqw 0.8cqw 1.2cqw rgb(255 255 255 / 14%);
}

.backpack__pocket::after {
  content: "";
  position: absolute;
  inset: 2cqw;
  border: 0.3cqw dashed rgb(170 198 225 / 30%);
  border-radius: inherit;
}

.backpack__pocket-zip {
  position: absolute;
  top: 6cqw;
  right: 6cqw;
  left: 6cqw;
  height: 3.4cqw;
  background:
    repeating-linear-gradient(90deg, #d9dfe4 0 0.7cqw, #7d8a95 0.7cqw 1.2cqw) center / 100% 1.5cqw no-repeat,
    #182a3c;
  border-radius: 1.4cqw;
  box-shadow: inset 0 0.4cqw 0.5cqw rgb(0 0 0 / 45%);
}

/* I cursori: metallo lucido con il tiretto di stoffa. */
.backpack__pocket-zip::after,
.backpack__pull {
  content: "";
  position: absolute;
  width: 3.4cqw;
  height: 8cqw;
  background: linear-gradient(90deg, #6f7a83, #f4f6f7 45%, #a7b0b7 60%, #5d666e);
  border-radius: 1.3cqw 1.3cqw 1cqw 1cqw;
  box-shadow: 0.4cqw 0.6cqw 0.6cqw rgb(0 0 0 / 45%);
}

.backpack__pocket-zip::after {
  top: -1.2cqw;
  right: 6cqw;
}

/* I due cursori della cerniera grande stanno in cima, ai lati: si allontanano quando si apre. */
.backpack__pull {
  top: 9cqw;
  transform: translateZ(calc(var(--half) * -1 + 0.4cqw));
}

.backpack__pull--left {
  left: 12cqw;
  rotate: -38deg;
}

.backpack__pull--right {
  right: 12cqw;
  rotate: 38deg;
}

.backpack__pull::after {
  content: "";
  position: absolute;
  top: 82%;
  left: 50%;
  width: 2.8cqw;
  height: 8cqw;
  background: linear-gradient(90deg, #b8741f, #f2b552 45%, #c98422);
  border-radius: 1.4cqw;
  translate: -50% 0;
}

/* La maniglia imbottita, sulla cima della metà dietro. */
.backpack__handle {
  position: absolute;
  top: -11cqw;
  left: 36%;
  width: 28%;
  height: 14cqw;
  border: 3.4cqw solid #2b4764;
  border-bottom: 0;
  border-radius: 12cqw 12cqw 0 0;
  transform: translateZ(-21cqw);
}

.backpack__handle--edge {
  border-color: #172a3c;
  transform: translateZ(-22.2cqw);
}

/* I libri stanno in piedi dentro lo zaino, davanti al fondo. Ognuno ha copertina, taglio delle
   pagine in cima e sul fianco destro; lo spessore finisce prima della cerniera. */
.backpack__books {
  position: absolute;
  top: -16cqw;
  left: 5%;
  width: 90%;
  height: 50cqw;
  transform: translateZ(calc(var(--half) * -1 + 6cqw));
  transform-style: preserve-3d;
}

.backpack__book {
  --t: 5cqw;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 2.4cqw;
  padding: 3.4cqw 2.2cqw;
  color: #fff;
  font-family: var(--font-body);
  font-size: 3.2cqw;
  font-style: normal;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: 0.02em;
  text-align: center;
  text-transform: uppercase;
  background:
    linear-gradient(115deg, rgb(255 255 255 / 24%), transparent 40%),
    linear-gradient(90deg, rgb(0 0 0 / 26%) 0 1.4cqw, transparent 2.4cqw),
    var(--book);
  border-radius: 0.5cqw 1cqw 0.5cqw 0.5cqw;
  transform-style: preserve-3d;
}

.backpack__book::before,
.backpack__book::after {
  content: "";
  position: absolute;
  background: repeating-linear-gradient(var(--edge-direction), #f7f2e6 0 0.35cqw, #d8ceb8 0.35cqw 0.6cqw);
}

.backpack__book::before {
  --edge-direction: 90deg;
  top: 0;
  right: 0;
  left: 0;
  height: var(--t);
  transform: rotateX(-90deg);
  transform-origin: top;
}

.backpack__book::after {
  --edge-direction: 0deg;
  top: 0;
  right: 0;
  bottom: 0;
  width: var(--t);
  transform: rotateY(-90deg);
  transform-origin: right;
}

.backpack__cover-art {
  display: block;
  width: 100%;
  height: auto;
}

/* Informatica ha l'illustrazione a tutta pagina e il titolo sopra il cielo scuro. */
.backpack__book--computing {
  --book: #253f6f;
  left: 0;
  width: 37cqw;
  height: 50cqw;
  font-size: 3.6cqw;
  text-shadow: 0 0.3cqw 0.8cqw rgb(0 0 0 / 45%);
  transform: translateZ(1.5cqw) rotateZ(-4deg);
}

.backpack__book--computing .backpack__cover-art {
  position: absolute;
  inset: 0;
  height: 100%;
  border-radius: inherit;
}

.backpack__book--computing span {
  position: relative;
}

/* Sistemi e reti sta dietro e a destra: titolo e disegno restano nella parte che si vede. */
.backpack__book--networks {
  --book: #3f8d62;
  --t: 4.4cqw;
  left: 28cqw;
  width: 30cqw;
  height: 47cqw;
  padding-left: 9cqw;
  font-size: 2.8cqw;
  transform: translateY(-4cqw) translateZ(-1.5cqw) rotateZ(5deg);
}

.backpack__book--networks .backpack__cover-art {
  margin-top: 2cqw;
  box-shadow: none;
  fill: #f7f2e6;
  stroke: #2b6a47;
  stroke-width: 1.4;
}

.backpack__network-links {
  fill: none;
  stroke: rgb(247 242 230 / 75%);
  stroke-width: 1.6;
}

.backpack__network-hub {
  fill: #f0c24b;
}

/* Dove il browser lo permette, lo zaino si apre seguendo lo scorrimento e i libri salgono. Altrove,
   e con movimento ridotto, è già aperto. */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .backpack {
      view-timeline-name: --backpack;
    }

    .backpack__half--front {
      animation: backpack-open linear both;
      animation-timeline: --backpack;
      animation-range: cover 16vh cover 42vh;
    }

    .backpack__books {
      animation: backpack-books linear both;
      animation-timeline: --backpack;
      animation-range: cover 30vh cover 58vh;
    }
  }
}

@keyframes backpack-open {
  from {
    transform: rotateX(0deg);
  }
}

@keyframes backpack-books {
  from {
    translate: 0 40cqw;
  }
}
</style>
