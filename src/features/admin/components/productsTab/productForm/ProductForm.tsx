import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { productSchema, type TProductFormData } from '../../../types/validationSchemas'
import { cx } from '@/shared/utils/classnames'
import ButtonSubmit from '@/shared/ui/buttons/ButtonSubmit'
import { useRef, useState, type ChangeEvent, useEffect } from 'react'
import { CATEGORIES } from '@/features/layout/products/constants/categories'
import styles from './ProductForm.module.scss'

interface IProductFormProps {
  initialData?: {
    id: number
    nazvanie: string
    price: number
    price_sale: number
    image: string
    id_category: string
  }
  onSubmit: (data: FormData) => Promise<void>
  submitButtonText: string
  onCancel?: () => void
  isSubmitting?: boolean
}

export const ProductForm = ({
  initialData,
  onSubmit,
  submitButtonText,
  onCancel,
  isSubmitting: externalIsSubmitting,
}: IProductFormProps) => {
  const {
    'button-container': buttonContainer,
    'product-form': productForm,
    'form-group': formGroup,
    'file-download-line': fileDownloadLine,
    'file-download-line__button': buttonFile
  } = styles

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: internalIsSubmitting },
    reset,
    setValue,
    setError
  } = useForm<TProductFormData>({
    resolver: yupResolver(productSchema) as any,
    mode: 'onChange',
    defaultValues: initialData
      ? {
          nazvanie: initialData.nazvanie,
          price: initialData.price,
          price_sale: initialData.price_sale,
          image: undefined,
          id_category: initialData.id_category,
        }
      : {
          nazvanie: '',
          price: undefined,
          price_sale: undefined,
          image: undefined,
          id_category: '1',
        },
  })

  useEffect(() => {
    if (initialData) {
      reset({
        nazvanie: initialData.nazvanie,
        price: initialData.price,
        price_sale: initialData.price_sale,
        id_category: initialData.id_category,
        image: undefined,
      })
      setFileName('')
    }
  }, [initialData, reset])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFileName(file ? file.name : '')
    setValue('image', e.target.files ?? undefined, { shouldValidate: true })
  }

  const onFormSubmit = async (data: TProductFormData) => {
    if (!initialData && (!data.image || !data.image[0])) {
      setError('image', { type: 'manual', message: 'Изображение обязательно' })
      return
    }

    const formData = new FormData()
    if (initialData?.id) formData.append('id', String(initialData.id))
    formData.append('nazvanie', data.nazvanie)
    formData.append('price', String(data.price))
    formData.append('price_sale', String(data.price_sale))
    formData.append('id_category', data.id_category)
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0])
    }
    await onSubmit(formData)
    if (onCancel) onCancel()
    if (!initialData) {
      reset()
      setFileName('')
    }
  }

  const isSubmitting = externalIsSubmitting || internalIsSubmitting

  return (
    <form 
      role='dialog' 
      aria-modal='true' 
      onSubmit={handleSubmit(onFormSubmit)} 
      className={productForm} 
      noValidate
    >
      <div className={formGroup}>
        <label htmlFor='product-nazvanie'>Название товара</label>
        <input
          className={errors.nazvanie ? 'input-error' : ''}
          type='text'
          id='product-nazvanie'
          {...register('nazvanie')}
        />
        {errors.nazvanie && <span className='error-message'>{errors.nazvanie.message}</span>}
      </div>

      <div className={formGroup}>
        <label htmlFor='product-price'>Цена (₽)</label>
        <input
          className={errors.price ? 'input-error' : ''}
          step='0.01'
          type='number'
          id='product-price'
          {...register('price')}
        />
        {errors.price && <span className='error-message'>{errors.price.message}</span>}
      </div>

      <div className={formGroup}>
        <label htmlFor='product-price-sale'>Цена со скидкой (₽)</label>
        <input
          className={errors.price_sale ? 'input-error' : ''}
          step='0.01'
          type='number'
          id='product-price-sale'
          {...register('price_sale')}
        />
        {errors.price_sale && <span className='error-message'>{errors.price_sale.message}</span>}
      </div>

      <div className={formGroup}>
        <label htmlFor='product-image'>Загрузить изображение</label>
        <input
          ref={fileInputRef}
          className='display-none'
          type='file'
          id='product-image'
          accept='image/*'
          onChange={handleFileChange}
        />
        <div className={fileDownloadLine}>
          <button
            type='button'
            className={buttonFile}
            onClick={() => fileInputRef.current?.click()}
          >
            Выбрать файл
          </button>
          <span className={fileName || initialData?.image ? '' : 'error-message'}>
            {fileName || (initialData?.image ? `Текущий файл: ${initialData.image}` : 'Файл не выбран')}
          </span>
        </div>
        {errors.image && <span className='error-message'>{errors.image.message}</span>}
      </div>

      <div className={formGroup}>
        <label htmlFor='product-category'>Категория</label>
        <select id='product-category' {...register('id_category')}>
          {CATEGORIES.slice(1).map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>
        {errors.id_category && <span className='error-message'>{errors.id_category.message}</span>}
      </div>

      <div className={buttonContainer}>
        <button type='button' onClick={onCancel} className='confirm-delete-button'>
          Отмена
        </button>
        <ButtonSubmit
          className={cx(isSubmitting ? 'button-violet button-violet_disabled' : 'button-violet')}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Сохранение...' : submitButtonText}
        </ButtonSubmit>
      </div>
    </form>
  )
}