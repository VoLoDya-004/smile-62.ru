import styles from '@/features/basket/components/basket/Basket.module.scss'

const BasketDecreaseSVG = () => {

  return (
    <svg 
      width='14'
      height='8'
      viewBox='0 0 14 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path className={styles['count-svg']} d='M1 1L7 7L13 1' />
    </svg>
  )
}

export default BasketDecreaseSVG