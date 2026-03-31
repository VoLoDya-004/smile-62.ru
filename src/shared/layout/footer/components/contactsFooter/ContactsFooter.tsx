import { cx } from '@/shared/utils/classnames'
import FooterTitle from '../titleFooter/TitleFooter'
import styles from './ContactsFooter.module.scss'

const ContactsFooter = () => {
  const {
    'contact': contact,
    'contact__item': contactItem,
    'contact__item_hover': contactItemHover
  } = styles
	
  return (
    <div className={contact}>
		  <FooterTitle>Контакты</FooterTitle>
		  <ul className='margin-null' aria-label='Контактная информация'>
		  	<li className={contactItem} aria-label='Наш адрес'>
		  		Адрес:&nbsp;
		  		<address>г. Рязань</address>
		  	</li>
		  	<li className={contactItem} aria-label='Наш телефон'>
		  		Телефон:&nbsp;
		  		<a href='tel:77777777777' className={cx(contactItemHover, 'link-null')}>
		  			77777777777
		  		</a>
		  	</li>
		  	<li className={contactItem} aria-label='Наша электронная почта'>
		  		E-mail:&nbsp;
		  		<a href='mailto:smile@yandex.ru' className={cx(contactItemHover, 'link-null')}>
		  			smile@yandex.ru
		  		</a>
		  	</li>
		  </ul>
	  </div>
  )
}

export default ContactsFooter