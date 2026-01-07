import type { ICardsRender } from '@/features/layout/products/types/mainTypes'
import { useMemo, useState } from 'react'
import { RecommendationsService } from '@/shared/services/recommendationsService'

export const useRecommendations = () => {
  const recommendationsService = useMemo(() => new RecommendationsService(), [])

  const [cards, setCards] = useState<ICardsRender[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function loadCards() {
    setIsLoading(true)

    try {
      const res = await recommendationsService.loadRecomendations()
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