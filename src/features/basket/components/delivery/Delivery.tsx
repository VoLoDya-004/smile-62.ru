import { useState } from 'react'
import { cx } from '@/shared/utils/classnames'
import { useBasket } from '../../hooks/useBasket'
import { useUIContextNotification } from '@/shared/providers/UIProvider'
import { formatPrice } from '@/shared/utils/formatters'
import type { IBasket, IBasketTotal } from '../../types/basketTypes'
import type { IDeliveryMethod } from '../../types/deliveryTypes'
import { useWallet } from '@/features/profile/hooks/useWallet'
import { useOrders } from '../../hooks/useOrders'
import Button from '@/shared/ui/buttons/Button'
import styles from './Delivery.module.scss'

const OrderSummary = ({ 
  total,
  deliveryCost,
  handleOrderProducts,
  acceptRules,
  setAcceptRules,
  balance,
  totalWithDelivery,
  isCreatingOrder
}: { 
  total: IBasketTotal
  deliveryCost: number
  handleOrderProducts: () => Promise<void>
  acceptRules: boolean
  setAcceptRules: (value: boolean) => void
  balance: number
  totalWithDelivery: number
  isCreatingOrder: boolean
}) => {
  const {
    'delivery__order': order,
    'delivery__order-title': orderTitle,
    'delivery__order-btn': orderButton,
    'delivery__order-checkbox': orderChecbox,
    'delivery__order-rules': orderRules
  } = styles

  return (
    <section className={order}>
      <div className={orderTitle}>
        <span className='text-nowrap'><b>Всего товаров:</b> {total.count} шт.</span>
      </div>

      <div className={orderTitle}>
        <b>Итого: </b> 
        <span className='text-nowrap'>{formatPrice(total.price)} ₽</span>
      </div>

      <div className={orderTitle}> 
        <b>Доставка: </b> 
        <span className='text-nowrap'>{formatPrice(deliveryCost)} ₽</span>
      </div>
      
      <div className={orderTitle}>
        <b>Итого с доставкой: </b> 
        <span className='text-nowrap'>{formatPrice(totalWithDelivery)} ₽</span>
      </div>
      
      <div className={orderTitle}>
        <b>Ваш баланс: </b>
        <span className='text-nowrap'>{formatPrice(balance)} ₽</span>
      </div>

      {balance < totalWithDelivery && (
        <div className='text-red'>Недостаточно средств. Пополните баланс.</div>
      )}

      <div className={orderButton}>
        <Button 
          className={cx(isCreatingOrder ? 'button-violet button-violet_disabled' : 'button-violet')} 
          onClick={handleOrderProducts}
          disabled={isCreatingOrder}
        >
          {isCreatingOrder ? 'Оформляем заказ...' : 'Заказать'}
        </Button>
      </div>

      <div className={orderChecbox}>
        <label htmlFor='accept-rules' className='cursor-pointer'>
          <input 
            type='checkbox' 
            id='accept-rules' 
            name='acceptRules'
            className='cursor-pointer margin-checkbox'
            checked={acceptRules}
            onChange={(e) => setAcceptRules(e.target.checked)}
          />
          Соглашаюсь с <a href='' className={orderRules}> правилами </a> пользования <br /> 
          торговой площадкой и возврата
        </label>
      </div>
    </section>
  )
}

const MethodSelection = ({ 
  isLoadingDeliveryMethods,
  deliveryMethods,
  selectedDeliveryMethod,
  setSelectedDeliveryMethod,
  deliveryAddress,
  setDeliveryAddress,
  customerNotes,
  setCustomerNotes
}: { 
  isLoadingDeliveryMethods: boolean
  deliveryMethods: IDeliveryMethod[]
  selectedDeliveryMethod: number | null
  setSelectedDeliveryMethod: (id: number) => void
  deliveryAddress: string
  setDeliveryAddress: (address: string) => void
  customerNotes: string
  setCustomerNotes: (notes: string) => void
}) => {
  const {
    'delivery__method': deliveryMethod,
    'delivery__method-title': deliveryMethodTitle,
    'delivery__method-select': deliveryMethodSelect,
    'delivery__method-textarea': deliveryMethodTextarea
  } = styles

  return (
    <section className={deliveryMethod}>
      {isLoadingDeliveryMethods ? (
        <div>Загрузка способов доставки...</div>
      ) : deliveryMethods.length > 0 ? (
        <>
          <label className={deliveryMethodTitle} htmlFor='delivery-method-select'>
            <h3 className='margin-null'>Способ доставки</h3>
          </label>
          <select 
            id='delivery-method-select'
            value={selectedDeliveryMethod || ''}
            onChange={(e) => setSelectedDeliveryMethod(Number(e.target.value))}
            className={cx(deliveryMethodSelect, 'cursor-pointer')} 
          >
            <option value='' disabled>Выберите способ доставки</option>
            {deliveryMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name} - {formatPrice(parseFloat(method.cost))} ₽ 
                (доставка за {method.estimated_days} дн.)
              </option>
            ))}
          </select>
        </>
      ) : (<div>Нет доступных способов доставки</div>)}
      
      <div>
        <label className={deliveryMethodTitle}>
          <h3>Адрес доставки</h3>
        </label>
        <textarea
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          placeholder='Введите полный адрес доставки'
          className={deliveryMethodTextarea}
        />
      </div>

      <div>
        <label className={deliveryMethodTitle}>
          <h3>Комментарий к заказу</h3>
        </label>
        <textarea
          value={customerNotes}
          onChange={(e) => setCustomerNotes(e.target.value)}
          placeholder='Дополнительные пожелания (необязательно)'
          className={deliveryMethodTextarea}
        />
      </div>
    </section>
  )
}

const Delivery = () => {
  const {
    'delivery': sectionDelivery,
    'delivery__label': label
  } = styles

  const { showNotification } = useUIContextNotification()
  let { cartBasket } = useBasket()
  const { balance } = useWallet()
  const { deliveryMethods, isLoadingDeliveryMethods, createOrder, isCreatingOrder } = useOrders()

  cartBasket = cartBasket.filter((item: IBasket) => item.id > 0)

  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [customerNotes, setCustomerNotes] = useState('')
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<number | null>(null)
  const [acceptRules, setAcceptRules] = useState(false)

  const total = cartBasket.reduce((acc: IBasketTotal, item: IBasket) => {
    const count = Number(item.count)
    const price = Number(item.price_sale) || 0

    acc.count += (isNaN(count) || count <= 0) ? 0 : count
    acc.price += price * count

    return acc
  }, { count: 0, price: 0 })

  const selectedMethod = deliveryMethods.find(
    (method: IDeliveryMethod) => Number(method.id) === selectedDeliveryMethod
  )
  const deliveryCost = selectedMethod ? parseFloat(selectedMethod.cost) : 0
  const totalWithDelivery = total.price + deliveryCost

  const handleOrderProducts = async () => {
    if (!deliveryAddress.trim()) {
      showNotification('Введите адрес доставки', 'error')
      return
    }
    
    if (!selectedDeliveryMethod) {
      showNotification('Выберите способ доставки', 'error')
      return
    }
    
    if (!acceptRules) {
      showNotification('Подтвердите согласие с правилами', 'error')
      return
    }
    
    if (balance < total.price) {
      showNotification('Недостаточно средств на балансе', 'error')
      return
    }

    const res = await createOrder({
      deliveryAddress,
      deliveryMethodId: selectedDeliveryMethod,
      customerNotes
    })

    if (res.success) {
      showNotification('Заказ успешно создан', 'success')
    }
  }

  return (
    <>
      <h2 className={label}>Доставка</h2>
      <section className={sectionDelivery}>
        <OrderSummary 
          total={total} 
          deliveryCost={deliveryCost}
          handleOrderProducts={handleOrderProducts}
          acceptRules={acceptRules}
          setAcceptRules={setAcceptRules}
          balance={balance}
          totalWithDelivery={totalWithDelivery}
          isCreatingOrder={isCreatingOrder}
        />
        <MethodSelection
          isLoadingDeliveryMethods={isLoadingDeliveryMethods}
          deliveryMethods={deliveryMethods}
          selectedDeliveryMethod={selectedDeliveryMethod}
          setSelectedDeliveryMethod={setSelectedDeliveryMethod}
          deliveryAddress={deliveryAddress}
          setDeliveryAddress={setDeliveryAddress}
          customerNotes={customerNotes}
          setCustomerNotes={setCustomerNotes}
        />
      </section>
    </>
  )
}

export default Delivery