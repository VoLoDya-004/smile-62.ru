<?php
require_once "../../../auth/auth.php";

if (isset($_SERVER['HTTP_ORIGIN'])) {
    $origin = $_SERVER['HTTP_ORIGIN'];
} else {
    $origin = '';
}

$allowed_origins = ['http://localhost:3001'];
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
}
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    exit;
}

if (isset($_GET['Operation']) && $_GET['Operation'] == 'login') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $email = trim($data['email'] ?? '');
    $passwordUser = trim($data['password'] ?? '');

    if (!$email || !$passwordUser) {
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
?>