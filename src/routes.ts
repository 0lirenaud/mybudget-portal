import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import TransactionView from './components/views/TransactionView.vue'
import LoginView from './components/views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { hideAside: true },
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: TransactionView,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
