export interface IRegisterData {
  name?: string
  email: string
  password: string
  confirmPassword?: string
}

export interface ILoginData {
  email: string
  password: string
}