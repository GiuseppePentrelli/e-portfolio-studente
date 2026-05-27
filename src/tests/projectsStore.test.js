import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProjectsStore } from '@/stores/projectsStore'

describe('projectsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('filtro iniziale è "all"', () => {
    const store = useProjectsStore()
    expect(store.activeFilter).toBe('all')
  })

  it('filteredProjects con "all" restituisce tutti i progetti', () => {
    const store = useProjectsStore()
    expect(store.filteredProjects.length).toBe(store.projects.length)
  })

  it('setFilter("web") mostra solo progetti web', () => {
    const store = useProjectsStore()
    store.setFilter('web')
    expect(store.filteredProjects.every(p => p.category === 'web')).toBe(true)
  })

  it('setFilter("game") mostra solo progetti game', () => {
    const store = useProjectsStore()
    store.setFilter('game')
    expect(store.filteredProjects.every(p => p.category === 'game')).toBe(true)
  })

  it('setFilter("other") restituisce array vuoto se non ci sono progetti "other"', () => {
    const store = useProjectsStore()
    store.setFilter('other')
    const hasOther = store.projects.some(p => p.category === 'other')
    if (!hasOther) {
      expect(store.filteredProjects.length).toBe(0)
    }
  })

  it('featuredProjects restituisce solo i progetti featured', () => {
    const store = useProjectsStore()
    expect(store.featuredProjects.every(p => p.featured === true)).toBe(true)
  })

  it('featuredProjects non include progetti non featured', () => {
    const store = useProjectsStore()
    const nonFeatured = store.projects.filter(p => !p.featured)
    nonFeatured.forEach(p => {
      expect(store.featuredProjects.find(f => f.id === p.id)).toBeUndefined()
    })
  })

  it('filters contiene le categorie corrette', () => {
    const store = useProjectsStore()
    const ids = store.filters.map(f => f.id)
    expect(ids).toContain('all')
    expect(ids).toContain('web')
    expect(ids).toContain('game')
    expect(ids).toContain('guide')
    expect(ids).toContain('other')
  })

  it('ogni progetto ha i campi obbligatori', () => {
    const store = useProjectsStore()
    store.projects.forEach(p => {
      expect(p).toHaveProperty('id')
      expect(p).toHaveProperty('title')
      expect(p).toHaveProperty('category')
      expect(p).toHaveProperty('tags')
      expect(Array.isArray(p.tags)).toBe(true)
    })
  })
})
