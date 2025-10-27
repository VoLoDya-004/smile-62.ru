import { memo, useContext, type JSX } from 'react'
import { Context } from '../../../contexts/context'
import FavouritesHeader from './FavouritesHeader'
import Button from '../../Button/Button'


interface IFavouritesBoxProps {
    productsFavourites: JSX.Element[]
}


const FavouritesBox = ({productsFavourites}: IFavouritesBoxProps) => {
    const context = useContext(Context)
    if (!context) {
        throw new Error('Context must be used within a Provider')
    }
    const {handleClearFavBtn, loadingDeleteAllFav} = context


    return (
        <section className='favourites-box'>
            <div className='favourites-box__header'>
                <div className='favourites-box__container'>
                    <div className='clear-string'>
                        {loadingDeleteAllFav ? (
                        <div className='spinner-clear-box'>
                            <h2 className='spinner-clear-box-title'>Удаление товаров...</h2>
                            <div className='spinner-clear'></div>
                        </div>
                        ) : 
                        (
                        <>
                            <h2 className='favourites-box__container-title'>
                                Избранные товары
                            </h2>
                            <Button
                                className='button-violet'
                                onClick={handleClearFavBtn}>
                                    Очистить избранное
                            </Button>
                        </>
                        )}
                    </div>
            <div className='favourites-box__body'>
                <div className='favourites-box__body_container'>
                    <section className='favourites-box__table'>
                        <FavouritesHeader />
                        {productsFavourites}
                    </section>
                </div>
            </div>
                </div>
            </div>
        </section>
    )
}

export default memo(FavouritesBox)