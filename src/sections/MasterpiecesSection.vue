<template>
  <!-- I Capolavori sono una mostra: dopo la bacheca del Percorso si entra in una sala con la parete
       scura, le opere appese e i cartellini da museo. Le opere vengono da src/content/projects.js; i
       posti ancora vuoti sono cornici imballate, "in allestimento". Testi della sala in bozza. -->
  <GalleryRoom :heading-id="headingId" title="Capolavori" subtitle="Sala 1 · Opere scelte · 2023–2027">

    <article v-if="main" class="gallery__main">
      <GalleryFrame class="gallery__main-frame" ratio="16 / 10" lamp>
        <PlaceholderArtwork v-if="main.placeholder" />
        <img v-else :src="main.image" alt="" decoding="async" />
      </GalleryFrame>

      <div class="gallery__label">
        <p class="gallery__kicker">Capolavoro principale</p>
        <h3 class="gallery__name">{{ main.title }}</h3>
        <p class="gallery__author">Giuseppe Pentrelli, {{ main.schoolYear }}</p>
        <dl class="gallery__facts">
          <div>
            <dt>Tecnica</dt>
            <dd>{{ main.techniques.join(', ') }}</dd>
          </div>
          <div>
            <dt>Ruolo</dt>
            <dd>{{ main.role }}</dd>
          </div>
        </dl>
        <p class="gallery__summary">{{ main.summary }}</p>
        <FocusLensLink v-if="main.page" class="gallery__cta" :href="`${baseUrl}progetti/${main.slug}`" :subject="main.title">
          Entra nella sala
        </FocusLensLink>
        <p v-else class="gallery__soon">La sala dell'opera è in allestimento.</p>
      </div>
    </article>

    <div class="gallery__others">
      <h3 class="gallery__others-title">Altre opere</h3>
      <ul class="gallery__others-list">
        <li v-for="(work, index) in others" :key="work?.slug ?? `slot-${index}`" class="gallery__other">
          <GalleryFrame :covered="!work">
            <img v-if="work" :src="work.image" alt="" loading="lazy" decoding="async" />
          </GalleryFrame>
          <div class="gallery__small-label">
            <template v-if="work">
              <h4 class="gallery__small-name">{{ work.title }}</h4>
              <p>{{ work.schoolYear }}</p>
            </template>
            <p v-else>Opera in allestimento</p>
          </div>
        </li>
      </ul>
    </div>
  </GalleryRoom>
</template>

<script setup>
import GalleryFrame from '@/components/foundations/GalleryFrame.vue'
import GalleryRoom from '@/components/foundations/GalleryRoom.vue'
import PlaceholderArtwork from '@/components/foundations/PlaceholderArtwork.vue'
import FocusLensLink from '@/components/primitives/FocusLensLink.vue'
import { mainMasterpiece, otherMasterpieces } from '@/content/projects'

defineProps({
  headingId: { type: String, required: true },
})

// Nella sala ci sono sempre almeno due posti per le altre opere: quelli ancora vuoti restano
// cornici imballate.
const RESERVED_PLACES = 2

const baseUrl = import.meta.env.BASE_URL
const main = mainMasterpiece
const others = [
  ...otherMasterpieces,
  ...Array.from({ length: Math.max(0, RESERVED_PLACES - otherMasterpieces.length) }, () => null),
]
</script>

<style scoped>
/* La sala è GalleryRoom, con la parete color petrolio di default. */

/* L'opera principale e il suo cartellino, accanto all'altezza degli occhi. */
.gallery__main {
  display: grid;
  grid-template-columns: minmax(0, 1.9fr) minmax(15rem, 1fr);
  gap: clamp(2.5rem, 5cqw, 4.5rem);
  align-items: center;
  width: min(100%, var(--content-width));
  margin: 0 auto;
}

.gallery__label {
  max-width: 22rem;
  padding: 1.5rem 1.4rem 1.3rem;
  color: var(--ink-strong);
  font-family: var(--font-body);
  background: var(--gallery-label);
  border-radius: 0.15rem;
  box-shadow:
    0 0 0 1px rgb(0 0 0 / 6%),
    0.18rem 0.18rem 0 rgb(0 0 0 / 14%),
    0.5rem 0.9rem 1.2rem -0.3rem rgb(0 0 0 / 45%);
}

.gallery__kicker {
  margin: 0 0 0.6rem;
  color: var(--ink-kicker);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.gallery__name {
  margin: 0;
  font-size: 1.55rem;
  font-weight: 800;
  line-height: 1.15;
}

.gallery__author {
  margin: 0.3rem 0 0.9rem;
  color: var(--ink-soft);
  font-size: 0.95rem;
  font-style: italic;
}

.gallery__facts {
  display: grid;
  gap: 0.35rem;
  margin: 0 0 0.9rem;
  padding: 0.7rem 0;
  font-size: 0.88rem;
  border-block: 1px solid var(--paper-edge);
}

.gallery__facts div {
  display: grid;
  grid-template-columns: 4.6rem minmax(0, 1fr);
  gap: 0.5rem;
}

.gallery__facts dt {
  color: var(--ink-soft);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  line-height: 1.6;
  text-transform: uppercase;
}

.gallery__facts dd {
  margin: 0;
}

.gallery__summary {
  margin: 0;
  color: var(--ink);
  font-size: 0.95rem;
  line-height: 1.55;
}

.gallery__cta {
  margin-top: var(--space-4);
}

.gallery__soon {
  margin: var(--space-4) 0 0;
  color: var(--ink-soft);
  font-size: 0.85rem;
  font-style: italic;
}

/* Le altre opere, più piccole, appese una accanto all'altra sotto l'opera principale. */
.gallery__others {
  width: min(100%, var(--content-width));
  margin: clamp(5rem, 11cqw, 8rem) auto 0;
  text-align: center;
}

.gallery__others-title {
  margin: 0 0 clamp(3.5rem, 7cqw, 5rem);
  color: rgb(239 232 216 / 78%);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.gallery__others-list {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem clamp(3rem, 8cqw, 6rem);
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style: none;
}

.gallery__other {
  width: 14rem;
}

.gallery__small-label {
  width: fit-content;
  margin: 1.6rem auto 0;
  padding: 0.5rem 0.8rem;
  color: var(--ink-strong);
  font-family: var(--font-body);
  font-size: 0.8rem;
  background: var(--gallery-label);
  box-shadow: 0.35rem 0.6rem 0.9rem -0.3rem rgb(0 0 0 / 45%);
}

.gallery__small-label p,
.gallery__small-name {
  margin: 0;
}

.gallery__small-name {
  font-size: 0.95rem;
}

/* Quando la sala è stretta l'opera principale sta sopra il suo cartellino, e le altre opere si
   rimpiccioliscono per stare in due su una riga. */
@container (width < 52rem) {
  .gallery__main {
    grid-template-columns: minmax(0, 1fr);
    justify-items: center;
  }

  .gallery__main-frame {
    width: 100%;
  }

  .gallery__label {
    max-width: 26rem;
  }

  .gallery__others-list {
    gap: 3rem 1.5rem;
  }

  .gallery__other {
    width: min(14rem, calc(50% - 0.75rem));
  }
}
</style>
