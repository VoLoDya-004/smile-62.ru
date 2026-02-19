import { formatPrice } from '@/shared/utils/formatters'
import type { IUser } from '../../types/adminTypes'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import styles from '../AdminPanel.module.scss'

interface IUsersTabProps {
  users: IUser[]
  isLoadingUsers: boolean
  hasNextUsers: boolean
  isFetchingNextUsers: boolean
  fetchNextUsers: () => void
}

export const UsersTab = ({ 
  users, 
  isLoadingUsers, 
  hasNextUsers, 
  isFetchingNextUsers,
  fetchNextUsers
}: IUsersTabProps) => {
  const {
    'users-tab': usersTab,
    'users-table': usersTable,
    'admin-badge': adminBadge,
    'admin-badge_active': adminBadgeActive,
    'admin-badge_passive': adminBadgePassive
  } = styles

  const { ref: lastUserRef, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextUsers && !isFetchingNextUsers) {
      fetchNextUsers()
    }
  }, [inView, hasNextUsers, isFetchingNextUsers, fetchNextUsers])

  return (
    <>
      <div className={usersTab}>          
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