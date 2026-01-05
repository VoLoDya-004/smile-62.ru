import { useEffect, useState, type ChangeEvent } from 'react'
import type { IBasket } from '@/features/basket/types/basketTypes'
import { cx } from '@/shared/utils/classnames'
import ButtonDeleteBasket from '@/shared/ui/buttons/ButtonDeleteBasket'
import BasketIncreaseSVG from '@/shared/ui/icons/BasketIncreaseSVG'
import BasketDecreaseSVG from '@/shared/ui/icons/BasketDecreaseSVG'
import styles from './Basket.module.scss'

interface IBasketProductsProps {
  productBasket: IBasket
  openDeleteModal: (id: number) => void
  onChange: (e: ChangeEvent<HTMLInputElement>, id: number) => void
  isDeleting: boolean
}

const priceFormatter = new Intl.NumberFormat('ru-RU')

const BasketProducts = ({
  productBasket, 
  openDeleteModal, 
  onChange, 
  isDeleting
}: IBasketProductsProps) => {
  const {
    'basket-box__product': product,
    'basket-box__product-img': productImage,
    'basket-box__product-title': productTitle,
    'basket-box__product-count': productCount,
    'basket-box__product-count-box': productCountBox,
    'basket-box__product-count-input': productCountInput,
    'basket-box__product-count-controls': productCountControls,
    'count-up': countUp,
    'count-down': countDown,
    'count-svg-hover': countHover,
    'basket-box__product-price': productPrice
  } = styles

  const { id, nazvanie, image, count, price_total } = productBasket

  const [localCount, setLocalCount] = useState<string | number>(count ?? 0)

  const handleIncrease = () => {
    const newCount = Math.min(+localCount + 1, 100)
    setLocalCount(newCount)
    onChange({ target: { value: newCount.toString() } } as ChangeEvent<HTMLInputElement>, id)
  }

  const handleDecrease = () => {
    const newCount = Math.max(+localCount - 1, 1)
    setLocalCount(newCount)
    onChange({ target: { value: newCount.toString() } } as ChangeEvent<HTMLInputElement>, id)
  }

  const handleBlur = () => {
    if (localCount === '') {
      setLocalCount(1)
      onChange({ target: { value: '1' } } as ChangeEvent<HTMLInputElement>, id)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value === '') {
      setLocalCount('')
    } else {
      let newCount = parseInt(value)

      if (isNaN(newCount) || newCount < 1) {
        newCount = 1
      } else if (newCount > 100) {
        newCount = 100
      }
      setLocalCount(newCount)
    }
    onChange(e, id)
  }

  const [hasAvif, setHasAvif] = useState(true)

  useEffect(() => {
    const img = new Image()
    const handleLoad = () => setHasAvif(true)
    const handleError = () => setHasAvif(false)

    img.addEventListener('load', handleLoad)
    img.addEventListener('error', handleError)
    img.src = `/images/tovar/${image}.avif`

    return () => {
      img.removeEventListener('load', handleLoad)
      img.removeEventListener('error', handleError)
      img.src = ''
    }
  }, [image])

  return (       
    <article className={product} aria-label={`Товар ${nazvanie} в корзине`}>
      {hasAvif ? (
        <picture className={productImage}>
          <source 
            srcSet={`/images/tovar/${image}.avif`} 
            type='image/avif' 
          />
          <img 
            className={productImage}
            loading='lazy'
            decoding='async'
            src={`/images/tovar/${image}.png`}
            alt='Товар'
          />
        </picture>
      ) : (
        <div className={productImage}>
          <img 
            className={productImage}
            src={`/images/tovar/${image}.png`}
            alt='Товар'
          />
        </div>
      )}
      <div className={productTitle}>{nazvanie}</div>
      <div className={productCount}>
        <div className={productCountBox}>
          <input
            onChange={handleInputChange}
            onBlur={handleBlur}
            aria-label='Поле для смены количества товара в корзине'
            className={productCountInput}
            type='number'
            name='basketCount'
            min='1'
            max='100'
            value={localCount}
          />
        </div>
        <div className={productCountControls}>
          <button
            onClick={handleIncrease}
            aria-label='Увеличить количество товара в корзине на единицу'
            type='button'
            className={cx(countUp, countHover)}
          >
            <BasketIncreaseSVG />
          </button>
          <button
            onClick={handleDecrease}
            aria-label='Уменьшить количество товара в корзине на единицу'
            type='button'
            className={cx(countDown, countHover)}
          >
            <BasketDecreaseSVG />
          </button>
        </div>
      </div>
      <div className={productPrice}>
        {priceFormatter.format(price_total ?? 0 * Number(localCount))} руб.
      </div>
      <ButtonDeleteBasket 
        openDeleteModal={openDeleteModal} 
        id={id}
        isPendingDelete={isDeleting}
      />
    </article>
  )
}

export default BasketProducts
