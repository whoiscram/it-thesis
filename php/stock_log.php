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
    $qtyStock = $data['quantity'];
    $date = $data['productID'];
    $productID = $data['productID'];
    $batchCode = $data['batchCode'];
    $date = $data['date'];
    $description = $data['description'];
   
     // Prepare and execute the update query
     $sql = "INSERT INTO `stock_log` (`stock_logID`, `date`, `productID`, `batchCode`, `quantity`, `description`) VALUES (NULL, :date, :qtyStock, :batchCode, :qtyStock, :description)";
     $stmt = $conn->prepare($sql);
     $stmt->bindParam(':qtyStock', $qtyStock);
     $stmt->bindParam(':date', $date);
     $stmt->bindParam(':productID', $productID);
     $stmt->bindParam(':batchCode', $batchCode);
     $stmt->bindParam(':date', $date);
     $stmt->bindParam(':description', $description);
    
     if ($stmt->execute()) {
         $data = ['status' => 1, 'message' => "Product Stock successfully updated."];
     } else {
         $data = ['status' => 0, 'message' => "Failed to Update Stock."];
     }
     echo json_encode($data);
 }
 