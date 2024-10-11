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
// e.g <scheme>/<host>/<resource>/<id>
$resource = $uri[2];
$resourceID = isset($uri[3]) ? $uri[3] : null;



$data = json_decode(file_get_contents('php://input'), true);
if (!empty($data)) {
    $usern = $data['userName'];
    $firstName = $data['firstName'];
    $lastName = $data['lastName'];
    $phoneNumber = $data['phoneNumber'];
    $email = $data['email'];
    $newPassword = $data['newPassword'];
    $userID = $data['userID'];
    // Prepare and execute the update query
    $sql = "UPDATE user SET userName = :userName, firstName = :firstName, lastName = :lastName, phoneNumber = :phoneNumber, email = :email, password = :newPassword WHERE userID = :userID";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':userID', $userID);
    $stmt->bindParam(':userName', $usern);
    $stmt->bindParam(':firstName', $firstName);
    $stmt->bindParam(':lastName', $lastName);
    $stmt->bindParam(':phoneNumber', $phoneNumber);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':newPassword', $newPassword);

    if ($stmt->execute()) {
        $data = ['status' => 1, 'message' => "User successfully updated."];
    } else {
        $data = ['status' => 0, 'message' => "Failed to update user ."];
    }
    echo json_encode($data);
}
