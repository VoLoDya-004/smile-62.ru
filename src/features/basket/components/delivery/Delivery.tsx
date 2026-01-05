import { useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '@/shared/store'
import { cx } from '@/shared/utils/classnames'
import { useUIContextNotification } from '@/shared/contexts/UIContext'
import Button from '@/shared/ui/buttons/Button'
import styles from './Delivery.module.scss'

const OrderSummary = ({ 
  totalBasket 
}: { 
  totalBasket: { count: number; price_total: number }
}) => {
  const {
    'delivery__order': order,
    'delivery__order-count': orderCount,
    'delivery__order-price-total': orderPrice,
    'delivery__order-btn': orderButton,
    'delivery__order-checkbox': orderChecbox,
    'delivery__order-rules': orderRules
  } = styles

  const { showNotification } = useUIContextNotification()

  const handleOrderProducts = () => {
    showNotification('Фунционал в разработке', 'error')
  }

  const priceFormatter = new Intl.NumberFormat('ru-RU')

  return (
    <section className={order}>
      <div className={orderCount}>
        <b>Всего товаров:</b> {totalBasket.count} шт.
      </div>
      <div className={orderPrice}>
        <b>Итого:</b> {priceFormatter.format(totalBasket.price_total)} &#x20bd;
      </div>
      <div className={orderButton}>
        <Button className='button-violet' onClick={handleOrderProducts}>Заказать</Button>
      </div>
      <div className={orderChecbox}>
        <label htmlFor='accept-rules' className='cursor-pointer'>
          <input 
            type='checkbox' 
            id='accept-rules' 
            name='acceptRules'
            className='cursor-pointer margin-checkbox'
          />
          Соглашаюсь с&nbsp; 
          <a href='' className={orderRules}> 
            правилами&nbsp;
          </a> 
          пользования <br /> 
          торговой площадкой и возврата
        </label>
      </div>
    </section>
  )
}

const CitySelection = ({ 
  city, 
  onCityChange 
}: { 
  city: string
  onCityChange: (city: string) => void
}) => {
  const {
    'delivery__city': deliveryCity,
    'delivery__city-text': deliveryCityText,
    'delivery__city-select': deliveryCitySelect
  } = styles

  const cities = [
    { value: 'astrahan', label: 'Астрахань' },
    { value: 'barnaul', label: 'Барнаул' },
    { value: 'voronezh', label: 'Воронеж' },
    { value: 'volgograd', label: 'Волгоград' },
    { value: 'izhevsk', label: 'Ижевск' },
    { value: 'kursk', label: 'Курск' },
    { value: 'moscow', label: 'Москва' },
    { value: 'novosibirsk', label: 'Новосибирск' },
    { value: 'ryazan', label: 'Рязань' },
    { value: 'ekaterenburg', label: 'Екатеринбург' },
    { value: 'kazan', label: 'Казань' },
    { value: 'chelyabinsk', label: 'Челябинск' },
    { value: 'omsk', label: 'Омск' },
    { value: 'samara', label: 'Самара' },
    { value: 'ivanovo', label: 'Иваново' },
    { value: 'kaliningrad', label: 'Калининград' },
    { value: 'rostov', label: 'Ростов-на-Дону' },
    { value: 'ufa', label: 'Уфа' },
    { value: 'krasnoyarsk', label: 'Красноярск' },
    { value: 'perm', label: 'Пермь' },
    { value: 'penza', label: 'Пенза' },
    { value: 'tambov', label: 'Тамбов' },
    { value: 'tula', label: 'Тула' },
    { value: 'habarovsk', label: 'Хабаровск' },
    { value: 'mahachkala', label: 'Махачкала' },
    { value: 'orenburg', label: 'Оренбург' },
    { value: 'cheboksar', label: 'Чебоксары' },
    { value: 'oryol', label: 'Орел' },
    { value: 'sochi', label: 'Сочи' },
  ]

  return (
    <section className={deliveryCity}>
      <label htmlFor='city-select'>
        <h3 className={cx(deliveryCityText, 'margin-null')}>Ваш город</h3>
      </label>
      <select 
        value={city}
        onChange={e => onCityChange(e.target.value)}
        name='city' 
        className={cx(deliveryCitySelect, 'cursor-pointer')} 
        id='city-select' 
      >
        <option value='' disabled>Выберите город</option>
        {cities.map(cityOption => (
          <option key={cityOption.value} value={cityOption.value}>
            {cityOption.label}
          </option>
        ))}
      </select>
    </section>
  )
}

const Delivery = () => {
  const {
    'delivery': sectionDelivery,
    'delivery__label': label
  } = styles

  const totalBasket = useSelector((state: RootStore) => state.basket.total)

  const [city, setCity] = useState('')

  const handleCityChange = (selectedCity: string) => {
    setCity(selectedCity)
  }

  return (
    <>
      <h2 className={label}>Доставка</h2>
      <section className={sectionDelivery}>
        <OrderSummary totalBasket={totalBasket} />
        <CitySelection city={city} onCityChange={handleCityChange} />
      </section>
    </>
  )
}

export default Delivery