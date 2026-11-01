<template>
  <!-- Il monitor sulla scrivania: cornice nera, led d'accensione, braccio e base. Lo schermo mostra
       una finestra con la barra del titolo e, nel corpo, quello che arriva dallo slot. Lo schermo
       è 16:10; chi lo usa può cambiarlo con --monitor-ratio, per esempio quadrato sul telefono. Con `dark` il corpo della
       finestra è scuro, per i componenti che portano il loro fondo. -->
  <div class="monitor">
    <div class="monitor__bezel">
      <span class="monitor__top" aria-hidden="true"></span>
      <div class="monitor__screen">
        <div class="monitor__window">
          <p class="monitor__titlebar">
            <span class="monitor__dots" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="monitor__title">{{ title }}</span>
          </p>
          <div class="monitor__body" :class="{ 'monitor__body--dark': dark }">
            <slot />
          </div>
        </div>
        <span class="monitor__glare" aria-hidden="true"></span>
      </div>
      <span class="monitor__led" aria-hidden="true"></span>
    </div>
    <span class="monitor__neck" aria-hidden="true"></span>
    <span class="monitor__base" aria-hidden="true"></span>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  dark: { type: Boolean, default: false },
})
</script>

<style scoped>
.monitor {
  display: grid;
  justify-items: center;
}

/* La cornice, con l'ombra che il monitor proietta sulla parete appena dietro. */
.monitor__bezel {
  position: relative;
  width: 100%;
  padding: 0.6rem 0.6rem 1.1rem;
  background: linear-gradient(#1c1f23, #0c0e10);
  border-radius: 0.7rem;
  box-shadow:
    inset 0 0 0 1px rgb(255 255 255 / 8%),
    -0.8rem 1.6rem 1.6rem -0.2rem rgb(0 0 0 / 50%);
}

/* Lo spessore del monitor visto dall'alto: la faccia superiore, più chiara, che si restringe verso
   il fondo. */
.monitor__top {
  position: absolute;
  bottom: calc(100% - 0.3rem);
  left: 1%;
  z-index: -1;
  width: 98%;
  height: 0.9rem;
  background: linear-gradient(#4a5258, #22272b);
  border-radius: 0.6rem 0.6rem 0 0;
  clip-path: polygon(2.5% 0, 97.5% 0, 100% 100%, 0 100%);
}

.monitor__screen {
  position: relative;
  aspect-ratio: var(--monitor-ratio, 16 / 10);
  overflow: hidden;
  background: #05080b;
  border-radius: 0.25rem;
}

.monitor__window {
  position: absolute;
  inset: 0.5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #1a1f24;
  border-radius: 0.35rem;
  box-shadow: 0 0.4rem 1.2rem rgb(0 0 0 / 60%);
}

.monitor__titlebar {
  display: flex;
  gap: 0.7rem;
  align-items: center;
  margin: 0;
  padding: 0.35rem 0.7rem;
  color: #b9c7cd;
  font-family: var(--font-code);
  font-size: 0.75rem;
  background: #2a3138;
  border-bottom: 1px solid #10151a;
}

.monitor__dots {
  display: flex;
  gap: 0.3rem;
}

.monitor__dots i {
  width: 0.55rem;
  height: 0.55rem;
  background: #ff6b5f;
  border-radius: 50%;
}

.monitor__dots i:nth-child(2) {
  background: #ffc53d;
}

.monitor__dots i:nth-child(3) {
  background: #3fd168;
}

.monitor__title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Il corpo della finestra: un piano di prova chiaro a quadretti, o scuro per i componenti con il
   loro fondo. Le prove più alte dello schermo scorrono. */
.monitor__body {
  position: relative;
  display: grid;
  flex: 1;
  place-items: center;
  min-height: 0;
  padding: 1rem;
  overflow: auto;
  background:
    linear-gradient(rgb(54 160 190 / 9%) 1px, transparent 1px) 0 0 / 1.25rem 1.25rem,
    linear-gradient(90deg, rgb(54 160 190 / 9%) 1px, transparent 1px) 0 0 / 1.25rem 1.25rem,
    #e6f3f4;
}

.monitor__body--dark {
  padding: 0;
  overflow: hidden;
  background: #0f0f0f;
}

.monitor__glare {
  position: absolute;
  inset: 0;
  background: linear-gradient(115deg, rgb(255 255 255 / 7%) 0 18%, transparent 30%);
  pointer-events: none;
}

.monitor__led {
  position: absolute;
  right: 1.2rem;
  bottom: 0.4rem;
  width: 0.35rem;
  height: 0.35rem;
  background: var(--lab-neon);
  border-radius: 50%;
  box-shadow: 0 0 0.4rem var(--lab-neon);
}

.monitor__neck {
  width: 3.2rem;
  height: var(--monitor-neck, 3rem);
  background: linear-gradient(90deg, #15181b, #3a4045 45%, #15181b);
  clip-path: polygon(18% 0, 82% 0, 100% 100%, 0 100%);
}

/* La base appoggiata sul piano: la faccia superiore si vede, ovale, e sotto c'è l'ombra. */
.monitor__base {
  width: min(40%, 14rem);
  height: 1.3rem;
  margin-top: -0.35rem;
  background:
    radial-gradient(ellipse 50% 60% at 50% 35%, #4a5258, #262b30 70%, transparent 71%),
    linear-gradient(transparent 50%, #111417 50%);
  border-radius: 50% 50% 0.4rem 0.4rem / 70% 70% 0.4rem 0.4rem;
  filter: drop-shadow(0 0.4rem 0.4rem rgb(0 0 0 / 60%));
}
</style>
