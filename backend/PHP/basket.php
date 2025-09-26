<?php
require_once "./auth.php";

if (isset($_GET['Operation'])) {
    if ($_GET['Operation'] == 'addBasket'){
        if (isset($_GET['idProduct'])) {
            $idProduct = $_GET['idProduct'];
            $idUser = $_GET['idUser'];
            $query = 
                "INSERT INTO basket (id_user, id_product, count) VALUES ($idUser, $idProduct, 1)";
        }
    }

    if ($_GET['Operation'] == 'showBasket'){ 
        if (isset($_GET['idUser'])) {
            $idUser = $_GET['idUser'];
            $query = 
                "SELECT * FROM tovar INNER JOIN basket ON tovar.id = basket.id_product WHERE 
                basket.id_user = $idUser";
        }
    }

    if ($_GET['Operation'] == 'deleteBasket'){
        if (isset($_GET['idProduct'])) {
            $idProduct = $_GET['idProduct'];
            $userId = $_GET['idUser'];
            $query = "DELETE FROM basket WHERE id=$idProduct and id_user = $userId";
        }
    }

    if ($_GET['Operation'] == 'increaseBasket'){
        if (isset($_GET['idProduct'])) {
            $idProduct = $_GET['idProduct'];
            $userId = $_GET['idUser'];
            $query = 
                "UPDATE basket SET count = count + 1 WHERE id=$idProduct and id_user = $userId";
        }
    }

    if ($_GET['Operation'] == 'decreaseBasket'){ 
        if (isset($_GET['idProduct'])) {
            $idProduct = $_GET['idProduct'];
            $userId = $_GET['idUser'];
            $query = 
                "UPDATE basket SET count = count - 1 WHERE id=$idProduct and id_user = $userId";
        }
    }

    if ($_GET['Operation'] == 'updateCount'){
        if (isset($_GET['idProduct'])) {
            $idProduct = $_GET['idProduct'];
            $userId = $_GET['idUser'];
            $newCount  = $_GET['count'];
            $query = 
                "UPDATE basket SET count = $newCount WHERE id=$idProduct and id_user = $userId";
        }
    }

    if ($_GET['Operation'] == 'clearBasket'){ 
        if (isset($_GET['idUser'])) {
            $userId = $_GET['idUser'];
            $query = "DELETE FROM basket WHERE id_user = $userId";
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