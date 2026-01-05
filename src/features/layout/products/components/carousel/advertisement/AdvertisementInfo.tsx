import { memo } from 'react'
import { cx } from '@/shared/utils/classnames'
import styles from './Advertisement.module.scss'


interface AdvertisementInfoProps {
  show: boolean
}

const AdvertisementInfo = ({ show }: AdvertisementInfoProps) => {
  const {
    'advertisement-description': advertisement,
    'show': showClass
  } = styles
  
  return (
    <div className={cx(advertisement, show && showClass)} role='contentinfo'>
      <p className='margin-null'>OOO "AAAAA"</p>
      <p className='margin-null'>ИНН 1111111111</p>
      <p className='margin-null'>ЕРИД sohs873huc</p>
    </div>
  )
}

export default memo(AdvertisementInfo)