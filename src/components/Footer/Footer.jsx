import { useSelector } from 'react-redux'
import React from 'react'
import ContactsFooter from './FooterComponents/ContactsFooter'
import LinkFooter from './FooterComponents/LinkFooter'
import LogoFooter from './FooterComponents/LogoFooter'
import SecondRowFooter from './FooterComponents/SecondRowFooter'
import SectionsFooter from './FooterComponents/SectionsFooter'


export default React.memo(function Footer() {
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme)


    return (
        <footer className={`footer ${isDarkTheme ? 'dark-theme' : ''}`}>
            <LogoFooter />
            <SectionsFooter />
            <ContactsFooter />
            <LinkFooter />
            <SecondRowFooter />
        </footer>
    )
})