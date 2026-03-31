import { useProductsContext } from './providers/ProductsProvider'
import Carousel from './components/carousel/Carousel'
import Cards from './components/cards/Cards'
import FiltersBlock from './components/filters/FiltersBlock'
import Breadcrumbs from './components/breadcrumbs/Breadcrumbs'
import PaginationButtons from './components/paginationButtons/PaginationButtons'
import styles from './components/carousel/Carousel.module.scss'
import Head from 'next/head'
import { ICardsRender } from './types/mainTypes'

interface ProductsProps {
  initialProducts?: ICardsRender[]
  initialTotal?: number
}

const Products = ({ initialProducts = [], initialTotal = 0 }: ProductsProps) => {
  const {
    setCurrentPage, 
    selectedCategory, 
    totalItems, 
    currentPage,
    cards
  } = useProductsContext()

  const isBackDisabled = currentPage === 1
  const isForwardDisabled = cards.length < 40 

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const displayCards = typeof window === 'undefined' ? initialProducts : cards
  const displayTotal = typeof window === 'undefined' ? initialTotal : totalItems

  return (
    <>
      <Head>
        <title>Главная | Smile – интернет-магазин техники</title>
        <meta 
          name='description' 
          content='Купить бытовую технику в интернет-магазине Smile. Широкий ассортимент, низкие цены.' 
        />
      </Head>
      <h1 className='visually-hidden'>Интернет-магазин Smile</h1>
      <Carousel>
        <article className={styles.slider__item} aria-label='Первый слайд'>
          <picture>
            <source srcSet='/images/icons/advertisement1.avif' type='image/avif' />
            <img 
              fetchPriority='high'
              loading='eager'
              src='/images/icons/advertisement1.png'
              alt='Первый слайд'
            />
          </picture>
        </article>
        <article className={styles.slider__item} aria-label='Второй слайд'>
          <picture>
            <source srcSet='/images/icons/advertisement2.avif' type='image/avif' />
            <img 
              loading='lazy'
              src='/images/icons/advertisement2.jpg'
              alt='Второй слайд'
            />
          </picture>
        </article>
        <article className={styles.slider__item} aria-label='Третий слайд'>
          <picture>
            <source srcSet='/images/icons/advertisement3.avif' type='image/avif' />
            <img 
              loading='lazy'
              src='/images/icons/advertisement3.jpg'
              alt='Третий слайд'
            />
          </picture>
        </article>
      </Carousel>
      <Breadcrumbs selectedCategory={selectedCategory} totalItems={displayTotal} />
      <FiltersBlock />
      <Cards cards={displayCards} />
      {displayCards.length > 0 && 
        <PaginationButtons
          currentPage={currentPage}
          isBackDisabled={isBackDisabled}
          isForwardDisabled={isForwardDisabled}
          onPageChange={handlePageChange}
        />
      }
    </>
  )
}

export default Products