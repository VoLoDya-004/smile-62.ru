import BlockEmpty from "../sub-components/BlockEmpty"
import FavouritesBox from "./FavouritesComponents/FavouritesBox"


export default function Favourites() {
    return (
        <>
        <section className="favourites">
            <BlockEmpty text1={"В избранных пока пусто"} 
            text2={"Загляните на главную — собрали там товары, которые могут вам понравиться"} />
        </section>
        <FavouritesBox />
        </>
    )
}