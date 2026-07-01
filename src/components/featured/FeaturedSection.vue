<template>
  <section id="capolavori" aria-labelledby="capolavori-title" class="mt-16">
    <div class="flex items-end justify-between mb-8 gap-4">
      <div>
        <SectionLabel :label="t('featured.label')" class="mb-3" />
        <h2 id="capolavori-title" class="font-sans font-bold text-[clamp(24px,3vw,36px)] leading-tight tracking-tight text-text light:font-[family-name:var(--font-family-display)]">
          {{ t('featured.title') }} <em class="italic font-medium text-coral not-italic light:font-bold light:bg-fill-coral light:text-[#111] light:px-1">{{ t('featured.title_em') }}</em>
        </h2>
      </div>
      <span class="font-mono text-xs text-text-3 shrink-0">
        {{ capolavori.length }} / {{ capolavori.length }} featured
      </span>
    </div>

    <div class="featured-grid">
      <FeaturedCard
        v-for="(project, i) in capolavori"
        :key="project.id"
        :id="`capolavoro-${project.id}`"
        :project="project"
        :style="{ '--i': i }"
      />
    </div>
  </section>
</template>

<script setup>
import capolavori from '@/data/capolavori.json'
import { useLocale } from '@/composables/useLocale'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import FeaturedCard from './FeaturedCard.vue'

const { t } = useLocale()
</script>

<style scoped>
.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
@media (max-width: 1024px) {
  .featured-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .featured-grid { grid-template-columns: 1fr; }
}
</style>
