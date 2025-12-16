import type { RootStore } from '@/redux'
import { RecommendationsService } from '@/services/recommendationsService'
import type { ICardsRender } from '@/types/types'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

export const useRecommendations = () => {
  const recommendationsService = useMemo(() => new RecommendationsService(), [])

  const userId = useSelector((state: RootStore) => state.user.userId)

  const [cards, setCards] = useState<ICardsRender[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function loadCards() {
    setIsLoading(true)

    try {
      const res = await recommendationsService.loadRecomendations(userId)
      setCards(res.data)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    cards,
    isLoading,
    loadCards,
    setCards,
  }
}