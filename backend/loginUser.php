<?php

if (!isset($_POST['Username']) || !isset($_POST['Password'])) {
    $data = array(
        'error' => 'No post-data available!'
    );
    die();
}

$Username = $_POST['Username'];
$Password = $_POST['Password'];

include_once 'pdo-connect.php';

try {
    $stmt = $conn->prepare("SELECT id, username, pwd FROM user WHERE username = :username");
    $stmt->bindParam(':username', $Username);
    if ($stmt->execute() == false) {
        $data = array(
            'error' => 'An error happened!'
        );
    } else {
        $data = array(
            'success' => 'Succesfully logged in!'
        );
    }
} catch (PDOException $e) {
    $data = array(
        'error' => 'An error happened!'
    );
}

header("Content-type: application/json;charset=utf-8");
echo json_encode($data);