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
import { useForm, type FieldErrors, type UseFormRegister, type UseFormRegisterReturn } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { deliverySchema, type TDeliveryFormData } from '../../types/deliverySchema'

const OrderSummary = ({ 
  total,
  deliveryCost,
  handleOrderProducts,
  registerAcceptRules,
  balance,
  totalWithDelivery,
  isCreatingOrder,
  errorAcceptRules
}: { 
  total: IBasketTotal
  deliveryCost: number
  handleOrderProducts: () => Promise<void>
  registerAcceptRules: UseFormRegisterReturn
  balance: number
  totalWithDelivery: number
  isCreatingOrder: boolean
  errorAcceptRules?: string
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
            className='cursor-pointer margin-checkbox'
            {...registerAcceptRules}
          />
          Соглашаюсь с <a href='' className={orderRules}> правилами </a> пользования <br /> 
          торговой площадкой и возврата
        </label>
        {errorAcceptRules && <span className='error-message'>{errorAcceptRules}</span>}
      </div>
    </section>
  )
}

const MethodSelection = ({ 
  isLoadingDeliveryMethods,
  deliveryMethods,
  register,
  errors
}: { 
  isLoadingDeliveryMethods: boolean
  deliveryMethods: IDeliveryMethod[]
  register: UseFormRegister<TDeliveryFormData>
  errors: FieldErrors<TDeliveryFormData> 
}) => {
  const {
    'delivery__method': deliveryMethod,
    'delivery__method-height': deliveryHeight,
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
          <div className={deliveryHeight}>
            <select 
              id='delivery-method-select'
              {...register('selectedDeliveryMethod')}
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
            {errors.selectedDeliveryMethod && (
              <span className='error-message'>{errors.selectedDeliveryMethod.message}</span>
            )}
          </div>
        </>
      ) : (<div>Нет доступных способов доставки</div>)}
      
      <div>
        <label className={deliveryMethodTitle}>
          <h3>Адрес доставки</h3>
        </label>
        <div className={deliveryHeight}>
          <textarea
            {...register('deliveryAddress')}
            placeholder='Введите полный адрес доставки'
            className={deliveryMethodTextarea}
          />
          {errors.deliveryAddress && (
            <span className='error-message'>{errors.deliveryAddress.message}</span>
          )}
        </div>
      </div>

      <div>
        <label className={deliveryMethodTitle}>
          <h3>Комментарий к заказу</h3>
        </label>
        <div className={deliveryHeight}>
          <textarea
            {...register('customerNotes')}
            placeholder='Дополнительные пожелания (необязательно)'
            className={deliveryMethodTextarea}
          />
          {errors.customerNotes && (
            <span className='error-message'>{errors.customerNotes.message}</span>
          )}
        </div>
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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<TDeliveryFormData>({
    resolver: yupResolver(deliverySchema),
    defaultValues: {
      deliveryAddress: '',
      selectedDeliveryMethod: '',
      customerNotes: '',
      acceptRules: false,
    }
  })

  const selectedDeliveryMethod = watch('selectedDeliveryMethod')

  const total = cartBasket.reduce((acc: IBasketTotal, item: IBasket) => {
    const count = Number(item.count)
    const price = Number(item.price_sale) || 0

    acc.count += (isNaN(count) || count <= 0) ? 0 : count
    acc.price += price * count

    return acc
  }, { count: 0, price: 0 })

  const selectedMethod = deliveryMethods.find(
    (method: IDeliveryMethod) => String(method.id) === selectedDeliveryMethod
  )
  const deliveryCost = selectedMethod ? parseFloat(selectedMethod.cost) : 0
  const totalWithDelivery = total.price + deliveryCost

  const onSubmit = async (data: TDeliveryFormData) => {
    if (balance < total.price) {
      showNotification('Недостаточно средств на балансе', 'error')
      return
    }

    const res = await createOrder({
      deliveryAddress: data.deliveryAddress,
      deliveryMethodId: Number(data.selectedDeliveryMethod),
      customerNotes: data.customerNotes
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
          handleOrderProducts={handleSubmit(onSubmit)}
          registerAcceptRules={register('acceptRules')}
          balance={balance}
          totalWithDelivery={totalWithDelivery}
          isCreatingOrder={isCreatingOrder}
          errorAcceptRules={errors.acceptRules?.message}
        />
        <MethodSelection
          isLoadingDeliveryMethods={isLoadingDeliveryMethods}
          deliveryMethods={deliveryMethods}
          register={register}
          errors={errors}
        />
      </section>
    </>
  )
}

export default Delivery