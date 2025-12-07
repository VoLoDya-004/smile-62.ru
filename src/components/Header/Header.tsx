import LogoHeader from './HeaderComponents/LogoHeader'
import ButtonCategories from '../Button/ButtonCategories'
import Search from './HeaderComponents/Search'
import ThemeToggle from './HeaderComponents/ThemeToggle'
import NavSection from './HeaderComponents/NavSection/NavSection'
import NavSectionMobile from './HeaderComponents/NavSection/NavSectionMobile/NavSectionMobile'
import BasketCircle from './HeaderComponents/NavSection/BasketCircle'

const Header = () => {
    
  return (
    <header id='header'aria-label='Шапка сайта'>
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