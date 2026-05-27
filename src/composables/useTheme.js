import { ref } from 'vue'

const theme = ref(
  (() => { try { return localStorage.getItem('gp-theme') || 'dark' } catch { return 'dark' } })()
)

document.documentElement.setAttribute('data-theme', theme.value)

export function useTheme() {
  function setTheme(val) {
    theme.value = val
    document.documentElement.setAttribute('data-theme', val)
    try { localStorage.setItem('gp-theme', val) } catch {}
  }
  return { theme, setTheme }
}
