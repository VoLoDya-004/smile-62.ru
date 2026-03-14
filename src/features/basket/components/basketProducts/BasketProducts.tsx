import { useEffect, useState, type ChangeEvent, type KeyboardEvent } from 'react'
import type { IBasket } from '@/features/basket/types/basketTypes'
import { formatPrice } from '@/shared/utils/formatters'
import { cx } from '@/shared/utils/classnames'
import ButtonProductDelete from '@/shared/ui/buttons/ButtonProductDelete'
import BasketIncreaseSVG from './svg/BasketIncreaseSVG'
import BasketDecreaseSVG from './svg/BasketDecreaseSVG'
import styles from './BasketProducts.module.scss'

interface IBasketProductsProps {
  productBasket: IBasket
  openDeleteModal: (id: number) => void
  onChange: (e: ChangeEvent<HTMLInputElement>, id: number) => void
  decreaseBasket: (id: number, currentCount: number) => void
  increaseBasket: (id: number, currentCount: number) => void
}

const BasketProducts = ({
  productBasket, 
  openDeleteModal, 
  onChange, 
  decreaseBasket,
  increaseBasket
}: IBasketProductsProps) => {
  const {
    'product': product,
    'product__img': productImage,
    'product__title': productTitle,
    'product__price': productPrice,
    'product__count': productCount,
    'product__count-box': productCountBox,
    'product__count-input': productCountInput,
    'product__count-controls': productCountControls,
    'count-up': countUp,
    'count-down': countDown,
    'count-svg-hover': countHover
  } = styles

  const { id, nazvanie, image, count, price_sale } = productBasket

  const [inputValue, setInputValue] = useState<string | number>(count ?? 0)

  useEffect(() => {
    setInputValue(count ?? 0)
  }, [count])

  const handleIncrease = () => {
    if (count) {
      increaseBasket(id, +count)
    }
  }

  const handleDecrease = () => {
    if (count) {
      decreaseBasket(id, +count)
    }
  }

  const handleBlur = () => {
    if (inputValue === '') {
      setInputValue(1)
      onChange({ target: { value: '1' } } as ChangeEvent<HTMLInputElement>, id)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur()
      e.currentTarget.blur()
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value === '') {
      setInputValue('')
    } else {
      let newCount = parseInt(value)

      if (isNaN(newCount) || newCount < 1) {
        newCount = 1
      } else if (newCount > 100) {
        newCount = 100
      }
      setInputValue(newCount)
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
            onKeyDown={handleKeyDown}
            aria-label='Поле для смены количества товара в корзине'
            className={productCountInput}
            type='number'
            name='basketCount'
            min='1'
            max='100'
            value={inputValue}
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
        {formatPrice((price_sale ?? 0) * Number(count))} руб.
      </div>
      <ButtonProductDelete 
        onClick={() => openDeleteModal(id)} 
        ariaLabel='Удалить выбранный товар из корзины' 
        dataAction='delete-basket-product'
      />
    </article>
  )
}

export default BasketProducts
