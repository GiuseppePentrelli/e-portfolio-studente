<template>
  <!-- Una puntina da bacheca: testa colorata con un riflesso e l'ombra che cade in basso a destra.
       Chi la usa decide dove sta. Con `thread` il filo rosso della bacheca ci passa: allora non deve
       stare dentro un elemento ruotato o trasformato, altrimenti il filo le passa sopra. -->
  <span class="pin" :class="`pin--${color}`" :data-thread-pin="thread ? '' : null" aria-hidden="true"></span>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: 'red',
    validator: value => ['red', 'blue', 'green', 'yellow'].includes(value),
  },
  thread: { type: Boolean, default: false },
})
</script>

<style scoped>
.pin {
  --pin: var(--pin-red);
  position: absolute;
  z-index: 6;
  width: 1.15rem;
  height: 1.15rem;
  background:
    radial-gradient(circle at 34% 30%, rgb(255 255 255 / 78%) 0 12%, transparent 30%),
    var(--pin);
  border-radius: 50%;
  box-shadow:
    inset -0.12rem -0.16rem 0.2rem rgb(0 0 0 / 30%),
    0.3rem 0.45rem 0.32rem -0.06rem rgb(40 22 8 / 45%);
  translate: -50% -50%;
}

.pin--blue {
  --pin: var(--pin-blue);
}

.pin--green {
  --pin: var(--pin-green);
}

.pin--yellow {
  --pin: var(--pin-yellow);
}
</style>
