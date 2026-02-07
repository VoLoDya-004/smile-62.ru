<?php
require_once "../config/cors.php";
require_once "../config/db.php";

if (isset($_SERVER['HTTP_ORIGIN'])) {
    $origin = $_SERVER['HTTP_ORIGIN'];
} else {
    $origin = '';
}

$allowed_origins = ['http://localhost:3001'];
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
}

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    exit; 
}

$input = file_get_contents('php://input');
$params = json_decode($input, true);

if (empty($params) || $params === null) {
    $params = $_GET;
}

if (isset($params['Operation'])) {
    $operation = $params['Operation'];
    
    if ($operation == 'register') {
        $name = trim($params['name'] ?? '');
        $email = trim($params['email'] ?? '');
        $passwordUser = trim($params['password'] ?? '');

        if (!$name || !$email || !$passwordUser) {
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'Пожалуйста, заполните все поля']);
            exit;
        }

        $connect = mysqli_connect($hostname, $username, $password, $dbName);
        if (!$connect) {
            die("Ошибка подключения к БД: " . mysqli_connect_error());
        }
        mysqli_set_charset($connect, "utf8");

        $query_check = 
            "SELECT id_user FROM users WHERE 
            email = '" . mysqli_real_escape_string($connect, $email) . "'";
        $result_check = mysqli_query($connect, $query_check);
        if ($result_check && mysqli_num_rows($result_check) > 0) {
            mysqli_close($connect);
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'Email уже зарегистрирован']);
            exit;
        }

        $hashedPassword = password_hash($passwordUser, PASSWORD_DEFAULT);

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
    
    elseif ($operation == 'login') {
        $email = trim($params['email'] ?? '');
        $passwordUser = trim($params['password'] ?? '');

        if (!$email || !$passwordUser) {
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'Пожалуйста, заполните все поля']);
            exit;
        }

        $connect = mysqli_connect($hostname, $username, $password, $dbName);
        if (!$connect) {
            die("Ошибка подключения к БД: " . mysqli_connect_error());
        }
        mysqli_set_charset($connect, "utf8");

        $query = 
            "SELECT * FROM users WHERE email='" . mysqli_real_escape_string($connect, $email) . "'";
        $result = mysqli_query($connect, $query);

        if ($result && mysqli_num_rows($result) > 0) {
            $user = mysqli_fetch_assoc($result);

            if (password_verify($passwordUser, $user['password'])) {
                session_start();
                $_SESSION['user_id'] = $user['id_user'];
                $_SESSION['user_name'] = $user['name'];
                $_SESSION['user_email'] = $user['email'];

                echo json_encode([
                    'success' => true,
                    'message' => 'Вы успешно вошли',
                    'name' => $user['name'],
                    'id_user' => $user['id_user']
                ]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Неверный пароль']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Пользователь не найден']);
        }

        mysqli_close($connect);
    }
    
    else {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Неизвестная операция']);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Не указана операция']);
}
?>