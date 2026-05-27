/* ============================================
   Giuseppe Pentrelli — Portfolio v4
   Synthesis: Mockup 1 base + Mockup 2 marquee/bento + Mockup 3 palette pop
   ============================================ */
const { useState, useEffect, useMemo } = React;

/* ─── DATA ──────────────────────────────────────────────── */

const BIO = {
  name:    "Giuseppe Pentrelli",
  role:    "Frontend apprentice",
  class:   "5°B · ITIS «Pacinotti»",
  city:    "Taranto",
  year:    3,
  stack:   ["Vue 3", "JavaScript", "Caph JS", "CSS"],
  current: "studying for esame di stato",
  coffee:  Infinity,
  status:  "available_for_stage",
};

const CAPOLAVORI = [
  {
    id: "atelier",
    num: "01",
    cat: "WEB",
    catKey: "web",
    title: "Atelier",
    desc: "Portfolio editoriale costruito in Vue 3 con animazioni fluide al cambio di rotta, griglia fotografica responsive e CMS in Markdown. Il progetto su cui ho imparato a pensare in componenti.",
    stack: [{ k: "Vue 3", c: "green" }, { k: "Vite", c: "gold" }, { k: "GSAP", c: "purple" }, { k: "Pinia", c: "green" }],
    art:  "art-coral",
    icon: "purple",
    repo: "https://github.com/giuseppepentrelli/atelier",
    path: "~/projects/atelier",
  },
  {
    id: "pixeldrift",
    num: "02",
    cat: "GAME DEV",
    catKey: "game",
    title: "Pixel Drift",
    desc: "Platformer retro con fisica custom, livelli generati a tile-map, parallax a 4 livelli e una colonna sonora chiptune. Scritto in vanilla JS sul motore Caph.",
    stack: [{ k: "Caph JS", c: "pink" }, { k: "Canvas 2D", c: "blue" }, { k: "Web Audio", c: "coral" }, { k: "Aseprite", c: "gold" }],
    art:  "art-purple",
    icon: "coral",
    repo: "https://github.com/giuseppepentrelli/pixel-drift",
    path: "~/projects/pixel-drift",
  },
  {
    id: "vuecompass",
    num: "03",
    cat: "GUIDE",
    catKey: "guide",
    title: "Vue Compass",
    desc: "Guida interattiva al framework Vue, pensata per i miei compagni di classe. Esempi live editabili, ricerca full-text e progressione a capitoli con quiz di verifica.",
    stack: [{ k: "Vue 3", c: "green" }, { k: "VitePress", c: "blue" }, { k: "Shiki", c: "purple" }],
    art:  "art-blue",
    icon: "blue",
    repo: "https://github.com/giuseppepentrelli/vue-compass",
    path: "~/projects/vue-compass",
  },
];

/* Mixed-size bento for "altri progetti".
   Each project carries a "size" hint that maps to bento spans.
   Dynamic detail varies per project. */
const PROGETTI = [
  {
    id: "meteo",
    title: "Meteo CLI",
    cat: "WEB",
    catKey: "web",
    year: "2024",
    desc: "App meteo minimal in vanilla JS con API OpenWeather, geolocalizzazione e caching offline. UI ispirata a tldr e cmd-line.",
    stack: [{ k: "JS", c: "gold" }, { k: "API", c: "blue" }],
    size: "size-l",
    dyn: { kind: "api", endpoint: "GET /weather?q=Taranto", latency: "182ms", uptime: "99.4%" },
    cta: "live demo ↗",
    repo: "#",
  },
  {
    id: "snake",
    title: "Snake Reborn",
    cat: "GAME",
    catKey: "game",
    year: "2024",
    desc: "Snake riscritto su Canvas con shader CRT, power-up e high-score persistenti.",
    stack: [{ k: "Canvas", c: "blue" }, { k: "JS", c: "gold" }],
    size: "size-m",
    dyn: { kind: "game", hi: "00148", fps: 60, levels: 12 },
    cta: "play ↗",
    repo: "#",
  },
  {
    id: "note",
    title: "Note di Studio",
    cat: "WEB",
    catKey: "web",
    year: "2025",
    desc: "Editor markdown con preview live, tag e ricerca full-text in IndexedDB.",
    stack: [{ k: "Vue", c: "green" }, { k: "IndexedDB", c: "purple" }],
    size: "size-m",
    dyn: { kind: "stats", notes: 142, tags: 23, words: "18.2k" },
    cta: "open ↗",
    repo: "#",
  },
  {
    id: "grid",
    title: "CSS Grid Atlas",
    cat: "GUIDE",
    catKey: "guide",
    year: "2024",
    desc: "24 pattern Grid con codice copiabile e demo dal vivo. Pensata per studenti del biennio.",
    stack: [{ k: "CSS", c: "blue" }, { k: "HTML", c: "coral" }],
    size: "size-w",
    dyn: { kind: "guide", chapters: 24, reading: "~35 min", lang: "IT" },
    cta: "read ↗",
    repo: "#",
  },
  {
    id: "tetris",
    title: "Tetris Echo",
    cat: "GAME",
    catKey: "game",
    year: "2025",
    desc: "Tetris con modalità duale e meccanica di echo dei pezzi precedenti.",
    stack: [{ k: "Canvas", c: "blue" }, { k: "Math", c: "gold" }],
    size: "size-m",
    dyn: { kind: "game", hi: "21450", fps: 60, levels: 8 },
    cta: "play ↗",
    repo: "#",
  },
  {
    id: "pomo",
    title: "Pomofocus",
    cat: "WEB",
    catKey: "web",
    year: "2023",
    desc: "Timer Pomodoro con statistiche, focus mode e notifiche desktop.",
    stack: [{ k: "JS", c: "gold" }],
    size: "size-m",
    dyn: { kind: "timer", sessions: 412, hours: "68h 14m" },
    cta: "open ↗",
    repo: "#",
  },
  {
    id: "posters",
    title: "Generative Posters",
    cat: "MISC",
    catKey: "misc",
    year: "2025",
    desc: "Sketch generativi in p5.js: poster astratti esportabili in PNG ad alta risoluzione.",
    stack: [{ k: "p5.js", c: "pink" }, { k: "Canvas", c: "blue" }],
    size: "size-m",
    dyn: { kind: "art", sketches: 38, exports: 412, palette: 16 },
    cta: "gallery ↗",
    repo: "#",
  },
  {
    id: "git30",
    title: "Git in 30 minuti",
    cat: "GUIDE",
    catKey: "guide",
    year: "2024",
    desc: "Guida illustrata al flusso Git per gli studenti del biennio.",
    stack: [{ k: "Markdown", c: "purple" }],
    size: "size-m",
    dyn: { kind: "guide", chapters: 8, reading: "~30 min", lang: "IT" },
    cta: "read ↗",
    repo: "#",
  },
  {
    id: "dotfiles",
    title: "Dotfiles",
    cat: "MISC",
    catKey: "misc",
    year: "2026",
    desc: "Configurazione VSCode, zsh, tmux, Neovim. Documentata e portabile.",
    stack: [{ k: "shell", c: "green" }],
    size: "size-m",
    dyn: { kind: "repo", commits: 84, stars: 12, forks: 3 },
    cta: "clone ↗",
    repo: "#",
  },
];

const FILTERS = [
  { key: "all",   label: "all" },
  { key: "web",   label: "web" },
  { key: "game",  label: "game" },
  { key: "guide", label: "guide" },
  { key: "misc",  label: "misc" },
];

/* ─── ICONS ──────────────────────────────────────────────── */
const Icon = {
  vue: () => (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 3h4.5L12 12.5 17.5 3H22L12 21 2 3z" opacity=".4"/><path d="M6.5 3h3L12 7.2 14.5 3h3L12 12.5 6.5 3z"/></svg>
  ),
  game: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="4"/><path d="M7 12h4M9 10v4"/><circle cx="16" cy="11" r="1" fill="currentColor"/><circle cx="18" cy="13" r="1" fill="currentColor"/></svg>
  ),
  book: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h11a3 3 0 0 1 3 3v13H6a2 2 0 0 1-2-2V4z"/><path d="M4 4v15a2 2 0 0 0 2 2h12"/><path d="M8 8h7M8 12h7M8 16h5"/></svg>
  ),
  sun: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
  ),
  moon: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
  ),
  github: () => (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.02c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18A10.93 10.93 0 0 1 12 6.84c.98 0 1.97.13 2.89.39 2.2-1.49 3.15-1.18 3.15-1.18.63 1.58.23 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.44-2.69 5.41-5.26 5.69.41.36.78 1.06.78 2.15v3.18c0 .31.21.67.8.56C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z"/></svg>
  ),
};

const FEAT_ICON = {
  atelier:    Icon.vue,
  pixeldrift: Icon.game,
  vuecompass: Icon.book,
};

/* ─── COMPONENTS ─────────────────────────────────────────── */

function ThemeToggle({ theme, setTheme }) {
  return (
    <div className="theme-toggle" role="group" aria-label="Tema">
      <button
        className={theme === "dark" ? "on" : ""}
        onClick={() => setTheme("dark")}
        aria-pressed={theme === "dark"}
        title="Tema scuro"
      >
        <Icon.moon />
      </button>
      <button
        className={theme === "light" ? "on" : ""}
        onClick={() => setTheme("light")}
        aria-pressed={theme === "light"}
        title="Tema chiaro"
      >
        <Icon.sun />
      </button>
    </div>
  );
}

function TopBar({ theme, setTheme }) {
  return (
    <header className="topbar" data-screen-label="Top bar">
      <div className="topbar-inner">
        <a href="#top" className="brand">
          <span className="brand-mark">gp</span>
          <span>giuseppe<span className="brand-dot"></span>pentrelli</span>
        </a>
        <div className="topbar-center">
          <span>portfolio</span>
          <span style={{ margin: "0 8px", color: "var(--text-3)" }}>·</span>
          <span className="accent">v4.0</span>
          <span style={{ margin: "0 8px", color: "var(--text-3)" }}>·</span>
          <span>esame di stato 2026</span>
        </div>
        <div className="topbar-right">
          <a href="https://github.com/giuseppepentrelli" target="_blank" rel="noopener noreferrer" className="tb-link">
            <Icon.github /> github
          </a>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </div>
    </header>
  );
}

/* ─── HERO ─────────────────────────────────────────────── */

function HeroIntro() {
  return (
    <div data-screen-label="Hero intro">
      <div className="hero-eyebrow">
        <span>// chapter 03</span>
        <span className="ln"></span>
      </div>
      <h2 className="hero-greeting">
        Ciao, sono <span className="accent">Giuseppe</span>.<br/>
        Costruisco cose con <span className="mono">{`<template>`}</span>,<br/>
        <span className="mono">canvas</span> e troppi caffè.
      </h2>
      <p className="hero-lede">
        Studente del <strong>quinto anno</strong> all'ITIS «Pacinotti».
        Questo è il mio diario di tre anni — i progetti che hanno funzionato,
        quelli che ho dovuto riscrivere, e <span className="pop">qualche capolavoro</span> nel mezzo.
      </p>
      <div className="hero-meta">
        <div>
          // class
          <b>5°B Informatica</b>
        </div>
        <div>
          // school
          <b>ITIS «Pacinotti»</b>
        </div>
        <div>
          // status
          <b style={{ color: "var(--green)" }}>● disponibile</b>
        </div>
      </div>
    </div>
  );
}

function BioWindow() {
  const [tab, setTab] = useState("about.json");
  return (
    <div className="win" data-screen-label="Bio window (macOS)">
      <div className="win-bar">
        <span className="dot r"></span>
        <span className="dot y"></span>
        <span className="dot g"></span>
        <span className="title">~/giuseppe/about.json</span>
        <span className="tabs">
          <button
            className={"tab" + (tab === "about.json" ? " on" : "")}
            onClick={() => setTab("about.json")}
          >about.json</button>
          <button
            className={"tab" + (tab === "stack.json" ? " on" : "")}
            onClick={() => setTab("stack.json")}
          >stack.json</button>
        </span>
      </div>
      <div className="win-body">
        {tab === "about.json" ? <BioAbout /> : <BioStack />}
      </div>
    </div>
  );
}

function L({ n, children }) {
  return (
    <div className="line">
      <span className="ln-num">{n}</span>
      <span>{children}</span>
    </div>
  );
}

function BioAbout() {
  return (
    <div className="fade-in" key="about">
      <L n={1}><span className="t-cm">// who am I — read carefully</span></L>
      <L n={2}><span className="t-kw">const</span> <span className="t-nm">dev</span> <span className="t-bk">=</span> <span className="t-bk">{"{"}</span></L>
      <L n={3}>&nbsp;&nbsp;<span className="t-fn">name</span><span className="t-bk">:</span> <span className="t-st">'{BIO.name}'</span><span className="t-bk">,</span></L>
      <L n={4}>&nbsp;&nbsp;<span className="t-fn">role</span><span className="t-bk">:</span> <span className="t-st">'{BIO.role}'</span><span className="t-bk">,</span></L>
      <L n={5}>&nbsp;&nbsp;<span className="t-fn">school</span><span className="t-bk">:</span> <span className="t-st">'{BIO.class}'</span><span className="t-bk">,</span></L>
      <L n={6}>&nbsp;&nbsp;<span className="t-fn">city</span><span className="t-bk">:</span> <span className="t-st">'{BIO.city}'</span><span className="t-bk">,</span></L>
      <L n={7}>&nbsp;&nbsp;<span className="t-fn">year</span><span className="t-bk">:</span> <span className="t-pn">{BIO.year}</span><span className="t-bk">,</span></L>
      <L n={8}>&nbsp;&nbsp;<span className="t-fn">coffee</span><span className="t-bk">:</span> <span className="t-pn">∞</span><span className="t-bk">,</span></L>
      <L n={9}>&nbsp;&nbsp;<span className="t-fn">status</span><span className="t-bk">:</span> <span className="t-st">'{BIO.status}'</span><span className="t-bk">,</span></L>
      <L n={10}><span className="t-bk">{"};"}</span></L>
      <L n={11}>&nbsp;</L>
      <L n={12}><span className="t-nm">dev</span><span className="t-bk">.</span><span className="t-fn">ship</span><span className="t-bk">();</span> <span className="t-cm">// ✓ daily<span className="caret"></span></span></L>
    </div>
  );
}

function BioStack() {
  return (
    <div className="fade-in" key="stack">
      <L n={1}><span className="t-cm">// daily-driver stack</span></L>
      <L n={2}><span className="t-kw">const</span> <span className="t-nm">stack</span> <span className="t-bk">=</span> <span className="t-bk">[</span></L>
      <L n={3}>&nbsp;&nbsp;<span className="t-st">'Vue 3'</span><span className="t-bk">,</span>          <span className="t-cm">// loved</span></L>
      <L n={4}>&nbsp;&nbsp;<span className="t-st">'JavaScript'</span><span className="t-bk">,</span>     <span className="t-cm">// breathing</span></L>
      <L n={5}>&nbsp;&nbsp;<span className="t-st">'Caph JS'</span><span className="t-bk">,</span>        <span className="t-cm">// games</span></L>
      <L n={6}>&nbsp;&nbsp;<span className="t-st">'CSS'</span><span className="t-bk">,</span>             <span className="t-cm">// craft</span></L>
      <L n={7}>&nbsp;&nbsp;<span className="t-st">'Canvas 2D'</span><span className="t-bk">,</span>      <span className="t-cm">// playground</span></L>
      <L n={8}>&nbsp;&nbsp;<span className="t-st">'Git'</span><span className="t-bk">,</span>             <span className="t-cm">// finally</span></L>
      <L n={9}><span className="t-bk">];</span></L>
      <L n={10}>&nbsp;</L>
      <L n={11}><span className="t-nm">stack</span><span className="t-bk">.</span><span className="t-fn">forEach</span><span className="t-bk">(</span><span className="t-fn">learn</span><span className="t-bk">);</span> <span className="t-cm">// in progress<span className="caret"></span></span></L>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero shell" id="top">
      <HeroIntro />
      <BioWindow />
    </section>
  );
}

/* ─── MARQUEE ───────────────────────────────────────────── */

function Marquee() {
  const items = [
    { t: "Vue.js",      c: "b"     },
    { t: "JavaScript",  c: "gold"  },
    { t: "Caph JS",     c: "coral" },
    { t: "Canvas 2D",   c: "b"     },
    { t: "CSS Craft",   c: "p"     },
    { t: "TypeScript",  c: "b"     },
    { t: "Vite",        c: "gold"  },
    { t: "GSAP",        c: "p"     },
    { t: "Pinia",       c: "g"     },
    { t: "Git",         c: "coral" },
    { t: "Markdown",    c: "p"     },
    { t: "Node",        c: "g"     },
  ];
  const sep = <span className="sep">★</span>;
  const row = (
    <>
      {items.map((x, i) => (
        <React.Fragment key={i}>
          <span className={"item " + x.c}>{x.t}</span>
          {sep}
        </React.Fragment>
      ))}
    </>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row}{row}
      </div>
    </div>
  );
}

/* ─── CAPOLAVORI (featured) ──────────────────────────────── */

function FeatCard({ p }) {
  const I = FEAT_ICON[p.id];
  return (
    <a href={p.repo} target="_blank" rel="noopener noreferrer" className="feat fade-in">
      <div className="feat-top">
        <span className="num">capolavoro / {p.num}</span>
        <span className="cat">{p.cat}</span>
      </div>
      <div className={"feat-art " + p.art}>
        <div className="feat-art-grid"></div>
        <span className="feat-tag"><span className="star">★</span>featured</span>
        <div className={"feat-icon " + p.icon}>
          <I />
        </div>
      </div>
      <div className="feat-body">
        <h3><span className="em">{p.title}</span></h3>
        <p>{p.desc}</p>
        <div className="chip-row">
          {p.stack.map(s => (
            <span key={s.k} className={"chip " + s.c}>
              <span className="d"></span>{s.k}
            </span>
          ))}
        </div>
      </div>
      <div className="feat-foot">
        <span className="path">{p.path.replace(/(\/[^/]+)$/, m => '')}<span className="nm">{p.path.split('/').pop()}</span></span>
        <span className="open">open project →</span>
      </div>
    </a>
  );
}

function Capolavori({ filter }) {
  const list = useMemo(
    () => filter === "all" ? CAPOLAVORI : CAPOLAVORI.filter(p => p.catKey === filter),
    [filter]
  );
  return (
    <section className="section shell" id="capolavori" data-screen-label="Capolavori">
      <div className="section-head">
        <span className="section-num">// 02 — i preferiti</span>
        <h2 className="section-title">I <span className="em">capolavori</span></h2>
        <div className="section-sub">
          {list.length} / 3 progetti<br/>
          <b>featured</b>
        </div>
      </div>
      {list.length === 0 ? (
        <div className="empty">▽ Nessun capolavoro in <b>{filter}</b>.</div>
      ) : (
        <div className="featured-grid">
          {list.map(p => <FeatCard key={p.id} p={p} />)}
        </div>
      )}
    </section>
  );
}

/* ─── PROGETTI (bento with mixed sizes + dynamic content) ── */

function DynBlock({ dyn }) {
  switch (dyn.kind) {
    case "api":
      return (
        <>
          <div className="stat">
            <span style={{ fontFamily: "var(--mono)", color: "var(--green)" }}>{dyn.endpoint}</span>
            <span>last response · <b className="accent">{dyn.latency}</b> · uptime <b className="green">{dyn.uptime}</b></span>
          </div>
        </>
      );
    case "game":
      return (
        <>
          <div className="stat">hi-score<b className="accent">{dyn.hi}</b></div>
          <div className="stat">fps<b className="green">{dyn.fps}</b></div>
          <div className="stat">livelli<b>{dyn.levels}</b></div>
        </>
      );
    case "stats":
      return (
        <>
          <div className="stat">note<b>{dyn.notes}</b></div>
          <div className="stat">tag<b className="blue">{dyn.tags}</b></div>
          <div className="stat">parole<b className="accent">{dyn.words}</b></div>
        </>
      );
    case "guide":
      return (
        <>
          <div className="stat">capitoli<b className="accent">{dyn.chapters}</b></div>
          <div className="stat">lettura<b>{dyn.reading}</b></div>
          <div className="stat">lingua<b className="green">{dyn.lang}</b></div>
        </>
      );
    case "timer":
      return (
        <>
          <div className="stat">sessioni<b className="coral">{dyn.sessions}</b></div>
          <div className="stat">focus tot.<b className="accent">{dyn.hours}</b></div>
        </>
      );
    case "art":
      return (
        <>
          <div className="stat">sketch<b className="accent">{dyn.sketches}</b></div>
          <div className="stat">export<b>{dyn.exports}</b></div>
          <div className="stat">palette<b className="coral">{dyn.palette}</b></div>
        </>
      );
    case "repo":
      return (
        <>
          <div className="stat">commit<b>{dyn.commits}</b></div>
          <div className="stat">⭐ stars<b className="accent">{dyn.stars}</b></div>
          <div className="stat">forks<b>{dyn.forks}</b></div>
        </>
      );
    default: return null;
  }
}

function ProjectCard({ p, idx }) {
  return (
    <a
      href={p.repo}
      target="_blank"
      rel="noopener noreferrer"
      className={"card fade-in " + p.size}
      data-cat={p.catKey}
      style={{ animationDelay: `${idx * 0.04}s` }}
    >
      {p.size === "size-l" && <span className="card-flair"></span>}
      <div className="card-head">
        <span className="card-cat" data-cat={p.catKey}>
          <span className="dot"></span> {p.cat}
        </span>
        {p.size === "size-l" ? (
          <span className="card-pill">★ pick of the year</span>
        ) : (
          <span className="card-year">{p.year}</span>
        )}
      </div>
      <h4>{p.title}</h4>
      <p className="card-desc">{p.desc}</p>
      <div className="chip-row">
        {p.stack.map(s => (
          <span key={s.k} className={"chip " + s.c}>
            <span className="d"></span>{s.k}
          </span>
        ))}
      </div>
      <div className="card-dyn">
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <DynBlock dyn={p.dyn} />
        </div>
        <span className="card-cta">{p.cta}</span>
      </div>
    </a>
  );
}

function FilterBar({ value, onChange, counts }) {
  return (
    <div className="filter-bar" role="tablist" aria-label="Filtra progetti">
      <span className="filter-label">filter ▾</span>
      {FILTERS.map(f => (
        <button
          key={f.key}
          role="tab"
          aria-selected={value === f.key}
          className={"filter-btn" + (value === f.key ? " on" : "")}
          onClick={() => onChange(f.key)}
        >
          [ {f.label} ]
          <span className="ct">{counts[f.key]}</span>
        </button>
      ))}
    </div>
  );
}

function Progetti({ filter, setFilter }) {
  const list = useMemo(() => {
    if (filter === "all") return PROGETTI;
    return PROGETTI.filter(p => p.catKey === filter);
  }, [filter]);

  const counts = useMemo(() => {
    const c = { all: PROGETTI.length };
    FILTERS.forEach(f => {
      if (f.key === "all") return;
      c[f.key] = PROGETTI.filter(p => p.catKey === f.key).length;
    });
    return c;
  }, []);

  return (
    <section className="section shell" id="progetti" data-screen-label="Progetti">
      <div className="section-head">
        <span className="section-num">// 03 — l'archivio</span>
        <h2 className="section-title">Altri <span className="em">progetti</span></h2>
        <div className="section-sub">
          {list.length} / {PROGETTI.length} progetti<br/>
          <b>esercizi & studi</b>
        </div>
      </div>
      <FilterBar value={filter} onChange={setFilter} counts={counts} />
      {list.length === 0 ? (
        <div className="empty">▽ Nessun progetto in questa categoria.</div>
      ) : (
        <div className="bento">
          {list.map((p, i) => <ProjectCard key={p.id} p={p} idx={i} />)}
        </div>
      )}
    </section>
  );
}

/* ─── FOOTER ────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="foot" id="contatti" data-screen-label="Footer">
      <div className="shell">
        <div className="foot-eyebrow">// end of file</div>
        <h2 className="foot-title">
          Hai un'idea?<br/>
          <span className="em">Scriviamo del codice.</span>
        </h2>
        <a href="mailto:giuseppe.pentrelli@example.it" className="foot-mailto">
          giuseppe.pentrelli@example.it →
        </a>

        <div className="foot-grid">
          <div className="foot-col">
            <h5>// where to find me</h5>
            <a href="https://github.com/giuseppepentrelli" target="_blank" rel="noopener noreferrer">github.com/giuseppepentrelli</a>
            <a href="https://linkedin.com/in/giuseppepentrelli" target="_blank" rel="noopener noreferrer">linkedin.com/in/...</a>
            <a href="mailto:giuseppe.pentrelli@example.it">giuseppe.pentrelli@example.it</a>
          </div>
          <div className="foot-col">
            <h5>// docs</h5>
            <a href="#">CV — italiano</a>
            <a href="#">CV — english</a>
            <a href="#">Tesina · PDF</a>
          </div>
          <div className="foot-col">
            <h5>// school</h5>
            <a href="#">ITIS «Pacinotti»</a>
            <a href="#">5°B Informatica</a>
            <a href="#">Taranto · IT</a>
          </div>
          <div className="foot-col">
            <h5>// shortcuts</h5>
            <a href="#top">↑ torna in cima</a>
            <a href="#capolavori">→ capolavori</a>
            <a href="#progetti">→ progetti</a>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© 2026 Giuseppe Pentrelli · costruito con Vue.js + caffè</span>
          <span className="git-status">
            <span className="pulse"></span>
            git status · clean · main · v4.0
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ──────────────────────────────────────────────── */

function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("gp-theme") || "dark"; }
    catch { return "dark"; }
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("gp-theme", theme); } catch {}
  }, [theme]);

  return (
    <>
      <TopBar theme={theme} setTheme={setTheme} />
      <main>
        <Hero />
        <Marquee />
        <Capolavori filter={filter} />
        <Progetti filter={filter} setFilter={setFilter} />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
