import { useCallback, useMemo, Fragment} from 'react'
import type { IFav } from '@/features/favourites/types/favouritesTypes'
import { useUIContextNotification } from '@/shared/providers/UIProvider'
import { useFavourites } from '@/features/favourites/hooks/useFavourites'
import BasketAddIcon from '../icons/BasketAddIcon'
import { useBasket } from '@/features/basket/hooks/useBasket'
import type { IBasket } from '@/features/basket/types/basketTypes'

interface IButtonBasketProps {
  id: number
  productFavourites: IFav
}

const ButtonBasket = ({ productFavourites }: IButtonBasketProps) => {  
  const { showNotification } = useUIContextNotification()
  const { cartBasket } = useBasket()
  const { addInBasketProductFavourites, cartFavourites, loadingAddToBasket } = useFavourites()

  const basketProductIds = useMemo(
    () => new Set(cartBasket.map((item: IBasket) => Number(item.id_product))),
    [cartBasket]
  )

  const handleAddInBasketProductFavourites = useCallback(async () => {
    try {
      addInBasketProductFavourites(productFavourites.id_product)
    } catch {
      showNotification('Ошибка', 'error')
    }
  }, [basketProductIds, addInBasketProductFavourites, showNotification])

  const filterCards = useMemo(
    () => cartFavourites.filter((card: IFav) => productFavourites.id === card.id), 
    [cartFavourites, productFavourites.id]
  )

  return (
    <>
      {filterCards.map((card: IFav) => {
        const isBasket = basketProductIds.has(Number(card.id_product))
        const isAdding = loadingAddToBasket.has(card.id_product)

        return (
          <Fragment key={card.id}>
            {productFavourites.id === card.id && (
              <div id={String(card.id)} className='button-product-controls'>
                <button
                  type='button'
                  disabled={isBasket || isAdding}
                  className='button-product-controls'
                  onClick={() => handleAddInBasketProductFavourites()}
                >
                  <span className='visually-hidden'>
                    {isBasket ? 
                      'Товар уже в корзине' : 
                      'Добавить избранный товар в корзину'
                    }
                  </span>
                  <BasketAddIcon isBasket={isBasket || isAdding} />
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












