import { cx } from '@/shared/utils/classnames'
import { type FieldError } from 'react-hook-form'
import styles from './Form.module.scss'

interface FormInputProps {
  id: string
  label: string
  type?: string
  autoComplete?: string
  error?: FieldError
  className?: string
  register: any
  name: string
  spellCheck?: boolean
}

const FormInput = ({
  id,
  label,
  type = 'text',
  autoComplete,
  error,
  className,
  register,
  name,
  spellCheck = false
}: FormInputProps) => {
  const {
    'form-container__input': formInput,
    'form-container__input_error': formInputError,
    'form-font': formFont,
    'error-message': errorMessage
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
      {error && <span className={errorMessage}>{error.message}</span>}
    </p>
  )
}

export default FormInput