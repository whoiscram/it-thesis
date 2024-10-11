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
    case "GET":
        if (isset($_GET['user'])) { // FETCH * USERS
            $sql = "SELECT * FROM user";
            $path = explode('/', $_SERVER['REQUEST_URI']);
            if (isset($path[3]) && is_numeric($path[3])) {
                $sql .= " WHERE userID = :userID";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':userID', $path[3]);
                $stmt->execute();
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
            } else {
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            echo json_encode($user);
        } else if (isset($_GET['view'])) { // TO BE REMOVED
            header("Access-Control-Allow-Origin: *");
            $d = json_decode(file_get_contents('php://input'));
            $sql = "SELECT FROM user WHERE userID = :id";
            $value = $d;
            $stmt = $conn->prepare($sql);
            $stmt->bindValue(':id', $value);
        } else if (isset($_GET['products'])) { // FETCH * PRODUCTS
            header("Access-Control-Allow-Methods: *");
            $sql = "SELECT productID, productName, price, qtyStock, product.categoryID, category.name AS catNme, product.sub_categoryID, sub_category.name AS subName, product.attribute_valueID, attribute_value.name AS attriName, productDesc, product.imageSource, SKU FROM product LEFT JOIN category ON product.categoryID = category.categoryID LEFT JOIN sub_category ON product.sub_categoryID = sub_category.sub_categoryID LEFT JOIN attribute_value ON product.attribute_valueID = attribute_value.attribute_valueID";
            $path = explode('/', $_SERVER['REQUEST_URI']);
            if (isset($path[3]) && is_numeric($path[3])) {
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
        } else if (isset($_GET['atrributes'])) { // GET * ATTRIBUTES
            $sql = "SELECT * FROM attribute";
            $path = explode('/', $_SERVER['REQUEST_URI']);
            if (isset($path[2]) && is_numeric($path[2])) {
                $sql .= " WHERE attributeID = :attributeID";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':attributeID', $path[2]);
                $stmt->execute();
                $attribute = $stmt->fetch(PDO::FETCH_ASSOC);
            } else {
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $attribute = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            echo json_encode($attribute);
        } else if (isset($_GET['category'])) { //FETCH * CATEGORY
            header("Access-Control-Allow-Methods: *");

            $sql = "SELECT category.categoryID, category.name, GROUP_CONCAT(sub_category.name) 
            AS 'sub_category'
            FROM category 
            LEFT JOIN sub_category 
            ON category.categoryID = sub_category.categoryID 
            GROUP BY category.categoryID";

            $path = explode('/', $_SERVER['REQUEST_URI']);
            if (isset($path[3]) && is_numeric($path[3])) {
                $sql .= " WHERE category.categoryID = :categoryID";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':categoryID', $path[3]);
                $stmt->execute();
                $category = $stmt->fetch(PDO::FETCH_ASSOC);
            } else {
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $category = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            echo json_encode($category);
        } else if ($resource === 'order') { // GET * DATA FROM ORDER TABLE
            header("Access-Control-Allow-Methods: *");

            $sql = "SELECT `order`.userID ,`order`.orderID,  CONCAT_WS(' ', firstName, lastName) as 'customerName', 
            dateOrdered,
            courierType, 
            CONCAT_WS(' ', street, houseNo, barangay, city, province, 'Region', region) AS 'shipTo', 
            SUM(quantity) as 'Items', 
            totalAmount, 
            orderStatus,
            orderType
            FROM `order` 
            LEFT JOIN user ON user.userID = `order`.userID
            LEFT JOIN payment ON payment.orderID = `order`.orderID
            LEFT JOIN address ON address.addressID = `order`.addressID
            LEFT JOIN order_product ON order_product.orderID = `order`.orderID
            LEFT JOIN delivery ON delivery.orderID = `order`.orderID";
	    
	    if ($resourceID && is_numeric($resourceID)) {
                $sql .= " WHERE order.orderID = :orderID GROUP BY orderID, courierType";
                $stmt = $conn->prepare($sql);
		$stmt->bindParam(':orderID', $resourceID);
                $stmt->execute();
		$order = $stmt->fetch(PDO::FETCH_ASSOC);
	    } else {
		$sql .= " GROUP BY orderID, courierType";
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $order = $stmt->fetchAll(PDO::FETCH_ASSOC);
	    }
            echo json_encode($order);
        } else if (isset($_GET['shop'])) { //GET PRODUCT DETAILS (FRONT)
            $sql = "SELECT productID, productName, price, imageSource FROM product";
            $path = explode('/', $_SERVER['REQUEST_URI']);
            if (isset($path[3]) && is_numeric($path[3])) {
                $sql .= " WHERE productID = :productID";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':productID', $path[3]);
                $stmt->execute();
                $p = $stmt->fetch(PDO::FETCH_ASSOC);
            } else {
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $p = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            echo json_encode($p);
        } else if (isset($_GET['profile'])) { //GET USER BY userID
            $profile =  $_GET['profile'];
            $sql = "SELECT * FROM user WHERE userID = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindValue(':id', $profile);
            $stmt->execute();
            $profile = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($profile);
        } else if (isset($_GET['productList'])) { //GET PRODUCT LIST
            $productList =  $_GET['productList'];
            $sql = "SELECT product.productID, productName, quantity, price from order_product
            LEFT JOIN product ON product.productID = order_product.productID 
            where orderID = :orderID";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':orderID', $productList);
            $stmt->execute();
            $productList = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($productList);
        } else if (isset($_GET['viewUser'])) { // GET USER ID (ADMIN -> USER -> VIEW)
            $data = $_GET['viewUser'];
            if (isset($data) && is_numeric($data)) {
                $sql = "SELECT * FROM user WHERE userID = :userID";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':userID', $data);
                $stmt->execute();
                $res = $stmt->fetch(PDO::FETCH_ASSOC);
            } else {
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            echo json_encode($res);
        } else if (isset($_GET['viewProduct'])) { // GET PRODUCTID (ADMIN -> PRODUCT -> VIEW)
            $data = $_GET['viewProduct'];
            if (isset($data)) {
                $sql = "SELECT productID, productName, price, qtyStock, product.categoryID, category.name AS catNme, product.sub_categoryID, sub_category.name AS subName, product.attribute_valueID, attribute_value.name AS attriName, productDesc, product.imageSource, SKU FROM product LEFT JOIN category ON product.categoryID = category.categoryID LEFT JOIN sub_category ON product.sub_categoryID = sub_category.sub_categoryID LEFT JOIN attribute_value ON product.attribute_valueID = attribute_value.attribute_valueID WHERE productID =:productID";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':productID', $data);
                $stmt->execute();
                $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
            } else {
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            echo json_encode($res);
        } else if (isset($_GET['viewOrder'])) { // GET ORDER ID (ADMIN -> ORDER -> VIEW)
            $data = $_GET['viewOrder'];
            $sql = "SELECT `order`.userID ,`order`.orderID,  CONCAT_WS(' ', firstName, lastName) as 'customerName', 
            dateOrdered,
            courierType, 
            paymentType, 
            CONCAT_WS(' ', street, houseNo, barangay, city, province, 'Region', region) AS 'shipTo', 
            SUM(quantity) as 'Items', 
            totalAmount, 
            orderStatus,
            orderType
            FROM `order` 
            LEFT JOIN user ON user.userID = `order`.userID
            LEFT JOIN payment ON payment.orderID = `order`.orderID
            LEFT JOIN address ON address.addressID = `order`.addressID
            LEFT JOIN order_product ON order_product.orderID = `order`.orderID
            LEFT JOIN delivery ON delivery.orderID = `order`.orderID
            WHERE user.userID = $data
            GROUP BY orderID";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $res = $stmt->fetch(PDO::FETCH_ASSOC);

            echo json_encode($res);
        } else if (isset($_GET['getAddress'])) {
            $data = $_GET['getAddress'];

            $sql = "SELECT addressID, street, houseNo, barangay, city,province,region , postalCode FROM address WHERE userID = $data";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($res);
        } else if (isset($_GET['orderHistory'])) { // GET ORDER HISTORY
            $data = $_GET['orderHistory'];
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
            WHERE user.userID = $data
            GROUP BY order_product.productID;";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $res = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($res);
        }


        break;

    case "POST":
        header("Access-Control-Allow-Methods: *");
        $user = json_decode(file_get_contents('php://input'));
        if (isset($_GET['add'])) {
            $sql = "INSERT INTO user (userType, userName, firstName, lastName, phoneNumber, email, password) VALUES (:userType, :userName, :firstName, :lastName, :phoneNumber, :email, :password)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':userType', $user->usertype);
            $stmt->bindParam(':userName', $user->userName);
            $stmt->bindParam(':firstName', $user->firstname);
            $stmt->bindParam(':lastName', $user->lastname);
            $stmt->bindParam(':phoneNumber', $user->phoneNumber);
            $stmt->bindParam(':email', $user->email);
            $stmt->bindParam(':password', $user->password);

            if ($stmt->execute()) {
                $user = ['status' => 1, 'message' => "Record successfully created."];
            } else {
                $user = ['status' => 0, 'message' => "Failed to create record."];
            }
            echo json_encode($user);
        } else if (isset($_GET['deleteUser'])) {
            $user = explode(',', $_GET['deleteUser']);
            for ($i = 0; $i < count($user); $i++) {
                $delete = $user[$i];
                $sql = "DELETE FROM user WHERE userID = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindValue(':id', $delete);

                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to delete record.'];
                }
                echo json_encode($response);
            }
        } else if (isset($_GET['deleteProduct'])) {
            $product = explode(',', $_GET['deleteProduct']);
            for ($i = 0; $i < count($product); $i++) {
                $delete = $product[$i];
                $sql = "DELETE FROM product WHERE productID = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindValue(':id', $delete);

                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to delete record.'];
                }
                echo json_encode($response);
            }
        } else if (isset($_GET['deleteCategory'])) {
            $category = explode(',', $_GET['deleteCategory']);
            for ($i = 0; $i < count($category); $i++) {
                $delete = $category[$i];
                $sql = "DELETE FROM category WHERE categoryID = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindValue(':id', $delete);

                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to delete record.'];
                }
                echo json_encode($response);
            }
        } else if (isset($_GET['deleteOrder'])) {
            $order = explode(',', $_GET['deleteOrder']);
            for ($i = 0; $i < count($order); $i++) {
                $delete = $order[$i];
                $sql = "DELETE FROM `order` WHERE orderID = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindValue(':id', $delete);

                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to delete record.'];
                }
                echo json_encode($response);
            }
        } else if (isset($_GET['deleteAttribute'])) {
            $attribute = explode(',', $_GET['deleteAttribute']);
            for ($i = 0; $i < count($attribute); $i++) {
                $delete = $attribute[$i];
                $sql = "DELETE FROM attribute WHERE attributeID = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindValue(':id', $delete);

                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to delete record.'];
                }
                echo json_encode($response);
            }
        } else if ((isset($_GET['updateUser']))) {
            $id = $_GET['updateUser'];
            $aarray = json_decode(json_encode($user), true);
            $nice = (object) $aarray;
            print_r($id);
            $sql = "UPDATE user SET userType = :userType, firstName = :firstName, lastName = :lastName, password = :password WHERE userID = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':userType', $nice->usertype);
            $stmt->bindValue(':id', $id);
            $stmt->bindParam(':firstName', $nice->firstname);
            $stmt->bindParam(':lastName', $nice->lastname);
            $stmt->bindParam(':password', $nice->password);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record updated successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update record.'];
            }
            echo json_encode($user);
        } else if (isset($_GET['addAttributeValue'])) {
            $attribute = file_get_contents('php://input'); //inputs
            $dat = explode('/', (string)$attribute);
            //$name = $aarray['attributeValue'];

            $attributeID = $_GET['addAttributeValue']; // id
            $id = (int) $attributeID;
            $sql = "INSERT INTO attribute_value (attributeID, name, imageSource) VALUES (:attributeID, :attributeName, :imageSource)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':attributeID', $id);
            $stmt->bindParam(':attributeName', $dat[1]);
            $stmt->bindParam(':imageSource', $dat[0]);


            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Attribute value successfully added.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to add attribute value.'];
            }
            echo json_encode($response);
        } else if (isset($_GET['addOrder'])) {
            $order = json_decode(file_get_contents('php://input'), true);
            $productID =  $order['selected'];
            $street =  $order['inputs']['street'];
            $pCode = $order['inputs']['pCode'];
            $houseNum = $order['inputs']['houseNumber'];
            $paymentType = $order['inputs']['paymentType'];
            $deliveryType = $order['inputs']['deliveryType'];
            $region = $order['region'][1];
            $userID = $order['selectedUser'];
            $province = $order['province'][1];
            $city = $order['city'][1];
            $barangay = $order['barangay'];

            $orderType = $order['orderType'];


            //address
            $addressSQL = "INSERT INTO address (userID, street, houseNo, barangay, city, province, region, postalCode) VALUES (:userID, :street, :houseNo, :barangay, :city, :province, :region, :postalCode)";
            $astmt = $conn->prepare($addressSQL);
            // $astmt->bindParam(':userID', $order->customerName); // should be id of selected customer
            // $astmt->bindParam(':street', $order->street);
            // $astmt->bindParam(':houseNo', $order->houseNumber);
            // $astmt->bindParam(':barangay', $order->barangay);
            // $astmt->bindParam(':city', $order->city);
            // $astmt->bindParam(':province', $order->province);
            // $astmt->bindParam(':region', $order->region);
            // $astmt->bindParam(':postalCode', $order->postalCode);

            $astmt->bindParam(':userID', $userID); // should be id of selected customer
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
            $date = "2022-11-11"; // needs to be modified   
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
        } else if (isset($_GET['addOrderFromCheckout'])) {
            $order = json_decode(file_get_contents('php://input'), true);
            //print_r($order);
            $totalAmount = $order['totalAmount'];
            $address = $order['address'][0];
            
            // needs to be sanitised 
            date_default_timezone_set('Asia/Manila');
            $date = date('y-m-d h:i:s');
            
            $deliveryType = $order['deliveryType'];
            $paymentType = $order['paymentType'];
            $userID = $order['logged'];

            $addressID = $address['addressID'];
            $street =  $address['street'];
            $pCode = $address['postalCode'];
            $houseNum = $address['houseNo'];
            $city = $address['city'];
            $barangay = $address['barangay'];
            
            $orderType = "pre-made";
            $pending = "pending";
            $quantity = $order['qty'][0]['quantity'];

            $refCode = $order['inputs']['RefCode'];

            $orderProduct = $order['qty'];
	    if (count($orderProduct) < 1) {
		http_response_code(400);
                $orderp = ['message' => 'Please buy product la'];
                echo json_encode($orderp);
                return false;
            }

            $sql = "INSERT INTO `order` (`orderID`, `addressID`, `userID`, `measurementID`, `attribute_valueID`, `dateOrdered`, `orderStatus`, `orderType`, `totalAmount`) VALUES (NULL, '$addressID', '$userID', NULL, NULL, '$date', '$pending', '$orderType', '$totalAmount')";
	    $result = $conn->prepare($sql)->execute();
	    $getLastOrderID = $conn->lastInsertID();

            if ($result) {
                $response = ['orderId' => $getLastOrderID, 'message' => 'Order successfully created.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create order.'];
            }
            echo json_encode($response);

	    $productsToInsert = array_map(
		function ($product) use ($getLastOrderID) {
                	$row = [
	               	    $product['productID'],
	                    $getLastOrderID,
	                    $product['quantity'],
 	                    $product['quantity'] * $product['price'], // total product amount
			];

        	        return '('.join(',', $row).')';
		}, $orderProduct
	    );
	    $order_productSQL = "INSERT INTO `order_product` (`productID`, `orderID`, `quantity`, `amount`) VALUES " . join(',', $productsToInsert);
	    $order_p = $conn->prepare($order_productSQL);
	    
	    if ($order_p->execute()) {
                $orderp = ['status' => 1, 'message' => 'Order_Product successfully added.'];
            } else {
                $orderp = ['status' => 0, 'message' => 'Failed to add order_product.'];
            }
            echo json_encode($orderp);

            //deliveryTable
            $delivery_Table = "INSERT INTO `delivery` (`deliveryID`, `orderID`, `dateShipped`, `dateDelivered`, `courierType`, `deliveryStatus`) VALUES (NULL, '$getLastOrderID', NULL, NULL, '$deliveryType', 'preparing')";
            $delivery_T = $conn->prepare($delivery_Table);
            if ($delivery_T->execute()) {
                $deliverT = ['status' => 1, 'message' => 'Delivery successfully added.'];
            } else {
                $deliverT = ['status' => 0, 'message' => 'Failed to add Delivery.'];
            }
            echo json_encode($deliverT);

            //payment
            $payment_table = "INSERT INTO `payment` (`paymentID`, `userID`, `orderID`, `amountPaid`, `paymentType`, `paymentName`, `paymentDate`, `referenceNo`, `paymentStatus`) VALUES (NULL, '$userID', '$getLastOrderID', '$totalAmount', 'Direct Bank Transfer', '$paymentType', '$date', `$refCode`, '$pending')";
            $payment = $conn->prepare($payment_table);
            if ($payment->execute()) {
                $pay = ['status' => 1, 'message' => 'payment successfully added.'];
            } else {
                $pay = ['status' => 0, 'message' => 'Failed to add payment.'];
            }
            echo json_encode($pay);
        } else if (isset($_GET['register'])) {
            $data = json_decode(file_get_contents('php://input'), true);



            $userName = $data['inputs']['userName'];
            $firstName = $data['inputs']['firstname'];
            $lastName = $data['inputs']['lastname'];
            $phoneNumber = $data['inputs']['phoneNumber'];
            $email = $data['inputs']['email'];
            $password = $data['inputs']['password'];

            $sql = "INSERT INTO user (userType, userName, firstName, lastName, phoneNumber, email, password) VALUES ('customer', :userName, :firstName, :lastName, :phoneNumber, :email, :password)";
            $stmt = $conn->prepare($sql);

            $stmt->bindParam(':userName', $userName);
            $stmt->bindParam(':firstName', $firstName);
            $stmt->bindParam(':lastName', $lastName);
            $stmt->bindParam(':phoneNumber', $phoneNumber);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $password);


            if ($stmt->execute()) {
                $user = ['status' => 1, 'message' => "Record successfully created."];
            } else {
                $user = ['status' => 0, 'message' => "Failed to create record."];
            }
            echo json_encode($user);

            $userID = $conn->lastInsertID();
            $barangay = $data['barangay'];
            $city = $data['city'][1];
            $province = $data['province'][1];
            $region = $data['region'][1];
            $street = $data['inputs']['street'];
            $houseNum = $data['inputs']['houseNumber'];
            $pCode = $data['inputs']['pCode'];
            //insert Address
            $addressSQL = "INSERT INTO address (userID, street, houseNo, barangay, city, province, region, postalCode) VALUES (:userID, :street, :houseNo, :barangay, :city, :province, :region, :postalCode)";
            $astmt = $conn->prepare($addressSQL);

            $astmt->bindParam(':userID', $userID); // should be id of selected customer
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
        }

        break;
}
