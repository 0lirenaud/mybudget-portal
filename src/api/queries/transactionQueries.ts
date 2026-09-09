import { useQuery } from '@tanstack/vue-query'
import transactionService from '../services/transactionService'

export const getTransactions = (categoryId?: string) =>
  useQuery({
    queryKey: ['transactions', categoryId],
    queryFn: () => transactionService.transactions(categoryId),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
