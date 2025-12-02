<?php
// Register new user
// Allows CORS from React dev server and returns JSON
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // CORS preflight
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/db.php';

$body = json_decode(file_get_contents('php://input'), true);
if (!$body) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON']);
    exit;
}

$email = isset($body['email']) ? trim($body['email']) : '';
$password = isset($body['password']) ? $body['password'] : '';
$name = isset($body['name']) ? trim($body['name']) : null;

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 6) {
    echo json_encode(['success' => false, 'message' => 'Invalid email or password (min 6 chars)']);
    exit;
}

$hashed = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare('INSERT INTO users (email, password, name) VALUES (?, ?, ?)');
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'DB prepare failed']);
    exit;
}
$stmt->bind_param('sss', $email, $hashed, $name);
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'User registered']);
} else {
    // Duplicate entry code 1062
    if ($conn->errno === 1062) {
        echo json_encode(['success' => false, 'message' => 'Email already registered']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Database error', 'error' => $conn->error]);
    }
}

$stmt->close();
$conn->close();
