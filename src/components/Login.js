import React, { useState } from 'react'

function Login(props) {
    const [userName, setuserName] = useState('')
    const [password, setpassword] = useState('')

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
        e.preventDefault()

        if (!userName || !password) {
            alert('Please fill the details')
            return
        }
        LoginApi().then((data)=>{
            if(!data["response"]){
                window.sessionStorage.setItem("userName",data.name);
                window.sessionStorage.setItem("token","JWT-Token");
                if(data.admin===true){
                    window.sessionStorage.setItem("admin","true");
                    props.history.push('/dashboard-admin');
                } else{
                    window.sessionStorage.setItem("admin","false");
                    props.history.push('/dashboard-user',{ userName: data.name, password: data.password })
                }
            } else if(data["response"]){
                alert("No User Found Fill correct Details");
            } else{
                alert("Please Active your account by going to your confirmation mail");
            }
            console.log(data);
        });

        setuserName('')
        setpassword('')
    }
    return (
        <div id="boundary" style={{margin:'16px',width:'50%'}}>
            <br></br>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <div >
                    <label>Username</label>
                    <input
                        type='text'
                        placeholder='Username'
                        value={userName}
                        name='userName'
                        onChange={(e) => setuserName(e.target.value)}
                    />
                </div>
                <div >
                    <label>Password</label>
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        name='password'
                        onChange={(e) => setpassword(e.target.value)}
                    />
                </div>
                <input type='submit' value='Login' />
            </form>
        </div>
    )
}

export default Login
