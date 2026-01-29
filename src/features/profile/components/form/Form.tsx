import { useSelector } from 'react-redux'
import type { RootStore } from '@/shared/store'
import { useAuth } from '../../hooks/useAuth'
import { cx } from '@/shared/utils/classnames'
import { useForm } from 'react-hook-form'
import FormTitle from './FormTitle'
import ButtonSubmit from '@/shared/ui/buttons/ButtonSubmit'
import Account from '../account/Account'
import styles from './Form.module.scss'
import { yupResolver } from '@hookform/resolvers/yup'
import FormInput from './FormInput'
import { registerSchema, loginSchema, type TRegisterFormData, type TLoginFormData } from '../../types/validationSchemas'

const {
  'form-container': formContainer,
  'form-margin-top': formMarginTop,
} = styles

const RegisterForm = () => {
  const { handleRegister } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async (data: TRegisterFormData) => {
    const { confirmPassword, ...registerData } = data
    const res = await handleRegister({ registerData })
    if (res) reset()
  }

  return (
    <form 
      className={formContainer}
      onSubmit={handleSubmit(onSubmit)}
      aria-label='Регистрация'
      noValidate
    >
      <FormTitle>Регистрация</FormTitle>
      <FormInput
        id='name-register'
        label='Введите имя'
        type='text'
        autoComplete='name'
        className={formMarginTop}
        error={errors.name}
        register={register}
        name='name'
        spellCheck={false}
      />
      <FormInput
        id='email-register'
        label='Введите e-mail'
        type='email'
        autoComplete='email'
        error={errors.email}
        register={register}
        name='email'
      />
      <FormInput
        id='password-register'
        label='Введите пароль'
        type='password'
        autoComplete='new-password'
        error={errors.password}
        register={register}
        name='password'
      />
      <FormInput
        id='confirm-password-register'
        label='Подтвердите пароль'
        type='password'
        autoComplete='new-password'
        error={errors.confirmPassword}
        register={register}
        name='confirmPassword'
      />
      <ButtonSubmit 
        className={cx(isSubmitting ? 'button-violet button-violet_disabled' : 'button-violet')}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
      </ButtonSubmit>
    </form>
  )
}

const LoginForm = () => {
  const { handleLogin } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: TLoginFormData) => {
    const res = await handleLogin(data)
    if (res) reset()
  }

  return (
    <form 
      className={formContainer}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label='Вход'
    >
      <FormTitle>Вход</FormTitle>
      <FormInput
        id='email-login'
        label='Введите e-mail'
        type='email'
        autoComplete='email'
        className={formMarginTop}
        error={errors.email}
        register={register}
        name='email'
      />
      <FormInput
        id='password-login'
        label='Введите пароль'
        type='password'
        autoComplete='current-password'
        error={errors.password}
        register={register}
        name='password'
      />
      <ButtonSubmit 
        className={cx(
          'margin-top-auto', isSubmitting ? 'button-violet button-violet_disabled' : 'button-violet'
        )}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Вход...' : 'Войти'}
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

  return (
		<section className={cx(form, isAuth && noWrap)}>
  	  {!isAuth ? (
  	    <>
  	      <RegisterForm />
  	      <LoginForm />
  	    </>
  	  ) : (
  	    <Account />
  	  )}
  	</section>
  )
}

export default Form