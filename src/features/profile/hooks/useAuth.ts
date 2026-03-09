import { logoutUser, setUser } from '@/shared/store/slices/userSlice'
import type { ILoginData, IRegisterData } from '../types/profileTypes'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '../api/authApi'
import { useUIContextNotification } from '@/shared/providers/UIProvider'
import type { RootStore } from '@/shared/store'

export const useAuth = () => {
  const dispatch = useDispatch()
  const userId = useSelector((state: RootStore) => state.user.userId)
  const isAdmin = useSelector((state: RootStore) => state.user.isAdmin)

  const { showNotification } = useUIContextNotification()

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth')
    if (storedAuth) {
      const { isAuth, userName, userEmail, userId, isAdmin } = JSON.parse(storedAuth)
      if (isAuth && userId !== null) {
        dispatch(setUser({ userId, userName, userEmail, isAuth, isAdmin }))
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
          userEmail: data.email,
          isAuth: true,
          isAdmin: data.is_admin == 1
        }))
        localStorage.setItem('auth', JSON.stringify({
          isAuth: true,
          userName: data.name,
          userEmail: data.email,
          userId: data.id_user,
          isAdmin: data.is_admin == 1
        }))
      }
    }
  })

  const updateProfileMutation = useMutation({
    mutationFn: (data: { name: string, email: string, password: string }) => 
      authApi.updateProfile(data),
    onSuccess: (data) => {
      if (data.success) {
        dispatch(setUser({
          userId: userId,
          userName: data.name,
          userEmail: data.email,
          isAuth: true,
          isAdmin: isAdmin
        }))
        const auth = JSON.parse(localStorage.getItem('auth') || '{}')
        auth.userName = data.name
        auth.userEmail = data.email
        localStorage.setItem('auth', JSON.stringify(auth))
      }
    }
  })

  const deleteAccountMutation = useMutation({
    mutationFn: () => authApi.deleteAccount(),
    onSuccess: (data) => {
      if (data.success) {
        dispatch(logoutUser())
        localStorage.removeItem('auth')
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

  const handleUpdateProfile = async (data: { name: string, email: string, password: string }) => {
    try {
      const response = await updateProfileMutation.mutateAsync(data)
      showNotification('Аккаунт обновлен', 'success')
      return response.success
    } catch {
      showNotification('Ошибка обновления профиля', 'error')
      return false
    }
  }

  const handleDeleteAccount = async () => {
    try {
      dispatch(logoutUser())
      localStorage.removeItem('auth')
      await deleteAccountMutation.mutateAsync()
      showNotification('Аккаунт удален', 'success')
      return true
    } catch {
      showNotification('Ошибка удаления профиля', 'error')
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
    handleUpdateProfile,
    handleDeleteAccount,
    handleLogout
  }
}