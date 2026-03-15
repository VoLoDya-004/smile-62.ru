import { apiClient } from '@/shared/api/axiosInstance'
import { AUTH_API_URLS } from '../constants/apiConstants'
import type { ILoginData, IRegisterData } from '../types/profileTypes'

export const authApi = {
  register: async (registerData: IRegisterData) => {  
    const res = await apiClient.post(AUTH_API_URLS, { ...registerData, Operation: 'register' }, {
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
    const res = await apiClient.post(AUTH_API_URLS, { ...loginData, Operation: 'login' }, {
      headers: { 'Content-Type': 'application/json' }
    })
    return res.data
  },

  updateProfile: async (data: { name: string, email: string, password: string }) => {
    const res = await apiClient.patch(AUTH_API_URLS, { ...data, Operation: 'updateProfile' })
    return res.data
  },

  deleteAccount: async () => {
    const res = await apiClient.delete(AUTH_API_URLS, { data: { Operation: 'deleteAccount' } })
    return res.data
  },

  getMe: async () => {
    const res = await apiClient.get(AUTH_API_URLS, { params: { Operation: 'getMe' } })
    return res.data
  },

  logout: async () => {
    const res = await apiClient.delete(AUTH_API_URLS, { data: { Operation: 'logout' } })
    return res.data
  }
}