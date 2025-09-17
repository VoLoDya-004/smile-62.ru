import { useContext, useState, useEffect, memo, type ChangeEvent, type KeyboardEvent } 
from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Context } from '../../../contexts/context'
import { useSelector } from 'react-redux'
import type { RootStore } from '../../../redux'


const Search = () => {
  const context = useContext(Context)
  if(!context) {
    throw new Error("Context must be used within a Provider")
  }
  const {setCurrentPage, setSearchQuery} = context

  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

  const navigate = useNavigate()
  const location = useLocation()

  const [searchTerm, setSearchTerm] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
  }

  const handleClearClick = () => {
    setSearchTerm('')
    setSearchQuery('')
  }

  const handleSearchClick = () => {
    setCurrentPage(1)
    setSearchQuery(searchTerm)
    document.getElementById("blackout")?.classList.remove("blackout")
    document.body.classList.remove("modal-open")
    if (searchTerm.length === 0) {
      document.getElementById("search__line_line")?.focus()
    }
    if(location.pathname !== "/") {
      navigate("/")
    }
    if (location.pathname === "/") {
      window.scrollTo({top: 0, behavior: "smooth"})
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick()
    }
  }

  useEffect(() => {
    const searchLine = document.getElementById("search__line_line")
    const blackoutElement = document.getElementById("blackout")

    const handleFocus = () => {
      if (blackoutElement) {
        blackoutElement.classList.add("blackout")
        document.body.classList.add('modal-open')
      }
    }

    const handleBlur = () => {
      if (blackoutElement) {
        blackoutElement.classList.remove("blackout")
        document.body.classList.remove('modal-open')
      }
    }

    if (searchLine) {
      searchLine.addEventListener("focus", handleFocus)
      searchLine.addEventListener("blur", handleBlur)
    }

    return () => {
      if (searchLine) {
        searchLine.removeEventListener("focus", handleFocus)
        searchLine.removeEventListener("blur", handleBlur)
      }
    }
  }, [searchTerm])


  return (
    <div className="search">
      <div className="search__line">
        <input
          id="search__line_line"
          type="search"
          placeholder="Искать здесь..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={isDarkTheme ? 'dark-theme' : ''}
        />
        {searchTerm && (
          <button
            id="search__line_clear"
            onClick={handleClearClick}
          >
            <span className="search__clear">
                &#x2715;
            </span>
          </button>
        )}
        <NavLink to="/">
          <button 
            id="search__line_button"
            onClick={handleSearchClick}>
            <img
              src="/images/icons/poisk.png"
              alt="поиск"
              style={{ width: '20px', pointerEvents: 'none' }}
            />
          </button>
        </NavLink>
      </div>
    </div>
  )
}

export default memo(Search)