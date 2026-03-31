import { logoutUser, setUser } from '@/shared/store/slices/userSlice'
import type { ILoginData, IRegisterData } from '../types/profileTypes'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authApi } from '../api/authApi'
import { useUIContextNotification } from '@/shared/providers/UIProvider'
import type { RootStore } from '@/shared/store'
import { useEffect } from 'react'

export const useAuth = () => {
  const dispatch = useDispatch()
  const userId = useSelector((state: RootStore) => state.user.userId)
  const isAdmin = useSelector((state: RootStore) => state.user.isAdmin)
  const isAuth = useSelector((state: RootStore) => state.user.isAuth)

  const queryClient = useQueryClient()

  const { showNotification } = useUIContextNotification()

  const { data: meData, isLoading: isMeLoading } = useQuery({
    queryKey: ['getMe'],
    queryFn: () => authApi.getMe(),
    retry: false,
    enabled: !isAuth,
  })

  useEffect(() => {
    if (meData?.success && meData.user) {
      dispatch(setUser({
        userId: meData.user.id_user,
        userName: meData.user.name,
        userEmail: meData.user.email,
        isAuth: true,
        isAdmin: meData.user.is_admin == 1,
      }))
    } else if (meData && !meData.success) {
      dispatch(logoutUser())
    }
  }, [meData, dispatch])

  const registerMutation = useMutation({
    mutationFn: (registerData: IRegisterData) => authApi.register(registerData)
  })

  const loginMutation = useMutation({
    mutationFn: (loginData: ILoginData) => authApi.login(loginData),
    onSuccess: (data) => {
      if (data.success) {
        dispatch(setUser({
          userId: data.id_user,
          userName: data.name,
          userEmail: data.email,
          isAuth: true,
          isAdmin: data.is_admin == 1
        }))
        queryClient.setQueryData(['getMe'], {
          success: true,
          user: {
            id_user: data.id_user,
            name: data.name,
            email: data.email,
            is_admin: data.is_admin
          }
        })
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
      }
    }
  })

  const deleteAccountMutation = useMutation({
    mutationFn: () => authApi.deleteAccount(),
    onSuccess: (data) => {
      if (data.success) {
        dispatch(logoutUser())
        queryClient.setQueryData(['getMe'], null)
      }
    }
  })

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: async (data) => {
      if (data.success) {
        dispatch(logoutUser())
        queryClient.setQueryData(['getMe'], null)
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
      await deleteAccountMutation.mutateAsync()
      showNotification('Аккаунт удален', 'success')
      return true
    } catch {
      showNotification('Ошибка удаления профиля', 'error')
      return false
    }
  }

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
      showNotification('Вы вышли из аккаунта', 'success')
    } catch {
      showNotification('Ошибка при выходе', 'error');
    }
  }

  return {
    handleRegister,
    handleLogin,
    handleUpdateProfile,
    handleDeleteAccount,
    handleLogout,
    isMeLoading,
    isLoggingOut: logoutMutation.isPending,
    isDeletingAccount: deleteAccountMutation.isPending
  }
}