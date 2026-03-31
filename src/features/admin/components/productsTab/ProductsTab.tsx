import { ProductsList } from './productsList/ProductsList'
import type { IProduct } from '../../types/adminTypes'
import { ProductsFilter } from './productsFilter/ProductsFilter'

interface IProductsTabProps {
  addProduct: (data: FormData) => Promise<void>
  updateProduct: (data: FormData) => Promise<void>
  deleteProduct: (id: number) => Promise<void>
  products: IProduct[]
  isLoadingProducts: boolean
  hasNextProducts: boolean
  isFetchingNextProducts: boolean
  fetchNextProducts: () => void
  productSearch: string
  productCategory: number
  productMinPrice?: number
  productMaxPrice?: number
  onApplyFilters: 
    (filters: { search: string, categoryId: number, minPrice?: number, maxPrice?: number }) => void
  isLoadingAddProducts: boolean  
  isLoadingEditProducts: boolean 
  initialProducts?: IProduct[] 
}

export const ProductsTab = ({
  addProduct,
  updateProduct,
  deleteProduct,
  products,
  isLoadingProducts,
  hasNextProducts,
  isFetchingNextProducts,
  fetchNextProducts,
  productSearch,
  productCategory,
  productMinPrice,
  productMaxPrice,
  onApplyFilters,
  isLoadingAddProducts,   
  isLoadingEditProducts,
  initialProducts = []
}: IProductsTabProps) => {
  const displayProducts = initialProducts.length > 0 ? initialProducts : products

  return (
    <>
      <ProductsFilter
        onApply={onApplyFilters}
        initialSearch={productSearch}
        initialCategory={productCategory}
        initialMinPrice={productMinPrice?.toString() ?? ''}
        initialMaxPrice={productMaxPrice?.toString() ?? ''}
      />
      <ProductsList
        products={displayProducts}
        onUpdate={updateProduct}
        onAdd={addProduct}
        onDelete={deleteProduct}
        isLoading={isLoadingProducts}
        hasNext={hasNextProducts}
        isFetchingNext={isFetchingNextProducts}
        fetchNext={fetchNextProducts}
        isLoadingAddProducts={isLoadingAddProducts}
        isLoadingEditProducts={isLoadingEditProducts}
      />
    </>
  )
}