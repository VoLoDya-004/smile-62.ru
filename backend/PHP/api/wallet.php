<?php
require_once "../config/cors.php";
require_once "../config/db.php";

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $params = $_GET;
} elseif ($method === 'POST') {
    $input = file_get_contents('php://input');
    $params = json_decode($input, true);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Метод не разрешен']);
    exit();
}

if (isset($params['Operation'])) {
    $operation = $params['Operation'];
    
    $connect = mysqli_connect($hostname, $username, $password, $dbName);
    if (!$connect) {
        die("Ошибка подключения к БД: " . mysqli_connect_error());
    }
    mysqli_set_charset($connect, "utf8");
    mysqli_select_db($connect, $dbName) or die 
    ("<p>Не могу выбрать базу данных: ".mysqli_error($connect).". Ошибка в строке ".__LINE__."</p>");

    $query = "";
    $response = [];

    if ($operation == 'getBalance') { 
        if (isset($params['idUser'])) {
            $idUser = mysqli_real_escape_string($connect, $params['idUser']);
            
            $query = "SELECT balance FROM wallets WHERE id_user = $idUser";
            $result = mysqli_query($connect, $query);
            
            if ($row = mysqli_fetch_assoc($result)) {
                $balance = $row['balance'];
            } else {
                $queryInsert = "INSERT INTO wallets (id_user, balance) VALUES ($idUser, 0)";
                mysqli_query($connect, $queryInsert);
                $balance = 0;
            }
            
            $queryHistory = "SELECT * FROM transactions WHERE id_user = $idUser ORDER BY created_at DESC";
            $resultHistory = mysqli_query($connect, $queryHistory);
            
            $transactions = [];
            while($rowHistory = mysqli_fetch_assoc($resultHistory)) {
                $transactions[] = $rowHistory;
            }
            
            $response = [
                'balance' => (float)$balance,
                'transactions' => $transactions
            ];
        }
    }

    if ($operation == 'topUpBalance') { 
        if (isset($params['idUser']) && isset($params['amount'])) {
            $idUser = mysqli_real_escape_string($connect, $params['idUser']);
            $amount = (float)$params['amount'];
            
            if ($amount <= 0) {
                $response = ['success' => false, 'message' => 'Сумма должна быть больше 0'];
            } else {
                $checkQuery = "SELECT id FROM wallets WHERE id_user = $idUser";
                $checkResult = mysqli_query($connect, $checkQuery);
                
                if (mysqli_num_rows($checkResult) == 0) {
                    $query = "INSERT INTO wallets (id_user, balance) VALUES ($idUser, $amount)";
                } else {
                    $query = "UPDATE wallets SET balance = balance + $amount WHERE id_user = $idUser";
                }
                
                if (mysqli_query($connect, $query)) {
                    $desc = mysqli_real_escape_string($connect, "Пополнение баланса");
                    $transQuery = "INSERT INTO transactions (id_user, amount, type, description) 
                                   VALUES ($idUser, $amount, 'deposit', '$desc')";
                    mysqli_query($connect, $transQuery);
                    
                    $newBalanceQuery = "SELECT balance FROM wallets WHERE id_user = $idUser";
                    $newBalanceResult = mysqli_query($connect, $newBalanceQuery);
                    $newBalanceRow = mysqli_fetch_assoc($newBalanceResult);
                    $newBalance = $newBalanceRow['balance'];
                    
                    $response = [
                        'success' => true,
                        'newBalance' => (float)$newBalance
                    ];
                } else {
                    $response = ['success' => false, 'message' => 'Ошибка при пополнении баланса'];
                }
            }
        }
    }

    if (!empty($response)) {
        header('Content-Type: application/json');
        echo json_encode($response);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Неверная операция или параметры']);
    }
    
    mysqli_close($connect);
} else {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'No operation specified']);
}
?>
