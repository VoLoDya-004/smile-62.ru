<?php
require_once "../../../auth/auth.php";

if (isset($_GET['idProduct'])) {
$idProduct = $_GET['idProduct'];
$idUser = $_GET['idUser'];
// запрос данных из базы данных
$query = "INSERT INTO basket (id_user, id_product) VALUES ($idUser, $idProduct)";

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

// Отправка постов в формате JSON
//header('Content-Type: application/json');
//echo json_encode($myArray);
mysqli_close($connect);
}
?>