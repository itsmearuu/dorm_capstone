import { useState, useEffect } from "react";
import axios from "axios";

const DormTypeUser = () => {
    let [dormTypeUserShow, setDormTypeUserShow] = useState([]);

    useEffect(
        () => {
            let url = "http://localhost/dorm_capstone/dorm-app-capstone/src/dbphp/dorm-type-db.php"
            axios.get(url).then(
                (response) => {
                    setDormTypeUserShow(response.data);
            });
        },[]
    );
    return ( 
        <>  <div className="container">
                <h1 className="text-center text-white bg-dark">Dorm Type Users View</h1>
            </div>

            
                {
                        dormTypeUserShow.map( (val) => {
                            return(
                                <div className="container my-3 py-3">
                                    <div className="row">
                                        <div className="col-4">
                                            <a href="">
                                                <img src={`images/${val.dorm_room_image}`} className="dormImg"  style={{width: "370px", borderRadius: "5px"}} alt="" />
                                            </a>
                                        </div>
                                        <div className="col-8">
                                            <h1>{val.dorm_type}</h1>
                                            <p>
                                                {val.dorm_capacity} 
                                            <br />
                                                {val.dorm_description}
                                            </p>
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
 
export default DormTypeUser;