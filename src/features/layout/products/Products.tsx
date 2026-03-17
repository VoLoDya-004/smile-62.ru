import { useProductsContext } from './providers/ProductsProvider'
import Carousel from './components/carousel/Carousel'
import Cards from './components/cards/Cards'
import FiltersBlock from './components/filters/FiltersBlock'
import Breadcrumbs from './components/breadcrumbs/Breadcrumbs'
import PaginationButtons from './components/paginationButtons/PaginationButtons'
import styles from './components/carousel/Carousel.module.scss'
import { Helmet } from 'react-helmet-async'

const Products = () => {
  const {
    setCurrentPage, 
    selectedCategory, 
    fetchCards, 
    setSelectedCategory, 
    totalItems, 
    setSearchParams,
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
      <Helmet>
        <title>Главная | Smile – интернет-магазин техники</title>
        <meta 
          name='description' 
          content='Купить бытовую технику в интернет-магазине Smile. Широкий ассортимент, низкие цены.' 
        />
      </Helmet>
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
      <Breadcrumbs
        selectedCategory={selectedCategory}
        totalItems={totalItems}
        setSelectedCategory={setSelectedCategory}
        setCurrentPage={setCurrentPage}
        fetchCards={fetchCards}
        setSearchParams={setSearchParams}
      />
      <FiltersBlock />
      <Cards />
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