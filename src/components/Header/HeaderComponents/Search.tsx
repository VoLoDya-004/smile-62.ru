import { useState, useEffect, useRef } from 'react'
import type { ChangeEvent, KeyboardEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootStore } from '@/redux'
import { useProductsContext } from '@/contexts/ProductsContext'

const Search = () => {
  const { setCurrentPage, setSearchQuery, searchQuery } = useProductsContext()

  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)
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

  const handleModal = (action: 'open' | 'close') => {
    const blackout = document.getElementById('blackout')

    if (action === 'open') {
      blackout?.classList.add('blackout')
      document.body.classList.add('modal-open')
    } else {
      blackout?.classList.remove('blackout')
      document.body.classList.remove('modal-open')
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
    handleModal('close')
    
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

  useEffect(() => {
    const searchInput = searchInputRef.current
    
    if (!searchInput) return

    const handleFocus = () => handleModal('open')
    const handleBlur = () => handleModal('close')

    searchInput.addEventListener('focus', handleFocus)
    searchInput.addEventListener('blur', handleBlur)

    return () => {
      searchInput.removeEventListener('focus', handleFocus)
      searchInput.removeEventListener('blur', handleBlur)
    }
  }, [])

  return (
    <div className='search'>
      <div className='search__line'>
        <input
          ref={searchInputRef}
          type='search'
          name='search'
          placeholder='Искать здесь...'
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={`search__line-input ${isDarkTheme ? 'dark-theme' : ''}`}
          aria-label='Строка поиска'
          spellCheck='false'
        />
        {searchTerm && (
          <button
            type='button'
            className='search__line-clear'
            onClick={handleClearClick}
            aria-label='Очистить поле поиска'
          >
            <span className='search__clear'>✕</span>
          </button>
        )}
        <button 
          type='button'
          className='search__line-button'
          onClick={handleSearchClick}
          aria-label='Поиск'
        >
          <img
            className='search__line-button-img'
            src='/images/icons/search.png'
            alt='Поиск'
          />
        </button>
      </div>
    </div>
  )
}

export default Search