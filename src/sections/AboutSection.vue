<template>
  <div class="about">
    <div class="about__desk">
      <span class="about__surface desk-surface" aria-hidden="true"></span>
      <div class="about__sheet">
        <NotebookPage class="about__paper" torn-left>
          <div class="about__opening">
            <AboutOpening :heading-id="headingId" />
          </div>
        </NotebookPage>
      </div>
    </div>
  </div>
</template>

<script setup>
import NotebookPage from '@/components/foundations/NotebookPage.vue'
import AboutOpening from './AboutOpening.vue'

defineProps({
  headingId: { type: String, required: true },
})
</script>

<style scoped>
/* Senza animazioni la sezione è un foglio sulla scrivania, uguale a quello su cui finisce la Copertina. */
.about {
  position: relative;
  z-index: 1;
}

.about__desk {
  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  justify-items: center;
  width: min(100% - var(--desk-gutter) * 2, var(--desk-width));
  margin-inline: auto;
  padding: var(--space-6) var(--space-4);
}

.about__surface {
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: var(--desk-radius);
  box-shadow: 0 1rem 2.5rem var(--shadow-medium);
}

/* Stessa dimensione del quaderno: è la pagina che ne è stata strappata. */
.about__sheet {
  width: min(100%, var(--notebook-size));
  width: round(down, min(100%, var(--notebook-size)), 2px);

  /* L'ombra sta qui perché lo strappo maschera quella del foglio. */
  filter: drop-shadow(0 0.6rem 0.6rem rgb(57 45 29 / 16%));
}

.about__paper {
  aspect-ratio: 3 / 4;
}

.about__opening {
  opacity: var(--cover-settle, 1);
}

/* Con le animazioni, scrivania e foglio sono quelli della scena in Copertina: qui resta soltanto
   il contenuto vero, senza altezza propria, sovrapposto alla copia scritta su quel foglio.
   Si vede quella; questo resta trasparente ma leggibile dalle tecnologie assistive. */
@media (prefers-reduced-motion: no-preference) {
  .about__desk {
    height: 0;
    padding-block: 0;
  }

  .about__surface {
    display: none;
  }

  .about__sheet {
    margin-top: calc(var(--notebook-page-rise) * -1);
    filter: none;
  }

  .about .about__paper {
    aspect-ratio: auto;
    background: none;
    box-shadow: none;
    mask: none;
  }
}
</style>
