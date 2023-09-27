import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


const Dorm = () => {
    let [dormName, setDormName] = useState("");
    let [dormLoc, setDormLoc] = useState("");
    let [dormPrice, setDormPrice] = useState("");
    let [dormImage, setDormImage] = useState("");
    let [dorm, setDorm] = useState([]);

    let addDorm = (e) => {
        e.preventDefault();
        let getData = new FormData();
        getData.append("dName", dormName);
        getData.append("dLoc", dormLoc);
        getData.append("dPrice", dormPrice);
        getData.append('function', 1);
        getData.append("image", dormImage);
        axios({
            method: 'POST',
            url: "http://localhost/dorm_capstone/dorm-app-capstone/src/dbphp/dorm-db.php",
            data: getData,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then((response) => {
            window.location.reload();
        })
    }

    let deleteDorm = (e) => {
        let getData = new FormData();
        getData.append('id', e.currentTarget.id);
        getData.append('function', 2);
        axios({
            method: 'POST',
            url: "http://localhost/dorm_capstone/dorm-app-capstone/src/dbphp/dorm-db.php",
            data: getData
        }).then((response) => {
            // alert(response.data);
        })
    }

    let updateDorm = (e) => {
        let getData = new FormData();
        getData.append('id', e.currentTarget.id);
        getData.append('dName',document.getElementById("dorm_name_" + e.currentTarget.id).value);
        getData.append('dLoc',document.getElementById("dorm_loc_" + e.currentTarget.id).value);
        getData.append('dPrice',document.getElementById("dorm_price_" + e.currentTarget.id).value);
        getData.append('function', 3);

        if (document.getElementById("dorm_image_" + e.currentTarget.id).files[0]){
            getData.append('image', document.getElementById("dorm_image_" + e.currentTarget.id).files[0]);
        }

        axios({
            method: 'POST',
            url: "http://localhost/dorm_capstone/dorm-app-capstone/src/dbphp/dorm-db.php",
            data: getData,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then((response) => {
            // alert(response.data);
        })
    }


    useEffect(
        () => {
            let url = "http://localhost/dorm_capstone/dorm-app-capstone/src/dbphp/dorm-db.php"
            axios.get(url).then(
                (response) => {
                setDorm(response.data);
            });
        },[]
    );

    return ( 
        <>

            <div className="container">
                <div className="row">
                <h1 className="text-center text-white bg-dark">Admin Dorm View</h1>
                <h1 className="text-center text-white bg-dark">Create Dorm</h1>
                    <form action="">
                        <input type="text" name="dormName" id="dormName" placeholder="Input Dorm Name" value={dormName} onChange={(e) => setDormName(e.target.value)}/>
                        <input type="text" name="dormLoc" id="dormLoc" placeholder="Input Dorm Location" value={dormLoc} onChange={(e) => setDormLoc(e.target.value)}/>
                        <input type="text" name="dormPrice" id="dormPrice" placeholder="Input Dorm Price" value={dormPrice} onChange={(e) => setDormPrice(e.target.value)}/>
                        <input type="file" name="dormImage" id="dormImage" accept="img/*" onChange={(e) => setDormImage(e.target.files[0])}/>
                        <button onClick={addDorm}>Submit</button>
                    </form>
            {dormName}<br></br>
            {dormLoc}<br></br>
            {dormPrice}<br></br>

                </div>
            </div>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>
                            <h5>Upload Dorm Image:</h5>
                            </th>
                            <th>
                            <h5>Dorm Name:</h5>
                            </th>
                            <th>
                            <h5>Dorm Location:</h5>
                            </th>
                            <th>
                            <h5>Dorm Location:</h5>
                            </th>
                            <th>
                            <h5>Dorm Price:</h5>
                            </th>
                        </tr>
                        
                    </thead>
                    <tbody>
                    {
                        dorm.map( (val) => {
                            return(
                                        <tr>
                                            <td>
                                                <img src={`images/${val.dorm_image}`} alt="Image" width={100} height={100} />
                                            </td>
                                                <input type="file" accept="img/*" onChange={(e) => setDormImage(e.target.files[0])} id={"dorm_image_"+ val.dorm_ID} />
                                            <td>
                                                <input type="text" defaultValue={val.dorm_name} id={"dorm_name_"+ val.dorm_ID}/>
                                            </td>
                                            <td>
                                                <input type="text" defaultValue={val.dorm_loc} id={"dorm_loc_"+ val.dorm_ID}/>
                                            </td>
                                            <td>
                                                <input type="text" defaultValue={val.dorm_price} id={"dorm_price_"+ val.dorm_ID}/>
                                            </td>
                                            <td>
                                                <button id={val.dorm_ID} onClick={updateDorm}>UPDATE</button>
                                            </td>
                                            <td>
                                            <button id={val.dorm_ID} onClick={deleteDorm}>DELETE</button>
                                            </td>
                                        </tr>
                                );
                            }
                        )
                    }
                </tbody>
                </table>
            {/* <h1>Dorm List</h1>
            <table border={1}>
                <thead>
                    <tr>
                        <th>
                            Dorm Name
                        </th>
                        <th>
                            Dorm Location
                        </th>
                        <th>
                            Dorm Rooms
                        </th>
                        <th>
                            UPDATE
                        </th>
                        <th>
                            DELETE
                        </th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table> */}
        </>
     );
}
 
export default Dorm;