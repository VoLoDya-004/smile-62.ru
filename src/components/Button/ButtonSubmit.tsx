import type { MouseEventHandler, ReactNode } from 'react'


interface IButtonSubmitProps {
    id?: string
    className?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
    children: ReactNode
}


const ButtonSubmit = ({children, id, className, onClick}: IButtonSubmitProps) => {


    return (
		<button 
            type='submit'
            className={className} 
            id={id} 
            onClick={onClick}
        >
            <b className='user-select-none'>{children}</b>
        </button>
    )
}

export default ButtonSubmit