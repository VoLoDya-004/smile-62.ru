interface IFormTitleProps {
  children: string
}


const FormTitle = ({ children }: IFormTitleProps) => {

    
  return (
    <h2 className='form__header'>
      {children}
    </h2>
  )
}

export default FormTitle