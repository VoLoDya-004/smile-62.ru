import LogoHeader from './headerComponents/LogoHeader'
import ButtonCategories from '../../../../shared/ui/buttons/ButtonCategories'
import Search from './headerComponents/Search'
import ThemeToggle from './headerComponents/ThemeToggle'
import NavSection from './headerComponents/navSection/NavSection'
import NavSectionMobile from './headerComponents/navSection/navSectionMobile/NavSectionMobile'
import BasketCircle from './headerComponents/navSection/BasketCircle'

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