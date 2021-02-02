<?php

if (!isset($_POST['Username']) || !isset($_POST['Password'])) {
    $data = array(
        'error' => 'No post-data available!'
    );
    die();
}

$Username = $_POST['Username'];
$Password = password_hash($_POST['Password'], PASSWORD_DEFAULT);

include_once 'pdo-connect.php';

try {
    $stmt = $conn->prepare("INSERT INTO user (username, pwd) VALUES (:username, :pwd);");
    $stmt->bindParam(':username', $Username);
    $stmt->bindParam(':pwd', $Password);
    if ($stmt->execute() == false) {
        $data = array(
            'error' => 'Error happened during registeration!'
        );
    } else {
        $data = array(
            'success' => 'Succesfully registered!'
        );
    }
} catch (PDOException $e) {
    if(strpos($e->getMessage(), '1062 Duplicate entry')) {
        $data = array(
            'error' => 'Username is already taken!'
        );
    } else {
        $data = array(
            'error' => 'An error happened during registeration!'
        );
    }
}

header("Content-type: application/json;charset=utf-8");
echo json_encode($data);