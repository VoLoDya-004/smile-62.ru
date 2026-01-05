import { useState, useCallback, useMemo, Fragment} from 'react'
import type { IFav } from '@/features/favourites/types/favouritesTypes'
import { useUIContextNotification } from '@/shared/contexts/UIContext'
import { useBasketContext } from '@/features/basket/contexts/BasketContext'
import type { IBasket } from '@/features/basket/types/basketTypes'
import BasketAddIcon from '../icons/BasketAddIcon'

interface IButtonBasketProps {
  id: number
  addInBasketProductFavourites: (id: number) => Promise<void>
  productFavourites: IFav
  cartFavourites: IFav[]
  cartBasket: IBasket[]
}

const ButtonBasket = ({
  addInBasketProductFavourites, 
  productFavourites, 
  cartFavourites, 
  cartBasket 
}: IButtonBasketProps) => {  
  const { updateBasketData, setLoadingBasket } = useBasketContext()

  const { showNotification } = useUIContextNotification()

  const [addingStatus, setAddingStatus] = useState<Record<number, boolean>>({})

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
              <div id={String(card.id)} className='button-product-controls'>
                <button
                  type='button'
                  disabled={isBasket || isLoading}
                  className='button-product-controls'
                  onClick={() => handleAddInBasketProductFavourites(card.id)}
                >
                  <span className='visually-hidden'>
                    {isBasket ? 
                      'Товар уже в корзине' : 
                      'Добавить избранный товар в корзину'
                    }
                  </span>
                  <BasketAddIcon isBasket={isBasket} isLoading={isLoading} />
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












