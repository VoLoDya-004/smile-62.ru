import Link from 'next/link'
import { usePathname } from 'next/navigation'
import FooterTitle from '../titleFooter/TitleFooter'
import styles from './SectionsFooter.module.scss'
import type { RootStore } from '@/shared/store'
import { useSelector } from 'react-redux'
import { cx } from '@/shared/utils/classnames'

const SectionsFooter = () => {
  const {
    'section': section,
    'section__item': sectionItem,
    'section__item-link': sectionItemLink
  } = styles

  const isAdmin = useSelector((state: RootStore) => state.user.isAdmin)
  const pathname = usePathname()

  const getLinkClass = (href: string) => {
    return cx(sectionItemLink, pathname === href && 'active')
  }

  return (
    <nav className={section} aria-label='Навигация по разделам сайта'>
      <FooterTitle>Разделы</FooterTitle>
      <ul className='margin-null' aria-label='Навигация по разделам сайта'>
        <li className={sectionItem}>
          <Link href='/' className={getLinkClass('/')}>Главная</Link>			
        </li>
        <li className={sectionItem}>
          <Link href='/profile' className={getLinkClass('/profile')}>Профиль</Link>
        </li>
        {isAdmin && (
          <li className={sectionItem}>
            <Link href='/admin' className={getLinkClass('/admin')}>Админ</Link>
          </li>
        )}
        <li className={sectionItem}>
          <Link href='/favourites' className={getLinkClass('/favourites')}>Избранное</Link>
        </li>
        <li className={sectionItem}>
          <Link href='/basket' className={getLinkClass('/basket')}>Корзина</Link>
        </li>
      </ul>
    </nav>
  )
}

export default SectionsFooter