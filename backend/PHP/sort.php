<?php
require_once "./cors.php";
require_once "./auth.php";

if (isset($_GET['Operation'])) {
    $connect = mysqli_connect($hostname, $username, $password, $dbName);
    if (!$connect) {
        die("Ошибка подключения к БД: " . mysqli_connect_error());
    }
    mysqli_set_charset($connect, "utf8");
    mysqli_select_db($connect, $dbName) or die 
    ("<p>Не могу выбрать базу данных: ".mysqli_error($connect).". Ошибка в строке ".__LINE__."</p>");

    $operation = $_GET['Operation'];
    $myArray = array();

    if ($operation == 'showCards') { 
        if (isset($_GET['idUser'])) {
            $query = "SELECT * FROM tovar";
        }
    }

    if ($operation == 'getCategoryProducts') {
        if (isset($_GET['idCategory'])) {
            $idCategory = $_GET['idCategory']; 
            $query = "SELECT * FROM tovar WHERE id_category = $idCategory";
        } else {
            $query = "SELECT * FROM tovar WHERE 1=0";
        }
    }
 
    if ($query != "") {
        $result = mysqli_query($connect, $query) or die(mysqli_error($connect));
        while ($row = mysqli_fetch_assoc($result)) {
            $myArray[] = $row;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($myArray);
    mysqli_close($connect);
}
?>