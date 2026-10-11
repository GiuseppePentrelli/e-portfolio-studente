<template>
  <main id="main-content" class="home" tabindex="-1">
    <section
      v-for="section in sections"
      :id="section.id"
      :key="section.id"
      class="home__section"
      :style="section.scrollOffset && { scrollMarginTop: section.scrollOffset }"
      :aria-labelledby="`${section.id}-title`"
    >
      <component :is="section.component" :heading-id="`${section.id}-title`" />
    </section>
  </main>
</template>

<script setup>
import { sections } from '@/sections'
</script>

<style scoped>
/* Le sezioni sono a tutta larghezza e gestiscono da sole margini e sfondo. */
</style>
