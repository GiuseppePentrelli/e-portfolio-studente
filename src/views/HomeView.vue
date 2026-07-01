<template>
  <div class="px-4 sm:px-7 py-6 max-w-330 mx-auto">
    <HeroSection />

    <TechStrip class="-mx-8 my-14" />

    <FeaturedSection />

    <section id="projects" aria-labelledby="projects-title" class="mt-16">
      <SectionLabel :label="t('projects.label')" class="mb-3" />
      <h2 id="projects-title" class="font-sans font-bold text-[clamp(24px,3vw,36px)] leading-tight tracking-tight text-text mb-8 light:font-[family-name:var(--font-family-display)]">
        {{ t('projects.title_1') }} <em class="italic font-medium text-coral light:not-italic light:font-bold light:bg-fill-coral light:text-[#111] light:px-1">{{ t('projects.title_em') }}</em>
      </h2>

      <ProjectFilters class="mb-8" />
      <ProjectGrid />
    </section>

    <MarqueeStrip class="-mx-8 my-14" />

    <ComponentSection />

    <CertificationSection />
  </div>
</template>

<script setup>
import { useLocale } from '@/composables/useLocale'
import HeroSection from '@/components/home/HeroSection.vue'
import TechStrip from '@/components/home/TechStrip.vue'
import MarqueeStrip from '@/components/home/MarqueeStrip.vue'
import FeaturedSection from '@/components/featured/FeaturedSection.vue'
import ProjectFilters from '@/components/projects/ProjectFilters.vue'
import ProjectGrid from '@/components/projects/ProjectGrid.vue'
import ComponentSection from '@/components/custom/ComponentSection.vue'
import CertificationSection from '@/components/certifications/CertificationSection.vue'
import SectionLabel from '@/components/ui/SectionLabel.vue'

const { t } = useLocale()
</script>
