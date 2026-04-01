import { GetServerSideProps } from 'next'
import Products from '../src/features/products/Products'
import Layout from '../src/shared/layout/Layout'
import { productsApi } from '@/features/products/api/productsApi'

export const getServerSideProps: GetServerSideProps = async () => {
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

export default function HomePage() {
  return (
    <Layout>
      <Products />
    </Layout>
  )
}