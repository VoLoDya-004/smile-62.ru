import { useEffect, useState, type ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setUser} from '../../../redux/UserSlice'
import type { RootStore } from '../../../redux/index'
import type { INotificationData, IRegisterData } from '../../../types/types'
import axios from 'axios'
import FormTitle from '../FormTitle/FormTitle'
import ButtonSubmit from '../../Button/ButtonSubmit'
import Notification from '../../sub-components/Notification'
import FormSection from './FormSection'


const Form = () => {
	const dispatch = useDispatch()
	const isAuth = useSelector((state: RootStore) => state.user.isAuth)
	const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

	const [notification, setNotification] = useState<INotificationData | null>(null)

	const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
		setNotification({message, type})
	}

	useEffect(() => {
		if (notification) {
	    	const timer = setTimeout(() => {
	    		setNotification(null)
	      	}, 3000)

	      	return () => clearTimeout(timer)
	    }
	}, [notification])

	const [loginData, setLoginData] = useState<IRegisterData>({email: '', password: ''})

	const [registerData, setRegisterData] = useState<IRegisterData>({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	}) 

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setRegisterData({...registerData, [e.target.name]: e.target.value})
	}

	const handleRegister = async () => {
		try {
			const response = await 
				axios.post('http://localhost:3000/src/PHP/register.php?Operation=register',
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

	const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
		setLoginData({...loginData, [e.target.name]: e.target.value})
	}

	const handleLogin = async() => {
		try {
			const response = await 
				axios.post('http://localhost:3000/src/PHP/login.php?Operation=login',
					loginData, {
						headers: {
							'Content-Type': 'application/json'
						}
					})
				if (response.data.success) {
					const userIdFromDB = response.data.id_user
					dispatch(
						setUser({userId: userIdFromDB, userName: response.data.name, isAuth: true})
					)
					showNotification('Вы успешно вошли', 'success')
					localStorage.setItem('auth', JSON.stringify({
						isAuth: true,
						userName: response.data.name,
						userId: userIdFromDB,
					}))
				} else {
					showNotification(response.data.message, 'error')
				}
		} catch (error) {
			showNotification('Ошибка входа', 'error')
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
			}
		}
	}, [])


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
						method='post' 
						className={`form__registration ${isDarkTheme ? 'dark-theme' : ''}`}
						onSubmit={(e) => {
							e.preventDefault()
							handleRegister()
						}}
					>
        			    <FormTitle text={'РЕГИСТРАЦИЯ'} />
						<p className='form-margin-top'>
							<label className='form-font'>Введите имя<br/>
								<input 
									type='text' 
									name='name'
									autoComplete='name'
									className='form__registration-item' 
									onChange={handleChange} 
									value={registerData.name}
									required
								/>
							</label>
						</p>
						<p>
    						<label className='form-font'>Введите e-mail<br/>
    							<input 
									type='email'
									name='email'
									autoComplete='email'
									className='form__registration-item' 
									onChange={handleChange} 
									value={registerData.email}
									required
								/>
							</label>
  						</p>
						<p>
    						<label className='form-font'>Введите пароль<br/>
    							<input 
									type='password' 
									name='password'
									autoComplete='new-password'
									className='form__registration-item' 
									onChange={handleChange} 
									value={registerData.password}
									required
								/>
							</label>
  						</p>
						<p>
    						<label className='form-font'>Подтвердите пароль<br/>
    							<input 
									type='password' 
									name='confirmPassword'
									autoComplete='new-password'
									className='form__registration-item' 
									onChange={handleChange} 
									value={registerData.confirmPassword}
									required
								/>
							</label>
  						</p>
						<ButtonSubmit className='button-violet'>
							Зарегистрироваться
						</ButtonSubmit>
					</form>
					
					<form 
						method='post'
					 	className={`form__registration ${isDarkTheme ? 'dark-theme' : ''}`}
						onSubmit={(e) => {e.preventDefault(); handleLogin()}}
					>
        			    <FormTitle text={'ВХОД'} />
						<p className='form-margin-top'>
    						<label className='form-font'>Введите e-mail<br/>
    							<input 
									type='email' 
									name='email'
									autoComplete='email'
									className='form__registration-item' 
									onChange={handleChangeLogin}
									value={loginData.email}
									required
								/>
							</label>
  						</p>
						<p className='form__entrance-item'>
    						<label className='form-font'>Введите пароль<br/>
    							<input 
									type='password'
									name='password'
									autoComplete='current-password'
									className='form__registration-item' 
									onChange={handleChangeLogin}
									value={loginData.password}
									required
								/>
							</label>
  						</p>
						<ButtonSubmit className='button-violet'>
							Войти
						</ButtonSubmit>
					</form>
				</>
			) : ( <FormSection />)}
        </>
    )
}

export default Form

