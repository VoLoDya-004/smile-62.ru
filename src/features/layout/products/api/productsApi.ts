import { API_URLS_CARDS } from '../constants/apiConstants'
import axios from 'axios'

interface IFetchProductsApiParams {
  page: number
  search?: string
  idCategory?: number | null
  sortType?: string
  minPrice?: number | null
  maxPrice?: number | null
  action1?: string
  action2?: string
  action3?: string
  action4?: string
  action5?: string
  action6?: string
  action7?: string
  action8?: string
}

export const productsApi = {
  fetchProducts: async (params: IFetchProductsApiParams) => {
    try {
      const res = await axios.get(API_URLS_CARDS, {
        params: {
          page: params.page,
          search: params.search,
          idCategory: params.idCategory,
          sortType: params.sortType,
          minPrice: params.minPrice,
          maxPrice: params.maxPrice,
          action1: params.action1,
          action2: params.action2,
          action3: params.action3,
          action4: params.action4,
          action5: params.action5,
          action6: params.action6,
          action7: params.action7,
          action8: params.action8,
        }
      })

      return {
        success: true,
        data: res.data.items,
        total: res.data.total
      }
    } catch {
      return {
        success: true,
        data: [],
        total: 0
      }
    }
  }
}