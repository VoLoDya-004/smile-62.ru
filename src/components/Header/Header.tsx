import LogoHeader from './HeaderComponents/LogoHeader'
import ButtonNav from './HeaderComponents/ButtonNav'
import Search from './HeaderComponents/Search'
import ThemeToggle from './HeaderComponents/ThemeToggle'
import TabSection from './HeaderComponents/TabSection'
import TabSectionMobile from './HeaderComponents/TabSectionMobile'
import BasketCircle from '../Basket/BasketComponents/BasketCircle'
import type { JSX } from 'react'


const Header = (): JSX.Element => {

    
    return (
        <header>
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