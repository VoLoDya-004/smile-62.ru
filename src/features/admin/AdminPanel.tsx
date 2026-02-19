import { useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '@/shared/store'
import { useAdmin } from './hooks/useAdmin'
import { ProductsTab } from './components/productsTab/ProductsTab'
import { UsersTab } from './components/usersTab/UsersTab'
import { StatsTab } from './components/statsTab/StatsTab'
import { OrdersTab } from './components/ordersTab/OrdersTab'
import styles from './components/AdminPanel.module.scss'

const AdminPanel = () => {
  const {
    'not-admin': notAdmin,
    'admin-container': container,
    'tabs': tabs,
    'tabs__item': tabsItem,
    'tabs__item_active': tabsItemActive,
  } = styles

  const isAdmin = useSelector((state: RootStore) => state.user.isAdmin)
  const [activeTab, setActiveTab] = useState<'orders' | 'stats' | 'users' | 'products'>('orders')
  
  const { 
    orders, 
    users, 
    stats, 
    isLoadingOrders,
    isLoadingStats,
    isLoadingUsers,
    updateOrderStatus,
    addProduct,
    hasNextUsers,
    isFetchingNextUsers,
    fetchNextUsers
  } = useAdmin()

  if (!isAdmin) {
    return (
      <div className={notAdmin}>
        <h2>Доступ запрещен</h2>
        <p>У вас нет прав для доступа к админ-панели</p>
      </div>
    )
  }

  return (
    <>
      <h1 className='visually-hidden'>Панель администратора</h1>
      <div className={container}>      
        <nav className={tabs}>
          <button
            className={`${tabsItem} ${activeTab === 'orders' ? tabsItemActive : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Заказы
          </button>
          <button 
            className={`${tabsItem} ${activeTab === 'stats' ? tabsItemActive : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            Статистика
          </button>
          <button 
            className={`${tabsItem} ${activeTab === 'users' ? tabsItemActive : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Пользователи
          </button>
          <button 
            className={`${tabsItem} ${activeTab === 'products' ? tabsItemActive : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Товары
          </button>
        </nav>

        {activeTab === 'orders' && (
          <OrdersTab 
            orders={orders}
            updateOrderStatus={updateOrderStatus}
            isLoadingOrders={isLoadingOrders}
          />
        )}

        {activeTab === 'stats' && (
          <StatsTab stats={stats} isLoadingStats={isLoadingStats} />
        )}

        {activeTab === 'users' && (
          <UsersTab 
            users={users} 
            isLoadingUsers={isLoadingUsers} 
            hasNextUsers={hasNextUsers}
            isFetchingNextUsers={isFetchingNextUsers}
            fetchNextUsers={fetchNextUsers}
          />
        )}

        {activeTab === 'products' && (
          <ProductsTab addProduct={addProduct} />
        )}
      </div>
    </>
  )
}

export default AdminPanel