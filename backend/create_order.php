<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
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

$body = json_decode(file_get_contents('php://input'), true);
if (!$body || !isset($body['cart']) || !is_array($body['cart'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
    exit;
}

$user_id = (int)$_SESSION['user_id'];
$cart = $body['cart'];
$total = isset($body['total']) ? (float)$body['total'] : 0.0;

// Insert order and order items in a transaction
$conn->begin_transaction();
try {
    $status = 'pending';
    $stmt = $conn->prepare('INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, ?)');
    if (!$stmt) throw new Exception('Prepare failed: ' . $conn->error);
    $stmt->bind_param('ids', $user_id, $total, $status);
    if (!$stmt->execute()) throw new Exception('Order insert failed: ' . $stmt->error);
    $order_id = $conn->insert_id;
    $stmt->close();

    $itemStmt = $conn->prepare('INSERT INTO order_items (order_id, product_id, name, price, quantity, image) VALUES (?, ?, ?, ?, ?, ?)');
    if (!$itemStmt) throw new Exception('Prepare item failed: ' . $conn->error);

    foreach ($cart as $item) {
        $product_id = isset($item['id']) ? (string)$item['id'] : '';
        $name = isset($item['name']) ? (string)$item['name'] : '';
        $price = isset($item['price']) ? (float)$item['price'] : 0.0;
        $quantity = isset($item['quantity']) ? (int)$item['quantity'] : 0;
        $image = isset($item['image']) ? (string)$item['image'] : null;
        $itemStmt->bind_param('issdis', $order_id, $product_id, $name, $price, $quantity, $image);
        if (!$itemStmt->execute()) throw new Exception('Item insert failed: ' . $itemStmt->error);
    }
    $itemStmt->close();

    $conn->commit();
    echo json_encode(['success' => true, 'order_id' => $order_id]);
} catch (Exception $e) {
    $conn->rollback();
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

$conn->close();

?>
