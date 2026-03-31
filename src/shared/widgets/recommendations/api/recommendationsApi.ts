import { RECOMMENDATIONS_API_URLS } from '../constants/apiConstants'
import { apiClient } from '@/shared/api/axiosInstance'

export const recommendationsApi = {
  getRecommendations: async () => {
    const res = await apiClient.get(RECOMMENDATIONS_API_URLS, {
      params: {
        Operation: 'showRecommendations',
      }
    })
    return res.data
  }
}