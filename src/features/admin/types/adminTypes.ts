export interface IOrderItem {
  id: number
  quantity: number
  price_at_moment: string
  product_name: string
  product_image: string
}

export interface IOrder {
  id: number
  created_at: string
  total_amount: string
  delivery_type: string
  delivery_cost: string
  delivery_address: string
  customer_notes: string
  status: string           
  user_name: string
  user_email: string
  items: IOrderItem[]
}

export interface IOrdersResponse {
  success: boolean
  orders: IOrder[]
}

export interface IUser {
  id_user: number
  name: string
  email: string
  is_admin: number          
  orders_count: number 
  balance: string 
}

export interface IStats {
  totalOrders: number
  totalRevenue: number
  recentOrders: number
  usersCount: number
  statusStats: {
    accepted: string
    collected: string
    completed: string
    cancelled: string
  }
}