import { useQuery } from '@tanstack/react-query'
import { recommendationsApi } from '@/shared/api/recommendationsApi'

export const useRecommendations = () => {
  const recommendationsQuery = useQuery({
    queryKey: ['recommendations'],
    queryFn: () => recommendationsApi.getRecommendations()
  })

  return {
    cards: recommendationsQuery.data || [],
    isLoading: recommendationsQuery.isPending
  }
}

