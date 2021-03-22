<?php


if (!isset($_GET['id'])) {
    header('Location: ../user.php');
}

$poll_id = $_GET['id'];

include_once 'pdo-connect.php';

try {
    $stmt = $conn->prepare("DELETE FROM option WHERE poll_id = :pollid");
    $stmt->bindParam(':pollid', $poll_id);

    if ($stmt->execute() == false) {
        $data = array(
            'error' => 'Error occured!'
        );
    } else {
        $data = array(
            'success' => 'Delete successful!'
        );
    }

    $stmt = $conn->prepare("DELETE FROM poll WHERE id = :pollid");
    $stmt->bindParam(':pollid', $poll_id);

    if ($stmt->execute() == false) {
        $data = array(
            'error' => 'Error occured!'
        );
    } else {
        $data = array(
            'success' => 'Delete successful!'
        );
    }

} catch (PDOException $e) {
    $data = array(
        'error' => 'An error happened!'
        
    );
}

header("Content-type: application/json;charset=utf-8");
echo json_encode($data);