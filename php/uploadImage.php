Marc Justine Torres
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

if (isset($_FILES['file'])) {
    // Make sure the file was sent without errors
    if ($_FILES['file']['error'] == 0) {
        // Move the file to the desired directory
        move_uploaded_file($_FILES['file']['tmp_name'], '/wamp64/www/it-project-ini/public/products/' . $_FILES['file']['name']);
        // Read the contents of the file
        $contents = file_get_contents('/wamp64/www/it-project-ini/public/products/' . $_FILES['file']['name']);
        // Echo the contents back to the frontend
        echo $contents;
    } else {
        echo 'An error occurred while the file was being uploaded. '
            . 'Error code: ' . intval($_FILES['file']['error']);
    }
} else {
    echo 'Error! No file was sent!';
}