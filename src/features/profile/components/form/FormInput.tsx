import { cx } from '@/shared/utils/classnames'
import { type FieldError, type Path, type UseFormRegister } from 'react-hook-form'
import styles from './Form.module.scss'

interface IFormInputProps<T extends Record<string, unknown>> {
  id: string
  label: string
  type?: string
  autoComplete?: string
  error?: FieldError
  className?: string
  register: UseFormRegister<T>
  name: Path<T>
  spellCheck?: boolean
}

const FormInput = <T extends Record<string, unknown>>({
  id,
  label,
  type = 'text',
  autoComplete,
  error,
  className,
  register,
  name,
  spellCheck = false
}: IFormInputProps<T>) => {
  const {
    'form-container__input': formInput,
    'form-container__input_error': formInputError,
    'form-font': formFont
  } = styles

  return (
    <p className={cx(className, 'margin-null')}>
      <label className={formFont} htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        className={cx(formInput, error && formInputError)}
        spellCheck={spellCheck}
        {...register(name)}
      />
      {error && <span className='error-message'>{error.message}</span>}
    </p>
  )
}

export default FormInput