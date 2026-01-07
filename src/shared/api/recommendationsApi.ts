import { COMMON_API_URLS } from '@/shared/constants/apiConstants'
import axios from 'axios'

export const recommendationsApi = {
  getRecommendations: async () => {

    try {
      const res = await axios.get(COMMON_API_URLS.RECOMMENDATIONS, {
        params: {
          Operation: 'showRecommendations',
        }
      })
      return ({
        success: true,
        data: res.data
      })
    } catch {
      return ({
        success: false,
        data: []
      })
    }
  }
}