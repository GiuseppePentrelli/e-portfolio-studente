<template>
  <article class="bg-surface border border-border rounded-card overflow-hidden flex flex-col gap-4 hover:border-blue transition-all duration-300 hover:-translate-y-1">

    <!-- Cover con tilt 3D solo sull'immagine -->
    <div
      class="cert-cover"
      @mousemove="onMove"
      @mouseleave="onLeave"
    >
      <!-- Glow che segue il mouse -->
      <div class="cert-glow" :style="glowStyle" aria-hidden="true" />

      <template v-if="cert.image">
        <img :src="assetUrl(cert.image)" aria-hidden="true" class="cert-blur-bg" />
        <div class="cert-img-wrap" :style="imgStyle">
          <img :src="assetUrl(cert.image)" :alt="cert.title" class="cert-img" loading="lazy" />
        </div>
      </template>
      <div v-else class="cert-placeholder">
        <span aria-hidden="true" class="cert-placeholder-icon">🎓</span>
      </div>

      <!-- Badge livello -->
      <span class="cert-badge" :class="badgeClass">
        {{ t('certifications.levels.' + cert.level) }}
      </span>

      <!-- Badge logo ente (es. Cisco) -->
      <img
        v-if="cert.badge"
        :src="assetUrl(cert.badge)"
        alt=""
        aria-hidden="true"
        class="cert-issuer-badge"
      />
    </div>

    <!-- Body -->
    <div class="px-5 pb-5 flex flex-col gap-2">
      <h3 class="text-text font-bold text-sm leading-snug">{{ cert.title }}</h3>
      <div class="flex items-center justify-between gap-2">
        <span class="text-text-3 font-mono text-xs">{{ cert.issuer }}</span>
        <span class="text-text-3 font-mono text-xs">{{ cert.year }}</span>
      </div>
      <a
        v-if="cert.verifyUrl"
        :href="cert.verifyUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1 text-xs font-mono text-blue hover:text-text transition-colors duration-200 mt-1"
      >
        {{ t('certifications.verify') }} <span aria-hidden="true">↗</span>
      </a>
    </div>

  </article>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { assetUrl } from '@/utils/assets'

const props = defineProps({
  cert: { type: Object, required: true },
})

const { t } = useLocale()

const tiltX = ref(0)
const tiltY = ref(0)
const glowX = ref(50)
const glowY = ref(50)
const isHovered = ref(false)

const TILT_MAX = 14

function onMove(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width
  const y = (e.clientY - rect.top) / rect.height
  tiltX.value = (y - 0.5) * -TILT_MAX
  tiltY.value = (x - 0.5) * TILT_MAX
  glowX.value = x * 100
  glowY.value = y * 100
  isHovered.value = true
}

function onLeave() {
  tiltX.value = 0
  tiltY.value = 0
  isHovered.value = false
}

const imgStyle = computed(() => ({
  transform: `rotateX(${tiltX.value}deg) rotateY(${tiltY.value}deg) ${isHovered.value ? 'scale3d(1.08,1.08,1.08)' : 'scale3d(1,1,1)'}`,
  transition: isHovered.value ? 'transform 0.1s ease' : 'transform 0.45s ease',
}))

const glowColorMap = {
  basic:      'rgba(63, 185, 80, 0.22)',
  intermedio: 'rgba(88, 166, 255, 0.22)',
  avanzato:   'rgba(245, 200, 66, 0.22)',
}

const glowStyle = computed(() => ({
  background: `radial-gradient(circle at ${glowX.value}% ${glowY.value}%, ${glowColorMap[props.cert.level] ?? glowColorMap.basic}, transparent 65%)`,
  opacity: isHovered.value ? 1 : 0,
}))

const badgeClass = computed(() => ({
  basic:      'badge-basic',
  intermedio: 'badge-intermedio',
  avanzato:   'badge-avanzato',
}[props.cert.level] ?? 'badge-basic'))
</script>

<style scoped>
.cert-cover {
  position: relative;
  width: 100%;
  height: 210px;
  overflow: hidden;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  perspective: 700px;
}

.cert-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  transition: opacity 0.3s ease;
}

.cert-blur-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.1);
  filter: blur(18px) brightness(0.4) saturate(1.4);
  pointer-events: none;
}

/* Wrapper che tilta in 3D */
.cert-img-wrap {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
  will-change: transform;
}

.cert-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 6px 20px rgba(0,0,0,0.55));
}

.cert-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-surface-2) 0%, var(--color-surface-3) 100%);
}
.cert-placeholder-icon { font-size: 2.5rem; opacity: 0.35; }

/* Badge livello */
.cert-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
  font-family: var(--font-family-mono);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: var(--radius-tag);
  border: 1px solid;
}
.badge-basic {
  color: var(--color-green);
  border-color: var(--color-green);
  background: color-mix(in srgb, var(--color-bg) 75%, var(--color-green) 25%);
}
.badge-intermedio {
  color: var(--color-blue);
  border-color: var(--color-blue);
  background: color-mix(in srgb, var(--color-bg) 75%, var(--color-blue) 25%);
}
.badge-avanzato {
  color: var(--color-gold);
  border-color: var(--color-gold);
  background: color-mix(in srgb, var(--color-bg) 75%, var(--color-gold) 25%);
}

/* Badge logo ente in basso a destra */
.cert-issuer-badge {
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 10;
  width: 44px;
  height: 44px;
  object-fit: contain;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.4));
}
</style>
