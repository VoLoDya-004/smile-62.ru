<?php
require_once "../../../auth/auth.php";

// Получаем origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    $origin = $_SERVER['HTTP_ORIGIN'];
} else {
    $origin = '';
}

// Разрешаем только ваш фронтенд (если нужно)
$allowed_origins = ['http://localhost:3001'];
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
}

// Разрешаем нужные методы
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Обработка preflight-запроса
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Можно указать дополнительные заголовки, если нужно
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    exit; // Завершаем выполнение для OPTIONS-запроса
}

if (isset($_GET['Operation'])) {
    if ($_GET['Operation'] == 'register') {
        // Получение данных POST-запроса
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $name = trim($data['name']);
        $email = trim($data['email']);
        $passwordUser = trim($data['password']);
        $confirmPassword = trim($data['confirmPassword']);

        if (!$name || !$email || !$passwordUser || !$confirmPassword) {
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'Пожалуйста, заполните все поля']);
            exit;
        }

        if ($passwordUser !== $confirmPassword) {
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'Пароли не совпадают']);
            exit;
        }

        // Подключение к базе данных
        $connect = mysqli_connect($hostname, $username, $password, $dbName);
        if (!$connect) {
            die("Ошибка подключения к БД: " . mysqli_connect_error());
        }
        mysqli_set_charset($connect, "utf8");

        // Проверка существования email
        $query_check = "SELECT id_user FROM users WHERE email = '" . mysqli_real_escape_string($connect, $email) . "'";
        $result_check = mysqli_query($connect, $query_check);
        if ($result_check && mysqli_num_rows($result_check) > 0) {
            mysqli_close($connect);
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'Email уже зарегистрирован']);
            exit;
        }

        // Хеширование пароля
        $hashedPassword = password_hash($passwordUser, PASSWORD_DEFAULT);

        // Вставка нового пользователя
        $query_insert = "INSERT INTO users (name, email, password) VALUES (
            '" . mysqli_real_escape_string($connect, $name) . "',
            '" . mysqli_real_escape_string($connect, $email) . "',
            '" . mysqli_real_escape_string($connect, $hashedPassword) . "'
        )";

        if (mysqli_query($connect, $query_insert)) {
            header('Content-Type: application/json');
            echo json_encode(['success' => true, 'message' => 'Регистрация прошла успешно']);
        } else {
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'Ошибка при регистрации']);
        }

        mysqli_close($connect);
    }
}
?>