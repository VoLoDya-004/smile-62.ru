import type { RootStore } from '@/shared/store'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { transactionApi } from '../api/transactionApi'

export const useTransactions = (limit = 30) => {
  const userId = useSelector((state: RootStore) => state.user.userId)

  const transactionsQuery = useInfiniteQuery({
    queryKey: ['transactions', userId],
    queryFn: ({ pageParam = 1 }) => transactionApi.getTransactions(pageParam, limit),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.page + 1 : undefined
    },
    initialPageParam: 1,
    enabled: !!userId
  })

  const transactions = transactionsQuery.data?.pages.flatMap(page => page.transactions) || []

  return {
    transactions,
    isTransactionsLoading: transactionsQuery.isPending,
    isFetchingNextTransactions: transactionsQuery.isFetchingNextPage,
    hasNextTransactions: transactionsQuery.hasNextPage,
    fetchNextTransactions: transactionsQuery.fetchNextPage,
  }
}