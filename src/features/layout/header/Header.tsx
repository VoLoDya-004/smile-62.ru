import LogoHeader from './components/LogoHeader'
import ButtonCategories from './components/ButtonCategories'
import Search from './components/Search'
import ThemeToggle from './components/ThemeToggle'
import NavSection from './components/navSection/NavSection'
import NavSectionMobile from './components/navSection/navSectionMobile/NavSectionMobile'
import BasketCircle from './components/navSection/BasketCircle'
import styles from './Header.module.scss'

const Header = () => {
  const { header } = styles
    
  return (
    <header id='header' className={header} aria-label='Шапка сайта'>
      <LogoHeader />
      <ButtonCategories />
      <Search />
      <NavSection />
      <NavSectionMobile />
      <BasketCircle />
      <ThemeToggle />
    </header> 
  )
}

export default Header