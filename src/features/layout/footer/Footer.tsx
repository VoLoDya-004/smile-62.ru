import ContactsFooter from './components/ContactsFooter'
import LinkFooter from './components/LinkFooter'
import LogoFooter from './components/LogoFooter'
import Copyright from './components/Copyright'
import SectionsFooter from './components/SectionsFooter'
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