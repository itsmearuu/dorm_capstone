<?php
header("Access-Control-Allow-Origin: *");
$server = 'localhost';
$username = 'root';
$password ='';
$db = 'dorm_capstone';
$method = $_SERVER['REQUEST_METHOD'];
    
$conn = mysqli_connect($server, $username, $password, $db);
if($method == "GET") {
    $sql = "SELECT * FROM users_tbl";
}

if($method == "POST"){
    $function = $_POST['function'];
    if($function == 1){
        $fname = $_POST['fname'];
        $lname = $_POST['lname'];
        $email = $_POST['email'];
        $pass = $_POST['pass'];
        $sql = "INSERT INTO users_tbl (user_fname, user_lname, user_email, user_pass) VALUES ('$fname', '$lname', '$email', '$pass')";
    }if ($function == 2) {
        $id = $_POST["id"];
        $sql = "DELETE FROM users_tbl WHERE user_ID = '$id' ";
    }else if($function == 3){
        $id = $_POST["id"];
        $fname = $_POST['fname'];
        $lname = $_POST['lname'];
        $email = $_POST['email'];
        $pass = $_POST['pass'];
        $sql = "UPDATE users_tbl SET user_fname = '$fname', user_lname = '$lname', user_email = '$email', user_pass = '$pass' WHERE user_ID = '$id' ";
    }
}

$result = mysqli_query($conn, $sql);

if ($method == "GET") {
    echo "[";
    for ($i=0 ; $i < mysqli_num_rows($result) ; $i++) { 
        echo ($i > 0 ? ',' : "").json_encode(mysqli_fetch_object($result));
    }
echo "]";
}
?>