<?php
require_once "../../../auth/auth.php";

if (isset($_GET['Operation'])) {
    if ($_GET['Operation'] == 'addFavourites'){ 
        if (isset($_GET['idProduct'])) {
            $idProduct = $_GET['idProduct'];
            $idUser = $_GET['idUser'];
            $query = "INSERT INTO favourites (id_user, id_product) VALUES ($idUser, $idProduct)";
        }
    }

    if ($_GET['Operation'] == 'addBasket'){ 
        if (isset($_GET['idProduct'])) {
            $idProduct = $_GET['idProduct'];
            $idUser = $_GET['idUser'];
            $query = 
                "INSERT INTO basket (id_user, id_product, count) VALUES ($idUser, $idProduct, 1)";
        }
    }

    if ($_GET['Operation'] == 'showFavourites'){ 
        if (isset($_GET['idUser'])) {
            $idUser = $_GET['idUser'];
            $query = 
                "SELECT tovar.* FROM tovar, favourites WHERE 
                tovar.id = favourites.id_product and favourites.id_user = $idUser";
        }
    }

    if ($_GET['Operation'] == 'deleteFavourites'){ 
        if (isset($_GET['idProduct'])) {
            $idProduct = $_GET['idProduct'];
            $idUser = $_GET['idUser'];
            $query = "DELETE FROM favourites WHERE id_product=$idProduct and id_user = $idUser";
        }
    }

    if ($_GET['Operation'] == 'clearFavourites'){ 
        if (isset($_GET['idUser'])) {
            $idUser = $_GET['idUser'];
            $query = "DELETE FROM favourites WHERE id_user = $idUser";
        }
    }
    
    $connect = mysqli_connect($hostname, $username, $password, $dbName);
    if (!$connect) {
        die("Ошибка подключения к БД: " . mysqli_connect_error());
    }
    mysqli_set_charset($connect, "utf8");
    mysqli_select_db($connect, $dbName) or die 
    ("<p>Не могу выбрать базу данных: ".mysqli_error($connect).". Ошибка в строке ".__LINE__."</p>");
    $result = mysqli_query($connect, $query) or die(mysqli_error($connect));

    $myArray = array();
    while($row = mysqli_fetch_assoc($result)) {
        array_push($myArray, $row);
    }

    header('Content-Type: application/json');
    echo json_encode($myArray);
    mysqli_close($connect);
}
?>