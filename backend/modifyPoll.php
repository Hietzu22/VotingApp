<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    $data = array(
        'error' => 'You are not allowed here!'
    );

    header("Content-Type: application/json;charset=utf-8");
    echo json_encode($data);
    die();
}

$json = file_get_contents('php://input');
$pollData = json_decode($json);
$data = array();

include_once 'pdo-connect.php';

try {
    $stmt = $conn->prepare("UPDATE poll SET topic = :topic, start = :start, end = :end WHERE id = :id");
    $stmt->bindparam(":topic", $pollData->topic);
    $stmt->bindparam(":start", $pollData->start);
    $stmt->bindparam(":end", $pollData->end);
    $stmt->bindparam(":id", $pollData->id);

    if($stmt->execute() == false) {
        $data['error'] = 'Error modifying poll!';
    } else {
        $data['success'] = 'Poll modifications saved successfully';
    }

} catch (PSOException $e) {
    $data['error'] = $e->getMessage();
}

try {
    foreach($pollData->options as $option) {
        if(isset($option->id)) {
            $stmt = $conn->prepare("UPDATE option SET name = :name WHERE id = :id;");
            $stmt->bindParam(":name", $option->name);
            $stmt->bindParam(":id", $option->id);
        } else {
            $stmt = $conn->prepare("INSERT INTO option (name, poll_id) VALUES (:name, :poll_id)");
            $stmt->bindParam(":name", $option->name);
            $stmt->bindParam(":poll_id", $pollData->id);
        }

        if($stmt->execute() == false) {
            $data['error'] = 'Error modifying option!';
        } else {
            $data['success'] = 'Option modifications saved successfully';
        }
    }

} catch (PSOException $e) {
    $data['error'] = $e->getMessage();
}

try {
    foreach ($pollData->toDelete as $option) {
            $stmt = $conn->prepare("DELETE FROM option WHERE id = :id;");
            $stmt->bindParam(":id", $option->id);

        if($stmt->execute() == false) {
            $data['error'] = 'Error deleting option!';
        } else {
            $data['success'] = 'Option delete successful';
        }
    }

} catch (PSOException $e) {
    $data['error'] = $e->getMessage();
}

header("Content-Type: application/json;charset=utf-8");
echo json_encode($data);