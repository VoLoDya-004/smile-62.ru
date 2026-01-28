export interface IConfirmModal {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  modalId: string
  portalId: string
  title: string
  description: string
}