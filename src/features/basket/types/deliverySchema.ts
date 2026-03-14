import * as yup from 'yup'

export const deliverySchema = yup.object({
  deliveryAddress: yup.string().required('Введите адрес доставки').trim(),
  selectedDeliveryMethod: yup
    .string()
    .required('Выберите способ доставки')
    .test('is-not-empty', 'Выберите способ доставки', (value) => value !== ''),
  customerNotes: yup.string().default(''), 
  acceptRules: yup.boolean().default(false).oneOf([true], 'Необходимо согласие с правилами'),
})

export type TDeliveryFormData = yup.InferType<typeof deliverySchema>