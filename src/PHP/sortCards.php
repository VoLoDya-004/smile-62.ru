<?php 
require_once "../../../auth/auth.php";

if (isset($_GET['Operation'])) {
    // Подключение к базе данных
    $connect = mysqli_connect($hostname, $username, $password, $dbName);
    if (!$connect) {
        die("Ошибка подключения к БД: " . mysqli_connect_error());
    }
    mysqli_set_charset($connect, "utf8");
    mysqli_select_db($connect, $dbName) or die("<p>Не могу выбрать базу данных: " . mysqli_error($connect) . ". Ошибка в строке " . __LINE__ . "</p>");

    $operation = $_GET['Operation'];
    $myArray = array(); // Исправил на правильный синтаксис

    if ($operation == 'sortCards') {
        // Получение параметра сортировки из GET-запроса
        $sortType = isset($_GET['sortType']) ? $_GET['sortType'] : 'default';
        
        // Определяем порядок сортировки
        $orderBy = "";
        switch ($sortType) {
            case "cheap":
                $orderBy = "ORDER BY price_sale ASC";
                break;
            case "expensive":
                $orderBy = "ORDER BY price_sale DESC";
                break;
            case "discount":
                $orderBy = "ORDER BY discount DESC";
                break;
            case "default":
            default:
                $orderBy = "ORDER BY id ASC";
                break;
        }

        // Параметры пагинации
        $page = isset($_GET['page']) ? intval($_GET['page']) : 1; // страница
        $perPage = 40; // Количество карточек на странице
        $offset = ($page - 1) * $perPage;

        // Запрос на выборку товаров с сортировкой и пагинацией
        $query = "SELECT * FROM tovar " . $orderBy . " LIMIT $offset, $perPage";

        if ($query != "") {
            $result = mysqli_query($connect, $query) or die(mysqli_error($connect));
            while ($row = mysqli_fetch_assoc($result)) {
                $myArray[] = $row;
            }
        }
    }

    // Отправляем результат
    header('Content-Type: application/json');
    echo json_encode($myArray);
    mysqli_close($connect);
}
?>