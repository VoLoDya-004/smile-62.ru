interface IFormTitleProps {
  text: string
}


const FormTitle = ({text}: IFormTitleProps) => {

    
  return (
    <h2 className='form__header'>
      {text}
    </h2>
  )
}

export default FormTitle