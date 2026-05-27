import { describe, it, expect, beforeEach } from 'vitest'
import { useLocale } from '@/composables/useLocale'

describe('useLocale', () => {
  beforeEach(() => {
    const { setLocale } = useLocale()
    setLocale('it')
  })

  it('locale di default è "it"', () => {
    const { locale } = useLocale()
    expect(locale.value).toBe('it')
  })

  it('t() restituisce la traduzione italiana corretta', () => {
    const { t } = useLocale()
    expect(t('hero.chapter')).toBe('E-Portfolio dello Studente')
  })

  it('t() cambia valore dopo setLocale("en")', () => {
    const { t, setLocale } = useLocale()
    setLocale('en')
    expect(t('hero.chapter')).toBe('Student E-Portfolio')
  })

  it('t() con chiave inesistente restituisce la chiave stessa', () => {
    const { t } = useLocale()
    expect(t('chiave.non.esiste')).toBe('chiave.non.esiste')
  })

  it('setLocale() ignora valori non supportati', () => {
    const { locale, setLocale } = useLocale()
    setLocale('fr')
    expect(locale.value).toBe('it')
  })

  it('SUPPORTED_LOCALES contiene "it" e "en"', () => {
    const { SUPPORTED_LOCALES } = useLocale()
    expect(SUPPORTED_LOCALES).toContain('it')
    expect(SUPPORTED_LOCALES).toContain('en')
    expect(SUPPORTED_LOCALES.length).toBe(2)
  })

  it('t() accede a chiavi annidate profonde', () => {
    const { t } = useLocale()
    expect(t('footer.built_with')).toBe('costruito con Vue.js + caffè')
  })
})
