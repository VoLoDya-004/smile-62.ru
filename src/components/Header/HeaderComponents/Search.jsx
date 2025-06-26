import { useState } from 'react'
import React from 'react'


export default React.memo(function Search() {
  const [searchTerm, setSearchTerm] = useState('')
  const theme = localStorage.getItem('theme')

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleClearClick = () => {
    setSearchTerm('')
  }


  return (
    <div className="search">
      <div className="search__line">
        <input
          id="search__line_line"
          type="search"
          placeholder="Искать здесь..."
          value={searchTerm}
          onChange={handleInputChange}
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
        <button id="search__line_button">
          <img
            src="/src/assets/images/icons/poisk.png"
            alt="поиск"
            style={{ width: '20px', pointerEvents: 'none' }}
          />
        </button>
      </div>
    </div>
  )
})
