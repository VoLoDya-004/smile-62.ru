import LogoHeader from './headerComponents/LogoHeader'
import ButtonCategories from './headerComponents/ButtonCategories'
import Search from './headerComponents/Search'
import ThemeToggle from './headerComponents/ThemeToggle'
import NavSection from './headerComponents/navSection/NavSection'
import NavSectionMobile from './headerComponents/navSection/navSectionMobile/NavSectionMobile'
import BasketCircle from './headerComponents/navSection/BasketCircle'
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