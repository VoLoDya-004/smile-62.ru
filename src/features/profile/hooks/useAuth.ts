import { setUser } from '@/shared/store/slices/UserSlice'
import { AuthService } from '../services/authService'
import type { IRegisterData } from '../types/profileTypes'
import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'

interface IRegisterParams {
  registerData: IRegisterData
  onNotification: (message: string, type: 'success' | 'error') => void
}

interface ILoginParams {
  email: string
  password: string
  onNotification: (message: string, type: 'success' | 'error') => void
  onLoginSuccess: (userData: { id_user: number; name: string }) => void
}

export const useAuth = () => {
  const dispatch = useDispatch()

  const authService = useMemo(() => new AuthService(), [])

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth')
    if (storedAuth) {
      const { isAuth, userName, userId } = JSON.parse(storedAuth)
      if (isAuth && userId !== null) {
        dispatch(setUser({ userId, userName, isAuth }))
      }
    }
  }, [dispatch])

  const handleRegister = async ({ registerData, onNotification }: IRegisterParams) => {
    try {
      const response = await authService.register(registerData)
      if (response.success) {
        onNotification(response.message, 'success')
      } else {
        onNotification(response.message, 'error')
      }
      return response.success || false
    } catch {
      onNotification('Ошибка при регистрации', 'error')
      return false
    }
  }

  const handleLogin = async ({ email, password, onNotification, onLoginSuccess }: ILoginParams) => {
    try {
      const response = await authService.login(email, password)
      if (response.success) {
        onLoginSuccess({ id_user: response.id_user, name: response.name })
        onNotification('Вы успешно вошли', 'success')
      } else {
        onNotification(response.message, 'error')
      }
      return response.success || false
    } catch {
      onNotification('Ошибка входа', 'error')
      return false
    }
  }

  const handleLoginSuccess = (userData: { id_user: number; name: string }) => {
    dispatch(setUser({ userId: userData.id_user, userName: userData.name, isAuth: true }))
    localStorage.setItem('auth', JSON.stringify({
      isAuth: true,
      userName: userData.name,
      userId: userData.id_user,
    }))
  }

  return {
    handleRegister,
    handleLogin,
    handleLoginSuccess
  }
}