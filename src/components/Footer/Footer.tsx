import { useSelector } from 'react-redux'
import type { RootStore } from '../../redux'
import { memo } from 'react'
import ContactsFooter from './FooterComponents/ContactsFooter'
import LinkFooter from './FooterComponents/LinkFooter'
import LogoFooter from './FooterComponents/LogoFooter'
import SecondRowFooter from './FooterComponents/SecondRowFooter'
import SectionsFooter from './FooterComponents/SectionsFooter'


const Footer = () => {
    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)


    return (
        <footer className={`footer ${isDarkTheme ? 'dark-theme' : ''}`}>
            <LogoFooter />
            <SectionsFooter />
            <ContactsFooter />
            <LinkFooter />
            <SecondRowFooter />
        </footer>
    )
}

export default memo(Footer)