import AdvertisementModal from './AdvertisementModal'
import ConfirmModal from './ConfirmModal'

interface IModalContainerProps {
  isModalAdvertisementOpen: boolean
  isModalOpen: boolean
  isModalOpenAllBasket: boolean
  isModalOpenAllFav: boolean
  handleClearBasketProduct: (id: number | null) => void
  handleClearBasket: () => void
  handleClearFav: () => void
  closeModalAdvertisement: () => void
  closeModal: () => void
  closeModalAllBasket: () => void
  closeModalAllFav: () => void
  productIdToDelete: number | null
}

const ModalContainer = ({ 
  isModalAdvertisementOpen,
  isModalOpen,
  isModalOpenAllBasket,
  isModalOpenAllFav,
  handleClearBasketProduct,
  handleClearBasket,
  handleClearFav,
  closeModalAdvertisement,
  closeModal,
  closeModalAllBasket,
  closeModalAllFav,
  productIdToDelete,
}: IModalContainerProps) => (
  <>
    <ConfirmModal
      isOpen={isModalOpen}
      onConfirm={() => {
        handleClearBasketProduct(productIdToDelete)
        closeModal()
      }}
      onCancel={closeModal}
      modalId='modal-basket-delete'
      portalId='confirm-modal-basket-delete'
      title='Удаление товара'
      description='Удалить выбранный товар? Отменить действие будет невозможно.'
    />
    <ConfirmModal
      isOpen={isModalOpenAllBasket}
      onConfirm={() => {
        handleClearBasket()
        closeModalAllBasket()
      }}
      onCancel={closeModalAllBasket}
      modalId='modal-basket-delete-all'
      portalId='confirm-modal-basket-delete-all'
      title='Удаление корзины'
      description='Удалить все товары из корзины? Отменить действие будет невозможно.'
    />
    <ConfirmModal
      isOpen={isModalOpenAllFav}
      onConfirm={() => {
        handleClearFav()
        closeModalAllFav()
      }}
      onCancel={closeModalAllFav}
      modalId='modal-fav-delete-all'
      portalId='confirm-modal-fav-delete-all'
      title='Удаление избранного'
      description='Удалить все товары из избранного? Отменить действие будет невозможно.'
    />
    <AdvertisementModal 
      closeModalAdvertisement={closeModalAdvertisement}
      isOpen={isModalAdvertisementOpen}
    />
  </>
)

export default ModalContainer