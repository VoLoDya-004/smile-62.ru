


export default function ButtonRegistration({children, id}) {


    return (
        <p>
			<button type="submit" className="form__registration_btn" id={id}><b>{children}</b></button>
		</p>
    )
}