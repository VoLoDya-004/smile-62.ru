<?php
require_once "../config/cors.php";
require_once "../config/db.php";

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $connect = mysqli_connect($hostname, $username, $password, $dbName);
    if (!$connect) {
        die("Ошибка подключения к БД: " . mysqli_connect_error());
    }
    mysqli_set_charset($connect, "utf8");
    mysqli_select_db($connect, $dbName) or die 
    ("<p>Не могу выбрать базу данных: ".mysqli_error($connect).". Ошибка в строке ".__LINE__."</p>");

    $query = "SELECT * FROM delivery_methods ORDER BY cost";
    $result = mysqli_query($connect, $query);

    $methods = [];
    while($row = mysqli_fetch_assoc($result)) {
        $methods[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode($methods);

    mysqli_close($connect);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Метод не разрешен']);
}
?>