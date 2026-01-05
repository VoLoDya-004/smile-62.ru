import { useEffect } from 'react'
import { cx } from '@/shared/utils/classnames'
import styles from './Backdrop.module.scss'

interface IBackdropProps {
  isActive: boolean
}

const Backdrop = ({ isActive }: IBackdropProps) => {
  const {
    'backdrop': backdrop,
    'backdrop_active': backdropActive
  } = styles

  useEffect(() => {
    if (isActive) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }

    return () => document.body.classList.remove('modal-open')
  }, [isActive])

  if (!isActive) return null

  return (
    <div id='blackout' className={cx(backdrop, isActive && backdropActive)} aria-hidden='true' />
  )
}

export default Backdrop