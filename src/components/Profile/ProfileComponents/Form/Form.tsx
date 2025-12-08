import { useContext, useEffect, useState, type ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '@/redux/UserSlice'
import type { RootStore } from '@/redux'
import type { IRegisterData } from '@/types/types'
import { Context } from '@/contexts/context'
import axios from 'axios'
import FormTitle from './FormTitle'
import ButtonSubmit from '@/components/Button/ButtonSubmit'
import FormAccount from './FormAccount'

const RegisterForm = ({ 
	isDarkTheme, 
  onNotification 
}: { 
  isDarkTheme: boolean
  onNotification: (message: string, type: 'success' | 'error') => void 
}) => {
  const [registerData, setRegisterData] = useState<IRegisterData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
  }

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        '/backend/PHP/register.php?Operation=register',
        registerData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      if (response.data.success) {
        onNotification(response.data.message, 'success')
      } else {
        onNotification(response.data.message, 'error')
      }
    } catch {
      onNotification('Ошибка при регистрации', 'error')
    } finally {
      setRegisterData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    }
  }

  return (
    <form 
      method='post' 
      className={`form__registration ${isDarkTheme ? 'dark-theme' : ''}`}
      onSubmit={(e) => {
        e.preventDefault()
        handleRegister()
      }}
      aria-label='Регистрация'
    >
      <FormTitle children={'Регистрация'} />
      <p className='form-margin-top'>
        <label className='form-font' htmlFor='name-register'>
          Введите имя<br/>
          <input 
            id='name-register'
            type='text' 
            name='name'
            autoComplete='name'
            className={`form__registration-item ${isDarkTheme ? 'dark-theme' : ''}`}
            onChange={handleChange} 
            value={registerData.name}
            spellCheck='false'
            required
          />
        </label>
      </p>
      <p>
        <label className='form-font' htmlFor='email-register'>
          Введите e-mail<br/>
          <input 
            id='email-register'
            type='email'
            name='email'
            autoComplete='email'
            className={`form__registration-item ${isDarkTheme ? 'dark-theme' : ''}`}
            onChange={handleChange} 
            value={registerData.email}
            required
          />
        </label>
      </p>
      <p>
        <label className='form-font' htmlFor='password-register'>
          Введите пароль<br/>
          <input 
            id='password-register'
            type='password' 
            name='password'
            autoComplete='new-password'
            className={`form__registration-item ${isDarkTheme ? 'dark-theme' : ''}`}
            onChange={handleChange} 
            value={registerData.password}
            required
            minLength={2}
          />
        </label>
      </p>
      <p>
        <label className='form-font' htmlFor='confirm-password-register'>
          Подтвердите пароль<br/>
          <input 
            id='confirm-password-register'
            type='password' 
            name='confirmPassword'
            autoComplete='new-password'
            className={`form__registration-item ${isDarkTheme ? 'dark-theme' : ''}`}
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
  )
}

const LoginForm = ({ 
  isDarkTheme, 
  onNotification,
  onLoginSuccess 
}: { 
  isDarkTheme: boolean
  onNotification: (message: string, type: 'success' | 'error') => void
  onLoginSuccess: (userData: { id_user: number; name: string }) => void 
}) => {
  const [loginData, setLoginData] = useState<IRegisterData>({ email: '', password: '' })

  const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
  	setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        '/backend/PHP/login.php?Operation=login',
        loginData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      if (response.data.success) {
        onLoginSuccess({ id_user: response.data.id_user, name: response.data.name })
        onNotification('Вы успешно вошли', 'success')
      } else {
        onNotification(response.data.message, 'error')
      }
    } catch {
      onNotification('Ошибка входа', 'error')
    } finally {
      setLoginData({
      	email: '',
      	password: '',
      })
    }
  }

  return (
    <form 
      method='post'
      className={`form__registration ${isDarkTheme ? 'dark-theme' : ''}`}
      onSubmit={(e) => { 
        e.preventDefault() 
        handleLogin() 
      }}
      aria-label='Вход'
    >
      <FormTitle children={'Вход'} />
      <p className='form-margin-top'>
        <label className='form-font' htmlFor='email-login'>
          Введите e-mail<br/>
          <input 
            id='email-login'
            type='email' 
            name='email'
            autoComplete='email'
            className={`form__registration-item ${isDarkTheme ? 'dark-theme' : ''}`} 
            onChange={handleChangeLogin}
            value={loginData.email}
            required
          />
        </label>
      </p>
      <p>
        <label className='form-font' htmlFor='password-login'>
          Введите пароль<br/>
          <input 
            id='password-login'
            type='password'
            name='password'
            autoComplete='current-password'
            className={`form__registration-item ${isDarkTheme ? 'dark-theme' : ''}`} 
            onChange={handleChangeLogin}
            value={loginData.password}
            required
          />
        </label>
      </p>
      <ButtonSubmit className='button-violet margin-top-auto'>
        Войти
      </ButtonSubmit>
    </form>
  )
}

const Form = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector((state: RootStore) => state.user.isAuth)
  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

  const context = useContext(Context)
  if (!context) {
    throw new Error('Context must be used within a Provider')
  }
  const { showNotification } = context

  const handleLoginSuccess = (userData: { id_user: number; name: string }) => {
    dispatch(setUser({ userId: userData.id_user, userName: userData.name, isAuth: true }))
    localStorage.setItem('auth', JSON.stringify({
      isAuth: true,
      userName: userData.name,
      userId: userData.id_user,
    }))
  }

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth')

    if (storedAuth) {
      const { isAuth, userName, userId } = JSON.parse(storedAuth)
      if (isAuth) {
        dispatch(setUser({ userId, userName, isAuth }))
      }
    }
  }, [dispatch])

  useEffect(() => {
	  if (sessionStorage.getItem('showLogoutNotification')) {
      showNotification('Вы вышли из аккаунта', 'success')
      sessionStorage.removeItem('showLogoutNotification')
    }
  }, [isAuth])

  return (
		<>
  	  {!isAuth ? (
  	    <>
  	      <RegisterForm 
  	        isDarkTheme={isDarkTheme} 
  	        onNotification={showNotification} 
  	      />
  	      <LoginForm 
  	        isDarkTheme={isDarkTheme} 
  	        onNotification={showNotification}
  	        onLoginSuccess={handleLoginSuccess}
  	      />
  	    </>
  	  ) : (
  	    <FormAccount />
  	  )}
  	</>
  )
}

export default Form