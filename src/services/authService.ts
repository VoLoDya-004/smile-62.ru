import { authApi } from '@/api/authApi'
import type { IRegisterData } from '@/types/types'

export class AuthService {
  async register(registerData: IRegisterData) {
    const res = await authApi.register(registerData)
    return res
  }

  async login(email: string, password: string) {
    const res = await authApi.login({ email, password })
    return res
  }
}