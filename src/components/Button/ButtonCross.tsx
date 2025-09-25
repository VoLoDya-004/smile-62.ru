interface IButtonCrossProps {
    id?: string
    className: string
    onClick?: () => void
}


const ButtonCross = ({id, className, onClick}: IButtonCrossProps) => {


    return (
        <button 
            className={className} 
            id={id} 
            onClick={onClick}
        >
            <img 
                className='button-cross-svg'
                src='/images/icons/cross.png'
                alt='img'
            />
        </button>
    )
}

export default ButtonCross