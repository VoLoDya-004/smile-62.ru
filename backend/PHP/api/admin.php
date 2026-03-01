<?php
require_once "../config/cors.php";
require_once "../config/db.php";

$method = $_SERVER['REQUEST_METHOD'];

$isMultipart = false;
if ($method === 'POST' && isset($_SERVER['CONTENT_TYPE']) && strpos($_SERVER['CONTENT_TYPE'], 'multipart/form-data') !== false) {
    $isMultipart = true;
    $params = $_POST; 
} elseif ($method === 'GET') {
    $params = $_GET;
} elseif (in_array($method, ['POST', 'PUT', 'PATCH'])) {
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
        $page = isset($params['page']) ? (int)$params['page'] : 1;
        $limit = isset($params['limit']) ? (int)$params['limit'] : 15;
        $offset = ($page - 1) * $limit;
            
        $search = isset($params['search']) ? mysqli_real_escape_string($connect, $params['search']) : '';
        $sortDate = isset($params['sortDate']) && strtolower($params['sortDate']) === 'asc' ? 'ASC' : 'DESC';
        $deliveryTypes = isset($params['deliveryTypes']) ? explode(',', $params['deliveryTypes']) : [];
        $statuses = isset($params['statuses']) ? explode(',', $params['statuses']) : [];
            
        $whereConditions = [];
        if (!empty($search)) {
            $whereConditions[] = "(o.id LIKE '%$search%' OR u.name LIKE '%$search%' OR u.email LIKE '%$search%' OR o.delivery_address LIKE '%$search%')";
        }
        if (!empty($deliveryTypes)) {
            $deliveryTypesEscaped = array_map(function($dt) use ($connect) {
                return "'" . mysqli_real_escape_string($connect, trim($dt)) . "'";
            }, $deliveryTypes);
            $whereConditions[] = "o.delivery_type IN (" . implode(',', $deliveryTypesEscaped) . ")";
        }
        if (!empty($statuses)) {
            $statusesEscaped = array_map(function($s) use ($connect) {
                return "'" . mysqli_real_escape_string($connect, trim($s)) . "'";
            }, $statuses);
            $whereConditions[] = "o.status IN (" . implode(',', $statusesEscaped) . ")";
        }
        
        $whereSql = '';
        if (!empty($whereConditions)) {
            $whereSql = 'WHERE ' . implode(' AND ', $whereConditions);
        }
        
        $countQuery = "SELECT COUNT(*) as total FROM orders o JOIN users u ON o.id_user = u.id_user $whereSql";
        $countResult = mysqli_query($connect, $countQuery);
        $total = mysqli_fetch_assoc($countResult)['total'];
        
        $query = "SELECT o.*, u.name as user_name, u.email as user_email 
                  FROM orders o 
                  JOIN users u ON o.id_user = u.id_user 
                  $whereSql
                  ORDER BY o.created_at $sortDate 
                  LIMIT $offset, $limit";
        
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
            'orders' => $orders,
            'total' => (int)$total,
            'page' => $page,
            'limit' => $limit,
            'hasMore' => ($offset + $limit) < $total
        ];
    }

    elseif ($operation == 'updateOrderStatus') {
        if (isset($params['orderId']) && isset($params['status'])) {
            $orderId = mysqli_real_escape_string($connect, $params['orderId']);
            $status = mysqli_real_escape_string($connect, $params['status']);
            $tracking = isset($params['tracking_number']) ? mysqli_real_escape_string($connect, $params['tracking_number']) : null;

            $validStatuses = ['accepted', 'collected', 'completed', 'cancelled'];
            if (!in_array($status, $validStatuses)) {
                $response = ['success' => false, 'message' => 'Некорректный статус'];
            } else {
                $orderQuery = "SELECT delivery_type FROM orders WHERE id = $orderId";
                $orderResult = mysqli_query($connect, $orderQuery);
                if (!$orderResult || mysqli_num_rows($orderResult) == 0) {
                    $response = ['success' => false, 'message' => 'Заказ не найден'];
                } else {
                    $orderData = mysqli_fetch_assoc($orderResult);
                    $deliveryType = $orderData['delivery_type'];

                    if ($status === 'completed' && $tracking === null && $deliveryType === 'Почта России') {
                        $maxAttempts = 10;
                        $attempt = 0;
                        do {
                            $newTracking = str_pad(mt_rand(0, 99999999999999), 14, '0', STR_PAD_LEFT);
                            $checkQuery = "SELECT COUNT(*) as cnt FROM orders WHERE tracking_number = '$newTracking'";
                            $checkResult = mysqli_query($connect, $checkQuery);
                            $row = mysqli_fetch_assoc($checkResult);
                            $exists = $row['cnt'] > 0;
                            $attempt++;
                            if ($attempt >= $maxAttempts) {
                                $response = ['success' => false, 'message' => 'Не удалось сгенерировать уникальный трек-номер'];
                                echo json_encode($response);
                                exit();
                            }
                        } while ($exists);
                        $tracking = $newTracking;
                    }

                    $updateQuery = "UPDATE orders SET status = '$status'";
                    if ($tracking !== null) {
                        $updateQuery .= ", tracking_number = '$tracking'";
                    }
                    $updateQuery .= " WHERE id = $orderId";

                    if (mysqli_query($connect, $updateQuery)) {
                        $updatedOrderQuery = "SELECT id, status, tracking_number FROM orders WHERE id = $orderId";
                        $updatedResult = mysqli_query($connect, $updatedOrderQuery);
                        $updatedOrder = mysqli_fetch_assoc($updatedResult);
                        $response = [
                            'success' => true,
                            'message' => 'Статус обновлен',
                            'order' => $updatedOrder
                        ];
                    } else {
                        $response = ['success' => false, 'message' => 'Ошибка обновления статуса'];
                    }
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
        $page = isset($params['page']) ? (int)$params['page'] : 1;
        $limit = isset($params['limit']) ? (int)$params['limit'] : 30;
        $offset = ($page - 1) * $limit;

        $search = isset($params['search']) ? mysqli_real_escape_string($connect, $params['search']) : '';
        $filterAdmin = isset($params['filterAdmin']) ? $params['filterAdmin'] : 'all';

        $whereClauses = [];
        if (!empty($search)) {
            $whereClauses[] = "(id_user LIKE '%$search%' OR name LIKE '%$search%' OR email LIKE '%$search%')";
        }
        if ($filterAdmin === 'admin') {
            $whereClauses[] = "is_admin = 1";
        } elseif ($filterAdmin === 'not_admin') {
            $whereClauses[] = "is_admin = 0";
        }

        $whereSql = '';
        if (!empty($whereClauses)) {
            $whereSql = 'WHERE ' . implode(' AND ', $whereClauses);
        }

        $countQuery = "SELECT COUNT(*) as total FROM users $whereSql";
        $countResult = mysqli_query($connect, $countQuery);
        $total = mysqli_fetch_assoc($countResult)['total'];

        $query = "SELECT 
                    id_user, 
                    name, 
                    email, 
                    is_admin,
                    (SELECT COUNT(*) FROM orders WHERE id_user = users.id_user) as orders_count,
                    (SELECT balance FROM wallets WHERE id_user = users.id_user) as balance
                  FROM users 
                  $whereSql
                  ORDER BY id_user DESC 
                  LIMIT $offset, $limit";

        $result = mysqli_query($connect, $query);

        $users = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $users[] = $row;
        }

        $response = [
            'success' => true,
            'users' => $users,
            'total' => (int)$total,
            'page' => $page,
            'limit' => $limit,
            'hasMore' => ($offset + $limit) < $total
        ];
    }

    elseif ($operation == 'addProduct') {
        if (empty($params['nazvanie']) || empty($params['price'])) {
            $response = ['success' => false, 'message' => 'Не указаны название или цена'];
        } else {
            $nazvanie = mysqli_real_escape_string($connect, $params['nazvanie']);
            $price = (float)$params['price'];
            $price_sale = isset($params['price_sale']) && $params['price_sale'] !== '' ? (float)$params['price_sale'] : $price;
            $id_category = isset($params['id_category']) ? (int)$params['id_category'] : 1;

            $imageName = 'default.jpg';

            if ($isMultipart && isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
                $file = $_FILES['image'];
                $tmpName = $file['tmp_name'];
                $originalName = $file['name'];
                $fileSize = $file['size'];
                $fileType = $file['type'];

                if ($fileSize > 2 * 1024 * 1024) {
                    $response = ['success' => false, 'message' => 'Файл слишком большой (макс 2MB)'];
                    echo json_encode($response);
                    exit();
                }

                $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/avif'];
                if (!in_array($fileType, $allowedTypes)) {
                    $response = ['success' => false, 'message' => 'Неподдерживаемый формат. Разрешены JPEG, PNG, GIF, AVIF.'];
                    echo json_encode($response);
                    exit();
                }

                $baseName = uniqid() . '_' . preg_replace('/[^a-zA-Z0-9_-]/', '', pathinfo($originalName, PATHINFO_FILENAME));
                $imageName = $baseName;

                $uploadDir = $_SERVER['DOCUMENT_ROOT'] . '/public/images/tovar/';

                if (!is_dir($uploadDir)) {
                    mkdir($uploadDir, 0777, true);
                }

                $pngPath = $uploadDir . $baseName . '.png';
                $avifPath = $uploadDir . $baseName . '.avif';

                $image = null;
                switch ($fileType) {
                    case 'image/jpeg':
                        $image = imagecreatefromjpeg($tmpName);
                        break;
                    case 'image/png':
                        $image = imagecreatefrompng($tmpName);
                        break;
                    case 'image/gif':
                        $image = imagecreatefromgif($tmpName);
                        break;
                    case 'image/avif':
                        if (function_exists('imagecreatefromavif')) {
                            $image = imagecreatefromavif($tmpName);
                        } else {
                            $response = ['success' => false, 'message' => 'Сервер не поддерживает AVIF. Пожалуйста, загрузите JPEG, PNG или GIF.'];
                            echo json_encode($response);
                            exit();
                        }
                        break;
                }

                if (!$image) {
                    $response = ['success' => false, 'message' => 'Не удалось обработать изображение'];
                    echo json_encode($response);
                    exit();
                }

                if (!imagepng($image, $pngPath)) {
                    $response = ['success' => false, 'message' => 'Ошибка сохранения PNG'];
                    echo json_encode($response);
                    exit();
                }

                if (function_exists('imageavif')) {
                    imageavif($image, $avifPath, 80);
                }
            }

            $query = "INSERT INTO tovar (nazvanie, price, price_sale, image, id_category) 
                      VALUES ('$nazvanie', $price, $price_sale, '$imageName', $id_category)";

            if (mysqli_query($connect, $query)) {
                $response = ['success' => true, 'message' => 'Товар добавлен'];
            } else {
                $response = ['success' => false, 'message' => 'Ошибка добавления товара: ' . mysqli_error($connect)];
            }
        }
    }

    elseif ($operation == 'updateUserAdminStatus') {
        if (isset($params['targetUserId']) && isset($params['isAdmin'])) {
            $targetUserId = mysqli_real_escape_string($connect, $params['targetUserId']);
            $newIsAdmin = $params['isAdmin'] ? 1 : 0; 

            $checkUserQuery = "SELECT id_user FROM users WHERE id_user = $targetUserId";
            $checkUserResult = mysqli_query($connect, $checkUserQuery);
            if (mysqli_num_rows($checkUserResult) == 0) {
                $response = ['success' => false, 'message' => 'Пользователь не найден'];
            } else {
                if ($newIsAdmin == 0) {
                    $adminCountQuery = "SELECT COUNT(*) as cnt FROM users WHERE is_admin = 1";
                    $adminCountResult = mysqli_query($connect, $adminCountQuery);
                    $adminCount = mysqli_fetch_assoc($adminCountResult)['cnt'];

                    if ($adminCount <= 1 && $targetUserId == $idUser) {
                        $response = ['success' => false, 'message' => 'Нельзя удалить последнего администратора'];
                        echo json_encode($response);
                        exit();
                    }
                }

                $updateQuery = "UPDATE users SET is_admin = $newIsAdmin WHERE id_user = $targetUserId";
                if (mysqli_query($connect, $updateQuery)) {
                    $response = [
                        'success' => true,
                        'message' => 'Права администратора обновлены',
                        'user' => [
                            'id_user' => $targetUserId,
                            'is_admin' => $newIsAdmin
                        ]
                    ];
                } else {
                    $response = ['success' => false, 'message' => 'Ошибка при обновлении прав'];
                }
            }
        } else {
            $response = ['success' => false, 'message' => 'Не указаны целевой пользователь или статус'];
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