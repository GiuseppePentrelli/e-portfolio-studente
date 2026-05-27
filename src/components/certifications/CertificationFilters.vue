<template>
  <div role="tablist" :aria-label="t('certifications.filters.all')" class="flex flex-wrap gap-2">
    <BaseButton
      v-for="filter in store.filters"
      :key="filter.id"
      role="tab"
      :aria-selected="store.activeFilter === filter.id"
      :variant="store.activeFilter === filter.id ? 'outline' : 'ghost'"
      :class="store.activeFilter === filter.id ? 'border-gold text-gold' : ''"
      @click="store.setFilter(filter.id)"
    >
      [ {{ t('certifications.filters.' + filter.id) }} ]
    </BaseButton>
  </div>
</template>

<script setup>
import { useCertificationsStore } from '@/stores/certificationsStore'
import { useLocale } from '@/composables/useLocale'
import BaseButton from '@/components/ui/BaseButton.vue'

const store = useCertificationsStore()
const { t } = useLocale()
</script>
