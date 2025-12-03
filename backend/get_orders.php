<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/db.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not authenticated']);
    exit;
}

$user_id = (int)$_SESSION['user_id'];

$orders = [];
$stmt = $conn->prepare('SELECT id, total_price, status, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC');
$stmt->bind_param('i', $user_id);
$stmt->execute();
$res = $stmt->get_result();
while ($row = $res->fetch_assoc()) {
    $order_id = (int)$row['id'];
    $order = [
        'id' => $order_id,
        'total_price' => (float)$row['total_price'],
        'status' => $row['status'],
        'created_at' => $row['created_at'],
        'items' => []
    ];

    $itemStmt = $conn->prepare('SELECT product_id, name, price, quantity, image FROM order_items WHERE order_id = ?');
    $itemStmt->bind_param('i', $order_id);
    $itemStmt->execute();
    $itemRes = $itemStmt->get_result();
    while ($it = $itemRes->fetch_assoc()) {
        $order['items'][] = [
            'product_id' => $it['product_id'],
            'name' => $it['name'],
            'price' => (float)$it['price'],
            'quantity' => (int)$it['quantity'],
            'image' => $it['image']
        ];
    }
    $itemStmt->close();

    $orders[] = $order;
}
$stmt->close();

echo json_encode(['success' => true, 'orders' => $orders]);

$conn->close();
?>
