<?php
require_once "../../../auth/auth.php";

$page = isset($_GET['page']) ? intval($_GET['page']) : 1; // страница
$perPage = 40; // Количество карточек

$search = isset($_GET['search']) ? trim($_GET['search']) : '';

/* Создаем соединение */
$connect = mysqli_connect($hostname, $username, $password, $dbName);
if (!$connect) {
    die("Ошибка подключения к БД: " . mysqli_connect_error());
}
mysqli_set_charset($connect, "utf8");

/* Выбираем базу данных */
mysqli_select_db($connect, $dbName) or die ("<p>Не могу создать соединение:".mysqli_error().". Ошибка в строке ".__LINE__."</p>");

// Создаем базовый запрос
$query = "SELECT * FROM tovar";

// Если есть поисковый запрос, добавляем условие
if ($search !== '') {
    // Экранирование для безопасности
    $searchEscaped = mysqli_real_escape_string($connect, $search);
    $query .= " WHERE nazvanie LIKE '%$searchEscaped%'";
}

// Добавляем LIMIT для пагинации
$offset = ($page - 1) * $perPage;
$query .= " LIMIT $offset, $perPage";

/* Выполняем запрос */
$result = mysqli_query($connect, $query) or die(mysqli_error($connect));

$myArray = array();
while($row = mysqli_fetch_assoc($result)) {
    array_push($myArray, $row);
}

// Отправка в формате JSON
header('Content-Type: application/json');
echo json_encode($myArray);

mysqli_close($connect);
?>