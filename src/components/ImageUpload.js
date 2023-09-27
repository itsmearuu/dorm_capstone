import React from "react";
import { useState } from "react";
import axios from "axios";

function ImageUpload() {
    const [image, setImage] = useState("");
    function handleImage(e){
        console.log(e.target.files)
        setImage(e.target.files[0])
    }
    function handleApi(){
        let getImage = new FormData();
        getImage.append('image', image);
        getImage.append("function", 3);
        axios({
            method: 'POST',
            url: "http://localhost/dorm_capstone/dorm-app-capstone/src/dbphp/dorm-db.php",
            data: getImage
        }).then((response) => {
            alert(response.data);
        })
    }
    return(
        <div>
            <input type="file" name="file" onChange={handleImage}/>
            <button onClick={handleApi}>Submit</button>
        </div>
    )
}

export default ImageUpload;