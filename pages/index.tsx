import { GetServerSideProps } from 'next'
import Products from '../src/features/products/Products'
import Layout from '../src/shared/layout/Layout'
import { productsApi } from '@/features/products/api/productsApi'
import { ICardsRender } from '@/features/products/types/mainTypes'

interface IHomePageProps {
  initialProducts: ICardsRender[]
  initialTotal: number
}

export const getServerSideProps: GetServerSideProps<IHomePageProps> = async () => {
  try {
    const res = await productsApi.fetchProducts({ page: 1 })

    return {
      props: {
        initialProducts: res.data || [],
        initialTotal: res.total || 0
      }
    }
  } catch {
    return {
      props: {
        initialProducts: [],
        initialTotal: 0
      }
    }
  }
}

export default function HomePage({ initialProducts, initialTotal }: IHomePageProps) {
  return (
    <Layout>
      <Products 
        initialProducts={initialProducts}
        initialTotal={initialTotal}
      />
    </Layout>
  )
}