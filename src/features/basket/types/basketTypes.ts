export interface IBasket {
  id: number
  nazvanie?: string
  image?: string
  count?: number
  price_total?: number
  id_product: number
}

export interface IBasketTotal {
  count: number
  price_total: number
}