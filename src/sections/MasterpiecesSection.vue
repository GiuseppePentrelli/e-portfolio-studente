<template>
  <!-- I Capolavori sono una mostra: dopo la bacheca del Percorso si entra in una sala con la parete
       scura, le opere appese e i cartellini da museo. Le opere vengono da src/content/projects.js; i
       posti ancora vuoti sono cornici imballate, "in allestimento". Dove si può, la sala si percorre a
       piedi (GalleryRoom con `walk`): le opere si dispongono in fila lungo la parete, con le colonnine
       e la panca in primo piano. Testi della sala in bozza. -->
  <GalleryRoom :heading-id="headingId" title="Capolavori" subtitle="Opere scelte · 2023–2027" walk>
    <template #default="{ walking }">
      <div class="gallery" :class="{ 'gallery--walking': walking }">
        <article v-if="main" class="gallery__main">
          <GalleryFrame class="gallery__main-frame" ratio="16 / 10" lamp data-walk-stop>
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

          <!-- Le colonnine d'ottone con il cordone di velluto, in primo piano davanti all'opera. -->
          <div v-if="walking" class="gallery__rope" data-walk-depth="1.3" aria-hidden="true">
            <svg viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M5 1Q50 13 95 1" />
            </svg>
            <span class="gallery__post"></span>
            <span class="gallery__post"></span>
          </div>
        </article>

        <div class="gallery__others">
          <h3 class="gallery__others-title">Altre opere</h3>
          <ul class="gallery__others-list">
            <li v-for="(work, index) in others" :key="work?.slug ?? `slot-${index}`" class="gallery__other">
              <GalleryFrame :covered="!work" data-walk-stop>
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

          <!-- La panca della sala, vicinissima a chi guarda: se ne vede solo la seduta, in basso. -->
          <div v-if="walking" class="gallery__bench" data-walk-depth="1.7" aria-hidden="true"></div>
        </div>
      </div>
    </template>
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

/* ——— La sala percorsa a piedi ———
   Le opere si mettono in fila lungo la parete, all'altezza degli occhi: l'opera principale con il
   cartellino accanto, poi le altre. Le misure sono in --room-u, l'unità della sala. */
.gallery--walking {
  display: flex;
  gap: calc(var(--room-u) * 30);
  align-items: stretch;
}

.gallery--walking .gallery__main {
  position: relative;
  display: flex;
  gap: calc(var(--room-u) * 6);
  align-items: center;
  width: auto;
  margin: 0;
  padding-bottom: calc(var(--room-u) * 3);
}

.gallery--walking .gallery__main-frame {
  flex: none;
  width: calc(var(--room-u) * 72);
}

.gallery--walking .gallery__label {
  flex: none;
  width: 21rem;
  max-width: none;
}

.gallery--walking .gallery__others {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  margin: 0;
  padding-bottom: calc(var(--room-u) * 3);
}

.gallery--walking .gallery__others-title {
  margin-bottom: calc(var(--room-u) * 9);
}

.gallery--walking .gallery__others-list {
  flex-wrap: nowrap;
  gap: calc(var(--room-u) * 16);
}

.gallery--walking .gallery__other {
  flex: none;
  width: calc(var(--room-u) * 28);
}

/* Le colonnine stanno sul pavimento, un passo davanti alla parete, e il cordone pende fra le due. */
.gallery__rope {
  position: absolute;
  bottom: calc(var(--room-u) * -12.5);
  left: calc(var(--room-u) * -5);
  width: calc(var(--room-u) * 82);
  height: calc(var(--room-u) * 29);
  pointer-events: none;
}

.gallery__rope svg {
  position: absolute;
  top: calc(var(--room-u) * 1.6);
  left: 0;
  width: 100%;
  height: calc(var(--room-u) * 6);
  overflow: visible;
}

.gallery__rope path {
  fill: none;
  stroke: #7d1726;
  stroke-width: calc(var(--room-u) * 1.3);
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
  filter: drop-shadow(0 calc(var(--room-u) * 0.8) calc(var(--room-u) * 0.8) rgb(0 0 0 / 45%));
}

.gallery__post {
  position: absolute;
  top: calc(var(--room-u) * 1.4);
  bottom: 0;
  left: calc(5% - var(--room-u) * 0.8);
  width: calc(var(--room-u) * 1.6);
  background: linear-gradient(90deg, #6f5222, #f0d79c 35%, var(--gallery-brass) 60%, #5d4419);
  border-radius: calc(var(--room-u) * 0.4);
}

.gallery__post:last-child {
  left: calc(95% - var(--room-u) * 0.8);
}

/* Il pomo in cima e la base tonda, schiacciata dalla prospettiva. */
.gallery__post::before,
.gallery__post::after {
  content: "";
  position: absolute;
  left: 50%;
  border-radius: 50%;
}

.gallery__post::before {
  top: calc(var(--room-u) * -2);
  width: calc(var(--room-u) * 3);
  height: calc(var(--room-u) * 3);
  margin-left: calc(var(--room-u) * -1.5);
  background: radial-gradient(circle at 35% 30%, #fbe9bd, var(--gallery-brass) 45%, #5d4419);
}

.gallery__post::after {
  bottom: calc(var(--room-u) * -1.2);
  width: calc(var(--room-u) * 8);
  height: calc(var(--room-u) * 2.4);
  margin-left: calc(var(--room-u) * -4);
  background: radial-gradient(ellipse at 45% 35%, #e6c98a, #8a6a33 55%, #3d2c10);
  box-shadow: 0 calc(var(--room-u) * 0.6) calc(var(--room-u) * 1.2) rgb(0 0 0 / 55%);
}

/* La panca: seduta imbottita scura con la cucitura, gambe d'acciaio; è così vicina che il bordo
   della scena la taglia. */
.gallery__bench {
  position: absolute;
  bottom: calc(var(--room-u) * -34);
  left: 50%;
  width: calc(var(--room-u) * 64);
  height: calc(var(--room-u) * 26);
  margin-left: calc(var(--room-u) * -32);
  pointer-events: none;
  filter: blur(0.08rem);
}

.gallery__bench::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: calc(var(--room-u) * 9);
  background:
    linear-gradient(rgb(255 255 255 / 14%), transparent 22%),
    linear-gradient(#3b3d42, #1b1c20);
  border-radius: calc(var(--room-u) * 2.2);
  box-shadow: 0 calc(var(--room-u) * 1.5) calc(var(--room-u) * 3) rgb(0 0 0 / 55%);
  outline: 1px dashed rgb(255 255 255 / 16%);
  outline-offset: calc(var(--room-u) * -1.4);
}

.gallery__bench::after {
  content: "";
  position: absolute;
  inset: calc(var(--room-u) * 9) 10% 0;
  background:
    linear-gradient(90deg, #8d9399, #e3e7ea 40%, #6b7177) left / calc(var(--room-u) * 2.2) 100% no-repeat,
    linear-gradient(90deg, #8d9399, #e3e7ea 40%, #6b7177) right / calc(var(--room-u) * 2.2) 100% no-repeat;
}

/* Su uno schermo stretto o alto il cartellino va sotto l'opera e le opere si incontrano una alla
   volta; le colonnine coprirebbero il cartellino e restano fuori. */
@container room-stage (aspect-ratio < 1) or (width < 56rem) {
  .gallery--walking {
    gap: 45cqw;
  }

  .gallery--walking .gallery__main {
    flex-direction: column;
    gap: calc(var(--room-u) * 4);
    justify-content: center;
    padding-top: 2.5rem;
  }

  .gallery--walking .gallery__main-frame {
    width: min(calc(var(--room-u) * 46), 76cqw);
  }

  .gallery--walking .gallery__label {
    width: min(24rem, 84cqw);
    padding: 1.1rem 1.1rem 1rem;
  }

  .gallery--walking .gallery__name {
    font-size: 1.3rem;
  }

  .gallery--walking .gallery__author {
    margin-bottom: 0.6rem;
  }

  .gallery--walking .gallery__facts {
    margin-bottom: 0.6rem;
    padding-block: 0.5rem;
    font-size: 0.82rem;
  }

  .gallery--walking .gallery__summary {
    font-size: 0.88rem;
    line-height: 1.5;
  }

  .gallery__rope {
    display: none;
  }
}
</style>
