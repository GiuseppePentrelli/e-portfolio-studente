<template>
  <div class="flex flex-col items-center justify-center min-h-96 gap-4 font-mono">
    <h1 class="text-6xl font-bold text-coral m-0">404</h1>
    <p class="text-text-2">{{ t('not_found.message') }}</p>
    <RouterLink to="/" class="text-blue hover:text-text transition-colors duration-200 text-sm">
      {{ t('not_found.back') }}
    </RouterLink>
  </div>
</template>

<script setup>
import { useLocale } from '@/composables/useLocale'
const { t } = useLocale()
</script>
