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