<template>
  <section class="terminal" :aria-label="`Terminale: ${title}`">
    <svg class="terminal__frame" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path d="M2 3 Q30 1.6 60 2.4 T98 2.2 Q99.1 40 98.6 70 T98.2 97.6 Q60 98.8 30 98.2 T1.6 97.8 Q0.9 60 1.4 30 T2 3Z" />
      <path d="M0.8 2.6 Q40 3.4 99.3 1.4 M98.9 0.6 Q98.1 50 99.4 99.2 M99.6 98.4 Q50 97.2 0.5 99.1 M1.2 99.5 Q2.3 50 0.6 1" />
      <path d="M3 1.8 Q55 2.9 97 3.1 M97.6 4 Q99.6 55 97.5 96 M96 98.9 Q45 97.6 3.5 97.2 M2.6 95 Q0.4 45 3.2 4" />
    </svg>
    <header class="terminal__bar" aria-hidden="true">
      <span class="terminal__controls">
        <i class="terminal__control terminal__control--close"></i>
        <i class="terminal__control terminal__control--minimize"></i>
        <i class="terminal__control terminal__control--maximize"></i>
      </span>
      <span class="terminal__title">{{ title }}</span>
    </header>

    <pre class="terminal__content" tabindex="0"><code><span class="terminal__prompt"><span class="terminal__user">{{ user }}</span><span aria-hidden="true">@</span><span class="terminal__host">{{ host }}</span><span aria-hidden="true">:</span><span class="terminal__path">{{ path }}</span><span aria-hidden="true">$</span></span> {{ command }}<template v-if="output">
<span class="terminal__output">{{ output }}</span></template></code></pre>
    <span class="terminal__smudge" aria-hidden="true"></span>
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'giuseppe@portfolio: ~' },
  user: { type: String, default: 'giuseppe' },
  host: { type: String, default: 'portfolio' },
  path: { type: String, default: '~' },
  command: { type: String, required: true },
  output: { type: String, default: '' },
})
</script>

<style scoped>
.terminal {
  position: relative;
  isolation: isolate;
  min-width: 0;
  max-width: 100%;
  padding: 3.6rem clamp(1rem, 3vw, 1.6rem) 1.35rem;
  color: #343a40;
  background: transparent;
}

.terminal__frame {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.terminal__frame path {
  fill: none;
  stroke: rgb(73 80 87 / 50%);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.terminal__frame path:first-child {
  stroke: rgb(73 80 87 / 75%);
  stroke-width: 1.4;
}

.terminal__frame path:last-child {
  stroke: rgb(73 80 87 / 35%);
  stroke-width: 0.8;
}

.terminal__bar {
  position: absolute;
  z-index: 1;
  top: 0.35rem;
  right: 0.45rem;
  left: 0.45rem;
  display: grid;
  grid-template-columns: minmax(0, 4.5rem) minmax(0, 1fr) minmax(0, 4.5rem);
  align-items: center;
  min-height: 2.45rem;
  padding-inline: 0.55rem;
  background: repeating-linear-gradient(-55deg, rgb(73 80 87 / 12%) 0 1px, transparent 1px 7px);
}

.terminal__bar::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: -0.1rem;
  left: 0;
  height: 0.38rem;
  border-top: 0.09rem solid rgb(73 80 87 / 68%);
  border-bottom: 0.055rem solid rgb(73 80 87 / 34%);
  border-radius: 50%;
  transform: rotate(0.15deg);
}

.terminal__controls {
  display: flex;
  gap: 0.42rem;
  margin-left: 0.55rem;
}

.terminal__control {
  width: 0.86rem;
  aspect-ratio: 1;
  border: 0.075rem solid;
  border-radius: 48% 52% 45% 55%;
}

.terminal__control--close {
  border-color: #e03131;
  background:
    repeating-linear-gradient(17deg, rgb(224 49 49 / 16%) 0 1px, transparent 1px 3px),
    repeating-linear-gradient(-11deg, rgb(255 107 107 / 20%) 0 2px, transparent 2px 5px),
    rgb(255 201 201 / 34%);
  rotate: -8deg;
}

.terminal__control--minimize {
  border-color: #f08c00;
  background:
    repeating-linear-gradient(14deg, rgb(240 140 0 / 17%) 0 1px, transparent 1px 3px),
    repeating-linear-gradient(-16deg, rgb(255 193 7 / 18%) 0 2px, transparent 2px 5px),
    rgb(255 236 153 / 34%);
  rotate: 6deg;
}

.terminal__control--maximize {
  border-color: #2f9e44;
  background:
    repeating-linear-gradient(19deg, rgb(47 158 68 / 16%) 0 1px, transparent 1px 3px),
    repeating-linear-gradient(-9deg, rgb(81 207 102 / 18%) 0 2px, transparent 2px 5px),
    rgb(178 242 187 / 34%);
  rotate: -4deg;
}

.terminal__title {
  grid-column: 2;
  overflow: hidden;
  color: #495057;
  font-family: var(--font-code);
  font-size: clamp(0.72rem, 2vw, 0.92rem);
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.terminal__content {
  position: relative;
  z-index: 1;
  overflow-x: auto;
  margin: 0;
  font-family: var(--font-code);
  font-size: clamp(0.76rem, 2vw, 0.94rem);
  line-height: 1.65;
  white-space: pre;
  scrollbar-width: thin;
}

.terminal__content:focus-visible {
  outline: 0.18rem solid var(--focus);
  outline-offset: 0.35rem;
}

.terminal__prompt {
  font-weight: 700;
}

.terminal__user {
  color: #2f7f3d;
}

.terminal__host,
.terminal__path {
  color: #166aa3;
}

.terminal__output {
  color: #626b71;
}

.terminal__smudge {
  position: absolute;
  right: 1.2rem;
  bottom: -0.25rem;
  z-index: -1;
  width: 5.8rem;
  height: 1rem;
  border-radius: 50%;
  background: rgb(73 80 87 / 14%);
  filter: blur(0.32rem);
  rotate: -4deg;
}
</style>
