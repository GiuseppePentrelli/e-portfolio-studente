<template>
  <!-- Una polaroid appuntata alla bacheca: per gli oggetti che non si possono appendere. La foto
       arriva dallo slot ed è decorativa: chi la usa le dà alt="". Con pin="" la polaroid non ha una
       puntina sua, per esempio quando la tiene quella del filo. Con `develop` la foto si sviluppa
       mentre entra nello schermo, come una Polaroid vera. -->
  <figure
    class="polaroid"
    :class="{ 'polaroid--develop': develop }"
    :style="{ '--tilt': `${tilt}deg` }"
    aria-hidden="true"
  >
    <BoardPin v-if="pin" class="polaroid__pin" :color="pin" />
    <div class="polaroid__photo"><slot /></div>
    <figcaption>{{ caption }}</figcaption>
  </figure>
</template>

<script setup>
import BoardPin from './BoardPin.vue'

defineProps({
  caption: { type: String, required: true },
  tilt: { type: Number, default: -6 },
  pin: { type: String, default: 'green' },
  develop: { type: Boolean, default: false },
})
</script>

<style scoped>
.polaroid {
  position: relative;
  width: 9.5rem;
  margin: 0;
  padding: 0.5rem 0.5rem 0.3rem;
  background: var(--polaroid);
  box-shadow: 0.35rem 0.6rem 0.6rem -0.2rem rgb(40 22 8 / 40%);
  rotate: var(--tilt);
}

.polaroid__pin {
  top: 0.2rem;
  left: 50%;
}

/* Il soggetto è ritagliato: lo sfondo chiaro fa da stanza in cui è stata scattata la foto. Il
   bordo della foto taglia ciò che sporge con clip, che non crea un contenitore di scorrimento: dentro
   può stare anche un oggetto animato dallo scorrimento. */
.polaroid__photo {
  position: relative;
  display: block;
  padding: 0.6rem;
  overflow: clip;
  background: linear-gradient(#efe7da, #d8c9b2);
}

.polaroid__photo :slotted(img) {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: contain;
}

.polaroid figcaption {
  padding-top: 0.25rem;
  color: var(--graphite);
  font-family: var(--font-hand);
  font-size: 0.95rem;
  line-height: 1.25;
  text-align: center;
}

/* Lo sviluppo: una Polaroid esce dalla macchina quasi nera, coperta dallo strato scuro che protegge
   la pellicola. Lo strato si schiarisce e l'immagine affiora scura e fredda, quasi senza colore; i
   colori pieni arrivano per ultimi. Con movimento ridotto, o dove il browser non lo supporta, la foto
   è già sviluppata. */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .polaroid--develop {
      view-timeline: --polaroid block;
    }

    .polaroid--develop .polaroid__photo::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(160deg, #1f262d, #12171c);
      animation: polaroid-veil linear both;
      animation-timeline: --polaroid;
      animation-range: cover 10vh cover 62vh;
    }

    .polaroid--develop .polaroid__photo :slotted(img) {
      animation: polaroid-image linear both;
      animation-timeline: --polaroid;
      animation-range: cover 10vh cover 62vh;
    }
  }
}

@keyframes polaroid-veil {
  from {
    opacity: 1;
  }

  30% {
    opacity: 0.88;
  }

  70% {
    opacity: 0.25;
  }

  to {
    opacity: 0;
  }
}

@keyframes polaroid-image {
  from {
    filter: saturate(0.1) brightness(0.55) contrast(0.85) hue-rotate(-12deg);
  }

  60% {
    filter: saturate(0.4) brightness(0.85) contrast(0.95) hue-rotate(-6deg);
  }

  to {
    filter: none;
  }
}
</style>
