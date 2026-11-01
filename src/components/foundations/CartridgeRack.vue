<template>
  <!-- La rastrelliera delle cartucce: ogni cartuccia è un'opzione, e quella scelta si solleva dalla
       sua fessura con il led acceso. Sono radio veri: si usano con il mouse, il dito o le frecce.
       `items` è un elenco di { value, number, name }; il valore scelto è il v-model. Le misure sono
       in em: cambiando font-size la rastrelliera si ridimensiona tutta insieme. -->
  <fieldset class="rack">
    <legend class="rack__legend">{{ legend }}</legend>
    <div class="rack__slots">
      <label
        v-for="(item, index) in items"
        :key="item.value"
        class="cartridge"
        :style="{ '--shell': SHELLS[index % SHELLS.length] }"
      >
        <input v-model="model" type="radio" :name="name" :value="item.value" />
        <span class="cartridge__shell">
          <span class="cartridge__cap" aria-hidden="true"></span>
          <span class="cartridge__body">
            <span class="cartridge__grip" aria-hidden="true"></span>
            <span class="cartridge__label">
              <b>{{ item.number }}</b>
              <span>{{ item.name }}</span>
            </span>
          </span>
        </span>
        <i class="cartridge__led" aria-hidden="true"></i>
      </label>
    </div>
  </fieldset>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
  name: { type: String, required: true },
  legend: { type: String, required: true },
})

const model = defineModel({ type: String, required: true })

// Plastiche diverse, come cartucce comprate in anni diversi.
const SHELLS = ['#8d9196', '#3d4b8f', '#a8443b', '#2f6b4a', '#2a2d31']
</script>

<style scoped>
.rack {
  margin: 0;
  padding: 0;
  font-size: 1rem;
  border: 0;
}

.rack__legend {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* La base della rastrelliera è una scatola di plastica scura vista dall'alto: la faccia superiore,
   con le fessure, e il fronte. Le cartucce stanno nelle fessure. */
.rack__slots {
  display: flex;
  gap: 0.55em;
  justify-content: center;
  padding: 1.1em 0.8em 0;
  background:
    linear-gradient(
      transparent calc(100% - 2.3em),
      #3b434a calc(100% - 2.3em),
      #262c31 calc(100% - 1.5em),
      #15181b calc(100% - 1.5em),
      #0b0d0f
    );
  border-radius: 0 0 0.45em 0.45em;
  filter: drop-shadow(0 0.5em 0.5em rgb(0 0 0 / 55%));
}

.cartridge {
  position: relative;
  display: grid;
  justify-items: center;
  cursor: pointer;
}

.cartridge input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.cartridge__shell {
  display: grid;
  transition: translate var(--duration-short) var(--ease-out), filter var(--duration-short) var(--ease-out);
}

/* La faccia superiore della cartuccia, vista dall'alto: più chiara, perché prende la luce. */
.cartridge__cap {
  height: 0.5em;
  margin-inline: 0.15em;
  background:
    linear-gradient(rgb(255 255 255 / 30%), rgb(255 255 255 / 12%)),
    var(--shell);
  clip-path: polygon(6% 0, 94% 0, 100% 100%, 0 100%);
}

/* Il fronte: guscio di plastica con gli angoli in alto smussati, le righe per la presa e
   l'etichetta. */
.cartridge__body {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 0.35em;
  width: 6.8em;
  height: 6.6em;
  padding: 0.45em 0.4em 0.4em;
  background:
    linear-gradient(90deg, rgb(255 255 255 / 18%), transparent 25% 75%, rgb(0 0 0 / 22%)),
    var(--shell);
  clip-path: polygon(6% 0, 94% 0, 100% 6%, 100% 100%, 0 100%, 0 6%);
}

.cartridge__grip {
  height: 0.7em;
  margin-inline: 0.6em;
  background: repeating-linear-gradient(rgb(0 0 0 / 28%) 0 0.08em, transparent 0.08em 0.22em);
}

.cartridge__label {
  display: grid;
  align-content: start;
  gap: 0.15em;
  padding: 0.35em 0.35em 0.3em;
  overflow: hidden;
  color: var(--ink-strong);
  background: var(--paper);
  border-radius: 0.15em;
}

.cartridge__label b {
  color: var(--pen-red);
  font-family: var(--font-code);
  font-size: 0.7em;
  font-weight: 700;
}

.cartridge__label span {
  font-family: var(--font-hand);
  font-size: 0.9em;
  line-height: 1.1;
}

.cartridge__led {
  width: 0.5em;
  height: 0.5em;
  margin-top: 0.5em;
  background: #23392c;
  border-radius: 50%;
  box-shadow: inset 0 0.08em 0.12em rgb(0 0 0 / 60%);
}

/* La cartuccia scelta è sollevata dalla fessura e illuminata dal led. */
.cartridge input:checked + .cartridge__shell {
  filter: drop-shadow(0 0 0.5em rgb(54 214 255 / 55%));
  translate: 0 -0.9em;
}

.cartridge input:checked ~ .cartridge__led {
  background: var(--lab-led);
  box-shadow:
    0 0 0.35em var(--lab-led),
    0 0 0.9em rgb(93 255 155 / 60%);
}

/* Il contorno del focus non si vede su un elemento ritagliato: lo disegna l'ombra. */
.cartridge input:focus-visible + .cartridge__shell {
  filter:
    drop-shadow(0 0 0.1em var(--lab-neon))
    drop-shadow(0 0 0.1em var(--lab-neon))
    drop-shadow(0 0 0.5em rgb(54 214 255 / 55%));
}

@media (hover: hover) and (pointer: fine) {
  .cartridge:hover input:not(:checked) + .cartridge__shell {
    translate: 0 -0.35em;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cartridge__shell {
    transition: none;
  }
}
</style>
