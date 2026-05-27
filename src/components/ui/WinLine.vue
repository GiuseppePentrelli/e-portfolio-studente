<template>
  <div class="win-line grid gap-1" :class="{ 'is-visible': visible }"
       style="grid-template-columns: 28px 1fr; align-items: baseline;">
    <span class="text-right pr-1.5 text-text-3 select-none text-[12px]" aria-hidden="true">{{ n }}</span>
    <span><slot /></span>
  </div>
</template>

<script setup>
defineProps({
  n:       { type: [Number, String], required: true },
  visible: { type: Boolean, default: true },
})
</script>

<style scoped>
.win-line {
  opacity: 0;
  transform: translateY(5px);
  transition: opacity .14s ease, transform .14s ease;
}
.win-line.is-visible {
  opacity: 1;
  transform: none;
}
</style>
