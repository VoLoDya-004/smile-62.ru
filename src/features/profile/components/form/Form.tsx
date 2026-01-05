import { useEffect, useState, type ChangeEvent } from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '@/shared/store'
import type { IRegisterData } from '../../types/profileTypes'
import { useAuth } from '@/shared/hooks'
import { cx } from '@/shared/utils/classnames'
import { useUIContextNotification } from '@/shared/contexts/UIContext'
import FormTitle from './FormTitle'
import ButtonSubmit from '@/shared/ui/buttons/ButtonSubmit'
import Account from '../account/Account'
import styles from './Form.module.scss'

const RegisterForm = ({ 
  onNotification 
}: { 
  onNotification: (message: string, type: 'success' | 'error') => void 
}) => {
  const {
    'form__registration': registration,
    'form-margin-top': formMargin,
    'form__registration-item': registrationItem,
    'form-font': formFont
  } = styles

  const [registerData, setRegisterData] = useState<IRegisterData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
  }

  const { handleRegister } = useAuth()

  const handleSubmit = async () => {
    const res = await handleRegister({ registerData, onNotification })
    if (res) {
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
      className={registration}
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
      aria-label='Регистрация'
    >
      <FormTitle children={'Регистрация'} />
      <p className={formMargin}>
        <label className={formFont} htmlFor='name-register'>
          Введите имя<br/>
          <input 
            id='name-register'
            type='text' 
            name='name'
            autoComplete='name'
            className={registrationItem}
            onChange={handleChange} 
            value={registerData.name}
            spellCheck='false'
            required
          />
        </label>
      </p>
      <p>
        <label className={formFont} htmlFor='email-register'>
          Введите e-mail<br/>
          <input 
            id='email-register'
            type='email'
            name='email'
            autoComplete='email'
            className={registrationItem}
            onChange={handleChange} 
            value={registerData.email}
            required
          />
        </label>
      </p>
      <p>
        <label className={formFont} htmlFor='password-register'>
          Введите пароль<br/>
          <input 
            id='password-register'
            type='password' 
            name='password'
            autoComplete='new-password'
            className={registrationItem}
            onChange={handleChange} 
            value={registerData.password}
            required
            minLength={2}
          />
        </label>
      </p>
      <p>
        <label className={formFont} htmlFor='confirm-password-register'>
          Подтвердите пароль<br/>
          <input 
            id='confirm-password-register'
            type='password' 
            name='confirmPassword'
            autoComplete='new-password'
            className={registrationItem}
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
  onNotification,
  onLoginSuccess 
}: { 
  onNotification: (message: string, type: 'success' | 'error') => void
  onLoginSuccess: (userData: { id_user: number; name: string }) => void 
}) => {
  const {
    'form__registration': registration,
    'form-margin-top': formMargin,
    'form__registration-item': registrationItem,
    'form-font': formFont
  } = styles

  const [loginData, setLoginData] = useState<IRegisterData>({ email: '', password: '' })

  const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
  	setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const { handleLogin } = useAuth()

  const handleSubmit = async () => {
    const res = await handleLogin({
      email: loginData.email, 
      password: loginData.password, 
      onNotification, 
      onLoginSuccess
    })
    if (res) {
      setLoginData({ email: '', password: '' })
    }
  }

  return (
    <form 
      method='post'
      className={registration}
      onSubmit={(e) => { 
        e.preventDefault() 
        handleSubmit() 
      }}
      aria-label='Вход'
    >
      <FormTitle children={'Вход'} />
      <p className={formMargin}>
        <label className={formFont} htmlFor='email-login'>
          Введите e-mail<br/>
          <input 
            id='email-login'
            type='email' 
            name='email'
            autoComplete='email'
            className={registrationItem} 
            onChange={handleChangeLogin}
            value={loginData.email}
            required
          />
        </label>
      </p>
      <p>
        <label className={formFont} htmlFor='password-login'>
          Введите пароль<br/>
          <input 
            id='password-login'
            type='password'
            name='password'
            autoComplete='current-password'
            className={registrationItem}
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
  const {
    'form': form,
    'no-wrap': noWrap
  } = styles

  const isAuth = useSelector((state: RootStore) => state.user.isAuth)

  const { showNotification } = useUIContextNotification()

  const { handleLoginSuccess } = useAuth()

  useEffect(() => {
	  if (sessionStorage.getItem('showLogoutNotification')) {
      showNotification('Вы вышли из аккаунта', 'success')
      sessionStorage.removeItem('showLogoutNotification')
    }
  }, [isAuth])

  return (
		<section className={cx(form, isAuth && noWrap)}>
  	  {!isAuth ? (
  	    <>
  	      <RegisterForm onNotification={showNotification} />
  	      <LoginForm onNotification={showNotification} onLoginSuccess={handleLoginSuccess} />
  	    </>
  	  ) : (
  	    <Account />
  	  )}
  	</section>
  )
}

export default Form