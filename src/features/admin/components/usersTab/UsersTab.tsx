import { formatPrice } from '@/shared/utils/formatters'
import type { IUser, TAdminSelect } from '../../types/adminTypes'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '@/shared/store'
import { cx } from '@/shared/utils/classnames'
import { useDragScroll } from '@/shared/hooks/shared/useDragScroll'
import styles from '../AdminPanel.module.scss'
import Search from '@/shared/widgets/search/Search'

interface IUsersTabProps {
  users: IUser[]
  isLoadingUsers: boolean
  hasNextUsers: boolean
  isFetchingNextUsers: boolean
  fetchNextUsers: () => void
  onToggleAdmin: (userId: number, currentIsAdmin: boolean) => void
  userSearch: string
  setUserSearch: (value: string) => void
  userFilter: TAdminSelect
  setUserFilter: (value: TAdminSelect) => void
}

export const UsersTab = ({ 
  users, 
  isLoadingUsers, 
  hasNextUsers, 
  isFetchingNextUsers,
  fetchNextUsers,
  onToggleAdmin,
  userSearch,
  setUserSearch,
  userFilter,
  setUserFilter
}: IUsersTabProps) => {
  const {
    'users-tab': usersTab,
    'users-table': usersTable,
    'users-params': usersParams,
    'search-wrapper': searchWrapper,
    'users-params__filters': usersFilters,
    'admin-badge': adminBadge,
    'admin-badge_active': adminBadgeActive,
    'admin-badge_passive': adminBadgePassive,
    'admin-button': AdminButton,
    'admin-button_disabled': AdminButtonDisabled
  } = styles

  const { containerRef, dragHandlers } = useDragScroll()

  const userId = useSelector((state: RootStore) => state.user.userId)

  const { ref: lastUserRef, inView } = useInView()

  const [updatingUserId, setUpdatingUserId] = useState<number | null>(null)
  const [localSearch, setLocalSearch] = useState(userSearch)

  useEffect(() => {
    setLocalSearch(userSearch)
  }, [userSearch])

  const handleApplySearch = () => {
    setUserSearch(localSearch)
  }

  const handleToggleAdmin = async (userId: number, makeAdmin: boolean) => {
    setUpdatingUserId(userId)
    try {
      await onToggleAdmin(userId, makeAdmin)
    } finally {
      setUpdatingUserId(null)
    }
  }

  useEffect(() => {
    if (inView && hasNextUsers && !isFetchingNextUsers) {
      fetchNextUsers()
    }
  }, [inView, hasNextUsers, isFetchingNextUsers, fetchNextUsers])

  return (
    <>
      <div className={usersParams}>
        <div className={searchWrapper}>
          <Search 
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleApplySearch()}
            onSearchClick={handleApplySearch}
            onClear={() => {
              setLocalSearch('')
              setUserSearch('')
            }}
            placeholder='Поиск по ID, имени или email'
            className='padding-null'
          />
        </div>
        <select
          id='users-select'
          className={usersFilters}
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value as TAdminSelect)}
        >
          <option value='all'>Все пользователи</option>
          <option value='admin'>Только админы</option>
          <option value='not_admin'>Только не админы</option>
        </select>
      </div>  
      <div className={usersTab} ref={containerRef} {...dragHandlers}>   
        {isLoadingUsers ? (
          <>
            <h2 className='centered-heading'>Загрузка пользователей...</h2>
            <div className='spinner-cards'></div>
          </>
        ) : users.length === 0 ? (
          <h2 className='centered-heading'>Нет пользователей</h2>
        ) : (
          <table className={usersTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Email</th>
                <th>Админ</th>
                <th>Заказов</th>
                <th>Баланс</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: IUser, index) => (
                <tr 
                  key={user.id_user} 
                  ref={index === users.length - 1 ? lastUserRef : null}
                >
                  <td>{user.id_user}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`
                        ${adminBadge} 
                        ${user.is_admin == 1 ? adminBadgeActive : adminBadgePassive}
                    `}>
                      {user.is_admin == 1 ? 'Да' : 'Нет'}
                    </span>
                  </td>
                  <td>{user.orders_count || 0}</td>
                  <td>
                    {user.balance ? `${formatPrice(parseFloat(user.balance))} ₽` : '0 ₽'}
                  </td>
                  <td>
                    <button
                      className={cx(
                        'button-reset', 
                        AdminButton, 
                        user.id_user === userId || updatingUserId === user.id_user ? 
                        AdminButtonDisabled : '' 
                      )}
                      onClick={() => handleToggleAdmin(user.id_user, user.is_admin != 1)}
                      disabled={user.id_user === userId || updatingUserId === user.id_user}
                    >
                      {
                        updatingUserId === user.id_user ?
                        'Загрузка...' :
                        user.id_user === userId ? 
                        'Это вы' :
                        user.is_admin == 1 ? 
                        'Снять админa' : 
                        'Сделать админом'
                      }
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {isFetchingNextUsers && (
        <>
          <h2 className='centered-heading'>Загрузка...</h2>
          <div className='spinner-cards'></div>
        </>
      )}
    </>
  )
}