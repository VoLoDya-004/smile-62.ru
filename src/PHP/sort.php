<?php
require_once "../../../auth/auth.php";

if (isset($_GET['Operation'])) {
    // Подключение к базе данных
    $connect = mysqli_connect($hostname, $username, $password, $dbName);
    if (!$connect) {
        die("Ошибка подключения к БД: " . mysqli_connect_error());
    }
    mysqli_set_charset($connect, "utf8");
    mysqli_select_db($connect, $dbName) or die ("<p>Не могу выбрать базу данных: ".mysqli_error($connect).". Ошибка в строке ".__LINE__."</p>");

    $operation = $_GET['Operation'];
    $myArray = array();

    if ($operation == 'showCards') { //показ всех товаров
        if (isset($_GET['idUser'])) {
            $query = "SELECT * FROM tovar";
        }
    }

    if ($operation == 'getCategoryProducts') {
        // Получение товаров по категории
        if (isset($_GET['idCategory'])) {
            $idCategory = $_GET['idCategory']; 
            $query = "SELECT * FROM tovar WHERE id_category = $idCategory";
        } else {
            // Если idCategory не передан, вернуть пустой массив или ошибку
            $query = "SELECT * FROM tovar WHERE 1=0"; // пустой результат
        }
    }
 
    if ($query != "") {
        $result = mysqli_query($connect, $query) or die(mysqli_error($connect));
        while ($row = mysqli_fetch_assoc($result)) {
            $myArray[] = $row;
        }
    }

    // Отправляем результат
    header('Content-Type: application/json');
    echo json_encode($myArray);
    mysqli_close($connect);
}
?>