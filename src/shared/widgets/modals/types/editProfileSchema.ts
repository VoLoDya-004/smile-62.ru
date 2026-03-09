import * as yup from 'yup'

export const editProfileSchema = yup.object({
  name: yup
    .string()
    .transform(value => value.trim())
    .required('Имя обязательно')
    .min(2, 'Минимум 2 символа')
    .max(50, 'Максимум 50 символов'),
  email: yup
    .string()
    .required('Email обязателен')
    .email('Некорректный email'),
  password: yup
    .string()
    .transform(value => value.trim())
    .optional()
    .min(2, 'Минимум 2 символа'),
  confirmPassword: yup
    .string()
    .transform(value => value.trim())
    .when('password', {
      is: (val: string) => val && val.length > 0,
      then: (schema) => 
        schema.required('Подтвердите пароль').oneOf([yup.ref('password')], 'Пароли не совпадают'),
      otherwise: (schema) => schema.notRequired(),
    }),
})

export type TEditProfileFormData = yup.InferType<typeof editProfileSchema>