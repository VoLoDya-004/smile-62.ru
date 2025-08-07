<?php
require_once "../../../auth/auth.php";

// Получение параметров
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$perPage = 40;
$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$categoryId = isset($_GET['idCategory']) ? intval($_GET['idCategory']) : 0;
$sortType = isset($_GET['sortType']) ? $_GET['sortType'] : 'default';

// новое
$minPrice = isset($_GET['minPrice']) ? floatval($_GET['minPrice']) : null;
$maxPrice = isset($_GET['maxPrice']) ? floatval($_GET['maxPrice']) : null;
$actionsFilters = [
    'action1' => isset($_GET['action1']) && $_GET['action1'] === '1', // Нет скидки / скидка 0
    'action2' => isset($_GET['action2']) && $_GET['action2'] === '1', // Скидка 1-10%
    'action3' => isset($_GET['action3']) && $_GET['action3'] === '1', // Скидка 10-20%
    'action4' => isset($_GET['action4']) && $_GET['action4'] === '1', // Скидка > 20%
    'action5' => isset($_GET['action5']) && $_GET['action5'] === '1', // Цена < 15000
    'action6' => isset($_GET['action6']) && $_GET['action6'] === '1', // Цена 15000-50000
    'action7' => isset($_GET['action7']) && $_GET['action7'] === '1', // Цена 50000-100000
    'action8' => isset($_GET['action8']) && $_GET['action8'] === '1', // Цена > 100000
];
//

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

// фильтр по цене (если заданы min/max через GET, они переопределяют action5-8)
if ($minPrice !== null && $maxPrice !== null) { // Если задан диапазон min-max
    $query .= " AND price_total >= $minPrice AND price_total <= $maxPrice";
} elseif ($minPrice !== null) { // Если задан только min
    $query .= " AND price_total >= $minPrice";
} elseif ($maxPrice !== null) { // Если задан только max
    $query .= " AND price_total <= $maxPrice";
}


// *** Корректировка логики фильтров actions ***
$discountConditions = [];
$priceConditions = [];

// Фильтры по скидке
if ($actionsFilters['action1']) {
    // Учитываем, что NULL скидка тоже считается отсутствием скидки
    $discountConditions[] = "(discount IS NULL OR discount = 0)";
}
if ($actionsFilters['action2']) {
    $discountConditions[] = "(discount >= 1 AND discount <= 10)";
}
if ($actionsFilters['action3']) {
    $discountConditions[] = "(discount > 10 AND discount <= 20)";
}
if ($actionsFilters['action4']) {
    $discountConditions[] = "(discount > 20)";
}

// Фильтры по цене (если они не перекрыты minPrice/maxPrice из GET)
// Иначе говоря, если minPrice/maxPrice не были переданы, используем action5-8
if ($minPrice === null && $maxPrice === null) {
    if ($actionsFilters['action5']) {
        $priceConditions[] = "(price_total < 15000)";
    }
    if ($actionsFilters['action6']) {
        $priceConditions[] = "(price_total >= 15000 AND price_total <= 50000)";
    }
    if ($actionsFilters['action7']) {
        $priceConditions[] = "(price_total > 50000 AND price_total <= 100000)";
    }
    if ($actionsFilters['action8']) {
        $priceConditions[] = "(price_total > 100000)";
    }
}

// Комбинирование условий
$finalActionConditions = [];

if (!empty($discountConditions)) {
    $finalActionConditions[] = "(" . implode(" OR ", $discountConditions) . ")";
}
if (!empty($priceConditions)) {
    $finalActionConditions[] = "(" . implode(" OR ", $priceConditions) . ")";
}

// Если были выбраны какие-либо из actions фильтров, добавляем их
if (!empty($finalActionConditions)) {
    // Если выбраны и фильтры по скидке, И фильтры по цене, то нужно OR между ними.
    // Но если выбраны только фильтры по скидке, или только по цене, то нужны OR внутри.
    $query .= " AND (" . implode(" OR ", $finalActionConditions) . ")";
}
// *** Конец корректировки ***


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


// Выводим SQL запрос для отладки (можно удалить в продакшене)
// echo $query;


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