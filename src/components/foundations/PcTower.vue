<template>
  <!-- Il PC a terra, sotto la scrivania, decorativo. Sta a destra del centro della stanza, quindi se
       ne vede il fianco sinistro, di vetro, che si allontana verso il centro: dietro il vetro ci sono
       tre ventole RGB. Le misure sono in em. -->
  <div class="tower" aria-hidden="true">
    <span class="tower__side">
      <i class="tower__fan"></i>
      <i class="tower__fan"></i>
      <i class="tower__fan"></i>
    </span>
    <span class="tower__front">
      <i class="tower__button"></i>
    </span>
  </div>
</template>

<style scoped>
.tower {
  display: flex;
  align-items: stretch;
  height: 16em;
  font-size: 1rem;
  filter: drop-shadow(0 0 2em rgb(139 92 255 / 35%));
}

/* Il fianco ruota attorno allo spigolo che lo unisce al fronte: la parte lontana si rimpicciolisce,
   e la sua scatola resta larga quanto prima, vuota a sinistra. */
.tower__side {
  display: grid;
  gap: 0.6em;
  align-content: center;
  justify-items: center;
  width: 8em;
  padding: 0.6em;
  background: linear-gradient(135deg, rgb(255 255 255 / 12%), transparent 40%), #080a0c;
  border: 0.35em solid #15181b;
  transform: perspective(26em) rotateY(-58deg);
  transform-origin: 100% 50%;
}

.tower__fan {
  width: 4.2em;
  height: 4.2em;
  background:
    radial-gradient(circle, #15181b 0 28%, transparent 30%),
    repeating-conic-gradient(rgb(255 255 255 / 10%) 0 8deg, transparent 8deg 40deg),
    radial-gradient(circle, transparent 0 58%, #0b0d0f 60% 68%, transparent 70%),
    conic-gradient(#36d6ff, #8b5cff, #ff4fb8, #ffb547, #5dff9b, #36d6ff);
  border-radius: 50%;
  box-shadow: 0 0 1.2em rgb(139 92 255 / 55%);
}

/* Il fronte, stretto: griglia di aerazione e tasto d'accensione. */
.tower__front {
  position: relative;
  width: 3.4em;
  background:
    repeating-linear-gradient(transparent 0 0.35em, rgb(255 255 255 / 5%) 0.35em 0.45em),
    linear-gradient(90deg, #1b1f23, #2b3036 50%, #15181b);
  border-radius: 0.2em;
  box-shadow: 0.4em 0.6em 1em rgb(0 0 0 / 60%);
}

.tower__button {
  position: absolute;
  top: 1em;
  left: 50%;
  width: 0.55em;
  height: 0.55em;
  background: var(--lab-neon);
  border-radius: 50%;
  box-shadow: 0 0 0.4em var(--lab-neon);
  translate: -50% 0;
}
</style>
