<template>
  <div class="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[.14em] uppercase text-gold">
    <span><span aria-hidden="true">// </span>{{ label }}</span>
    <span class="w-8 h-px bg-gradient-to-r from-gold to-transparent " aria-hidden="true"></span>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
})
</script>
