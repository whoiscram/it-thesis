<?php

header("Access-Control-Allow-Origin: *"); // enable any domain to send HTTP requests to these endpoints (connection.php)
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
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

// generate OTP
$emailsend = $_GET['email'];

try {
   $otp = rand(1000, 9999);
   $mail = new PHPMailer();
    //Server settings
    //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'inabelniinaPh@gmail.com';                 // SMTP username
    //$mail->Password   = 'wpmjryybgponvvat';                   // SMTP password local
    $mail->Password   = 'rmlglivaixzdwgyd';                     // SMTP password vm
    $mail->SMTPSecure = 'tls';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail->Port       = 587; 
   
    $mail->SingleTo = true;                                 // TCP port to connect to

    //Recipients
    $mail->setFrom('inabelniinaPh@gmail.com', 'Inabel Ni Ina');
    $mail->addAddress($emailsend);
      // Add a recipient

    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'OTP for email verification';
    $mail->Body    = 'Hello! Thank you For Registering Here is your OTP (One-Time-Password):'.$otp ;

    if(!$mail->send()){
      echo "Message could not be sent";
      echo "Mailer Error: " . $mail->ErrorInfo." \n";
  } else {
      echo json_encode ($otp);
  }
  
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}