<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include './config/database.php';
$objDb = new DatabaseService;
$conn = $objDb->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        // $sql = "SELECT 'attributeName', 
        // GROUP_CONCAT(DISTINCT(size.name))
        //  AS 'attributeValue' FROM size
        //   UNION SELECT 'color', 
        //   GROUP_CONCAT(DISTINCT(color.name)) 
        //   as 'attributeValue' 
        //   FROM color;";

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

    case "POST":
        $attribute = json_decode(file_get_contents('php://input'));
        if (isset($_GET['addAttribute'])) {
            $sql = "INSERT INTO attribute (name) VALUES (:name)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':name', $attribute->attribute);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => "Attribute successfully added."];
            } else {
                $response = ['status' => 0, 'message' => "Failed to add attribute."];
            }
            echo json_encode($response);
        } else if (isset($_GET['deleteAttribute'])) {
            $attribute = explode(',', $_GET['deleteAttribute']);
            for ($i = 0; $i < count($attribute); $i++) {
                $delete = $attribute[$i];
                $sql = "DELETE FROM attribute WHERE attributeID = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindValue(':id', $delete);

                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => "Attribute successfully deleted."];
                } else {
                    $response = ['status' => 0, 'message' => "Failed to delete attribute."];
                }
                echo json_encode($response);
            }
        }
}
