import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { ProductForm } from '../productForm/ProductForm'
import type { IProduct } from '../../../types/adminTypes'
import styles from './ProductsList.module.scss'
import { createPortal } from 'react-dom'
import { usePortal } from '@/shared/hooks'
import { CATEGORIES } from '@/features/products/constants/categories'
import { useModalFocusTrap } from '@/shared/hooks'
import { Spinner } from '@/shared/ui/spinner/Spinner'
import { ICategory } from '@/features/products/types/mainTypes'
import Image from 'next/image'

interface IProductsListProps {
  products: IProduct[]
  onUpdate: (formData: FormData) => Promise<void>
  onAdd: (formData: FormData) => Promise<void>
  onDelete: (id: number) => Promise<void>
  isLoading: boolean
  hasNext: boolean
  isFetchingNext: boolean
  fetchNext: () => void
  isLoadingAddProducts: boolean
  isLoadingEditProducts: boolean
}

interface IProductImageProps {
  image: string
  alt?: string
}

type TModalType = 'add' | 'edit' | null

const ProductImage = ({ image, alt = 'Товар' }: IProductImageProps) => (
  <div className={styles['product-box__image-wrapper']}>
    <Image
      src={`/uploads/tovar/${image}.avif`}
      alt={alt}
      height={0}
      width={100}
      loading='lazy'
      decoding='async'
      className={styles['product-box__image']}
    />
  </div>
)

export const ProductsList = ({ 
  products, 
  onUpdate, 
  onAdd,
  onDelete, 
  isLoading,
  hasNext,
  isFetchingNext,
  fetchNext,
  isLoadingAddProducts,
  isLoadingEditProducts
}: IProductsListProps) => {
  const {
    'products-list-header': productsHeader,
    'products-list': productsList,
    'product-box': productBox,
    'product-box__info': productInfo,
    'product-actions': productActions,
    'modal-edit': modalEdit,
    'modal-content': modalContent
  } = styles

  const [modal, setModal] = useState<{ type: TModalType, product?: IProduct }>({ type: null })

  const { ref: lastProductRef, inView } = useInView()

  useEffect(() => {
    if (inView && hasNext && !isFetchingNext) {
      fetchNext()
    }
  }, [inView, hasNext, isFetchingNext, fetchNext])

  const handleEdit = (product: IProduct) => {
    setModal({ type: 'edit', product })
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить товар?')) {
      await onDelete(id)
    }
  }

  const handleModalSubmit = async (formData: FormData) => {
    if (modal.type === 'edit' && modal.product) {
      await onUpdate(formData)
    } else {
      await onAdd(formData)
    }
  }

  const portalElement = usePortal('confirm-admin-product', modal.type !== null)
  const prevPortalElemenRef = useRef<HTMLElement | null>(null)

  const closeModal = () => {
    setModal({ type: null })
  }

  useEffect(() => {
    if (portalElement && prevPortalElemenRef.current !== portalElement) {
      portalElement.className = modalEdit
      prevPortalElemenRef.current = portalElement
    }
  }, [portalElement])

  useModalFocusTrap(modal.type !== null, closeModal, 'confirm-admin-product')

  const categoriesTitle = (categoriesId: number) => {
    const category = CATEGORIES.find((item: ICategory) => item.id === categoriesId)
    return category ? category.label : 'Без категории'
  }
  
  if (isLoading && products.length === 0) return <Spinner />

  return (
    <>
      <header className={productsHeader}>
        <h2>Список товаров</h2>
        <button className='button-violet' onClick={() => setModal({ type: 'add' })}>
          Добавить товар
        </button>
      </header>
      {products.length === 0 ? <h2 className='centered-heading'>Товары отсутствуют</h2> : (
        <div className={productsList}>
          {products.map((product, index) => (
            <article key={product.id} ref={index === products.length - 1 ? lastProductRef : null}>
              <div className={productBox}>
                <div className={productInfo}>
                  <div><strong>{product.nazvanie}</strong></div>
                  <div>Цена: {product.price} ₽</div>
                  <div>Цена со скидкой: {product.price_sale} ₽</div>
                  <div>Категория: {categoriesTitle(Number(product.id_category))}</div>
                </div>
                <ProductImage image={product.image} alt={product.nazvanie} />
              </div>
              <div className={productActions}>
                <button 
                  className='button-violet' 
                  onClick={() => handleEdit(product)}>
                    Редактировать
                  </button>
                <button 
                  className='confirm-delete-button' 
                  onClick={() => handleDelete(product.id)}
                >
                  Удалить
                </button>
              </div>
            </article>
          ))}
          {isFetchingNext && <Spinner />}
        </div>
      )}

      {modal.type && portalElement && createPortal(
        <div className={modalContent}>
          {modal.type === 'add' ? (
            <ProductForm
              onSubmit={handleModalSubmit}
              submitButtonText='Добавить товар'
              onCancel={closeModal}
              isSubmitting={isLoadingAddProducts}
            />
          ) : (
            <ProductForm
              initialData={modal.product}
              onSubmit={handleModalSubmit}
              submitButtonText='Сохранить'
              onCancel={closeModal}
              isSubmitting={isLoadingEditProducts}
            />
          )
        }
        </div>, 
        portalElement
      )}
    </>
  )
}