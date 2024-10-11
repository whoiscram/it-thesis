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
        $sql = "SELECT category.categoryID, category.name, GROUP_CONCAT(sub_category.name) 
        AS 'sub_category'
        FROM category 
        LEFT JOIN sub_category 
        ON category.categoryID = sub_category.categoryID 
        GROUP BY category.categoryID";

        /*$sql = "SELECT  * from category";*/

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
    case "POST":
        $category = json_decode(file_get_contents('php://input'));
        if (isset($_GET['addCategory'])) {
            $sql = "INSERT INTO category (name) VALUES (:name)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':name', $category->category);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => "Category successfully added."];
            } else {
                $response = ['status' => 0, 'message' => "Failed to add category."];
            }
            echo json_encode($response);
        } else if (isset($_GET['addSubCategory'])) {
            $subCategory = json_decode(file_get_contents('php://input')); //inputs
            // $sc = explode('/', (string)$subCategory);
            // //$name = $aarray['attributeValue'];

            // $categoryID = $_GET['addSubCategory']; // id
            // $id = (int) $categoryID;
            // $sql = "INSERT INTO sub_category (categoryID, name) VALUES (:categoryID, :name)";
            // $stmt = $conn->prepare($sql);
            // $stmt->bindParam(':categoryID', $id);
            // $stmt->bindParam(':name', $sc[1]);

            // if ($stmt->execute()) {
            //     $response = ['status' => 1, 'message' => 'Subcategory successfully added.'];
            // } else {
            //     $response = ['status' => 0, 'message' => 'Failed to add subcategory.'];
            // }
            // echo json_encode($response);

            //$sc = explode(',', $subCategory);
            for ($i = 0; $i < count($subCategory); $i++) {
                $add = $subCategory[$i];
                $categoryID = $_GET['addSubCategory']; // id
                $id = (int) $categoryID;
                $sql = "INSERT INTO sub_category (categoryID, name) VALUES (:categoryID, :name)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':categoryID', $id);
                $stmt->bindParam(':name', $add);

                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Subcategory successfully added.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to add subcategory.'];
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
                    $response = ['status' => 1, 'message' => 'Category successfully deleted.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to delete category.'];
                }
                echo json_encode($response);
            }
        }
}
