import BlockEmpty from "../sub-components/BlockEmpty"


export default function Favourites() {
    return (
        <>
        <section className="favourites">
            <BlockEmpty text1={"В избранном пока пусто"} 
            text2={"Загляните на главную — собрали там товары, которые могут вам понравиться"} />
        </section>
        </>
    )
}