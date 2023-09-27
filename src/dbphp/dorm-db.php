<?php
header("Access-Control-Allow-Origin: *");
$server = 'localhost';
$username = 'root';
$password = '';
$db = 'dorm_capstone';
$method = $_SERVER['REQUEST_METHOD'];

$conn = mysqli_connect($server, $username, $password, $db);

// if ($conn) {
//     echo "Connected";
// }

if ($method == "GET") {
$sql = "SELECT * FROM dorm_tbl";

}
if ($method == "POST") {
    $function = $_POST['function'];
    if($function == 1){
        $dName = $_POST['dName'];
        $dLoc = $_POST['dLoc'];
        $dPrice = $_POST['dPrice'];
        // $dImage = $_FILES['dImage']['tmp_name'];

        $file_name = $_FILES['image']['name'];
        $file_size =$_FILES['image']['size'];
        $file_tmp =$_FILES['image']['tmp_name'];
        $file_type=$_FILES['image']['type'];
        $file_ext=strtolower(end(explode('.',$_FILES['image']['name'])));

        move_uploaded_file($file_tmp,"../../public/images/".$file_name);
            // echo "Success";

        $sql = "INSERT INTO dorm_tbl (dorm_name, dorm_loc, dorm_price, dorm_image) VALUES ('$dName','$dLoc','$dPrice','$file_name')";
    }else if($function == 2){
        $id = $_POST['id'];

        $sql = "DELETE FROM dorm_tbl WHERE dorm_ID = '$id' ";
    }else if($function == 3){
        $id = $_POST['id'];
        $dName = $_POST['dName'];
        $dLoc = $_POST['dLoc'];
        $dPrice = $_POST['dPrice'];

        if (isset($_FILES['image']['tmp_name'])){

            $file_name = $_FILES['image']['name'];
            $file_size =$_FILES['image']['size'];
            $file_tmp =$_FILES['image']['tmp_name'];
            $file_type=$_FILES['image']['type'];
            $file_ext=strtolower(end(explode('.',$_FILES['image']['name'])));

            move_uploaded_file($file_tmp,"../../public/images/".$file_name);
                // echo "Success";

                
            // $dImage = $_FILES['dImage']['tmp_name'];
            // $imageData1 = file_get_contents($dImage);
            // $base64Image1 = base64_encode($imageData1);
            // move_uploaded_file($file_tmp,"images/". );
            $sql = "UPDATE dorm_tbl SET dorm_name = '$dName', dorm_loc = '$dLoc', dorm_price = '$dPrice', dorm_image = '$file_name' WHERE dorm_ID = '$id' ";
        }
        
        else {
            $sql = "UPDATE dorm_tbl SET dorm_name = '$dName', dorm_loc = '$dLoc', dorm_Price = '$dPrice' WHERE dorm_ID = '$id' ";
        }
        
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