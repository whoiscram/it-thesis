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

$productID = $_GET['productID'];
$sql = "SELECT * FROM `stock_log` WHERE productID = :productID";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':productID', $productID);
$stmt->execute();
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);
