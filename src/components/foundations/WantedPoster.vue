<template>
  <!-- Omaggio ai western: un manifesto "Wanted" inchiodato alla parete, con il ritratto a matita di
       Giuseppe virato seppia, il reato e la taglia. È disegnato da zero e non riprende grafiche di
       nessun gioco. Decorativo. Le misure sono in em. -->
  <div class="wanted" aria-hidden="true">
    <span class="wanted__nail"></span>
    <p class="wanted__title">Wanted</p>
    <p class="wanted__subtitle">Vivo o in videochiamata</p>
    <span class="wanted__portrait">
      <img src="@/assets/images/giuseppe-ritratto-zaino.webp" alt="" width="400" height="492" loading="lazy" decoding="async" />
    </span>
    <p class="wanted__name">Giuseppe Pentrelli</p>
    <p class="wanted__crime">per crimini contro i &lt;div&gt;</p>
    <p class="wanted__reward">Taglia <b>$404</b></p>
  </div>
</template>

<style scoped>
/* Carta ingiallita con le macchie, i bordi più scuri e un angolo strappato. */
.wanted {
  position: relative;
  display: grid;
  justify-items: center;
  width: 12em;
  padding: 1.1em 0.9em 0.9em;
  color: #3b2614;
  font-family: Rockwell, "Roboto Slab", Georgia, "Times New Roman", serif;
  font-size: 1rem;
  text-align: center;
  background:
    radial-gradient(circle at 20% 80%, rgb(120 70 20 / 22%), transparent 30%),
    radial-gradient(circle at 85% 15%, rgb(120 70 20 / 18%), transparent 25%),
    radial-gradient(ellipse at 50% 50%, transparent 55%, rgb(110 62 18 / 45%)),
    #e7cf9f;
  clip-path: polygon(0 1%, 96% 0, 100% 4%, 99% 100%, 8% 99%, 3% 93%, 0 95%);
  filter: drop-shadow(0.3em 0.5em 0.4em rgb(0 0 0 / 55%));
  rotate: -3deg;
}

.wanted p {
  margin: 0;
  line-height: 1;
}

.wanted__nail {
  position: absolute;
  top: 0.4em;
  left: 50%;
  width: 0.55em;
  height: 0.55em;
  background: radial-gradient(circle at 35% 30%, #d8d2c4, #5c554a);
  border-radius: 50%;
  translate: -50% 0;
}

.wanted__title {
  font-size: 2.05em;
  font-weight: 900;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.wanted__subtitle {
  margin-top: 0.35em !important;
  padding-block: 0.25em;
  font-size: 0.62em;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-block: 0.12em solid currentcolor;
}

/* Il ritratto stampato: virato seppia, con la cornice di inchiostro. */
.wanted__portrait {
  display: block;
  width: 6.6em;
  height: 7em;
  margin-block: 0.55em 0.45em;
  overflow: hidden;
  border: 0.15em solid #3b2614;
}

.wanted__portrait img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 20%;
  filter: sepia(1) contrast(1.15) brightness(0.92);
  mix-blend-mode: multiply;
}

.wanted__name {
  font-size: 0.74em;
  font-weight: 900;
  text-transform: uppercase;
}

.wanted__crime {
  margin-top: 0.3em !important;
  font-family: var(--font-code);
  font-size: 0.62em;
}

.wanted__reward {
  margin-top: 0.4em !important;
  font-size: 0.75em;
  font-weight: 700;
  text-transform: uppercase;
}

.wanted__reward b {
  font-size: 1.7em;
  font-weight: 900;
}
</style>
