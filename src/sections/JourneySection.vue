<template>
  <!-- Il Percorso racconta la persona, non i progetti. Testi in bozza, scritti dai fatti del profilo di
       Giuseppe: ordine delle tappe e parole vanno confermati da lui. -->
  <div class="journey">
    <!-- La scrivania della Copertina finisce qui con il suo bordo; sotto c'è il muro con la bacheca. -->
    <div class="journey__desk-end desk-surface" aria-hidden="true"></div>

    <CorkBoard class="journey__board">
      <div class="journey__heading">
        <h2 :id="headingId" class="journey__title">Il mio percorso</h2>
        <BoardPin class="journey__title-pin journey__title-pin--left" color="blue" />
        <BoardPin class="journey__title-pin journey__title-pin--right" color="yellow" />
      </div>

      <ol ref="steps" class="journey__steps">
        <li class="journey__step journey__step--salon">
          <div class="journey__cluster">
            <BoardPin class="journey__thread-pin" thread />

            <div class="journey__planner" aria-hidden="true">
              <div class="journey__planner-page">
                <div class="journey__planner-heading">
                  <strong>Agenda del salone</strong>
                  <span>Settimana</span>
                </div>
                <div class="journey__planner-week">
                  <div><b>Lun</b><span>09:00 Taglio</span><span>11:30 Piega</span><span>16:00 Colore</span></div>
                  <div><b>Mar</b><span>10:00 Barba</span><span>12:00 Taglio</span><span>17:30 Piega</span></div>
                  <div><b>Mer</b><span>09:30 Colore</span><span>14:00 Taglio</span><span>18:00 Piega</span></div>
                </div>
              </div>
            </div>

            <article class="journey__note journey__note--yellow journey__writing">
              <p class="journey__when">Prima</p>
              <h3 class="journey__name">Il salone</h3>
              <p class="journey__text">Ho fatto il parrucchiere. Era un lavoro vero, ma non era la mia strada.</p>
            </article>

            <PolaroidPhoto class="journey__polaroid" caption="i ferri del mestiere" :tilt="-7" develop>
              <img
                src="@/assets/images/salon-tools-3d.webp"
                alt=""
                width="560"
                height="467"
                loading="lazy"
                decoding="async"
              />
            </PolaroidPhoto>
          </div>
        </li>

        <li class="journey__step journey__step--code">
          <div class="journey__cluster">
            <BoardPin class="journey__thread-pin" thread />

            <!-- Il primo index.html, stampato: il portatile su cui è stato scritto non si appende. -->
            <div class="journey__printout" aria-hidden="true">
              <p class="journey__printout-header"><span>index.html</span><span>Pagina 1 di 1</span></p>
              <code class="journey__printout-code">
                <span><b>&lt;!DOCTYPE html&gt;</b></span>
                <span>&lt;<strong>html</strong>&gt;</span>
                <span>&nbsp;&nbsp;&lt;<strong>body</strong>&gt;</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<strong>h1</strong>&gt;Il mio sito&lt;/<strong>h1</strong>&gt;</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<strong>img</strong> src=<q>foto.jpg</q>&gt;</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<strong>button</strong>&gt;Clicca!&lt;/<strong>button</strong>&gt;</span>
                <span>&nbsp;&nbsp;&lt;/<strong>body</strong>&gt;</span>
                <span>&lt;/<strong>html</strong>&gt;</span>
              </code>
            </div>

            <article class="journey__note journey__note--blue journey__writing">
              <p class="journey__when">La svolta</p>
              <h3 class="journey__name">Il primo codice</h3>
              <p class="journey__text">
                Il mio primo sito l'ho scritto su un HP nuovo di zecca: sproporzionato, confuso,
                bellissimo perché era mio.
              </p>
            </article>
          </div>
        </li>

        <li class="journey__step journey__step--school">
          <div class="journey__cluster">
            <BoardPin class="journey__thread-pin" thread />

            <div class="journey__binder">
              <article class="journey__binder-sheet journey__writing">
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
              </article>
            </div>

            <!-- Una foto viva: dentro c'è lo zaino 3D vero, che si apre mentre scorri. -->
            <PolaroidPhoto class="journey__polaroid" caption="di nuovo lo zaino" :tilt="5" pin="blue">
              <div class="journey__backpack-shot">
                <SchoolBackpack class="journey__backpack" />
              </div>
            </PolaroidPhoto>
          </div>
        </li>

        <li class="journey__step journey__step--today">
          <div class="journey__cluster">
            <BoardPin class="journey__thread-pin" thread />

            <article class="journey__sheet">
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
              <div class="journey__writing">
                <p class="journey__when">Oggi · 2026–2027</p>
                <h3 class="journey__name"><mark>Quinto anno</mark></h3>
                <p class="journey__text">
                  Faccio un tirocinio da sviluppatore web in Aulab e preparo l'Esame di Stato. Questo quaderno è
                  il mio capolavoro.
                </p>
              </div>
            </article>

            <!-- Il badge del tirocinio pende da una puntina, con il cordino che le gira attorno. -->
            <div class="journey__badge" aria-hidden="true">
              <svg class="journey__lanyard" viewBox="0 0 40 132">
                <path class="journey__lanyard-edge" :d="lanyard" />
                <path class="journey__lanyard-band" :d="lanyard" />
                <path class="journey__lanyard-weave" :d="lanyard" />
              </svg>
              <BoardPin class="journey__badge-pin" color="yellow" />
              <InternBadge class="journey__badge-card" />
            </div>
          </div>
        </li>
      </ol>
    </CorkBoard>
  </div>
</template>

<script setup>
import BoardPin from '@/components/foundations/BoardPin.vue'
import CorkBoard from '@/components/foundations/CorkBoard.vue'
import InternBadge from '@/components/foundations/InternBadge.vue'
import PolaroidPhoto from '@/components/foundations/PolaroidPhoto.vue'
import SchoolBackpack from '@/components/foundations/SchoolBackpack.vue'
import TapedPhoto from '@/components/primitives/TapedPhoto.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps({
  headingId: { type: String, required: true },
})

// Il cordino sale dalla clip, gira attorno alla puntina e ridiscende alla clip.
const lanyard = 'M17 130C15 96 10 34 15 13 17 5 23 5 25 13 30 34 25 96 23 130'

const steps = ref(null)
let resizeObserver

// La penna scrive un biglietto una riga dopo l'altra: per ogni elemento serve sapere da quale riga
// del biglietto parte e quante ne occupa, e il biglietto quante ne ha in tutto. Le righe cambiano
// con la larghezza e con l'arrivo dei font, quindi si ricontano.
function measureWriting(note) {
  let from = 0
  for (const element of note.querySelectorAll('.journey__when, .journey__name, .journey__text')) {
    const lineHeight = parseFloat(getComputedStyle(element).lineHeight)
    const lines = Math.max(1, Math.round(element.clientHeight / lineHeight))
    element.style.setProperty('--ink-from', from)
    element.style.setProperty('--ink-lines', lines)
    from += lines
  }
  note.style.setProperty('--ink-total', from)
}

onMounted(() => {
  const notes = steps.value.querySelectorAll('.journey__writing')
  resizeObserver = new ResizeObserver((entries) => entries.forEach((entry) => measureWriting(entry.target)))
  notes.forEach((note) => resizeObserver.observe(note))
  document.fonts.ready.then(() => notes.forEach(measureWriting))
})

onBeforeUnmount(() => resizeObserver?.disconnect())
</script>

<style scoped>
/* Sotto la Copertina la scrivania finisce e lo sguardo sale al muro, dove è appesa la bacheca. Le
   tappe sono reperti appuntati con le puntine; il filo rosso le unisce nell'ordine del racconto,
   passando dalle puntine con `thread`. */
.journey {
  position: relative;
  z-index: 1;
}

.journey__desk-end {
  width: min(100% - var(--desk-gutter) * 2, var(--desk-width));
  height: var(--space-6);
  margin: 0 auto var(--space-7);
  border-radius: 0 0 var(--desk-radius) var(--desk-radius);
  box-shadow: inset 0 -0.3rem 0 rgb(117 99 77 / 35%), var(--desk-shadow);

  /* L'ombra è ritagliata in alto perché non cada sulla scrivania della Copertina. */
  clip-path: inset(0 -4rem -4rem);
}

.journey__board {
  --cork-board-padding: clamp(1.5rem, 4vw, 3.5rem) clamp(1rem, 4vw, 3.5rem) clamp(4rem, 8vw, 6rem);
  width: min(100% - var(--desk-gutter) * 2, var(--desk-width));
  margin-inline: auto;
}

/* Il titolo è una scheda a righe, come quelle delle ricerche a scuola, fissata con due puntine. */
.journey__heading {
  position: relative;
  width: fit-content;
  max-width: 100%;
  margin: 0 auto clamp(3rem, 7cqw, 5rem);
}

.journey__title {
  margin: 0;
  padding: 0.55em 1em 0.35em;
  color: var(--pen-black);
  font-family: var(--font-hand);
  font-size: clamp(2.25rem, 7cqw, 4.25rem);
  line-height: 1.15;
  text-align: center;
  background:
    linear-gradient(transparent 0 0.42em, rgb(201 98 92 / 55%) 0.42em calc(0.42em + 0.06rem), transparent 0),
    repeating-linear-gradient(transparent 0 calc(0.5em - 0.06rem), var(--line-blue) calc(0.5em - 0.06rem) 0.5em),
    var(--paper);
  background-position: 0 0, 0 0.42em;
  box-shadow: 0.35rem 0.6rem 0.7rem -0.25rem rgb(40 22 8 / 42%);
  rotate: -2deg;
}

.journey__heading .journey__title-pin--left {
  top: 0.55rem;
  left: 1.4rem;
}

.journey__heading .journey__title-pin--right {
  top: 0.2rem;
  left: calc(100% - 1.1rem);
}

/* Su desktop le tappe si alternano ai due lati e ognuna comincia prima che la precedente finisca.
   Ogni gruppo di reperti sta verso il centro, con la puntina del filo nell'angolo interno: così il
   filo scende nello spazio fra le colonne e non passa sui testi. */
.journey__steps {
  --journey-gap: clamp(3rem, 8cqw, 7rem);
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;
}

.journey__step {
  position: relative;
  width: calc(50% - var(--journey-gap) / 2);
}

.journey__step:nth-child(even) {
  align-self: flex-end;
}

.journey__step + .journey__step {
  margin-top: -7rem;
}

.journey__cluster {
  position: relative;
}

.journey__step:nth-child(odd) .journey__cluster {
  margin-left: auto;
}

.journey__step .journey__thread-pin {
  top: 0.7rem;
  left: 1.6rem;
}

.journey__step:nth-child(odd) .journey__thread-pin {
  left: calc(100% - 1.6rem);
}

.journey__when,
.journey__name,
.journey__text {
  margin: 0;
  color: var(--ink-strong);
  font-family: var(--font-hand);
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

/* I post-it con il racconto sono attaccati sopra il reperto della tappa. */
.journey__note {
  position: absolute;
  z-index: 3;
  width: 14.5rem;
  padding: 1.35rem 1.15rem 1.1rem;
  background: var(--tab-yellow);
  box-shadow: 0.48rem 0.72rem 0.85rem -0.28rem rgb(47 36 24 / 48%);
}

.journey__note--blue {
  background: var(--tab-blue);
}

/* La striscia adesiva del post-it, appena più scura. */
.journey__note::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: 1.1rem;
  background: rgb(92 72 30 / 7%);
}

.journey__polaroid {
  position: absolute;
  z-index: 2;
}

/* Tappa 1: la pagina della settimana strappata dall'agenda a spirale, con i fori rotti in alto,
   il post-it sopra e la polaroid di phon e spazzola. L'ombra sta sul contenitore perché la maschera
   dei fori la taglierebbe. */
.journey__step--salon .journey__cluster {
  width: min(100%, 21rem);
  padding-bottom: 7rem;
}

.journey__step--salon .journey__thread-pin {
  top: 1.25rem;
}

.journey__planner {
  filter: drop-shadow(0.4rem 0.7rem 0.5rem rgb(40 22 8 / 34%));
  rotate: 2deg;
}

.journey__planner-page {
  padding: 1.7rem 0.9rem 1rem;
  background: var(--paper-warm);
  mask:
    radial-gradient(circle at 50% 0.65rem, transparent 0.27rem, #000 0.31rem) 0 0 / 2rem 1.4rem repeat-x,
    linear-gradient(#000 0 0) 0 1.4rem / 100% 100% no-repeat;
}

.journey__planner-heading {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  column-gap: 0.75rem;
  margin-bottom: 0.55rem;
  padding-inline: 0.35rem;
  color: var(--pen-blue);
  font-family: var(--font-hand);
}

.journey__planner-heading strong {
  font-size: 1.15rem;
}

.journey__planner-heading span {
  font-size: 0.82rem;
}

.journey__planner-week {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  min-height: 11.9rem;
  font-family: var(--font-hand);
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
  font-size: 0.72rem;
  line-height: 1.25;
  border-bottom: 0.06rem solid var(--line-blue);
}

.journey__step--salon .journey__note {
  top: 7rem;
  left: -3rem;
  rotate: -3deg;
}

.journey__step--salon .journey__polaroid {
  top: 13.5rem;
  left: -10.5rem;
}

/* Tappa 2: il primo index.html stampato, con una piega a metà, e il post-it azzurro sopra. */
.journey__step--code .journey__cluster {
  width: min(100%, 20rem);
  padding-bottom: 8rem;
}

.journey__printout {
  padding: 1rem 1.2rem 1.4rem;
  background:
    linear-gradient(transparent 49.4%, rgb(60 45 30 / 7%) 50%, rgb(255 255 255 / 60%) 50.5%, transparent 51.5%),
    var(--paper);
  box-shadow: 0.4rem 0.75rem 0.8rem -0.3rem rgb(40 22 8 / 40%);
  rotate: 1.5deg;
}

.journey__printout-header {
  display: flex;
  justify-content: space-between;
  margin: 0 0 0.8rem;
  padding: 0 0 0.35rem 1.4rem;
  color: var(--ink-soft);
  font-family: var(--font-body);
  font-size: 0.68rem;
  border-bottom: 0.06rem solid var(--paper-edge);
}

/* I numeri di riga sono un contatore, come nel portatile della tappa. */
.journey__printout-code {
  display: block;
  color: var(--graphite);
  font-family: var(--font-code);
  font-size: 0.8rem;
  line-height: 1.75;
  white-space: nowrap;
  counter-reset: line;
}

.journey__printout-code span {
  display: block;
  counter-increment: line;
}

.journey__printout-code span::before {
  content: counter(line);
  display: inline-block;
  width: 1.6em;
  color: #a7a49c;
}

.journey__printout-code b {
  color: #8d8a83;
  font-weight: 400;
}

.journey__printout-code strong {
  color: var(--pen-blue);
  font-weight: 400;
}

.journey__printout-code q {
  color: #9a5a22;
}

.journey__step--code .journey__note {
  top: 8.5rem;
  right: -4rem;
  width: 14rem;
  rotate: -3deg;
}

/* Tappa 3: il foglio a quadretti staccato dal quaderno ad anelli e la polaroid dello zaino. */
.journey__step--school .journey__cluster {
  width: min(100%, 17rem);
  padding-bottom: 3rem;
}

.journey__binder {
  filter: drop-shadow(0.45rem 0.75rem 0.55rem rgb(47 36 24 / 34%));
  rotate: -2deg;
}

/* Quadretti da 5 mm e quattro fori; quello in alto si è strappato uscendo dagli anelli. */
.journey__binder-sheet {
  --hole-x: 1.05rem;
  --hole-r: 0.32rem;
  padding: 1.6rem 1rem 1.15rem 2.5rem;
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
  font-family: var(--font-hand);
  font-size: 1.125rem;
  font-weight: 700;
  border: 0.12rem solid var(--pen-green);
  border-radius: 48% 52% 46% 54% / 54% 46% 55% 45%;
  rotate: -6deg;
}

/* Gli anni conclusi hanno la spunta, a penna verde come le conferme. Lo spazio fra i trattini è
   più lungo della traccia, e all'inizio il trattino sta appena prima di essa: un trattino lungo
   zero, con la punta arrotondata, verrebbe disegnato come un puntino. */
.journey__tick {
  position: absolute;
  top: -0.7rem;
  right: -0.75rem;
  width: 2rem;
  height: 2rem;
  overflow: visible;
  fill: none;
  stroke: var(--pen-green);
  stroke-dasharray: 1 2;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2.8;
  rotate: 6deg;
}

.journey__step--school .journey__polaroid {
  top: 1.5rem;
  left: -14rem;
  width: 12.5rem;
}

/* Lo zaino misura le sue parti in cqw rispetto al container che lo contiene: il riquadro della foto
   lo è, così lo zaino resta in proporzione alla polaroid e non alla bacheca. In alto c'è lo spazio
   per i libri che salgono. */
.journey__backpack-shot {
  display: block;
  margin: -0.3rem;
  padding: 1.2rem 0.5rem 0.2rem;
  container-type: inline-size;
}

.journey__backpack {
  width: 100%;
}

/* Tappa 4: oggi, il foglio con la foto davanti alla scuola e il badge del tirocinio appeso accanto. */
.journey__step--today .journey__cluster {
  width: min(100%, 27rem);
  padding-bottom: 3rem;
}

.journey__sheet {
  display: grid;
  grid-template-columns: 7.5rem minmax(0, 1fr);
  gap: 1.1rem;
  align-items: start;
  padding: 1.6rem 1.2rem 1.3rem;
  background: var(--paper);
  border-radius: 0.2rem;
  box-shadow: 0.45rem 0.8rem 0.9rem -0.35rem rgb(40 22 8 / 42%);
  rotate: 1.5deg;
}

.journey__photo {
  --taped-photo-padding: 0.25rem 0.25rem 0.9rem;
  --taped-photo-tape-width: 3rem;
  --taped-photo-tape-height: 1rem;
}

.journey__badge {
  position: absolute;
  top: 1.5rem;
  left: calc(100% - 1rem);
  z-index: 4;
  width: 6rem;
  font-size: 0.8rem;
}

.journey__lanyard {
  display: block;
  width: 3em;
  height: 9.9em;
  margin-inline: auto;
  overflow: visible;
  fill: none;
  stroke-linecap: round;
  filter: drop-shadow(0.2em 0.35em 0.2em rgb(40 22 8 / 30%));
}

.journey__lanyard-edge {
  stroke: #1f3f5f;
  stroke-width: 7;
}

.journey__lanyard-band {
  stroke: #33618f;
  stroke-width: 5.6;
}

.journey__lanyard-weave {
  stroke: rgb(255 255 255 / 30%);
  stroke-dasharray: 2 2;
  stroke-width: 0.8;
}

.journey__badge .journey__badge-pin {
  top: 0.5em;
  left: 50%;
}

/* Sul banco il badge era steso, in prospettiva e con il cordino a giro: qui pende dritto. */
.journey__badge .journey__badge-card {
  margin: -0.6em auto 0;
  transform: none;
  rotate: 4deg;
}

.journey__badge :deep(.badge__lanyard) {
  display: none;
}

/* In colonna, quando la bacheca è stretta: le tappe una sotto l'altra, le puntine del filo
   nell'angolo in alto a sinistra di ogni reperto e il filo che scende lungo il margine. */
@container (width < 46rem) {
  .journey__step {
    width: 100%;
    padding-left: 1.2rem;
  }

  .journey__step + .journey__step {
    margin-top: 4rem;
  }

  .journey__step:nth-child(odd) .journey__cluster {
    margin-left: 0;
  }

  .journey__step .journey__cluster {
    width: 100%;
  }

  .journey__step .journey__thread-pin,
  .journey__step:nth-child(odd) .journey__thread-pin {
    left: 0.3rem;
  }

  .journey__step--salon .journey__cluster {
    padding-bottom: 0;
  }

  .journey__step--salon .journey__note {
    top: 7.5rem;
    right: 0;
    left: auto;
    width: min(13rem, 72%);
    padding: 1.1rem 0.9rem 0.9rem;
  }

  /* La polaroid scende sotto l'agenda, a sinistra, e lascia il post-it scoperto. */
  .journey__step--salon .journey__polaroid {
    position: relative;
    top: auto;
    left: auto;
    margin: -3.5rem 0 0 0.6rem;
  }

  .journey__step--code .journey__note {
    top: 9rem;
    right: 0;
    width: min(13rem, 72%);
    padding: 1.2rem 0.9rem 0.85rem;
  }

  .journey__step--code .journey__cluster {
    padding-bottom: 7rem;
  }

  .journey__step--school .journey__cluster {
    padding-bottom: 0;
  }

  .journey__binder {
    width: min(100%, 16rem);
  }

  .journey__step--school .journey__polaroid {
    position: relative;
    top: auto;
    left: auto;
    width: 11rem;
    margin: -2.5rem 0 0 auto;
  }

  .journey__note .journey__text,
  .journey__binder-sheet .journey__text {
    font-size: 1rem;
    line-height: 1.38;
  }

  .journey__step--today .journey__cluster {
    padding-bottom: 13.5rem;
  }

  .journey__sheet {
    grid-template-columns: minmax(0, 1fr);
    rotate: 1deg;
  }

  .journey__photo {
    width: min(100%, 11rem);
  }

  /* Il badge pende dal sughero sotto il foglio. */
  .journey__badge {
    top: auto;
    bottom: 0;
    left: 3rem;
    font-size: 0.68rem;
  }
}

/* Con movimento ridotto la scrivania della Copertina non è una scena e ha già il suo bordo. */
@media (prefers-reduced-motion: reduce) {
  .journey__desk-end {
    display: none;
  }

  .journey {
    padding-top: var(--space-7);
  }
}

/* Ogni biglietto si scrive come a mano: la data, il titolo, poi il testo una riga dopo l'altra.
   --journey-ink va da 0 a 1 mentre il biglietto sale nello schermo; con le righe contate dallo
   script diventa la posizione della penna (--ink-pos, in righe). Le righe già scritte si vedono
   intere, quella in corso fino alla penna. Il margine di 0.4em lascia uscire le lettere a mano, ma
   solo sopra la prima riga e sotto l'ultima: fra due righe è di 0.1em, perché non spuntino le
   lettere della riga dopo. */
@property --journey-ink { syntax: "<number>"; inherits: false; initial-value: 1; }

@supports (animation-timeline: view()) and (top: round(up, 1.5px, 1px)) {
  @media (prefers-reduced-motion: no-preference) {
    .journey__writing {
      view-timeline: --journey-note block;
    }

    .journey__writing :is(.journey__when, .journey__name, .journey__text) {
      --ink-pos: clamp(0, var(--journey-ink) * var(--ink-total, 1) - var(--ink-from, 0), var(--ink-lines, 1));
      --ink-row: max(0, round(up, var(--ink-pos), 1) - 1);
      --ink-x: calc((var(--ink-pos) - var(--ink-row)) * (100% + 0.8em) - 0.4em);
      --ink-top: calc(var(--ink-row) * 1lh + min(var(--ink-row), 1) * 0.5em - 0.4em);
      --ink-bottom: calc(
        (var(--ink-row) + 1) * 1lh + 0.1em + clamp(0, var(--ink-row) + 2 - var(--ink-lines, 1), 1) * 0.3em
      );
      clip-path: polygon(
        -0.4em -0.4em,
        calc(100% + 0.4em) -0.4em,
        calc(100% + 0.4em) var(--ink-top),
        var(--ink-x) var(--ink-top),
        var(--ink-x) var(--ink-bottom),
        -0.4em var(--ink-bottom)
      );
      animation: journey-ink linear both;
      animation-timeline: --journey-note;
      animation-range: cover 28vh cover 60vh;
    }

    /* Le spunte sugli anni arrivano quando il testo è finito. */
    .journey__writing .journey__tick {
      animation: journey-tick linear both;
      animation-timeline: --journey-note;
      animation-range: cover 60vh cover 68vh;
    }
  }
}

@keyframes journey-ink {
  from {
    --journey-ink: 0;
  }

  to {
    --journey-ink: 1;
  }
}

@keyframes journey-tick {
  from {
    stroke-dashoffset: 1.02;
  }
}
</style>
