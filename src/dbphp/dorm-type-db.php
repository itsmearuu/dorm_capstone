<?php
header("Access-Control-Allow-Origin: *");
$server = 'localhost';
$username = 'root';
$password = '';
$db = 'dorm_capstone';
$method = $_SERVER['REQUEST_METHOD'];

$conn = mysqli_connect($server, $username, $password, $db);

if ($method == "GET") {
$sql = "SELECT * FROM dorm_type_tbl";

}
if ($method == "POST") {
    $function = $_POST['function'];
    if ($function == 1) {
        $dType = $_POST['dType'];
        $dCap = $_POST['dCap'];
        $dDesc = $_POST['dDesc'];

        $file_name = $_FILES['image']['name'];
        $file_size =$_FILES['image']['size'];
        $file_tmp =$_FILES['image']['tmp_name'];
        $file_type=$_FILES['image']['type'];
        $file_ext=strtolower(end(explode('.',$_FILES['image']['name'])));

        move_uploaded_file($file_tmp,"../../public/images/".$file_name);
            // echo "Success";

        $sql = "INSERT INTO dorm_type_tbl (dorm_type, dorm_capacity, dorm_description, dorm_room_image) VALUES ('$dType', '$dCap', '$dDesc','$file_name')";
    }else if($function == 2){
        $id = $_POST["id"];
        $sql = "DELETE FROM dorm_type_tbl WHERE dorm_room_ID = '$id' ";
    }else if($function == 3){
        $id = $_POST['id'];
        $dType = $_POST['dType'];
        $dCap = $_POST['dCap'];
        $dDesc = $_POST['dDesc'];

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
            $sql = "UPDATE dorm_type_tbl SET dorm_type = '$dType', dorm_capacity = '$dCap', dorm_description = '$dDesc', dorm_room_image = '$file_name' WHERE dorm_room_ID = '$id' ";
        }
        
        else {
            $sql = "UPDATE dorm_type_tbl SET dorm_type = '$dType', dorm_capacity = '$dCap', dorm_description = '$dDesc' WHERE dorm_room_ID = '$id' ";
        }
        // $sql = "UPDATE dorm_type_tbl SET dorm_type = '$dType', dorm_capacity = '$dCap', dorm_description = '$dDesc' WHERE dorm_room_ID = '$id' ";
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
