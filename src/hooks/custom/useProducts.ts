import { API_URLS } from "@/constants/urls"
import type { ICardsRender, IFilters } from "@/types/types"
import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useNotification } from "./useNotification"
import axios from "axios"

export const useProducts = () => {
  const { showNotification } = useNotification()

  const [searchParams, setSearchParams] = useSearchParams()

  const [currentPage, setCurrentPage] = useState(1)

  const [searchQuery, setSearchQuery] = useState(() => 
    sessionStorage.getItem('searchQuery') || ''
  )

  const [selectedCategory, setSelectedCategory] = useState<number | null>(() => 
    Number(searchParams.get('category')) || 0
  )

  const [cards, setCards] = useState<ICardsRender[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const [sortType, setSortType] = useState(() => 
    searchParams.get('sort') || 'default'
  )

  const [currentSort, setCurrentSort] = useState(() => {
    const sortFromUrl = searchParams.get('sort')

    switch (sortFromUrl) {
      case 'cheap':
        return 'Дешевле'
      case 'expensive':
        return 'Дороже'
      case 'discount':
        return 'По скидке (%)'
      case 'default': 
        return 'По умолчанию'
      default: 
        return 'По умолчанию'
    }
  })

  const [filters, setFilters] = useState<IFilters>(() => {
    const savedFilters = sessionStorage.getItem('productFilters')
    if (savedFilters) {
      return JSON.parse(savedFilters)
    }

    return {
      minPrice: null,
      maxPrice: null,
      actions: {
        action1: false,
        action2: false,
        action3: false,
        action4: false,
        action5: false,
        action6: false,
        action7: false,
        action8: false,
      }
    }
  })

  const [totalItems, setTotalItems] = useState(0)

  const handleFiltersChange = (newFilters: IFilters) => {
    setFilters(newFilters)
  }

  const fetchCards = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await axios.get(API_URLS.CARDS, {
        params: {
          page: currentPage,
          search: searchQuery,
          idCategory: selectedCategory === 0 ? null : selectedCategory,
          sortType: sortType,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          action1: filters.actions.action1 ? '1' : '0',
          action2: filters.actions.action2 ? '1' : '0',
          action3: filters.actions.action3 ? '1' : '0',
          action4: filters.actions.action4 ? '1' : '0',
          action5: filters.actions.action5 ? '1' : '0',
          action6: filters.actions.action6 ? '1' : '0',
          action7: filters.actions.action7 ? '1' : '0',
          action8: filters.actions.action8 ? '1' : '0',
        }
      })
      setCards(response.data.items)
      setTotalItems(response.data.total)
    }
    catch {
      showNotification('Ошибка', 'error')
    }
    finally {
      setIsLoading(false)
    }
  }, [currentPage, searchQuery, selectedCategory, sortType, filters])

  useEffect(() => {
    if (searchQuery) {
      sessionStorage.setItem('searchQuery', searchQuery)
    } else {
      sessionStorage.removeItem('searchQuery')
    }

    sessionStorage.setItem('productFilters', JSON.stringify(filters))
  }, [searchQuery, filters])

  useEffect(() => {
    const categoryId = Number(searchParams.get('category')) || 0
    setSelectedCategory(categoryId)
    const sortFromUrl = searchParams.get('sort') || 'default'
    setSortType(sortFromUrl)

    switch (sortFromUrl) {
      case 'cheap':
        setCurrentSort('Дешевле')
        break
      case 'expensive':
        setCurrentSort('Дороже')
        break
      case 'discount':
        setCurrentSort('По скидке (%)')
        break
      default: 
        setCurrentSort('По умолчанию')
    }
  }, [searchParams])

  useEffect(() => {
    fetchCards()
  }, [fetchCards])

  return {
    searchQuery,
    isLoading,
    cards,
    currentPage,
    currentSort,
    totalItems,
    filters,
    selectedCategory,
    sortType,
    setSelectedCategory,
    setCurrentPage,
    setSearchQuery,
    setSortType,
    handleFiltersChange,
    setCurrentSort,
    fetchCards,
    setCards,
    setSearchParams,
  }
}