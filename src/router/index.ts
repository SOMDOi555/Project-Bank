import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/index.vue'),
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/pages/dashboard.vue'),
    },
    {
      path: '/sifter',
      name: 'Control Sifter',
      component: () => import('@/pages/sifter.vue'),
    },
    {
      path: '/analysis-result',
      name: 'AnalysisResult',
      component: () => import('@/pages/analysis-result.vue'),
    },
  ],
})

export default router
