// Collezione dei progetti: un elemento per progetto, letto da Capolavori e, in futuro, dall'indice dei
// progetti e dal Percorso. Il formato è un'ipotesi da confermare (docs/04, "Formato definitivo dei dati
// strutturati").
//
// Campi: slug (identificativo e indirizzo della pagina), title, schoolYear, techniques, role, summary,
// masterpiece ('main' per il capolavoro principale, true per gli altri capolavori, false per i progetti),
// page (se la pagina di approfondimento esiste già), image (anteprima importata da src/assets),
// placeholder (true finché l'elemento è un segnaposto: la sezione mostra un'anteprima disegnata).
export const projects = [
  {
    slug: 'capolavoro-principale',
    title: 'Titolo del capolavoro',
    schoolYear: '2026–2027',
    techniques: ['Tecnologia 1', 'Tecnologia 2', 'Tecnologia 3'],
    role: 'Che cosa ho fatto io, in una riga',
    summary:
      "Due o tre frasi sul capolavoro: che problema risolve, per chi è e che cosa lo rende speciale. È un segnaposto: il testo vero arriva con il progetto.",
    masterpiece: 'main',
    page: false,
    placeholder: true,
  },
]

export const mainMasterpiece = projects.find(project => project.masterpiece === 'main')

export const otherMasterpieces = projects.filter(project => project.masterpiece === true)
