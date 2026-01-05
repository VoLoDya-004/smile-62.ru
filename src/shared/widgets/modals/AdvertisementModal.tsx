import styles from './Modals.module.scss'

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

  if (!isOpen) {
    return null
  }

  return (
    <div className={modalWindow} role='alertdialog' aria-modal='true'>
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