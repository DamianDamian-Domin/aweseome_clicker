import store from '../store/index.js'
import { createRouter, createWebHistory } from 'vue-router'
import LoginPanel from '../views/LoginPanel.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginPanel,
    meta: { requiresUnauth: true }
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('../views/MainMenu.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/game',
    name: 'game',
    component: () => import('../views/GameView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/YourProfile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: () => import('../views/LeaderBoard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('../views/UserShop.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && store.getters.isAuthnticated) {
    next()
  }
  else if (to.meta.requiresAuth && !store.getters.isAuthnticated) {
    next('/')
  }
  else if (to.meta.requiresUnauth && !store.getters.isAuthnticated) {
    next()
  }
  else if (to.meta.requiresUnauth && store.getters.isAuthnticated) {
    next('/menu')
  }
  else {
    next('menu')
  }

})

export default router
