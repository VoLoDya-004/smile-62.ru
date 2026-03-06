import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '@/shared/store'
import { useAdmin } from './hooks/useAdmin'
import { ProductsTab } from './components/productsTab/ProductsTab'
import { UsersTab } from './components/usersTab/UsersTab'
import { StatsTab } from './components/statsTab/StatsTab'
import { OrdersTab } from './components/ordersTab/OrdersTab'
import { useSearchParams } from 'react-router-dom'
import type { TAdminSelect } from './types/adminTypes'
import styles from './components/AdminPanel.module.scss'
import { Helmet } from 'react-helmet-async'

const AdminPanel = () => {
  const {
    'not-admin': notAdmin,
    'admin-container': container,
    'tabs': tabs,
    'tabs__item': tabsItem,
    'tabs__item_active': tabsItemActive,
  } = styles

  const isAdmin = useSelector((state: RootStore) => state.user.isAdmin)

  const [searchParams, setSearchParams] = useSearchParams()
  const userSearch = searchParams.get('search') || ''
  const userFilter = (searchParams.get('filter') as TAdminSelect) || 'all'
  const orderSearch = searchParams.get('orderSearch') || ''
  const orderSort = (searchParams.get('orderSort') as 'asc' | 'desc') || 'desc'
  const orderDeliveryParam = searchParams.get('orderDelivery') || ''
  const orderStatusParam = searchParams.get('orderStatus') || ''
  const productSearch = searchParams.get('productSearch') || ''
  const productCategory = searchParams.get('productCategory') ? 
    Number(searchParams.get('productCategory')) : 0
  const productMinPrice = searchParams.get('productMinPrice') ? 
    Number(searchParams.get('productMinPrice')) : undefined
  const productMaxPrice = searchParams.get('productMaxPrice') ? 
    Number(searchParams.get('productMaxPrice')) : undefined

  const orderDeliveryTypes = orderDeliveryParam ? orderDeliveryParam.split(',') : []
  const orderStatuses = orderStatusParam ? orderStatusParam.split(',') : []

  const [activeTab, setActiveTab] = useState<'orders' | 'stats' | 'users' | 'products'>(() => {
    const saved = sessionStorage.getItem('tabAdmin')
    if (saved === 'orders' || saved === 'stats' || saved === 'users' || saved === 'products') {
      return saved
    }
    return 'orders'
  })
  
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
    fetchNextUsers,
    hasNextOrders,
    isFetchingNextOrders,
    fetchNextOrders,
    updateUserAdminStatus,
    products,
    isLoadingProducts,
    isLoadingAddProducts,
    isLoadingEditProducts,
    updateProduct,
    deleteProduct,
    hasNextProducts,
    isFetchingNextProducts,
    fetchNextProducts
  } = useAdmin({ 
    userSearch, 
    userFilter,
    orderSearch,
    orderSort,
    orderDeliveryTypes,
    orderStatuses,
    productSearch,
    productCategory,
    productMinPrice,
    productMaxPrice
  })

  useEffect(() => {
    sessionStorage.setItem('tabAdmin', activeTab)
  }, [activeTab])

  const setUserSearch = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) params.set('search', value)
    else params.delete('search')
    setSearchParams(params)
  }

  const setUserFilter = (value: 'all'|'admin'|'not_admin') => {
    const params = new URLSearchParams(searchParams)
    if (value !== 'all') params.set('filter', value)
    else params.delete('filter')
    setSearchParams(params)
  }

  const setOrderSearch = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) params.set('orderSearch', value)
    else params.delete('orderSearch')
    setSearchParams(params)
  }

  const setOrderSort = (value: 'asc' | 'desc') => {
    const params = new URLSearchParams(searchParams)
    if (value !== 'desc') params.set('orderSort', value)
    else params.delete('orderSort')
    setSearchParams(params)
  }

  const setOrderDeliveryTypes = (values: string[]) => {
    const params = new URLSearchParams(searchParams)
    if (values.length) params.set('orderDelivery', values.join(','))
    else params.delete('orderDelivery')
    setSearchParams(params)
  }

  const setOrderStatuses = (values: string[]) => {
    const params = new URLSearchParams(searchParams)
    if (values.length) params.set('orderStatus', values.join(','))
    else params.delete('orderStatus')
    setSearchParams(params)
  }

  const handleApplyProductFilters = (filters: { 
    search: string, 
    categoryId: number, 
    minPrice?: number,
    maxPrice?: number 
  }) => {
    const params = new URLSearchParams(searchParams)
    if (filters.search) params.set('productSearch', filters.search)
    else params.delete('productSearch')
    if (filters.categoryId) params.set('productCategory', filters.categoryId.toString())
    else params.delete('productCategory')
    if (filters.minPrice !== undefined) params.set('productMinPrice', filters.minPrice.toString())
    else params.delete('productMinPrice')
    if (filters.maxPrice !== undefined) params.set('productMaxPrice', filters.maxPrice.toString())
    else params.delete('productMaxPrice')
    setSearchParams(params)
  }

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
      <Helmet>
        <title>Админ-панель | Smile</title>
        <meta name='description' content='Управление магазином Smile' />
      </Helmet>
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
            hasNextOrders={hasNextOrders}
            isFetchingNextOrders={isFetchingNextOrders}
            fetchNextOrders={fetchNextOrders}
            orderSearch={orderSearch}
            orderSort={orderSort}
            orderDeliveryTypes={orderDeliveryTypes}
            orderStatuses={orderStatuses}
            setOrderSearch={setOrderSearch}
            setOrderSort={setOrderSort}
            setOrderDeliveryTypes={setOrderDeliveryTypes}
            setOrderStatuses={setOrderStatuses}
          />
        )}

        {activeTab === 'stats' && <StatsTab stats={stats} isLoadingStats={isLoadingStats} />}

        {activeTab === 'users' && (
          <UsersTab 
            users={users} 
            isLoadingUsers={isLoadingUsers} 
            hasNextUsers={hasNextUsers}
            isFetchingNextUsers={isFetchingNextUsers}
            fetchNextUsers={fetchNextUsers}
            onToggleAdmin={updateUserAdminStatus}
            userSearch={userSearch}
            setUserSearch={setUserSearch}
            userFilter={userFilter}
            setUserFilter={setUserFilter}
          />
        )}

        {activeTab === 'products' && (
          <ProductsTab
            addProduct={addProduct} 
            updateProduct={updateProduct}
            deleteProduct={deleteProduct}
            products={products}
            isLoadingProducts={isLoadingProducts}
            hasNextProducts={hasNextProducts}
            isFetchingNextProducts={isFetchingNextProducts}
            fetchNextProducts={fetchNextProducts}
            productSearch={productSearch}
            productCategory={productCategory}
            productMinPrice={productMinPrice}
            productMaxPrice={productMaxPrice}
            onApplyFilters={handleApplyProductFilters}
            isLoadingAddProducts={isLoadingAddProducts}
            isLoadingEditProducts={isLoadingEditProducts}
          />
        )}
      </div>
    </>
  )
}

export default AdminPanel