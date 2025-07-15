import FormTitle from "../FormTitle/FormTitle"
import ButtonSubmit from "../../Button/ButtonSubmit"


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
			<ButtonSubmit id="RegistrationBtn" className="form__registration_btn">
				Зарегистрироваться
			</ButtonSubmit>
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
			<ButtonSubmit id="InputBtn" className="form__registration_btn">
				Войти
			</ButtonSubmit>
		</form>
        </>
    )
}