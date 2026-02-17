import { NavLink } from 'react-router-dom'
import styles from '../Footer.module.scss'

const LogoFooter = () => {
  const {
    'footer__logo-wrapper':  logoWrapper,
    'footer__logo-img': logoImage
  } = styles

  return (
    <NavLink to='/' aria-label='Перейти на главную' className={logoWrapper}>
      <div className='footer__logo'>
        <img src='/images/icons/smile-62.png' alt='Smile' className={logoImage} />
      </div>
    </NavLink>
  )
}

export default LogoFooter