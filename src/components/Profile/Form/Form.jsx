import FormTitle from "../FormTitle/FormTitle"
import ButtonRegistration from "../../Button/ButtonRegistration"
import ButtonInput from "../../Button/ButtonInput"


export default function Form() {


    return (
        <>
        <form action="" method="post" className="form__registration">
            <FormTitle text={"РЕГИСТРАЦИЯ"} />
			<p style={{marginTop: "-10px"}}>
				<label className="form_font">Введите имя<br/>
					<input type="text" className="form__registration_item" required/>
				</label>
			</p>
			<p>
    			<label className="form_font">Введите e-mail<br/>
    				<input type="email" className="form__registration_item" required/>
				</label>
  			</p>
			<p>
    			<label className="form_font">Введите пароль<br/>
    				<input type="password" className="form__registration_item" required/>
				</label>
  			</p>
			<p>
    			<label className="form_font">Подтвердите пароль<br/>
    				<input type="password" className="form__registration_item" required/>
				</label>
  			</p>
			<ButtonRegistration text={"Зарегистрироваться"} />
		</form>

		<form action="" method="post" className="form__registration">
            <FormTitle text={"ВХОД"} />
			<p style={{marginTop: "-10px"}}>
    			<label className="form_font">Введите e-mail<br/>
    				<input type="email" className="form__registration_item" required/>
				</label>
  			</p>
			<p className="form__entrance_item" style={{marginBottom: "auto", marginTop: "16px"}}>
    			<label className="form_font">Введите пароль<br/>
    				<input type="password" className="form__registration_item" required/>
				</label>
  			</p>
			<ButtonInput text={"Войти"} />
		</form>
        </>
    )
}