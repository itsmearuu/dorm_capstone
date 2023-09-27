import { useState, useEffect } from "react";
import axios from "axios";

const DormUser = () => {
    let [dormUserShow, setDornUserShow] = useState([]);

    useEffect(
        () => {
            let url = "http://localhost/dorm_capstone/dorm-app-capstone/src/dbphp/dorm-user.php"
            axios.get(url).then(
                (response) => {
                setDornUserShow(response.data);
            });
        },[]
    );

    return ( 
        <>
        <div className="container">
            <h1 className="text-center text-white bg-dark">Students View</h1>
        </div>
            
                    {
                        dormUserShow.map( (val) => {
                            return(
                                <div className="container my-3 py-3">
                                    <div className="row">
                                        <div className="col-4">
                                            <a href="">
                                                <img src={`images/${val.dorm_image}`} className="dormImg"  style={{width: "370px", borderRadius: "5px"}} alt="" />
                                            </a>
                                        </div>
                                        <div className="col-8">
                                            <h1>{val.dorm_name}</h1>
                                            <p>
                                                {val.dorm_loc} 
                                            <br />
                                                {val.dorm_price}
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
 
export default DormUser;