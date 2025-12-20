import { useSelector } from 'react-redux'
import type { RootStore } from '@/shared/store'
import ContactsFooter from './footerComponents/ContactsFooter'
import LinkFooter from './footerComponents/LinkFooter'
import LogoFooter from './footerComponents/LogoFooter'
import Copyright from './footerComponents/Copyright'
import SectionsFooter from './footerComponents/SectionsFooter'

const Footer = () => {
  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

  return (
    <footer 
      id='footer'
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

export default Footer