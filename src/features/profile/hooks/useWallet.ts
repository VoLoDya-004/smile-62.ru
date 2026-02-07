import { useUIContextNotification } from '@/shared/providers/UIProvider'
import type { RootStore } from '@/shared/store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { walletApi } from '../api/walletApi'
import type { TWalletData } from '../types/profileTypes'

export const  useWallet = () => {
  const { showNotification } = useUIContextNotification()
  const userId = useSelector((state: RootStore) => state.user.userId)
  const queryClient = useQueryClient()

  const balanceQuery = useQuery({
    queryKey: ['wallet', userId],
    queryFn: () => walletApi.getBalance(userId),
    enabled: !!userId
  })

  const topUpMutation = useMutation({
    mutationFn: (amount: number) => {
      if (!userId) throw new Error('No user ID')
      return walletApi.topUpBalance(userId, amount)
    },
    onSuccess: (data) => {
      const oldData = queryClient.getQueryData<TWalletData>(['wallet', userId])
      const oldBalance = oldData?.balance || 0
      queryClient.setQueryData(['wallet', userId], (old: TWalletData) => ({
        ...old,
        balance: data.newBalance
      }))
      showNotification(`Баланс пополнен на ${data.newBalance - (oldBalance || 0)} ₽`, 'success')
    },
    onError: () => {
      showNotification('Ошибка пополнения', 'error')
    }
  })

  const topUpBalance = (amount: number) => {
    if (amount <= 0) {
      showNotification('Сумма должна быть больше 0', 'error')
      return
    }
    
    if (amount > 1000000) {
      showNotification('Максимальная сумма пополнения: 1 000 000 ₽', 'error')
      return
    }
    
    topUpMutation.mutate(amount)
  }

  return {
    balance: balanceQuery.data?.balance || 0,
    topUpBalance,
    isLoadingBalance: balanceQuery.isPending || topUpMutation.isPending
  }
}