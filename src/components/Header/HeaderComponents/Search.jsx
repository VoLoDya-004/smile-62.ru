import { useContext, useState, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import React from 'react'
import { Context } from '../../../JS/context'


export default React.memo(function Search({onSearchChange}) {
  const context = useContext(Context)
  const {setCurrentPage} = context

  const navigate = useNavigate()
  const location = useLocation()

  const [searchTerm, setSearchTerm] = useState('')

  const theme = localStorage.getItem('theme')

  const handleInputChange = (event) => {
    const value = event.target.value
    setSearchTerm(value)
  }

  const handleClearClick = () => {
    setSearchTerm('')
    onSearchChange('')
  }

  const handleSearchClick = () => {
    setCurrentPage(1)
    onSearchChange(searchTerm)
    document.getElementById("blackout").classList.remove("blackout")
    document.body.classList.remove("modal-open")
    if (searchTerm.length === 0) {
      document.getElementById("search__line_line").focus()
    }
    if(location.pathname !== "/") {
      navigate("/")
    }
    if (location.pathname === "/") {
      window.scrollTo({top: 0, behavior: "smooth"})
    }
  }

  const handleKeyDown = (e) => {
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
          className={theme === 'dark-theme' ? 'dark-theme' : ''}
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
})
