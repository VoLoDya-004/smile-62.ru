


export default function ButtonSubmit({children, id, className, onClick}) {


    return (
        <p>
			<button type="submit" className={className} id={id} 
            onClick={onClick}><b style={{userSelect: "none"}}>{children}</b></button>
		</p>
    )
}