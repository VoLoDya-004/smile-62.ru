


export default function ButtonSubmit({children, id, className, onClick}) {


    return (
        <p>
			<button type="submit" className={className} id={id} 
            onClick={onClick}><b>{children}</b></button>
		</p>
    )
}