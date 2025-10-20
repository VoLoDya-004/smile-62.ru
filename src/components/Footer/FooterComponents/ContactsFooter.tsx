


const ContactsFooter = () => {

	
    return (
        <div className='footer__contact'>
			<h3 className='footer__title footer__title-section'>Контакты</h3>
			<ul 
				className='margin-null' 
				aria-label='Контактная информация'
			>
				<li 
					className='footer__contact-item' 
					aria-label='Наш адрес'
				>
					Адрес:&nbsp;
					<address>1111111111</address>
				</li>
				<li 
					className='footer__contact-item'
					aria-label='Наш телефон'
				>
					Телефон:&nbsp;
					<a 
						href='tel:222222222222'
						className='link-null'
					>
						222222222222
					</a>
				</li>
				<li 
					className='footer__contact-item'
					aria-label='Наша электронная почта'
				>
					E-mail:&nbsp;
					<a 
						href='mailto:33333333333333'
						className='link-null'
					>
						33333333333333
					</a>
				</li>
			</ul>
		</div>
    )
}

export default ContactsFooter