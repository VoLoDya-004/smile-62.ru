import { useProductsContext } from './providers/ProductsProvider'
import Carousel from './components/carousel/Carousel'
import Cards from './components/cards/Cards'
import FiltersBlock from './components/filters/FiltersBlock'
import Breadcrumbs from './components/breadcrumbs/Breadcrumbs'
import PaginationButtons from './components/paginationButtons/PaginationButtons'
import styles from './components/carousel/Carousel.module.scss'
import Head from 'next/head'

const Products = () => {
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

  return (
    <>
      <Head>
        <title>Главная | Интернет-магазин карандашей</title>
        <meta 
          name='description' 
          content='Купить карандаши в интернет-магазине. Широкий ассортимент, низкие цены.' 
        />
      </Head>
      <h1 className='visually-hidden'>Интернет-магазин Карандашей</h1>
      <Carousel>
        <article className={styles.slider__item} aria-label='Первый слайд'>
          <img 
            fetchPriority='high'
            loading='eager'
            src='/images/icons/advertisement1.webp'
            alt='Первый слайд'
          />
        </article>
        <article className={styles.slider__item} aria-label='Второй слайд'>
          <img 
            loading='lazy'
            src='/images/icons/advertisement2.webp'
            alt='Второй слайд'
          />
        </article>
        <article className={styles.slider__item} aria-label='Третий слайд'>
          <img 
            loading='lazy'
            src='/images/icons/advertisement3.webp'
            alt='Третий слайд'
          />
        </article>
      </Carousel>
      <Breadcrumbs selectedCategory={selectedCategory} totalItems={totalItems} />
      <FiltersBlock />
      <Cards cards={cards} />
      {cards.length > 0 && 
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