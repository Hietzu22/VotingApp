<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    $data = array(
        'error' => 'You are not logged in!'
    );
    die();
}

if (!isset($_POST['topic']) || !isset($_POST['option1'])) {
    $data = array(
        'error' => 'No POST-Data available!'
    );
}

$data = array(
    'success' => 'Succesfully registered!'
);

$topic = $_POST['topic'];
$start = $_POST['start'];
$end = $_POST['end'];
$user_id =$_SESSION['user_id'];

include_once 'pdo-connect.php';

$options = array();

try {
    $stmt = $conn->prepare("INSERT INTO poll (topic, start, end, user_id)
                            VALUES (:topic, :start, :end, :user_id);");
    $stmt->bindParam(':topic', $topic);
    $stmt->bindParam(':start', $start);
    $stmt->bindParam(':end', $end);
    $stmt->bindParam(':user_id', $user_id);
    if ($stmt->execute() == false) {
        $data = array(
            'error' => 'Error happened!'
        );
    } else {
        $data = array(
            'success' => 'Saving was successful!'
        );
    }
} catch (PDOException $e) {
    $data = array(
        'error' => 'An error happened!'
    );
}

foreach ($_POST as $key => $value) {
    if (substr($key, 0, 6) == 'option') {
        $options[] = $value;
    }
}

$poll_id = $conn->lastInsertId();

try {
    foreach($options as $option) {
        $stmt = $conn->prepare("INSERT INTO option (name, poll_id) VALUES (:name, :poll_id)");
        $stmt->bindParam(':name', $option);
        $stmt->bindParam(':poll_id', $poll_id);
        if ($stmt->execute() == false) {
            $data = array(
                'error' => 'Error happened!'
            );
        } else {
            $data = array(
                'success' => 'Saving was successful!'
            );
        }
    }
}
catch (PDOException $e) {
    $data = array(
        'error' => $e ->getMessage()
    );
}

header("Content-type: application/json;charset=utf-8");
echo json_encode($data);