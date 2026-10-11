<template>
  <svg
    class="portrait"
    viewBox="0 0 320 240"
    role="img"
    aria-labelledby="portrait-title portrait-description"
  >
    <title id="portrait-title">Segnaposto per il ritratto di Giuseppe</title>
    <desc id="portrait-description">
      Schizzo provvisorio a matita di una persona davanti a un computer portatile.
    </desc>
    <path class="portrait__paper" d="M18 14 Q158 5 303 18 L294 225 Q161 235 21 220 Z" />
    <path class="portrait__line" d="M54 193 Q158 185 267 195" />
    <path class="portrait__fill" d="M89 181 Q104 126 159 124 Q214 128 231 184 Z" />
    <path class="portrait__line" d="M114 126 Q112 70 160 61 Q204 70 203 126" />
    <path class="portrait__hair" d="M117 101 Q111 65 159 56 Q199 62 205 98 Q186 78 162 79 Q136 77 117 101 Z" />
    <path class="portrait__line" d="M139 105 Q147 110 154 105 M171 105 Q179 110 186 105" />
    <path class="portrait__line" d="M153 119 Q162 125 173 119" />
    <path class="portrait__laptop" d="M91 145 L218 143 L232 201 L79 202 Z" />
    <path class="portrait__accent" d="M139 168 Q157 153 176 168 Q158 185 139 168 Z" />
    <path class="portrait__scribble" d="M37 45 Q58 28 77 41 M40 55 Q67 42 87 57" />
    <path class="portrait__scribble" d="M241 47 Q264 31 283 48 M246 58 Q267 46 285 60" />
  </svg>
</template>

<style scoped>
.portrait {
  width: 100%;
  color: var(--graphite);
  filter: url("#none");
}

.portrait__paper {
  fill: #f4ecd5;
  stroke: currentColor;
  stroke-width: 2.2;
}

.portrait__line,
.portrait__scribble {
  fill: none;
  stroke: currentColor;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.portrait__scribble {
  opacity: 0.35;
  stroke-width: 2;
}

.portrait__fill {
  fill: #9fd6c8;
  stroke: currentColor;
  stroke-width: 2.5;
}

.portrait__hair {
  fill: #485158;
  stroke: currentColor;
  stroke-width: 2.5;
}

.portrait__laptop {
  fill: #bdd7eb;
  stroke: currentColor;
  stroke-width: 3;
  stroke-linejoin: round;
}

.portrait__accent {
  fill: var(--highlight-yellow);
  stroke: currentColor;
  stroke-width: 2;
}
</style>
