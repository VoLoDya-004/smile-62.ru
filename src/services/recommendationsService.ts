import { recommendationsApi } from '@/api/recommendationsApi'

export class RecommendationsService {
  async loadRecomendations(userId: number | null) {
    const res = await recommendationsApi.getRecommendations(userId)

    return {
      success: res.success,
      data: res.data || []
    }
  }
}