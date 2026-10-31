<template>
  <!-- Altri disegni a matita sul banco, diversi da quelli di DeskScribbles: per il tratto di
       scrivania del Percorso. Decorativi. -->
  <div class="doodles" aria-hidden="true">
    <svg class="doodle doodle--plane" viewBox="0 0 150 80">
      <path d="M96 18l44-10-26 38-6-16zM108 30l32-22M108 30l-2 14 8-8" />
      <path class="doodle__dashed" d="M92 34q-30 20-52 4t-34 24" />
    </svg>

    <svg class="doodle doodle--bulb" viewBox="0 0 60 90">
      <path d="M30 10a18 18 0 0 0-11 32q4 4 4 10h14q0-6 4-10a18 18 0 0 0-11-32zM23 58h14M24 64h12M27 70h6" />
      <path d="M30 0v5M8 12l4 4M52 12l-4 4M2 32h6M52 32h6" />
    </svg>

    <svg class="doodle doodle--tag" viewBox="0 0 150 40">
      <text x="2" y="26">&lt;h1&gt;ciao&lt;/h1&gt;</text>
      <path d="M4 34q36-5 70 0t70-2" />
    </svg>

    <svg class="doodle doodle--braces" viewBox="0 0 70 60">
      <path d="M22 6q-10 0-9 12t-9 12q10 0 9 12t9 12M48 6q10 0 9 12t9 12q-10 0-9 12t-9 12" />
      <circle cx="28" cy="30" r="1.6" />
      <circle cx="35" cy="30" r="1.6" />
      <circle cx="42" cy="30" r="1.6" />
    </svg>

    <svg class="doodle doodle--face" viewBox="0 0 70 70">
      <circle cx="35" cy="35" r="28" />
      <circle cx="25" cy="30" r="7" />
      <circle cx="45" cy="30" r="7" />
      <path d="M32 30h6M18 29l-8-3M52 29l8-3M24 46q11 9 22 0" />
    </svg>

    <svg class="doodle doodle--save" viewBox="0 0 130 44">
      <text x="2" y="22">ctrl + s</text>
      <text class="doodle__small" x="4" y="38">ogni 5 minuti!!</text>
    </svg>

    <svg class="doodle doodle--arrow" viewBox="0 0 120 60">
      <path d="M6 44q20-40 44-18t-8 22-6-24 70-14M98 4l14 6-10 12" />
    </svg>
  </div>
</template>

<style scoped>
.doodles {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  border-radius: inherit;
  pointer-events: none;
}

.doodle {
  position: absolute;
  overflow: visible;
  fill: none;
  stroke: var(--graphite);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.6;
  opacity: 0.4;
  filter: blur(0.35px);
}

.doodle text {
  fill: var(--graphite);
  stroke: none;
  font-family: var(--font-hand);
  font-size: 18px;
  font-weight: 700;
}

.doodle .doodle__small {
  font-size: 12px;
  font-weight: 400;
}

.doodle__dashed {
  stroke-dasharray: 5 5;
}

.doodle circle:not([r="28"], [r="7"]) {
  fill: var(--graphite);
  stroke: none;
}

.doodle--plane {
  top: 3%;
  right: 5%;
  width: 8rem;
  rotate: 5deg;
}

.doodle--bulb {
  top: 20%;
  left: 4%;
  width: 3rem;
  rotate: -10deg;
}

.doodle--tag {
  top: 38%;
  right: 3%;
  width: 8rem;
  rotate: 4deg;
}

.doodle--braces {
  top: 55%;
  left: 5%;
  width: 3.6rem;
  rotate: 8deg;
}

.doodle--face {
  top: 72%;
  right: 6%;
  width: 3.6rem;
  rotate: -7deg;
}

.doodle--save {
  bottom: 3%;
  left: 6%;
  width: 7.5rem;
  rotate: -4deg;
}

.doodle--arrow {
  top: 7%;
  left: 12%;
  width: 6rem;
  rotate: 12deg;
}
</style>
