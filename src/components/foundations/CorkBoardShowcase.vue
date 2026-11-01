<template>
  <section class="board-lab" aria-labelledby="board-title">
    <header class="board-lab__heading">
      <h2 id="board-title">Bacheca</h2>
      <p>
        La superficie del Percorso: cornice di legno, sughero, puntine e un filo rosso che va da una puntina
        con <code>thread</code> alla successiva e si tende mentre scorri. Per gli oggetti che non si appendono
        c'è la polaroid.
      </p>
    </header>

    <CorkBoard class="board-lab__board">
      <div class="board-lab__items">
        <div class="board-lab__item board-lab__item--left">
          <BoardPin class="board-lab__thread-pin" thread />
          <p class="board-lab__note">Un post-it appuntato</p>
        </div>

        <div class="board-lab__item board-lab__item--low">
          <BoardPin class="board-lab__thread-pin" thread />
          <PolaroidPhoto caption="i ferri del mestiere" :tilt="4" pin="">
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

        <div class="board-lab__item board-lab__item--right">
          <BoardPin class="board-lab__thread-pin" thread />
          <p class="board-lab__card">Una scheda a righe</p>
        </div>

        <div class="board-lab__pins" aria-hidden="true">
          <BoardPin v-for="color in ['red', 'blue', 'green', 'yellow']" :key="color" :color="color" />
        </div>
      </div>
    </CorkBoard>
  </section>
</template>

<script setup>
import BoardPin from './BoardPin.vue'
import CorkBoard from './CorkBoard.vue'
import PolaroidPhoto from './PolaroidPhoto.vue'
</script>

<style scoped>
.board-lab {
  width: min(100%, var(--content-width));
  margin: var(--space-8) auto 0;
}

.board-lab__heading {
  display: grid;
  gap: var(--space-2);
  margin-bottom: var(--space-5);
}

.board-lab__heading h2 {
  color: var(--ink-strong);
  font-family: var(--font-hand);
  font-size: clamp(2rem, 5vw, 3.4rem);
  line-height: 1.08;
}

.board-lab__heading p {
  max-width: 68ch;
  color: var(--ink-soft);
}

.board-lab__items {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem 4rem;
  align-items: flex-start;
  justify-content: center;
}

.board-lab__item {
  position: relative;
}

.board-lab__item--low {
  margin-top: 5rem;
}

/* Le puntine del filo stanno negli angoli verso il centro, così il filo non passa sui testi. */
.board-lab__item .board-lab__thread-pin {
  top: 0.6rem;
  left: 50%;
}

.board-lab__item--left .board-lab__thread-pin {
  left: calc(100% - 1.4rem);
}

.board-lab__item--right .board-lab__thread-pin {
  left: 1.4rem;
}

.board-lab__note,
.board-lab__card {
  margin: 0;
  color: var(--ink-strong);
  font-family: var(--font-hand);
  font-size: 1.25rem;
}

.board-lab__note {
  width: 11rem;
  padding: 2rem 1rem 1.5rem;
  background: var(--tab-yellow);
  box-shadow: 0.48rem 0.72rem 0.85rem -0.28rem rgb(47 36 24 / 48%);
  rotate: -3deg;
}

.board-lab__card {
  width: 13rem;
  padding: 1.8rem 1rem 1.2rem;
  background:
    repeating-linear-gradient(transparent 0 1.45rem, var(--line-blue) 1.45rem 1.5rem),
    var(--paper);
  box-shadow: 0.35rem 0.6rem 0.7rem -0.25rem rgb(40 22 8 / 42%);
  rotate: 2deg;
}

/* Le quattro puntine, una accanto all'altra. */
.board-lab__pins {
  position: relative;
  flex-basis: 100%;
  height: 1.5rem;
}

.board-lab__pins > :nth-child(1) { top: 50%; left: calc(50% - 3rem); }
.board-lab__pins > :nth-child(2) { top: 50%; left: calc(50% - 1rem); }
.board-lab__pins > :nth-child(3) { top: 50%; left: calc(50% + 1rem); }
.board-lab__pins > :nth-child(4) { top: 50%; left: calc(50% + 3rem); }
</style>
