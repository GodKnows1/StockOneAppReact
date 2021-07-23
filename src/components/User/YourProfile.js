import React, { useState, useEffect } from 'react';

import { useHistory } from "react-router-dom";
function YourProfile() {

    const [userName, setuserName] = useState(window.sessionStorage.getItem("userName"));
    const [password, setpassword] = useState();
    const [email, setemail] = useState('');
    const [mob, setmob] = useState('');
    const [update, setupdate] = useState(true);
    const [id,setid]=useState(0);

    async function LoginApi() {
        const res = await fetch('http://localhost:8080/getUserByName', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "userName": userName })
        });
        return res.json();
    }

    async function UpdateUserApi() {
        const res = await fetch('http://localhost:8080/updateUser', {
            method: 'PUT',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "name": userName, "password": password, "email": email, "mobileNum": mob, "admin": false, "confirmed": true, "id": id })
        });
        return res;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        UpdateUserApi().then((data) => {
            LoginApi().then((data) => {
                setemail(data.email);
                setmob(data.mobileNum)
                setid(data.id);
                setpassword(data.password);
                setuserName(data.name);

            });
            alert('User updated successfully');
            setupdate(true);
        });

    }

    useEffect(() => {
        LoginApi().then((data) => {
            setemail(data.email);
            setmob(data.mobileNum)
            setid(data.id);
            setpassword(data.password);
        })
    }, []);
    return (
        <div id="content">
            <h2>Profile Details</h2>
            <form onSubmit={onSubmit}>
                <label for="firstname">Registerd UserName</label><br></br>
                <input type="text" name="firstname"
                    placeholder="Registerd UserName.."
                    value={userName}
                    onChange={(e) => setuserName(e.target.value)}
                    disabled={(update) ? "disabled" : ""}
                /><br></br>

                <label for="email">Registerd Email-Id</label><br></br>
                <input type="text"
                    name="email"
                    placeholder="Registerd Email-Id.."
                    value={email}
                    disabled={(update) ? "disabled" : ""}
                    onChange={(e) => setemail(e.target.value)}
                /><br></br>

                <label for="num">Registerd Mobile Number</label><br></br>
                <input type="text" name="num" placeholder="Registerd Mobile Number.."
                    value={mob}
                    disabled={(update) ? "disabled" : ""}
                    onChange={(e) => setmob(e.target.value)}
                /><br></br>

                <label for="pass">Password</label><br></br>
                <input type="password" name="pass" placeholder="Password" value={password}
                    disabled={(update) ? "disabled" : ""}
                    onChange={(e) => setpassword(e.target.value)}
                /><br></br>

                <input type="submit" value='Update Information' disabled={(update) ? "disabled" : ""} />
                <button type="button" onClick={function () { setupdate(false); console.log(update) }}>Edit Details&#9998;</button>
            </form>
        </div>
    )
}

export default YourProfile
