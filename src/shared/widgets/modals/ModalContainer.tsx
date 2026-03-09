import AdvertisementModal from './AdvertisementModal'
import ConfirmModal from './ConfirmModal'
import EditProfileModal from './EditProfileModal'

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
  isDeleteAccountModalOpen: boolean
  confirmDeleteAccount: () => void
  closeDeleteAccountModal: () => void
  isEditProfileModalOpen: boolean
  closeEditProfileModal: () => void
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
  isDeleteAccountModalOpen,
  confirmDeleteAccount,
  closeDeleteAccountModal,
  isEditProfileModalOpen,
  closeEditProfileModal
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
    <ConfirmModal
      isOpen={isDeleteAccountModalOpen}
      onConfirm={() => {
        confirmDeleteAccount()
        closeDeleteAccountModal()
      }}
      onCancel={closeDeleteAccountModal}
      modalId='delete-account-modal'
      portalId='delete-account-modal'
      title='Удаление аккаунта'
      description='Вы уверены, что хотите удалить аккаунт? Все данные будут безвозвратно потеряны.'
      
    />
    <AdvertisementModal 
      closeModalAdvertisement={closeModalAdvertisement}
      isOpen={isModalAdvertisementOpen}
    />
    <EditProfileModal
      isOpen={isEditProfileModalOpen}
      onClose={closeEditProfileModal}
    />
  </>
)

export default ModalContainer