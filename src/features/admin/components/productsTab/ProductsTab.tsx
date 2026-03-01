import { CATEGORIES } from '@/features/layout/products/constants/categories'
import { cx } from '@/shared/utils/classnames'
import { useForm, type Resolver } from 'react-hook-form'
import { productSchema, type TProductFormData } from '../../types/validationSchemas'
import { yupResolver } from '@hookform/resolvers/yup'
import styles from '../AdminPanel.module.scss'
import ButtonSubmit from '@/shared/ui/buttons/ButtonSubmit'
import { useRef, useState, type ChangeEvent } from 'react'

export const ProductsTab = (
  { addProduct }: { addProduct: (data: FormData) => Promise<void> }
) => {
  const {
    'button-container': buttonContainer,
    'product-form': productForm,
    'form-group': formGroup,
    'file-download-line': fileDownloadLine,
    'file-download-line__button': buttonFile
  } = styles

  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm<TProductFormData>({
    resolver: yupResolver(productSchema) as Resolver<TProductFormData>,
    mode: 'onChange',
    defaultValues: {
      nazvanie: '',
      price: undefined,
      price_sale: undefined,
      image: undefined,
      id_category: '1'
    }
  })

  const [fileName, setFileName] = useState('')

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFileName(file ? file.name : '')
    setValue('image', e.target.files ?? undefined, { shouldValidate: true })
  }

  const onSubmit = async (data: TProductFormData) => {
    const formData = new FormData()
    formData.append('nazvanie', data.nazvanie)
    formData.append('price', String(data.price))
    formData.append('price_sale', String(data.price_sale))
    formData.append('id_category', data.id_category)
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0])
    }
    await addProduct(formData)
    reset()
    setValue('image', undefined)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={productForm} noValidate>
      <div className={formGroup}>
        <label htmlFor='admin-nazvanie'>Название товара</label>
        <input
          className={errors.nazvanie ? 'input-error' : ''}
          type='text'
          id='admin-nazvanie'
          placeholder='Например, iPhone 15 Pro'
          {...register('nazvanie')}
          aria-invalid={errors.nazvanie ? 'true' : 'false'}
        />
        {errors.nazvanie && (
          <span className='error-message' role='alert'>{errors.nazvanie.message}</span>
        )}
      </div>

      <div className={formGroup}>
        <label htmlFor='admin-price'>Цена (₽)</label>
        <input
          className={errors.price ? 'input-error' : ''}  
          step='0.01'
          type='number'
          id='admin-price'
          placeholder='Введите стоимость товара'
          {...register('price')}
          aria-invalid={errors.price ? 'true' : 'false'}
        />
        {errors.price && (
          <span className='error-message' role='alert'>{errors.price.message}</span>
        )}
      </div>

      <div className={formGroup}>
        <label htmlFor='admin-price-sale'>Цена со скидкой (₽)</label>
        <input
          className={errors.price_sale ? 'input-error' : ''} 
          step='0.01'
          type='number'
          id='admin-price-sale'
          placeholder='Если скидки нет, то обычная цена'
          {...register('price_sale')}
          aria-invalid={errors.price_sale ? 'true' : 'false'}
        />
        {errors.price_sale && (
          <span className='error-message' role='alert'>{errors.price_sale.message}</span>
        )}
      </div>

      <div className={formGroup}>
        <label htmlFor='admin-image'>Загрузить изображение</label>
        <input
          ref={fileInputRef}
          className='display-none'
          type='file'
          id='admin-image'
          accept='image/*'
          onChange={handleFileChange}
          aria-invalid={errors.image ? 'true' : 'false'}
        />
        <div className={fileDownloadLine}>
          <button
            type='button'
            className={buttonFile}
            onClick={() => fileInputRef.current?.click()}
          >
            Выбрать файл
          </button>
          <span className={fileName ? '' : 'error-message'}>{fileName || 'Файл не выбран'}</span>
        </div>
        {errors.image && (
          <span className='error-message' role='alert'>{errors.image.message}</span>
        )}
      </div>

      <div className={formGroup}>
        <label htmlFor='admin-id-category'>Категория</label>
        <select
          className={errors.id_category ? 'input-error' : ''} 
          id='admin-id-category'
          {...register('id_category')}
          aria-invalid={errors.id_category ? 'true' : 'false'}
        >
          {CATEGORIES.slice(1).map((category => (
            <option value={category.id} key={category.id}>
              {category.label}
            </option>
          )))}
        </select>
        {errors.id_category && (
          <span className='error-message' role='alert'>{errors.id_category.message}</span>
        )}
      </div> 
      
      <div className={buttonContainer}>
        <ButtonSubmit
          className={cx(isSubmitting ? 'button-violet button-violet_disabled' : 'button-violet')}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Добавление...' : 'Добавить товар'}
        </ButtonSubmit>
      </div>
    </form>
  )
}