import * as yup from 'yup'

export const registerSchema = yup.object({
  name: yup
    .string()
    .required('Имя обязательно')
    .min(2, 'Минимум 2 символа')
    .max(50, 'Максимум 50 символов'),
  email: yup
    .string()
    .required('Email обязателен')
    .email('Некорректный email'),
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(2, 'Минимум 2 символа'),
  confirmPassword: yup
    .string()
    .required('Подтвердите пароль')
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
})

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email обязателен')
    .email('Некорректный email'),
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(2, 'Минимум 2 символа')
})

export type TRegisterFormData = yup.InferType<typeof registerSchema>
export type TLoginFormData = yup.InferType<typeof loginSchema>