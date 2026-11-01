<template>
  <!-- Omaggio ai giochi stealth: una scatola di cartone sul pavimento, che sembra messa lì per caso.
       Passandoci sopra con il mouse, sopra la scatola scatta il punto esclamativo rosso dell'allerta.
       È disegnata da zero. Decorativa: la scatola è vista un po' dall'alto, con il coperchio e il
       fianco. Le misure sono in em. -->
  <div class="box" aria-hidden="true">
    <span class="box__alert">!</span>
    <span class="box__top"></span>
    <span class="box__front"><i>Fragile</i></span>
    <span class="box__side"></span>
  </div>
</template>

<style scoped>
.box {
  position: relative;
  width: 12em;
  height: 9.6em;
  font-size: 1rem;
  filter: drop-shadow(0.6em 0.6em 0.6em rgb(0 0 0 / 55%));
}

/* Il coperchio visto dall'alto, con le due falde che si toccano al centro e il nastro. */
.box__top {
  position: absolute;
  top: 0;
  left: 0;
  width: 10.5em;
  height: 2.4em;
  background:
    linear-gradient(90deg, transparent 0 46%, rgb(214 196 150 / 85%) 46% 54%, transparent 54%),
    linear-gradient(#c79a5f, #b48548);
  clip-path: polygon(14% 0, 100% 0, 86% 100%, 0 100%);
  translate: 1.5em 0;
}

.box__front {
  position: absolute;
  bottom: 0;
  left: 0;
  display: grid;
  place-items: center;
  width: 10.5em;
  height: 7.2em;
  background:
    linear-gradient(transparent 0 8%, rgb(214 196 150 / 85%) 8% 18%, transparent 18%),
    linear-gradient(90deg, rgb(0 0 0 / 8%), transparent 20% 80%, rgb(0 0 0 / 15%)),
    #a87a41;
}

.box__front i {
  padding: 0.15em 0.4em;
  color: #8d2b22;
  font-family: var(--font-code);
  font-size: 0.85em;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: 0.12em solid #8d2b22;
  rotate: -6deg;
}

/* Il fianco destro, in ombra. */
.box__side {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 1.5em;
  height: 9.6em;
  background: linear-gradient(#8a6230, #6e4c24);
  clip-path: polygon(0 25%, 100% 0, 100% 75%, 0 100%);
}

/* Il punto esclamativo dell'allerta: compare di scatto, con un piccolo rimbalzo, al centro del
   fronte. Le sue misure in em sono quelle del suo carattere, quattro volte più grande: per questo la
   posizione è in percentuale. */
.box__alert {
  position: absolute;
  bottom: calc(100% + 0.15em);
  left: 43.75%;
  color: #e3282b;
  font-family: var(--font-body);
  font-size: 4.4em;
  font-weight: 900;
  line-height: 1;
  text-shadow:
    0.04em 0.04em 0 #fff,
    -0.04em -0.04em 0 #fff,
    0.04em -0.04em 0 #fff,
    -0.04em 0.04em 0 #fff,
    0 0 0.3em rgb(227 40 43 / 60%);
  opacity: 0;
  scale: 0.4;
  translate: -50% 0;
  transform-origin: 50% 100%;
}

@media (hover: hover) and (pointer: fine) {
  .box:hover .box__alert {
    opacity: 1;
    scale: 1;
    transition: scale 260ms cubic-bezier(0.34, 1.8, 0.64, 1), opacity 60ms linear;
  }
}

@media (prefers-reduced-motion: reduce) {
  .box:hover .box__alert {
    transition: none;
  }
}
</style>
