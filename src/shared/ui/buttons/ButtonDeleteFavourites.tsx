import { useFavourites } from '@/features/favourites/hooks/useFavourites'

const ButtonDeleteFavourites = ({ id }: { id: number }) => {
  const { deleteProductFavourites } = useFavourites()

  return (
    <div className='button-product-controls'>
      <button 
        type='button'
        className='button-product-controls'
        onClick={() => { deleteProductFavourites(id) }}
        aria-label='Удалить выбранный товар из избранного'
      >
        <svg 
          className='button-product-controls-cross-hover'
          width='24'
          height='24' 
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path className='button-product-controls-cross' d='M18 6L6 18' />
          <path className='button-product-controls-cross' d='M6 6L18 18' />
        </svg>
      </button>
    </div>
  )
}

export default ButtonDeleteFavourites