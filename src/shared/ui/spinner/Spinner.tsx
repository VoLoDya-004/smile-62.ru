import { cx } from '@/shared/utils/classnames'
import styles from './Spinner.module.scss'

export const Spinner = () => (
  <>
    <h2 className={cx(styles.spinner__header, 'centered-heading margin-null')}>Загрузка...</h2>
    <div className={styles.spinner}></div>
  </>
)