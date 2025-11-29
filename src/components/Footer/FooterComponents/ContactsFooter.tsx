import { useSelector } from 'react-redux'
import type { RootStore } from '@/redux'
import FooterTitle from './FooterTitle'


const ContactsFooter = () => {
	const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)
	

  return (
    <div className='footer__contact'>
		  <FooterTitle>Контакты</FooterTitle>
		  <ul 
		  	className='margin-null' 
		  	aria-label='Контактная информация'
		  >
		  	<li 
		  		className='footer__contact-item' 
		  		aria-label='Наш адрес'
		  	>
		  		Адрес:&nbsp;
		  		<address>г. Рязань</address>
		  	</li>
		  	<li 
		  		className='footer__contact-item'
		  		aria-label='Наш телефон'
		  	>
		  		Телефон:&nbsp;
		  		<a 
		  			href='tel:77777777777'
		  			className={`
		  				footer__contact-item-hover 
		  				${isDarkTheme ? 'dark-theme' : ''} 
		  				link-null
		  			`}
		  		>
		  			77777777777
		  		</a>
		  	</li>
		  	<li 
		  		className='footer__contact-item'
		  		aria-label='Наша электронная почта'
		  	>
		  		E-mail:&nbsp;
		  		<a 
		  			href='mailto:smile@yandex.ru'
		  			className={`
		  				footer__contact-item-hover 
		  				${isDarkTheme ? 'dark-theme' : ''} 
		  				link-null
		  			`}
		  		>
		  			smile@yandex.ru
		  		</a>
		  	</li>
		  </ul>
	  </div>
  )
}

export default ContactsFooter