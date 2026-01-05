import { cx } from '@/shared/utils/classnames'
import styles from './Favourites.module.scss'

const FavouritesHeader = () => {
  const {
    'favourites-box__table-header': header,
    'favourites-box__table-header-title': headerTitle
  } = styles

  return (
    <header className={header}>
      <h4 className={cx(headerTitle, 'margin-null')}>Наименование</h4>
      <h4 className='cursor-default margin-null'>Стоимость</h4>                                              
    </header>   
  )
}

export default FavouritesHeader