<template>
  <button
    ref="buttonElement"
    class="pencil-menu"
    type="button"
    :aria-expanded="expanded"
    :aria-label="expanded ? 'Chiudi l’indice' : 'Apri l’indice'"
  >
    <svg viewBox="0 0 34 30" aria-hidden="true">
      <path class="pencil-menu__line" d="M2 5q8-3 15 0t15 0" />
      <path class="pencil-menu__line" d="M2 15q8 3 15 0t15 0" />
      <path class="pencil-menu__line" d="M2 25q8-3 15 0t15 0" />
      <path class="pencil-menu__cross" d="M4 2 30 28" />
      <path class="pencil-menu__cross pencil-menu__cross--delay" d="M30 2 4 28" />
    </svg>
    <span>Indice</span>
  </button>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  expanded: {
    type: Boolean,
    default: false,
  },
})

const buttonElement = ref(null)

defineExpose({
  focus: () => buttonElement.value?.focus(),
})
</script>

<style scoped>
.pencil-menu {
  display: inline-flex;
  gap: 0.6rem;
  align-items: center;
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: 0.2rem 0.35rem;
  color: var(--pen-black);
  font-family: var(--font-hand);
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1;
  background: none;
  border: 0;
  cursor: pointer;
  transition: transform var(--transition-fast);
}

.pencil-menu:active {
  transform: scale(0.97);
}

.pencil-menu:focus-visible {
  outline: 0.1875rem solid var(--focus);
  outline-offset: 0.1875rem;
  border-radius: 0.375rem;
}

.pencil-menu svg {
  width: 2.125rem;
  height: 1.875rem;
  overflow: visible;
}

.pencil-menu__line,
.pencil-menu__cross {
  fill: none;
  stroke-linecap: round;
}

.pencil-menu__line {
  stroke: var(--pen-black);
  stroke-width: 2.6;
  transition: opacity var(--transition-fast);
}

.pencil-menu__cross {
  stroke: var(--pen-red);
  stroke-width: 3;
  opacity: 0;
  transform: scale(0.95);
  transform-origin: center;
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.pencil-menu[aria-expanded="true"] .pencil-menu__line {
  opacity: 0.25;
}

.pencil-menu[aria-expanded="true"] .pencil-menu__cross {
  opacity: 1;
  transform: scale(1);
}

.pencil-menu__cross--delay {
  transition-delay: 90ms;
}

@media (prefers-reduced-motion: reduce) {
  .pencil-menu__line,
  .pencil-menu__cross {
    transition: opacity var(--duration-micro) linear;
  }

  .pencil-menu {
    transition: none;
  }

  .pencil-menu:active {
    transform: none;
    opacity: 0.75;
  }
}
</style>
