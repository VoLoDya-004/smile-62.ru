import { useUIContextModals } from '@/contexts/UIContext'
import { useFavouritesContext } from '@/contexts/FavouritesContext'
import Button from '@/components/Button/Button'

const FavouritesClearString = () => {
  const { loadingDeleteAllFav } = useFavouritesContext()

  const { handleClearFavBtn } = useUIContextModals()

  return (
    <section className='clear-string'>
      {loadingDeleteAllFav ? (
      <div className='spinner-clear-box'>
        <h2 className='spinner-clear-box-title'>
          Удаление товаров...
        </h2>
        <div className='spinner-clear'></div>
      </div>
      ) : 
      (
      <>
        <h2 className='favourites-box__title'>
          Избранные товары
        </h2>
        <Button
          className='button-violet'
          onClick={handleClearFavBtn}
        >
          Очистить избранное
        </Button>
      </>
      )}
    </section>
  )
}

export default FavouritesClearString