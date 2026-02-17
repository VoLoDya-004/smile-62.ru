import { cx } from '@/shared/utils/classnames'
import styles from '../Footer.module.scss'

interface FooterTitleProps {
  children: string
}

const FooterTitle = ({ children }: FooterTitleProps) => {
  const {
    'footer__title': title,
    'footer__title-section': titleSection
  } = styles

  return (
    <h2 className={cx(title, titleSection)}>{children}</h2>
  )
}

export default FooterTitle