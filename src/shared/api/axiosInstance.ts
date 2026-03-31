import axios from 'axios'

const isServer = typeof window === 'undefined'
const baseURL = isServer ? 'http://localhost:3000/backend/PHP' : '/'

export const apiClient = axios.create({
  baseURL,
  withCredentials: true, 
})