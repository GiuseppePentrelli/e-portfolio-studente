<template>
  <!-- La prova dal vivo di una primitiva del portfolio, su un vetrino di carta: `demo` sceglie quale.
       Sono le stesse primitive usate nel sito, non copie. -->
  <div class="specimen">
    <template v-if="demo === 'checkbox'">
      <HandDrawnCheckbox v-model="checks.mobile">Ho provato la pagina su un telefono vero</HandDrawnCheckbox>
      <HandDrawnCheckbox v-model="checks.keyboard">Il sito si usa anche solo con la tastiera</HandDrawnCheckbox>
    </template>

    <FocusLensLink v-else-if="demo === 'focus'" href="#capolavori" subject="Capolavori">
      Torna alla mostra
    </FocusLensLink>

    <DestructiveConfirmButton
      v-else-if="demo === 'destructive'"
      confirmed-message="Prova completata: nessun contenuto è stato cancellato."
    />
  </div>
</template>

<script setup>
import DestructiveConfirmButton from '@/components/primitives/DestructiveConfirmButton.vue'
import FocusLensLink from '@/components/primitives/FocusLensLink.vue'
import HandDrawnCheckbox from '@/components/primitives/HandDrawnCheckbox.vue'
import { reactive } from 'vue'

defineProps({
  demo: {
    type: String,
    required: true,
    validator: value => ['checkbox', 'focus', 'destructive'].includes(value),
  },
})

const checks = reactive({ mobile: true, keyboard: false })
</script>

<style scoped>
.specimen {
  display: grid;
  gap: var(--space-3);
  justify-items: start;
  width: min(100%, 26rem);
  padding: var(--space-5);
  background: var(--paper);
  border-radius: 0.3rem;
  box-shadow: 0 0.5rem 1.2rem rgb(0 20 30 / 28%);
}

.specimen > :only-child {
  justify-self: center;
}
</style>
