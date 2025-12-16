import { API_URLS } from '@/constants/urls'
import type { IRegisterData } from '@/types/types'
import axios from 'axios'

export const authApi = {
  register: (registerData: IRegisterData) => 
    axios
      .post(API_URLS.REGISTER, registerData, {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          Operation: 'register'
        }
      })
      .then((res) => ({
        success: res.data.success,
        message: res.data.message
      }))
      .catch(() => ({
        success: false,
        message: 'Ошибка'
      })),

  login: (loginData: { email: string; password: string }) =>
    axios
      .post(API_URLS.LOGIN, loginData, {
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
            Operation: 'login'
          }
      })
      .then((res) => ({
        success: res.data.success,
        id_user: res.data.id_user,
        name: res.data.name,
        message: res.data.message,
      }))
      .catch(() => ({
        success: false,
        id_user: null,
        name: '',
        message: 'Ошибка',
      })),
}
