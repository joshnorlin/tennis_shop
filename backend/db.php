<?php
// Basic CORS handling - echo allowed origin and enable credentials for dev
// List the origins you want to allow (development and production as needed)
$allowed_origins = [
    'http://localhost:5173', // Vite dev server
    'http://localhost',
    'http://127.0.0.1'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin && in_array($origin, $allowed_origins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
}

// Handle preflight OPTIONS requests early
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Let the caller know preflight is accepted
    http_response_code(204);
    exit;
}

// Database connection configuration for XAMPP MySQL
$servername = "localhost";  // XAMPP default host
$username = "root";         // XAMPP default username (no password by default)
$password = "";             // XAMPP default password (empty)
$dbname = "tennis_shop";    // Database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set charset to utf8
$conn->set_charset("utf8mb4");

?>
