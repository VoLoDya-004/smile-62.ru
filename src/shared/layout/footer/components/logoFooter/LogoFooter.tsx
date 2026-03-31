import Link from 'next/link'
import styles from './LogoFooter.module.scss'
import Image from 'next/image'

const LogoFooter = () => {
  return (
    <Link href='/' className={styles.logo}>
      <Image
        src='/images/icons/smile-62.webp'
        alt='Smile'
        width={240}
        height={135}
        loading='lazy'
      />
    </Link>
  )
}

export default LogoFooter