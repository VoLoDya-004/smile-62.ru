interface IButtonCrossProps {
    id?: string
    className: string
    onClick?: () => void
}


const ButtonCross = ({id, className, onClick}: IButtonCrossProps) => {


    return (
        <button className={className} id={id} onClick={onClick}>
            <img className="support__header_titleSvg" src="/images/icons/cross.png" style={{width: "20px"}}/>
        </button>
    )
}

export default ButtonCross