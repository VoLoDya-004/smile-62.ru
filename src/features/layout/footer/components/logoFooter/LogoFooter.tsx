import { useNavigate } from 'react-router-dom'
import styles from './LogoFooter.module.scss'

const LogoFooter = () => {
  const navigate = useNavigate()
  const handleToHome = () => navigate('/')

  return (
    <picture onClick={handleToHome} className={styles.logo}>
      <source srcSet='/images/icons/smile-62.webp' type='image/webp' width={240} />
      <img 
        src='/images/icons/smile-62.png'
        loading='lazy'
        alt='Smile'
        width={240}
      />
    </picture>
  )
}

export default LogoFooter