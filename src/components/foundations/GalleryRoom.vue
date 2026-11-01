<template>
  <!-- Una sala della mostra, a tutta larghezza: parete intonacata del colore che le si passa, cornicione
       in alto con la sua ombra, battiscopa in basso e il nome della sala in lettere sulla parete. Le
       sale si susseguono con un tratto di corridoio fra l'una e l'altra. È un container: chi ci sta
       dentro può misurarsi su di lei. -->
  <div class="room" :style="{ '--room-wall': wall }">
    <header class="room__heading">
      <h2 :id="headingId" class="room__title">{{ title }}</h2>
      <p v-if="subtitle" class="room__subtitle">{{ subtitle }}</p>
    </header>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  headingId: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  wall: { type: String, default: 'var(--gallery-wall)' },
})
</script>

<style scoped>
/* overflow-x: clip taglia ciò che sporge ai lati (mensole, luci) senza creare un contenitore di
   scorrimento, che fermerebbe le animazioni legate allo scorrimento delle opere. */
.room {
  position: relative;
  margin-top: var(--space-8);
  padding: clamp(4.5rem, 9vw, 7rem) var(--space-4) clamp(5.5rem, 10vw, 8rem);
  overflow-x: clip;
  color: var(--gallery-lettering);
  background:
    linear-gradient(rgb(0 0 0 / 30%), transparent 8rem),
    linear-gradient(transparent calc(100% - 10rem), rgb(0 0 0 / 20%)),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='p' x='0' y='0' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' seed='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .45 -.19'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23p)'/%3E%3C/svg%3E"),
    var(--room-wall);
  background-size: auto, auto, 220px 220px, auto;
  container-type: inline-size;
}

.room::before,
.room::after {
  content: "";
  position: absolute;
  inset-inline: 0;
}

.room::before {
  top: 0;
  height: 1rem;
  background: linear-gradient(#f4efe4, #ddd5c5 55%, #b3aa98);
  box-shadow: 0 0.35rem 0.7rem rgb(0 0 0 / 38%);
}

.room::after {
  bottom: 0;
  height: 1.5rem;
  background: linear-gradient(#f1ebdf 0 12%, #d9d1c1 13% 100%);
  box-shadow: 0 -0.2rem 0.5rem rgb(0 0 0 / 28%);
}

.room__heading {
  margin-bottom: clamp(4rem, 9cqw, 6.5rem);
  text-align: center;
}

.room__title {
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(2.25rem, 6.5cqw, 4.5rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.26em;
  text-transform: uppercase;

  /* La spaziatura aggiunge spazio anche dopo l'ultima lettera: questo lo compensa. */
  margin-right: -0.26em;
}

.room__subtitle {
  margin: var(--space-3) 0 0;
  color: rgb(239 232 216 / 78%);
  font-size: 0.9rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
</style>
