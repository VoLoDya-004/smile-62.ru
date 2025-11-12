import { createContext, type ReactNode, type SetStateAction, type Dispatch } from 'react'
import { type ActionCreatorWithPayload } from '@reduxjs/toolkit'
import type { ICartItem, IProduct, ICardsRender } from '../types/types'


interface IFiltersActions {
  action1: boolean
  action2: boolean
  action3: boolean
  action4: boolean
  action5: boolean
  action6: boolean
  action7: boolean
  action8: boolean
}

interface IFilters {
  minPrice: number | null
  maxPrice: number | null  
  actions: IFiltersActions
}

interface IAppContextType {
  productsFavourites: ReactNode[]
  setSelectedCategory: (id: number) => void
  setCurrentPage: (page: number) => void
  categories: {id: number, label: string}[]
  setSearchQuery: (query: string) => void
  handleClearFavBtn: () => void
  loadingDeleteAllFav: boolean
  handleClearBasketBtn: () => void
  loadingDeleteAllBasket: boolean
  cartFavourites: IProduct[]
  searchQuery: string
  isLoading: boolean
  cards: ICardsRender[]
  currentPage: number
  setSortType: (sortType: string) => void
  handleFiltersChange: (filters: IFilters) => void
  currentSort: string
  setCurrentSort: (sortType: string) => void
  fetchCards: () => Promise<void>
  totalItems: number
  filters: IFilters
  deleteProductFavourites: (id: number) => void
  addInBasketProductFavourites: (id: number) => void
  cartBasket: IProduct[]
  selectedCategory: number | null
  setCards: Dispatch<SetStateAction<ICardsRender[]>>
  sortType: string
  setCartBasket: ActionCreatorWithPayload<ICartItem[]>
  setSearchParams: (params: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams)) => void
  updateBasketData: () => Promise<void>
  updateFavouritesData: () => Promise<void>
  setLoadingBasket: (loading: boolean) => void
  setLoadingFavourites: (loading: boolean) => void
}

export const Context = createContext<IAppContextType | undefined>(undefined)
