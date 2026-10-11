<template>
  <div class="about">
    <div class="about__desk">
      <span class="about__surface desk-surface" aria-hidden="true"></span>
      <div class="about__sheet">
        <NotebookPage class="about__paper" torn-left worn>
          <div class="about__content">
            <AboutOpening :heading-id="headingId" />
          </div>
        </NotebookPage>
      </div>
      <div class="about__sheet">
        <NotebookPage class="about__paper" torn-left worn="flipped">
          <div class="about__content">
            <AboutDrawing />
          </div>
        </NotebookPage>
      </div>
    </div>
  </div>
</template>

<script setup>
import NotebookPage from '@/components/foundations/NotebookPage.vue'
import AboutOpening from './AboutOpening.vue'
import AboutDrawing from './AboutDrawing.vue'

defineProps({
  headingId: { type: String, required: true },
})
</script>

<style scoped>
/* Senza animazioni la sezione è due fogli sulla scrivania, uguali a quelli su cui finisce la Copertina:
   affiancati dove c'è spazio, uno sotto l'altro altrove. */
.about {
  position: relative;
  z-index: 1;
}

.about__desk {
  position: relative;
  isolation: isolate;
  display: flex;
  flex-wrap: wrap;
  gap: var(--sheet-gap);
  justify-content: center;
  width: min(100% - var(--desk-gutter) * 2, var(--desk-width));
  margin-inline: auto;
  padding: var(--space-6) var(--space-4);
}

.about__surface {
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: var(--desk-radius);
  box-shadow: var(--desk-shadow);
}

/* Stessa dimensione del quaderno: sono le pagine che ne sono state strappate. */
.about__sheet {
  width: min(100%, var(--notebook-size));
  width: round(down, min(100%, var(--notebook-size)), 2px);

  /* L'ombra sta qui perché lo strappo maschera quella del foglio. */
  filter: drop-shadow(0 0.6rem 0.6rem rgb(57 45 29 / 16%));
}

.about__paper {
  aspect-ratio: 3 / 4;
}

.about__content {
  opacity: var(--cover-settle, 1);
}

/* Con le animazioni, scrivania e fogli sono quelli della scena in Copertina: qui resta soltanto
   il contenuto vero, senza altezza propria, sovrapposto alle copie scritte su quei fogli.
   Si vedono quelle; questo resta trasparente ma leggibile dalle tecnologie assistive.
   Dove i fogli sono impilati, anche i due contenuti occupano lo stesso posto. */
@media (prefers-reduced-motion: no-preference) {
  .about__desk {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    justify-items: center;
    height: 0;
    padding-block: 0;
  }

  .about__surface {
    display: none;
  }

  .about__sheet {
    grid-area: 1 / 1;
    margin-top: calc(var(--notebook-page-rise) * -1);
    filter: none;
  }

  .about .about__paper :deep(.page__wear) {
    display: none;
  }

  .about .about__paper {
    aspect-ratio: auto;
    background: none;
    box-shadow: none;
    mask: none;
  }

  /* Tutto il selettore dentro :global(): altrimenti Vue applicherebbe la regola alla sola classe su <html>. */
  :global(.sheets-side-by-side .about__desk) {
    display: flex;
    flex-wrap: nowrap;
  }
}
</style>
