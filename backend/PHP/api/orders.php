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

    $response = [];

    if ($operation == 'createOrder') { 
        if (isset($params['idUser']) && isset($params['deliveryAddress']) && isset($params['deliveryMethodId'])) {
            $idUser = mysqli_real_escape_string($connect, $params['idUser']);
            $deliveryAddress = mysqli_real_escape_string($connect, $params['deliveryAddress']);
            $deliveryMethodId = (int)$params['deliveryMethodId'];
            $customerNotes = isset($params['customerNotes']) ? mysqli_real_escape_string($connect, $params['customerNotes']) : '';

            $cartQuery = "
                SELECT b.*, t.price_sale, t.nazvanie 
                FROM basket b 
                JOIN tovar t ON b.id_product = t.id 
                WHERE b.id_user = $idUser
            ";
            $cartResult = mysqli_query($connect, $cartQuery);
            
            if (mysqli_num_rows($cartResult) == 0) {
                $response = ['success' => false, 'message' => 'Корзина пуста'];
            } else {
                $deliveryQuery = "SELECT cost, name FROM delivery_methods WHERE id = $deliveryMethodId";
                $deliveryResult = mysqli_query($connect, $deliveryQuery);
                $deliveryMethod = mysqli_fetch_assoc($deliveryResult);
                
                if (!$deliveryMethod) {
                    $response = ['success' => false, 'message' => 'Неверный способ доставки'];
                } else {
                    $totalProducts = 0;
                    $cartItems = [];
                    
                    while($item = mysqli_fetch_assoc($cartResult)) {
                        $itemTotal = $item['price_sale'] * $item['count'];
                        $totalProducts += $itemTotal;
                        $cartItems[] = $item;
                    }
                    
                    $deliveryCost = $deliveryMethod['cost'];
                    $totalAmount = $totalProducts + $deliveryCost;
                    
                    $balanceQuery = "SELECT balance FROM wallets WHERE id_user = $idUser";
                    $balanceResult = mysqli_query($connect, $balanceQuery);
                    $balanceRow = mysqli_fetch_assoc($balanceResult);
                    $balance = $balanceRow ? (float)$balanceRow['balance'] : 0;
                    
                    if ($balance < $totalAmount) {
                        $response = ['success' => false, 'message' => 'Недостаточно средств на балансе'];
                    } else {
                        mysqli_begin_transaction($connect);
                        
                        try {
                            $orderQuery = "
                                INSERT INTO orders (id_user, total_amount, delivery_address, delivery_type, delivery_cost, customer_notes) 
                                VALUES ($idUser, $totalAmount, '$deliveryAddress', '{$deliveryMethod['name']}', $deliveryCost, '$customerNotes')
                            ";
                            
                            if (!mysqli_query($connect, $orderQuery)) {
                                throw new Exception(mysqli_error($connect));
                            }
                            
                            $orderId = mysqli_insert_id($connect);
                            
                            foreach ($cartItems as $item) {
                                $productId = $item['id_product'];
                                $quantity = $item['count'];
                                $price = $item['price_sale'];
                                
                                $itemQuery = "
                                    INSERT INTO order_items (id_order, id_product, quantity, price_at_moment) 
                                    VALUES ($orderId, $productId, $quantity, $price)
                                ";
                                
                                if (!mysqli_query($connect, $itemQuery)) {
                                    throw new Exception(mysqli_error($connect));
                                }
                            }
                            
                            $updateBalanceQuery = "UPDATE wallets SET balance = balance - $totalAmount WHERE id_user = $idUser";
                            if (!mysqli_query($connect, $updateBalanceQuery)) {
                                throw new Exception(mysqli_error($connect));
                            }
                            
                            $transQuery = "
                                INSERT INTO transactions (id_user, amount, type, description) 
                                VALUES ($idUser, $totalAmount, 'payment', 'Оплата заказа #$orderId')
                            ";
                            if (!mysqli_query($connect, $transQuery)) {
                                throw new Exception(mysqli_error($connect));
                            }
                            
                            $clearCartQuery = "DELETE FROM basket WHERE id_user = $idUser";
                            if (!mysqli_query($connect, $clearCartQuery)) {
                                throw new Exception(mysqli_error($connect));
                            }
                            
                            mysqli_commit($connect);
                            
                            $response = [
                                'success' => true,
                                'orderId' => $orderId,
                                'totalAmount' => $totalAmount
                            ];
                            
                        } catch (Exception $e) {
                            mysqli_rollback($connect);
                            $response = ['success' => false, 'message' => 'Ошибка при создании заказа: ' . $e->getMessage()];
                        }
                    }
                }
            }
        }
    }

    if ($operation == 'getUserOrders') { 
        if (isset($params['idUser'])) {
            $idUser = mysqli_real_escape_string($connect, $params['idUser']);
            
            $query = "SELECT * FROM orders WHERE id_user = $idUser ORDER BY created_at DESC";
            $result = mysqli_query($connect, $query);
            
            $orders = [];
            while($row = mysqli_fetch_assoc($result)) {
                $orders[] = $row;
            }
            
            $response = $orders;
        }
    }

    if ($operation == 'getOrderDetails') { 
        if (isset($params['idUser']) && isset($params['orderId'])) {
            $idUser = mysqli_real_escape_string($connect, $params['idUser']);
            $orderId = mysqli_real_escape_string($connect, $params['orderId']);
            
            $orderQuery = "SELECT * FROM orders WHERE id = $orderId AND id_user = $idUser";
            $orderResult = mysqli_query($connect, $orderQuery);
            $order = mysqli_fetch_assoc($orderResult);
            
            if ($order) {
                $itemsQuery = "
                    SELECT oi.*, t.nazvanie, t.image 
                    FROM order_items oi 
                    JOIN tovar t ON oi.id_product = t.id 
                    WHERE oi.id_order = $orderId
                ";
                $itemsResult = mysqli_query($connect, $itemsQuery);
                
                $items = [];
                while($item = mysqli_fetch_assoc($itemsResult)) {
                    $items[] = $item;
                }
                
                $order['items'] = $items;
                $response = $order;
            } else {
                $response = ['success' => false, 'message' => 'Заказ не найден'];
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