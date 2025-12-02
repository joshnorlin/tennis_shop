<?php
// Return current logged-in user info (if any)
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
    echo json_encode(['loggedIn' => false]);
    exit;
}

$id = (int)$_SESSION['user_id'];
$stmt = $conn->prepare('SELECT id, email, name, created_at FROM users WHERE id = ? LIMIT 1');
$stmt->bind_param('i', $id);
$stmt->execute();
$res = $stmt->get_result();
$user = $res->fetch_assoc();

if ($user) {
    // cast id to int
    $user['id'] = (int)$user['id'];
    echo json_encode(['loggedIn' => true, 'user' => $user]);
} else {
    echo json_encode(['loggedIn' => false]);
}

$stmt->close();
$conn->close();
