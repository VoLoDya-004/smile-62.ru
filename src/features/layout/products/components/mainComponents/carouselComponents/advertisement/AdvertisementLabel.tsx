import { memo } from 'react'
import { useUIContextModals } from '@/shared/contexts/UIContext'
import AdvertisementInfo from './AdvertisementInfo'

interface AdvertisementLabelProps {
  onHover: (show: boolean) => void
  showChildren: boolean
}

const AdvertisementLabel = ({ onHover, showChildren }: AdvertisementLabelProps) => {
  const { OpenModalAdvertisement } = useUIContextModals()
  
  return (
    <div
      className='slider__advertisement'
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