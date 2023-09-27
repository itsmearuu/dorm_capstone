import { useState, useEffect } from "react";
import axios from "axios";

const DormType = () => {
    let [dormType, setDormType] = useState("");
    let [dormCap, setDormCap] = useState("");
    let [dormDesc, setDormDesc] = useState("");
    let [dormImage, setDormImage] = useState("");
    let [dormT, setDormT] = useState([]);

    let addDormType = (e) => {
        e.preventDefault();
        let getData = new FormData();
        getData.append("dType", dormType);
        getData.append("dCap", dormCap);
        getData.append("dDesc", dormDesc);
        getData.append("image", dormImage);
        getData.append("function", 1);
        axios({
            method: 'POST',
            url: "http://localhost/dorm_capstone/dorm-app-capstone/src/dbphp/dorm-type-db.php",
            data: getData,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then((response) => {
            // alert(response.data);
        })
    }

    let deleteDorm = (e) => {
        let getData = new FormData();
        getData.append('id', e.currentTarget.id);
        getData.append('function', 2);
        axios({
            method: 'POST',
            url: "http://localhost/dorm_capstone/dorm-app-capstone/src/dbphp/dorm-type-db.php",
            data: getData
        }).then((response) => {
            // alert(response.data);
        })
    }

    let updateDorm = (e) => {
        let getData = new FormData();
        getData.append('id', e.currentTarget.id);
        getData.append('dType',document.getElementById("dorm_type_" + e.currentTarget.id).value);
        getData.append('dCap',document.getElementById("dorm_capacity_" + e.currentTarget.id).value);
        getData.append('dDesc',document.getElementById("dorm_description_" + e.currentTarget.id).value);
        getData.append('function', 3);

        if (document.getElementById("dorm_room_image_" + e.currentTarget.id).files[0]){
            getData.append('image', document.getElementById("dorm_room_image_" + e.currentTarget.id).files[0]);
        }

        axios({
            method: 'POST',
            url: "http://localhost/dorm_capstone/dorm-app-capstone/src/dbphp/dorm-type-db.php",
            data: getData,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then((response) => {
            // alert(response.data);
        })
    }

    useEffect(
        () => {
            let url = "http://localhost/dorm_capstone/dorm-app-capstone/src/dbphp/dorm-type-db.php"
            axios.get(url).then(
                (response) => {
                    setDormT(response.data);
                    // console.log(response.data);
                });          
        },[]
    );
    return ( 
        <>  
        <div className="container">
            <div className="row">
                <h1 className="text-center text-white bg-dark">Admins Dorm Type View</h1>
                <h1 className="text-center text-white bg-dark">Creat Dorm Rooms</h1>
                <form action="">
                    <input type="text" name="dormType" id="dormType" placeholder="Input Dorm Type" value={dormType} onChange={(e) => setDormType(e.target.value)}/>
                    <input type="text" name="dormCap" id="dormCap" placeholder="Input Dorm Capacity" value={dormCap} onChange={(e) => setDormCap(e.target.value)}/>
                    <input type="text" name="dormDesc" id="dormDesc" placeholder="Input Dorm Desc" value={dormDesc} onChange={(e) => setDormDesc(e.target.value)}/>
                    <input type="file" name="dormRoomImage" id="dormRoomImage" accept="img/*" onChange={(e) => setDormImage(e.target.files[0])}/>
                    <button onClick={addDormType}>Submit</button>
                </form>
                {dormType} <br />
                {dormCap} <br />
                {dormDesc} <br />
            </div>
        </div>
            

            <h1>Dorm Type Edit</h1>
                    {
                        dormT.map( (val) =>{
                            return(
                                
                            <div className="container my-3 py-3">
                                <div className="row">
                                    <div className="col-4">
                                       <h5>Dorm Image</h5>
                                        <img src={`images/${val.dorm_room_image}`} alt="Image" width={350} height={250} />
                                        
                                    </div>
                                    <div className="col-8">
                                        <p>
                                            <h5>Upload Dorm Room Image:</h5>
                                            <input type="file" accept="img/*" onChange={(e) => setDormImage(e.target.files[0])} id={"dorm_room_image_"+ val.dorm_room_ID} />
                                        <br />
                                            <h5>Dorm Type:</h5>
                                            <input type="text" defaultValue={val.dorm_type} id={"dorm_type_"+ val.dorm_room_ID}/>
                                        <br />
                                            <h5>Dorm Capacity:</h5>
                                            <input type="text" defaultValue={val.dorm_capacity} id={"dorm_capacity_"+ val.dorm_room_ID}/>  
                                        <br />
                                            <h5>Dorm Description:</h5>
                                            <input type="text" defaultValue={val.dorm_description} id={"dorm_description_"+ val.dorm_room_ID}/>
                                        </p>
                                        <button id={val.dorm_room_ID} onClick={updateDorm}>UPDATE</button>
                                        <button id={val.dorm_room_ID} onClick={deleteDorm}>DELETE</button>
                                        <hr />
                                    </div>

                                </div>
                            </div>
                                );
                            }
                        )
                    }
        </>
     );
}
 
export default DormType;