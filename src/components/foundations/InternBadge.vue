<template>
  <!-- Il badge del tirocinio è appoggiato sul banco: tesserino nella custodia di plastica, clip di
       metallo e cordino che fa un giro, come i fili delle tappe prima. -->
  <div class="badge" aria-hidden="true">
    <svg class="badge__lanyard" viewBox="0 0 120 160">
      <path class="badge__lanyard-edge" :d="lanyard" />
      <path class="badge__lanyard-band" :d="lanyard" />
      <path class="badge__lanyard-weave" :d="lanyard" />
    </svg>

    <div class="badge__holder">
      <span class="badge__slot"></span>
      <div class="badge__card">
        <span class="badge__band">{{ label }}</span>
        <span class="badge__photo">
          <img src="@/assets/images/giuseppe-ritratto-zaino.webp" alt="" width="400" height="492" decoding="async" />
        </span>
        <strong class="badge__name">{{ name }}</strong>
        <span class="badge__role">{{ role }}</span>
        <span class="badge__barcode"></span>
      </div>
    </div>

    <span class="badge__clip"></span>
  </div>
</template>

<script setup>
defineProps({
  name: { type: String, default: 'Giuseppe Pentrelli' },
  role: { type: String, default: 'Sviluppatore web' },
  label: { type: String, default: 'Tirocinio' },
})

// Il cordino parte dalla clip, fa un largo giro sul banco e torna alla clip.
const lanyard = 'M66 152C52 120 14 104 16 62 18 22 74 6 98 32 120 56 96 98 74 152'
</script>

<style scoped>
/* Le misure sono in em: cambiando font-size il badge si rimpicciolisce tutto insieme. */
.badge {
  position: relative;
  width: 6.4em;
  font-family: var(--font-body);
  transform: perspective(40em) rotateX(12deg) rotateY(-14deg) rotateZ(7deg);
}

/* Il giro del cordino si stende a sinistra, sul banco, senza coprire ciò che sta sopra il badge. */
.badge__lanyard {
  position: absolute;
  bottom: calc(100% - 1.6em);
  left: -0.9em;
  width: 7em;
  max-width: none;
  height: 9.3em;
  transform-origin: 58% 95%;
  rotate: -72deg;
  overflow: visible;
  fill: none;
  stroke-linecap: round;
  filter: drop-shadow(0.25em 0.35em 0.2em rgb(47 36 24 / 30%));
}

.badge__lanyard-edge {
  stroke: #1f3f5f;
  stroke-width: 11;
}

.badge__lanyard-band {
  stroke: #33618f;
  stroke-width: 9;
}

.badge__lanyard-weave {
  stroke: rgb(255 255 255 / 30%);
  stroke-dasharray: 3 3;
  stroke-width: 1.2;
}

/* La custodia: plastica trasparente con lo spessore visibile e un riflesso. */
.badge__holder {
  position: relative;
  padding: 1.5em 0.42em 0.42em;
  background: rgb(240 245 248 / 55%);
  border: 0.1em solid rgb(255 255 255 / 70%);
  border-radius: 0.5em;
  box-shadow:
    0.07em 0.1em 0 rgb(214 222 228 / 90%),
    0.14em 0.2em 0 rgb(176 188 198 / 85%),
    0.21em 0.3em 0 rgb(150 162 172 / 80%),
    0.6em 0.9em 0.8em rgb(47 36 24 / 38%);
}

.badge__holder::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(125deg, rgb(255 255 255 / 55%) 0 18%, transparent 34% 62%, rgb(255 255 255 / 22%) 74%, transparent 86%);
  border-radius: inherit;
  pointer-events: none;
}

.badge__slot {
  position: absolute;
  top: 0.55em;
  left: 50%;
  width: 1.9em;
  height: 0.42em;
  background: rgb(80 70 55 / 35%);
  border-radius: 0.21em;
  box-shadow: inset 0 0.08em 0.1em rgb(0 0 0 / 30%);
  translate: -50% 0;
}

.badge__card {
  display: grid;
  justify-items: center;
  gap: 0.28em;
  padding-bottom: 0.5em;
  overflow: hidden;
  color: var(--ink-strong);
  text-align: center;
  background: #fbfaf6;
  border-radius: 0.3em;
}

.badge__band {
  width: 100%;
  padding: 0.3em 0;
  color: #fff;
  font-size: 0.62em;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background: #33618f;
}

/* Il ritratto è a matita come quello della Copertina: qui si vede solo il viso. */
.badge__photo {
  width: 3.2em;
  aspect-ratio: 3 / 4;
  margin-top: 0.2em;
  overflow: hidden;
  background: #eceae2;
  border: 0.08em solid #d5d2c6;
  border-radius: 0.2em;
}

.badge__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(2.1);
  transform-origin: 42% 19%;
}

.badge__name {
  font-size: 0.6em;
  font-weight: 800;
  line-height: 1.15;
}

.badge__role {
  margin-top: -0.2em;
  color: var(--ink-soft);
  font-size: 0.5em;
  font-weight: 700;
}

.badge__barcode {
  width: 70%;
  height: 0.7em;
  margin-top: 0.15em;
  background: repeating-linear-gradient(
    90deg,
    #2b2a26 0 0.06em,
    transparent 0.06em 0.12em,
    #2b2a26 0.12em 0.22em,
    transparent 0.22em 0.28em,
    #2b2a26 0.28em 0.31em,
    transparent 0.31em 0.4em
  );
}

/* La clip di metallo che tiene il cordino. */
.badge__clip {
  position: absolute;
  top: -0.9em;
  left: 50%;
  width: 1.1em;
  height: 1.8em;
  background: linear-gradient(90deg, #6f7a83, #f4f6f7 45%, #a7b0b7 60%, #5d666e);
  border-radius: 0.5em 0.5em 0.25em 0.25em;
  box-shadow: 0.12em 0.2em 0.2em rgb(0 0 0 / 35%);
  translate: -50% 0;
}

.badge__clip::after {
  content: "";
  position: absolute;
  top: 0.25em;
  left: 50%;
  width: 0.5em;
  height: 0.5em;
  background: #3a4248;
  border-radius: 50%;
  translate: -50% 0;
}
</style>
