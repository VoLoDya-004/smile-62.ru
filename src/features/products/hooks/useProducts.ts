import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import type { IFilters } from '../types/mainTypes'
import { useQuery } from '@tanstack/react-query'
import { productsApi } from '../api/productsApi'

export const useProducts = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortType, setSortType] = useState('default')
  const [selectedCategory, setSelectedCategory] = useState<number | null>(0)
  const [currentSort, setCurrentSort] = useState('По умолчанию')
  const [filters, setFilters] = useState<IFilters>({
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
  })

  useEffect(() => {
    const savedSearchQuery = sessionStorage.getItem('searchQuery')
    if (savedSearchQuery) {
      setSearchQuery(savedSearchQuery)
    }

    const savedFilters = sessionStorage.getItem('productFilters')
    if (savedFilters) {
      setFilters(JSON.parse(savedFilters))
    }
  }, [])

  useEffect(() => {
    const categoryId = Number(searchParams?.get('categoryProducts')) || 0
    setSelectedCategory(categoryId)

    const sortFromUrl = searchParams?.get('sortProducts') || 'default'
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
    if (typeof window !== 'undefined') {
      if (searchQuery) {
        sessionStorage.setItem('searchQuery', searchQuery)
      } else {
        sessionStorage.removeItem('searchQuery')
      }
    }
  }, [searchQuery])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('productFilters', JSON.stringify(filters))
    }
  }, [filters])

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

  const updateUrlParams = (params: Record<string, string | number | null | undefined>) => {
    const newParams = new URLSearchParams(searchParams?.toString() || '')

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '' && value !== 0) {
        newParams.set(key, String(value))
      } else {
        newParams.delete(key)
      }
    })

    router.push(`?${newParams.toString()}`, { scroll: false })

    const paramsString = newParams.toString()
    
    if (paramsString === '') {
      router.push(window.location.pathname, { scroll: false })
    } else {
      router.push(`?${paramsString}`, { scroll: false })
    }
  }

  return {
    cards: productQuery.data?.data || [],
    totalItems: productQuery.data?.total || 0,
    isLoading: productQuery.isPending,
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
    setSearchParams: updateUrlParams
  }
}