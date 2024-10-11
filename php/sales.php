<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


include './config/database.php';
$objDb = new DatabaseService;
$conn = $objDb->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$uri = explode('/', $_SERVER['REQUEST_URI']);
// e.g <scheme>/<host>/<resource>/<id>
$resource = $uri[2];
$resourceID = isset($uri[3]) ? $uri[3] : null;


$sql = "SELECT MONTHNAME(dateOrdered) as Month, YEAR(dateOrdered) as Year, CONCAT(FORMAT(SUM(totalAmount),2)) 
    as 'TotalSales' FROM `order` 
    WHERE orderStatus = 'complete' 
     GROUP BY MONTHNAME(dateOrdered) 
    ORDER BY dateOrdered DESC";

$stmt = $conn->prepare($sql);
$stmt->execute();
//$result = $stmt->fetch(PDO::FETCH_ASSOC);
// //Fetch the data from the result set
$data = array();
while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $data[] = array(
        "Total Sales" => $result['Total Sales'],
        "Date" => $result['Date']
    );
}

// // // Return the data as a JSON response
// echo ($result);
echo json_encode($data);

