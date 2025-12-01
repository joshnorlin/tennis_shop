<?php
// Database connection configuration for XAMPP MySQL
$servername = "localhost";  // XAMPP default host
$username = "root";         // XAMPP default username (no password by default)
$password = "";             // XAMPP default password (empty)
$dbname = "loginsystem";    // Database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set charset to utf8
$conn->set_charset("utf8mb4");

?>
