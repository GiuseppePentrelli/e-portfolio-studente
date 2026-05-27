import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import certificationsData from '@/data/certifications.json'

export const useCertificationsStore = defineStore('certifications', () => {
  const certifications = ref(certificationsData)
  const activeFilter = ref('all')

  const filters = [
    { id: 'all' },
    { id: 'basic' },
    { id: 'intermedio' },
    { id: 'avanzato' },
  ]

  const filteredCertifications = computed(() =>
    activeFilter.value === 'all'
      ? certifications.value
      : certifications.value.filter(c => c.level === activeFilter.value)
  )

  function setFilter(levelId) {
    activeFilter.value = levelId
  }

  return { certifications, activeFilter, filters, filteredCertifications, setFilter }
})
