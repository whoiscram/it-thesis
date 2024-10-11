<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
// used to get mysql database connection
class DatabaseService{

    private $db_host = "localhost";
    private $db_name = "inabel_db";
    private $db_user = "inabel";
    private $db_password = "niina";
    private $connection;

    public function getConnection(){

        $this->connection = null;

        try{
            $this->connection = new PDO("mysql:host=" . $this->db_host . ";dbname=" . $this->db_name, $this->db_user, $this->db_password);
        }catch(PDOException $exception){
            echo "Connection failed: " . $exception->getMessage();
        }

        return $this->connection;
    }
}
?>