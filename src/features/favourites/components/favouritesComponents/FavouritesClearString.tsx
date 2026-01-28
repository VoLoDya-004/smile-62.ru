
import { useUIContextModals } from '@/shared/providers/UIProvider'
import Button from '@/shared/ui/buttons/Button'
import styles from './Favourites.module.scss'

const FavouritesClearString = () => {
  const { handleClearFavBtn } = useUIContextModals()

  return (
    <section className='clear-string'>
      <h2 className={styles['favourites-box__title']}>Избранные товары</h2>
      <Button className='button-violet' onClick={handleClearFavBtn}>Очистить избранное</Button>
    </section>
  )
}

export default FavouritesClearString