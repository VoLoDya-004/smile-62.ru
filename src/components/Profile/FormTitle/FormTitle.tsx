interface TFormTitleProps {
    text: string
}


const FormTitle = ({text}: TFormTitleProps) => {

    
    return (
        <span className='form__header'>
            <b>{text}</b>
        </span>
    )
}

export default FormTitle