import { AUTH_API_URLS } from '../constants/apiConstants'
import type { ILoginData, IRegisterData } from '../types/profileTypes'
import axios from 'axios'

export const authApi = {
  register: async (registerData: IRegisterData) => {  
    const res = await axios.post(AUTH_API_URLS, { ...registerData, Operation: 'register' }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return {
      success: res.data.success,
      message: res.data.message
    }
  },

  login: async (loginData: ILoginData) => {
    const res = await axios.post(AUTH_API_URLS, { ...loginData, Operation: 'login' }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return {
      success: res.data.success,
      id_user: res.data.id_user,
      name: res.data.name,
      message: res.data.message,
    }
  },
}