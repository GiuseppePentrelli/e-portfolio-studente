<template>
  <!-- I Componenti sono il laboratorio: la stanzetta di sera, con la postazione. Dopo le sale della
       mostra, dove le opere si guardano, qui si toccano. Si sceglie un esperimento sollevando la sua
       cartuccia; il monitor lo mostra dal vivo e la scheda sul fermaglio lo descrive. Su computer la
       stanza è una scena unica alta quanto lo schermo, in prospettiva. I componenti vengono da
       src/content/components.js. È la prima fase: il resto della stanza e gli omaggi arrivano dopo
       (docs/04). Testi in bozza. -->
  <div class="den">
    <div class="den__box">
      <div class="den__room">
        <div class="den__shell" aria-hidden="true">
          <span class="den__wall"></span>
          <span class="den__floor"></span>
          <span class="den__baseboard"></span>
          <span class="den__led"></span>
          <span class="den__vignette"></span>
        </div>

        <div class="den__stage">
          <header class="den__heading">
            <h2 :id="headingId" class="den__title">Componenti</h2>
            <p class="den__sign">Laboratorio · qui le opere si toccano</p>
          </header>

          <span class="den__hexes" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>

          <p class="den__hidden" aria-live="polite">{{ announcement }}</p>

          <div class="den__desk">
            <span class="den__desk-shadow" aria-hidden="true"></span>
            <span class="den__leg den__leg--back" aria-hidden="true"></span>
            <span class="den__leg den__leg--back den__leg--right" aria-hidden="true"></span>
            <PcTower class="den__tower" />
            <span class="den__leg" aria-hidden="true"></span>
            <span class="den__leg den__leg--right" aria-hidden="true"></span>
            <span class="den__desk-top" aria-hidden="true"></span>
            <span class="den__desk-edge" aria-hidden="true"></span>
            <CartridgeRack
              v-model="selected"
              class="den__rack"
              :items="cartridges"
              name="lab-experiment"
              legend="Scegli l'esperimento"
            />
            <DeskGear class="den__gear" />
          </div>

          <LabMonitor class="den__monitor" :title="windowTitle" :dark="current.kind === 'embed'">
            <!-- L'elemento che cambia è un contenitore e non direttamente il componente: con mode
                 out-in, quando cambia il componente stesso, il nuovo non viene montato. -->
            <Transition name="screen-swap" mode="out-in">
              <div
                :key="current.slug"
                class="den__experiment"
                :class="{ 'den__experiment--embed': current.kind === 'embed' }"
              >
                <LabEmbed
                  v-if="current.kind === 'embed'"
                  :src="current.url"
                  :title="`Esperimento: ${current.name}`"
                  :height="current.height"
                />
                <LabNativeDemo v-else :demo="current.demo" />
              </div>
            </Transition>
          </LabMonitor>

          <div class="den__clipboard">
            <span class="den__nail" aria-hidden="true"></span>
            <span class="den__clip" aria-hidden="true"></span>
            <Transition name="sheet-swap" mode="out-in">
              <article :key="current.slug" class="den__sheet">
                <p class="den__kicker">Esperimento {{ number(currentIndex) }} · {{ current.category }}</p>
                <h3 class="den__name">{{ current.name }}</h3>
                <p class="den__description">{{ current.description }}</p>
                <ul class="den__features">
                  <li v-for="feature in current.features" :key="feature">{{ feature }}</li>
                </ul>
                <p class="den__techniques">{{ current.techniques.join(' · ') }}</p>
                <p class="den__links">
                  <HighlighterLink v-if="current.url" :href="current.url">
                    Apri da solo<span class="den__hidden"> {{ current.name }}</span>
                  </HighlighterLink>
                  <HighlighterLink :href="current.code">
                    Il codice<span class="den__hidden"> di {{ current.name }}</span>
                  </HighlighterLink>
                </p>
              </article>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CartridgeRack from '@/components/foundations/CartridgeRack.vue'
import DeskGear from '@/components/foundations/DeskGear.vue'
import LabEmbed from '@/components/foundations/LabEmbed.vue'
import LabMonitor from '@/components/foundations/LabMonitor.vue'
import LabNativeDemo from '@/components/foundations/LabNativeDemo.vue'
import PcTower from '@/components/foundations/PcTower.vue'
import HighlighterLink from '@/components/primitives/HighlighterLink.vue'
import { components } from '@/content/components'
import { computed, ref } from 'vue'

defineProps({
  headingId: { type: String, required: true },
})

const number = index => String(index + 1).padStart(3, '0')
const cartridges = components.map((item, index) => ({ value: item.slug, number: number(index), name: item.name }))

const selected = ref(components[0].slug)
const currentIndex = computed(() => components.findIndex(item => item.slug === selected.value))
const current = computed(() => components[currentIndex.value])

// La barra del titolo della finestra mostra il file aperto: la cartella del componente o il file
// della primitiva.
const windowTitle = computed(() => {
  const file = current.value.kind === 'embed' ? `${current.value.path}index.html` : current.value.source.split('/').pop()
  return `${number(currentIndex.value)} — ${file}`
})

const announcement = computed(() => `Esperimento ${number(currentIndex.value)}: ${current.value.name}`)
</script>

<style scoped>
/* L'unità della scena su computer: la stanza è disegnata su un riquadro di 160 × 90 unità, e
   un'unità è la più piccola fra un centosessantesimo della larghezza e un novantesimo dell'altezza
   della sezione, così la scena entra sempre intera. È registrata perché venga calcolata una volta,
   sulla stanza, e passi già in pixel agli elementi dentro, anche a quelli che sono container. */
@property --den-u { syntax: "<length>"; inherits: true; initial-value: 8px; }
@property --den-ux { syntax: "<length>"; inherits: true; initial-value: 8px; }

/* ——— Telefono e tablet in verticale: la stanza scorre come una pagina. ——— */

.den {
  position: relative;
  margin-top: var(--space-8);
  padding: 3rem var(--space-4) 3.5rem;
  overflow-x: clip;
  color: #cfe9ee;
  background: var(--lab-wall);
  container-type: inline-size;
}

.den__box,
.den__room {
  display: contents;
}

.den__shell {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

/* La parete di sera: intonaco blu notte, la luce fredda del monitor al centro e quella viola del PC
   in basso a destra. */
.den__wall {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% 38%, rgb(110 210 255 / 20%), transparent 26rem),
    radial-gradient(circle at 92% 92%, rgb(139 92 255 / 22%), transparent 22rem),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='p' x='0' y='0' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' seed='9' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .3 -.13'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23p)'/%3E%3C/svg%3E"),
    linear-gradient(#141a33, var(--lab-wall));
  background-size: auto, auto, 220px 220px, auto;
}

.den__floor,
.den__baseboard,
.den__hexes,
.den__leg,
.den__tower,
.den__gear,
.den__desk-shadow {
  display: none;
}

/* La striscia LED lungo il soffitto. */
.den__led {
  position: absolute;
  top: 1.2rem;
  left: 8%;
  width: 84%;
  height: 0.28rem;
  background: var(--lab-neon-core);
  border-radius: 0.3rem;
  box-shadow:
    0 0 0.35rem var(--lab-neon),
    0 0 1.2rem var(--lab-neon),
    0 0.6rem 3rem rgb(0 183 255 / 40%);
}

.den__vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 75% 70% at 50% 45%, transparent 55%, rgb(0 0 0 / 55%));
}

.den__stage {
  position: relative;
  display: grid;
  grid-template-areas:
    "heading"
    "monitor"
    "desk"
    "sheet";
  justify-items: center;
}

.den__heading {
  grid-area: heading;
  margin-bottom: 1.6rem;
  text-align: center;
}

/* Il titolo è un'insegna al neon: i tubi stanno appena staccati dalla parete e ci fanno ombra. */
.den__title {
  margin: 0;
  color: var(--lab-neon-core);
  font-family: var(--font-body);
  font-size: clamp(2rem, 9cqw, 3rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-shadow:
    0 0 0.05em #fff,
    0 0 0.2em var(--lab-neon),
    0 0 0.55em var(--lab-neon),
    0 0 1.1em rgb(0 160 255 / 70%),
    0.08em 0.16em 0.1em rgb(0 0 0 / 55%);
}

.den__sign {
  width: fit-content;
  margin: 0.8rem auto 0;
  padding: 0.3rem 0.7rem;
  color: var(--lab-hazard);
  font-family: var(--font-code);
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: 1px solid rgb(242 194 48 / 55%);
  border-radius: 0.2rem;
}

.den__monitor {
  position: relative;
  z-index: 3;
  grid-area: monitor;
  width: min(100%, 26rem);
  margin-bottom: -1.4rem;
  --monitor-neck: 2rem;
  --monitor-ratio: 1;
}

.den__experiment {
  display: grid;
  place-items: center;
  width: 100%;
}

.den__experiment--embed {
  position: absolute;
  inset: 0;
}

/* La scrivania: il piano visto dall'alto, più stretto verso la parete, e il bordo con la striscia
   LED sotto. Le cartucce stanno sul piano. */
.den__desk {
  position: relative;
  grid-area: desk;
  display: grid;
  justify-items: center;
  width: calc(100% + var(--space-4) * 2);
  padding: 2.4rem 0 1.3rem;
}

.den__desk-top {
  position: absolute;
  inset: 0 0 1.1rem;
  background:
    radial-gradient(ellipse 45% 70% at 50% 0, rgb(110 210 255 / 16%), transparent 70%),
    linear-gradient(#111417, #262b30);
  clip-path: polygon(6% 0, 94% 0, 100% 100%, 0 100%);
}

.den__desk-edge {
  position: absolute;
  inset: auto 0 0;
  height: 1.1rem;
  background: linear-gradient(#30353a, #0d0f11);
}

.den__desk-edge::after {
  content: "";
  position: absolute;
  inset: auto 3% -0.2rem;
  height: 0.2rem;
  background: linear-gradient(90deg, #36d6ff, #8b5cff, #ff4fb8, #8b5cff, #36d6ff);
  border-radius: 0.2rem;
  box-shadow:
    0 0.3rem 1rem rgb(139 92 255 / 60%),
    0 0.6rem 2.4rem rgb(54 214 255 / 35%);
}

.den__rack {
  position: relative;
  z-index: 4;
  max-width: 100%;
  font-size: 0.85rem;
}

/* Sul telefono le cartucce non stanno tutte su una fila: la rastrelliera scorre di lato, e la
   cartuccia accanto si vede a metà, così si capisce che ce ne sono altre. L'allineamento al centro
   è "safe": quando la fila trabocca parte da sinistra, altrimenti le prime cartucce resterebbero
   fuori, irraggiungibili. */
.den__rack :deep(.rack__slots) {
  justify-content: safe center;
  overflow-x: auto;
  scroll-snap-type: x proximity;
  scrollbar-color: #56616a transparent;
  scrollbar-width: thin;
}

.den__rack :deep(.cartridge) {
  flex: none;
  scroll-snap-align: center;
}

/* La scheda dell'esperimento, su un fermaglio d'alluminio appeso a un chiodo. */
.den__clipboard {
  position: relative;
  z-index: 1;
  grid-area: sheet;
  width: min(100%, 30rem);
  margin-top: 3rem;
  padding: 2.2rem 0.8rem 0.8rem;
  background:
    linear-gradient(135deg, rgb(255 255 255 / 35%), transparent 40% 70%, rgb(0 0 0 / 18%)),
    #b9c2c7;
  border-radius: 0.7rem;
  box-shadow:
    inset 0 0 0 1px rgb(0 0 0 / 18%),
    -0.6rem 1.2rem 1.4rem rgb(0 0 0 / 55%);
  rotate: 1.5deg;
}

.den__nail {
  position: absolute;
  top: -1.2rem;
  left: 50%;
  width: 0.6rem;
  height: 0.6rem;
  background: radial-gradient(circle at 35% 30%, #e2ddd1, #6d6658);
  border-radius: 50%;
  box-shadow: -0.1rem 0.25rem 0.2rem rgb(0 0 0 / 60%);
  translate: -50% 0;
}

.den__clip {
  position: absolute;
  top: -0.6rem;
  left: 50%;
  z-index: 2;
  width: 40%;
  height: 2.4rem;
  background: linear-gradient(#5a646a, #2d3438 60%, #4a545a);
  border-radius: 0.5rem 0.5rem 0.9rem 0.9rem;
  box-shadow: 0 0.3rem 0.5rem rgb(0 0 0 / 45%);
  translate: -50% 0;
}

.den__sheet {
  padding: 1.3rem 1.1rem 1rem;
  color: var(--ink-strong);
  font-family: var(--font-body);
  background: var(--paper);
  border-radius: 0.15rem;
}

.den__kicker {
  margin: 0 0 0.35rem;
  color: var(--ink-kicker);
  font-family: var(--font-code);
  font-size: 0.75em;
}

.den__name {
  margin: 0 0 0.45rem;
  font-family: var(--font-hand);
  font-size: 1.8em;
  line-height: 1.1;
}

.den__description {
  margin: 0;
  color: var(--ink);
  font-size: 0.92em;
  line-height: 1.55;
}

.den__features {
  display: grid;
  gap: 0.25em;
  margin: 0.7em 0 0;
  padding: 0;
  font-size: 0.86em;
  line-height: 1.4;
  list-style: none;
}

.den__features li {
  position: relative;
  padding-left: 1.2em;
}

/* Le voci sono spuntate a penna verde, come le conferme. */
.den__features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--pen-green);
  font-family: var(--font-hand);
  font-weight: 700;
}

.den__techniques {
  margin: 0.7em 0 0;
  padding-top: 0.45em;
  color: var(--ink-soft);
  font-size: 0.8em;
  border-top: 1px solid var(--paper-edge);
}

.den__links {
  display: flex;
  flex-wrap: wrap;
  column-gap: 1em;
  margin: 0.15em 0 0;
}

.den__links .highlighter-link {
  min-height: 2.75rem;
  font-size: 1.15em;
}

.den__hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* ——— Computer: la stanza è una scena unica, alta quanto lo schermo, in prospettiva. ———
   La scena è disegnata su 160 × 90 unità. Le posizioni orizzontali si misurano in --den-ux, un
   centosessantesimo della larghezza, così la stanza occupa sempre tutta la sezione; le dimensioni
   e le altezze in --den-u, la più piccola fra --den-ux e un novantesimo dell'altezza, così la scena
   entra sempre in altezza. Su uno schermo largo e basso gli oggetti restano proporzionati
   all'altezza e si distanziano. Un oggetto si posiziona dal suo centro: left = centro × ux − metà
   larghezza × u. Le altezze si misurano dal basso: il pavimento incontra la parete a 16, il piano
   della scrivania va da 27 (il bordo davanti) a 40 (contro la parete). L'altezza della sezione
   lascia libero lo spazio che la navbar occupa quando si arriva qui da una linguetta. */
@media (min-width: 56rem) and (min-height: 34rem) {
  .den {
    height: calc(100svh - 5.25rem);
    min-height: 34rem;
    max-height: 64rem;
    padding: 0;
  }

  .den__box {
    position: absolute;
    inset: 0;
    display: block;
    container: den-box / size;
  }

  .den__room {
    position: absolute;
    inset: 0;
    display: block;
    --den-ux: calc(100cqw / 160);
    --den-u: min(calc(100cqw / 160), calc(100cqh / 90));
  }

  /* Il pavimento è un piano vero, steso verso chi guarda: la prospettiva fa convergere i listoni
     verso il centro della parete. */
  .den__shell {
    perspective: calc(var(--den-u) * 60);
    perspective-origin: 50% calc(100% - var(--den-u) * 62);
  }

  .den__wall {
    inset: 0 0 calc(var(--den-u) * 16);
    background:
      radial-gradient(circle at calc(var(--den-ux) * 79) calc(100% - var(--den-u) * 46), rgb(110 210 255 / 22%), transparent calc(var(--den-u) * 42)),
      radial-gradient(circle at calc(var(--den-ux) * 22) calc(100% - var(--den-u) * 62), rgb(139 92 255 / 16%), transparent calc(var(--den-u) * 26)),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='p' x='0' y='0' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' seed='9' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .3 -.13'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23p)'/%3E%3C/svg%3E"),
      linear-gradient(#141a33, var(--lab-wall));
    background-size: auto, auto, 220px 220px, auto;
  }

  .den__floor {
    position: absolute;
    top: calc(100% - var(--den-u) * 16);
    left: 50%;
    display: block;
    width: calc(var(--den-ux) * 420);
    height: calc(var(--den-u) * 52);
    background:
      radial-gradient(ellipse 22% 30% at 50% 0, rgb(139 92 255 / 30%), transparent 70%),
      repeating-linear-gradient(90deg, rgb(0 0 0 / 55%) 0 calc(var(--den-u) * 0.35), transparent 0 calc(var(--den-u) * 9)),
      repeating-linear-gradient(rgb(0 0 0 / 30%) 0 calc(var(--den-u) * 0.3), transparent 0 calc(var(--den-u) * 26)),
      linear-gradient(#3a2a20, #24180f);
    transform: rotateX(82deg);
    transform-origin: 50% 0;
    translate: -50% 0;
  }

  .den__baseboard {
    position: absolute;
    inset: auto 0 calc(var(--den-u) * 16 - 0.1rem);
    display: block;
    height: calc(var(--den-u) * 1.2);
    background: linear-gradient(#262c3f, #0d1020);
    box-shadow: 0 0.15rem 0.4rem rgb(0 0 0 / 50%);
  }

  .den__vignette {
    background: radial-gradient(ellipse 70% 75% at 50% 48%, transparent 50%, rgb(0 0 0 / 60%));
  }

  .den__stage {
    position: absolute;
    inset: auto 0 0;
    display: block;
    height: calc(var(--den-u) * 90);
  }

  /* L'insegna al neon sulla parete, a sinistra del monitor. */
  .den__heading {
    position: absolute;
    bottom: calc(var(--den-u) * 56);
    left: calc(var(--den-ux) * 9);
    z-index: 1;
    margin: 0;
    text-align: left;
  }

  .den__title {
    font-size: max(1.6rem, calc(var(--den-u) * 3.6));
  }

  .den__sign {
    margin: calc(var(--den-u) * 1.4) 0 0;
    font-size: max(0.6rem, calc(var(--den-u) * 1.15));
  }

  /* Pannelli luminosi a esagono sulla parete, sopra l'insegna. */
  .den__hexes {
    position: absolute;
    bottom: calc(var(--den-u) * 70);
    left: calc(var(--den-ux) * 12);
    z-index: 1;
    display: block;
    width: calc(var(--den-u) * 24);
    height: calc(var(--den-u) * 14);
    font-size: var(--den-u);
    filter: drop-shadow(0 0 1em rgb(54 214 255 / 45%));
  }

  .den__hexes i {
    position: absolute;
    width: 6.6em;
    height: 5.7em;
    background:
      radial-gradient(circle at 50% 50%, rgb(255 255 255 / 55%), transparent 70%),
      var(--hex, #36d6ff);
    clip-path: polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%);
    opacity: 0.85;
  }

  .den__hexes i:nth-child(1) { top: 0; left: 0; --hex: #36d6ff; }
  .den__hexes i:nth-child(2) { top: 2.95em; left: 5.1em; --hex: #8b5cff; }
  .den__hexes i:nth-child(3) { top: 0; left: 10.2em; --hex: #ff4fb8; opacity: 0.6; }
  .den__hexes i:nth-child(4) { top: 5.9em; left: 0; --hex: #36d6ff; opacity: 0.5; }
  .den__hexes i:nth-child(5) { top: 2.95em; left: 15.3em; --hex: #8b5cff; opacity: 0.7; }

  /* La scrivania e quello che c'è sopra e sotto. Il piano si restringe verso la parete di 8 unità
     per lato. */
  .den__desk {
    position: absolute;
    inset: 0;
    display: block;
    width: auto;
    padding: 0;
  }

  .den__desk-shadow {
    position: absolute;
    bottom: calc(var(--den-u) * 1);
    left: calc(var(--den-ux) * 4);
    display: block;
    width: calc(var(--den-ux) * 152);
    height: calc(var(--den-u) * 12);
    background: radial-gradient(ellipse at 50% 50%, rgb(0 0 0 / 55%), transparent 70%);
  }

  .den__desk-top {
    inset: auto;
    bottom: calc(var(--den-u) * 27);
    left: calc(var(--den-ux) * 8);
    z-index: 2;
    width: calc(var(--den-ux) * 144);
    height: calc(var(--den-u) * 13);
    background:
      radial-gradient(ellipse 30% 90% at 49% 0, rgb(110 210 255 / 20%), transparent 70%),
      linear-gradient(#0d1013, #2a3036);
    clip-path: polygon(calc(var(--den-u) * 8) 0, calc(100% - var(--den-u) * 8) 0, 100% 100%, 0 100%);
  }

  .den__desk-edge {
    inset: auto;
    bottom: calc(var(--den-u) * 24.6);
    left: calc(var(--den-ux) * 8);
    z-index: 2;
    width: calc(var(--den-ux) * 144);
    height: calc(var(--den-u) * 2.4);
    background: linear-gradient(#3a4046, #15181b 40%, #0b0d0f);
    border-radius: 0 0 0.2rem 0.2rem;
  }

  .den__leg {
    position: absolute;
    bottom: calc(var(--den-u) * 3);
    left: calc(var(--den-ux) * 8 + var(--den-u) * 2);
    z-index: 2;
    display: block;
    width: calc(var(--den-u) * 1.6);
    height: calc(var(--den-u) * 21.8);
    background: linear-gradient(90deg, #0b0c0e, #2a2f34, #0b0c0e);
  }

  .den__leg--right {
    left: calc(var(--den-ux) * 152 - var(--den-u) * 3.6);
  }

  .den__leg--back {
    bottom: calc(var(--den-u) * 15.4);
    left: calc(var(--den-ux) * 8 + var(--den-u) * 9);
    z-index: 1;
    width: calc(var(--den-u) * 1);
    height: calc(var(--den-u) * 9.4);
    background: #0a0b0d;
  }

  .den__leg--back.den__leg--right {
    left: calc(var(--den-ux) * 152 - var(--den-u) * 10);
  }

  .den__tower {
    position: absolute;
    bottom: calc(var(--den-u) * 3.2);
    left: calc(var(--den-ux) * 124 - var(--den-u) * 6.5);
    z-index: 1;
    display: flex;
    font-size: calc(var(--den-u) * 1.1);
  }

  /* Le cartucce sul piano, a sinistra; tappetino, tastiera, mouse e lattina al centro. */
  .den__rack {
    position: absolute;
    bottom: calc(var(--den-u) * 27.6);
    left: calc(var(--den-ux) * 8 + var(--den-u) * 4);
    z-index: 4;
    max-width: none;
    font-size: max(0.72rem, calc(var(--den-u) * 1.38));
  }

  .den__rack :deep(.rack__slots) {
    overflow-x: visible;
  }

  .den__gear {
    position: absolute;
    bottom: calc(var(--den-u) * 27.6);
    left: calc(var(--den-ux) * 93 - var(--den-u) * 24);
    z-index: 4;
    display: flex;
    font-size: calc(var(--den-u) * 1.45);
  }

  /* Il monitor è appoggiato sul piano, verso la parete. */
  .den__monitor {
    position: absolute;
    bottom: calc(var(--den-u) * 35);
    left: calc(var(--den-ux) * 80 - var(--den-u) * 35);
    width: calc(var(--den-u) * 70);
    margin: 0;
    --monitor-neck: calc(var(--den-u) * 4);
    --monitor-ratio: 16 / 10;
  }

  /* La scheda è appoggiata sul piano, contro la parete, a destra del monitor: cresce verso l'alto
     e non finisce mai dietro la scrivania. */
  .den__clipboard {
    position: absolute;
    bottom: calc(var(--den-u) * 36.5);
    left: calc(var(--den-ux) * 136 - max(8.25rem, var(--den-u) * 16.5));
    z-index: 3;
    width: max(16.5rem, calc(var(--den-u) * 33));
    margin: 0;
    font-size: max(0.76rem, calc(var(--den-u) * 1.5));
    rotate: -2deg;
  }

  .den__nail {
    display: none;
  }

  .den__clipboard .den__links .highlighter-link {
    min-height: 2.2rem;
  }
}

/* Quando la stanza è bassa la scheda tiene solo l'essenziale, per restare sulla parete. */
@container den-box (height < 46rem) {
  .den__features {
    display: none;
  }
}

/* Cambiando cartuccia, lo schermo si spegne in una riga di luce e si riaccende sul nuovo
   esperimento; la scheda cambia con una dissolvenza. Con movimento ridotto cambiano e basta. */
.screen-swap-leave-active {
  transition: opacity var(--duration-fast) var(--ease-in), transform var(--duration-fast) var(--ease-in);
}

.screen-swap-enter-active {
  transition: opacity 300ms var(--ease-out), transform 300ms var(--ease-out), filter 450ms var(--ease-out);
}

.screen-swap-leave-to,
.screen-swap-enter-from {
  opacity: 0;
  transform: scaleY(0.03);
}

.screen-swap-enter-from {
  filter: brightness(2.5);
}

.sheet-swap-leave-active {
  transition: opacity var(--duration-fast) var(--ease-in);
}

.sheet-swap-enter-active {
  transition: opacity 300ms var(--ease-out);
}

.sheet-swap-leave-to,
.sheet-swap-enter-from {
  opacity: 0;
}

/* L'insegna si accende, con qualche incertezza, mentre sale nello schermo; con movimento ridotto,
   o dove il browser non lo supporta, è già accesa. */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .den__title {
      animation: den-neon linear both;
      animation-timeline: view();
      animation-range: cover 8vh cover 32vh;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .screen-swap-leave-active,
  .screen-swap-enter-active,
  .sheet-swap-leave-active,
  .sheet-swap-enter-active {
    transition: none;
  }
}

@keyframes den-neon {
  0% {
    opacity: 0.15;
  }

  30% {
    opacity: 1;
  }

  38% {
    opacity: 0.35;
  }

  50% {
    opacity: 1;
  }

  58% {
    opacity: 0.55;
  }

  70%,
  100% {
    opacity: 1;
  }
}
</style>
