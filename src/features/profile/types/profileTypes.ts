export interface IRegisterData {
  name: string
  email: string
  password: string
}

export interface ILoginData {
  email: string
  password: string
}

export type TWalletData = { balance: number }

export interface ITransaction {
  id: number
  amount: number
  type: 'deposit' | 'payment'
  description: string
  created_at: string
}

export interface ITransactionsResponse {
  success: boolean
  transactions: ITransaction[]
  total: number
  page: number
  limit: number
  hasMore: boolean
  message?: string
}