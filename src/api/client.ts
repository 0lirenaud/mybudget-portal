import { useAuthStore } from '@/stores/authStore'
import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { useRouter } from 'vue-router'

export const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const authStore = useAuthStore()

  if (authStore.isAuthenticated()) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => {
    const authHeader = response.headers['Authorization']

    if (authHeader && authHeader.startsWith('Bearer')) {
      const newToken = authHeader.substring(7)
      const authStore = useAuthStore()

      authStore.token = newToken
    }

    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      const router = useRouter()

      authStore.logout()
      router.push('/login')
    }

    return Promise.reject(error)
  },
)
