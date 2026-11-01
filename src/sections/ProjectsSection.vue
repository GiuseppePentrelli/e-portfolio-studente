<template>
  <!-- La seconda sala della mostra: più raccolta, con la parete rossa. Qui stanno tutti i progetti che
       non sono capolavori, fatti a scuola o per conto mio: le opere non sono appese ma appoggiate su
       mensole, in cornici sottili e un po' storte, come in uno studio. La sala ne mostra tre alla
       volta, su una mensola sola, con un filtro e i comandi per passare alle altre: l'indice completo, con i filtri
       per anno e tecnologia, sarà la pagina /progetti. I dati sono in src/content/projects.js. Testi
       della sala in bozza. -->
  <GalleryRoom
    :heading-id="headingId"
    title="Progetti"
    subtitle="Sala 2 · A scuola e per conto mio"
    wall="var(--gallery-wall-second)"
  >
    <fieldset class="plaques">
      <legend class="projects__hidden">Mostra i progetti</legend>
      <label v-for="option in FILTERS" :key="option.id" class="plaque">
        <input v-model="filter" type="radio" name="projects-filter" :value="option.id" />
        <span>{{ option.label }} <small>{{ counts[option.id] }}</small></span>
      </label>
    </fieldset>

    <div ref="stage" class="shelves-stage">
      <Transition name="shelves-fade" mode="out-in" @before-leave="holdHeight" @after-enter="releaseHeight">
        <ul v-if="visible.length" :key="`${filter}-${page}`" class="shelves">
          <li
            v-for="project in visible"
            :key="project.slug"
            class="shelves__item"
            :style="frameStyle(project)"
          >
            <div class="shelves__stand">
              <GalleryFrame
                class="shelves__frame"
                :ratio="RATIOS[position(project) % RATIOS.length]"
                :finish="position(project) % 2 ? 'black' : 'wood'"
                :hang="false"
              >
                <PlaceholderArtwork v-if="project.placeholder" :kind="project.preview" />
                <img v-else :src="project.image" alt="" loading="lazy" decoding="async" />
              </GalleryFrame>
            </div>

            <span class="shelves__ledge" aria-hidden="true"></span>

            <article class="shelves__label">
              <p class="shelves__kicker">
                {{ CONTEXTS[project.context] }} · <span class="shelves__year">{{ project.schoolYear }}</span>
              </p>
              <h3 class="shelves__name">{{ project.title }}</h3>
              <p class="shelves__summary">{{ project.summary }}</p>
              <p class="shelves__techniques">{{ project.techniques.join(' · ') }}</p>
              <p v-if="project.url || project.repo" class="shelves__links">
                <HighlighterLink v-if="project.url" :href="project.url">
                  Visita il sito<span class="projects__hidden"> di {{ project.title }}</span>
                </HighlighterLink>
                <HighlighterLink v-if="project.repo" :href="project.repo">
                  Il codice<span class="projects__hidden"> di {{ project.title }}</span>
                </HighlighterLink>
              </p>
              <p v-else class="shelves__soon">Link in arrivo</p>
            </article>
          </li>
        </ul>
        <p v-else key="empty" class="shelves__empty">Qui non ci sono ancora opere.</p>
      </Transition>
    </div>

    <div class="pager">
      <p class="pager__status" aria-live="polite">{{ status }}</p>
      <nav v-if="pageCount > 1" class="pager__nav" aria-label="Pagine dei progetti">
        <button type="button" class="plaque plaque--button" :disabled="page === 0" @click="goTo(page - 1)">
          <span><span aria-hidden="true">←</span> Precedenti</span>
        </button>
        <span class="pager__count">{{ page + 1 }} / {{ pageCount }}</span>
        <button type="button" class="plaque plaque--button" :disabled="page === pageCount - 1" @click="goTo(page + 1)">
          <span>Successivi <span aria-hidden="true">→</span></span>
        </button>
      </nav>
    </div>
  </GalleryRoom>
</template>

<script setup>
import GalleryFrame from '@/components/foundations/GalleryFrame.vue'
import GalleryRoom from '@/components/foundations/GalleryRoom.vue'
import PlaceholderArtwork from '@/components/foundations/PlaceholderArtwork.vue'
import HighlighterLink from '@/components/primitives/HighlighterLink.vue'
import { otherProjects } from '@/content/projects'
import { computed, ref, watch } from 'vue'

defineProps({
  headingId: { type: String, required: true },
})

const CONTEXTS = { scuola: 'A scuola', personale: 'Per conto mio' }
const FILTERS = [
  { id: 'tutti', label: 'Tutti' },
  { id: 'personale', label: 'Per conto mio' },
  { id: 'scuola', label: 'A scuola' },
]

// Le cornici non sono tutte uguali: proporzioni, larghezza e inclinazione cambiano a turno, così le
// mensole sembrano sistemate a mano. Il turno segue la posizione del progetto nella collezione, non
// nella pagina: un progetto ha sempre la stessa cornice.
const RATIOS = ['4 / 3', '1 / 1', '5 / 4']
const WIDTHS = ['88%', '72%', '80%']
const LEANS = [-1.5, 1, -0.6, 1.4]
const positions = new Map(otherProjects.map((project, index) => [project.slug, index]))
const position = project => positions.get(project.slug)
const frameStyle = project => ({
  '--lean': `${LEANS[position(project) % LEANS.length]}deg`,
  '--frame-width': WIDTHS[position(project) % WIDTHS.length],
})

// La sala mostra tre opere alla volta: una mensola sola.
const PAGE_SIZE = 3

const filter = ref('tutti')
const page = ref(0)

const filtered = computed(() =>
  filter.value === 'tutti' ? otherProjects : otherProjects.filter(project => project.context === filter.value),
)
const counts = computed(() => ({
  tutti: otherProjects.length,
  personale: otherProjects.filter(project => project.context === 'personale').length,
  scuola: otherProjects.filter(project => project.context === 'scuola').length,
}))
const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const visible = computed(() => filtered.value.slice(page.value * PAGE_SIZE, (page.value + 1) * PAGE_SIZE))

const status = computed(() => {
  if (!filtered.value.length) return 'Nessuna opera'
  const from = page.value * PAGE_SIZE + 1
  const to = from + visible.value.length - 1
  return `Opere ${from}–${to} di ${filtered.value.length}`
})

watch(filter, () => {
  page.value = 0
})

const stage = ref(null)

// Cambiando pagina dal fondo della sala, le opere nuove cominciano più in alto: la sala torna
// all'inizio delle mensole, senza animazione se il movimento è ridotto.
function goTo(next) {
  page.value = next
  const top = stage.value.getBoundingClientRect().top
  if (top < 0) {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    stage.value.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' })
  }
}

// Fra l'uscita delle opere e l'arrivo delle nuove la sala resta della sua altezza, altrimenti
// quello che sta sotto salirebbe per un attimo.
function holdHeight() {
  stage.value.style.minHeight = `${stage.value.offsetHeight}px`
}

function releaseHeight() {
  stage.value.style.minHeight = ''
}
</script>

<style scoped>
/* I comandi della sala sono targhette sulla parete: lettere chiare e bordo sottile, e quella scelta
   diventa un cartellino. Il contorno del focus è chiaro, perché quello blu del sito sulla parete
   rossa non si vedrebbe. */
.plaques {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
  margin: calc(clamp(4rem, 9cqw, 6.5rem) * -0.45) auto clamp(3.5rem, 7cqw, 5rem);
  padding: 0;
  border: 0;
}

.plaque {
  position: relative;
}

.plaque input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.plaque > span {
  display: inline-flex;
  gap: 0.55em;
  align-items: center;
  min-height: 2.75rem;
  padding: 0.55rem 1rem;
  color: var(--gallery-lettering);
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background: rgb(0 0 0 / 14%);
  border: 1px solid rgb(239 232 216 / 42%);
  border-radius: 0.15rem;
  cursor: pointer;
  transition: background-color var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out);
}

.plaque small {
  font-size: 0.9em;
  font-weight: 600;
  opacity: 0.7;
}

.plaque input:checked + span {
  color: var(--ink-strong);
  background: var(--gallery-label);
  border-color: var(--gallery-label);
}

.plaque input:focus-visible + span,
.plaque--button:focus-visible > span {
  outline: 0.2rem solid var(--gallery-lettering);
  outline-offset: 0.2rem;
}

@media (hover: hover) and (pointer: fine) {
  .plaque:hover > span,
  .plaque--button:not(:disabled):hover > span {
    border-color: var(--gallery-lettering);
  }
}

.plaque--button {
  padding: 0;
  background: none;
  border: 0;
}

.plaque--button:focus-visible {
  outline: none;
}

.plaque--button:disabled > span {
  cursor: default;
  opacity: 0.35;
}

.shelves-stage {
  scroll-margin-top: 6rem;
}

/* Cambiando filtro o pagina, le opere svaniscono e le nuove salgono appena mentre compaiono. */
.shelves-fade-leave-active {
  transition: opacity var(--duration-fast) var(--ease-in);
}

.shelves-fade-enter-active {
  transition: opacity 320ms var(--ease-out), translate 320ms var(--ease-out);
}

.shelves-fade-leave-to,
.shelves-fade-enter-from {
  opacity: 0;
}

.shelves-fade-enter-from {
  translate: 0 0.75rem;
}

@media (prefers-reduced-motion: reduce) {
  .shelves-fade-leave-active,
  .shelves-fade-enter-active {
    transition: none;
  }
}

.shelves__empty {
  margin: 0 0 clamp(4rem, 8cqw, 5.5rem);
  color: rgb(239 232 216 / 78%);
  font-style: italic;
  text-align: center;
}

/* Sotto le mensole: quante opere si vedono e i comandi per le altre. */
.pager {
  display: grid;
  gap: 1rem;
  justify-items: center;
  margin-top: calc(clamp(4rem, 8cqw, 5.5rem) * -0.4);
}

.pager__status {
  margin: 0;
  color: rgb(239 232 216 / 78%);
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.pager__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem 1.2rem;
  align-items: center;
  justify-content: center;
}

.pager__count {
  color: var(--gallery-lettering);
  font-size: 0.9rem;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}

/* Le mensole: una griglia di posti, e ogni posto ha tre righe allineate a quelle dei vicini grazie a
   subgrid. Sopra la cornice, poggiata sul fondo; poi il tratto di mensola; sotto, sulla parete, il
   cartellino. Il tratto di mensola di ogni posto sporge di metà spazio per lato, così i tratti di una
   riga si toccano e diventano una mensola sola. Le opere di una pagina stanno su una mensola: tre
   colonne quando la sala è larga almeno 40rem, una sotto l'altra sul telefono. Lo spazio fra una
   mensola e l'altra è il margine sotto i cartellini: un row-gap verrebbe applicato anche fra le tre
   righe di ogni posto. */
.shelves {
  --shelf-gap: clamp(2rem, 5cqw, 4.5rem);
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  column-gap: var(--shelf-gap);
  row-gap: 0;
  width: min(100%, var(--content-width));
  margin: 0 auto;
  padding: 0;
  list-style: none;
}

@container (width >= 40rem) {
  .shelves {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.shelves__item {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;
  row-gap: 0;
}

.shelves__stand {
  display: grid;
  align-self: end;
  justify-items: center;
}

/* La cornice è appoggiata sul ripiano, un po' storta: ruota attorno al punto in cui lo tocca. */
.shelves__frame {
  --artwork-frame-size: 0.55rem;
  width: var(--frame-width);
  margin-bottom: -0.3rem;
  transform-origin: 50% 100%;
  rotate: var(--lean);
}

/* Il ripiano di legno: il piano chiaro in alto, il bordo davanti più scuro e l'ombra sulla parete.
   Copre il fondo della cornice, che sta dietro il bordo. */
.shelves__ledge {
  position: relative;
  z-index: 1;
  height: 0.95rem;
  margin-inline: calc(var(--shelf-gap) / -2);
  background:
    linear-gradient(#d2a676 0 22%, var(--gallery-shelf) 24% 70%, var(--gallery-shelf-dark));
  border-radius: 0.1rem;
  box-shadow:
    inset 0 -0.08rem 0 rgb(0 0 0 / 25%),
    0 0.9rem 1rem -0.4rem rgb(0 0 0 / 55%);
}

/* Il cartellino sotto la mensola. */
.shelves__label {
  align-self: start;
  width: min(100%, 17rem);
  margin: 1.6rem auto clamp(4rem, 8cqw, 5.5rem);
  padding: 1rem 1.1rem 0.9rem;
  color: var(--ink-strong);
  font-family: var(--font-body);
  background: var(--gallery-label);
  box-shadow:
    0 0 0 1px rgb(0 0 0 / 6%),
    0.4rem 0.7rem 1rem -0.3rem rgb(0 0 0 / 45%);
}

.shelves__kicker {
  margin: 0 0 0.4rem;
  color: var(--ink-kicker);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.shelves__year {
  white-space: nowrap;
}

.shelves__name {
  margin: 0 0 0.4rem;
  font-size: 1.1rem;
  font-weight: 800;
  line-height: 1.2;
}

.shelves__summary {
  margin: 0;
  color: var(--ink);
  font-size: 0.88rem;
  line-height: 1.5;
}

.shelves__techniques {
  margin: 0.6rem 0 0;
  padding-top: 0.5rem;
  color: var(--ink-soft);
  font-size: 0.78rem;
  border-top: 1px solid var(--paper-edge);
}

.shelves__links {
  display: flex;
  flex-wrap: wrap;
  column-gap: 1rem;
  margin: 0.2rem 0 0;
}

.shelves__links .highlighter-link {
  font-size: 1.15rem;
}

.shelves__soon {
  margin: 0.5rem 0 0;
  color: var(--ink-soft);
  font-size: 0.8rem;
  font-style: italic;
}

/* Testi solo per i lettori di schermo: il titolo del progetto che completa i link e il nome del
   filtro. */
.projects__hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
</style>
