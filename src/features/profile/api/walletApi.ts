import axios from 'axios'
import { API_URLS_WALLET } from '../constants/apiConstants'


export const walletApi = {
  getBalance: async (userId: number | null) => {
    const res = await axios.get(API_URLS_WALLET, {
      params: {
        Operation: 'getBalance',
        idUser: userId
      }
    })
    return res.data
  },

  topUpBalance: async (userId: number, amount: number) => {
    const res = await axios.post(API_URLS_WALLET, {
      Operation: 'topUpBalance',
      idUser: userId,
      amount: amount
    })
    return res.data
  }
}