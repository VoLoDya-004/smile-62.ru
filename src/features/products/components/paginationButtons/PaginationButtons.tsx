import { cx } from '@/shared/utils/classnames'
import ButtonLoad from '@/shared/ui/buttons/ButtonLoad'
import styles from './PaginationButtons.module.scss'

interface PaginationButtonsProps {
  currentPage: number
  isBackDisabled: boolean
  isForwardDisabled: boolean
  onPageChange: (page: number) => void
}

const PaginationButtons = ({
  currentPage,
  isBackDisabled,
  isForwardDisabled,
  onPageChange
}: PaginationButtonsProps) => {
  const {
    'pagination-box': paginationBox,
    'pagination-back': paginationBack,
    'pagination-forward': paginationForward,
    'pagination__button-back': buttonBack,
    'pagination__button-back_disabled': buttonBackDisabled,
    'pagination__button-back_active': buttonBackActive,
    'pagination__button-forward': buttonForward,
    'pagination__button-forward_disabled': buttonForwardDisabled,
    'pagination__button-forward_active': buttonForwardActive
  } = styles

  return (
    <section className={paginationBox}>
      <div className={paginationBack}>
        <ButtonLoad 
          id='loadBtnBack' 
          className={cx(buttonBack, isBackDisabled ? buttonBackDisabled : buttonBackActive)}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1)
            }
          }}
        >
          Назад
        </ButtonLoad>
      </div>
      <div className={paginationForward}>
        <ButtonLoad 
          id='loadBtnForward' 
          className={cx(buttonForward, isForwardDisabled ? buttonForwardDisabled : buttonForwardActive)}
          onClick={() => {
            if (!isForwardDisabled) {
              onPageChange(currentPage + 1)
            }
          }}
        >
          Вперед
        </ButtonLoad>
      </div>
    </section>
  )
}

export default PaginationButtons