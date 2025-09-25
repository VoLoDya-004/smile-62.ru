import { NavLink } from 'react-router-dom'


const ButtonMainNav = () => {
    
    
    return (
        <NavLink to='/'>
            <button id='to-main-btn'>
                <b className='user-select-none'>Перейти на главную</b>
            </button>
        </NavLink>
    )
}

export default ButtonMainNav