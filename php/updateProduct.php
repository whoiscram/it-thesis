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

$productID = $_GET['productID']; // id



$sql = "UPDATE product SET productName= :productName, price= :price, qtyStock = :qtyStock, categoryID = :categoryID, sub_categoryID = :sub_categoryID, attribute_valueID = :attribute_valueID, productDesc = :productDesc, imageSource = :imageSource, SKU = :SKU WHERE productID = $productID";
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
    $data = ['status' => 1, 'message' => "Product successfully updated."];
} else {
    $data = ['status' => 0, 'message' => "Failed to update product ."];
}
echo json_encode($data);
