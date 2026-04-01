import Link from 'next/link'
import styles from './LogoHeader.module.scss'
import Image from 'next/image'

const LogoHeader = () => {
  const {
    'logo': logo,
    'logo-wrapper': logoWrapper
  } = styles
    
  return (
    <Link className={logoWrapper} href='/' aria-label='Перейти на главную страницу'>
      <div className={logo}>
        <Image 
          src='/images/icons/icon.png'
          style={{filter: 'invert(100%)'}}
          alt='Карандаши'
          width={72}
          height={72}
        />
      </div>
    </Link>
  )
}

export default LogoHeader