import { describe, it, expect, beforeEach } from 'vitest'
import { useTheme } from '@/composables/useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    const { setTheme } = useTheme()
    setTheme('dark')
  })

  it('tema di default è "dark"', () => {
    const { theme } = useTheme()
    expect(theme.value).toBe('dark')
  })

  it('setTheme("light") cambia il tema a "light"', () => {
    const { theme, setTheme } = useTheme()
    setTheme('light')
    expect(theme.value).toBe('light')
  })

  it('setTheme("dark") riporta il tema a "dark"', () => {
    const { theme, setTheme } = useTheme()
    setTheme('light')
    setTheme('dark')
    expect(theme.value).toBe('dark')
  })

  it('setTheme aggiorna data-theme sul documentElement', () => {
    const { setTheme } = useTheme()
    setTheme('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })
})
