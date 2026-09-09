import { type CustomJwtPayload, Role, type Login, type User } from '@/models/auth'
import { useAuthStore } from '@/stores/authStore'
import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import authService from '../services/authService'
import { jwtDecode } from 'jwt-decode'

export const useLogin = () => {
  const authStore = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutationFn: async (login: Login) => {
      const { data } = await authService.login(login)
      return data
    },

    onSuccess: (data) => {
      const decoded = jwtDecode<CustomJwtPayload>(data.token)
      console.log(decoded)
      const user: User = {
        email: decoded.sub ?? '',
        role: decoded.role ?? Role.User,
      }

      authStore.setCurrentUser(user, data)
      router.push('/')
    },
  })
}
