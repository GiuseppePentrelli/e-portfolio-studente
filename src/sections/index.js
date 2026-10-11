import AboutSection from './AboutSection.vue'
import CoverSection from './CoverSection.vue'

// Fonte unica delle sezioni della home: l'ordine dell'elenco è l'ordine di lettura.
// Una sezione senza `tabColor` non ha linguetta nella navbar.
// `scrollOffset` sposta il punto di arrivo delle ancore quando il contenuto inizia sopra la sezione.
export const sections = [
  { id: 'copertina', label: 'Copertina', component: CoverSection },
  {
    id: 'chi-sono',
    label: 'Chi sono',
    component: AboutSection,
    tabColor: 'var(--tab-yellow)',
    scrollOffset: 'var(--notebook-anchor-offset)',
  },
]
