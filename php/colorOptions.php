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


$sql = "SELECT * FROM attribute_value WHERE attributeID = 2";
$stmt = $conn->prepare($sql);
$stmt->execute();
//$result = $stmt->fetch(PDO::FETCH_ASSOC);
// //Fetch the data from the result set
$data = array();
while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $data[] = array(
        "value" => $result['attribute_valueID'],
        "text" => $result['name']
    );
}

// // // Return the data as a JSON response
// echo ($result);
echo json_encode($data);
