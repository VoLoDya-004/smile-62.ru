import { useProductsContext } from '../products/providers/ProductsProvider'
import { useUIContextModals } from '@/shared/providers/UIProvider'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState, type ChangeEvent, type KeyboardEvent } from 'react'
import LogoHeader from './components/LogoHeader'
import ButtonCategories from './components/ButtonCategories'
import ThemeToggle from './components/ThemeToggle'
import NavSection from './components/navSection/NavSection'
import NavSectionMobile from './components/navSection/navSectionMobile/NavSectionMobile'
import BasketCircle from './components/navSection/BasketCircle'
import Search from '@/shared/widgets/search/Search'
import styles from './Header.module.scss'

const Header = () => {
  const { setSearchQuery, searchQuery } = useProductsContext()
  const { setIsSearchProductOpen } = useUIContextModals()

  const navigate = useNavigate()
  const location = useLocation()

  const [searchTerm, setSearchTerm] = useState(searchQuery)

  useEffect(() => {
    setSearchTerm(searchQuery)
  }, [searchQuery])

  const navigateToHome = () => {
    if (location.pathname !== '/') {
      navigate('/')
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleClearClick = () => {
    setSearchTerm('')
    setSearchQuery('')
    navigateToHome()
  }

  const handleSearchClick = () => {
    setSearchQuery(searchTerm)
    setIsSearchProductOpen(false)   
    navigateToHome()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick()
    }
  }

  const handleFocus = () => setIsSearchProductOpen(true)
  const handleBlur = () => setIsSearchProductOpen(false)
  
  return (
    <header id='header' className={styles.header} aria-label='Шапка сайта'>
      <LogoHeader />
      <ButtonCategories />
      <Search 
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onSearchClick={handleSearchClick}
        onClear={handleClearClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder='Искать здесь...'
      />
      <NavSection />
      <NavSectionMobile />
      <BasketCircle />
      <ThemeToggle />
    </header> 
  )
}

export default Header