<template>
  <!-- Omaggio agli open world: la minimappa in un angolo dello schermo, come nei giochi, su una
       Modugno stilizzata (strade e distanze inventate). Ci sono le tappe del Percorso, il salone, il
       Marconi e Aulab, la freccia "sei qui" a casa, la linea del navigatore fino ad Aulab e, sotto,
       le stelle del livello di ricerca, legate al manifesto Wanted. Disegnata da zero, senza
       grafiche di nessun gioco. Decorativa. Le misure sono in em. -->
  <div class="minimap" aria-hidden="true">
    <svg class="minimap__map" viewBox="0 0 100 100">
      <defs>
        <clipPath id="minimap-shape">
          <rect width="100" height="100" rx="12" />
        </clipPath>
      </defs>
      <g clip-path="url(#minimap-shape)">
        <rect class="minimap__land" width="100" height="100" />
        <path class="minimap__park" d="M8 64 30 58 36 78 14 86Z" />
        <path class="minimap__park" d="M70 8 92 12 88 30 68 26Z" />
        <path class="minimap__blocks" d="M44 40h12v10H44zM60 40h10v10H60zM44 54h12v8H44zM60 54h10v8H60zM20 26h12v10H20zM74 64h12v10H74zM74 78h12v8H74z" />

        <!-- La statale larga e le strade. -->
        <path class="minimap__highway" d="M-4 20C30 26 60 30 104 46" />
        <path class="minimap__road" d="M40 -4C42 30 40 70 46 104M58 -4V104M-4 52H104M16 104C24 80 30 60 40 52M72 52C78 66 84 84 92 104M58 34C70 34 80 40 90 36" />

        <!-- La linea del navigatore: da casa ad Aulab. -->
        <path class="minimap__route" d="M50 66H58V52H72C78 66 80 72 82 74" />

        <!-- Le tappe: salone (forbici), Marconi (cappello da diploma), Aulab (portatile). -->
        <g transform="translate(22 30)">
          <circle class="minimap__pin" r="7" />
          <path class="minimap__glyph" d="M-3.5 -1 3 3.5M-3.5 1 3 -3.5" />
          <circle class="minimap__glyph" cx="-3.6" cy="-2.6" r="1.5" />
          <circle class="minimap__glyph" cx="-3.6" cy="2.6" r="1.5" />
        </g>
        <g transform="translate(70 18)">
          <circle class="minimap__pin" r="7" />
          <path class="minimap__fill" d="M-4.5 -0.5 0 -3 4.5 -0.5 0 2Z" />
          <path class="minimap__glyph" d="M-2.5 0.6V2.8C-1 4 1 4 2.5 2.8V0.6M4 -0.2V3" />
        </g>
        <g transform="translate(82 74)">
          <circle class="minimap__pin minimap__pin--target" r="7" />
          <path class="minimap__fill" d="M-3.5 -3H3.5V1.5H-3.5Z" />
          <path class="minimap__glyph" d="M-4.8 3H4.8" />
        </g>

        <!-- Casa, e la freccia di chi gioca. -->
        <path class="minimap__home" d="M45 70 50 65 55 70V75H45Z" />
        <path class="minimap__player" d="M50 54 55 64 50 61.5 45 64Z" />
      </g>
      <rect class="minimap__frame" x="1" y="1" width="98" height="98" rx="11.5" />
      <text class="minimap__north" x="50" y="10">N</text>
    </svg>
    <p class="minimap__stars">
      <i class="minimap__star minimap__star--on"></i>
      <i class="minimap__star minimap__star--on"></i>
      <i class="minimap__star minimap__star--on"></i>
      <i class="minimap__star"></i>
      <i class="minimap__star"></i>
    </p>
  </div>
</template>

<style scoped>
.minimap {
  display: grid;
  gap: 0.5em;
  width: 15em;
  font-size: 1rem;
}

.minimap__map {
  display: block;
  width: 100%;
  height: auto;
  filter: drop-shadow(0 0.4em 0.8em rgb(0 0 0 / 60%));
}

.minimap__land {
  fill: #25303a;
}

.minimap__park {
  fill: #2f4d3a;
}

.minimap__blocks {
  fill: #2d3945;
}

.minimap__highway {
  fill: none;
  stroke: #c9a24a;
  stroke-linecap: round;
  stroke-width: 4;
}

.minimap__road {
  fill: none;
  stroke: #8d99a3;
  stroke-linecap: round;
  stroke-width: 2.2;
}

.minimap__route {
  fill: none;
  stroke: #d64cd8;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 3;
  filter: drop-shadow(0 0 1.5px #d64cd8);
}

.minimap__pin {
  fill: #11161b;
  stroke: #f4f1ea;
  stroke-width: 1.4;
}

.minimap__pin--target {
  stroke: #d64cd8;
  stroke-width: 1.8;
}

.minimap__glyph {
  fill: none;
  stroke: #f4f1ea;
  stroke-linecap: round;
  stroke-width: 1.1;
}

.minimap__fill {
  fill: #f4f1ea;
}

.minimap__home {
  fill: #6ccf7a;
  stroke: #11161b;
  stroke-width: 1;
}

.minimap__player {
  fill: #fff;
  stroke: #11161b;
  stroke-linejoin: round;
  stroke-width: 1;
}

.minimap__frame {
  fill: none;
  stroke: rgb(255 255 255 / 85%);
  stroke-width: 2;
}

.minimap__north {
  fill: #fff;
  font-family: var(--font-body);
  font-size: 9px;
  font-weight: 800;
  text-anchor: middle;
}

/* Il livello di ricerca: tre stelle accese su cinque. */
.minimap__stars {
  display: flex;
  gap: 0.25em;
  justify-content: center;
  margin: 0;
}

.minimap__star {
  width: 1.5em;
  height: 1.5em;
  background: rgb(255 255 255 / 22%);
  clip-path: polygon(50% 0, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}

.minimap__star--on {
  background: #f4f1ea;
  filter: drop-shadow(0 0 0.3em rgb(255 255 255 / 70%));
}
</style>
