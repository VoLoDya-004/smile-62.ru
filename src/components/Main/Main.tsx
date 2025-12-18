import { useSelector } from 'react-redux'
import { useProductsContext } from '@/contexts/ProductsContext'
import type { RootStore } from '@/redux'
import Carousel from './MainComponents/CarouselComponents/Carousel'
import Cards from './MainComponents/Cards'
import FiltersBlock from './MainComponents/FiltersComponents/FiltersBlock'
import Breadcrumbs from './MainComponents/Breadcrumbs'
import PaginationButtons from './MainComponents/PaginationButtons'

const Main = () => {
  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

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
          className='slider__item'
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
          className='slider__item'
          aria-label='Второй слайд'
        >
          <img 
            src='/images/icons/advertisement2.jpg' 
            alt='Второй слайд'
            loading='lazy'
          />
        </article>
        <article 
          className='slider__item'
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
          isDarkTheme={isDarkTheme}
          isBackDisabled={isBackDisabled}
          isForwardDisabled={isForwardDisabled}
          onPageChange={handlePageChange}
        />
      }
    </>
  )
}

export default Main