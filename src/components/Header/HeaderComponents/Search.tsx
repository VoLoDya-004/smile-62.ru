import { useContext, useState, useEffect, memo, type ChangeEvent, type KeyboardEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Context } from '../../../contexts/context'
import { useSelector } from 'react-redux'
import type { RootStore } from '../../../redux'


const Search = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('Context must be used within a Provider')
  }
  const {setCurrentPage, setSearchQuery, searchQuery} = context

  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

  const navigate = useNavigate()
  const location = useLocation()

  const [searchTerm, setSearchTerm] = useState(searchQuery)

  useEffect(() => {
    setSearchTerm(searchQuery)
  }, [searchQuery])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
  }

  const handleClearClick = () => {
    setSearchTerm('')
    setSearchQuery('')
    if (location.pathname !== '/') {
      navigate('/')
    }
    if (location.pathname === '/') {
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
  }

  const handleSearchClick = () => {
    const searchLine = document.querySelector('[data-js-search-line-input]') as HTMLInputElement

    setCurrentPage(1)
    setSearchQuery(searchTerm)
    document.getElementById('blackout')?.classList.remove('blackout')
    document.body.classList.remove('modal-open')
    if (searchTerm.length === 0) {
      searchLine?.focus()
    }
    if (location.pathname !== '/') {
      navigate('/')
    }
    if (location.pathname === '/') {
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const searchLine = document.querySelector('[data-js-search-line-input]') as HTMLInputElement

    if (e.key === 'Enter') {
      handleSearchClick()
      if (searchLine) {
        searchLine.blur()
      }
    }
  }

  useEffect(() => {
    const searchLine = document.querySelector('[data-js-search-line-input]')
    const blackoutElement = document.getElementById('blackout')

    const handleFocus = () => {
      if (blackoutElement) {
        blackoutElement.classList.add('blackout')
        document.body.classList.add('modal-open')
      }
    }

    const handleBlur = () => {
      if (blackoutElement) {
        blackoutElement.classList.remove('blackout')
        document.body.classList.remove('modal-open')
      }
    }

    if (searchLine) {
      searchLine.addEventListener('focus', handleFocus)
      searchLine.addEventListener('blur', handleBlur)
    }

    return () => {
      if (searchLine) {
        searchLine.removeEventListener('focus', handleFocus)
        searchLine.removeEventListener('blur', handleBlur)
      }
    }
  }, [searchTerm])


  return (
    <div className='search'>
      <div className='search__line'>
        <input
          type='search'
          placeholder='Искать здесь...'
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={`search__line-input ${isDarkTheme ? 'dark-theme' : ''}`}
          data-js-search-line-input
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
            <span className='search__clear'>
                &#x2715;
            </span>
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

export default memo(Search)