import { useNavigate } from 'react-router-dom'


const ButtonMainNav = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/')
    }
    
    
    return (
        <button 
            type='button'
            id='to-main-btn'
            onClick={handleClick}
        >
            <b className='user-select-none'>Перейти на главную</b>
        </button>
    )
}

export default ButtonMainNav