import { memo, useContext, type JSX } from "react"
import { Context } from "../../../contexts/context"
import FavouritesHeader from "./FavouritesHeader"
import Button from "../../Button/Button"


interface IFavouritesBoxProps {
    productsFavourites: JSX.Element[]
}


const FavouritesBox = ({productsFavourites}: IFavouritesBoxProps): JSX.Element => {
    const context = useContext(Context)
    if(!context) {
        throw new Error("Context must be used within a Provider")
    }
    const {handleClearFavBtn, loadingDeleteAllFav} = context


    return (
        <section className="favouritesBox">
            <div className="favouritesBox__header">
                <div className="favouritesBox__container">
                    <div className="clearString">
                        {loadingDeleteAllFav ? (
                        <div className="spinnerClearBox">
                            <h1 style={{paddingRight: "10px"}}>Удаление товаров...</h1>
                            <div className="spinnerClear"></div>
                        </div>
                        ) : 
                        (
                        <>
                            <h1 className="favouritesBox__container_title1">Избранные товары</h1>
                            <Button id="clearFavBtn" className="form__registration_btn"
                                onClick={handleClearFavBtn}>
                                    Очистить избранное
                            </Button>
                        </>
                        )}
                    </div>
            <div className="favouritesBox__body">
                <div className="favouritesBox__body_container">
                    <section className="favouritesBox__table">
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