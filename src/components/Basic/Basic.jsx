import Catalog from './Catalog/Catalog'
import Cards from './Cards/Cards'
import ButtonLoad from '../Button/ButtonLoad'
import ScrollToTopBtn from './ScrollToTopBtn/ScrollToTopBtn'
import ProgressBar from './ProgressBar/ProgressBar'

export default function Basic() {
    
    return (
        <>
            <ProgressBar />
            <Catalog />
            <Cards />
            <ButtonLoad text={"Загрузить ещё"} />
            <ScrollToTopBtn />
        </>
    )
}