<?php
require_once "../config/cors.php";
require_once "../config/db.php";

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $params = $_GET;
} elseif ($method === 'POST') {
    $input = file_get_contents('php://input');
    $params = json_decode($input, true);
} elseif ($method === 'PUT') {
    $input = file_get_contents('php://input');
    $params = json_decode($input, true);
} elseif ($method === 'PATCH') {
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

    $response = [];

    if (isset($params['idUser'])) {
        $idUser = mysqli_real_escape_string($connect, $params['idUser']);
        $checkAdminQuery = "SELECT is_admin FROM users WHERE id_user = $idUser";
        $adminResult = mysqli_query($connect, $checkAdminQuery);
        $adminRow = mysqli_fetch_assoc($adminResult);
        
        if (!$adminRow || $adminRow['is_admin'] != 1) {
            $response = ['success' => false, 'message' => 'Доступ запрещен. Требуются права администратора'];
            header('Content-Type: application/json');
            echo json_encode($response);
            mysqli_close($connect);
            exit();
        }
    } else {
        $response = ['success' => false, 'message' => 'Не указан пользователь'];
        header('Content-Type: application/json');
        echo json_encode($response);
        mysqli_close($connect);
        exit();
    }

    if ($operation == 'getAllOrders') {
        $query = "SELECT o.*, u.name as user_name, u.email as user_email 
                  FROM orders o 
                  JOIN users u ON o.id_user = u.id_user 
                  ORDER BY o.created_at DESC";
        
        $result = mysqli_query($connect, $query);
        
        $orders = [];
        while($row = mysqli_fetch_assoc($result)) {
            $orderId = $row['id'];
            $itemsQuery = "SELECT oi.*, t.nazvanie as product_name, t.image as product_image 
                          FROM order_items oi 
                          JOIN tovar t ON oi.id_product = t.id 
                          WHERE oi.id_order = $orderId";
            
            $itemsResult = mysqli_query($connect, $itemsQuery);
            $items = [];
            while($item = mysqli_fetch_assoc($itemsResult)) {
                $items[] = $item;
            }
            
            $row['items'] = $items;
            $orders[] = $row;
        }
        
        $response = [
            'success' => true,
            'orders' => $orders
        ];
    }

    elseif ($operation == 'updateOrderStatus') {
        if (isset($params['orderId']) && isset($params['status'])) {
            $orderId = mysqli_real_escape_string($connect, $params['orderId']);
            $status = mysqli_real_escape_string($connect, $params['status']);
            
            $validStatuses = ['accepted', 'collected', 'completed', 'cancelled'];
            if (!in_array($status, $validStatuses)) {
                $response = ['success' => false, 'message' => 'Некорректный статус'];
            } else {
                $query = "UPDATE orders SET status = '$status' WHERE id = $orderId";
                
                if (mysqli_query($connect, $query)) {
                    $response = ['success' => true, 'message' => 'Статус обновлен'];
                } else {
                    $response = ['success' => false, 'message' => 'Ошибка обновления статуса'];
                }
            }
        }
    }

    elseif ($operation == 'getStats') {
        $totalOrdersQuery = "SELECT COUNT(*) as total FROM orders";
        $totalOrdersResult = mysqli_query($connect, $totalOrdersQuery);
        $totalOrders = mysqli_fetch_assoc($totalOrdersResult)['total'];
        
        $totalRevenueQuery = "SELECT SUM(total_amount) as total FROM orders WHERE status != 'cancelled'";
        $totalRevenueResult = mysqli_query($connect, $totalRevenueQuery);
        $totalRevenue = mysqli_fetch_assoc($totalRevenueResult)['total'] ?? 0;
        
        $statusStatsQuery = "SELECT status, COUNT(*) as count FROM orders GROUP BY status";
        $statusStatsResult = mysqli_query($connect, $statusStatsQuery);
        $statusStats = [];
        while($row = mysqli_fetch_assoc($statusStatsResult)) {
            $statusStats[$row['status']] = $row['count'];
        }
        
        $recentOrdersQuery = "SELECT COUNT(*) as count FROM orders WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)";
        $recentOrdersResult = mysqli_query($connect, $recentOrdersQuery);
        $recentOrders = mysqli_fetch_assoc($recentOrdersResult)['count'];
        
        $usersCountQuery = "SELECT COUNT(*) as count FROM users";
        $usersCountResult = mysqli_query($connect, $usersCountQuery);
        $usersCount = mysqli_fetch_assoc($usersCountResult)['count'];
        
        $response = [
            'success' => true,
            'stats' => [
                'totalOrders' => $totalOrders,
                'totalRevenue' => $totalRevenue,
                'statusStats' => $statusStats,
                'recentOrders' => $recentOrders,
                'usersCount' => $usersCount
            ]
        ];
    }

    elseif ($operation == 'getAllUsers') {
        $query = "SELECT id_user, name, email, is_admin, 
                  (SELECT COUNT(*) FROM orders WHERE id_user = users.id_user) as orders_count,
                  (SELECT balance FROM wallets WHERE id_user = users.id_user) as balance
                  FROM users ORDER BY id_user DESC";
        
        $result = mysqli_query($connect, $query);
        
        $users = [];
        while($row = mysqli_fetch_assoc($result)) {
            $users[] = $row;
        }
        
        $response = [
            'success' => true,
            'users' => $users
        ];
    }

    elseif ($operation == 'addProduct') {
        if (isset($params['nazvanie']) && isset($params['price'])) {
            $nazvanie = mysqli_real_escape_string($connect, $params['nazvanie']);
            $price = mysqli_real_escape_string($connect, $params['price']);
            $price_sale = isset($params['price_sale']) ? mysqli_real_escape_string($connect, $params['price_sale']) : $price;
            $image = isset($params['image']) ? mysqli_real_escape_string($connect, $params['image']) : 'default.jpg';
            $id_category = isset($params['id_category']) ? mysqli_real_escape_string($connect, $params['id_category']) : '1';

            $query = "INSERT INTO tovar (nazvanie, price, price_sale, image, id_category) 
                     VALUES ('$nazvanie', $price, $price_sale, '$image', '$id_category')";
            
            if (mysqli_query($connect, $query)) {
                $response = ['success' => true, 'message' => 'Товар добавлен'];
            } else {
                $response = ['success' => false, 'message' => 'Ошибка добавления товара'];
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