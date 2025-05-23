import LogoHeader from './HeaderComponents/LogoHeader'
import ButtonNav from './HeaderComponents/ButtonNav'
import Search from './HeaderComponents/Search'
import ThemeToggle from './HeaderComponents/ThemeToggle'
import TabSection from './HeaderComponents/TabSection'



export default function Header() {

    return (
        <>
                <header>
                    <LogoHeader />
                    <ButtonNav />
                    <Search />
                    <TabSection />
                    <ThemeToggle />
                </header> 
        </>
    )
}