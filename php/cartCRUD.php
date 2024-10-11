<?php
header("Access-Control-Allow-Origin: *"); // enable any domain to send HTTP requests to these endpoints (connection.php)
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include './config/database.php';
$objDb = new DatabaseService;
$conn = $objDb->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "POST":
        if (isset($_GET['addToCart'])) {
            // insert to cart of logged in user (id)
            $cart = json_decode(file_get_contents('php://input'), true);
            $productID = $cart['productID'];
            $userID = $cart['userID'];
            $totalQuantity = $cart['qty'];
            $totalAmount = $cart['amount'];
            $cartSQL = "INSERT INTO cart (userID, totalQuantity, totalAmount) VALUES (:userID, :totalQuantity, :totalAmount)";
            $cstmt = $conn->prepare($cartSQL);
            // $cstmt->bindParam(':userID', $cart->customerName);
            // $cstmt->bindParam(':totalQuantity', $cart->customerName);
            // $cstmt->bindParam(':totalAmount', $cart->customerName);

            $cstmt->bindParam(':userID', $userID);
            $cstmt->bindParam(':totalQuantity', $totalQuantity);
            $cstmt->bindParam(':totalAmount', $totalAmount);

            if ($cstmt->execute()) {
                $cresponse = ['status' => 1, 'message' => 'Cart successfully added.'];
            } else {
                $cresponse = ['status' => 0, 'message' => 'Failed to add cart.'];
            }
            echo json_encode($cresponse);

            // insert contents of cart of logged in user (id)
            $getLastInsertID = $conn->lastInsertID();
            $cartItemSQL = "INSERT INTO cart_items (productID, cartID, quantity, amount) VALUES ('$productID', '$getLastInsertID', '$totalQuantity', '$totalAmount')";
            $cistmt = $conn->prepare($cartItemSQL);
            // $cistmt->bindParam(':productID', $productID);
            // $cistmt->bindParam(':totalQuantity', $totalQuantity);
            // $cistmt->bindParam(':totalAmount', $totalAmount);

            if ($cistmt->execute()) {
                $ciresponse = ['status' => 1, 'message' => 'Cart items successfully added.'];
            } else {
                $ciresponse = ['status' => 0, 'message' => 'Failed to add cart items.'];
            }
            echo json_encode($ciresponse);
        }
    case "GET": // retrieve contents of cart and cart_items of logged in user (id)
        if (isset($_GET['retrieveCart'])) { // retrieve cart of logged in user (id)
            $sql = "SELECT cartID, totalQuantity, totalAmount FROM cart";
            $path = explode('/', $_SERVER['REQUEST_URI']);
            if (isset($path[3]) && is_numeric($path[3])) { // not sure of path
                $sql .= "WHERE userID = :userID";
                $rcstmt = $conn->prepare($sql);
                $rcstmt->bindParam(':userID', $path[3]);

                if ($rcstmt->execute()) {
                    $rcresponse = ['status' => 1, 'message' => 'Cart successfully retrieved.'];
                    $retrievedCart = $rcstmt->fetch(PDO::FETCH_ASSOC);
                } else {
                    $rcresponse = ['status' => 0, 'message' => 'Failed to retrieve cart.'];
                }
            } else {
                $rcstmt = $conn->prepare($sql);
                $rcstmt->execute();
                $rcresponse = ['status' => 1, 'message' => 'Cart successfully retrieved.'];
                $retrievedCart = $rcstmt->fetchAll(PDO::FETCH_ASSOC);
            }
            echo json_encode($retrievedCart);
        } else if (isset($_GET['retrieveCartItems'])) { // retrieve contents of cart of logged in user (id)
            $path = explode('/', $_SERVER['REQUEST_URI']);
            if (isset($path[3]) && is_numeric($path[3])) { // not sure of path
                $sql .= "WHERE userID = :userID";
                $rcistmt = $conn->prepare($sql);
                $rcistmt->bindParam(':userID', $path[3]);

                if ($rcistmt->execute()) {
                    $rciresponse = ['status' => 1, 'message' => 'Cart items successfully retrieved.'];
                    $retrievedCartItems = $rcistmt->fetch(PDO::FETCH_ASSOC);
                } else {
                    $rciresponse = ['status' => 0, 'message' => 'Failed to retrieve cart items.'];
                }
            } else {
                $rcistmt = $conn->prepare($sql);
                $rcistmt->execute();
                $rciresponse = ['status' => 1, 'message' => 'Cart items successfully retrieved.'];
                $retrievedCartItems = $rcistmt->fetchAll(PDO::FETCH_ASSOC);
            }
            echo json_encode($retrievedCartItems);
        }
        break;
}
