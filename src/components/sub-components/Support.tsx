import { useSelector } from 'react-redux'
import { createPortal } from 'react-dom'
import type { RootStore } from '../../redux'
import ButtonCross from '../Button/ButtonCross'


const Support = () => {
    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

    const portalTarget = document.getElementById('confirm-modal-chat')
    if (!portalTarget) {
        return null
    }


    return createPortal(
        <div className='support'>
            <div className={`support__header ${isDarkTheme ? 'dark-theme' : ''}`}>
                <span className='support__header-title'>Поддержка</span>
                <ButtonCross
                    className='button-cross'
                    id='button-cross'
                />
            </div>
            <div className={`support__main ${isDarkTheme ? 'dark-theme' : ''}`}></div>
            <form 
                method='post'
                className={`support__footer ${isDarkTheme ? 'dark-theme' : ''}`} 
            >
                <textarea 
                    className={`support__footer-message ${isDarkTheme ? 'dark-theme' : ''}`} 
                    name='support'
                    id='support' 
                    placeholder='Ваше сообщение...' 
                    required
                >
                </textarea>
                <button 
                    className='support__footer-btn' 
                    id='support__footer-btn'
                    type='submit'
                >
                    <span className='visually-hidden'>Отправить сообщение в поддержку</span>
                    <svg 
                        className='svg-btn-fill-none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path 
                            className='white-fill-clip'
                            d='M12 20.5a1 1 0 0 0 1-1V6.414l4.293 4.293a1 1 0 0 0 
                            1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 
                            1.414L11 6.414V19.5a1 1 0 0 0 1 1Z'
                        />
                    </svg>
                </button>
            </form>
        </div>,
        portalTarget
    )
}

export default Support