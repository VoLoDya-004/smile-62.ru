import { useNavigate } from 'react-router-dom'
import styles from './LogoFooter.module.scss'

const LogoFooter = () => {
  const navigate = useNavigate()
  const handleToHome = () => navigate('/')

  return (
    <img 
      src='/images/icons/smile-62.png' 
      alt='Smile' 
      className={styles.logo}
      onClick={handleToHome}
    />
  )
}

export default LogoFooter