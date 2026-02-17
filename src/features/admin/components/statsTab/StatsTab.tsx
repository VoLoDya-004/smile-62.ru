import { formatPrice } from '@/shared/utils/formatters'
import type { IStats } from '../../types/adminTypes'
import styles from '../AdminPanel.module.scss'

interface IStatsTabProps {
  stats: IStats
  isLoadingStats: boolean
}

export const StatsTab = ({ stats, isLoadingStats }: IStatsTabProps) => {
  const {
    'stats-grid': statsGrid,
    'stat-card': statCard,
    'stat-card__number': statNumber,
    'status-stats': statusStats,
    'status-list': statusList,
    'status-item': statusItem,
    'status-item__name': statusName,
    'status-item__count': statusCount
  } = styles

  return (
    <>          
      {isLoadingStats ? (
        <>
          <h2 className='centered-heading'>Загрузка статистики...</h2>
          <div className='spinner-cards'></div>
        </>
      ) : stats ? (
        <>
          <section className={statsGrid}>
            <article  className={statCard}>
              <h3>Всего заказов</h3>
              <p className={statNumber}>{stats.totalOrders}</p>
            </article >

            <article  className={statCard}>
              <h3>Общая выручка</h3>
              <p className={statNumber}>{formatPrice(stats.totalRevenue)} ₽</p>
            </article >

            <article  className={statCard}>
              <h3>Новых заказов (7 дней)</h3>
              <p className={statNumber}>{stats.recentOrders}</p>
            </article >

            <article  className={statCard}>
              <h3>Пользователей</h3>
              <p className={statNumber}>{stats.usersCount}</p>
            </article >
          </section>

          <section className={statusStats}>
            <h3>Заказы по статусам</h3>
            <div className={statusList} role='list'>
              <div className={statusItem} role='listitem'>
                <span className={statusName}>Приняты</span>
                <span className={statusCount}>{stats.statusStats['accepted'] || 0}</span>
              </div>
              <div className={statusItem} role='listitem'>
                <span className={statusName}>Собраны</span>
                <span className={statusCount}>{stats.statusStats['collected'] || 0}</span>
              </div>
              <div className={statusItem} role='listitem'>
                <span className={statusName}>Отправлены</span>
                <span className={statusCount}>{stats.statusStats['completed'] || 0}</span>
              </div>
              <div className={statusItem} role='listitem'>
                <span className={statusName}>Отменены</span>
                <span className={statusCount}>{stats.statusStats['cancelled'] || 0}</span>
              </div>
            </div>
          </section>
        </>
      ) : (
        <h2 className='centered-heading'>Нет данных статистики</h2>
      )}
    </>
  )
}