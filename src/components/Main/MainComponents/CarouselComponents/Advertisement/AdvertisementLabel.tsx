import { Context } from '@/contexts/context'
import { memo, useContext } from 'react'
import AdvertisementInfo from './AdvertisementInfo'

interface AdvertisementLabelProps {
  onHover: (show: boolean) => void
  showChildren: boolean
}

const AdvertisementLabel = ({ onHover, showChildren }: AdvertisementLabelProps) => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('Context must be used within a Provider')
  }
  const { OpenModalAdvertisement } = context
  
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