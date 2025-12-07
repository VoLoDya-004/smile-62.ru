import { memo } from 'react'

interface AdvertisementLabelProps {
  onHover: (show: boolean) => void
}

const AdvertisementLabel = ({ onHover }: AdvertisementLabelProps) => {
  
  return (
    <span
      className='slider__advertisement'
      role='complementary'
      aria-label='Реклама'
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      tabIndex={0}
    >
      Реклама
    </span>
  )
}

export default memo(AdvertisementLabel)