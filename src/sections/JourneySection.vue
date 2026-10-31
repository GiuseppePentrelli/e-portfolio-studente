<template>
  <!-- Il Percorso racconta la persona, non i progetti. Testi in bozza, scritti dai fatti del profilo di
       Giuseppe: ordine delle tappe e parole vanno confermati da lui. -->
  <div class="journey">
    <div class="journey__desk desk-surface">
      <DeskDoodles />

      <!-- Titolo su adesivo fustellato: la sola matita in movimento resta quella del percorso. -->
      <h2 :id="headingId" class="journey__title">Il mio percorso</h2>

      <ol class="journey__steps">
        <svg class="journey__route journey__route--wide" viewBox="0 0 1000 2240" preserveAspectRatio="none" aria-hidden="true">
          <path class="journey__route-shadow" d="M500 20C510 100 560 110 550 168S400 420 480 600 700 980 580 1200 420 1756 430 1856 520 2080 498 2206" />
          <path class="journey__route-line" d="M500 20C510 100 560 110 550 168S400 420 480 600 700 980 580 1200 420 1756 430 1856 520 2080 498 2206" />
        </svg>
        <svg class="journey__route journey__route--narrow" viewBox="0 0 120 2336" preserveAspectRatio="none" aria-hidden="true">
          <path class="journey__route-shadow" d="M64 20C66 80 58 130 62.4 176S84 300 74 380 44 470 62.4 544 86 760 76 860 44 1040 62.4 1136 84 1380 72 1490 46 1700 62.4 1824 80 2040 70 2140 56 2250 60 2306" />
          <path class="journey__route-line" d="M64 20C66 80 58 130 62.4 176S84 300 74 380 44 470 62.4 544 86 760 76 860 44 1040 62.4 1136 84 1380 72 1490 46 1700 62.4 1824 80 2040 70 2140 56 2250 60 2306" />
        </svg>

        <!-- La matita che traccia il filo: sta sempre sulla punta della linea. -->
        <li class="journey__pencil" aria-hidden="true"><span></span></li>

        <li class="journey__step">
          <img
            class="journey__salon-tools"
            src="@/assets/images/salon-tools-3d.webp"
            alt=""
            width="560"
            height="467"
            loading="lazy"
            decoding="async"
          />
          <span class="journey__dot" aria-hidden="true">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" /></svg>
          </span>
          <span class="journey__link" aria-hidden="true"></span>
          <article class="journey__card journey__salon-scene">
            <div class="journey__planner-window" aria-hidden="true">
              <div class="journey__planner">
                <span class="journey__planner-rings">
                  <i v-for="ring in 10" :key="ring"></i>
                </span>
                <div class="journey__planner-heading">
                  <strong>Agenda del salone</strong>
                  <span>Settimana</span>
                </div>
                <div class="journey__planner-week">
                  <div><b>Lun</b><span>09:00 Taglio</span><span>11:30 Piega</span><span>16:00 Colore</span></div>
                  <div><b>Mar</b><span>10:00 Barba</span><span>12:00 Taglio</span><span>17:30 Piega</span></div>
                  <div><b>Mer</b><span>09:30 Colore</span><span>14:00 Taglio</span><span>18:00 Piega</span></div>
                  <div><b>Gio</b><span>10:30 Piega</span><span>15:00 Barba</span><span>17:00 Taglio</span></div>
                  <div><b>Ven</b><span>09:00 Colore</span><span>13:00 Piega</span><span>16:30 Taglio</span></div>
                  <div><b>Sab</b><span>08:30 Taglio</span><span>11:00 Piega</span><span>15:30 ______</span></div>
                </div>
              </div>
            </div>
            <div class="journey__salon-note">
              <span class="journey__paperclip" aria-hidden="true"></span>
              <p class="journey__when">Prima</p>
              <h3 class="journey__name">Il salone</h3>
              <p class="journey__text">Ho fatto il parrucchiere. Era un lavoro vero, ma non era la mia strada.</p>
            </div>
          </article>
        </li>

        <li class="journey__step">
          <span class="journey__dot" aria-hidden="true">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" /></svg>
          </span>
          <span class="journey__link" aria-hidden="true"></span>
          <article class="journey__card journey__code-scene">
            <span class="journey__mouse" aria-hidden="true">
              <svg class="journey__mouse-cord" viewBox="0 0 140 220">
                <path d="M60 220C60 192 70 172 92 166C114 160 124 132 108 116C92 100 66 108 70 132C74 156 60 172 40 168S10 150-10 150" />
              </svg>
            </span>
            <InteractiveLaptop class="journey__laptop">
              <div class="journey__code-note">
                <p class="journey__when">La svolta</p>
                <h3 class="journey__name">Il primo codice</h3>
                <p class="journey__text">
                  Il mio primo sito l'ho scritto su un HP nuovo di zecca: sproporzionato, confuso,
                  bellissimo perché era mio.
                </p>
              </div>
            </InteractiveLaptop>
          </article>
        </li>

        <li class="journey__step">
          <span class="journey__dot" aria-hidden="true">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" /></svg>
          </span>
          <span class="journey__link" aria-hidden="true"></span>
          <article class="journey__card journey__school-scene">
            <SchoolBackpack class="journey__backpack" />
            <span class="journey__bottle" aria-hidden="true"></span>
            <div class="journey__school-note">
              <div class="journey__binder-sheet">
                <p class="journey__when">Dal 2023</p>
                <h3 class="journey__name">Di nuovo a scuola</h3>
                <p class="journey__text">
                  Mi sono iscritto al corso serale dell'Istituto Marconi: secondo, terzo e quarto anno,
                  studiando dopo il lavoro.
                </p>
                <p class="journey__years" role="img" aria-label="Secondo, terzo e quarto anno conclusi">
                  <span v-for="year in ['2°', '3°', '4°']" :key="year">
                    {{ year }}
                    <svg class="journey__tick" viewBox="0 0 24 24">
                      <path d="M3.5 12.5C5.7 14.2 7.3 16.1 8.7 18.5 11.6 12 15.4 7.1 21.5 3.5" pathLength="1" />
                    </svg>
                  </span>
                </p>
              </div>
            </div>
          </article>
        </li>

        <li class="journey__step">
          <span class="journey__dot journey__dot--now" aria-hidden="true">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" /></svg>
          </span>
          <span class="journey__link" aria-hidden="true"></span>
          <article class="journey__card journey__card--today">
            <span class="journey__pin" aria-hidden="true"></span>
            <TapedPhoto class="journey__photo" :tilt="-4" :tape-at="50" :tape-tilt="4">
              <img
                src="@/assets/images/giuseppe-ingresso-scuola.webp"
                alt=""
                width="440"
                height="550"
                loading="lazy"
                decoding="async"
              />
            </TapedPhoto>
            <div>
              <p class="journey__when">Oggi · 2026–2027</p>
              <h3 class="journey__name"><mark>Quinto anno</mark></h3>
              <p class="journey__text">
                Faccio un tirocinio da sviluppatore web in Aulab e preparo l'Esame di Stato. Questo quaderno è
                il mio capolavoro.
              </p>
            </div>
            <InternBadge class="journey__badge" />
          </article>
        </li>
      </ol>

      <span class="journey__shavings" aria-hidden="true"></span>
    </div>
  </div>
</template>

<script setup>
import DeskDoodles from '@/components/foundations/DeskDoodles.vue'
import InteractiveLaptop from '@/components/foundations/InteractiveLaptop.vue'
import InternBadge from '@/components/foundations/InternBadge.vue'
import SchoolBackpack from '@/components/foundations/SchoolBackpack.vue'
import TapedPhoto from '@/components/primitives/TapedPhoto.vue'

defineProps({
  headingId: { type: String, required: true },
})
</script>

<style scoped>
/* La scrivania prosegue quella della Copertina: scorrendo, lo sguardo si sposta più in basso sullo
   stesso piano. Una matita traccia il filo del percorso; a ogni tappa nasce un punto, parte un
   trattino e la tappa viene scritta. Ogni tappa è un oggetto diverso. */
.journey {
  position: relative;
  z-index: 1;
}

.journey__desk {
  position: relative;
  isolation: isolate;
  width: min(100% - var(--desk-gutter) * 2, var(--desk-width));
  margin-inline: auto;
  padding: var(--space-8) var(--space-4) calc(var(--space-8) * 1.5);
  border-radius: 0 0 var(--desk-radius) var(--desk-radius);
  box-shadow: var(--desk-shadow);

  /* L'ombra è ritagliata in alto perché non cada sulla scrivania della Copertina. */
  clip-path: inset(0 -4rem -4rem);
}

.journey__title {
  position: relative;
  width: fit-content;
  margin: 0 auto var(--space-8);
  padding: 0.32em 0.62em 0.38em;
  color: var(--pen-black);
  font-family: var(--font-hand);
  font-size: clamp(2.25rem, 7vw, 4.25rem);
  line-height: 1;
  text-align: center;
  background:
    linear-gradient(transparent 58%, var(--highlight-yellow) 58% 88%, transparent 88%),
    #fff;
  border: 0.38rem solid #fff;
  border-radius: 46% 54% 48% 52% / 15% 19% 14% 18%;
  outline: 0.105rem dashed var(--pen-black);
  outline-offset: -0.48rem;
  filter: drop-shadow(0.12rem 0.22rem 0.16rem rgb(48 38 27 / 32%));
  rotate: -2deg;
}

.journey__steps {
  position: relative;
  width: min(100%, 62.5rem);
  height: 140rem;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  view-timeline-name: --journey;
}

/* La traccia è volutamente irregolare: il secondo passaggio, più largo e tenue, simula la grafite
   sfregata sul banco. */
.journey__route {
  --route-length: 2287;
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  fill: none;
  pointer-events: none;
}

.journey__route--narrow {
  --route-length: 2296;
  display: none;
}

.journey__route-shadow,
.journey__route-line {
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
}

/* Niente sfocatura: un filtro su una traccia lunga e animata costerebbe a ogni fotogramma. */
.journey__route-shadow {
  stroke: rgb(47 48 47 / 8%);
  stroke-width: 0.5rem;
}

.journey__route-line {
  stroke: var(--graphite);
  stroke-dasharray: var(--route-length);
  stroke-dashoffset: 0;
  stroke-width: 0.17rem;
  opacity: 0.72;
}

/* La matita: la punta coincide con la fine del filo. */
.journey__pencil {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 8;
  width: 0;
  height: 0;
  offset-path: path("M500 20C510 100 560 110 550 168S400 420 480 600 700 980 580 1200 420 1756 430 1856 520 2080 498 2206");
  offset-distance: 100%;
  offset-rotate: 0deg;
  pointer-events: none;
  will-change: transform;
}

.journey__pencil span {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0.75rem;
  height: 9rem;
  background:
    linear-gradient(to top, #454743 0 4%, #e6c58e 4% 13%, transparent 13% 90%, #eee9df 90% 93%, #d84f48 93%),
    linear-gradient(to right, #f3c735 0 24%, #232729 25% 74%, #dca91f 75%);
  filter: drop-shadow(0.4rem 0.3rem 0.3rem rgb(66 48 29 / 30%));
  clip-path: polygon(0 0, 100% 0, 100% 89%, 50% 100%, 0 89%);
  transform: translate(-50%, 0) rotate(24deg);
  transform-origin: 50% 100%;
}

.journey__step {
  --node-x: 50%;
  --node-y: 0;
  position: absolute;
  inset: var(--node-y) 0 auto;
  z-index: 2;
  min-height: 18rem;
}

.journey__step:nth-of-type(2) {
  --node-x: 55%;
  --node-y: 10.5rem;
}

.journey__step:nth-of-type(3) {
  --node-x: 48%;
  --node-y: 37.5rem;
}

.journey__step:nth-of-type(4) {
  --node-x: 58%;
  --node-y: 75rem;
}

.journey__step:nth-of-type(5) {
  --node-x: 43%;
  --node-y: 116rem;
}

/* Il punto nasce sul filo dove parte la tappa. */
.journey__dot {
  position: absolute;
  top: 0;
  left: var(--node-x);
  z-index: 4;
  width: 1.35rem;
  height: 1.35rem;
  color: var(--graphite);
  translate: -50% -50%;
}

.journey__dot svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  fill: var(--surface-desk);
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-width: 3;
  rotate: -18deg;
}

.journey__dot circle {
  stroke-dasharray: 54;
  stroke-dashoffset: 0;
}

.journey__dot--now {
  color: var(--pen-red);
}

/* Il trattino che dal punto porta alla tappa. */
.journey__link {
  position: absolute;
  top: 0;
  left: var(--node-x);
  z-index: 1;
  width: clamp(2.4rem, 6vw, 4.6rem);
  height: 0.15rem;
  background: var(--graphite);
  opacity: 0.6;
  transform-origin: 0 50%;
  translate: 0.9rem -50%;
}

.journey__step:nth-of-type(3) .journey__link,
.journey__step:nth-of-type(5) .journey__link {
  translate: calc(-100% - 0.9rem) -50%;
}

.journey__card {
  position: relative;
  width: min(100%, 24rem);
  color: var(--ink-strong);
  font-family: var(--font-hand);
}

.journey__step:nth-of-type(4) .journey__card {
  margin-left: calc(var(--node-x) + clamp(3.2rem, 7vw, 5.4rem));
}

.journey__step:nth-of-type(2) .journey__card {
  margin-left: calc(var(--node-x) + clamp(3.2rem, 7vw, 5.4rem));
}

.journey__step:nth-of-type(3) .journey__card,
.journey__step:nth-of-type(5) .journey__card {
  margin-left: max(0rem, calc(var(--node-x) - 29rem));
}

.journey__when,
.journey__name,
.journey__text {
  margin: 0;
}

.journey__when {
  color: var(--pen-blue);
  font-size: 1.0625rem;
  font-weight: 700;
  line-height: 1.5;
}

.journey__name {
  margin-bottom: 0.35rem;
  font-size: 2rem;
  line-height: 1.15;
}

.journey__text {
  font-size: 1.1875rem;
  line-height: 1.5;
}

/* Tappa 1: un'agenda settimanale da salone, con il racconto su un foglietto appoggiato sopra. */
.journey__salon-scene {
  width: min(100%, 28rem);
  min-height: 17.5rem;
  transform: perspective(50rem) rotateX(2deg) rotateY(3deg) rotateZ(-2deg);
}

.journey__planner-window {
  width: 100%;
  overflow: hidden;
  border-radius: 0.25rem 0.25rem 0.55rem 0.4rem;
  box-shadow: 0.55rem 0.9rem 1.1rem -0.42rem rgb(47 36 24 / 42%);
}

.journey__planner {
  position: relative;
  min-width: 28rem;
  min-height: 16.5rem;
  padding: 2rem 1rem 1rem;
  background:
    linear-gradient(90deg, transparent 0 49.85%, rgb(92 72 48 / 13%) 50%, transparent 50.15%),
    var(--paper-warm);
}

.journey__planner-rings {
  position: absolute;
  top: -0.75rem;
  right: 1rem;
  left: 1rem;
  z-index: 4;
  display: flex;
  justify-content: space-around;
}

.journey__planner-rings i {
  width: 0.62rem;
  height: 2.15rem;
  border: 0.14rem solid #68777c;
  border-radius: 50%;
  box-shadow: 0.12rem 0.2rem 0.18rem rgb(48 38 27 / 28%);
  rotate: 3deg;
}

.journey__planner-rings i:nth-child(even) {
  rotate: -2deg;
}

.journey__planner-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 0.55rem;
  padding-inline: 0.35rem;
  color: var(--pen-blue);
}

.journey__planner-heading strong {
  font-size: 1.15rem;
}

.journey__planner-heading span {
  font-size: 0.82rem;
}

.journey__planner-week {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  min-height: 11.9rem;
  border-top: 0.09rem solid rgb(102 81 54 / 42%);
  border-bottom: 0.09rem solid rgb(102 81 54 / 28%);
}

.journey__planner-week > div {
  display: flex;
  flex-direction: column;
  gap: 0.62rem;
  padding: 0.5rem 0.38rem;
  border-right: 0.07rem solid rgb(102 81 54 / 28%);
}

.journey__planner-week > div:last-child {
  border-right: 0;
}

.journey__planner-week b {
  color: var(--pen-red);
  font-size: 0.85rem;
  text-align: center;
  border-bottom: 0.07rem solid rgb(102 81 54 / 26%);
}

.journey__planner-week span {
  min-height: 1.85rem;
  padding-bottom: 0.2rem;
  color: var(--graphite);
  font-size: 0.68rem;
  line-height: 1.25;
  border-bottom: 0.06rem solid var(--line-blue);
  rotate: -1deg;
}

.journey__planner-week > div:nth-child(even) span {
  rotate: 1deg;
}

.journey__salon-note {
  position: absolute;
  top: 2.8rem;
  right: -0.6rem;
  z-index: 5;
  width: 14.5rem;
  padding: 1.35rem 1.15rem 1.1rem;
  background: var(--tab-yellow);
  box-shadow: 0.48rem 0.72rem 0.85rem -0.28rem rgb(47 36 24 / 48%);
  rotate: 4deg;
}

.journey__salon-tools {
  position: absolute;
  top: 12.8rem;
  left: 51%;
  z-index: 7;
  width: clamp(8rem, 16vw, 11.5rem);
  height: auto;
  aspect-ratio: 560 / 467;
  object-fit: contain;
  filter: drop-shadow(0.35rem 0.55rem 0.45rem rgb(48 38 27 / 24%));
  transform: rotate(-7deg);
  pointer-events: none;
}

.journey__card--today::after {
  content: "";
  position: absolute;
  right: -0.1rem;
  bottom: -0.12rem;
  width: 3.5rem;
  height: 2.3rem;
  background: linear-gradient(145deg, transparent 48%, rgb(117 91 58 / 14%) 49%, var(--paper-warm) 68%);
  border-radius: 0 0 0.5rem;
  filter: drop-shadow(-0.18rem -0.12rem 0.14rem rgb(56 42 26 / 15%));
  clip-path: polygon(42% 100%, 100% 34%, 100% 100%);
}

.journey__paperclip {
  position: absolute;
  top: -1.25rem;
  left: 18%;
  z-index: 3;
  width: 1.15rem;
  height: 3.2rem;
  border: 0.16rem solid #69787d;
  border-radius: 0.65rem;
  box-shadow: inset 0 0 0 0.16rem var(--paper-warm), 0.15rem 0.28rem 0.25rem rgb(48 38 27 / 24%);
  rotate: -9deg;
}

/* Tappa 2: lo stesso schema del salone. Il portatile aperto sul banco, un post-it attaccato sopra
   con il racconto e, accanto, il mouse con il filo arricciato come quello del phon. */
.journey__code-scene {
  width: min(100%, 23rem);
}

.journey__laptop {
  z-index: 1;
}

.journey__code-note {
  position: absolute;
  top: 64%;
  right: -3.5rem;
  z-index: 3;
  width: 14rem;
  padding: 1.5rem 1.15rem 1.1rem;
  background: var(--tab-blue);
  box-shadow: 0.48rem 0.72rem 0.85rem -0.28rem rgb(47 36 24 / 48%);
  rotate: -3deg;
}

/* La striscia adesiva del post-it, appena più scura. */
.journey__code-note::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: 1.1rem;
  background: rgb(36 92 128 / 8%);
}

.journey__mouse {
  position: absolute;
  top: 36%;
  right: -4.6rem;
  z-index: 0;
  width: 3.3rem;
  height: 5.4rem;
  rotate: 4deg;
}

/* Il filo esce dalla punta del mouse, fa un giro su sé stesso e finisce sotto il portatile. */
.journey__mouse-cord {
  position: absolute;
  bottom: calc(100% - 0.4rem);
  left: calc(50% - 3rem);
  width: 7rem;
  max-width: none;
  height: 11rem;
  overflow: visible;
  fill: none;
  stroke: #24282b;
  stroke-linecap: round;
  stroke-width: 4.5;
  filter: drop-shadow(0.15rem 0.25rem 0.12rem rgb(48 38 27 / 28%));
}

.journey__mouse::before,
.journey__mouse::after {
  content: "";
  position: absolute;
  z-index: 1;
}

.journey__mouse::before {
  inset: 0;
  background:
    linear-gradient(90deg, transparent calc(50% - 0.05rem), rgb(0 0 0 / 60%) 0 calc(50% + 0.05rem), transparent 0)
      top / 100% 40% no-repeat,
    radial-gradient(ellipse at 34% 26%, #5a6166, #2a2f32 48%, #141719);
  border-radius: 48% 48% 46% 46% / 40% 40% 60% 60%;
  box-shadow: 0.4rem 0.6rem 0.7rem -0.2rem rgb(47 36 24 / 45%);
}

.journey__mouse::after {
  top: 13%;
  left: 50%;
  width: 0.42rem;
  height: 1rem;
  background: repeating-linear-gradient(#6a7176 0 0.08rem, #2c3134 0.08rem 0.17rem);
  border-radius: 0.2rem;
  translate: -50% 0;
}

/* Tappa 3: lo zaino sul banco, con i libri che escono; sopra, un foglio a quadretti staccato dal
   quaderno ad anelli e, accanto, la borraccia. */
.journey__school-scene {
  width: min(100%, 26rem);
}

/* Lo zaino sta a destra: il foglio copre il davanti, in basso a sinistra, e lascia vedere cima,
   fianco e libri. */
.journey__backpack {
  width: 20.5rem;
  margin-left: auto;
}

.journey__school-note {
  position: absolute;
  top: 18rem;
  left: -1rem;
  z-index: 3;
  width: 14rem;
  filter: drop-shadow(0.45rem 0.75rem 0.55rem rgb(47 36 24 / 34%));
  rotate: -3deg;
}

/* Quadretti da 5 mm e quattro fori; quello in alto si è strappato uscendo dagli anelli. L'ombra sta
   sul contenitore perché la maschera dei fori la taglierebbe. */
.journey__binder-sheet {
  --hole-x: 1.05rem;
  --hole-r: 0.32rem;
  padding: 1.25rem 1rem 1.15rem 2.5rem;
  background-color: var(--paper);
  background-image:
    linear-gradient(90deg, var(--line-blue) 0.0625rem, transparent 0.0625rem),
    linear-gradient(var(--line-blue) 0.0625rem, transparent 0.0625rem);
  background-size: 0.75rem 0.75rem;
  border-radius: 0.15rem 0.3rem 0.3rem 0.15rem;
  mask: radial-gradient(circle at var(--hole-x) 50%, transparent var(--hole-r), #000 calc(var(--hole-r) + 0.04rem))
    0 0 / 100% 25%;
  clip-path: polygon(
    0 0,
    100% 0,
    100% 100%,
    0 100%,
    0 calc(12.5% + 0.24rem),
    var(--hole-x) calc(12.5% + 0.12rem),
    var(--hole-x) calc(12.5% - 0.12rem),
    0 calc(12.5% - 0.28rem)
  );
}

/* La borraccia è in piedi accanto allo zaino, vista come lui: corpo cilindrico, etichetta, tappo
   zigrinato e anello. Le misure in em la rimpiccioliscono tutta insieme. */
.journey__bottle {
  position: absolute;
  top: 17.5rem;
  right: -1rem;
  z-index: 4;
  width: 2.6em;
  height: 6.8em;
  font-size: 1rem;
  background:
    linear-gradient(90deg, rgb(70 18 8 / 50%), transparent 18%, rgb(255 255 255 / 72%) 29%, transparent 40% 68%, rgb(70 18 8 / 48%) 92%),
    linear-gradient(transparent 36%, var(--paper) 36% 56%, transparent 56%),
    linear-gradient(transparent 80%, rgb(70 18 8 / 30%)),
    #e2775d;
  border-radius: 0.5em 0.5em 0.9em 0.9em / 0.35em 0.35em 0.6em 0.6em;
  filter: drop-shadow(0.55rem 0.5rem 0.4rem rgb(47 36 24 / 40%));
}

.journey__bottle::before,
.journey__bottle::after {
  content: "";
  position: absolute;
}

.journey__bottle::before {
  bottom: calc(100% - 0.2em);
  left: 13%;
  width: 74%;
  height: 1.6em;
  background:
    radial-gradient(ellipse 50% 22% at 50% 12%, #5b6267, transparent 100%),
    linear-gradient(90deg, rgb(0 0 0 / 45%), transparent 22%, rgb(255 255 255 / 45%) 32%, transparent 44% 70%, rgb(0 0 0 / 55%)),
    repeating-linear-gradient(90deg, #22272a 0 0.1em, #4a5156 0.1em 0.2em);
  border-radius: 0.45em 0.45em 0.15em 0.15em / 0.3em 0.3em 0.15em 0.15em;
}

.journey__bottle::after {
  bottom: calc(100% + 1.1em);
  left: 50%;
  width: 1.1em;
  height: 1.1em;
  border: 0.22em solid #2c3134;
  border-radius: 50%;
  translate: -50% 0;
}

.journey__years {
  display: flex;
  gap: 0.6rem;
  margin: 0.8rem 0 0;
}

.journey__years span {
  position: relative;
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  color: var(--pen-green);
  font-size: 1.125rem;
  font-weight: 700;
  border: 0.12rem solid var(--pen-green);
  border-radius: 48% 52% 46% 54% / 54% 46% 55% 45%;
  rotate: -6deg;
}

/* Gli anni conclusi hanno la spunta, a penna verde come le conferme. */
.journey__tick {
  position: absolute;
  top: -0.7rem;
  right: -0.75rem;
  width: 2rem;
  height: 2rem;
  overflow: visible;
  fill: none;
  stroke: var(--pen-green);
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2.8;
  rotate: 6deg;
}

/* Tappa 4: oggi, con la foto davanti alla scuola. */
.journey__card--today {
  display: grid;
  grid-template-columns: 7.5rem minmax(0, 1fr);
  gap: 1.1rem;
  align-items: start;
  width: min(100%, 27rem);
  padding: 1.3rem 1.2rem;
  background: var(--paper);
  border-radius: 0.3rem 0.9rem 0.5rem 0.7rem;
  box-shadow: 0.55rem 1rem 1.2rem -0.5rem rgb(47 36 24 / 42%);
  transform: perspective(45rem) rotateX(2deg) rotateY(-3deg) rotateZ(2deg);
}

.journey__pin {
  position: absolute;
  top: -0.6rem;
  right: 18%;
  z-index: 5;
  width: 1.25rem;
  height: 1.25rem;
  background: var(--pen-red);
  border: 0.18rem solid rgb(255 255 255 / 40%);
  border-radius: 50%;
  box-shadow: 0.18rem 0.32rem 0.28rem rgb(48 38 27 / 38%);
}

.journey__pin::after {
  content: "";
  position: absolute;
  top: 85%;
  left: 50%;
  width: 0.12rem;
  height: 1.15rem;
  background: #666b68;
  transform: translateX(-50%) rotate(-8deg);
  transform-origin: top;
}

.journey__photo {
  --taped-photo-padding: 0.25rem 0.25rem 0.9rem;
  --taped-photo-tape-width: 3rem;
  --taped-photo-tape-height: 1rem;
}

/* Il badge del tirocinio è appoggiato sul foglio sotto la foto e sporge sul banco. */
.journey__badge {
  position: absolute;
  top: 10.5rem;
  left: 0.8rem;
  z-index: 6;
  font-size: 0.85rem;
}

.journey__shavings {
  position: absolute;
  right: 5%;
  bottom: 3rem;
  width: 5rem;
  height: 3.5rem;
  background:
    radial-gradient(ellipse at 28% 38%, transparent 0 31%, #c59554 33% 39%, transparent 41%),
    radial-gradient(ellipse at 66% 62%, transparent 0 28%, #d2aa6d 30% 38%, transparent 40%),
    radial-gradient(ellipse at 80% 20%, transparent 0 24%, #ad7b42 26% 34%, transparent 36%);
  filter: drop-shadow(0.18rem 0.25rem 0.18rem rgb(48 38 27 / 24%));
  rotate: -12deg;
}

/* Sotto gli 80rem la composizione larga non entra nella scrivania: le tappe vanno in colonna,
   come sul telefono. */
@media (max-width: 79.99rem) {
  .journey__steps {
    width: min(100%, 30rem);
    height: 146rem;
  }

  /* Sul telefono la traccia ha una forma sua, larga 7.5rem e misurata in px: passa dai punti a
     qualsiasi larghezza dello schermo e la matita la segue con lo stesso percorso. */
  .journey__route--wide {
    display: none;
  }

  .journey__route--narrow {
    display: block;
    width: 7.5rem;
  }

  .journey__pencil {
    offset-path: path("M64 20C66 80 58 130 62.4 176S84 300 74 380 44 470 62.4 544 86 760 76 860 44 1040 62.4 1136 84 1380 72 1490 46 1700 62.4 1824 80 2040 70 2140 56 2250 60 2306");
  }

  .journey__step:nth-of-type(2),
  .journey__step:nth-of-type(3),
  .journey__step:nth-of-type(4),
  .journey__step:nth-of-type(5) {
    --node-x: 3.9rem;
  }

  .journey__step:nth-of-type(2) { --node-y: 11rem; }
  .journey__step:nth-of-type(3) { --node-y: 34rem; }
  .journey__step:nth-of-type(4) { --node-y: 71rem; }
  .journey__step:nth-of-type(5) { --node-y: 114rem; }

  .journey__step:nth-of-type(n + 2) .journey__card {
    width: calc(100% - 7rem);
    margin-left: 7rem;
  }

  .journey__salon-tools {
    top: 15rem;
    left: 0.45rem;
    width: 6.5rem;
    transform: rotate(-9deg);
  }

  .journey__salon-scene {
    min-height: 19rem;
  }

  .journey__planner {
    translate: -5.25rem 0;
  }

  .journey__salon-note {
    top: 6.4rem;
    right: 0.7rem;
    width: min(14rem, calc(100% - 1.4rem));
    padding: 1rem 0.9rem 0.85rem;
  }

  /* In colonna il portatile resta piccolo: crescendo in altezza arriverebbe alla tappa successiva. */
  .journey__step:nth-of-type(3) .journey__code-scene {
    width: min(calc(100% - 7rem), 17rem);
  }

  .journey__code-note {
    top: 64%;
    right: 0.6rem;
    width: min(13rem, calc(100% - 1.2rem));
    padding: 1.2rem 0.9rem 0.85rem;
    rotate: -2deg;
  }

  /* Sul telefono il mouse sta nel margine a sinistra, come phon e spazzola, e il filo va a destra. */
  .journey__mouse {
    top: 72%;
    right: auto;
    left: -5.4rem;
    width: 2.6rem;
    height: 4.3rem;
    rotate: 10deg;
  }

  .journey__mouse-cord {
    left: calc(50% - 4rem);
    scale: -1 1;
  }

  /* In colonna lo zaino ha una larghezza massima e il foglio parte poco sopra il suo fondo, così
     non lo copre: la tappa misura la propria larghezza con cqw. */
  .journey__school-scene {
    container-type: inline-size;
  }

  .journey__backpack {
    width: min(100%, 16rem);
    margin-inline: auto;
  }

  .journey__school-note {
    top: calc(min(100cqw, 16rem) * 1.22 - 2rem);
    left: 0;
    width: min(13rem, calc(100% - 0.8rem));
    rotate: -2deg;
  }

  .journey__binder-sheet {
    padding: 1rem 0.85rem 0.9rem 2.2rem;
  }

  /* Come mouse e attrezzi del salone, la borraccia sta nel margine a sinistra. */
  .journey__bottle {
    top: 9rem;
    right: auto;
    left: -5.2rem;
    font-size: 0.75rem;
  }

  .journey__school-note .journey__text,
  .journey__code-note .journey__text {
    font-size: 1rem;
    line-height: 1.38;
  }

  .journey__step:nth-of-type(2) .journey__link,
  .journey__step:nth-of-type(3) .journey__link,
  .journey__step:nth-of-type(5) .journey__link {
    translate: 0.9rem -50%;
  }

  .journey__card--today {
    grid-template-columns: minmax(0, 1fr);
  }

  .journey__photo {
    width: 7.5rem;
  }

  /* In colonna il badge sta nel margine a sinistra, come gli altri oggetti. */
  .journey__badge {
    top: 4rem;
    left: -6.2rem;
    font-size: 0.68rem;
  }
}

/* Dove il browser lo permette, tutto segue lo scorrimento: la punta della matita resta attorno
   ai due terzi dello schermo, e ciò che supera prende vita. Altrove, e con movimento ridotto,
   è tutto già disegnato e scritto, con la matita appoggiata in fondo. */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .journey__route-shadow,
    .journey__route-line {
      animation: journey-draw linear both;
      animation-timeline: --journey;
      animation-range: cover 32vh cover calc(100% - 68vh);
    }

    .journey__pencil {
      animation: journey-travel linear both;
      animation-timeline: --journey;
      animation-range: cover 32vh cover calc(100% - 68vh);
    }

    .journey__dot {
      animation: none;
      animation-timeline: view();
      animation-range: cover 32vh cover calc(32vh + 5rem);
    }

    .journey__dot circle {
      animation: journey-circle linear both;
      animation-timeline: view();
      animation-range: cover 22vh cover 30vh;
    }

    .journey__link {
      animation: journey-reach linear both;
      animation-timeline: view();
      animation-range: cover 28vh cover 36vh;
    }

    .journey__when,
    .journey__name,
    .journey__text {
      animation: journey-write linear both;
      animation-timeline: view();
      animation-range: cover 30vh cover 48vh;
    }

    .journey__tick {
      animation: journey-tick linear both;
      animation-timeline: view();
      animation-range: cover 34vh cover 46vh;
    }
  }
}

@keyframes journey-draw {
  from {
    stroke-dashoffset: var(--route-length);
  }
}

@keyframes journey-travel {
  from {
    offset-distance: 0%;
  }
}

@keyframes journey-circle {
  from {
    stroke-dashoffset: 54;
  }
}

@keyframes journey-tick {
  from {
    stroke-dashoffset: 1;
  }
}

@keyframes journey-reach {
  from {
    scale: 0 1;
  }
}

@keyframes journey-write {
  from {
    clip-path: inset(-0.3em 100% -0.3em -0.4em);
  }

  to {
    clip-path: inset(-0.3em -0.4em);
  }
}

/* Con movimento ridotto la scrivania della Copertina non è una scena: questa è un piano a sé. */
@media (prefers-reduced-motion: reduce) {
  .journey__desk {
    margin-top: var(--space-6);
    border-radius: var(--desk-radius);
    clip-path: none;
  }
}
</style>
