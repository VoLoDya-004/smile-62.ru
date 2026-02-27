import { formatPrice } from '@/shared/utils/formatters'
import type { IOrder, IOrderItem } from '../../types/adminTypes'
import { OrderProductItem } from './OrderProductItem'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import styles from '../AdminPanel.module.scss'
import AdminSearchSelect from '@/shared/widgets/admin/AdminSearchSelect'
import FilterDropdown from '@/shared/widgets/filtersDropdown/FilterDropdown'

interface IOrdersTabProps {
  orders: IOrder[]
  updateOrderStatus: (orderId: number, status: string) => Promise<void> 
  isLoadingOrders: boolean
  hasNextOrders: boolean
  isFetchingNextOrders: boolean
  fetchNextOrders: () => void
  orderSearch: string
  orderSort: 'asc' | 'desc'
  orderDeliveryTypes: string[]
  orderStatuses: string[]
  setOrderSearch: (value: string) => void
  setOrderSort: (value: 'asc' | 'desc') => void
  setOrderDeliveryTypes: (values: string[]) => void
  setOrderStatuses: (values: string[]) => void
}

export const OrdersTab = ({ 
  orders, 
  updateOrderStatus, 
  isLoadingOrders,
  hasNextOrders,
  isFetchingNextOrders,
  fetchNextOrders,
  orderSearch,
  orderSort,
  orderDeliveryTypes,
  orderStatuses,
  setOrderSearch,
  setOrderSort,
  setOrderDeliveryTypes,
  setOrderStatuses
}: IOrdersTabProps) => {
  const {
    'orders-list': ordersList,
    'orders-params-row':paramsRow,
    'orders-filters-row': filtersRow,
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

  const [updatingOrderIds, setUpdatingOrderIds] = useState<number[]>([])
  const [localSearch, setLocalSearch] = useState(orderSearch)

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    setUpdatingOrderIds(prev => [...prev, orderId])
    try {
      await updateOrderStatus(orderId, newStatus)
    } finally {
      setUpdatingOrderIds(prev => prev.filter(id => id !== orderId))
    }
  }

  const { ref: lastOrderRef, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextOrders && !isFetchingNextOrders) {
      fetchNextOrders()
    }
  }, [inView, hasNextOrders, isFetchingNextOrders, fetchNextOrders])

  const handleDeliveryFilter = (type: string, checked: boolean) => {
    const newTypes = checked
      ? [...orderDeliveryTypes, type]
      : orderDeliveryTypes.filter(i => i !== type)
      setOrderDeliveryTypes(newTypes)
  }

  const handleStatusFilter = (status: string, checked: boolean) => {
    const newStatuses = checked
      ? [...orderStatuses, status]
      : orderStatuses.filter(i => i !== status)
    setOrderStatuses(newStatuses)
  }

  return (
    <>
      <div className={paramsRow}>
        <AdminSearchSelect
          searchValue={localSearch}
          onSearchChange={(e) => setLocalSearch(e.target.value)}
          onSearchKeyDown={(e) => e.key === 'Enter' && setOrderSearch(localSearch)}
          onSearchClick={() => setOrderSearch(localSearch)}
          onSearchClear={() => {
            setLocalSearch('')
            setOrderSearch('')
          }}
          searchPlaceholder='Поиск (ID, имя, email, адрес)'
          selectValue={orderSort}
          onSelectChange={(e) => setOrderSort(e.target.value as 'asc' | 'desc')}
          selectOptions={[
            { value: 'desc', label: 'Сначала новые' },
            { value: 'asc', label: 'Сначала старые' }
          ]}
        />
        <div className={filtersRow}>
          <FilterDropdown
            label='Тип доставки'
            options={[
              { value: 'Почта России', label: 'Почта России' },
              { value: 'Самовывоз', label: 'Самовывоз' },
              { value: 'Курьер', label: 'Курьер' }
            ]}
            selectedValues={orderDeliveryTypes}
            onChange={handleDeliveryFilter}
            position='left'
          />
          <FilterDropdown
            label='Статус'
            options={[
              { value: 'accepted', label: 'Принят' },
              { value: 'collected', label: 'Собран' },
              { value: 'completed', label: 'Отправлен' },
              { value: 'cancelled', label: 'Отменен' }
            ]}
            selectedValues={orderStatuses}
            onChange={handleStatusFilter}
            position='right'
          />
        </div>
      </div>
      {isLoadingOrders ? (
        <>
          <h2 className='centered-heading'>Загрузка заказов...</h2>
          <div className='spinner-cards'></div>
        </>
      ) : orders.length === 0 ? (
        <h2 className='centered-heading'>Нет заказов</h2>
      ) : (
        <div className={ordersList}>
          {orders.map((order: IOrder, index) => (
            <article 
              key={order.id} 
              className={orderCard}
              ref={index === orders.length - 1 ? lastOrderRef : null}
            >
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
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  style={{ borderColor: getStatusColor(order.status) }}
                  disabled={updatingOrderIds.includes(order.id)}
                >
                  <option value='accepted'>Принят</option>
                  <option value='collected'>Собран</option>
                  <option value='completed'>Отправлен</option>
                  <option value='cancelled'>Отменен</option>
                </select>
                <span 
                  className={statusBadge}
                  style={{ 
                    backgroundColor: updatingOrderIds.includes(order.id) ? 
                    'gray' : 
                    getStatusColor(order.status) 
                  }}
                >
                  {updatingOrderIds.includes(order.id) ? 
                    'Обновление...' :
                    getStatusText(order.status)
                  }
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
                {order.tracking_number && order.status === 'completed' && (
                  <div>
                    <strong>Трек-номер: </strong>
                    {updatingOrderIds.includes(order.id) ? 'Обновление...' : order.tracking_number}
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
          {isFetchingNextOrders && (
            <>
              <h2 className='centered-heading margin-null'>Загрузка...</h2>
              <div className='spinner-cards'></div>
            </>
          )}
        </div>
      )}
    </>
  )
}