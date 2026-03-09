import axios from 'axios'
import { AUTH_API_URLS } from '../constants/apiConstants'

export const transactionApi = {
  getTransactions: async (page: number = 1, limit: number = 30) => {
    const res = await axios.get(AUTH_API_URLS, {
      params: {
        Operation: 'getTransactions',
        page,
        limit
      }  
    })
    return res.data
  }
}