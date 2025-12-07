import { useContext } from 'react'
import { Context } from '@/contexts/context'
import Button from '@/components/Button/Button'

const FavouritesClearString = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('Context must be used within a Provider')
  }
  const { handleClearFavBtn, loadingDeleteAllFav } = context

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