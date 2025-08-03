


export default function ButtonCross({id, className, onClick}) {


    return (
        <button className={className} id={id} onClick={onClick}>
            <img className="support__header_titleSvg" src="/images/icons/cross.png" style={{width: "20px"}}/>
        </button>
    )
}