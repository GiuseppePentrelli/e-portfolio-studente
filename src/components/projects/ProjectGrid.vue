<template>
  <section>
    <Transition name="grid-swap" mode="out-in">
      <div
        :key="store.activeFilter"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <ProjectCard
          v-for="(project, i) in store.filteredProjects"
          :key="project.id"
          :project="project"
          :style="{ '--i': i }"
        />
      </div>
    </Transition>

    <p
      v-if="store.filteredProjects.length === 0"
      class="text-text-2 font-mono text-sm py-12 text-center"
    >
      {{ t('projects.empty') }}
    </p>
  </section>
</template>

<script setup>
import { useProjectsStore } from '@/stores/projectsStore'
import { useLocale } from '@/composables/useLocale'
import ProjectCard from './ProjectCard.vue'

const store = useProjectsStore()
const { t } = useLocale()
</script>

<style scoped>
.grid-swap-leave-active {
  transition: opacity .12s ease;
}
.grid-swap-enter-active {
  transition: opacity .2s ease;
}
.grid-swap-enter-from,
.grid-swap-leave-to {
  opacity: 0;
}
</style>
