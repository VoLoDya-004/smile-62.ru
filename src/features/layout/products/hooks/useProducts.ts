import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { IFilters } from '../types/mainTypes'
import { useQuery } from '@tanstack/react-query'
import { productsApi } from '../api/productsApi'

export const useProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState(() => sessionStorage.getItem('searchQuery') || '')
  const [sortType, setSortType] = useState(() => searchParams.get('sort') || 'default')

  const [selectedCategory, setSelectedCategory] = useState<number | null>(() => 
    Number(searchParams.get('category')) || 0
  )

  const [currentSort, setCurrentSort] = useState(() => {
    const sortFromUrl = searchParams.get('sort')

    switch (sortFromUrl) {
      case 'cheap': return 'Дешевле'
      case 'expensive': return 'Дороже'
      case 'discount': return 'По скидке (%)'
      case 'default': return 'По умолчанию'
      default: return 'По умолчанию'
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

  const productQuery = useQuery({
    queryKey: [
      'products',
      currentPage,
      searchQuery,
      selectedCategory,
      sortType,
      filters.minPrice,
      filters.maxPrice,
      filters.actions.action1,
      filters.actions.action2,
      filters.actions.action3,
      filters.actions.action4,
      filters.actions.action5,
      filters.actions.action6,
      filters.actions.action7,
      filters.actions.action8,
    ],
    queryFn: () => {
      const apiParams = {
        page: currentPage,
        search: searchQuery || undefined,
        idCategory: selectedCategory === 0 ? null : selectedCategory,
        sortType: sortType !== 'default' ? sortType : undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        action1: filters.actions.action1 ? '1' : '0',
        action2: filters.actions.action2 ? '1' : '0',
        action3: filters.actions.action3 ? '1' : '0',
        action4: filters.actions.action4 ? '1' : '0',
        action5: filters.actions.action5 ? '1' : '0',
        action6: filters.actions.action6 ? '1' : '0',
        action7: filters.actions.action7 ? '1' : '0',
        action8: filters.actions.action8 ? '1' : '0',
      }
      return productsApi.fetchProducts(apiParams)
    }
  })

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

  const resetToFirstPage = () => {
    setCurrentPage(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleFiltersChange = (newFilters: IFilters) => {
    setFilters(newFilters)
    resetToFirstPage()
  }

  const handleSetSelectedCategory = (category: number | null) => {
    setSelectedCategory(category)
    resetToFirstPage()
  } 

  const handleSetSearchQuery = (query: string) => {
    setSearchQuery(query)
    resetToFirstPage()
  }

  const handleSetSortType = (sort: string) => {
    setSortType(sort)
    resetToFirstPage()
  }

  return {
    cards: productQuery.data?.data || [],
    totalItems: productQuery.data?.total || 0,
    isLoading: productQuery.isLoading,
    searchQuery,
    currentPage,
    currentSort,
    filters,
    selectedCategory,
    sortType,
    fetchCards: productQuery.refetch,
    setSelectedCategory: handleSetSelectedCategory,
    setSearchQuery: handleSetSearchQuery,
    setSortType: handleSetSortType,
    setCurrentPage,
    handleFiltersChange,
    setCurrentSort,
    setSearchParams
  }
}