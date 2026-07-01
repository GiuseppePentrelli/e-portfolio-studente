<template>
  <div
    role="tablist"
    :aria-label="t('projects.filters.all')"
    class="flex flex-wrap gap-2"
  >
    <BaseButton
      v-for="filter in store.filters"
      :key="filter.id"
      role="tab"
      :aria-selected="store.activeFilter === filter.id"
      :variant="store.activeFilter === filter.id ? 'outline' : 'ghost'"
      :class="store.activeFilter === filter.id ? 'border-gold text-gold light:bg-fill-gold light:text-[#111]' : ''"
      @click="store.setFilter(filter.id)"
    >
      [ {{ t('projects.filters.' + filter.id) }} ]
    </BaseButton>
  </div>
</template>

<script setup>
import { useProjectsStore } from '@/stores/projectsStore'
import { useLocale } from '@/composables/useLocale'
import BaseButton from '@/components/ui/BaseButton.vue'

const store = useProjectsStore()
const { t } = useLocale()
</script>
