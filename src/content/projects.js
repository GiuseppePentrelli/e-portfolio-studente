// Collezione dei progetti: un elemento per progetto, letto da Capolavori, da Progetti e, in futuro,
// dall'indice dei progetti. Il formato è un'ipotesi da confermare (docs/04, "Formato definitivo dei
// dati strutturati"). L'ordine dell'elenco è l'ordine in cui i progetti compaiono nelle sale.
//
// Campi: slug (identificativo e indirizzo della pagina), title, schoolYear, context ('scuola' o
// 'personale'), techniques, role, summary, masterpiece ('main' per il capolavoro principale, true per
// gli altri capolavori, false per i progetti della sala Progetti), page (se la pagina di
// approfondimento esiste già), url (il progetto online), repo (il codice), image (anteprima importata
// da src/assets), placeholder (true finché l'elemento è un segnaposto), preview (lo schizzo del
// segnaposto nei Capolavori: 'site', 'game' o 'app'), kind (l'icona del luogo sulla mappa dei
// Progetti: 'site', 'game' o 'app').
//
// Nei Progetti ogni progetto ha un incrocio della mappa, nell'ordine dell'elenco: aggiungere un
// progetto in mezzo sposta quelli dopo.
import novenixPreview from '@/assets/images/novenix-v2.webp'

export const projects = [
  {
    slug: 'capolavoro-principale',
    title: 'Titolo del capolavoro',
    schoolYear: '2026–2027',
    context: 'scuola',
    techniques: ['Tecnologia 1', 'Tecnologia 2', 'Tecnologia 3'],
    role: 'Che cosa ho fatto io, in una riga',
    summary:
      "Due o tre frasi sul capolavoro: che problema risolve, per chi è e che cosa lo rende speciale. È un segnaposto: il testo vero arriva con il progetto.",
    masterpiece: 'main',
    page: false,
    placeholder: true,
    preview: 'site',
  },
  {
    slug: 'novenix',
    title: 'Novenix V.2.0',
    schoolYear: '2026–2027',
    context: 'personale',
    techniques: ['React', 'Three.js', 'Tailwind CSS', 'Vite'],
    summary:
      'Il mio sito personale e la radice di tutto quello che pubblico: un viaggio nello spazio in 3D cartoon, che parte dalla cabina di una navicella.',
    masterpiece: false,
    kind: 'site',
    url: 'https://giuseppepentrelli.github.io/',
    repo: 'https://github.com/GiuseppePentrelli/GiuseppePentrelli.github.io',
    image: novenixPreview,
  },
  {
    slug: 'sito-personale',
    title: 'Titolo del sito',
    schoolYear: '2025–2026',
    context: 'personale',
    techniques: ['Tecnologia 1', 'Tecnologia 2'],
    summary: 'Una frase sul progetto: che cos’è e perché l’ho fatto. È un segnaposto.',
    masterpiece: false,
    placeholder: true,
    preview: 'site',
  },
  {
    slug: 'gioco-personale',
    title: 'Titolo del gioco',
    schoolYear: '2025–2026',
    context: 'personale',
    techniques: ['Tecnologia 1', 'Tecnologia 2'],
    summary: 'Una frase sul gioco: come si gioca e che cosa ho imparato facendolo. È un segnaposto.',
    masterpiece: false,
    placeholder: true,
    preview: 'game',
  },
  {
    slug: 'app-personale',
    title: "Titolo dell'app",
    schoolYear: '2025–2026',
    context: 'personale',
    techniques: ['Tecnologia 1', 'Tecnologia 2'],
    summary: "Una frase sull'app: a che cosa serve e chi la usa. È un segnaposto.",
    masterpiece: false,
    placeholder: true,
    preview: 'app',
  },
  {
    slug: 'esperimento-personale',
    title: "Titolo dell'esperimento",
    schoolYear: '2024–2025',
    context: 'personale',
    techniques: ['Tecnologia 1'],
    summary: "Una frase sull'esperimento: che cosa volevo provare. È un segnaposto.",
    masterpiece: false,
    placeholder: true,
    preview: 'site',
  },
  {
    slug: 'strumento-personale',
    title: 'Titolo dello strumento',
    schoolYear: '2026–2027',
    context: 'personale',
    techniques: ['Tecnologia 1', 'Tecnologia 2'],
    summary: 'Una frase sullo strumento: quale lavoro mi risparmia. È un segnaposto.',
    masterpiece: false,
    placeholder: true,
    preview: 'app',
  },
  {
    slug: 'progetto-di-scuola',
    title: 'Titolo del progetto di scuola',
    schoolYear: '2024–2025',
    context: 'scuola',
    techniques: ['Tecnologia 1', 'Tecnologia 2'],
    summary: 'Una frase sul progetto di scuola: la consegna e la mia soluzione. È un segnaposto.',
    masterpiece: false,
    placeholder: true,
    preview: 'app',
  },
  {
    slug: 'sito-di-scuola',
    title: 'Titolo del sito di scuola',
    schoolYear: '2025–2026',
    context: 'scuola',
    techniques: ['Tecnologia 1', 'Tecnologia 2'],
    summary: 'Una frase sul sito fatto a scuola: la consegna e la mia soluzione. È un segnaposto.',
    masterpiece: false,
    placeholder: true,
    preview: 'site',
  },
  {
    slug: 'primo-progetto-di-scuola',
    title: 'Titolo del primo progetto di scuola',
    schoolYear: '2023–2024',
    context: 'scuola',
    techniques: ['Tecnologia 1'],
    summary: 'Una frase sul primo progetto del serale. È un segnaposto.',
    masterpiece: false,
    placeholder: true,
    preview: 'game',
  },
]

export const mainMasterpiece = projects.find(project => project.masterpiece === 'main')

export const otherMasterpieces = projects.filter(project => project.masterpiece === true)

export const otherProjects = projects.filter(project => !project.masterpiece)
