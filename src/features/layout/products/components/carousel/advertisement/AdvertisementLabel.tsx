import { memo } from 'react'
import { useUIContextModals } from '@/shared/providers/UIProvider'
import AdvertisementInfo from './AdvertisementInfo'
import styles from './Advertisement.module.scss'

interface AdvertisementLabelProps {
  onHover: (show: boolean) => void
  showChildren: boolean
}

const AdvertisementLabel = ({ onHover, showChildren }: AdvertisementLabelProps) => {
  const { OpenModalAdvertisement } = useUIContextModals()
  
  return (
    <div
      className={styles.advertisement}
      role='complementary'
      aria-label='Реклама'
      onClick={OpenModalAdvertisement}
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      tabIndex={0}
    >
      Реклама
      <AdvertisementInfo show={showChildren} />
    </div>
  )
}

export default memo(AdvertisementLabel)