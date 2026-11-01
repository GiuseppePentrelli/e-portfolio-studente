// Collezione dei componenti custom, letta dal laboratorio. Il formato è un'ipotesi, come quello dei
// progetti. L'ordine dell'elenco è il numero dell'esperimento.
//
// Campi: slug, name, category, description, features, techniques, kind ('embed' per i componenti del
// repository components, caricati in un iframe dalla loro pagina; 'native' per le primitive del
// portfolio, mostrate dal vivo), path (embed: la cartella nel repository components), height (embed:
// l'altezza di partenza dell'iframe, poi la comunica la pagina), demo (native: quale prova mostrare),
// source (native: il file nel repository del portfolio).
//
// Nome, descrizione e caratteristiche dei componenti embed riprendono components.js del repository
// components: se cambiano là, vanno aggiornati qui.
export const COMPONENTS_SITE = 'https://giuseppepentrelli.github.io/components/'
const COMPONENTS_CODE = 'https://github.com/GiuseppePentrelli/components/tree/main/'
const PORTFOLIO_CODE = 'https://github.com/GiuseppePentrelli/e-portfolio-studente/blob/main/'

const experiments = [
  {
    slug: 'cars-card',
    name: 'Cars Card',
    category: 'Card',
    description:
      "Card di un'auto in stile luxury: al passaggio del mouse l'auto esce dalla card in 3D, con riflesso, bagliore e dashboard in vetro.",
    features: [
      'Effetto pop-out 3D con perspective e translateZ',
      "Riflesso specchiato e ombra dorata sotto l'auto",
      'Dashboard delle specifiche in stile glassmorphism',
      'Si adatta ai telefoni restando in proporzione',
    ],
    techniques: ['HTML', 'CSS'],
    kind: 'embed',
    path: 'cards/cars-card/',
    height: 740,
  },
  {
    slug: 'kraft-notebook',
    name: 'Kraft Notebook',
    category: 'Notebook',
    description:
      "Quaderno con copertina in cartoncino: foto fissate con lo scotch che si sollevano al passaggio del mouse, adesivi e un elastico da tirare. Con un clic la copertina si apre sulla prima pagina di appunti.",
    features: [
      'Foto e foglietti con una fisica a molla',
      'Elastico da tirare, che resiste sempre di più e rimbalza',
      'Copertina che si apre in 3D',
      'Rispetta prefers-reduced-motion',
    ],
    techniques: ['HTML', 'CSS', 'JavaScript'],
    kind: 'embed',
    path: 'notebooks/kraft-notebook/',
    height: 613,
  },
  {
    slug: 'hand-drawn-checkbox',
    name: 'Checkbox disegnato',
    category: 'Controllo',
    description:
      'Una casella di controllo vera, con la spunta e la barratura tracciate a penna: si usa con il mouse, con il dito e con la tastiera.',
    features: [
      'Avvolge un vero input checkbox, letto dalle tecnologie assistive',
      'Spunta e barratura disegnate in SVG',
      'Funziona con v-model',
    ],
    techniques: ['Vue 3', 'CSS', 'SVG'],
    kind: 'native',
    demo: 'checkbox',
    source: 'src/components/primitives/HandDrawnCheckbox.vue',
  },
  {
    slug: 'focus-lens-link',
    name: 'Messa a fuoco',
    category: 'Link',
    description:
      'La chiamata all’azione dei progetti importanti: passandoci sopra, una lente attraversa il nome sfocato e lo mette a fuoco.',
    features: [
      'Resta un vero link, raggiungibile con la tastiera',
      'Sul telefono la lente si muove alla pressione',
      'Con movimento ridotto niente transizioni',
    ],
    techniques: ['Vue 3', 'CSS'],
    kind: 'native',
    demo: 'focus',
    source: 'src/components/primitives/FocusLensLink.vue',
  },
  {
    slug: 'destructive-confirm',
    name: 'Conferma distruttiva',
    category: 'Bottone',
    description:
      "Un bottone per le azioni che non si possono annullare: chiede conferma sul posto, con la scelta sicura già selezionata.",
    features: [
      'Il focus va subito su "No"',
      'Si annulla con Esc, con un clic fuori o aspettando',
      "L'azione vera la decide il componente che lo usa",
    ],
    techniques: ['Vue 3', 'CSS'],
    kind: 'native',
    demo: 'destructive',
    source: 'src/components/primitives/DestructiveConfirmButton.vue',
  },
]

// Dove si apre ogni esperimento da solo e dove si legge il suo codice.
export const components = experiments.map(experiment => ({
  ...experiment,
  url: experiment.kind === 'embed' ? `${COMPONENTS_SITE}${experiment.path}` : null,
  code: experiment.kind === 'embed' ? `${COMPONENTS_CODE}${experiment.path}` : `${PORTFOLIO_CODE}${experiment.source}`,
}))
