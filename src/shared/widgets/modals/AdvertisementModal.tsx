import { useRef } from 'react'
import styles from './Modals.module.scss'
import { useFocusTrap } from '@/shared/hooks/shared/useFocusTrap'

interface IAdvertisementModalProps {
  isOpen: boolean
  closeModalAdvertisement: () => void
}

const AdvertisementModal = ({ isOpen, closeModalAdvertisement }: IAdvertisementModalProps) => {
  const {
    'modal-advertisement': modal,
    'modal-window': modalWindow,
    'modal-advertisement__content': modalContent,
    'modal-advertisement__button': modalButton
  } = styles

  const modalRef = useRef(null)

  useFocusTrap(isOpen, modalRef, closeModalAdvertisement) 

  if (!isOpen) {
    return null
  }

  return (
    <div ref={modalRef} className={modalWindow} role='alertdialog' aria-modal='true'>
      <div className={modal}>
        <div className={modalContent}>
          <p className='margin-null'>OOO "AAAAA"</p>
          <p className='margin-null'>ИНН 1111111111</p>
          <p className='margin-null'>ЕРИД sohs873huc</p>
        </div>
        <button onClick={closeModalAdvertisement} className={modalButton}>
          Закрыть
        </button>
      </div>
    </div>
  )
}

export default AdvertisementModal