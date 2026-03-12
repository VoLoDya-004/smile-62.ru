import axios from 'axios'
import { COMMON_API_URLS } from '../constants/apiConstants'

export const recommendationsApi = {
  getRecommendations: async () => {
    const res = await axios.get(COMMON_API_URLS.RECOMMENDATIONS, {
      params: {
        Operation: 'showRecommendations',
      }
    })
    return res.data
  }
}