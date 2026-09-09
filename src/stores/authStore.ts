import type { User } from '@/models/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const currentUser = ref<User | null>(null)
    const token = ref<string | null>(null)

    const isAuthenticated = () => !!token.value

    const setCurrentUser = (user: User, newToken: string) => {
      currentUser.value = user
      token.value = newToken
    }

    const logout = () => {
      ;((currentUser.value = null), (token.value = null))
    }

    return {
      currentUser,
      token,
      isAuthenticated,
      setCurrentUser,
      logout,
    }
  },
  {
    persist: true,
  },
)
