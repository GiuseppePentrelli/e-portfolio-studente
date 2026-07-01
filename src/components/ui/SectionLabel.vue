<template>
  <div class="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[.14em] uppercase text-gold">
    <span class="light:font-bold light:bg-fill-gold light:text-[#111] light:border-2 light:border-ink light:rounded-tag light:px-2 light:py-0.5 light:shadow-[3px_3px_0_0_var(--color-ink)] light:-rotate-1"><span aria-hidden="true">// </span>{{ label }}</span>
    <span class="w-8 h-px bg-gradient-to-r from-gold to-transparent light:bg-none light:h-[3px] light:bg-ink" aria-hidden="true"></span>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
})
</script>
