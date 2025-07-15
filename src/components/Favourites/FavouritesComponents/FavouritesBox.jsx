import { memo, useContext } from "react"
import { Context } from "../../../JS/context"
import FavouritesHeader from "./FavouritesHeader"
import Button from "../../Button/Button"


export default memo(function FavouritesBox( {productsFavourites} ) {
    const context = useContext(Context)
    const {handleClearFavBtn, loadingDeleteAllFav} = context


    return (
        <section className="favouritesBox">
            <div className="favouritesBox__header">
                <div className="favouritesBox__container">
                    <div className="clearString">
                        {loadingDeleteAllFav ? (
                        <div className="spinnerClearBox">
                            <h1 style={{paddingRight: "10px"}}>Удаление товаров...</h1>
                            <div class="spinnerClear"></div>
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
})