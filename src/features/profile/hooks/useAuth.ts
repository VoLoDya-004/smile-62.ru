import { logoutUser, setUser } from '@/shared/store/slices/userSlice'
import type { ILoginData, IRegisterData } from '../types/profileTypes'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '../api/authApi'
import { useUIContextNotification } from '@/shared/providers/UIProvider'

export const useAuth = () => {
  const dispatch = useDispatch()

  const { showNotification } = useUIContextNotification()

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth')
    if (storedAuth) {
      const { isAuth, userName, userId, isAdmin } = JSON.parse(storedAuth)
      if (isAuth && userId !== null) {
        dispatch(setUser({ userId, userName, isAuth, isAdmin }))
      }
    }
  }, [dispatch])

  const registerMutation = useMutation({
    mutationFn: (registerData: IRegisterData) => {
      return authApi.register(registerData)
    }
  })

  const loginMutation = useMutation({
    mutationFn: (loginData: ILoginData) => {
      return authApi.login(loginData)
    },
    onSuccess: (data) => {
      if (data.success) {
        dispatch(setUser({
          userId: data.id_user,
          userName: data.name,
          isAuth: true,
          isAdmin: data.is_admin == 1
        }))
        localStorage.setItem('auth', JSON.stringify({
          isAuth: true,
          userName: data.name,
          userId: data.id_user,
          isAdmin: data.is_admin == 1
        }))
      }
    }
  })

  const handleRegister = async ({ registerData }: { registerData: IRegisterData }) => {
    try {
      const response = await registerMutation.mutateAsync(registerData)
      showNotification(response.message, response.success ? 'success' : 'error')
      return response.success
    } catch {
      showNotification('Ошибка при регистрации', 'error')
      return false
    }
  }

  const handleLogin = async ({ email, password }: ILoginData) => {
    try {
      const response = await loginMutation.mutateAsync({ email, password })
      showNotification(response.message, response.success ? 'success' : 'error')
      return response.success
    } catch {
      showNotification('Ошибка входа', 'error')
      return false
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    localStorage.removeItem('auth')
    showNotification('Вы вышли из аккаунта', 'success')
  }

  return {
    handleRegister,
    handleLogin,
    handleLogout
  }
}