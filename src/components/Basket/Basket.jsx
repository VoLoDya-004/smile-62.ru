import BlockEmpty from "../sub-components/BlockEmpty"


export default function Basket() {
    return (
        <>
        <section className="basket">
            <BlockEmpty text1={"В корзине пока пусто"} 
            text2={"Загляните на главную — собрали там товары, которые могут вам понравиться"} />
        </section>
        </>
    )
}