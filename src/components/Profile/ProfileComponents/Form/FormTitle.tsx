interface TFormTitleProps {
    text: string
}


const FormTitle = ({text}: TFormTitleProps) => {

    
    return (
        <h2 className='form__header'>
            {text}
        </h2>
    )
}

export default FormTitle