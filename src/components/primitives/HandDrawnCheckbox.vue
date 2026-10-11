<template>
  <label class="hand-checkbox" :class="{ 'hand-checkbox--disabled': disabled }">
    <input v-model="checked" type="checkbox" :disabled="disabled" />
    <span class="hand-checkbox__box" aria-hidden="true"></span>
    <span class="hand-checkbox__label"><slot /></span>
  </label>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

const checked = defineModel({ type: Boolean, default: false })
</script>

<style scoped>
.hand-checkbox {
  position: relative;
  display: grid;
  grid-template-columns: 1.25rem minmax(0, auto);
  gap: 0.75rem;
  align-items: center;
  width: fit-content;
  min-height: 2.75rem;
  color: var(--pen-black);
  font-family: var(--font-hand);
  font-size: 1.08rem;
  line-height: 1.45;
  cursor: pointer;
}

.hand-checkbox input {
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  margin: 0;
  opacity: 0;
  cursor: inherit;
}

.hand-checkbox__box {
  position: relative;
  display: grid;
  width: 1.125rem;
  height: 1.125rem;
  place-items: center;
  background: var(--paper);
  border: 0.125rem solid var(--pen-black);
  border-radius: 0.1875rem 0.3125rem 0.1875rem 0.25rem;
  overflow: visible;
  rotate: -1deg;
  transition: transform var(--transition-fast);
}

.hand-checkbox__box::after {
  content: "✓";
  color: var(--pen-red);
  font-family: var(--font-hand);
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  opacity: 0;
  transform: translate(0.125rem, -0.25rem) scale(0.92);
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.hand-checkbox__label {
  position: relative;
  width: fit-content;
}

.hand-checkbox__label::after {
  content: "";
  position: absolute;
  top: 43%;
  right: -0.2rem;
  left: -0.15rem;
  height: 0.5rem;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 12' preserveAspectRatio='none'%3E%3Cpath d='M2 7 C35 3 63 9 96 6 S155 4 184 7 S246 3 298 6' fill='none' stroke='%23a1443d' stroke-opacity='.64' stroke-width='2.2' stroke-linecap='round'/%3E%3Cpath d='M5 8 C48 5 72 8 112 6 S190 8 230 5 S273 6 296 5' fill='none' stroke='%23a1443d' stroke-opacity='.22' stroke-width='1.1' stroke-linecap='round'/%3E%3C/svg%3E") center / 100% 100% no-repeat;
  opacity: 0;
  pointer-events: none;
  transform: scaleX(0);
  transform-origin: left center;
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.hand-checkbox input:checked + .hand-checkbox__box::after {
  opacity: 1;
  transform: translate(0.125rem, -0.25rem) scale(1);
}

.hand-checkbox input:checked ~ .hand-checkbox__label {
  color: var(--ink-soft);
}

.hand-checkbox input:checked ~ .hand-checkbox__label::after {
  opacity: 1;
  transform: scaleX(1);
}

.hand-checkbox:active .hand-checkbox__box {
  transform: scale(0.95);
}

.hand-checkbox input:focus-visible + .hand-checkbox__box {
  outline: 0.1875rem solid var(--focus);
  outline-offset: 0.1875rem;
}

.hand-checkbox--disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

@media (prefers-reduced-motion: reduce) {
  .hand-checkbox__box::after,
  .hand-checkbox__label::after {
    transition: opacity var(--duration-micro) linear;
  }

  .hand-checkbox__box {
    transition: none;
  }


  .hand-checkbox:active .hand-checkbox__box {
    transform: none;
    background: var(--paper-warm);
  }
}
</style>
