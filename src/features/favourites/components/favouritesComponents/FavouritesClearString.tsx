
import { useFavouritesContext } from '../../contexts/FavouritesContext'
import { useUIContextModals } from '@/shared/contexts/UIContext'
import Button from '@/shared/ui/buttons/Button'
import styles from './Favourites.module.scss'

const FavouritesClearString = () => {
  const { loadingDeleteAllFav } = useFavouritesContext()

  const { handleClearFavBtn } = useUIContextModals()

  return (
    <section className='clear-string'>
      {loadingDeleteAllFav ? (
        <div className='spinner-clear-box'>
          <h2 className='spinner-clear-box-title'>Удаление товаров...</h2>
          <div className='spinner-clear'></div>
        </div>
      ) : (
        <>
          <h2 className={styles['favourites-box__title']}>Избранные товары</h2>
          <Button className='button-violet' onClick={handleClearFavBtn}>
            Очистить избранное
          </Button>
        </>
      )}
    </section>
  )
}

export default FavouritesClearString