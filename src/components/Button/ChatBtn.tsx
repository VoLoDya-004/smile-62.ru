import { memo } from 'react'


const ChatBtn = () => {
    function showModal() {
        const modal = document.getElementById('confirm-modal-chat')
        const modalCross = document.getElementById('button-cross')

        if (!modal || !modalCross) return

        modal.style.display = 'block'
        document.body.classList.add('modal-open')

        modalCross.onclick = () => {
            modal.style.display = 'none'
            document.body.classList.remove('modal-open')
        }

        window.onclick = (e) => {
            if (e.target == modal) {
                modal.style.display = 'none'
                document.body.classList.remove('modal-open')
            }
        }
    }


    return (
        <button 
            type='button'
            id='chat-btn' 
            onClick={showModal}
        >
            <span className='visually-hidden'>Открыть чат поддержки</span>
            <svg 
                className='chat-btn-svg' 
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='none'
            >
                <path 
                    className='chat-svg'
                    fill='#fff'
                    d='M1.038 3.816C.736 4.518.82 5.428.992 7.248l.6 6.4c.144 
                    1.537.216 2.305.562 2.886a3 3 0 0 0 1.291 1.176c.61.29 
                    1.383.29 2.926.29H7.84c.056 0 .084 0 .105.01a.1.1 0 0 
                    1 .044.045c.01.021.01.049.01.105v4.047c0 .095 0 .143.02.17a.1.1 0 0 
                    0 .074.04c.033.002.073-.024.153-.076l6.714-4.316c.015-.009.022-.014.03-.017a.098.098 0 0 
                    1 .022-.006c.009-.002.017-.002.035-.002h2.582c1.543 0 2.315 0 2.925-.29a3 3 0 0 
                    0 1.292-1.176c.346-.581.418-1.35.562-2.886l.6-6.4c.17-1.82.256-2.73-.046-3.432a3 3 0 
                    0 0-1.32-1.45C20.97 2 20.057 2 18.229 2H5.77c-1.828 0-2.742 0-3.413.366a3 3 0 
                    0 0-1.32 1.45ZM12 8.5a1.5 1.5 0 0 0 0 3h.01a1.5 1.5 0 0 0 0-3H12ZM6 10a1.5 1.5 0 0 
                    1 1.5-1.5h.01a1.5 1.5 0 0 1 0 3H7.5A1.5 1.5 0 0 1 6 10Zm10.5-1.5a1.5 1.5 0 0 0 
                    0 3h.01a1.5 1.5 0 0 0 0-3h-.01Z'
                />
            </svg>
        </button>
    )
}

export default memo(ChatBtn)