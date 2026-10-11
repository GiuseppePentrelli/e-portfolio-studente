import { onBeforeUnmount, onMounted, toValue, watch } from 'vue'

const STIFFNESS = 125
const DAMPING = 8
const MAX_FLAP = 24
const HOVER_LIFT = 9

// Il movimento di un pezzo di carta fissato da un solo lato: due molle poco smorzate, una per
// quanto si solleva (flap) e una per quanto oscilla (swing). Scrive sull'elemento le proprietà
// `--flap` (0–24) e `--swing` (circa ±6): è il CSS dell'elemento a decidere come mostrarle.
// Reagisce al puntatore, alla velocità del supporto (`drive`) e ai colpetti dati con `nudge()`,
// poi torna fermo da solo. Con il movimento ridotto non fa nulla.
export function usePaperSpring(element, { drive = 0, nudgeOnMount = 0 } = {}) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let flap = 0
  let flapVelocity = 0
  let swing = 0
  let swingVelocity = 0
  let hoverLift = 0
  let hoverSwing = 0
  let lastFrame = 0
  let frame = null

  function step(now) {
    const seconds = Math.min(64, now - lastFrame) / 1000 / 4
    lastFrame = now
    const speed = toValue(drive)
    const flapTarget = Math.min(MAX_FLAP, Math.abs(speed) * 7.5 + hoverLift)
    const swingTarget = Math.max(-6, Math.min(6, speed * 3)) + hoverSwing

    for (let i = 0; i < 4; i += 1) {
      flapVelocity += (STIFFNESS * (flapTarget - flap) - DAMPING * flapVelocity) * seconds
      flap += flapVelocity * seconds
      swingVelocity += (STIFFNESS * (swingTarget - swing) - DAMPING * swingVelocity) * seconds
      swing += swingVelocity * seconds
      // La carta non può attraversare ciò su cui è appoggiata: rimbalza appena.
      if (flap < 0) {
        flap = 0
        flapVelocity *= -0.3
      }
    }

    const settled =
      Math.abs(flap - flapTarget) < 0.05 &&
      Math.abs(flapVelocity) < 0.5 &&
      Math.abs(swing - swingTarget) < 0.05 &&
      Math.abs(swingVelocity) < 0.5
    if (settled) {
      flap = flapTarget
      swing = swingTarget
    }

    const target = toValue(element)
    if (!target) {
      frame = null
      return
    }
    target.style.setProperty('--flap', flap.toFixed(2))
    target.style.setProperty('--swing', swing.toFixed(2))
    frame = settled ? null : window.requestAnimationFrame(step)
  }

  function wake() {
    if (frame !== null || reducedMotion.matches) return
    lastFrame = performance.now()
    frame = window.requestAnimationFrame(step)
  }

  function nudge(strength = 200) {
    flapVelocity += strength
    swingVelocity -= strength * 0.22
    wake()
  }

  function touch(event) {
    if (event.pointerType === 'touch') return
    const rect = toValue(element).getBoundingClientRect()
    hoverLift = HOVER_LIFT
    hoverSwing = ((event.clientX - rect.left) / rect.width - 0.5) * -5
    wake()
  }

  function release() {
    hoverLift = 0
    hoverSwing = 0
    wake()
  }

  watch(() => toValue(drive), wake)

  onMounted(() => {
    if (nudgeOnMount) nudge(nudgeOnMount)
  })

  onBeforeUnmount(() => {
    window.cancelAnimationFrame(frame)
  })

  return { nudge, touch, release }
}
