<template>
  <!-- Una cornice appesa alla parete della mostra: filo a V e chiodo, cornice di legno, passe-partout
       e l'opera, che arriva dallo slot. Mentre entra nello schermo si accende la luce che la illumina.
       Con `lamp` ha la sua lampada da quadro in ottone, come l'opera principale; con `covered` l'opera
       è ancora imballata, con il cartello "Opera in allestimento". È decorativa: quello che dice
       l'opera sta nel suo cartellino. -->
  <div
    class="artwork"
    :class="{ 'artwork--lamp': lamp, 'artwork--covered': covered }"
    :style="{ '--ratio': ratio }"
    aria-hidden="true"
  >
    <span class="artwork__light"></span>
    <svg class="artwork__wire" viewBox="0 0 100 40" preserveAspectRatio="none">
      <path d="M14 40 50 2 86 40" />
    </svg>
    <span class="artwork__nail"></span>

    <div class="artwork__frame">
      <div class="artwork__mat">
        <div class="artwork__canvas"><slot /></div>
      </div>
      <div v-if="covered" class="artwork__cover">
        <span>Opera in allestimento</span>
      </div>
      <span class="artwork__shade"></span>
    </div>

    <span v-if="lamp" class="artwork__lamp"></span>
  </div>
</template>

<script setup>
defineProps({
  ratio: { type: String, default: '4 / 5' },
  lamp: { type: Boolean, default: false },
  covered: { type: Boolean, default: false },
})
</script>

<style scoped>
.artwork {
  --frame-size: 0.75rem;
  position: relative;
  isolation: isolate;
  container-type: inline-size;
}

.artwork--lamp {
  --frame-size: 1rem;
}

/* La pozza di luce del faretto sulla parete, più forte in alto, dove arriva il fascio. La sfumatura
   arriva a zero sui bordi del riquadro (closest-side), così la luce non ha spigoli. */
.artwork__light {
  position: absolute;
  inset: -38% -30% -22%;
  z-index: -1;
  background: radial-gradient(
    closest-side at 50% 42%,
    rgb(var(--gallery-light) / 30%),
    rgb(var(--gallery-light) / 10%) 60%,
    transparent
  );
  pointer-events: none;
}

.artwork__wire {
  position: absolute;
  bottom: calc(100% - 0.6rem);
  left: 0;
  z-index: -1;
  width: 100%;
  height: 2.6rem;
  overflow: visible;
  fill: none;
  stroke: rgb(20 24 22 / 60%);
  stroke-width: 1px;
  vector-effect: non-scaling-stroke;
}

.artwork__nail {
  position: absolute;
  bottom: calc(100% + 1.62rem);
  left: 50%;
  z-index: -1;
  width: 0.5rem;
  height: 0.5rem;
  background: radial-gradient(circle at 35% 30%, #e2ddd1, #6d6658);
  border-radius: 50%;
  box-shadow: 0.1rem 0.18rem 0.15rem rgb(0 0 0 / 45%);
  translate: -50% 0;
}

/* Legno chiaro, con la luce dall'alto a sinistra: lo spigolo interno fa ombra sul passe-partout. */
.artwork__frame {
  position: relative;
  padding: var(--frame-size);
  background:
    linear-gradient(135deg, rgb(255 240 210 / 34%), transparent 30% 70%, rgb(40 20 5 / 26%)),
    repeating-linear-gradient(90deg, rgb(90 55 20 / 8%) 0 1px, transparent 1px 7px),
    var(--gallery-frame);
  box-shadow:
    inset 0 0 0 1px rgb(60 35 10 / 35%),
    inset 0.22rem 0.22rem 0.25rem rgb(255 236 200 / 28%),
    inset -0.22rem -0.22rem 0.3rem rgb(60 35 10 / 38%),
    0.6rem 1.3rem 1.6rem -0.4rem rgb(0 0 0 / 55%);
}

/* Il passe-partout: margine in proporzione alla cornice e taglio a 45° chiaro attorno all'opera. */
.artwork__mat {
  padding: 9%;
  background: var(--gallery-mat);
  box-shadow: inset 0.15rem 0.2rem 0.4rem rgb(0 0 0 / 24%);
}

.artwork__canvas {
  aspect-ratio: var(--ratio);
  overflow: clip;
  background: #fff;
  box-shadow:
    0 0 0 0.22rem #fffefa,
    0 0 0 0.26rem rgb(0 0 0 / 9%);
}

.artwork__canvas > :slotted(*) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* La penombra prima che si accenda la luce. */
.artwork__shade {
  position: absolute;
  inset: 0;
  background: rgb(10 18 16 / 46%);
  opacity: 0;
  pointer-events: none;
}

/* L'opera ancora imballata: carta da pacchi con le pieghe, nastro e il cartello. */
.artwork__cover {
  position: absolute;
  inset: calc(var(--frame-size) * 0.6);
  display: grid;
  place-items: center;
  background:
    linear-gradient(118deg, transparent 0 31%, rgb(255 255 255 / 14%) 32% 33.5%, transparent 34.5% 61%, rgb(0 0 0 / 11%) 62% 63%, transparent 64%),
    linear-gradient(205deg, transparent 0 46%, rgb(0 0 0 / 9%) 47% 48%, transparent 49%),
    linear-gradient(160deg, #cfae7c, #b8925f);
}

.artwork__cover span {
  position: relative;
  padding: 0.7em 0.9em;
  color: var(--graphite);
  font-family: var(--font-body);
  font-size: clamp(0.6rem, 7cqw, 0.95rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: 0.14em;
  text-align: center;
  text-transform: uppercase;
  background: var(--gallery-label);
  box-shadow: 0.2rem 0.35rem 0.4rem rgb(40 25 10 / 30%);
  rotate: -3deg;
}

/* Due strisce di nastro di carta tengono il cartello. */
.artwork__cover span::before,
.artwork__cover span::after {
  content: "";
  position: absolute;
  top: -0.5em;
  width: 2.4em;
  height: 1em;
  background: var(--paper-tape);
}

.artwork__cover span::before {
  left: -0.6em;
  rotate: -28deg;
}

.artwork__cover span::after {
  right: -0.6em;
  rotate: 24deg;
}

/* La lampada da quadro: una barra d'ottone sul braccio, con il fascio che scende sull'opera. */
.artwork__lamp {
  position: absolute;
  top: -2.5rem;
  left: 50%;
  width: 36%;
  height: 0.9rem;
  background: linear-gradient(#ecd197, var(--gallery-brass) 50%, #7c5a25);
  border-radius: 0.45rem 0.45rem 0.6rem 0.6rem;
  box-shadow: 0 0.45rem 0.6rem rgb(0 0 0 / 38%);
  translate: -50% 0;
}

.artwork__lamp::before {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  z-index: -1;
  width: 0.35rem;
  height: 1.8rem;
  background: linear-gradient(90deg, #8a6a33, #dcbd7a, #8a6a33);
  translate: -50% 0;
}

.artwork__lamp::after {
  content: "";
  position: absolute;
  top: 70%;
  left: -40%;
  width: 180%;
  height: 11rem;
  background: radial-gradient(farthest-side at 50% 0, rgb(var(--gallery-light) / 40%), transparent);
  clip-path: polygon(36% 0, 64% 0, 100% 100%, 0 100%);
  pointer-events: none;
}

/* Dove il browser lo permette e il movimento non è ridotto, la luce si accende mentre l'opera sale
   nello schermo; altrove è già accesa. */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .artwork {
      view-timeline: --artwork block;
    }

    .artwork__light,
    .artwork__lamp::after {
      animation: artwork-light linear both;
      animation-timeline: --artwork;
      animation-range: cover 12vh cover 42vh;
    }

    .artwork__shade {
      animation: artwork-shade linear both;
      animation-timeline: --artwork;
      animation-range: cover 12vh cover 42vh;
    }
  }
}

@keyframes artwork-light {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes artwork-shade {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>
