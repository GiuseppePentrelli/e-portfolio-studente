// La città della mappa dei Progetti, in un riquadro di 160 × 160: gli incroci sono i nodi della rete
// stradale, le strade collegano gli incroci vicini (tranne quelle in MISSING), gli isolati stanno fra
// quattro incroci. È la stessa città del componente Open World Map del repository components.
export const NODES = {
  a1: [12, 18], a2: [44, 14], a3: [80, 16], a4: [114, 12], a5: [148, 20],
  b1: [14, 48], b2: [46, 46], b3: [78, 48], b4: [112, 44], b5: [146, 50],
  c1: [12, 80], c2: [42, 78], c3: [80, 80], c4: [116, 78], c5: [148, 82],
  d1: [16, 112], d2: [48, 110], d3: [82, 114], d4: [114, 110], d5: [146, 114],
  e1: [14, 146], e2: [46, 144], e3: [78, 148], e4: [112, 146], e5: [148, 144],
}

const ROWS = ['a', 'b', 'c', 'd', 'e']
const MISSING = new Set(['c2-d2', 'b4-c4', 'd3-d4'])
const CELL_KINDS = { a4: 'park', c1: 'park', d4: 'water' }

export const HOME = 'c3'

// Gli incroci su cui si posano i progetti, nell'ordine: il primo progetto va sul primo. Sono sparsi
// per la città, così i primi progetti non stanno tutti vicini.
export const LOTS = ['b2', 'a4', 'd5', 'b5', 'e2', 'a2', 'd1', 'e4', 'c5', 'a1', 'e3', 'b4', 'd2', 'c1', 'a5', 'e5', 'b1', 'd4', 'a3', 'c4', 'd3', 'c2', 'b3', 'e1']

export const HIGHWAY = 'M-8 30C30 36 70 52 96 70S140 104 170 112'

export const EDGES = []
for (let r = 0; r < ROWS.length; r++) {
  for (let c = 1; c <= 5; c++) {
    const here = `${ROWS[r]}${c}`
    const right = `${ROWS[r]}${c + 1}`
    const below = `${ROWS[r + 1]}${c}`
    if (NODES[right] && !MISSING.has(`${here}-${right}`)) EDGES.push([here, right])
    if (NODES[below] && !MISSING.has(`${here}-${below}`)) EDGES.push([here, below])
  }
}

// Gli isolati, rimpiccioliti verso il loro centro per lasciare il posto alle strade.
export const CELLS = []
for (let r = 0; r < ROWS.length - 1; r++) {
  for (let c = 1; c < 5; c++) {
    const corners = [`${ROWS[r]}${c}`, `${ROWS[r]}${c + 1}`, `${ROWS[r + 1]}${c + 1}`, `${ROWS[r + 1]}${c}`]
    const cx = corners.reduce((sum, node) => sum + NODES[node][0], 0) / 4
    const cy = corners.reduce((sum, node) => sum + NODES[node][1], 0) / 4
    const points = corners
      .map((node) => {
        const [x, y] = NODES[node]
        return `${(cx + (x - cx) * 0.74).toFixed(1)} ${(cy + (y - cy) * 0.74).toFixed(1)}`
      })
      .join(' ')
    CELLS.push({ id: corners[0], points, kind: CELL_KINDS[corners[0]] ?? ((r + c) % 2 ? 'block' : 'block-alt') })
  }
}

const distance = (a, b) => Math.hypot(NODES[a][0] - NODES[b][0], NODES[a][1] - NODES[b][1])

const neighbours = {}
for (const [a, b] of EDGES) {
  ;(neighbours[a] ??= []).push(b)
  ;(neighbours[b] ??= []).push(a)
}

// Il percorso più breve fra due incroci (Dijkstra). La rete è piccola: basta cercare ogni volta
// l'incrocio non ancora visitato più vicino.
export function shortestPath(from, to) {
  const best = { [from]: 0 }
  const previous = {}
  const open = new Set(Object.keys(NODES))
  while (open.size) {
    let current = null
    for (const node of open) {
      if (best[node] !== undefined && (current === null || best[node] < best[current])) current = node
    }
    if (current === null || current === to) break
    open.delete(current)
    for (const next of neighbours[current] ?? []) {
      const through = best[current] + distance(current, next)
      if (best[next] === undefined || through < best[next]) {
        best[next] = through
        previous[next] = current
      }
    }
  }
  const path = [to]
  while (path[0] !== from) path.unshift(previous[path[0]])
  return { path, length: best[to] }
}

export const toPoints = nodes => nodes.map(node => NODES[node].join(' ')).join(' ')

// Il percorso più breve da un punto qualsiasi di una strada: `location` è { a, b, pos }, cioè la
// posizione [x, y] sulla strada fra gli incroci a e b (a e b uguali se si è su un incrocio). Si prova
// a partire verso tutti e due gli incroci e si tiene il più corto. `ids` dice di quale incrocio è
// ogni punto, con null per il punto di partenza.
export function planFrom(location, target) {
  const starts = location.a === location.b ? [location.a] : [location.a, location.b]
  let best = null
  for (const start of starts) {
    const { path, length } = shortestPath(start, target)
    const lead = Math.hypot(location.pos[0] - NODES[start][0], location.pos[1] - NODES[start][1])
    if (!best || lead + length < best.length) best = { ids: [null, ...path], length: lead + length }
  }
  return { ...best, points: best.ids.map((id, index) => (index === 0 ? location.pos : NODES[id])) }
}
