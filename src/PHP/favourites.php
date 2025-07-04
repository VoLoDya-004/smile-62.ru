<?php
require_once "../../../auth/auth.php";

if (isset($_GET['Operation'])) {
    if ($_GET['Operation'] == 'addFavourites'){ //добавление в избранное
        if (isset($_GET['idProduct'])) {
            $idProduct = $_GET['idProduct'];
            $idUser = $_GET['idUser'];
            $query = "INSERT INTO favourites (id_user, id_product) VALUES ($idUser, $idProduct)";
        }
    }

    if ($_GET['Operation'] == 'addBasket'){ //добавление в корзину
        if (isset($_GET['idProduct'])) {
            $idProduct = $_GET['idProduct'];
            $idUser = $_GET['idUser'];
            $query = "INSERT INTO basket (id_user, id_product, count) VALUES ($idUser, $idProduct, 1)";
        }
    }

    if ($_GET['Operation'] == 'showFavourites'){ //просмотр избранного
        if (isset($_GET['idUser'])) {
            $idUser = $_GET['idUser'];
            $query = "SELECT tovar.* FROM tovar, favourites WHERE tovar.id = favourites.id_product and favourites.id_user = $idUser";
        }
    }

    if ($_GET['Operation'] == 'deleteFavourites'){ //удаление товара из избранного
        if (isset($_GET['idProduct'])) {
            $idProduct = $_GET['idProduct'];
            $query = "DELETE FROM favourites WHERE id_product=$idProduct";
        }
    }

    if ($_GET['Operation'] == 'clearFavourites'){ //удаление товаров из избранного
        if (isset($_GET['idUser'])) {
            $query = "DELETE FROM favourites";
        }
    }
    
    // Выполнение запроса и формирование массива $myArray
    /* Создаем соединение */
    $connect = mysqli_connect($hostname, $username, $password, $dbName);
    if (!$connect) {
        die("Ошибка подключения к БД: " . mysqli_connect_error());
    }
    mysqli_set_charset($connect, "utf8");
    /* Выбираем базу данных. Если произойдет ошибка - вывести ее */
    mysqli_select_db($connect, $dbName) or die ("<p>Не могу создать соединение:".mysqli_error().". Ошибка в строке ".__LINE__."</p>");
    $result = mysqli_query($connect, $query) or die(mysqli_error());

    //$basket = "SELECT * FROM basket"; 
    //$result2 = mysqli_query($connect, $basket);
    $myArray = array();
    while($row = mysqli_fetch_assoc($result)) {
        array_push($myArray, $row);
    }

    // Отправка постов в формате JSON
    header('Content-Type: application/json');
    echo json_encode($myArray);
    mysqli_close($connect);
}
?>