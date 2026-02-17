import { CATEGORIES } from '@/features/layout/products/constants/categories'
import { cx } from '@/shared/utils/classnames'
import { useForm } from 'react-hook-form'
import { productSchema, type TProductFormData } from '../../types/validationSchemas'
import { yupResolver } from '@hookform/resolvers/yup'
import styles from '../AdminPanel.module.scss'
import ButtonSubmit from '@/shared/ui/buttons/ButtonSubmit'

export const ProductsTab = (
  { addProduct }: { addProduct: (product: TProductFormData) => Promise<void> }
) => {
  const {
    'button-container': buttonContainer,
    'product-form': productForm,
    'form-group': formGroup
  } = styles

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: yupResolver(productSchema),
    mode: 'onChange',
    defaultValues: {
      nazvanie: '',
      price: undefined,
      price_sale: undefined,
      image: '',
      id_category: '1'
    }
  })

  const onSubmit = async (data: TProductFormData) => {
    await addProduct(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={productForm} noValidate>
      <div className={formGroup}>
        <label htmlFor='nazvanie'>Название товара</label>
        <input
          className={errors.nazvanie ? 'input-error' : ''}
          type='text'
          id='nazvanie'
          placeholder='Например, iPhone 15 Pro'
          {...register('nazvanie')}
          aria-invalid={errors.nazvanie ? 'true' : 'false'}
        />
        {errors.nazvanie && (
          <span className='error-message' role='alert'>{errors.nazvanie.message}</span>
        )}
      </div>

      <div className={formGroup}>
        <label htmlFor='price'>Цена (₽)</label>
        <input
          className={errors.price ? 'input-error' : ''}  
          step='0.01'
          type='number'
          id='price'
          placeholder='Введите стоимость товара'
          {...register('price')}
          aria-invalid={errors.price ? 'true' : 'false'}
        />
        {errors.price && (
          <span className='error-message' role='alert'>{errors.price.message}</span>
        )}
      </div>

      <div className={formGroup}>
        <label htmlFor='price_sale'>Цена со скидкой (₽)</label>
        <input
          className={errors.price_sale ? 'input-error' : ''} 
          step='0.01'
          type='number'
          id='price_sale'
          placeholder='Если скидки нет, то обычная цена'
          {...register('price_sale')}
          aria-invalid={errors.price_sale ? 'true' : 'false'}
        />
        {errors.price_sale && (
          <span className='error-message' role='alert'>{errors.price_sale.message}</span>
        )}
      </div>

      <div className={formGroup}>
        <label htmlFor='image'>Изображение</label>
        <input
          className={errors.image ? 'input-error' : ''} 
          type='text'
          id='image'
          placeholder='Имя файла без расширения (например, router)'
          {...register('image')}
          aria-invalid={errors.image ? 'true' : 'false'}
        />
        {errors.image && (
          <span className='error-message' role='alert'>{errors.image.message}</span>
        )}
      </div>

      <div className={formGroup}>
        <label htmlFor='id_category'>Категория</label>
        <select
          className={errors.id_category ? 'input-error' : ''} 
          id='id_category'
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