import type { Category, Transaction } from '@/models/transaction'
import { apiClient } from '../client'

export const TRANSACTION_API_URI = '/api/transactions'

export default {
  async transactions(categoryId?: string): Promise<Transaction[]> {
    const response = await apiClient.get(TRANSACTION_API_URI, {
      params: {
        categoryId: categoryId,
      },
    })

    return response.data
  },
}
