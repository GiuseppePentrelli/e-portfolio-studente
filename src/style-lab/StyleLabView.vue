<template>
  <main
    id="main-content"
    class="lab"
    :class="{ 'lab--paper-world': background === 'paper' }"
    tabindex="-1"
  >
    <header class="lab__intro">
      <h1>Superficie e sfondo</h1>
      <p class="lab__description">
        Primo esperimento controllato. Il contenuto resta identico mentre confrontiamo ambiente e proporzione del foglio.
      </p>
    </header>

    <section class="lab__controls" aria-labelledby="controls-title">
      <h2 id="controls-title" class="visually-hidden">Controlli dell'esperimento</h2>

      <fieldset class="control-group">
        <legend>Sfondo</legend>
        <div class="segmented-control">
          <label v-for="option in backgroundOptions" :key="option.id">
            <input v-model="background" type="radio" name="background" :value="option.id" />
            <span>{{ option.label }}</span>
          </label>
        </div>
      </fieldset>

      <fieldset class="control-group">
        <legend>Forma del foglio</legend>
        <div class="segmented-control">
          <label v-for="option in paperOptions" :key="option.id">
            <input v-model="paper" type="radio" name="paper" :value="option.id" />
            <span>{{ option.label }}</span>
          </label>
        </div>
      </fieldset>
    </section>

    <p class="lab__status" aria-live="polite">
      Variante attiva: {{ activeBackgroundLabel }}, {{ activePaperLabel }}.
    </p>

    <PaperSurface
      :background="background"
      :paper="paper"
      :label="`Anteprima con ${activeBackgroundLabel} e ${activePaperLabel}`"
    />

    <section class="lab__matrix" aria-labelledby="matrix-title">
      <h2 id="matrix-title" class="lab__section-heading">Le tre superfici</h2>

      <div class="matrix-grid">
        <button
          v-for="option in backgroundOptions"
          :key="option.id"
          class="surface-card"
          :class="`surface-card--${option.id}`"
          type="button"
          :aria-pressed="background === option.id"
          @click="background = option.id"
        >
          <span class="surface-card__paper" aria-hidden="true"></span>
          <span class="surface-card__label">{{ option.label }}</span>
          <span class="surface-card__description">{{ option.description }}</span>
        </button>
      </div>
    </section>

    <PaletteShowcase />
    <TypographyShowcase />
    <ComponentShowcase />
    <CorkBoardShowcase />
  </main>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PaperSurface from '@/components/foundations/PaperSurface.vue'
import PaletteShowcase from '@/components/foundations/PaletteShowcase.vue'
import TypographyShowcase from '@/components/foundations/TypographyShowcase.vue'
import ComponentShowcase from '@/components/foundations/ComponentShowcase.vue'
import CorkBoardShowcase from '@/components/foundations/CorkBoardShowcase.vue'

const backgroundOptions = [
  { id: 'desk', label: 'Scrivania', description: 'Fisica, vissuta, piena di strumenti.' },
  { id: 'illustrated', label: 'Illustrato', description: 'Pastello, grafico, giocoso.' },
  { id: 'paper', label: 'Solo foglio', description: 'Il sito coincide interamente con la carta.' },
]

const paperOptions = [
  { id: 'notebook', label: 'Quaderno' },
  { id: 'fluid', label: 'Fluido' },
  { id: 'hybrid', label: 'Ibrido' },
]

const route = useRoute()
const router = useRouter()

const backgroundIds = backgroundOptions.map(option => option.id)
const paperIds = paperOptions.map(option => option.id)

const background = ref(
  backgroundIds.includes(route.query.background) ? route.query.background : 'desk',
)
const paper = ref(paperIds.includes(route.query.paper) ? route.query.paper : 'notebook')

const activeBackgroundLabel = computed(
  () => backgroundOptions.find(option => option.id === background.value)?.label ?? '',
)

const activePaperLabel = computed(
  () => paperOptions.find(option => option.id === paper.value)?.label ?? '',
)

watch([background, paper], ([nextBackground, nextPaper]) => {
  router.replace({
    query: {
      background: nextBackground,
      paper: nextPaper,
    },
  })
})
</script>

<style scoped>
.lab {
  min-height: 100vh;
  padding: clamp(1rem, 3vw, 2.5rem);
  background: var(--surface-canvas);
}

.lab--paper-world {
  --full-paper-margin: clamp(2.8rem, 8vw, 7rem);
  background-color: var(--paper);
  background-image:
    linear-gradient(
      90deg,
      transparent 0 var(--full-paper-margin),
      var(--margin-red) var(--full-paper-margin) calc(var(--full-paper-margin) + 0.09rem),
      transparent calc(var(--full-paper-margin) + 0.12rem)
    ),
    repeating-linear-gradient(
      to bottom,
      transparent 0 calc(var(--paper-line-height) - 0.0625rem),
      var(--line-blue) calc(var(--paper-line-height) - 0.0625rem) var(--paper-line-height)
    ),
    radial-gradient(ellipse at 14% 8%, var(--paper-stain-warm), transparent 13rem),
    radial-gradient(ellipse at 82% 72%, var(--paper-stain-cool), transparent 16rem);
  box-shadow: inset 0 0 3.5rem var(--paper-inset-shadow);
}

.lab--paper-world::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.14;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.18'/%3E%3C/svg%3E");
  mix-blend-mode: multiply;
}

.lab--paper-world > * {
  position: relative;
  z-index: 1;
}

.lab--paper-world .lab__controls {
  background: var(--surface-control-paper);
  backdrop-filter: blur(0.15rem);
}

.lab__intro,
.lab__controls,
.lab__status,
.lab__matrix {
  width: min(100%, var(--content-width));
  margin-inline: auto;
}

.lab__intro {
  display: grid;
  gap: var(--space-4);
  padding-block: var(--space-5) var(--space-6);
}

h1,
.lab__section-heading h2 {
  color: var(--ink-strong);
  font-family: var(--font-hand);
  font-weight: 600;
  line-height: 1.05;
}

h1 {
  margin-top: var(--space-2);
  font-size: clamp(2.25rem, 8vw, 5.5rem);
}

.lab__description {
  max-width: 62ch;
  align-self: end;
  color: var(--ink-soft);
  font-size: 1rem;
}

.lab__controls {
  display: grid;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--surface-control-translucent);
  border: 0.0625rem solid var(--surface-border);
  border-radius: var(--radius-medium);
  box-shadow: 0 0.35rem 1rem var(--shadow-soft);
}

.control-group {
  display: grid;
  gap: var(--space-2);
}

legend {
  color: var(--ink-soft);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.segmented-control {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.segmented-control label {
  position: relative;
}

.segmented-control input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
}

.segmented-control span {
  display: grid;
  min-height: 2.75rem;
  place-items: center;
  padding: 0.55rem 0.9rem;
  border: 0.1rem solid var(--surface-border-strong);
  border-radius: var(--radius-small);
  background: var(--surface-control);
  font-size: 0.9rem;
  font-weight: 650;
  cursor: pointer;
  transition: background-color var(--transition-fast), transform var(--transition-fast);
}

.segmented-control input:active + span {
  transform: scale(0.98);
}

.segmented-control input:checked + span {
  border-color: var(--ink-strong);
  background: var(--highlight-yellow);
  box-shadow: 0.13rem 0.13rem 0 var(--ink-strong);
}

.segmented-control input:focus-visible + span {
  outline: 0.2rem solid var(--focus);
  outline-offset: 0.2rem;
}

.lab__status {
  padding-block: var(--space-3);
  color: var(--ink-soft);
  font-size: 0.86rem;
}

.lab > :deep(.surface) {
  width: min(100%, calc(var(--content-width) + 4rem));
  margin-inline: auto;
  border-radius: var(--radius-medium);
  box-shadow: 0 1rem 2.5rem var(--shadow-medium);
}

.lab--paper-world > :deep(.surface--paper) {
  width: min(100%, var(--content-width));
  min-height: auto;
  box-shadow: none;
}

.lab--paper-world > :deep(.surface--paper .paper__content) {
  padding-inline: clamp(3.2rem, 9vw, 7.5rem) clamp(1rem, 7vw, 6rem);
}

.lab__matrix {
  padding-block: var(--space-8);
}

.lab__section-heading {
  margin-bottom: var(--space-5);
}

.lab__section-heading h2 {
  margin-top: var(--space-2);
  font-size: clamp(1.8rem, 5vw, 3rem);
}

.matrix-grid {
  display: grid;
  gap: var(--space-4);
}

.surface-card {
  display: grid;
  grid-template-columns: 5.2rem 1fr;
  gap: var(--space-1) var(--space-4);
  min-height: 8.5rem;
  padding: var(--space-4);
  color: var(--ink);
  border: 0.12rem solid transparent;
  border-radius: var(--radius-medium);
  text-align: left;
  cursor: pointer;
  transition: transform var(--transition-fast);
}

.surface-card:active {
  transform: scale(0.98);
}

.surface-card--desk {
  background: var(--surface-desk);
}

.surface-card--illustrated {
  background: linear-gradient(135deg, var(--surface-illustrated) 70%, var(--surface-illustrated-accent) 70%);
}

.surface-card--paper {
  background:
    linear-gradient(90deg, transparent 0 1.8rem, var(--margin-red) 1.83rem 1.88rem, transparent 1.9rem),
    repeating-linear-gradient(to bottom, transparent 0 1rem, var(--line-blue) 1.01rem 1.05rem),
    var(--paper);
}

.surface-card[aria-pressed="true"] {
  border-color: var(--ink-strong);
  box-shadow: 0.18rem 0.2rem 0 var(--ink-strong);
}

.surface-card__paper {
  grid-row: 1 / 3;
  width: 4.6rem;
  height: 6.2rem;
  align-self: center;
  background:
    linear-gradient(90deg, transparent 0 1rem, var(--margin-red) 1.03rem 1.08rem, transparent 1.1rem),
    repeating-linear-gradient(to bottom, transparent 0 0.72rem, var(--line-blue) 0.73rem 0.77rem),
    var(--paper);
  border: 0.0625rem solid var(--paper-edge);
  box-shadow: 0.15rem 0.25rem 0.5rem color-mix(in srgb, var(--ink-strong) 17%, transparent);
  rotate: -2deg;
}

.surface-card__label {
  align-self: end;
  font-family: var(--font-hand);
  font-size: 1.25rem;
  font-weight: 700;
}

.surface-card__description {
  align-self: start;
  color: var(--ink-description);
  font-size: 0.85rem;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  border: 0;
  white-space: nowrap;
}

@media (min-width: 48rem) {
  .lab__intro {
    grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.55fr);
  }

  .lab__controls {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .matrix-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 39.99rem) {
  .lab--paper-world {
    --full-paper-margin: 2.2rem;
    padding-inline: 0.75rem;
  }

  .lab--paper-world > :deep(.surface--paper .paper__content) {
    padding-inline: 2.8rem 0.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .segmented-control span,
  .surface-card {
    transition: background-color var(--duration-micro) linear;
  }

  .segmented-control input:active + span,
  .surface-card:active {
    transform: none;
    opacity: 0.78;
  }
}
</style>
