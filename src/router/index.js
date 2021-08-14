import Vue from 'vue'
import VueRouter from 'vue-router'
import vInstructions from '@/pages/instructions.vue'
// import vSearch from '@/pages/search.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/instructions',
    component: vInstructions
  },
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('@/pages/search.vue') }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
