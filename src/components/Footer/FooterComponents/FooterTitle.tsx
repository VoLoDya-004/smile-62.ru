interface FooterTitleProps {
  children: string
}


const FooterTitle = ({ children }: FooterTitleProps) => {
  return (
    <h3 className='footer__title footer__title-section'>{children}</h3>
  )
}

export default FooterTitle