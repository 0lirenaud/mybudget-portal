import { useQuery } from '@tanstack/vue-query'
import categoryService from '../services/categoryService'
import type { Category } from '@/models/transaction'

export const getCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.categories(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
