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
$data = $_GET['orderID'];
$sql = "SELECT `order`.userID ,`order`.orderID,  CONCAT_WS(' ', firstName, lastName) as 'customerName', 
dateOrdered,
courierType, 
paymentType, 
CONCAT_WS(' ', street, houseNo, barangay, city, province, 'Region', region) AS 'shipTo',
productName,
product.imageSource,
order_product.quantity as 'quantity', 
totalAmount, 
orderStatus,
orderType
FROM `order`
LEFT JOIN user ON user.userID = `order`.userID
LEFT JOIN payment ON payment.orderID = `order`.orderID
LEFT JOIN address ON address.addressID = `order`.addressID
LEFT JOIN order_product ON order_product.orderID = `order`.orderID
LEFT JOIN product ON product.productID = order_product.productID
LEFT JOIN delivery ON delivery.orderID = `order`.orderID
WHERE order.orderID = $data
GROUP BY order_product.productID;";
$stmt = $conn->prepare($sql);
$stmt->execute();
$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($res);
?>