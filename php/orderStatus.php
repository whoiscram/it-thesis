<?php
header("Access-Control-Allow-Origin: *"); // enable any domain to send HTTP requests to these endpoints (connection.php)
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

switch ($method) {
    case (isset($_GET['complete'])):
        header("Access-Control-Allow-Methods: *");
        $sql = "SELECT COUNT(orderID) as 'complete' FROM `order` WHERE orderStatus = 'complete'";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $complete = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($complete);
        break;
    case (isset($_GET['inTransit'])):
        header("Access-Control-Allow-Methods: *");
        $sql = "SELECT COUNT(deliveryID) as 'inTransit' FROM delivery WHERE deliveryStatus = 'in-transit'";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $inTransit = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($inTransit);
        break;
    case (isset($_GET['confirmed'])):
        header("Access-Control-Allow-Methods: *");
        $sql = "SELECT COUNT(orderID) as 'confirmed' FROM `order`  WHERE orderStatus = 'confirmed'";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $confirmed = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($confirmed);
        break;
    case (isset($_GET['pending'])):
        header("Access-Control-Allow-Methods: *");
        $sql = "SELECT COUNT(orderID) as 'pending' FROM `order` WHERE orderStatus = 'pending'";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $pending = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($pending);
        break;
    case (isset($_GET['cancelled'])):
        header("Access-Control-Allow-Methods: *");
        $sql = "SELECT COUNT(orderID) as 'cancelled' FROM `order`  WHERE orderStatus = 'cancelled'";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $cancelled = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($cancelled);
        break;
    case (isset($_GET['returned'])):
        header("Access-Control-Allow-Methods: *");
        $sql = "SELECT COUNT(orderID) as 'returned' FROM `order` WHERE orderStatus = 'return/refund'";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $returned = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($returned);
        break;
    case (isset($_GET['soldThisMonth'])):
        header("Access-Control-Allow-Methods: *");
        $sql = "SELECT MONTHNAME(now()) as 'currentMonth', COUNT(productID) as 'items', SUM(amount) as 'totalAmount'
            FROM `order`
            LEFT JOIN order_product ON `order`.orderID = order_product.orderID
            WHERE orderStatus = 'complete' AND YEAR(dateOrdered) = YEAR(now())";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $soldThisMonth = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($soldThisMonth);
        break;
    case (isset($_GET['soldThisYear'])):
        header("Access-Control-Allow-Methods: *");
        $sql = "SELECT YEAR(now()) as Year, COUNT(productID) as 'items', SUM(amount) as 'totalAmount'
            FROM `order`
            LEFT JOIN order_product ON `order`.orderID = order_product.orderID
            WHERE orderStatus = 'complete' AND YEAR(dateOrdered) = YEAR(now());";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $soldThisYear = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($soldThisYear);
        break;
}
