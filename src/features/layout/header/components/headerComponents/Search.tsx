import { useState, useEffect, useRef } from 'react'
import type { ChangeEvent, KeyboardEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUIContextModals } from '@/shared/contexts/UIContext'
import { useProductsContext } from '@/features/layout/products/contexts/ProductsContext'
import styles from '../Header.module.scss'

const Search = () => {
  const { 
    search, 
    'search__line': searchLine,
    'search__clear': searchClear,
    'search__line-clear': searchLineClear,
    'search__line-button': searchLineButton,
    'search__line-button-img': searchLineButtonImg,
    'search__line-input': searchLineInput
  } = styles

  const { setCurrentPage, setSearchQuery, searchQuery } = useProductsContext()
  const { setIsSearchProductOpen } = useUIContextModals()

  const navigate = useNavigate()
  const location = useLocation()
  const searchInputRef = useRef<HTMLInputElement>(null)

  const [searchTerm, setSearchTerm] = useState(searchQuery)

  useEffect(() => {
    setSearchTerm(searchQuery)
  }, [searchQuery])

  const navigateToHome = () => {
    if (location.pathname !== '/') {
      navigate('/')
    }
  }

  const scrollToTop = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleClearClick = () => {
    setSearchTerm('')
    setSearchQuery('')
    navigateToHome()
    scrollToTop()
  }

  const handleSearchClick = () => {
    setCurrentPage(1)
    setSearchQuery(searchTerm)
    setIsSearchProductOpen(false)
    
    if (searchTerm.length === 0) {
      searchInputRef.current?.focus()
    }
    
    navigateToHome()
    scrollToTop()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick()
      searchInputRef.current?.blur()
    }
  }

  const handleFocus = () => setIsSearchProductOpen(true)
  const handleBlur = () => setIsSearchProductOpen(false)

  return (
    <div className={search}>
      <div className={searchLine}>
        <input
          ref={searchInputRef}
          type='search'
          name='search'
          placeholder='Искать здесь...'
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={searchLineInput}
          aria-label='Строка поиска'
          spellCheck='false'
        />
        {searchTerm && (
          <button
            type='button'
            className={searchLineClear}
            onClick={handleClearClick}
            aria-label='Очистить поле поиска'
          >
            <span className={searchClear}>✕</span>
          </button>
        )}
        <button 
          type='button'
          className={searchLineButton}
          onClick={handleSearchClick}
          aria-label='Поиск'
        >
          <img
            className={searchLineButtonImg}
            src='/images/icons/search.png'
            alt='Поиск'
          />
        </button>
      </div>
    </div>
  )
}

export default Search