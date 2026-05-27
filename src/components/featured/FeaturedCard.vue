<template>
  <a
    :href="project.repo"
    target="_blank"
    rel="noopener noreferrer"
    class="feat"
  >
    <!-- Top bar -->
    <div class="feat-top">
      <span class="feat-num">capolavoro / {{ project.num }}</span>
      <span class="feat-cat">{{ project.cat }}</span>
    </div>

    <!-- Art area -->
    <div class="feat-art" :class="`art-${project.art}`">
      <div class="feat-art-grid"></div>
      <span class="feat-tag"><span class="star">★</span>featured</span>
      <div class="feat-icon" :class="`icon-${project.iconColor}`">
        <component :is="icons[project.iconName]" />
      </div>
    </div>

    <!-- Body -->
    <div class="feat-body">
      <h3><em>{{ project.title }}</em></h3>
      <p>{{ project.desc }}</p>
      <div class="chip-row">
        <span
          v-for="s in project.stack"
          :key="s.label"
          class="chip"
          :class="`chip-${s.color}`"
        >
          <span class="chip-dot"></span>{{ s.label }}
        </span>
      </div>
    </div>

    <!-- Footer -->
    <div class="feat-foot">
      <span class="feat-path">
        {{ pathDir }}<span class="feat-path-name">{{ pathName }}</span>
      </span>
      <span class="feat-open">open project →</span>
    </div>
  </a>
</template>

<script setup>
import { computed, defineComponent, h } from 'vue'

const props = defineProps({
  project: { type: Object, required: true },
})

const pathDir  = computed(() => props.project.path.replace(/\/[^/]+$/, '') + '/')
const pathName = computed(() => props.project.path.split('/').pop())

const VueIcon = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M2 3h4.5L12 12.5 17.5 3H22L12 21 2 3z', opacity: '.4' }),
    h('path', { d: 'M6.5 3h3L12 7.2 14.5 3h3L12 12.5 6.5 3z' }),
  ]),
})

const GameIcon = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('rect', { x: '2', y: '6', width: '20', height: '12', rx: '4' }),
    h('path', { d: 'M7 12h4M9 10v4' }),
    h('circle', { cx: '16', cy: '11', r: '1', fill: 'currentColor' }),
    h('circle', { cx: '18', cy: '13', r: '1', fill: 'currentColor' }),
  ]),
})

const BookIcon = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M4 4h11a3 3 0 0 1 3 3v13H6a2 2 0 0 1-2-2V4z' }),
    h('path', { d: 'M4 4v15a2 2 0 0 0 2 2h12' }),
    h('path', { d: 'M8 8h7M8 12h7M8 16h5' }),
  ]),
})

const icons = { vue: VueIcon, game: GameIcon, book: BookIcon }
</script>

<style scoped>
.feat {
  position: relative;
  background: var(--color-surface);
  border: 1px solid var(--color-border-2);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
  text-decoration: none;
}
.feat:hover {
  transform: translateY(-4px);
  border-color: var(--color-gold);
  box-shadow: 0 24px 48px -20px rgba(0,0,0,.6), 0 0 0 1px var(--color-gold);
}

/* Top bar */
.feat-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface-2);
  font-family: var(--font-family-mono);
  font-size: 11px;
  letter-spacing: .1em;
  text-transform: uppercase;
}
.feat-num { color: var(--color-gold); font-weight: 600; }
.feat-cat {
  padding: 3px 8px;
  border-radius: 5px;
  background: var(--color-bg, var(--color-surface-3));
  border: 1px solid var(--color-border-2);
  color: var(--color-text-1);
  font-size: 10px;
}

/* Art area */
.feat-art {
  height: 168px;
  position: relative;
  display: grid;
  place-items: center;
  border-bottom: 1px solid var(--color-border);
  overflow: hidden;
}
.art-coral {
  background:
    radial-gradient(600px 240px at 25% 30%, rgba(255,126,94,.32), transparent 60%),
    radial-gradient(500px 240px at 80% 70%, rgba(245,200,66,.22), transparent 60%),
    linear-gradient(135deg, #1a1610, #14110a);
}
.art-purple {
  background:
    radial-gradient(500px 240px at 25% 75%, rgba(247,120,186,.28), transparent 60%),
    radial-gradient(500px 240px at 80% 25%, rgba(188,140,255,.30), transparent 60%),
    linear-gradient(135deg, #1a0f24, #0e0a1c);
}
.art-blue {
  background:
    radial-gradient(500px 240px at 30% 35%, rgba(88,166,255,.32), transparent 60%),
    radial-gradient(500px 240px at 80% 80%, rgba(63,185,80,.22), transparent 60%),
    linear-gradient(135deg, #0d1729, #0a1220);
}

.feat-art-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);
  background-size: 24px 24px;
  mask-image: radial-gradient(ellipse at center, #000 30%, transparent 80%);
}

.feat-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 3;
  font-family: var(--font-family-mono);
  font-size: 10px;
  letter-spacing: .1em;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 5px;
  background: rgba(0,0,0,.45);
  border: 1px solid rgba(255,255,255,.08);
  color: var(--color-text);
  backdrop-filter: blur(6px);
}
.star { color: var(--color-gold); margin-right: 4px; }

.feat-icon {
  position: relative;
  z-index: 2;
  width: 72px;
  height: 72px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  background: rgba(13,17,23,.55);
  border: 1px solid rgba(255,255,255,.10);
  backdrop-filter: blur(8px);
  box-shadow: inset 0 0 30px rgba(255,255,255,.04), 0 12px 28px -10px rgba(0,0,0,.6);
}
.feat-icon :deep(svg) { width: 36px; height: 36px; }
.icon-coral  { color: var(--color-coral); }
.icon-purple { color: var(--color-purple); }
.icon-blue   { color: var(--color-blue); }
.icon-green  { color: var(--color-green); }
.icon-gold   { color: var(--color-gold); }

/* Body */
.feat-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}
.feat-body h3 {
  font-family: var(--font-family-sans);
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
  letter-spacing: -0.01em;
  line-height: 1.25;
}
.feat-body h3 em {
  font-style: italic;
  color: var(--color-coral);
  font-weight: 500;
}
.feat-body p {
  font-size: 14px;
  color: var(--color-text-2);
  margin: 0;
  flex: 1;
  line-height: 1.55;
}

/* Chips */
.chip-row { display: flex; flex-wrap: wrap; gap: 6px; }
.chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-family-mono);
  font-size: 11px;
  font-weight: 500;
  padding: 4px 9px;
  border-radius: 6px;
  border: 1px solid var(--color-border-2);
  background: var(--color-surface-2);
  color: var(--color-text-1);
}
.chip-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--color-text-3); }

.chip-blue   { color: var(--color-blue);   border-color: rgba(88,166,255,.3);  background: rgba(88,166,255,.08); }
.chip-blue   .chip-dot { background: var(--color-blue); }
.chip-purple { color: var(--color-purple); border-color: rgba(188,140,255,.3); background: rgba(188,140,255,.08); }
.chip-purple .chip-dot { background: var(--color-purple); }
.chip-green  { color: var(--color-green);  border-color: rgba(63,185,80,.3);   background: rgba(63,185,80,.08); }
.chip-green  .chip-dot { background: var(--color-green); }
.chip-gold   { color: var(--color-gold);   border-color: rgba(245,200,66,.3);  background: rgba(245,200,66,.08); }
.chip-gold   .chip-dot { background: var(--color-gold); }
.chip-coral  { color: var(--color-coral);  border-color: rgba(255,126,94,.3);  background: rgba(255,126,94,.08); }
.chip-coral  .chip-dot { background: var(--color-coral); }
.chip-pink   { color: var(--color-pink);   border-color: rgba(247,120,186,.3); background: rgba(247,120,186,.08); }
.chip-pink   .chip-dot { background: var(--color-pink); }

/* Footer */
.feat-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  border-top: 1px solid var(--color-border);
  background: var(--color-surface-2);
  font-family: var(--font-family-mono);
  font-size: 12px;
}
.feat-path { color: var(--color-text-3); }
.feat-path-name { color: var(--color-blue); }
.feat-open {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--color-gold);
  font-weight: 600;
  letter-spacing: .04em;
  transition: gap .2s;
}
.feat:hover .feat-open { gap: 10px; }
</style>
