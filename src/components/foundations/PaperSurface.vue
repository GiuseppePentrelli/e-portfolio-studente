<template>
  <section
    class="surface"
    :class="[`surface--${background}`, `surface--${paper}`]"
    :aria-label="label"
  >
    <div class="surface__desk-marks" aria-hidden="true"></div>
    <DeskProps v-if="background === 'desk'" />
    <div class="paper">
      <span class="paper__fold" aria-hidden="true"></span>
      <span class="paper__smudge paper__smudge--one" aria-hidden="true"></span>
      <span class="paper__smudge paper__smudge--two" aria-hidden="true"></span>
      <div class="paper__content">
        <SamplePaperContent />
      </div>
    </div>
  </section>
</template>

<script setup>
import DeskProps from './DeskProps.vue'
import SamplePaperContent from './SamplePaperContent.vue'

defineProps({
  background: {
    type: String,
    required: true,
    validator: value => ['desk', 'illustrated', 'paper'].includes(value),
  },
  paper: {
    type: String,
    required: true,
    validator: value => ['notebook', 'fluid', 'hybrid'].includes(value),
  },
  label: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.surface {
  position: relative;
  isolation: isolate;
  min-height: clamp(38rem, 75vh, 54rem);
  overflow: clip;
  padding: clamp(1rem, 5vw, 4rem);
}

.surface--desk {
  background:
    linear-gradient(96deg, transparent 0 18%, rgb(79 56 30 / 7%) 18.2% 18.35%, transparent 18.55% 68%, rgb(79 56 30 / 6%) 68.2% 68.35%, transparent 68.6%),
    repeating-linear-gradient(3deg, rgb(255 255 255 / 3%) 0 0.12rem, transparent 0.13rem 1.2rem),
    #cbbb9d;
}

.surface--desk::before {
  content: "";
  position: absolute;
  inset: auto auto 8% 4%;
  z-index: -1;
  width: 8rem;
  aspect-ratio: 1;
  border: 0.55rem solid rgb(103 73 42 / 14%);
  border-radius: 50%;
}

.surface--illustrated {
  background-color: #bcd9d3;
  background-image:
    radial-gradient(circle at 12% 18%, rgb(255 228 118 / 72%) 0 5rem, transparent 5.1rem),
    radial-gradient(circle at 92% 84%, rgb(241 163 187 / 68%) 0 7rem, transparent 7.1rem),
    linear-gradient(125deg, transparent 42%, rgb(36 48 58 / 10%) 42.2% 42.5%, transparent 42.7%);
}

.surface--illustrated::before,
.surface--illustrated::after {
  content: "";
  position: absolute;
  z-index: -1;
  border: 0.15rem solid rgb(36 48 58 / 56%);
  border-radius: 46% 54% 52% 48%;
}

.surface--illustrated::before {
  top: 7%;
  right: 4%;
  width: 7rem;
  height: 3.5rem;
  rotate: 14deg;
}

.surface--illustrated::after {
  bottom: 5%;
  left: 5%;
  width: 4rem;
  height: 8rem;
  rotate: -24deg;
}

.surface--paper {
  padding: 0;
  background: transparent;
}

.surface__desk-marks {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

.surface--desk .surface__desk-marks::before {
  content: "";
  position: absolute;
  top: 5%;
  right: 4%;
  width: 9rem;
  height: 2.2rem;
  rotate: 5deg;
  background: rgb(247 222 119 / 72%);
  box-shadow: 0 0.35rem 0.7rem rgb(57 45 29 / 14%);
  clip-path: polygon(1% 6%, 99% 0, 96% 92%, 3% 100%);
}

.paper {
  position: relative;
  min-width: 0;
  max-width: 100%;
  margin-inline: auto;
  color: var(--ink);
  background-color: var(--paper);
  background-image:
    linear-gradient(90deg, transparent 0 4.65rem, var(--margin-red) 4.68rem 4.77rem, transparent 4.8rem),
    repeating-linear-gradient(to bottom, transparent 0 calc(var(--paper-line-height) - 0.0625rem), var(--line-blue) calc(var(--paper-line-height) - 0.0625rem) var(--paper-line-height)),
    radial-gradient(ellipse at 14% 8%, rgb(141 119 79 / 7%), transparent 9rem),
    radial-gradient(ellipse at 80% 72%, rgb(94 80 59 / 5%), transparent 12rem);
  border: 0.0625rem solid var(--paper-edge);
  box-shadow: 0 0.3rem 0.7rem rgb(63 48 29 / 12%), 0 1.4rem 3rem rgb(63 48 29 / 18%);
}

.surface--notebook .paper {
  width: min(100%, 58rem);
  min-height: 42rem;
  aspect-ratio: auto;
}

.surface--fluid .paper {
  width: 100%;
  min-height: 42rem;
}

.surface--hybrid .paper {
  width: min(100%, 68rem);
  min-height: 42rem;
}

.surface--paper .paper {
  width: 100%;
  min-height: inherit;
  background: transparent;
  border: 0;
  box-shadow: none;
}

.surface--paper .paper::before,
.surface--paper .paper::after,
.surface--paper .paper__fold,
.surface--paper .paper__smudge {
  display: none;
}

.paper::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.18;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.18'/%3E%3C/svg%3E");
  mix-blend-mode: multiply;
}

.paper::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  box-shadow: inset 0 0 2.5rem rgb(117 89 48 / 8%);
}

.paper__content {
  position: relative;
  z-index: 1;
  min-width: 0;
  max-width: 100%;
  padding: clamp(3.2rem, 8vw, 6.5rem) clamp(1.2rem, 7vw, 6.5rem) clamp(3rem, 7vw, 5rem);
}

.paper__fold {
  position: absolute;
  top: -0.0625rem;
  right: -0.0625rem;
  z-index: 2;
  width: clamp(2.8rem, 8vw, 5rem);
  aspect-ratio: 1;
  background: linear-gradient(225deg, #d9ccb0 0 48%, transparent 49%), linear-gradient(45deg, #eee4ca 0 49%, transparent 50%);
  filter: drop-shadow(-0.2rem 0.25rem 0.2rem rgb(70 54 35 / 13%));
  clip-path: polygon(0 0, 100% 0, 100% 100%);
}

.paper__smudge {
  position: absolute;
  z-index: 1;
  width: 4rem;
  height: 0.8rem;
  opacity: 0.14;
  background: var(--graphite);
  filter: blur(0.35rem);
  pointer-events: none;
}

.paper__smudge--one {
  top: 31%;
  right: 6%;
  rotate: -8deg;
}

.paper__smudge--two {
  bottom: 12%;
  left: 8%;
  width: 2.8rem;
  rotate: 4deg;
}

@media (max-width: 39.99rem) {
  .surface {
    padding-inline: 0.65rem;
  }

  .paper {
    background-image:
      linear-gradient(90deg, transparent 0 2rem, var(--margin-red) 2.03rem 2.1rem, transparent 2.13rem),
      repeating-linear-gradient(to bottom, transparent 0 calc(var(--paper-line-height) - 0.0625rem), var(--line-blue) calc(var(--paper-line-height) - 0.0625rem) var(--paper-line-height)),
      radial-gradient(ellipse at 14% 8%, rgb(141 119 79 / 7%), transparent 9rem),
      radial-gradient(ellipse at 80% 72%, rgb(94 80 59 / 5%), transparent 12rem);
  }

  .paper__content {
    padding-inline: 3.15rem 1rem;
  }

  .surface--notebook .paper {
    aspect-ratio: auto;
  }

  .surface--paper {
    padding-inline: 0;
  }

  .surface--paper .paper {
    border-radius: 0;
  }
}
</style>
