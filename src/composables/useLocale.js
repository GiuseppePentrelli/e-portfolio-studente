import { ref, shallowRef, watch } from 'vue'
import it from '@/locales/it.json'
import en from '@/locales/en.json'

const locales = { it, en }
export const SUPPORTED_LOCALES = ['it', 'en']

const locale = ref(
  (() => { try { return localStorage.getItem('gp-locale') || 'it' } catch { return 'it' } })()
)

const messages = shallowRef(locales[locale.value])

function setLocale(val) {
  if (!SUPPORTED_LOCALES.includes(val)) return
  locale.value = val
  messages.value = locales[val]
  document.documentElement.setAttribute('lang', val)
  try { localStorage.setItem('gp-locale', val) } catch {}
}

document.documentElement.setAttribute('lang', locale.value)

export function useLocale() {
  function t(key) {
    const keys = key.split('.')
    let val = messages.value
    for (const k of keys) {
      val = val?.[k]
      if (val === undefined) return key
    }
    return val
  }
  return { locale, setLocale, t, SUPPORTED_LOCALES }
}
