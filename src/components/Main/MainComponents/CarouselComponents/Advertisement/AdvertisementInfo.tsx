interface AdvertisementInfoProps {
  show: boolean
}

const AdvertisementInfo = ({ show }: AdvertisementInfoProps) => {

  
  return (
    <div 
      className={`slider__advertisement-description ${show ? 'show' : ''}`}
      role='contentinfo'
    >
      ООО "что-там"<br />
      ИНН 777777777<br />
      здесь еще что-нибудь
    </div>
  )
}

export default AdvertisementInfo