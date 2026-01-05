interface IButtonDeleteBasketProps {
  openDeleteModal: (id: number) => void
  id: number
  isPendingDelete: boolean
}

const ButtonDeleteBasket = ({
  openDeleteModal, 
  id, 
  isPendingDelete
}: IButtonDeleteBasketProps) => {  

  return (
    <div className='button-product-controls'>
      { isPendingDelete ? (
        <div className='spinner-delete-product'></div>  
      ) : (
        <button 
          type='button'
          data-action='delete-basket-product'
          className='button-product-controls'
          disabled={isPendingDelete}
          onClick={() => openDeleteModal(id)}
          aria-label='Удалить выбранный товар из корзины'
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
      )}
    </div>
  )
}

export default ButtonDeleteBasket
