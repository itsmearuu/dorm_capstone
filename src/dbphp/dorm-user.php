<?php
    header("Access-Control-Allow-Origin: *");
    $server = 'localhost';
    $username = 'root';
    $password = '';
    $db = 'dorm_capstone';
    $method = $_SERVER['REQUEST_METHOD'];
    
    $conn = mysqli_connect($server, $username, $password, $db);
    
    $sql = "SELECT * FROM dorm_tbl";
    $result = mysqli_query($conn, $sql);

if ($method == "GET") {
    echo "[";
    for ($i=0 ; $i < mysqli_num_rows($result) ; $i++) { 
        echo ($i > 0 ? ',' : "").json_encode(mysqli_fetch_object($result));
    }
echo "]";
}

?>