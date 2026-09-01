import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import TransactionView from './components/views/TransactionView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/transactions',
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
