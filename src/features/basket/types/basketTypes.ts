export interface IBasket {
  id: number
  nazvanie?: string
  image?: string
  count?: number
  price_total?: number
  id_product?: number 
}

export interface ICartItem {
  id: number
  count: number
  price_total: number
}