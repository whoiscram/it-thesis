<?php
include_once './config/database.php';
require "vendor/autoload.php";

use \Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");




$databaseService = new DatabaseService();
$conn = $databaseService->getConnection();


if (isset($_POST) && !empty($_POST)) {

    header('Content-type: application/json');
    $data = json_decode(file_get_contents("php://input"), true);
    $username = $data['username'];
    $password = $data['password'];
    $conm;
    $stmt = $conn->prepare("SELECT * FROM user WHERE username = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    //$conn->close;

    $credentials = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($credentials) {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $fetchUserID = $credentials['userID'];
        $fetchUsername = $credentials['userName'];
        $fetchPassword = $credentials['password'];
        $fetchUserType = $credentials['userType'];

        $_SESSION['username'] = $fetchUsername;
        $_SESSION['userID'] = $fetchUserID;
        $_SESSION['usertype'] = $fetchUserType;

        $secret_key = "YOUR_SECRET_KEY";
        $now = strtotime("now");
        $issuedat_claim = time(); // issued at
        $notbefore_claim = $issuedat_claim + 10; //not before in seconds
        $expire_claim = $issuedat_claim + 60; // expire time in seconds
        $token = array(
            "iat" => $now, //
            "exp" => $expire_claim,
            "nbf" => $notbefore_claim,
            "data" => array(
                "username" => $username,
                "ID" => $fetchUserID
            )
        );
        $jwt = JWT::encode($token, $secret_key, "HS256");
        // iat “Issued at”. When this token is generated.
        // nbf “Not before”. When this token is effective. Yes, we can issue a token now, but set it to be effective only in the future.
        // exp “Expiry”. Self-explanatory.
        // jti “JSON Token ID”. The random token.
        // iss “Issuer”. Who issued this token. Commonly the domain or company name.
        // aud “Audience”. Which domain is this token meant for. I.E. If the audience is set
        if (password_verify($fetchPassword, $hashedPassword)) {
            if ($_SESSION['usertype'] === 'customer') {
                http_response_code(200);
                echo json_encode(array(
                    $jwt
                ));
            } else {
                http_response_code(401); // Unauthorized
            }
        } else {
            http_response_code(403); // forbiden
        }
    } else {
        http_response_code(400); //bad request // user not existing 
    }
} else {
    exit(); //update
}
