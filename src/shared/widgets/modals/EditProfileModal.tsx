import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '@/features/profile/hooks/useAuth'
import { useUIContextNotification } from '@/shared/providers/UIProvider'
import ButtonSubmit from '@/shared/ui/buttons/ButtonSubmit'
import { editProfileSchema, type TEditProfileFormData } from './types/editProfileSchema'
import styles from './Modals.module.scss'
import FormInput from '@/features/profile/components/form/FormInput'
import { cx } from '@/shared/utils/classnames'
import { useSelector } from 'react-redux'
import type { RootStore } from '@/shared/store'
import { useEffect } from 'react'

interface IEditProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

const EditProfileModal = ({ isOpen, onClose }: IEditProfileModalProps) => {
  const {
    'modal-window': modalWindow,
    'form-container': formContainer,
    'form-container__actions': formContainerActions,
    'form-container__wrapper': formContainerWrapper
  } = styles

  const userName = useSelector((state: RootStore) => state.user.userName)
  const userEmail = useSelector((state: RootStore) => state.user.userEmail)

  const { showNotification } = useUIContextNotification()
  const { handleUpdateProfile } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: yupResolver(editProfileSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: TEditProfileFormData) => {
    const res = await handleUpdateProfile({
      name: data.name,
      email: data.email,
      password: data.password || '',
    })
    if (res) {
      showNotification('Профиль обновлён', 'success')
      onClose()
    }
  }

  useEffect(() => {
    if (isOpen) {
      reset({
        name: userName || '',
        email: userEmail || '',
        password: '',
        confirmPassword: ''
      })
    }
  }, [isOpen, userName, userEmail, reset])

  if (!isOpen) return null

  return (
    <div className={modalWindow} onClick={onClose}>
      <div className={formContainerWrapper}>
        <form 
          onClick={(e) => e.stopPropagation()}
          className={formContainer}
          onSubmit={handleSubmit(onSubmit)} 
          noValidate 
          aria-label='Редактирование аккаунта'
        >
          <FormInput
            id='edit-name'
            label='Имя'
            type='text'
            autoComplete='name'
            error={errors.name}
            register={register}
            name='name'
          />
          <FormInput
            id='edit-email'
            label='Email'
            type='email'
            autoComplete='email'
            error={errors.email}
            register={register}
            name='email'
          />
          <FormInput
            id='edit-password'
            label='Новый пароль'
            type='password'
            autoComplete='new-password'
            error={errors.password}
            register={register}
            name='password'
          />
          <FormInput
            id='edit-confirm-password'
            label='Подтвердите пароль'
            type='password'
            autoComplete='new-password'
            error={errors.confirmPassword}
            register={register}
            name='confirmPassword'
          />
          <div className={formContainerActions}>
            <ButtonSubmit
              className={cx(isSubmitting ? 'button-violet button-violet_disabled' : 'button-violet')}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Сохранение...' : 'Сохранить'}
            </ButtonSubmit>
            <button
              type='button'
              className='confirm-delete-button'
              onClick={onClose}
              disabled={isSubmitting}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfileModal