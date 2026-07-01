<template>
  <article class="proj-card bg-surface border border-border rounded-card overflow-hidden flex flex-col gap-4 hover:border-blue transition-all duration-300 hover:-translate-y-1">

    <!-- Cover image -->
    <div v-if="project.coverImage" class="cover-wrap">
      <img v-if="theme !== 'light'" :src="assetUrl(project.coverImage)" aria-hidden="true" class="cover-blur-bg" />
      <img :src="assetUrl(project.coverImage)" :alt="project.title" class="cover-img" loading="lazy" />
    </div>
    <div v-else class="cover-placeholder"></div>

    <div class="px-6 pb-6 flex flex-col gap-4 flex-1">
    <div class="flex items-start justify-between gap-2">
      <h3 class="text-text font-bold text-lg leading-snug">{{ project.title }}</h3>
      <span
        v-if="project.featured"
        class="shrink-0 text-xs font-mono px-2 py-0.5 rounded-tag bg-surface-2 text-gold border border-border-2 light:font-bold light:bg-fill-gold light:text-[#111] light:border-ink"
      >
        featured
      </span>
    </div>

    <p class="text-text-2 text-sm leading-relaxed flex-1">{{ project.description }}</p>

    <div class="flex flex-wrap gap-1.5">
      <span
        v-for="tag in project.tags"
        :key="tag"
        class="text-xs font-mono px-2 py-0.5 rounded-tag bg-surface-2 text-text-3 border border-border light:text-text-2 light:border-ink"
      >
        {{ tag }}
      </span>
    </div>

    <a
      :href="project.externalUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="mt-auto inline-flex items-center gap-2 text-sm font-mono text-blue hover:text-text transition-colors duration-200"
    >
      {{ t('projects.explore') }}
      <span aria-hidden="true">↗</span>
    </a>
    </div>
  </article>
</template>

<script setup>
import { useLocale } from '@/composables/useLocale'
import { useTheme } from '@/composables/useTheme'
import { assetUrl } from '@/utils/assets'

defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const { t } = useLocale()
const { theme } = useTheme()
</script>

<style scoped>
.cover-wrap {
  width: 100%;
  height: 250px;
  overflow: hidden;
  border-bottom: 1px solid var(--color-border);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.cover-blur-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.1);
  filter: blur(18px) brightness(0.45) saturate(1.4);
  pointer-events: none;
}
.cover-img {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform .4s ease;
  filter: drop-shadow(0 4px 16px rgba(0,0,0,0.5));
}
article:hover .cover-img {
  transform: scale(1.04);
}
.cover-placeholder {
  width: 100%;
  height: 250px;
  background:
    linear-gradient(135deg, var(--color-surface-2) 0%, var(--color-surface-3) 100%);
  border-bottom: 1px solid var(--color-border);
}

/* === LIGHT MODE (brutal-giocoso) ====================================== */

[data-theme="light"] .proj-card {
  border: 2px solid var(--color-ink);
  box-shadow: var(--shadow-card);
  transition: transform .15s ease, box-shadow .15s ease;
  transform: rotate(var(--tilt, 0deg));
}
[data-theme="light"] .proj-card:nth-child(3n+1) { --tilt: -0.75deg; }
[data-theme="light"] .proj-card:nth-child(3n+2) { --tilt: 0.5deg; }
[data-theme="light"] .proj-card:nth-child(3n)   { --tilt: -0.5deg; }
[data-theme="light"] .proj-card:hover {
  transform: translate(3px, 3px) rotate(var(--tilt, 0deg));
  box-shadow: var(--shadow-btn);
}
@media (max-width: 768px) {
  [data-theme="light"] .proj-card { --tilt: 0deg; }
}

[data-theme="light"] .cover-wrap {
  border-bottom: 2px solid var(--color-ink);
  background: color-mix(in srgb, var(--color-fill-blue) 25%, var(--color-surface));
}
[data-theme="light"] .cover-img {
  transition: transform .2s ease;
  filter: none;
}
[data-theme="light"] .cover-placeholder {
  background: color-mix(in srgb, var(--color-fill-purple) 25%, var(--color-surface));
  border-bottom: 2px solid var(--color-ink);
}
</style>
