import { useSelector } from 'react-redux'
import type { RootStore } from '@/redux'

interface IButtonDeleteFavouritesProps {
  deleteProductFavourites: (id: number) => void
  id: number
  isPendingDelete: boolean
}

const ButtonDeleteFavourites = ({
  deleteProductFavourites, 
  id,
  isPendingDelete
}: IButtonDeleteFavouritesProps) => {
  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

  return (
    <div className={`basket-box__product-controls ${isDarkTheme ? 'dark-theme' : ''}`}>
      { isPendingDelete ? (
        <div className='spinner-delete-product'></div>  
      ) : (
        <button 
          type='button'
          className={`
            basket-box__product-controls ${isDarkTheme ? 'dark-theme' : ''}
          `} 
          onClick={() => {deleteProductFavourites(id)}}
          aria-label='Удалить выбранный товар из избранного'
        >
          <svg 
            className='cross-svg-hover'
            width='24'
            height='24' 
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path 
              className='cross-svg'
              d='M18 6L6 18' 
            />
            <path 
              className='cross-svg' 
              d='M6 6L18 18' 
            />
          </svg>
        </button>
      )}
    </div>
  )
}

export default ButtonDeleteFavourites