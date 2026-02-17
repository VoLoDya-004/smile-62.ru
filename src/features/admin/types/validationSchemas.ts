import { CATEGORIES } from '@/features/layout/products/constants/categories'
import * as yup from 'yup'

export const productSchema = yup.object({
  nazvanie: yup
    .string()
    .transform(value => value.trim())
    .required('Название обязательно')
    .min(2, 'Минимум 2 символа')
    .max(100, 'Максимум 100 символов'),
  price: yup
    .number()
    .transform(value => (isNaN(value) ? undefined : value))
    .required('Цена обязательна')
    .positive('Цена должна быть положительным числом')
    .typeError('Введите корректное число'),
  price_sale: yup
    .number()
    .transform(value => (isNaN(value) ? undefined : value))
    .required('Цена со скидкой обязательна')
    .positive('Цена должна быть положительным числом')
    .typeError('Введите корректное число')
    .max(yup.ref('price'), 'Цена со скидкой не может быть больше обычной цены'),
  image: yup
    .string()
    .transform(value => value.trim())
    .required('Изображение обязательно')
    .matches(/^[a-zA-Z0-9_-]+$/, 'Только латиница, цифры, дефис и подчеркивание'),
  id_category: yup
    .string()
    .required('Выберите категорию')
    .oneOf(CATEGORIES.slice(1).map(item => String(item.id)), 'Некорректная категория')
})

export type TProductFormData = yup.InferType<typeof productSchema>