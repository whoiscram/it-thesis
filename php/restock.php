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
   $productID = $data['productID'];
    // Prepare and execute the update query
    $sql = "UPDATE product SET qtyStock = qtyStock + (:qtyStock) WHERE productID = (:productId)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':qtyStock', $qtyStock);
    $stmt->bindParam(':productId', $productID);
   

    if ($stmt->execute()) {
        $data = ['status' => 1, 'message' => "Product Stock successfully updated."];
    } else {
        $data = ['status' => 0, 'message' => "Failed to Update Stock."];
    }
    echo json_encode($data);
}

