<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");

include './config/database.php';
$objDb = new DatabaseService;
$conn = $objDb->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM product";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE productID = :productID";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':productID', $path[3]);
            $stmt->execute();
            $product = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $product = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($product);
        break;
    }
    
?>