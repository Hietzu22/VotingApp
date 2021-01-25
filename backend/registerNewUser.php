<?php

if (!isset($_POST['Username']) || !isset($_POST['Password'])) {
    echo 'An Error happened, no post-data available!';
    die();
}

$Username = $_POST['Username'];
$Password = $_POST['Password'];

include_once 'pdo-connect.php';
$stmt = $conn->prepare("INSERT INTO user (username, pwd) VALUES (:username, :pwd);");
$stmt->bindParam(':username', $Username)
$stmt->bindParam(':pwd', $Password)
if ($stmt->execute() == false) {
    echo 'Error happened during registeration!';
} else {
    echo 'Succesfully registered!';
}