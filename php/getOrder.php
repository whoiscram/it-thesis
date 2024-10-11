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


// $sql = "SELECT order.userID ,order.orderID,  CONCAT_WS(' ', firstName, lastName) as 'customerName', 
//                         dateOrdered,
//                         courierType, 
//                         CONCAT_WS(' ', street, houseNo, barangay, city, province, 'Region', region) AS 'shipTo', 
//                         SUM(quantity) as 'Items', 
//                         totalAmount, 
//                         orderStatus,
//                         orderType,
//                         paymentType
//                         FROM order 
//                         LEFT JOIN user ON user.userID = order.userID
//                         LEFT JOIN payment ON payment.orderID = order.orderID
//                         LEFT JOIN address ON address.addressID = order.addressID
//                         LEFT JOIN order_product ON order_product.orderID = order.orderID
//                         LEFT JOIN delivery ON delivery.orderID = order.orderID";



//                         // if ($resourceID && is_numeric($resourceID)) {
//                         //     $sql = "WHERE order.orderID = :orderID GROUP BY orderID, courierType";
//                         //     $stmt = $conn->prepare($sql);
//                         //     $stmt->bindParam(':orderID', $resourceID);
//                         //     $stmt->execute();
//                         //     $order = $stmt->fetchAll(PDO::FETCH_ASSOC);
//                         // } else {
//                         //     $sql = "GROUP BY orderID, courierType";
//                         //     $stmt = $conn->prepare($sql);
//                         //     $stmt->execute();
//                         //     $order = $stmt->fetchAll(PDO::FETCH_ASSOC);
//                         // }
// $stmt = $conn->prepare($sql);
// $stmt->execute();
// $order = $stmt->fetchAll(PDO::FETCH_ASSOC);
// echo "testing";
// echo json_encode($order);

$sql = "SELECT `order`.userID ,`order`.orderID,  CONCAT_WS(' ', firstName, lastName) as 'customerName', 
dateOrdered,
courierType, 
CONCAT_WS(' ', street, houseNo, barangay, city, province, 'Region', region) AS 'shipTo', 
SUM(quantity) as 'Items', 
totalAmount, 
orderStatus,
orderType,
paymentType
FROM `order` 
LEFT JOIN user ON user.userID = `order`.userID
LEFT JOIN payment ON payment.orderID = `order`.orderID
LEFT JOIN address ON address.addressID = `order`.addressID
LEFT JOIN order_product ON order_product.orderID = `order`.orderID
LEFT JOIN delivery ON delivery.orderID = `order`.orderID";

if ($resourceID && is_numeric($resourceID)) {
    $sql .= " WHERE order.orderID = :orderID GROUP BY orderID, courierType";
    $stmt = $conn->prepare($sql);
$stmt->bindParam(':orderID', $resourceID);
    $stmt->execute();
$order = $stmt->fetch(PDO::FETCH_ASSOC);
} else {
$sql .= " GROUP BY orderID, courierType";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $order = $stmt->fetchAll(PDO::FETCH_ASSOC);
}
echo " testing";

echo json_encode($order);
