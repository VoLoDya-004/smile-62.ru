import ButtonLoad from '@/components/Button/ButtonLoad'

interface PaginationButtonsProps {
  currentPage: number
  isDarkTheme: boolean
  isBackDisabled: boolean
  isForwardDisabled: boolean
  onPageChange: (page: number) => void
}

const PaginationButtons = ({
  currentPage,
  isDarkTheme,
  isBackDisabled,
  isForwardDisabled,
  onPageChange
}: PaginationButtonsProps) => {

  return (
    <section className='pagination-box'>
      <div className='pagination-back'>
        <ButtonLoad 
          id='loadBtnBack' 
          className={`
            pagination__button-back
            ${isBackDisabled ? 
              'pagination__button-back_disabled' : 
              'pagination__button-back_active'
            } 
            ${isDarkTheme ? 'dark-theme' : ''}
          `}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1)
            }
          }}
        >
          Назад
        </ButtonLoad>
      </div>
      <div className='pagination-forward'>
        <ButtonLoad 
          id='loadBtnForward' 
          className={`
            pagination__button-forward
            ${isForwardDisabled ? 
              'pagination__button-forward_disabled' : 
              'pagination__button-forward_active'
            } 
            ${isDarkTheme ? 'dark-theme' : ''}
          `}
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