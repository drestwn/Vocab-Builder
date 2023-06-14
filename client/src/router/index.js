import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Progress from '../views/Progress.vue'
import edit from '../views/edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/progress',
      name: 'progress',
      component: Progress
    },
    {
      path: '/edit',
      name: 'edit',
      component: edit
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})
// router.beforeEach(async (to, from, next) => {
//   const isAuthenticated = localStorage.getItem('access_token')
//   if (to.name === 'home' && isAuthenticated) {
//     this.$pinia.state.auth.checkStatus()
//     next({ name: 'home' })
//   } else {
//     next()
//   }
// })


export default router
