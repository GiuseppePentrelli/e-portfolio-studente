<template>
  <section id="certifications" aria-labelledby="certifications-title" class="mt-16">
    <SectionLabel :label="t('certifications.label')" class="mb-3" />
    <h2
      id="certifications-title"
      class="font-sans font-bold text-[clamp(24px,3vw,36px)] leading-tight tracking-tight text-text mb-8"
    >
      {{ t('certifications.title_1') }}
      <em class="italic font-medium text-coral">{{ t('certifications.title_em') }}</em>
    </h2>

    <CertificationFilters class="mb-8" />

    <Transition mode="out-in" :name="'cert-fade'">
      <div
        v-if="store.filteredCertifications.length"
        :key="store.activeFilter"
        class="cert-grid"
      >
        <CertificationCard
          v-for="cert in store.filteredCertifications"
          :key="cert.id"
          :cert="cert"
        />
      </div>
      <p v-else :key="'empty'" class="text-text-3 font-mono text-sm mt-4">
        {{ t('certifications.empty') }}
      </p>
    </Transition>
  </section>
</template>

<script setup>
import { useCertificationsStore } from '@/stores/certificationsStore'
import { useLocale } from '@/composables/useLocale'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import CertificationFilters from './CertificationFilters.vue'
import CertificationCard from './CertificationCard.vue'

const store = useCertificationsStore()
const { t } = useLocale()
</script>

<style scoped>
.cert-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.25rem;
}

.cert-fade-enter-active,
.cert-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.cert-fade-enter-from,
.cert-fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
