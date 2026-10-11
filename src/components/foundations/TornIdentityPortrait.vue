<template>
  <figure class="identity-portrait">
    <span class="identity-portrait__clip identity-portrait__clip--left" aria-hidden="true"></span>
    <span class="identity-portrait__clip identity-portrait__clip--right" aria-hidden="true"></span>
    <div class="identity-portrait__image">
      <img
        src="@/assets/images/barber-developer-split.jpg"
        alt="Ritratto illustrato diviso da uno strappo: Giuseppe parrucchiere a sinistra e sviluppatore web con tuta da astronauta a destra."
        width="512"
        height="512"
        loading="lazy"
        decoding="async"
      />
    </div>
    <figcaption>
      <strong>Non due mondi: un cambio di direzione.</strong>
      <span>Dal lavoro di parrucchiere, che non sentivo mio, allo sviluppo web.</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.identity-portrait {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-3);
  width: min(100%, 34rem);
  margin: var(--space-6) auto 0;
  padding: clamp(0.65rem, 2vw, 1rem);
  background: var(--paper-warm);
  box-shadow: 0 0.8rem 1.6rem var(--shadow-paper);
  rotate: -0.5deg;
}

.identity-portrait__image {
  overflow: hidden;
  background: var(--ink-strong);
  border-radius: 0.18rem 0.28rem 0.16rem 0.22rem;
}

.identity-portrait img {
  width: 100%;
  height: auto;
  transition: transform var(--duration-short) var(--ease-out);
}

.identity-portrait__clip {
  position: absolute;
  top: -0.75rem;
  z-index: 1;
  width: 1.15rem;
  height: 2.4rem;
  border: 0.14rem solid #727b80;
  border-bottom: 0;
  border-radius: 0.6rem 0.6rem 0 0;
  box-shadow: inset 0.08rem 0 0 rgb(255 255 255 / 42%);
}

.identity-portrait__clip--left { left: 18%; rotate: -5deg; }
.identity-portrait__clip--right { right: 18%; rotate: 6deg; }

.identity-portrait figcaption {
  display: grid;
  gap: var(--space-1);
  padding: 0 var(--space-2) var(--space-1);
  text-align: left;
}

.identity-portrait figcaption strong {
  color: var(--pen-red);
  font-family: var(--font-hand);
  font-size: 1.25rem;
}

.identity-portrait figcaption span {
  color: var(--ink-soft);
  font-size: 0.82rem;
}

@media (hover: hover) and (pointer: fine) {
  .identity-portrait:hover img { transform: scale(1.015); }
}

@media (prefers-reduced-motion: reduce) {
  .identity-portrait img { transition: none; }
}
</style>
