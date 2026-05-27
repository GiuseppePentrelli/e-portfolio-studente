<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee-track">
      <span v-for="(item, i) in items" :key="i" class="marquee-item">
        <span class="sep">★</span>{{ item }}
      </span>
      <!-- duplicato per loop seamless -->
      <span v-for="(item, i) in items" :key="`b-${i}`" class="marquee-item">
        <span class="sep">★</span>{{ item }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { t } = useLocale()
const items = computed(() => t('marquee.items'))
</script>

<style scoped>
.marquee {
  overflow: hidden;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: 12px 0;
  background: var(--color-surface);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 40s linear infinite;
}

.marquee:hover .marquee-track {
  animation-play-state: paused;
}

.marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-family-mono);
  font-size: 12px;
  color: var(--color-text-2);
  white-space: nowrap;
  padding: 0 6px;
}

.sep {
  color: var(--color-gold);
  font-size: 10px;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
</style>
