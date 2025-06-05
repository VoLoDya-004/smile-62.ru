import FavouritesHeader from "./FavouritesHeader"


export default function FavouritesBox( {productsFavourites} ) {


    return (
        <section className="favouritesBox">
            <div className="favouritesBox__header">
                <div className="favouritesBox__container">
                    <h1 className="favouritesBox__container_title1">Избранные товары</h1>
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