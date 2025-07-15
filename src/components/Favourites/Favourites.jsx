import { useState, useEffect } from "react"
import { memo } from "react"
import BlockEmpty from "../sub-components/BlockEmpty"
import FavouritesBox from "./FavouritesComponents/FavouritesBox"
import Recommendations from "../sub-components/Recommendations"


export default memo(function Favourites( {productsFavourites, loading} ) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (!loading) {
            setVisible(productsFavourites.length > 0)
        }
    }, [productsFavourites, loading])

    if (loading) {
        return (
            <>
                <h1 style={{textAlign: 'center'}}>Загрузка товаров...</h1>
                <div class="spinnerCards"></div>
            </>
        )
    }
    
    
    return (
        <>
            {!visible &&
            <section className="favourites">
                <BlockEmpty text1={"В избранных пока пусто"} 
                text2={"Загляните на главную — собрали там товары, которые могут вам понравиться"} />
            </section>
            }
            {visible && <FavouritesBox productsFavourites={productsFavourites} />}
            <Recommendations />
        </>
    )
})