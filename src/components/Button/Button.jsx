


export default function Button({children, id, className, onClick}) {


    return (
        <p>
			<button 
                className={className} 
                id={id} 
                onClick={onClick}>
                    
                <b>{children}</b>
            </button>
		</p>
    )
}