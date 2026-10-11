<template>
  <a class="highlighter-link" :href="href">
    <span class="highlighter-link__label"><slot /></span>
    <span class="highlighter-link__arrow" aria-hidden="true">→</span>
  </a>
</template>

<script setup>
defineProps({
  href: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.highlighter-link {
  display: inline-flex;
  gap: 0.28em;
  align-items: center;
  min-height: 2.75rem;
  padding: 0.45rem 0.2rem;
  color: var(--pen-blue);
  font-family: var(--font-hand);
  font-size: 1.45rem;
  font-weight: 700;
  line-height: 1.25;
  text-decoration: none;
  white-space: nowrap;
}

.highlighter-link__label {
  position: relative;
  isolation: isolate;
}

.highlighter-link__label::before {
  content: "";
  position: absolute;
  right: -0.2em;
  bottom: 0.02em;
  left: -0.16em;
  z-index: -1;
  height: 0.58em;
  background:
    radial-gradient(ellipse at 5% 50%, rgb(255 213 0 / 78%), transparent 72%),
    linear-gradient(102deg, rgb(255 213 0 / 88%), rgb(255 213 0 / 62%) 82%, rgb(255 213 0 / 82%));
  border-radius: 0.55em 0.2em 0.5em 0.16em;
  opacity: 0;
  clip-path: inset(0 100% 0 0);
  transform: rotate(-0.7deg);
  transition: opacity 80ms linear, clip-path var(--duration-fast) var(--ease-out);
}

.highlighter-link:focus-visible .highlighter-link__label::before,
.highlighter-link:active .highlighter-link__label::before {
  opacity: 1;
  clip-path: inset(0);
}

.highlighter-link:focus-visible {
  outline: 0.1875rem solid var(--focus);
  outline-offset: 0.15rem;
  border-radius: 0.25rem;
}

.highlighter-link:focus-visible .highlighter-link__label::before {
  transition: none;
}

@media (hover: hover) and (pointer: fine) {
  .highlighter-link:hover .highlighter-link__label::before {
    opacity: 1;
    clip-path: inset(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .highlighter-link__label::before {
    transition: opacity var(--duration-micro) linear;
  }
}
</style>
