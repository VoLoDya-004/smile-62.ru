import { recommendationsApi } from "../api/recommendationsApi"

export class RecommendationsService {
  async loadRecomendations() {
    const res = await recommendationsApi.getRecommendations()

    return {
      success: res.success,
      data: res.data || []
    }
  }
}