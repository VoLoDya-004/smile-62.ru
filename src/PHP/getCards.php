<?php
require_once "../../../auth/auth.php";

// Получение параметров
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$perPage = 40;
$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$categoryId = isset($_GET['idCategory']) ? intval($_GET['idCategory']) : 0;
$sortType = isset($_GET['sortType']) ? $_GET['sortType'] : 'default';

// Создаем соединение
$connect = mysqli_connect($hostname, $username, $password, $dbName);
if (!$connect) {
    die("Ошибка подключения к БД: " . mysqli_connect_error());
}
mysqli_set_charset($connect, "utf8");

// Строим базовый запрос
$query = "SELECT * FROM tovar WHERE 1=1";

// Условие поиска
if ($search !== '') {
    $searchEscaped = mysqli_real_escape_string($connect, $search);
    $query .= " AND LOWER(nazvanie) LIKE LOWER('%$searchEscaped%')";
}

// Условие по категории
if ($categoryId !== 0) {
    $query .= " AND id_category = $categoryId";
}

// Определение сортировки
switch ($sortType) {
    case 'cheap':
        $query .= " ORDER BY price_sale ASC";
        break;
    case 'expensive':
        $query .= " ORDER BY price_sale DESC";
        break;
    case 'discount':
        $query .= " ORDER BY discount DESC";
        break;
    default:
        $query .= " ORDER BY id ASC";
        break;
}

// Пагинация
$offset = ($page - 1) * $perPage;
$query .= " LIMIT $offset, $perPage";

// Выполняем запрос
$result = mysqli_query($connect, $query) or die(mysqli_error($connect));

// Собираем результат
$myArray = array();
while ($row = mysqli_fetch_assoc($result)) {
    $myArray[] = $row;
}

// Отправляем JSON
header('Content-Type: application/json');
echo json_encode($myArray);

mysqli_close($connect);
?>