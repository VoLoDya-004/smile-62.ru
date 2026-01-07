<?php
$allowed_origins = [
    'http://localhost:3001',
    'http://127.0.0.1:3001'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (preg_match('/^http:\/\/192\.168\.0\.\d{1,3}:3001$/', $origin)) {
    header("Access-Control-Allow-Origin: $origin");
} elseif (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
}

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
?>