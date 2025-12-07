interface FooterTitleProps {
  children: string
}

const FooterTitle = ({ children }: FooterTitleProps) => {

  return (
    <h2 className='footer__title footer__title-section'>{children}</h2>
  )
}

export default FooterTitle