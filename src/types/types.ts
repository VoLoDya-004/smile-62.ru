export interface IProduct {
  id?: number
  nazvanie?: string
  price?: number
  price_sale?: number
  image?: string
  id_category?: number
  count?: number
  price_total?: number
  discount?: number
  id_product?: number
}

export interface IBasket {
  id: number
  nazvanie?: string
  image?: string
  count: number
  price_total: number
}

export interface IFav {
  id: number
  nazvanie: string
  image: string
  price_total: number
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

export interface ICartItem {
  id: number
  count: number
  price_total: number
}

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

export interface INotificationData {
  message: string
  type: "success" | "error"
}

export interface IRegisterData {
  name?: string
  email: string
  password: string
  confirmPassword?: string
}