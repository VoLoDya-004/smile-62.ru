import { apiClient } from '@/shared/api/axiosInstance'
import { API_URLS_CARDS } from '../constants/apiConstants'
import type { IFetchProductsApiParams } from '../types/mainTypes'

export const productsApi = {
  fetchProducts: async (params: IFetchProductsApiParams) => {
    const res = await apiClient.get(API_URLS_CARDS, {
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
        action8: params.action8
      }
    })

    return {
      data: res.data.items,
      total: res.data.total
    }
  }
}