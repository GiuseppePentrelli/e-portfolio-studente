<template>
  <div class="min-h-screen">

    <AppIntro v-if="showIntro" @done="showIntro = false" />

    <!-- Skip link: invisibile finché non riceve focus da tastiera -->
    <a href="#main-content" class="skip-link">
      Salta al contenuto principale
    </a>

    <AppNavbar />

    <main id="main-content" tabindex="-1" class="pt-14">
      <RouterView />
    </main>

    <AppFooter />

  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppIntro from '@/components/AppIntro.vue'

const showIntro = ref(!sessionStorage.getItem('gp-intro-seen'))

if (showIntro.value) sessionStorage.setItem('gp-intro-seen', '1')
</script>
