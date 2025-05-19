import BasketHeader from "./BasketHeader"
import BasketProducts from "./BasketProducts"
import BasketFooter from "./BasketFooter"
import data from "../../../JS/data"
import { useEffect, useState } from "react"

export default function BasketBox() {
    const [cart, setCart] = useState(data)
    const [total, setTotal] = useState({
            price: cart.reduce((prev, curr) => prev + curr.priceTotal, 0),
            count: cart.reduce((prev, curr) => prev + curr.count, 0)
        })

    useEffect(() => {
        setTotal({
            price: cart.reduce((prev, curr) => {return prev + curr.priceTotal}, 0),
            count: cart.reduce((prev, curr) => {return prev + curr.count}, 0)           
        })
    }, [cart])

    const deleteProduct = (id) => {
        setCart((cart) => cart.filter((product) => id !== product.id))
    }

    const increase = (id) => {
        setCart((cart)=> {
            return cart.map((product)=> {
                if(product.id === id) {
                    return {
                        ...product,
                        count: ++product.count,
                        priceTotal: product.count * product.price
                    }
                }
                return product
            })
        })
    }

    const decrease = (id) => {
        setCart((cart)=> {
            return cart.map((product)=> {
                if(product.id === id) {
                    return {
                        ...product,
                        count: product.count > 1 ? --product.count : 1,
                        priceTotal: product.count * product.price
                    }
                }
                return product
            })
        })
    }

    const changeValue = (id, value) => {
        setCart((cart) => {
            return cart.map((product) => {
                if (product.id === id) {
                    return {
                        ...product,
                        count: value,
                        priceTotal: value * product.price
                    }
                }
                return product
            })
        })
    }

    const products = cart.map((product) => {
        return (
            <BasketProducts 
                product={product} key={product.id} 
                deleteProduct={deleteProduct} increase={increase} 
                decrease={decrease} changeValue={changeValue}
            />
        )
    })

    return (
        <>
        <section className="basketBox">
            <div className="basketBox__header">
                <div className="basketBox__container">
                    <h1 className="basketBox__container_title1">Корзина товаров</h1>
            <div className="basketBox__body">
                <div className="basketBox__body_container">
                    <section className="basketBox__table">
                        <BasketHeader />
                        {products}
                        <BasketFooter total={total} />
                    </section>
                </div>
            </div>
                </div>
            </div>
        </section>
        </>
    )
}