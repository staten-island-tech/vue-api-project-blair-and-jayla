import { createRouter, createWebHistory } from 'vue-router'
import RadarChart from '@/components/RadarChart.vue';
import BarChart from '@/components/BarChart.vue';
import CardData from '@/components/cardData.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      component: BarChart
    },
    {
      path: '/p',
      name: 'p',
      component: RadarChart
    },
    {
      path: '/',
      name: 'home',
      component: CardData
    }
  ]
})

export default router
