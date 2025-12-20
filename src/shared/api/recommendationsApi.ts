import { COMMON_API_URLS } from '@/shared/constants/apiConstants'
import axios from 'axios'

export const recommendationsApi = {
  getRecommendations: async (userId: number | null) => {
    const idUser = userId ?? 0

    try {
      const res = await axios.get(COMMON_API_URLS.SORT, {
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