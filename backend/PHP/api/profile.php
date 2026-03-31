<?php
require_once "../config/cors.php";
require_once "../config/db.php";

function generateToken() {
    return bin2hex(random_bytes(32));
}

function getUserByToken($connect) {
    if (!isset($_COOKIE['auth_token'])) {
        return null;
    }
    $token = mysqli_real_escape_string($connect, $_COOKIE['auth_token']);
    
    $query = "SELECT user_id FROM user_tokens 
              WHERE token = '$token' AND expires_at > NOW()";
    $result = mysqli_query($connect, $query);
    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $userId = $row['user_id'];
        
        $userQuery = "SELECT id_user, name, email, is_admin FROM users WHERE id_user = $userId";
        $userResult = mysqli_query($connect, $userQuery);
        return mysqli_fetch_assoc($userResult);
    }
    return null;
}

function deleteUserTokens($connect, $userId) {
    $query = "DELETE FROM user_tokens WHERE user_id = $userId";
    mysqli_query($connect, $query);
}

if (isset($_SERVER['HTTP_ORIGIN'])) {
    $origin = $_SERVER['HTTP_ORIGIN'];
} else {
    $origin = '';
}

$allowed_origins = ['http://localhost:3001'];
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
}

header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PATCH, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

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
                deleteUserTokens($connect, $user['id_user']);

                $token = generateToken();
                $expires = date('Y-m-d H:i:s', time() + 60*60*24*30);
                $insertToken = "INSERT INTO user_tokens (user_id, token, expires_at) 
                                VALUES ({$user['id_user']}, '$token', '$expires')";
                mysqli_query($connect, $insertToken);

                setcookie('auth_token', $token, [
                    'expires' => time() + 60*60*24*30,
                    'path' => '/',
                    'secure' => false,
                    'httponly' => true,
                    'samesite' => 'Lax'
                ]);

                echo json_encode([
                    'success' => true,
                    'message' => 'Вы успешно вошли',
                    'name' => $user['name'],
                    'email' => $user['email'], 
                    'id_user' => $user['id_user'],
                    'is_admin' => $user['is_admin']
                ]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Неверный пароль']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Пользователь не найден']);
        }

        mysqli_close($connect);
    }

    elseif ($operation == 'getMe') {
        $connect = mysqli_connect($hostname, $username, $password, $dbName);
        if (!$connect) {
            die("Ошибка подключения к БД: " . mysqli_connect_error());
        }
        mysqli_set_charset($connect, "utf8");

        $token = null;
        if (isset($_COOKIE['auth_token'])) {
            $token = $_COOKIE['auth_token'];
        }
        elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
            if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
                $token = $matches[1];
            }
        }

        if (!$token) {
            mysqli_close($connect);
            echo json_encode(['success' => false, 'message' => 'Не авторизован']);
            exit;
        }

        $token = mysqli_real_escape_string($connect, $token);

        $query = "SELECT user_id FROM user_tokens 
                  WHERE token = '$token' AND expires_at > NOW()";
        $result = mysqli_query($connect, $query);
        if ($result && mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            $userId = $row['user_id'];

            $newExpires = date('Y-m-d H:i:s', time() + 60*60*24*30);
            $update = "UPDATE user_tokens SET expires_at = '$newExpires' WHERE token = '$token'";
            mysqli_query($connect, $update);

            setcookie('auth_token', $token, [
                'expires' => time() + 60*60*24*30,
                'path' => '/',
                'secure' => false,
                'httponly' => true,
                'samesite' => 'Lax'
            ]);

            $userQuery = "SELECT id_user, name, email, is_admin FROM users WHERE id_user = $userId";
            $userResult = mysqli_query($connect, $userQuery);
            $user = mysqli_fetch_assoc($userResult);

            mysqli_close($connect);
            echo json_encode(['success' => true, 'user' => $user]);
        } else {
            mysqli_close($connect);
            echo json_encode(['success' => false, 'message' => 'Не авторизован']);
        }
    }

    elseif ($operation == 'logout') {
        $connect = mysqli_connect($hostname, $username, $password, $dbName);
        if (!$connect) {
            die("Ошибка подключения к БД: " . mysqli_connect_error());
        }
        mysqli_set_charset($connect, "utf8");

        if (isset($_COOKIE['auth_token'])) {
            $token = mysqli_real_escape_string($connect, $_COOKIE['auth_token']);
            $query = "DELETE FROM user_tokens WHERE token = '$token'";
            mysqli_query($connect, $query);
        }

        setcookie('auth_token', '', [
            'expires' => 1,
            'path' => '/',
            'httponly' => true,
            'samesite' => 'Lax'
        ]);

        mysqli_close($connect);
        echo json_encode(['success' => true, 'message' => 'Выход выполнен']);
    }

    elseif ($operation == 'updateProfile') {
        $connect = mysqli_connect($hostname, $username, $password, $dbName);
        if (!$connect) {
            die("Ошибка подключения к БД: " . mysqli_connect_error());
        }
        mysqli_set_charset($connect, "utf8");

        $user = getUserByToken($connect);
        if (!$user) {
            mysqli_close($connect);
            echo json_encode(['success' => false, 'message' => 'Не авторизован']);
            exit;
        }
        $userId = $user['id_user'];

        $name = trim($params['name'] ?? '');
        $email = trim($params['email'] ?? '');
        $newPassword = trim($params['password'] ?? '');

        if (!$name || !$email) {
            echo json_encode(['success' => false, 'message' => 'Имя и email обязательны']);
            exit;
        }

        $query_check = "SELECT id_user FROM users WHERE email='" . mysqli_real_escape_string($connect, $email) . "' AND id_user != $userId";
        $result_check = mysqli_query($connect, $query_check);
        if ($result_check && mysqli_num_rows($result_check) > 0) {
            mysqli_close($connect);
            echo json_encode(['success' => false, 'message' => 'Email уже зарегистрирован']);
            exit;
        }

        if (!empty($newPassword)) {
            $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
            $query_update = "UPDATE users SET name='" . mysqli_real_escape_string($connect, $name) . "', email='" . mysqli_real_escape_string($connect, $email) . "', password='" . mysqli_real_escape_string($connect, $hashedPassword) . "' WHERE id_user=$userId";
        } else {
            $query_update = "UPDATE users SET name='" . mysqli_real_escape_string($connect, $name) . "', email='" . mysqli_real_escape_string($connect, $email) . "' WHERE id_user=$userId";
        }

        if (mysqli_query($connect, $query_update)) {
            echo json_encode([
                'success' => true,
                'message' => 'Профиль обновлён',
                'name' => $name,
                'email' => $email
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Ошибка при обновлении профиля']);
        }
        mysqli_close($connect);
    }

    elseif ($operation == 'deleteAccount') {
        $connect = mysqli_connect($hostname, $username, $password, $dbName);
        if (!$connect) {
            die("Ошибка подключения к БД: " . mysqli_connect_error());
        }
        mysqli_set_charset($connect, "utf8");

        $user = getUserByToken($connect);
        if (!$user) {
            mysqli_close($connect);
            echo json_encode(['success' => false, 'message' => 'Не авторизован']);
            exit;
        }
        $userId = $user['id_user'];

        $query_delete = "DELETE FROM users WHERE id_user=$userId";
        if (mysqli_query($connect, $query_delete)) {
            setcookie('auth_token', $token, [
                'expires' => time() + 60*60*24*30,
                'path' => '/',
                'secure' => false,
                'httponly' => true,
                'samesite' => 'Lax'
            ]);
            echo json_encode(['success' => true, 'message' => 'Аккаунт удалён']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Ошибка при удалении аккаунта']);
        }
        mysqli_close($connect);
    }

    elseif ($operation == 'getTransactions') {
        $connect = mysqli_connect($hostname, $username, $password, $dbName);
        if (!$connect) {
            die("Ошибка подключения к БД: " . mysqli_connect_error());
        }
        mysqli_set_charset($connect, "utf8");

        $user = getUserByToken($connect);
        if (!$user) {
            mysqli_close($connect);
            echo json_encode(['success' => false, 'message' => 'Не авторизован']);
            exit;
        }
        $userId = $user['id_user'];

        $page = isset($params['page']) ? (int)$params['page'] : 1;
        $limit = isset($params['limit']) ? (int)$params['limit'] : 30;
        $offset = ($page - 1) * $limit;

        $countQuery = "SELECT COUNT(*) as total FROM transactions WHERE id_user = $userId";
        $countResult = mysqli_query($connect, $countQuery);
        $total = mysqli_fetch_assoc($countResult)['total'];

        $query = "SELECT id, amount, type, description, created_at 
                  FROM transactions 
                  WHERE id_user = $userId 
                  ORDER BY created_at DESC 
                  LIMIT $offset, $limit";
        $result = mysqli_query($connect, $query);

        $transactions = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $transactions[] = $row;
        }

        mysqli_close($connect);

        echo json_encode([
            'success' => true,
            'transactions' => $transactions,
            'total' => (int)$total,
            'page' => $page,
            'limit' => $limit,
            'hasMore' => ($offset + $limit) < $total
        ]);
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