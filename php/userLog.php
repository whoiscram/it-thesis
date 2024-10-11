<?php

header("Access-Control-Allow-Origin: *"); // enable any domain to send HTTP requests to these endpoints (connection.php)
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

include './config/database.php';
$objDb = new DatabaseService;
$conn = $objDb->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$uri = explode('/', $_SERVER['REQUEST_URI']);
$resource = $uri[2];
$resourceID = isset($uri[3]) ? $uri[3] : null;

$user_log = json_decode(file_get_contents('php://input'),true);


if(!empty($user_log)){

    $sql = "INSERT INTO user_log (`action`, `date`, `description`, `userID`, `userType`) VALUES (:action,  :date, :description, :userID, :userType)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':date', $user_log->date);
    $stmt->bindParam(':userType', $user_log->userType);
    $stmt->bindParam(':userID', $user_log->userID);
    $stmt->bindParam(':action', $user_log->action);
    $stmt->bindParam(':description', $user_log->desc);;


    if ($stmt->execute()) {
        $user_log = ['status' => 1, 'message' => "Action Logged."];
    } else {
        $user_log = ['status' => 0, 'message' => "Failed to log."];
    }
    echo json_encode($user_log);
}

