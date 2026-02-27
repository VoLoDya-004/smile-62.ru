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
  tracking_number: number
  items: IOrderItem[]
}

export interface IOrdersPage {
  success: boolean
  orders: IOrder[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface IOrdersInfiniteData {
  pages: IOrdersPage[]
  pageParams: number[]
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

export interface IUser {
  id_user: number 
  name: string
  email: string
  is_admin: number          
  orders_count: number 
  balance: string 
}

export interface IUsersPage {
  success: boolean
  users: IUser[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface IUsersInfiniteData {
  pages: IUsersPage[]
  pageParams: number[]
}

export type TAdminSelect = 'all' | 'admin' | 'not_admin'

export interface IGetAllOrdersParams {
  Operation: 'getAllOrders'
  idUser: number | null
  page: number
  limit: number
  search?: string
  sortDate?: 'asc' | 'desc'
  deliveryTypes?: string
  statuses?: string
}




