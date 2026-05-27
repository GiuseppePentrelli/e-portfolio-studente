import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import projectsData from '@/data/projects.json'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(projectsData)
  const activeFilter = ref('all')

  const filters = [
    { id: 'all' },
    { id: 'web' },
    { id: 'game' },
    { id: 'guide' },
    { id: 'other' },
  ]

  const filteredProjects = computed(() =>
    activeFilter.value === 'all'
      ? projects.value
      : projects.value.filter(p => p.category === activeFilter.value)
  )

  const featuredProjects = computed(() =>
    projects.value.filter(p => p.featured)
  )

  function setFilter(categoryId) {
    activeFilter.value = categoryId
  }

  return { projects, activeFilter, filters, filteredProjects, featuredProjects, setFilter }
})
