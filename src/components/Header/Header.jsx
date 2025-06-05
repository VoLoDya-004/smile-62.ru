import LogoHeader from './HeaderComponents/LogoHeader'
import ButtonNav from './HeaderComponents/ButtonNav'
import Search from './HeaderComponents/Search'
import ThemeToggle from './HeaderComponents/ThemeToggle'
import TabSection from './HeaderComponents/TabSection'
import TabSectionMobile from './HeaderComponents/TabSectionMobile'
import BasketCircle from '../Basket/BasketComponents/BasketCircle'


export default function Header({totalBasket}) {

    
    return (
        <header>
            <LogoHeader />
            <ButtonNav />
            <Search />
            <TabSection />
            <TabSectionMobile totalBasket={totalBasket} />
            <BasketCircle totalBasket={totalBasket} />
            <ThemeToggle />
        </header> 
    )
}