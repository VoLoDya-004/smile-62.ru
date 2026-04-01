import { formatDate, formatPrice } from '@/shared/utils/formatters'
import type { ITransaction } from '../../types/profileTypes'
import styles from './Transactions.module.scss'
import { Spinner } from '@/shared/ui/spinner/Spinner'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

interface ITransactionsHistoryProps {
  transactions: ITransaction[]
  isTransactionsLoading: boolean
  isFetchingNextTransactions: boolean
  hasNextTransactions: boolean
  fetchNextTransactions: () => void
}

const TransactionsHistory = ({ 
  transactions, 
  isTransactionsLoading,
  isFetchingNextTransactions,
  hasNextTransactions,
  fetchNextTransactions
}: ITransactionsHistoryProps) => {
  const { 
    'transactions-list': transactionsList,
    'transaction-item': transactionsItem,
    'transaction-item__type': transactionsItemType,
    'transaction-item__date': transactionsItemDate,
  } = styles

  const { ref: lastTransactionRef, inView  } = useInView()

  const validTransactions = transactions?.filter(item => item && typeof item === 'object') || []

  useEffect(() => {
    if (inView && hasNextTransactions && !isFetchingNextTransactions) {
      fetchNextTransactions()
    }
  }, [inView, hasNextTransactions, isFetchingNextTransactions, fetchNextTransactions])

  if (isTransactionsLoading) return <Spinner />
  if (!validTransactions.length) return <h2 className='centered-heading'>История операций пуста</h2>

  return (
    <>
      <h2 className='centered-heading'>История операций</h2>
      <section>
        <div className={transactionsList}>
          {validTransactions.map((item, index) => (
            <div 
              key={item.id} 
              className={transactionsItem} 
              ref={index === validTransactions.length - 1 ? lastTransactionRef : null}
            >
              <div className={transactionsItemType}>
                {item.type === 'deposit' ? 'Пополнение' : 'Оплата заказа'}
              </div>
              <div className={transactionsItemDate}>{formatDate(item.created_at)}</div>
              <div>{item.description}</div>
              <div>{item.type === 'deposit' ? '+' : '-'}{formatPrice(item.amount)} ₽</div>
            </div>
          ))}
        </div>
      </section>
      {isFetchingNextTransactions && <Spinner />}
    </>
  )
}

export default TransactionsHistory