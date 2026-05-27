import { ref, onUnmounted } from 'vue'

export function useLineReveal({ speed = 60 } = {}) {
  const revealed = ref(0)
  let timer = null

  function start(count) {
    clearInterval(timer)
    revealed.value = 0
    timer = setInterval(() => {
      revealed.value++
      if (revealed.value >= count) clearInterval(timer)
    }, speed)
  }

  onUnmounted(() => clearInterval(timer))

  return { revealed, start }
}
