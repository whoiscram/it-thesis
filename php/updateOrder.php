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

$data = json_decode(file_get_contents('php://input'),true);
if (!empty($data)) {
        $orderID = $data['orderID'];
        $amountPaid = $data['amountPaid'];
        $paymentType = $data['paymentType'];
        $paymentName = $data['paymentName'];
        $paymentDate = $data['paymentDate'];
        $paymentStatus = $data['paymentStatus'];
        $paymentID = $data['paymentID'];
        $imageSource = "null";
        // Prepare and execute the update query
        $sql = "UPDATE payment SET orderID= :orderID,amountPaid= :amountPaid,paymentType= :paymentType,paymentName= :paymentName,paymentDate= :paymentDate,imageSource= :imageSource,paymentStatus= :paymentStatus WHERE paymentID = :paymentID";
        $stmt = $conn->prepare($orderID);
        $stmt->bindParam(':orderID', $userID);
        $stmt->bindParam(':amountPaid', $amountPaid);
        $stmt->bindParam(':paymentType', $paymentType);
        $stmt->bindParam(':paymentName', $paymentName);
        $stmt->bindParam(':paymentDate', $paymentDate);
        $stmt->bindParam(':paymentStatus', $paymentStatus);
        $stmt->bindParam(':paymentID', $paymentID);
        $stmt->bindParam(':imageSource', $imageSource);

        if ($stmt->execute()) {
            $data = ['status' => 1, 'message' => "Order successfully updated."];
        } else {
            $data = ['status' => 0, 'message' => "Failed to update order ."];
        }
        echo json_encode($data);
    }




       


       
            