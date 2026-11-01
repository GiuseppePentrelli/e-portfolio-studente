import AboutSection from './AboutSection.vue'
import ComponentsSection from './ComponentsSection.vue'
import CoverSection from './CoverSection.vue'
import JourneySection from './JourneySection.vue'
import MasterpiecesSection from './MasterpiecesSection.vue'
import ProjectsSection from './ProjectsSection.vue'

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
  { id: 'percorso', label: 'Percorso', component: JourneySection, tabColor: 'var(--tab-blue)' },
  { id: 'capolavori', label: 'Capolavori', component: MasterpiecesSection, tabColor: 'var(--tab-pink)' },
  { id: 'progetti', label: 'Progetti', component: ProjectsSection, tabColor: 'var(--tab-green)' },
  { id: 'componenti', label: 'Componenti', component: ComponentsSection, tabColor: 'var(--tab-lilac)' },
]
