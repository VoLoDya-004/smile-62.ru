import { cx } from '@/shared/utils/classnames'
import styles from './Backdrop.module.scss'
import { useBodyScrollLock } from '@/shared/hooks'

interface IBackdropProps {
  isActive: boolean
}

const Backdrop = ({ isActive }: IBackdropProps) => {
  const {
    'backdrop': backdrop,
    'backdrop_active': backdropActive
  } = styles

  useBodyScrollLock(isActive)

  if (!isActive) return null

  return (
    <div id='blackout' className={cx(backdrop, isActive && backdropActive)} aria-hidden='true' />
  )
}

export default Backdrop