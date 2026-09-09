import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import TransactionView from './components/views/TransactionView.vue'
import LoginView from './components/views/LoginView.vue'
import { useAuthStore } from './stores/authStore.ts'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/transactions',
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { hideAside: true, background: 'soft-background' },
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: TransactionView,
    meta: { requiresAuth: true },
  },
]

declare module 'vue-router' {
  interface RouteMeta {
    hideAside?: boolean
    background?: string
  }
}

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated()) {
    return { name: 'login' }
  }

  if (to.name === 'login' && authStore.isAuthenticated()) {
    return { name: 'home' }
  }
})
