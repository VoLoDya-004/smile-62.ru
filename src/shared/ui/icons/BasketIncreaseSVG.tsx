import styles from '@/features/basket/components/basketComponents/Basket.module.scss'

const BasketIncreaseSVG = () => {
  
  return (
    <svg 
      width='14'
      height='8'
      viewBox='0 0 14 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path className={styles['count-svg']} d='M13 7L7 1L1 7' />
    </svg>
  )
}

export default BasketIncreaseSVG