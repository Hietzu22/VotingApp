<?php

if(!isset ($_GET['id'])) {
    header('location: ../index.php');
}

$optionid = $_GET['id'];

include_once 'pdo-connect.php';

$data = array();

try {
    $stmt = $conn->prepare("SELECT id, start, end FROM poll WHERE id = (SELECT poll_id FROM option WHERE id = :optionId);");
    $stmt->bindParam(":optionId", $optionid);

    if ($stmt->execute() == false) {
        $data['error'] = 'Error happened!';
    } else {
        $poll = $stmt->fetch(PDO::FETCH_ASSOC);
        $pollid = $poll['id'];

        $current_timestamp = time();
        $start_timestamp = strtotime($poll['start']);
        $end_timestamp = strtotime($poll['end']);

        $cookie_name = "poll_$pollid";
        if (isset($_COOKIE[$cookie_name])) {
            $data['warning'] = 'You have already voted on this poll!';
        } else if ($end_timestamp < $current_timestamp) {
            $data['warning'] = 'This poll is no longer available for voting!';
        } else if ($start_timestamp > $current_timestamp) {
            $data['warning'] = 'This poll in not available to vote yet!';
        }
    }

    if (!array_key_exists('warning', $data)) {
        $stmt = $conn->prepare("UPDATE option SET votes = votes + 1 WHERE (id = :optionid)");

        $stmt->bindParam(':optionid', $optionid);
    
        if ($stmt->execute() == false) {
            $data['error'] = 'Error occured!';
        } else {
            $data['success'] = 'Vote successful!';
            $cookie_name = "poll_$pollid";
            $cookie_value = 1;

            setcookie($cookie_name, $cookie_value, time() + (86400*30), "/");
        } 
    }
} catch (PDOException $e) {
    $data = array(
        'error' => 'An error happened!'
        
    );
}

header("Content-type: application/json;charset=utf-8");
echo json_encode($data);