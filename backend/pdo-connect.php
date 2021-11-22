<?php
$servername = "localhost";
$db_username = "hietanen.veeti";
$db_password = "V33t1n";
$dbname = "hietanen.veeti.db";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $db_username, $db_password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error; " . $e->getMessage();
}