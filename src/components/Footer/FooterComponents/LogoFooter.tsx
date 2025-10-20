import { NavLink } from 'react-router-dom'


const LogoFooter = () => {

    
    return (
        <NavLink 
            to='/' 
            aria-label='Перейти на главную'
        >
            <div className='footer__logo'>
                <img 
                    src='/images/icons/smile-62.png'
                    alt='Smile'
                />
            </div>
        </NavLink>
    )
}

export default LogoFooter