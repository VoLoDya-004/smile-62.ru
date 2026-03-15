import { AUTH_API_URLS } from '../constants/apiConstants'
import { apiClient } from '@/shared/api/axiosInstance'

export const transactionApi = {
  getTransactions: async (page: number = 1, limit: number = 30) => {
    const res = await apiClient.get(AUTH_API_URLS, {
      params: {
        Operation: 'getTransactions',
        page,
        limit
      }  
    })
    return res.data
  }
}