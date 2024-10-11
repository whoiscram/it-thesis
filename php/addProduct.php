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


$data = json_decode(file_get_contents('php://input'));

$replaceThis = $data->imageSource;
$imageSource = str_replace("C:\\fakepath\\", "/products/", $replaceThis);





$sql = "INSERT INTO product (productName, price, qtyStock, categoryID, sub_categoryID, attribute_valueID, productDesc, imageSource,  SKU) VALUES (:productName, :price, :qtyStock, :categoryID, :sub_categoryID, :attribute_valueID, :productDesc, :imageSource,  :SKU)";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':attribute_valueID', $data->attribute_valueID);
$stmt->bindParam(':categoryID', $data->categoryID);
$stmt->bindParam(':price', $data->price);
$stmt->bindParam(':productDesc', $data->productDescription);
$stmt->bindParam(':SKU', $data->sku);
$stmt->bindParam(':imageSource', $imageSource);
$stmt->bindParam(':qtyStock', $data->stock);
$stmt->bindParam(':productName', $data->productName);
$stmt->bindParam(':sub_categoryID', $data->sub_categoryID);



if ($stmt->execute()) {
    $data = ['status' => 1, 'message' => "Product successfully created."];
} else {
    $data = ['status' => 0, 'message' => "Failed to record product ."];
}
echo json_encode($data);
