import { useSelector } from 'react-redux'
import type { RootStore } from '../../redux'
import { memo } from 'react'
import ContactsFooter from './FooterComponents/ContactsFooter'
import LinkFooter from './FooterComponents/LinkFooter'
import LogoFooter from './FooterComponents/LogoFooter'
import Copyright from './FooterComponents/Copyright'
import SectionsFooter from './FooterComponents/SectionsFooter'


const Footer = () => {
    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)


    return (
        <footer 
            className={`footer ${isDarkTheme ? 'dark-theme' : ''}`}
            aria-label='Подвал сайта'
        >
            <LogoFooter />
            <SectionsFooter />
            <ContactsFooter />
            <LinkFooter />
            <Copyright />
        </footer>
    )
}

export default memo(Footer)