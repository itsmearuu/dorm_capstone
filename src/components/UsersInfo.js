

import { useState, useEffect } from "react";
import axios from "axios";

const UserData = () => {
    let [userFname, setUserFname] = useState("");
    let [userLname, setUserLname] = useState("");
    let [userEmail, setUserEmail] = useState("");
    let [userPass, setUserPass] = useState("");
    let [studUsers, setStudUsers] = useState([]);

    let addUser = (e) => {
        e.preventDefault();
        let getData = new FormData();
        getData.append("fname", userFname);
        getData.append("lname", userLname);
        getData.append("email", userEmail);
        getData.append("pass", userPass);
        getData.append("function", 1);
        axios({
            method: 'POST',
            url: 'http://localhost/dorm_capstone/dorm-app-capstone/src/dbphp/dorm-user-db.php',
            data: getData
        }).then((response) => {
            // alert(response.data);
        });
    }

    let deleteUser = (e) => {
        let getData = new FormData();
        getData.append('id', e.currentTarget.id);
        getData.append('function', 2);
        axios({
            method: 'POST',
            url: 'http://localhost/dorm_capstone/dorm-app-capstone/src/dbphp/dorm-user-db.php',
            data: getData
        }).then((response) => {
            // alert(response.data);
        });
    }

    let updateUser = (e) => {
        let getData = new FormData();
        getData.append('id', e.currentTarget.id);
        getData.append('fname',document.getElementById("user_fname_" + e.currentTarget.id).value);
        getData.append('lname',document.getElementById("user_lname_" + e.currentTarget.id).value);
        getData.append('email',document.getElementById("user_email_" + e.currentTarget.id).value);
        getData.append('pass',document.getElementById("user_pass_" + e.currentTarget.id).value);
        getData.append('function', 3);
        axios({
            method: 'POST',
            url: 'http://localhost/dorm_capstone/dorm-app-capstone/src/dbphp/dorm-user-db.php',
            data: getData
        }).then((response) => {
            // alert("UPDATED");
        });
    }

    useEffect(
        () => {
            let url = 'http://localhost/dorm_capstone/dorm-app-capstone/src/dbphp/dorm-user-db.php';
            axios.get(url).then(
                (response) => {
                    setStudUsers(response.data);
                }
            );
        },[]
    );

    return (
        <>

            <h1>Login</h1>
            <form action="">
                <input type="text" name="userFname" id="userFname" placeholder="Input First Name" value={userFname} onChange={(e) => setUserFname(e.target.value)}/>
                <input type="text" name="userLname" id="userLname" placeholder="Input Last Name" value={userLname} onChange={(e) => setUserLname(e.target.value)}/>
                <input type="text" name="userEmail" id="userEmail" placeholder="Input Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
                <input type="text" name="userPass" id="userPass" placeholder="Input Password" value={userPass} onChange={(e) => setUserPass(e.target.value)}/>
                <button onClick={addUser}>Submit</button>
            </form>
            {userFname} <br />
            {userLname} <br />
            {userEmail} <br />
            {userPass} <br />

            <h1>List of Student User</h1>
            <table border={1}>
                <thead>
                    <tr>
                        <th>
                            First Name
                        </th>
                        <th>
                            Last Name
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Password
                        </th>
                    </tr>
                </thead>
            <tbody>
                    {
                        studUsers.map( (val) => {
                            return(
                                <tr>
                                    <th>
                                        <input type="text" defaultValue={val.user_fname} id={"user_fname_"+ val.user_ID}/>
                                    </th>
                                    <th>
                                        <input type="text" defaultValue={val.user_lname} id={"user_fname_"+ val.user_ID}/>
                                    </th>
                                    <th>
                                        <input type="text" defaultValue={val.user_email} id={"user_fname_"+ val.user_ID}/>
                                    </th>
                                    <th>
                                        <input type="text" defaultValue={val.user_pass} id={"user_fname_"+ val.user_ID}/>
                                    </th>
                                    <th>
                                        <button id={val.user_ID} onClick={updateUser}>UPDATE</button>
                                    </th>
                                    <th>
                                        <button id={val.user_ID} onClick={deleteUser}>DELETE</button>
                                    </th>
                                </tr>
                                );
                            }
                        )
                    }
            </tbody>
            </table>
        </>
    );
}

export default UserData;