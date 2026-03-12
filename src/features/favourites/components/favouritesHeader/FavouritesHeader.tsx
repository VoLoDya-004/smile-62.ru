import styles from './FavouritesHeader.module.scss'

const FavouritesHeader = () => (
  <header className={styles['table-header']}>
    <h4 className='margin-null'>Наименование</h4>
    <h4 className='margin-null'>Стоимость</h4>                                              
  </header>   
)


export default FavouritesHeader