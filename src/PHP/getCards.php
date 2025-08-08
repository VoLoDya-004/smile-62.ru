<?php
require_once "../../../auth/auth.php";

// Получение параметров
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$perPage = 40;
$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$categoryId = isset($_GET['idCategory']) ? intval($_GET['idCategory']) : 0;
$sortType = isset($_GET['sortType']) ? $_GET['sortType'] : 'default';

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

// Создаем соединение
$connect = mysqli_connect($hostname, $username, $password, $dbName);
if (!$connect) {
    die("Ошибка подключения к БД: " . mysqli_connect_error());
}
mysqli_set_charset($connect, "utf8");

// Функция для построения условий фильтрации
function buildFilters($connect, $search, $categoryId, $minPrice, $maxPrice, $actionsFilters) {
    $conditions = [];

    // Поиск по названию
    if ($search !== '') {
        $searchEscaped = mysqli_real_escape_string($connect, $search);
        $conditions[] = "LOWER(nazvanie) LIKE LOWER('%$searchEscaped%')";
    }

    // По категории
    if ($categoryId !== 0) {
        $conditions[] = "id_category = $categoryId";
    }

    // По цене (если minPrice и maxPrice заданы)
    if ($minPrice !== null && $maxPrice !== null) {
        $conditions[] = "price_total >= $minPrice AND price_total <= $maxPrice";
    } elseif ($minPrice !== null) {
        $conditions[] = "price_total >= $minPrice";
    } elseif ($maxPrice !== null) {
        $conditions[] = "price_total <= $maxPrice";
    }

    // Фильтры по скидкам
    $discountConditions = [];
    if ($actionsFilters['action1']) {
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

    if (!empty($discountConditions)) {
        $conditions[] = "(" . implode(" OR ", $discountConditions) . ")";
    }

    // Фильтры по цене (если minPrice и maxPrice не заданы)
    if ($minPrice === null && $maxPrice === null) {
        $priceConditions = [];
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
        if (!empty($priceConditions)) {
            $conditions[] = "(" . implode(" OR ", $priceConditions) . ")";
        }
    }

    return $conditions;
}

// Построение условий для фильтров
$filterConditions = buildFilters($connect, $search, $categoryId, $minPrice, $maxPrice, $actionsFilters);
$filterSQL = '';
if (!empty($filterConditions)) {
    $filterSQL = ' AND ' . implode(' AND ', $filterConditions);
}

// --- Основной запрос для получения товаров с учетом фильтров ---
$query = "SELECT * FROM tovar WHERE 1=1" . $filterSQL;

// Сортировка
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

// Выполняем запрос для получения товаров
$resultItems = mysqli_query($connect, $query) or die(mysqli_error($connect));

$items = [];
while ($row = mysqli_fetch_assoc($resultItems)) {
    $items[] = $row;
}

// --- Второй запрос для подсчета общего количества товаров по текущим фильтрам ---
$countQuery = "SELECT COUNT(*) as total FROM tovar WHERE 1=1" . $filterSQL;

// Выполняем подсчет
$resCount = mysqli_query($connect, $countQuery);
$countRow = mysqli_fetch_assoc($resCount);
$totalCount = intval($countRow['total']);

// Возвращаем оба результата
header('Content-Type: application/json');
echo json_encode([
    'total' => $totalCount,
    'items' => $items
]);

// Закрываем соединение
mysqli_close($connect);
?>