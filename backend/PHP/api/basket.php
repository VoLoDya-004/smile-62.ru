<?php
require_once "../config/cors.php";
require_once "../config/db.php";

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $params = $_GET;
} elseif ($method === 'POST') {
    $input = file_get_contents('php://input');
    $params = json_decode($input, true);
} elseif ($method === 'DELETE' || $method === 'PATCH') {
    $input = file_get_contents('php://input');
    $params = json_decode($input, true);
    $params = array_merge($params, $_GET);
}

if (isset($params['Operation'])) {
    $connect = mysqli_connect($hostname, $username, $password, $dbName);
    if (!$connect) {
        die("Ошибка подключения к БД: " . mysqli_connect_error());
    }
    mysqli_set_charset($connect, "utf8");
    mysqli_select_db($connect, $dbName) or die 
    ("<p>Не могу выбрать базу данных: ".mysqli_error($connect).". Ошибка в строке ".__LINE__."</p>");

    $query = "";
    $operation = $params['Operation'];

    if ($operation == 'addBasket'){
        if (isset($params['idProduct'])) {
            $idProduct = $params['idProduct'];
            $idUser = $params['idUser'];

            $checkQuery = "SELECT id FROM basket WHERE id_user = $idUser AND id_product = $idProduct";
            $checkResult = mysqli_query($connect, $checkQuery);

            if (mysqli_num_rows($checkResult) == 0) {
                $query = "INSERT INTO basket (id_user, id_product, count) VALUES ($idUser, $idProduct, 1)";
            }
        }
    }

    if ($operation == 'showBasket'){ 
        if (isset($params['idUser'])) {
            $idUser = $params['idUser'];
            $query = 
                "SELECT * FROM tovar INNER JOIN basket ON tovar.id = basket.id_product WHERE 
                basket.id_user = $idUser";
        }
    }

    if ($operation == 'deleteBasket'){
        if (isset($params['idProduct'])) {
            $idProduct = $params['idProduct'];
            $userId = $params['idUser'];
            $query = "DELETE FROM basket WHERE id=$idProduct and id_user = $userId";
        }
    }

    if ($operation == 'increaseBasket'){
        if (isset($params['idProduct'])) {
            $idProduct = $params['idProduct'];
            $userId = $params['idUser'];
            $query = 
                "UPDATE basket SET count = count + 1 WHERE id=$idProduct and id_user = $userId";
        }
    }

    if ($operation == 'decreaseBasket'){ 
        if (isset($params['idProduct'])) {
            $idProduct = $params['idProduct'];
            $userId = $params['idUser'];
            $query = 
                "UPDATE basket SET count = count - 1 WHERE id=$idProduct and id_user = $userId";
        }
    }

    if ($operation == 'updateCount'){
        if (isset($params['idProduct'])) {
            $idProduct = $params['idProduct'];
            $userId = $params['idUser'];
            $newCount  = $params['count'];
            $query = 
                "UPDATE basket SET count = $newCount WHERE id=$idProduct and id_user = $userId";
        }
    }

    if ($operation == 'clearBasket'){ 
        if (isset($params['idUser'])) {
            $userId = $params['idUser'];
            $query = "DELETE FROM basket WHERE id_user = $userId";
        }
    }
    
    if (!empty($query)) {
        $result = mysqli_query($connect, $query) or die(mysqli_error($connect));

        if ($operation == 'showBasket') {
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