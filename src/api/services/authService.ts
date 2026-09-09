import type { Login } from '@/models/auth'
import { apiClient } from '../client'

export default {
  login(data: Login) {
    return apiClient.post('/auth/login', data)
  },
}
