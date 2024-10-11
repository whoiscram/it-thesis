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
        $referenceNo = "null";
        $userID = $data['userID'];
        
        $dateShipped = $data['dateShipped'];
        $dateDelivered =$data['dateDelivered'];
        $courierType = $data['courierType'];
        $deliveryStatus = $data['deliveryStatus'];
        $deliveryID = $data['deliveryID'];
        $orderStatus = $data['orderStatus'];
        // Prepare and execute the update query
        $sql = "UPDATE payment SET userID = :userID, orderID = :orderID, amountPaid= :amountPaid, paymentType = :paymentType, paymentName = :paymentName, referenceNo = :referenceNo, paymentDate= :paymentDate,paymentStatus= :paymentStatus WHERE paymentID = :paymentID";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':orderID', $orderID);
        $stmt->bindParam(':amountPaid', $amountPaid);
        $stmt->bindParam(':paymentType', $paymentType);
        $stmt->bindParam(':paymentName', $paymentName);
        $stmt->bindParam(':paymentDate', $paymentDate);
        $stmt->bindParam(':paymentStatus', $paymentStatus);
        $stmt->bindParam(':paymentID', $paymentID);
        $stmt->bindParam(':referenceNo', $referenceNo);
        $stmt->bindParam(':userID', $userID);

        if ($stmt->execute()) {
            $data = ['status' => 1, 'message' => "Order successfully updated."];
        } else {
            $data = ['status' => 0, 'message' => "Failed to update order ."];
        }
        echo json_encode($data);


     
        $sqlDel ="UPDATE delivery SET orderID= :orderID, dateShipped = :dateShipped,dateDelivered = :dateDelivered, courierType = :courierType, deliveryStatus = :deliveryStatus WHERE deliveryID = :deliveryID";
        $stmtm = $conn->prepare($sqlDel);
        $stmtm->bindParam(':dateShipped', $dateShipped);
        $stmtm->bindParam(':dateDelivered', $dateDelivered);
        $stmtm->bindParam(':courierType', $courierType);
        $stmtm->bindParam(':deliveryStatus', $deliveryStatus);
        $stmtm->bindParam(':deliveryID', $deliveryID);
        $stmtm->bindParam(':orderID', $orderID);


        if ($stmtm->execute()) {
            $data = ['status' => 1, 'message' => "Order Delivery successfully updated."];
        } else {
            $data = ['status' => 0, 'message' => "Failed to update order ."];
        }
        echo json_encode($data);

    
        $sqlOrderStatus ="UPDATE `order` SET `orderStatus` = :orderStatus WHERE `orderID` = :orderID;";
        $sm = $conn->prepare($sqlOrderStatus);
        $sm->bindParam(':orderStatus', $orderStatus);
        $sm->bindParam(':orderID', $orderID);
        if ($sm->execute()) {
            $data = ['status' => 1, 'message' => "Order Delivery successfully updated."];
        } else {
            $data = ['status' => 0, 'message' => "Failed to update order ."];
        }
        echo json_encode($data);
    }




       


       
            