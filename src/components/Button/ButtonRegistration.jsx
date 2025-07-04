


export default function ButtonRegistration({children, id, onClick}) {


    return (
        <p>
			<button type="submit" className="form__registration_btn" id={id} onClick={onClick}><b>{children}</b></button>
		</p>
    )
}