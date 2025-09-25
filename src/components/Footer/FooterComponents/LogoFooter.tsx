import { NavLink } from 'react-router-dom'


const LogoFooter = () => {

    
    return (
        <NavLink to='/'>
            <div className='footer__logo'>
                <img 
                    src='/images/icons/magazin.png'
                    alt='img'
                />
            </div>
        </NavLink>
    )
}

export default LogoFooter