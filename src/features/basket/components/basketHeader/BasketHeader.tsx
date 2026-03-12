import styles from './BasketHeader.module.scss'

const BasketHeader = () => (
  <header className={styles['table-header']}>
    <h4 className='margin-null'>Наименование</h4>
    <h4 className='margin-null'>Количество</h4>
    <h4 className='margin-null'>Стоимость</h4>                                              
  </header>                 
)

export default BasketHeader