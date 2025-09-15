import type { JSX } from "react"


interface TFormTitleProps {
    text: string
}


const FormTitle = ({text}: TFormTitleProps): JSX.Element => {

    
    return (
        <span className="form__header">
            <b>{text}</b>
        </span>
    )
}

export default FormTitle