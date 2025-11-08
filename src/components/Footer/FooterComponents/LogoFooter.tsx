import { NavLink } from 'react-router-dom'


const LogoFooter = () => {

    
    return (
        <NavLink 
            to='/' 
            aria-label='Перейти на главную'
            className='footer__logo-wrapper'
        >
            <div className='footer__logo'>
                <img 
                    src='/images/icons/smile-62.png'
                    alt='Smile'
                    className='footer__logo-img'
                />
            </div>
        </NavLink>
    )
}

export default LogoFooter