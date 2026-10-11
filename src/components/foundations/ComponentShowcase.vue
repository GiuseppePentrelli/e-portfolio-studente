<template>
  <section class="component-lab" aria-labelledby="components-title">
    <header class="component-lab__heading">
      <h2 id="components-title">Componenti scelti</h2>
      <p>Le primitive approvate, isolate e pronte per essere riutilizzate nel portfolio.</p>
    </header>

    <section class="showcase" aria-labelledby="checkbox-title">
      <div><h3 id="checkbox-title">Checkbox disegnato</h3><p>Selezione accessibile con spunta e barratura a penna.</p></div>
      <div class="checklist-paper">
        <HandDrawnCheckbox v-model="checks.mobile">Ho provato la pagina su un telefono vero</HandDrawnCheckbox>
        <HandDrawnCheckbox v-model="checks.keyboard">Il sito si usa anche solo con la tastiera</HandDrawnCheckbox>
      </div>
    </section>

    <section class="showcase showcase--row" aria-labelledby="link-title">
      <div><h3 id="link-title">Collegamento evidenziato</h3><p>Per i normali link presenti nel contenuto.</p></div>
      <HighlighterLink href="#palette-title">Leggi di più</HighlighterLink>
    </section>

    <section class="showcase showcase--row" aria-labelledby="focus-title">
      <div><h3 id="focus-title">CTA Messa a fuoco</h3><p>La CTA narrativa scelta per progetti e approfondimenti importanti.</p></div>
      <FocusLensLink href="#focus-title" subject="Second Brain" />
    </section>

    <section class="showcase showcase--row" aria-labelledby="destructive-title">
      <div><h3 id="destructive-title">Azione distruttiva</h3><p>Conferma sul posto e scelta sicura focalizzata per prima.</p></div>
      <DestructiveConfirmButton confirmed-message="Prova completata: nessun contenuto è stato cancellato." />
    </section>

    <section class="showcase showcase--row" aria-labelledby="menu-title">
      <div><h3 id="menu-title">Comando Indice</h3><p>Il bottone approvato per aprire il menu mobile.</p></div>
      <PencilMenuButton :expanded="menuOpen" @click="menuOpen = !menuOpen" />
    </section>

    <ButtonCandidateShowcase />
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import ButtonCandidateShowcase from './ButtonCandidateShowcase.vue'
import DestructiveConfirmButton from '@/components/primitives/DestructiveConfirmButton.vue'
import FocusLensLink from '@/components/primitives/FocusLensLink.vue'
import HandDrawnCheckbox from '@/components/primitives/HandDrawnCheckbox.vue'
import HighlighterLink from '@/components/primitives/HighlighterLink.vue'
import PencilMenuButton from '@/components/primitives/PencilMenuButton.vue'

const checks = reactive({ mobile: true, keyboard: false })
const menuOpen = ref(false)
</script>

<style scoped>
.component-lab { width: min(100%, var(--content-width)); margin: var(--space-8) auto 0; }
.component-lab__heading { display: grid; gap: var(--space-2); margin-bottom: var(--space-6); }
.component-lab__heading h2 { color: var(--ink-strong); font-family: var(--font-hand); font-size: clamp(2rem, 5vw, 3.4rem); line-height: 1.08; }
.component-lab__heading p { max-width: 68ch; color: var(--ink-soft); }
.showcase { display: grid; gap: var(--space-5); margin-top: var(--space-7); padding: var(--space-5); background: var(--paper); border: 0.0625rem solid var(--paper-edge); border-radius: var(--radius-medium); }
.showcase > div:first-child { display: grid; gap: var(--space-2); }
.showcase h3 { color: var(--ink-strong); font-family: var(--font-hand); font-size: clamp(1.6rem, 4vw, 2.45rem); line-height: 1.1; }
.showcase > div:first-child p { max-width: 58ch; color: var(--ink-soft); }
.checklist-paper { display: grid; padding: 0.45rem clamp(1rem, 4vw, 2.5rem); background-color: var(--paper); background-image: repeating-linear-gradient(to bottom, transparent 0 calc(var(--paper-line-height) - 0.0625rem), var(--line-blue) calc(var(--paper-line-height) - 0.0625rem) var(--paper-line-height)); border: 0.0625rem solid var(--paper-edge); border-radius: var(--radius-small); }
@media (min-width: 48rem) { .showcase--row { grid-template-columns: minmax(0, 1fr) auto; align-items: center; } }
</style>
