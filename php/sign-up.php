<?php

header("Access-Control-Allow-Origin: *"); // enable any domain to send HTTP requests to these endpoints (connection.php)
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMaile\Exception;
require_once  "vendor/phpmailer/phpmailer/src/PHPMailer.php";
require_once   "vendor/phpmailer/phpmailer/src/SMTP.php";
require_once "vendor/autoload.php";


include './config/database.php';
$objDb = new DatabaseService;
$conn = $objDb->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$uri = explode('/', $_SERVER['REQUEST_URI']);
// e.g <scheme>/<host>/<resource>/<id>
$resource = $uri[2];
$resourceID = isset($uri[3]) ? $uri[3] : null;

$data = json_decode(file_get_contents('php://input'), true);
$userName = $data['userName'];
$firstName = $data['firstName'];
$lastName = $data['lastName'];
$phoneNumber = $data['phoneNumber'];
$email = $data['email'];
$password = $data['password'];

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
$barangay = $data['Barangay'];
$city = $data['City'][1];
$province = $data['Province'][1];
$region = $data['Region'][1];
$street = $data['street'];
$houseNum = $data['houseNumber'];
$pCode = $data['postalCode'];
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

