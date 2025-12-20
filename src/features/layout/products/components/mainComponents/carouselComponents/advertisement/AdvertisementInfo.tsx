import { memo } from 'react'

interface AdvertisementInfoProps {
  show: boolean
}

const AdvertisementInfo = ({ show }: AdvertisementInfoProps) => {
  
  return (
    <div 
      className={`slider__advertisement-description ${show ? 'show' : ''}`}
      role='contentinfo'
    >
      <p className='margin-null'>OOO "AAAAA"</p>
      <p className='margin-null'>ИНН 1111111111</p>
      <p className='margin-null'>ЕРИД sohs873huc</p>
    </div>
  )
}

export default memo(AdvertisementInfo)