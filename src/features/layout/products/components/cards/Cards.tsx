import { useEffect, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '@/shared/store'
import { useUIContextNotification } from '@/shared/providers/UIProvider'
import type { ICardsRender, ICardState } from '../../types/mainTypes'
import { useProductsContext } from '../../providers/ProductsProvider'
import { useFavourites } from '@/features/favourites/hooks/useFavourites'
import { useBasket } from '@/features/basket/hooks/useBasket'
import { Spinner } from '@/shared/ui/spinner/Spinner'
import CardItem from './CardItem'
import styles from './Cards.module.scss'
import type { IFav } from '@/features/favourites/types/favouritesTypes'
import type { IBasket } from '@/features/basket/types/basketTypes'

const Cards = () => {
  const isAuth = useSelector((state: RootStore) => state.user.isAuth)

  const { cartBasket, addBasket, isLoadingProductBasket } = useBasket()
  const { searchQuery, isLoading, cards, currentPage } = useProductsContext()
  const { addFavourites, isLoadingProductFav, cartFavourites } = useFavourites()
  const { showNotification } = useUIContextNotification()

  const cardStates = useMemo(() => {
    return cards.reduce((acc: Record<number, ICardState>, card: ICardsRender) => {
      acc[card.id] = {
        isInFavourites: cartFavourites.some((item: IFav) => item.id_product === card.id),
        isInBasket: cartBasket.some((item: IBasket) => item.id_product === card.id),
        isAddingFavourites: isLoadingProductFav(card.id),
        isAddingBasket: isLoadingProductBasket(card.id)
      }
      return acc
    }, {})
  }, [cards, cartFavourites, cartBasket, isLoadingProductFav, isLoadingProductBasket])

  const handleAddBasket = useCallback((id: number) => {
    if (isLoadingProductBasket(id)) return
    if (!isAuth) {
      showNotification('Войдите в аккаунт', 'error')
      return
    }
    if (cartBasket.some((item: IBasket) => item.id_product === id) || isLoadingProductBasket(id)) {
      showNotification('Уже в корзине', 'error')
      return
    }
    try {
      addBasket(id)
    } catch {
      showNotification('Ошибка', 'error')
    }
  }, [cartBasket, isAuth, isLoadingProductBasket, addBasket, showNotification])

  const handleAddFav = useCallback((id: number) => {
    if (isLoadingProductFav(id)) return
    if (!isAuth) {
      showNotification('Войдите в аккаунт', 'error')
      return
    }
    if (cartFavourites.some((item: IFav) => item.id_product === id) || isLoadingProductFav(id)) {
      showNotification('Уже в избранном', 'error')
      return
    }
    try {
      addFavourites(id)
    } catch {
      showNotification('Ошибка', 'error')
    }
  }, [isAuth, cartFavourites, isLoadingProductFav, addFavourites, showNotification])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    })
  }, [currentPage])

  const filteredCards = useMemo(() => 
    cards.filter((card: ICardsRender) => 
      card.nazvanie.toLowerCase().includes(searchQuery.toLowerCase())
    ), [cards, searchQuery]
  )

  const showEmptyState = !isLoading && (searchQuery && filteredCards.length === 0 || cards.length === 0)

  return (
    <>
      {isLoading ? <Spinner /> : (
        <>
          {showEmptyState ? <h2 className='centered-heading'>Товары отсутствуют</h2> : (
            <section className={styles.setka}>
              {cards.map((card: ICardsRender) => (
                <CardItem
                  key={card.id}
                  card={card}
                  {...cardStates[card.id]}
                  onAddFav={handleAddFav}
                  onAddBasket={handleAddBasket}
                />
              ))}
            </section>
          )}
        </>
      )}
    </>
  )
}

export default Cards




















