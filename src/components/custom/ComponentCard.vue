<template>
  <div class="comp-card">
    <!-- Preview area -->
    <div class="comp-preview">
      <div v-if="component.preview" class="comp-iframe-wrap"
        :style="{ width: '800px', height: bodyH + 'px', transform: `scale(${scale})` }">
        <iframe
          :src="assetUrl(component.preview)"
          scrolling="no"
          frameborder="0"
          :title="`Preview ${component.name}`"
          :style="{ width: '800px', height: bodyH + 'px' }"
          class="comp-iframe"
        />
      </div>
      <div v-else class="comp-preview-fallback" :data-cat="component.category" :style="{ '--accent': component.color }">
        <span class="comp-cat-tag">{{ t(`components.filters.${component.category}`) }}</span>
      </div>
    </div>

    <div class="comp-body">
      <h3 class="comp-name">{{ component.name }}</h3>
      <p class="comp-desc">{{ locale === 'it' ? component.desc_it : component.desc_en }}</p>

      <div class="comp-chips">
        <span v-for="tech in component.tech" :key="tech" class="chip">{{ tech }}</span>
      </div>
    </div>

    <div class="comp-foot">
      <a :href="component.repo" target="_blank" rel="noopener noreferrer" class="comp-btn comp-btn-code">
        {{ t('components.code') }} ↗
      </a>
      <a :href="`${component.repo}/archive/refs/heads/main.zip`" target="_blank" rel="noopener noreferrer" class="comp-btn comp-btn-dl">
        {{ t('components.download') }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { assetUrl } from '@/utils/assets'

const props = defineProps({
  component: { type: Object, required: true },
})

const { t, locale } = useLocale()

const scale = computed(() => props.component.previewScale ?? 0.42)
const bodyH = computed(() => props.component.previewBodyH  ?? 680)
</script>

<style scoped>
.comp-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  background: var(--color-surface);
  transition: border-color .2s, transform .2s;
}
.comp-card:hover {
  border-color: var(--color-gold);
  transform: translateY(-3px);
}

/* --- Preview con iframe --- */
.comp-preview {
  height: 300px;
  overflow: hidden;
  position: relative;
  background: var(--color-bg);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 8px;
}

/* width/height/transform vengono passati via :style dal componente */
.comp-iframe-wrap {
  flex-shrink: 0;
  transform-origin: top center;
}
.comp-iframe {
  border: none;
  display: block;
}

/* Fallback quando non c'è preview */
.comp-preview-fallback {
  width: 100%;
  height: 100%;
  background: color-mix(in srgb, var(--accent, var(--color-gold)) 12%, var(--color-bg));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
/* card → dots */
.comp-preview-fallback::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, color-mix(in srgb, var(--accent, var(--color-gold)) 30%, transparent) 1.5px, transparent 1.5px);
  background-size: 22px 22px;
}
/* button → diagonali */
.comp-preview-fallback[data-cat="button"]::before {
  background-image: repeating-linear-gradient(
    45deg,
    color-mix(in srgb, var(--accent) 22%, transparent) 0px,
    color-mix(in srgb, var(--accent) 22%, transparent) 1px,
    transparent 1px,
    transparent 18px
  );
  background-size: unset;
}
/* nav → griglia */
.comp-preview-fallback[data-cat="nav"]::before {
  background-image:
    linear-gradient(color-mix(in srgb, var(--accent) 18%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--accent) 18%, transparent) 1px, transparent 1px);
  background-size: 22px 22px;
}
/* form → rombi */
.comp-preview-fallback[data-cat="form"]::before {
  background-image:
    linear-gradient(45deg, color-mix(in srgb, var(--accent) 18%, transparent) 1px, transparent 1px),
    linear-gradient(-45deg, color-mix(in srgb, var(--accent) 18%, transparent) 1px, transparent 1px);
  background-size: 22px 22px;
}
.comp-cat-tag {
  position: relative;
  z-index: 1;
  font-family: var(--font-family-mono);
  font-size: 11px;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--accent, var(--color-gold));
  border: 1px solid var(--accent, var(--color-gold));
  padding: 4px 10px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--accent, var(--color-gold)) 10%, transparent);
}

/* --- Body --- */
.comp-body {
  flex: 1;
  padding: 12px 16px 8px;
}
.comp-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 6px;
}
.comp-desc {
  font-size: 13px;
  color: var(--color-text-2);
  line-height: 1.5;
  margin: 0 0 12px;
}
.comp-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.chip {
  font-family: var(--font-family-mono);
  font-size: 10.5px;
  color: var(--color-text-3);
  border: 1px solid var(--color-border-2, var(--color-border));
  padding: 2px 8px;
  border-radius: 4px;
}

/* --- Footer --- */
.comp-foot {
  display: flex;
  gap: 8px;
  padding: 10px 16px 14px;
  border-top: 1px solid var(--color-border);
}
.comp-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family-mono);
  font-size: 12px;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all .18s;
  white-space: nowrap;
}
.comp-btn-code {
  color: var(--color-gold);
  border: 1px solid var(--color-gold);
  background: rgba(245, 200, 66, 0.06);
}
.comp-btn-code:hover {
  background: var(--color-gold);
  color: var(--color-bg);
}
.comp-btn-dl {
  color: var(--color-text-2);
  border: 1px solid var(--color-border);
  background: transparent;
}
.comp-btn-dl:hover {
  color: var(--color-text);
  border-color: var(--color-text-2);
}

/* === LIGHT MODE (brutal-giocoso) ====================================== */

[data-theme="light"] .comp-card {
  border: 2px solid var(--color-ink);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  transition: transform .15s ease, box-shadow .15s ease;
  transform: rotate(var(--tilt, 0deg));
}
[data-theme="light"] .comp-card:nth-child(3n+1) { --tilt: -0.75deg; }
[data-theme="light"] .comp-card:nth-child(3n+2) { --tilt: 0.5deg; }
[data-theme="light"] .comp-card:nth-child(3n)   { --tilt: -0.5deg; }
[data-theme="light"] .comp-card:hover {
  border-color: var(--color-ink);
  transform: translate(3px, 3px) rotate(var(--tilt, 0deg));
  box-shadow: var(--shadow-btn);
}
@media (max-width: 768px) {
  [data-theme="light"] .comp-card { --tilt: 0deg; }
}

[data-theme="light"] .comp-preview-fallback {
  background: color-mix(in srgb, var(--accent, var(--color-gold)) 20%, var(--color-bg));
}
[data-theme="light"] .comp-preview-fallback::before {
  background-image: radial-gradient(circle, color-mix(in srgb, var(--accent, var(--color-gold)) 50%, transparent) 1.5px, transparent 1.5px);
}
[data-theme="light"] .comp-preview-fallback[data-cat="button"]::before {
  background-image: repeating-linear-gradient(
    45deg,
    color-mix(in srgb, var(--accent) 40%, transparent) 0px,
    color-mix(in srgb, var(--accent) 40%, transparent) 1px,
    transparent 1px,
    transparent 18px
  );
}
[data-theme="light"] .comp-preview-fallback[data-cat="nav"]::before {
  background-image:
    linear-gradient(color-mix(in srgb, var(--accent) 35%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--accent) 35%, transparent) 1px, transparent 1px);
}
[data-theme="light"] .comp-preview-fallback[data-cat="form"]::before {
  background-image:
    linear-gradient(45deg, color-mix(in srgb, var(--accent) 35%, transparent) 1px, transparent 1px),
    linear-gradient(-45deg, color-mix(in srgb, var(--accent) 35%, transparent) 1px, transparent 1px);
}
[data-theme="light"] .comp-cat-tag {
  font-weight: 700;
  color: #111;
  border: 2px solid var(--color-ink);
  border-radius: var(--radius-tag);
  background: var(--color-fill-gold);
  box-shadow: 2px 2px 0 0 var(--color-ink);
}

[data-theme="light"] .chip {
  color: var(--color-text-2);
  border: 1.5px solid var(--color-ink);
  border-radius: var(--radius-tag);
}

[data-theme="light"] .comp-foot { border-top: 2px solid var(--color-ink); }
[data-theme="light"] .comp-btn {
  font-weight: 700;
  text-transform: uppercase;
  border: 2px solid var(--color-ink);
  border-radius: var(--radius-btn);
  box-shadow: 2px 2px 0 0 var(--color-ink);
  transition: transform .15s ease, box-shadow .15s ease;
}
[data-theme="light"] .comp-btn:hover {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0 0 var(--color-ink);
}
[data-theme="light"] .comp-btn-code {
  color: #111;
  background: var(--color-fill-gold);
}
[data-theme="light"] .comp-btn-code:hover {
  background: var(--color-fill-gold);
  color: #111;
}
[data-theme="light"] .comp-btn-dl {
  color: var(--color-text-1);
  background: var(--color-surface-2);
}
[data-theme="light"] .comp-btn-dl:hover {
  color: var(--color-text-1);
  border-color: var(--color-ink);
}
</style>
