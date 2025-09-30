import { NavLink } from 'react-router-dom'


const LogoFooter = () => {

    
    return (
        <NavLink to='/'>
            <div className='footer__logo'>
                <span className='visually-hidden'>Логотип</span>
                <img 
                    src='/images/icons/smile-62.png'
                    alt='Логотип'
                />
            </div>
        </NavLink>
    )
}

export default LogoFooter