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

$order = json_decode(file_get_contents('php://input'), true);

$productID =  $order['produdctID'];
$street =  $order['street'];
$pCode = $order['pCode'];
$houseNum = $order['houseNo'];
$paymentType = $order['paymentName'];
$deliveryType = $order['deliveryType'];
$region = $order['region'][1];
$userID = $order['userID'];
$province = $order['province'][1];
$city = $order['city'][1];
$barangay = $order['barangay'];
$orderType = $order['orderType'];

// Insert into Address Table
$addressSQL = "INSERT INTO address (userID, street, houseNo, barangay, city, province, region, postalCode) VALUES (:userID, :street, :houseNo, :barangay, :city, :province, :region, :postalCode)";
$astmt = $conn->prepare($addressSQL);
$astmt->bindParam(':userID', $userID);
$astmt->bindParam(':street', $street);
$astmt->bindParam(':houseNo', $houseNum);
$astmt->bindParam(':barangay', $barangay);
$astmt->bindParam(':city', $city);
$astmt->bindParam(':province', $province);
$astmt->bindParam(':region', $region);
$astmt->bindParam(':postalCode', $pCode);
if ($astmt->execute()) {
    $aresponse = ['status' => 1, 'message' => 'Address successfully added.'];
} else {
    $aresponse = ['status' => 0, 'message' => 'Failed to add address.'];
}
echo json_encode($aresponse);

//order
$getLastInsertID = $conn->lastInsertID(); // id of last inserted (addressID)
$tAmount = $_GET['addOrder'];
date_default_timezone_set('Asia/Manila');
$date = date('y-m-d h:i:s');   
$pending = "pending";

$orderSQL = "INSERT INTO `order` (`orderID`, `addressID`, `userID`, `measurementID`, `attribute_valueID`, `dateOrdered`, `orderStatus`, `orderType`, `totalAmount`) VALUES (NULL, '$getLastInsertID', '$userID', NULL, NULL, '$date', '$pending', '$orderType', '$tAmount')";
$ostmt = $conn->prepare($orderSQL);


if ($ostmt->execute()) {
    $oresponse = ['status' => 1, 'message' => 'Order successfully added.'];
} else {
    $oresponse = ['status' => 0, 'message' => 'Failed to add order.'];
}
echo json_encode($oresponse);

$getLastOrderID = $conn->lastInsertID(); // id of last inserted (orderID)

// order_product
$order_productSQL = "INSERT INTO `order_product` (`productID`, `orderID`, `quantity`, `amount`) VALUES ('$productID', '$getLastOrderID', '$userID', '$tAmount')";
$order_p = $conn->prepare($order_productSQL);
if ($order_p->execute()) {
    $orderp = ['status' => 1, 'message' => 'Order_Product successfully added.'];
} else {
    $orderp = ['status' => 0, 'message' => 'Failed to add order_product.'];
}
echo json_encode($orderp);




