import { useEffect, useState, type ChangeEvent } from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '@/redux'
import type { IBasket } from '@/types/types'
import ButtonDeleteBasket from '@/components/Button/ButtonDeleteBasket'
import BasketIncreaseSVG from '@/components/Icons/BasketIncreaseSVG'
import BasketDecreaseSVG from '@/components/Icons/BasketDecreaseSVG'

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
  const { id, nazvanie, image, count, price_total } = productBasket

  const [localCount, setLocalCount] = useState<string | number>(count)

  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

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
    <article 
      className='basket-box__product'
      aria-label={`Товар ${nazvanie} в корзине`}
    >
      {hasAvif ? (
        <picture className='basket-box__product-img'>
          <source 
            srcSet={`/images/tovar/${image}.avif`} 
            type='image/avif' 
          />
          <img 
            className='basket-box__product-img'
            loading='lazy'
            decoding='async'
            src={`/images/tovar/${image}.png`}
            alt='Товар'
          />
        </picture>
      ) : (
        <div className='basket-box__product-img'>
          <img 
            className='basket-box__product-img'
            src={`/images/tovar/${image}.png`}
            alt='Товар'
          />
        </div>
      )}
      <div className='basket-box__product-title'>{nazvanie}</div>
      <div className='basket-box__product-count'>
        <div 
          className={`basket-box__product-count-box ${isDarkTheme ? 'dark-theme': ''}`}
        >
          <input
            onChange={handleInputChange}
            onBlur={handleBlur}
            aria-label='Поле для смены количества товара в корзине'
            className=
            {`basket-box__product-count-input ${isDarkTheme ? 'dark-theme': ''}`}
            type='number'
            name='basketCount'
            min='1'
            max='100'
            value={localCount}
          />
        </div>
        <div className='basket-box__product-count-controls'>
          <button
            onClick={handleIncrease}
            aria-label='Увеличить количество товара в корзине на единицу'
            type='button'
            className={`count__up count-svg-hover ${isDarkTheme ? 'dark-theme' : ''}`}
          >
            <BasketIncreaseSVG />
          </button>
          <button
            onClick={handleDecrease}
            aria-label='Уменьшить количество товара в корзине на единицу'
            type='button'
            className={`count__down count-svg-hover ${isDarkTheme ? 'dark-theme' : ''}`}
          >
            <BasketDecreaseSVG />
          </button>
        </div>
      </div>
      <div className='basket-box__product-price'>
        {priceFormatter.format(price_total * Number(localCount))} руб.
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
