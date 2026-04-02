import axios from 'axios'

const isServer = typeof window === 'undefined'
const baseURL = isServer ? 'http://php:80' : '/api'

export const apiClient = axios.create({
  baseURL,
  withCredentials: true, 
})