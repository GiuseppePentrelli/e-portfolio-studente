<template>
  <a class="skip-link" href="#main-content">Salta al contenuto</a>
  <PortfolioNavbar :items="tabs" />
  <RouterView />
  <PortfolioFooter :links="pageSections" />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PortfolioFooter from '@/components/navigation/PortfolioFooter.vue'
import PortfolioNavbar from '@/components/navigation/PortfolioNavbar.vue'

const route = useRoute()

const pageSections = computed(() => route.meta.sections ?? [])
const tabs = computed(() => pageSections.value.filter(section => section.tabColor))
</script>
