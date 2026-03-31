import ContactsFooter from './components/contactsFooter/ContactsFooter'
import LinkFooter from './components/linkFooter/LinkFooter'
import LogoFooter from './components/logoFooter/LogoFooter'
import Copyright from './components/copyright/Copyright'
import SectionsFooter from './components/sectionsFooter/SectionsFooter'
import styles from './Footer.module.scss'

const Footer = () => {

  return (
    <footer id='footer' className={styles.footer} aria-label='Подвал сайта'>
      <LogoFooter />
      <SectionsFooter />
      <ContactsFooter />
      <LinkFooter />
      <Copyright />
    </footer>
  )
}

export default Footer