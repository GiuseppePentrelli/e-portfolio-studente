<template>
  <section aria-label="Presentazione" class="max-w-330 mx-auto px-7 py-10 grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-14 items-center">

    <!-- Testo -->
    <div>
      <SectionLabel :label="t('hero.chapter')" class="mb-4" />

      <!-- Badge documento ufficiale -->
      <div class="doc-badge mb-5">
        <span class="doc-badge-line">{{ me.school.name }} · {{ me.school.class }} · a.s. {{ me.school.year }}</span>
        <span class="doc-badge-line main">{{ t('hero.doc_label') }}</span>
      </div>

      <h1 class="font-sans text-[clamp(28px,3.6vw,42px)] font-semibold leading-[1.15] tracking-tight text-text mb-4 light:font-[family-name:var(--font-family-display)] light:font-bold">
        {{ t('hero.greeting_pre') }} <span class="text-coral italic font-medium">{{ me.name.split(' ')[0] }}</span>.<br/>
        {{ t('hero.building_pre') }}
        <span class="font-mono text-blue font-medium text-[.85em]">&lt;template&gt;</span>,<br/>
        <span class="font-mono text-blue font-medium text-[.85em]">canvas</span>
        {{ t('hero.building_post') }}
      </h1>

      <p class="text-text-2 text-[15.5px] leading-relaxed max-w-[50ch] mb-7">
        {{ t('hero.lede') }}
        <span class="text-gold">{{ t('hero.lede_highlight') }}</span> {{ t('hero.lede_post') }}
      </p>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4 pt-5 border-t border-dashed border-border-2 font-mono text-[11px] text-text-3 tracking-[.04em]">
        <div>{{ t('hero.meta_class') }}<b class="block font-sans font-semibold text-sm text-text tracking-normal mt-1">{{ me.school.class }}</b></div>
        <div>{{ t('hero.meta_year') }}<b class="block font-sans font-semibold text-sm text-text tracking-normal mt-1">{{ me.school.year }}</b></div>
        <div class="col-span-2 sm:col-span-1">{{ t('hero.meta_status') }}<b class="block font-sans font-semibold text-sm text-green tracking-normal mt-1">● {{ t('hero.status_value') }}</b></div>
      </div>
    </div>

    <!-- Bio Window -->
    <BioWindow />

  </section>
</template>

<script setup>
import { useLocale } from '@/composables/useLocale'
import BioWindow from '@/components/home/BioWindow.vue'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import me from '@/data/me.json'

const { t } = useLocale()
</script>

<style scoped>
.doc-badge {
  display: inline-flex;
  flex-direction: column;
  gap: 3px;
  border: 1px solid var(--color-border-2);
  border-radius: var(--radius-btn);
  padding: 8px 14px;
  background: var(--color-surface);
}
[data-theme="light"] .doc-badge {
  border: 2px solid var(--color-ink);
  box-shadow: var(--shadow-btn);
  rotate: -1deg;
}
.doc-badge-line {
  font-family: var(--font-family-mono);
  font-size: 0.68rem;
  color: var(--color-text-3);
  letter-spacing: 0.04em;
}
.doc-badge-line.main {
  color: var(--color-gold);
  font-weight: 600;
  font-size: 0.72rem;
}
</style>
