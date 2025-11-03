import { memo } from 'react'
import ButtonLoad from '../../Button/ButtonLoad'


interface PaginationButtonsProps {
    currentPage: number
    isDarkTheme: boolean
    isBackDisabled: boolean
    isForwardDisabled: boolean
    onPageChange: (page: number) => void
}


const PaginationButtons = memo(function PaginationButtons({
    currentPage,
    isDarkTheme,
    isBackDisabled,
    isForwardDisabled,
    onPageChange
}: PaginationButtonsProps) {


    return (
        <section className='load-more-box'>
            <div className='load-more-back'>
                <ButtonLoad 
                    id='loadBtnBack' 
                    className={`
                        load-more__btn-back
                        ${isBackDisabled ? 
                            'load-more__btn-back_disabled' : 
                            'load-more__btn-back_active'
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
            <div className='load-more-forward'>
                <ButtonLoad 
                    id='loadBtnForward' 
                    className={`
                        load-more__btn-forward
                        ${isForwardDisabled ? 
                            'load-more__btn-forward_disabled' : 
                            'load-more__btn-forward_active'
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
})

export default PaginationButtons