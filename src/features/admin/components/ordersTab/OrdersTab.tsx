import { formatPrice } from '@/shared/utils/formatters'
import type { IOrder, IOrderItem } from '../../types/adminTypes'
import { OrderProductItem } from './OrderProductItem'
import styles from '../AdminPanel.module.scss'

interface IOrdersTabProps {
  orders: IOrder[]
  updateOrderStatus: (orderId: number, status: string) => void
  isLoadingOrders: boolean
  isUpdatingOrder: boolean
}

export const OrdersTab = ({ 
  orders, 
  updateOrderStatus, 
  isLoadingOrders, 
  isUpdatingOrder 
}: IOrdersTabProps) => {
  const {
    'orders-list': ordersList,
    'order-card': orderCard,
    'order-card-header': orderHeader,
    'order-card-header__id': orderId,
    'order-card-header__date': orderDate,
    'order-card-header__user': orderUser,
    'status-section': statusSection,
    'status-section__badge': statusBadge,
    'order-info': orderInfo,
    'order-items': orderItems
  } = styles
  
  const getStatusText = (status: string) => {
    switch(status) {
      case 'accepted': return 'Принят'
      case 'collected': return 'Собран'
      case 'completed': return 'Отправлен'
      case 'cancelled': return 'Отменен'
      default: return status
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'accepted': return 'orange'
      case 'collected': return 'blue'
      case 'completed': return 'green'
      case 'cancelled': return 'red'
      default: return 'gray'
    }
  }

  return (
    <>
      {isLoadingOrders ? (
        <>
          <h2 className='centered-heading'>Загрузка заказов...</h2>
          <div className='spinner-cards'></div>
        </>
      ) : orders.length === 0 ? (
        <h2 className='centered-heading'>Нет заказов</h2>
      ) : (
        <div className={ordersList}>
          {orders.map((order: IOrder) => (
            <article key={order.id} className={orderCard}>
              <header className={orderHeader}>
                <div>
                  <div className={orderId}>Заказ №{order.id}</div>
                  <div className={orderDate}>{order.created_at}</div>
                </div>
                <div className={orderUser}>
                  {order.user_name} ({order.user_email})
                </div>
              </header>

              <div className={statusSection}>
                <span>Статус: </span>
                <select 
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  style={{ borderColor: getStatusColor(order.status) }}
                  disabled={isUpdatingOrder}
                >
                  <option value='accepted'>Принят</option>
                  <option value='collected'>Собран</option>
                  <option value='completed'>Отправлен</option>
                  <option value='cancelled'>Отменен</option>
                </select>
                <span 
                  className={statusBadge}
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {getStatusText(order.status)}
                </span>
              </div>

              <div className={orderInfo}>
                <div>
                  <strong>Сумма: </strong>{formatPrice(parseFloat(order.total_amount))} ₽
                </div>
                <div>
                  <strong>Доставка: </strong> 
                  {order.delivery_type} ({formatPrice(parseFloat(order.delivery_cost))} ₽)
                </div>
                <div>
                  <strong>Адрес: </strong>{order.delivery_address}
                </div>
                {order.customer_notes && (
                  <div>
                    <strong>Комментарий: </strong>{order.customer_notes}
                  </div>
                )}
              </div>

              <div className={orderItems}>
                <h4 className='text-center'>Товары в заказе</h4>
                {order.items && order.items.map((item: IOrderItem) => (
                  <OrderProductItem key={item.id} item={item} />
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  )
}