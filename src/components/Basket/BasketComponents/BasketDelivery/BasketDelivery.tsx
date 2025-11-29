import { useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '@/components/Button/Button'
import type { RootStore } from '@/redux'


const OrderSummary = ({ 
  isDarkTheme, 
  totalBasket 
}: { 
  isDarkTheme: boolean
  totalBasket: { count: number; price_total: number }
}) => {
  const priceFormatter = new Intl.NumberFormat('ru-RU')


  return (
    <section className={`basket-delivery__order ${isDarkTheme ? 'dark-theme' : ''}`}>
      <div className='basket-delivery__order-count'>
        <b>Всего товаров:</b> {totalBasket.count} шт.
      </div>
      <div className='basket-delivery__order-priceTotal'>
        <b>Итого:</b> {priceFormatter.format(totalBasket.price_total)} &#x20bd;
      </div>
      <div className='basket-delivery__order-btn'>
        <Button className='button-violet'>Заказать</Button>
      </div>
      <div className='basket-delivery__order-checkbox'>
        <label htmlFor='accept-rules' className='cursor-pointer'>
          <input 
            type='checkbox' 
            id='accept-rules' 
            name='acceptRules'
            className='cursor-pointer margin-checkbox'
          />
          Соглашаюсь с&nbsp; 
          <a 
            href='' 
            className={`basket-delivery__order-rules ${isDarkTheme ? 'dark-theme' : ''}`}
          > 
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
  isDarkTheme, 
  city, 
  onCityChange 
}: { 
  isDarkTheme: boolean
  city: string
  onCityChange: (city: string) => void
}) => {
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
    <section className={`basket-delivery__city ${isDarkTheme ? 'dark-theme' : ''}`}>
      <label htmlFor='city-select'>
        <h3 className='basket-delivery__city-text margin-null'>Ваш город</h3>
      </label>
      <select 
        value={city}
        onChange={e => onCityChange(e.target.value)}
        name='city' 
        className={`basket-delivery__city-select ${isDarkTheme ? 'dark-theme' : ''} cursor-pointer`} 
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


const BasketDelivery = () => {
  const totalBasket = useSelector((state: RootStore) => state.basket.total)
  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

  const [city, setCity] = useState('')

  const handleCityChange = (selectedCity: string) => {
    setCity(selectedCity)
  }


  return (
    <>
      <h2 className='delivery-label'>Доставка</h2>
      <section className={`basket-delivery ${isDarkTheme ? 'dark-theme' : ''}`}>
        <OrderSummary 
          isDarkTheme={isDarkTheme}
          totalBasket={totalBasket}
        />
        <CitySelection 
          isDarkTheme={isDarkTheme}
          city={city}
          onCityChange={handleCityChange}
        />
      </section>
    </>
  )
}

export default BasketDelivery