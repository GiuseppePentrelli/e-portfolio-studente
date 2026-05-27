<template>
  <header class="fixed top-0 inset-x-0 z-50 h-14 bg-bg/80 backdrop-blur-md backdrop-saturate-150 border-b border-border">
    <div class="max-w-330 h-full mx-auto px-4 sm:px-7 flex items-center justify-between gap-4 font-mono text-xs">

      <!-- Brand -->
      <a href="#top" class="flex items-center gap-2.5 text-text font-semibold shrink-0" :aria-label="me.name">
        <span class="w-7 h-7 rounded-btn bg-surface-2 border border-border-2 grid place-items-center font-black text-xs text-gold"
              style="box-shadow: inset 0 0 14px rgba(245,200,66,.12)" aria-hidden="true">
          GP
        </span>
        <span class="hidden sm:inline">
          {{ me.name }}
          <span class="inline-block w-1.5 h-1.5 rounded-full bg-green mx-1 align-middle"
                style="box-shadow: 0 0 6px var(--color-green)" aria-hidden="true"></span>
        </span>
      </a>

      <!-- Centro — nascosto su mobile -->
      <div class="hidden md:block text-center text-text-3 tracking-wide" aria-hidden="true">
        <span>portfolio</span>
        <span class="mx-2 text-text-3">·</span>
        <span class="text-gold">{{ me.portfolio.version }}</span>
        <span class="mx-2 text-text-3">·</span>
        <span>{{ t('nav.school_year_prefix') }}</span>
        <span class="mx-2 text-text-3">·</span>
        <span>{{ me.school.year }}</span>
      </div>

      <!-- Destra -->
      <div class="flex items-center gap-2 sm:gap-3.5 shrink-0">
        <!-- GitHub: icona sempre, testo solo da sm in su -->
        <BaseButton :href="me.contact.github_personal" target="_blank" :aria-label="t('nav.github')">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.02c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18A10.93 10.93 0 0 1 12 6.84c.98 0 1.97.13 2.89.39 2.2-1.49 3.15-1.18 3.15-1.18.63 1.58.23 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.44-2.69 5.41-5.26 5.69.41.36.78 1.06.78 2.15v3.18c0 .31.21.67.8.56C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z"/>
          </svg>
          <span class="hidden sm:inline">github</span>
        </BaseButton>

        <!-- Locale toggle -->
        <TogglePill
          :options="localeOptions"
          :modelValue="locale"
          :groupLabel="t('nav.locale_group')"
          @select="setLocale"
        >
          <template #default="{ opt }">{{ opt.value }}</template>
        </TogglePill>

        <!-- Theme toggle -->
        <TogglePill
          :options="themeOptions"
          :modelValue="theme"
          :groupLabel="t('nav.theme_group')"
          @select="setTheme"
        >
          <template #default="{ opt }">
            <svg v-if="opt.value === 'dark'" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
            </svg>
            <svg v-else class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
            </svg>
          </template>
        </TogglePill>
      </div>

    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { useLocale } from '@/composables/useLocale'
import BaseButton from '@/components/ui/BaseButton.vue'
import TogglePill from '@/components/ui/TogglePill.vue'
import me from '@/data/me.json'

const { theme, setTheme } = useTheme()
const { locale, setLocale, t, SUPPORTED_LOCALES } = useLocale()

const localeOptions = computed(() =>
  SUPPORTED_LOCALES.map(loc => ({ value: loc, label: loc.toUpperCase() }))
)

const themeOptions = computed(() => [
  { value: 'dark',  label: t('nav.theme_dark') },
  { value: 'light', label: t('nav.theme_light') },
])
</script>
