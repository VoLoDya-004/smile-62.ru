import Link from 'next/link'
import styles from './LogoFooter.module.scss'
import Image from 'next/image'

const LogoFooter = () => {
  return (
    <Link href='/' className={styles.logo}>
      <Image 
        src='/images/icons/icon.png'
        alt='Карандаши'
        width={135}
        height={135}
        loading='lazy'
      />
    </Link>
  )
}

export default LogoFooter