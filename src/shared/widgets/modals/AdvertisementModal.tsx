import type { RootStore } from "@/shared/store"
import { useSelector } from 'react-redux'

interface IAdvertisementModalProps {
  isOpen: boolean
  closeModalAdvertisement: () => void
}

const AdvertisementModal = ({ isOpen, closeModalAdvertisement }: IAdvertisementModalProps) => {
  if (!isOpen) {
    return null
  }

  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

  return (
    <div 
      className='modal-window'
      role='alertdialog'
      aria-modal='true'
    >
      <div className={`modal-advertisement ${isDarkTheme ? 'dark-theme' : ''}`}>
        <div className='modal-advertisement__content'>
          <p className='margin-null'>OOO "AAAAA"</p>
          <p className='margin-null'>ИНН 1111111111</p>
          <p className='margin-null'>ЕРИД sohs873huc</p>
        </div>
        <button 
          onClick={closeModalAdvertisement}
          className='modal-advertisement__button'
        >
          Закрыть
        </button>
      </div>
    </div>
  )
}

export default AdvertisementModal