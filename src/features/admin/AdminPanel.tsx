import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '@/shared/store'
import { useAdmin } from './hooks/useAdmin'
import { ProductsTab } from './components/productsTab/ProductsTab'
import { UsersTab } from './components/usersTab/UsersTab'
import { StatsTab } from './components/statsTab/StatsTab'
import { OrdersTab } from './components/ordersTab/OrdersTab'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import type { IStats, TAdminSelect } from './types/adminTypes'
import styles from './AdminPanel.module.scss'
import Head from 'next/head'

interface IAdminPanelProps {
  isAdmin: boolean
  initialStats?: IStats | null
}

const AdminPanel = ({ isAdmin: isAdminProp, initialStats }: IAdminPanelProps) => {
  const {
    'not-admin': notAdmin,
    'admin-container': container,
    'tabs': tabs,
    'tabs__item': tabsItem,
    'tabs__item_active': tabsItemActive,
  } = styles

  const isAdminRedux = useSelector((state: RootStore) => state.user.isAdmin)
  const isAdmin = isAdminProp || isAdminRedux

  const searchParams = useSearchParams()
  const router = useRouter()

  const userSearch = searchParams?.get('search') || ''
  const userFilter = (searchParams?.get('filter') as TAdminSelect) || 'all'
  const orderSearch = searchParams?.get('orderSearch') || ''
  const orderSort = (searchParams?.get('orderSort') as 'asc' | 'desc') || 'desc'
  const orderDeliveryParam = searchParams?.get('orderDelivery') || ''
  const orderStatusParam = searchParams?.get('orderStatus') || ''
  const productSearch = searchParams?.get('productSearch') || ''
  const productCategory = searchParams?.get('productCategory') ? 
    Number(searchParams.get('productCategory')) : 0
  const productMinPrice = searchParams?.get('productMinPrice') ? 
    Number(searchParams.get('productMinPrice')) : undefined
  const productMaxPrice = searchParams?.get('productMaxPrice') ? 
    Number(searchParams.get('productMaxPrice')) : undefined

  const orderDeliveryTypes = orderDeliveryParam ? orderDeliveryParam.split(',') : []
  const orderStatuses = orderStatusParam ? orderStatusParam.split(',') : []

  const [activeTab, setActiveTab] = useState<'orders' | 'stats' | 'users' | 'products'>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('tabAdmin')
      if (saved === 'orders' || saved === 'stats' || saved === 'users' || saved === 'products') {
        return saved
      }
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
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('tabAdmin', activeTab)
    }
  }, [activeTab])

  const updateUrlParams = (params: Record<string, string | number | null | undefined>) => {
    const newParams = new URLSearchParams(searchParams?.toString() || '')
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '' && value !== 0) {
        newParams.set(key, String(value))
      } else {
        newParams.delete(key)
      }
    })
    
    router.push(`?${newParams.toString()}`, { scroll: false })
  }

  const setUserSearch = (value: string) => {
    updateUrlParams({ search: value || null })
  }

  const setUserFilter = (value: 'all'|'admin'|'not_admin') => {
    updateUrlParams({ filter: value === 'all' ? null : value })
  }

  const setOrderSearch = (value: string) => {
    updateUrlParams({ orderSearch: value || null })
  }

  const setOrderSort = (value: 'asc' | 'desc') => {
    updateUrlParams({ orderSort: value === 'desc' ? null : value })
  }

  const setOrderDeliveryTypes = (values: string[]) => {
    updateUrlParams({ orderDelivery: values.length ? values.join(',') : null })
  }

  const setOrderStatuses = (values: string[]) => {
    updateUrlParams({ orderStatus: values.length ? values.join(',') : null })
  }

  const handleApplyProductFilters = (filters: { 
    search: string, 
    categoryId: number, 
    minPrice?: number,
    maxPrice?: number 
  }) => {
    updateUrlParams({
      productSearch: filters.search || null,
      productCategory: filters.categoryId || null,
      productMinPrice: filters.minPrice,
      productMaxPrice: filters.maxPrice
    })
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
      <Head>
        <title>Админ-панель | Smile</title>
        <meta name='description' content='Управление магазином Smile' />
      </Head>
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

        {activeTab === 'stats' && (
          <StatsTab 
            stats={stats} 
            isLoadingStats={isLoadingStats} 
            initialStats={initialStats}
          />
        )}

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