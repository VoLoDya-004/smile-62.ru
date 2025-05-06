<?php
require_once "../../../auth/auth.php";

$page = isset($_GET['page']) ? $_GET['page'] : 1; //если page передана из js, то присваиваем её, иначе присваиваем 1
$perPage = 25; // Количество карточек на странице

// запрос данных из базы данных
$offset = ($page - 1) * $perPage;
$query = "SELECT * FROM tovar LIMIT $offset, $perPage";
//$query = "SELECT * FROM tovar";

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

$myArray = array();
while($row = mysqli_fetch_assoc($result)) {
    array_push($myArray, $row);
}
// Отправка постов в формате JSON
header('Content-Type: application/json');
echo json_encode($myArray);
mysqli_close($connect);
?>