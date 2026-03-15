import { COMMON_API_URLS } from '../constants/apiConstants'
import { apiClient } from '@/shared/api/axiosInstance'

export const recommendationsApi = {
  getRecommendations: async () => {
    const res = await apiClient.get(COMMON_API_URLS.RECOMMENDATIONS, {
      params: {
        Operation: 'showRecommendations',
      }
    })
    return res.data
  }
}