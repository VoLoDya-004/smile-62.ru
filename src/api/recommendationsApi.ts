import { API_URLS } from '@/constants/urls'
import axios from 'axios'

export const recommendationsApi = {
  getRecommendations: async (userId: number | null) => {
    const idUser = userId ?? 0

    try {
      const res = await axios.get(API_URLS.SORT, {
        params: {
          Operation: 'showCards',
          idUser: idUser,
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