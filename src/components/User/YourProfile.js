import React,{useState,useEffect} from 'react';

import { useHistory } from "react-router-dom";
function YourProfile() {

    const history = useHistory()
    const [userName, setuserName] = useState(history.location.state.userName);
    const [password, setpassword] = useState(history.location.state.password);
    const [email, setemail] = useState('');
    const [mob,setmob]=useState(0);
    const [update,setupdate]=useState("false");

    async function LoginApi() {
        const res = await fetch('http://localhost:8080/getUserByNameAndPass', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({"name":userName,"password":password})
        });
        return res.json();
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        LoginApi().then((data)=>{
            setemail(data.email);
            setmob(data.mobileNum)
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
                    disabled={update?"false":"true"}
                /><br></br>

                <label for="email">Registerd Email-Id</label><br></br>
                <input type="text" name="email" placeholder="Registerd Email-Id.." value={email}
                disabled={update?"false":"true"}
                /><br></br>

                <label for="num">Registerd Mobile Number</label><br></br>
                <input type="number"  name="num" placeholder="Registerd Mobile Number.." value={mob}
                disabled={update?"false":"true"}
                /><br></br>

                <label for="pass">Password</label><br></br>
                <input type="password"  name="pass" placeholder="Password" value={password}
                disabled={update}
                /><br></br>

                <input type="submit" value='Update Information' disabled={update}/>
                <button onClick={function(){setupdate("false")}}>Edit Details&#9998;</button>
            </form>
        </div>
    )
}

export default YourProfile
