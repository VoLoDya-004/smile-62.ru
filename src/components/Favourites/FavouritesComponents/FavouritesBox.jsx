import { memo, useContext, useState } from "react"
import { Context } from "../../../JS/context"
import FavouritesHeader from "./FavouritesHeader"
import ButtonRegistration from "../../Button/ButtonRegistration"


export default memo(function FavouritesBox( {productsFavourites} ) {
    const context = useContext(Context)
    const {handleClearFav} = context

    const [loading, setLoading] = useState(false)

    const handleClear = () => {
        setLoading(true)
        handleClearFav()
            .finnaly(() => {
                setLoading(false)
            })
    }


    return (
        <section className="favouritesBox">
            <div className="favouritesBox__header">
                <div className="favouritesBox__container">
                    <div className="clearString">
                        {loading ? (
                        <div className="spinnerClearBox">
                            <h1 style={{paddingRight: "10px"}}>Удаление товаров...</h1>
                            <div class="spinnerClear"></div>
                        </div>
                        ) : 
                        (
                        <>
                            <h1 className="favouritesBox__container_title1">Избранные товары</h1>
                            <ButtonRegistration id="clearFavBtn" onClick={handleClear}>Очистить избранное</ButtonRegistration>
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