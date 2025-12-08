import { useState, useCallback, useMemo, useContext, Fragment} from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '@/redux'
import type { IFav, IProduct } from '@/types/types'
import { Context } from '@/contexts/context'
import BasketAddIcon from '../Icons/BasketAddIcon'

interface IButtonBasketProps {
  id: number
  addInBasketProductFavourites: (id: number) => Promise<void>
  productFavourites: IFav
  cartFavourites: IFav[]
  cartBasket: IProduct[]
}

const ButtonBasket = ({
  addInBasketProductFavourites, 
  productFavourites, 
  cartFavourites, 
  cartBasket 
}: IButtonBasketProps) => {  
  const context = useContext(Context)
  if (!context) {
    throw new Error('Context must be used within a Provider')
  }
  const { updateBasketData, setLoadingBasket, showNotification } = context

  const [addingStatus, setAddingStatus] = useState<Record<number, boolean>>({})

  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

  const basketProductIds = useMemo(
    () => new Set(cartBasket.map(item => Number(item.id_product))), 
    [cartBasket]
  )

  const handleAddInBasketProductFavourites = useCallback(async (id: number) => {
    if (addingStatus[id] || basketProductIds.has(id)) {
      return
    }

    setLoadingBasket(true)
    setAddingStatus(prev => ({ ...prev, [id]: true }))

    try {
      await addInBasketProductFavourites(id)
      await updateBasketData()
    } catch {
      showNotification('Ошибка', 'error')
    } finally {
      setAddingStatus(prev => ({ ...prev, [id]: false }))
      setLoadingBasket(false)
    }
  }, [
    basketProductIds, 
    addingStatus, 
    addInBasketProductFavourites, 
    showNotification, 
    updateBasketData
  ])

  const filterCards = useMemo(
    () => cartFavourites.filter(card => productFavourites.id === card.id), 
    [cartFavourites, productFavourites.id]
  )

  return (
    <>
      {filterCards.map((card) => {
        const isBasket = basketProductIds.has(Number(card.id))
        const isLoading = addingStatus[card.id]

        return (
          <Fragment key={card.id}>
            {productFavourites.id === card.id && (
              <div  
                id={String(card.id)} 
                className={`
                  basket-box__product-controls 
                  ${isDarkTheme ? 'dark-theme' : ''}
                `}
              >
                <button
                  type='button'
                  disabled={isBasket || isLoading}
                  className={`
                    basket-box__product-controls 
                    ${isDarkTheme ? 'dark-theme' : ''}
                  `}
                  onClick={() => handleAddInBasketProductFavourites(card.id)}
                >
                  <span className='visually-hidden'>
                    {isBasket ? 
                      'Товар уже в корзине' : 
                      'Добавить избранный товар в корзину'
                    }
                  </span>
                    <BasketAddIcon
                      isBasket={isBasket}
                      isLoading={isLoading}
                      isDarkTheme={isDarkTheme}
                    />
                </button>
              </div>
            )}
          </Fragment>
        )
      })}
    </>
  )
}

export default ButtonBasket












