import ContactsFooter from './footerComponents/ContactsFooter'
import LinkFooter from './footerComponents/LinkFooter'
import LogoFooter from './footerComponents/LogoFooter'
import Copyright from './footerComponents/Copyright'
import SectionsFooter from './footerComponents/SectionsFooter'
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