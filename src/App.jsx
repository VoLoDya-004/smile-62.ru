import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Basic from './components/Basic/Basic'
import Favourites from './components/Favourites/Favourites'
import Profile from './components/Profile/Profile'
import Basket from './components/Basket/Basket'
import ProgressBar from './components/sub-components/ProgressBar'
import ScrollButton from './components/sub-components/ScrollButton'
import ChatBtn from './components/sub-components/ChatBtn'
import BasketProducts from './components/Basket/BasketComponents/BasketProducts'
import FavouritesProducts from './components/Favourites/FavouritesComponents/FavouritesProducts'
import './stylesheets_css/styles.css'

const srcBasket = "http://localhost:3000/src/PHP/basket.php?idUser=222&Operation=showBasket"


export default function App() {
//работа с корзиной
  const [cartBasket, setCartBasket] = useState([])

  const deleteProductBasket = (id) => {
  axios.get(`http://localhost:3000/src/PHP/basket.php?idProduct=${id}&Operation=deleteBasket`)
    .then(() => {
      // После успешного удаления обновляем корзину
      return axios.get(srcBasket)
    })
    .then((res) => {
      setCartBasket(res.data)
    })
    .catch((error) => {
      console.error("Ошибка при удалении продукта:", error)
    })
  }

  useEffect(() => {
    axios.get(srcBasket).then((res) => {
      setCartBasket(res.data)
    })
    .catch((error) => {
      console.error("Ошибка при загрузке корзины:", error)
    })
  }, [])
 
  const [totalBasket, setTotalBasket] = useState({
    count: cartBasket.reduce((prev, curr) => +prev + +curr.count, 0),
    price_total: cartBasket.reduce((prev, curr) => (+prev + +curr.price_total * curr.count), 0),                    
  })
  useEffect(() => {
    setTotalBasket({
      count: cartBasket.reduce((prev, curr) => {return +prev + +curr.count}, 0) ,
      price_total: cartBasket.reduce((prev, curr) => {return (+prev + +curr.price_total * curr.count)}, 0)                      
    })
  }, [cartBasket])

  const increaseBasket = (id) => {
    axios.get(`http://localhost:3000/src/PHP/basket.php?idProduct=${id}&Operation=increaseBasket`)
    .then(() => {
      // После успешного увеличения обновляем корзину
      return axios.get(srcBasket)
    })
    .then((res) => {
      setCartBasket(res.data)
    })
    .catch((error) => {
      console.error("Ошибка при увеличении корзины:", error)
    })
  }

  useEffect(() => {
    axios.get(srcBasket).then((res) => {
      setCartBasket(res.data)
    })
    .catch((error) => {
      console.error("Ошибка при загрузке корзины:", error)
    })
  }, [])

  const decreaseBasket = (id) => {
    axios.get(`http://localhost:3000/src/PHP/basket.php?idProduct=${id}&Operation=decreaseBasket`)
    .then(() => {
      // После успешного уменьшения обновляем корзину
      return axios.get(srcBasket)
    })
    .then((res) => {
      setCartBasket(res.data)
    })
    .catch((error) => {
      console.error("Ошибка при уменьшении корзины:", error)
    })
  }

  useEffect(() => {
    axios.get(srcBasket).then((res) => {
      setCartBasket(res.data)
    })
    .catch((error) => {
      console.error("Ошибка при загрузке корзины:", error)
    })
  }, [])

  const productsBasket = cartBasket.map((productBasket) => {
    return (
      <BasketProducts 
        productBasket = {productBasket} key = {productBasket.id} 
        deleteProductBasket = {deleteProductBasket} increaseBasket = {increaseBasket} 
        decreaseBasket = {decreaseBasket}
      />
    )
  })

  // обновление кружка корзины без обновления страницы
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const buttons = document.querySelectorAll(".card__btn") // Перепроверяем наличие кнопок

      if (buttons.length > 0) {
        buttons.forEach(button => {
          button.addEventListener('click', () => {
            axios.get("http://localhost:3000/src/PHP/basket.php?idUser=222&Operation=showBasket")
            .then(() => {
              // После успеха обновляем корзину
              return axios.get(srcBasket)
            })
            .then((res) => {
              setCartBasket(res.data)
            })
            .catch((error) => {
              console.error("Ошибка при обновлении кружка корзины:", error)
            })
          })
        })

        observer.disconnect() // Прекращаем наблюдение, если кнопки найдены
      }
    })

    // Начинаем наблюдение за изменениями в DOM
    observer.observe(document.body, { // Наблюдаем за всем body (или родительским элементом, где находятся кнопки)
        childList: true, // Отслеживаем добавление/удаление дочерних элементов
        subtree: true // Отслеживаем изменения во всех поддеревьях
    })
    //Функция очистки (отключение observer)
    return () => {
      observer.disconnect()
      const buttons = document.querySelectorAll(".card__btn") // Находим кнопки снова
      buttons.forEach(button => {
        button.removeEventListener('click', () => { 
          axios.get("http://localhost:3000/src/PHP/basket.php?idUser=222&Operation=showBasket")
            .then(() => {
              // После успеха обновляем корзину
              return axios.get(srcBasket)
            })
            .then((res) => {
              setCartBasket(res.data)
            })
            .catch((error) => {
              console.error("Ошибка при обновлении кружка корзины:", error)
            }) 
        })
      })
    }
  }, [])
//


//работа с избранными товарами
  const srcFavourites = "http://localhost:3000/src/PHP/favourites.php?idUser=222&Operation=showFavourites"

  const [cartFavourites, setCartFavourites] = useState([])

  const deleteProductFavourites = (id) => {
  axios.get(`http://localhost:3000/src/PHP/favourites.php?idProduct=${id}&Operation=deleteFavourites`)
    .then(() => {
      // После успешного удаления обновляем избранное
      return axios.get(srcFavourites)
    })
    .then((res) => {
      setCartFavourites(res.data)
    })
    .catch((error) => {
      console.error("Ошибка при удалении продукта:", error)
    })
  }

  const addInBasketProductFavourites = (id) => {
  axios.get(`http://localhost:3000/src/PHP/favourites.php?idUser=222&Operation=addBasket`)
    .then(() => {
      // После успешного добавления обновляем избранное
      return axios.get(srcFavourites)
    })
    .then((res) => {
      setCartFavourites(res.data)
    })
    .catch((error) => {
      console.error("Ошибка при удалении продукта:", error)
    })
  }


  useEffect(() => {
    axios.get(srcFavourites).then((res) => {
      setCartFavourites(res.data)
    })
    .catch((error) => {
      console.error("Ошибка при загрузке избранных:", error)
    })
  }, [])

  const productsFavourites = cartFavourites.map((productFavourites) => {
    return (
      <FavouritesProducts 
        productFavourites = {productFavourites} key = {productFavourites.id} 
        deleteProductFavourites = {deleteProductFavourites}
        addInBasketProductFavourites = {addInBasketProductFavourites}
      />
    )
  })
//

// обновление избранных товаров без обновления страницы
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const buttons = document.querySelectorAll(".card__heart") // Перепроверяем наличие кнопок

      if (buttons.length > 0) {
        buttons.forEach(button => {
          button.addEventListener('click', () => {
            axios.get("http://localhost:3000/src/PHP/favourites.php?idUser=222&Operation=showFavourites")
            .then(() => {
              // После успеха обновляем корзину
              return axios.get(srcFavourites)
            })
            .then((res) => {
              setCartFavourites(res.data)
            })
            .catch((error) => {
              console.error("Ошибка при обновлении избранных:", error)
            })
          })
        })

        observer.disconnect() // Прекращаем наблюдение, если кнопки найдены
      }
    })

    // Начинаем наблюдение за изменениями в DOM
    observer.observe(document.body, { // Наблюдаем за всем body (или родительским элементом, где находятся кнопки)
        childList: true, // Отслеживаем добавление/удаление дочерних элементов
        subtree: true // Отслеживаем изменения во всех поддеревьях
    })
    //Функция очистки (отключение observer)
    return () => {
      observer.disconnect()
      const buttons = document.querySelectorAll(".card__heart") // Находим кнопки снова
      buttons.forEach(button => {
        button.removeEventListener('click', () => { 
          axios.get("http://localhost:3000/src/PHP/favourites.php?idUser=222&Operation=showFavourites")
            .then(() => {
              // После успеха обновляем корзину
              return axios.get(srcFavourites)
            })
            .then((res) => {
              setCartFavourites(res.data)
            })
            .catch((error) => {
              console.error("Ошибка при обновлении избранных:", error)
            }) 
        })
      })
    }
  }, [])
//

  
  return (
    <>
    <Router>
      <Header totalBasket={totalBasket} />

      <main id='content'>  
        <ProgressBar />   
          <Routes>
            <Route path='/' element={<Basic />} />                
            <Route path='/favourites' element={<Favourites productsFavourites={productsFavourites} />} />                   
            <Route path='/profile' element={<Profile />} />                   
            <Route path='/basket' element={<Basket productsBasket={productsBasket} totalBasket={totalBasket} />} />                   
            </Routes>
        <ScrollButton />
        <ChatBtn />
      </main>
      
      <Footer />
    </Router>
    </>
  )
}



