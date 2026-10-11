<template>
  <a class="focus-link" :href="href">
    <span class="focus-link__ghost" aria-hidden="true">{{ subject }}</span>
    <span class="focus-link__lens" aria-hidden="true">
      <span class="focus-link__glass"><span>{{ subject }}</span></span>
      <svg viewBox="0 0 46 46"><circle cx="20" cy="20" r="15" /><path d="m31 31 11 11" /></svg>
    </span>
    <span class="focus-link__label"><slot>Esplora {{ subject }}</slot></span>
  </a>
</template>

<script setup>
defineProps({
  href: { type: String, required: true },
  subject: { type: String, required: true },
})
</script>

<style scoped>
.focus-link { --lens-start: 1rem; --lens-travel: 12rem; --lens-counter-travel: -12rem; position: relative; display: grid; place-items: center; width: min(100%, 19rem); min-height: 6.5rem; overflow: hidden; color: var(--pen-blue); font-family: var(--font-hand); font-weight: 700; text-decoration: none; border-block: 0.0625rem solid var(--paper-edge); touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
.focus-link__ghost { color: var(--ink-soft); font-size: 1.9rem; opacity: 0.34; filter: blur(0.16rem); }
.focus-link__lens { position: absolute; top: 50%; left: var(--lens-start); width: 3.4rem; height: 3.4rem; color: var(--pen-red); transform: translateY(-50%); transition: transform var(--duration-short) var(--ease-in-out); }
.focus-link__glass { position: absolute; top: 0.37rem; left: 0.37rem; width: 2.22rem; height: 2.22rem; overflow: hidden; background: var(--surface-control-translucent); border-radius: 50%; }
.focus-link__glass > span { position: absolute; top: 50%; left: -1.37rem; display: grid; place-items: center; width: min(19rem, calc(100vw - 4rem)); color: var(--pen-red); font-size: 1.9rem; white-space: nowrap; transform: translateY(-50%); transition: transform var(--duration-short) var(--ease-in-out); }
.focus-link__lens svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; fill: none; stroke: currentcolor; stroke-linecap: round; stroke-width: 1.8; }
.focus-link__label { position: absolute; right: var(--space-3); bottom: var(--space-2); padding: 0.12rem 0.3rem; background: var(--paper); }
.focus-link:active .focus-link__lens { transform: translate(var(--lens-travel), -50%) scale(0.96); }
.focus-link:active .focus-link__glass > span { transform: translate(var(--lens-counter-travel), -50%); }
.focus-link:focus-visible { outline: 0.1875rem solid var(--focus); outline-offset: 0.3rem; }

@media (hover: hover) and (pointer: fine) {
  .focus-link:hover .focus-link__lens { transform: translate(var(--lens-travel), -50%); }
  .focus-link:hover .focus-link__glass > span { transform: translate(var(--lens-counter-travel), -50%); }
}

@media (prefers-reduced-motion: reduce) {
  .focus-link__lens, .focus-link__glass > span { transition: none; }
}
</style>
