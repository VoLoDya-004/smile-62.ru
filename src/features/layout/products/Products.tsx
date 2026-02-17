import { useProductsContext } from './providers/ProductsProvider'
import Carousel from './components/carousel/Carousel'
import Cards from './components/cards/Cards'
import FiltersBlock from './components/filters/FiltersBlock'
import Breadcrumbs from './components/breadcrumbs/Breadcrumbs'
import PaginationButtons from './components/paginationButtons/PaginationButtons'
import styles from './components/carousel/Carousel.module.scss'

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
      <h1 className='visually-hidden'>Интернет-магазин Smile</h1>
      <Carousel>
        <article 
          className={styles.slider__item}
          aria-label='Первый слайд'
        >
          <img 
            src='/images/icons/advertisement1.png'
            alt='Первый слайд'
            loading='eager'
            fetchPriority='high'
          />
        </article>
        <article 
          className={styles.slider__item}
          aria-label='Второй слайд'
        >
          <img 
            src='/images/icons/advertisement2.jpg' 
            alt='Второй слайд'
            loading='lazy'
          />
        </article>
        <article 
          className={styles.slider__item}
          aria-label='Третий слайд'
        >
          <img 
            src='/images/icons/advertisement3.jpg' 
            alt='Третий слайд'
            loading='lazy'
          />
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