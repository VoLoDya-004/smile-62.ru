import { productsApi } from '@/api/productsApi'
import type { IFilters } from '@/types/types'

interface IFetchProductsServiceParams {
  page: number
  searchQuery: string
  selectedCategory: number | null
  sortType: string
  filters: IFilters
}

export class ProductsService {
  async loadProducts(params: IFetchProductsServiceParams) {
    const {
      page,
      searchQuery,
      selectedCategory,
      sortType,
      filters
    } = params

    const apiParams = {
      page,
      search: searchQuery || undefined,
      idCategory: selectedCategory === 0 ? null : selectedCategory,
      sortType: sortType !== 'default' ? sortType : undefined,
      minPrice: filters.minPrice || undefined,
      maxPrice: filters.maxPrice || undefined,
      action1: filters.actions.action1 ? '1' : '0',
      action2: filters.actions.action2 ? '1' : '0',
      action3: filters.actions.action3 ? '1' : '0',
      action4: filters.actions.action4 ? '1' : '0',
      action5: filters.actions.action5 ? '1' : '0',
      action6: filters.actions.action6 ? '1' : '0',
      action7: filters.actions.action7 ? '1' : '0',
      action8: filters.actions.action8 ? '1' : '0',
    }

    const res = await productsApi.fetchProducts(apiParams)

    if (res.success) {
      return {
        success: true,
        cards: res.data,
        total: res.total
      }
    } else {
      return {
        success: false,
        cards: [],
        total: 0
      }
    }
  }
}