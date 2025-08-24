import { useContext, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { Context } from "../../../JS/context"
import {setUser, logoutUser} from "../../../redux/UserSlice"
import FormTitle from "../FormTitle/FormTitle"
import ButtonSubmit from "../../Button/ButtonSubmit"
import Button from "../../Button/Button"
import Notification from "../../sub-components/Notification"
import axios from "axios"


export default function Form() {
	const context = useContext(Context)
	const {productsFavourites} = context

	const dispatch = useDispatch()
	const isAuth = useSelector((state) => state.user.isAuth)
	const totalBasket = useSelector((state) => state.basket.total)
	const isDarkTheme = useSelector((state) => state.theme.isDarkTheme)

	const [notification, setNotification] = useState(null)

	const showNotification = (message, type = "success") => {
		setNotification({message, type})
	}

	const [userName, setUserName] = useState('')
	const [loginData, setLoginData] = useState({email: '', password: ''})

	const [registerData, setRegisterData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	}) 

	const handleChange = (e) => {
		setRegisterData({...registerData, [e.target.name]: e.target.value})
	}

	const handleRegister = async () => {
		try {
			const response = await axios.post("http://localhost:3000/src/PHP/register.php?Operation=register",
				registerData, {
					headers: {
						'Content-Type': 'application/json'
					}
			})
			if (response.data.success) {
				showNotification(response.data.message, 'success')
			} else {
				showNotification(response.data.message, 'error')
			}
		} catch (error) {
			showNotification('Ошибка при регистрации', 'error')
		} finally {
			setRegisterData({
				name: '',
				email: '',
				password: '',
				confirmPassword: '',
			})
		}
	}

	const handleChangeLogin = (e) => {
		setLoginData({...loginData, [e.target.name]: e.target.value})
	}

	const handleLogout = () => {
		dispatch(logoutUser())
		showNotification('Вы вышли из аккаунта', 'success')
		setUserName('')
		localStorage.removeItem('auth')
	}

	const handleLogin = async() => {
		try {
			const response = await axios.post("http://localhost:3000/src/PHP/login.php?Operation=login",
				loginData, {
					headers: {
						'Content-Type': 'application/json'
					}
				})
				if (response.data.success) {
					const userIdFromDB = response.data.id_user
					dispatch(setUser({userId: userIdFromDB, userName: response.data.name}))
					showNotification('Вы успешно вошли', 'success')
					setUserName(response.data.name)
					localStorage.setItem('auth', JSON.stringify({
						isAuth: true,
						userName: response.data.name,
						userId: userIdFromDB,
					}))
				} else {
					showNotification(response.data.message, 'error')
					setUserName("Пользователь")
				}
		} catch (error) {
			showNotification('Ошибка входа', 'error')
			setUserName("Пользователь")
		} finally {
			setLoginData({
				email: '',
				password: '',
			})
		}
	}

	useEffect(() => {
		const storedAuth = localStorage.getItem('auth')
		if (storedAuth) {
			const {isAuth, userName, userId} = JSON.parse(storedAuth)
			if (isAuth) {
				dispatch(setUser({userId, userName, isAuth}))
				setUserName(userName)
			}
		}
	}, [])

    function pluralize(number, words) {
        const cases = [2, 0, 1, 1, 1, 2]
        return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
    }

    const itemTextBasket = pluralize(totalBasket.count, ['товар', 'товара', 'товаров'])

	const itemTextFav = pluralize(productsFavourites.length, ['товар', 'товара', 'товаров'])


    return (
        <>
			{notification && (
        		<Notification
          			message={notification.message}
          			type={notification.type}
          			onClose={() => setNotification(null)}
        		/>
      		)}
			{!isAuth ? (
				<>
        			<form 
						method="post" 
						className={`form__registration ${isDarkTheme ? 'dark-theme' : ''}`}
						onSubmit={(e) => {
							e.preventDefault()
							handleRegister()
						}}
					>
        			    <FormTitle text={"РЕГИСТРАЦИЯ"} />
						<p style={{marginTop: "-10px"}}>
							<label className="form_font">Введите имя<br/>
								<input type="text" 
									name="name"
									className="form__registration_item" 
									onChange={handleChange} 
									value={registerData.name}
									required
								/>
							</label>
						</p>
						<p>
    						<label className="form_font">Введите e-mail<br/>
    							<input type="email" 
									name="email"
									className="form__registration_item" 
									onChange={handleChange} 
									value={registerData.email}
									required
								/>
							</label>
  						</p>
						<p>
    						<label className="form_font">Введите пароль<br/>
    							<input type="password" 
									name="password"
									className="form__registration_item" 
									onChange={handleChange} 
									value={registerData.password}
									required
								/>
							</label>
  						</p>
						<p>
    						<label className="form_font">Подтвердите пароль<br/>
    							<input type="password" 
									name="confirmPassword"
									className="form__registration_item" 
									onChange={handleChange} 
									value={registerData.confirmPassword}
									required
								/>
							</label>
  						</p>
						<ButtonSubmit id="RegistrationBtn" className="form__registration_btn">
							Зарегистрироваться
						</ButtonSubmit>
					</form>
					
					<form 
						method="post"
					 	className={`form__registration ${isDarkTheme ? 'dark-theme' : ''}`}
						onSubmit={(e) => {e.preventDefault(); handleLogin()}}
					>
        			    <FormTitle text={"ВХОД"} />
						<p style={{marginTop: "-10px"}}>
    						<label className="form_font">Введите e-mail<br/>
    							<input 
									type="email" 
									name="email"
									className="form__registration_item" 
									onChange={handleChangeLogin}
									value={loginData.email}
									required
								/>
							</label>
  						</p>
						<p className="form__entrance_item" style={{marginBottom: "auto", marginTop: "16px"}}>
    						<label className="form_font">Введите пароль<br/>
    							<input 
									type="password" 
									name="password"
									className="form__registration_item" 
									onChange={handleChangeLogin}
									value={loginData.password}
									required
								/>
							</label>
  						</p>
						<ButtonSubmit id="InputBtn" className="form__registration_btn">
							Войти
						</ButtonSubmit>
					</form>
				</>
			) : (
				<>
					<aside className={`profile-aside ${isDarkTheme ? 'dark-theme' : ''}`}>
						<div className="profile-aside__name">{userName || "Пользователь"}</div>
						<div className="profile-aside__sum">Баланс: 0 &#x20bd;</div>
						<Button
							id="adding-money"
							className="form__registration_btn"
						>
							Пополнить
						</Button>
						<Button
							onClick={handleLogout}
							id="profile-out"
							className="form__registration_btn"
						>
							Выйти из аккаунта
						</Button>
					</aside>
            		<section className="container-profile">
						<article className={`profile-fav ${isDarkTheme ? 'dark-theme' : ''}`}>
							<div className="profile-fav__block">
								<div 
									className=
									{`profile-fav__block-title ${isDarkTheme ? 'dark-theme' : ''}`}
								>
									<NavLink to="/favourites" 
										style={{textDecoration: "none"}}
										className={
    										`profile-fav__block-title ${isDarkTheme ? 'dark-theme' : ''}`
  										}
									>
										Избранное
									</NavLink>
								</div>
								<div className="profile-fav__block-count">
									{productsFavourites.length} {itemTextFav}
								</div>
							</div>
							<div className="profile-fav__svg">
                        		<svg xmlns="http://www.w3.org/2000/svg" 
                        		    width="42" 
                        		    height="38" 
									viewBox="0 0 21 19"
                        		>
                        		    <path fill="rgb(186, 155, 194)" d="M6.225 0C2.755 0 0 2.639 0 6.082c0 2.149 1.37 4.31 3.145 6.34 1.81 2.07 4.238 4.215 6.703 6.336a1 1 0 0 0 1.304 0c2.465-2.12 4.893-4.266 6.703-6.336C19.631 10.392 21 8.23 21 6.082 21 2.639 18.246 0 14.775 0c-1.549 0-3.09.572-4.275 1.55A6.801 6.801 0 0 0 6.225 0Z" style={{clipRule: "evenodd"}} />
                        		</svg>
							</div>
						</article>
						<article className={`profile-basket ${isDarkTheme ? 'dark-theme' : ''}`}>
							<div className="profile-basket__block">
								<div 
									className=
										{`profile-basket__block-title ${isDarkTheme ? 'dark-theme' : ''}`}
								>
									<NavLink to="/basket" 
										style={{textDecoration: "none"}}
										className={
    										`profile-basket__block-title ${isDarkTheme ? 'dark-theme' : ''}`
  										}
									>
										Корзина
									</NavLink>
								</div>
								<div className="profile-basket__block-count">
									{totalBasket.count} {itemTextBasket}
								</div>
							</div>
							<div className="profile-basket__svg">
                        		<svg 
                        		    width="42" 
                        		    height="38" 
                        		    xmlns="http://www.w3.org/2000/svg" 
                        		    viewBox="0 0 17 16"
                        		>
                        		    <path fill="rgb(186, 155, 194)" d="M2.925.488a.833.833 0 0 0-1.517.691l4.295 9.416v.001c.005.008.023.05.046.09a.9.9 0 0 0 .979.446c.045-.01.089-.023.098-.026l6.22-1.853.105-.031c.44-.13.867-.256 1.201-.523.29-.232.517-.535.657-.88.16-.396.159-.842.158-1.3V4.105c0-.01 0-.06-.004-.11a.901.901 0 0 0-.488-.73.9.9 0 0 0-.447-.098H4.147L2.925.487ZM11.833 12a1.333 1.333 0 0 0 0 2.667h.007a1.333 1.333 0 0 0 0-2.667h-.007ZM3.167 13.334c0-.737.597-1.334 1.333-1.334h.007a1.333 1.333 0 0 1 0 2.667H4.5a1.333 1.333 0 0 1-1.333-1.333Z"/>
                        		</svg>
							</div>
						</article>
                	</section>
				</>
			)}
        </>
    )
}

