<?php
// Login endpoint
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

$body = json_decode(file_get_contents('php://input'), true);
$email = isset($body['email']) ? trim($body['email']) : '';
$password = isset($body['password']) ? $body['password'] : '';

if (!$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'Missing credentials']);
    exit;
}

$stmt = $conn->prepare('SELECT id, password, name FROM users WHERE email = ? LIMIT 1');
$stmt->bind_param('s', $email);
$stmt->execute();
$res = $stmt->get_result();
$user = $res->fetch_assoc();

if ($user && password_verify($password, $user['password'])) {
    // Regenerate session id to prevent fixation
    session_regenerate_id(true);
    $_SESSION['user_id'] = (int)$user['id'];
    $_SESSION['user_name'] = $user['name'];
    echo json_encode(['success' => true, 'user' => ['id' => (int)$user['id'], 'name' => $user['name'], 'email' => $email]]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
}

$stmt->close();
$conn->close();
