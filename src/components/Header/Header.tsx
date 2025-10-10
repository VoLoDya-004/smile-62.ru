import LogoHeader from './HeaderComponents/LogoHeader'
import ButtonNav from '../Button/ButtonNav'
import Search from './HeaderComponents/Search'
import ThemeToggle from './HeaderComponents/ThemeToggle'
import TabSection from './HeaderComponents/TabSection'
import TabSectionMobile from './HeaderComponents/TabSectionMobile'
import BasketCircle from '../Basket/BasketComponents/BasketCircle'


const Header = () => {

    
    return (
        <header className='header'>
            <LogoHeader />
            <ButtonNav />
            <Search />
            <TabSection />
            <TabSectionMobile />
            <BasketCircle />
            <ThemeToggle />
        </header> 
    )
}

export default Header