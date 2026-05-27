import { describe, it, expect } from 'vitest'
import en from '@/locales/en.json'
import it_locale from '@/locales/it.json'

function flatKeys(obj, prefix = '') {
  return Object.entries(obj).flatMap(([k, v]) => {
    const full = prefix ? `${prefix}.${k}` : k
    return typeof v === 'object' && !Array.isArray(v)
      ? flatKeys(v, full)
      : [full]
  })
}

describe('Locale files', () => {
  const keysEN = flatKeys(en)
  const keysIT = flatKeys(it_locale)

  it('EN e IT hanno lo stesso numero di chiavi', () => {
    expect(keysEN.length).toBe(keysIT.length)
  })

  it('tutte le chiavi di EN esistono in IT', () => {
    const missingInIT = keysEN.filter(k => !keysIT.includes(k))
    expect(missingInIT).toEqual([])
  })

  it('tutte le chiavi di IT esistono in EN', () => {
    const missingInEN = keysIT.filter(k => !keysEN.includes(k))
    expect(missingInEN).toEqual([])
  })

  it('marquee.items ha lo stesso numero di elementi in entrambi i locale', () => {
    expect(en.marquee.items.length).toBe(it_locale.marquee.items.length)
  })

  it('nessuna stringa è vuota in EN', () => {
    const emptyKeys = keysEN.filter(k => {
      const val = k.split('.').reduce((o, key) => o?.[key], en)
      return typeof val === 'string' && val.trim() === ''
    })
    expect(emptyKeys).toEqual([])
  })

  it('nessuna stringa è vuota in IT', () => {
    const emptyKeys = keysIT.filter(k => {
      const val = k.split('.').reduce((o, key) => o?.[key], it_locale)
      return typeof val === 'string' && val.trim() === ''
    })
    expect(emptyKeys).toEqual([])
  })
})
