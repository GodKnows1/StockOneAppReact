import React,{useState} from 'react'
import { useHistory } from "react-router-dom";

function SignUp() {

    const [userName, setuserName] = useState('')
    const [password, setpassword] = useState('')
    const [email, setemail] = useState('')
    const [mobnumber, setmobnumber] = useState('')

    const history = useHistory();
    
    async function SignUpApi() {
        const dataModel={
            "name":userName,
            "password":password,
            "email":email,
            "mobileNum":mobnumber,
            "admin":false,
            "confirmed":false
        }
        const res = await fetch('http://localhost:8080/setuserapi', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type":"application/json"
            },
            body:JSON.stringify(dataModel)
        });
        return res;
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (!userName || !password || !email || !mobnumber) {
            alert('Please fill the details')
            return
        }
    
        // onAdd({ userName, password, reminder })
        SignUpApi().then((data)=>{
            console.log(data);
            history.push("/login");
            
        });

        setemail('');
        setuserName('');
        setpassword('');
        setmobnumber('');
    }

    return (
        
        <div>
            SignUp
            <form onSubmit={onSubmit}>
                <div >
                    <label>Username</label>
                    <input
                        type='text'
                        placeholder='Username'
                        value={userName}
                        onChange={(e) => setuserName(e.target.value)}
                    />
                </div>
                <div >
                    <label>Password</label>
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    />
                </div>
                <div >
                    <label>Email</label>
                    <input
                        type='email'
                        placeholder='email'
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />
                </div>
                <div >
                    <label>Mobile Number</label>
                    <input
                        type='number'
                        placeholder='Mob Number'
                        value={mobnumber}
                        onChange={(e) => setmobnumber(e.target.value)}
                    />
                </div>
                <input type='submit' value='Login' />
            </form>
        </div>
    )
}

export default SignUp
