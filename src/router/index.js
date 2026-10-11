import { createRouter, createWebHistory } from 'vue-router'
import { sections } from '@/sections'
import { styleLabSections } from '@/style-lab/sections'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Portfolio2026',
        sections: sections.map(({ id, label, tabColor }) => ({ id, label, tabColor })),
      },
    },
    {
      path: '/style-lab',
      name: 'style-lab',
      component: () => import('@/style-lab/StyleLabView.vue'),
      meta: {
        title: 'Style Lab · Portfolio2026',
        sections: styleLabSections,
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash }

    const queryChanged = JSON.stringify(to.query) !== JSON.stringify(from.query)
    return to.path === from.path && queryChanged ? false : { top: 0 }
  },
})

router.afterEach(to => {
  if (to.meta.title) document.title = to.meta.title
})

export default router
