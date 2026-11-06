<template>
  <!-- I Progetti sono un mondo aperto: la mappa di una città da videogioco, in cui ogni progetto che
       non è un capolavoro è un luogo. Scegliendolo, il navigatore traccia la strada da casa e la
       scheda della missione lo racconta: obiettivi (le tecniche) e ricompensa (i link). Gli strati
       della legenda filtrano fra quelli fatti a scuola e quelli per conto mio. I progetti ancora da
       scegliere sono missioni da sbloccare. La versione con le mensole è nel branch progetti-mensole.
       Testi in bozza. -->
  <div class="world">
    <header class="world__heading">
      <p class="world__kicker">Mappa del mondo</p>
      <h2 :id="headingId" class="world__title">Progetti</h2>
      <p class="world__subtitle">Ogni progetto è un luogo: sceglilo e il navigatore ti ci porta.</p>
    </header>

    <fieldset class="world__layers">
      <legend class="world__hidden">Mostra i progetti</legend>
      <label v-for="option in LAYERS" :key="option.id" class="layer">
        <input v-model="layer" type="radio" name="projects-layer" :value="option.id" />
        <span>
          <i class="layer__ring" :class="`layer__ring--${option.id}`" aria-hidden="true"></i>
          {{ option.label }}
          <small>{{ counts[option.id] }}</small>
        </span>
      </label>
    </fieldset>

    <p class="world__hidden" aria-live="polite">{{ announcement }}</p>

    <div class="world__board">
      <OpenWorldMap v-model="selected" class="world__map" :places="places" @trip="trip = $event" />

      <Transition name="mission-swap" mode="out-in">
        <article v-if="current" :key="current.slug" class="mission">
          <p class="mission__kicker">
            Missione {{ number(current) }} ·
            <template v-if="current.placeholder">In arrivo</template>
            <template v-else>
              {{ CONTEXTS[current.context] }} · <span class="mission__year">{{ current.schoolYear }}</span>
            </template>
          </p>
          <h3 class="mission__name">{{ current.placeholder ? 'Missione da sbloccare' : current.title }}</h3>
          <p class="mission__distance"><span aria-hidden="true">◆</span> {{ tripText }}</p>
          <p class="mission__summary">{{ current.summary }}</p>

          <h4 class="mission__heading">Obiettivi</h4>
          <ul class="mission__goals">
            <li v-for="technique in current.techniques" :key="technique">{{ technique }}</li>
          </ul>

          <h4 class="mission__heading">Ricompensa</h4>
          <p v-if="current.url || current.repo" class="mission__rewards">
            <a v-if="current.url" class="mission__reward" :href="current.url">
              Visita il sito<span class="world__hidden"> di {{ current.title }}</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a v-if="current.repo" class="mission__reward" :href="current.repo">
              Il codice<span class="world__hidden"> di {{ current.title }}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </p>
          <p v-else class="mission__locked">
            {{ current.placeholder ? 'Questa missione si sblocca presto.' : 'Ricompensa in arrivo.' }}
          </p>
        </article>
        <p v-else key="empty" class="mission mission--empty">In questo strato non ci sono ancora luoghi.</p>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import OpenWorldMap from '@/components/foundations/OpenWorldMap.vue'
import { LOTS } from '@/components/foundations/openWorldMap.js'
import { otherProjects } from '@/content/projects'
import { computed, ref, watch } from 'vue'

defineProps({
  headingId: { type: String, required: true },
})

const CONTEXTS = { scuola: 'A scuola', personale: 'Per conto mio' }
const LAYERS = [
  { id: 'tutti', label: 'Tutti' },
  { id: 'personale', label: 'Per conto mio' },
  { id: 'scuola', label: 'A scuola' },
]

// Un'unità della mappa vale sei metri: la distanza che mostra il navigatore.
const METERS_PER_UNIT = 6

// Ogni progetto ha il suo incrocio, nell'ordine della collezione, e il suo numero di missione: non
// cambiano con il filtro.
const lots = new Map(otherProjects.map((project, index) => [project.slug, LOTS[index % LOTS.length]]))
const number = project => String(otherProjects.indexOf(project) + 1).padStart(2, '0')

const layer = ref('tutti')
const visible = computed(() =>
  layer.value === 'tutti' ? otherProjects : otherProjects.filter(project => project.context === layer.value),
)
const counts = computed(() => ({
  tutti: otherProjects.length,
  personale: otherProjects.filter(project => project.context === 'personale').length,
  scuola: otherProjects.filter(project => project.context === 'scuola').length,
}))

const places = computed(() =>
  visible.value.map(project => ({
    id: project.slug,
    node: lots.get(project.slug),
    kind: project.placeholder ? 'locked' : (project.kind ?? 'site'),
    label: project.placeholder ? 'Missione da sbloccare' : project.title,
    tone: project.context,
  })),
)

// All'inizio la destinazione è il primo progetto vero; cambiando strato, se la destinazione non c'è
// più, diventa il primo luogo visibile.
const selected = ref((otherProjects.find(project => !project.placeholder) ?? otherProjects[0])?.slug ?? null)
watch(visible, (projects) => {
  if (!projects.some(project => project.slug === selected.value)) selected.value = projects[0]?.slug ?? null
})

const current = computed(() => visible.value.find(project => project.slug === selected.value) ?? null)

// La lunghezza del percorso, in unità della mappa, la dice la mappa: dipende da dove si trova la
// freccia quando si sceglie il luogo.
const trip = ref(0)
const tripText = computed(() => {
  if (trip.value <= 13) return 'Sei già qui'
  return `Percorso di ${Math.round((trip.value * METERS_PER_UNIT) / 10) * 10} m`
})

const announcement = computed(() => {
  if (!current.value) return 'Nessun luogo in questo strato'
  const name = current.value.placeholder ? 'missione da sbloccare' : current.value.title
  return `Destinazione: ${name}. ${tripText.value}`
})
</script>

<style scoped>
/* Il mondo di notte: un fondo blu scuro con la luce viola del navigatore e una griglia appena
   visibile, come lo schermo di un gioco. Comincia subito sotto i Capolavori, dalla cui porta
   d'uscita si esce nella notte. */
.world {
  position: relative;
  isolation: isolate;
  padding: clamp(4rem, 8vw, 6rem) var(--space-4) clamp(4.5rem, 9vw, 7rem);
  overflow-x: clip;
  color: var(--map-mark);
  background:
    radial-gradient(ellipse 60% 40% at 30% 55%, rgb(214 76 216 / 12%), transparent 70%),
    var(--map-night);
  container-type: inline-size;
}

/* La griglia compare piano dall'alto, così la notte fuori dal museo diventa lo schermo del gioco. */
.world::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(rgb(255 255 255 / 3%) 1px, transparent 1px) 0 0 / 2rem 2rem,
    linear-gradient(90deg, rgb(255 255 255 / 3%) 1px, transparent 1px) 0 0 / 2rem 2rem;
  z-index: -1;
  mask-image: linear-gradient(transparent, #000 14rem);
  pointer-events: none;
}

.world__heading {
  margin-bottom: var(--space-5);
  text-align: center;
}

.world__kicker {
  margin: 0 0 var(--space-2);
  color: var(--map-route);
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.world__title {
  margin: 0 -0.2em 0 0;
  font-family: var(--font-body);
  font-size: clamp(2.25rem, 6.5cqw, 4.5rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-shadow: 0 0.12em 0 rgb(0 0 0 / 45%);
}

.world__subtitle {
  margin: var(--space-3) 0 0;
  color: rgb(244 241 234 / 75%);
  font-size: 0.95rem;
}

/* Gli strati della legenda: radio veri, con l'anello del colore dei luoghi. */
.world__layers {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
  margin: 0 auto clamp(2.5rem, 5cqw, 3.5rem);
  padding: 0;
  border: 0;
}

.layer {
  position: relative;
}

.layer input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.layer > span {
  display: inline-flex;
  gap: 0.5em;
  align-items: center;
  min-height: 2.75rem;
  padding: 0.5rem 1rem;
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: rgb(17 22 27 / 88%);
  border: 0.12rem solid rgb(255 255 255 / 30%);
  border-radius: 999px;
  cursor: pointer;
}

.layer small {
  font-size: 0.9em;
  font-weight: 600;
  opacity: 0.7;
}

.layer__ring {
  width: 0.8rem;
  height: 0.8rem;
  border: 0.15rem solid var(--map-mark);
  border-radius: 50%;
}

.layer__ring--tutti {
  border-color: var(--map-mark) var(--map-highway) var(--map-highway) var(--map-mark);
}

.layer__ring--scuola {
  border-color: var(--map-highway);
}

.layer input:checked + span {
  border-color: var(--map-route);
  box-shadow: 0 0 0.7rem rgb(214 76 216 / 45%);
}

.layer input:focus-visible + span {
  outline: 0.2rem solid var(--map-focus);
  outline-offset: 0.2rem;
}

.world__board {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(16rem, 1fr);
  gap: clamp(1.5rem, 4cqw, 3rem);
  align-items: center;
  width: min(100%, 64rem);
  margin: 0 auto;
}

/* La scheda della missione, come nei menu dei giochi: fondo scuro, cornice chiara, il titolo in
   grande e due elenchi. */
.mission {
  margin: 0;
  padding: 1.5rem 1.4rem 1.4rem;
  font-family: var(--font-body);
  background: rgb(17 22 27 / 92%);
  border: 0.15rem solid rgb(255 255 255 / 85%);
  border-radius: 1rem;
  box-shadow: 0 1rem 2rem rgb(0 0 0 / 45%);
}

.mission--empty {
  color: rgb(244 241 234 / 75%);
  font-style: italic;
}

.mission__kicker {
  margin: 0 0 0.5rem;
  color: var(--map-route);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.mission__year {
  white-space: nowrap;
}

.mission__name {
  margin: 0;
  font-size: 1.7rem;
  font-weight: 800;
  line-height: 1.15;
}

.mission__distance {
  margin: 0.4rem 0 0.9rem;
  color: var(--map-highway);
  font-size: 0.85rem;
  font-weight: 700;
}

.mission__summary {
  margin: 0;
  color: rgb(244 241 234 / 85%);
  font-size: 0.95rem;
  line-height: 1.55;
}

.mission__heading {
  margin: 1.1rem 0 0.45rem;
  padding-top: 0.8rem;
  color: rgb(244 241 234 / 60%);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  border-top: 1px solid rgb(255 255 255 / 14%);
}

/* Gli obiettivi hanno la casella da spuntare, come la lista di una missione. */
.mission__goals {
  display: grid;
  gap: 0.35rem;
  margin: 0;
  padding: 0;
  font-size: 0.9rem;
  list-style: none;
}

.mission__goals li {
  display: flex;
  gap: 0.6rem;
  align-items: center;
}

.mission__goals li::before {
  content: "";
  flex: none;
  width: 0.8rem;
  height: 0.8rem;
  border: 0.13rem solid rgb(244 241 234 / 70%);
  border-radius: 0.15rem;
}

.mission__rewards {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 0;
}

.mission__reward {
  display: inline-flex;
  gap: 0.4rem;
  align-items: center;
  min-height: 2.75rem;
  padding: 0.5rem 1rem;
  color: var(--map-pin);
  font-size: 0.9rem;
  font-weight: 800;
  text-decoration: none;
  background: var(--map-mark);
  border-radius: 999px;
}

.mission__reward:focus-visible {
  outline: 0.2rem solid var(--map-focus);
  outline-offset: 0.2rem;
}

.mission__locked {
  margin: 0;
  color: rgb(244 241 234 / 70%);
  font-size: 0.9rem;
  font-style: italic;
}

.world__hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

@media (hover: hover) and (pointer: fine) {
  .layer:hover > span {
    border-color: rgb(255 255 255 / 70%);
  }

  .mission__reward:hover {
    background: #fff;
  }
}

@container (width < 52rem) {
  .world__board {
    grid-template-columns: minmax(0, 1fr);
    width: min(100%, 34rem);
  }
}

/* Cambiando destinazione la scheda svanisce e la nuova compare salendo appena; con movimento
   ridotto cambia e basta. */
.mission-swap-leave-active {
  transition: opacity var(--duration-fast) var(--ease-in);
}

.mission-swap-enter-active {
  transition: opacity 280ms var(--ease-out), translate 280ms var(--ease-out);
}

.mission-swap-leave-to,
.mission-swap-enter-from {
  opacity: 0;
}

.mission-swap-enter-from {
  translate: 0 0.5rem;
}

@media (prefers-reduced-motion: reduce) {
  .mission-swap-leave-active,
  .mission-swap-enter-active {
    transition: none;
  }
}
</style>
