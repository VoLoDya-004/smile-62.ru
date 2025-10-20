import { useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '../../../redux'
import Button from '../../Button/Button'


const BasketDelivery = () => {
    const totalBasket = useSelector((state: RootStore) => state.basket.total)
    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

    const priceFormatter = new Intl.NumberFormat()

    const [city, setCity] = useState('')
    

    return (
        <section className={`basket-delivery ${isDarkTheme ? 'dark-theme' : ''}`}>
            <div className={`basket-delivery__left ${isDarkTheme ? 'dark-theme' : ''}`}>
                <div className='basket-delivery__left-count'>
                    <b>Всего товаров:</b> {totalBasket.count} шт.
                </div>
                <div className='basket-delivery__left-priceTotal'>
                    <b>Итого:</b> {priceFormatter.format(totalBasket.price_total)} &#x20bd;
                </div>
                <div className='basket-delivery__left-btn'>
                    <Button className='button-violet'>
                        Заказать
                    </Button>
                </div>
                <div className='basket-delivery__left-checkbox'>
                    <input 
                        type='checkbox' 
                        id='checkbox1' 
                        className='cursor-pointer'
                    />
                    <label 
                        htmlFor='checkbox1' 
                        className='cursor-pointer'
                    >
                        Соглашаюсь с <a 
                            href='' 
                            className={`basket-delivery__left-rules ${isDarkTheme ? 'dark-theme' : ''}`}
                        > 
                            правилами 
                        </a> пользования <br /> 
                        <span className='basket-delivery__left-rules-text'>
                            торговой площадкой и возврата
                        </span>
                    </label>
                </div>
            </div>
            <div className={`basket-delivery__right ${isDarkTheme ? 'dark-theme' : ''}`}>
                <label 
                    className='basket-delivery__right-text' 
                    htmlFor='city-select'
                >
                    <h3 className='margin-null'>Ваш город</h3>
                </label><br />
                <select 
                    defaultValue={city}
                    onChange={e => setCity(e.target.value)}
                    name='city' 
                    className={`basket-delivery__right-select ${isDarkTheme ? 'dark-theme' : ''} cursor-pointer`} 
                    id='city-select' 
                >
                    <option value='' disabled>Выберите город</option>
                    <option value='astrahan'>Астрахань</option>
                    <option value='barnaul'>Барнаул</option>
                    <option value='voronezh'>Воронеж</option>
                    <option value='volgograd'>Волгоград</option>
                    <option value='izhevsk'>Ижевск</option>
                    <option value='kursk'>Курск</option>
                    <option value='moscow'>Москва</option>
                    <option value='novosibirsk'>Новосибирск</option>
                    <option value='ryazan'>Рязань</option>
                    <option value='ekaterenburg'>Екатеринбург</option>
                    <option value='kazan'>Казань</option>
                    <option value='chelyabinsk'>Челябинск</option>
                    <option value='omsk'>Омск</option>
                    <option value='samara'>Самара</option>
                    <option value='ivanovo'>Иваново</option>
                    <option value='kaliningrad'>Калининград</option>
                    <option value='rostov'>Ростов-на-Дону</option>
                    <option value='ufa'>Уфа</option>
                    <option value='krasnoyarsk'>Красноярск</option>
                    <option value='perm'>Пермь</option>
                    <option value='penza'>Пенза</option>
                    <option value='tambov'>Тамбов</option>
                    <option value='tula'>Тула</option>
                    <option value='habarovsk'>Хабаровск</option>
                    <option value='mahachkala'>Махачкала</option>
                    <option value='orenburg'>Оренбург</option>
                    <option value='cheboksar'>Чебоксары</option>
                    <option value='oryol'>Орел</option>
                    <option value='sochi'>Сочи</option>
                </select>
            </div>           
        </section>
    )
}

export default BasketDelivery