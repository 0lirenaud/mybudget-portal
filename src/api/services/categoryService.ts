import { apiClient } from '../client'
import { TRANSACTION_API_URI } from './transactionService'

export default {
  async categories() {
    const response = await apiClient.get(TRANSACTION_API_URI + '/categories')
    return response.data
  },
}
