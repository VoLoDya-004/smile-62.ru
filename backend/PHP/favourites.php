<?php
require_once "./config/cors.php";
require_once "./config/db.php";

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $params = $_GET;
} elseif ($method === 'POST') {
    $input = file_get_contents('php://input');
    $params = json_decode($input, true);
} elseif ($method === 'DELETE') {
    $input = file_get_contents('php://input');
    $params = json_decode($input, true);
    $params = array_merge($params, $_GET);
}

if (isset($params['Operation'])) {
    $operation = $params['Operation'];
    
    $connect = mysqli_connect($hostname, $username, $password, $dbName);
    if (!$connect) {
        die("Ошибка подключения к БД: " . mysqli_connect_error());
    }
    mysqli_set_charset($connect, "utf8");
    mysqli_select_db($connect, $dbName) or die 
    ("<p>Не могу выбрать базу данных: ".mysqli_error($connect).". Ошибка в строке ".__LINE__."</p>");

    $query = "";

    if ($operation == 'addFavourites'){ 
        if (isset($params['idProduct']) && isset($params['idUser'])) {
            $idProduct = $params['idProduct'];
            $idUser = $params['idUser'];

            $checkQuery = "SELECT id FROM favourites WHERE id_user = $idUser AND id_product = $idProduct";
            $checkResult = mysqli_query($connect, $checkQuery);

            if (mysqli_num_rows($checkResult) == 0) {
                $query = "INSERT INTO favourites (id_user, id_product) VALUES ($idUser, $idProduct)";
            }
        }
    }

    if ($operation == 'addBasket'){ 
        if (isset($params['idProduct']) && isset($params['idUser'])) {
            $idProduct = $params['idProduct'];
            $idUser = $params['idUser'];

            $checkQuery = "SELECT id FROM basket WHERE id_user = $idUser AND id_product = $idProduct";
            $checkResult = mysqli_query($connect, $checkQuery);

            if (mysqli_num_rows($checkResult) == 0) {
                $query = "INSERT INTO basket (id_user, id_product, count) VALUES ($idUser, $idProduct, 1)";
            }
        }
    }

    if ($operation == 'showFavourites'){ 
        if (isset($params['idUser'])) {
            $idUser = $params['idUser'];
            $query = 
                "SELECT tovar.* FROM tovar, favourites WHERE 
                tovar.id = favourites.id_product and favourites.id_user = $idUser";
        }
    }

    if ($operation == 'deleteFavourites'){ 
        if (isset($params['idProduct']) && isset($params['idUser'])) {
            $idProduct = $params['idProduct'];
            $idUser = $params['idUser'];
            $query = "DELETE FROM favourites WHERE id_product=$idProduct and id_user = $idUser";
        }
    }

    if ($operation == 'clearFavourites'){ 
        if (isset($params['idUser'])) {
            $idUser = $params['idUser'];
            $query = "DELETE FROM favourites WHERE id_user = $idUser";
        }
    }
    
    if (!empty($query)) {
        $result = mysqli_query($connect, $query) or die(mysqli_error($connect));

        if ($operation == 'showFavourites') {
            $myArray = array();
            while($row = mysqli_fetch_assoc($result)) {
                array_push($myArray, $row);
            }
            header('Content-Type: application/json');
            echo json_encode($myArray);
        } else {
            header('Content-Type: application/json');
            echo json_encode(['success' => true]);
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'No query generated']);
    }
    
    mysqli_close($connect);
} else {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'No operation specified']);
}
?>