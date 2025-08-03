


export default function Button({children, id, className, onClick, style}) {


    return (
        <p>
			<button 
                className={className} 
                id={id} 
                onClick={onClick}
                style={style}
            >   
                <b>{children}</b>
            </button>
		</p>
    )
}