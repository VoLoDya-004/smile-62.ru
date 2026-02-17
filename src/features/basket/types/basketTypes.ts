export interface IBasket {
  id: number
  nazvanie?: string
  image?: string
  count?: number
  price_sale?: number
  id_product: number
}

export interface IBasketTotal {
  count: number
  price: number
}