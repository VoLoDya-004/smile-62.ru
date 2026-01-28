export interface IFilters {
  minPrice: number | null
  maxPrice: number | null
  actions: {
    action1: boolean
    action2: boolean
    action3: boolean
    action4: boolean
    action5: boolean
    action6: boolean
    action7: boolean
    action8: boolean
  }
}

export interface ICategory {
  id: number
  label: string
}

export interface ICardsRender {
  id: number
  nazvanie: string
  price: number
  price_sale: number
  image: string
  price_total?: number
  discount?: number
}

export interface IFetchProductsApiParams {
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